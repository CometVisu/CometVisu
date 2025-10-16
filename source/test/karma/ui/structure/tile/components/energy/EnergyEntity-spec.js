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
 * Unit tests for cv.ui.structure.tile.components.energy.EnergyEntity <cv-energy-entity> component
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-energy-entity> component of the tile structure', () => {
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

  it('should create a default energy-entity', function() {
    const element = this.createTileWidgetWithComponent('cv-energy-entity', {}, '');
    expect(element).not.toBeNull();
    expect(element.tagName).toBe('CV-ENERGY-ENTITY');
    expect(element._instance instanceof cv.ui.structure.tile.components.energy.EnergyEntity).toBe(true);
    expect(element.getAttribute('format')).toBe('%.2f kWh');
  });

  it('should create a pv energy-entity', function() {
    const element = this.createTileWidgetWithComponent('cv-energy-entity', { type: 'pv'}, '');
    expect(element.getAttribute('icon')).toBe('knxuf-weather_sun');
    expect(element.getAttribute('color')).toBe('var(--pvColor)');
  });

  it('should create a pv energy-entity with custom unit', function() {
    const element = this.createTileWidgetWithComponent('cv-energy-entity', { type: 'pv', unit: 'Wh'}, '');
    expect(element.getAttribute('format')).toBe('%d Wh');
  });

  it('should create a pv energy-entity with Y offset', function() {
    const element = this.createTileWidgetWithComponent('cv-energy-entity', { type: 'pv', direction: 'incoming'}, '');
    element._instance.setOffsetY(10);
    const arrow = element.querySelector('path.energy-direction');
    let match = /translate\(\d+, (\d+)/.exec(arrow.getAttribute('transform'));
    expect(match).not.toBeNull();
    expect(match[1]).toBe('18');
  });


  for (const type of ['battery', 'grid']) {
    it(`should create a directed ${type} energy-entity`, function() {
      const element = this.createTileWidgetWithComponent('cv-energy-entity', { type, direction: 'incoming' }, '');
      const arrow = element.querySelector('path.energy-direction');
      expect(arrow).not.toBeNull();

      let match = /rotate\((-?\d+)/.exec(arrow.getAttribute('transform'));
      expect(match).not.toBeNull();
      expect(match[1]).toBe('90');
      expect(element._instance.getColor()).toBe(`var(--${type}ConsumeColor)`);

      element.setAttribute('direction', 'outgoing');
      match = /rotate\((-?\d+)/.exec(arrow.getAttribute('transform'));
      expect(match[1]).toBe('-90');
      expect(element._instance.getColor()).toBe(`var(--${type}InjectColor)`);

      element.setAttribute('direction', 'none');
      expect(element.querySelector('path.energy-direction')).toBeNull();
      expect(element._instance.getColor()).toBe(`var(--primaryText)`);
    });
  }
});
