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
 * Unit tests for cv.io.transport.LongPolling
 *
 * Tests for the long-polling transport including timeout recovery,
 * connection state tracking, and retry counter correctness.
 */
describe('testing cv.io.transport.LongPolling', () => {
  var transport;
  var mockClient;
  var mockXhr;

  // Shared mock XHR factory used by the mock client's doRequest
  /**
   *
   */
  function createMockXhr() {
    return {
      send: jasmine.createSpy('xhr.send'),
      abort: jasmine.createSpy('xhr.abort'),
      getUrl: function () {
 return '/cgi-bin/r'; 
},
      addListener: jasmine.createSpy('xhr.addListener'),
      removeListener: jasmine.createSpy('xhr.removeListener'),
      setUrl: jasmine.createSpy('xhr.setUrl'),
      set: function () {},
      getResponse: function () {
 return null; 
},
      getResponseHeader: function () {
 return null; 
},
      getStatus: function () {
 return 200; 
},
      getStatusText: function () {
 return 'OK'; 
},
      getReadyState: function () {
 return 4; 
}
    };
  }

  /**
   * Creates a mock qooxdoo statusError event for testing handleError.
   * @param status
   * @param readyState
   * @param response
   */
  function createStatusErrorEvent(status, readyState, response) {
    var req = {
      getStatus: function () {
 return status; 
},
      getStatusText: function () {
        var map = { 0: '', 200: 'OK', 408: 'Request Timeout', 502: 'Bad Gateway', 503: 'Service Unavailable', 504: 'Gateway Timeout' };
        return map[status] || '';
      },
      getReadyState: function () {
 return readyState !== undefined ? readyState : 4; 
},
      getResponse: function () {
 return response || null; 
},
      getUrl: function () {
 return '/cgi-bin/r'; 
},
      serverErrorHandled: false
    };
    return {
      getTarget: function () {
 return req; 
},
      getData: function () {
 return null; 
}
    };
  }

  beforeAll(function () {
    // Define a lightweight mock client class that extends cv.io.Client
    // so it passes the instanceof check in Watchdog.setClient().
    // We intentionally skip the real Client constructor to avoid complex setup.
    qx.Class.define('cv.test.transport.MockClient', {
      extend: cv.io.Client,
      construct: function () {
        // Skip real Client constructor – set up only what LongPolling needs.
        this.backend = {
          name: 'default',
          baseURL: '/cgi-bin/',
          transport: 'long-polling',
          resources: { login: 'l', read: 'r', write: 'w', rrd: 'rrdfetch' },
          maxConnectionAge: 60000,
          maxDataAge: 3200000,
          maxRetries: 3,
          hooks: {}
        };
        this.backendName = 'default';
        this._type = 'knxd';
        this.addresses = ['12/7/1', '12/7/2'];
        this.initialAddresses = [];
        this.filters = [];
        this.headers = {};
        this.resendHeaders = {};
        this.loginSettings = { loggedIn: false, loginOnly: false };
      },
      members: {
        getType: function () {
 return this._type; 
},
        getBackend: function () {
 return this.backend; 
},
        setBackend: function () {},
        getResourcePath: function (name) {
          return this.backend.baseURL + this.backend.resources[name];
        },
        setConnected: function () {},
        setDataReceived: function () {},
        showError: function () {},
        update: function () {},
        doRequest: function (url, data, callback, context, options) {
          mockXhr = createMockXhr();
          return mockXhr;
        },
        getResponse: function () {
 return null; 
},
        getResponseHeader: function () {
 return null; 
},
        getQueryString: function (data) {
 return ''; 
},
        buildRequest: function () {
 return {}; 
},
        fireDataEvent: function () {},
        record: function () {},
        subscribe: function () {},
        stop: function () {},
        login: function () {},
        write: function () {}
      }
    });
  });

  beforeEach(function () {
    mockXhr = null;
    mockClient = new cv.test.transport.MockClient();
    transport = new cv.io.transport.LongPolling(mockClient);
    // Spy on restart to verify it's called when expected
    spyOn(transport, 'restart').and.callThrough();
    spyOn(transport, 'info').and.callThrough();
    spyOn(transport, 'error').and.callThrough();
    spyOn(transport, 'abort').and.callThrough();
    // Spy on watchdog
    spyOn(transport.watchdog, 'start').and.callThrough();
    spyOn(transport.watchdog, 'stop').and.callThrough();
    spyOn(transport.watchdog, 'ping').and.callThrough();
  });

  afterEach(function () {
    if (transport && !transport.isDisposed()) {
      transport.dispose();
    }
    transport = null;
    mockClient = null;
    mockXhr = null;
  });

  describe('class definition', function () {
    it('should be defined', function () {
      expect(cv.io.transport.LongPolling).toBeDefined();
    });

    it('should extend qx.core.Object', function () {
      expect(transport instanceof qx.core.Object).toBe(true);
    });

    it('should create a watchdog instance', function () {
      expect(transport.watchdog).toBeDefined();
      expect(transport.watchdog instanceof cv.io.Watchdog).toBe(true);
    });

    it('should accept a cv.io.Client instance', function () {
      expect(mockClient instanceof cv.io.Client).toBe(true);
      expect(transport.client).toBe(mockClient);
    });
  });

  describe('handleError - timeout recovery (status 0)', function () {
    it('should trigger restart when XHR times out with status 0', function () {
      transport.running = true;
      transport.xhr = mockXhr;

      var ev = createStatusErrorEvent(0, 4);
      transport.handleError(ev);

      expect(transport.restart).toHaveBeenCalled();
    });

    it('should mark the error as handled when status is 0', function () {
      transport.running = true;
      transport.xhr = mockXhr;

      var ev = createStatusErrorEvent(0, 4);
      transport.handleError(ev);

      expect(ev.getTarget().serverErrorHandled).toBe(true);
    });

    it('should NOT trigger restart when not running (status 0)', function () {
      transport.running = false;

      var ev = createStatusErrorEvent(0, 4);
      transport.handleError(ev);

      expect(transport.restart).not.toHaveBeenCalled();
    });

    it('should NOT trigger restart when already in a restart (status 0)', function () {
      transport.running = true;
      transport.doRestart = true;

      var ev = createStatusErrorEvent(0, 4);
      transport.handleError(ev);

      expect(transport.restart).not.toHaveBeenCalled();
    });
  });

  describe('handleError - temporary server errors (502/503/504)', () => {
    [502, 503, 504].forEach(function (status) {
      it('should trigger restart for status ' + status + ' (within retry limit)', function () {
        transport.running = true;
        transport.retryServerErrorCounter = 0;

        var ev = createStatusErrorEvent(status, 4);
        transport.handleError(ev);

        expect(transport.restart).toHaveBeenCalled();
        expect(ev.getTarget().serverErrorHandled).toBe(true);
        expect(transport.retryServerErrorCounter).toBe(1);
      });

      it('should NOT trigger restart for status ' + status + ' when exceeding retry limit', function () {
        transport.running = true;
        transport.retryServerErrorCounter = 3; // equals maxRetries
        mockClient.backend.maxRetries = 3;

        var ev = createStatusErrorEvent(status, 4);
        transport.handleError(ev);

        expect(transport.restart).not.toHaveBeenCalled();
      });
    });
  });

  describe('isConnectionRunning', () => {
    it('should return false when transport is not running', () => {
      transport.running = false;

      expect(transport.isConnectionRunning()).toBe(false);
    });

    it('should return true when transport is running', () => {
      transport.running = true;

      expect(transport.isConnectionRunning()).toBe(true);
    });

    it('should return false when running is null/undefined', () => {
      transport.running = null;

      expect(transport.isConnectionRunning()).toBe(false);
    });
  });

  describe('retryCounter correctness', () => {
    it('should reset retryCounter to 0 on successful handleRead', () => {
      transport.running = true;
      transport.doRestart = false;
      transport.xhr = createMockXhr();

      // Simulate a successful response
      spyOn(mockClient, 'getResponse').and.returnValue({ v: '0.2', i: 42, d: {} });
      spyOn(mockClient, 'buildRequest').and.returnValue({});
      spyOn(mockClient, 'getQueryString').and.returnValue('i=42');

      transport.retryCounter = 5; // set to a non-zero value
      transport.handleRead();

      // After successful handleRead, retryCounter should be 0
      // (it gets reset to 0 inside the json processing block)
      expect(transport.retryCounter).toBe(0);
    });

    it('should NOT increment retryCounter in the normal send-next-request path', function () {
      transport.running = true;
      transport.doRestart = false;
      transport.xhr = createMockXhr();

      spyOn(mockClient, 'getResponse').and.returnValue({ v: '0.2', i: 42, d: {} });
      spyOn(mockClient, 'buildRequest').and.returnValue({});
      spyOn(mockClient, 'getQueryString').and.returnValue('i=42');

      transport.retryCounter = 0;
      transport.handleRead();

      // After processing, retryCounter should still be 0
      // (not incremented to 1 as it was before the fix)
      expect(transport.retryCounter).toBe(0);
    });

    it('should increment retryCounter in the retry path when doRestart is true', function () {
      transport.running = true;
      transport.doRestart = true;
      transport.retryCounter = 2;

      transport.handleRead();

      // In the retry path, retryCounter is incremented before the delay is calculated
      expect(transport.retryCounter).toBe(3);
    });

    it('should cap retryCounter to prevent unbounded growth', function () {
      transport.running = true;
      transport.doRestart = true;
      transport.retryCounter = 20; // way above cap

      transport.handleRead();

      // retryCounter should not exceed the cap of 10
      expect(transport.retryCounter).toBe(10);
    });
  });

  describe('visibility change handling', function () {
    var savedAddEventListener;
    var savedRemoveEventListener;
    var visibilityListeners;

    beforeEach(function () {
      visibilityListeners = {};
      savedAddEventListener = document.addEventListener;
      savedRemoveEventListener = document.removeEventListener;

      document.addEventListener = function (type, listener) {
        visibilityListeners[type] = visibilityListeners[type] || [];
        visibilityListeners[type].push(listener);
      };
      document.removeEventListener = function (type, listener) {
        if (visibilityListeners[type]) {
          var idx = visibilityListeners[type].indexOf(listener);
          if (idx >= 0) {
            visibilityListeners[type].splice(idx, 1);
          }
          if (visibilityListeners[type].length === 0) {
            delete visibilityListeners[type];
          }
        }
      };
      // Default: simulate page in background
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        get: function () {
 return 'hidden'; 
},
        set: function () {}
      });
    });

    afterEach(function () {
      document.addEventListener = savedAddEventListener;
      document.removeEventListener = savedRemoveEventListener;
      // Restore original visibilityState (read-only in real browsers, but our
      // mock is configurable)
      try {
        delete document.visibilityState;
      } catch (e) {
        // Some environments don't allow deleting the property
      }
    });

    it('should register a visibilitychange listener when connect is called', function () {
      spyOn(mockClient, 'buildRequest').and.returnValue({});
      transport.connect();

      expect(visibilityListeners['visibilitychange']).toBeDefined();
      expect(visibilityListeners['visibilitychange'].length).toBe(1);
    });

    it('should trigger restart when page becomes visible', function () {
      transport.running = true;
      transport.xhr = mockXhr;

      spyOn(mockClient, 'buildRequest').and.returnValue({});
      transport.connect();

      // Simulate page becoming visible
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        get: function () {
 return 'visible'; 
}
      });

      // Fire the visibilitychange event
      visibilityListeners['visibilitychange'].forEach(function (fn) {
 fn(); 
});

      expect(transport.restart).toHaveBeenCalled();
    });

    it('should NOT trigger restart when page becomes hidden', function () {
      transport.running = true;
      transport.xhr = mockXhr;

      spyOn(mockClient, 'buildRequest').and.returnValue({});
      transport.connect();

      // Page is already 'hidden', fire event
      visibilityListeners['visibilitychange'].forEach(function (fn) {
 fn(); 
});

      expect(transport.restart).not.toHaveBeenCalled();
    });

    it('should NOT trigger restart when transport is not running', function () {
      transport.xhr = mockXhr;

      spyOn(mockClient, 'buildRequest').and.returnValue({});
      transport.connect();
      // Override running flag AFTER connect (connect sets it to true)
      transport.running = false;

      // Simulate page becoming visible
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        get: function () {
 return 'visible'; 
}
      });

      visibilityListeners['visibilitychange'].forEach(function (fn) {
 fn(); 
});

      expect(transport.restart).not.toHaveBeenCalled();
    });

    it('should NOT register duplicate visibility listeners on repeated connect', function () {
      spyOn(mockClient, 'buildRequest').and.returnValue({});
      transport.connect();
      transport.connect();
      transport.connect();

      // Should still only have 1 listener
      expect(visibilityListeners['visibilitychange'].length).toBe(1);
    });

    it('should remove visibility listener on destruct', function () {
      spyOn(mockClient, 'buildRequest').and.returnValue({});
      transport.connect();

      expect(visibilityListeners['visibilitychange'].length).toBe(1);

      transport.dispose();

      // After destruct/dispose, listener should be removed
      expect(visibilityListeners['visibilitychange']).toBeUndefined();
    });
  });

  describe('restart flow', () => {
    it('should set doRestart flag during restart', () => {
      transport.running = true;
      transport.xhr = mockXhr;

      transport.restart(false);

      expect(transport.doRestart).toBe(false); // reset after handleRead returns
      expect(transport.abort).toHaveBeenCalled();
      // handleRead is called by restart, which sets a timer for retry
    });

    it('should reset lastIndex on full reload', () => {
      transport.lastIndex = 42;
      transport.running = true;
      transport.xhr = mockXhr;

      transport.restart(true);

      expect(transport.lastIndex).toBe(-1);
    });

    it('should preserve lastIndex on non-full restart', () => {
      transport.lastIndex = 42;
      transport.running = true;
      transport.xhr = mockXhr;

      transport.restart(false);

      expect(transport.lastIndex).toBe(42);
    });
  });

  describe('watchdog integration', () => {
    it('should start watchdog when connect is called', () => {
      spyOn(mockClient, 'buildRequest').and.returnValue({});
      transport.connect();

      expect(transport.watchdog.start).toHaveBeenCalledWith(5);
    });

    it('should stop watchdog when abort is called', () => {
      transport.xhr = mockXhr;
      transport.abort();

      expect(transport.watchdog.stop).toHaveBeenCalled();
    });
  });
});
