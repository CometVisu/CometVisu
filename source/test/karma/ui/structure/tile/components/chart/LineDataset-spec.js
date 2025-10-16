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
 * Unit tests for cv.ui.structure.tile.components.chart.LineDataset
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the LineDataset chart component', () => {
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

  it('should create a LineDataset', () => {
    dataset = new cv.ui.structure.tile.components.chart.LineDataset(element, chart);
    expect(dataset).not.toBeNull();
  });

  it('should have chartType h-line by default', () => {
    dataset = new cv.ui.structure.tile.components.chart.LineDataset(element, chart);
    expect(dataset.getChartType()).toBe('h-line');
  });

  it('should set and get value', () => {
    dataset = new cv.ui.structure.tile.components.chart.LineDataset(element, chart);
    dataset.setValue(100);
    expect(dataset.getValue()).toBe(100);
  });

  it('should set and get valueColor', () => {
    dataset = new cv.ui.structure.tile.components.chart.LineDataset(element, chart);
    dataset.setValueColor('#FF0000');
    expect(dataset.getValueColor()).toBe('#FF0000');
  });

  it('should have default valueColor as currentColor', () => {
    dataset = new cv.ui.structure.tile.components.chart.LineDataset(element, chart);
    expect(dataset.getValueColor()).toBe('currentColor');
  });

  it('should set and get sourceSet', () => {
    dataset = new cv.ui.structure.tile.components.chart.LineDataset(element, chart);
    const sourceDataset = new cv.ui.structure.tile.components.chart.Dataset(element, chart);
    dataset.setSourceSet(sourceDataset);
    expect(dataset.getSourceSet()).toBe(sourceDataset);
    sourceDataset.dispose();
  });

  it('should set and get format', () => {
    dataset = new cv.ui.structure.tile.components.chart.LineDataset(element, chart);
    dataset.setFormat('%.2f');
    expect(dataset.getFormat()).toBe('%.2f');
  });

  it('should set and get index', () => {
    dataset = new cv.ui.structure.tile.components.chart.LineDataset(element, chart);
    dataset.setIndex(5);
    expect(dataset.getIndex()).toBe(5);
  });

  it('should return null when fetching with sourceSet', async () => {
    dataset = new cv.ui.structure.tile.components.chart.LineDataset(element, chart);
    const sourceDataset = new cv.ui.structure.tile.components.chart.Dataset(element, chart);
    dataset.setSourceSet(sourceDataset);
    
    const result = await dataset.fetch(new Date(), new Date(), 'day', 0, {});
    expect(result).toBeNull();
    
    sourceDataset.dispose();
  });

  it('should be an instance of Dataset', () => {
    dataset = new cv.ui.structure.tile.components.chart.LineDataset(element, chart);
    expect(dataset instanceof cv.ui.structure.tile.components.chart.Dataset).toBe(true);
  });
});
