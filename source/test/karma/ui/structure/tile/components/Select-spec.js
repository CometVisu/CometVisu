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
 * Unit tests for <cv-select> component
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-select> component of the tile structure', () => {
  let oldController;

  beforeEach(function() {
    oldController = cv.Application.structureController;
    cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();
    document.body.classList.remove('loading');
    document.body.innerHTML = '';
  });

  afterEach(() => {
    cv.Application.structureController = oldController;
    document.body.classList.add('loading');
  });

  it('should create a default select', function() {
    const element = this.createTileWidgetWithComponent('cv-select', {}, '<cv-option>o1</cv-option><cv-option>o2</cv-option>');
    expect(element).toBeDefined();
    expect(element.tagName).toBe('CV-SELECT');
    expect(element._instance instanceof cv.ui.structure.tile.components.Select).toBe(true);

    // check content
    expect(element.querySelector('.popup')).toBeDefined();
    expect(element.querySelector('.value')).toBeDefined();
    expect(element.querySelector('.dropdown')).toBeDefined();

    // check that options got a key
    const options = element.querySelectorAll('cv-option');
    expect(options.length).toBe(2);
    expect(options[0].getAttribute('key')).toBe('0');
    expect(options[1].getAttribute('key')).toBe('1');
  });

  it('should handle state update and send selected option', function() {
    const element = this.createTileWidgetWithComponent('cv-select', {}, '<cv-address transform="raw">sa1</cv-address></cv-address><cv-option key="o1">o1</cv-option><cv-option key="o2">o2</cv-option>');

    const address = element.querySelector('cv-address');
    spyOn(address, 'dispatchEvent').and.callThrough();

    // check that options got a key
    const options = element.querySelectorAll('cv-option');
    expect(options.length).toBe(2);
    expect(options[0].getAttribute('key')).toBe('o1');
    expect(options[1].getAttribute('key')).toBe('o2');

    // open popup
    element.click()
    // select second option
    options[1].click();
    expect(address.dispatchEvent).toHaveBeenCalledWith(new CustomEvent('change', {detail: {value: 'o2', source: element._instance}}));
    expect(element._instance.getValue()).toBe('o2');

    cv.data.Model.getInstance().onUpdate('sa1', 'o1');
    expect(element._instance.getValue()).toBe('o1');
    expect(element.querySelector('.value').textContent).toBe('o1');
  });

  it('should support showing different part of the selected option', function() {
    const element = this.createTileWidgetWithComponent('cv-select', {}, '<cv-address>sa1</cv-address><cv-option key="o1"><cv-icon></cv-icon>o1</cv-option><cv-option key="o2">o2</cv-option>');

    cv.data.Model.getInstance().onUpdate('sa1', 'o1');
    const value = element.querySelector('.value');
    const select = element._instance;

    expect(value.innerHTML).toBe('<cv-icon></cv-icon>o1');
    select.setShow('icon');
    expect(value.innerHTML).toBe('<cv-icon></cv-icon>');
    select.setShow('label');
    expect(value.innerHTML).toBe('o1');
  });

  it('should close selection-popup when clicked outside', function(done) {
    const element = this.createTileWidgetWithComponent('cv-select', {}, '<cv-address>sa1</cv-address><cv-option key="o1">o1</cv-option><cv-option key="o2">o2</cv-option>');

    const popup = element.querySelector('.popup');
    popup.style.display = 'none'; // because the design css is not loaded, we set this manually here

    // open popup
    element.click();
    expect(window.getComputedStyle(popup)['display']).toBe('block');
    setTimeout(() => {
      document.body.click();
      expect(window.getComputedStyle(popup)['display']).toBe('none');
      done();
    }, 10);
  });
});
