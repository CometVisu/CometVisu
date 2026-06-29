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
   * The implementation of a HTTP Transport using the Fetch API,
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
   */
  qx.Class.define("qx.io.transport.Fetch", {
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
       * @type {Object}
       */
      __P_282_0: null,
      /**
       * Returns the object which implements the transport on the
       * underlying level, so that transport-specific configuration
       * can be done on it. In the case of the Fetch API, the
       * "implementation" is a configuration object which will be
       * passed to the `fetch` method as second parameter.
       *
       * @return {Object}
       */
      getTransportImpl: function getTransportImpl() {
        if (!this.__P_282_0) {
          this.__P_282_0 = this._createTransportImpl();
        }
        return this.__P_282_0;
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
          var init, response, responseData, _t, _t2;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                qx.core.Assert.assertString(message);
                init = _this.getTransportImpl();
                init.body = message;
                _context.p = 1;
                _context.n = 2;
                return fetch(_this.getEndpoint(), init);
              case 2:
                response = _context.v;
                _context.n = 4;
                break;
              case 3:
                _context.p = 3;
                _t = _context.v;
                throw new qx.io.exception.Transport(_t.message, _t.code);
              case 4:
                if (response.ok) {
                  _context.n = 7;
                  break;
                }
                _t2 = response.status;
                _context.n = _t2 === 400 ? 5 : 6;
                break;
              case 5:
                return _context.a(3, 7);
              case 6:
                throw new qx.io.exception.Transport(response.statusText, response.status);
              case 7:
                _context.n = 8;
                return response.text();
              case 8:
                responseData = _context.v;
                // notify listeners
                _this.fireDataEvent("message", responseData);
              case 9:
                return _context.a(2);
            }
          }, _callee, null, [[1, 3]]);
        }))();
      },
      /**
       * Factory method to create a request object. In this implementation,
       * it returns an object that will be used as the `init` parameter of the
       * fetch method.
       * @return {Object}
       */
      _createTransportImpl: function _createTransportImpl() {
        var init = {};
        init.headers = {
          "Content-Type": "application/json",
          Accept: "application/json"
        };
        init.method = "POST";
        return init;
      }
    },
    defer: function defer() {
      qx.io.graphql.Client.registerTransport(/^http/, qx.io.transport.Fetch);
    }
  });
  qx.io.transport.Fetch.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Fetch.js.map?dt=1782705780076