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
 * Unit tests for <cv-listitem> component
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-listitem> component of the tile structure', () => {
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
  
    it('should create a default list-item', function() {
      const element = this.createTileWidgetWithComponent('cv-listitem', {}, '');
      expect(element).toBeDefined();
      expect(element.tagName).toBe('CV-LISTITEM');
      expect(element._instance instanceof cv.ui.structure.tile.components.ListItem).toBe(true);
      spyOn(element, 'dispatchEvent');
      element.fireEvent('test', '1');
      expect(element.dispatchEvent).toHaveBeenCalled();
      const ev = element.dispatchEvent.calls.mostRecent().args[0];
      expect(ev.detail).toEqual({
        value: '1',
        source: element._instance
      });
    });
  });
  