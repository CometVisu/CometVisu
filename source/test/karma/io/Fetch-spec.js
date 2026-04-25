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
 * Unit tests for cv.io.Fetch
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing cv.io.Fetch', () => {
  let savedCache;
  let savedGcInterval;
  
  beforeEach(() => {
    // Save and clear cache
    savedCache = cv.io.Fetch.__cache;
    savedGcInterval = cv.io.Fetch.__gcInterval;
    cv.io.Fetch.__cache = {};
    if (cv.io.Fetch.__gcInterval) {
      clearInterval(cv.io.Fetch.__gcInterval);
      cv.io.Fetch.__gcInterval = null;
    }
  });
  
  afterEach(() => {
    // Restore cache 
    if (cv.io.Fetch.__gcInterval) {
      clearInterval(cv.io.Fetch.__gcInterval);
    }
    cv.io.Fetch.__cache = savedCache || {};
    cv.io.Fetch.__gcInterval = savedGcInterval;
  });

  describe('class definition', () => {
    it('should be defined', () => {
      expect(cv.io.Fetch).toBeDefined();
    });

    it('should have static methods', () => {
      expect(typeof cv.io.Fetch.fetch).toBe('function');
      expect(typeof cv.io.Fetch.cachedFetch).toBe('function');
      expect(typeof cv.io.Fetch.proxyFetch).toBe('function');
      expect(typeof cv.io.Fetch._gc).toBe('function');
    });

    it('should have DEFAULT_CACHE_TTL constant', () => {
      expect(cv.io.Fetch.DEFAULT_CACHE_TTL).toBeDefined();
      expect(typeof cv.io.Fetch.DEFAULT_CACHE_TTL).toBe('number');
      expect(cv.io.Fetch.DEFAULT_CACHE_TTL).toBe(5 * 60); // 5 minutes
    });
  });

  describe('_gc (garbage collection)', () => {
    it('should not throw when cache is empty', () => {
      expect(() => {
        cv.io.Fetch._gc();
      }).not.toThrow();
    });
    
    it('should not remove recent entries', () => {
      // Add a fresh entry (time is recent)
      cv.io.Fetch.__cache['fresh-resource'] = {
        data: 'fresh-data',
        time: Date.now() - 1000, // 1 second ago (not older than 1 hour)
        ttl: cv.io.Fetch.DEFAULT_CACHE_TTL
      };
      
      cv.io.Fetch._gc();
      
      expect(cv.io.Fetch.__cache['fresh-resource']).toBeDefined();
    });
    
    it('should keep entries with long TTL even if old', () => {
      // Entry is old but has TTL >= maxAge (1 hour)
      // ttl*1000 must be >= maxAge to NOT be deleted
      cv.io.Fetch.__cache['long-ttl-resource'] = {
        data: 'long-ttl-data',
        time: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
        ttl: 60 * 60 // 1 hour in seconds, so ttl*1000 = maxAge
      };
      
      cv.io.Fetch._gc();
      
      expect(cv.io.Fetch.__cache['long-ttl-resource']).toBeDefined();
    });
  });

  describe('cachedFetch', () => {
    // cachedFetch is difficult to test without real HTTP mocking
    // We just test that the function exists and is callable
    it('should be a function', () => {
      expect(typeof cv.io.Fetch.cachedFetch).toBe('function');
    });
  });

  describe('fetch', () => {
    let mockXhr;
    let listeners = {};
    
    beforeEach(() => {
      listeners = {};
      mockXhr = {
        set: jasmine.createSpy('set'),
        addListener: jasmine.createSpy('addListener').and.callFake((event, callback) => {
          listeners[event] = callback;
        }),
        send: jasmine.createSpy('send')
      };
      spyOn(qx.io.request, 'Xhr').and.returnValue(mockXhr);
    });
    
    it('should create XHR request with resource', () => {
      cv.io.Fetch.fetch('test-resource');
      
      expect(qx.io.request.Xhr).toHaveBeenCalledWith('test-resource');
      expect(mockXhr.send).toHaveBeenCalled();
    });
    
    it('should set options on XHR', () => {
      cv.io.Fetch.fetch('test-resource', { method: 'POST' });
      
      expect(mockXhr.set).toHaveBeenCalledWith({ method: 'POST' });
    });
    
    it('should resolve on success', async () => {
      const promise = cv.io.Fetch.fetch('test-resource');
      
      // Simulate success event
      const mockRequest = {
        getResponse: () => 'success-response'
      };
      listeners['success']({ getTarget: () => mockRequest });
      
      const result = await promise;
      expect(result).toBe('success-response');
    });
    
    it('should reject on statusError', async () => {
      const promise = cv.io.Fetch.fetch('test-resource');
      
      // Simulate statusError event
      const mockRequest = {
        getStatusText: () => 'Not Found',
        getStatus: () => 404
      };
      listeners['statusError']({ getTarget: () => mockRequest });
      
      try {
        await promise;
        fail('Should have rejected');
      } catch (error) {
        expect(error.url).toBe('test-resource');
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      }
    });
    
    it('should reject on fail', async () => {
      const promise = cv.io.Fetch.fetch('test-resource');
      
      // Simulate fail event
      const mockRequest = {
        getStatus: () => 0
      };
      listeners['fail']({ getTarget: () => mockRequest });
      
      try {
        await promise;
        fail('Should have rejected');
      } catch (error) {
        expect(error.url).toBe('test-resource');
        expect(error.statusText).toBe('response parsing failure');
      }
    });
    
    it('should strip proxy parameters when not using proxy', () => {
      cv.io.Fetch.fetch('test-resource', {
        'self-signed': true,
        'config-section': 'test',
        'auth-type': 'basic',
        method: 'GET'
      });
      
      // Only method should be passed to set
      expect(mockXhr.set).toHaveBeenCalledWith({ method: 'GET' });
    });
    
    it('should call client.authorize when client is provided', () => {
      const mockClient = {
        authorize: jasmine.createSpy('authorize')
      };
      
      cv.io.Fetch.fetch('test-resource', {}, false, mockClient);
      
      expect(mockClient.authorize).toHaveBeenCalledWith(mockXhr);
    });
  });

  describe('proxyFetch', () => {
    beforeEach(() => {
      spyOn(cv.io.Fetch, 'fetch').and.returnValue(Promise.resolve('proxy-response'));
    });
    
    it('should call fetch with proxy=true', async () => {
      const mockClient = { authorize: () => {} };
      
      await cv.io.Fetch.proxyFetch('test-url', { method: 'GET' }, mockClient);
      
      expect(cv.io.Fetch.fetch).toHaveBeenCalledWith(
        'test-url',
        { method: 'GET' },
        true,
        mockClient
      );
    });
  });
});
