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
 * Unit tests for cv.io.timeseries.AbstractTimeSeriesSource
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing cv.io.timeseries.AbstractTimeSeriesSource', () => {
  let instance;
  let mockChart;

  beforeEach(() => {
    mockChart = {};
  });

  afterEach(() => {
    if (instance && !instance.isDisposed()) {
      instance.dispose();
    }
  });

  describe('class definition', () => {
    it('should be defined', () => {
      expect(cv.io.timeseries.AbstractTimeSeriesSource).toBeDefined();
    });

    it('should have urlRegex static property', () => {
      expect(cv.io.timeseries.AbstractTimeSeriesSource.urlRegex).toBeDefined();
      expect(cv.io.timeseries.AbstractTimeSeriesSource.urlRegex instanceof RegExp).toBe(true);
    });
  });

  describe('urlRegex', () => {
    const regex = cv.io.timeseries.AbstractTimeSeriesSource.urlRegex;

    it('should match flux URL', () => {
      const url = 'flux://org@bucket/measurement/field?ag-every=1h#anchor';
      const match = regex.exec(url);
      expect(match).not.toBeNull();
      expect(match[1]).toBe('flux');
      expect(match[4]).toBe('org');
      expect(match[5]).toBe('bucket');
      expect(match[6]).toBe('/measurement/field');
      expect(match[7]).toBe('ag-every=1h');
      expect(match[8]).toBe('anchor');
    });

    it('should match openhab URL', () => {
      const url = 'openhab://serviceId@ItemName';
      const match = regex.exec(url);
      expect(match).not.toBeNull();
      expect(match[1]).toBe('openhab');
      expect(match[4]).toBe('serviceId');
      expect(match[5]).toBe('ItemName');
    });

    it('should match rrd URL', () => {
      const url = 'rrd://filename?res=300&ds=AVERAGE';
      const match = regex.exec(url);
      expect(match).not.toBeNull();
      expect(match[1]).toBe('rrd');
      expect(match[5]).toBe('filename');
      expect(match[7]).toBe('res=300&ds=AVERAGE');
    });

    it('should match demo URL', () => {
      const url = 'demo://source@path';
      const match = regex.exec(url);
      expect(match).not.toBeNull();
      expect(match[1]).toBe('demo');
    });

    it('should match plugin URL with subtype', () => {
      const url = 'plugin+mytype://name/path';
      const match = regex.exec(url);
      expect(match).not.toBeNull();
      expect(match[1]).toBe('plugin');
      expect(match[2]).toBe('mytype');
      expect(match[5]).toBe('name');
    });
  });

  describe('constructor', () => {
    it('should initialize with resource and chart', () => {
      instance = new cv.io.timeseries.AbstractTimeSeriesSource('flux://org@bucket/measurement', mockChart);
      expect(instance._chart).toBe(mockChart);
    });

    it('should call init after construction', () => {
      instance = new cv.io.timeseries.AbstractTimeSeriesSource('flux://org@bucket/measurement', mockChart);
      expect(instance._initialized).toBe(true);
    });
  });

  describe('_parseResourceUrl', () => {
    it('should parse valid flux URL', () => {
      instance = new cv.io.timeseries.AbstractTimeSeriesSource('flux://myorg@mybucket/mymeasurement/myfield?ag-every=1h', mockChart);
      const config = instance.getConfig();
      
      expect(config).not.toBeNull();
      expect(config.type).toBe('flux');
      expect(config.authority).toBe('myorg');
      expect(config.name).toBe('mybucket');
      expect(config.path).toBe('/mymeasurement/myfield');
      expect(config.params['ag-every']).toBe('1h');
    });

    it('should parse URL without authority', () => {
      instance = new cv.io.timeseries.AbstractTimeSeriesSource('rrd://filename', mockChart);
      const config = instance.getConfig();
      
      expect(config).not.toBeNull();
      expect(config.type).toBe('rrd');
      expect(config.name).toBe('filename');
      expect(config.authority).toBeUndefined();
    });

    it('should parse URL with multiple params', () => {
      instance = new cv.io.timeseries.AbstractTimeSeriesSource('rrd://filename?res=300&ds=AVERAGE', mockChart);
      const config = instance.getConfig();
      
      expect(config.params.res).toBe('300');
      expect(config.params.ds).toBe('AVERAGE');
    });

    it('should parse URL with anchor', () => {
      // Note: The current regex doesn't correctly parse anchors when they're not preceded by params
      // This test documents the actual behavior
      instance = new cv.io.timeseries.AbstractTimeSeriesSource('flux://org@bucket/measurement?param=value#myanchor', mockChart);
      const config = instance.getConfig();
      
      expect(config.anchor).toBe('myanchor');
    });

    it('should return null for invalid URL', () => {
      instance = new cv.io.timeseries.AbstractTimeSeriesSource('invalid://url', mockChart);
      const config = instance.getConfig();
      
      expect(config).toBeNull();
    });
  });

  describe('init', () => {
    it('should only initialize once', () => {
      instance = new cv.io.timeseries.AbstractTimeSeriesSource('flux://org@bucket/measurement', mockChart);
      const firstInit = instance._initialized;
      
      instance.init();
      
      expect(instance._initialized).toBe(firstInit);
    });
  });

  describe('getRequestConfig', () => {
    it('should return default config', () => {
      instance = new cv.io.timeseries.AbstractTimeSeriesSource('flux://org@bucket/measurement', mockChart);
      const config = instance.getRequestConfig(new Date(), new Date(), 'day', 0);
      
      expect(config.url).toBe('');
      expect(config.options).toEqual({});
      expect(config.proxy).toBe(true);
    });
  });

  describe('processResponse', () => {
    it('should return data unchanged', () => {
      instance = new cv.io.timeseries.AbstractTimeSeriesSource('flux://org@bucket/measurement', mockChart);
      const data = [1, 2, 3];
      
      expect(instance.processResponse(data)).toBe(data);
    });
  });

  describe('getTimeRange', () => {
    beforeEach(() => {
      instance = new cv.io.timeseries.AbstractTimeSeriesSource('flux://org@bucket/measurement', mockChart);
    });

    it('should return null start and end when start is not provided', () => {
      const result = instance.getTimeRange(null, null);
      
      expect(result.start).toBeNull();
      expect(result.end).toBeNull();
    });

    it('should parse end-Xsecond format', () => {
      const result = instance.getTimeRange('end-5second', 'now');
      
      expect(result.start).toBeDefined();
      expect(result.end).toBeDefined();
      expect(result.end.getTime() - result.start.getTime()).toBe(5000);
    });

    it('should parse end-Xminute format', () => {
      const result = instance.getTimeRange('end-2minute', 'now');
      
      expect(result.end.getTime() - result.start.getTime()).toBe(2 * 60000);
    });

    it('should parse end-Xhour format', () => {
      const result = instance.getTimeRange('end-3hour', 'now');
      
      expect(result.end.getTime() - result.start.getTime()).toBe(3 * 60 * 60000);
    });

    it('should parse end-Xday format', () => {
      const result = instance.getTimeRange('end-1day', 'now');
      
      expect(result.end.getTime() - result.start.getTime()).toBe(24 * 60 * 60000);
    });

    it('should parse end-Xweek format', () => {
      const result = instance.getTimeRange('end-1week', 'now');
      
      expect(result.end.getTime() - result.start.getTime()).toBe(7 * 24 * 60 * 60000);
    });

    it('should parse end-Xmonth format', () => {
      const result = instance.getTimeRange('end-1month', 'now');
      
      expect(result.end.getTime() - result.start.getTime()).toBe(30 * 24 * 60 * 60000);
    });

    it('should parse end-Xyear format', () => {
      const result = instance.getTimeRange('end-1year', 'now');
      
      expect(result.end.getTime() - result.start.getTime()).toBe(365 * 24 * 60 * 60000);
    });

    it('should use default amount of 1 when not specified', () => {
      const result = instance.getTimeRange('end-hour', 'now');
      
      expect(result.end.getTime() - result.start.getTime()).toBe(60 * 60000);
    });

    it('should parse unix timestamp as start', () => {
      const timestamp = 1700000000;
      const result = instance.getTimeRange(String(timestamp), 'now');
      
      expect(result.start.getTime()).toBe(timestamp * 1000);
    });

    it('should use current time as end when not specified', () => {
      const before = Date.now();
      const result = instance.getTimeRange('end-1hour', null);
      const after = Date.now();
      
      expect(result.end.getTime()).toBeGreaterThanOrEqual(before);
      expect(result.end.getTime()).toBeLessThanOrEqual(after);
    });
  });

  describe('_convertTimes', () => {
    beforeEach(() => {
      instance = new cv.io.timeseries.AbstractTimeSeriesSource('flux://org@bucket/measurement', mockChart);
    });

    it('should return current date for "now"', () => {
      const before = Date.now();
      const result = instance._convertTimes('now');
      const after = Date.now();
      
      expect(result.getTime()).toBeGreaterThanOrEqual(before);
      expect(result.getTime()).toBeLessThanOrEqual(after);
    });

    it('should convert unix timestamp', () => {
      const timestamp = 1700000000;
      const result = instance._convertTimes(String(timestamp));
      
      expect(result.getTime()).toBe(timestamp * 1000);
    });

    it('should return null for invalid time', () => {
      const result = instance._convertTimes('invalid');
      
      expect(result).toBeNull();
    });
  });
});
