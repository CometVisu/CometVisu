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
      "qx.tool.cli.commands.Package": {
        "require": true
      },
      "qx.tool.cli.commands.package.Update": {},
      "qx.tool.cli.commands.package.List": {},
      "qx.tool.compiler.Console": {},
      "qx.tool.cli.commands.package.Install": {},
      "qx.lang.Type": {},
      "qx.tool.utils.Utils": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
     2017-2021 Christian Boulanger
  
     License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.
  
     Authors:
     * Christian Boulanger (info@bibliograph.org, @cboulanger)
  
  ************************************************************************ */

  var semver = require("semver");

  /**
   * Lists compatible library packages
   */
  qx.Class.define("qx.tool.cli.commands.package.Upgrade", {
    extend: qx.tool.cli.commands.Package,
    statics: {
      getYargsCommand: function getYargsCommand() {
        return {
          command: "upgrade [library_uri]",
          describe: "if no library URI is given, upgrades all available libraries to the latest compatible version, otherwise upgrade only the package identified by the URI.",
          builder: {
            quiet: {
              alias: "q",
              describe: "No output"
            },
            verbose: {
              alias: "v",
              describe: "Verbose logging"
            },
            "releases-only": {
              alias: "r",
              describe: "Upgrade regular releases only (this leaves versions based on branches, commits etc. untouched)",
              "default": true
            },
            reinstall: {
              alias: "R",
              describe: "Do not upgrade, reinstall current version"
            },
            prereleases: {
              alias: "p",
              describe: "Use prereleases if available"
            },
            "dry-run": {
              alias: "d",
              describe: "Show result only, do not actually upgrade"
            },
            "qx-version": {
              check: function check(argv) {
                return semver.valid(argv.qxVersion);
              },
              describe: "A semver string. If given, the qooxdoo version for which to upgrade the package"
            }
          }
        };
      }
    },
    members: {
      /**
       * Process the command
       * @return {Promise<void>}
       */
      process: function process() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var qxVersion, data, found, installer, _iterator, _step, library, _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                _context.n = 1;
                return qx.tool.cli.commands["package"].Upgrade.superclass.prototype.process.call(_this);
              case 1:
                _context.n = 2;
                return _this.getAppQxVersion();
              case 2:
                qxVersion = _context.v;
                _context.n = 3;
                return new qx.tool.cli.commands["package"].Update({
                  quiet: true,
                  prereleases: _this.argv.prereleases
                }).process();
              case 3:
                _context.n = 4;
                return new qx.tool.cli.commands["package"].List({
                  quiet: true,
                  prereleases: _this.argv.prereleases,
                  qxVersion: qxVersion
                }).process();
              case 4:
                if (!_this.argv.quiet) {
                  qx.tool.compiler.Console.info("Upgrading project dependencies to the latest available release for qooxdoo version ".concat(qxVersion, ":"));
                }
                _context.n = 5;
                return _this.getLockfileData();
              case 5:
                data = _context.v;
                found = false;
                installer = new qx.tool.cli.commands["package"].Install({
                  quiet: _this.argv.quiet,
                  verbose: _this.argv.verbose,
                  qxVersion: qxVersion
                });
                _iterator = _createForOfIteratorHelper(data.libraries);
                _context.p = 6;
                _iterator.s();
              case 7:
                if ((_step = _iterator.n()).done) {
                  _context.n = 15;
                  break;
                }
                library = _step.value;
                if (!(!library.repo_name || !library.repo_tag)) {
                  _context.n = 8;
                  break;
                }
                return _context.a(3, 14);
              case 8:
                if (!library.uri) {
                  library.uri = library.repo_name;
                }
                // if a library to upgrade has been provided, skip non-matching ones
                if (!(_this.argv.library_uri && library.uri !== _this.argv.library_uri)) {
                  _context.n = 9;
                  break;
                }
                return _context.a(3, 14);
              case 9:
                found = true;
                if (!(_this.argv.releasesOnly && (!qx.lang.Type.isString(library.repo_tag) || !library.repo_tag.startsWith("v")))) {
                  _context.n = 10;
                  break;
                }
                if (!_this.argv.quiet) {
                  qx.tool.compiler.Console.info("Skipping ".concat(library.library_name, " (").concat(library.uri, "@").concat(library.repo_tag, ") since it is not a release."));
                }
                return _context.a(3, 14);
              case 10:
                if (!_this.argv.dryRun) {
                  _context.n = 11;
                  break;
                }
                qx.tool.compiler.Console.info("Dry run. Not upgrading ".concat(library.library_name, " (").concat(library.uri, "@").concat(library.repo_tag, ")."));
                return _context.a(3, 14);
              case 11:
                if (!(library.repo_tag && _this.argv.reinstall)) {
                  _context.n = 13;
                  break;
                }
                _context.n = 12;
                return installer.install(library.uri, library.repo_tag);
              case 12:
                _context.n = 14;
                break;
              case 13:
                _context.n = 14;
                return installer.install(library.uri);
              case 14:
                _context.n = 7;
                break;
              case 15:
                _context.n = 17;
                break;
              case 16:
                _context.p = 16;
                _t = _context.v;
                _iterator.e(_t);
              case 17:
                _context.p = 17;
                _iterator.f();
                return _context.f(17);
              case 18:
                if (found) {
                  _context.n = 20;
                  break;
                }
                if (!_this.argv.library_uri) {
                  _context.n = 19;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Library '".concat(_this.argv.library_uri, "' is not installed."));
              case 19:
                qx.tool.compiler.Console.info("No packages to upgrade.");
              case 20:
                return _context.a(2);
            }
          }, _callee, null, [[6, 16, 17, 18]]);
        }))();
      }
    }
  });
  qx.tool.cli.commands["package"].Upgrade.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Upgrade.js.map?dt=1782705793211