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
 * Unit tests for <cv-slider> component
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-slider> component of the tile structure', () => {
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

  it('should create a default slider', function() {
    const element = this.createTileWidgetWithComponent('cv-slider', {}, '');
    expect(element).not.toBeNull();
    expect(element.tagName).toBe('CV-SLIDER');
    expect(element.textContent).toBe('');
    expect(element._instance instanceof cv.ui.structure.tile.components.Slider).toBe(true);

    // check content
    expect(element.querySelector('input.slider')).not.toBeNull();
    expect(element.querySelector('label.value')).not.toBeNull();
  });

  it('should create a slider with increase/decrease icons and limits', function() {
    const element = this.createTileWidgetWithComponent('cv-slider', {
      'step-width': 10,
      min: 10,
      max: 50
    }, '<cv-address transform="OH:number">test</cv-address><cv-icon class="decrease">ri-volume-down-line</cv-icon><cv-icon class="increase">ri-volume-up-line</cv-icon>');

    const slider = element._instance;
    expect(slider.getStepWidth()).toBe(10);
    expect(slider.getMin()).toBe(10);
    expect(slider.getMax()).toBe(50);

    // check content
    const dec = element.querySelector('.decrease');
    const inc = element.querySelector('.increase');
    expect(dec).not.toBeNull();
    expect(inc).not.toBeNull();

    const address = element.querySelector('cv-address');
    spyOn(address, 'dispatchEvent');
    inc.click();
    expect(address.dispatchEvent).toHaveBeenCalledWith(new CustomEvent('change', {detail: {value: 20, source: slider}}));
    dec.click();
    expect(address.dispatchEvent).toHaveBeenCalledWith(new CustomEvent('change', {detail: {value: 10, source: slider}}));
  });

  it('should create a slider without value label', function() {
    const element = this.createTileWidgetWithComponent('cv-slider', {'hide-value': true}, '');
    expect(element.querySelector('label.value')).toBeNull();
  });

  it('should handle state updates', function() {
    const element = this.createTileWidgetWithComponent('cv-slider', {}, '<cv-address transform="OH:number">test</cv-address>');
    const input = element.querySelector('input.slider');
    cv.data.Model.getInstance().onUpdate('test', 10);
    expect(input.value).toBe('10');
  });

  it('should create a slider with a throttle-interval', function() {
    const element = this.createTileWidgetWithComponent('cv-slider', {'throttle-interval': 100}, '');
    expect(element._instance.getThrottleInterval()).toBe(100);
  });

});
