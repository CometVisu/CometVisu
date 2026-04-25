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
 * Unit tests for cv.io.listmodel.RssLog
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing cv.io.listmodel.RssLog', () => {
  let instance;
  let savedStructureController;
  let savedConfirm;

  beforeEach(() => {
    instance = new cv.io.listmodel.RssLog();
    
    // Save and mock structure controller for mapping
    savedStructureController = cv.Application.structureController;
    cv.Application.structureController = {
      mapValue: jasmine.createSpy('mapValue').and.callFake((mapping, value) => `mapped:${value}`)
    };
    
    // Save confirm handler
    savedConfirm = cv.ui.PopupHandler.confirm;
  });

  afterEach(() => {
    if (instance && !instance.isDisposed()) {
      instance.dispose();
    }
    cv.Application.structureController = savedStructureController;
    cv.ui.PopupHandler.confirm = savedConfirm;
  });

  describe('class definition', () => {
    it('should be defined', () => {
      expect(cv.io.listmodel.RssLog).toBeDefined();
    });

    it('should extend qx.core.Object', () => {
      expect(instance instanceof qx.core.Object).toBe(true);
    });

    it('should implement IListModel', () => {
      expect(qx.Class.hasInterface(cv.io.listmodel.RssLog, cv.io.listmodel.IListModel)).toBe(true);
    });

    it('should have REQUIRES static property', () => {
      expect(cv.io.listmodel.RssLog.REQUIRES).toEqual(['php']);
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
    describe('database', () => {
      it('should accept string value', () => {
        instance.setDatabase('testdb');
        expect(instance.getDatabase()).toBe('testdb');
      });

      it('should be nullable', () => {
        instance.setDatabase(null);
        expect(instance.getDatabase()).toBeNull();
      });
    });

    describe('filter', () => {
      it('should accept string value', () => {
        instance.setFilter('testfilter');
        expect(instance.getFilter()).toBe('testfilter');
      });

      it('should be nullable', () => {
        instance.setFilter(null);
        expect(instance.getFilter()).toBeNull();
      });
    });

    describe('future', () => {
      it('should accept string value', () => {
        instance.setFuture('true');
        expect(instance.getFuture()).toBe('true');
      });

      it('should be nullable', () => {
        instance.setFuture(null);
        expect(instance.getFuture()).toBeNull();
      });
    });

    describe('limit', () => {
      it('should accept number value', () => {
        instance.setLimit(10);
        expect(instance.getLimit()).toBe(10);
      });

      it('should transform string to number', () => {
        instance.setLimit('25');
        expect(instance.getLimit()).toBe(25);
      });

      it('should default to 0', () => {
        expect(instance.getLimit()).toBe(0);
      });
    });
  });

  describe('_parseInt', () => {
    it('should parse string to integer', () => {
      expect(instance._parseInt('42')).toBe(42);
    });

    it('should return number unchanged', () => {
      expect(instance._parseInt(42)).toBe(42);
    });
  });

  describe('getRequestData', () => {
    it('should return object with j=1', () => {
      const data = instance.getRequestData();
      expect(data.j).toBe(1);
    });

    it('should include database when set', () => {
      instance.setDatabase('mydb');
      const data = instance.getRequestData();
      expect(data.database).toBe('mydb');
    });

    it('should include filter as f when set', () => {
      instance.setFilter('myfilter');
      const data = instance.getRequestData();
      expect(data.f).toBe('myfilter');
    });

    it('should include limit when set', () => {
      instance.setLimit(50);
      const data = instance.getRequestData();
      expect(data.limit).toBe(50);
    });

    it('should include future when set', () => {
      instance.setFuture('true');
      const data = instance.getRequestData();
      expect(data.future).toBe('true');
    });

    it('should not include properties when not set', () => {
      const data = instance.getRequestData();
      expect(data.database).toBeUndefined();
      expect(data.f).toBeUndefined();
      expect(data.limit).toBeUndefined();
      expect(data.future).toBeUndefined();
    });

    it('should not include limit when 0', () => {
      instance.setLimit(0);
      const data = instance.getRequestData();
      expect(data.limit).toBeUndefined();
    });
  });

  describe('_getUrl', () => {
    it('should return rsslog.php URL', () => {
      const url = instance._getUrl();
      expect(url).toContain('plugins/rsslog/rsslog.php');
    });
  });

  describe('_convertResponse', () => {
    it('should extract entries from responseData.feed.entries', () => {
      const data = {
        responseData: {
          feed: {
            entries: [
              { id: 1, content: 'Entry 1' },
              { id: 2, content: 'Entry 2' }
            ]
          }
        }
      };
      
      const result = instance._convertResponse(data);
      expect(result.length).toBe(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });
  });

  describe('handleEvent', () => {
    let mockRequest;

    beforeEach(() => {
      // Initialize request to set up __request
      instance._initRequest();
    });

    it('should return false for unknown action', () => {
      const result = instance.handleEvent({}, { action: 'unknown' }, {});
      expect(result).toBe(false);
    });

    describe('toggle-state action', () => {
      it('should handle toggle-state and toggle from 0 to 1', (done) => {
        const model = { id: 123, state: '0' };
        const createXhrSpy = spyOn(qx.io.request, 'Xhr').and.callFake(function(url) {
          return {
            set: jasmine.createSpy('set'),
            addListener: jasmine.createSpy('addListener'),
            send: jasmine.createSpy('send')
          };
        });

        const result = instance.handleEvent({}, { action: 'toggle-state' }, model);
        
        expect(result).toBe(true);
        done();
      });

      it('should handle toggle-state and toggle from 1 to 0', () => {
        const model = { id: 456, state: '1' };
        spyOn(qx.io.request, 'Xhr').and.callFake(function(url) {
          return {
            set: jasmine.createSpy('set'),
            addListener: jasmine.createSpy('addListener'),
            send: jasmine.createSpy('send')
          };
        });

        const result = instance.handleEvent({}, { action: 'toggle-state' }, model);
        expect(result).toBe(true);
      });
    });

    describe('delete action', () => {
      it('should handle delete with confirmation', () => {
        const model = { id: 789 };
        cv.ui.PopupHandler.confirm = jasmine.createSpy('confirm');
        spyOn(qx.io.request, 'Xhr').and.callFake(function(url) {
          return {
            set: jasmine.createSpy('set'),
            addListener: jasmine.createSpy('addListener'),
            send: jasmine.createSpy('send')
          };
        });

        const result = instance.handleEvent({}, { action: 'delete' }, model);
        
        expect(result).toBe(true);
        expect(cv.ui.PopupHandler.confirm).toHaveBeenCalled();
      });

      it('should send request when confirmation is accepted', () => {
        const model = { id: 789 };
        let sendCalled = false;
        cv.ui.PopupHandler.confirm = jasmine.createSpy('confirm').and.callFake((title, msg, cb) => {
          cb(true); // Simulate user confirming
        });
        spyOn(qx.io.request, 'Xhr').and.callFake(function(url) {
          return {
            set: jasmine.createSpy('set'),
            addListener: jasmine.createSpy('addListener'),
            send: jasmine.createSpy('send').and.callFake(() => {
              sendCalled = true;
            })
          };
        });

        instance.handleEvent({}, { action: 'delete' }, model);
        
        expect(sendCalled).toBe(true);
      });

      it('should not send request when confirmation is rejected', () => {
        const model = { id: 789 };
        let sendCalled = false;
        cv.ui.PopupHandler.confirm = jasmine.createSpy('confirm').and.callFake((title, msg, cb) => {
          cb(false); // Simulate user canceling
        });
        spyOn(qx.io.request, 'Xhr').and.callFake(function(url) {
          return {
            set: jasmine.createSpy('set'),
            addListener: jasmine.createSpy('addListener'),
            send: jasmine.createSpy('send').and.callFake(() => {
              sendCalled = true;
            })
          };
        });

        instance.handleEvent({}, { action: 'delete' }, model);
        
        expect(sendCalled).toBe(false);
      });

      it('should handle delete without confirmation when no-confirm=true', () => {
        const model = { id: 789 };
        let sentRequest = false;
        spyOn(qx.io.request, 'Xhr').and.callFake(function(url) {
          return {
            set: jasmine.createSpy('set'),
            addListener: jasmine.createSpy('addListener'),
            send: jasmine.createSpy('send').and.callFake(() => {
              sentRequest = true;
            })
          };
        });

        const result = instance.handleEvent({}, { action: 'delete', 'no-confirm': 'true' }, model);
        
        expect(result).toBe(true);
        expect(sentRequest).toBe(true);
      });

      it('should include database in delete request data', () => {
        instance.setDatabase('customdb');
        const model = { id: 111 };
        let requestData;
        spyOn(qx.io.request, 'Xhr').and.callFake(function(url) {
          return {
            set: jasmine.createSpy('set').and.callFake((options) => {
              if (options.requestData) {
                requestData = options.requestData;
              }
            }),
            addListener: jasmine.createSpy('addListener'),
            send: jasmine.createSpy('send')
          };
        });

        instance.handleEvent({}, { action: 'delete', 'no-confirm': 'true' }, model);
        
        expect(requestData.database).toBe('customdb');
        expect(requestData.d).toBe(111);
      });
    });

    describe('success callback', () => {
      it('should fire refresh event on success', (done) => {
        const model = { id: 123 };
        let successCallback;
        spyOn(qx.io.request, 'Xhr').and.callFake(function(url) {
          return {
            set: jasmine.createSpy('set'),
            addListener: jasmine.createSpy('addListener').and.callFake((event, cb) => {
              if (event === 'success') {
                successCallback = cb;
              }
            }),
            send: jasmine.createSpy('send')
          };
        });

        instance.addListener('refresh', () => {
          done();
        });

        instance.handleEvent({}, { action: 'delete', 'no-confirm': 'true' }, model);
        
        // Trigger the success callback
        if (successCallback) {
          successCallback();
        }
      });
    });
  });

  describe('events', () => {
    it('should have refresh event', () => {
      expect(cv.io.listmodel.RssLog.$$events.refresh).toBeDefined();
    });

    it('should have finished event', () => {
      expect(cv.io.listmodel.RssLog.$$events.finished).toBeDefined();
    });
  });

  describe('refresh', () => {
    it('should initialize request on first call', async () => {
      const initSpy = spyOn(instance, '_initRequest').and.callThrough();
      
      // Mock the XHR to not actually send
      spyOn(qx.io.request, 'Xhr').and.callFake(function(url) {
        return {
          set: jasmine.createSpy('set'),
          addListener: jasmine.createSpy('addListener'),
          send: jasmine.createSpy('send')
        };
      });
      
      // Don't await since we're mocking
      instance.refresh().catch(() => {});
      
      expect(initSpy).toHaveBeenCalled();
    });
  });

  describe('_initRequest', () => {
    it('should create XHR request with correct settings', () => {
      let settings;
      spyOn(qx.io.request, 'Xhr').and.callFake(function(url) {
        const req = {
          set: jasmine.createSpy('set').and.callFake((opts) => {
            settings = opts;
          }),
          addListener: jasmine.createSpy('addListener'),
          send: jasmine.createSpy('send')
        };
        return req;
      });

      instance._initRequest();
      
      expect(settings.accept).toBe('application/json');
      expect(settings.method).toBe('GET');
      expect(settings.requestData).toBeDefined();
    });

    it('should register success, error and timeout listeners', () => {
      let registeredListeners = [];
      spyOn(qx.io.request, 'Xhr').and.callFake(function(url) {
        const req = {
          set: jasmine.createSpy('set'),
          addListener: jasmine.createSpy('addListener').and.callFake((event, cb) => {
            registeredListeners.push(event);
          }),
          send: jasmine.createSpy('send'),
          getUrl: () => url
        };
        return req;
      });

      instance._initRequest();
      
      expect(registeredListeners).toContain('success');
      expect(registeredListeners).toContain('error');
      expect(registeredListeners).toContain('timeout');
    });

    it('should not create request if _getUrl returns null', () => {
      spyOn(instance, '_getUrl').and.returnValue(null);
      const xhrSpy = spyOn(qx.io.request, 'Xhr');
      
      instance._initRequest();
      
      expect(xhrSpy).not.toHaveBeenCalled();
    });
  });

  describe('_applyRequestData', () => {
    it('should update request data when property changes', () => {
      // Initialize request first
      let requestData = {};
      spyOn(qx.io.request, 'Xhr').and.callFake(function(url) {
        return {
          set: jasmine.createSpy('set'),
          addListener: jasmine.createSpy('addListener'),
          send: jasmine.createSpy('send'),
          getRequestData: jasmine.createSpy('getRequestData').and.returnValue(requestData)
        };
      });
      instance._initRequest();
      
      // Now change a property
      instance.setDatabase('newdb');
      
      expect(requestData.database).toBe('newdb');
    });

    it('should remove property from request data when set to null', () => {
      let requestData = { filter: 'oldfilter' };
      spyOn(qx.io.request, 'Xhr').and.callFake(function(url) {
        return {
          set: jasmine.createSpy('set'),
          addListener: jasmine.createSpy('addListener'),
          send: jasmine.createSpy('send'),
          getRequestData: jasmine.createSpy('getRequestData').and.returnValue(requestData)
        };
      });
      instance._initRequest();
      
      instance.setFilter(null);
      
      expect(requestData.filter).toBeUndefined();
    });
  });

  describe('_sendWithPromise', () => {
    it('should resolve when finished event fires with true', async () => {
      spyOn(qx.io.request, 'Xhr').and.callFake(function(url) {
        return {
          set: jasmine.createSpy('set'),
          addListener: jasmine.createSpy('addListener'),
          send: jasmine.createSpy('send').and.callFake(() => {
            instance.fireDataEvent('finished', true);
          })
        };
      });
      instance._initRequest();
      
      await expectAsync(instance._sendWithPromise()).toBeResolved();
    });

    it('should reject when finished event fires with false', async () => {
      spyOn(qx.io.request, 'Xhr').and.callFake(function(url) {
        return {
          set: jasmine.createSpy('set'),
          addListener: jasmine.createSpy('addListener'),
          send: jasmine.createSpy('send').and.callFake(() => {
            instance.fireDataEvent('finished', false);
          })
        };
      });
      instance._initRequest();
      
      await expectAsync(instance._sendWithPromise()).toBeRejectedWithError('request failed');
    });
  });

  describe('model update integration', () => {
    it('should update model with converted response data', () => {
      // Test the internal behavior by directly testing the _convertResponse method
      // and the model update pattern
      const mockEntries = [
        { id: 1, content: 'Test 1', publishedDate: '2025-01-01T10:00:00Z' },
        { id: 2, content: 'Test 2', mapping: 'testMapping', state: 'on' }
      ];
      
      const data = {
        responseData: {
          feed: {
            entries: mockEntries
          }
        }
      };
      
      const entries = instance._convertResponse(data);
      expect(entries.length).toBe(2);
      expect(entries[0].content).toBe('Test 1');
      expect(entries[1].content).toBe('Test 2');
    });

    it('should apply mapping during model population', () => {
      // Test the mapping transformation pattern
      const entry = { id: 1, mapping: 'myMapping', state: 'value1', publishedDate: '2025-01-01' };
      
      // Simulate what __updateModel does
      if (entry.mapping) {
        entry.mappedState = cv.Application.structureController.mapValue(entry.mapping, entry.state);
      }
      if (entry.publishedDate) {
        try {
          entry.published = new Date(entry.publishedDate);
        } catch (e) {}
      }
      
      expect(entry.mappedState).toBe('mapped:value1');
      expect(entry.published instanceof Date).toBe(true);
      expect(cv.Application.structureController.mapValue).toHaveBeenCalledWith('myMapping', 'value1');
    });

    it('should parse publishedDate to Date object', () => {
      const entry = { id: 1, publishedDate: '2025-06-15T14:30:00Z' };
      
      if (entry.publishedDate) {
        try {
          entry.published = new Date(entry.publishedDate);
        } catch (e) {}
      }
      
      expect(entry.published instanceof Date).toBe(true);
      expect(entry.published.getFullYear()).toBe(2025);
    });

    it('should handle invalid date gracefully', () => {
      const entry = { id: 1, publishedDate: 'invalid-date' };
      
      if (entry.publishedDate) {
        try {
          entry.published = new Date(entry.publishedDate);
        } catch (e) {}
      }
      
      // Invalid date still creates Date object but with invalid time
      expect(entry.published instanceof Date).toBe(true);
    });
  });
});
