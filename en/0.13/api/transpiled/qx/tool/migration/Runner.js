function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
        "require": true
      },
      "qx.tool.config.Utils": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2021 The authors
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (info@bibliograph.org, @cboulanger)
  
  ************************************************************************ */
  var process = require("process");
  var semver = require("semver");

  /**
   * Runs all available migrations
   */
  qx.Class.define("qx.tool.migration.Runner", {
    extend: qx.core.Object,
    properties: {
      /**
       * Whether to apply the migrations (false) or just announce them (true)
       */
      dryRun: {
        check: "Boolean",
        init: false
      },
      /**
       * Whether to log additional output for debugging
       */
      verbose: {
        check: "Boolean",
        init: false
      },
      /**
       * The maximum qooxdoo version for which the migration class should be applicable
       */
      qxVersion: {
        check: "String",
        validate: function validate(version) {
          return semver.valid(version);
        },
        nullable: true
      }
    },
    members: {
      /**
       * Instantiates all migration classes in the `qx.tool.migration` namespace which
       * match the version of the current application, and runs all methods of
       * these instances that start with "migrate".
       *
       * The methods must return an object with two numeric properties, `applied`
       * containing the number of migrations that have been applied, `pending`
       * containing the number of those that still have to be applied (for example,
       * after a dry-run).
       *
       * @return {Promise<{applied, pending}>}
       */
      runMigrations: function runMigrations() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var qxVersion, appQxVersion, migrationClasses, applied, pending, _iterator, _step, _loop, _t2;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                _context2.n = 1;
                return qx.tool.config.Utils.getQxVersion();
              case 1:
                qxVersion = _context2.v;
                _context2.n = 2;
                return qx.tool.config.Utils.getAppQxVersion();
              case 2:
                appQxVersion = _context2.v;
                _this.debug("".concat(_this.getDryRun() ? "Checking" : "Running", " migrations for app qx version ").concat(appQxVersion, " and current qooxdoo version ").concat(qxVersion));
                migrationClasses = Object.getOwnPropertyNames(qx.tool.migration).filter(function (clazz) {
                  return clazz.match(/^M[0-9_]+$/);
                }).map(function (clazz) {
                  return qx.Class.getByName("qx.tool.migration." + clazz);
                });
                applied = 0;
                pending = 0;
                _iterator = _createForOfIteratorHelper(migrationClasses);
                _context2.p = 3;
                _loop = /*#__PURE__*/_regenerator().m(function _loop() {
                  var Clazz, migrationInstance, migrationVersion, qxVersion, skip, migrationMethods, _iterator2, _step2, method, previousApplied, previousPending, _t;
                  return _regenerator().w(function (_context) {
                    while (1) switch (_context.p = _context.n) {
                      case 0:
                        Clazz = _step.value;
                        migrationInstance = new Clazz(_this);
                        migrationVersion = migrationInstance.getVersion();
                        qxVersion = _this.getQxVersion();
                        _this.debug(">>> Migration version: ".concat(migrationVersion, ", maximum qx version: ").concat(qxVersion));
                        skip = appQxVersion && !semver.lt(appQxVersion, migrationVersion) || qxVersion && semver.gt(migrationVersion, qxVersion);
                        if (skip) {
                          _this.debug(">>> Skipping migration ".concat(Clazz.classname, "."));
                        } else {
                          _this.debug(">>> Running migration ".concat(Clazz.classname, "..."));
                        }
                        if (!skip) {
                          _context.n = 1;
                          break;
                        }
                        return _context.a(2, 1);
                      case 1:
                        migrationMethods = Object.getOwnPropertyNames(Clazz.prototype).filter(function (key) {
                          return key.startsWith("migrate");
                        }).filter(function (key) {
                          return typeof Clazz.prototype[key] == "function";
                        });
                        _iterator2 = _createForOfIteratorHelper(migrationMethods);
                        _context.p = 2;
                        _iterator2.s();
                      case 3:
                        if ((_step2 = _iterator2.n()).done) {
                          _context.n = 6;
                          break;
                        }
                        method = _step2.value;
                        previousApplied = migrationInstance.getApplied();
                        previousPending = migrationInstance.getPending();
                        _context.n = 4;
                        return migrationInstance[method]();
                      case 4:
                        _this.debug(">>> - ".concat(method, ": ").concat(migrationInstance.getApplied() - previousApplied, " applied/").concat(migrationInstance.getPending() - previousPending, " pending"));
                      case 5:
                        _context.n = 3;
                        break;
                      case 6:
                        _context.n = 8;
                        break;
                      case 7:
                        _context.p = 7;
                        _t = _context.v;
                        _iterator2.e(_t);
                      case 8:
                        _context.p = 8;
                        _iterator2.f();
                        return _context.f(8);
                      case 9:
                        applied += migrationInstance.getApplied();
                        pending += migrationInstance.getPending();
                        _this.debug(">>> Done with ".concat(Clazz.classname, ": ").concat(applied, " migrations applied, ").concat(pending, " migrations pending."));
                      case 10:
                        return _context.a(2);
                    }
                  }, _loop, null, [[2, 7, 8, 9]]);
                });
                _iterator.s();
              case 4:
                if ((_step = _iterator.n()).done) {
                  _context2.n = 7;
                  break;
                }
                return _context2.d(_regeneratorValues(_loop()), 5);
              case 5:
                if (!_context2.v) {
                  _context2.n = 6;
                  break;
                }
                return _context2.a(3, 6);
              case 6:
                _context2.n = 4;
                break;
              case 7:
                _context2.n = 9;
                break;
              case 8:
                _context2.p = 8;
                _t2 = _context2.v;
                _iterator.e(_t2);
              case 9:
                _context2.p = 9;
                _iterator.f();
                return _context2.f(9);
              case 10:
                return _context2.a(2, {
                  applied: applied,
                  pending: pending
                });
            }
          }, _callee, null, [[3, 8, 9, 10]]);
        }))();
      }
    }
  });
  qx.tool.migration.Runner.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Runner.js.map?dt=1778272845332