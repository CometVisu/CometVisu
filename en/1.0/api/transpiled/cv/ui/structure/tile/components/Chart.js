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
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
      "cv.ui.structure.tile.components.chart.XAxis": {},
      "cv.ui.structure.tile.components.chart.YAxis": {},
      "cv.ui.structure.tile.components.chart.Data": {},
      "cv.ui.structure.tile.components.chart.Dataset": {},
      "cv.ui.structure.tile.components.chart.LineDataset": {},
      "cv.ui.structure.tile.components.chart.LineGroup": {},
      "cv.ui.structure.tile.components.chart.AreaGroup": {},
      "cv.ui.structure.tile.components.chart.BarGroup": {},
      "cv.ui.structure.tile.components.chart.StackedBarGroup": {},
      "cv.io.BackendConnections": {},
      "cv.util.Color": {},
      "cv.util.String": {},
      "qx.util.format.DateFormat": {},
      "cv.Config": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Chart.js
   *
   * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
      TF: null,
      JS_LOADED: new Promise(/*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(resolve, reject) {
          var check, timer, counter, _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                check = function check() {
                  return _typeof(window.d3) === 'object';
                };
                _context.p = 1;
                _context.n = 2;
                return cv.util.ScriptLoader.includeScript(qx.util.ResourceManager.getInstance().toUri('libs/d3.min.js'));
              case 2:
                _context.n = 4;
                break;
              case 3:
                _context.p = 3;
                _t = _context.v;
                qx.log.Logger.error(_this, 'Error loading D3:', _t);
                reject(new Error('Error loading d3 library'));
                return _context.a(2);
              case 4:
                if (!check()) {
                  timer = new qx.event.Timer(50);
                  counter = 0;
                  timer.addListener('interval', function () {
                    counter++;
                    if (check()) {
                      timer.stop();
                      resolve(true);
                    } else if (counter > 5) {
                      timer.stop();
                      qx.log.Logger.error(_this, 'Error loading D3: D3 did not load within expected time');
                      reject(new Error('Error loading d3 library'));
                    }
                  });
                  timer.start();
                } else {
                  resolve(true);
                }
              case 5:
                return _context.a(2);
            }
          }, _callee, null, [[1, 3]]);
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
          cv.ui.structure.tile.components.Chart.TF = d3.timeFormatDefaultLocale({
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
        } else {
          cv.ui.structure.tile.components.Chart.TF = d3.timeFormatDefaultLocale({
            dateTime: '%x, %X',
            date: '%-m/%-d/%Y',
            time: '%-I:%M:%S %p',
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
      })["catch"](function () {}),
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
        apply: "__P_78_0"
      },
      startTime: {
        check: 'Number',
        init: 0
      },
      endTime: {
        check: 'Number',
        init: 0
      },
      minY: {
        check: 'Number',
        nullable: true,
        apply: "__P_78_1",
        event: 'changeMinY'
      },
      maxY: {
        check: 'Number',
        nullable: true,
        apply: "__P_78_1",
        event: 'changeMaxY'
      },
      /** Margin of the widget (top) */
      marginTop: {
        check: 'Integer',
        init: 12,
        apply: '_applyMargin',
        event: 'changeMarginTop'
      },
      /** Margin of the widget (right) */
      marginRight: {
        check: 'Integer',
        init: 24,
        apply: '_applyMargin',
        event: 'changeMarginRight'
      },
      /** Margin of the widget (bottom) */
      marginBottom: {
        check: 'Integer',
        init: 20,
        apply: '_applyMargin',
        event: 'changeMarginBottom'
      },
      /** Margin of the widget (left) */
      marginLeft: {
        check: 'Integer',
        init: 24,
        apply: '_applyMargin',
        event: 'changeMarginLeft'
      },
      /**
       * The 'margin' property is a shorthand property for setting 'marginTop',
       * 'marginRight', 'marginBottom' and 'marginLeft' at the same time.
       *
       * If four values are specified they apply to top, right, bottom and left respectively.
       * If there is only one value, it applies to all sides, if there are two or three,
       * the missing values are taken from the opposite side.
       */
      margin: {
        group: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
        mode: 'shorthand'
      },
      width: {
        check: 'Number',
        init: 392,
        apply: '_applySize',
        event: 'changeWidth'
      },
      height: {
        check: 'Number',
        init: 192,
        apply: '_applySize',
        event: 'changeHeight'
      },
      aspectRatio: {
        check: 'Number',
        init: 2.0416666666666665
      },
      inBackground: {
        check: 'Boolean',
        init: false
      },
      xAxis: {
        check: 'cv.ui.structure.tile.components.chart.XAxis',
        event: 'changeXAxis'
      },
      yAxis: {
        check: 'cv.ui.structure.tile.components.chart.YAxis',
        event: 'changeYAxis'
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
      _loaded: null,
      _datasets: null,
      _initializing: null,
      _navigationEnabled: null,
      __P_78_2: null,
      __P_78_3: false,
      __P_78_4: null,
      __P_78_5: null,
      __P_78_6: null,
      __P_78_7: null,
      __P_78_8: false,
      __P_78_9: null,
      __P_78_10: null,
      __P_78_11: null,
      _yFormat: null,
      /**
      * @type {d3.Selection}
      */
      _tooltipIndicator: null,
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
      /**
       * @type {cv.ui.structure.tile.components.chart.Data}
       */
      data: null,
      _init: function _init() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var element, inBackground, title, span, seriesSelection, s, currentSeries, _span, button, _i, popup, option, _iterator, _step, _s, minY, maxY, svg, noToolTips, dataSets, datasetSources, _i2, _dataSets, dataSetElement, dataSet, i, _iterator2, _step2, line, sourceKey, otherDataset, _dataSet, _dataSet2, tile, readAddresses;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _this2._checkEnvironment();
                _this2._initializing = true;
                element = _this2._element;
                _context2.n = 1;
                return cv.ui.structure.tile.components.Chart.JS_LOADED;
              case 1:
                if (!_this2.isDisposed()) {
                  _context2.n = 2;
                  break;
                }
                return _context2.a(2);
              case 2:
                _this2._id = cv.ui.structure.tile.components.Chart.ChartCounter++;
                _this2.setXAxis(new cv.ui.structure.tile.components.chart.XAxis(_this2));
                _this2.setYAxis(new cv.ui.structure.tile.components.chart.YAxis(_this2));
                _this2.data = new cv.ui.structure.tile.components.chart.Data(_this2);
                _this2.bind('minY', _this2.data, 'minY');
                _this2.bind('maxY', _this2.data, 'maxY');
                element.setAttribute('data-chart-id', _this2._id.toString());
                inBackground = _this2._element.hasAttribute('background') && _this2._element.getAttribute('background') === 'true';
                _this2.setInBackground(inBackground);
                title = _this2.getHeader('label.title');
                if (!inBackground && element.hasAttribute('title') && !title) {
                  title = document.createElement('label');
                  title.classList.add('title');
                  span = document.createElement('span');
                  title.appendChild(span);
                  span.textContent = element.getAttribute('title');
                  _this2.appendToHeader(title);
                }
                if (_this2._titleString === null) {
                  // save base title for updating
                  if (element.hasAttribute('title')) {
                    _this2._titleString = element.getAttribute('title');
                  } else {
                    _this2._titleString = title ? title.textContent.trim() : '';
                  }
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
                  if (!title) {
                    title = document.createElement('label');
                    title.classList.add('title');
                    _span = document.createElement('span');
                    title.appendChild(_span);
                    _this2.appendToHeader(title);
                  }

                  // back button
                  button = title.parentElement.querySelector(':scope > button.prev');
                  if (!button) {
                    button = _this2._buttonFactory('ri-arrow-left-s-line', ['prev']);
                    button.setAttribute('title', qx.locale.Manager.tr('previous'));
                    button.addEventListener('click', function (ev) {
                      _this2._onSeriesPrev();
                      ev.stopPropagation();
                      ev.preventDefault();
                    });
                    title.parentElement.insertBefore(button, title);
                  }
                  if (!title.querySelector(':scope > i.ri-arrow-down-s-fill')) {
                    _i = document.createElement('i');
                    _i.classList.add('ri-arrow-down-s-fill');
                    title.appendChild(_i);
                  }

                  // current selection
                  popup = title.querySelector(':scope > .popup.series');
                  if (!popup) {
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
                  }

                  // make title clickable
                  if (!title.classList.contains('clickable')) {
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
                  }

                  // forward button
                  button = _this2.getHeader(':scope > button.next');
                  if (!button) {
                    button = _this2._buttonFactory('ri-arrow-right-s-line', ['next']);
                    button.setAttribute('title', qx.locale.Manager.tr('next'));
                    // initially we cannot go into the future
                    button.disabled = true;
                    button.addEventListener('click', function (ev) {
                      _this2._onSeriesNext();
                      ev.stopPropagation();
                      ev.preventDefault();
                    });
                    _this2.appendToHeader(button);
                  }
                }
                if (!inBackground && element.hasAttribute('allow-fullscreen') && element.getAttribute('allow-fullscreen') === 'true') {
                  _this2._initFullscreenSwitch();
                  _this2.addListener('changeFullscreen', function (ev) {
                    return _this2.__P_78_12(ev.getData());
                  });
                }
                if (element.hasAttribute('refresh')) {
                  _this2.setRefresh(parseInt(element.getAttribute('refresh')));
                }
                if (element.hasAttribute('min')) {
                  minY = parseFloat(element.getAttribute('min'));
                  if (!isNaN(minY)) {
                    _this2.setMinY(minY);
                  }
                }
                if (element.hasAttribute('max')) {
                  maxY = parseFloat(element.getAttribute('max'));
                  if (!isNaN(maxY)) {
                    _this2.setMaxY(maxY);
                  }
                }
                if (element.hasAttribute('tooltip-time-format')) {
                  _this2._tooltipTimeFormat = cv.ui.structure.tile.components.Chart.TF.format(element.getAttribute('tooltip-time-format'));
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
                _this2._datasets = {};
                _this2._chartElements = [];
                dataSets = Array.from(_this2._element.querySelectorAll(':scope > dataset'));
                datasetSources = dataSets.map(function (elem) {
                  return elem.getAttribute('src');
                });
                for (_i2 = 0, _dataSets = dataSets; _i2 < _dataSets.length; _i2++) {
                  dataSetElement = _dataSets[_i2];
                  dataSet = new cv.ui.structure.tile.components.chart.Dataset(dataSetElement, _this2);
                  _this2._datasets[dataSet.getKey()] = dataSet;
                }
                i = 0;
                _iterator2 = _createForOfIteratorHelper(_this2._element.querySelectorAll(':scope > h-line, v-line'));
                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    line = _step2.value;
                    if (line.hasAttribute('src')) {
                      sourceKey = line.getAttribute('src');
                      otherDataset = _this2._datasets[sourceKey];
                      _dataSet = new cv.ui.structure.tile.components.chart.LineDataset(line, _this2);
                      _dataSet.setChartType(line.localName);
                      _dataSet.setIndex(i);
                      if (!otherDataset) {
                        _this2._datasets[_dataSet.getKey()] = _dataSet;
                      } else {
                        // this line gets its data from another dataset            
                        _dataSet.setSourceSet(otherDataset);
                        _this2._datasets['derived-' + i] = _dataSet;
                      }
                    } else {
                      // lines with fixed values
                      _dataSet2 = new cv.ui.structure.tile.components.chart.LineDataset(line, _this2);
                      _dataSet2.setChartType(line.localName);
                      _dataSet2.setIndex(i);
                      _this2._datasets['fixed-' + i] = _dataSet2;
                    }
                    i++;
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
                if (_this2._element.hasAttribute('background') && _this2._element.getAttribute('background') === 'true') {
                  // no margins
                  _this2.setMargin(_this2.getMarginTop(), 0, 0, 0);

                  // because we have no margins we need to cut the overflow on the tile
                  tile = _this2._element.parentElement;
                  while (tile && tile.localName !== 'cv-tile') {
                    tile = tile.parentElement;
                  }
                  if (tile && tile.localName === 'cv-tile') {
                    tile.style.overflow = 'hidden';
                  }
                }
                _this2._initAxes();
                _this2._initChartContent();
                _this2._initializing = false;
                _this2.__P_78_13();
                qx.locale.Manager.getInstance().addListener('changeLocale', _this2._onLocaleChanged, _this2);

                // check if we have a read address for live updates
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
              case 3:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      getXPos: function getXPos(i) {
        var isValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var scale = this.overrideXScale || this.getXAxis().getScale();
        if (isValue) {
          return scale(i);
        }
        return scale(this.data.times[i]);
      },
      getYPos: function getYPos(i) {
        var isValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (isValue) {
          return this.getYAxis().getScale()(i);
        }
        return this.getYAxis().getScale()(this.data.values[i]);
      },
      getMinYPos: function getMinYPos() {
        return this.getYAxis().getRange()[0];
      },
      _applySize: function _applySize() {
        this.setAspectRatio(this.getWidth() / this.getHeight());
        d3.select(this._element).select('svg').attr('viewBox', "0, 0, ".concat(this.getWidth(), ", ").concat(this.getHeight()));
      },
      _applyMargin: function _applyMargin() {},
      __P_78_1: function __P_78_1(value, oldValue, name) {
        if (!this.isPropertyInitialized('yAxis')) {
          return;
        }
        if (name === 'maxY') {
          var minY = this.getMinY();
          if (minY !== null) {
            this.getYAxis().setDomain([minY, value]);
          }
        } else if (name === 'minY') {
          var maxY = this.getMaxY();
          if (maxY !== null) {
            this.getYAxis().setDomain([value, maxY]);
          }
        }
      },
      _initAxes: function _initAxes() {
        var xAxis = this.getXAxis();
        var yAxis = this.getYAxis();

        // init some fixed settings
        var timeFormatString = '';
        var yFormat = '';
        var xSettings = {};
        var ySettings = {};
        var xAxisElement = this._element.querySelector(':scope > x-axis');
        if (xAxisElement) {
          if (xAxisElement.hasAttribute('format')) {
            timeFormatString = xAxisElement.getAttribute('format');
          }
          xSettings.show = true;
          xSettings.showLine = xAxisElement.hasAttribute('show-line') && xAxisElement.getAttribute('show-line') === 'true';
          if (xAxisElement.hasAttribute('tick-size')) {
            xSettings.tickSize = parseInt(xAxisElement.getAttribute('tick-size'));
          }
          if (xAxisElement.hasAttribute('min')) {
            var minX = parseFloat(xAxisElement.getAttribute('min'));
            if (!isNaN(minX)) {
              this.setMinX(minX);
            }
          }
          if (xAxisElement.hasAttribute('max')) {
            var maxX = parseFloat(xAxisElement.getAttribute('max'));
            if (!isNaN(maxX)) {
              this.setMaxX(maxX);
            }
          }
        } else {
          // fallback mode when no special axis element is there, to still support old configs
          if (this._element.hasAttribute('x-format')) {
            timeFormatString = this._element.getAttribute('x-format');
          }
          xSettings.show = !this._element.hasAttribute('show-x-axis') || this._element.getAttribute('show-x-axis') === 'true';
        }
        if (timeFormatString) {
          xSettings.tickFormat = function (date) {
            return cv.ui.structure.tile.components.Chart.TF.format(qx.locale.Manager['tr'](timeFormatString))(date);
          };
        } else {
          // format auto-detection
          xSettings.tickFormat = this.multiTimeFormat();
        }
        var yAxisElement = this._element.querySelector(':scope > y-axis');
        if (yAxisElement) {
          if (yAxisElement.hasAttribute('format')) {
            yFormat = yAxisElement.getAttribute('format');
          }
          if (yAxisElement.hasAttribute('tick-size')) {
            ySettings.tickSize = parseInt(yAxisElement.getAttribute('tick-size'));
          }
          ySettings.show = true;
          ySettings.showLine = yAxisElement.hasAttribute('show-line') && yAxisElement.getAttribute('show-line') === 'true';
          if (yAxisElement.hasAttribute('min')) {
            var minY = parseFloat(yAxisElement.getAttribute('min'));
            if (!isNaN(minY)) {
              this.setMinY(minY);
            }
          }
          if (yAxisElement.hasAttribute('max')) {
            var maxY = parseFloat(yAxisElement.getAttribute('max'));
            if (!isNaN(maxY)) {
              this.setMaxY(maxY);
            }
          }
        } else {
          // fallback mode when no special axis element is there, to still support old configs
          if (this._element.hasAttribute('y-format')) {
            yFormat = this._element.getAttribute('y-format');
          }
          ySettings.show = !this._element.hasAttribute('show-y-axis') || this._element.getAttribute('show-y-axis') === 'true';
        }
        this._yFormat = yFormat;
        var showGrid = this._element.hasAttribute('show-grid') ? this._element.getAttribute('show-grid') : 'xy';
        xSettings.showGrid = showGrid.includes('x');
        ySettings.showGrid = showGrid.includes('y');
        xAxis.set(xSettings);
        yAxis.set(ySettings);
        xAxis.render();
        yAxis.render();
      },
      _initChartContent: function _initChartContent() {
        var chartElements = [];
        var line = null;
        var area = null;
        var bar = null;
        var stackedBar = null;
        for (var key in this._datasets) {
          var ds = this._datasets[key];
          switch (ds.getChartType()) {
            case 'line':
              {
                if (!line) {
                  line = new cv.ui.structure.tile.components.chart.LineGroup(this);
                  chartElements.push(line);
                }
                line.addDataset(ds);
                if (ds.isShowArea()) {
                  if (!area) {
                    area = new cv.ui.structure.tile.components.chart.AreaGroup(this);
                    chartElements.push(area);
                  }
                  area.addDataset(ds);
                }
                break;
              }
            case 'area':
              {
                if (!area) {
                  area = new cv.ui.structure.tile.components.chart.AreaGroup(this);
                  chartElements.push(area);
                }
                area.addDataset(ds);
                break;
              }
            case 'bar':
              //barGroups.set(key, I.filter(i => this.data.keys[i] === key));
              if (!bar) {
                bar = new cv.ui.structure.tile.components.chart.BarGroup(this);
                chartElements.push(bar);
              }
              bar.addDataset(ds);
              break;
            case 'stacked-bar':
              if (!stackedBar) {
                stackedBar = new cv.ui.structure.tile.components.chart.StackedBarGroup(this);
                chartElements.push(stackedBar);
              }
              stackedBar.addDataset(ds);
              break;
          }
        }
        this._chartElements = chartElements;
      },
      _onLocaleChanged: function _onLocaleChanged() {
        this.__P_78_13();
        var popup = this._headerFooterParent.querySelector('div.popup.series');
        if (popup) {
          var _iterator3 = _createForOfIteratorHelper(popup.querySelectorAll('cv-option')),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var option = _step3.value;
              option.textContent = this._seriesToShort(option.getAttribute('key'));
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      },
      onStateUpdate: function onStateUpdate(ev) {
        var targetDataset = this._element.querySelector(':scope > dataset[src="' + ev.detail.target + '"]');
        var config = this._datasets ? this._datasets[ev.detail.target] : null;
        if (targetDataset && config) {
          var ts = Date.now();
          if (config.getAggregationInterval()) {
            var mins = config.getAggregationInterval() * 60 * 1000;
            ts = Math.round(ts / mins) * mins;
          }
          this._renderChart({
            src: ev.detail.target,
            key: ev.detail.target,
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
        if (!this._datasets) {
          // not yet initialized, skip
          return;
        }
        this._loaded = false;
        this.__P_78_0();
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
        this.__P_78_13();
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
          var newSelection = this.getHeader(".popup.series > cv-option[key='".concat(series, "']"));
          if (newSelection) {
            newSelection.setAttribute('selected', 'selected');
          }
        }
        this.__P_78_0();
      },
      __P_78_0: function __P_78_0() {
        if (this.isDisposed() || !this._element) {
          return;
        }
        var series = this.getCurrentSeries();
        var currentPeriod = this.getCurrentPeriod();
        var end = new Date();
        var periodStart = new Date();
        var interval = 0;
        switch (series) {
          case 'hour':
            interval = 3600;
            periodStart = d3.timeHour.floor(periodStart);
            periodStart = d3.timeHour.offset(periodStart, -currentPeriod);
            end = d3.timeHour.offset(periodStart, 1);
            break;
          case 'day':
            interval = 86400;
            periodStart = d3.timeDay.floor(periodStart);
            periodStart = d3.timeDay.offset(periodStart, -currentPeriod);
            end = d3.timeDay.offset(periodStart, 1);
            break;
          case 'week':
            interval = 604800;
            periodStart = d3.timeMonday.floor(periodStart);
            periodStart = d3.timeMonday.offset(periodStart, -currentPeriod);
            end = d3.timeMonday.offset(periodStart, 1);
            break;
          case 'month':
            interval = 2592000;
            periodStart = d3.timeMonth.floor(periodStart);
            periodStart = d3.timeMonth.offset(periodStart, -currentPeriod);
            end = d3.timeMonth.offset(periodStart, 1);
            break;
          case 'year':
            interval = 31536000;
            periodStart = d3.timeYear.floor(periodStart);
            periodStart = d3.timeYear.offset(periodStart, -currentPeriod);
            end = d3.timeYear.offset(periodStart, 1);
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
          if (!this.__P_78_11 || this.__P_78_10 !== client) {
            this.__P_78_14();
            this.__P_78_10 = client;
            this.__P_78_11 = function () {
              _this3.__P_78_11 = null;
              _this3.__P_78_10 = null;
              if (!_this3.isDisposed()) {
                _this3._loadData();
              }
            };
            client.addListenerOnce('changeConnected', this.__P_78_11, this);
          }
          return;
        }
        this.__P_78_14();
        var promises = [];
        var options = {
          ttl: this.getRefresh()
        };
        for (var key in this._datasets) {
          var ts = this._datasets[key];
          var p = ts.fetch(this.getStartTime(), this.getEndTime(), this.getCurrentSeries(), this.getCurrentPeriod(), options);
          promises.push(p);
        }
        Promise.all(promises).then(function (responses) {
          if (!_this3.isDisposed()) {
            _this3._onSuccess(responses.filter(function (r) {
              return r !== null;
            }));
          }
        });
      },
      _onSuccess: function _onSuccess(chartData) {
        var _this4 = this;
        // wait some time to let the element size settle
        this.__P_78_5 = setTimeout(function () {
          if (!_this4.isDisposed()) {
            // append all dataset fetched data to a single flat array
            _this4._onRendered(chartData.flat());
          }
        }, 100);
      },
      __P_78_14: function __P_78_14() {
        if (this.__P_78_10 && this.__P_78_11) {
          this.__P_78_10.removeListener('changeConnected', this.__P_78_11, this);
        }
        this.__P_78_10 = null;
        this.__P_78_11 = null;
      },
      _onRendered: function _onRendered(chartData, retries) {
        var _this5 = this;
        if (this.__P_78_5) {
          clearTimeout(this.__P_78_5);
          this.__P_78_5 = null;
        }
        if (this.isDisposed()) {
          return;
        }
        if (this.isVisible()) {
          var _this$_getSize = this._getSize(),
            _this$_getSize2 = _slicedToArray(_this$_getSize, 2),
            width = _this$_getSize2[0],
            height = _this$_getSize2[1];
          if ((width < 20 || height <= 10) && (!retries || retries <= 5)) {
            // this makes no sense
            this.__P_78_5 = setTimeout(function () {
              _this5._onRendered(chartData, retries > 0 ? retries + 1 : 1);
            }, 150);
          }
          if (width < 20 || height <= 10) {
            // do nothing, these values are invalid
            return;
          }
          this.setWidth(width);
          this.setHeight(height);
          if (chartData) {
            this._renderChart(chartData);
            this._loaded = Date.now();
          } else {
            this._render();
          }
        }
      },
      __P_78_12: function __P_78_12(isFullscreen) {
        var _this6 = this;
        if (this.__P_78_9) {
          window.cancelAnimationFrame(this.__P_78_9);
          this.__P_78_9 = null;
        }
        if (!isFullscreen && this.__P_78_8) {
          this._element.style.height = '';
          this.__P_78_8 = false;
        }
        if (isFullscreen) {
          this._onRendered();
          return;
        }
        this.__P_78_9 = window.requestAnimationFrame(function () {
          _this6.__P_78_9 = window.requestAnimationFrame(function () {
            _this6.__P_78_9 = null;
            if (!_this6.isDisposed()) {
              _this6._onRendered();
            }
          });
        });
      },
      _getSize: function _getSize() {
        var parent = this._element.parentElement;
        var padding = this.isInBackground() ? 0 : 8;
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
        var isFullscreenContainer = parent.localName === 'cv-popup' && parent.getAttribute('fullscreen') === 'true' || this._element.getAttribute('allow-fullscreen') === 'true' && parent.parentElement.classList.contains('fullscreen');
        if (isFullscreenContainer && (!this._element.style.height || this.__P_78_8)) {
          // the parent container has height: auto, so we need to have one
          this._element.style.height = height + this.getMarginTop() + this.getMarginBottom() + 'px';
          this.__P_78_8 = true;
        } else if (!isFullscreenContainer && this.__P_78_8) {
          this._element.style.height = '';
          this.__P_78_8 = false;
        }
        return [width, height];
      },
      multiTimeFormat: function multiTimeFormat() {
        var locale = cv.ui.structure.tile.components.Chart.TF;
        var formatMillisecond = locale.format(qx.locale.Manager.tr('.%L'));
        var formatSecond = locale.format(qx.locale.Manager.tr(':%S'));
        var formatMinute = locale.format(qx.locale.Manager.tr('%I:%M'));
        var formatHour = locale.format(qx.locale.Manager.tr('%I %p'));
        var formatDay = locale.format(qx.locale.Manager.tr('%a %d'));
        var formatWeek = locale.format(qx.locale.Manager.tr('%b %d'));
        var formatMonth = locale.format(qx.locale.Manager.tr('%b'));
        var formatYear = locale.format(qx.locale.Manager.tr('%Y'));
        /**
         * @param date
         */
        function multiFormat(date) {
          return (d3.timeSecond(date) < date ? formatMillisecond : d3.timeMinute(date) < date ? formatSecond : d3.timeHour(date) < date ? formatMinute : d3.timeDay(date) < date ? formatHour : d3.timeMonth(date) < date ? d3.timeWeek(date) < date ? formatDay : formatWeek : d3.timeYear(date) < date ? formatMonth : formatYear)(date);
        }
        return function (date) {
          return d3.timeFormat(multiFormat(date))(date);
        };
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
      getSvgElement: function getSvgElement(nodeName, classes, attributes) {
        return this._getSvgElement(d3.select(this._element).select('svg'), nodeName, classes, attributes);
      },
      getDataset: function getDataset(key) {
        return this._datasets[key];
      },
      _render: function _render() {
        // Render the chart elements without new data
        this.getXAxis().render();
        this.getYAxis().render();
        var _iterator4 = _createForOfIteratorHelper(this._chartElements),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var series = _step4.value;
            series.render();
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
        var zero = d3.select(this._element).select('svg').select('.zero-line');
        if (zero) {
          var _this$getXAxis$getRan = this.getXAxis().getRange(),
            _this$getXAxis$getRan2 = _slicedToArray(_this$getXAxis$getRan, 2),
            x1 = _this$getXAxis$getRan2[0],
            x2 = _this$getXAxis$getRan2[1];
          var y = this.getYPos(0.0, true);
          zero.attr('x1', x1).attr('x2', x2).attr('y1', y).attr('y2', y);
        }
        this.__P_78_15();
      },
      /**
       * @param data
       * @param {Boolean} single Add a single data point to the chart
       * @private
       */
      _renderChart: function _renderChart(data, single) {
        var xAxis = this.getXAxis();
        var yAxis = this.getYAxis();
        var svg = d3.select(this._element).select('svg');
        if (single) {
          if (!this.data.append(data)) {
            return;
          }
        } else {
          this.data.setData(data);
        }
        var hasStackedBar = this._chartElements.some(function (group) {
          return group.getType() === 'stacked-bar';
        });
        var hasBar = this._chartElements.some(function (group) {
          return group.getType() === 'bar';
        });

        // Compute default domains, and unique the z-domain.
        if (hasBar || hasStackedBar) {
          this.data.interpolate(this.getCurrentSeries());
        }
        xAxis.setDomain(this.data.getTimesDomain());
        if (this.overrideXScale) {
          this.overrideXScale.domain(this.data.getTimesDomain());
        }
        if (!this.getMinY() && !this.getMaxY() && !hasStackedBar) {
          yAxis.setDomain(this.data.getValuesDomain());
        }
        this._tooltipIndicator = svg.select('g.tooltip-indicator');
        var defaultTransition = d3.transition().duration(500).ease(d3.easeLinear);
        var _iterator5 = _createForOfIteratorHelper(this._chartElements),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var series = _step5.value;
            series.render(single ? undefined : defaultTransition);
          }

          // show zero line in grid for non-zero based charts
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
        if (this.data.getValuesDomain()[0] !== 0) {
          var targetContainer = this._chartElements.length > 0 ? this._chartElements[0].getContainer() : svg;
          var lineElem = targetContainer.select('.zero-line');
          if (lineElem.empty()) {
            lineElem = targetContainer.append('line').attr('class', 'zero-line').attr('stroke', 'currentColor').attr('stroke-opacity', '15%');
          }
          var _this$getXAxis$getRan3 = this.getXAxis().getRange(),
            _this$getXAxis$getRan4 = _slicedToArray(_this$getXAxis$getRan3, 2),
            x1 = _this$getXAxis$getRan4[0],
            x2 = _this$getXAxis$getRan4[1];
          var y = this.getYPos(0.0, true);
          lineElem.attr('x1', x1).attr('x2', x2).attr('y1', y).attr('y2', y);
        }

        // add fixed/calculated lines
        this.__P_78_15();

        // tooltipIndicator must be added last
        var tti = svg.select('g.tooltip-indicator');
        if (tti.empty()) {
          var _this$getYAxis$getRan = this.getYAxis().getRange(),
            _this$getYAxis$getRan2 = _slicedToArray(_this$getYAxis$getRan, 2),
            y1 = _this$getYAxis$getRan2[0],
            y2 = _this$getYAxis$getRan2[1];
          svg.append('g').attr('class', 'tooltip-indicator').attr('display', 'none').attr('stroke', 'currentColor').append('line').attr('x1', 0).attr('x2', 0).attr('y1', y1).attr('y2', y2);
          this._tooltipIndicator = svg.select('g.tooltip-indicator');
        }
      },
      __P_78_15: function __P_78_15() {
        var _this7 = this;
        var _loop = function _loop() {
            var ds = _this7._datasets[key];
            if (ds instanceof cv.ui.structure.tile.components.chart.LineDataset) {
              var targetContainer;
              var value = NaN;
              // handle line dataset
              var name = ds.getChartType();
              if (key.startsWith('fixed-')) {
                targetContainer = _this7._chartElements.length > 0 ? _this7._chartElements[0].getContainer() : null;
                if (name === 'h-line') {
                  value = parseFloat(ds.getValue());
                } else {
                  value = new Date(ds.getValue()).getTime();
                }
              } else {
                var targetGroup;
                var srcKey = key;
                var isLineKey = false;
                if (key.startsWith('derived-')) {
                  var derivedFrom = ds.getSourceSet();
                  srcKey = derivedFrom.getKey();
                } else {
                  isLineKey = !_this7.data.keys.includes(key);
                }
                targetGroup = _this7._chartElements.find(function (group) {
                  return group.hasDataset(srcKey);
                });
                targetContainer = targetGroup ? targetGroup.getContainer() : _this7._chartElements.length > 0 ? _this7._chartElements[0].getContainer() : null;
                var indices = isLineKey ? _this7.data.getLineIndicesForKey(srcKey) : _this7.data.getIndicesForKey(srcKey);
                if (targetContainer) {
                  if (!indices) {
                    _this7.error('no data found for key ' + srcKey);
                    return 0; // continue
                  }
                  if (name === 'h-line') {
                    var values = isLineKey ? _this7.data.lineValues : _this7.data.values;
                    // we can only do calculations for values on the Y-Axis for horizontal lines
                    switch (ds.getValue()) {
                      case 'avg':
                        {
                          var sum = 0.0;
                          var _iterator6 = _createForOfIteratorHelper(indices),
                            _step6;
                          try {
                            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                              var di = _step6.value;
                              sum += values[di];
                            }
                          } catch (err) {
                            _iterator6.e(err);
                          } finally {
                            _iterator6.f();
                          }
                          value = sum / indices.length;
                          break;
                        }
                      case 'max':
                        value = d3.max(values.filter(function (v, i) {
                          return indices.includes(i);
                        }, function (d) {
                          return d;
                        }));
                        break;
                      case 'min':
                        value = d3.min(values.filter(function (v, i) {
                          return indices.includes(i);
                        }, function (d) {
                          return d;
                        }));
                        break;
                      default:
                        _this7.error('unknown value calculation: ' + ds.getValue());
                        break;
                    }
                  } else {
                    value = isLineKey ? _this7.data.lineTimes[indices[0]] : _this7.data.times[indices[0]];
                  }
                }
              }
              if (!targetContainer) {
                return 0; // continue
              }
              var lineElem = targetContainer.select(".".concat(name, "-").concat(ds.getIndex()));
              if (isNaN(value) && !lineElem.empty()) {
                // remove line
                lineElem.remove();
                if (ds.getShowValue()) {
                  targetContainer.select(".".concat(name, "-value-").concat(ds.getIndex())).remove();
                }
              } else if (!isNaN(value)) {
                var valuecolor = ds.getValueColor();
                var lineColor = cv.util.Color.opacify(ds.getColor(), _this7.getDatasetOpacity());
                if (lineElem.empty()) {
                  lineElem = targetContainer.append('line').attr('class', "".concat(name, "-").concat(ds.getIndex())).attr('stroke', lineColor);
                }
                var formatAttribute = 'y-format';
                var x1;
                var x2;
                var y1;
                var y2 = 0;
                var xScale = _this7.overrideXScale || _this7.getXAxis().getScale();
                var yScale = _this7.getYAxis().getScale();
                if (name === 'h-line') {
                  var _this7$getXAxis$getRa = _this7.getXAxis().getRange();
                  var _this7$getXAxis$getRa2 = _slicedToArray(_this7$getXAxis$getRa, 2);
                  x1 = _this7$getXAxis$getRa2[0];
                  x2 = _this7$getXAxis$getRa2[1];
                  y1 = yScale(value);
                  y2 = y1;
                } else {
                  var _this7$getYAxis$getRa = _this7.getYAxis().getRange();
                  var _this7$getYAxis$getRa2 = _slicedToArray(_this7$getYAxis$getRa, 2);
                  y1 = _this7$getYAxis$getRa2[0];
                  y2 = _this7$getYAxis$getRa2[1];
                  x1 = xScale(value);
                  x2 = x1;
                  formatAttribute = 'x-format';
                }
                lineElem.attr('x1', x1).attr('x2', x2).attr('y1', y1).attr('y2', y2);
                if (ds.getShowValue()) {
                  var format = ds.getFormat() || (_this7._element.hasAttribute(formatAttribute) ? _this7._element.getAttribute(formatAttribute) : '%s');
                  var valueElem = targetContainer.select(".".concat(name, "-value-").concat(ds.getIndex()));
                  if (valueElem.empty()) {
                    valueElem = targetContainer.append('text').attr('class', "".concat(name, "-value-").concat(ds.getIndex())).attr('fill', valuecolor !== 'currentColor' ? valuecolor : lineColor).attr('font-size', '10').attr('text-anchor', 'start');
                  }
                  if (name === 'h-line') {
                    // show value on right side of the chart
                    valueElem.attr('x', x2 + 2).attr('y', y1 + 5).text(cv.util.String.sprintf(format, value));
                  } else {
                    // show value on top of the chart
                    valueElem.attr('x', x1 + 2).attr('y', y2).text(cv.ui.structure.tile.components.Chart.TF.format(qx.locale.Manager['tr'](format))(value));
                  }
                }
              }
            }
          },
          _ret;
        for (var key in this._datasets) {
          _ret = _loop();
          if (_ret === 0) continue;
        }
      },
      _onPointerEntered: function _onPointerEntered(ev) {
        var _this8 = this;
        if (this._loaded) {
          this.__P_78_2 = setTimeout(function () {
            _this8.__P_78_16(true, ev);
            _this8.__P_78_2 = null;
          }, 500);
        }
      },
      _onPointerLeft: function _onPointerLeft(ev) {
        if (this.__P_78_2) {
          clearTimeout(this.__P_78_2);
        }
        if (this._loaded) {
          if (ev.relatedTarget !== this._tooltip) {
            this.__P_78_16(false);
          }
        }
      },
      __P_78_16: function __P_78_16(val, ev) {
        this.__P_78_3 = val;
        if (val) {
          if (this._tooltipIndicator) {
            this._tooltipIndicator.attr('display', null);
            this._tooltipIndicator.raise();
          }
          this._tooltip.style.display = 'block';
          this._onPointerMoved(ev, true);
        } else {
          if (this._tooltipIndicator) {
            this._tooltipIndicator.attr('display', 'none');
          }
          var svg = this.getSvg();
          svg.node().value = null;
          svg.dispatch('input', {
            bubbles: true
          });
          this._tooltip.style.display = 'none';
        }
      },
      _onPointerMoved: function _onPointerMoved(event, center) {
        var _this9 = this;
        if (this._loaded && this.__P_78_3) {
          var xm = 0;
          var ym = 0;
          if (event) {
            var _d3$pointer = d3.pointer(event);
            var _d3$pointer2 = _slicedToArray(_d3$pointer, 2);
            xm = _d3$pointer2[0];
            ym = _d3$pointer2[1];
          } else if (center) {
            xm = this.getWidth() / 2;
            ym = this.getHeight() / 2;
          } else {
            return;
          }

          // closest point on x-axis
          var indices = this.data.lineIndices.length > 0 ? this.data.lineIndices : this.data.indices;
          var i = d3.least(indices, function (i) {
            var pos = _this9.getXPos(i);
            if (pos === undefined) {
              return Number.MAX_VALUE;
            }
            return Math.abs(pos - xm);
          });
          var scaleFactorX = this._element.offsetWidth / this.getWidth();
          var scaleFactorY = this._element.offsetHeight / this.getHeight();
          var xOffset = 0;
          var key = this.data.keys[i];
          var time = this.data.times[i];
          var dataset = this._datasets[key];
          if (dataset) {
            if (dataset.getChartType() === 'bar' || dataset.getChartType() === 'stacked-bar') {
              // find the bar group for this dataset
              var barGroup = this._chartElements.find(function (group) {
                return group.hasDataset(key);
              });
              xOffset = barGroup ? barGroup.getBandWidth() / 2 : 0;
            }
          }
          if (this._tooltipIndicator) {
            this._tooltipIndicator.attr('transform', "translate(".concat(this.getXPos(i) + xOffset, ",0)"));
          }
          var cursorOffset = event && event.pointerType === 'mouse' ? 16 : 40;
          var timeString = this._tooltipTimeFormat ? this._tooltipTimeFormat(new Date(time)) : this.getXAxis().getTickFormat()(new Date(time));
          var valueStrings = [];
          // collect all y values for this time
          var otherYIndices = this.data.values.map(function (_, index) {
            return index;
          }).filter(function (index) {
            return _this9.data.times[index] === time;
          });
          var _iterator7 = _createForOfIteratorHelper(otherYIndices),
            _step7;
          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var v = _step7.value;
              var k = this.data.keys[v];
              var ds = this._datasets[k];
              var lt = ds && ds.getTitle() ? "<span style='color: ".concat(ds.getColor(), "; font-weight: bold;'>| </span><i>").concat(ds.getTitle(), ":</i> ") : '';
              valueStrings.push(lt + cv.util.String.sprintf(this._yFormat, this.data.values[v]));
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
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
          this._tooltip.innerHTML = "<strong>".concat(timeString, "</strong><br/>").concat(valueStrings.join('<br/>'));
          this._tooltip.style.left = left + 'px';
          this._tooltip.style.top = top + 'px';
          d3.select(this._element).select('svg').property('value', this.data.data[i]).dispatch('input', {
            bubbles: true
          });
        }
      },
      getSvg: function getSvg() {
        return d3.select(this._element).select('svg');
      },
      /**
       * Retrieves the dataset opacity as a hexadecimal string based on the 'dataset-opacity' attribute.
       * The attribute value should be an integer between 0 and 99 (inclusive), representing the opacity percentage.
       * Converts the percentage to a value between 0x00 and 0xFF (0-255) and returns it as a hexadecimal string.
       * Returns null if the attribute is not present or the value is invalid.
       *
       * @returns {string|null} The opacity as a hexadecimal string, or null if not set or invalid.
       */
      getDatasetOpacity: function getDatasetOpacity() {
        if (this._element.hasAttribute('dataset-opacity')) {
          var parsedOpacity = parseInt(this._element.getAttribute('dataset-opacity'));
          if (!isNaN(parsedOpacity) && parsedOpacity >= 0 && parsedOpacity <= 100) {
            return Math.round(2.55 * parsedOpacity).toString(16);
          }
        }
        return null;
      },
      __P_78_13: function __P_78_13() {
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
      _disconnected: function _disconnected() {
        cv.ui.structure.tile.components.Chart.superclass.prototype._disconnected.call(this);
        this.__P_78_14();
        qx.locale.Manager.getInstance().removeListener('changeLocale', this._onLocaleChanged, this);
        if (this.__P_78_5) {
          clearTimeout(this.__P_78_5);
          this.__P_78_5 = null;
        }
        if (this.__P_78_9) {
          window.cancelAnimationFrame(this.__P_78_9);
          this.__P_78_9 = null;
        }
        if (this.__P_78_2) {
          clearTimeout(this.__P_78_2);
          this.__P_78_2 = null;
        }
        if (cv.Config.unitTesting && this._datasets) {
          this._disposeMap('_datasets');
          this._datasets = {};
        }
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._disposeMap('_datasets');
      this.__P_78_14();
      qx.locale.Manager.getInstance().removeListener('changeLocale', this._onLocaleChanged, this);
      if (this.__P_78_5) {
        clearTimeout(this.__P_78_5);
        this.__P_78_5 = null;
      }
      if (this.__P_78_9) {
        window.cancelAnimationFrame(this.__P_78_9);
        this.__P_78_9 = null;
      }
      if (this.__P_78_2) {
        clearTimeout(this.__P_78_2);
        this.__P_78_2 = null;
      }
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

//# sourceMappingURL=Chart.js.map?dt=1782705770473