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
 * Unit tests for cv.io.timeseries.RRDSource
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing cv.io.timeseries.RRDSource', () => {
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
      expect(cv.io.timeseries.RRDSource).toBeDefined();
    });

    it('should extend AbstractTimeSeriesSource', () => {
      instance = new cv.io.timeseries.RRDSource('rrd://filename', mockChart);
      expect(instance instanceof cv.io.timeseries.AbstractTimeSeriesSource).toBe(true);
    });
  });

  describe('_init', () => {
    it('should initialize with valid rrd URL', () => {
      instance = new cv.io.timeseries.RRDSource('rrd://myfile', mockChart);
      
      expect(instance._baseRequestConfig).toBeDefined();
      expect(instance._baseRequestConfig.url).toContain('/cgi-bin/rrdfetch');
      expect(instance._baseRequestConfig.url).toContain('rrd=myfile.rrd');
      expect(instance._baseRequestConfig.proxy).toBe(false);
    });

    it('should add default resolution when not specified', () => {
      instance = new cv.io.timeseries.RRDSource('rrd://myfile', mockChart);
      
      expect(instance._baseRequestConfig.url).toContain('res=300');
    });

    it('should add default ds function when not specified', () => {
      instance = new cv.io.timeseries.RRDSource('rrd://myfile', mockChart);
      
      expect(instance._baseRequestConfig.url).toContain('ds=AVERAGE');
    });

    it('should use custom resolution from params', () => {
      instance = new cv.io.timeseries.RRDSource('rrd://myfile?res=600', mockChart);
      
      expect(instance._baseRequestConfig.url).toContain('res=600');
      expect(instance._baseRequestConfig.url).not.toContain('res=300');
    });

    it('should use custom ds function from params', () => {
      instance = new cv.io.timeseries.RRDSource('rrd://myfile?ds=MAX', mockChart);
      
      expect(instance._baseRequestConfig.url).toContain('ds=MAX');
      expect(instance._baseRequestConfig.url).not.toContain('ds=AVERAGE');
    });

    it('should handle invalid URL gracefully', () => {
      instance = new cv.io.timeseries.RRDSource('invalid://url', mockChart);
      
      expect(instance._baseRequestConfig.url).toBe('');
      expect(instance._baseRequestConfig.proxy).toBe(false);
    });

    it('should initialize DateFormat', () => {
      instance = new cv.io.timeseries.RRDSource('rrd://myfile', mockChart);
      
      expect(instance._timeFormat).toBeDefined();
    });
  });

  describe('getRequestConfig', () => {
    beforeEach(() => {
      instance = new cv.io.timeseries.RRDSource('rrd://myfile', mockChart);
    });

    it('should return config with URL', () => {
      const config = instance.getRequestConfig('end-1day', 'now', 'day', 0);
      
      expect(config.url).toBeDefined();
      expect(config.url).toContain('/cgi-bin/rrdfetch');
    });

    it('should add start and end to URL', () => {
      const config = instance.getRequestConfig('end-1day', 'now', 'day', 0);
      
      expect(config.url).toContain('start=');
      expect(config.url).toContain('end=');
    });

    it('should format start as now-Xseries for offset 0', () => {
      const config = instance.getRequestConfig('end-1day', 'now', 'day', 0);
      
      expect(config.url).toContain('start=now-1day');
      expect(config.url).toContain('end=now');
    });

    it('should format end as now-Xseries for offset > 0', () => {
      const config = instance.getRequestConfig('end-1day', 'now', 'day', 1);
      
      expect(config.url).toContain('start=now-2day');
      expect(config.url).toContain('end=now-1day');
    });

    it('should handle different series types', () => {
      const configHour = instance.getRequestConfig('end-1hour', 'now', 'hour', 0);
      expect(configHour.url).toContain('start=now-1hour');

      const configWeek = instance.getRequestConfig('end-1week', 'now', 'week', 0);
      expect(configWeek.url).toContain('start=now-1week');

      const configMonth = instance.getRequestConfig('end-1month', 'now', 'month', 0);
      expect(configMonth.url).toContain('start=now-1month');

      const configYear = instance.getRequestConfig('end-1year', 'now', 'year', 0);
      expect(configYear.url).toContain('start=now-1year');
    });

    it('should preserve base config params', () => {
      instance = new cv.io.timeseries.RRDSource('rrd://myfile?res=600&ds=MAX', mockChart);
      const config = instance.getRequestConfig('end-1day', 'now', 'day', 0);
      
      expect(config.url).toContain('res=600');
      expect(config.url).toContain('ds=MAX');
    });
  });

  describe('processResponse', () => {
    beforeEach(() => {
      instance = new cv.io.timeseries.RRDSource('rrd://myfile', mockChart);
    });

    it('should return response unchanged', () => {
      const response = [[1700000000, 10.5], [1700001000, 20.3]];
      
      const result = instance.processResponse(response);
      
      expect(result).toBe(response);
    });
  });
});
