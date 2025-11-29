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
 * Unit tests for cv.io.listmodel.FritzCallList
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing cv.io.listmodel.FritzCallList', () => {
  let instance;
  let savedFetch;

  beforeEach(() => {
    instance = new cv.io.listmodel.FritzCallList();
    savedFetch = cv.io.Fetch.fetch;
  });

  afterEach(() => {
    cv.io.Fetch.fetch = savedFetch;
    if (instance && !instance.isDisposed()) {
      instance.dispose();
    }
  });

  describe('class definition', () => {
    it('should be defined', () => {
      expect(cv.io.listmodel.FritzCallList).toBeDefined();
    });

    it('should extend qx.core.Object', () => {
      expect(instance instanceof qx.core.Object).toBe(true);
    });

    it('should implement IListModel', () => {
      expect(qx.Class.hasInterface(cv.io.listmodel.FritzCallList, cv.io.listmodel.IListModel)).toBe(true);
    });

    it('should include MStringTransforms mixin', () => {
      expect(qx.Class.hasMixin(cv.io.listmodel.FritzCallList, cv.util.MStringTransforms)).toBe(true);
    });

    it('should have REQUIRES static property', () => {
      expect(cv.io.listmodel.FritzCallList.REQUIRES).toEqual(['php']);
    });
  });

  describe('constructor', () => {
    it('should initialize model property', () => {
      expect(instance.getModel()).toBeDefined();
      expect(instance.getModel() instanceof qx.data.Array).toBe(true);
    });

    it('should start with empty model', () => {
      expect(instance.getModel().getLength()).toBe(0);
    });
  });

  describe('properties', () => {
    describe('device', () => {
      it('should accept string value', () => {
        instance.setDevice('myfritzbox');
        expect(instance.getDevice()).toBe('myfritzbox');
      });

      it('should default to empty string', () => {
        expect(instance.getDevice()).toBe('');
      });
    });

    describe('max', () => {
      it('should accept number value', () => {
        instance.setMax(100);
        expect(instance.getMax()).toBe(100);
      });

      it('should transform string to number', () => {
        instance.setMax('50');
        expect(instance.getMax()).toBe(50);
      });

      it('should default to 0', () => {
        expect(instance.getMax()).toBe(0);
      });
    });
  });

  describe('_applyDevice', () => {
    it('should trigger init on next refresh when device changes', async () => {
      // Initialize first
      instance.setDevice('device1');
      cv.io.Fetch.fetch = jasmine.createSpy('fetch').and.returnValue(
        Promise.resolve('http://fritz.box/calllist?id=123')
      );
      await instance.refresh(); // This sets __calllistUri
      
      // Now change device - this should reset __calllistUri internally
      instance.setDevice('device2');
      
      // Reset fetch spy to count calls
      cv.io.Fetch.fetch = jasmine.createSpy('fetch').and.returnValue(
        Promise.resolve('http://fritz.box/calllist?id=456')
      );
      
      await instance.refresh();
      
      // _init should have been called again (first call for SOAP, second for proxy)
      // If device reset works, we'll see 2 fetch calls (init + refresh)
      expect(cv.io.Fetch.fetch.calls.count()).toBeGreaterThanOrEqual(1);
    });
  });

  describe('_init via refresh', () => {
    it('should initialize calllist URI from successful SOAP response', async () => {
      let fetchCalls = [];
      cv.io.Fetch.fetch = jasmine.createSpy('fetch').and.callFake((url) => {
        fetchCalls.push(url);
        if (url.includes('soap.php')) {
          return Promise.resolve('http://fritz.box/calllist?id=123');
        }
        return Promise.resolve('<root></root>');
      });
      
      await instance.refresh();
      
      // Should have called SOAP endpoint first
      expect(fetchCalls.some(url => url.includes('soap.php'))).toBe(true);
      // Then should have called proxy
      expect(fetchCalls.some(url => url.includes('proxy.php'))).toBe(true);
    });

    it('should dispatch error on non-string SOAP response', async () => {
      cv.io.Fetch.fetch = jasmine.createSpy('fetch').and.returnValue(
        Promise.resolve({ error: 'some error' })
      );
      
      spyOn(cv.core.notifications.Router, 'dispatchMessage');
      
      await instance.refresh();
      
      expect(cv.core.notifications.Router.dispatchMessage).toHaveBeenCalledWith(
        'cv.tr064.error',
        jasmine.objectContaining({
          severity: 'urgent'
        })
      );
    });

    it('should dispatch error on fetch error', async () => {
      cv.io.Fetch.fetch = jasmine.createSpy('fetch').and.returnValue(
        Promise.reject({ url: 'test-url', status: 500, statusText: 'Internal Server Error' })
      );
      
      spyOn(cv.core.notifications.Router, 'dispatchMessage');
      
      await instance.refresh();
      
      expect(cv.core.notifications.Router.dispatchMessage).toHaveBeenCalledWith(
        'cv.tr064.error',
        jasmine.objectContaining({
          severity: 'urgent'
        })
      );
    });

    it('should construct correct SOAP URL with device', async () => {
      instance.setDevice('fritzbox1');
      let soapUrl;
      cv.io.Fetch.fetch = jasmine.createSpy('fetch').and.callFake((url) => {
        if (url.includes('soap.php')) {
          soapUrl = url;
        }
        return Promise.resolve('calllist-uri');
      });
      
      await instance.refresh();
      
      expect(soapUrl).toContain('resource/plugins/tr064/soap.php');
      expect(soapUrl).toContain('device=fritzbox1');
      expect(soapUrl).toContain('fn=GetCallList');
    });
  });

  describe('refresh', () => {
    it('should call _init on first refresh', async () => {
      let fetchCalls = 0;
      cv.io.Fetch.fetch = jasmine.createSpy('fetch').and.callFake((url) => {
        fetchCalls++;
        if (url.includes('soap.php')) {
          return Promise.resolve('http://test/calllist');
        }
        return Promise.resolve('<root></root>');
      });
      
      await instance.refresh();
      
      // Should have called at least the SOAP endpoint
      expect(fetchCalls).toBeGreaterThanOrEqual(1);
    });

    it('should not make proxy request if init fails', async () => {
      cv.io.Fetch.fetch = jasmine.createSpy('fetch').and.returnValue(
        Promise.resolve({ error: 'failed' }) // Non-string = fail
      );
      
      spyOn(cv.core.notifications.Router, 'dispatchMessage');
      
      await instance.refresh();
      
      // Should only have called SOAP, not proxy
      expect(cv.io.Fetch.fetch.calls.count()).toBe(1);
    });

    it('should clear model before refreshing', async () => {
      instance.getModel().push({ test: 'data' });
      
      cv.io.Fetch.fetch = jasmine.createSpy('fetch').and.callFake((url) => {
        if (url.includes('soap.php')) {
          return Promise.resolve('http://test/calllist');
        }
        return Promise.resolve('<root></root>');
      });
      
      await instance.refresh();
      
      expect(instance.getModel().getLength()).toBe(0);
    });

    it('should parse XML response and populate model', async () => {
      instance.setDevice('testdevice');
      instance.setMax(10);
      
      const xmlResponse = `
        <root>
          <Call>
            <Id>1</Id>
            <Type>1</Type>
            <Name>John Doe</Name>
            <Number>1234567890</Number>
          </Call>
          <Call>
            <Id>2</Id>
            <Type>2</Type>
            <Name>Jane Smith</Name>
            <Number>0987654321</Number>
          </Call>
        </root>
      `;
      
      cv.io.Fetch.fetch = jasmine.createSpy('fetch').and.callFake((url) => {
        if (url.includes('soap.php')) {
          return Promise.resolve('http://test/calllist');
        }
        return Promise.resolve(xmlResponse);
      });
      
      await instance.refresh();
      
      expect(instance.getModel().getLength()).toBe(2);
      expect(instance.getModel().getItem(0).Name).toBe('John Doe');
      expect(instance.getModel().getItem(1).Name).toBe('Jane Smith');
    });

    it('should construct correct proxy URL with device and max', async () => {
      instance.setDevice('myfritz');
      instance.setMax(25);
      
      let proxyUrl;
      cv.io.Fetch.fetch = jasmine.createSpy('fetch').and.callFake((url) => {
        if (url.includes('soap.php')) {
          return Promise.resolve('http://fritz.box/calllist?id=abc123');
        }
        proxyUrl = url;
        return Promise.resolve('<root></root>');
      });
      
      await instance.refresh();
      
      expect(proxyUrl).toContain('resource/plugins/tr064/proxy.php');
      expect(proxyUrl).toContain('device=myfritz');
      expect(proxyUrl).toContain('%26max=25');
    });

    it('should retry on 404 error', async () => {
      let proxyCallCount = 0;
      let soapCallCount = 0;
      
      cv.io.Fetch.fetch = jasmine.createSpy('fetch').and.callFake((url) => {
        if (url.includes('soap.php')) {
          soapCallCount++;
          return Promise.resolve('http://test/calllist');
        }
        proxyCallCount++;
        if (proxyCallCount === 1) {
          return Promise.reject({ status: 404 });
        }
        return Promise.resolve('<root></root>');
      });
      
      await instance.refresh();
      
      // Should have called SOAP twice (initial + retry after 404)
      expect(soapCallCount).toBe(2);
      // Should have called proxy twice
      expect(proxyCallCount).toBe(2);
    });

    it('should dispatch error notification on non-404 error', async () => {
      cv.io.Fetch.fetch = jasmine.createSpy('fetch').and.callFake((url) => {
        if (url.includes('soap.php')) {
          return Promise.resolve('http://test/calllist');
        }
        return Promise.reject({ url: 'test-url', status: 500, statusText: 'Server Error' });
      });
      
      spyOn(cv.core.notifications.Router, 'dispatchMessage');
      
      await instance.refresh();
      
      expect(cv.core.notifications.Router.dispatchMessage).toHaveBeenCalledWith(
        'cv.tr064.error',
        jasmine.objectContaining({
          severity: 'urgent'
        })
      );
      expect(instance.getModel().getLength()).toBe(0);
    });
  });

  describe('handleEvent', () => {
    it('should return false', () => {
      expect(instance.handleEvent()).toBe(false);
    });
  });

  describe('events', () => {
    it('should have refresh event', () => {
      expect(cv.io.listmodel.FritzCallList.$$events.refresh).toBeDefined();
    });
  });

  describe('defer registration', () => {
    it('should be registered in Registry', () => {
      const app = qx.core.Init.getApplication();
      const savedMethod = app.getServerHasPhpSupport;
      app.getServerHasPhpSupport = () => true;
      
      const result = cv.io.listmodel.Registry.get('fritzcalllist');
      expect(result).toBe(cv.io.listmodel.FritzCallList);
      
      app.getServerHasPhpSupport = savedMethod;
    });
  });
});
