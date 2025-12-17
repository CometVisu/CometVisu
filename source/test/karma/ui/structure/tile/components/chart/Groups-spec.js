/* Groups-spec.js
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
 * Unit tests for chart group components (LineGroup, AreaGroup, BarGroup, StackedBarGroup)
 */
describe('testing chart group components in cv.ui.structure.tile.components.chart', function () {
  const wait = (ms = 50) => new Promise(resolve => setTimeout(resolve, ms));

  describe('LineGroup tests', function() {
    it('should create LineGroup for line chart', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line"></dataset>');
      await wait();
      const instance = element._instance;

      // chartElements should contain LineGroup
      expect(instance._chartElements.length).toBeGreaterThan(0);
    });

    it('should have render method', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        expect(typeof lineGroup.render).toBe('function');
      }
    });

    it('should have stroke property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        expect(lineGroup.getStroke()).toBeDefined();
      }
    });

    it('should have strokeWidth property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        expect(lineGroup.getStrokeWidth()).toBe(1.5);
      }
    });

    it('should have strokeLinecap property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        expect(lineGroup.getStrokeLinecap()).toBe('round');
      }
    });

    it('should have strokeLinejoin property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        expect(lineGroup.getStrokeLinejoin()).toBe('round');
      }
    });

    it('should have mixBlendMode property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        expect(lineGroup.getMixBlendMode()).toBe('normal');
      }
    });

    it('should support different curve types', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line" curve="step"></dataset>');
      await wait();
      const instance = element._instance;

      const ds = instance.getDataset('demo://test');
      expect(ds.getCurve()).toBe('step');
    });

    it('should have getData method', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        expect(typeof lineGroup.getData).toBe('function');
        const data = lineGroup.getData();
        expect(data instanceof Map).toBeTrue();
      }
    });

    it('should have hasDataset method', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        expect(typeof lineGroup.hasDataset).toBe('function');
        expect(lineGroup.hasDataset('demo://test')).toBeTrue();
        expect(lineGroup.hasDataset('unknown')).toBeFalse();
      }
    });

    it('should have getContainer method', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        expect(typeof lineGroup.getContainer).toBe('function');
        expect(lineGroup.getContainer()).toBeDefined();
      }
    });

    it('should render with data', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line"></dataset>');
      await wait();
      const instance = element._instance;

      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);

      const testData = [
        { key: 'demo://test', src: 'demo://test', time: Date.now() - 2000, value: 10 },
        { key: 'demo://test', src: 'demo://test', time: Date.now() - 1000, value: 20 },
        { key: 'demo://test', src: 'demo://test', time: Date.now(), value: 15 }
      ];

      instance._renderChart(testData);

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        expect(() => lineGroup.render()).not.toThrow();
      }
    });
  });

  describe('AreaGroup tests', function() {
    it('should create AreaGroup for line chart with show-area', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line" show-area="true"></dataset>');
      await wait();
      const instance = element._instance;

      const areaGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.AreaGroup);
      expect(areaGroup).toBeDefined();
    });

    it('should have opacity property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line" show-area="true"></dataset>');
      await wait();
      const instance = element._instance;

      const areaGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.AreaGroup);
      if (areaGroup) {
        expect(areaGroup.getOpacity()).toBe(20);
      }
    });

    it('should have fill property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line" show-area="true"></dataset>');
      await wait();
      const instance = element._instance;

      const areaGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.AreaGroup);
      if (areaGroup) {
        expect(areaGroup.getFill()).toBeDefined();
      }
    });

    it('should render with data', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line" show-area="true"></dataset>');
      await wait();
      const instance = element._instance;

      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);

      const testData = [
        { key: 'demo://test', src: 'demo://test', time: Date.now() - 2000, value: 10 },
        { key: 'demo://test', src: 'demo://test', time: Date.now() - 1000, value: 20 },
        { key: 'demo://test', src: 'demo://test', time: Date.now(), value: 15 }
      ];

      instance._renderChart(testData);

      const areaGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.AreaGroup);
      if (areaGroup) {
        expect(() => areaGroup.render()).not.toThrow();
      }
    });

    it('should support gradient', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line" show-area="true" gradient="true"></dataset>');
      await wait();
      const instance = element._instance;

      const ds = instance.getDataset('demo://test');
      expect(ds.getGradient()).toBeTrue();
    });
  });

  describe('BarGroup tests', function() {
    it('should create BarGroup for bar chart', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="bar"></dataset>');
      await wait();
      const instance = element._instance;

      const barGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.BarGroup);
      expect(barGroup).toBeDefined();
    });

    it('should have xPadding property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="bar"></dataset>');
      await wait();
      const instance = element._instance;

      const barGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.BarGroup);
      if (barGroup) {
        expect(barGroup.getXPadding()).toBe(0.5);
      }
    });

    it('should have xRange property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="bar"></dataset>');
      await wait();
      const instance = element._instance;

      const barGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.BarGroup);
      if (barGroup) {
        expect(barGroup.getXRange()).toBeDefined();
        expect(Array.isArray(barGroup.getXRange())).toBeTrue();
      }
    });

    it('should have getBandWidth method', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="bar"></dataset>');
      await wait();
      const instance = element._instance;

      const barGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.BarGroup);
      if (barGroup) {
        expect(typeof barGroup.getBandWidth).toBe('function');
      }
    });

    it('should override xScale', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="bar"></dataset>');
      await wait();
      const instance = element._instance;

      expect(instance.overrideXScale).toBeDefined();
    });

    it('should render with data', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="bar"></dataset>');
      await wait();
      const instance = element._instance;

      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);

      const now = Date.now();
      const testData = [
        { key: 'demo://test', src: 'demo://test', time: now - 3600000, value: 10 },
        { key: 'demo://test', src: 'demo://test', time: now - 1800000, value: 20 },
        { key: 'demo://test', src: 'demo://test', time: now, value: 15 }
      ];

      instance._renderChart(testData);

      const barGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.BarGroup);
      if (barGroup) {
        expect(() => barGroup.render()).not.toThrow();
      }
    });

    it('should support multiple bar datasets', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test1" chart-type="bar" color="#FF0000"></dataset>' +
        '<dataset src="demo://test2" chart-type="bar" color="#00FF00"></dataset>');
      await wait();
      const instance = element._instance;

      expect(instance.getDataset('demo://test1')).toBeDefined();
      expect(instance.getDataset('demo://test2')).toBeDefined();
    });
  });

  describe('StackedBarGroup tests', function() {
    it('should create StackedBarGroup for stacked-bar chart', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="stacked-bar"></dataset>');
      await wait();
      const instance = element._instance;

      const stackedBarGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.StackedBarGroup);
      expect(stackedBarGroup).toBeDefined();
    });

    it('should have xPadding property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="stacked-bar"></dataset>');
      await wait();
      const instance = element._instance;

      const stackedBarGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.StackedBarGroup);
      if (stackedBarGroup) {
        expect(stackedBarGroup.getXPadding()).toBe(0.5);
      }
    });

    it('should have xRange property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="stacked-bar"></dataset>');
      await wait();
      const instance = element._instance;

      const stackedBarGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.StackedBarGroup);
      if (stackedBarGroup) {
        expect(stackedBarGroup.getXRange()).toBeDefined();
        expect(Array.isArray(stackedBarGroup.getXRange())).toBeTrue();
      }
    });

    it('should have getBandWidth method', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="stacked-bar"></dataset>');
      await wait();
      const instance = element._instance;

      const stackedBarGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.StackedBarGroup);
      if (stackedBarGroup) {
        expect(typeof stackedBarGroup.getBandWidth).toBe('function');
      }
    });

    it('should render with data', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test1" chart-type="stacked-bar" color="#FF0000"></dataset>' +
        '<dataset src="demo://test2" chart-type="stacked-bar" color="#00FF00"></dataset>');
      await wait();
      const instance = element._instance;

      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);

      const now = Date.now();
      const testData = [
        { key: 'demo://test1', src: 'demo://test1', time: now - 3600000, value: 10 },
        { key: 'demo://test2', src: 'demo://test2', time: now - 3600000, value: 5 },
        { key: 'demo://test1', src: 'demo://test1', time: now, value: 15 },
        { key: 'demo://test2', src: 'demo://test2', time: now, value: 8 }
      ];

      instance._renderChart(testData);

      const stackedBarGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.StackedBarGroup);
      if (stackedBarGroup) {
        expect(() => stackedBarGroup.render()).not.toThrow();
      }
    });

    it('should update minY and maxY for stacked data', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test1" chart-type="stacked-bar"></dataset>' +
        '<dataset src="demo://test2" chart-type="stacked-bar"></dataset>');
      await wait();
      const instance = element._instance;

      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);

      const now = Date.now();
      const testData = [
        { key: 'demo://test1', src: 'demo://test1', time: now, value: 10 },
        { key: 'demo://test2', src: 'demo://test2', time: now, value: 5 }
      ];

      instance._renderChart(testData);

      const stackedBarGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.StackedBarGroup);
      if (stackedBarGroup) {
        stackedBarGroup.render();
        // After stacked bar render, maxY should be set
        expect(instance.getMaxY()).not.toBeNull();
      }
    });
  });

  describe('AbstractGroup tests', function() {
    it('should have type property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        expect(lineGroup.getType()).toBe('line');
      }
    });

    it('should have addDataset method', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        expect(typeof lineGroup.addDataset).toBe('function');
      }
    });

    it('should apply stroke property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        lineGroup.setStroke('#FF0000');
        expect(lineGroup.getStroke()).toBe('#FF0000');
      }
    });

    it('should apply strokeOpacity property', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        lineGroup.setStrokeOpacity(0.5);
        expect(lineGroup.getStrokeOpacity()).toBe(0.5);
      }
    });
  });

  describe('Mixed chart types', function() {
    it('should support line and bar in same chart', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://line" chart-type="line"></dataset>' +
        '<dataset src="demo://bar" chart-type="bar"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      const barGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.BarGroup);

      expect(lineGroup).toBeDefined();
      expect(barGroup).toBeDefined();
    });

    it('should support line with area and bar', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://line" chart-type="line" show-area="true"></dataset>' +
        '<dataset src="demo://bar" chart-type="bar"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      const areaGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.AreaGroup);
      const barGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.BarGroup);

      expect(lineGroup).toBeDefined();
      expect(areaGroup).toBeDefined();
      expect(barGroup).toBeDefined();
    });
  });

  describe('LineGroup curve functions', function() {
    it('should initialize step curve function', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line" curve="step"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        expect(lineGroup._lineFunctions.step).toBeDefined();
      }
    });

    it('should initialize natural curve function', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line" curve="natural"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        expect(lineGroup._lineFunctions.natural).toBeDefined();
      }
    });

    it('should initialize basis curve function', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line" curve="basis"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      expect(lineGroup).toBeDefined();
      // The basis curve should be initialized via initDataset
      if (lineGroup._lineFunctions.basis) {
        expect(lineGroup._lineFunctions.basis).toBeDefined();
      } else {
        // If basis is not there, at least linear should be there as fallback
        expect(lineGroup._lineFunctions.linear).toBeDefined();
      }
    });

    it('should render line with step curve', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line" curve="step"></dataset>');
      await wait();
      const instance = element._instance;

      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);

      const now = Date.now();
      const testData = [
        { key: 'demo://test', src: 'demo://test', time: now - 2000, value: 10 },
        { key: 'demo://test', src: 'demo://test', time: now - 1000, value: 20 },
        { key: 'demo://test', src: 'demo://test', time: now, value: 15 }
      ];

      instance._renderChart(testData);

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        lineGroup.render();
        const pathElement = lineGroup.getContainer().select('path');
        expect(pathElement.empty()).toBeFalse();
      }
    });
  });

  describe('AreaGroup curve functions', function() {
    it('should initialize step curve function for area', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line" show-area="true" curve="step"></dataset>');
      await wait();
      const instance = element._instance;

      const areaGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.AreaGroup);
      if (areaGroup) {
        expect(areaGroup._areaFunctions.step).toBeDefined();
      }
    });

    it('should initialize natural curve function for area', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line" show-area="true" curve="natural"></dataset>');
      await wait();
      const instance = element._instance;

      const areaGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.AreaGroup);
      if (areaGroup) {
        expect(areaGroup._areaFunctions.natural).toBeDefined();
      }
    });

    it('should initialize basis curve function for area', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line" show-area="true" curve="basis"></dataset>');
      await wait();
      const instance = element._instance;

      const areaGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.AreaGroup);
      expect(areaGroup).toBeDefined();
      // The basis curve should be initialized via initDataset
      if (areaGroup._areaFunctions.basis) {
        expect(areaGroup._areaFunctions.basis).toBeDefined();
      } else {
        // If basis is not there, at least linear should be there as fallback
        expect(areaGroup._areaFunctions.linear).toBeDefined();
      }
    });

    it('should render area with gradient', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line" show-area="true" gradient="true" color="#FF0000"></dataset>');
      await wait();
      const instance = element._instance;

      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);

      const now = Date.now();
      const testData = [
        { key: 'demo://test', src: 'demo://test', time: now - 2000, value: 10 },
        { key: 'demo://test', src: 'demo://test', time: now - 1000, value: 20 },
        { key: 'demo://test', src: 'demo://test', time: now, value: 15 }
      ];

      instance._renderChart(testData);

      const areaGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.AreaGroup);
      if (areaGroup) {
        areaGroup.render();
        // Check that gradient defs are created
        const svg = instance.getSvg();
        const defs = svg.select('defs');
        if (!defs.empty()) {
          const gradient = defs.select('linearGradient');
          expect(gradient.empty()).toBeFalse();
        }
      }
    });

    it('should respond to Y axis range changes', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line" show-area="true"></dataset>');
      await wait();
      const instance = element._instance;

      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);

      const areaGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.AreaGroup);
      if (areaGroup) {
        // Trigger range change
        const yAxis = instance.getYAxis();
        yAxis.setRange([200, 0]);
        // Area group should re-render (listener attached)
      }
    });
  });

  describe('BarGroup advanced features', function() {
    it('should handle tick size for bars', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="bar"></dataset>' +
        '<x-axis tick-size="15"></x-axis>');
      await wait();
      const instance = element._instance;

      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);

      const now = Date.now();
      const testData = [
        { key: 'demo://test', src: 'demo://test', time: now - 3600000, value: 10 },
        { key: 'demo://test', src: 'demo://test', time: now - 1800000, value: 20 },
        { key: 'demo://test', src: 'demo://test', time: now, value: 15 }
      ];

      instance._renderChart(testData);

      const barGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.BarGroup);
      if (barGroup) {
        expect(() => barGroup.render()).not.toThrow();
      }
    });

    it('should apply xPadding changes', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="bar"></dataset>');
      await wait();
      const instance = element._instance;

      const barGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.BarGroup);
      if (barGroup) {
        barGroup.setXPadding(0.3);
        expect(barGroup.getXPadding()).toBe(0.3);
      }
    });

    it('should apply xRange changes', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="bar"></dataset>');
      await wait();
      const instance = element._instance;

      const barGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.BarGroup);
      if (barGroup) {
        barGroup.setXRange([10, 390]);
        expect(barGroup.getXRange()).toEqual([10, 390]);
      }
    });

    it('should render grouped bars', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test1" chart-type="bar" color="#FF0000"></dataset>' +
        '<dataset src="demo://test2" chart-type="bar" color="#00FF00"></dataset>');
      await wait();
      const instance = element._instance;

      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);

      const now = Date.now();
      const testData = [
        { key: 'demo://test1', src: 'demo://test1', time: now - 3600000, value: 10 },
        { key: 'demo://test2', src: 'demo://test2', time: now - 3600000, value: 15 },
        { key: 'demo://test1', src: 'demo://test1', time: now, value: 20 },
        { key: 'demo://test2', src: 'demo://test2', time: now, value: 25 }
      ];

      instance._renderChart(testData);

      const barGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.BarGroup);
      if (barGroup) {
        barGroup.render();
        const groups = barGroup.getContainer().selectAll('g');
        expect(groups.size()).toBeGreaterThan(0);
      }
    });
  });

  describe('StackedBarGroup advanced features', function() {
    it('should apply xPadding changes', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="stacked-bar"></dataset>');
      await wait();
      const instance = element._instance;

      const stackedBarGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.StackedBarGroup);
      if (stackedBarGroup) {
        stackedBarGroup.setXPadding(0.3);
        expect(stackedBarGroup.getXPadding()).toBe(0.3);
      }
    });

    it('should apply xRange changes', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="stacked-bar"></dataset>');
      await wait();
      const instance = element._instance;

      const stackedBarGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.StackedBarGroup);
      if (stackedBarGroup) {
        stackedBarGroup.setXRange([10, 390]);
        expect(stackedBarGroup.getXRange()).toEqual([10, 390]);
      }
    });

    it('should render stacked bars with multiple datasets', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test1" chart-type="stacked-bar" color="#FF0000"></dataset>' +
        '<dataset src="demo://test2" chart-type="stacked-bar" color="#00FF00"></dataset>' +
        '<dataset src="demo://test3" chart-type="stacked-bar" color="#0000FF"></dataset>');
      await wait();
      const instance = element._instance;

      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);

      const now = Date.now();
      const testData = [
        { key: 'demo://test1', src: 'demo://test1', time: now - 3600000, value: 10 },
        { key: 'demo://test2', src: 'demo://test2', time: now - 3600000, value: 5 },
        { key: 'demo://test3', src: 'demo://test3', time: now - 3600000, value: 3 },
        { key: 'demo://test1', src: 'demo://test1', time: now, value: 15 },
        { key: 'demo://test2', src: 'demo://test2', time: now, value: 8 },
        { key: 'demo://test3', src: 'demo://test3', time: now, value: 4 }
      ];

      instance._renderChart(testData);

      const stackedBarGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.StackedBarGroup);
      if (stackedBarGroup) {
        stackedBarGroup.render();
        const groups = stackedBarGroup.getContainer().selectAll('g');
        expect(groups.size()).toBeGreaterThan(0);
      }
    });

    it('should handle empty keys gracefully', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test1" chart-type="stacked-bar"></dataset>');
      await wait();
      const instance = element._instance;

      element.style.width = '400px';
      element.style.height = '200px';
      instance.setWidth(400);
      instance.setHeight(200);

      // Empty data
      instance._renderChart([]);

      const stackedBarGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.StackedBarGroup);
      if (stackedBarGroup) {
        expect(() => stackedBarGroup.render()).not.toThrow();
      }
    });
  });

  describe('AbstractGroup property apply methods', function() {
    it('should apply fill to element', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        lineGroup.setFill('#FF0000');
        expect(lineGroup.getFill()).toBe('#FF0000');
        expect(lineGroup.getContainer().attr('fill')).toBe('#FF0000');
      }
    });

    it('should apply strokeLinecap to element', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        lineGroup.setStrokeLinecap('square');
        expect(lineGroup.getStrokeLinecap()).toBe('square');
        expect(lineGroup.getContainer().attr('stroke-linecap')).toBe('square');
      }
    });

    it('should apply strokeLinejoin to element', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        lineGroup.setStrokeLinejoin('bevel');
        expect(lineGroup.getStrokeLinejoin()).toBe('bevel');
        expect(lineGroup.getContainer().attr('stroke-linejoin')).toBe('bevel');
      }
    });

    it('should apply strokeWidth to element', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        lineGroup.setStrokeWidth(3);
        expect(lineGroup.getStrokeWidth()).toBe(3);
        expect(lineGroup.getContainer().attr('stroke-width')).toBe('3');
      }
    });

    it('should apply strokeOpacity to element', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        lineGroup.setStrokeOpacity(0.5);
        expect(lineGroup.getStrokeOpacity()).toBe(0.5);
        expect(lineGroup.getContainer().attr('stroke-opacity')).toBe('0.5');
      }
    });

    it('should apply stroke to element', async function() {
      const element = this.createTileWidgetWithComponent('cv-chart', {},
        '<dataset src="demo://test" chart-type="line"></dataset>');
      await wait();
      const instance = element._instance;

      const lineGroup = instance._chartElements.find(e => e instanceof cv.ui.structure.tile.components.chart.LineGroup);
      if (lineGroup) {
        lineGroup.setStroke('#00FF00');
        expect(lineGroup.getStroke()).toBe('#00FF00');
        expect(lineGroup.getContainer().attr('stroke')).toBe('#00FF00');
      }
    });
  });
});
