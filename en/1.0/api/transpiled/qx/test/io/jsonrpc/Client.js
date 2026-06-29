function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
      "qx.test.io.MAssert": {
        "require": true
      },
      "qx.dev.unit.Sinon": {},
      "qx.io.jsonrpc.protocol.Request": {},
      "qx.io.request.Xhr": {},
      "qx.lang.Type": {},
      "qx.io.exception.Exception": {},
      "qx.io.jsonrpc.Client": {},
      "qx.io.exception.Transport": {},
      "qx.io.exception.Protocol": {},
      "qx.io.request.authentication.Bearer": {},
      "qx.lang.Json": {},
      "qx.io.jsonrpc.protocol.Result": {},
      "qx.io.jsonrpc.protocol.Batch": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.io.jsonrpc.forwardTransportPromiseRejectionToRequest": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de & contributors
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tristan Koch (tristankoch)
       * Christian Boulanger (cboulanger)
  
  ************************************************************************ */

  /**
   * Tests for qx.io.jsonrpc.Client with a qx.test.io.request.Xhr transport
   */
  qx.Class.define("qx.test.io.jsonrpc.Client", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MMock, qx.test.io.MAssert],
    members: {
      setUp: function setUp() {
        this.sinon = qx.dev.unit.Sinon.getSinon();
        this.setUpRequest();
        this.setUpFakeTransport();
        qx.io.jsonrpc.protocol.Request.resetId();
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
      setUpFakeXhr: function setUpFakeXhr() {
        // Not fake transport
        this.getSandbox().restore();
        this.useFakeXMLHttpRequest();
        this.setUpRequest();
      },
      /**
       * Sets up the fake server and instructs it to send the given response
       * @param {String} response Optional server response
       */
      setUpFakeServer: function setUpFakeServer(response) {
        // Not fake transport
        this.getSandbox().restore();
        this.useFakeServer();
        this.setUpRequest();
        if (response) {
          this.setServerResponse(response);
        }
        this.getServer().autoRespond = true;
      },
      /**
       * Set the fake server's response
       * @param {{String|Object} } response Server response. Will be stringified to a JSON string if not a string
       */
      setServerResponse: function setServerResponse(response) {
        if (typeof response != "string") {
          response = JSON.stringify(response);
        }
        this.getServer().respondWith("POST", /.*/, [200, {
          "Content-Type": "application/json; charset=utf-8"
        }, response]);
      },
      /**
       * Assert that the given exception is thrown on receiving the given result
       * @param {String} response
       * @param {Class|Number} exception If class, the exception class, which must
       * be a subclass of qx.io.exception.Exception. If number, the error number
       */
      assertExceptionThrown: function assertExceptionThrown(response, exception) {
        var _this = this;
        if (!(qx.lang.Type.isNumber(exception) || qx.Class.isSubClassOf(exception, qx.io.exception.Exception))) {
          throw new Error("Second argument must be a Number or a subclass of qx.io.exception.Exception");
        }
        this.setUpFakeServer(response);
        var message_out = new qx.io.jsonrpc.protocol.Request("foo", [1, 2, 3]);
        var client = new qx.io.jsonrpc.Client("http://jsonrpc");
        var errorCallback = this.spy(function (err) {
          //console.warn(err);
          if (qx.lang.Type.isNumber(exception)) {
            if (!(err instanceof qx.io.exception.Exception)) {
              throw err;
            }
            _this.assertEquals(exception, err.code, "Error code does not match.  Expected ".concat(exception, ", got ").concat(err.code, "."));
          } else {
            _this.assertInstance(err, exception, "Exception class does not match. Expected ".concat(exception.classname, ", got ").concat(err, "."));
          }
        });
        // check message promise
        message_out.getPromise()["catch"](errorCallback);
        // check event
        client.addListener("error", function (evt) {
          return errorCallback(evt.getData());
        });
        // check transport promise
        client.send(message_out)["catch"](errorCallback);
        this.wait(100, function () {
          // in case of a transport error, ...
          var n = qx.core.Environment.select("qx.io.jsonrpc.forwardTransportPromiseRejectionToRequest", {
            "true": 1,
            // ... we are rejecting the request promise only, v8 default
            "false": 2 // ... both request promise and transport promise are rejected, v7 default
          });
          if (
          // the request promise will not be rejected because it already is rejected in this special case
          exception === qx.io.exception.Transport.DUPLICATE_ID ||
          // or the send promise will not be rejected because we have a server-side error, v7 default only
          exception === qx.io.exception.Protocol && !qx.core.Environment.get("qx.io.jsonrpc.forwardTransportPromiseRejectionToRequest")) {
            _this.assertCallCount(errorCallback, n);
          } else {
            _this.assertCallCount(errorCallback, n + 1);
          }
        });
      },
      tearDown: function tearDown() {
        this.getSandbox().restore();
        this.req.dispose();
      },
      resetId: function resetId() {
        qx.io.jsonrpc.protocol.Request.resetId();
      },
      //
      // Auth, should be moved into qx.test.io.request.Xhr
      //
      "test: Bearer authentication": function test_Bearer_authentication() {
        this.setUpFakeTransport();
        var transport = this.transport,
          auth,
          call,
          key,
          credentials;
        auth = new qx.io.request.authentication.Bearer("TOKEN");
        this.req.setAuthentication(auth);
        this.req.send();
        call = transport.setRequestHeader.getCall(1);
        key = "Authorization";
        credentials = /Bearer\s(.*)/.exec(call.args[1])[1];
        this.assertEquals(key, call.args[0]);
        this.assertEquals("TOKEN", credentials);
      },
      //
      // JSON-RPC
      //
      "test: throw on invalid response id": function test_throw_on_invalid_response_id() {
        this.resetId();
        var response = qx.lang.Json.stringify({
          jsonrpc: "2.0",
          result: 19,
          id: 2
        });
        this.assertExceptionThrown(response, qx.io.exception.Transport.UNKNOWN_ID);
      },
      "test: throw on duplicate response id": function test_throw_on_duplicate_response_id() {
        this.resetId();
        var response = qx.lang.Json.stringify([{
          jsonrpc: "2.0",
          result: 19,
          id: 1
        }, {
          jsonrpc: "2.0",
          result: 19,
          id: 1
        }]);
        this.assertExceptionThrown(response, qx.io.exception.Transport.DUPLICATE_ID);
      },
      "test: call jsonrpc method and receive response with single result": function test_call_jsonrpc_method_and_receive_response_with_single_result() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var message_out, result, message_in, client, value;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _this2.resetId();
                message_out = new qx.io.jsonrpc.protocol.Request("foo", ["bar"]);
                result = "Hello World!";
                message_in = new qx.io.jsonrpc.protocol.Result(message_out.getId(), result);
                _this2.setUpFakeServer(message_in.toString());
                client = new qx.io.jsonrpc.Client("http://jsonrpc");
                _context.n = 1;
                return client.send(message_out);
              case 1:
                _context.n = 2;
                return message_out.getPromise();
              case 2:
                value = _context.v;
                _this2.assertEquals(result, value);
              case 3:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      "test: call jsonrpc method and receive batched response": function test_call_jsonrpc_method_and_receive_batched_response() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var message_out, result, response, client, value;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _this3.resetId();
                message_out = new qx.io.jsonrpc.protocol.Request("foo", ["bar"]);
                result = "Hello World!";
                response = new qx.io.jsonrpc.protocol.Batch().add(new qx.io.jsonrpc.protocol.Result(message_out.getId(), result)).addRequest("foo", ["bar"]).addNotification("logout").toString();
                _this3.setUpFakeServer(response);
                client = new qx.io.jsonrpc.Client("http://jsonrpc");
                _context2.n = 1;
                return client.send(message_out);
              case 1:
                _context2.n = 2;
                return message_out.getPromise();
              case 2:
                value = _context2.v;
                _this3.assertEquals(result, value);
              case 3:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      "test: call jsonrpc method and expect error on invalid reponse ": function test_call_jsonrpc_method_and_expect_error_on_invalid_reponse_() {
        this.assertExceptionThrown("helloworld!", qx.io.exception.Transport.INVALID_JSON);
      },
      "test: call jsonrpc method and expect error on invalid reponse - missing result": function test_call_jsonrpc_method_and_expect_error_on_invalid_reponse__missing_result() {
        this.assertExceptionThrown("null", qx.io.exception.Transport.NO_DATA);
      },
      "test: call jsonrpc method and expect error response": function test_call_jsonrpc_method_and_expect_error_response() {
        this.resetId();
        var response = qx.lang.Json.stringify({
          jsonrpc: "2.0",
          error: {
            code: -32600,
            message: "Division by zero!"
          },
          id: 1
        });
        this.assertExceptionThrown(response, qx.io.exception.Protocol);
      },
      "test: send batched requests": function test_send_batched_requests() {
        var _this4 = this;
        this.resetId();
        var response = qx.lang.Json.stringify([{
          jsonrpc: "2.0",
          result: 7,
          id: 1
        }, {
          jsonrpc: "2.0",
          result: "foo",
          id: 2
        }, {
          jsonrpc: "2.0",
          error: {
            code: -32600,
            message: "Invalid Request"
          },
          id: 3
        }, {
          jsonrpc: "2.0",
          error: {
            code: -32601,
            message: "Method not found"
          },
          id: 4
        }, {
          jsonrpc: "2.0",
          result: ["hello", 5],
          id: 5
        }]);
        this.setUpFakeServer(response);
        var client = new qx.io.jsonrpc.Client("http://jsonrpc");
        var spies = [];
        var batch = new qx.io.jsonrpc.protocol.Batch();
        for (var i = 1; i < 6; i++) {
          spies[i] = {
            result: this.spy(),
            error: this.spy()
          };
          var request = new qx.io.jsonrpc.protocol.Request("someMethod", []);
          request.getPromise().then(spies[i].result)["catch"](spies[i].error);
          batch.add(request);
        }
        client.sendBatch(batch)["catch"](function (err) {
          _this4.assertInstance(err, qx.io.exception.Protocol);
        });
        this.wait(100, function () {
          this.assertCalledWith(spies[1].result, 7);
          this.assertCalledWith(spies[2].result, "foo");
          this.assertCalled(spies[3].error);
          this.assertCalled(spies[4].error);
          this.assertCalledWith(spies[5].result, ["hello", 5]);
        }, this);
      },
      "test: receive jsonrpc requests from server": function test_receive_jsonrpc_requests_from_server() {
        var _this5 = this;
        this.resetId();
        var response = [{
          jsonrpc: "2.0",
          method: "clientMethod",
          params: ["foo", "bar"],
          id: 1
        }, {
          jsonrpc: "2.0",
          method: "clientNotification",
          params: []
        }];
        this.setUpFakeServer(qx.lang.Json.stringify(response));
        var client = new qx.io.jsonrpc.Client("http://jsonrpc");
        var spy = this.spy();
        client.addListener("incomingRequest", function (evt) {
          var message = evt.getData().toObject();
          _this5.assertDeepEquals(response.shift(), message);
          spy(message);
        });
        client.sendNotification("ping");
        this.wait(100, function () {
          return _this5.assertCalledTwice(spy);
        });
      },
      /**
       * Issue #10739
       */
      testIssue10739: function testIssue10739() {
        var _this6 = this;
        this.resetId();
        this.setUpFakeServer();
        var successCallback = this.spy(function (result) {
          return _this6.debug("Server response is \"".concat(result, "\""));
        });
        var errorCallback = this.spy(function (error) {
          return console.error(error.message);
        });
        var client = new qx.io.jsonrpc.Client("http://test.local");
        var auth = new qx.io.request.authentication.Bearer("TOKEN");
        client.getTransport().getTransportImpl().setAuthentication(auth);
        this.setServerResponse({
          jsonrpc: "2.0",
          error: {
            code: 8,
            message: "stale or uninitialized auth token/rune"
          },
          id: 1
        });
        var sendRequest = this.spy(function () {
          _this6.debug("sendRequest() was called");
          client.sendRequest("service.method", ["foo"]).then(successCallback)["catch"](function (err) {
            if (err.code == 8) {
              _this6.debug("Received expected error message.");
              _this6.setServerResponse({
                jsonrpc: "2.0",
                result: "OK",
                id: 2
              });
              sendRequest(); // second request
            } else {
              errorCallback(err);
            }
          });
        });
        sendRequest();
        this.wait(250, function () {
          this.assertCalledTwice(sendRequest);
          this.assertCalledOnce(successCallback);
          this.assertNotCalled(errorCallback);
        }, this);
      }
    }
  });
  qx.test.io.jsonrpc.Client.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Client.js.map?dt=1782705785241