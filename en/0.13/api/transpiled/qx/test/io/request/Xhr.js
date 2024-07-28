(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.test.io.request.MRequest": {
        "require": true
      },
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.io.request.Xhr": {},
      "qx.io.request.authentication.Basic": {},
      "qx.util.Base64": {},
      "qx.type.BaseError": {},
      "qx.event.Registration": {}
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

  /* ************************************************************************
  
  ************************************************************************ */

  /**
   * @ignore(Klass)
   * @asset(qx/test/xmlhttp/*)
   */
  /* global Klass */

  /**
   * Tests asserting behavior
   *
   * - special to io.request.Xhr and
   * - common to io.request.* (see {@link qx.test.io.request.MRequest})
   *
   * Tests defined in MRequest run with appropriate context, i.e.
   * a transport that is an instance of qx.bom.request.Xhr
   * (see {@link #setUpFakeTransport}).
   *
   */
  qx.Class.define("qx.test.io.request.Xhr", {
    extend: qx.dev.unit.TestCase,
    include: [qx.test.io.request.MRequest, qx.dev.unit.MMock, qx.dev.unit.MRequirements],
    members: {
      setUp: function setUp() {
        this.setUpRequest();
        this.setUpFakeTransport();
      },
      setUpRequest: function setUpRequest() {
        this.req && this.req.dispose();
        this.req = new qx.io.request.Xhr();
        this.req.setUrl("url");
      },
      setUpFakeTransport: function setUpFakeTransport() {
        if (this.transport && this.transport.send.restore) {
          return;
        }
        this.transport = this.injectStub(qx.io.request.Xhr.prototype, "_createTransport", this.deepStub(qx.io.request.Xhr.prototype._createTransport()));
        this.setUpRequest();
      },
      setUpFakeServer: function setUpFakeServer() {
        // Not fake transport
        this.getSandbox().restore();
        this.useFakeServer();
        this.setUpRequest();
        this.server = this.getServer();
        this.server.respondWith("GET", "/found", [200, {
          "Content-Type": "text/html"
        }, "FOUND"]);
        this.server.respondWith("GET", "/found.json", [200, {
          "Content-Type": "application/json; charset=utf-8"
        }, "JSON"]);
        this.server.respondWith("GET", "/found.other", [200, {
          "Content-Type": "application/other"
        }, "OTHER"]);
      },
      setUpFakeXhr: function setUpFakeXhr() {
        // Not fake transport
        this.getSandbox().restore();
        this.useFakeXMLHttpRequest();
        this.setUpRequest();
      },
      tearDown: function tearDown() {
        this.getSandbox().restore();
        this.req.dispose();

        // May fail in IE
        try {
          qx.Class.undefine("Klass");
        } catch (e) {}
      },
      //
      // General (cont.)
      //
      "test: set url property on construct": function test_set_url_property_on_construct() {
        var req = new qx.io.request.Xhr("url");
        this.assertEquals("url", req.getUrl());
        req.dispose();
      },
      "test: set method property on construct": function test_set_method_property_on_construct() {
        var req = new qx.io.request.Xhr("url", "POST");
        this.assertEquals("POST", req.getMethod());
        req.dispose();
      },
      //
      // Send (cont.)
      //
      "test: send POST request": function test_send_POST_request() {
        this.setUpFakeTransport();
        this.req.setMethod("POST");
        this.req.send();
        this.assertCalledWith(this.transport.open, "POST");
      },
      "test: send sync request": function test_send_sync_request() {
        this.require(["http"]);
        this.setUpFakeTransport();
        this.req.setAsync(false);
        this.req.send();
        this.assertCalledWith(this.transport.open, "GET", "url", false);
        this.assertCalled(this.transport.send);
      },
      //
      // Data (cont.)
      //
      "test: set content type urlencoded for POST request with body when no type given": function test_set_content_type_urlencoded_for_POST_request_with_body_when_no_type_given() {
        this.setUpFakeTransport();
        this.req.setMethod("POST");
        this.req.setRequestData("Affe");
        this.req.send();
        this.assertCalledWith(this.transport.setRequestHeader, "Content-Type", "application/x-www-form-urlencoded");
      },
      "test: not set content type urlencoded for POST request with body when type given": function test_not_set_content_type_urlencoded_for_POST_request_with_body_when_type_given() {
        var msg;
        this.setUpFakeTransport();
        this.req.setMethod("POST");
        this.req.setRequestData("Affe");
        this.req.setRequestHeader("Content-Type", "application/json");
        this.req.send();
        msg = "Must not set content type urlencoded when other type given";
        this.assert(!this.transport.setRequestHeader.calledWith("Content-Type", "application/x-www-form-urlencoded"), msg);
      },
      "test: send string data with POST request": function test_send_string_data_with_POST_request() {
        this.setUpFakeTransport();
        this.req.setMethod("POST");
        this.req.setRequestData("str");
        this.req.send();
        this.assertCalledWith(this.transport.send, "str");
      },
      "test: send obj data with POST request": function test_send_obj_data_with_POST_request() {
        this.setUpFakeTransport();
        this.req.setMethod("POST");
        this.req.setRequestData({
          "af fe": true
        });
        this.req.send();
        this.assertCalledWith(this.transport.send, "af+fe=true");
      },
      "test: send qooxdoo obj data with POST request": function test_send_qooxdoo_obj_data_with_POST_request() {
        this.setUpFakeTransport();
        this.setUpKlass();
        var obj = new Klass();
        this.req.setMethod("POST");
        this.req.setRequestData(obj);
        this.req.send();
        this.assertCalledWith(this.transport.send, "affe=true");
        obj.dispose();
      },
      "test: send blob data with POST request": function test_send_blob_data_with_POST_request() {
        if (typeof window.Blob == "undefined") {
          this.skip("Blob constructor not available");
        }
        var blob = new window.Blob(["abc123"], {
          type: "text/plain"
        });
        this.setUpFakeTransport();
        this.req.setMethod("POST");
        this.req.setRequestData(blob);
        this.req.send();
        this.assertCalledWith(this.transport.send, blob);
      },
      "test: send array buffer data with POST request": function test_send_array_buffer_data_with_POST_request() {
        if (typeof window.ArrayBuffer == "undefined") {
          this.skip("ArrayBuffer constructor not available");
        }
        var array = new window.ArrayBuffer(512);
        this.setUpFakeTransport();
        this.req.setMethod("POST");
        this.req.setRequestData(array);
        this.req.send();
        this.assertCalledWith(this.transport.send, array);
      },
      "test: serialize data": function test_serialize_data() {
        var req = this.req,
          data = {
            abc: "def",
            uvw: "xyz"
          },
          contentType = "application/json";
        this.assertNull(req._serializeData(null));
        this.assertEquals("leaveMeIntact", req._serializeData("leaveMeIntact"));
        this.assertEquals("abc=def&uvw=xyz", req._serializeData(data));
        req.setRequestHeader("Content-Type", "arbitrary/contentType");
        this.assertEquals("abc=def&uvw=xyz", req._serializeData(data));
        req.setRequestHeader("Content-Type", contentType);
        this.assertEquals('{"abc":"def","uvw":"xyz"}', req._serializeData(data));
        req.setRequestHeader("Content-Type", contentType);
        this.assertEquals("[1,2,3]", req._serializeData([1, 2, 3]));
      },
      //
      // Header and Params (cont.)
      //
      "test: set requested-with header": function test_set_requestedWith_header() {
        this.setUpFakeTransport();
        this.req.send();
        this.assertCalledWith(this.transport.setRequestHeader, "X-Requested-With", "XMLHttpRequest");
      },
      "test: not set requested-with header when cross-origin": function test_not_set_requestedWith_header_when_crossOrigin() {
        this.setUpFakeTransport();
        var spy = this.transport.setRequestHeader.withArgs("X-Requested-With", "XMLHttpRequest");
        this.req.setUrl("http://example.com");
        this.req.send();
        this.assertNotCalled(spy);
      },
      "test: set cache control header": function test_set_cache_control_header() {
        this.setUpFakeTransport();
        this.req.setCache("no-cache");
        this.req.send();
        this.assertCalledWith(this.transport.setRequestHeader, "Cache-Control", "no-cache");
      },
      "test: set accept header": function test_set_accept_header() {
        this.setUpFakeTransport();
        this.req.setAccept("application/json");
        this.req.send();
        this.assertCalledWith(this.transport.setRequestHeader, "Accept", "application/json");
      },
      "test: override response content type": function test_override_response_content_type() {
        this.setUpFakeTransport();
        this.req.overrideResponseContentType("text/plain;charset=Shift-JIS");
        this.assertCalledWith(this.transport.overrideMimeType, "text/plain;charset=Shift-JIS");
      },
      "test: get response content type": function test_get_response_content_type() {
        this.stub(this.req, "getResponseHeader");
        this.req.getResponseContentType();
        this.assertCalledWith(this.req.getResponseHeader, "Content-Type");
      },
      //
      // Handler
      //
      // Documentation only
      "test: event handler receives request": function test_event_handler_receives_request() {
        this.setUpFakeTransport();
        var req = this.req,
          transport = this.transport,
          that = this;
        transport.readyState = 4;
        transport.status = 200;
        transport.responseText = "Affe";
        req.addListener("success", function (e) {
          that.assertEquals(e.getTarget(), req);
          that.assertEquals("Affe", e.getTarget().getResponseText());
        });
        transport.onreadystatechange();
      },
      // Documentation only
      "test: event handler's this is request": function test_event_handlerS_this_is_request() {
        this.setUpFakeTransport();
        var req = this.req,
          transport = this.transport,
          that = this;
        transport.readyState = 4;
        transport.status = 200;
        transport.responseText = "Affe";
        req.addListener("success", function () {
          that.assertEquals(this, req);
          that.assertEquals("Affe", this.getResponseText());
        });
        transport.onreadystatechange();
      },
      //
      // Properties
      //
      "test: sync XHR properties for every readyState": function test_sync_XHR_properties_for_every_readyState() {
        this.require(["http"]);
        this.setUpFakeServer();
        var req = this.req,
          server = this.server,
          readyStates = [],
          statuses = [];
        req.setUrl("/found");
        req.setMethod("GET");
        readyStates.push(req.getReadyState());
        req.addListener("readyStateChange", function () {
          readyStates.push(req.getReadyState());
          statuses.push(req.getStatus());
        });
        req.send();
        server.respond();
        this.assertArrayEquals([0, 1, 2, 3, 4], readyStates);
        this.assertArrayEquals([0, 200, 200, 200], statuses);
        this.assertEquals("text/html", req.getResponseHeader("Content-Type"));
        this.assertEquals("OK", req.getStatusText());
        this.assertEquals("FOUND", req.getResponseText());
      },
      //
      // Response
      //
      "test: get response": function test_get_response() {
        this.setUpFakeTransport();
        var req = this.req,
          transport = this.transport;
        transport.readyState = 4;
        transport.status = 200;
        transport.responseText = "Affe";
        transport.onreadystatechange();
        this.assertEquals("Affe", req.getResponse());
      },
      "test: get response on 400 status": function test_get_response_on_400_status() {
        this.setUpFakeTransport();
        var req = this.req,
          transport = this.transport;
        transport.readyState = 4;
        transport.status = 400;
        transport.responseText = "Affe";
        transport.onreadystatechange();
        this.assertEquals("Affe", req.getResponse());
      },
      "test: get response by change event": function test_get_response_by_change_event() {
        this.setUpFakeTransport();
        var req = this.req,
          transport = this.transport,
          that = this;
        transport.readyState = 4;
        transport.status = 200;
        transport.responseText = "Affe";
        this.assertEventFired(req, "changeResponse", function () {
          transport.onreadystatechange();
        }, function (e) {
          that.assertEquals("Affe", e.getData());
        });
      },
      //
      // Parsing
      //
      "test: _getParsedResponse": function test__getParsedResponse() {
        var req = this.req,
          json = '{"animals": 3}',
          contentType = "application/json",
          stubbedParser = req._createResponseParser();
        req._transport.responseText = json;
        this.stub(req, "getResponseContentType").returns(contentType);

        // replace real parser with stub
        this.stub(stubbedParser, "parse");
        req._parser = stubbedParser;
        req._getParsedResponse();
        this.assertCalledWith(stubbedParser.parse, json, contentType);
      },
      "test: setParser": function test_setParser() {
        var req = this.req,
          customParser = function customParser() {},
          stubbedParser = req._createResponseParser();

        // replace real parser with stub
        this.stub(stubbedParser, "setParser");
        req._parser = stubbedParser;
        req.setParser(customParser);
        this.assertCalledWith(stubbedParser.setParser, customParser);
      },
      //
      // Auth
      //
      "test: basic auth": function test_basic_auth() {
        this.setUpFakeTransport();
        var transport = this.transport,
          auth,
          call,
          key,
          credentials;
        auth = new qx.io.request.authentication.Basic("affe", "geheim");
        this.req.setAuthentication(auth);
        this.req.send();
        call = transport.setRequestHeader.getCall(1);
        key = "Authorization";
        credentials = /Basic\s(.*)/.exec(call.args[1])[1];
        this.assertEquals(key, call.args[0]);
        this.assertEquals("affe:geheim", qx.util.Base64.decode(credentials));
      },
      //
      // Promise
      //
      "test: send with promise sends the request": function test_send_with_promise_sends_the_request() {
        this.req.sendWithPromise();
        this.assertCalledOnce(this.transport.send);
      },
      "test: send with promise succeeds": function test_send_with_promise_succeeds() {
        this.setUpFakeTransport();
        var req = this.req;
        req.sendWithPromise(this).then(this.resumeHandler(function (result) {
          this.assertEquals(req, result);
          this.assertEquals(200, req.getStatus());
        }, this));
        var transport = this.transport;
        transport.readyState = 4;
        transport.status = 200;
        transport.onreadystatechange();
        this.wait(10000);
      },
      "test: send with promise fails with statusError": function test_send_with_promise_fails_with_statusError() {
        this.setUpFakeTransport();
        var req = this.req;
        req.sendWithPromise(this).then(this.resumeHandler(function (_) {
          throw new qx.type.BaseError("Error in sendWithPromise()", "Promise has been fulfilled but should have been rejected.");
        }))["catch"](this.resumeHandler(function (result) {
          this.assertInstance(result, qx.type.BaseError);
          this.assertEquals("statusError: 404: Affe.", result.toString());
        }, this));
        var transport = this.transport;
        transport.readyState = 4;
        transport.status = 404;
        transport.statusText = "Affe";
        transport.onreadystatechange();
        this.wait(1000);
      },
      "test: send with promise fails with error": function test_send_with_promise_fails_with_error() {
        this.setUpFakeTransport();
        var req = this.req;
        req.sendWithPromise(this).then(this.resumeHandler(function (_) {
          throw new qx.type.BaseError("Error in sendWithPromise()", "Promise has been fulfilled but should have been rejected.");
        }))["catch"](this.resumeHandler(function (result) {
          this.assertInstance(result, qx.type.BaseError);
          this.assertEquals("error: Request failed.", result.toString());
        }, this));
        var transport = this.transport;
        transport.readyState = 4;
        transport.status = 0;
        transport.onerror();
        this.wait(1000);
      },
      "test: send with promise fails with timeout": function test_send_with_promise_fails_with_timeout() {
        this.setUpFakeTransport();
        var req = this.req;
        req.sendWithPromise(this).then(this.resumeHandler(function (_) {
          throw new qx.type.BaseError("Error in sendWithPromise()", "Promise has been fulfilled but should have been rejected.");
        }))["catch"](this.resumeHandler(function (result) {
          this.assertInstance(result, qx.type.BaseError);
          this.assertEquals("timeout: Request failed with timeout after 1 ms.", result.toString());
        }, this));
        req.setTimeout(1);
        this.transport.ontimeout();
        this.wait(5000);
      },
      "test: setled promise has no extra listeners": function test_setled_promise_has_no_extra_listeners() {
        this.setUpFakeTransport();
        var req = this.req;
        var promise = req.sendWithPromise(this);

        // cache the number of listeners before setling the promise
        var listeners = qx.event.Registration.serializeListeners(req);
        promise["catch"](this.resumeHandler(function () {
          var length = qx.event.Registration.serializeListeners(req).length;
          this.assertNotEquals(length, listeners.length, "The number of listeners remains the same before and after setling the promise.");
        }));
        this.transport.ontimeout();
        this.wait(5000);
      },
      "test: aborted request rejects the promise": function test_aborted_request_rejects_the_promise() {
        this.setUpFakeTransport();
        var req = this.req;
        req.sendWithPromise(this).then(this.resumeHandler(function (_) {
          throw new qx.type.BaseError("Error in sendWithPromise()", "Promise has been fulfilled but should have been rejected.");
        }))["catch"](this.resumeHandler(function (result) {
          this.assertInstance(result, qx.type.BaseError);
          this.assertEquals("abort: Request aborted.", result.toString());
        }, this));
        this.transport.onabort();
        this.wait(5000);
      },
      "test: parseError rejects the promise": function test_parseError_rejects_the_promise() {
        this.setUpFakeTransport();
        var req = this.req;
        var stubbedParser = req._createResponseParser();

        // replace real parser with stub
        var stub = this.stub(stubbedParser, "parse");
        stub["throws"]();
        req._parser = stubbedParser;
        req.sendWithPromise(this).then(this.resumeHandler(function (_) {
          throw new qx.type.BaseError("Error in sendWithPromise()", "Promise has been fulfilled but should have been rejected.");
        }))["catch"](this.resumeHandler(function (result) {
          this.assertInstance(result, qx.type.BaseError);
          this.assertEquals("parseError: Error parsing the response.", result.toString());
        }, this));
        var transport = this.transport;
        transport.readyState = 4;
        transport.status = 200;
        transport.onreadystatechange();
        this.wait(5000);
      },
      "test: canceled promise with abort() in finally does not reject other promises": function test_canceled_promise_with_abort_in_finally_does_not_reject_other_promises() {
        this.setUpFakeTransport();
        var req = this.req;
        var promise = req.sendWithPromise(this);

        // this path is canceled. We don't expect anything from it
        var promise1 = promise.then(this.resumeHandler(function (_) {
          throw new qx.type.BaseError("Error in sendWithPromise()", "This path should not be fulfilled.");
        }, this))["catch"](this.resumeHandler(function (result) {
          throw new qx.type.BaseError("Error in sendWithPromise()", "This path should not be rejected.");
        }, this))

        // except that we want to abort when is finished
        ["finally"](function () {
          req.abort();
        });

        // this path should keep going
        promise.then(this.resumeHandler(function (result) {
          this.assertEquals(req, result);
        }, this))["catch"](this.resumeHandler(function (_) {
          throw new qx.type.BaseError("Error in sendWithPromise()", "Promise has been rejected but should have been fulfilled.");
        }, this));
        promise1.cancel();
        var transport = this.transport;
        transport.readyState = 4;
        transport.status = 200;
        transport.onreadystatechange();
        this.wait(5000);
      },
      "test: canceled promise path does not affect other listeners": function test_canceled_promise_path_does_not_affect_other_listeners() {
        this.setUpFakeTransport();
        var req = this.req;
        var promise = req.sendWithPromise(this);

        // this path is canceled. We don't expect anything from it
        var promise1 = promise.then(this.resumeHandler(function (_) {
          throw new qx.type.BaseError("Error in sendWithPromise()", "promise1 should not be fulfilled.");
        }))["catch"](this.resumeHandler(function (_) {
          throw new qx.type.BaseError("Error in sendWithPromise()", "promise1 should not be rejected.");
        }, this));

        // this path should keep going
        promise.then(this.resumeHandler(function (result) {
          this.assertEquals(req, result);
        }, this));
        promise1.cancel();
        var transport = this.transport;
        transport.readyState = 4;
        transport.status = 200;
        transport.onreadystatechange();
        this.wait(5000);
      },
      "test: canceled promise aborts pending request": function test_canceled_promise_aborts_pending_request() {
        this.setUpFakeTransport();
        var req = this.req;
        var promise = req.sendWithPromise(this).then(this.resumeHandler(function (_) {
          throw new qx.type.BaseError("Error in sendWithPromise()", "promise should not be fulfilled.");
        }))["catch"](this.resumeHandler(function (_) {
          throw new qx.type.BaseError("Error in sendWithPromise()", "promise should not be rejected.");
        }))["finally"](this.resumeHandler(function () {
          this.assertEquals("abort", req.getPhase());
        }));
        var transport = this.transport;
        transport.readyState = 2;
        transport.onreadystatechange();
        promise.cancel();
        this.wait(5000);
      },
      "test: settled promise does not set phase to abort": function test_settled_promise_does_not_set_phase_to_abort() {
        this.setUpFakeTransport();
        var req = this.req;
        req.sendWithPromise(this).then(this.resumeHandler(function (_) {
          this.assertEquals("success", req.getPhase());
        }))["catch"](this.resumeHandler(function (_) {
          throw new qx.type.BaseError("Error in sendWithPromise()", "promise should not be rejected.");
        }))["finally"](function () {
          this.assertEquals("success", req.getPhase());
        });
        var transport = this.transport;
        transport.readyState = 4;
        transport.status = 200;
        transport.onreadystatechange();
        this.wait(5000);
      },
      "test: returned promise is bound to request": function test_returned_promise_is_bound_to_request() {
        this.setUpFakeTransport();
        var req = this.req;
        var self = this;
        req.sendWithPromise()["catch"](this.resumeHandler(function (_) {
          self.assertIdentical(req, this);
        }));
        this.transport.onerror();
        this.wait(5000);
      },
      "test: returned promise is bound to caller": function test_returned_promise_is_bound_to_caller() {
        this.setUpFakeTransport(this);
        var self = this;
        this.req.sendWithPromise(this)["catch"](this.resumeHandler(function (_) {
          self.assertIdentical(self, this);
        }));
        this.transport.onerror();
        this.wait(5000);
      }
    }
  });
  qx.test.io.request.Xhr.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Xhr.js.map?dt=1722151833262