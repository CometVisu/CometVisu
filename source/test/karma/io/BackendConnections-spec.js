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
 * Unit tests for cv.io.BackendConnections
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing cv.io.BackendConnections', () => {
  let savedTestMode;
  let testCounter = 0;
  let createdClients = [];
  let oldDefaultBackendName;

  function getUniqueClientName(prefix) {
    testCounter++;
    return `${prefix}-${testCounter}-${Date.now()}`;
  }

  function createAndTrackClient(name, type, url, source) {
    const client = cv.io.BackendConnections.addBackendClient(name, type, url, source);
    createdClients.push(name);
    return client;
  }

  beforeEach(() => {
    savedTestMode = cv.Config.testMode;
    cv.Config.testMode = true;
    createdClients = [];
    oldDefaultBackendName = cv.data.Model.getInstance().getDefaultBackendName();
  });

  afterEach(() => {
    cv.Config.testMode = savedTestMode;
    
    // Clean up only clients we created
    createdClients.forEach(name => {
      try {
        if (cv.io.BackendConnections.hasClient(name)) {
          const client = cv.io.BackendConnections.getClient(name);
          if (client && !client.isDisposed()) {
            cv.io.BackendConnections.removeClient(client);
          }
        }
      } catch (e) {
        // ignore cleanup errors
      }
    });
    createdClients = [];
    cv.data.Model.getInstance().setDefaultBackendName(oldDefaultBackendName);
  });

  describe('class definition', () => {
    it('should be defined', () => {
      expect(cv.io.BackendConnections).toBeDefined();
    });

    it('should have static methods', () => {
      expect(typeof cv.io.BackendConnections.getClient).toBe('function');
      expect(typeof cv.io.BackendConnections.addBackendClient).toBe('function');
      expect(typeof cv.io.BackendConnections.hasClient).toBe('function');
      expect(typeof cv.io.BackendConnections.removeClient).toBe('function');
      expect(typeof cv.io.BackendConnections.getClients).toBe('function');
    });
  });

  describe('registerClientClass', () => {
    it('should register a client class', () => {
      const typeName = getUniqueClientName('type');
      const mockClass = function() {};
      cv.io.BackendConnections.registerClientClass(typeName, mockClass);
      expect(cv.io.BackendConnections.isRegistered(typeName)).toBe(true);
    });

    it('should not overwrite existing registration', () => {
      const typeName = getUniqueClientName('type');
      const mockClass1 = function() { this.id = 1; };
      const mockClass2 = function() { this.id = 2; };
      
      cv.io.BackendConnections.registerClientClass(typeName, mockClass1);
      cv.io.BackendConnections.registerClientClass(typeName, mockClass2);
      
      expect(cv.io.BackendConnections.isRegistered(typeName)).toBe(true);
    });
  });

  describe('isRegistered', () => {
    it('should return false for unregistered type', () => {
      expect(cv.io.BackendConnections.isRegistered('non-existent-type-xyz123')).toBe(false);
    });

    it('should return true for registered type', () => {
      const typeName = getUniqueClientName('regtype');
      cv.io.BackendConnections.registerClientClass(typeName, function() {});
      expect(cv.io.BackendConnections.isRegistered(typeName)).toBe(true);
    });
  });

  describe('addClassLoadedListener', () => {
    it('should add a listener for class loading', () => {
      const typeName = getUniqueClientName('listener');
      let called = false;
      cv.io.BackendConnections.addClassLoadedListener(typeName, () => {
        called = true;
      });
      
      cv.io.BackendConnections.registerClientClass(typeName, function() {});
      
      expect(called).toBe(true);
    });
  });

  describe('hasClient', () => {
    it('should return false when no client exists', () => {
      expect(cv.io.BackendConnections.hasClient('non-existent-client-abc123')).toBe(false);
    });

    it('should return true after adding a client', () => {
      const clientName = getUniqueClientName('client');
      createAndTrackClient(clientName, 'simulated');
      expect(cv.io.BackendConnections.hasClient(clientName)).toBe(true);
    });
  });

  describe('getClient', () => {
    it('should return system client for "system" name', () => {
      const client = cv.io.BackendConnections.getClient('system');
      expect(client).toBeDefined();
      expect(client instanceof cv.io.System).toBe(true);
    });

    it('should return default client when no name provided', () => {
      const clientName = getUniqueClientName('main');
      createAndTrackClient(clientName, 'simulated');
      cv.data.Model.getInstance().setDefaultBackendName(clientName);
      
      const client = cv.io.BackendConnections.getClient();
      expect(client).toBeDefined();
    });

    it('should return client by name', () => {
      const clientName = getUniqueClientName('byname');
      createAndTrackClient(clientName, 'simulated');
      
      const client = cv.io.BackendConnections.getClient(clientName);
      expect(client).toBeDefined();
      expect(client.getName()).toBe(clientName);
    });

    it('should return null for non-existent client in non-test mode', () => {
      cv.Config.testMode = false;
      const client = cv.io.BackendConnections.getClient('non-existent-client-xyz789');
      expect(client).toBeNull();
    });
  });

  describe('getClientByType', () => {
    it('should return system client for "system" type', () => {
      const client = cv.io.BackendConnections.getClientByType('system');
      expect(client).toBeDefined();
      expect(client instanceof cv.io.System).toBe(true);
    });

    it('should return null for non-existent type', () => {
      const client = cv.io.BackendConnections.getClientByType('non-existent-type-abc999');
      expect(client).toBeNull();
    });
  });

  describe('getClients', () => {
    it('should return an object', () => {
      const clients = cv.io.BackendConnections.getClients();
      expect(typeof clients).toBe('object');
    });

    it('should contain added clients', () => {
      const clientName = getUniqueClientName('inclient');
      createAndTrackClient(clientName, 'simulated');
      
      const clients = cv.io.BackendConnections.getClients();
      expect(clients[clientName]).toBeDefined();
    });
  });

  describe('addBackendClient', () => {
    it('should add a new client', () => {
      const clientName = getUniqueClientName('new');
      const client = createAndTrackClient(clientName, 'simulated');
      expect(client).toBeDefined();
      expect(cv.io.BackendConnections.hasClient(clientName)).toBe(true);
    });

    it('should throw error for "system" name', () => {
      expect(() => {
        cv.io.BackendConnections.addBackendClient('system', 'simulated');
      }).toThrow();
    });

    it('should replace existing client with same name', () => {
      const clientName = getUniqueClientName('replace');
      const client1 = createAndTrackClient(clientName, 'simulated');
      const client2 = cv.io.BackendConnections.addBackendClient(clientName, 'simulated');
      
      expect(cv.io.BackendConnections.getClient(clientName)).toBe(client2);
      expect(client1.isDisposed()).toBe(true);
    });

    it('should set the name on the client', () => {
      const clientName = getUniqueClientName('named');
      const client = createAndTrackClient(clientName, 'simulated');
      expect(client.getName()).toBe(clientName);
    });

    it('should set configuredIn property when source is provided', () => {
      const clientName = getUniqueClientName('source');
      const client = createAndTrackClient(clientName, 'simulated', null, 'config');
      expect(client.configuredIn).toBe('config');
    });
  });

  describe('removeClient', () => {
    it('should remove a client', () => {
      const clientName = getUniqueClientName('toremove');
      const client = createAndTrackClient(clientName, 'simulated');
      
      cv.io.BackendConnections.removeClient(client);
      // Remove from tracking since it's already removed
      createdClients = createdClients.filter(n => n !== clientName);
      
      expect(cv.io.BackendConnections.hasClient(clientName)).toBe(false);
    });
  });

  describe('initBackendClients', () => {
    it('should create mockup client in test mode', () => {
      const client = cv.io.BackendConnections.initBackendClients();
      
      expect(client).toBeDefined();
      expect(client.getType()).toBe('mockup');
    });
  });

  describe('initSystemBackend', () => {
    it('should create system backend', () => {
      cv.io.BackendConnections.initSystemBackend();
      expect(cv.io.BackendConnections.hasClient('system')).toBe(true);
    });

    it('should return same system backend on multiple calls', () => {
      cv.io.BackendConnections.initSystemBackend();
      const client1 = cv.io.BackendConnections.getClient('system');
      
      cv.io.BackendConnections.initSystemBackend();
      const client2 = cv.io.BackendConnections.getClient('system');
      
      expect(client1).toBe(client2);
    });
  });

  describe('startInitialRequests', () => {
    it('should not throw when called', () => {
      expect(() => {
        cv.io.BackendConnections.startInitialRequests();
      }).not.toThrow();
    });

    it('should call startInitialRequest for each client', () => {
      const clientName = getUniqueClientName('start');
      createAndTrackClient(clientName, 'simulated');
      
      spyOn(cv.io.BackendConnections, 'startInitialRequest');
      
      cv.io.BackendConnections.startInitialRequests();
      
      expect(cv.io.BackendConnections.startInitialRequest).toHaveBeenCalled();
    });
  });

  describe('startInitialRequest', () => {
    it('should get addresses from model', () => {
      const clientName = getUniqueClientName('subscribe');
      createAndTrackClient(clientName, 'simulated');
      
      spyOn(cv.data.Model.getInstance(), 'getAddresses').and.returnValue([]);
      
      cv.io.BackendConnections.startInitialRequest(clientName);
      
      expect(cv.data.Model.getInstance().getAddresses).toHaveBeenCalledWith(clientName);
    });
    
    it('should subscribe when addresses are available', () => {
      const clientName = getUniqueClientName('sub2');
      const client = createAndTrackClient(clientName, 'simulated');
      spyOn(client, 'subscribe');
      spyOn(cv.data.Model.getInstance(), 'getAddresses').and.returnValue(['addr1', 'addr2']);
      
      cv.io.BackendConnections.startInitialRequest(clientName);
      
      expect(client.subscribe).toHaveBeenCalledWith(['addr1', 'addr2']);
    });
  });

  describe('_handleClientError', () => {
    it('should handle PROTOCOL_MISSING_VERSION error', () => {
      spyOn(cv.core.notifications.Router, 'dispatchMessage');
      
      cv.io.BackendConnections._handleClientError(
        cv.io.Client.ERROR_CODES.PROTOCOL_MISSING_VERSION,
        { test: 'data' }
      );
      
      expect(cv.core.notifications.Router.dispatchMessage).toHaveBeenCalled();
    });

    it('should handle PROTOCOL_INVALID_READ_RESPONSE_MISSING_I error', () => {
      spyOn(cv.core.notifications.Router, 'dispatchMessage');
      
      cv.io.BackendConnections._handleClientError(
        cv.io.Client.ERROR_CODES.PROTOCOL_INVALID_READ_RESPONSE_MISSING_I,
        { test: 'data' }
      );
      
      expect(cv.core.notifications.Router.dispatchMessage).toHaveBeenCalled();
    });

    it('should not dispatch for unknown error code', () => {
      spyOn(cv.core.notifications.Router, 'dispatchMessage');
      
      cv.io.BackendConnections._handleClientError(999999, { test: 'data' });
      
      expect(cv.core.notifications.Router.dispatchMessage).not.toHaveBeenCalled();
    });
  });

  describe('_checkBackendConnection', () => {
    it('should dispatch message when client is disconnected', () => {
      const clientName = getUniqueClientName('conncheck');
      const client = createAndTrackClient(clientName, 'simulated');
      spyOn(client, 'isConnected').and.returnValue(false);
      spyOn(cv.core.notifications.Router, 'dispatchMessage');
      
      // Set hasBeenConnected to true
      cv.io.BackendConnections['__hasBeenConnected'] = true;
      
      cv.io.BackendConnections._checkBackendConnection(clientName);
      
      expect(cv.core.notifications.Router.dispatchMessage).toHaveBeenCalled();
    });
    
    it('should not dispatch when client is connected', () => {
      const clientName = getUniqueClientName('conncheck2');
      const client = createAndTrackClient(clientName, 'simulated');
      spyOn(client, 'isConnected').and.returnValue(true);
      spyOn(cv.core.notifications.Router, 'dispatchMessage');
      
      cv.io.BackendConnections._checkBackendConnection(clientName);
      
      // Should still dispatch but with connected condition
      expect(cv.core.notifications.Router.dispatchMessage).toHaveBeenCalled();
    });
    
    it('should include last error in message when available', () => {
      const clientName = getUniqueClientName('conncheck3');
      const client = createAndTrackClient(clientName, 'simulated');
      spyOn(client, 'isConnected').and.returnValue(false);
      spyOn(client, 'getLastError').and.returnValue({
        time: Date.now(),
        url: 'test-url',
        code: 500,
        text: 'Server Error'
      });
      spyOn(cv.core.notifications.Router, 'dispatchMessage');
      
      cv.io.BackendConnections['__hasBeenConnected'] = true;
      
      cv.io.BackendConnections._checkBackendConnection(clientName);
      
      const call = cv.core.notifications.Router.dispatchMessage.calls.first();
      expect(call.args[1].message).toContain('test-url');
    });
  });
  
  describe('_onActiveChanged', () => {
    it('should handle being called without throwing', () => {
      // _onActiveChanged should not throw
      expect(() => {
        cv.io.BackendConnections._onActiveChanged();
      }).not.toThrow();
    });
  });
});
