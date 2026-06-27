function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "cv.util.MStringTransforms": {
        "require": true
      },
      "cv.io.timeseries.AbstractTimeSeriesSource": {},
      "cv.io.Fetch": {},
      "cv.io.BackendConnections": {},
      "cv.io.timeseries.FluxSource": {},
      "cv.ConfigCache": {},
      "cv.io.timeseries.OpenhabPersistenceSource": {},
      "cv.io.timeseries.RRDSource": {},
      "cv.io.timeseries.DemoSource": {},
      "cv.io.timeseries.Plugin": {},
      "cv.core.notifications.Router": {},
      "qx.locale.Manager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Dataset.js
   *
   * Copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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

  qx.Class.define('cv.ui.structure.tile.components.chart.Dataset', {
    extend: qx.core.Object,
    include: [cv.util.MStringTransforms],
    /**
     * 
     * @param {HTMLElement} element 
     * @param {cv.ui.structure.tile.components.Chart} chart
     */
    construct: function construct(element, chart) {
      qx.core.Object.constructor.call(this);
      this._element = element;
      this._chart = chart;
      this._init();
    },
    properties: {
      src: {
        check: 'String',
        init: ''
      },
      key: {
        check: 'String',
        init: ''
      },
      chartType: {
        check: ['line', 'bar', 'stacked-bar', 'h-line', 'v-line'],
        init: 'line'
      },
      type: {
        check: ['flux', 'openhab', 'rrd', 'demo', 'plugin'],
        nullable: true,
        apply: '_applyType'
      },
      subType: {
        check: 'String',
        init: ''
      },
      showArea: {
        check: 'Boolean',
        init: false,
        transform: '_parseBoolean'
      },
      color: {
        check: 'String',
        init: '#FF9900',
        event: 'colorChanged'
      },
      title: {
        check: 'String',
        init: ''
      },
      curve: {
        check: ['linear', 'step', 'basis', 'natural'],
        init: 'linear'
      },
      aggregationInterval: {
        check: 'Number',
        init: 0
      },
      source: {
        check: 'cv.io.timeseries.AbstractTimeSeriesSource',
        init: null
      },
      gradient: {
        check: 'Boolean',
        init: false,
        transform: '_parseBoolean'
      },
      showValue: {
        check: 'Boolean',
        init: true,
        transform: '_parseBoolean'
      }
    },
    members: {
      /*
      * @type {HTMLElement}
      */
      _element: null,
      /*
      * @type {cv.ui.structure.tile.components.Chart}
      */
      _chart: null,
      __P_91_0: null,
      _lastRefresh: null,
      /**
       * Load data from the source
       * @param start {Date} start time
       * @param end {Date?} optional end time, if not set its "now"
       * @param series {'hour'|'day'|'week'|'month'|'year'}
       * @param offset {Number} series offset
       * @param {*} options 
       * @returns {Promise<Array>}
       */
      fetch: function fetch(start, end, series, offset, options) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var source, config, url, proxy;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                source = _this.getSource();
                if (source) {
                  _context.n = 1;
                  break;
                }
                return _context.a(2, []);
              case 1:
                config = source.getRequestConfig(start, end, series, offset);
                url = config.url;
                proxy = config.proxy;
                options = Object.assign({}, options, config.options);
                if (!(config.fetch === false)) {
                  _context.n = 2;
                  break;
                }
                return _context.a(2, source.fetchData(start, end, series, offset).then(function (data) {
                  _this.debug('data successfully loaded by source');
                  if (source) {
                    data = source.processResponse(data);
                  }
                  _this._lastRefresh = Date.now();
                  return _this._convertData(data || []);
                })["catch"](function (err) {
                  _this._onStatusError(url, err);
                  return [];
                }));
              case 2:
                if (!url) {
                  _context.n = 3;
                  break;
                }
                _this.debug('loading', url);
                return _context.a(2, cv.io.Fetch.cachedFetch(url, options, proxy, cv.io.BackendConnections.getClient()).then(function (data) {
                  _this.debug('successfully loaded', url);
                  if (source) {
                    data = source.processResponse(data);
                  }
                  _this._lastRefresh = Date.now();
                  return _this._convertData(data);
                })["catch"](function (err) {
                  _this._onStatusError(url, err);
                  return [];
                }));
              case 3:
                return _context.a(2, []);
            }
          }, _callee);
        }))();
      },
      _init: function _init() {
        var attr;
        var name;
        var value;
        for (var i = 0; i < this._element.attributes.length; i++) {
          attr = this._element.attributes.item(i);
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
          this.set(name, value);
        }
        var type = this.getSrc().split('://')[0].toLowerCase();
        if (type.startsWith('plugin+')) {
          this.setSubType(type.substring(7));
          type = type.substring(0, 6);
        }
        if (type !== '') {
          this.setType(type);
        } else {
          this.resetType();
        }
      },
      _applyType: function _applyType(type) {
        var src = this.getSrc();
        var key = src;
        var source = null;
        switch (type) {
          case 'flux':
            source = new cv.io.timeseries.FluxSource(src, this._chart);
            if (source.isInline()) {
              var fluxQuery = this._element.textContent.trim();
              key = cv.ConfigCache.hashCode(fluxQuery).toString();
              source.setQueryTemplate(fluxQuery);
            }
            break;
          case 'openhab':
            source = new cv.io.timeseries.OpenhabPersistenceSource(src, this._chart);
            break;
          case 'rrd':
            source = new cv.io.timeseries.RRDSource(src, this._chart._chart);
            break;
          case 'demo':
            source = new cv.io.timeseries.DemoSource(src, this);
            break;
          case 'plugin':
            source = new cv.io.timeseries.Plugin(src, this._chart);
            break;
          default:
            this.error('unknown chart data source type ' + type);
            break;
        }
        this.setKey(key);
        this.setSource(source);
      },
      _onStatusError: function _onStatusError(key, err) {
        cv.core.notifications.Router.dispatchMessage('cv.charts.error', {
          title: qx.locale.Manager.tr('Communication error'),
          severity: 'urgent',
          message: qx.locale.Manager.tr('URL: %1<br/><br/>Response:</br>%2', JSON.stringify(key), JSON.stringify(err))
        });
        this.error('Chart _onStatusError', this, key, err);
      },
      _convertData: function _convertData(data) {
        var _this2 = this;
        var mins = this.getAggregationInterval() > 0 ? this.getAggregationInterval() * 60 * 1000 : 0;
        return data.filter(function (e) {
          return e !== null;
        }).map(function (e) {
          var _e = _slicedToArray(e, 2),
            time = _e[0],
            value = _e[1];
          return {
            key: _this2.getKey(),
            src: _this2.getSrc(),
            time: mins > 0 ? Math.round(time / mins) * mins : time,
            value: value
          };
        });
      },
      elementName: function elementName() {
        return this._element.localName;
      }
    },
    destruct: function destruct() {
      var source = this.getSource();
      if (source && source.dispose && (!source.isDisposed || !source.isDisposed())) {
        source.dispose();
      }
      this._chart = null;
      this._element = null;
    }
  });
  cv.ui.structure.tile.components.chart.Dataset.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Dataset.js.map?dt=1782595049737