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
      "qx.tool.utils.Json": {},
      "qx.tool.utils.Utils": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2018 Zenesis Ltd
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (john.spackman@zenesis.com, @johnspackman)
  
  ************************************************************************ */

  var path = require("path");

  /**
   * Controls access to the local configuration
   */
  qx.Class.define("qx.tool.cli.ConfigDb", {
    extend: qx.core.Object,
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_472_0 = {};
    },
    properties: {
      path: {
        nullable: false,
        check: "String",
        apply: "_applyPath"
      }
    },
    members: {
      __P_472_1: null,
      __P_472_0: null,
      /**
       * Apply for path property
       * @returns
       */
      _applyPath: function _applyPath(value, oldValue) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _this.__P_472_1 = {};
              case 1:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      /**
       * Loads the configuration
       */
      load: function load() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var _t;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _context2.n = 1;
                return qx.tool.utils.Json.loadJsonAsync(_this2.getPath());
              case 1:
                _t = _context2.v;
                if (_t) {
                  _context2.n = 2;
                  break;
                }
                _t = {};
              case 2:
                _this2.__P_472_1 = _t;
              case 3:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      /**
       * Saves the configuration
       */
      save: function save() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                _context3.n = 1;
                return qx.tool.utils.Utils.makeParentDir(_this3.getPath());
              case 1:
                _context3.n = 2;
                return qx.tool.utils.Json.saveJsonAsync(_this3.getPath(), _this3.__P_472_1);
              case 2:
                return _context3.a(2);
            }
          }, _callee3);
        }))();
      },
      /**
       * Sets a temporary override
       */
      setOverride: function setOverride(key, value) {
        if (value === undefined) {
          delete this.__P_472_0[key];
        } else {
          this.__P_472_0[key] = value;
        }
      },
      /**
       * Returns the database root.  If the `path` parameter is provided, this will try and locate it;
       * if `defaultValue` is provided then it will create the object and also any intermediate objects
       * along the way.  If `path` is not returned, then the root object is returned
       *
       * @param path {String?} optional path into the database; note array subscripts are not supported
       * @param defaultValue {Object?} optional value to assign if it does not exist.
       * @return {Object?} the value
       */
      db: function db(path, defaultValue) {
        if (path) {
          var override = this.__P_472_0[path];
          if (override) {
            return override;
          }
          var result = this.__P_472_1;
          var segs = path.split(".");
          for (var i = 0; i < segs.length; i++) {
            var seg = segs[i];
            var tmp = result[seg];
            if (tmp === undefined) {
              if (defaultValue === undefined) {
                return undefined;
              }
              if (i == segs.length - 1) {
                tmp = result[seg] = defaultValue;
              } else {
                tmp = result[seg] = {};
              }
            }
            result = tmp;
          }
          return result;
        }
        return this.__P_472_1;
      }
    },
    defer: function defer(statics) {
      statics.__P_472_2 = path.join(require("os").homedir(), ".qooxdoo/");
    },
    statics: {
      /** Singleton default instance */
      __P_472_3: null,
      /** The directory where config files (any any other temporary/cached data) is kept */
      __P_472_2: null,
      /**
       * Gets the default instance of ConfigDb, loaded with the global config
       *
       * @returns {ConfigDb}
       */
      getInstance: function getInstance() {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var db;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                db = qx.tool.cli.ConfigDb.__P_472_3;
                if (db) {
                  _context4.n = 1;
                  break;
                }
                db = qx.tool.cli.ConfigDb.__P_472_3 = new qx.tool.cli.ConfigDb();
                db.setPath(path.join(qx.tool.cli.ConfigDb.getDirectory(), "config.json"));
                _context4.n = 1;
                return db.load();
              case 1:
                return _context4.a(2, db);
            }
          }, _callee4);
        }))();
      },
      /**
       * Returns the local directory, where cache and configuration are kept
       */
      getDirectory: function getDirectory() {
        return this.__P_472_2;
      },
      /**
       * Wrapper for non-static version of db
       *
       * @see qx.tool.cli.ConfigDb.db
       */
      db: function db(path, defaultValue) {
        return qx.tool.cli.ConfigDb.getInstance().db(path, defaultValue);
      }
    }
  });
  qx.tool.cli.ConfigDb.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ConfigDb.js.map?dt=1782967160601