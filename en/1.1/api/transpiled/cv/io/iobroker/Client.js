function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.io.AbstractClient": {
        "construct": true,
        "require": true
      },
      "cv.io.IClient": {
        "require": true
      },
      "cv.core.notifications.Router": {},
      "qx.locale.Manager": {},
      "cv.io.iobroker.SocketLibrary": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Client.js
   *
   * copyright (c) 2010-2023, Christian Mayer and the CometVisu contributers.
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
   */

  /**
   * ioBroker client
   */
  qx.Class.define('cv.io.iobroker.Client', {
    extend: cv.io.AbstractClient,
    implement: cv.io.IClient,
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(type, backendUrl) {
      cv.io.AbstractClient.constructor.call(this);
      this.initialAddresses = [];
      this._type = type;
      this._backendUrl = new URL(backendUrl || document.URL.replace(/.*:\/\/([^\/:]*)(:[0-9]*)?\/.*/, 'ws://$1:8083/'));
      this.__P_773_0 = [];
      this.__P_773_1 = [];
      this.__P_773_2 = {
        username: null,
        password: null
      };
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _type: null,
      __P_773_0: null,
      __P_773_3: null,
      __P_773_1: null,
      __P_773_2: null,
      __P_773_4: false,
      /**
       * Returns the current backend configuration
       * @return {Map}
       */
      getBackend: function getBackend() {
        return {};
      },
      getType: function getType() {
        return this._type;
      },
      /**
       * Returns true, when the backend provides a special data provider for this kind of data
       * @param name {String}
       * @return {Boolean}
       */
      hasProvider: function hasProvider(name) {
        return false;
      },
      /**
       * URL to the provided data
       * @param name
       * @return {String}
       */
      getProviderUrl: function getProviderUrl(name) {
        return null;
      },
      /**
       * Mapping function to convert the data from the backend to a format the CometVisu data provider consumer can process.
       * @param name {String}
       */
      getProviderConvertFunction: function getProviderConvertFunction(name) {
        return null;
      },
      getProviderData: function getProviderData(name, format) {
        return null;
      },
      /**
       * Set a subset of addresses the client should request initially (e.g. the ones one the start page).
       * This can be used to increase the init state loading speed by sending an initial request with a smaller
       * subset of addresses to the backend and send the rest later.
       * @param addresses {Array}
       */
      setInitialAddresses: function setInitialAddresses(addresses) {
        this.__P_773_0 = addresses;
      },
      __P_773_5: function __P_773_5(addresses) {
        return this.__P_773_6('getStates', addresses);
      },
      /**
       * Read the recorded history of a state. This needs one of the ioBroker history
       * adapters (history, sql, influxdb) to be enabled for that state.
       * @param address {String} state id
       * @param start {Date} beginning of the time range
       * @param end {Date} end of the time range
       * @param options {Map?} additional getHistory options, e.g. count, aggregate or step
       * @return {Promise<Array>} the recorded entries, each with a "ts" and a "val"
       */
      getHistory: function getHistory(address, start, end, options) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var response, _ref, _ref2, error, result;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                if (!(!_this.isConnected() || !_this.__P_773_7())) {
                  _context.n = 1;
                  break;
                }
                throw new Error('not connected to ' + _this._backendUrl);
              case 1:
                _context.n = 2;
                return _this.__P_773_6('getHistory', address, Object.assign({
                  start: start.getTime(),
                  end: end.getTime(),
                  count: 10000,
                  ignoreNull: true
                },
                // no aggregate default here, it would override what the caller deliberately left out
                options || {}));
              case 2:
                response = _context.v;
                // the ioBroker socket api answers with the arguments of its (error, result) callback
                _ref = response || [], _ref2 = _slicedToArray(_ref, 2), error = _ref2[0], result = _ref2[1];
                if (!error) {
                  _context.n = 3;
                  break;
                }
                throw new Error('getHistory for ' + address + ' failed: ' + error);
              case 3:
                return _context.a(2, result || []);
            }
          }, _callee);
        }))();
      },
      __P_773_8: function __P_773_8(address, value) {
        this.__P_773_9('setState', address, value);
      },
      __P_773_10: function __P_773_10(addresses) {
        this.__P_773_9('subscribeStates', addresses);
      },
      __P_773_11: function __P_773_11() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                if (!(!_this2.isConnected() || !_this2.__P_773_0.length)) {
                  _context2.n = 1;
                  break;
                }
                return _context2.a(2);
              case 1:
                _context2.n = 2;
                return _this2.__P_773_12(_this2.__P_773_0);
              case 2:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      /**
       * Subscribe to the given addresses and publish their current states. ioBrokers
       * subscribeStates adds to the already subscribed patterns and ignores duplicates,
       * so this can be called incrementally.
       * @param addresses {Array} addresses to subscribe to
       */
      __P_773_12: function __P_773_12(addresses) {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var response, _ref3, _ref4, error, states, newStates, id, _t;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.p = _context3.n) {
              case 0:
                _this3.__P_773_10(addresses);
                _context3.p = 1;
                _context3.n = 2;
                return _this3.__P_773_5(addresses);
              case 2:
                response = _context3.v;
                _context3.n = 4;
                break;
              case 3:
                _context3.p = 3;
                _t = _context3.v;
                _this3.error('getStates request failed:', _t.message || _t);
                return _context3.a(2);
              case 4:
                // the ioBroker socket api answers with the arguments of its (error, states) callback
                _ref3 = response || [], _ref4 = _slicedToArray(_ref3, 2), error = _ref4[0], states = _ref4[1];
                if (!error) {
                  _context3.n = 5;
                  break;
                }
                _this3.error('getStates failed:', error);
                return _context3.a(2);
              case 5:
                newStates = {};
                for (id in states) {
                  if (states[id]) {
                    newStates[id] = states[id].val;
                  }
                }
                _this3.update(newStates);
              case 6:
                return _context3.a(2);
            }
          }, _callee3, null, [[1, 3]]);
        }))();
      },
      /**
       * Whether there is a connection that can carry a message right now. The library queues
       * what is sent while it is reconnecting, but a request would then wait for an answer that
       * only the lost connection could have given.
       * @return {Boolean}
       */
      __P_773_7: function __P_773_7() {
        return !!this.__P_773_3 && this.__P_773_3.connected === true;
      },
      /**
       * Send a message without expecting an answer.
       * @param name {String} name of the ioBroker socket command
       * @param args {Array} arguments of that command
       */
      __P_773_9: function __P_773_9(name) {
        var _this$__P_773_;
        if (!this.__P_773_7()) {
          // the caller state (e.g. subscriptions) is re-established on the next 'connect'
          this.debug('not sending "' + name + '", socket is not open');
          return;
        }
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        (_this$__P_773_ = this.__P_773_3).emit.apply(_this$__P_773_, [name].concat(args));
      },
      /**
       * Send a message and wait for the answer of the backend.
       *
       * The library correlates request and answer, the pending promises are only tracked to be
       * able to settle them when the connection goes away - the answer could only have come over
       * the connection that is gone.
       *
       * @param name {String} name of the ioBroker socket command
       * @param args {Array} arguments of that command
       * @return {Promise<Array>} the arguments the backend passed to its callback
       */
      __P_773_6: function __P_773_6(name) {
        var _this4 = this;
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }
        return new Promise(function (resolve, reject) {
          var _this4$__P_773_;
          if (!_this4.__P_773_7()) {
            reject(new Error('not connected to ' + _this4._backendUrl));
            return;
          }
          var request = {
            resolve: resolve,
            reject: reject
          };
          _this4.__P_773_1.push(request);

          /**
           * Hand the callback arguments of the backend to the caller.
           * @param response {Array} arguments of the ioBroker callback, e.g. (error, result)
           */
          var answer = function answer() {
            var idx = _this4.__P_773_1.indexOf(request);
            if (idx < 0) {
              // already settled by a lost connection
              return;
            }
            _this4.__P_773_1.splice(idx, 1);
            for (var _len3 = arguments.length, response = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              response[_key3] = arguments[_key3];
            }
            resolve(response);
          };
          (_this4$__P_773_ = _this4.__P_773_3).emit.apply(_this4$__P_773_, [name].concat(args, [answer]));
        });
      },
      /**
       * Open the connection to the backend, using the socket client library that the backend
       * itself publishes.
       *
       * @param callback {Function?} called once the connection is ready
       * @param context {Object?} context for the callback
       */
      __P_773_13: function __P_773_13() {
        var _arguments = arguments,
          _this5 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var callback, context, onFailure, io, socket, ready, _t2, _t3;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.p = _context4.n) {
              case 0:
                callback = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : null;
                context = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : null;
                if (_this5.__P_773_3) {
                  // never leave a second socket behind, its close handler would reject the
                  // pending requests of the new one
                  _this5.__P_773_14();
                }
                _this5.__P_773_4 = false;

                /**
                 * @param param
                 */
                onFailure = function onFailure(param) {
                  _this5.setConnected(false);
                  var n = cv.core.notifications.Router.getInstance();
                  n.dispatchMessage('cv.client.connection', {
                    title: 'ioBroker: ' + qx.locale.Manager.tr('Connection error'),
                    message: param.errorMessage + '<br/>\nCode: ' + param.errorCode,
                    severity: 'urgent',
                    unique: true,
                    deletable: false
                  }, 'popup');
                };
                _context4.p = 1;
                _context4.n = 2;
                return cv.io.iobroker.SocketLibrary.load(_this5._backendUrl);
              case 2:
                io = _context4.v;
                _context4.n = 4;
                break;
              case 3:
                _context4.p = 3;
                _t2 = _context4.v;
                onFailure({
                  errorMessage: _t2.message || _t2.toString(),
                  errorCode: 'login -> ' + cv.io.iobroker.SocketLibrary.getOrigin(_this5._backendUrl) + '/socket.io.js'
                });
                return _context4.a(2);
              case 4:
                if (!_this5.__P_773_4) {
                  _context4.n = 5;
                  break;
                }
                return _context4.a(2);
              case 5:
                _context4.p = 5;
                socket = io.connect(_this5.__P_773_15(), {
                  name: 'CometVisu'
                });
                _context4.n = 7;
                break;
              case 6:
                _context4.p = 6;
                _t3 = _context4.v;
                onFailure({
                  errorMessage: _t3.toString(),
                  errorCode: 'login -> ' + _this5._backendUrl
                });
                return _context4.a(2);
              case 7:
                _this5.__P_773_3 = socket;

                /**
                 * Everything the backend knows about was subscribed on the connection that was lost, so
                 * it all has to be subscribed again. On the very first connect there is nothing yet.
                 */
                ready = function ready() {
                  if (_this5.__P_773_3 !== socket) {
                    return;
                  }
                  _this5.setConnected(true);
                  _this5.__P_773_11();
                  if (callback) {
                    callback.call(context);
                    callback = null;
                  }
                };
                socket.on('connect', ready);
                socket.on('reconnect', ready);
                socket.on('disconnect', function () {
                  if (_this5.__P_773_3 !== socket) {
                    // a previous socket that has already been replaced, it must not touch
                    // the connection that took its place
                    return;
                  }
                  // the library reconnects on its own, only the local state has to follow
                  _this5.setConnected(false);
                  _this5.__P_773_16('connection to ' + _this5._backendUrl + ' closed');
                });
                socket.on('error', function (error) {
                  _this5.debug('SOCK ERROR', error);
                });
                socket.on('reauthenticate', function () {
                  // The server rejected us. Do not reconnect: ioBroker locks an account out for up to an
                  // hour after a few failed attempts. When the visualisation is served by that very
                  // server, its login page can take over; otherwise report and stop.
                  _this5.__P_773_4 = true;
                  _this5.__P_773_14();
                  var origin = cv.io.iobroker.SocketLibrary.getOrigin(_this5._backendUrl);
                  if (origin === window.location.origin) {
                    window.location.href = origin + '/login/index.html?href=' + encodeURI(window.location.href.replace(window.location.origin, ''));
                    return;
                  }
                  onFailure({
                    errorMessage: 'Authentication failed!',
                    errorCode: 'login -> ' + _this5._backendUrl
                  });
                });
                socket.on('stateChange', function (id, state) {
                  if (state && state.ts === state.lc) {
                    _this5.update(_defineProperty({}, id, state.val));
                  }
                });
              case 8:
                return _context4.a(2);
            }
          }, _callee4, null, [[5, 6], [1, 3]]);
        }))();
      },
      /**
       * The url to hand to the socket client library.
       *
       * It is http(s), not ws(s): socket.io-client expects it that way, and the @iobroker/ws client
       * turns it into ws(s) itself. Only the credentials are added to the query, the connection needs
       * nothing else from the backend url.
       *
       * @return {String}
       */
      __P_773_15: function __P_773_15() {
        var url = cv.io.iobroker.SocketLibrary.getOrigin(this._backendUrl) + this._backendUrl.pathname;
        var credentials = this.__P_773_2 || {};
        var query = [];

        // url-encoded, so credentials containing any character (& = # % + or whitespace) survive the
        // query transport - the ioBroker authentication gate reads them with decodeURIComponent()
        if (credentials.username) {
          query.push("user=".concat(encodeURIComponent(credentials.username)));
        }
        if (credentials.password) {
          query.push("pass=".concat(encodeURIComponent(credentials.password)));
        }
        return query.length ? "".concat(url, "?").concat(query.join('&')) : url;
      },
      /**
       * Reject all requests that are still waiting for a response. Without this they would
       * never settle, as the answer can only arrive over the connection that is gone.
       * @param reason {String} why the requests cannot be answered anymore
       */
      __P_773_16: function __P_773_16(reason) {
        var pending = this.__P_773_1;
        this.__P_773_1 = [];
        var _iterator = _createForOfIteratorHelper(pending),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var request = _step.value;
            request.reject(new Error(reason));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      },
      /**
       * Drop the connection and everything that was waiting on it.
       * @param closeConnection {Boolean?} whether the socket itself still has to be closed
       */
      __P_773_17: function __P_773_17() {
        var closeConnection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        if (this.__P_773_3) {
          if (closeConnection) {
            // destroy() also stops the reconnect the library would otherwise start
            this.__P_773_3.destroy();
          }
          this.setConnected(false);
          this.__P_773_3 = null;
        }
        this.__P_773_16('connection to ' + this._backendUrl + ' closed');
      },
      /**
       * Subscribe to the addresses in the parameter. The second parameter
       * (filter) is optional
       *
       * @param addresses {Array?} addresses to subscribe to
       * @param filters {Array?} Filters
       *
       */
      subscribe: function subscribe(addresses, filters) {
        var _this6 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                _this6.__P_773_0 = addresses;
                _this6.__P_773_11();
              case 1:
                return _context5.a(2);
            }
          }, _callee5);
        }))();
      },
      /**
       * Add a single subscription
       * @param address {String}
       */
      addSubscription: function addSubscription(address) {
        if (!this.__P_773_0) {
          this.__P_773_0 = [address];
        } else if (this.__P_773_0.includes(address)) {
          return;
        } else {
          this.__P_773_0.push(address);
        }
        if (this.isConnected()) {
          // the connection is already established, subscribe this address right away,
          // otherwise it would not receive any updates until the next subscribe() call
          this.__P_773_12([address]);
        }
      },
      /**
       * This function starts the communication by a login and then runs the
       * ongoing communication task
       *
       * @param loginOnly {Boolean} if true only login and backend configuration, no subscription
       *                            to addresses (default: false)
       * @param credentials {Map} map with "username" and "password" (optional)
       * @param callback {Function} call this function when login is done
       * @param context {Object} context for the callback (this)
       *
       */
      login: function login(loginOnly, credentials, callback, context) {
        var _this7 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.n) {
              case 0:
                _this7.__P_773_2 = credentials;
                _context6.n = 1;
                return _this7.__P_773_13(callback, context);
              case 1:
                return _context6.a(2);
            }
          }, _callee6);
        }))();
      },
      /**
       * Client is able to authorize a request, by knowing the credentials.
       * The credentials are part of the backends connection URL, they cannot be
       * applied to an arbitrary request, so this client cannot authorize one.
       * @return {Boolean}
       */
      canAuthorize: function canAuthorize() {
        return false;
      },
      /**
       * Authorize a Request by adding the necessary headers.
       * @param req {qx.io.request.Xhr}
       */
      authorize: function authorize(req) {},
      /**
       * return the relative path to a resource on the currently used backend
       *
       * @param name {String} Name of the resource (e.g. login, read, write, rrd)
       * @param params {Map?} optional data needed to generate the resource path
       * @return {String|null} relative path to the resource, returns `null` when the backend does not provide that resource
       */
      getResourcePath: function getResourcePath(name, params) {
        // this backend provides none of them, the callers check for null explicitly
        return null;
      },
      /**
       * This client provides an own processor for charts data
       * @return {Boolean}
       */
      hasCustomChartsDataProcessor: function hasCustomChartsDataProcessor() {
        return false;
      },
      /**
       * For custom backend charts data some processing might be done to convert it in a format the CometVisu can handle
       * @param data {var}
       */
      processChartsData: function processChartsData(data) {
        return data;
      },
      /**
       * This function sends a value
       * @param address {String} address to send the value to
       * @param value {String} value to send
       * @param options {Object} optional options, depending on backend
       *
       */
      write: function write(address, value, options) {
        if (!this.isConnected()) {
          return;
        }
        this.__P_773_8(address, {
          val: value,
          ack: false
        });
      },
      /**
       * Get the last recorded error
       *
       * @return {{code: (*|Integer), text: (*|String), response: (*|String|null), url: (*|String), time: number}|*}
       */
      getLastError: function getLastError() {},
      /**
       * Re-establish the connection. Every reconnect is a full one, the server side
       * subscriptions belong to the connection that was lost and are renewed as soon as
       * the new one is ready.
       * @param full {Boolean?} unused, kept for the cv.io.IClient signature
       */
      restart: function restart(full) {
        this.__P_773_14();
        this.__P_773_13();
      },
      /**
       * Close the connection without the handlers of the old socket touching the new one.
       */
      __P_773_14: function __P_773_14() {
        var socket = this.__P_773_3;
        this.__P_773_3 = null;
        if (socket) {
          socket.destroy();
        }
        this.setConnected(false);
        this.__P_773_16('connection to ' + this._backendUrl + ' closed');
      },
      /**
       * Handle the incoming state updates. This method is not implemented by the client itself.
       * It is injected by the project using the client.
       * @param json
       */
      update: function update(json) {},
      /**
       * Can be overridden to record client communication with backend
       * @param type {String} type of event to record
       * @param data {Object} data to record
       */
      record: function record(type, data) {},
      /**
       * Can be overridden to provide an error handler for client errors
       * @param type {Number} one of cv.io.Client.ERROR_CODES
       * @param message {String} detailed error message
       * @param args
       */
      showError: function showError(type, message, args) {},
      terminate: function terminate() {
        this.__P_773_4 = true;
        this.__P_773_17();
      },
      /**
       * Destructor
       */
      destruct: function destruct() {
        this.__P_773_17();
      }
    }
  });
  cv.io.iobroker.Client.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Client.js.map?dt=1795864221637