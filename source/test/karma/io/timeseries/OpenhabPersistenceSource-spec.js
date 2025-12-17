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
 * Unit tests for cv.io.timeseries.OpenhabPersistenceSource
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing cv.io.timeseries.OpenhabPersistenceSource', () => {
  let instance;
  let mockChart;
  let savedGetClientByType;

  beforeEach(() => {
    mockChart = {};
    savedGetClientByType = cv.io.BackendConnections.getClientByType;
  });

  afterEach(() => {
    cv.io.BackendConnections.getClientByType = savedGetClientByType;
    if (instance && !instance.isDisposed()) {
      instance.dispose();
    }
  });

  describe('class definition', () => {
    it('should be defined', () => {
      expect(cv.io.timeseries.OpenhabPersistenceSource).toBeDefined();
    });

    it('should extend AbstractTimeSeriesSource', () => {
      instance = new cv.io.timeseries.OpenhabPersistenceSource('openhab://ItemName', mockChart);
      expect(instance instanceof cv.io.timeseries.AbstractTimeSeriesSource).toBe(true);
    });
  });

  describe('getRequestConfig', () => {
    it('should return empty config for invalid URL', () => {
      instance = new cv.io.timeseries.OpenhabPersistenceSource('invalid://url', mockChart);
      const config = instance.getRequestConfig(null, null);
      
      expect(config.url).toBe('');
      expect(config.proxy).toBe(false);
    });

    it('should use default backend URL when no client available', () => {
      cv.io.BackendConnections.getClientByType = () => null;
      
      instance = new cv.io.timeseries.OpenhabPersistenceSource('openhab://ItemName', mockChart);
      const config = instance.getRequestConfig(null, null);
      
      expect(config.url).toContain('/rest/persistence/items/ItemName');
    });

    it('should use client backend URL when available', () => {
      cv.io.BackendConnections.getClientByType = (type) => {
        if (type === 'openhab') {
          return {
            getBackendUrl: () => 'http://openhab:8080/rest/'
          };
        }
        return null;
      };
      
      instance = new cv.io.timeseries.OpenhabPersistenceSource('openhab://ItemName', mockChart);
      const config = instance.getRequestConfig(null, null);
      
      expect(config.url).toContain('http://openhab:8080/rest/persistence/items/ItemName');
    });

    it('should include serviceId from authority', () => {
      cv.io.BackendConnections.getClientByType = () => null;
      
      instance = new cv.io.timeseries.OpenhabPersistenceSource('openhab://myservice@ItemName', mockChart);
      const config = instance.getRequestConfig(null, null);
      
      expect(config.url).toContain('serviceId=myservice');
    });

    it('should include time range parameters', () => {
      cv.io.BackendConnections.getClientByType = () => null;
      
      instance = new cv.io.timeseries.OpenhabPersistenceSource('openhab://ItemName', mockChart);
      const config = instance.getRequestConfig('end-1day', 'now');
      
      expect(config.url).toContain('starttime=');
      expect(config.url).toContain('endtime=');
    });

    it('should reuse baseRequestConfig', () => {
      cv.io.BackendConnections.getClientByType = () => null;
      
      instance = new cv.io.timeseries.OpenhabPersistenceSource('openhab://ItemName', mockChart);
      const config1 = instance.getRequestConfig(null, null);
      const config2 = instance.getRequestConfig(null, null);
      
      // Both should use the same base URL structure
      expect(config1.url.split('?')[0]).toBe(config2.url.split('?')[0]);
    });
  });

  describe('processResponse', () => {
    beforeEach(() => {
      instance = new cv.io.timeseries.OpenhabPersistenceSource('openhab://ItemName', mockChart);
    });

    it('should convert response with data array', () => {
      const response = {
        data: [
          { time: 1700000000000, state: '10.5' },
          { time: 1700001000000, state: '20.3' }
        ]
      };
      
      const result = instance.processResponse(response);
      
      expect(result.length).toBe(2);
      expect(result[0]).toEqual([1700000000000, 10.5]);
      expect(result[1]).toEqual([1700001000000, 20.3]);
    });

    it('should skip duplicate consecutive values', () => {
      const response = {
        data: [
          { time: 1700000000000, state: '10.5' },
          { time: 1700001000000, state: '10.5' },
          { time: 1700002000000, state: '20.3' }
        ]
      };
      
      const result = instance.processResponse(response);
      
      expect(result.length).toBe(2);
      expect(result[0][1]).toBe(10.5);
      expect(result[1][1]).toBe(20.3);
    });

    it('should return array response unchanged', () => {
      const response = [[1700000000000, 10.5], [1700001000000, 20.3]];
      
      const result = instance.processResponse(response);
      
      expect(result).toBe(response);
    });

    it('should return empty array for null response', () => {
      const result = instance.processResponse(null);
      
      expect(result).toEqual([]);
    });

    it('should return empty array for response without data', () => {
      const result = instance.processResponse({});
      
      expect(result).toEqual([]);
    });

    it('should handle undefined response', () => {
      const result = instance.processResponse(undefined);
      
      expect(result).toEqual([]);
    });
  });
});
