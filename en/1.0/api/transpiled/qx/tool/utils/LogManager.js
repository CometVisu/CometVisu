function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.tool.utils.Logger": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.tool.utils.Json": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
   *
   *    qooxdoo-compiler - node.js based replacement for the Qooxdoo python
   *    toolchain
   *
   *    https://github.com/qooxdoo/qooxdoo
   *
   *    Copyright:
   *      2011-2017 Zenesis Limited, http://www.zenesis.com
   *
   *    License:
   *      MIT: https://opensource.org/licenses/MIT
   *
   *      This software is provided under the same licensing terms as Qooxdoo,
   *      please see the LICENSE file in the Qooxdoo project's top-level directory
   *      for details.
   *
   *    Authors:
   *      * John Spackman (john.spackman@zenesis.com, @johnspackman)
   *
   *
   * *********************************************************************** */

  /**
   * @require(qx.tool.utils.Logger)
   */

  var LEVELS = ["trace", "debug", "info", "warn", "error", "fatal"];
  function zeropad2(val) {
    if (val < 10) {
      return "0" + val;
    }
    return String(val);
  }
  function zeropad3(val) {
    if (val < 10) {
      return "00" + val;
    }
    if (val < 100) {
      return "0" + val;
    }
    return String(val);
  }
  var PADDING = "";
  function padding(minLen) {
    while (PADDING.length < minLen) {
      PADDING += "     ";
    }
    return PADDING;
  }
  function rpad(str, len) {
    str = String(str);
    if (str.length < len) {
      str = (str + padding(len)).substring(0, len);
    }
    return str;
  }
  qx.Class.define("qx.tool.utils.LogManager", {
    extend: qx.core.Object,
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      var t = this;
      this._loggers = {};
      this._levels = {};
      this._sinks = [];
      this._config = {};
      this._defaultSink = qx.tool.utils.LogManager.consoleSink;
      this.addSink(this._defaultSink);
      LEVELS.forEach(function (levelId, index) {
        t._levels[levelId] = index;
      });
      this._defaultLevel = this._levels.info;
    },
    statics: {
      __P_525_0: null,
      /**
       * create a logger for a specified category
       *
       * @param {*} categoryName
       */
      createLog: function createLog(categoryName) {
        if (!categoryName) {
          categoryName = "generic";
        }
        return this.getInstance().getLogger(categoryName);
      },
      /**
       * Returns the global instance
       * @returns {null}
       */
      getInstance: function getInstance() {
        if (!this.__P_525_0) {
          this.__P_525_0 = new qx.tool.utils.LogManager();
        }
        return this.__P_525_0;
      },
      nullSink: function nullSink(logger, level, msg) {
        // Nothing
      },
      consoleSink: function consoleSink(logger, level, msg) {
        var dt = new Date();
        var str = dt.getFullYear() + "-" + zeropad2(dt.getMonth() + 1) + "-" + zeropad2(dt.getDate()) + " " + zeropad2(dt.getHours()) + ":" + zeropad2(dt.getMinutes()) + ":" + zeropad2(dt.getSeconds()) + "." + zeropad3(dt.getMilliseconds());
        console.log(str + " [" + rpad(level, 5) + "] " + rpad(logger.getId(), 15, true) + " " + msg);
      }
    },
    members: {
      loadConfig: function loadConfig(config) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var t, id, logger;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                if (!(typeof config == "string")) {
                  _context.n = 2;
                  break;
                }
                _context.n = 1;
                return qx.tool.utils.Json.loadJsonAsync(config);
              case 1:
                config = _context.v;
              case 2:
                t = _this;
                _this._config = config;
                _this._defaultLevel = _this.getLoggerLevel("__default__", "info");
                for (id in _this._loggers) {
                  logger = _this._loggers[id];
                  logger.setMinLevel(t.getLoggerLevel(logger.getId()));
                }
              case 3:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      getLogger: function getLogger(id) {
        var logger = this._loggers[id];
        if (!logger) {
          logger = this._loggers[id] = new qx.tool.utils.Logger(id, this.getLoggerLevel(id));
        }
        return logger;
      },
      getLoggerLevel: function getLoggerLevel(id, defaultLevel) {
        var cat = this._config && this._config.categories && this._config.categories[id];
        var level = cat && cat.level;
        if (level) {
          level = this._levels[level];
        }
        if (typeof level == "number") {
          return level;
        }
        if (defaultLevel) {
          return this._levels[defaultLevel];
        }
        return this._defaultLevel;
      },
      addSink: function addSink(sink) {
        this._sinks.push(sink);
      },
      removeSink: function removeSink(sink) {
        var index = this._sinks.indexOf(sink);
        if (index > -1) {
          this._sinks.splice(index, 1);
        }
      },
      output: function output(logger, level, msg) {
        if (typeof level != "string") {
          level = LEVELS[level];
        }
        this._sinks.forEach(function (sink) {
          sink.call(this, logger, level, msg);
        });
      },
      setDefaultSink: function setDefaultSink(sink) {
        var oldSink = this._defaultSink;
        if (this._defaultSink) {
          this.removeSink(this._defaultSink);
        }
        this._defaultSink = sink;
        if (sink) {
          this.addSink(sink);
        }
        return oldSink;
      }
    }
  });
  qx.tool.utils.LogManager.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=LogManager.js.map?dt=1782705795974