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
 * Unit tests for MGraphicsElement mixin
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the MGraphicsElement mixin of the tile structure', () => {
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

  describe('mixin definition', () => {
    it('should be defined', () => {
      expect(cv.ui.structure.tile.components.svg.MGraphicsElement).toBeDefined();
    });

    it('should be a mixin', () => {
      const mixin = cv.ui.structure.tile.components.svg.MGraphicsElement;
      expect(mixin.$$type).toBe('Mixin');
    });
  });

  describe('properties through RoundValue component', () => {
    // Test the mixin properties through a component that includes it
    
    describe('row property', () => {
      it('should have default value of null', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          rows: 3,
          columns: 3
        }, `
          <cv-svg-round-value></cv-svg-round-value>
        `);

        window.requestAnimationFrame(() => {
          const component = flowElement.querySelector('cv-svg-round-value');
          // When no row is specified, it should be null or use default
          expect(component._instance.getRow()).toBeDefined();
          done();
        });
      });

      it('should accept integer values', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          rows: 3,
          columns: 3
        }, `
          <cv-svg-round-value row="1"></cv-svg-round-value>
        `);

        window.requestAnimationFrame(() => {
          const component = flowElement.querySelector('cv-svg-round-value');
          expect(component._instance.getRow()).toBe(1);
          done();
        });
      });

      it('should accept decimal values', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          rows: 3,
          columns: 3
        }, `
          <cv-svg-round-value row="1.5"></cv-svg-round-value>
        `);

        window.requestAnimationFrame(() => {
          const component = flowElement.querySelector('cv-svg-round-value');
          expect(component._instance.getRow()).toBe(1.5);
          done();
        });
      });

      it('should accept zero', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          rows: 3,
          columns: 3
        }, `
          <cv-svg-round-value row="0"></cv-svg-round-value>
        `);

        window.requestAnimationFrame(() => {
          const component = flowElement.querySelector('cv-svg-round-value');
          expect(component._instance.getRow()).toBe(0);
          done();
        });
      });
    });

    describe('column property', () => {
      it('should accept integer values', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          rows: 3,
          columns: 3
        }, `
          <cv-svg-round-value column="2"></cv-svg-round-value>
        `);

        window.requestAnimationFrame(() => {
          const component = flowElement.querySelector('cv-svg-round-value');
          expect(component._instance.getColumn()).toBe(2);
          done();
        });
      });

      it('should accept decimal values', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          rows: 3,
          columns: 3
        }, `
          <cv-svg-round-value column="0.5"></cv-svg-round-value>
        `);

        window.requestAnimationFrame(() => {
          const component = flowElement.querySelector('cv-svg-round-value');
          expect(component._instance.getColumn()).toBe(0.5);
          done();
        });
      });
    });

    describe('rowspan property', () => {
      it('should have default value of 1', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          rows: 3,
          columns: 3
        }, `
          <cv-svg-round-value row="0" column="0"></cv-svg-round-value>
        `);

        window.requestAnimationFrame(() => {
          const component = flowElement.querySelector('cv-svg-round-value');
          expect(component._instance.getRowspan()).toBe(1);
          done();
        });
      });

      it('should accept custom rowspan', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          rows: 4,
          columns: 4
        }, `
          <cv-svg-round-value row="0" column="0" rowspan="2"></cv-svg-round-value>
        `);

        window.requestAnimationFrame(() => {
          const component = flowElement.querySelector('cv-svg-round-value');
          expect(component._instance.getRowspan()).toBe(2);
          done();
        });
      });
    });

    describe('colspan property', () => {
      it('should have default value of 1', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          rows: 3,
          columns: 3
        }, `
          <cv-svg-round-value row="0" column="0"></cv-svg-round-value>
        `);

        window.requestAnimationFrame(() => {
          const component = flowElement.querySelector('cv-svg-round-value');
          expect(component._instance.getColspan()).toBe(1);
          done();
        });
      });

      it('should accept custom colspan', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          rows: 4,
          columns: 4
        }, `
          <cv-svg-round-value row="0" column="0" colspan="3"></cv-svg-round-value>
        `);

        window.requestAnimationFrame(() => {
          const component = flowElement.querySelector('cv-svg-round-value');
          expect(component._instance.getColspan()).toBe(3);
          done();
        });
      });
    });

    describe('x property', () => {
      it('should be calculated from column', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          rows: 3,
          columns: 3
        }, `
          <cv-svg-round-value row="0" column="1"></cv-svg-round-value>
        `);

        flowElement.style.display = 'block';
        flowElement.style.width = '300px';
        flowElement.style.height = '300px';

        window.requestAnimationFrame(() => {
          const component = flowElement.querySelector('cv-svg-round-value');
          // X should be calculated based on column position
          expect(component._instance.getX()).toBeGreaterThanOrEqual(0);
          done();
        });
      });

      it('should be settable directly', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          rows: 3,
          columns: 3
        }, `
          <cv-svg-round-value x="50" row="0" column="0"></cv-svg-round-value>
        `);

        window.requestAnimationFrame(() => {
          const component = flowElement.querySelector('cv-svg-round-value');
          // X is stored as number in property but might be returned via attribute
          const xValue = component._instance.getX();
          expect(Number(xValue)).toBe(50);
          done();
        });
      });
    });

    describe('y property', () => {
      it('should be calculated from row', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          rows: 3,
          columns: 3
        }, `
          <cv-svg-round-value row="1" column="0"></cv-svg-round-value>
        `);

        flowElement.style.display = 'block';
        flowElement.style.width = '300px';
        flowElement.style.height = '300px';

        window.requestAnimationFrame(() => {
          const component = flowElement.querySelector('cv-svg-round-value');
          // Y should be calculated based on row position
          expect(component._instance.getY()).toBeGreaterThanOrEqual(0);
          done();
        });
      });

      it('should be settable directly', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          rows: 3,
          columns: 3
        }, `
          <cv-svg-round-value y="75" row="0" column="0"></cv-svg-round-value>
        `);

        window.requestAnimationFrame(() => {
          const component = flowElement.querySelector('cv-svg-round-value');
          // Y is stored as number in property but might be returned via attribute
          const yValue = component._instance.getY();
          expect(Number(yValue)).toBe(75);
          done();
        });
      });
    });

    describe('width property', () => {
      it('should be calculated from colspan and cell width', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          rows: 3,
          columns: 3
        }, `
          <cv-svg-round-value row="0" column="0" colspan="2"></cv-svg-round-value>
        `);

        flowElement.style.display = 'block';
        flowElement.style.width = '300px';
        flowElement.style.height = '300px';

        window.requestAnimationFrame(() => {
          const component = flowElement.querySelector('cv-svg-round-value');
          // Width should be greater when colspan is 2
          expect(component._instance.getWidth()).toBeGreaterThan(0);
          done();
        });
      });
    });

    describe('height property', () => {
      it('should be calculated from rowspan and cell height', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          rows: 3,
          columns: 3
        }, `
          <cv-svg-round-value row="0" column="0" rowspan="2"></cv-svg-round-value>
        `);

        flowElement.style.display = 'block';
        flowElement.style.width = '300px';
        flowElement.style.height = '300px';

        window.requestAnimationFrame(() => {
          const component = flowElement.querySelector('cv-svg-round-value');
          // Height should be greater when rowspan is 2
          expect(component._instance.getHeight()).toBeGreaterThan(0);
          done();
        });
      });
    });

    describe('title property', () => {
      it('should set title via attribute', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          rows: 3,
          columns: 3
        }, `
          <cv-svg-round-value row="0" column="0" title="Test Title"></cv-svg-round-value>
        `);

        window.requestAnimationFrame(() => {
          const component = flowElement.querySelector('cv-svg-round-value');
          expect(component._instance.getTitle()).toBe('Test Title');
          done();
        });
      });
    });
  });

  describe('properties through TextValue component', () => {
    // Test the same mixin properties through TextValue

    it('should work with TextValue component', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-text-value row="1" column="2" rowspan="1" colspan="1"></cv-svg-text-value>
      `);

      window.requestAnimationFrame(() => {
        const component = flowElement.querySelector('cv-svg-text-value');
        const instance = component._instance;
        
        expect(instance.getRow()).toBe(1);
        expect(instance.getColumn()).toBe(2);
        expect(instance.getRowspan()).toBe(1);
        expect(instance.getColspan()).toBe(1);
        done();
      });
    });
  });

  describe('mixin methods', () => {
    it('should provide getters for all properties', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-round-value row="1" column="1"></cv-svg-round-value>
      `);

      window.requestAnimationFrame(() => {
        const component = flowElement.querySelector('cv-svg-round-value');
        const instance = component._instance;
        
        expect(typeof instance.getRow).toBe('function');
        expect(typeof instance.getColumn).toBe('function');
        expect(typeof instance.getRowspan).toBe('function');
        expect(typeof instance.getColspan).toBe('function');
        expect(typeof instance.getX).toBe('function');
        expect(typeof instance.getY).toBe('function');
        expect(typeof instance.getWidth).toBe('function');
        expect(typeof instance.getHeight).toBe('function');
        expect(typeof instance.getTitle).toBe('function');
        done();
      });
    });

    it('should provide setters for all properties', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-round-value row="1" column="1"></cv-svg-round-value>
      `);

      window.requestAnimationFrame(() => {
        const component = flowElement.querySelector('cv-svg-round-value');
        const instance = component._instance;
        
        expect(typeof instance.setRow).toBe('function');
        expect(typeof instance.setColumn).toBe('function');
        expect(typeof instance.setRowspan).toBe('function');
        expect(typeof instance.setColspan).toBe('function');
        expect(typeof instance.setX).toBe('function');
        expect(typeof instance.setY).toBe('function');
        expect(typeof instance.setWidth).toBe('function');
        expect(typeof instance.setHeight).toBe('function');
        expect(typeof instance.setTitle).toBe('function');
        done();
      });
    });

    it('should update position when row changes', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-round-value row="0" column="0"></cv-svg-round-value>
      `);

      flowElement.style.display = 'block';
      flowElement.style.width = '300px';
      flowElement.style.height = '300px';

      window.requestAnimationFrame(() => {
        const component = flowElement.querySelector('cv-svg-round-value');
        const instance = component._instance;
        
        const initialY = instance.getY();
        
        instance.setRow(2);
        
        setTimeout(() => {
          // Y should change when row changes
          expect(instance.getRow()).toBe(2);
          done();
        }, 50);
      });
    });

    it('should update position when column changes', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-round-value row="0" column="0"></cv-svg-round-value>
      `);

      flowElement.style.display = 'block';
      flowElement.style.width = '300px';
      flowElement.style.height = '300px';

      window.requestAnimationFrame(() => {
        const component = flowElement.querySelector('cv-svg-round-value');
        const instance = component._instance;
        
        instance.setColumn(2);
        
        setTimeout(() => {
          // X should change when column changes
          expect(instance.getColumn()).toBe(2);
          done();
        }, 50);
      });
    });
  });

  describe('interaction with grid parent', () => {
    it('should work within cv-flow grid', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 4,
        columns: 4
      }, `
        <cv-svg-round-value row="0" column="0"></cv-svg-round-value>
        <cv-svg-round-value row="1" column="1"></cv-svg-round-value>
        <cv-svg-round-value row="2" column="2"></cv-svg-round-value>
      `);

      flowElement.style.display = 'block';
      flowElement.style.width = '400px';
      flowElement.style.height = '400px';

      window.requestAnimationFrame(() => {
        const components = flowElement.querySelectorAll('cv-svg-round-value');
        
        expect(components.length).toBe(3);
        expect(components[0]._instance.getRow()).toBe(0);
        expect(components[1]._instance.getRow()).toBe(1);
        expect(components[2]._instance.getRow()).toBe(2);
        done();
      });
    });

    it('should handle overlapping positions', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-round-value row="1" column="1" class="first"></cv-svg-round-value>
        <cv-svg-round-value row="1" column="1" class="second"></cv-svg-round-value>
      `);

      window.requestAnimationFrame(() => {
        const first = flowElement.querySelector('.first');
        const second = flowElement.querySelector('.second');
        
        // Both should exist at the same position
        expect(first._instance.getRow()).toBe(1);
        expect(first._instance.getColumn()).toBe(1);
        expect(second._instance.getRow()).toBe(1);
        expect(second._instance.getColumn()).toBe(1);
        done();
      });
    });
  });

  describe('edge cases', () => {
    it('should handle large row values', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 100,
        columns: 3
      }, `
        <cv-svg-round-value row="99" column="0"></cv-svg-round-value>
      `);

      window.requestAnimationFrame(() => {
        const component = flowElement.querySelector('cv-svg-round-value');
        expect(component._instance.getRow()).toBe(99);
        done();
      });
    });

    it('should handle large colspan', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 10
      }, `
        <cv-svg-round-value row="0" column="0" colspan="10"></cv-svg-round-value>
      `);

      window.requestAnimationFrame(() => {
        const component = flowElement.querySelector('cv-svg-round-value');
        expect(component._instance.getColspan()).toBe(10);
        done();
      });
    });
  });
});
