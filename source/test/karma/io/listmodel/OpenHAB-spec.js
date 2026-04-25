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
 * Unit tests for cv.io.listmodel.OpenHAB
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing cv.io.listmodel.OpenHAB', () => {
  let instance;
  let savedGetClientByType;

  beforeEach(() => {
    instance = new cv.io.listmodel.OpenHAB();
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
      expect(cv.io.listmodel.OpenHAB).toBeDefined();
    });

    it('should extend cv.io.listmodel.RssLog', () => {
      expect(instance instanceof cv.io.listmodel.RssLog).toBe(true);
    });

    it('should implement IListModel', () => {
      expect(qx.Class.hasInterface(cv.io.listmodel.OpenHAB, cv.io.listmodel.IListModel)).toBe(true);
    });

    it('should have REQUIRES static property', () => {
      expect(cv.io.listmodel.OpenHAB.REQUIRES).toEqual(['openhab']);
    });
  });

  describe('constructor', () => {
    it('should initialize model property', () => {
      expect(instance.getModel()).toBeDefined();
      expect(instance.getModel() instanceof qx.data.Array).toBe(true);
    });
  });

  describe('properties', () => {
    describe('item', () => {
      it('should accept string value', () => {
        instance.setItem('TestItem');
        expect(instance.getItem()).toBe('TestItem');
      });

      it('should default to empty string', () => {
        expect(instance.getItem()).toBe('');
      });
    });
  });

  describe('getRequestData', () => {
    it('should return empty object', () => {
      const data = instance.getRequestData();
      expect(data).toEqual({});
    });
  });

  describe('_getUrl', () => {
    it('should return null when no openHAB client', () => {
      cv.io.BackendConnections.getClientByType = () => null;
      
      expect(instance._getUrl()).toBeNull();
    });

    it('should return null when item is empty', () => {
      cv.io.BackendConnections.getClientByType = () => ({
        getResourcePath: jasmine.createSpy('getResourcePath').and.returnValue('http://test/rsslog')
      });
      instance.setItem('');
      
      expect(instance._getUrl()).toBeNull();
    });

    it('should return resource path from openHAB client', () => {
      const mockClient = {
        getResourcePath: jasmine.createSpy('getResourcePath').and.returnValue('http://openhab/rsslog?item=TestItem')
      };
      cv.io.BackendConnections.getClientByType = (type) => {
        if (type === 'openhab') {
          return mockClient;
        }
        return null;
      };
      instance.setItem('TestItem');
      
      const url = instance._getUrl();
      
      expect(url).toBe('http://openhab/rsslog?item=TestItem');
      expect(mockClient.getResourcePath).toHaveBeenCalledWith('rsslog', { item: 'TestItem' });
    });
  });

  describe('_convertResponse', () => {
    it('should convert openHAB persistence data to entry format', () => {
      const data = {
        name: 'TestItem',
        data: [
          { state: 'ON', time: 1700000000000 },
          { state: 'OFF', time: 1700001000000 }
        ]
      };
      
      const result = instance._convertResponse(data);
      
      expect(result.length).toBe(2);
      expect(result[0].content).toBe('ON');
      expect(result[0].tags).toEqual(['TestItem']);
      expect(result[0].publishedDate).toBe(1700000000000);
      expect(result[1].content).toBe('OFF');
    });

    it('should use item name as tag', () => {
      const data = {
        name: 'LightSwitch',
        data: [
          { state: '50', time: 1234567890 }
        ]
      };
      
      const result = instance._convertResponse(data);
      
      expect(result[0].tags).toEqual(['LightSwitch']);
    });

    it('should handle empty data array', () => {
      const data = {
        name: 'EmptyItem',
        data: []
      };
      
      const result = instance._convertResponse(data);
      
      expect(result).toEqual([]);
    });
  });

  describe('handleEvent', () => {
    it('should return false', () => {
      expect(instance.handleEvent({}, {}, {})).toBe(false);
    });
  });

  describe('events', () => {
    it('should have refresh event (inherited from RssLog)', () => {
      // OpenHAB extends RssLog which defines events
      // Check that instance can fire the event
      let eventFired = false;
      instance.addListener('refresh', () => {
        eventFired = true;
      });
      instance.fireEvent('refresh');
      expect(eventFired).toBe(true);
    });
  });

  describe('defer registration', () => {
    it('should be registered in Registry when openHAB backend is available', () => {
      cv.io.BackendConnections.getClientByType = (type) => {
        if (type === 'openhab') {
          return { type: 'openhab' };
        }
        return null;
      };
      
      const result = cv.io.listmodel.Registry.get('openhab');
      expect(result).toBe(cv.io.listmodel.OpenHAB);
    });
  });
});
