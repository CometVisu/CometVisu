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
      "qx.tool.cli.commands.Command": {
        "require": true
      },
      "qx.tool.cli.ConfigDb": {},
      "qx.tool.compiler.Console": {
        "defer": "runtime"
      },
      "qx.tool.cli.Cli": {},
      "qx.tool.utils.Utils": {},
      "qx.Promise": {},
      "qx.tool.utils.files.Utils": {},
      "qx.tool.compiler.targets.BuildTarget": {},
      "qx.tool.cli.Watch": {},
      "qx.tool.compiler.targets.SourceTarget": {},
      "qx.tool.compiler.MetaDatabase": {},
      "qx.tool.compiler.targets.TypeScriptWriter": {},
      "qx.tool.utils.Debounce": {},
      "qx.lang.Type": {},
      "qx.lang.Array": {},
      "qx.tool.compiler.app.Library": {},
      "qx.tool.config.Utils": {},
      "qx.tool.compiler.makers.AppMaker": {},
      "qx.lang.Object": {},
      "qx.tool.compiler.app.Application": {},
      "qx.lang.String": {},
      "qx.tool.compiler.app.Part": {},
      "qx.tool.compiler.ClassFile": {},
      "qx.tool.config.Manifest": {},
      "qx.tool.cli.commands.package.Install": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2017 Zenesis Ltd
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (john.spackman@zenesis.com, @johnspackman)
  
  ************************************************************************ */

  var _process = require("process");
  var Gauge = require("gauge");
  var semver = require("semver");
  var path = require("upath");
  var consoleControl = require("console-control-strings");
  var fs = qx.tool.utils.Promisify.fs;
  require("app-module-path").addPath(_process.cwd() + "/node_modules");

  /**
   * Handles compilation of the project
   * @ignore(setImmediate)
   */
  qx.Class.define("qx.tool.cli.commands.Compile", {
    extend: qx.tool.cli.commands.Command,
    statics: {
      YARGS_BUILDER: {
        target: {
          alias: "t",
          describe: "Set the target type: source or build or class name. Default is first target in config file",
          requiresArg: true,
          type: "string"
        },
        "output-path-prefix": {
          describe: "Sets a prefix for the output path of the target - used to compile a version into a non-standard directory",
          type: "string"
        },
        download: {
          alias: "d",
          describe: "Whether to automatically download missing libraries",
          type: "boolean",
          "default": true
        },
        locale: {
          alias: "l",
          describe: "Compile for a given locale",
          nargs: 1,
          requiresArg: true,
          type: "string",
          array: true
        },
        "update-po-files": {
          alias: "u",
          describe: "enables detection of translations and writing them out into .po files",
          type: "boolean",
          "default": false
        },
        "library-po": {
          describe: "The policy for updating translations in libraries",
          type: ["ignore", "untranslated", "all"],
          "default": "ignore"
        },
        "write-all-translations": {
          describe: "enables output of all translations, not just those that are explicitly referenced",
          type: "boolean"
        },
        "app-class": {
          describe: "sets the application class",
          nargs: 1,
          requiresArg: true,
          type: "string"
        },
        "app-theme": {
          describe: "sets the theme class for the current application",
          nargs: 1,
          requiresArg: true,
          type: "string"
        },
        "app-name": {
          describe: "sets the name of the current application",
          nargs: 1,
          requiresArg: true,
          type: "string"
        },
        "app-group": {
          describe: "which application groups to compile (defaults to all)",
          nargs: 1,
          requiresArg: true,
          type: "string"
        },
        "local-fonts": {
          describe: "whether to prefer local font files over CDN",
          type: "boolean"
        },
        watch: {
          describe: "enables watching for changes and continuous compilation",
          type: "boolean",
          alias: "w"
        },
        "watch-debug": {
          describe: "enables debug messages for watching",
          type: "boolean"
        },
        "machine-readable": {
          alias: "M",
          describe: "output compiler messages in machine-readable format",
          type: "boolean"
        },
        minify: {
          alias: "m",
          describe: "disables minification (build targets only)",
          choices: ["off", "minify", "mangle", "beautify"],
          "default": "mangle"
        },
        "mangle-privates": {
          describe: "Whether to mangle private variables",
          "default": true,
          type: "boolean"
        },
        "save-source-in-map": {
          describe: "Saves the source code in the map file (build target only)",
          type: "boolean",
          "default": false
        },
        "source-map-relative-paths": {
          describe: "If true, the source file will be saved in the map file if the target supports it. Can be overridden on a per application basis.",
          type: "boolean",
          "default": false
        },
        "save-unminified": {
          alias: "u",
          describe: "Saves a copy of the unminified version of output files (build target only)",
          type: "boolean",
          "default": false
        },
        "inline-external-scripts": {
          describe: "Inlines external Javascript",
          type: "boolean"
        },
        erase: {
          alias: "e",
          describe: "Enabled automatic deletion of the output directory when compiler version or environment variables change",
          type: "boolean",
          "default": true
        },
        feedback: {
          describe: "Shows gas-gauge feedback",
          type: "boolean",
          alias: "f"
        },
        typescript: {
          alias: "T",
          describe: "Outputs typescript definitions in qooxdoo.d.ts",
          type: "boolean",
          "default": null
        },
        "add-created-at": {
          describe: "Adds code to populate object's $$createdAt",
          type: "boolean"
        },
        "verbose-created-at": {
          describe: "Adds additional detail to $$createdAt",
          type: "boolean"
        },
        clean: {
          alias: "D",
          describe: "Deletes the target dir before compile",
          type: "boolean"
        },
        "warn-as-error": {
          alias: "E",
          describe: "Handle compiler warnings as error",
          type: "boolean",
          "default": false
        },
        "write-library-info": {
          alias: "I",
          describe: "Write library information to the script, for reflection",
          type: "boolean",
          "default": true
        },
        "write-compile-info": {
          describe: "Write application summary information to the script, used mostly for unit tests",
          type: "boolean",
          "default": false
        },
        bundling: {
          alias: "b",
          describe: "Whether bundling is enabled",
          type: "boolean",
          "default": true
        }
      },
      getYargsCommand: function getYargsCommand() {
        return {
          command: "compile",
          describe: "compiles the current application, using compile.json",
          builder: qx.tool.cli.commands.Compile.YARGS_BUILDER
        };
      }
    },
    events: {
      /**
       * Fired when application writing starts
       */
      writingApplications: "qx.event.type.Event",
      /**
       * Fired when writing of single application starts; data is an object containing:
       *   maker {qx.tool.compiler.makers.Maker}
       *   target {qx.tool.compiler.targets.Target}
       *   appMeta {qx.tool.compiler.targets.meta.ApplicationMeta}
       */
      writingApplication: "qx.event.type.Data",
      /**
       * Fired when writing of single application is complete; data is an object containing:
       *   maker {qx.tool.compiler.makers.Maker}
       *   target {qx.tool.compiler.targets.Target}
       *   appMeta {qx.tool.compiler.targets.meta.ApplicationMeta}
       *
       * Note that target.getAppMeta() will return null after this event has been fired
       */
      writtenApplication: "qx.event.type.Data",
      /**
       * Fired after writing of all applications; data is an object containing an array,
       * each of which has previously been passed with `writeApplication`:
       *   maker {qx.tool.compiler.makers.Maker}
       *   target {qx.tool.compiler.targets.Target}
       *   appMeta {qx.tool.compiler.targets.meta.ApplicationMeta}
       *
       * Note that target.getAppMeta() will return null after this event has been fired
       */
      writtenApplications: "qx.event.type.Data",
      /**
       * Fired after writing of all meta data; data is an object containing:
       *   maker {qx.tool.compiler.makers.Maker}
       */
      writtenMetaData: "qx.event.type.Data",
      /**
       * Fired when a class is about to be compiled.
       *
       * The event data is an object with the following properties:
       *
       * dbClassInfo: {Object} the newly populated class info
       * oldDbClassInfo: {Object} the previous populated class info
       * classFile - {ClassFile} the qx.tool.compiler.ClassFile instance
       */
      compilingClass: "qx.event.type.Data",
      /**
       * Fired when a class is compiled.
       *
       * The event data is an object with the following properties:
       * dbClassInfo: {Object} the newly populated class info
       * oldDbClassInfo: {Object} the previous populated class info
       * classFile - {ClassFile} the qx.tool.compiler.ClassFile instance
       */
      compiledClass: "qx.event.type.Data",
      /**
       * Fired when the database is been saved
       *
       *  data:
       * database: {Object} the database to save
       */
      saveDatabase: "qx.event.type.Data",
      /**
       * Fired after all enviroment data is collected
       *
       * The event data is an object with the following properties:
       *  application {qx.tool.compiler.app.Application} the app
       *  enviroment: {Object} enviroment data
       */
      checkEnvironment: "qx.event.type.Data",
      /**
       * Fired when making of apps begins
       */
      making: "qx.event.type.Event",
      /**
       * Fired when making of apps is done.
       */
      made: "qx.event.type.Event",
      /**
       * Fired when minification begins.
       *
       * The event data is an object with the following properties:
       *  application {qx.tool.compiler.app.Application} the app being minified
       *  part: {String} the part being minified
       *  filename: {String} the part filename
       */
      minifyingApplication: "qx.event.type.Data",
      /**
       * Fired when minification is done.
       *
       * The event data is an object with the following properties:
       *  application {qx.tool.compiler.app.Application} the app being minified
       *  part: {String} the part being minified
       *  filename: {String} the part filename
       */
      minifiedApplication: "qx.event.type.Data"
    },
    members: {
      __P_465_0: null,
      __P_465_1: null,
      __P_465_2: null,
      __P_465_3: false,
      /** @type{String} the path to the root of the meta files by classname */
      __P_465_4: null,
      /** @type{Boolean} whether the typescript output is enabled */
      __P_465_5: false,
      /** @type{String} the name of the typescript file to generate */
      __P_465_6: null,
      /*
       * @Override
       */
      process: function process() {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var configDb, _configDb, color, colorOn, colorReset, Console, themes, ourTheme, _colorOn, TYPES, success, hasWarnings;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return qx.tool.cli.commands.Compile.superclass.prototype.process.call(_this);
              case 2:
                _context.next = 4;
                return qx.tool.cli.ConfigDb.getInstance();
              case 4:
                configDb = _context.sent;
                if (_this.argv["feedback"] === null) {
                  _this.argv["feedback"] = configDb.db("qx.default.feedback", true);
                }
                if (!_this.argv.verbose) {
                  _context.next = 18;
                  break;
                }
                _context.t0 = console;
                _context.t2 = "\nCompiler:  v".concat(_this.getCompilerVersion(), " in ").concat(require.main.filename, "\nFramework: v");
                _context.next = 11;
                return _this.getQxVersion();
              case 11:
                _context.t3 = _context.sent;
                _context.t1 = _context.t2.concat.call(_context.t2, _context.t3, " in ");
                _context.next = 15;
                return _this.getQxPath();
              case 15:
                _context.t4 = _context.sent;
                _context.t5 = _context.t1.concat.call(_context.t1, _context.t4);
                _context.t0.log.call(_context.t0, _context.t5);
              case 18:
                if (!_this.argv["machine-readable"]) {
                  _context.next = 22;
                  break;
                }
                qx.tool.compiler.Console.getInstance().setMachineReadable(true);
                _context.next = 28;
                break;
              case 22:
                _context.next = 24;
                return qx.tool.cli.ConfigDb.getInstance();
              case 24:
                _configDb = _context.sent;
                color = _configDb.db("qx.default.color", null);
                if (color) {
                  colorOn = consoleControl.color(color.split(" "));
                  _process.stdout.write(colorOn + consoleControl.eraseLine());
                  colorReset = consoleControl.color("reset");
                  _process.on("exit", function () {
                    return _process.stdout.write(colorReset + consoleControl.eraseLine());
                  });
                  Console = qx.tool.compiler.Console.getInstance();
                  Console.setColorOn(colorOn);
                }
                if (_this.argv["feedback"]) {
                  themes = require("gauge/themes");
                  ourTheme = themes.newTheme(themes({
                    hasUnicode: true,
                    hasColor: true
                  }));
                  _colorOn = qx.tool.compiler.Console.getInstance().getColorOn();
                  ourTheme.preProgressbar = _colorOn + ourTheme.preProgressbar;
                  ourTheme.preSubsection = _colorOn + ourTheme.preSubsection;
                  ourTheme.progressbarTheme.postComplete += _colorOn;
                  ourTheme.progressbarTheme.postRemaining += _colorOn;
                  _this.__P_465_0 = new Gauge();
                  _this.__P_465_0.setTheme(ourTheme);
                  _this.__P_465_0.show("Compiling", 0);
                  TYPES = {
                    error: "ERROR",
                    warning: "Warning"
                  };
                  qx.tool.compiler.Console.getInstance().setWriter(function (str, msgId) {
                    msgId = qx.tool.compiler.Console.MESSAGE_IDS[msgId];
                    if (!msgId || msgId.type !== "message") {
                      _this.__P_465_0.hide();
                      qx.tool.compiler.Console.log(_colorOn + TYPES[(msgId || {}).type || "error"] + ": " + str);
                      _this.__P_465_0.show();
                    } else {
                      _this.__P_465_0.show(_colorOn + str);
                    }
                  });
                }
              case 28:
                if (_this.__P_465_0) {
                  _this.addListener("writingApplications", function () {
                    return _this.__P_465_0.show("Writing Applications", 0);
                  });
                  _this.addListener("writtenApplications", function () {
                    return _this.__P_465_0.show("Writing Applications", 1);
                  });
                  _this.addListener("writingApplication", function (evt) {
                    return _this.__P_465_0.pulse("Writing Application " + evt.getData().appMeta.getApplication().getName());
                  });
                  _this.addListener("compilingClass", function (evt) {
                    return _this.__P_465_0.pulse("Compiling " + evt.getData().classFile.getClassName());
                  });
                  _this.addListener("minifyingApplication", function (evt) {
                    return _this.__P_465_0.pulse("Minifying " + evt.getData().application.getName() + " " + evt.getData().filename);
                  });
                } else {
                  _this.addListener("writingApplication", function (evt) {
                    var appInfo = evt.getData();
                    qx.tool.compiler.Console.print("qx.tool.cli.compile.writingApplication", appInfo.appMeta.getApplication().getName());
                  });
                  _this.addListener("minifyingApplication", function (evt) {
                    return qx.tool.compiler.Console.print("qx.tool.cli.compile.minifyingApplication", evt.getData().application.getName(), evt.getData().filename);
                  });
                }
                _this.addListener("making", function (evt) {
                  if (_this.__P_465_0) {
                    _this.__P_465_0.show("Compiling", 1);
                  } else {
                    qx.tool.compiler.Console.print("qx.tool.cli.compile.makeBegins");
                  }
                });
                _this.addListener("made", function (evt) {
                  if (_this.__P_465_0) {
                    _this.__P_465_0.show("Compiling", 1);
                  } else {
                    qx.tool.compiler.Console.print("qx.tool.cli.compile.makeEnds");
                  }
                });
                _this.addListener("writtenApplications", function (e) {
                  if (_this.argv.verbose) {
                    qx.tool.compiler.Console.log("\nCompleted all applications, libraries used are:");
                    Object.values(_this.__P_465_2).forEach(function (lib) {
                      return qx.tool.compiler.Console.log("   ".concat(lib.getNamespace(), " (").concat(lib.getRootDir(), ")"));
                    });
                  }
                });
                _context.next = 34;
                return _this._loadConfigAndStartMaking();
              case 34:
                if (!_this.argv.watch) {
                  success = _this.__P_465_1.every(function (maker) {
                    return maker.getSuccess();
                  });
                  hasWarnings = _this.__P_465_1.every(function (maker) {
                    return maker.getHasWarnings();
                  });
                  if (success && hasWarnings && _this.argv.warnAsError) {
                    success = false;
                  }
                  if (!_this.argv.deploying && !_this.argv["machine-readable"] && _this.argv["feedback"] && _this.__P_465_3 && _this.argv.target === "build") {
                    qx.tool.compiler.Console.warn("   *******************************************************************************************\n   **                                                                                       **\n   **  Your compilation will include temporary files that are only necessary during         **\n   **  development; these files speed up the compilation, but take up space that you would  **\n   **  probably not want to put on a production server.                                     **\n   **                                                                                       **\n   **  When you are ready to deploy, try running `qx deploy` to get a minimised version     **\n   **                                                                                       **\n   *******************************************************************************************");
                  }
                  _process.exitCode = success ? 0 : 1;
                }
              case 35:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      /**
       * Loads the configuration and starts the make
       *
       * @return {Boolean} true if all makers succeeded
       */
      _loadConfigAndStartMaking: function _loadConfigAndStartMaking() {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
          var config, makers, countMaking, collateDispatchEvent, isFirstWatcher;
          return _regeneratorRuntime().wrap(function _callee7$(_context7) {
            while (1) switch (_context7.prev = _context7.next) {
              case 0:
                if (!_this2.getCompilerApi().compileJsonExists() && !qx.tool.cli.Cli.getInstance().compileJsExists()) {
                  qx.tool.compiler.Console.error("Cannot find either compile.json nor compile.js");
                  _process.exit(1);
                }
                config = _this2.getCompilerApi().getConfiguration();
                _context7.next = 4;
                return _this2.createMakersFromConfig(config);
              case 4:
                makers = _this2.__P_465_1 = _context7.sent;
                if (!(!makers || !makers.length)) {
                  _context7.next = 7;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Error: Cannot find anything to make");
              case 7:
                countMaking = 0;
                collateDispatchEvent = function collateDispatchEvent(evt) {
                  if (countMaking == 1) {
                    _this2.dispatchEvent(evt.clone());
                  }
                };
                isFirstWatcher = true;
                _context7.next = 12;
                return qx.Promise.all(makers.map( /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(maker) {
                    var analyser, cfg, target, appInfos, stat, watch, arr;
                    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                      while (1) switch (_context6.prev = _context6.next) {
                        case 0:
                          analyser = maker.getAnalyser();
                          _context6.next = 3;
                          return qx.tool.cli.ConfigDb.getInstance();
                        case 3:
                          cfg = _context6.sent;
                          analyser.setWritePoLineNumbers(cfg.db("qx.translation.strictPoCompatibility", false));
                          _context6.next = 7;
                          return fs.existsAsync(maker.getOutputDir());
                        case 7:
                          if (_context6.sent) {
                            _context6.next = 9;
                            break;
                          }
                          _this2.__P_465_3 = true;
                        case 9:
                          if (!_this2.argv["clean"]) {
                            _context6.next = 16;
                            break;
                          }
                          _context6.next = 12;
                          return maker.eraseOutputDir();
                        case 12:
                          _context6.next = 14;
                          return qx.tool.utils.files.Utils.safeUnlink(analyser.getDbFilename());
                        case 14:
                          _context6.next = 16;
                          return qx.tool.utils.files.Utils.safeUnlink(analyser.getResDbFilename());
                        case 16:
                          if (config.ignores) {
                            analyser.setIgnores(config.ignores);
                          }
                          target = maker.getTarget();
                          analyser.addListener("compilingClass", function (e) {
                            return _this2.dispatchEvent(e.clone());
                          });
                          analyser.addListener("compiledClass", function (e) {
                            return _this2.dispatchEvent(e.clone());
                          });
                          analyser.addListener("saveDatabase", function (e) {
                            return _this2.dispatchEvent(e.clone());
                          });
                          target.addListener("checkEnvironment", function (e) {
                            return _this2.dispatchEvent(e.clone());
                          });
                          appInfos = [];
                          target.addListener("writingApplication", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
                            var appInfo;
                            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                              while (1) switch (_context2.prev = _context2.next) {
                                case 0:
                                  appInfo = {
                                    maker: maker,
                                    target: target,
                                    appMeta: target.getAppMeta()
                                  };
                                  appInfos.push(appInfo);
                                  _context2.next = 4;
                                  return _this2.fireDataEventAsync("writingApplication", appInfo);
                                case 4:
                                case "end":
                                  return _context2.stop();
                              }
                            }, _callee2);
                          })));
                          target.addListener("writtenApplication", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
                            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                              while (1) switch (_context3.prev = _context3.next) {
                                case 0:
                                  _context3.next = 2;
                                  return _this2.fireDataEventAsync("writtenApplication", {
                                    maker: maker,
                                    target: target,
                                    appMeta: target.getAppMeta()
                                  });
                                case 2:
                                case "end":
                                  return _context3.stop();
                              }
                            }, _callee3);
                          })));
                          maker.addListener("writingApplications", collateDispatchEvent);
                          maker.addListener("writtenApplications", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
                            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                              while (1) switch (_context4.prev = _context4.next) {
                                case 0:
                                  _context4.next = 2;
                                  return _this2.fireDataEventAsync("writtenApplications", appInfos);
                                case 2:
                                case "end":
                                  return _context4.stop();
                              }
                            }, _callee4);
                          })));
                          if (target instanceof qx.tool.compiler.targets.BuildTarget) {
                            target.addListener("minifyingApplication", function (e) {
                              return _this2.dispatchEvent(e.clone());
                            });
                            target.addListener("minifiedApplication", function (e) {
                              return _this2.dispatchEvent(e.clone());
                            });
                          }
                          _context6.next = 30;
                          return qx.tool.utils.files.Utils.safeStat("source/index.html");
                        case 30:
                          stat = _context6.sent;
                          if (stat) {
                            qx.tool.compiler.Console.print("qx.tool.cli.compile.legacyFiles", "source/index.html");
                          }

                          // Simple one of make
                          if (_this2.argv.watch) {
                            _context6.next = 38;
                            break;
                          }
                          maker.addListener("making", function () {
                            countMaking++;
                            if (countMaking == 1) {
                              _this2.fireEvent("making");
                            }
                          });
                          maker.addListener("made", function () {
                            countMaking--;
                            if (countMaking == 0) {
                              _this2.fireEvent("made");
                            }
                          });
                          _context6.next = 37;
                          return maker.make();
                        case 37:
                          return _context6.abrupt("return", _context6.sent);
                        case 38:
                          // Continuous make
                          watch = new qx.tool.cli.Watch(maker);
                          config.applications.forEach(function (appConfig) {
                            if (appConfig.runWhenWatching) {
                              watch.setRunWhenWatching(appConfig.name, appConfig.runWhenWatching);
                            }
                          });
                          if (_this2.argv["watch-debug"]) {
                            watch.setDebug(true);
                          }
                          watch.addListener("making", function () {
                            countMaking++;
                            if (countMaking == 1) {
                              _this2.fireEvent("making");
                            }
                          });
                          watch.addListener("made", function () {
                            countMaking--;
                            if (countMaking == 0) {
                              _this2.fireEvent("made");
                            }
                          });
                          watch.addListener("configChanged", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
                            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                              while (1) switch (_context5.prev = _context5.next) {
                                case 0:
                                  _context5.next = 2;
                                  return watch.stop();
                                case 2:
                                  setImmediate(function () {
                                    return _this2._loadConfigAndStartMaking();
                                  });
                                case 3:
                                case "end":
                                  return _context5.stop();
                              }
                            }, _callee5);
                          })));
                          arr = [_this2._compileJsFilename, _this2._compileJsonFilename].filter(function (str) {
                            return Boolean(str);
                          });
                          watch.setConfigFilenames(arr);
                          if (!(target instanceof qx.tool.compiler.targets.SourceTarget && isFirstWatcher)) {
                            _context6.next = 56;
                            break;
                          }
                          isFirstWatcher = false;
                          _context6.prev = 48;
                          _context6.next = 51;
                          return _this2.__P_465_7(watch);
                        case 51:
                          _context6.next = 56;
                          break;
                        case 53:
                          _context6.prev = 53;
                          _context6.t0 = _context6["catch"](48);
                          qx.tool.compiler.Console.error(_context6.t0);
                        case 56:
                          return _context6.abrupt("return", watch.start());
                        case 57:
                        case "end":
                          return _context6.stop();
                      }
                    }, _callee6, null, [[48, 53]]);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }()));
              case 12:
                if (_this2.argv.watch) {
                  _context7.next = 21;
                  break;
                }
                _context7.prev = 13;
                _context7.next = 16;
                return _this2.__P_465_7(null);
              case 16:
                _context7.next = 21;
                break;
              case 18:
                _context7.prev = 18;
                _context7.t0 = _context7["catch"](13);
                qx.tool.compiler.Console.error(_context7.t0);
              case 21:
              case "end":
                return _context7.stop();
            }
          }, _callee7, null, [[13, 18]]);
        }))();
      },
      __P_465_7: function __P_465_7(watch) {
        var _this3 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
          var classFiles, scanImpl, metaDb, _i, _Object$values, lib, dir, _iterator, _step, filename, tsWriter, debounce;
          return _regeneratorRuntime().wrap(function _callee10$(_context10) {
            while (1) switch (_context10.prev = _context10.next) {
              case 0:
                classFiles = []; // Scans a directory recursively to find all .js files
                scanImpl = /*#__PURE__*/function () {
                  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(filename) {
                    var basename, stat, files, i, subname;
                    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                      while (1) switch (_context8.prev = _context8.next) {
                        case 0:
                          basename = path.basename(filename);
                          _context8.next = 3;
                          return fs.promises.stat(filename);
                        case 3:
                          stat = _context8.sent;
                          if (!(stat.isFile() && basename.match(/\.js$/))) {
                            _context8.next = 8;
                            break;
                          }
                          classFiles.push(filename);
                          _context8.next = 20;
                          break;
                        case 8:
                          if (!(stat.isDirectory() && (basename == "." || basename[0] != "."))) {
                            _context8.next = 20;
                            break;
                          }
                          _context8.next = 11;
                          return fs.promises.readdir(filename);
                        case 11:
                          files = _context8.sent;
                          i = 0;
                        case 13:
                          if (!(i < files.length)) {
                            _context8.next = 20;
                            break;
                          }
                          subname = path.join(filename, files[i]);
                          _context8.next = 17;
                          return scanImpl(subname);
                        case 17:
                          i++;
                          _context8.next = 13;
                          break;
                        case 20:
                        case "end":
                          return _context8.stop();
                      }
                    }, _callee8);
                  }));
                  return function scanImpl(_x2) {
                    return _ref6.apply(this, arguments);
                  };
                }(); // Do the initial scan
                qx.tool.compiler.Console.info("Loading meta data ...");
                metaDb = new qx.tool.compiler.MetaDatabase().set({
                  rootDir: _this3.__P_465_4
                });
                _context10.next = 6;
                return metaDb.load();
              case 6:
                // Scan all library directories
                metaDb.getDatabase().libraries = {};
                _i = 0, _Object$values = Object.values(_this3.__P_465_2);
              case 8:
                if (!(_i < _Object$values.length)) {
                  _context10.next = 17;
                  break;
                }
                lib = _Object$values[_i];
                dir = path.join(lib.getRootDir(), lib.getSourcePath());
                metaDb.getDatabase().libraries[lib.getNamespace()] = {
                  sourceDir: dir
                };
                _context10.next = 14;
                return scanImpl(dir);
              case 14:
                _i++;
                _context10.next = 8;
                break;
              case 17:
                _iterator = _createForOfIteratorHelper(classFiles);
                _context10.prev = 18;
                _iterator.s();
              case 20:
                if ((_step = _iterator.n()).done) {
                  _context10.next = 26;
                  break;
                }
                filename = _step.value;
                _context10.next = 24;
                return metaDb.addFile(filename, !!_this3.argv.clean);
              case 24:
                _context10.next = 20;
                break;
              case 26:
                _context10.next = 31;
                break;
              case 28:
                _context10.prev = 28;
                _context10.t0 = _context10["catch"](18);
                _iterator.e(_context10.t0);
              case 31:
                _context10.prev = 31;
                _iterator.f();
                return _context10.finish(31);
              case 34:
                _context10.next = 36;
                return metaDb.reparseAll();
              case 36:
                _context10.next = 38;
                return metaDb.save();
              case 38:
                _context10.next = 40;
                return _this3.fireDataEventAsync("writtenMetaData", metaDb);
              case 40:
                // Do the inital write
                tsWriter = null;
                if (!_this3.__P_465_5) {
                  _context10.next = 47;
                  break;
                }
                qx.tool.compiler.Console.info("Generating typescript output ...");
                tsWriter = new qx.tool.compiler.targets.TypeScriptWriter(metaDb);
                if (_this3.__P_465_6) {
                  tsWriter.setOutputTo(_this3.__P_465_6);
                } else {
                  tsWriter.setOutputTo(path.join(_this3.__P_465_4, "..", "qooxdoo.d.ts"));
                }
                _context10.next = 47;
                return tsWriter.process();
              case 47:
                if (watch) {
                  _context10.next = 49;
                  break;
                }
                return _context10.abrupt("return");
              case 49:
                // Redo the files that change, as they change
                classFiles = {};
                debounce = new qx.tool.utils.Debounce( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
                  var filesParsed, addFilePromises, arr;
                  return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                    while (1) switch (_context9.prev = _context9.next) {
                      case 0:
                        filesParsed = false;
                        qx.tool.compiler.Console.info("Loading meta data ...");
                        addFilePromises = [];
                      case 3:
                        if (!true) {
                          _context9.next = 12;
                          break;
                        }
                        arr = Object.keys(classFiles);
                        if (!(arr.length == 0)) {
                          _context9.next = 7;
                          break;
                        }
                        return _context9.abrupt("break", 12);
                      case 7:
                        filesParsed = true;
                        classFiles = {};
                        arr.forEach(function (filename) {
                          if (_this3.argv.verbose) {
                            qx.tool.compiler.Console.info("Processing meta for ".concat(filename, " ..."));
                          }
                          addFilePromises.push(metaDb.addFile(filename));
                        });
                        _context9.next = 3;
                        break;
                      case 12:
                        if (!filesParsed) {
                          _context9.next = 23;
                          break;
                        }
                        qx.tool.compiler.Console.info("Generating typescript output ...");
                        _context9.next = 16;
                        return Promise.all(addFilePromises);
                      case 16:
                        _context9.next = 18;
                        return metaDb.reparseAll();
                      case 18:
                        _context9.next = 20;
                        return metaDb.save();
                      case 20:
                        if (!_this3.__P_465_5) {
                          _context9.next = 23;
                          break;
                        }
                        _context9.next = 23;
                        return tsWriter.process();
                      case 23:
                      case "end":
                        return _context9.stop();
                    }
                  }, _callee9);
                }))); // Watch for changes
                watch.addListener("fileChanged", function (evt) {
                  var data = evt.getData();
                  if (data.fileType == "source") {
                    var filename = data.library.getFilename(data.filename);
                    classFiles[filename] = true;
                    debounce.run();
                  }
                });
              case 52:
              case "end":
                return _context10.stop();
            }
          }, _callee10, null, [[18, 28, 31, 34]]);
        }))();
      },
      /**
       * Processes the configuration from a JSON data structure and creates a Maker
       *
       * @param data {Map}
       * @return {qx.tool.compiler.makers.Maker}
       */
      createMakersFromConfig: function createMakersFromConfig(data) {
        var _this4 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
          var _data$meta, _data$meta2, _data$meta4;
          var Console, t, _data$babel, _data$meta3, argvAppNames, argvAppGroups, targetConfigs, defaultTargetConfig, allAppNames, libraries, librariesArray, _iterator2, _step2, libPath, _library2, qxLib, qxPath, library, errors, targetOutputPaths, makers;
          return _regeneratorRuntime().wrap(function _callee11$(_context11) {
            while (1) switch (_context11.prev = _context11.next) {
              case 0:
                Console = qx.tool.compiler.Console.getInstance();
                t = _this4;
                if (data.babelOptions) {
                  if (!(data !== null && data !== void 0 && (_data$babel = data.babel) !== null && _data$babel !== void 0 && _data$babel.options)) {
                    data.babel = data.babel || {};
                    data.babel.options = data.babelOptions;
                    qx.tool.compiler.Console.print("qx.tool.cli.compile.deprecatedBabelOptions");
                  } else {
                    qx.tool.compiler.Console.print("qx.tool.cli.compile.deprecatedBabelOptionsConflicting");
                  }
                  delete data.babelOptions;
                }
                if (qx.lang.Type.isBoolean(data === null || data === void 0 || (_data$meta = data.meta) === null || _data$meta === void 0 ? void 0 : _data$meta.typescript)) {
                  _this4.__P_465_5 = data.meta.typescript;
                } else if (qx.lang.Type.isString(data === null || data === void 0 || (_data$meta2 = data.meta) === null || _data$meta2 === void 0 ? void 0 : _data$meta2.typescript)) {
                  _this4.__P_465_5 = true;
                  _this4.__P_465_6 = path.relative(_process.cwd(), path.resolve(data === null || data === void 0 || (_data$meta3 = data.meta) === null || _data$meta3 === void 0 ? void 0 : _data$meta3.typescript));
                }
                if (qx.lang.Type.isBoolean(_this4.argv.typescript)) {
                  _this4.__P_465_5 = _this4.argv.typescript;
                }
                argvAppNames = null;
                if (t.argv["app-name"]) {
                  argvAppNames = {};
                  t.argv["app-name"].split(",").forEach(function (name) {
                    return argvAppNames[name] = true;
                  });
                }
                argvAppGroups = null;
                if (t.argv["app-group"]) {
                  argvAppGroups = {};
                  t.argv["app-group"].split(",").forEach(function (name) {
                    return argvAppGroups[name] = true;
                  });
                }

                /*
                 * Calculate the the list of targets and applications; this is a many to many list, where an
                 * application can be compiled for many targets, and each target has many applications.
                 *
                 * Each target configuration is updated to have `appConfigs[]` and each application configuration
                 * is updated to have `targetConfigs[]`.
                 */
                data.targets.forEach(function (targetConfig, index) {
                  return targetConfig.index = index;
                });
                targetConfigs = [];
                defaultTargetConfig = null;
                data.targets.forEach(function (targetConfig) {
                  if (targetConfig.type === _this4.getTargetType()) {
                    if (!targetConfig["application-names"] && !targetConfig["application-types"]) {
                      if (defaultTargetConfig) {
                        qx.tool.compiler.Console.print("qx.tool.cli.compile.multipleDefaultTargets");
                      } else {
                        defaultTargetConfig = targetConfig;
                      }
                    } else {
                      targetConfigs.push(targetConfig);
                    }
                  }
                });
                allAppNames = {};
                data.applications.forEach(function (appConfig, index) {
                  if (appConfig.name) {
                    if (allAppNames[appConfig.name]) {
                      throw new qx.tool.utils.Utils.UserError("Multiple applications with the same name '".concat(appConfig.name, "'"));
                    }
                    allAppNames[appConfig.name] = appConfig;
                  }
                  if (appConfig.group) {
                    if (typeof appConfig.group == "string") {
                      appConfig.group = [appConfig.group];
                    }
                  }
                  appConfig.index = index;
                  var appType = appConfig.type || "browser";
                  var appTargetConfigs = targetConfigs.filter(function (targetConfig) {
                    var appTypes = targetConfig["application-types"];
                    if (appTypes && !qx.lang.Array.contains(appTypes, appType)) {
                      return false;
                    }
                    var appNames = targetConfig["application-names"];
                    if (appConfig.name && appNames && !qx.lang.Array.contains(appNames, appConfig.name)) {
                      return false;
                    }
                    return true;
                  });
                  if (appTargetConfigs.length == 0) {
                    if (defaultTargetConfig) {
                      appTargetConfigs = [defaultTargetConfig];
                    } else {
                      throw new qx.tool.utils.Utils.UserError("Cannot find any suitable targets for application #".concat(index, " (named ").concat(appConfig.name || "unnamed", ")"));
                    }
                  }
                  appTargetConfigs.forEach(function (targetConfig) {
                    if (!targetConfig.appConfigs) {
                      targetConfig.appConfigs = [];
                    }
                    targetConfig.appConfigs.push(appConfig);
                    if (!appConfig.targetConfigs) {
                      appConfig.targetConfigs = [];
                    }
                    appConfig.targetConfigs.push(targetConfig);
                  });
                });
                if (defaultTargetConfig && defaultTargetConfig.appConfigs) {
                  targetConfigs.push(defaultTargetConfig);
                }
                libraries = _this4.__P_465_2 = {};
                librariesArray = [];
                _iterator2 = _createForOfIteratorHelper(data.libraries);
                _context11.prev = 19;
                _iterator2.s();
              case 21:
                if ((_step2 = _iterator2.n()).done) {
                  _context11.next = 30;
                  break;
                }
                libPath = _step2.value;
                _context11.next = 25;
                return qx.tool.compiler.app.Library.createLibrary(libPath);
              case 25:
                _library2 = _context11.sent;
                libraries[_library2.getNamespace()] = _library2;
                librariesArray.push(_library2);
              case 28:
                _context11.next = 21;
                break;
              case 30:
                _context11.next = 35;
                break;
              case 32:
                _context11.prev = 32;
                _context11.t0 = _context11["catch"](19);
                _iterator2.e(_context11.t0);
              case 35:
                _context11.prev = 35;
                _iterator2.f();
                return _context11.finish(35);
              case 38:
                // Search for Qooxdoo library if not already provided
                qxLib = libraries["qx"];
                if (qxLib) {
                  _context11.next = 49;
                  break;
                }
                _context11.next = 42;
                return qx.tool.config.Utils.getQxPath();
              case 42:
                qxPath = _context11.sent;
                _context11.next = 45;
                return qx.tool.compiler.app.Library.createLibrary(qxPath);
              case 45:
                library = _context11.sent;
                libraries[library.getNamespace()] = library;
                librariesArray.push(library);
                qxLib = libraries["qx"];
              case 49:
                if (_this4.argv.verbose) {
                  Console.log("Qooxdoo found in " + qxLib.getRootDir());
                }
                _context11.next = 52;
                return _this4.__P_465_8(Object.values(libraries), data.packages);
              case 52:
                errors = _context11.sent;
                if (!(errors.length > 0)) {
                  _context11.next = 59;
                  break;
                }
                if (!_this4.argv.warnAsError) {
                  _context11.next = 58;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError(errors.join("\n"));
              case 58:
                qx.tool.compiler.Console.log(errors.join("\n"));
              case 59:
                /*
                 * Figure out which will be the default application; this will need some work for situations
                 * where there are multiple browser based targets
                 */
                targetConfigs.forEach(function (targetConfig) {
                  var hasExplicitDefaultApp = false;
                  targetConfig.defaultAppConfig = null;
                  if (targetConfig.appConfigs) {
                    targetConfig.appConfigs.forEach(function (appConfig) {
                      if (appConfig.type && appConfig.type != "browser") {
                        return;
                      }
                      var setDefault;
                      if (appConfig.writeIndexHtmlToRoot !== undefined) {
                        qx.tool.compiler.Console.print("qx.tool.cli.compile.deprecatedCompileSeeOther", "application.writeIndexHtmlToRoot", "application.default");
                        setDefault = appConfig.writeIndexHtmlToRoot;
                      } else if (appConfig["default"] !== undefined) {
                        setDefault = appConfig["default"];
                      }
                      if (setDefault !== undefined) {
                        if (setDefault) {
                          if (hasExplicitDefaultApp) {
                            throw new qx.tool.utils.Utils.UserError("Error: Can only set one application to be the default application!");
                          }
                          hasExplicitDefaultApp = true;
                          targetConfig.defaultAppConfig = appConfig;
                        }
                      } else if (!targetConfig.defaultAppConfig) {
                        targetConfig.defaultAppConfig = appConfig;
                      }
                    });
                    if (!hasExplicitDefaultApp && targetConfig.appConfigs.length > 1) {
                      targetConfig.defaultAppConfig = targetConfig.appConfigs[0];
                    }
                  }
                });

                /*
                 * There is still only one target per maker, so convert our list of targetConfigs into an array of makers
                 */
                targetOutputPaths = {};
                makers = [];
                _this4.__P_465_4 = (_data$meta4 = data.meta) === null || _data$meta4 === void 0 ? void 0 : _data$meta4.output;
                if (!_this4.__P_465_4) {
                  _this4.__P_465_4 = path.relative(_process.cwd(), path.resolve(targetConfigs[0].outputPath, "../meta"));
                }
                targetConfigs.forEach(function (targetConfig) {
                  if (!targetConfig.appConfigs) {
                    qx.tool.compiler.Console.print("qx.tool.cli.compile.unusedTarget", targetConfig.type, targetConfig.index);
                    return;
                  }
                  var appConfigs = targetConfig.appConfigs.filter(function (appConfig) {
                    if (argvAppGroups) {
                      var groups = appConfig.group || [];
                      if (!groups.find(function (groupName) {
                        return !!argvAppGroups[groupName];
                      })) {
                        return false;
                      }
                    }
                    if (argvAppNames && appConfig.name) {
                      if (!argvAppNames[appConfig.name]) {
                        return false;
                      }
                    }
                    return true;
                  });
                  if (!appConfigs.length) {
                    return;
                  }
                  var outputPath = targetConfig.outputPath;
                  if (_this4.argv.outputPathPrefix) {
                    outputPath = path.join(_this4.argv.outputPathPrefix, outputPath);
                  }
                  if (!outputPath) {
                    throw new qx.tool.utils.Utils.UserError("Missing output-path for target " + targetConfig.type);
                  }
                  var absOutputPath = path.resolve(outputPath);
                  if (targetOutputPaths[absOutputPath]) {
                    throw new qx.tool.utils.Utils.UserError("Multiple output targets share the same target directory ".concat(outputPath, " - each target output must be unique"));
                  }
                  targetOutputPaths[absOutputPath] = true;
                  var maker = new qx.tool.compiler.makers.AppMaker();
                  if (!_this4.argv["erase"]) {
                    maker.setNoErase(true);
                  }
                  var targetClass = targetConfig.targetClass ? _this4.resolveTargetClass(targetConfig.targetClass) : null;
                  if (!targetClass && targetConfig.type) {
                    targetClass = _this4.resolveTargetClass(targetConfig.type);
                  }
                  if (!targetClass) {
                    throw new qx.tool.utils.Utils.UserError("Cannot find target class: " + (targetConfig.targetClass || targetConfig.type));
                  }
                  /* eslint-disable new-cap */
                  var target = new targetClass(outputPath);
                  /* eslint-enable new-cap */
                  if (targetConfig.uri) {
                    qx.tool.compiler.Console.print("qx.tool.cli.compile.deprecatedUri", "target.uri", targetConfig.uri);
                  }
                  if (targetConfig.addTimestampsToUrls !== undefined) {
                    target.setAddTimestampsToUrls(targetConfig.addTimestampsToUrls);
                  } else {
                    target.setAddTimestampsToUrls(target instanceof qx.tool.compiler.targets.BuildTarget);
                  }
                  if (targetConfig.writeCompileInfo || _this4.argv.writeCompileInfo) {
                    target.setWriteCompileInfo(true);
                  }
                  if (data.i18nAsParts) {
                    target.setI18nAsParts(true);
                  }
                  target.setWriteLibraryInfo(_this4.argv.writeLibraryInfo);
                  target.setUpdatePoFiles(_this4.argv.updatePoFiles);
                  target.setLibraryPoPolicy(_this4.argv.libraryPo);
                  var fontsConfig = targetConfig.fonts || {};
                  var preferLocalFonts = true;
                  if (_this4.argv.localFonts !== undefined) {
                    preferLocalFonts = _this4.argv.localFonts;
                  } else if (fontsConfig.local !== undefined) {
                    preferLocalFonts = fontsConfig.local;
                  }
                  target.setPreferLocalFonts(preferLocalFonts);
                  if (fontsConfig.fontTypes !== undefined) {
                    target.setFontTypes(fontsConfig.fontTypes);
                  }
                  // Take the command line for `minify` as most precedent only if provided
                  var minify;
                  if (_process.argv.indexOf("--minify") > -1) {
                    minify = t.argv["minify"];
                  }
                  minify = minify || targetConfig["minify"] || t.argv["minify"];
                  if (typeof minify == "boolean") {
                    minify = minify ? "minify" : "off";
                  }
                  if (!minify) {
                    minify = "mangle";
                  }
                  if (typeof target.setMinify == "function") {
                    target.setMinify(minify);
                  }
                  function chooseValue() {
                    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                      args[_key] = arguments[_key];
                    }
                    for (var i = 0; i < args.length; i++) {
                      if (args[i] !== undefined) {
                        return args[i];
                      }
                    }
                    return undefined;
                  }

                  // Take the command line for `saveSourceInMap` as most precedent only if provided
                  var saveSourceInMap = chooseValue(targetConfig["save-source-in-map"], t.argv["saveSourceInMap"]);
                  if (typeof saveSourceInMap == "boolean" && typeof target.setSaveSourceInMap == "function") {
                    target.setSaveSourceInMap(saveSourceInMap);
                  }
                  var sourceMapRelativePaths = chooseValue(targetConfig["source-map-relative-paths"], t.argv["sourceMapRelativePaths"]);
                  if (typeof sourceMapRelativePaths == "boolean" && typeof target.setSourceMapRelativePaths == "function") {
                    target.setSourceMapRelativePaths(sourceMapRelativePaths);
                  }
                  var saveUnminified = chooseValue(targetConfig["save-unminified"], t.argv["save-unminified"]);
                  if (typeof saveUnminified == "boolean" && typeof target.setSaveUnminified == "function") {
                    target.setSaveUnminified(saveUnminified);
                  }
                  var inlineExternal = chooseValue(targetConfig["inline-external-scripts"], t.argv["inline-external-scripts"]);
                  if (typeof inlineExternal == "boolean") {
                    target.setInlineExternalScripts(inlineExternal);
                  } else if (target instanceof qx.tool.compiler.targets.BuildTarget) {
                    target.setInlineExternalScripts(true);
                  }
                  var deployDir = targetConfig["deployPath"];
                  if (deployDir && typeof target.setDeployDir == "function") {
                    target.setDeployDir(deployDir);
                  }
                  var deployMap = targetConfig["deploy-source-maps"];
                  if (typeof deployMap == "boolean" && typeof target.setDeployDir == "function") {
                    target.setDeployMap(deployMap);
                  }
                  maker.setTarget(target);
                  var manglePrivates = chooseValue(targetConfig["mangle-privates"], t.argv["mangle-privates"]);
                  if (typeof manglePrivates == "string") {
                    maker.getAnalyser().setManglePrivates(manglePrivates);
                  } else if (typeof manglePrivates == "boolean") {
                    if (manglePrivates) {
                      maker.getAnalyser().setManglePrivates(target instanceof qx.tool.compiler.targets.BuildTarget ? "unreadable" : "readable");
                    } else {
                      maker.getAnalyser().setManglePrivates("off");
                    }
                  }
                  if (targetConfig["application-types"]) {
                    maker.getAnalyser().setApplicationTypes(targetConfig["application-types"]);
                  }
                  if (targetConfig["proxySourcePath"]) {
                    maker.getAnalyser().setProxySourcePath(targetConfig["proxySourcePath"]);
                  }
                  maker.setLocales(data.locales || ["en"]);
                  if (data.writeAllTranslations) {
                    maker.setWriteAllTranslations(data.writeAllTranslations);
                  }
                  if (typeof targetConfig.typescript == "string") {
                    Console.warn("The 'typescript' property inside a target definition is deprecated - please see top level 'meta.typescript' property");
                    if (_this4.__P_465_6) {
                      Console.warn("Multiple conflicting locations for the Typescript output - choosing to write to " + _this4.__P_465_6 + " and NOT " + targetConfig.typescript);
                    } else {
                      _this4.__P_465_5 = true;
                      _this4.__P_465_6 = path.relative(_process.cwd(), path.resolve(targetConfig.typescript));
                    }
                  }
                  if (data.environment) {
                    maker.setEnvironment(data.environment);
                  }
                  var targetEnvironment = {
                    "qx.version": maker.getAnalyser().getQooxdooVersion(),
                    "qx.compiler.targetType": target.getType(),
                    "qx.compiler.outputDir": target.getOutputDir(),
                    "qx.target.privateArtifacts": !!data["private-artifacts"]
                  };
                  if (data["private-artifacts"]) {
                    target.setPrivateArtifacts(true);
                  }
                  qx.lang.Object.mergeWith(targetEnvironment, targetConfig.environment, false);
                  target.setEnvironment(targetEnvironment);
                  if (targetConfig.preserveEnvironment) {
                    target.setPreserveEnvironment(targetConfig.preserveEnvironment);
                  }
                  if (data["path-mappings"]) {
                    for (var from in data["path-mappings"]) {
                      var to = data["path-mappings"][from];
                      target.addPathMapping(from, to);
                    }
                  }
                  function mergeArray(dest) {
                    for (var _len2 = arguments.length, srcs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                      srcs[_key2 - 1] = arguments[_key2];
                    }
                    srcs.forEach(function (src) {
                      if (src) {
                        src.forEach(function (elem) {
                          if (!qx.lang.Array.contains(dest, src)) {
                            dest.push(elem);
                          }
                        });
                      }
                    });
                    return dest;
                  }
                  var babelConfig = qx.lang.Object.clone(data.babel || {}, true);
                  babelConfig.options = babelConfig.options || {};
                  qx.lang.Object.mergeWith(babelConfig.options, targetConfig.babelOptions || {});
                  maker.getAnalyser().setBabelConfig(babelConfig);
                  var addCreatedAt = targetConfig["addCreatedAt"] || t.argv["addCreatedAt"];
                  if (addCreatedAt) {
                    maker.getAnalyser().setAddCreatedAt(true);
                  }
                  var verboseCreatedAt = targetConfig["verboseCreatedAt"] || t.argv["verboseCreatedAt"];
                  if (verboseCreatedAt) {
                    maker.getAnalyser().setVerboseCreatedAt(true);
                  }
                  for (var _i2 = 0, _librariesArray = librariesArray; _i2 < _librariesArray.length; _i2++) {
                    var _library = _librariesArray[_i2];
                    maker.getAnalyser().addLibrary(_library);
                  }
                  var allApplicationTypes = {};
                  appConfigs.forEach(function (appConfig) {
                    var app = appConfig.app = new qx.tool.compiler.app.Application(appConfig["class"]);
                    app.setTemplatePath(qx.tool.utils.Utils.getTemplateDir());
                    ["type", "theme", "name", "environment", "outputPath", "bootPath", "loaderTemplate", "publish", "deploy", "standalone", "localModules"].forEach(function (name) {
                      if (appConfig[name] !== undefined) {
                        var fname = "set" + qx.lang.String.firstUp(name);
                        app[fname](appConfig[name]);
                      }
                    });
                    allApplicationTypes[app.getType()] = true;
                    if (appConfig.uri) {
                      qx.tool.compiler.Console.print("qx.tool.cli.compile.deprecatedUri", "application.uri", appConfig.uri);
                    }
                    if (appConfig.title) {
                      app.setTitle(appConfig.title);
                    }
                    if (appConfig.description) {
                      app.setDescription(appConfig.description);
                    }
                    appConfig.localModules = appConfig.localModules || {};
                    qx.lang.Object.mergeWith(appConfig.localModules, data.localModules || {}, false);
                    if (!qx.lang.Object.isEmpty(appConfig.localModules)) {
                      app.setLocalModules(appConfig.localModules);
                    }
                    var parts = appConfig.parts || targetConfig.parts || data.parts;
                    if (parts) {
                      if (!parts.boot) {
                        throw new qx.tool.utils.Utils.UserError("Cannot determine a boot part for application " + (appConfig.index + 1) + " " + (appConfig.name || ""));
                      }
                      for (var partName in parts) {
                        var partData = parts[partName];
                        var include = typeof partData.include == "string" ? [partData.include] : partData.include;
                        var exclude = typeof partData.exclude == "string" ? [partData.exclude] : partData.exclude;
                        var part = new qx.tool.compiler.app.Part(partName, include, exclude).set({
                          combine: Boolean(partData.combine),
                          minify: Boolean(partData.minify)
                        });
                        app.addPart(part);
                      }
                    }
                    if (target.getType() == "source" && t.argv.bundling) {
                      var bundle = appConfig.bundle || targetConfig.bundle || data.bundle;
                      if (bundle) {
                        if (bundle.include) {
                          app.setBundleInclude(bundle.include);
                        }
                        if (bundle.exclude) {
                          app.setBundleExclude(bundle.exclude);
                        }
                      }
                    }
                    app.set({
                      exclude: mergeArray([], data.exclude, targetConfig.exclude, appConfig.exclude),
                      include: mergeArray([], data.include, targetConfig.include, appConfig.include)
                    });
                    maker.addApplication(app);
                  });
                  var CF = qx.tool.compiler.ClassFile;
                  var globalSymbols = [];
                  qx.lang.Array.append(globalSymbols, CF.QX_GLOBALS);
                  qx.lang.Array.append(globalSymbols, CF.COMMON_GLOBALS);
                  if (allApplicationTypes["browser"]) {
                    qx.lang.Array.append(globalSymbols, CF.BROWSER_GLOBALS);
                  }
                  if (allApplicationTypes["node"]) {
                    qx.lang.Array.append(globalSymbols, CF.NODE_GLOBALS);
                  }
                  if (allApplicationTypes["rhino"]) {
                    qx.lang.Array.append(globalSymbols, CF.RHINO_GLOBALS);
                  }
                  maker.getAnalyser().setGlobalSymbols(globalSymbols);
                  if (targetConfig.defaultAppConfig && targetConfig.defaultAppConfig.app && (targetConfig.defaultAppConfig.type || "browser") === "browser") {
                    targetConfig.defaultAppConfig.app.setWriteIndexHtmlToRoot(true);
                  } else {
                    qx.tool.utils.files.Utils.safeUnlink(target.getOutputDir() + "index.html");
                  }
                  var showMarkers = function showMarkers(classname, markers) {
                    if (markers) {
                      markers.forEach(function (marker) {
                        var str = qx.tool.compiler.Console.decodeMarker(marker);
                        Console.warn(classname + ": " + str);
                      });
                    }
                  };

                  // Note - this will cause output multiple times, once per maker/target; but this is largely unavoidable
                  //  because different targets can cause different warnings for the same code due to different compilation
                  //  options (eg node vs browser)
                  maker.getAnalyser().addListener("compiledClass", function (evt) {
                    var data = evt.getData();
                    showMarkers(data.classFile.getClassName(), data.dbClassInfo.markers);
                  });
                  maker.getAnalyser().addListener("alreadyCompiledClass", function (evt) {
                    var data = evt.getData();
                    showMarkers(data.className, data.dbClassInfo.markers);
                  });
                  makers.push(maker);
                });
                return _context11.abrupt("return", makers);
              case 66:
              case "end":
                return _context11.stop();
            }
          }, _callee11, null, [[19, 32, 35, 38]]);
        }))();
      },
      /**
       * Checks the dependencies of the current library
       * @param  {qx.tool.compiler.app.Library[]} libs
       *    The list of libraries to check
       * @param {Object|*} packages
       *    If given, an object mapping library uris to library paths
       * @return {Promise<Array>} Array of error messages
       * @private
       */
      __P_465_8: function __P_465_8(libs, packages) {
        var _this5 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
          var Console, errors, _iterator3, _step3, lib, requires, range, requires_uris, urisToInstall, pkg_libs, installer, _iterator4, _step4, _loop;
          return _regeneratorRuntime().wrap(function _callee12$(_context13) {
            while (1) switch (_context13.prev = _context13.next) {
              case 0:
                Console = qx.tool.compiler.Console.getInstance();
                errors = []; // check all requires
                _iterator3 = _createForOfIteratorHelper(libs);
                _context13.prev = 3;
                _iterator3.s();
              case 5:
                if ((_step3 = _iterator3.n()).done) {
                  _context13.next = 44;
                  break;
                }
                lib = _step3.value;
                requires = lib.getRequires();
                if (!requires) {
                  requires = {};
                }
                if (!packages) {
                  packages = {};
                }
                // check for qooxdoo-range
                range = lib.getLibraryInfo()["qooxdoo-range"];
                if (range) {
                  if (_this5.argv.verbose) {
                    Console.warn("".concat(lib.getNamespace(), ": The configuration setting \"qooxdoo-range\" in Manifest.json has been deprecated in favor of \"requires.@qooxdoo/framework\"."));
                  }
                  if (!requires["@qooxdoo/framework"]) {
                    requires["@qooxdoo/framework"] = range;
                  }
                }

                // Find the libraries that we need, not including the libraries which we have been given explicitly
                //  in the compile.json's `libraries` property
                requires_uris = Object.getOwnPropertyNames(requires).filter(function (uri) {
                  return !libs.find(function (lib) {
                    return lib.getLibraryInfo().name === uri;
                  });
                });
                urisToInstall = requires_uris.filter(function (name) {
                  return name !== "@qooxdoo/framework" && name !== "@qooxdoo/compiler";
                });
                pkg_libs = Object.getOwnPropertyNames(packages);
                if (!(urisToInstall.length > 0 && pkg_libs.length === 0)) {
                  _context13.next = 26;
                  break;
                }
                if (!_this5.argv.download) {
                  _context13.next = 25;
                  break;
                }
                if (!fs.existsSync(qx.tool.config.Manifest.config.fileName)) {
                  Console.error("Libraries are missing and there is no Manifest.json in the current directory so we cannot attempt to install them; the missing libraries are: \n     " + urisToInstall.join("\n     ") + "\nThe library which refers to the missing libraries is " + lib.getNamespace() + " in " + lib.getRootDir());
                  _process.exit(1);
                }
                // but we're instructed to download the libraries
                if (_this5.argv.verbose) {
                  Console.info(">>> Installing latest compatible version of libraries ".concat(urisToInstall.join(", "), "..."));
                }
                installer = new qx.tool.cli.commands["package"].Install({
                  verbose: _this5.argv.verbose,
                  save: false // save to lockfile only, not to manifest
                });
                _context13.next = 22;
                return installer.process();
              case 22:
                throw new qx.tool.utils.Utils.UserError("Library ".concat(lib.getNamespace(), " requires ").concat(urisToInstall.join(","), " - we have tried to download and install these additional libraries, please restart the compilation."));
              case 25:
                throw new qx.tool.utils.Utils.UserError("No library information available. Try 'qx compile --download'");
              case 26:
                _iterator4 = _createForOfIteratorHelper(requires_uris);
                _context13.prev = 27;
                _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                  var reqUri, requiredRange, rangeIsCommitHash, qxVersion, l, libVersion;
                  return _regeneratorRuntime().wrap(function _loop$(_context12) {
                    while (1) switch (_context12.prev = _context12.next) {
                      case 0:
                        reqUri = _step4.value;
                        requiredRange = requires[reqUri];
                        rangeIsCommitHash = /^[0-9a-f]{40}$/.test(requiredRange);
                        _context12.t0 = reqUri;
                        _context12.next = _context12.t0 === "@qooxdoo/compiler" ? 6 : _context12.t0 === "@qooxdoo/framework" ? 7 : 12;
                        break;
                      case 6:
                        return _context12.abrupt("break", 19);
                      case 7:
                        _context12.next = 9;
                        return _this5.getQxVersion();
                      case 9:
                        qxVersion = _context12.sent;
                        if (!semver.satisfies(qxVersion, requiredRange, {
                          loose: true
                        })) {
                          errors.push("".concat(lib.getNamespace(), ": Needs @qooxdoo/framework version ").concat(requiredRange, ", found ").concat(qxVersion));
                        }
                        return _context12.abrupt("break", 19);
                      case 12:
                        l = libs.find(function (entry) {
                          return path.relative("", entry.getRootDir()) === packages[reqUri];
                        });
                        if (l) {
                          _context12.next = 16;
                          break;
                        }
                        errors.push("".concat(lib.getNamespace(), ": Cannot find required library '").concat(reqUri, "'"));
                        return _context12.abrupt("break", 19);
                      case 16:
                        // github release of a package
                        libVersion = l.getLibraryInfo().version;
                        if (!semver.valid(libVersion, {
                          loose: true
                        })) {
                          if (!_this5.argv.quiet) {
                            Console.warn("".concat(reqUri, ": Version is not valid: ").concat(libVersion));
                          }
                        } else if (rangeIsCommitHash) {
                          if (!_this5.argv.quiet) {
                            Console.warn("".concat(reqUri, ": Cannot check whether commit hash ").concat(requiredRange, " corresponds to version ").concat(libVersion));
                          }
                        } else if (!semver.satisfies(libVersion, requiredRange, {
                          loose: true
                        })) {
                          errors.push("".concat(lib.getNamespace(), ": Needs ").concat(reqUri, " version ").concat(requiredRange, ", found ").concat(libVersion));
                        }
                        return _context12.abrupt("break", 19);
                      case 19:
                      case "end":
                        return _context12.stop();
                    }
                  }, _loop);
                });
                _iterator4.s();
              case 30:
                if ((_step4 = _iterator4.n()).done) {
                  _context13.next = 34;
                  break;
                }
                return _context13.delegateYield(_loop(), "t0", 32);
              case 32:
                _context13.next = 30;
                break;
              case 34:
                _context13.next = 39;
                break;
              case 36:
                _context13.prev = 36;
                _context13.t1 = _context13["catch"](27);
                _iterator4.e(_context13.t1);
              case 39:
                _context13.prev = 39;
                _iterator4.f();
                return _context13.finish(39);
              case 42:
                _context13.next = 5;
                break;
              case 44:
                _context13.next = 49;
                break;
              case 46:
                _context13.prev = 46;
                _context13.t2 = _context13["catch"](3);
                _iterator3.e(_context13.t2);
              case 49:
                _context13.prev = 49;
                _iterator3.f();
                return _context13.finish(49);
              case 52:
                return _context13.abrupt("return", errors);
              case 53:
              case "end":
                return _context13.stop();
            }
          }, _callee12, null, [[3, 46, 49, 52], [27, 36, 39, 42]]);
        }))();
      },
      /**
       * Resolves the target class instance from the type name; accepts "source" or "build" or
       * a class name
       * @param type {String}
       * @returns {qx.tool.compiler.makers.Maker}
       */
      resolveTargetClass: function resolveTargetClass(type) {
        if (!type) {
          return null;
        }
        if (type.$$type == "Class") {
          return type;
        }
        if (type == "build") {
          return qx.tool.compiler.targets.BuildTarget;
        }
        if (type == "source") {
          return qx.tool.compiler.targets.SourceTarget;
        }
        if (type) {
          var targetClass;
          if (type.indexOf(".") < 0) {
            targetClass = qx.Class.getByName("qx.tool.compiler.targets." + type);
          } else {
            targetClass = qx.Class.getByName(type);
          }
          return targetClass;
        }
        return null;
      },
      /**
       * Returns the list of makers to make
       *
       * @return  {qx.tool.compiler.makers.Maker[]}
       */
      getMakers: function getMakers() {
        return this.__P_465_1;
      },
      /**
       * Returns the one maker; this is for backwards compatibility with the compiler API, because it is
       * possible to define multiple targets and therefore have multiple makers.  This method will return
       * the one maker, when there is only one maker defined (ie one target), which is fine for any existing
       * configurations.
       *
       * @deprected
       * @return {qx.tool.compiler.makers.Maker}
       */
      getMaker: function getMaker() {
        if (this.__P_465_1.length == 1) {
          return this.__P_465_1[0];
        }
        throw new Error("Cannot get a single maker - there are " + this.__P_465_1.length + " available");
      },
      /**
       * Returns the makers for a given application name
       *
       * @param appName {String} the name of the application
       * @return {qx.tool.compiler.makers.Maker}
       */
      getMakersForApp: function getMakersForApp(appName) {
        return this.__P_465_1.filter(function (maker) {
          var res = maker.getApplications().find(function (app) {
            return app.getName() == appName;
          });
          return res;
        });
      },
      /**
       * Returns a list of libraries which are used
       *
       * @return {qx.tool.compiler.app.Library[]}
       */
      getLibraries: function getLibraries() {
        return this.__P_465_2;
      }
    },
    defer: function defer(statics) {
      qx.tool.compiler.Console.addMessageIds({
        "qx.tool.cli.compile.writingApplication": "Writing application %1",
        "qx.tool.cli.compile.minifyingApplication": "Minifying %1 %2",
        "qx.tool.cli.compile.compilingClass": "Compiling class %1",
        "qx.tool.cli.compile.compiledClass": "Compiled class %1 in %2s",
        "qx.tool.cli.compile.makeBegins": "Making applications...",
        "qx.tool.cli.compile.makeEnds": "Applications are made"
      });
      qx.tool.compiler.Console.addMessageIds({
        "qx.tool.cli.compile.multipleDefaultTargets": "Multiple default targets found!",
        "qx.tool.cli.compile.unusedTarget": "Target type %1, index %2 is unused",
        "qx.tool.cli.compile.selectingDefaultApp": "You have multiple applications, none of which are marked as 'default'; the first application named %1 has been chosen as the default application",
        "qx.tool.cli.compile.legacyFiles": "File %1 exists but is no longer used",
        "qx.tool.cli.compile.deprecatedCompile": "The configuration setting %1 in compile.json is deprecated",
        "qx.tool.cli.compile.deprecatedCompileSeeOther": "The configuration setting %1 in compile.json is deprecated (see %2)",
        "qx.tool.cli.compile.deprecatedUri": "URIs are no longer set in compile.json, the configuration setting %1=%2 in compile.json is ignored (it's auto detected)",
        "qx.tool.cli.compile.deprecatedProvidesBoot": "Manifest.Json no longer supports provides.boot - only Applications can have boot; specified in %1",
        "qx.tool.cli.compile.deprecatedBabelOptions": "Deprecated use of `babelOptions` - these should be moved to `babel.options`",
        "qx.tool.cli.compile.deprecatedBabelOptionsConflicting": "Conflicting use of `babel.options` and the deprecated `babelOptions` (ignored)"
      }, "warning");
    }
  });
  qx.tool.cli.commands.Compile.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Compile.js.map?dt=1726089064308