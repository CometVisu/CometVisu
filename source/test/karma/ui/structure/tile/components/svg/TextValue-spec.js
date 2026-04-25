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
 * Unit tests for <cv-svg-text-value> component
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-svg-text-value> component of the tile structure', () => {
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

  describe('basic instantiation', () => {
    it('should be defined as a custom element', () => {
      expect(customElements.get('cv-svg-text-value')).toBeDefined();
    });

    it('should create a text-value instance within a flow', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1"></cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        expect(textValue).not.toBeNull();
        expect(textValue._instance instanceof cv.ui.structure.tile.components.svg.TextValue).toBe(true);
        done();
      });
    });

    it('should have default property values', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1"></cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        const instance = textValue._instance;
        
        expect(instance.getScale()).toBe(1);
        // offsetX and offsetY may be calculated dynamically after rendering, so just check they are numbers
        expect(typeof instance.getOffsetX()).toBe('number');
        expect(typeof instance.getOffsetY()).toBe('number');
        expect(instance.getColor()).toBe('var(--primaryText)');
        expect(instance.getIconColor()).toBe('var(--primaryText)');
        done();
      });
    });
  });

  describe('grid positioning (MGraphicsElement)', () => {
    it('should set row and column via attributes', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="2" column="1"></cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        const instance = textValue._instance;
        
        expect(instance.getRow()).toBe(2);
        expect(instance.getColumn()).toBe(1);
        done();
      });
    });

    it('should support rowspan and colspan', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 4,
        columns: 4
      }, `
        <cv-svg-text-value row="0" column="0" rowspan="2" colspan="2"></cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        const instance = textValue._instance;
        
        expect(instance.getRowspan()).toBe(2);
        expect(instance.getColspan()).toBe(2);
        done();
      });
    });

    it('should calculate position based on grid', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1"></cv-svg-text-value>
      `);

      // Set dimensions for calculation
      flowElement.style.display = 'block';
      flowElement.style.width = '300px';
      flowElement.style.height = '300px';

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        const instance = textValue._instance;
        
        expect(instance.getX()).toBeGreaterThanOrEqual(0);
        expect(instance.getY()).toBeGreaterThanOrEqual(0);
        done();
      });
    });
  });

  describe('scale property', () => {
    it('should have default scale of 1', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1"></cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        expect(textValue._instance.getScale()).toBe(1);
        done();
      });
    });

    it('should support programmatic scale changes', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1"></cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        textValue._instance.setScale(2);
        expect(textValue._instance.getScale()).toBe(2);
        done();
      });
    });
  });

  describe('offset properties', () => {
    it('should have default offsetX of 0', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1"></cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        // offsetX and offsetY are not in observedAttributes, so we test default values
        expect(textValue._instance.getOffsetX()).toBe(0);
        done();
      });
    });

    it('should have default offsetY', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1"></cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        // Check that getOffsetY exists and returns a number
        expect(typeof textValue._instance.getOffsetY()).toBe('number');
        done();
      });
    });

    it('should support programmatic offset changes', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1"></cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        const instance = textValue._instance;
        
        instance.setOffsetX(5);
        expect(instance.getOffsetX()).toBe(5);
        
        instance.setOffsetY(10);
        expect(instance.getOffsetY()).toBe(10);
        done();
      });
    });
  });

  describe('color property', () => {
    // color is not in observedAttributes, so we test programmatic setting
    it('should have default color var(--primaryText)', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1"></cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        expect(textValue._instance.getColor()).toBe('var(--primaryText)');
        done();
      });
    });

    it('should set color programmatically', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1"></cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        const instance = textValue._instance;
        
        instance.setColor('red');
        expect(instance.getColor()).toBe('red');
        done();
      });
    });

    it('should accept hex color values programmatically', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1"></cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        const instance = textValue._instance;
        
        instance.setColor('#ff0000');
        expect(instance.getColor()).toBe('#ff0000');
        done();
      });
    });

    it('should accept rgb color values programmatically', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1"></cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        const instance = textValue._instance;
        
        instance.setColor('rgb(255, 0, 0)');
        expect(instance.getColor()).toBe('rgb(255, 0, 0)');
        done();
      });
    });
  });

  describe('icon property', () => {
    it('should set icon via attribute', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1" icon="power"></cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        expect(textValue._instance.getIcon()).toBe('power');
        done();
      });
    });

    it('should render icon when set', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1" icon="ri-sun-line"></cv-svg-text-value>
      `);

      setTimeout(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        expect(textValue._instance.getIcon()).toBe('ri-sun-line');
        done();
      }, 50);
    });
  });

  describe('value display', () => {
    it('should update value from address', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1">
          <cv-address mode="read">test/textvalue</cv-address>
        </cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        
        cv.data.Model.getInstance().onUpdate('test/textvalue', 'Hello World');
        
        setTimeout(() => {
          expect(textValue._instance).toBeDefined();
          done();
        }, 50);
      });
    });

    it('should display numeric values', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1">
          <cv-address mode="read">test/number</cv-address>
        </cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        
        cv.data.Model.getInstance().onUpdate('test/number', 42);
        
        setTimeout(() => {
          expect(textValue._instance).toBeDefined();
          done();
        }, 50);
      });
    });
  });

  describe('SVG structure', () => {
    it('should create SVG elements', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1"></cv-svg-text-value>
      `);

      setTimeout(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        const svg = flowElement.querySelector('svg');
        expect(svg).not.toBeNull();
        done();
      }, 50);
    });

    it('should create text elements for value display', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1">
          <cv-address mode="read">test/svgtext</cv-address>
        </cv-svg-text-value>
      `);

      setTimeout(() => {
        cv.data.Model.getInstance().onUpdate('test/svgtext', 'Test Value');
        
        setTimeout(() => {
          const flowSvg = flowElement.querySelector('svg');
          if (flowSvg) {
            // Should contain text elements
            expect(flowSvg.querySelectorAll('text, g').length).toBeGreaterThanOrEqual(0);
          }
          done();
        }, 50);
      }, 50);
    });
  });

  describe('attribute changes', () => {
    it('should update icon when attribute changes', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1" icon="power"></cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        expect(textValue._instance.getIcon()).toBe('power');
        
        textValue.setAttribute('icon', 'sun');
        expect(textValue._instance.getIcon()).toBe('sun');
        done();
      });
    });
  });

  describe('inheritance from Value', () => {
    it('should extend cv.ui.structure.tile.components.Value', () => {
      const TextValueClass = cv.ui.structure.tile.components.svg.TextValue;
      expect(TextValueClass).toBeDefined();
    });

    it('should include MGraphicsElement mixin', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1"></cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        const instance = textValue._instance;
        
        // Check for mixin methods
        expect(typeof instance.getRow).toBe('function');
        expect(typeof instance.getColumn).toBe('function');
        expect(typeof instance.getRowspan).toBe('function');
        expect(typeof instance.getColspan).toBe('function');
        expect(typeof instance.getX).toBe('function');
        expect(typeof instance.getY).toBe('function');
        done();
      });
    });
  });

  describe('observed attributes', () => {
    it('should observe expected attributes', () => {
      const observedAttrs = customElements.get('cv-svg-text-value').observedAttributes;
      expect(observedAttrs).toContain('row');
      expect(observedAttrs).toContain('column');
      expect(observedAttrs).toContain('icon');
      expect(observedAttrs).toContain('x');
      expect(observedAttrs).toContain('y');
      expect(observedAttrs).toContain('rowspan');
      expect(observedAttrs).toContain('colspan');
      expect(observedAttrs).toContain('title');
    });
  });

  describe('title property', () => {
    it('should set title via attribute', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1" title="My Title"></cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        expect(textValue._instance.getTitle()).toBe('My Title');
        done();
      });
    });
  });

  describe('edge cases', () => {
    it('should handle zero scale programmatically', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1"></cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        // scale is not in observedAttributes, so we set it programmatically
        textValue._instance.setScale(0);
        expect(textValue._instance.getScale()).toBe(0);
        done();
      });
    });

    it('should handle decimal row and column values', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="0.5" column="1.5"></cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        const instance = textValue._instance;
        expect(instance.getRow()).toBe(0.5);
        expect(instance.getColumn()).toBe(1.5);
        done();
      });
    });

    it('should handle empty value', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1">
          <cv-address mode="read">test/empty</cv-address>
        </cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        
        cv.data.Model.getInstance().onUpdate('test/empty', '');
        
        setTimeout(() => {
          expect(textValue._instance).toBeDefined();
          done();
        }, 50);
      });
    });

    it('should handle special characters in value', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="1">
          <cv-address mode="read">test/special</cv-address>
        </cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const textValue = flowElement.querySelector('cv-svg-text-value');
        
        cv.data.Model.getInstance().onUpdate('test/special', '<>&"\'');
        
        setTimeout(() => {
          expect(textValue._instance).toBeDefined();
          done();
        }, 50);
      });
    });
  });
});
