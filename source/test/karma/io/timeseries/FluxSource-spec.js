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
 * Unit tests for cv.io.timeseries.FluxSource
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing cv.io.timeseries.FluxSource', () => {
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
      expect(cv.io.timeseries.FluxSource).toBeDefined();
    });

    it('should extend AbstractTimeSeriesSource', () => {
      instance = new cv.io.timeseries.FluxSource('flux://org@bucket/measurement/field', mockChart);
      expect(instance instanceof cv.io.timeseries.AbstractTimeSeriesSource).toBe(true);
    });
  });

  describe('_init', () => {
    it('should initialize with valid flux URL', () => {
      instance = new cv.io.timeseries.FluxSource('flux://myorg@mybucket/mymeasurement/myfield', mockChart);
      
      expect(instance._baseRequestConfig).toBeDefined();
      expect(instance._baseRequestConfig.proxy).toBe(true);
      expect(instance._queryTemplate).toBeDefined();
      expect(instance._queryTemplate).toContain('mybucket');
      expect(instance._queryTemplate).toContain('mymeasurement');
      expect(instance._queryTemplate).toContain('myfield');
    });

    it('should set default field to "value" when not specified', () => {
      instance = new cv.io.timeseries.FluxSource('flux://myorg@mybucket/mymeasurement', mockChart);
      
      expect(instance._queryTemplate).toContain('_field == "value"');
    });

    it('should handle inline bucket type', () => {
      instance = new cv.io.timeseries.FluxSource('flux://myorg@inline/test', mockChart);
      
      expect(instance.isInline()).toBe(true);
      expect(instance._queryTemplate).toBeNull();
    });

    it('should parse aggregateWindow params', () => {
      instance = new cv.io.timeseries.FluxSource('flux://org@bucket/measurement?ag-every=1h&ag-fn=max', mockChart);
      
      expect(instance._queryTemplate).toContain('aggregateWindow');
      expect(instance._queryTemplate).toContain('every: 1h');
      expect(instance._queryTemplate).toContain('fn: max');
    });

    it('should add default fn=mean when only every is specified', () => {
      instance = new cv.io.timeseries.FluxSource('flux://org@bucket/measurement?ag-every=1h', mockChart);
      
      expect(instance._queryTemplate).toContain('fn: mean');
    });

    it('should skip invalid aggregateWindow params', () => {
      instance = new cv.io.timeseries.FluxSource('flux://org@bucket/measurement?ag-invalid=test', mockChart);
      
      // Should not include invalid param
      expect(instance._queryTemplate).not.toContain('invalid');
    });

    it('should not add aggregateWindow when "every" is missing', () => {
      instance = new cv.io.timeseries.FluxSource('flux://org@bucket/measurement?ag-fn=max', mockChart);
      
      // aggregateWindow requires 'every' parameter
      expect(instance._queryTemplate).not.toContain('aggregateWindow');
    });

    it('should handle invalid URL gracefully', () => {
      instance = new cv.io.timeseries.FluxSource('invalid://url', mockChart);
      
      expect(instance._baseRequestConfig.url).toBe('');
      expect(instance._baseRequestConfig.proxy).toBe(false);
    });
  });

  describe('isInline', () => {
    it('should return true for inline bucket', () => {
      instance = new cv.io.timeseries.FluxSource('flux://org@inline/test', mockChart);
      expect(instance.isInline()).toBe(true);
    });

    it('should return false for regular bucket', () => {
      instance = new cv.io.timeseries.FluxSource('flux://org@bucket/measurement', mockChart);
      expect(instance.isInline()).toBeFalsy();
    });
  });

  describe('setQueryTemplate', () => {
    it('should set the query template', () => {
      instance = new cv.io.timeseries.FluxSource('flux://org@inline/test', mockChart);
      instance.setQueryTemplate('custom query template');
      
      expect(instance._queryTemplate).toBe('custom query template');
    });
  });

  describe('_getAgWindowEveryForSeries', () => {
    beforeEach(() => {
      instance = new cv.io.timeseries.FluxSource('flux://org@bucket/measurement', mockChart);
    });

    it('should return 1m for hour series', () => {
      expect(instance._getAgWindowEveryForSeries('hour')).toBe('1m');
    });

    it('should return 1h for day series', () => {
      expect(instance._getAgWindowEveryForSeries('day')).toBe('1h');
    });

    it('should return 1d for week series', () => {
      expect(instance._getAgWindowEveryForSeries('week')).toBe('1d');
    });

    it('should return 1d for month series', () => {
      expect(instance._getAgWindowEveryForSeries('month')).toBe('1d');
    });

    it('should return 1mo for year series', () => {
      expect(instance._getAgWindowEveryForSeries('year')).toBe('1mo');
    });

    it('should return 1d as default', () => {
      expect(instance._getAgWindowEveryForSeries('unknown')).toBe('1d');
    });
  });

  describe('getRequestConfig', () => {
    beforeEach(() => {
      instance = new cv.io.timeseries.FluxSource('flux://org@bucket/measurement', mockChart);
    });

    it('should return config with URL and options', () => {
      const config = instance.getRequestConfig('end-1day', 'now', 'day', 0);
      
      expect(config.url).toBeDefined();
      expect(config.options).toBeDefined();
      expect(config.options.requestData).toBeDefined();
    });

    it('should include time range in URL for caching', () => {
      const config = instance.getRequestConfig('end-1day', 'now', 'day', 0);
      
      expect(config.url).toContain('range=');
    });

    it('should add aggregateWindow when not in template', () => {
      instance = new cv.io.timeseries.FluxSource('flux://org@bucket/measurement', mockChart);
      const config = instance.getRequestConfig('end-1day', 'now', 'day', 0);
      
      expect(config.options.requestData).toContain('aggregateWindow');
    });

    it('should replace $$AG-EVERY$$ placeholder', () => {
      instance = new cv.io.timeseries.FluxSource('flux://org@bucket/measurement?ag-every=$$AG-EVERY$$', mockChart);
      const config = instance.getRequestConfig('end-1day', 'now', 'day', 0);
      
      expect(config.options.requestData).not.toContain('$$AG-EVERY$$');
    });

    it('should add hash to URL', () => {
      const config = instance.getRequestConfig('end-1day', 'now', 'day', 0);
      
      expect(config.url).toContain('&h=');
    });

    it('should use default range when no start time provided', () => {
      const config = instance.getRequestConfig(null, null, 'day', 0);
      
      expect(config.options.requestData).toContain('start: -1d');
    });
  });

  describe('processResponse', () => {
    beforeEach(() => {
      instance = new cv.io.timeseries.FluxSource('flux://org@bucket/measurement', mockChart);
    });

    it('should parse CSV response to array of [time, value]', () => {
      const csvResponse = '_time,_value\n2025-01-01T00:00:00Z,10.5\n2025-01-01T01:00:00Z,20.3';
      
      const result = instance.processResponse(csvResponse);
      
      expect(result.length).toBe(2);
      expect(result[0].length).toBe(2);
      expect(typeof result[0][0]).toBe('number'); // timestamp
      expect(result[0][1]).toBe(10.5);
      expect(result[1][1]).toBe(20.3);
    });

    it('should handle carriage returns in response', () => {
      const csvResponse = '_time,_value\r\n2025-01-01T00:00:00Z,10.5\r\n';
      
      const result = instance.processResponse(csvResponse);
      
      expect(result.length).toBe(1);
      expect(result[0][1]).toBe(10.5);
    });

    it('should return empty array when _time or _value fields are missing', () => {
      const csvResponse = 'field1,field2\nvalue1,value2';
      
      const result = instance.processResponse(csvResponse);
      
      expect(result).toEqual([]);
    });

    it('should handle NaN values as 0', () => {
      const csvResponse = '_time,_value\n2025-01-01T00:00:00Z,invalid';
      
      const result = instance.processResponse(csvResponse);
      
      expect(result[0][1]).toBe(0);
    });

    it('should skip lines with empty values', () => {
      const csvResponse = '_time,_value\n2025-01-01T00:00:00Z,10\n2025-01-01T01:00:00Z,';
      
      const result = instance.processResponse(csvResponse);
      
      expect(result.length).toBe(1);
    });

    it('should handle additional columns in CSV', () => {
      const csvResponse = '_time,_measurement,_field,_value\n2025-01-01T00:00:00Z,temp,value,25.5';
      
      const result = instance.processResponse(csvResponse);
      
      expect(result.length).toBe(1);
      expect(result[0][1]).toBe(25.5);
    });
  });
});
