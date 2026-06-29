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
      "qx.io.transport.AbstractTransport": {
        "construct": true,
        "require": true
      },
      "qx.io.transport.ITransport": {
        "require": true
      },
      "qx.core.Assert": {},
      "qx.type.BaseError": {},
      "qx.io.exception.Transport": {},
      "qx.io.exception.Cancel": {},
      "qx.io.exception.Exception": {},
      "qx.io.request.Xhr": {},
      "qx.io.jsonrpc.Client": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /**
   * The implementation of a HTTP Transport using the {@link qx.io.request} API,
   * so any special configuration of the HTTP request must be done on the
   * underlying implementation of {@link qx.io.request.AbstractRequest}.
   *
   * The assumption is that the payload will be JSON in both request and response.
   * If that is not what you want, override the {@link #_createTransportImpl()} method.
   *
   */
  qx.Class.define("qx.io.transport.Xhr", {
    extend: qx.io.transport.AbstractTransport,
    implement: qx.io.transport.ITransport,
    /**
     * Constructor.
     *
     * @param {String} url The URL of the http endpoint
     */
    construct: function construct(url) {
      qx.io.transport.AbstractTransport.constructor.call(this, url);
    },
    members: {
      /**
       * Internal implementation of the transport
       * @var {qx.io.request.Xhr}
       */
      __P_284_0: null,
      /**
       * Returns the object which implements the transport on the
       * underlying level, so that transport-specific configuration
       * can be done on it. Note that since in the HTTP transport,
       * this object cannot be reused, it will return a new object
       * each time which will be used in the immediately next request.
       *
       * @return {qx.io.request.Xhr}
       */
      getTransportImpl: function getTransportImpl() {
        this.__P_284_0 = this._createTransportImpl();
        return this.__P_284_0;
      },
      /**
       * Transport the given message to the endpoint
       *
       * @param {String} message
       *
       * @return {qx.Promise} Promise that resolves (with no data)
       * when the message has been successfully sent out, and rejects
       * when there is an error or a cancellation up to that point.
       */
      send: function send(message) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var req, _t, _t2;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                qx.core.Assert.assertString(message);
                req = _this.__P_284_0 || _this.getTransportImpl();
                req.setRequestData(message);
                _this.__P_284_0 = null; // free the internal reference for the next request
                _context.p = 1;
                _context.n = 2;
                return req.sendWithPromise();
              case 2:
                _context.n = 10;
                break;
              case 3:
                _context.p = 3;
                _t = _context.v;
                if (!(_t instanceof qx.type.BaseError)) {
                  _context.n = 10;
                  break;
                }
                _t2 = _t.getComment();
                _context.n = _t2 === "timeout" ? 4 : _t2 === "parseError" ? 5 : _t2 === "abort" ? 6 : _t2 === "statusError" ? 7 : _t2 === "error" ? 8 : 9;
                break;
              case 4:
                throw new qx.io.exception.Transport(_t.toString(), qx.io.exception.Transport.TIMEOUT, {
                  message: message
                });
              case 5:
                throw new qx.io.exception.Transport(_t.toString(), qx.io.exception.Transport.INVALID_MSG_DATA, {
                  message: message
                });
              case 6:
                throw new qx.io.exception.Cancel(_t.toString(), {
                  message: message
                });
              case 7:
                if (!(req.getStatus() === 400)) {
                  _context.n = 8;
                  break;
                }
                return _context.a(3, 10);
              case 8:
                throw new qx.io.exception.Transport(_t.toString(), qx.io.exception.Transport.FAILED, {
                  message: message,
                  response: req.getResponse()
                });
              case 9:
                throw new qx.io.exception.Exception(_t.toString(), undefined, {
                  message: message,
                  error: _t
                });
              case 10:
                // notify listeners
                _this.fireDataEvent("message", req.getResponse());
                // discard old object
                req.dispose();
              case 11:
                return _context.a(2);
            }
          }, _callee, null, [[1, 3]]);
        }))();
      },
      /**
       * Factory method to create a request object. By default, a POST
       * request will be made, and the expected response type will be
       * "application/json", but differently to the standard behavior,
       * the response will not be parsed into a javascript object.
       *
       * Classes extending this one may override this method to obtain
       * a Request object with different parameters and/or different
       * authentication settings. The object must be a subclass of {@link
       * qx.io.request.AbstractRequest} or implement its public API.
       *
       * @return {qx.io.request.Xhr}
       */
      _createTransportImpl: function _createTransportImpl() {
        var req = new qx.io.request.Xhr(this.getEndpoint(), "POST");
        req.setAccept("application/json");
        req.setCache(false);
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        // disable parsing, we are going to parse the JSON ourselves
        req.setParser(function (response) {
          return response;
        });
        return req;
      }
    },
    defer: function defer() {
      qx.io.jsonrpc.Client.registerTransport(/^http/, qx.io.transport.Xhr);
    }
  });
  qx.io.transport.Xhr.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Xhr.js.map?dt=1782705780157