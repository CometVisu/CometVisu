function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var _this = this;
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.tile.components.AbstractComponent": {
        "require": true
      },
      "cv.ui.structure.tile.MVisibility": {
        "require": true
      },
      "cv.ui.structure.tile.MRefresh": {
        "require": true
      },
      "cv.ui.structure.tile.MResize": {
        "require": true
      },
      "cv.ui.structure.tile.MFullscreen": {
        "require": true
      },
      "cv.util.ScriptLoader": {},
      "qx.util.ResourceManager": {},
      "qx.log.Logger": {},
      "qx.event.Timer": {},
      "qx.locale.Manager": {},
      "qx.locale.Number": {},
      "qx.locale.Date": {},
      "cv.util.String": {},
      "cv.io.BackendConnections": {},
      "cv.io.timeseries.FluxSource": {},
      "cv.ConfigCache": {},
      "cv.io.timeseries.OpenhabPersistenceSource": {},
      "cv.io.timeseries.RRDSource": {},
      "cv.io.timeseries.DemoSource": {},
      "cv.io.Fetch": {},
      "cv.core.notifications.Router": {},
      "qx.util.format.DateFormat": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Chart.js
   *
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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

  /* eslint-disable arrow-body-style */
  /**
   * Shows an chart.
   * @asset(libs/d3.min.js)
   * @asset(libs/d3.min.js.map)
   * @ignore(d3)
   */
  qx.Class.define('cv.ui.structure.tile.components.Chart', {
    extend: cv.ui.structure.tile.components.AbstractComponent,
    include: [cv.ui.structure.tile.MVisibility, cv.ui.structure.tile.MRefresh, cv.ui.structure.tile.MResize, cv.ui.structure.tile.MFullscreen],
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      ChartCounter: 0,
      DEFAULT_ASPECT_RATIO: 2.0416666666666665,
      JS_LOADED: new Promise( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
          var check, timer, counter;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                check = function check() {
                  return _typeof(window.d3) === 'object';
                };
                _context.prev = 1;
                _context.next = 4;
                return cv.util.ScriptLoader.includeScript(qx.util.ResourceManager.getInstance().toUri('libs/d3.min.js'));
              case 4:
                _context.next = 11;
                break;
              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](1);
                qx.log.Logger.error(_this, 'Error loading D3:', _context.t0);
                reject(new Error('Error loading d3 library'));
                return _context.abrupt("return");
              case 11:
                if (!check()) {
                  timer = new qx.event.Timer(50);
                  counter = 0;
                  timer.addListener('interval', function () {
                    counter++;
                    if (check()) {
                      resolve(true);
                    } else if (counter > 5) {
                      reject(new Error('Error loading d3 library'));
                    }
                  });
                } else {
                  resolve(true);
                }
              case 12:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[1, 6]]);
        }));
        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }()).then(function () {
        if (qx.locale.Manager.getInstance().getLanguage() === 'de') {
          // localize
          d3.formatDefaultLocale({
            decimal: qx.locale.Number.getDecimalSeparator().translate().toString(),
            thousands: qx.locale.Number.getGroupSeparator().translate().toString(),
            grouping: [3],
            currency: ['€', '']
          });
          d3.timeFormatDefaultLocale({
            dateTime: '%A, der %e. %B %Y, %X',
            date: '%d.%m.%Y',
            time: '%H:%M:%S',
            periods: [qx.locale.Date.getAmMarker().translate().toString(), qx.locale.Date.getPmMarker().translate().toString()],
            days: qx.locale.Date.getDayNames('wide', null, 'format').map(function (t) {
              return t.translate().toString();
            }),
            shortDays: qx.locale.Date.getDayNames('narrow', null, 'stand-alone').map(function (t) {
              return t.translate().toString();
            }),
            months: qx.locale.Date.getMonthNames('wide').map(function (t) {
              return t.translate().toString();
            }),
            shortMonths: qx.locale.Date.getMonthNames('narrow', null, 'stand-alone').map(function (t) {
              return t.translate().toString();
            })
          });
        }
      }),
      CONFIG: null
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      currentSeries: {
        check: ['hour', 'day', 'week', 'month', 'year'],
        init: 'day',
        apply: '_applyCurrentSeries'
      },
      currentPeriod: {
        check: 'Number',
        init: 0,
        apply: "__P_77_0"
      },
      startTime: {
        check: 'Number',
        init: 0
      },
      endTime: {
        check: 'Number',
        init: 0
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _id: null,
      _downloadedImage: null,
      _url: null,
      _headers: null,
      _request: null,
      _width: null,
      _height: null,
      _loaded: null,
      _dataSetConfigs: null,
      _initializing: null,
      _navigationEnabled: null,
      __P_77_1: null,
      __P_77_2: false,
      __P_77_3: null,
      __P_77_4: null,
      __P_77_5: null,
      __P_77_6: null,
      /**
      * @type {d3.Selection}
      */
      _dot: null,
      /**
       * @type {d3.Selection}
       */
      _svg: null,
      /**
       * @type {HTMLElement}
       */
      _tooltip: null,
      /**
       * @type {String}
       */
      _titleString: null,
      __P_77_7: null,
      __P_77_8: null,
      // all chart properties
      _chartConf: null,
      _init: function _init() {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var element, inBackground, title, span, seriesSelection, s, currentSeries, button, _span, i, popup, option, _iterator, _step, _s, svg, noToolTips, format, timeFormat, formatString, datasetSources, readAddresses;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _this2._checkEnvironment();
                _this2._initializing = true;
                element = _this2._element;
                _context2.next = 5;
                return cv.ui.structure.tile.components.Chart.JS_LOADED;
              case 5:
                _this2._id = cv.ui.structure.tile.components.Chart.ChartCounter++;
                element.setAttribute('data-chart-id', _this2._id.toString());
                inBackground = _this2._element.hasAttribute('background') && _this2._element.getAttribute('background') === 'true';
                title = _this2.getHeader('label.title');
                if (!inBackground && element.hasAttribute('title') && !title) {
                  title = document.createElement('label');
                  title.classList.add('title');
                  span = document.createElement('span');
                  title.appendChild(span);
                  span.textContent = element.getAttribute('title');
                  _this2.appendToHeader(title);
                }
                if (title) {
                  // save base title for updating
                  _this2._titleString = title.textContent.trim();
                }
                seriesSelection = [];
                if (!inBackground && element.hasAttribute('selection')) {
                  s = element.getAttribute('selection');
                  if (s === 'none') {
                    seriesSelection = [];
                  } else if (s === 'all') {
                    seriesSelection = ['hour', 'day', 'week', 'month', 'year'];
                  } else {
                    seriesSelection = s.split(',').map(function (n) {
                      return n.trim().toLowerCase();
                    });
                  }
                }
                if (element.hasAttribute('series')) {
                  _this2.setCurrentSeries(element.getAttribute('series'));
                }
                currentSeries = _this2.getCurrentSeries();
                if (seriesSelection.length > 0 && !seriesSelection.includes(currentSeries)) {
                  seriesSelection.push(currentSeries);
                }
                _this2._navigationEnabled = seriesSelection.length > 0;
                if (seriesSelection.length > 0) {
                  // back button
                  button = _this2._buttonFactory('ri-arrow-left-s-line', ['prev']);
                  button.setAttribute('title', qx.locale.Manager.tr('previous'));
                  button.addEventListener('click', function () {
                    return _this2._onSeriesPrev();
                  });
                  if (!title) {
                    title = document.createElement('label');
                    title.classList.add('title');
                    _span = document.createElement('span');
                    title.appendChild(_span);
                    _this2.appendToHeader(title);
                  }
                  title.parentElement.insertBefore(button, title);
                  i = document.createElement('i');
                  i.classList.add('ri-arrow-down-s-fill');
                  title.appendChild(i);

                  // current selection
                  popup = document.createElement('div');
                  popup.classList.add('popup', 'series');
                  _iterator = _createForOfIteratorHelper(seriesSelection);
                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      _s = _step.value;
                      option = document.createElement('cv-option');
                      option.setAttribute('key', _s);
                      if (_s === currentSeries) {
                        option.setAttribute('selected', 'selected');
                      }
                      option.textContent = _this2._seriesToShort(_s);
                      option.addEventListener('click', function (ev) {
                        popup.style.display = 'none';
                        _this2._onSeriesChange(ev.target.getAttribute('key'));
                        ev.stopPropagation();
                        ev.preventDefault();
                      });
                      popup.appendChild(option);
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }
                  title.appendChild(popup);

                  // make title clickable
                  title.classList.add('clickable');
                  title.addEventListener('click', function (ev) {
                    var style = getComputedStyle(popup);
                    if (style.getPropertyValue('display') === 'none') {
                      popup.style.display = 'flex';
                    } else {
                      popup.style.display = 'none';
                    }
                    ev.stopPropagation();
                    ev.preventDefault();
                  });

                  // forward button
                  button = _this2._buttonFactory('ri-arrow-right-s-line', ['next']);
                  button.setAttribute('title', qx.locale.Manager.tr('next'));
                  // initially we cannot go into the future
                  button.disabled = true;
                  button.addEventListener('click', function () {
                    return _this2._onSeriesNext();
                  });
                  _this2.appendToHeader(button);
                }
                if (!inBackground && element.hasAttribute('allow-fullscreen') && element.getAttribute('allow-fullscreen') === 'true') {
                  _this2._initFullscreenSwitch();

                  // only on mobile we need this, because of height: auto
                  if (document.body.classList.contains('mobile')) {
                    _this2.addListener('changeFullscreen', function () {
                      return _this2._onRendered();
                    });
                  }
                }
                if (element.hasAttribute('refresh')) {
                  _this2.setRefresh(parseInt(element.getAttribute('refresh')));
                }

                // create needed elements
                svg = d3.select(_this2._element).append('svg');
                noToolTips = false;
                if (inBackground) {
                  noToolTips = true;
                  svg.style('opacity', 0.4);
                }
                if (!noToolTips) {
                  _this2._tooltip = document.createElement('div');
                  _this2._tooltip.classList.add('tooltip');
                  _this2._tooltip.style.display = 'none';
                  _this2._element.appendChild(_this2._tooltip);
                  svg.on('pointerenter', function (ev) {
                    return _this2._onPointerEntered(ev);
                  });
                  svg.on('pointermove', function (ev) {
                    return _this2._onPointerMoved(ev);
                  });
                  svg.on('pointerleave', function (ev) {
                    return _this2._onPointerLeft(ev);
                  });
                }
                svg.on('touchmove', function (event) {
                  if (_this2._loaded) {
                    var y = event.targetTouches[0].clientY;
                    var pathRect = _this2._element.querySelector(':scope > svg').getBoundingClientRect();
                    if (y > pathRect.y && y < pathRect.y + pathRect.height) {
                      event.preventDefault();
                    }
                  }
                }, {
                  passive: false
                });

                // init some fixed settings
                format = _this2._element.hasAttribute('y-format') ? _this2._element.getAttribute('y-format') : '%s';
                timeFormat = null;
                if (_this2._element.hasAttribute('x-format')) {
                  formatString = _this2._element.getAttribute('x-format');
                  timeFormat = function timeFormat(date) {
                    return d3.timeFormat(formatString)(date);
                  };
                } else {
                  // format auto-detection
                  timeFormat = _this2.multiTimeFormat([['%H:%M:%S', function (d) {
                    return d.getSeconds();
                  }], ['%H:%M', function (d) {
                    return d.getMinutes();
                  }], ['%H', function (d) {
                    return d.getHours();
                  }], ['%a %d', function (d) {
                    return d.getDay() && d.getDate() !== 1;
                  }], ['%b %d', function (d) {
                    return d.getDate() !== 1;
                  }], ['%B', function (d) {
                    return d.getMonth();
                  }], ['%Y', function () {
                    return true;
                  }]]);
                }
                _this2.__P_77_8 = {
                  x: function x(d) {
                    return d.time;
                  },
                  // given d in data, returns the (temporal) x-value
                  y: function y(d) {
                    return +d.value;
                  },
                  // given d in data, returns the (quantitative) y-value
                  z: function z(d) {
                    return d.key;
                  },
                  // given d in data, returns the (categorical) z-value
                  color: function color(d) {
                    return d && _this2._dataSetConfigs[d].color;
                  },
                  // stroke color of line, as a constant or a function of *z*
                  title: function title(d) {
                    return cv.util.String.sprintf(format, d.value);
                  },
                  // given d in data, returns the title text
                  curve: d3.curveLinear,
                  // method of interpolation between points
                  marginTop: 12,
                  // top margin, in pixels
                  marginRight: 24,
                  // right margin, in pixels
                  marginBottom: 20,
                  // bottom margin, in pixels
                  marginLeft: 24,
                  // left margin, in pixels
                  width: 392,
                  // outer width, in pixels
                  height: 192,
                  // outer height, in pixels
                  aspectRatio: 2.0416666666666665,
                  xType: d3.scaleTime,
                  // type of x-scale
                  xFormat: timeFormat,
                  // a format specifier string for the x-axis
                  yType: d3.scaleLinear,
                  // type of y-scale
                  yFormat: undefined,
                  // a format specifier string for the y-axis
                  yLabel: undefined,
                  // a label for the y-axis
                  strokeLinecap: undefined,
                  // stroke line cap of line
                  strokeLinejoin: undefined,
                  // stroke line join of line
                  strokeWidth: 1.5,
                  // stroke width of line
                  strokeOpacity: undefined,
                  // stroke opacity of line
                  mixBlendMode: 'normal',
                  // blend mode of lines
                  showArea: function showArea(d) {
                    return _this2._dataSetConfigs[d].showArea;
                  },
                  // show area below the line,
                  showXAxis: !_this2._element.hasAttribute('show-x-axis') || _this2._element.getAttribute('show-x-axis') === 'true',
                  showYAxis: !_this2._element.hasAttribute('show-y-axis') || _this2._element.getAttribute('show-y-axis') === 'true',
                  xPadding: 0.1 // amount of x-range to reserve to separate bars
                };
                _this2._initializing = false;
                _this2.__P_77_9();

                // check if we have a read address for live updates
                datasetSources = Array.from(_this2._element.querySelectorAll(':scope > dataset')).map(function (elem) {
                  return elem.getAttribute('src');
                });
                readAddresses = Array.from(element.querySelectorAll(':scope > cv-address:not([mode="write"])')).filter(function (elem) {
                  return datasetSources.includes(elem.getAttribute('target'));
                });
                if (readAddresses.length > 0) {
                  element.addEventListener('stateUpdate', function (ev) {
                    _this2.onStateUpdate(ev);
                    // cancel event here
                    ev.stopPropagation();
                  });
                }
              case 34:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      onStateUpdate: function onStateUpdate(ev) {
        var targetDataset = this._element.querySelector(':scope > dataset[src="' + ev.detail.target + '"]');
        var config = this._dataSetConfigs ? this._dataSetConfigs[ev.detail.target] : null;
        if (targetDataset && config) {
          var ts = Date.now();
          if (config.aggregationInterval) {
            var mins = config.aggregationInterval * 60 * 1000;
            ts = Math.round(ts / mins) * mins;
          }
          this._renderChart({
            src: ev.detail.target,
            time: ts,
            value: ev.detail.state
          }, true);
        }
      },
      _onSeriesPrev: function _onSeriesPrev() {
        this.setCurrentPeriod(this.getCurrentPeriod() + 1);
      },
      _onSeriesChange: function _onSeriesChange(select) {
        if (this.getCurrentSeries() !== select) {
          this._initializing = true;
          // reset offset when series changed
          this.resetCurrentPeriod();
          this._initializing = false;
          // reset configuration, we need a new one
          this._chartConf = null;
          this.setCurrentSeries(select);
        }
      },
      _onSeriesNext: function _onSeriesNext() {
        var currentPeriod = this.getCurrentPeriod();
        if (currentPeriod > 0) {
          this.setCurrentPeriod(currentPeriod - 1);
        }
      },
      refresh: function refresh() {
        this._loaded = false;
        this.__P_77_0();
        this._loadData();
      },
      // triggered after a change os series or period
      _refreshData: function _refreshData() {
        var nextButton = this.getHeader('.next');
        if (nextButton) {
          if (this.getCurrentPeriod() === 0) {
            nextButton.setAttribute('disabled', 'disabled');
          } else {
            nextButton.removeAttribute('disabled');
          }
        }
        if (!this._initializing && this.getStartTime() > 0 && this.getEndTime() > 0) {
          this._loaded = false;
          this._loadData();
        }
        this.__P_77_9();
      },
      _applyCurrentSeries: function _applyCurrentSeries(series) {
        var currentSelection = this.getHeader('.popup.series > cv-option[selected="selected"]');
        var alreadySelected = false;
        if (currentSelection) {
          if (currentSelection.getAttribute('key') !== series) {
            currentSelection.removeAttribute('selected');
          } else {
            alreadySelected = true;
          }
        }
        if (!alreadySelected) {
          var newSelection = this.getHeader(".popup.series > cv-option[key=\"".concat(series, "\"]"));
          if (newSelection) {
            newSelection.setAttribute('selected', 'selected');
          }
        }
        this.__P_77_0();
      },
      __P_77_0: function __P_77_0() {
        var series = this.getCurrentSeries();
        var currentPeriod = this.getCurrentPeriod();
        var end = new Date();
        var periodStart = new Date();
        var interval = 0;
        switch (series) {
          case 'hour':
            interval = 3600;
            periodStart.setHours(periodStart.getHours() - currentPeriod, 0, 0, 0);
            end.setHours(periodStart.getHours() + 1, 0, 0, 0);
            break;
          case 'day':
            interval = 86400;
            periodStart.setDate(periodStart.getDate() - currentPeriod);
            periodStart.setHours(0, 0, 0, 0);
            end.setTime(periodStart.getTime());
            end.setDate(periodStart.getDate() + 1);
            end.setHours(0, 0, 0, 0);
            break;
          case 'week':
            interval = 604800;
            periodStart.setDate(periodStart.getDate() - (periodStart.getDay() || 7) + 1 - 7 * currentPeriod);
            periodStart.setHours(0, 0, 0, 0);
            end.setTime(periodStart.getTime());
            end.setDate(periodStart.getDate() + 7);
            end.setHours(0, 0, 0, 0);
            break;
          case 'month':
            interval = 2592000;
            periodStart.setMonth(periodStart.getMonth() - currentPeriod);
            periodStart.setDate(1);
            periodStart.setHours(0, 0, 0, 0);
            end.setTime(periodStart.getTime());
            end.setMonth(periodStart.getMonth() + 1, 1);
            end.setHours(0, 0, 0, 0);
            break;
          case 'year':
            interval = 31536000;
            periodStart.setFullYear(periodStart.getFullYear() - currentPeriod);
            periodStart.setMonth(0, 1);
            periodStart.setHours(0, 0, 0, 0);
            end.setFullYear(periodStart.getFullYear() + 1);
            end.setMonth(periodStart.getMonth() + 1, 1);
            end.setHours(0, 0, 0, 0);
            break;
        }
        var startTs = Math.round(periodStart.getTime() / 1000);
        var endTs = Math.round(end.getTime() / 1000);
        if (this._element.getAttribute('background') === 'true' || !this._element.hasAttribute('selection')) {
          // when have no navigation, we can just use the old relative time range now - interval
          startTs = endTs - interval;
        }
        this.setStartTime(startTs);
        this.setEndTime(endTs);
        this._refreshData();
      },
      _loadData: function _loadData() {
        var _this3 = this;
        if (this._loaded && Date.now() - this._loaded < 300000) {
          // don't reload within 5 minutes
          return;
        }
        var client = cv.io.BackendConnections.getClient();
        if (!client) {
          return;
        }
        if (!client.isConnected()) {
          client.addListenerOnce('changeConnected', function () {
            _this3._loadData();
          });
          return;
        }
        var url;
        var dataSets = this._element.querySelectorAll(':scope > dataset');
        var promises = [];
        if (!this._dataSetConfigs) {
          this._dataSetConfigs = {};
          var _iterator2 = _createForOfIteratorHelper(dataSets),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var dataSet = _step2.value;
              var ts = {
                showArea: true,
                color: '#FF9900',
                chartType: 'line',
                title: '',
                curve: 'linear',
                aggregationInterval: 0
              };
              var attr = void 0;
              var name = void 0;
              var value = void 0;
              for (var i = 0; i < dataSet.attributes.length; i++) {
                attr = dataSet.attributes.item(i);
                // CamelCase attribute names
                name = attr.name.split('-').map(function (part, i) {
                  if (i > 0) {
                    return "".concat(part.substring(0, 1).toUpperCase()).concat(part.substring(1));
                  }
                  return part;
                }).join('');
                value = attr.value;
                if (value === 'true' || value === 'false') {
                  value = value === 'true';
                } else if (/^\d+$/.test(value)) {
                  value = parseInt(value);
                } else if (/^[\d.]+$/.test(value)) {
                  value = parseFloat(value);
                }
                ts[name] = value;
              }
              var type = ts.src.split('://')[0].toLowerCase();
              ts.type = type;
              var key = ts.src;
              switch (type) {
                case 'flux':
                  ts.source = new cv.io.timeseries.FluxSource(ts.src);
                  if (ts.source.isInline()) {
                    var fluxQuery = dataSet.textContent.trim();
                    key = cv.ConfigCache.hashCode(fluxQuery).toString();
                    ts.source.setQueryTemplate(fluxQuery);
                  }
                  break;
                case 'openhab':
                  ts.source = new cv.io.timeseries.OpenhabPersistenceSource(ts.src);
                  break;
                case 'rrd':
                  ts.source = new cv.io.timeseries.RRDSource(ts.src);
                  break;
                case 'demo':
                  ts.source = new cv.io.timeseries.DemoSource(ts.src);
                  break;
                default:
                  this.error('unknown chart data source type ' + type);
                  break;
              }
              ts.key = key;
              this._dataSetConfigs[key] = ts;
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
        var _loop = function _loop() {
          var ts = _this3._dataSetConfigs[src];
          var proxy = false;
          var options = {
            ttl: _this3.getRefresh()
          };
          if (ts.source) {
            var config = ts.source.getRequestConfig(_this3.getStartTime(), _this3.getEndTime(), _this3.getCurrentSeries(), _this3.getCurrentPeriod());
            url = config.url;
            proxy = config.proxy;
            options = Object.assign(options, config.options);
          }
          if (!url) {
            return 1; // continue
          }
          _this3.debug('loading', url);
          promises.push(cv.io.Fetch.cachedFetch(url, options, proxy, client).then(function (data) {
            _this3.debug('successfully loaded', url);
            if (ts.source) {
              data = ts.source.processResponse(data);
            }
            if (!_this3._lastRefresh) {
              _this3._lastRefresh = Date.now();
            }
            return {
              data: data || [],
              ts: ts
            };
          })["catch"](function (err) {
            _this3._onStatusError(ts, url, err);
            return {
              data: [],
              ts: ts
            };
          }));
        };
        for (var src in this._dataSetConfigs) {
          if (_loop()) continue;
        }
        Promise.all(promises).then(function (responses) {
          _this3._onSuccess(responses);
        });
      },
      _onSuccess: function _onSuccess(data) {
        var _this4 = this;
        var chartData = [];
        var _iterator3 = _createForOfIteratorHelper(data),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var entry = _step3.value;
            var tsdata = entry.data;
            if (tsdata !== null) {
              // TODO: stacked bar times (entry.ts.chartType === 'stacked-bar') must be aggregated, they have to be at the same time index for stacking
              var mins = entry.ts.aggregationInterval > 0 ? entry.ts.aggregationInterval * 60 * 1000 : 0;
              var _iterator4 = _createForOfIteratorHelper(tsdata),
                _step4;
              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  var _step4$value = _slicedToArray(_step4.value, 2),
                    time = _step4$value[0],
                    value = _step4$value[1];
                  chartData.push({
                    key: entry.ts.key,
                    src: entry.ts.src,
                    time: mins > 0 ? Math.round(time / mins) * mins : time,
                    value: value
                  });
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        if (this._element.hasAttribute('background') && this._element.getAttribute('background') === 'true') {
          // no margins
          this.__P_77_8 = Object.assign(this.__P_77_8, {
            marginRight: 0,
            marginBottom: 0,
            marginLeft: 0
          });

          // because we have no margins we need to cut the overflow on the tile
          var tile = this._element.parentElement;
          while (tile && tile.localName !== 'cv-tile') {
            tile = tile.parentElement;
          }
          if (tile && tile.localName === 'cv-tile') {
            tile.style.overflow = 'hidden';
          }
        }

        // wait some time to let the element size settle
        window.requestAnimationFrame(function () {
          setTimeout(function () {
            _this4._onRendered(chartData);
          }, 100);
        });
      },
      _onRendered: function _onRendered(chartData, retries) {
        var _this5 = this;
        if (this.__P_77_4) {
          clearTimeout(this.__P_77_4);
          this.__P_77_4 = null;
        }
        if (this.isVisible()) {
          var _this$_getSize = this._getSize(),
            _this$_getSize2 = _slicedToArray(_this$_getSize, 2),
            width = _this$_getSize2[0],
            height = _this$_getSize2[1];
          if ((width < 20 || height < 10) && (!retries || retries <= 5)) {
            // this makes no sense
            this.__P_77_4 = setTimeout(function () {
              _this5._onRendered(chartData, retries > 0 ? retries + 1 : 1);
            }, 150);
          }
          if (width < 20 || height < 10) {
            // do nothing, these values are invalid
            return;
          }
          this.__P_77_8.width = width;
          this.__P_77_8.height = height;
          d3.select(this._element).select('svg').attr('viewBox', "0, 0, ".concat(width, ", ").concat(height));
          if (chartData) {
            this._renderChart(chartData);
            this._loaded = Date.now();
          }
        }
      },
      _getSize: function _getSize() {
        var parent = this._element.parentElement;
        var padding = this._element.getAttribute('background') === 'true' ? 0 : 8;
        var containerWidth = this._element.offsetWidth - padding;
        var containerHeight = this._element.offsetHeight - padding;
        var factor = 1;
        var landscape = containerWidth > containerHeight;
        var width = 0;
        var height = 0;
        if (landscape && containerHeight > 0) {
          // obeying aspect ratio in landscape mode is not necessary
          width = Math.round(containerWidth / factor);
          height = Math.round(containerHeight / factor);
        } else {
          width = Math.round(containerWidth / factor);
          height = width / cv.ui.structure.tile.components.Chart.DEFAULT_ASPECT_RATIO;
        }
        if (!this._element.style.height && (parent.localName === 'cv-popup' && parent.getAttribute('fullscreen') === 'true' || this._element.getAttribute('allow-fullscreen') === 'true' && parent.parentElement.classList.contains('fullscreen'))) {
          // the parent container has height: auto, so we need to have one
          this._element.style.height = height + this.__P_77_8.marginTop + this.__P_77_8.marginBottom + 'px';
        }
        return [width, height];
      },
      multiTimeFormat: function multiTimeFormat(formatsArray) {
        /**
         * @param date
         */
        function multiFormat(date) {
          var i = 0;
          var found = false;
          var fmt = '%c';
          while (!found && i < formatsArray.length) {
            found = formatsArray[i][1](date);
            if (found) {
              fmt = formatsArray[i][0];
            }
            i++;
          }
          return fmt;
        }
        return function (date) {
          return d3.timeFormat(multiFormat(date))(date);
        };
      },
      _onStatusError: function _onStatusError(ts, key, err) {
        cv.core.notifications.Router.dispatchMessage('cv.charts.error', {
          title: qx.locale.Manager.tr('Communication error'),
          severity: 'urgent',
          message: qx.locale.Manager.tr('URL: %1<br/><br/>Response:</br>%2', JSON.stringify(key), JSON.stringify(err))
        });
        this.error('Chart _onStatusError', ts, key, err);
      },
      /**
       * Get svg element selection (create if not exists)
       * @param parent d3.selection of the parent this element should be a child of
       * @param nodeName {String} Element name
       * @param classes {Array<String>} array of css classes used to identify this element
       * @param attributes {Map<String, String>?} set these attributes if the element has to be created, when it already exists these are ignored
       * @private
       */
      _getSvgElement: function _getSvgElement(parent, nodeName, classes, attributes) {
        var elem = parent.select(nodeName + '.' + classes.join('.'));
        if (elem.empty()) {
          elem = parent.append(nodeName).attr('class', classes.join(' '));
          if (attributes) {
            for (var name in attributes) {
              elem.attr(name, attributes[name]);
            }
          }
        }
        return elem;
      },
      /**
       * Copyright 2021 Observable, Inc.
       * Released under the ISC license.
       * https://observablehq.com/@d3/multi-line-chart
       *
       * @param data
       * @param single
       * @private
       */
      _renderChart: function _renderChart(data, single) {
        var _this6 = this;
        var config = this.__P_77_8;
        var svg = d3.select(this._element).select('svg');

        // Compute values.
        var X;
        var Y;
        var Z;
        var O;
        var T;
        if (single) {
          if (!this._helpers) {
            return;
          }
          X = this._helpers.X;
          Y = this._helpers.Y;
          Z = this._helpers.Z;
          O = this._helpers.O;
          T = this._helpers.T;
          if (X[X.length - 1] === data.time) {
            // replace last value instead of adding one
            Y[Y.length - 1] = data.value;
          } else {
            X.push(data.time);
            Y.push(data.value);
            Z.push(data.key);
            O.push(data);
            T.push(config.title === undefined ? data.src : config.title === null ? null : config.title(data));

            // cleanup
            X.shift();
            Y.shift();
            Z.shift();
            O.shift();
            T.shift();
          }
        } else {
          X = d3.map(data, config.x);
          Y = d3.map(data, config.y);
          Z = d3.map(data, config.z);
          O = d3.map(data, function (d) {
            return d;
          });
          // Compute titles.
          T = config.title === undefined ? Z : config.title === null ? null : d3.map(data, config.title);
        }

        // Compute default domains, and unique the z-domain.
        var xDomain = d3.extent(X);
        var minVal = 0;
        var maxVal = 0;
        if (this._element.hasAttribute('min')) {
          var min = parseFloat(this._element.getAttribute('min'));
          if (!isNaN(min)) {
            minVal = min;
          }
        } else {
          minVal = d3.min(Y);
          if (minVal > 1.0) {
            minVal -= 1;
          }
        }
        if (this._element.hasAttribute('max')) {
          var max = parseFloat(this._element.getAttribute('max'));
          if (!isNaN(max)) {
            maxVal = max;
          }
        } else {
          maxVal = d3.max(Y);
          if (maxVal > 1.0) {
            // add some inner chart padding
            maxVal += 1;
          } else {
            maxVal += 0.1;
          }
        }
        var yDomain = [minVal, maxVal];
        var zDomain = new d3.InternSet(Z);
        // Omit any data not present in the z-domain.
        var I = d3.range(X.length).filter(function (i) {
          return zDomain.has(Z[i]);
        });
        if (config.showYAxis) {
          var maxValue = config.yFormat ? config.yFormat(yDomain[1]) : yDomain[1].toFixed(maxVal < 1 ? 2 : 1);
          // check if we need more space for the y-axis
          if (maxValue.length >= 2) {
            config.marginLeft = maxValue.length * 8;
          }
        }
        var xTicks = config.width / 80;
        var yTicks = config.height / 60;
        var additionalXRangePadding = this._element.getAttribute('background') === 'true' ? 0 : 2;
        var xRange = [config.marginLeft + additionalXRangePadding, config.width - config.marginRight - additionalXRangePadding]; // [left, right]
        if (!this._chartConf) {
          var yRange = [config.height - config.marginBottom, config.marginTop]; // [bottom, top]

          // initialize everything once
          this._chartConf = {
            // x/y scales
            x: config.xType().range(xRange),
            y: config.yType().range(yRange)
          };
          this._chartConf.xAxis = config.showXAxis ? d3.axisBottom(this._chartConf.x).ticks(xTicks).tickSizeOuter(0).tickFormat(config.xFormat) : undefined;
          this._chartConf.yAxis = config.showYAxis ? d3.axisLeft(this._chartConf.y).ticks(yTicks, config.yFormat) : undefined;

          // add elements
          var showGrid = this._element.hasAttribute('show-grid') ? this._element.getAttribute('show-grid') : 'xy';
          if (showGrid.includes('x')) {
            this._chartConf.xGrid = d3.axisBottom(this._chartConf.x).ticks(xTicks).tickSize(-config.height + config.marginBottom + config.marginTop).tickFormat('');
            this._getSvgElement(svg, 'g', ['grid', 'x'], {
              transform: "translate(0,".concat(config.height - config.marginBottom, ")")
            }).call(this._chartConf.xGrid);
          }
          if (showGrid.includes('y')) {
            this._chartConf.yGrid = d3.axisLeft(this._chartConf.y).ticks(yTicks).tickSize(-config.width + config.marginRight + config.marginLeft).tickFormat('');
            this._getSvgElement(svg, 'g', ['grid', 'y'], {
              transform: "translate(".concat(config.marginLeft, ",0)")
            }).call(this._chartConf.yGrid);
          }
          if (config.showXAxis) {
            this._getSvgElement(svg, 'g', ['axis', 'x']).attr('transform', "translate(0,".concat(config.height - config.marginBottom, ")")).call(this._chartConf.xAxis);
          }
          if (config.showYAxis) {
            var yAxisElement = this._getSvgElement(svg, 'g', ['axis', 'y']).attr('transform', "translate(".concat(config.marginLeft, ",0)"));
            if (config.label && yAxisElement.select('text').empty()) {
              yAxisElement.append('text').attr('x', -config.marginLeft).attr('y', 10).attr('fill', 'currentColor').attr('text-anchor', 'start').text(config.yLabel);
            }
            yAxisElement.call(this._chartConf.yAxis).call(function (g) {
              return g.select('.domain').remove();
            });
          }

          // find chart types
          var lineGroups = new Map();
          var areaGroups = new Map();
          var barGroups = new Map();
          var stackedBarGroups = new Map();
          var lineFunctions = {};
          var areaFunctions = {};
          var xBar;
          var xzScale;
          var _loop2 = function _loop2(key) {
            switch (_this6._dataSetConfigs[key].chartType) {
              case 'line':
                {
                  var idx = I.filter(function (i) {
                    return Z[i] === key;
                  });
                  lineGroups.set(key, idx);
                  var curveName = _this6._dataSetConfigs[key].curve || 'linear';
                  if (!Object.prototype.hasOwnProperty.call(lineFunctions, curveName)) {
                    var curveFunction;
                    switch (curveName) {
                      case 'linear':
                        curveFunction = d3.curveLinear;
                        break;
                      case 'step':
                        curveFunction = d3.curveStep;
                        break;
                      case 'natural':
                        curveFunction = d3.curveNatural;
                        break;
                    }
                    if (curveFunction) {
                      // Construct a line generator.
                      lineFunctions[curveName] = d3.line().curve(curveFunction).x(function (i) {
                        return _this6._chartConf.x(_this6._helpers.X[i]);
                      }).y(function (i) {
                        return _this6._chartConf.y(_this6._helpers.Y[i]);
                      });
                    }
                    if (_this6._dataSetConfigs[key].chartType === 'line' && typeof config.showArea === 'function' && config.showArea(key)) {
                      areaGroups.set(key, idx);
                      if (curveFunction) {
                        // Construct a line generator.
                        var minY = _this6._chartConf.y.range()[0];
                        areaFunctions[curveName] = d3.area().curve(curveFunction).x(function (i) {
                          return _this6._chartConf.x(_this6._helpers.X[i]);
                        }).y0(function () {
                          return minY;
                        }).y1(function (i) {
                          return _this6._chartConf.y(_this6._helpers.Y[i]);
                        });
                      }
                    }
                  }
                  break;
                }
              case 'bar':
                barGroups.set(key, I.filter(function (i) {
                  return Z[i] === key;
                }));
                if (!xBar) {
                  xBar = d3.scaleBand().range(_this6._chartConf.x.range()).padding(config.xPadding);
                }
                if (!xzScale) {
                  xzScale = d3.scaleBand().padding(0.05);
                }
                break;
              case 'stacked-bar':
                stackedBarGroups.set(key, I.filter(function (i) {
                  return Z[i] === key;
                }));
                break;
            }
          };
          for (var key in this._dataSetConfigs) {
            _loop2(key);
          }
          this._chartConf.lineGroups = lineGroups;
          this._chartConf.areaGroups = areaGroups;
          this._chartConf.barGroups = barGroups;
          this._chartConf.stackedBarGroups = stackedBarGroups;
          this._chartConf.lineFunctions = lineFunctions;
          this._chartConf.areaFunctions = areaFunctions;
          this._chartConf.xBar = xBar;
          if (xzScale) {
            this._chartConf.xz = xzScale;
          }

          // prepare elements for chart elements
          if (this._chartConf.lineGroups.size > 0) {
            this._chartConf.lineContainer = this._getSvgElement(svg, 'g', ['line'], {
              fill: 'none',
              stroke: typeof config.color === 'string' ? config.color : null,
              'stroke-linecap': config.strokeLinecap,
              'stroke-linejoin': config.strokeLinejoin,
              'stroke-width': config.strokeWidth,
              'stroke-opacity': config.strokeOpacity
            });
          }
          if (this._chartConf.areaGroups.size > 0) {
            this._chartConf.areaContainer = this._getSvgElement(svg, 'g', ['area'], {
              stroke: 'none',
              fill: typeof config.color === 'string' ? this.__P_77_10(config.color, '30') : null
            });
          }
          if (this._chartConf.barGroups.size > 0) {
            this._chartConf.barContainer = this._getSvgElement(svg, 'g', ['bars']);
          }
        }

        // apply domains to scales
        this._chartConf.x.domain(xDomain);
        this._chartConf.y.domain(yDomain);
        this._helpers = {
          X: X,
          Y: Y,
          I: I,
          T: T,
          Z: Z,
          O: O
        };
        if (this._chartConf.xAxis) {
          this._getSvgElement(svg, 'g', ['axis', 'x']).call(this._chartConf.xAxis);
        }
        if (this._chartConf.yAxis) {
          this._getSvgElement(svg, 'g', ['axis', 'y']).call(this._chartConf.yAxis);
        }
        if (this._chartConf.xBar) {
          this._chartConf.xBar.domain(new d3.InternSet(X));
        }
        if (this._chartConf.xz) {
          this._chartConf.xz.domain(zDomain);
          this._chartConf.x.range([xRange[0], xRange[1] - this._chartConf.xBar.bandwidth()]);
          this._chartConf.xz.range([0, this._chartConf.xBar.bandwidth()]);
        }

        // update groups
        var _iterator5 = _createForOfIteratorHelper(this._chartConf.lineGroups.keys()),
          _step5;
        try {
          var _loop3 = function _loop3() {
            var key = _step5.value;
            var idx = I.filter(function (i) {
              return Z[i] === key;
            });
            _this6._chartConf.lineGroups.set(key, idx);
          };
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            _loop3();
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
        var _iterator6 = _createForOfIteratorHelper(this._chartConf.areaGroups.keys()),
          _step6;
        try {
          var _loop4 = function _loop4() {
            var key = _step6.value;
            var idx = I.filter(function (i) {
              return Z[i] === key && Y[i] !== undefined;
            });
            _this6._chartConf.areaGroups.set(key, idx);
          };
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            _loop4();
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
        var _iterator7 = _createForOfIteratorHelper(this._chartConf.barGroups.keys()),
          _step7;
        try {
          var _loop5 = function _loop5() {
            var key = _step7.value;
            var idx = I.filter(function (i) {
              return Z[i] === key && Y[i] !== undefined;
            });
            _this6._chartConf.barGroups.set(key, idx);
          };
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            _loop5();
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
        var _iterator8 = _createForOfIteratorHelper(this._chartConf.stackedBarGroups.keys()),
          _step8;
        try {
          var _loop6 = function _loop6() {
            var key = _step8.value;
            var idx = I.filter(function (i) {
              return Z[i] === key && Y[i] !== undefined;
            });
            _this6._chartConf.stackedBarGroups.set(key, idx);
          };
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            _loop6();
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
        this.__P_77_8 = config;
        this._dot = svg.select('g.dot');

        // show zero line in grid for non-zero based charts
        if (minVal !== 0) {
          var targetContainer = this._chartConf.lineContainer || this._chartConf.areaContainer || this._chartConf.barContainer;
          var yValue = 0.0;
          var _data = [0, X.length - 1];
          var lineElem = targetContainer.select('.zero-line');
          if (lineElem.empty()) {
            lineElem = targetContainer.append('line').attr('class', 'zero-line').attr('stroke', 'currentColor').attr('stroke-opacity', '15%');
          }
          if (X.length > 0) {
            var x1 = this._chartConf.x(X[_data[0]]);
            var x2 = this._chartConf.x(X[X.length - 1]); // always draw until end of chart (not until end of src dataset)
            var y = this._chartConf.y(yValue);
            lineElem.attr('x1', x1).attr('x2', x2).attr('y1', y).attr('y2', y);
          }
        }
        var t = d3.transition().duration(single ? 0 : 500).ease(d3.easeLinear);
        if (this._chartConf.lineContainer) {
          this._chartConf.lineContainer.selectAll('path').data(this._chartConf.lineGroups).join(function (enter) {
            return enter.append('path').style('mix-blend-mode', config.mixBlendMode).attr('stroke', typeof config.color === 'function' ? function (p) {
              return config.color(p[0]);
            } : null);
          }).transition(t).attr('d', function (d) {
            var curveName = _this6._dataSetConfigs[d[0]].curve || 'linear';
            var func = _this6._chartConf.lineFunctions[curveName] || _this6._chartConf.lineFunctions.linear;
            var val = func(d[1]);
            return val;
          });
        }

        // Add the area
        if (this._chartConf.areaContainer) {
          this._chartConf.areaContainer.selectAll('path').data(this._chartConf.areaGroups).join(function (enter) {
            return enter.append('path').style('mix-blend-mode', config.mixBlendMode).attr('fill', typeof config.color === 'function' ? function (p) {
              return _this6.__P_77_10(config.color(p[0]), '30');
            } : null);
          }).transition(t).attr('d', function (d) {
            var curveName = _this6._dataSetConfigs[d[0]].curve || 'linear';
            var func = _this6._chartConf.areaFunctions[curveName] || _this6._chartConf.areaFunctions.linear;
            return func(d[1]);
          });
        }
        if (this._chartConf.barContainer) {
          var yMin = this._chartConf.y.range()[0];
          this._chartConf.barContainer.selectAll('g').data(this._chartConf.barGroups).join('g').attr('fill', typeof config.color === 'function' ? function (d) {
            return config.color(d[0]);
          } : null).selectAll('rect').data(function (d) {
            return d[1].map(function (val) {
              return {
                key: d[0],
                value: val
              };
            });
          }).join('rect').attr('x', function (d) {
            var x = _this6._chartConf.x(X[d.value]);
            var xz = _this6._chartConf.xz(d.key);
            return x + xz;
          }).attr('y', function (d) {
            return _this6._chartConf.y(Y[d.value]);
          }).attr('width', this._chartConf.xz.bandwidth()).transition(t).attr('height', function (d) {
            return yMin - _this6._chartConf.y(Y[d.value]);
          });
        }

        // add fixed/calculated lines
        var _iterator9 = _createForOfIteratorHelper(this._element.querySelectorAll(':scope > h-line').entries()),
          _step9;
        try {
          var _loop7 = function _loop7() {
              var _step9$value = _slicedToArray(_step9.value, 2),
                i = _step9$value[0],
                line = _step9$value[1];
              var src = line.getAttribute('src');
              var targetContainer = null;
              var data = null;
              var yValue = NaN;
              if (src) {
                if (_this6._chartConf.lineGroups.get(src)) {
                  targetContainer = _this6._chartConf.lineContainer;
                  data = _this6._chartConf.lineGroups.get(src);
                } else if (_this6._chartConf.areaGroups.get(src)) {
                  targetContainer = _this6._chartConf.areaContainer;
                  data = _this6._chartConf.areaGroups.get(src);
                } else if (_this6._chartConf.barGroups.get(src)) {
                  targetContainer = _this6._chartConf.barContainer;
                  data = _this6._chartConf.barGroups.get(src);
                }
                if (!data) {
                  _this6.error('no data found for src ' + src);
                  return 0; // continue
                }
                switch (line.getAttribute('value')) {
                  case 'avg':
                    {
                      var sum = 0.0;
                      var _iterator10 = _createForOfIteratorHelper(data),
                        _step10;
                      try {
                        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
                          var di = _step10.value;
                          sum += Y[di];
                        }
                      } catch (err) {
                        _iterator10.e(err);
                      } finally {
                        _iterator10.f();
                      }
                      yValue = sum / data.length;
                      break;
                    }
                  case 'max':
                    yValue = d3.max(Y.filter(function (v, i) {
                      return data.includes(i);
                    }, function (d) {
                      return d;
                    }));
                    break;
                  case 'min':
                    yValue = d3.min(Y.filter(function (v, i) {
                      return data.includes(i);
                    }, function (d) {
                      return d;
                    }));
                    break;
                  default:
                    _this6.error('unknown value calculation: ' + line.getAttribute('value'));
                    break;
                }
              } else {
                targetContainer = _this6._chartConf.lineContainer || _this6._chartConf.areaContainer || _this6._chartConf.barContainer;
                yValue = parseFloat(line.getAttribute('value'));
                data = [0, X.length - 1];
              }
              if (!targetContainer) {
                return 0; // continue
              }
              var lineElem = targetContainer.select('.line-' + i);
              if (isNaN(yValue) && !lineElem.empty()) {
                // remove line
                lineElem.remove();
                if (line.getAttribute('show-value') === 'true') {
                  targetContainer.select('.line-value-' + i).remove();
                }
              } else if (!isNaN(yValue)) {
                var color = line.getAttribute('color') || 'currentColor';
                if (lineElem.empty()) {
                  lineElem = targetContainer.append('line').attr('class', 'line-' + i).attr('stroke', color);
                }
                var _x3 = _this6._chartConf.x(X[data[0]]);
                var _x4 = _this6._chartConf.x(X[X.length - 1]); // always draw until end of chart (not until end of src dataset)
                var _y = _this6._chartConf.y(yValue);
                lineElem.attr('x1', _x3).attr('x2', _x4).attr('y1', _y).attr('y2', _y);
                if (line.getAttribute('show-value') === 'true') {
                  var format = line.hasAttribute('format') ? line.getAttribute('format') : _this6._element.hasAttribute('y-format') ? _this6._element.getAttribute('y-format') : '%s';
                  var valueElem = targetContainer.select('.line-value-' + i);
                  if (valueElem.empty()) {
                    valueElem = targetContainer.append('text').attr('class', 'line-value-' + i).attr('fill', line.getAttribute('value-color') || color).attr('font-size', '10').attr('text-anchor', 'start');
                  }
                  // show value on right side of the chart
                  valueElem.attr('x', _x4 + 2).attr('y', _y + 5).text(cv.util.String.sprintf(format, yValue));
                }
              }
            },
            _ret;
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            _ret = _loop7();
            if (_ret === 0) continue;
          }

          // dot must be added last
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }
        var dot = svg.select('g.dot');
        if (dot.empty()) {
          svg.append('g').attr('class', 'dot').attr('display', 'none').attr('fill', 'currentColor').append('circle').attr('r', 2.5);
        }
        this._dot = svg.select('g.dot');
      },
      _onPointerEntered: function _onPointerEntered(ev) {
        var _this7 = this;
        if (this._loaded) {
          this.__P_77_1 = setTimeout(function () {
            _this7.__P_77_11(true, ev);
            _this7.__P_77_1 = null;
          }, 500);
        }
      },
      _onPointerLeft: function _onPointerLeft(ev) {
        if (this.__P_77_1) {
          clearTimeout(this.__P_77_1);
        }
        if (this._loaded) {
          if (ev.relatedTarget !== this._tooltip) {
            this.__P_77_11(false);
          }
        }
      },
      __P_77_11: function __P_77_11(val, ev) {
        this.__P_77_2 = val;
        if (val) {
          if (this._dot) {
            this._dot.attr('display', null);
            this._dot.raise();
          }
          this._tooltip.style.display = 'block';
          this._onPointerMoved(null, true);
        } else {
          if (this._dot) {
            this._dot.attr('display', 'none');
          }
          var svg = d3.select(this._element).select('svg');
          svg.node().value = null;
          svg.dispatch('input', {
            bubbles: true
          });
          this._tooltip.style.display = 'none';
        }
      },
      _onPointerMoved: function _onPointerMoved(event, center) {
        if (this._loaded && this.__P_77_2) {
          var xm = 0;
          var ym = 0;
          if (event) {
            var _d3$pointer = d3.pointer(event);
            var _d3$pointer2 = _slicedToArray(_d3$pointer, 2);
            xm = _d3$pointer2[0];
            ym = _d3$pointer2[1];
          } else if (center) {
            xm = this.__P_77_8.width / 2;
            ym = this.__P_77_8.height / 2;
          } else {
            return;
          }
          var _this$_helpers = this._helpers,
            X = _this$_helpers.X,
            Y = _this$_helpers.Y,
            I = _this$_helpers.I,
            T = _this$_helpers.T,
            Z = _this$_helpers.Z,
            O = _this$_helpers.O;
          var _this$_chartConf = this._chartConf,
            x = _this$_chartConf.x,
            y = _this$_chartConf.y,
            xz = _this$_chartConf.xz;
          var i = d3.least(I, function (i) {
            return Math.hypot(x(X[i]) - xm, y(Y[i]) - ym);
          });
          var scaleFactorX = this._element.offsetWidth / this.__P_77_8.width;
          var scaleFactorY = this._element.offsetHeight / this.__P_77_8.height;
          // closest point
          var xOffset = xz ? xz(Z[i]) + (typeof xz.bandwidth === 'function' ? xz.bandwidth() / 2 : 0) : 0;
          this._dot.attr('transform', "translate(".concat(x(X[i]) + xOffset, ",").concat(y(Y[i]), ")"));
          if (T) {
            var cursorOffset = event && event.pointerType === 'mouse' ? 16 : 40;
            var timeString = this.__P_77_8.xFormat(new Date(X[i]));
            var top = ym * scaleFactorY - this._tooltip.offsetHeight;
            if (top < 0) {
              top += cursorOffset + this._tooltip.offsetHeight;
            } else {
              top -= cursorOffset;
            }
            var left = xm * scaleFactorX;
            if (left > this._element.offsetWidth / 2) {
              left -= this._tooltip.offsetWidth + cursorOffset;
            } else {
              left += cursorOffset;
            }
            var key = Z[i];
            var lineTitle = this._dataSetConfigs[key] && this._dataSetConfigs[key].title ? this._dataSetConfigs[key].title + ': ' : '';
            this._tooltip.innerHTML = "".concat(timeString, "<br/>").concat(lineTitle).concat(T[i]);
            this._tooltip.style.left = left + 'px';
            this._tooltip.style.top = top + 'px';
          }
          d3.select(this._element).select('svg').property('value', O[i]).dispatch('input', {
            bubbles: true
          });
        }
      },
      __P_77_9: function __P_77_9() {
        if (this._navigationEnabled) {
          var title = this.getHeader('label.title span');
          if (title) {
            var chartTitle = this._titleString || '';
            title.textContent = (chartTitle ? chartTitle + ' - ' : '') + this._shownDateRange();
          }
        }
      },
      /**
       * Converts series to a shot string that is shown in a select box
       * @param series
       * @private
       */
      _seriesToShort: function _seriesToShort(series) {
        switch (series) {
          case 'hour':
            return qx.locale.Manager.tr('Hour');
          case 'day':
            return qx.locale.Manager.tr('Day');
          case 'week':
            return qx.locale.Manager.tr('Week');
          case 'month':
            return qx.locale.Manager.tr('Month');
          case 'year':
            return qx.locale.Manager.tr('Year');
        }
        return '';
      },
      /**
       * Convert the currently shown date range into a human-readable string
       * @private
       */
      _shownDateRange: function _shownDateRange() {
        var series = this.getCurrentSeries();
        var currentPeriod = this.getCurrentPeriod();
        var date = new Date();
        var format = new qx.util.format.DateFormat();
        switch (series) {
          case 'hour':
            date.setHours(date.getHours() - currentPeriod, 0, 0);
            format = new qx.util.format.DateFormat(qx.locale.Date.getDateTimeFormat('hmm', 'h:mm'));
            return format.format(date);
          case 'day':
            if (currentPeriod === 0) {
              return qx.locale.Manager.tr('today');
            } else if (currentPeriod === 1) {
              return qx.locale.Manager.tr('yesterday');
            }
            date.setDate(date.getDate() - currentPeriod);
            format = new qx.util.format.DateFormat(qx.locale.Date.getDateTimeFormat('MMMd', 'd. MMM'));
            return format.format(date);
          case 'week':
            date.setDate(date.getDate() - currentPeriod * 7);
            return qx.locale.Manager.trc('CW = calendar week', 'CW %1', this.getWeekNumber(date));
          case 'month':
            date.setMonth(date.getMonth() - currentPeriod);
            if (date.getFullYear() === new Date().getFullYear()) {
              // no year needed
              format = new qx.util.format.DateFormat(qx.locale.Date.getDateTimeFormat('MMM', 'MMM'));
            } else {
              format = new qx.util.format.DateFormat(qx.locale.Date.getDateTimeFormat('yyMMM', 'MMM yy'));
            }
            return format.format(date);
          case 'year':
            return date.getFullYear() - currentPeriod;
        }
        return '';
      },
      getWeekNumber: function getWeekNumber(d) {
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        // Set to the nearest Thursday: current date + 4 - current day number
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        // Get first day of year
        var yearStart = new Date(d.getFullYear(), 0, 1);
        // Calculate full weeks to the nearest Thursday
        return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
      },
      /**
       * add opacity to color
       * @param color
       * @param opacity {string} hex number 0 - 255
       * @return {string|*}
       * @private
       */
      __P_77_10: function __P_77_10(color, opacity) {
        if (color.startsWith('var(')) {
          color = getComputedStyle(document.documentElement).getPropertyValue(color.substring(4, color.length - 1));
        }
        if (color.startsWith('rgb(')) {
          return 'rgba(' + color.substring(4, color.length - 1) + ', ' + (parseInt(opacity, 16) / 255).toFixed(2) + ')';
        } else if (color.startsWith('#') && color.length === 7) {
          return color + opacity;
        }
        return color;
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._chartConf = null;
      this._helpers = null;
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'chart', /*#__PURE__*/function (_QxConnector) {
        "use strict";

        function _class() {
          _classCallCheck(this, _class);
          return _callSuper(this, _class, [QxClass]);
        }
        _inherits(_class, _QxConnector);
        return _createClass(_class);
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.components.Chart.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Chart.js.map?dt=1722153806160