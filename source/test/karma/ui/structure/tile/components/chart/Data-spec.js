/* Data-spec.js
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
 * Unit tests for cv.ui.structure.tile.components.chart.Data
 */
describe('testing cv.ui.structure.tile.components.chart.Data', function () {
  const wait = (ms = 50) => new Promise(resolve => setTimeout(resolve, ms));

  let mockChart;
  let dataObject;

  beforeEach(function() {
    // Create mock chart with getDataset method
    mockChart = {
      getDataset: function(key) {
        // Return null for most keys - not a LineDataset
        return null;
      }
    };
    dataObject = new cv.ui.structure.tile.components.chart.Data(mockChart);
  });

  afterEach(function() {
    if (dataObject) {
      dataObject.dispose();
      dataObject = null;
    }
    mockChart = null;
  });

  describe('constructor and initialization', () => {
    it('should create a Data instance', function() {
      expect(dataObject).toBeDefined();
      expect(dataObject instanceof cv.ui.structure.tile.components.chart.Data).toBeTrue();
    });

    it('should initialize empty arrays', function() {
      expect(dataObject.data).toEqual([]);
      expect(dataObject.times).toEqual([]);
      expect(dataObject.values).toEqual([]);
      expect(dataObject.keys).toEqual([]);
      expect(dataObject.titles).toEqual([]);
    });

    it('should initialize line data arrays', function() {
      expect(dataObject.lineData).toEqual([]);
      expect(dataObject.lineTimes).toEqual([]);
      expect(dataObject.lineValues).toEqual([]);
      expect(dataObject.lineKeys).toEqual([]);
      expect(dataObject.lineIndices).toEqual([]);
      expect(dataObject.lineTitles).toEqual([]);
    });
  });

  describe('setData method', () => {
    it('should set data from array', function() {
      const testData = [
        { key: 'test1', src: 'demo://test1', time: 1700000000000, value: 20 },
        { key: 'test1', src: 'demo://test1', time: 1700000001000, value: 21 },
        { key: 'test1', src: 'demo://test1', time: 1700000002000, value: 22 }
      ];

      dataObject.setData(testData);

      expect(dataObject.data.length).toBe(3);
      expect(dataObject.times.length).toBe(3);
      expect(dataObject.values.length).toBe(3);
      expect(dataObject.keys.length).toBe(3);
    });

    it('should round time to full seconds', function() {
      const testData = [
        { key: 'test1', src: 'demo://test1', time: 1700000000123, value: 20 }
      ];

      dataObject.setData(testData);

      expect(dataObject.times[0]).toBe(1700000000000);
    });

    it('should extract values correctly', function() {
      const testData = [
        { key: 'test1', src: 'demo://test1', time: 1700000000000, value: 25.5 }
      ];

      dataObject.setData(testData);

      expect(dataObject.values[0]).toBe(25.5);
    });

    it('should extract keys correctly', function() {
      const testData = [
        { key: 'mykey', src: 'demo://test', time: 1700000000000, value: 20 }
      ];

      dataObject.setData(testData);

      expect(dataObject.keys[0]).toBe('mykey');
    });

    it('should extract titles from src', function() {
      const testData = [
        { key: 'test1', src: 'demo://temperature', time: 1700000000000, value: 20 }
      ];

      dataObject.setData(testData);

      expect(dataObject.titles[0]).toBe('demo://temperature');
    });
  });

  describe('minY and maxY properties', () => {
    it('should set minY', function() {
      dataObject.setMinY(10);

      expect(dataObject.getMinY()).toBe(10);
    });

    it('should set maxY', function() {
      dataObject.setMaxY(100);

      expect(dataObject.getMaxY()).toBe(100);
    });

    it('should allow null for minY', function() {
      dataObject.setMinY(null);

      expect(dataObject.getMinY()).toBeNull();
    });

    it('should allow null for maxY', function() {
      dataObject.setMaxY(null);

      expect(dataObject.getMaxY()).toBeNull();
    });

    it('should invalidate values domain when minY changes', function() {
      const testData = [
        { key: 'test1', src: 'demo://test1', time: 1700000000000, value: 20 }
      ];
      dataObject.setData(testData);

      // Get domain to cache it
      dataObject.getValuesDomain();

      // Change minY
      dataObject.setMinY(5);

      // Domain should be recalculated
      const domain = dataObject.getValuesDomain();
      expect(domain[0]).toBe(5);
    });

    it('should invalidate values domain when maxY changes', function() {
      const testData = [
        { key: 'test1', src: 'demo://test1', time: 1700000000000, value: 20 }
      ];
      dataObject.setData(testData);

      // Get domain to cache it
      dataObject.getValuesDomain();

      // Change maxY
      dataObject.setMaxY(50);

      // Domain should be recalculated
      const domain = dataObject.getValuesDomain();
      expect(domain[1]).toBe(50);
    });
  });

  describe('getTimesDomain method', () => {
    it('should return time extent', function() {
      const testData = [
        { key: 'test1', src: 'demo://test1', time: 1700000000000, value: 20 },
        { key: 'test1', src: 'demo://test1', time: 1700000100000, value: 21 },
        { key: 'test1', src: 'demo://test1', time: 1700000200000, value: 22 }
      ];

      dataObject.setData(testData);
      const domain = dataObject.getTimesDomain();

      expect(domain[0]).toBe(1700000000000);
      expect(domain[1]).toBe(1700000200000);
    });

    it('should cache times domain', function() {
      const testData = [
        { key: 'test1', src: 'demo://test1', time: 1700000000000, value: 20 }
      ];

      dataObject.setData(testData);

      const domain1 = dataObject.getTimesDomain();
      const domain2 = dataObject.getTimesDomain();

      expect(domain1).toBe(domain2); // Same object reference (cached)
    });
  });

  describe('getValuesDomain method', () => {
    it('should return value extent with padding', function() {
      const testData = [
        { key: 'test1', src: 'demo://test1', time: 1700000000000, value: 10 },
        { key: 'test1', src: 'demo://test1', time: 1700000100000, value: 20 },
        { key: 'test1', src: 'demo://test1', time: 1700000200000, value: 15 }
      ];

      dataObject.setData(testData);
      const domain = dataObject.getValuesDomain();

      expect(domain[0]).toBeLessThanOrEqual(10);
      expect(domain[1]).toBeGreaterThanOrEqual(20);
    });

    it('should use minY when set', function() {
      const testData = [
        { key: 'test1', src: 'demo://test1', time: 1700000000000, value: 20 }
      ];

      dataObject.setData(testData);
      dataObject.setMinY(0);
      const domain = dataObject.getValuesDomain();

      expect(domain[0]).toBe(0);
    });

    it('should use maxY when set', function() {
      const testData = [
        { key: 'test1', src: 'demo://test1', time: 1700000000000, value: 20 }
      ];

      dataObject.setData(testData);
      dataObject.setMaxY(100);
      const domain = dataObject.getValuesDomain();

      expect(domain[1]).toBe(100);
    });

    it('should handle small values (< 1)', function() {
      const testData = [
        { key: 'test1', src: 'demo://test1', time: 1700000000000, value: 0.5 },
        { key: 'test1', src: 'demo://test1', time: 1700000100000, value: 0.8 }
      ];

      dataObject.setData(testData);
      const domain = dataObject.getValuesDomain();

      expect(domain[0]).toBeLessThanOrEqual(0.5);
      expect(domain[1]).toBeGreaterThanOrEqual(0.8);
    });

    it('should handle empty values array', function() {
      dataObject.setData([]);
      const domain = dataObject.getValuesDomain();

      expect(domain).toEqual([0, 0.1]);
    });
  });

  describe('getKeysDomain method', () => {
    it('should return unique keys', function() {
      const testData = [
        { key: 'key1', src: 'demo://test1', time: 1700000000000, value: 20 },
        { key: 'key2', src: 'demo://test2', time: 1700000100000, value: 21 },
        { key: 'key1', src: 'demo://test1', time: 1700000200000, value: 22 }
      ];

      dataObject.setData(testData);
      const domain = dataObject.getKeysDomain();

      expect(domain.size).toBe(2);
      expect(domain.has('key1')).toBeTrue();
      expect(domain.has('key2')).toBeTrue();
    });

    it('should cache keys domain', function() {
      const testData = [
        { key: 'key1', src: 'demo://test1', time: 1700000000000, value: 20 }
      ];

      dataObject.setData(testData);

      const domain1 = dataObject.getKeysDomain();
      const domain2 = dataObject.getKeysDomain();

      expect(domain1).toBe(domain2); // Same object reference (cached)
    });
  });

  describe('getIndicesForKey method', () => {
    it('should return indices for specific key', function() {
      const testData = [
        { key: 'key1', src: 'demo://test1', time: 1700000000000, value: 20 },
        { key: 'key2', src: 'demo://test2', time: 1700000100000, value: 21 },
        { key: 'key1', src: 'demo://test1', time: 1700000200000, value: 22 }
      ];

      dataObject.setData(testData);
      const indices = dataObject.getIndicesForKey('key1');

      expect(indices.length).toBe(2);
      expect(indices).toContain(0);
      expect(indices).toContain(2);
    });

    it('should return empty array for unknown key', function() {
      const testData = [
        { key: 'key1', src: 'demo://test1', time: 1700000000000, value: 20 }
      ];

      dataObject.setData(testData);
      const indices = dataObject.getIndicesForKey('unknown');

      expect(indices).toEqual([]);
    });

    it('should filter undefined values when onlyWithValues is true', function() {
      const testData = [
        { key: 'key1', src: 'demo://test1', time: 1700000000000, value: 20 },
        { key: 'key1', src: 'demo://test1', time: 1700000100000, value: undefined }
      ];

      dataObject.setData(testData);
      const indices = dataObject.getIndicesForKey('key1', true);

      // Only the first entry has a defined value
      expect(indices.length).toBe(1);
    });

    it('should include undefined values when onlyWithValues is false', function() {
      const testData = [
        { key: 'key1', src: 'demo://test1', time: 1700000000000, value: 20 },
        { key: 'key1', src: 'demo://test1', time: 1700000100000, value: undefined }
      ];

      dataObject.setData(testData);
      const indices = dataObject.getIndicesForKey('key1', false);

      expect(indices.length).toBe(2);
    });
  });

  describe('append method', () => {
    it('should append new data point', function() {
      const initialData = [
        { key: 'key1', src: 'demo://test1', time: 1700000000000, value: 20 },
        { key: 'key1', src: 'demo://test1', time: 1700000001000, value: 21 }
      ];

      dataObject.setData(initialData);

      const newPoint = { key: 'key1', src: 'demo://test1', time: 1700000002000, value: 22 };
      const result = dataObject.append(newPoint);

      expect(result).toBeTrue();
      expect(dataObject.values[dataObject.values.length - 1]).toBe(22);
    });

    it('should replace value for same time', function() {
      const initialData = [
        { key: 'key1', src: 'demo://test1', time: 1700000000000, value: 20 },
        { key: 'key1', src: 'demo://test1', time: 1700000001000, value: 21 }
      ];

      dataObject.setData(initialData);

      const newPoint = { key: 'key1', src: 'demo://test1', time: 1700000001000, value: 25 };
      const result = dataObject.append(newPoint);

      expect(result).toBeTrue();
      expect(dataObject.values[dataObject.values.length - 1]).toBe(25);
    });

    it('should reject data older than last time', function() {
      const initialData = [
        { key: 'key1', src: 'demo://test1', time: 1700000000000, value: 20 },
        { key: 'key1', src: 'demo://test1', time: 1700000002000, value: 21 }
      ];

      dataObject.setData(initialData);

      const oldPoint = { key: 'key1', src: 'demo://test1', time: 1700000001000, value: 22 };
      const result = dataObject.append(oldPoint);

      expect(result).toBeFalse();
    });

    it('should shift out oldest data when appending', function() {
      const initialData = [
        { key: 'key1', src: 'demo://test1', time: 1700000000000, value: 20 },
        { key: 'key1', src: 'demo://test1', time: 1700000001000, value: 21 }
      ];

      dataObject.setData(initialData);
      const originalLength = dataObject.times.length;

      const newPoint = { key: 'key1', src: 'demo://test1', time: 1700000002000, value: 22 };
      dataObject.append(newPoint);

      expect(dataObject.times.length).toBe(originalLength); // Same length after shift
      expect(dataObject.times[0]).toBe(1700000001000); // First entry is now the second original
    });
  });

  describe('interpolate method', () => {
    it('should have interpolate method', function() {
      expect(typeof dataObject.interpolate).toBe('function');
    });

    it('should handle hour series interpolation', function() {
      const testData = [
        { key: 'key1', src: 'demo://test1', time: 1700000000000, value: 20 },
        { key: 'key1', src: 'demo://test1', time: 1700000180000, value: 21 }  // 3 minutes later
      ];

      dataObject.setData(testData);

      expect(() => dataObject.interpolate('hour')).not.toThrow();
    });

    it('should handle day series interpolation', function() {
      const testData = [
        { key: 'key1', src: 'demo://test1', time: 1700000000000, value: 20 },
        { key: 'key1', src: 'demo://test1', time: 1700007200000, value: 21 }  // 2 hours later
      ];

      dataObject.setData(testData);

      expect(() => dataObject.interpolate('day')).not.toThrow();
    });

    it('should handle week series interpolation', function() {
      const testData = [
        { key: 'key1', src: 'demo://test1', time: 1700000000000, value: 20 },
        { key: 'key1', src: 'demo://test1', time: 1700172800000, value: 21 }  // 2 days later
      ];

      dataObject.setData(testData);

      expect(() => dataObject.interpolate('week')).not.toThrow();
    });

    it('should handle month series interpolation', function() {
      const testData = [
        { key: 'key1', src: 'demo://test1', time: 1700000000000, value: 20 },
        { key: 'key1', src: 'demo://test1', time: 1700172800000, value: 21 }  // 2 days later
      ];

      dataObject.setData(testData);

      expect(() => dataObject.interpolate('month')).not.toThrow();
    });

    it('should handle year series interpolation', function() {
      const testData = [
        { key: 'key1', src: 'demo://test1', time: 1700000000000, value: 20 },
        { key: 'key1', src: 'demo://test1', time: 1705270400000, value: 21 }  // 2 months later
      ];

      dataObject.setData(testData);

      expect(() => dataObject.interpolate('year')).not.toThrow();
    });
  });

  describe('getLineIndicesForKey method', () => {
    it('should return empty array when no line data', function() {
      const testData = [
        { key: 'key1', src: 'demo://test1', time: 1700000000000, value: 20 }
      ];

      dataObject.setData(testData);
      const indices = dataObject.getLineIndicesForKey('key1');

      expect(indices).toEqual([]);
    });
  });

  describe('domain caching', () => {
    it('should clear all caches when setData is called', function() {
      const testData1 = [
        { key: 'key1', src: 'demo://test1', time: 1700000000000, value: 20 }
      ];

      dataObject.setData(testData1);

      // Cache the domains
      dataObject.getTimesDomain();
      dataObject.getValuesDomain();
      dataObject.getKeysDomain();

      const testData2 = [
        { key: 'key2', src: 'demo://test2', time: 1700000100000, value: 50 }
      ];

      dataObject.setData(testData2);

      // New domains should reflect new data
      const keysDomain = dataObject.getKeysDomain();
      expect(keysDomain.has('key2')).toBeTrue();
      expect(keysDomain.has('key1')).toBeFalse();
    });
  });
});
