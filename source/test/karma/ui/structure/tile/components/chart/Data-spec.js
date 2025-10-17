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
 * Unit tests for cv.ui.structure.tile.components.chart.Data
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the Data chart component', () => {
  let chart;
  let data;

  beforeEach(function() {
    // Create a mock chart object
    chart = {
      getDataset: jasmine.createSpy('getDataset').and.returnValue({})
    };
  });

  afterEach(() => {
    if (data) {
      data.dispose();
      data = null;
    }
  });

  it('should create a Data object', () => {
    data = new cv.ui.structure.tile.components.chart.Data(chart);
    expect(data).not.toBeNull();
    expect(data.data).toEqual([]);
    expect(data.times).toEqual([]);
    expect(data.values).toEqual([]);
    expect(data.keys).toEqual([]);
  });

  it('should set minY and maxY', () => {
    data = new cv.ui.structure.tile.components.chart.Data(chart);
    data.setMinY(0);
    data.setMaxY(100);
    expect(data.getMinY()).toBe(0);
    expect(data.getMaxY()).toBe(100);
  });

  it('should process data correctly', () => {
    data = new cv.ui.structure.tile.components.chart.Data(chart);
    const testData = [
      { key: 'series1', time: 1000000, value: 10, src: 'source1' },
      { key: 'series1', time: 2000000, value: 20, src: 'source1' },
      { key: 'series2', time: 1000000, value: 15, src: 'source2' }
    ];
    
    data.setData(testData);
    
    expect(data.data.length).toBe(3);
    expect(data.keys.length).toBe(3);
    expect(data.times.length).toBe(3);
    expect(data.values.length).toBe(3);
  });

  it('should filter out LineDataset entries', () => {
    data = new cv.ui.structure.tile.components.chart.Data(chart);
    
    const lineDataset = new cv.ui.structure.tile.components.chart.LineDataset(null, chart);
    chart.getDataset = jasmine.createSpy('getDataset').and.callFake((key) => {
      if (key === 'line1') {
        return lineDataset;
      }
      return {};
    });
    
    const testData = [
      { key: 'series1', time: 1000000, value: 10, src: 'source1' },
      { key: 'line1', time: 1000000, value: 50, src: 'source2' },
      { key: 'series2', time: 2000000, value: 20, src: 'source3' }
    ];
    
    data.setData(testData);
    
    expect(data.data.length).toBe(2);
    expect(data.lineData.length).toBe(1);
    expect(data.lineKeys[0]).toBe('line1');
  });

  it('should round milliseconds to full seconds', () => {
    data = new cv.ui.structure.tile.components.chart.Data(chart);
    const testData = [
      { key: 'series1', time: 1000567, value: 10, src: 'source1' }
    ];
    
    data.setData(testData);
    
    expect(data.times[0]).toBe(1000000);
  });

  it('should get domain for a specific key', () => {
    data = new cv.ui.structure.tile.components.chart.Data(chart);
    const testData = [
      { key: 'series1', time: 1000000, value: 10, src: 'source1' },
      { key: 'series1', time: 2000000, value: 30, src: 'source1' },
      { key: 'series2', time: 1000000, value: 50, src: 'source2' }
    ];
    
    data.setData(testData);
    
    const domain = data.getDomain('series1');
    expect(domain).toBeDefined();
    expect(domain[0]).toBe(10);
    expect(domain[1]).toBe(30);
  });

  it('should get indices for a specific key', () => {
    data = new cv.ui.structure.tile.components.chart.Data(chart);
    const testData = [
      { key: 'series1', time: 1000000, value: 10, src: 'source1' },
      { key: 'series2', time: 1000000, value: 15, src: 'source2' },
      { key: 'series1', time: 2000000, value: 20, src: 'source1' }
    ];
    
    data.setData(testData);
    
    const indices = data.getIndicesForKey('series1');
    expect(indices.length).toBe(2);
    expect(indices).toContain(0);
    expect(indices).toContain(2);
  });
});
