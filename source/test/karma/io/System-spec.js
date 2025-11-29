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
 * Unit tests for cv.io.System
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing cv.io.System', () => {
  let systemClient;

  beforeEach(() => {
    systemClient = new cv.io.System();
  });

  afterEach(() => {
    if (systemClient && !systemClient.isDisposed()) {
      systemClient.dispose();
    }
  });

  describe('class definition', () => {
    it('should be defined', () => {
      expect(cv.io.System).toBeDefined();
    });

    it('should extend cv.io.AbstractClient', () => {
      expect(systemClient instanceof cv.io.AbstractClient).toBe(true);
    });

    it('should implement cv.io.IClient', () => {
      expect(qx.Class.hasInterface(cv.io.System, cv.io.IClient)).toBe(true);
    });
  });

  describe('constructor', () => {
    it('should initialize addresses as empty array', () => {
      expect(systemClient.addresses).toEqual([]);
    });

    it('should be connected by default', () => {
      expect(systemClient.isConnected()).toBe(true);
    });
  });

  describe('getType', () => {
    it('should return "system"', () => {
      expect(systemClient.getType()).toBe('system');
    });
  });

  describe('login', () => {
    it('should call callback immediately', () => {
      const callback = jasmine.createSpy('loginCallback');
      const context = {};
      
      systemClient.login(false, null, callback, context);
      
      expect(callback).toHaveBeenCalled();
    });

    it('should not throw when callback is null', () => {
      expect(() => {
        systemClient.login(false, null, null, null);
      }).not.toThrow();
    });
  });

  describe('subscribe', () => {
    it('should set addresses from parameter', () => {
      systemClient.subscribe(['addr1', 'addr2']);
      
      expect(systemClient.addresses).toEqual(['addr1', 'addr2']);
    });

    it('should set empty array when addresses is null', () => {
      systemClient.subscribe(null);
      
      expect(systemClient.addresses).toEqual([]);
    });
    
    it('should load persisted values from localStorage if available', () => {
      // Set up localStorage with theme value
      if (qx.core.Environment.get('html.storage.local')) {
        localStorage.setItem('system:theme', 'dark');
        
        spyOn(systemClient, '_applyTheme');
        
        systemClient.subscribe([]);
        
        expect(systemClient._applyTheme).toHaveBeenCalledWith('dark');
        
        // Cleanup
        localStorage.removeItem('system:theme');
      }
    });
  });

  describe('addSubscription', () => {
    it('should add address to addresses array', () => {
      systemClient.addSubscription('new-address');
      
      expect(systemClient.addresses).toContain('new-address');
    });

    it('should not add duplicate addresses', () => {
      systemClient.addSubscription('duplicate-addr');
      systemClient.addSubscription('duplicate-addr');
      
      const count = systemClient.addresses.filter(a => a === 'duplicate-addr').length;
      expect(count).toBe(1);
    });
  });

  describe('write', () => {
    it('should not throw when address is null', () => {
      expect(() => {
        systemClient.write(null, 'value');
      }).not.toThrow();
    });

    it('should handle state address by updating model', () => {
      spyOn(cv.data.Model.getInstance(), 'onUpdate');
      
      systemClient.write('state:test', 'value');
      
      expect(cv.data.Model.getInstance().onUpdate).toHaveBeenCalledWith('state:test', 'value', 'system');
    });

    it('should handle notification address by updating model', () => {
      spyOn(cv.data.Model.getInstance(), 'onUpdate');
      
      systemClient.write('notification:test', 'value');
      
      expect(cv.data.Model.getInstance().onUpdate).toHaveBeenCalledWith('notification:test', 'value', 'system');
    });

    it('should handle theme address', () => {
      spyOn(systemClient, '_applyTheme');
      
      systemClient.write('theme', 'dark');
      
      expect(systemClient._applyTheme).toHaveBeenCalledWith('dark');
    });

    it('should handle nav:current-page address', () => {
      spyOn(cv.Application.structureController, 'scrollToPage');
      
      systemClient.write('nav:current-page', 'page-id');
      
      expect(cv.Application.structureController.scrollToPage).toHaveBeenCalledWith('page-id');
    });

    it('should handle backend:restart action', () => {
      spyOn(systemClient, 'restart');
      
      systemClient.write('backend:system', 'restart');
      
      expect(systemClient.restart).toHaveBeenCalledWith(true);
    });

    it('should log warning for unknown backend action', () => {
      spyOn(systemClient, 'warn');
      
      systemClient.write('backend:system', 'unknown-action');
      
      expect(systemClient.warn).toHaveBeenCalled();
    });

    it('should log warning for unknown browser action', () => {
      spyOn(systemClient, 'warn');
      
      systemClient.write('browser', 'unknown-action');
      
      expect(systemClient.warn).toHaveBeenCalled();
    });
    
    it('should handle http address by creating XHR', () => {
      let mockXhr = {
        send: jasmine.createSpy('send')
      };
      spyOn(qx.io.request, 'Xhr').and.returnValue(mockXhr);
      
      systemClient.write('http://example.com', 'value');
      
      expect(qx.io.request.Xhr).toHaveBeenCalledWith('http://example.com');
      expect(mockXhr.send).toHaveBeenCalled();
    });
    
    it('should persist theme to localStorage', () => {
      if (qx.core.Environment.get('html.storage.local')) {
        spyOn(systemClient, '_applyTheme');
        
        systemClient.write('theme', 'dark');
        
        expect(localStorage.getItem('system:theme')).toBe('dark');
        
        // Cleanup
        localStorage.removeItem('system:theme');
      }
    });
    
    it('should restart other backend on backend:name action', () => {
      const mockBackend = {
        restart: jasmine.createSpy('restart')
      };
      spyOn(cv.io.BackendConnections, 'getClient').and.returnValue(mockBackend);
      
      systemClient.write('backend:main', 'restart');
      
      expect(cv.io.BackendConnections.getClient).toHaveBeenCalledWith('main');
      expect(mockBackend.restart).toHaveBeenCalledWith(true);
    });
    
    it('should handle null backend gracefully', () => {
      spyOn(cv.io.BackendConnections, 'getClient').and.returnValue(null);
      
      expect(() => {
        systemClient.write('backend:nonexistent', 'restart');
      }).not.toThrow();
    });
  });

  describe('_applyTheme', () => {
    it('should set data-theme attribute on document element', () => {
      systemClient._applyTheme('dark');
      
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should update model with theme', () => {
      spyOn(cv.data.Model.getInstance(), 'onUpdate');
      
      systemClient._applyTheme('light');
      
      expect(cv.data.Model.getInstance().onUpdate).toHaveBeenCalledWith('theme', 'light', 'system');
    });
  });

  describe('getResourcePath', () => {
    it('should return null for charts', () => {
      expect(systemClient.getResourcePath('charts')).toBeNull();
    });

    it('should return name for other resources', () => {
      expect(systemClient.getResourcePath('other')).toBe('other');
    });
  });

  describe('getLastError', () => {
    it('should return null', () => {
      expect(systemClient.getLastError()).toBeNull();
    });
  });

  describe('getBackend', () => {
    it('should return empty Map', () => {
      const backend = systemClient.getBackend();
      expect(backend instanceof Map).toBe(true);
      expect(backend.size).toBe(0);
    });
  });

  describe('canAuthorize', () => {
    it('should return false', () => {
      expect(systemClient.canAuthorize()).toBe(false);
    });
  });

  describe('hasCustomChartsDataProcessor', () => {
    it('should return false', () => {
      expect(systemClient.hasCustomChartsDataProcessor()).toBe(false);
    });
  });

  describe('processChartsData', () => {
    it('should return data unchanged', () => {
      const data = { test: 'value' };
      expect(systemClient.processChartsData(data)).toBe(data);
    });
  });

  describe('hasProvider', () => {
    it('should return false', () => {
      expect(systemClient.hasProvider('any')).toBe(false);
    });
  });

  describe('getProviderUrl', () => {
    it('should return null', () => {
      expect(systemClient.getProviderUrl('any')).toBeNull();
    });
  });

  describe('getProviderConvertFunction', () => {
    it('should return null', () => {
      expect(systemClient.getProviderConvertFunction('any', 'json')).toBeNull();
    });
  });

  describe('getProviderData', () => {
    it('should return null for non-addresses name', () => {
      expect(systemClient.getProviderData('other', 'json')).toBeNull();
    });

    it('should return promise for addresses name', (done) => {
      systemClient.implementedAddresses = ['addr1', 'addr2'];
      
      const result = systemClient.getProviderData('addresses', 'json');
      
      expect(result).toEqual(jasmine.any(Promise));
      result.then(data => {
        expect(data.length).toBe(2);
        expect(data[0].label).toBe('addr1');
        expect(data[0].value).toBe('addr1');
        done();
      });
    });
  });

  describe('receive', () => {
    it('should not throw', () => {
      expect(() => {
        systemClient.receive({});
      }).not.toThrow();
    });
  });

  describe('restart', () => {
    it('should not throw', () => {
      expect(() => {
        systemClient.restart();
      }).not.toThrow();
    });
  });

  describe('stop', () => {
    it('should not throw', () => {
      expect(() => {
        systemClient.stop();
      }).not.toThrow();
    });
  });

  describe('terminate', () => {
    it('should not throw', () => {
      expect(() => {
        systemClient.terminate();
      }).not.toThrow();
    });
  });

  describe('authorize', () => {
    it('should not throw', () => {
      expect(() => {
        systemClient.authorize({});
      }).not.toThrow();
    });
  });

  describe('update', () => {
    it('should not throw', () => {
      expect(() => {
        systemClient.update({});
      }).not.toThrow();
    });
  });

  describe('record', () => {
    it('should not throw', () => {
      expect(() => {
        systemClient.record('type', {});
      }).not.toThrow();
    });
  });

  describe('showError', () => {
    it('should not throw', () => {
      expect(() => {
        systemClient.showError('type', 'message', []);
      }).not.toThrow();
    });
  });

  describe('setInitialAddresses', () => {
    it('should not throw', () => {
      expect(() => {
        systemClient.setInitialAddresses(['addr1']);
      }).not.toThrow();
    });
  });
});
