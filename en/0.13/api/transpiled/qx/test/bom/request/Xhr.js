(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.bom.request.Xhr": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.lang.Function": {},
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.dev.unit.RequirementError": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "engine.version": {
          "className": "qx.bom.client.Engine"
        },
        "browser.version": {
          "className": "qx.bom.client.Browser"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tristan Koch (tristankoch)
  
  ************************************************************************ */

  qx.Class.define("qx.test.bom.request.Xhr", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MMock, qx.dev.unit.MRequirements],
    statics: {
      UNSENT: 0,
      OPENED: 1,
      HEADERS_RECEIVED: 2,
      LOADING: 3,
      DONE: 4
    },
    members: {
      /**
       * The faked XMLHttpRequest.
       */
      fakedXhr: null,
      /**
       * Holds instances created by the faked XMLHttpRequest.
       */
      fakeReqs: null,
      /**
       * The request to test.
       */
      req: null,
      setUp: function setUp() {
        this.fakeNativeXhr();
        this.req = new qx.bom.request.Xhr();
      },
      tearDown: function tearDown() {
        this.req = null;
        this.getSandbox().restore();
      },
      //
      // General
      //
      "test: create instance": function testCreateInstance() {
        this.assertObject(this.req);
      },
      "test: detect native XHR": function testDetectNativeXHR() {
        var nativeXhr = this.req.getRequest();
        this.assertObject(nativeXhr);
        this.assertNotNull(nativeXhr.readyState);
      },
      //
      // open()
      //
      "test: open request": function testOpenRequest() {
        var fakeReq = this.getFakeReq();
        this.spy(fakeReq, "open");
        var url = "/foo";
        var method = "GET";
        this.req.open(method, url);
        this.assertCalledWith(fakeReq.open, method, url);
      },
      "test: open request throws when missing arguments": function testOpenRequestThrowsWhenMissingArguments() {
        var req = this.req;
        var msg = /Not enough arguments/;
        this.assertException(function () {
          req.open();
        }, Error, msg);
        this.assertException(function () {
          req.open("GET");
        }, Error, msg);
      },
      "test: open async request on default": function testOpenAsyncRequestOnDefault() {
        var fakeReq = this.getFakeReq();
        this.spy(fakeReq, "open");
        this.req.open(null, null);
        this.assertTrue(fakeReq.open.args[0][2], "async must be true");
      },
      "test: open sync request": function testOpenSyncRequest() {
        var fakeReq = this.getFakeReq();
        this.spy(fakeReq, "open");
        this.req.open(null, null, false);
        this.assertFalse(fakeReq.open.args[0][2], "async must be false");
      },
      "test: open request with username and password": function testOpenRequestWithUsernameAndPassword() {
        var fakeReq = this.getFakeReq();
        this.spy(fakeReq, "open");
        this.req.open(null, null, null, "affe", "geheim");
        this.assertEquals("affe", fakeReq.open.args[0][3], "Unexpected user");
        this.assertEquals("geheim", fakeReq.open.args[0][4], "Unexpected password");
      },
      //
      // setRequestHeader()
      //
      "test: set request header": function testSetRequestHeader() {
        var fakeReq = this.getFakeReq();
        this.spy(fakeReq, "setRequestHeader");

        // Request must be opened before request headers can be set
        this.req.open("GET", "/");
        this.req.setRequestHeader("header", "value");
        this.assertCalledWith(fakeReq.setRequestHeader, "header", "value");
      },
      //
      // send()
      //
      "test: send() with data": function testSendWithData() {
        var fakeReq = this.getFakeReq();
        this.spy(fakeReq, "send");
        var data = "AFFE";
        this.req.open("GET", "/affe");
        this.req.send(data);
        this.assertCalledWith(fakeReq.send, data);
      },
      // BUGFIXES
      "test: send() without data": function testSendWithoutData() {
        var fakeReq = this.getFakeReq();
        this.spy(fakeReq, "send");
        this.req.open("GET", "/affe");
        this.req.send();
        this.assertCalledWith(fakeReq.send, null);
      },
      //
      // abort()
      //
      "test: abort() aborts native Xhr": function testAbortAbortsNativeXhr() {
        var req = this.req;
        var fakeReq = this.getFakeReq();
        this.spy(fakeReq, "abort");
        req.abort();
        this.assertCalled(fakeReq.abort);
      },
      "test: abort() resets readyState": function testAbortResetsReadyState() {
        var req = this.req;
        req.open("GET", "/");
        req.abort();
        this.assertEquals(this.constructor.UNSENT, req.readyState, "Must be UNSENT");
      },
      //
      // Event helper
      //
      "test: call event handler": function testCallEventHandler() {
        var req = this.req;
        req.onevent = this.spy();
        req._emit("event");
        this.assertCalled(req.onevent);
      },
      "test: fire event": function testFireEvent() {
        var req = this.req;
        var event = this.spy();
        req.onevent = this.spy();
        req.on("event", event);
        req._emit("event");
        this.assertCalled(event);
      },
      //
      //
      // onreadystatechange()
      //
      "test: responseText set before onreadystatechange is called": function testResponseTextSetBeforeOnreadystatechangeIsCalled() {
        var req = this.req;
        var fakeReq = this.getFakeReq();
        var that = this;
        req.onreadystatechange = function () {
          that.assertEquals("Affe", req.responseText);
        };
        fakeReq.responseText = "Affe";
        fakeReq.readyState = 4;
        fakeReq.responseHeaders = {};
        fakeReq.onreadystatechange();
      },
      "test: emit readystatechange when reopened": function testEmitReadystatechangeWhenReopened() {
        var req = this.req;
        var fakeReq = this.getFakeReq();
        this.stub(req, "_emit");

        // Send and respond
        req.open("GET", "/");
        req.send();
        fakeReq.respond();

        // Reopen
        req.open("GET", "/");
        this.assertCalledWith(req._emit, "readystatechange");
      },
      // BUGFIXES
      "test: ignore onreadystatechange when readyState is unchanged": function testIgnoreOnreadystatechangeWhenReadyStateIsUnchanged() {
        var req = this.req;
        var fakeReq = this.getFakeReq();
        this.spy(req, "onreadystatechange");
        req.readyState = this.constructor.OPENED;
        fakeReq.onreadystatechange();
        fakeReq.onreadystatechange();
        this.assertCalledOnce(req.onreadystatechange);
      },
      "test: native onreadystatechange is disposed once DONE": function testNativeOnreadystatechangeIsDisposedOnceDONE() {
        var req = this.req;
        var fakeReq = this.getFakeReq();
        req.onreadystatechange = function () {
          return "OP";
        };
        req.open("GET", "/");
        req.send();
        fakeReq.respond();
        this.assertUndefined(req.getRequest().onreadystatechange());
      },
      //
      // onload()
      //
      "test: emit load on successful request": function testEmitLoadOnSuccessfulRequest() {
        var req = this.req;
        var fakeReq = this.getFakeReq();
        this.stub(req._emitter, "emit");
        req.open("GET", "/");
        req.send();

        // Status does not matter. Set a non-empty response for file:// workaround.
        fakeReq.respond(200, {}, "RESPONSE");
        this.assertCalledWith(req._emitter.emit, "load");
        this.assertEquals(6, req._emitter.emit.callCount);
      },
      //
      // onerror()
      //
      // See XhrWithBackend
      //
      //
      // onabort()
      //
      "test: emit abort": function testEmitAbort() {
        var req = this.req;
        this.spy(req, "_emit");
        req.open("GET", "/");
        req.send();
        req.abort();
        this.assertCalledWith(req._emit, "abort");
      },
      "test: emit abort before loadend": function testEmitAbortBeforeLoadend() {
        var req = this.req;
        var emit = this.stub(req, "_emit");
        var abort = emit.withArgs("abort");
        var loadend = emit.withArgs("loadend");
        req.open("GET", "/");
        req.send();
        req.abort();
        this.assertCallOrder(abort, loadend);
      },
      //
      // ontimeout()
      //
      "test: emit timeout": function testEmitTimeout() {
        var req = this.req,
          that = this;
        var timeout = this.stub(req, "_emit").withArgs("timeout");
        req.timeout = 10;
        req.open("GET", "/");
        req.send();
        this.wait(20, function () {
          this.assertCalledOnce(timeout);
        }, this);
      },
      "test: not emit error when timeout": function testNotEmitErrorWhenTimeout() {
        // Since Opera does not fire "error" on network error, fire additional
        // "error" on timeout (may well be related to network error)
        if (qx.core.Environment.get("engine.name") === "opera") {
          this.skip();
        }
        var req = this.req;
        var error = this.stub(req, "_emit").withArgs("error");
        req.timeout = 10;
        req.open("GET", "/");
        req.send();
        this.wait(20, function () {
          this.assertNotCalled(error);
        }, this);
      },
      "test: not emit error when aborted immediately": function testNotEmitErrorWhenAbortedImmediately() {
        var req = this.req;
        var error = this.stub(req, "_emit").withArgs("error");
        req.open("GET", "/");
        req.send();
        req.abort();
        this.assertNotCalled(error);
      },
      "test: cancel timeout when DONE": function testCancelTimeoutWhenDONE() {
        var fakeReq = this.getFakeReq(),
          req = this.req;
        this.spy(req, "ontimeout");
        req.timeout = 10;
        req.open("GET", "/");
        req.send();
        fakeReq.respond();
        this.wait(20, function () {
          this.assertNotCalled(req.ontimeout);
        }, this);
      },
      "test: cancel timeout when handler throws": function testCancelTimeoutWhenHandlerThrows() {
        var fakeReq = this.getFakeReq(),
          req = this.req;
        this.spy(req, "ontimeout");
        req.timeout = 10;
        req.open("GET", "/");
        req.send();

        // Simulate error in handler for readyState DONE
        req.onreadystatechange = function () {
          if (req.readyState === 4) {
            // Throw only once
            req.onreadystatechange = function () {};
            throw new Error();
          }
        };
        try {
          fakeReq.respond();
        } catch (e) {} finally {
          this.wait(20, function () {
            this.assertNotCalled(req.ontimeout);
          }, this);
        }
      },
      //
      // onloadend()
      //
      "test: fire loadend when request complete": function testFireLoadendWhenRequestComplete() {
        var req = this.req;
        var fakeReq = this.getFakeReq();
        var loadend = this.stub(req, "_emit").withArgs("loadend");
        req.open("GET", "/");
        req.send();

        // Status does not matter
        fakeReq.respond();
        this.assertCalled(loadend);
      },
      //
      // Events
      //
      //
      // readyState
      //
      "test: set readyState appropriate to native readyState": function testSetReadyStateAppropriateToNativeReadyState() {
        var req = this.req;
        var fakeReq = this.getFakeReq();

        // Created
        this.assertEquals(this.constructor.UNSENT, req.readyState);

        // Open
        req.open("GET", "/affe");
        this.assertEquals(this.constructor.OPENED, req.readyState);

        // Send (and receive)
        req.send();
        fakeReq.respond(this.constructor.DONE);
        this.assertEquals(this.constructor.DONE, req.readyState);
      },
      //
      // responseText
      //
      "test: responseText is empty string when OPEN": function testResponseTextIsEmptyStringWhenOPEN() {
        this.req.open("GET", "/affe");
        this.assertIdentical("", this.req.responseText);
      },
      "test: responseText is empty string when reopened": function testResponseTextIsEmptyStringWhenReopened() {
        var fakeReq = this.getFakeReq();

        // Send and respond
        var req = this.req;
        req.open("GET", "/");
        req.send();
        fakeReq.respond(200, {
          "Content-Type": "text/html"
        }, "Affe");

        // Reopen
        req.open("GET", "/elefant");
        this.assertIdentical("", req.responseText);
      },
      "test: responseText is set when DONE": function testResponseTextIsSetWhenDONE() {
        var req = this.req;
        var fakeReq = this.getFakeReq();
        req.open("GET", "/");
        req.send();
        fakeReq.respond(200, {
          "Content-Type": "text/html"
        }, "Affe");
        this.assertEquals("Affe", req.responseText);
      },
      // BUGFIXES
      "test: query responseText when available": function testQueryResponseTextWhenAvailable() {
        var that = this;
        var req = this.req;
        var fakeReq = this.getFakeReq();
        function success(state) {
          // Stub and prepare success
          fakeReq.readyState = state;
          fakeReq.responseText = "YIPPIE";
          fakeReq.responseHeaders = {};

          // Trigger readystatechange handler
          fakeReq.onreadystatechange();
          that.assertEquals("YIPPIE", req.responseText, "When readyState is " + state);
        }
        success(this.constructor.DONE);

        // Assert responseText to be set when in progress
        // in browsers other than IE < 9
        if (!this.isIEBelow(9)) {
          success(this.constructor.HEADERS_RECEIVED);
          success(this.constructor.LOADING);
        }
      },
      "test: not query responseText if unavailable": function testNotQueryResponseTextIfUnavailable() {
        var that = this;
        var req = this.req;
        var fakeReq = this.getFakeReq();
        function trap(state) {
          // Stub and set trap
          fakeReq.readyState = state;
          fakeReq.responseText = "BOGUS";

          // Trigger readystatechange handler
          fakeReq.onreadystatechange();
          that.assertNotEquals("BOGUS", req.responseText, "When readyState is " + state);
        }
        if (this.isIEBelow(9)) {
          trap(this.constructor.UNSENT);
          trap(this.constructor.OPENED);
          trap(this.constructor.HEADERS_RECEIVED);
          trap(this.constructor.LOADING);
        }
      },
      //
      // responseXML
      //
      "test: responseXML is null when not DONE": function testResponseXMLIsNullWhenNotDONE() {
        this.assertNull(this.req.responseXML);
      },
      "test: responseXML is null when reopened": function testResponseXMLIsNullWhenReopened() {
        var fakeReq = this.getFakeReq();

        // Send and respond
        var req = this.req;
        req.open("GET", "/");
        req.send();
        fakeReq.respond(200, {
          "Content-Type": "application/xml"
        }, "<affe></affe>");

        // Reopen
        req.open("GET", "/");
        this.assertNull(req.responseXML);
      },
      "test: responseXML is parsed document with XML response": function testResponseXMLIsParsedDocumentWithXMLResponse() {
        var req = this.req;
        var fakeReq = this.getFakeReq();
        req.open("GET", "/");
        req.send();
        var headers = {
          "Content-Type": "application/xml"
        };
        var body = "<animals><monkey/><mouse/></animals>";
        fakeReq.respond(200, headers, body);
        this.assertObject(req.responseXML);
      },
      //
      // status and statusText
      //
      "test: http status is 0 when UNSENT": function testHttpStatusIs0WhenUNSENT() {
        this.assertIdentical(0, this.req.status);
      },
      "test: http status is 0 when OPENED": function testHttpStatusIs0WhenOPENED() {
        var req = this.req;
        req.open("GET", "/");
        this.assertIdentical(0, req.status);
      },
      "test: http status is 0 when aborted immediately": function testHttpStatusIs0WhenAbortedImmediately() {
        this.require(["http"]);
        var req = this.req;
        req.open("GET", "/");
        req.send();
        req.abort();
        this.assertIdentical(0, req.status);
      },
      "test: http status when DONE": function testHttpStatusWhenDONE() {
        var req = this.req;
        var fakeReq = this.getFakeReq();
        req.open("GET", "/");
        fakeReq.respond(200);
        this.assertIdentical(200, req.status);
      },
      "test: statusText is empty string when UNSENT": function testStatusTextIsEmptyStringWhenUNSENT() {
        this.assertIdentical("", this.req.statusText);
      },
      "test: statusText is set when DONE": function testStatusTextIsSetWhenDONE() {
        var fakeReq = this.getFakeReq();
        var req = this.req;
        req.open("GET", "/");
        fakeReq.respond(200);
        this.assertIdentical("OK", req.statusText);
      },
      "test: status is set when LOADING": function testStatusIsSetWhenLOADING() {
        var fakeReq = this.getFakeReq();
        var req = this.req;
        req.open("GET", "/");
        fakeReq.readyState = this.constructor.LOADING;
        fakeReq.status = 200;
        fakeReq.responseHeaders = {};
        fakeReq.onreadystatechange();
        this.assertIdentical(200, req.status);
      },
      "test: reset status when reopened": function testResetStatusWhenReopened() {
        var fakeReq = this.getFakeReq();
        var req = this.req;
        req.open("GET", "/");
        fakeReq.respond(200);
        req.open("GET", "/");
        this.assertIdentical(0, req.status);
        this.assertIdentical("", req.statusText);
      },
      // BUGFIXES
      "test: normalize status 1223 to 204": function testNormalizeStatus1223To204() {
        var fakeReq = this.getFakeReq();
        var req = this.req;
        req.open("GET", "/");
        req.send();
        fakeReq.respond(1223);
        this.assertIdentical(204, req.status);
      },
      "test: normalize status 0 to 200 when DONE and file protocol": function testNormalizeStatus0To200WhenDONEAndFileProtocol() {
        var fakeReq = this.getFakeReq();
        var req = this.req;
        req.open("GET", "/");
        req.send();
        this.stub(req, "_getProtocol").returns("file:");
        fakeReq.respond(0, {}, "Response");
        this.assertEquals(200, req.status);
      },
      "test: keep status 0 when not yet DONE and file protocol": function testKeepStatus0WhenNotYetDONEAndFileProtocol() {
        var fakeReq = this.getFakeReq();
        var req = this.req;
        this.stub(req, "_getProtocol").returns("file:");
        req.open("GET", "/");
        fakeReq.readyState = 3;
        fakeReq.onreadystatechange();
        this.assertEquals(0, req.status);
      },
      "test: keep status 0 when DONE with network error and file protocol": function testKeepStatus0WhenDONEWithNetworkErrorAndFileProtocol() {
        var fakeReq = this.getFakeReq();
        var req = this.req;
        req.open("GET", "/");
        req.send();
        this.stub(req, "_getProtocol").returns("file:");

        // Indicate network error
        fakeReq.readyState = 4;
        fakeReq.responseText = "";
        fakeReq.onreadystatechange();
        this.assertEquals(0, req.status);
      },
      //
      // _getProtocol()
      //
      "test: read protocol from requested URL when it contains protocol": function testReadProtocolFromRequestedURLWhenItContainsProtocol() {
        var req = this.req;
        req.open("GET", "http://example.org/index.html");
        this.assertEquals("http:", req._getProtocol());
      },
      "test: read protocol from window if requested URL is without protocol": function testReadProtocolFromWindowIfRequestedURLIsWithoutProtocol() {
        this.require(["http"]);
        var req = this.req;
        req.open("GET", "index.html");
        this.assertMatch(req._getProtocol(), /https?:/);
      },
      //
      // getResponseHeader()
      //
      "test: getResponseHeader()": function testGetResponseHeader() {
        var fakeReq = this.getFakeReq();
        fakeReq.open();
        fakeReq.setResponseHeaders({
          key: "value"
        });
        var responseHeader = this.req.getResponseHeader("key");
        this.assertEquals("value", responseHeader);
      },
      //
      // getAllResponseHeaders()
      //
      "test: getAllResponseHeaders()": function testGetAllResponseHeaders() {
        var fakeReq = this.getFakeReq();
        fakeReq.open();
        fakeReq.setResponseHeaders({
          key1: "value1",
          key2: "value2"
        });
        var responseHeaders = this.req.getAllResponseHeaders();
        this.assertMatch(responseHeaders, /key1: value1/);
        this.assertMatch(responseHeaders, /key2: value2/);
      },
      //
      // dispose()
      //
      "test: dispose() deletes native Xhr": function testDisposeDeletesNativeXhr() {
        this.req.dispose();
        this.assertNull(this.req.getRequest());
      },
      "test: dispose() aborts": function testDisposeAborts() {
        var req = this.req;
        this.spy(req, "abort");
        this.req.dispose();
        this.assertCalled(req.abort);
      },
      "test: isDisposed()": function testIsDisposed() {
        this.assertFalse(this.req.isDisposed());
        this.req.dispose();
        this.assertTrue(this.req.isDisposed());
      },
      "test: invoking public method throws when disposed": function testInvokingPublicMethodThrowsWhenDisposed() {
        var req = this.req;
        var assertDisposedException = qx.lang.Function.bind(function (callback) {
          this.assertException(qx.lang.Function.bind(callback, this), Error, /Already disposed/);
        }, this);
        this.req.dispose();
        assertDisposedException(function () {
          req.open("GET", "/");
        });
        assertDisposedException(function () {
          req.setRequestHeader();
        });
        assertDisposedException(function () {
          req.send();
        });
        assertDisposedException(function () {
          req.abort();
        });
        assertDisposedException(function () {
          req.getResponseHeader();
        });
        assertDisposedException(function () {
          req.getAllResponseHeaders();
        });
      },
      fakeNativeXhr: function fakeNativeXhr() {
        this.fakedXhr = this.useFakeXMLHttpRequest();

        // Reset pre-existing request so that it uses the faked XHR
        if (this.req) {
          this.req = new qx.bom.request.Xhr();
        }
      },
      getFakeReq: function getFakeReq() {
        return this.getRequests().slice(-1)[0];
      },
      isIEBelow: function isIEBelow(targetVersion) {
        var name = qx.core.Environment.get("engine.name");
        var version = qx.core.Environment.get("engine.version");
        return name == "mshtml" && version < targetVersion;
      },
      isFFBelow: function isFFBelow(targetVersion) {
        var name = qx.core.Environment.get("engine.name");
        var version = qx.core.Environment.get("browser.version");
        return name == "gecko" && parseFloat(version) < targetVersion;
      },
      hasIEBelow9: function hasIEBelow9() {
        return this.isIEBelow(9);
      },
      skip: function skip(msg) {
        throw new qx.dev.unit.RequirementError(null, msg);
      }
    }
  });
  qx.test.bom.request.Xhr.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Xhr.js.map?dt=1717235386865