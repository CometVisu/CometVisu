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
 * Unit tests for <cv-icon> component
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-icon> component of the tile structure', () => {
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
  
    it('should create an icon from textContent', function() {
      const element = this.createTileWidgetWithComponent('cv-icon', {}, 'test-icon');
      expect(element).not.toBeNull();
      expect(element.tagName).toBe('CV-ICON');
      expect(element._instance instanceof cv.ui.structure.tile.components.Icon).toBe(true);
      expect(element.textContent).toBe('');
      expect(element._instance.getId()).toBe('test-icon');
      expect(element.classList.contains('test-icon')).toBe(true);
    });

    it('should create an icon from class', function() {
      const element = this.createTileWidgetWithComponent('cv-icon', {class: 'knxuf-test'}, '');
      expect(element._instance.getId()).toBe('knxuf-test');
    });

    it('should not use invalid icon id', function() {
      const element = this.createTileWidgetWithComponent('cv-icon', {class: 'unknown-test'}, '');
      expect(element._instance.getId()).toBeNull();

      // spaces are not allowed
      element._instance.setId('test icon');
      expect(element._instance.getId()).toBeNull();
    });

    it('should change icon color', function() {
      const element = this.createTileWidgetWithComponent('cv-icon', {class: 'knxuf-test'}, '');
      element._instance.setColor('red');
      expect(element.classList.contains('red')).toBe(true);

      element._instance.setColor('#000000');
      expect(element.style.color).toBe('rgb(0, 0, 0)');
      expect(element.classList.contains('red')).toBe(false);
    });
  });
