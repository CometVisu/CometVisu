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
 * Unit tests for <cv-flow> component
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-flow> component of the tile structure', () => {
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

  it('should create a default flow', function() {
    const element = this.createTileWidgetWithComponent('cv-flow', {}, '');
    expect(element).not.toBeNull();
    expect(element.tagName).toBe('CV-FLOW');
    expect(element._instance instanceof cv.ui.structure.tile.components.Flow).toBe(true);
  });

  it('should create a flow with title', function() {
    const element = this.createTileWidgetWithComponent('cv-flow', {
      title: 'Test'
    }, '');
    const widget = element.parentElement.parentElement;
    expect(widget.querySelector(':scope > header > label.title')).not.toBeNull();
  });

  it('should create a flow with fullscreen and pagination support', function(done) {
    const element = this.createTileWidgetWithComponent('cv-flow', {
      rows: 6,
      columns: 6,
      'allow-fullscreen': true,
      'view-box': '0 0 3 3',
      'fullscreen-view-box': '0 0 6 6',
      pagination: 'both'
    }, '');
    const fsButton = element.parentElement.parentElement.querySelector(':scope > header > div.right > button.fullscreen');
    expect(element._instance.getFullscreen()).toBe(false);
    expect(fsButton).not.toBeNull();
    window.requestAnimationFrame(() => {
      fsButton.click();
      expect(element._instance.getFullscreen()).toBe(true);
      // check if the fullscreen viewbox gets applied
      expect(element._instance.getViewBox()).toBe('0 0 6 6');
      fsButton.click();
      expect(element._instance.getViewBox()).toBe('0 0 3 3');
      expect(element._instance.getFullscreen()).toBe(false);

      // check pagination
      const topPage = element.querySelector(':scope > div.pagination.top');
      const bottomPage = element.querySelector(':scope > div.pagination.bottom');
      const leftPage = element.querySelector(':scope > div.pagination.left');
      const rightPage = element.querySelector(':scope > div.pagination.right');
      const svg = element.querySelector(':scope > svg');
      expect(topPage).not.toBeNull();
      expect(bottomPage).not.toBeNull();
      expect(leftPage).not.toBeNull();
      expect(rightPage).not.toBeNull();

      // check which buttons are enabled
      expect(topPage.classList.contains('clickable')).toBeFalsy();
      expect(bottomPage.classList.contains('clickable')).toBeTruthy();
      expect(leftPage.classList.contains('clickable')).toBeFalsy();
      expect(rightPage.classList.contains('clickable')).toBeTruthy();

      // horizontal pagination
      expect(svg.getAttribute('viewBox').startsWith('0 0')).toBeTruthy();
      qx.event.Registration.fireEvent(rightPage, 'tap');
      expect(svg.getAttribute('viewBox').startsWith('0 0')).toBeFalsy();
      // left + bottom
      expect(topPage.classList.contains('clickable')).toBeFalsy();
      expect(bottomPage.classList.contains('clickable')).toBeTruthy();
      expect(leftPage.classList.contains('clickable')).toBeTruthy();
      expect(rightPage.classList.contains('clickable')).toBeFalsy();

      qx.event.Registration.fireEvent(leftPage, 'tap');
      expect(svg.getAttribute('viewBox').startsWith('0 0')).toBeTruthy();
      // right + bottom
      expect(topPage.classList.contains('clickable')).toBeFalsy();
      expect(bottomPage.classList.contains('clickable')).toBeTruthy();
      expect(leftPage.classList.contains('clickable')).toBeFalsy();
      expect(rightPage.classList.contains('clickable')).toBeTruthy();

      // vertical pagination
      qx.event.Registration.fireEvent(bottomPage, 'tap');
      expect(svg.getAttribute('viewBox').startsWith('0 0')).toBeFalsy();
      // right + top
      expect(topPage.classList.contains('clickable')).toBeTruthy();
      expect(bottomPage.classList.contains('clickable')).toBeFalsy();
      expect(leftPage.classList.contains('clickable')).toBeFalsy();
      expect(rightPage.classList.contains('clickable')).toBeTruthy();

      qx.event.Registration.fireEvent(topPage, 'tap');
      expect(svg.getAttribute('viewBox').startsWith('0 0')).toBeTruthy();
      // right + bottom
      expect(topPage.classList.contains('clickable')).toBeFalsy();
      expect(bottomPage.classList.contains('clickable')).toBeTruthy();
      expect(leftPage.classList.contains('clickable')).toBeFalsy();
      expect(rightPage.classList.contains('clickable')).toBeTruthy();
      done();
    });
  });

  it('should center content horizontally', function() {
    const element = this.createTileWidgetWithComponent('cv-flow', {
      'center-x': true
    }, '<div row="0" column="0" class="first"></div><div row="0" column="1" class="second"></div>');
    expect(element.querySelector(':scope div.first').getAttribute('column')).toBe('0.5');
    expect(element.querySelector(':scope div.second').getAttribute('column')).toBe('1.5');
  });

  it('should center content vertically', function() {
    const element = this.createTileWidgetWithComponent('cv-flow', {
      'center-y': true
    }, '<div row="0" column="0" class="first"></div><div row="1" column="0" class="second"></div>');
    expect(element.querySelector(':scope div.first').getAttribute('row')).toBe('0.5');
    expect(element.querySelector(':scope div.second').getAttribute('row')).toBe('1.5');
  });

  it('should support panning', function(done) {
    spyOn(window, 'setTimeout').and.callFake((fn) => fn());
    const element = this.createTileWidgetWithComponent('cv-flow', {
      'pan': true
    }, '<cv-power-entity type="pv" row="1" column="1"></cv-power-entity>');

    window.requestAnimationFrame(function() {
      const svg = element.querySelector(':scope > svg');
      expect(svg.viewBox.baseVal.x).toBe(0);
      expect(svg.viewBox.baseVal.y).toBe(0);
      element.dispatchEvent(new PointerEvent('pointerdown', {clientX:0, clientY: 0}));
      element.dispatchEvent(new PointerEvent('pointermove', {clientX:10, clientY: 10}));
      element.dispatchEvent(new PointerEvent('pointerup', {clientX:10, clientY: 10}));
      expect(svg.viewBox.baseVal.x).toBe(-10);
      expect(svg.viewBox.baseVal.y).toBe(-10);

      // test with disabled panning
      element.setAttribute('pan', 'false');
      element.dispatchEvent(new PointerEvent('pointerdown', {clientX:10, clientY: 10}));
      element.dispatchEvent(new PointerEvent('pointermove', {clientX:0, clientY: 0}));
      element.dispatchEvent(new PointerEvent('pointerup', {clientX:0, clientY: 0}));
      expect(svg.viewBox.baseVal.x).toBe(-10);
      expect(svg.viewBox.baseVal.y).toBe(-10);
      done();
    });
  });

  it('should update cellsize', function() {
    const element = this.createTileWidgetWithComponent('cv-flow');

    // CSS is not loaded, we need to set the size manually
    element.style.display = 'block';
    element.style.height = '192px';
    element.style.width = '192px';

    expect(element._instance.getCellWidth()).toBe(56);
    expect(element._instance.getCellHeight()).toBe(56);

    element.setAttribute('columns', '6');
    expect(element._instance.getCellWidth()).toBe(26);
    element.setAttribute('rows', '6');
    expect(element._instance.getCellHeight()).toBe(26);
  });
});
