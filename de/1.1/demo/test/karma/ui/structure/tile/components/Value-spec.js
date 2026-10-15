/*
 * Copyright (c) 2025-2026, Christian Mayer and the CometVisu contributors.
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
 * Unit tests for <cv-value> component
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-value> component of the tile structure', () => {
  let oldController;
  let oldTestMode;

  beforeEach(function() {
    oldController = cv.Application.structureController;
    oldTestMode = cv.Config.testMode;
    cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();
    document.body.classList.remove('loading');
    document.body.innerHTML = '';
  });

  afterEach(() => {
    cv.Application.structureController = oldController;
    cv.Config.testMode = oldTestMode;
    document.body.classList.add('loading');
  });

  it('should create a default value', function() {
    const element = this.createTileWidgetWithComponent('cv-value', {}, '');

    expect(element).not.toBeNull();
    expect(element.tagName).toBe('CV-VALUE');
    expect(element.textContent).toBe('');
    expect(element._instance instanceof cv.ui.structure.tile.components.Value).toBe(true);
  });

  it('should create a text value', function() {
    const element = this.createTileWidgetWithComponent('cv-value', {},
      '<label class="value">Text</label><cv-address mode="read">test</cv-address>');

    const label = element.querySelector('.value');

    expect(label.textContent).toBe('Text');
    cv.data.Model.getInstance().onUpdate('test', 'Hello World');

    expect(label.textContent).toBe('Hello World');
  });

  it('should create an icon value', function() {
    const element = this.createTileWidgetWithComponent('cv-value', {},
      '<cv-icon class="value">unknown</cv-icon><cv-address mode="read">test</cv-address>');

    cv.data.Model.getInstance().onUpdate('test', 'on-icon');

    expect(element.querySelector('.value')._instance.getId()).toBe('on-icon');
  });

  it('should create an icon value with styling', function() {
    spyOn(cv.Application.structureController, 'styleValue').and.callFake((styling, value, store) => value === 'ON' ? 'style-class' : '');
    const element = this.createTileWidgetWithComponent('cv-value', {styling: 'test'},
      '<cv-icon class="value">unknown</cv-icon><cv-address mode="read">test</cv-address>');

    cv.data.Model.getInstance().onUpdate('test', 'ON');
    const icon = element.querySelector('.value')._instance;

    expect(icon.getId()).toBe('ON');
    expect(icon.getStyleClass()).toBe('style-class');

    // make sure that in can handle icons that are not initialized yet
    element.querySelector('.value')._instance = null;
    spyOn(window, 'requestAnimationFrame').and.callFake(callback => {
      element.querySelector('.value')._instance = icon;
      callback();
    });
    cv.data.Model.getInstance().onUpdate('test', 'OFF');

    expect(icon.getId()).toBe('OFF');
    expect(icon.getStyleClass()).toBe('');
  });

  it('should restore an icon value when the page gets activated later', function(done) {
    cv.Config.testMode = false;
    cv.data.Model.getInstance().onUpdate('test', 'on-icon');

    const page = document.createElement('cv-page');
    const widget = document.createElement('cv-widget');
    const tile = document.createElement('cv-tile');
    const element = document.createElement('cv-value');
    element.innerHTML = '<cv-icon class="value">unknown</cv-icon><cv-address mode="read">test</cv-address>';

    tile.appendChild(element);
    widget.appendChild(tile);
    page.appendChild(widget);
    document.body.appendChild(page);

    expect(element.querySelector('.value')._instance.getId()).toBeNull();

    page.classList.add('active');
    qx.event.message.Bus.dispatchByName('cv.ui.structure.tile.currentPage', page);

    window.requestAnimationFrame(() => {
      expect(element.querySelector('.value')._instance.getId()).toBe('on-icon');
      expect(element.querySelector('.value').classList.contains('on-icon')).toBe(true);
      done();
    });
  });

  it('should create a meter value', function() {
    const element = this.createTileWidgetWithComponent('cv-value', {},
      '<meter class="value"></meter><cv-address mode="read">test</cv-address>');

    cv.data.Model.getInstance().onUpdate('test', 50);

    expect(element.querySelector('.value').getAttribute('value')).toBe('50');
  });

  it('should create a round progress value', function() {
    const element = this.createTileWidgetWithComponent('cv-value', {},
      '<cv-round-progress class="value"></cv-round-progress><cv-address mode="read">test</cv-address>');

    cv.data.Model.getInstance().onUpdate('test', 50);

    expect(element.querySelector('.value')._instance.getProgress()).toBe(50);
    expect(element.querySelector('.value')._instance.getText()).toBe('50');

    // should also handle strings
    cv.data.Model.getInstance().onUpdate('test', '75');

    expect(element.querySelector('.value')._instance.getProgress()).toBe(75);
    expect(element.querySelector('.value')._instance.getText()).toBe('75');
  });

  it('should create a text value with overflowing content', function() {
    const element = this.createTileWidgetWithComponent('cv-value', {style: 'display: block; width: 100px; overflow: hidden;'},
      '<label class="value" style="display: inline-block; white-space: nowrap;">Text</label><cv-address mode="read">Title</cv-address>');

    const label = element.querySelector('.value');
    const value = element._instance;
    cv.data.Model.getInstance().onUpdate('Title', 'Hello World this is a very long string that should overflow');
    value.setVisible(false);
    value._detectOverflow();
    value.setVisible(true);
    value._detectOverflow();

    expect(label.classList.contains('scroll')).toBe(true);
    value.setVisible(false);
    value._detectOverflow();

    expect(label.classList.contains('scroll')).toBe(false);

    value.setVisible(true);
    value._detectOverflow();

    expect(label.classList.contains('scroll')).toBe(true);
    cv.data.Model.getInstance().onUpdate('Title', 'Hello');
    value._detectOverflow();

    expect(label.classList.contains('scroll')).toBe(false);
  });
});
