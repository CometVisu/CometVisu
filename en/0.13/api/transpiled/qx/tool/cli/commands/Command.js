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
      "qx.tool.cli.api.CompilerApi": {},
      "qx.tool.cli.ConfigDb": {},
      "qx.tool.utils.Utils": {},
      "qx.tool.migration.Runner": {},
      "qx.tool.compiler.Console": {},
      "qx.tool.config.Utils": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2017-2021 Zenesis Ltd
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (john.spackman@zenesis.com, @johnspackman)
       * Christian Boulanger (info@bibliograph.org, @cboulanger)
  
  ************************************************************************ */
  var path = require("path");
  var fsp = require("fs").promises;
  var process = require("process");

  /**
   * Base class for commands
   */
  qx.Class.define("qx.tool.cli.commands.Command", {
    extend: qx.core.Object,
    construct: function construct(argv) {
      qx.core.Object.constructor.call(this);
      this.argv = argv;
    },
    properties: {
      /**
       * A reference to the current compilerApi instance
       * @var {qx.tool.cli.api.CompilerApi}
       */
      compilerApi: {
        check: "qx.tool.cli.api.CompilerApi",
        nullable: true
      }
    },
    members: {
      argv: null,
      compileJs: null,
      process: function process() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var argv, configDb;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                argv = _this.argv;
                if (!argv.set) {
                  _context.n = 2;
                  break;
                }
                _context.n = 1;
                return qx.tool.cli.ConfigDb.getInstance();
              case 1:
                configDb = _context.v;
                argv.set.forEach(function (kv) {
                  var m = kv.match(/^([^=\s]+)(=(.+))?$/);
                  if (m) {
                    var key = m[1];
                    var value = m[3];
                    configDb.setOverride(key, value);
                  } else {
                    throw new qx.tool.utils.Utils.UserError("Failed to parse environment setting commandline option '--set ".concat(kv, "'"));
                  }
                });
              case 2:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      /**
       * This is to notify the commands after loading the full args.
       * The commands can overload special arg arguments here.
       * e.g. Deploy will will overload the target.
       *
       * @param {*} argv : args to process
       *
       */
      processArgs: function processArgs(argv) {
        // Nothing
      },
      /**
       * Returns the parsed command line arguments
       * @return {Object}
       */
      getArgs: function getArgs() {
        return this.argv;
      },
      /**
       * Check if the current application needs to be migrated
       */
      checkMigrations: function checkMigrations() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var appQxVersion, semaphore, runner, _yield$runner$runMigr, pending, applied, _t, _t2;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                _context2.p = 0;
                _context2.n = 1;
                return _this2.getAppQxVersion();
              case 1:
                appQxVersion = _context2.v;
                _context2.n = 3;
                break;
              case 2:
                _context2.p = 2;
                _t = _context2.v;
                return _context2.a(2);
              case 3:
                semaphore = path.join(process.cwd(), ".qxmigrationcheck");
                _context2.p = 4;
                _context2.n = 5;
                return fsp.stat(semaphore);
              case 5:
                _this2.debug("Not checking migration because check is already in progress.");
                _context2.n = 11;
                break;
              case 6:
                _context2.p = 6;
                _t2 = _context2.v;
                _context2.n = 7;
                return fsp.writeFile(semaphore, "");
              case 7:
                runner = new qx.tool.migration.Runner().set({
                  dryRun: true
                });
                _context2.n = 8;
                return runner.runMigrations();
              case 8:
                _yield$runner$runMigr = _context2.v;
                pending = _yield$runner$runMigr.pending;
                applied = _yield$runner$runMigr.applied;
                _context2.n = 9;
                return fsp.unlink(semaphore);
              case 9:
                if (!pending) {
                  _context2.n = 10;
                  break;
                }
                qx.tool.compiler.Console.warn("*** There are ".concat(pending, " pending migrations. \n") + "*** Please run '(npx) qx migrate --dry-run --verbose' for details, \n" + "*** and '(npx) qx migrate' to apply the changes.");
                if (!process.env.IGNORE_MIGRATION_WARNING) {
                  process.exit(1);
                }
                return _context2.a(2);
              case 10:
                _this2.debug("No migrations necessary.");
              case 11:
                return _context2.a(2);
            }
          }, _callee2, null, [[4, 6], [0, 2]]);
        }))();
      },
      /**
       * @see {@link qx.tool.config.Utils#getQxPath}
       */
      getQxPath: qx.tool.config.Utils.getQxPath.bind(qx.tool.config.Utils),
      /**
       *
       * @see {@link qx.tool.config.Utils#getCompilerVersion}
       * @returns {String}
       */
      getCompilerVersion: function getCompilerVersion() {
        return qx.tool.config.Utils.getCompilerVersion();
      },
      /**
       * Returns the qooxdoo version, either from the `--qx-version` command line
       * parameter (if supported by the command and supplied by the user) or from
       * {@link qqx.tool.config.Utils#getQxVersion()}. Throws if no version can be
       * determined.
       *
       * @throws {typeof qx.tool.utils.Utils.UserError}
       *
       * @return {Promise<String>}
       */
      getQxVersion: function getQxVersion() {
        try {
          return this.argv.qxVersion || qx.tool.config.Utils.getQxVersion();
        } catch (e) {
          throw new qx.tool.utils.Utils.UserError(e.message);
        }
      },
      /**
       * Returns the qooxdoo version used in the application in the current
       * directory via {@link qx.tool.config.Utils#getAppQxVersion}. Can be
       * overridden by the `--qx-version` command line parameter (if supported by
       * the command and supplied by the user). Throws if no version can be
       * determined.
       *
       * @throws {typeof qx.tool.utils.Utils.UserError}
       *
       * @return {Promise<String>}
       */
      getAppQxVersion: function getAppQxVersion() {
        try {
          return this.argv.qxVersion || qx.tool.config.Utils.getAppQxVersion();
        } catch (e) {
          throw new qx.tool.utils.Utils.UserError(e.message);
        }
      },
      /**
       * Returns the calculated target type
       * @returns {String}
       */
      getTargetType: function getTargetType() {
        return this.argv.target || this.getCompilerApi().getConfiguration().defaultTarget || "source";
      }
    }
  });
  qx.tool.cli.commands.Command.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Command.js.map?dt=1778272840618