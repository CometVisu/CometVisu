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
      "qx.io.exception.Transport": {},
      "qx.io.graphql.Client": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /**
   * An implementation of a WebSocket transport
   * @see https://developer.mozilla.org/de/docs/Web/API/WebSocket
   * @ignore(WebSocket)
   */
  qx.Class.define("qx.io.transport.Websocket", {
    extend: qx.io.transport.AbstractTransport,
    implement: [qx.io.transport.ITransport],
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
       * @type {WebSocket}
       */
      __P_283_0: null,
      /**
       * Returns the object which implements the transport on the
       * underlying level, so that transport-specific configuration
       * can be done on it.
       *
       * @return {WebSocket}
       */
      getTransportImpl: function getTransportImpl() {
        if (!this.__P_283_0) {
          this.__P_283_0 = this._createTransportImpl();
        }
        return this.__P_283_0;
      },
      /**
       * Transport the given message to the endpoint
       *
       * @param {String} message
       *
       * @return {qx.Promise} Promise that resolves (with no data)
       * when the message has been successfully sent out, and rejects
       * when there is an error or a cancellation up to that point.
       * @ignore(fetch)
       */
      send: function send(message) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var ws;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                qx.core.Assert.assertString(message);
                ws = _this.getTransportImpl();
                if (!(ws.readyState !== WebSocket.OPEN)) {
                  _context.n = 1;
                  break;
                }
                _context.n = 1;
                return new Promise(function (resolve) {
                  return ws.addEventListener("open", resolve);
                });
              case 1:
                ws.send(message);
              case 2:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      /**
       * Factory method to create a websocket object.
       * @return {WebSocket}
       */
      _createTransportImpl: function _createTransportImpl() {
        var _this2 = this;
        var ws = new WebSocket(this.getEndpoint());
        ws.addEventListener("message", function (msgevt) {
          _this2.fireDataEvent("message", msgevt.data);
        });
        ws.addEventListener("close", function (event) {
          var error_message;
          var error_code;
          switch (event.code) {
            case 1000:
              // everything ok
              break;
            default:
              // todo translate websocket error codes into qx.io.exception.Transport error codes
              // see https://github.com/Luka967/websocket-close-codes
              error_message = "Error " + event.code;
              error_code = qx.io.exception.Transport.FAILED;
          }
          if (error_message) {
            throw new qx.io.exception.Transport(error_message, error_code, event);
          }
        });
        return ws;
      }
    },
    destruct: function destruct() {
      this.__P_283_0.close();
      this.__P_283_0 = null;
    },
    defer: function defer() {
      qx.io.graphql.Client.registerTransport(/^ws/, qx.io.transport.Websocket);
    }
  });
  qx.io.transport.Websocket.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Websocket.js.map?dt=1782705780131