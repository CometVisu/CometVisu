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
 * Unit tests for <cv-round-progress> component
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-round-progress> component of the tile structure', () => {
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

  for (const type of ['circle', 'semiCircle']) {
    it('should create a '+type+' round-progress', function() {
      const element = this.createTileWidgetWithComponent('cv-round-progress', {
        type: type
      }, '');
      expect(element).not.toBeNull();
      expect(element.tagName).toBe('CV-ROUND-PROGRESS');
      expect(element._instance instanceof cv.ui.structure.tile.components.RoundProgress).toBe(true);

      // check content
      expect(element.querySelector(`svg[type="${type}"]`)).not.toBeNull();
      expect(element.querySelector(`label`)).not.toBeNull();
    });

    it('should create a '+type+' round-progress with back- and foreground color', function() {
      const element = this.createTileWidgetWithComponent('cv-round-progress', {
        type: type,
        'background-color': 'black',
        'foreground-color': 'red'
      }, '');

      expect(element.querySelector(`svg .bg`).style.stroke).toBe('black');
      expect(element.querySelector(`svg .bar`).style.stroke).toBe('red');
    });

    it('should create a '+type+' round-progress with no background', function() {
      const element = this.createTileWidgetWithComponent('cv-round-progress', {
        type: type,
        'no-background': true
      }, '');

      // check content
      expect(element.querySelector(`svg .bg`)).toBeNull();
    });

    it('should create a '+type+' round-progress with min and max values', function() {
      const element = this.createTileWidgetWithComponent('cv-round-progress', {
        type: type,
        min: 10,
        max: 50
      }, '');

      // check content
      expect(element._instance.getMin()).toBe(10);
      expect(element._instance.getMax()).toBe(50);
    });

    it('should create a '+type+' round-progress that handles cell-width changes', function() {
      const element = this.createTileWidgetWithComponent('cv-round-progress', {
        type: type
      }, '');

      const svg = element.querySelector(`svg`);

      if (type === 'circle') {
        expect(svg.getAttribute('height')).toBe('' + 56 * 2);
      } else {
        expect(svg.getAttribute('height')).toBe('' + 56);
      }
      expect(svg.getAttribute('width')).toBe('' + 56*2);

      qx.event.message.Bus.dispatchByName('cv.design.tile.cellWidthChanged', 40);
      if (type === 'circle') {
        expect(svg.getAttribute('height')).toBe('' + 40 * 2);
      } else {
        expect(svg.getAttribute('height')).toBe('' + 40);
      }
      expect(svg.getAttribute('width')).toBe('' + 40*2);
    });

    it('should create a '+type+' round-progress that set its progress', function() {
      const element = this.createTileWidgetWithComponent('cv-round-progress', {
        type: type
      }, '');

      const valueElement = element.querySelector(`svg .bar`);
      const rp = element._instance;

      // we do not check for exact values, just that something has changed
      if (type === 'circle') {
        const old = valueElement.getAttribute('stroke-dashoffset');
        rp.setProgress(50);
        expect(valueElement.getAttribute('stroke-dashoffset')).not.toBe(old);
      } else {
        const old = valueElement.getAttribute('d');
        rp.setProgress(50);
        expect(valueElement.getAttribute('d')).not.toBe(old);
      }
    });

    it('should create a '+type+' round-progress with a text', function() {
      const element = this.createTileWidgetWithComponent('cv-round-progress', {
        type: type
      }, '');

      const label = element.querySelector(`label`);
      const rp = element._instance;
      rp.setVisible(true);

      rp.setText('Test');
      expect(label.textContent).toBe('Test');
      expect(label.style.fontSize).toBe('16px');

      // check that longer texts are squeezed into the space by reducing the font-size
      rp.setText('This is a longer text');
      expect(label.textContent).toBe('This is a longer text');
      expect(label.style.fontSize).toBe('9px');

      rp.setText('');
      expect(label.textContent).toBe('');
      expect(label.style.fontSize).toBe('16px');
    });
  }

});
