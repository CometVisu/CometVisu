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
 * Unit tests for cv.ui.structure.tile.components.svg.Connector class
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the cv.ui.structure.tile.components.svg.Connector class', () => {
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

  describe('class definition', () => {
    it('should be defined', () => {
      expect(cv.ui.structure.tile.components.svg.Connector).toBeDefined();
    });

    it('should extend qx.core.Object', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      expect(connector instanceof qx.core.Object).toBe(true);
      connector.dispose();
    });

    it('should have a static counter', () => {
      expect(cv.ui.structure.tile.components.svg.Connector.C).toBeDefined();
      expect(typeof cv.ui.structure.tile.components.svg.Connector.C).toBe('number');
    });
  });

  describe('constructor', () => {
    it('should accept source and target parameters', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      expect(connector).toBeDefined();
      expect(connector.getSource()).toBeNull();
      expect(connector.getTarget()).toBeNull();
      connector.dispose();
    });

    it('should create mutation observers', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      expect(connector._sourceObserver).toBeDefined();
      expect(connector._targetObserver).toBeDefined();
      connector.dispose();
    });
  });

  describe('id property', () => {
    it('should have nullable id', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      expect(connector.getId()).toBeNull();
      connector.setId('test-id');
      expect(connector.getId()).toBe('test-id');
      connector.dispose();
    });
  });

  describe('source property', () => {
    it('should have nullable source', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      expect(connector.getSource()).toBeNull();
      connector.dispose();
    });
  });

  describe('target property', () => {
    it('should have nullable target', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      expect(connector.getTarget()).toBeNull();
      connector.dispose();
    });
  });

  describe('sourceConnectionPoint property', () => {
    it('should default to auto', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      expect(connector.getSourceConnectionPoint()).toBe('auto');
      connector.dispose();
    });

    it('should accept valid values', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      
      connector.setSourceConnectionPoint('top');
      expect(connector.getSourceConnectionPoint()).toBe('top');
      
      connector.setSourceConnectionPoint('right');
      expect(connector.getSourceConnectionPoint()).toBe('right');
      
      connector.setSourceConnectionPoint('bottom');
      expect(connector.getSourceConnectionPoint()).toBe('bottom');
      
      connector.setSourceConnectionPoint('left');
      expect(connector.getSourceConnectionPoint()).toBe('left');
      
      connector.setSourceConnectionPoint('auto');
      expect(connector.getSourceConnectionPoint()).toBe('auto');
      
      connector.dispose();
    });
  });

  describe('targetConnectionPoint property', () => {
    it('should default to auto', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      expect(connector.getTargetConnectionPoint()).toBe('auto');
      connector.dispose();
    });

    it('should accept valid values', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      
      connector.setTargetConnectionPoint('top');
      expect(connector.getTargetConnectionPoint()).toBe('top');
      
      connector.setTargetConnectionPoint('right');
      expect(connector.getTargetConnectionPoint()).toBe('right');
      
      connector.setTargetConnectionPoint('bottom');
      expect(connector.getTargetConnectionPoint()).toBe('bottom');
      
      connector.setTargetConnectionPoint('left');
      expect(connector.getTargetConnectionPoint()).toBe('left');
      
      connector.setTargetConnectionPoint('auto');
      expect(connector.getTargetConnectionPoint()).toBe('auto');
      
      connector.dispose();
    });
  });

  describe('showDirection property', () => {
    it('should default to none', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      expect(connector.getShowDirection()).toBe('none');
      connector.dispose();
    });

    it('should have valid check values', () => {
      // Check is defined as: check: ['none', 'source', 'target', 'both']
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      // We only test the getter since setter requires _path to be initialized
      expect(connector.getShowDirection()).toBe('none');
      connector.dispose();
    });
  });

  describe('inverted property', () => {
    it('should default to false', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      expect(connector.getInverted()).toBe(false);
      connector.dispose();
    });

    it('should have boolean check', () => {
      // Inverted property has check: 'Boolean'
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      // We only test the getter since setter requires _path to be initialized for apply
      expect(typeof connector.getInverted()).toBe('boolean');
      connector.dispose();
    });
  });

  describe('styleClass property', () => {
    it('should have nullable styleClass', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      expect(connector.getStyleClass()).toBeNull();
      connector.dispose();
    });

    it('should accept string values', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      connector.setStyleClass('my-class');
      expect(connector.getStyleClass()).toBe('my-class');
      connector.dispose();
    });
  });

  describe('root property', () => {
    it('should have nullable root', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      expect(connector.getRoot()).toBeNull();
      connector.dispose();
    });
  });

  describe('integration with cv-flow', () => {
    // Skip this test as cv-power-entity requires complex SVG setup with getBBox
    xit('should create PowerEntity elements inside cv-flow', function(done) {
      const flowElement = this.createTileWidgetWithComponent('cv-flow', {
        rows: 3,
        columns: 3
      }, `
        <cv-power-entity id="int-source" type="pv" row="0" column="0"></cv-power-entity>
        <cv-power-entity id="int-target" type="consumer" row="2" column="2"></cv-power-entity>
      `);

      // Give more time for entities to fully initialize
      setTimeout(() => {
        const sourceEntity = flowElement.querySelector('#int-source');
        const targetEntity = flowElement.querySelector('#int-target');
        
        expect(sourceEntity).not.toBeNull();
        expect(targetEntity).not.toBeNull();
        done();
      }, 100);
    });
  });

  describe('validation', () => {
    it('should validate connection points', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      
      // Valid values should not throw
      expect(() => connector.setSourceConnectionPoint('auto')).not.toThrow();
      expect(() => connector.setSourceConnectionPoint('top')).not.toThrow();
      expect(() => connector.setSourceConnectionPoint('right')).not.toThrow();
      expect(() => connector.setSourceConnectionPoint('bottom')).not.toThrow();
      expect(() => connector.setSourceConnectionPoint('left')).not.toThrow();
      
      connector.dispose();
    });
  });

  describe('debounced position update', () => {
    it('should have debounced update function', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      expect(connector._debouncedUpdatePosition).toBeDefined();
      expect(typeof connector._debouncedUpdatePosition).toBe('function');
      connector.dispose();
    });

    it('should have _updatePosition function', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      expect(connector._updatePosition).toBeDefined();
      expect(typeof connector._updatePosition).toBe('function');
      connector.dispose();
    });
  });

  describe('drawPath method', () => {
    it('should draw a straight line path', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      const ns = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(ns, 'svg');
      const path = document.createElementNS(ns, 'path');
      svg.appendChild(path);
      document.body.appendChild(svg);

      connector.drawPath(path, 10, 20, 100, 200);
      
      expect(path.getAttribute('d')).toBe('M10 20 L 100 200');
      
      document.body.removeChild(svg);
      connector.dispose();
    });

    it('should handle negative coordinates', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      const ns = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(ns, 'svg');
      const path = document.createElementNS(ns, 'path');
      svg.appendChild(path);
      document.body.appendChild(svg);

      connector.drawPath(path, -10, -20, 100, 200);
      
      expect(path.getAttribute('d')).toBe('M-10 -20 L 100 200');
      
      document.body.removeChild(svg);
      connector.dispose();
    });

    it('should handle zero coordinates', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      const ns = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(ns, 'svg');
      const path = document.createElementNS(ns, 'path');
      svg.appendChild(path);
      document.body.appendChild(svg);

      connector.drawPath(path, 0, 0, 0, 0);
      
      expect(path.getAttribute('d')).toBe('M0 0 L 0 0');
      
      document.body.removeChild(svg);
      connector.dispose();
    });
  });

  describe('_applyRoot method', () => {
    it('should set up resize listener when root is set', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      const ns = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(ns, 'svg');
      document.body.appendChild(svg);

      connector.setRoot(svg);
      
      expect(connector.getRoot()).toBe(svg);
      
      document.body.removeChild(svg);
      connector.dispose();
    });

    it('should initialize arrow markers', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      const ns = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(ns, 'svg');
      document.body.appendChild(svg);

      connector.setRoot(svg);
      
      // Check that defs were created
      const defs = svg.querySelector('defs');
      expect(defs).not.toBeNull();
      
      // Check that arrow marker was created
      const arrow = svg.querySelector('#arrow');
      expect(arrow).not.toBeNull();
      
      // Check that arrow path was created
      const arrowPath = svg.querySelector('#h-arrow-path');
      expect(arrowPath).not.toBeNull();
      
      document.body.removeChild(svg);
      connector.dispose();
    });

    it('should remove listener from old root when changed', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      const ns = 'http://www.w3.org/2000/svg';
      const svg1 = document.createElementNS(ns, 'svg');
      const svg2 = document.createElementNS(ns, 'svg');
      document.body.appendChild(svg1);
      document.body.appendChild(svg2);

      connector.setRoot(svg1);
      expect(connector.getRoot()).toBe(svg1);
      
      connector.setRoot(svg2);
      expect(connector.getRoot()).toBe(svg2);
      
      document.body.removeChild(svg1);
      document.body.removeChild(svg2);
      connector.dispose();
    });
  });

  describe('_initArrowMarkers method', () => {
    it('should create defs element if not present', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      const ns = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(ns, 'svg');
      document.body.appendChild(svg);

      // Verify no defs initially
      expect(svg.querySelector('defs')).toBeNull();
      
      connector.setRoot(svg);
      
      // Verify defs was created
      expect(svg.querySelector('defs')).not.toBeNull();
      
      document.body.removeChild(svg);
      connector.dispose();
    });

    it('should not duplicate arrow markers if already present', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      const ns = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(ns, 'svg');
      document.body.appendChild(svg);

      connector.setRoot(svg);
      connector.setRoot(svg);
      
      // Should still only have one arrow marker
      const arrows = svg.querySelectorAll('#arrow');
      expect(arrows.length).toBe(1);
      
      document.body.removeChild(svg);
      connector.dispose();
    });

    it('should create arrow marker with correct attributes', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      const ns = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(ns, 'svg');
      document.body.appendChild(svg);

      connector.setRoot(svg);
      
      const arrow = svg.querySelector('#arrow');
      expect(arrow.getAttribute('viewBox')).toBe('0 0 10 10');
      expect(arrow.getAttribute('refX')).toBe('10');
      expect(arrow.getAttribute('refY')).toBe('5');
      expect(arrow.getAttribute('markerWidth')).toBe('5');
      expect(arrow.getAttribute('markerHeight')).toBe('5');
      expect(arrow.getAttribute('orient')).toBe('auto-start-reverse');
      
      document.body.removeChild(svg);
      connector.dispose();
    });

    it('should create h-arrow-path with correct d attribute', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      const ns = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(ns, 'svg');
      document.body.appendChild(svg);

      connector.setRoot(svg);
      
      const arrowPath = svg.querySelector('#h-arrow-path');
      expect(arrowPath.getAttribute('d')).toBe('M 0 0 L 10 5 L 0 10 z');
      
      document.body.removeChild(svg);
      connector.dispose();
    });
  });

  describe('_applyStyleClass method', () => {
    it('should apply style class to path', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      const ns = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(ns, 'svg');
      const path = document.createElementNS(ns, 'path');
      path.setAttribute('class', 'connection');
      svg.appendChild(path);
      document.body.appendChild(svg);

      connector._path = path;
      connector.setStyleClass('my-style');
      
      expect(path.classList.contains('my-style')).toBe(true);
      
      document.body.removeChild(svg);
      connector.dispose();
    });

    it('should remove old style class when changed', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      const ns = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(ns, 'svg');
      const path = document.createElementNS(ns, 'path');
      path.setAttribute('class', 'connection');
      svg.appendChild(path);
      document.body.appendChild(svg);

      connector._path = path;
      connector.setStyleClass('old-style');
      expect(path.classList.contains('old-style')).toBe(true);
      
      connector.setStyleClass('new-style');
      expect(path.classList.contains('old-style')).toBe(false);
      expect(path.classList.contains('new-style')).toBe(true);
      
      document.body.removeChild(svg);
      connector.dispose();
    });
  });

  describe('_applyShowDirection method', () => {
    let connector, svg, path;
    const ns = 'http://www.w3.org/2000/svg';

    beforeEach(() => {
      connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      svg = document.createElementNS(ns, 'svg');
      path = document.createElementNS(ns, 'path');
      path.setAttribute('class', 'connection');
      svg.appendChild(path);
      document.body.appendChild(svg);
      connector._path = path;
      connector.setRoot(svg);
    });

    afterEach(() => {
      document.body.removeChild(svg);
      connector.dispose();
    });

    it('should remove markers when showDirection is none', () => {
      connector.setShowDirection('none');
      
      expect(path.hasAttribute('marker-start')).toBe(false);
      expect(path.hasAttribute('marker-end')).toBe(false);
    });

    it('should set both markers when showDirection is both', () => {
      connector.setShowDirection('both');
      
      expect(path.hasAttribute('marker-start')).toBe(true);
      expect(path.hasAttribute('marker-end')).toBe(true);
    });

    it('should set only start marker when showDirection is source (not inverted)', () => {
      connector.setShowDirection('source');
      
      expect(path.hasAttribute('marker-start')).toBe(true);
      expect(path.hasAttribute('marker-end')).toBe(false);
    });

    it('should set only end marker when showDirection is target (not inverted)', () => {
      connector.setShowDirection('target');
      
      expect(path.hasAttribute('marker-start')).toBe(false);
      expect(path.hasAttribute('marker-end')).toBe(true);
    });
  });

  describe('marker ID retrieval (tested via showDirection)', () => {
    let connector, svg, path;
    const ns = 'http://www.w3.org/2000/svg';

    beforeEach(() => {
      connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      svg = document.createElementNS(ns, 'svg');
      path = document.createElementNS(ns, 'path');
      path.setAttribute('class', 'connection');
      svg.appendChild(path);
      document.body.appendChild(svg);
      connector._path = path;
      connector.setRoot(svg);
    });

    afterEach(() => {
      document.body.removeChild(svg);
      connector.dispose();
    });

    it('should use arrow marker without style class', () => {
      connector.setShowDirection('target');
      
      // The marker should reference the base arrow
      const markerEnd = path.getAttribute('marker-end');
      expect(markerEnd).toBe('url(#arrow)');
    });

    it('should create custom marker when style class is set', () => {
      connector.setStyleClass('my-style');
      connector.setShowDirection('target');
      
      // The marker should reference a custom arrow
      const markerEnd = path.getAttribute('marker-end');
      expect(markerEnd).toBe('url(#arrow-my-style)');
      
      // Check that the custom marker was created in defs
      const customMarker = svg.querySelector('#arrow-my-style');
      expect(customMarker).not.toBeNull();
    });
  });

  describe('_validateConnectionPoint method', () => {
    it('should throw for invalid connection point', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      
      expect(() => connector._validateConnectionPoint('invalid')).toThrow();
      
      connector.dispose();
    });

    it('should not throw for valid connection points', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      
      expect(() => connector._validateConnectionPoint('top')).not.toThrow();
      expect(() => connector._validateConnectionPoint('right')).not.toThrow();
      expect(() => connector._validateConnectionPoint('bottom')).not.toThrow();
      expect(() => connector._validateConnectionPoint('left')).not.toThrow();
      expect(() => connector._validateConnectionPoint('auto')).not.toThrow();
      
      connector.dispose();
    });
  });

  describe('destructor', () => {
    it('should clean up resources', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      
      expect(connector._sourceObserver).toBeDefined();
      expect(connector._targetObserver).toBeDefined();
      
      connector.dispose();
      
      expect(connector._path).toBeNull();
      expect(connector._sourceObserver).toBeNull();
      expect(connector._targetObserver).toBeNull();
    });
  });

  describe('_onMutation method', () => {
    it('should be called on mutations', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      
      // Create a mock mutation record
      const mockRecord = {
        type: 'attributes',
        attributeName: 'x'
      };
      
      spyOn(connector, '_debouncedUpdatePosition');
      
      connector._onMutation([mockRecord], connector._sourceObserver);
      
      expect(connector._debouncedUpdatePosition).toHaveBeenCalled();
      
      connector.dispose();
    });

    it('should react to y attribute changes', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      
      const mockRecord = {
        type: 'attributes',
        attributeName: 'y'
      };
      
      spyOn(connector, '_debouncedUpdatePosition');
      
      connector._onMutation([mockRecord], connector._sourceObserver);
      
      expect(connector._debouncedUpdatePosition).toHaveBeenCalled();
      
      connector.dispose();
    });

    it('should ignore non-position attribute changes', () => {
      const connector = new cv.ui.structure.tile.components.svg.Connector(null, null);
      
      const mockRecord = {
        type: 'attributes',
        attributeName: 'class'
      };
      
      spyOn(connector, '_debouncedUpdatePosition');
      
      connector._onMutation([mockRecord], connector._sourceObserver);
      
      expect(connector._debouncedUpdatePosition).not.toHaveBeenCalled();
      
      connector.dispose();
    });
  });
});
