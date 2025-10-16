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
 * Unit tests for cv.ui.structure.tile.components.chart.Dataset
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the Dataset chart component', () => {
  let chart;
  let dataset;
  let element;

  beforeEach(function() {
    // Create a mock element
    element = document.createElement('div');
    element.setAttribute('src', 'test-source');
    element.setAttribute('key', 'test-key');
    
    // Create a mock chart object
    chart = {
      registerDataset: jasmine.createSpy('registerDataset'),
      data: {}
    };
  });

  afterEach(() => {
    if (dataset) {
      dataset.dispose();
      dataset = null;
    }
  });

  it('should create a Dataset', () => {
    dataset = new cv.ui.structure.tile.components.chart.Dataset(element, chart);
    expect(dataset).not.toBeNull();
    expect(dataset.getSrc()).toBe('test-source');
    expect(dataset.getKey()).toBe('test-key');
  });

  it('should have default properties', () => {
    dataset = new cv.ui.structure.tile.components.chart.Dataset(element, chart);
    expect(dataset.getChartType()).toBe('line');
    expect(dataset.getColor()).toBe('#FF9900');
    expect(dataset.getCurve()).toBe('linear');
    expect(dataset.isShowArea()).toBe(false);
    expect(dataset.isShowValue()).toBe(true);
  });

  it('should set and get chartType', () => {
    dataset = new cv.ui.structure.tile.components.chart.Dataset(element, chart);
    dataset.setChartType('bar');
    expect(dataset.getChartType()).toBe('bar');
  });

  it('should set and get color', () => {
    dataset = new cv.ui.structure.tile.components.chart.Dataset(element, chart);
    dataset.setColor('#FF0000');
    expect(dataset.getColor()).toBe('#FF0000');
  });

  it('should set and get title', () => {
    dataset = new cv.ui.structure.tile.components.chart.Dataset(element, chart);
    dataset.setTitle('Test Title');
    expect(dataset.getTitle()).toBe('Test Title');
  });

  it('should set and get curve', () => {
    dataset = new cv.ui.structure.tile.components.chart.Dataset(element, chart);
    dataset.setCurve('step');
    expect(dataset.getCurve()).toBe('step');
  });

  it('should set and get showArea', () => {
    element.setAttribute('show-area', 'true');
    dataset = new cv.ui.structure.tile.components.chart.Dataset(element, chart);
    expect(dataset.isShowArea()).toBe(true);
  });

  it('should set and get gradient', () => {
    element.setAttribute('gradient', 'true');
    dataset = new cv.ui.structure.tile.components.chart.Dataset(element, chart);
    expect(dataset.isGradient()).toBe(true);
  });

  it('should set and get showValue', () => {
    element.setAttribute('show-value', 'false');
    dataset = new cv.ui.structure.tile.components.chart.Dataset(element, chart);
    expect(dataset.isShowValue()).toBe(false);
  });

  it('should set and get type', () => {
    dataset = new cv.ui.structure.tile.components.chart.Dataset(element, chart);
    dataset.setType('flux');
    expect(dataset.getType()).toBe('flux');
  });

  it('should set and get subType', () => {
    dataset = new cv.ui.structure.tile.components.chart.Dataset(element, chart);
    dataset.setSubType('temperature');
    expect(dataset.getSubType()).toBe('temperature');
  });

  it('should set and get aggregationInterval', () => {
    dataset = new cv.ui.structure.tile.components.chart.Dataset(element, chart);
    dataset.setAggregationInterval(60);
    expect(dataset.getAggregationInterval()).toBe(60);
  });

  it('should validate chartType values', () => {
    dataset = new cv.ui.structure.tile.components.chart.Dataset(element, chart);
    expect(() => dataset.setChartType('line')).not.toThrow();
    expect(() => dataset.setChartType('bar')).not.toThrow();
    expect(() => dataset.setChartType('stacked-bar')).not.toThrow();
    expect(() => dataset.setChartType('h-line')).not.toThrow();
    expect(() => dataset.setChartType('v-line')).not.toThrow();
  });

  it('should validate curve values', () => {
    dataset = new cv.ui.structure.tile.components.chart.Dataset(element, chart);
    expect(() => dataset.setCurve('linear')).not.toThrow();
    expect(() => dataset.setCurve('step')).not.toThrow();
    expect(() => dataset.setCurve('basis')).not.toThrow();
    expect(() => dataset.setCurve('natural')).not.toThrow();
  });
});
