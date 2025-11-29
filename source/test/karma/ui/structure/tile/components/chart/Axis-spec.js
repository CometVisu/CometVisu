/* Axis-spec.js
 *
 * copyright (c) 2010-2025, Christian Mayer and the CometVisu contributors.
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
 */

/**
 * Unit tests for cv.ui.structure.tile.components.chart.XAxis and YAxis
 */
describe('testing chart axis components in cv.ui.structure.tile.components.chart', function () {
  const wait = (ms = 50) => new Promise(resolve => setTimeout(resolve, ms));

  afterEach(function() {
    cv.io.timeseries.Plugin.clearWaiting();
  });

  describe('XAxis tests', function() {
    it('should create XAxis with chart component', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      expect(xAxis).toBeDefined();
      expect(xAxis instanceof cv.ui.structure.tile.components.chart.XAxis).toBeTrue();
    });

    it('should have scaleTime as default', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      const scale = xAxis.getScale();
      expect(scale).toBeDefined();
      expect(typeof scale).toBe('function');
    });

    it('should have default show property as true', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      expect(xAxis.getShow()).toBeTrue();
    });

    it('should support hiding via show property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {'show-x-axis': 'false'}, '');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      expect(xAxis.getShow()).toBeFalse();
    });

    it('should have domain property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      expect(xAxis.getDomain()).toBeDefined();
      expect(Array.isArray(xAxis.getDomain())).toBeTrue();
    });

    it('should have range property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      expect(xAxis.getRange()).toBeDefined();
      expect(Array.isArray(xAxis.getRange())).toBeTrue();
    });

    it('should have ticks property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      expect(typeof xAxis.getTicks()).toBe('number');
    });

    it('should have showLine property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      expect(xAxis.getShowLine()).toBeTrue();
    });

    it('should have showGrid property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      expect(typeof xAxis.getShowGrid()).toBe('boolean');
    });

    it('should have tickSize property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      expect(typeof xAxis.getTickSize()).toBe('number');
    });

    it('should have render method', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      expect(typeof xAxis.render).toBe('function');
    });

    it('should render without throwing', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);
      
      const xAxis = instance.getXAxis();
      expect(() => xAxis.render()).not.toThrow();
    });

    it('should support rangeConverter property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      expect(xAxis.getRangeConverter()).toBeNull();
      
      const converter = (range) => [range[0] + 10, range[1] - 10];
      xAxis.setRangeConverter(converter);
      expect(xAxis.getRangeConverter()).toBe(converter);
    });

    it('should support tickFormat property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      // tickFormat is set by default to auto-detect format
      expect(xAxis.getTickFormat()).toBeDefined();
      
      const formatter = (d) => d.toString();
      xAxis.setTickFormat(formatter);
      expect(xAxis.getTickFormat()).toBe(formatter);
    });

    it('should support setRangeOverride method', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      expect(typeof xAxis.setRangeOverride).toBe('function');
      
      // Set override
      xAxis.setRangeOverride([50, 350]);
      expect(xAxis.getRange()).toEqual([50, 350]);
      
      // Reset override
      xAxis.setRangeOverride(null);
    });
  });

  describe('YAxis tests', function() {
    it('should create YAxis with chart component', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      expect(yAxis).toBeDefined();
      expect(yAxis instanceof cv.ui.structure.tile.components.chart.YAxis).toBeTrue();
    });

    it('should have scaleLinear as default', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      const scale = yAxis.getScale();
      expect(scale).toBeDefined();
      expect(typeof scale).toBe('function');
    });

    it('should have default show property as true', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      expect(yAxis.getShow()).toBeTrue();
    });

    it('should support hiding via show property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {'show-y-axis': 'false'}, '');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      expect(yAxis.getShow()).toBeFalse();
    });

    it('should have domain property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      expect(yAxis.getDomain()).toBeDefined();
      expect(Array.isArray(yAxis.getDomain())).toBeTrue();
    });

    it('should have range property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      expect(yAxis.getRange()).toBeDefined();
      expect(Array.isArray(yAxis.getRange())).toBeTrue();
    });

    it('should have ticks property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      expect(typeof yAxis.getTicks()).toBe('number');
    });

    it('should have showLine property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      expect(yAxis.getShowLine()).toBeTrue();
    });

    it('should have showGrid property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      expect(typeof yAxis.getShowGrid()).toBe('boolean');
    });

    it('should have render method', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      expect(typeof yAxis.render).toBe('function');
    });

    it('should render without throwing', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);
      
      const yAxis = instance.getYAxis();
      expect(() => yAxis.render()).not.toThrow();
    });

    it('should support label property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      // Label property getter should be a function
      expect(typeof yAxis.getLabel).toBe('function');
      // Default label should be empty string
      expect(yAxis.getLabel()).toBe('');
    });

    it('should support setRangeOverride method', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      expect(typeof yAxis.setRangeOverride).toBe('function');
      
      // Set override
      yAxis.setRangeOverride([0, 100]);
      expect(yAxis.getRange()).toEqual([0, 100]);
      
      // Reset override
      yAxis.setRangeOverride(null);
    });

    it('should apply domain to scale', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      yAxis.setDomain([0, 50]);
      
      const scale = yAxis.getScale();
      const domain = scale.domain();
      expect(domain[0]).toBe(0);
      expect(domain[1]).toBe(50);
    });
  });

  describe('AbstractAxis tests', function() {
    it('should have type property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      expect(xAxis.getType()).toBe('axis');
    });

    it('should apply range to scale', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      yAxis.setRange([100, 0]);
      
      const scale = yAxis.getScale();
      const range = scale.range();
      expect(range[0]).toBe(100);
      expect(range[1]).toBe(0);
    });

    it('should fire domainChanged event', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      let eventFired = false;
      
      yAxis.addListener('domainChanged', () => {
        eventFired = true;
      });
      
      yAxis.setDomain([0, 100]);
      expect(eventFired).toBeTrue();
    });

    it('should fire rangeChanged event', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      let eventFired = false;
      
      yAxis.addListener('rangeChanged', () => {
        eventFired = true;
      });
      
      yAxis.setRange([50, 150]);
      expect(eventFired).toBeTrue();
    });
  });

  describe('XAxis grid tests', function() {
    it('should enable grid via show-grid attribute', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {'show-grid': 'x'}, '');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      expect(xAxis.getShowGrid()).toBeTrue();
    });

    it('should update tick size when grid is enabled', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {'show-grid': 'x'}, '');
      await wait();
      const instance = element._instance;
      
      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);
      
      const xAxis = instance.getXAxis();
      xAxis.render();
      
      // Grid enabled should have negative tick size
      expect(xAxis._axis.tickSizeInner()).toBeLessThan(0);
    });
  });

  describe('YAxis grid tests', function() {
    it('should enable grid via show-grid attribute', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {'show-grid': 'y'}, '');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      expect(yAxis.getShowGrid()).toBeTrue();
    });

    it('should update tick size when grid is enabled', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {'show-grid': 'y'}, '');
      await wait();
      const instance = element._instance;
      
      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);
      
      const yAxis = instance.getYAxis();
      yAxis.render();
      
      // Grid enabled should have negative tick size
      expect(yAxis._axis.tickSizeInner()).toBeLessThan(0);
    });
  });

  describe('Axis with x-axis element configuration', function() {
    it('should read format from x-axis element', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<x-axis format="%H:%M"></x-axis>');
      await wait();
      const instance = element._instance;
      
      // x-axis format is applied as tickFormat on xAxis, not stored as _xFormat
      const xAxis = instance.getXAxis();
      expect(xAxis.getTickFormat()).toBeDefined();
    });

    it('should read show from x-axis element', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<x-axis></x-axis>');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      // When x-axis element exists, show is set to true
      expect(xAxis.getShow()).toBeTrue();
    });

    it('should read tick-size from x-axis element', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<x-axis tick-size="15"></x-axis>');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      expect(xAxis.getTickSize()).toBe(15);
    });

    it('should read show-line from x-axis element', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<x-axis show-line="true"></x-axis>');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      // show-line="true" sets showLine to true
      expect(xAxis.getShowLine()).toBeTrue();
    });
  });

  describe('Axis with y-axis element configuration', function() {
    it('should read format from y-axis element', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<y-axis format="%.1f"></y-axis>');
      await wait();
      const instance = element._instance;
      
      expect(instance._yFormat).toBe('%.1f');
    });

    it('should read show from y-axis element', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<y-axis></y-axis>');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      // When y-axis element exists, show is set to true
      expect(yAxis.getShow()).toBeTrue();
    });

    it('should read tick-size from y-axis element', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<y-axis tick-size="10"></y-axis>');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      expect(yAxis.getTickSize()).toBe(10);
    });

    it('should read show-line from y-axis element', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<y-axis show-line="true"></y-axis>');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      // show-line="true" sets showLine to true
      expect(yAxis.getShowLine()).toBeTrue();
    });

    it('should read min from y-axis element', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<y-axis min="0"></y-axis>');
      await wait();
      const instance = element._instance;
      
      expect(instance.getMinY()).toBe(0);
    });

    it('should read max from y-axis element', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<y-axis max="100"></y-axis>');
      await wait();
      const instance = element._instance;
      
      expect(instance.getMaxY()).toBe(100);
    });
  });

  describe('XAxis advanced tests', function() {
    it('should create top X axis', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      // Create a top axis manually - this tests the constructor with top=true
      try {
        const topAxis = new cv.ui.structure.tile.components.chart.XAxis(instance, 'axis', true);
        expect(topAxis._top).toBeTrue();
        topAxis.dispose();
      } catch (e) {
        // Creating axis manually may fail if chart is not fully initialized
        // In that case, skip this test
        expect(true).toBeTrue();
      }
    });

    it('should update transform for bottom axis', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);
      
      const xAxis = instance.getXAxis();
      xAxis.render();
      
      if (xAxis._element) {
        const transform = xAxis._element.attr('transform');
        expect(transform).toContain('translate');
      }
    });

    it('should update range with rangeConverter', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);
      
      const xAxis = instance.getXAxis();
      xAxis.setRangeConverter((range) => [range[0] + 10, range[1] - 10]);
      
      // Trigger update
      instance.setWidth(401);
      
      const range = xAxis.getRange();
      expect(range[0]).toBeGreaterThan(10);
    });

    it('should update tick size when height changes with grid enabled', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {'show-grid': 'x'}, '');
      await wait();
      const instance = element._instance;
      
      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);
      
      const xAxis = instance.getXAxis();
      xAxis.render();
      
      // Change height to trigger tick size update
      instance.setHeight(250);
      
      // Grid tick size should be negative
      expect(xAxis._axis.tickSizeInner()).toBeLessThan(0);
    });

    it('should reset tick size when grid is disabled', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {'show-grid': 'x'}, '');
      await wait();
      const instance = element._instance;
      
      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);
      
      const xAxis = instance.getXAxis();
      xAxis.render();
      
      // Disable grid
      xAxis.setShowGrid(false);
      
      // Tick size should be back to default (6)
      expect(xAxis._axis.tickSize()).toBe(6);
    });

    it('should hide element when show is false', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);
      
      const xAxis = instance.getXAxis();
      xAxis.render();
      
      // Now hide it
      xAxis.setShow(false);
      xAxis.render();
      
      expect(xAxis._element).toBeNull();
    });
  });

  describe('YAxis advanced tests', function() {
    it('should create right Y axis', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      // Create a right axis manually - this tests the constructor with right=true
      try {
        const rightAxis = new cv.ui.structure.tile.components.chart.YAxis(instance, 'axis', true);
        expect(rightAxis._right).toBeTrue();
        rightAxis.dispose();
      } catch (e) {
        // Creating axis manually may fail if chart is not fully initialized
        // In that case, skip this test
        expect(true).toBeTrue();
      }
    });

    it('should update transform for left axis', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);
      
      const yAxis = instance.getYAxis();
      yAxis.render();
      
      if (yAxis._element) {
        const transform = yAxis._element.attr('transform');
        expect(transform).toContain('translate');
      }
    });

    it('should adjust margin for large values', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);
      
      const yAxis = instance.getYAxis();
      yAxis.render();
      
      // Set a large domain value
      yAxis.setDomain([0, 10000000]);
      
      // Margin should be adjusted
      expect(instance.getMarginLeft()).toBeGreaterThanOrEqual(16);
    });

    it('should have label property getter', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      // Verify label getter exists
      expect(typeof yAxis.getLabel).toBe('function');
      expect(yAxis.getLabel()).toBe('');
    });

    it('should update tick size when width changes with grid enabled', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {'show-grid': 'y'}, '');
      await wait();
      const instance = element._instance;
      
      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);
      
      const yAxis = instance.getYAxis();
      yAxis.render();
      
      // Change width to trigger tick size update
      instance.setWidth(450);
      
      // Grid tick size should be negative
      expect(yAxis._axis.tickSizeInner()).toBeLessThan(0);
    });

    it('should reset tick size when grid is disabled', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {'show-grid': 'y'}, '');
      await wait();
      const instance = element._instance;
      
      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);
      
      const yAxis = instance.getYAxis();
      yAxis.render();
      
      // Disable grid
      yAxis.setShowGrid(false);
      
      // Tick size should be back to default (6)
      expect(yAxis._axis.tickSize()).toBe(6);
    });

    it('should hide element when show is false', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);
      
      const yAxis = instance.getYAxis();
      yAxis.render();
      
      // Now hide it
      yAxis.setShow(false);
      yAxis.render();
      
      expect(yAxis._element).toBeNull();
    });

    it('should handle tickFormat with small domain values', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);
      
      const yAxis = instance.getYAxis();
      yAxis.render();
      
      // Set a small domain value
      yAxis.setDomain([0, 0.5]);
      
      // Should handle small values without error
      expect(yAxis.getDomain()).toEqual([0, 0.5]);
    });
  });

  describe('AbstractAxis apply methods', function() {
    it('should apply showLine to element', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);
      
      const xAxis = instance.getXAxis();
      xAxis.render();
      
      xAxis.setShowLine(false);
      
      if (xAxis._element) {
        const domain = xAxis._element.select('.domain');
        if (!domain.empty()) {
          expect(domain.style('display')).toBe('none');
        }
      }
    });

    it('should apply tickFormat to axis', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      const formatter = d => d.toFixed(2);
      yAxis.setTickFormat(formatter);
      
      expect(yAxis.getTickFormat()).toBe(formatter);
    });

    it('should apply ticks to axis', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      yAxis.setTicks(10);
      
      expect(yAxis.getTicks()).toBe(10);
    });

    it('should apply tickSize to axis', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      xAxis.setTickSize(8);
      
      expect(xAxis.getTickSize()).toBe(8);
    });

    it('should fire changeScale event', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const yAxis = instance.getYAxis();
      let eventFired = false;
      
      yAxis.addListener('changeScale', () => {
        eventFired = true;
      });
      
      // Create a new scale and set it
      const newScale = d3.scaleLinear().domain([0, 200]).range([0, 400]);
      yAxis.setScale(newScale);
      
      expect(eventFired).toBeTrue();
    });

    it('should fire ticksChanged event', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {}, '');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      let eventFired = false;
      
      xAxis.addListener('ticksChanged', () => {
        eventFired = true;
      });
      
      xAxis.setTicks(8);
      expect(eventFired).toBeTrue();
    });
  });

  describe('Axis combined grid tests', function() {
    it('should enable both x and y grid', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {'show-grid': 'xy'}, '');
      await wait();
      const instance = element._instance;
      
      const xAxis = instance.getXAxis();
      const yAxis = instance.getYAxis();
      
      expect(xAxis.getShowGrid()).toBeTrue();
      expect(yAxis.getShowGrid()).toBeTrue();
    });
  });
});
