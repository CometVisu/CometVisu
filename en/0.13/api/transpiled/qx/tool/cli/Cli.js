function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
        apply: "__P_460_0"
      }
    },
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      if (qx.tool.cli.Cli.__P_460_1) {
        throw new Error("qx.tool.cli.Cli has already been initialized!");
      }
      this.__P_460_2 = false;
      qx.tool.cli.Cli.__P_460_1 = this;
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
      __P_460_3: null,
      /** @type {Boolean} Whether libraries have had their `.load()` method called yet */
      __P_460_4: false,
      __P_460_0: function __P_460_0(command) {
        command.setCompilerApi(this._compilerApi);
        this._compilerApi.setCommand(command);
      },
      /**
       * Creates an instance of yargs, with minimal options
       *
       * @return {import("yargs")}
       */
      __P_460_5: function __P_460_5() {
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
      __P_460_6: function __P_460_6() {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var title, yargs;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                title = "qooxdoo command line interface";
                title = "\n" + title + "\n" + "=".repeat(title.length);
                _context.t0 = title;
                _context.t1 = "\nVersion: v";
                _context.next = 6;
                return qx.tool.config.Utils.getQxVersion();
              case 6:
                _context.t2 = _context.sent;
                title = _context.t0 += _context.t1.concat.call(_context.t1, _context.t2, "\n");
                title += "\n";
                title += "Typical usage:\n        qx <commands> [options]\n\n      Type qx <command> --help for options and subcommands.";
                yargs = _this.__P_460_5().usage(title);
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
              case 14:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      /**
       * Reloads this.argv with the full set of arguments
       */
      __P_460_7: function __P_460_7() {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var yargs;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                yargs = _this2.__P_460_5().help(true).option("set", {
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
                _context2.next = 4;
                return yargs.demandCommand().strict().argv;
              case 4:
                _this2.argv = _context2.sent;
                _context2.next = 7;
                return _this2.__P_460_8();
              case 7:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      /**
       * This is to notify the commands after loading the full args.
       * The commands can overload special arg arguments here.
       * e.g. Deploy will will overload the target.
       */
      __P_460_9: function __P_460_9() {
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
      __P_460_8: function __P_460_8() {
        var _this3 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var i, arr, libraryApi;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                if (!_this3.__P_460_4) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return");
              case 2:
                _this3.__P_460_4 = true;
                i = 0, arr = _this3._compilerApi.getLibraryApis();
              case 4:
                if (!(i < arr.length)) {
                  _context3.next = 11;
                  break;
                }
                libraryApi = arr[i];
                _context3.next = 8;
                return libraryApi.load();
              case 8:
                i++;
                _context3.next = 4;
                break;
              case 11:
                _context3.next = 13;
                return _this3._compilerApi.afterLibrariesLoaded();
              case 13:
              case "end":
                return _context3.stop();
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
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          var res;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                qx.tool.compiler.Console.getInstance().setVerbose(_this4.argv.verbose);
                _context4.next = 3;
                return _this4.__P_460_8();
              case 3:
                _context4.next = 5;
                return command.process();
              case 5:
                res = _context4.sent;
                _context4.next = 8;
                return _this4._compilerApi.afterProcessFinished(command, res);
              case 8:
                return _context4.abrupt("return", res);
              case 9:
              case "end":
                return _context4.stop();
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
        return this.__P_460_3;
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
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
          var args;
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                args = qx.lang.Array.clone(process.argv);
                args.shift();
                process.title = args.join(" ");
                _context5.next = 5;
                return _this5.__P_460_10();
              case 5:
                return _context5.abrupt("return", _this5.processCommand(_this5.getCommand()));
              case 6:
              case "end":
                return _context5.stop();
            }
          }, _callee5);
        }))();
      },
      /**
       * Does the work of parsing command line arguments and loading `compile.js[on]`
       */
      __P_460_10: function __P_460_10() {
        var _this6 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
          var defaultConfigFilename, lockfileContent, compileJsFilename, compileJsonFilename, CompilerApi, compileJs, compilerApi, config, lockfile, name, schemaVersion, fileVersion, _config, installer, filepath, backup, _iterator, _step, lib, needLibraries, neededLibraries, _installer, _iterator2, _step2, aPath, libCompileJsFilename, LibraryApi, _compileJs, libraryApi, parsedArgs, targetType, target;
          return _regeneratorRuntime().wrap(function _callee6$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _this6.__P_460_6();
              case 2:
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
                _context6.next = 10;
                return fs.existsAsync(compileJsonFilename);
              case 10:
                if (!_context6.sent) {
                  _context6.next = 12;
                  break;
                }
                _this6._compileJsonFilename = compileJsonFilename;
              case 12:
                /*
                 * Create a CompilerAPI
                 */
                CompilerApi = qx.tool.cli.api.CompilerApi;
                _context6.next = 15;
                return fs.existsAsync(compileJsFilename);
              case 15:
                if (!_context6.sent) {
                  _context6.next = 22;
                  break;
                }
                _this6.__P_460_2 = true;
                _context6.next = 19;
                return _this6.__P_460_11(compileJsFilename);
              case 19:
                compileJs = _context6.sent;
                _this6._compileJsFilename = compileJsFilename;
                if (compileJs.CompilerApi) {
                  CompilerApi = compileJs.CompilerApi;
                }
              case 22:
                compilerApi = _this6._compilerApi = new CompilerApi(_this6).set({
                  rootDir: ".",
                  configFilename: compileJsonFilename
                }); // Boot the compiler API, load the compile.json and create configuration data
                _context6.next = 25;
                return compilerApi.load();
              case 25:
                config = compilerApi.getConfiguration(); // Validate configuration data against the schema
                _context6.next = 28;
                return qx.tool.config.Compile.getInstance().load(config);
              case 28:
                if (!defaultConfigFilename) {
                  _context6.next = 90;
                  break;
                }
                lockfile = qx.tool.config.Lockfile.config.fileName;
                _context6.prev = 30;
                name = path.join(path.dirname(defaultConfigFilename), lockfile);
                _context6.next = 34;
                return qx.tool.utils.Json.loadJsonAsync(name);
              case 34:
                _context6.t0 = _context6.sent;
                if (_context6.t0) {
                  _context6.next = 37;
                  break;
                }
                _context6.t0 = lockfileContent;
              case 37:
                lockfileContent = _context6.t0;
                _context6.next = 42;
                break;
              case 40:
                _context6.prev = 40;
                _context6.t1 = _context6["catch"](30);
              case 42:
                // check semver-type compatibility (i.e. compatible as long as major version stays the same)
                schemaVersion = semver.coerce(qx.tool.config.Lockfile.getInstance().getVersion(), true).raw;
                fileVersion = lockfileContent && lockfileContent.version ? semver.coerce(lockfileContent.version, true).raw : "1.0.0";
                if (!(semver.major(schemaVersion) > semver.major(fileVersion))) {
                  _context6.next = 90;
                  break;
                }
                if (!_this6.argv.force) {
                  _context6.next = 89;
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
                _context6.next = 52;
                return fs.copyFileAsync(filepath, backup);
              case 52:
                if (!_this6.argv.quiet) {
                  qx.tool.compiler.Console.warn("*** A backup of ".concat(lockfile, " has been saved to ").concat(backup, ", in case you need to revert to it. ***"));
                }
                _context6.next = 55;
                return installer.deleteLockfile();
              case 55:
                _iterator = _createForOfIteratorHelper(lockfileContent.libraries);
                _context6.prev = 56;
                _iterator.s();
              case 58:
                if ((_step = _iterator.n()).done) {
                  _context6.next = 76;
                  break;
                }
                lib = _step.value;
                _context6.next = 62;
                return installer.isInstalled(lib.uri, lib.repo_tag);
              case 62:
                if (_context6.sent) {
                  _context6.next = 73;
                  break;
                }
                if (!lib.repo_tag) {
                  _context6.next = 68;
                  break;
                }
                _context6.next = 66;
                return installer.install(lib.uri, lib.repo_tag);
              case 66:
                _context6.next = 71;
                break;
              case 68:
                if (!(lib.path && fs.existsSync(lib.path))) {
                  _context6.next = 71;
                  break;
                }
                _context6.next = 71;
                return installer.installFromLocaPath(lib.path, lib.uri);
              case 71:
                _context6.next = 74;
                break;
              case 73:
                if (_this6.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> ".concat(lib.uri, "@").concat(lib.repo_tag, " is already installed."));
                }
              case 74:
                _context6.next = 58;
                break;
              case 76:
                _context6.next = 81;
                break;
              case 78:
                _context6.prev = 78;
                _context6.t2 = _context6["catch"](56);
                _iterator.e(_context6.t2);
              case 81:
                _context6.prev = 81;
                _iterator.f();
                return _context6.finish(81);
              case 84:
                _context6.next = 86;
                return installer.getLockfileData();
              case 86:
                lockfileContent = _context6.sent;
                _context6.next = 90;
                break;
              case 89:
                throw new qx.tool.utils.Utils.UserError("*** Warning ***\n" + "The schema of '".concat(lockfile, "' has changed. Execute 'qx clean && qx compile --force' to delete and regenerate it.\n") + "You might have to re-apply manual modifications to '".concat(lockfile, "'."));
              case 90:
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
                  _context6.next = 129;
                  break;
                }
                neededLibraries = config.libraries.filter(function (libData) {
                  return !fs.existsSync(libData + "/Manifest.json");
                });
                if (!neededLibraries.length) {
                  _context6.next = 101;
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
                _context6.next = 101;
                return _installer.process();
              case 101:
                _iterator2 = _createForOfIteratorHelper(config.libraries);
                _context6.prev = 102;
                _iterator2.s();
              case 104:
                if ((_step2 = _iterator2.n()).done) {
                  _context6.next = 121;
                  break;
                }
                aPath = _step2.value;
                libCompileJsFilename = path.join(aPath, qx.tool.cli.Cli.compileJsFilename);
                LibraryApi = qx.tool.cli.api.LibraryApi;
                _context6.next = 110;
                return fs.existsAsync(libCompileJsFilename);
              case 110:
                if (!_context6.sent) {
                  _context6.next = 115;
                  break;
                }
                _context6.next = 113;
                return _this6.__P_460_11(libCompileJsFilename);
              case 113:
                _compileJs = _context6.sent;
                if (_compileJs.LibraryApi) {
                  LibraryApi = _compileJs.LibraryApi;
                }
              case 115:
                libraryApi = new LibraryApi().set({
                  rootDir: aPath,
                  compilerApi: compilerApi
                });
                compilerApi.addLibraryApi(libraryApi);
                _context6.next = 119;
                return libraryApi.initialize();
              case 119:
                _context6.next = 104;
                break;
              case 121:
                _context6.next = 126;
                break;
              case 123:
                _context6.prev = 123;
                _context6.t3 = _context6["catch"](102);
                _iterator2.e(_context6.t3);
              case 126:
                _context6.prev = 126;
                _iterator2.f();
                return _context6.finish(126);
              case 129:
                _context6.next = 131;
                return _this6.__P_460_7();
              case 131:
                _this6.__P_460_9();
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
                _context6.next = 146;
                return compilerApi.getConfiguration();
              case 146:
                _this6.__P_460_3 = _context6.sent;
                return _context6.abrupt("return", _this6.__P_460_3);
              case 148:
              case "end":
                return _context6.stop();
            }
          }, _callee6, null, [[30, 40], [56, 78, 81, 84], [102, 123, 126, 129]]);
        }))();
      },
      /**
       * Loads a .js file using `require`, handling exceptions as best as possible
       *
       * @param aPath {String} the file to load
       * @return {Object} the module
       */
      __P_460_11: function __P_460_11(aPath) {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
          var module, lines, i, lineNumber;
          return _regeneratorRuntime().wrap(function _callee7$(_context7) {
            while (1) switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                module = require(path.resolve(aPath));
                return _context7.abrupt("return", module);
              case 5:
                _context7.prev = 5;
                _context7.t0 = _context7["catch"](0);
                lines = _context7.t0.stack.split("\n");
                for (i = 0; i < lines.length; i++) {
                  if (lines[i].match(/^\s+at/)) {
                    lines.splice(i);
                  }
                }
                lineNumber = lines[0].split("evalmachine.<anonymous>:")[1];
                if (!(lineNumber !== undefined)) {
                  _context7.next = 15;
                  break;
                }
                lines.shift();
                throw new Error("Error while reading " + aPath + " at line " + lineNumber + "\n" + lines.join("\n"));
              case 15:
                throw new Error("Error while reading " + aPath + "\n" + lines.join("\n"));
              case 16:
              case "end":
                return _context7.stop();
            }
          }, _callee7, null, [[0, 5]]);
        }))();
      },
      /**
       * Returns if the file compile.js exists
       *
       * @returns {Boolean}
       */
      compileJsExists: function compileJsExists() {
        return this.__P_460_2;
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
      __P_460_1: null,
      /**
       * Returns the singleton instance, throws an error if it has not been created
       *
       * @return {qx.tool.cli.Cli}
       */
      getInstance: function getInstance() {
        if (!qx.tool.cli.Cli.__P_460_1) {
          throw new Error("CompileJs has not been initialized yet!");
        }
        return qx.tool.cli.Cli.__P_460_1;
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

//# sourceMappingURL=Cli.js.map?dt=1717235398960