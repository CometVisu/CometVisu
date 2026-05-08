function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.tool.utils.Promisify": {
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
      "qx.log.appender.NodeConsole": {
        "construct": true
      },
      "qx.tool.config.Utils": {},
      "qx.log.Logger": {},
      "qx.tool.compiler.Console": {},
      "qx.lang.Array": {},
      "qx.tool.config.Compile": {},
      "qx.tool.config.Lockfile": {},
      "qx.tool.cli.api.CompilerApi": {},
      "qx.tool.utils.Json": {},
      "qx.tool.cli.commands.package.Install": {},
      "qx.tool.utils.Utils": {},
      "qx.lang.Type": {},
      "qx.tool.config.Manifest": {},
      "qx.tool.cli.api.LibraryApi": {},
      "qx.lang.Object": {},
      "qx.tool.compiler.resources.ScssConverter": {}
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

  var path = require("upath");
  var fs = qx.tool.utils.Promisify.fs;
  var semver = require("semver");

  /**
   * Entry point for the CLI
   */
  qx.Class.define("qx.tool.cli.Cli", {
    extend: qx.core.Object,
    properties: {
      command: {
        apply: "__P_471_0"
      }
    },
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      if (qx.tool.cli.Cli.__P_471_1) {
        throw new Error("qx.tool.cli.Cli has already been initialized!");
      }
      this.__P_471_2 = false;
      qx.tool.cli.Cli.__P_471_1 = this;
      // include & register log appender
      qx.log.appender.NodeConsole;
    },
    members: {
      /** @type {typeof import("yargs")} the current yargs instance */
      yargs: null,
      /** @type {Object} the current argv */
      argv: null,
      /** @type {qx.tool.cli.api.CompilerApi} the CompilerApi instance */
      _compilerApi: null,
      /** @type {String} the compile.js filename, if there is one */
      _compileJsFilename: null,
      /** @type {String} the compile.json filename, if there is one */
      _compileJsonFilename: null,
      /** @type {Object} Parsed arguments */
      __P_471_3: null,
      /** @type {Boolean} Whether libraries have had their `.load()` method called yet */
      __P_471_4: false,
      __P_471_0: function __P_471_0(command) {
        command.setCompilerApi(this._compilerApi);
        this._compilerApi.setCommand(command);
      },
      /**
       * Creates an instance of yargs, with minimal options
       *
       * @return {import("yargs")}
       */
      __P_471_5: function __P_471_5() {
        return this.yargs = require("yargs").locale("en").version().strict(false).showHelpOnFail().help(false).option("force", {
          describe: "Override warnings",
          type: "boolean",
          "default": false,
          alias: "F"
        }).option("config-file", {
          describe: "Specify the config file to use",
          type: "string",
          alias: "c"
        }).option("verbose", {
          alias: "v",
          describe: "enables additional progress output to console",
          "default": false,
          type: "boolean"
        }).option("debug", {
          describe: "enables debug output",
          "default": false,
          type: "boolean"
        }).option("quiet", {
          alias: "q",
          describe: "suppresses normal progress output to console",
          type: "boolean"
        }).option("colorize", {
          describe: "colorize log output to the console using ANSI color codes",
          "default": true,
          type: "boolean"
        });
      },
      /**
       * Initialises this.argv with the bare minimum required to load the config files and begin
       * processing
       */
      __P_471_6: function __P_471_6() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var title, yargs, _t, _t2;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                title = "qooxdoo command line interface";
                title = "\n" + title + "\n" + "=".repeat(title.length);
                _t = title;
                _t2 = "\nVersion: v";
                _context.n = 1;
                return qx.tool.config.Utils.getQxVersion();
              case 1:
                title = _t += _t2.concat.call(_t2, _context.v, "\n");
                title += "\n";
                title += "Typical usage:\n        qx <commands> [options]\n\n      Type qx <command> --help for options and subcommands.";
                yargs = _this.__P_471_5().usage(title);
                _this.argv = yargs.argv;
                // Logging - needs to be unified..
                if (_this.argv.debug) {
                  qx.log.Logger.setLevel("debug");
                } else if (_this.argv.quiet) {
                  qx.log.Logger.setLevel("error");
                } else {
                  qx.log.Logger.setLevel("info");
                }
                // use node console log appender with colors
                qx.log.appender.NodeConsole.setUseColors(_this.argv.colorize);
              case 2:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      /**
       * Reloads this.argv with the full set of arguments
       */
      __P_471_7: function __P_471_7() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var yargs;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                yargs = _this2.__P_471_5().help(true).option("set", {
                  describe: "sets an environment value for the compiler",
                  nargs: 1,
                  requiresArg: true,
                  type: "string",
                  array: true
                }).option("set-env", {
                  describe: "sets an environment value for the application",
                  nargs: 1,
                  requiresArg: true,
                  type: "string",
                  array: true
                }).check(function (argv) {
                  // validate that "set-env" is not set or if it is
                  // set it's items are strings in the form of key=value
                  var regexp = /^[^=\s]+=.+$/;
                  var setEnv = argv["set-env"];
                  if (!(setEnv === undefined || !setEnv.some(function (item) {
                    return !regexp.test(item);
                  }))) {
                    throw new Error("Argument check failed: --set-env must be a key=value pair.");
                  }
                  return true;
                });
                qx.tool.cli.Cli.addYargsCommands(yargs, ["Add", "Clean", "Compile", "Config", "Deploy", "Es6ify", "ExportGlyphs", "Package", "Pkg",
                // alias for Package
                "Create", "Lint", "Run", "Test", "Typescript", "Serve", "Migrate"], "qx.tool.cli.commands");
                _context2.n = 1;
                return yargs.demandCommand().strict().argv;
              case 1:
                _this2.argv = _context2.v;
                _context2.n = 2;
                return _this2.__P_471_8();
              case 2:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      /**
       * This is to notify the commands after loading the full args.
       * The commands can overload special arg arguments here.
       * e.g. Deploy will will overload the target.
       */
      __P_471_9: function __P_471_9() {
        var cmd = this._compilerApi.getCommand();
        if (cmd) {
          this._compilerApi.getCommand().processArgs(this.argv);
        }
      },
      /**
       * Calls the `.load()` method of each library, safe to call multiple times.  This is
       * to delay the calling of `load()` until after we know that the command has been selected
       * by Yargs
       */
      __P_471_8: function __P_471_8() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var i, arr, libraryApi;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                if (!_this3.__P_471_4) {
                  _context3.n = 1;
                  break;
                }
                return _context3.a(2);
              case 1:
                _this3.__P_471_4 = true;
                i = 0, arr = _this3._compilerApi.getLibraryApis();
              case 2:
                if (!(i < arr.length)) {
                  _context3.n = 4;
                  break;
                }
                libraryApi = arr[i];
                _context3.n = 3;
                return libraryApi.load();
              case 3:
                i++;
                _context3.n = 2;
                break;
              case 4:
                _context3.n = 5;
                return _this3._compilerApi.afterLibrariesLoaded();
              case 5:
                return _context3.a(2);
            }
          }, _callee3);
        }))();
      },
      /**
       * Processes a command.  All commands should use this method when invoked by Yargs, because it
       * provides a standard error control and makes sure that the libraries know what command has
       * been selected.
       *
       * @param command {qx.tool.cli.commands.Command} the command being run
       */
      processCommand: function processCommand(command) {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var res;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                qx.tool.compiler.Console.getInstance().setVerbose(_this4.argv.verbose);
                _context4.n = 1;
                return _this4.__P_471_8();
              case 1:
                _context4.n = 2;
                return command.process();
              case 2:
                res = _context4.v;
                _context4.n = 3;
                return _this4._compilerApi.afterProcessFinished(command, res);
              case 3:
                return _context4.a(2, res);
            }
          }, _callee4);
        }))();
      },
      /**
       * Returns the parsed command line and configuration data
       *
       * @return {Object}
       */
      getParsedArgs: function getParsedArgs() {
        return this.__P_471_3;
      },
      /**
       * Parses the command line and loads configuration data from a .js or .json file;
       * if you provide a .js file the file must be a module which returns an object which
       * has any of these properties:
       *
       *  CompilerApi - the class (derived from qx.tool.cli.api.CompilerApi)
       *    for configuring the compiler
       *
       * Each library can also have a compile.js, and that is also a module which can
       * return an object with any of these properties:
       *
       *  LibraryApi - the class (derived from qx.tool.cli.api.LibraryApi)
       *    for configuring the library
       *
       */
      run: function run() {
        var _this5 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
          var args;
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                args = qx.lang.Array.clone(process.argv);
                args.shift();
                process.title = args.join(" ");
                _context5.n = 1;
                return _this5.__P_471_10();
              case 1:
                return _context5.a(2, _this5.processCommand(_this5.getCommand()));
            }
          }, _callee5);
        }))();
      },
      /**
       * Does the work of parsing command line arguments and loading `compile.js[on]`
       */
      __P_471_10: function __P_471_10() {
        var _this6 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
          var defaultConfigFilename, lockfileContent, compileJsFilename, compileJsonFilename, CompilerApi, compileJs, compilerApi, config, lockfile, name, schemaVersion, fileVersion, _config, installer, filepath, backup, _iterator, _step, lib, needLibraries, neededLibraries, _installer, _iterator2, _step2, aPath, libCompileJsFilename, LibraryApi, _compileJs, libraryApi, parsedArgs, targetType, target, _t3, _t4, _t5, _t6;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.p = _context6.n) {
              case 0:
                _context6.n = 1;
                return _this6.__P_471_6();
              case 1:
                /*
                 * Detect and load compile.json and compile.js
                 */
                defaultConfigFilename = qx.tool.config.Compile.config.fileName;
                if (_this6.argv.configFile) {
                  process.chdir(path.dirname(_this6.argv.configFile));
                  _this6.argv.configFile = path.basename(_this6.argv.configFile);
                  defaultConfigFilename = _this6.argv.configFile;
                }
                lockfileContent = {
                  version: qx.tool.config.Lockfile.getInstance().getVersion()
                };
                compileJsFilename = qx.tool.cli.Cli.compileJsFilename;
                compileJsonFilename = qx.tool.config.Compile.config.fileName;
                if (defaultConfigFilename) {
                  if (defaultConfigFilename.match(/\.js$/)) {
                    compileJsFilename = defaultConfigFilename;
                  } else {
                    compileJsonFilename = defaultConfigFilename;
                  }
                }
                _context6.n = 2;
                return fs.existsAsync(compileJsonFilename);
              case 2:
                if (!_context6.v) {
                  _context6.n = 3;
                  break;
                }
                _this6._compileJsonFilename = compileJsonFilename;
              case 3:
                /*
                 * Create a CompilerAPI
                 */
                CompilerApi = qx.tool.cli.api.CompilerApi;
                _context6.n = 4;
                return fs.existsAsync(compileJsFilename);
              case 4:
                if (!_context6.v) {
                  _context6.n = 6;
                  break;
                }
                _this6.__P_471_2 = true;
                _context6.n = 5;
                return _this6.__P_471_11(compileJsFilename);
              case 5:
                compileJs = _context6.v;
                _this6._compileJsFilename = compileJsFilename;
                if (compileJs.CompilerApi) {
                  CompilerApi = compileJs.CompilerApi;
                }
              case 6:
                compilerApi = _this6._compilerApi = new CompilerApi(_this6).set({
                  rootDir: ".",
                  configFilename: compileJsonFilename
                }); // Boot the compiler API, load the compile.json and create configuration data
                _context6.n = 7;
                return compilerApi.load();
              case 7:
                config = compilerApi.getConfiguration(); // Validate configuration data against the schema
                _context6.n = 8;
                return qx.tool.config.Compile.getInstance().load(config);
              case 8:
                if (!defaultConfigFilename) {
                  _context6.n = 30;
                  break;
                }
                lockfile = qx.tool.config.Lockfile.config.fileName;
                _context6.p = 9;
                name = path.join(path.dirname(defaultConfigFilename), lockfile);
                _context6.n = 10;
                return qx.tool.utils.Json.loadJsonAsync(name);
              case 10:
                _t3 = _context6.v;
                if (_t3) {
                  _context6.n = 11;
                  break;
                }
                _t3 = lockfileContent;
              case 11:
                lockfileContent = _t3;
                _context6.n = 13;
                break;
              case 12:
                _context6.p = 12;
                _t4 = _context6.v;
              case 13:
                // check semver-type compatibility (i.e. compatible as long as major version stays the same)
                schemaVersion = semver.coerce(qx.tool.config.Lockfile.getInstance().getVersion(), true).raw;
                fileVersion = lockfileContent && lockfileContent.version ? semver.coerce(lockfileContent.version, true).raw : "1.0.0";
                if (!(semver.major(schemaVersion) > semver.major(fileVersion))) {
                  _context6.n = 30;
                  break;
                }
                if (!_this6.argv.force) {
                  _context6.n = 29;
                  break;
                }
                _config = {
                  verbose: _this6.argv.verbose,
                  quiet: _this6.argv.quiet,
                  save: false
                };
                installer = new qx.tool.cli.commands["package"].Install(_config);
                filepath = installer.getLockfilePath();
                backup = filepath + ".old";
                _context6.n = 14;
                return fs.copyFileAsync(filepath, backup);
              case 14:
                if (!_this6.argv.quiet) {
                  qx.tool.compiler.Console.warn("*** A backup of ".concat(lockfile, " has been saved to ").concat(backup, ", in case you need to revert to it. ***"));
                }
                _context6.n = 15;
                return installer.deleteLockfile();
              case 15:
                _iterator = _createForOfIteratorHelper(lockfileContent.libraries);
                _context6.p = 16;
                _iterator.s();
              case 17:
                if ((_step = _iterator.n()).done) {
                  _context6.n = 24;
                  break;
                }
                lib = _step.value;
                _context6.n = 18;
                return installer.isInstalled(lib.uri, lib.repo_tag);
              case 18:
                if (_context6.v) {
                  _context6.n = 22;
                  break;
                }
                if (!lib.repo_tag) {
                  _context6.n = 20;
                  break;
                }
                _context6.n = 19;
                return installer.install(lib.uri, lib.repo_tag);
              case 19:
                _context6.n = 21;
                break;
              case 20:
                if (!(lib.path && fs.existsSync(lib.path))) {
                  _context6.n = 21;
                  break;
                }
                _context6.n = 21;
                return installer.installFromLocaPath(lib.path, lib.uri);
              case 21:
                _context6.n = 23;
                break;
              case 22:
                if (_this6.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> ".concat(lib.uri, "@").concat(lib.repo_tag, " is already installed."));
                }
              case 23:
                _context6.n = 17;
                break;
              case 24:
                _context6.n = 26;
                break;
              case 25:
                _context6.p = 25;
                _t5 = _context6.v;
                _iterator.e(_t5);
              case 26:
                _context6.p = 26;
                _iterator.f();
                return _context6.f(26);
              case 27:
                _context6.n = 28;
                return installer.getLockfileData();
              case 28:
                lockfileContent = _context6.v;
                _context6.n = 30;
                break;
              case 29:
                throw new qx.tool.utils.Utils.UserError("*** Warning ***\n" + "The schema of '".concat(lockfile, "' has changed. Execute 'qx clean && qx compile --force' to delete and regenerate it.\n") + "You might have to re-apply manual modifications to '".concat(lockfile, "'."));
              case 30:
                /*
                 * Locate and load libraries
                 */

                if (!config.libraries) {
                  if (fs.existsSync("Manifest.json")) {
                    config.libraries = ["."];
                  }
                }
                if (lockfileContent.libraries) {
                  config.packages = {};
                  lockfileContent.libraries.forEach(function (library) {
                    if (library.uri == "qooxdoo/qxl.apiviewer") {
                      var m = library.repo_tag.match(/^v([0-9]+)\.([0-9]+)\.([0-9]+)$/);
                      if (m) {
                        m.shift();
                        m = m.map(function (v) {
                          return parseInt(v, 10);
                        });
                        if (m[0] <= 1 && m[1] == 0 && m[2] < 15) {
                          qx.tool.compiler.Console.warn("***********\n*********** API Viewer is out of date and must be upgraded - please run 'qx package update' and then 'qx package upgrade'\n***********");
                        }
                      }
                    }
                    config.libraries.push(library.path);
                    config.packages[library.uri] = library.path;
                  });
                }
                // check if we need to load libraries, needs more robust test
                needLibraries = qx.lang.Type.isArray(_this6.argv._) && _this6.argv._[0] !== "clean"; // check if libraries are loaded
                if (!(config.libraries && needLibraries)) {
                  _context6.n = 41;
                  break;
                }
                neededLibraries = config.libraries.filter(function (libData) {
                  return !fs.existsSync(libData + "/Manifest.json");
                });
                if (!neededLibraries.length) {
                  _context6.n = 31;
                  break;
                }
                if (!fs.existsSync(qx.tool.config.Manifest.config.fileName)) {
                  qx.tool.compiler.Console.error("Libraries are missing and there is no Manifest.json in the current directory so we cannot attempt to install them; the missing libraries are: \n     " + neededLibraries.join("\n     "));
                  process.exit(1);
                }
                qx.tool.compiler.Console.info("One or more libraries not found - trying to install them from library repository...");
                _installer = new qx.tool.cli.commands["package"].Install({
                  quiet: true,
                  save: false
                });
                _context6.n = 31;
                return _installer.process();
              case 31:
                _iterator2 = _createForOfIteratorHelper(config.libraries);
                _context6.p = 32;
                _iterator2.s();
              case 33:
                if ((_step2 = _iterator2.n()).done) {
                  _context6.n = 38;
                  break;
                }
                aPath = _step2.value;
                libCompileJsFilename = path.join(aPath, qx.tool.cli.Cli.compileJsFilename);
                LibraryApi = qx.tool.cli.api.LibraryApi;
                _context6.n = 34;
                return fs.existsAsync(libCompileJsFilename);
              case 34:
                if (!_context6.v) {
                  _context6.n = 36;
                  break;
                }
                _context6.n = 35;
                return _this6.__P_471_11(libCompileJsFilename);
              case 35:
                _compileJs = _context6.v;
                if (_compileJs.LibraryApi) {
                  LibraryApi = _compileJs.LibraryApi;
                }
              case 36:
                libraryApi = new LibraryApi().set({
                  rootDir: aPath,
                  compilerApi: compilerApi
                });
                compilerApi.addLibraryApi(libraryApi);
                _context6.n = 37;
                return libraryApi.initialize();
              case 37:
                _context6.n = 33;
                break;
              case 38:
                _context6.n = 40;
                break;
              case 39:
                _context6.p = 39;
                _t6 = _context6.v;
                _iterator2.e(_t6);
              case 40:
                _context6.p = 40;
                _iterator2.f();
                return _context6.f(40);
              case 41:
                _context6.n = 42;
                return _this6.__P_471_7();
              case 42:
                _this6.__P_471_9();
                parsedArgs = {
                  target: _this6.argv.target,
                  outputPath: null,
                  locales: null,
                  writeAllTranslations: _this6.argv.writeAllTranslations,
                  environment: {},
                  verbose: _this6.argv.verbose
                };
                if (_this6.argv.locale && _this6.argv.locale.length) {
                  parsedArgs.locales = _this6.argv.locale;
                }
                if (_this6.argv["set-env"]) {
                  _this6.argv["set-env"].forEach(function (kv) {
                    var m = kv.match(/^([^=\s]+)(=(.+))?$/);
                    var key = m[1];
                    var value = m[3];
                    parsedArgs.environment[key] = value;
                  });
                }
                targetType = _this6._compilerApi.getCommand().getTargetType();
                if (!config.locales) {
                  config.locales = [];
                }
                if (typeof parsedArgs.writeAllTranslations == "boolean") {
                  config.writeAllTranslations = parsedArgs.writeAllTranslations;
                }
                if (!config.environment) {
                  config.environment = {};
                }

                // Set the environment variables coming from command line arguments
                // in target's environment object. If that object doesn't exist create
                // one and assign it to the target.
                if (config.targets) {
                  target = config.targets.find(function (target) {
                    return target.type === targetType;
                  });
                  target.environment = target.environment || {};
                  qx.lang.Object.mergeWith(target.environment, parsedArgs.environment, true);
                }
                if (config.sass && config.sass.compiler !== undefined) {
                  qx.tool.compiler.resources.ScssConverter.USE_V6_COMPILER = config.sass.compiler == "latest";
                } else {
                  qx.tool.compiler.resources.ScssConverter.USE_V6_COMPILER = null;
                }
                if (config.sass && config.sass.copyOriginal) {
                  qx.tool.compiler.resources.ScssConverter.COPY_ORIGINAL_FILES = true;
                }
                if (!config.serve) {
                  config.serve = {};
                }
                if (_this6.isExplicitArg("listen-port")) {
                  config.serve.listenPort = _this6.argv.listenPort;
                } else {
                  config.serve.listenPort = config.serve.listenPort || _this6.argv.listenPort;
                }
                _context6.n = 43;
                return compilerApi.getConfiguration();
              case 43:
                _this6.__P_471_3 = _context6.v;
                return _context6.a(2, _this6.__P_471_3);
            }
          }, _callee6, null, [[32, 39, 40, 41], [16, 25, 26, 27], [9, 12]]);
        }))();
      },
      /**
       * Loads a .js file using `require`, handling exceptions as best as possible
       *
       * @param aPath {String} the file to load
       * @return {Object} the module
       */
      __P_471_11: function __P_471_11(aPath) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
          var module, lines, i, lineNumber, _t7;
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.p = _context7.n) {
              case 0:
                _context7.p = 0;
                module = require(path.resolve(aPath));
                return _context7.a(2, module);
              case 1:
                _context7.p = 1;
                _t7 = _context7.v;
                lines = _t7.stack.split("\n");
                for (i = 0; i < lines.length; i++) {
                  if (lines[i].match(/^\s+at/)) {
                    lines.splice(i);
                  }
                }
                lineNumber = lines[0].split("evalmachine.<anonymous>:")[1];
                if (!(lineNumber !== undefined)) {
                  _context7.n = 2;
                  break;
                }
                lines.shift();
                throw new Error("Error while reading " + aPath + " at line " + lineNumber + "\n" + lines.join("\n"));
              case 2:
                throw new Error("Error while reading " + aPath + "\n" + lines.join("\n"));
              case 3:
                return _context7.a(2);
            }
          }, _callee7, null, [[0, 1]]);
        }))();
      },
      /**
       * Returns if the file compile.js exists
       *
       * @returns {Boolean}
       */
      compileJsExists: function compileJsExists() {
        return this.__P_471_2;
      },
      /**
       * Returns the CompilerApi instance
       *
       * @return {qx.tool.cli.api.CompilerApi}
       */
      getCompilerApi: function getCompilerApi() {
        return this._compilerApi;
      },
      /**
       * Returns the filename of compile.js, if there is one
       *
       * @return {String?} filename
       */
      getCompileJsFilename: function getCompileJsFilename() {
        return this._compileJsFilename;
      },
      /**
       * Returns the filename of compile.json, if there is one
       *
       * @return {String?} filename
       */
      getCompileJsonFilename: function getCompileJsonFilename() {
        return this._compileJsonFilename;
      },
      /**
       * Detects whether the command line explicit set an option (as opposed to yargs
       * providing a default value).  Note that this does not handle aliases, use the
       * actual, full option name.
       *
       * @param option {String} the name of the option, eg "listen-port"
       * @return {Boolean}
       */
      isExplicitArg: function isExplicitArg(option) {
        function searchForOption(option) {
          return process.argv.indexOf(option) > -1;
        }
        return searchForOption("-".concat(option)) || searchForOption("--".concat(option));
      }
    },
    statics: {
      compileJsFilename: "compile.js",
      /** {CompileJs} singleton instance */
      __P_471_1: null,
      /**
       * Returns the singleton instance, throws an error if it has not been created
       *
       * @return {qx.tool.cli.Cli}
       */
      getInstance: function getInstance() {
        if (!qx.tool.cli.Cli.__P_471_1) {
          throw new Error("CompileJs has not been initialized yet!");
        }
        return qx.tool.cli.Cli.__P_471_1;
      },
      /**
       * Adds commands to Yargs
       *
       * @param yargs {typeof import("yargs")} the Yargs instance
       * @param classNames {String[]} array of class names, each of which is in the `packageName` package
       * @param packageName {String} the name of the package to find each command class
       */
      addYargsCommands: function addYargsCommands(yargs, classNames, packageName) {
        var pkg = null;
        packageName.split(".").forEach(function (seg) {
          if (pkg === null) {
            pkg = window[seg];
          } else {
            pkg = pkg[seg];
          }
        });
        classNames.forEach(function (cmd) {
          var Clazz = pkg[cmd];
          var data = Clazz.getYargsCommand();
          if (data) {
            if (data.handler === undefined) {
              data.handler = function (argv) {
                return qx.tool.cli.Cli.getInstance().setCommand(new Clazz(argv));
              };
            }
            yargs.command(data);
          }
        });
      }
    }
  });
  qx.tool.cli.Cli.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Cli.js.map?dt=1778272840310