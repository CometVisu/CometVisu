/*
 * Copyright (c) 2025, Christian Mayer and the CometVisu contributors.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 *
 */

/**
 * Unit tests for <cv-button> component
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-button> component of the tile structure', () => {
  let oldController;

  beforeEach(function()  {
    oldController = cv.Application.structureController;
    cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();
  });

  afterEach(() => {
    cv.Application.structureController = oldController;
  });

  it('should create a default button', function() {
    const element = this.createTileWidgetWithComponent('cv-button',
      { },
      ''
    );
    expect(element).not.toBeNull();
    expect(element.querySelector('label.button-label')).toBeNull();
    expect(element.tagName).toBe('CV-BUTTON');
    expect(element.textContent).toBe('');
    expect(element._instance.getType()).toBe('button');
    expect(element._instance instanceof cv.ui.structure.tile.components.Button).toBe(true);
  });

  it('should create a button with a name', function() {
    const element = this.createTileWidgetWithComponent('cv-button',
      { name: 'test' },
      ''
    );
    const label = element.querySelector('label.button-label');
    expect(label.textContent).toBe('test');
  });

  it('should create a button with a progress', function() {
    const element = this.createTileWidgetWithComponent('cv-button',
      { progress: '50' },
      ''
    );
    const bar = element.querySelector('svg > circle.bar');
    expect(bar).not.toBeNull();
    expect(element._instance.getProgress()).toBe(50);
    expect(Math.round(parseInt(bar.getAttribute('stroke-dashoffset')))).toEqual(157);
  });

  it('should create a button with a progress-mapping', function() {
    const element = this.createTileWidgetWithComponent('cv-button',
      { 'progress-mapping': 'test' },
      ''
    );
    spyOn(cv.Application.structureController, 'mapValue').and.returnValue(50);
    element._instance.setProgress(100);
    const bar = element.querySelector('svg > circle.bar');
    expect(cv.Application.structureController.mapValue).toHaveBeenCalledOnceWith('test', 100, jasmine.any(Map));
    expect(Math.round(parseInt(bar.getAttribute('stroke-dashoffset')))).toEqual(157);
  });

  // test different types
  ['button', 'trigger', 'push'].forEach((type) => {
    it('should create a button with type ' + type, function() {
      const element = this.createTileWidgetWithComponent('cv-button',
        { type: type},
        ''
      );
      expect(element._instance.getType()).toBe(type);
    });
  });

  // auto-detect button type from given addresses
  const typeMapping = [
    {
      type: 'push',
      content: '<cv-address mode="write" value="1" on="down">a1</cv-address><cv-address mode="write" value="0" on="up">a2</cv-address>',
      attributes: {}
    },
    {
      type: 'trigger',
      content: '<cv-address mode="write" value="1">a1</cv-address>',
      attributes: {mapping: 'test'}
    },
    {
      type: 'button', // no trigger when there is a read address
      content: '<cv-address mode="readwrite" value="1">a1</cv-address>',
      attributes: {mapping: 'test'}
    }
  ]
  for (const mapping of typeMapping) {
    it('should auto-detect a button with type ' + mapping.type + ' by defined addresses', function() {
      const element = this.createTileWidgetWithComponent('cv-button',
        mapping.attributes,
        mapping.content
      );
      expect(element._instance.getType()).toBe(mapping.type);
    });
  }

  it('should create a button that uses the whole tile for click events', function() {
    const element = this.createTileWidgetWithComponent('cv-button',
      { 'whole-tile': 'true' },
      '<cv-address mode="write">a1</cv-address>'
    );
    const button = element._instance;
    spyOn(button, 'onClicked').and.callThrough();

    const address = element.querySelector('cv-address');
    spyOn(address, 'dispatchEvent');

    const tile = element.parentElement;
    expect(tile.classList.contains('clickable')).toBe(true);
    tile.click();
    expect(button.onClicked).toHaveBeenCalledOnceWith(jasmine.anything());
    expect(address.dispatchEvent).toHaveBeenCalledOnceWith(jasmine.any(CustomEvent));
  });

  it('should apply on/off to a text value', function() {
    const element = this.createTileWidgetWithComponent('cv-button',
      {  },
      '<cv-address mode="read">a1</cv-address><span class="value"></span>'
    );
    const button = element._instance;
    const valueElement = element.querySelector('span.value');
    button.setOn(true);
    expect(element.getAttribute('value')).toBe('1');
    expect(valueElement.textContent).toEqual('1');

    button.setOn(false);
    expect(element.getAttribute('value')).toBe('0');
    expect(valueElement.textContent).toEqual('0');
  });

  it('should apply on/off to an icon', function() {
    const element = this.createTileWidgetWithComponent('cv-button',
      {  },
      '<cv-address mode="read">a1</cv-address><cv-icon class="value"></cv-icon>'
    );
    const button = element._instance;
    const valueElement = element.querySelector('cv-icon.value');
    button.setOn(true);
    expect(element.getAttribute('value')).toBe('1');
    expect(valueElement._instance.getId()).toEqual('1');

    button.setOn(false);
    expect(element.getAttribute('value')).toBe('0');
    expect(valueElement._instance.getId()).toEqual('0');
  });


  it('should apply custom on/off value with mapping and styling', function() {
    const element = this.createTileWidgetWithComponent('cv-button',
      { mapping: 'test-mapping', styling: 'test-styling', 'on-value': 'ON', 'off-value': 'OFF' },
      '<cv-address mode="read">a1</cv-address><span class="value"></span>'
    );
    spyOn(cv.Application.structureController, 'mapValue').and.callFake((mapping, value, store) => {
      return value === 'ON' ? 100 : 0;
    });
    spyOn(cv.Application.structureController, 'styleValue').and.callFake((styling, value, store) => {
      return value === 'ON' ? 'style-class' : '';
    });

    expect(element.classList.contains('style-class')).toBe(false);
    const button = element._instance;
    const valueElement = element.querySelector('span.value');
    button.setOn(true);
    expect(element.getAttribute('value')).toBe('ON'); // this is the unmapped value
    expect(valueElement.textContent).toEqual('100');
    expect(element.classList.contains('style-class')).toBe(true);

    button.setOn(false);
    expect(element.getAttribute('value')).toBe('OFF'); // this is the unmapped value
    expect(valueElement.textContent).toEqual('0');
    expect(element.classList.contains('style-class')).toBe(false);
  });

  it('should handle state updates for different targets', function() {
    const element = this.createTileWidgetWithComponent('cv-button',
      { mapping: 'test-mapping' },
      '<cv-address mode="read">state</cv-address><cv-address mode="read" target="progress">progress</cv-address><cv-address mode="read" target="store">store</cv-address><cv-address mode="read" target="store:test">test-store</cv-address>'
    );

    const currentStore = element._store;
    spyOn(cv.Application.structureController, 'mapValue').and.callFake((mapping, value) => {
      return value === 'ON' ? 100 : 0;
    });
    const button = element._instance;
    const model = cv.data.Model.getInstance();
    model.onUpdate('state', '1');
    expect(button.isOn()).toBeTruthy();
    model.onUpdate('state', '0');
    expect(button.isOn()).toBeFalsy();

    model.onUpdate('progress', '50');
    expect(button.getProgress()).toBe(50);

    expect(currentStore.has('store')).toBeFalsy();
    expect(currentStore.has('test')).toBeFalsy();

    model.onUpdate('store', '50');
    expect(currentStore.get('store')).toBe('50');

    model.onUpdate('test-store', '50');
    expect(currentStore.get('test')).toBe('50');
  });

  it('should handle user interactions', function() {
    const element = this.createTileWidgetWithComponent('cv-button',
      { type: 'button' },
      '<cv-address on="click">a1</cv-address><cv-address on="down" value="1">a2</cv-address><cv-address on="up" value="0">a3</cv-address>'
    );
    const button = element._instance;
    const clickAddress = element.querySelector('cv-address[on="click"]');
    const downAddress = element.querySelector('cv-address[on="down"]');
    const upAddress = element.querySelector('cv-address[on="up"]');
    spyOn(clickAddress, 'dispatchEvent');
    spyOn(downAddress, 'dispatchEvent');
    spyOn(upAddress, 'dispatchEvent');
    expect(clickAddress.dispatchEvent).not.toHaveBeenCalled();
    expect(downAddress.dispatchEvent).not.toHaveBeenCalled();
    expect(upAddress.dispatchEvent).not.toHaveBeenCalled();

    element.click();
    expect(clickAddress.dispatchEvent).toHaveBeenCalledOnceWith(jasmine.any(CustomEvent));
    expect(downAddress.dispatchEvent).not.toHaveBeenCalled();
    expect(upAddress.dispatchEvent).not.toHaveBeenCalled();
    clickAddress.dispatchEvent.calls.reset();

    element.dispatchEvent(new PointerEvent('pointerdown'));
    expect(clickAddress.dispatchEvent).not.toHaveBeenCalled();
    expect(downAddress.dispatchEvent).toHaveBeenCalledOnceWith(jasmine.any(CustomEvent));
    expect(upAddress.dispatchEvent).not.toHaveBeenCalled();
    downAddress.dispatchEvent.calls.reset();

    element.dispatchEvent(new PointerEvent('pointerup'));
    expect(clickAddress.dispatchEvent).not.toHaveBeenCalled();
    expect(downAddress.dispatchEvent).not.toHaveBeenCalled();
    expect(upAddress.dispatchEvent).toHaveBeenCalledOnceWith(jasmine.any(CustomEvent));
  });

  it('should create a button with a loc-link', function() {
    const element = this.createTileWidgetWithComponent('cv-button',
      { 'doc-link': 'test' },
      ''
    );
    spyOn(window, 'open');
    element.click();
    expect(window.open).toHaveBeenCalled();
    const url = window.open.calls.argsFor(0)[0];
    expect(url.startsWith('https://www.cometvisu.org/CometVisu/')).toBeTruthy();
    expect(url.endsWith('/manual/test')).toBeTruthy();
  });

  it('should simulate a state change for a trigger', function(done) {
    const element = this.createTileWidgetWithComponent('cv-button',
      { 'type': 'trigger', 'mapping': 'test' },
      '<cv-address mode="write" value="1">a1</cv-address>'
    );
    spyOn(qx.event.Timer, 'once').and.callFake((callback, timeout) => {
      setTimeout(() => {
        callback();
        expect(element._instance.isOn()).toBeFalse();
        done();
      }, 50);
    });
    element.click();
    expect(element._instance.isOn()).toBeTruthy();
  });
});
