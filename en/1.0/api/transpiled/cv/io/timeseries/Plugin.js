function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.io.timeseries.AbstractTimeSeriesSource": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /*
   * Copyright (c) 2024-2026, Christian Mayer and the CometVisu contributors.
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
   *
   */

  /**
   * Base class for plugins that can be used as time series sources.
   * @since 2024
   * @author Tobias Bräutigam
   */
  qx.Class.define('cv.io.timeseries.Plugin', {
    extend: cv.io.timeseries.AbstractTimeSeriesSource,
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      _registry: {},
      _waitingForType: {},
      registerPlugin: function registerPlugin(type, clazz) {
        this._registry[type] = clazz;
        if (cv.io.timeseries.Plugin._waitingForType[type]) {
          var _iterator = _createForOfIteratorHelper(cv.io.timeseries.Plugin._waitingForType[type]),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var entry = _step.value;
              var instance = entry.instance;
              clearTimeout(entry.timeout);
              instance.init();
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          delete cv.io.timeseries.Plugin._waitingForType[type];
        }
      },
      clearWaiting: function clearWaiting() {
        for (var type in cv.io.timeseries.Plugin._waitingForType) {
          var _iterator2 = _createForOfIteratorHelper(cv.io.timeseries.Plugin._waitingForType[type]),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var entry = _step2.value;
              clearTimeout(entry.timeout);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          delete cv.io.timeseries.Plugin._waitingForType[type];
        }
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _plugin: null,
      init: function init() {
        if (!this._initialized) {
          this._init();
        }
      },
      _init: function _init() {
        var config = this.getConfig();
        if (!Object.prototype.hasOwnProperty.call(cv.io.timeseries.Plugin._registry, config.subType)) {
          if (!cv.io.timeseries.Plugin._waitingForType[config.subType]) {
            cv.io.timeseries.Plugin._waitingForType[config.subType] = [];
          }
          cv.io.timeseries.Plugin._waitingForType[config.subType].push({
            instance: this,
            timeout: setTimeout(function () {
              throw new Error('Unknown plugin type: ' + config.subType);
            }, 1000)
          });
          return;
        }
        this._initialized = true;
        this._plugin = new cv.io.timeseries.Plugin._registry[config.subType](config, this._chart);
      },
      /**
       * Options to configure the builtin fetch function.
       *
       * @typedef {object} FetchRequestConfig
       * @property {string} url The URL to fetch the data from
       * @property {object} options Further options for the fetch request
       * @property {boolean} proxy If the request should be proxied
       */
      /**
       * Disables the builtin fetch function and calls the plugins fetchData method instead.
       *
       * @typedef {object} OwnFetchRequestConfig
       * @property {boolean} fetch Disables the builtin fetch function
       */
      /**
       * Generate the request configuration for the chart component or disable it if the plugin
       * fetches the data itself.
       * @param {number} start start time as unix timestamp
       * @param {number} end end time as unix timestamp
       * @param {string} series series name e.g. 'day', 'month', 'year'
       * @param {number} offset series offset, can be used together with series to calculate the start date e.g. series: day, offset: 1 -> start = end - 1 day
       * @returns {FetchRequestConfig|OwnFetchRequestConfig}
       */
      getRequestConfig: function getRequestConfig(start, end, series, offset) {
        return this._plugin.getRequestConfig(start, end, series, offset);
      },
      /**
       * If the plugin request the data from an external source this function is called.
       * getRequestConfig() must return {fetch: false} to disable the charts builtin data fetching and
       * call this function instead.
       * @param {number} start start time as unix timestamp
       * @param {number} end end time as unix timestamp
       * @param {string} series series name e.g. 'day', 'month', 'year'
       * @param {number} offset series offset, can be used together with series to calculate the start date e.g. series: day, offset: 1 -> start = end - 1 day
       * @returns {Promise<*>}
       */
      fetchData: function fetchData(start, end, series, offset) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                return _context.a(2, _this._plugin.fetchData(start, end, series, offset));
            }
          }, _callee);
        }))();
      },
      /**
       * Process the response data before it is used in the chart.
       * If the plugin has a processResponse method it will be used.
       * @param {any} data
       * @returns {any}
       */
      processResponse: function processResponse(data) {
        if (this._plugin && typeof this._plugin.processResponse === 'function') {
          return this._plugin.processResponse(data);
        }
        return data;
      }
    }
  });
  cv.io.timeseries.Plugin.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Plugin.js.map?dt=1782705765415