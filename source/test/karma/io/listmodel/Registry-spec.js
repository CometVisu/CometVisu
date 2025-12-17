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
 * Unit tests for cv.io.listmodel.Registry
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing cv.io.listmodel.Registry', () => {
  let mockModelClass;
  let savedPhpSupport;
  let savedClientByType;

  beforeEach(() => {
    // Create a mock class that implements IListModel
    mockModelClass = qx.Class.define('cv.io.listmodel.TestMockModel', {
      extend: qx.core.Object,
      implement: cv.io.listmodel.IListModel,
      statics: {
        REQUIRES: null
      },
      properties: {
        model: {
          check: 'qx.data.Array',
          deferredInit: true
        }
      },
      events: {
        refresh: 'qx.event.type.Event'
      },
      members: {
        async refresh() {},
        handleEvent() { return false; }
      }
    });

    // Save original methods
    savedClientByType = cv.io.BackendConnections.getClientByType;
  });

  afterEach(() => {
    // Unregister test class
    cv.io.listmodel.Registry.unregister(mockModelClass);
    
    // Restore methods
    cv.io.BackendConnections.getClientByType = savedClientByType;
    
    // Clean up qooxdoo class
    if (qx.Class.isDefined('cv.io.listmodel.TestMockModel')) {
      qx.Class.undefine('cv.io.listmodel.TestMockModel');
    }
  });

  describe('class definition', () => {
    it('should be defined', () => {
      expect(cv.io.listmodel.Registry).toBeDefined();
    });

    it('should be a static class', () => {
      expect(cv.io.listmodel.Registry.$$classtype).toBe('static');
    });

    it('should have static methods', () => {
      expect(typeof cv.io.listmodel.Registry.register).toBe('function');
      expect(typeof cv.io.listmodel.Registry.unregister).toBe('function');
      expect(typeof cv.io.listmodel.Registry.get).toBe('function');
    });
  });

  describe('register', () => {
    it('should register a class that implements IListModel', () => {
      cv.io.listmodel.Registry.register(mockModelClass);
      
      const result = cv.io.listmodel.Registry.get('testmockmodel');
      expect(result).toBe(mockModelClass);
    });

    it('should register class with lowercase name', () => {
      cv.io.listmodel.Registry.register(mockModelClass);
      
      // Test case-insensitive lookup
      expect(cv.io.listmodel.Registry.get('TESTMOCKMODEL')).toBe(mockModelClass);
      expect(cv.io.listmodel.Registry.get('TestMockModel')).toBe(mockModelClass);
      expect(cv.io.listmodel.Registry.get('testmockmodel')).toBe(mockModelClass);
    });

    it('should not register a class that does not implement IListModel', () => {
      const nonListModelClass = qx.Class.define('cv.io.listmodel.NonListModel', {
        extend: qx.core.Object
      });

      cv.io.listmodel.Registry.register(nonListModelClass);
      
      expect(cv.io.listmodel.Registry.get('nonlistmodel')).toBeNull();
      
      qx.Class.undefine('cv.io.listmodel.NonListModel');
    });
  });

  describe('unregister', () => {
    it('should unregister a previously registered class', () => {
      cv.io.listmodel.Registry.register(mockModelClass);
      expect(cv.io.listmodel.Registry.get('testmockmodel')).toBe(mockModelClass);
      
      cv.io.listmodel.Registry.unregister(mockModelClass);
      expect(cv.io.listmodel.Registry.get('testmockmodel')).toBeNull();
    });
  });

  describe('get', () => {
    it('should return null for non-existent class', () => {
      expect(cv.io.listmodel.Registry.get('nonexistent')).toBeNull();
    });

    it('should return class for existing registration', () => {
      cv.io.listmodel.Registry.register(mockModelClass);
      expect(cv.io.listmodel.Registry.get('testmockmodel')).toBe(mockModelClass);
    });

    it('should be case-insensitive', () => {
      cv.io.listmodel.Registry.register(mockModelClass);
      
      expect(cv.io.listmodel.Registry.get('TestMockModel')).toBe(mockModelClass);
      expect(cv.io.listmodel.Registry.get('TESTMOCKMODEL')).toBe(mockModelClass);
      expect(cv.io.listmodel.Registry.get('testmockmodel')).toBe(mockModelClass);
    });
  });

  describe('get with PHP requirement', () => {
    let phpRequiredClass;

    beforeEach(() => {
      phpRequiredClass = qx.Class.define('cv.io.listmodel.PhpRequired', {
        extend: qx.core.Object,
        implement: cv.io.listmodel.IListModel,
        statics: {
          REQUIRES: ['php']
        },
        properties: {
          model: {
            check: 'qx.data.Array',
            deferredInit: true
          }
        },
        events: {
          refresh: 'qx.event.type.Event'
        },
        members: {
          async refresh() {},
          handleEvent() { return false; }
        }
      });
      cv.io.listmodel.Registry.register(phpRequiredClass);
    });

    afterEach(() => {
      cv.io.listmodel.Registry.unregister(phpRequiredClass);
      if (qx.Class.isDefined('cv.io.listmodel.PhpRequired')) {
        qx.Class.undefine('cv.io.listmodel.PhpRequired');
      }
    });

    it('should return null when PHP is not supported', () => {
      const app = qx.core.Init.getApplication();
      const savedMethod = app.getServerHasPhpSupport;
      app.getServerHasPhpSupport = () => false;
      
      expect(cv.io.listmodel.Registry.get('phprequired')).toBeNull();
      
      app.getServerHasPhpSupport = savedMethod;
    });

    it('should return class when PHP is supported', () => {
      const app = qx.core.Init.getApplication();
      const savedMethod = app.getServerHasPhpSupport;
      app.getServerHasPhpSupport = () => true;
      
      expect(cv.io.listmodel.Registry.get('phprequired')).toBe(phpRequiredClass);
      
      app.getServerHasPhpSupport = savedMethod;
    });
  });

  describe('get with openHAB requirement', () => {
    let openhabRequiredClass;

    beforeEach(() => {
      openhabRequiredClass = qx.Class.define('cv.io.listmodel.OpenhabRequired', {
        extend: qx.core.Object,
        implement: cv.io.listmodel.IListModel,
        statics: {
          REQUIRES: ['openhab']
        },
        properties: {
          model: {
            check: 'qx.data.Array',
            deferredInit: true
          }
        },
        events: {
          refresh: 'qx.event.type.Event'
        },
        members: {
          async refresh() {},
          handleEvent() { return false; }
        }
      });
      cv.io.listmodel.Registry.register(openhabRequiredClass);
    });

    afterEach(() => {
      cv.io.listmodel.Registry.unregister(openhabRequiredClass);
      if (qx.Class.isDefined('cv.io.listmodel.OpenhabRequired')) {
        qx.Class.undefine('cv.io.listmodel.OpenhabRequired');
      }
    });

    it('should return null when openHAB backend is not available', () => {
      cv.io.BackendConnections.getClientByType = () => null;
      
      expect(cv.io.listmodel.Registry.get('openhabrequired')).toBeNull();
    });

    it('should return class when openHAB backend is available', () => {
      cv.io.BackendConnections.getClientByType = (type) => {
        if (type === 'openhab') {
          return { type: 'openhab' };
        }
        return null;
      };
      
      expect(cv.io.listmodel.Registry.get('openhabrequired')).toBe(openhabRequiredClass);
    });
  });

  describe('get without requirements', () => {
    it('should return class without REQUIRES property', () => {
      mockModelClass.REQUIRES = null;
      cv.io.listmodel.Registry.register(mockModelClass);
      
      expect(cv.io.listmodel.Registry.get('testmockmodel')).toBe(mockModelClass);
    });

    it('should return class with empty REQUIRES array', () => {
      const noReqClass = qx.Class.define('cv.io.listmodel.NoReq', {
        extend: qx.core.Object,
        implement: cv.io.listmodel.IListModel,
        statics: {
          REQUIRES: []
        },
        properties: {
          model: {
            check: 'qx.data.Array',
            deferredInit: true
          }
        },
        events: {
          refresh: 'qx.event.type.Event'
        },
        members: {
          async refresh() {},
          handleEvent() { return false; }
        }
      });
      cv.io.listmodel.Registry.register(noReqClass);
      
      expect(cv.io.listmodel.Registry.get('noreq')).toBe(noReqClass);
      
      cv.io.listmodel.Registry.unregister(noReqClass);
      qx.Class.undefine('cv.io.listmodel.NoReq');
    });
  });

  describe('built-in registrations', () => {
    it('should have RssLog registered', () => {
      // RssLog registers itself in defer()
      // But requires PHP, so mock it
      const app = qx.core.Init.getApplication();
      const savedMethod = app.getServerHasPhpSupport;
      app.getServerHasPhpSupport = () => true;
      
      const result = cv.io.listmodel.Registry.get('rsslog');
      expect(result).toBe(cv.io.listmodel.RssLog);
      
      app.getServerHasPhpSupport = savedMethod;
    });

    it('should have FritzCallList registered', () => {
      const app = qx.core.Init.getApplication();
      const savedMethod = app.getServerHasPhpSupport;
      app.getServerHasPhpSupport = () => true;
      
      const result = cv.io.listmodel.Registry.get('fritzcalllist');
      expect(result).toBe(cv.io.listmodel.FritzCallList);
      
      app.getServerHasPhpSupport = savedMethod;
    });

    it('should have OpenHAB registered', () => {
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
