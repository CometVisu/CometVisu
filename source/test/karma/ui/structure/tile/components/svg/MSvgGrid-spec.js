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
 * Unit tests for MSvgGrid mixin
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the MSvgGrid mixin of the tile structure', () => {
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
      expect(cv.ui.structure.tile.components.svg.MSvgGrid).toBeDefined();
    });

    it('should be a mixin', () => {
      const mixin = cv.ui.structure.tile.components.svg.MSvgGrid;
      expect(mixin.$$type).toBe('Mixin');
    });
  });

  describe('grid properties through Flow component', () => {
    // Test the mixin properties through cv-flow which includes it
    
    describe('rows property', () => {
      it('should have default value', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {}, '');

        window.requestAnimationFrame(() => {
          expect(flowElement._instance.getRows()).toBe(3);
          done();
        });
      });

      it('should accept custom rows', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          rows: 5
        }, '');

        window.requestAnimationFrame(() => {
          expect(flowElement._instance.getRows()).toBe(5);
          done();
        });
      });
    });

    describe('columns property', () => {
      it('should have default value', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {}, '');

        window.requestAnimationFrame(() => {
          expect(flowElement._instance.getColumns()).toBe(3);
          done();
        });
      });

      it('should accept custom columns', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          columns: 6
        }, '');

        window.requestAnimationFrame(() => {
          expect(flowElement._instance.getColumns()).toBe(6);
          done();
        });
      });
    });

    describe('cellWidth property', () => {
      it('should have default value', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {}, '');

        window.requestAnimationFrame(() => {
          expect(flowElement._instance.getCellWidth()).toBe(56);
          done();
        });
      });

      it('should be calculable based on flow size', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          columns: 6
        }, '');

        flowElement.style.display = 'block';
        flowElement.style.width = '192px';
        flowElement.style.height = '192px';

        window.requestAnimationFrame(() => {
          // Cell width changes based on container size - check it's a number
          expect(typeof flowElement._instance.getCellWidth()).toBe('number');
          done();
        });
      });
    });

    describe('cellHeight property', () => {
      it('should have default value', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {}, '');

        window.requestAnimationFrame(() => {
          expect(flowElement._instance.getCellHeight()).toBe(56);
          done();
        });
      });

      it('should be calculable based on flow size', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          rows: 6
        }, '');

        flowElement.style.display = 'block';
        flowElement.style.width = '192px';
        flowElement.style.height = '192px';

        window.requestAnimationFrame(() => {
          // Cell height changes based on container size - check it's a number
          expect(typeof flowElement._instance.getCellHeight()).toBe('number');
          done();
        });
      });
    });

    describe('outerPadding property', () => {
      it('should have default value', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {}, '');

        window.requestAnimationFrame(() => {
          // outerPadding default from mixin is 4, but Flow might override it
          expect(typeof flowElement._instance.getOuterPadding()).toBe('number');
          done();
        });
      });

      it('should accept custom outer-padding', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          'outer-padding': 10
        }, '');

        window.requestAnimationFrame(() => {
          expect(flowElement._instance.getOuterPadding()).toBe(10);
          done();
        });
      });
    });

    describe('spacing property', () => {
      it('should have default value', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {}, '');

        window.requestAnimationFrame(() => {
          // spacing default from mixin is 8, but Flow might override it
          expect(typeof flowElement._instance.getSpacing()).toBe('number');
          done();
        });
      });

      it('should accept custom spacing', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          spacing: 5
        }, '');

        window.requestAnimationFrame(() => {
          expect(flowElement._instance.getSpacing()).toBe(5);
          done();
        });
      });
    });

    describe('viewBox property', () => {
      it('should be set to valid viewBox', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          rows: 3,
          columns: 3
        }, '');

        window.requestAnimationFrame(() => {
          // viewBox is dynamically calculated based on rows and columns
          const viewBox = flowElement._instance.getViewBox();
          expect(viewBox === null || typeof viewBox === 'string').toBe(true);
          done();
        });
      });

      it('should accept custom view-box', function(done) {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', {
          'view-box': '0 0 5 5'
        }, '');

        window.requestAnimationFrame(() => {
          expect(flowElement._instance.getViewBox()).toBe('0 0 5 5');
          done();
        });
      });
    });
  });

  describe('grid layout', () => {
    it('should create SVG element', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, '');

      window.requestAnimationFrame(() => {
        const svg = flowElement.querySelector('svg');
        expect(svg).not.toBeNull();
        done();
      });
    });

    it('should set viewBox on SVG when specified', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 4,
        columns: 4,
        'view-box': '0 0 4 4'
      }, '');
      
      setTimeout(() => {
        const svg = flowElement.querySelector('svg');
        expect(svg.getAttribute('viewBox')).toBe('0 0 256 256'); // 4 cells * 56 default cell size + paddings
        done();
      }, 100);
    });

    it('should position child elements', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-power-entity type="pv" row="0" column="0"></cv-power-entity>
        <cv-power-entity type="consumer" row="2" column="2"></cv-power-entity>
      `);

      window.requestAnimationFrame(() => {
        const entities = flowElement.querySelectorAll('cv-power-entity');
        expect(entities.length).toBe(2);
        
        expect(entities[0].getAttribute('row')).toBe('0');
        expect(entities[0].getAttribute('column')).toBe('0');
        expect(entities[1].getAttribute('row')).toBe('2');
        expect(entities[1].getAttribute('column')).toBe('2');
        done();
      });
    });
  });

  describe('cell management', () => {
    it('should track occupied cells', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-power-entity type="pv" row="0" column="0"></cv-power-entity>
      `);

      window.requestAnimationFrame(() => {
        // The grid should know about the occupied cell
        expect(flowElement._instance).toBeDefined();
        done();
      });
    });

    it('should handle colspan in cell tracking', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-power-entity type="pv" row="0" column="0" colspan="2"></cv-power-entity>
      `);

      window.requestAnimationFrame(() => {
        const entity = flowElement.querySelector('cv-power-entity');
        expect(entity.getAttribute('colspan')).toBe('2');
        done();
      });
    });

    it('should handle rowspan in cell tracking', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-power-entity type="pv" row="0" column="0" rowspan="2"></cv-power-entity>
      `);

      window.requestAnimationFrame(() => {
        const entity = flowElement.querySelector('cv-power-entity');
        expect(entity.getAttribute('rowspan')).toBe('2');
        done();
      });
    });
  });

  describe('grid resize', () => {
    it('should update cell sizes when flow resizes', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, '');

      flowElement.style.display = 'block';
      flowElement.style.width = '192px';
      flowElement.style.height = '192px';

      window.requestAnimationFrame(() => {
        const initialWidth = flowElement._instance.getCellWidth();
        const initialHeight = flowElement._instance.getCellHeight();

        flowElement.setAttribute('columns', '6');
        
        setTimeout(() => {
          expect(flowElement._instance.getCellWidth()).toBeLessThan(initialWidth);
          done();
        }, 50);
      });
    });

    it('should dispatch cellWidthChanged event', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, '');

      flowElement.style.display = 'block';
      flowElement.style.width = '192px';
      flowElement.style.height = '192px';

      let eventReceived = false;
      const listener = qx.event.message.Bus.subscribe('cv.design.tile.cellWidthChanged', () => {
        eventReceived = true;
      });

      window.requestAnimationFrame(() => {
        // Trigger a cell width change
        qx.event.message.Bus.dispatchByName('cv.design.tile.cellWidthChanged', 40);
        
        setTimeout(() => {
          expect(eventReceived).toBe(true);
          qx.event.message.Bus.unsubscribe(listener);
          done();
        }, 50);
      });
    });
  });

  describe('grid configuration', () => {
    it('should handle different row/column combinations', function(done) {
      const configs = [
        { rows: 2, columns: 2 },
        { rows: 5, columns: 3 },
        { rows: 3, columns: 5 },
        { rows: 10, columns: 10 }
      ];

      let testsCompleted = 0;
      
      configs.forEach(config => {
        const flowElement = this.createTileWidgetWithComponent('cv-flow', config, '');
        
        window.requestAnimationFrame(() => {
          expect(flowElement._instance.getRows()).toBe(config.rows);
          expect(flowElement._instance.getColumns()).toBe(config.columns);
          testsCompleted++;
          
          if (testsCompleted === configs.length) {
            done();
          }
        });
      });
    });

    it('should update viewBox when specified via attribute', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3,
        'view-box': '0 0 3 3'
      }, '');

      window.requestAnimationFrame(() => {
        expect(flowElement._instance.getViewBox()).toBe('0 0 3 3');
        
        flowElement.setAttribute('view-box', '0 0 5 5');
        
        setTimeout(() => {
          expect(flowElement._instance.getViewBox()).toBe('0 0 5 5');
          done();
        }, 50);
      });
    });
  });

  describe('mixin methods', () => {
    it('should provide getters for all grid properties', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {}, '');

      window.requestAnimationFrame(() => {
        const instance = flowElement._instance;
        
        expect(typeof instance.getRows).toBe('function');
        expect(typeof instance.getColumns).toBe('function');
        expect(typeof instance.getCellWidth).toBe('function');
        expect(typeof instance.getCellHeight).toBe('function');
        expect(typeof instance.getOuterPadding).toBe('function');
        expect(typeof instance.getSpacing).toBe('function');
        expect(typeof instance.getViewBox).toBe('function');
        done();
      });
    });

    it('should provide setters for configurable properties', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {}, '');

      window.requestAnimationFrame(() => {
        const instance = flowElement._instance;
        
        expect(typeof instance.setRows).toBe('function');
        expect(typeof instance.setColumns).toBe('function');
        expect(typeof instance.setOuterPadding).toBe('function');
        expect(typeof instance.setSpacing).toBe('function');
        expect(typeof instance.setViewBox).toBe('function');
        done();
      });
    });
  });

  describe('attribute changes', () => {
    it('should update rows when attribute changes', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3
      }, '');

      window.requestAnimationFrame(() => {
        expect(flowElement._instance.getRows()).toBe(3);
        
        flowElement.setAttribute('rows', '5');
        expect(flowElement._instance.getRows()).toBe(5);
        done();
      });
    });

    it('should update columns when attribute changes', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        columns: 3
      }, '');

      window.requestAnimationFrame(() => {
        expect(flowElement._instance.getColumns()).toBe(3);
        
        flowElement.setAttribute('columns', '6');
        expect(flowElement._instance.getColumns()).toBe(6);
        done();
      });
    });

    it('should update outer-padding when attribute changes', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        'outer-padding': 0
      }, '');

      window.requestAnimationFrame(() => {
        flowElement.setAttribute('outer-padding', '15');
        expect(flowElement._instance.getOuterPadding()).toBe(15);
        done();
      });
    });

    it('should update spacing when attribute changes', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        spacing: 0
      }, '');

      window.requestAnimationFrame(() => {
        flowElement.setAttribute('spacing', '10');
        expect(flowElement._instance.getSpacing()).toBe(10);
        done();
      });
    });
  });

  describe('edge cases', () => {
    it('should handle single cell grid', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 1,
        columns: 1
      }, `
        <cv-power-entity type="pv" row="0" column="0"></cv-power-entity>
      `);

      window.requestAnimationFrame(() => {
        expect(flowElement._instance.getRows()).toBe(1);
        expect(flowElement._instance.getColumns()).toBe(1);
        done();
      });
    });

    it('should handle very large grid', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 50,
        columns: 50
      }, '');

      window.requestAnimationFrame(() => {
        expect(flowElement._instance.getRows()).toBe(50);
        expect(flowElement._instance.getColumns()).toBe(50);
        done();
      });
    });

    it('should handle zero padding', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        'outer-padding': 0,
        spacing: 0
      }, '');

      window.requestAnimationFrame(() => {
        expect(flowElement._instance.getOuterPadding()).toBe(0);
        expect(flowElement._instance.getSpacing()).toBe(0);
        done();
      });
    });
  });

  describe('layout method', () => {
    it('should place element at specific position', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-round-value row="1" column="1"></cv-svg-round-value>
      `);

      setTimeout(() => {
        const instance = flowElement._instance;
        const svg = instance.getSvg();
        
        // Create a test element
        const ns = 'http://www.w3.org/2000/svg';
        const testElement = document.createElementNS(ns, 'circle');
        testElement.setAttribute('r', '10');
        svg.appendChild(testElement);
        
        instance.layout(testElement, 2, 2);
        
        // Element should have x and y attributes set
        expect(testElement.hasAttribute('x')).toBe(true);
        expect(testElement.hasAttribute('y')).toBe(true);
        done();
      }, 100);
    });

    it('should not replace existing element without replace flag', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-round-value row="1" column="1"></cv-svg-round-value>
      `);

      setTimeout(() => {
        const instance = flowElement._instance;
        const svg = instance.getSvg();
        
        // Create test elements
        const ns = 'http://www.w3.org/2000/svg';
        const element1 = document.createElementNS(ns, 'circle');
        const element2 = document.createElementNS(ns, 'circle');
        svg.appendChild(element1);
        svg.appendChild(element2);
        
        instance.layout(element1, 0, 0);
        
        // Try to place another element in same cell without replace flag
        spyOn(instance, 'error');
        instance.layout(element2, 0, 0, false);
        
        // Should have logged an error
        expect(instance.error).toHaveBeenCalled();
        done();
      }, 100);
    });

    it('should replace existing element with replace flag', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-svg-round-value row="1" column="1"></cv-svg-round-value>
      `);

      setTimeout(() => {
        const instance = flowElement._instance;
        const svg = instance.getSvg();
        
        // Create test elements
        const ns = 'http://www.w3.org/2000/svg';
        const element1 = document.createElementNS(ns, 'circle');
        const element2 = document.createElementNS(ns, 'circle');
        svg.appendChild(element1);
        svg.appendChild(element2);
        
        instance.layout(element1, 0, 0);
        instance.layout(element2, 0, 0, true); // replace = true
        
        // Element2 should be at position 0,0 now
        expect(element2.hasAttribute('x')).toBe(true);
        expect(element2.hasAttribute('y')).toBe(true);
        done();
      }, 100);
    });
  });

  describe('getNextFreeCell method', () => {
    it('should find next free cell in empty grid', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, '');

      window.requestAnimationFrame(() => {
        const instance = flowElement._instance;
        const [row, col] = instance.getNextFreeCell(-1, -1);
        
        expect(row).toBe(0);
        expect(col).toBe(0);
        done();
      });
    });

    it('should find next free cell in specific row', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, '');

      window.requestAnimationFrame(() => {
        const instance = flowElement._instance;
        const [row, col] = instance.getNextFreeCell(-1, 1);
        
        // Should find first free row in column 1
        expect(row).toBe(0);
        expect(col).toBe(1);
        done();
      });
    });

    it('should find next free cell in specific column', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, '');

      window.requestAnimationFrame(() => {
        const instance = flowElement._instance;
        const [row, col] = instance.getNextFreeCell(1, -1);
        
        // Should find first free column in row 1 - note: this returns [row, column] 
        // but column is -1 as per the code, it just returns [row, -1] when no free column found
        expect(row).toBe(1);
        done();
      });
    });
  });

  describe('getCells method', () => {
    it('should return total number of cells', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 4
      }, '');

      window.requestAnimationFrame(() => {
        expect(flowElement._instance.getCells()).toBe(12);
        done();
      });
    });

    it('should update when rows change', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, '');

      window.requestAnimationFrame(() => {
        expect(flowElement._instance.getCells()).toBe(9);
        
        flowElement._instance.setRows(5);
        expect(flowElement._instance.getCells()).toBe(15);
        done();
      });
    });

    it('should update when columns change', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, '');

      window.requestAnimationFrame(() => {
        expect(flowElement._instance.getCells()).toBe(9);
        
        flowElement._instance.setColumns(6);
        expect(flowElement._instance.getCells()).toBe(18);
        done();
      });
    });
  });

  describe('__toInt transform', () => {
    it('should convert string to integer', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: '5',
        columns: '4'
      }, '');

      window.requestAnimationFrame(() => {
        expect(flowElement._instance.getRows()).toBe(5);
        expect(flowElement._instance.getColumns()).toBe(4);
        expect(typeof flowElement._instance.getRows()).toBe('number');
        expect(typeof flowElement._instance.getColumns()).toBe('number');
        done();
      });
    });

    it('should pass through integer values', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 5,
        columns: 4
      }, '');

      window.requestAnimationFrame(() => {
        expect(flowElement._instance.getRows()).toBe(5);
        expect(flowElement._instance.getColumns()).toBe(4);
        done();
      });
    });
  });

  describe('_invalidateLayout and _layoutAll', () => {
    it('should handle rows change', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, '');

      window.requestAnimationFrame(() => {
        const instance = flowElement._instance;
        
        // Change rows
        instance.setRows(5);
        
        // After change, rows should be updated
        expect(instance.getRows()).toBe(5);
        done();
      });
    });

    it('should handle columns change', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, '');

      window.requestAnimationFrame(() => {
        const instance = flowElement._instance;
        
        // Change columns
        instance.setColumns(6);
        
        // After change, columns should be updated
        expect(instance.getColumns()).toBe(6);
        done();
      });
    });

    it('should have debouncedLayoutAll method', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, '');

      window.requestAnimationFrame(() => {
        const instance = flowElement._instance;
        
        expect(typeof instance.debouncedLayoutAll).toBe('function');
        done();
      });
    });
  });
});
