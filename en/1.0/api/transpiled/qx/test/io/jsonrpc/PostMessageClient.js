function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.test.io.MAssert": {
        "require": true
      },
      "qx.io.jsonrpc.protocol.Request": {},
      "qx.io.transport.PostMessage": {},
      "qx.io.jsonrpc.Client": {},
      "qx.io.exception.Protocol": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the javascript framework for coders
  
     http://qooxdoo.org
  
     Copyright:
       2025 qooxdoo contributors
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (cboulanger)
  
  ************************************************************************ */

  /**
   * Tests for qx.io.jsonrpc.Client with qx.test.io.request.PostMessage transport
   * @ignore(Worker)
   * @ignore(self)
   */
  qx.Class.define("qx.test.io.jsonrpc.PostMessageClient", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MMock, qx.test.io.MAssert],
    members: {
      setUp: function setUp() {
        qx.io.jsonrpc.protocol.Request.resetId();
      },
      tearDown: function tearDown() {
        this.getSandbox().restore();
      },
      /**
       * Given a function, return a `Worker` object which calls the function
       * with the function whenever the Worker receives a message from the main
       * thread.
       * @param {Function} fn
       * @returns {Worker}
       */
      createOnMessageWorker: function createOnMessageWorker(fn) {
        var blob = new Blob(["self.onmessage = ", fn.toString()], {
          type: "text/javascript"
        });
        return new Worker(URL.createObjectURL(blob));
      },
      "test: receive 10 out-of-order jsonrpc responses from server, all successful": function test_receive_10_outOfOrder_jsonrpc_responses_from_server_all_successful() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var server, transport, client, promises, i, request, allSettledPromise;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                qx.io.jsonrpc.protocol.Request.resetId();

                // create server worker which sends a response with random delay
                server = _this.createOnMessageWorker(function (evt) {
                  var request = JSON.parse(evt.data);
                  var id = request.id;
                  var response = JSON.stringify({
                    jsonrpc: "2.0",
                    result: "Result for #".concat(id),
                    id: id
                  });
                  setTimeout(function () {
                    console.log("Sending response for request #".concat(id));
                    self.postMessage(response);
                  }, Math.random() * 1000);
                });
                transport = new qx.io.transport.PostMessage(server);
                client = new qx.io.jsonrpc.Client(transport);
                promises = []; // send 10 requests without waiting for the response
                i = 0;
              case 1:
                if (!(i < 10)) {
                  _context.n = 4;
                  break;
                }
                request = new qx.io.jsonrpc.protocol.Request("someMethod", ["foo"]);
                _context.n = 2;
                return client.send(request);
              case 2:
                promises.push(request.getPromise());
              case 3:
                i++;
                _context.n = 1;
                break;
              case 4:
                // Make sure that alle requests have been responded to, i.e. that their promises have
                // been settled.
                allSettledPromise = Promise.allSettled(promises);
                _this.observePromise(allSettledPromise);
                _this.assertPromisePending(allSettledPromise);
                _this.wait(2000, function () {
                  _this.assertPromiseFulfilled(allSettledPromise, "Some request promises were not fulfilled");
                });
              case 5:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      "test: receive 100 out-of-order jsonrpc responses from server, with jsonrpc errors": function test_receive_100_outOfOrder_jsonrpc_responses_from_server_with_jsonrpc_errors() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var server, transport, client, promises, spies, i, request, spy, allSettledPromise;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                qx.io.jsonrpc.protocol.Request.resetId();

                // create server worker which sends a response with random delay
                // some requests fail
                server = _this2.createOnMessageWorker(function (evt) {
                  var request = JSON.parse(evt.data);
                  var id = request.id;
                  var response = JSON.stringify(Math.random() > 0.5 ? {
                    jsonrpc: "2.0",
                    result: "OK",
                    id: id
                  } : {
                    jsonrpc: "2.0",
                    error: {
                      code: -1,
                      message: "error"
                    },
                    id: id
                  });
                  setTimeout(function () {
                    self.postMessage(response);
                  }, Math.random() * 1000);
                });
                transport = new qx.io.transport.PostMessage(server);
                client = new qx.io.jsonrpc.Client(transport);
                promises = [];
                spies = []; // send 100 requests without waiting for the response
                i = 0;
              case 1:
                if (!(i < 100)) {
                  _context2.n = 4;
                  break;
                }
                request = new qx.io.jsonrpc.protocol.Request("someMethod", ["foo"]);
                _context2.n = 2;
                return client.send(request);
              case 2:
                // create a spy to receive error objects
                spy = _this2.spy();
                spies.push(spy);
                promises.push(request.getPromise().then(spy, spy));
              case 3:
                i++;
                _context2.n = 1;
                break;
              case 4:
                // Make sure that alle requests have been responded to, i.e. that their promises have
                // been settled.
                allSettledPromise = Promise.allSettled(promises);
                _this2.observePromise(allSettledPromise);
                _this2.assertPromisePending(allSettledPromise);
                _this2.wait(2000, function () {
                  _this2.assertPromiseSettled(allSettledPromise, "Some request promises were not settled");
                  for (var _i = 0, _spies = spies; _i < _spies.length; _i++) {
                    var _spy$getCall;
                    var _spy = _spies[_i];
                    var firstCallArg = (_spy$getCall = _spy.getCall(0)) === null || _spy$getCall === void 0 ? void 0 : _spy$getCall.args[0];
                    _this2.assert(firstCallArg instanceof qx.io.exception.Protocol || typeof firstCallArg == "string", "An unexpected error occurred: \"".concat(firstCallArg, "\""));
                  }
                });
              case 5:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      }
    }
  });
  qx.test.io.jsonrpc.PostMessageClient.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PostMessageClient.js.map?dt=1782705785274