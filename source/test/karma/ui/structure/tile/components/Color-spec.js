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
 * Unit tests for <cv-color> component
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-color> component of the tile structure', () => {
  let oldController;

  beforeEach(function() {
    oldController = cv.Application.structureController;
    cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();
    document.body.classList.remove('loading');
    document.body.innerHTML = '';
    spyOn(qx.event.Timer, 'once').and.callFake(callBack => callBack());
  });

  afterEach(() => {
    cv.Application.structureController = oldController;
    document.body.classList.add('loading');
  });

  it('should create a color component', function() {
    const element = this.createTileWidgetWithComponent('cv-color', {},
      '<cv-address transform="OH:color" variant="hsv">test</cv-address><cv-icon class="value">ri-lightbulb-line</cv-icon>');
    expect(element).not.toBeNull();
    expect(element.tagName).toBe('CV-COLOR');
    expect(element._instance instanceof cv.ui.structure.tile.components.Color).toBe(true);

    // default control is triangle
    expect(element.querySelector('.colorchooser .sv_triangle')).not.toBeNull();

    cv.data.Model.getInstance().onUpdate('test', '0, 0, 0');
    expect(element._instance.getValue()).toBe('#00000000');
    const icon = element.querySelector('.value');
    expect(icon.style.color).toBe('rgb(0, 0, 0)');
    expect(icon.style.opacity).toBe('0.2');
    cv.data.Model.getInstance().onUpdate('test', '120, 60, 50');
    expect(element._instance.getValue()).toBe('#337f3380');
    expect(icon.style.color).toBe('rgb(51, 127, 51)');
    expect(Math.round(parseFloat(icon.style.opacity)*10)/10).toBe(0.5);
  });

  it('should create a color component with some extra settings', function() {
    const element = this.createTileWidgetWithComponent('cv-color', {
       'title': 'Test',
       'controls': 'LCh-box'
       },
      '<cv-address transform="OH:color" variant="hsv">test</cv-address>');

    expect(element.querySelector(':scope > cv-popup').getAttribute('title')).toBe('Test');
    expect(element.querySelector('.colorchooser .lch_hue')).not.toBeNull();
  });

  it('should open the popup on click', function() {
    const element = this.createTileWidgetWithComponent('cv-color', {},'');

    const popupInstance = element.querySelector('cv-popup')._instance;
    spyOn(popupInstance, 'open');
    element.click();
    expect(popupInstance.open).toHaveBeenCalled();
  });
});
