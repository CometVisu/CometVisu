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
      "qx.io.transport.AbstractClient": {
        "construct": true,
        "require": true
      },
      "qx.Promise": {},
      "qx.lang.Json": {},
      "qx.io.graphql.protocol.Response": {},
      "qx.io.exception.Transport": {},
      "qx.io.exception.Protocol": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.io.graphql.debug": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
        2020 Christian Boulanger
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (cboulanger)
  
  ************************************************************************ */

  /**
   * This class provides a simple GraphQl client (https://graphql.org/).
   * For transport, it is based on internally on the fetch API
   * (https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)
   * which, if needed, must be directly configured via the `init` parameter of the
   * constructor, until a more generalized qx.io API has been developed.
   * @experimental The API might change. Feedback is appreciated.
   */
  qx.Class.define("qx.io.graphql.Client", {
    extend: qx.io.transport.AbstractClient,
    statics: {
      registerTransport: qx.io.transport.AbstractClient.registerTransport
    },
    events: {
      /**
       * Event fired when a request results in an error. Event data is an instance of
       * {@link qx.io.exception.Transport}, {@link qx.io.exception.Protocol},
       * or {@link qx.io.exception.Cancel}.
       */
      error: "qx.event.type.Data"
    },
    /**
     * @param {qx.io.transport.ITransport|String} transportOrUri
     *    Transport object, which must implement {@link qx.io.transport.ITransport}
     *    or a string URI, which will trigger auto-detection of transport, as long as an
     *    appropriate transport has been registered with the static `registerTransport()` function.
     */
    construct: function construct(transportOrUri) {
      qx.io.transport.AbstractClient.constructor.call(this);
      this.selectTransport(transportOrUri);
    },
    members: {
      /**
       * Send the given GraphQl query. See https://graphql.org/learn/queries/
       *
       * @param {qx.io.graphql.protocol.Request} request The GraphQl request object.
       * @return {qx.Promise} Promise that resolves with the data
       */
      send: function send(request) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var transport;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                transport = _this.getTransport();
                return _context.a(2, new qx.Promise(function (resolve, reject) {
                  transport.addListenerOnce("message", function (evt) {
                    try {
                      if (qx.core.Environment.get("qx.io.graphql.debug")) {
                        _this.debug("<<< Received: " + evt.getData());
                      }
                      var responseData = qx.lang.Json.parse(evt.getData());
                      var graphQlResponse = new qx.io.graphql.protocol.Response(responseData);
                      if (graphQlResponse.getErrors()) {
                        return reject(_this._handleErrors(graphQlResponse));
                      }
                      return resolve(graphQlResponse.getData());
                    } catch (e) {
                      _this.error(e);
                      return reject(new qx.io.exception.Transport(e.message));
                    }
                  });
                  if (qx.core.Environment.get("qx.io.graphql.debug")) {
                    _this.debug(">>>> Sending " + request.toString());
                  }
                  transport.send(request.toString())["catch"](reject);
                }));
            }
          }, _callee);
        }))();
      },
      /**
       * Handle the errors reported by the GraphQL endpoint. The response
       * can contain several errors, but we can only throw one of them.
       * However, we can fire an event for each error, which might be useful
       * if they are to be logged. The errors that are thrown or fired as
       * event data contain the original response object in the `data` property
       *
       * @param {qx.io.graphql.protocol.Response} response The response object
       * @return {qx.io.exception.Protocol}
       */
      _handleErrors: function _handleErrors(response) {
        var _this2 = this;
        var errors = response.getErrors();
        errors.forEach(function (error) {
          var exception = new qx.io.exception.Protocol(error.message, null, response.toObject());
          _this2.fireDataEvent("error", exception);
        });
        return new qx.io.exception.Protocol(errors[0].message, null, response.toObject());
      }
    },
    environment: {
      "qx.io.graphql.debug": false
    }
  });
  qx.io.graphql.Client.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Client.js.map?dt=1782705779409