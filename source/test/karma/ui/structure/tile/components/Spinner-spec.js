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
 * Unit tests for <cv-spinner> component
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-spinner> component of the tile structure', () => {
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

  it('should create a default spinner', function() {
    const element = this.createTileWidgetWithComponent('cv-spinner', {}, '');
    expect(element).not.toBeNull();
    expect(element.tagName).toBe('CV-SPINNER');
    expect(element.textContent).toBe('');
    expect(element._instance instanceof cv.ui.structure.tile.components.Spinner).toBe(true);

    // check content
    expect(element.querySelector('div.left.clickable')).not.toBeNull();
    expect(element.querySelector('label.value')).not.toBeNull();
    expect(element.querySelector('div.right.clickable')).not.toBeNull();
  });

  it('should use given step-width in absolute mode', function() {
    const element = this.createTileWidgetWithComponent('cv-spinner', {'step-width': 10}, '<cv-address mode="write">test</cv-address>');
    const address = element.querySelector('cv-address');
    spyOn(address, 'dispatchEvent');

    const decreaseButton = element.querySelector('div.left.clickable');
    const increaseButton = element.querySelector('div.right.clickable');
    increaseButton.click();
    expect(address.dispatchEvent).toHaveBeenCalledWith(new CustomEvent('change', {detail: {value: 10, source: element._instance}}));
    address.dispatchEvent.calls.reset();
    increaseButton.click();
    expect(address.dispatchEvent).toHaveBeenCalledWith(new CustomEvent('change', {detail: {value: 20, source: element._instance}}));
    address.dispatchEvent.calls.reset();
    decreaseButton.click();
    expect(address.dispatchEvent).toHaveBeenCalledWith(new CustomEvent('change', {detail: {value: 10, source: element._instance}}));
    address.dispatchEvent.calls.reset();
    decreaseButton.click();
    expect(address.dispatchEvent).toHaveBeenCalledWith(new CustomEvent('change', {detail: {value: 0, source: element._instance}}));
    address.dispatchEvent.calls.reset();
  });

  it('should use given step-width in relative mode', function() {
    const element = this.createTileWidgetWithComponent('cv-spinner', {'step-width': 10, mode: 'relative'}, '<cv-address mode="write">test</cv-address>');
    const address = element.querySelector('cv-address');
    spyOn(address, 'dispatchEvent');

    const decreaseButton = element.querySelector('div.left.clickable');
    const increaseButton = element.querySelector('div.right.clickable');
    increaseButton.click();
    expect(address.dispatchEvent).toHaveBeenCalledWith(new CustomEvent('change', {detail: {value: 10, source: element._instance}}));
    address.dispatchEvent.calls.reset();
    increaseButton.click();
    expect(address.dispatchEvent).toHaveBeenCalledWith(new CustomEvent('change', {detail: {value: 10, source: element._instance}}));
    address.dispatchEvent.calls.reset();
    decreaseButton.click();
    expect(address.dispatchEvent).toHaveBeenCalledWith(new CustomEvent('change', {detail: {value: -10, source: element._instance}}));
    address.dispatchEvent.calls.reset();
    decreaseButton.click();
    expect(address.dispatchEvent).toHaveBeenCalledWith(new CustomEvent('change', {detail: {value: -10, source: element._instance}}));
    address.dispatchEvent.calls.reset();
  });

  it('should handle status updates', function() {
    const element = this.createTileWidgetWithComponent('cv-spinner', {}, '<cv-address>test</cv-address>');
    cv.data.Model.getInstance().onUpdate('test', 10);
    expect(element.querySelector('.value').textContent).toBe('10');
  });
});
