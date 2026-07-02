function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
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
      __P_476_0: null,
      __P_476_1: null,
      __P_476_2: null,
      __P_476_3: false,
      /** @type{String} the path to the root of the meta files by classname */
      __P_476_4: null,
      /** @type{Boolean} whether the typescript output is enabled */
      __P_476_5: false,
      /** @type{String} the name of the typescript file to generate */
      __P_476_6: null,
      /*
       * @Override
       */
      process: function process() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var configDb, _configDb, color, colorOn, colorReset, Console, themes, ourTheme, _colorOn, TYPES, success, hasWarnings, _t, _t2, _t3;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _context.n = 1;
                return qx.tool.cli.commands.Compile.superclass.prototype.process.call(_this);
              case 1:
                _context.n = 2;
                return qx.tool.cli.ConfigDb.getInstance();
              case 2:
                configDb = _context.v;
                if (_this.argv["feedback"] === null) {
                  _this.argv["feedback"] = configDb.db("qx.default.feedback", true);
                }
                if (!_this.argv.verbose) {
                  _context.n = 5;
                  break;
                }
                _t = console;
                _t3 = "\nCompiler:  v".concat(_this.getCompilerVersion(), " in ").concat(require.main.filename, "\nFramework: v");
                _context.n = 3;
                return _this.getQxVersion();
              case 3:
                _t2 = _t3.concat.call(_t3, _context.v, " in ");
                _context.n = 4;
                return _this.getQxPath();
              case 4:
                _t.log.call(_t, _t2.concat.call(_t2, _context.v));
              case 5:
                if (!_this.argv["machine-readable"]) {
                  _context.n = 6;
                  break;
                }
                qx.tool.compiler.Console.getInstance().setMachineReadable(true);
                _context.n = 8;
                break;
              case 6:
                _context.n = 7;
                return qx.tool.cli.ConfigDb.getInstance();
              case 7:
                _configDb = _context.v;
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
                  _this.__P_476_0 = new Gauge();
                  _this.__P_476_0.setTheme(ourTheme);
                  _this.__P_476_0.show("Compiling", 0);
                  TYPES = {
                    error: "ERROR",
                    warning: "Warning"
                  };
                  qx.tool.compiler.Console.getInstance().setWriter(function (str, msgId) {
                    msgId = qx.tool.compiler.Console.MESSAGE_IDS[msgId];
                    if (!msgId || msgId.type !== "message") {
                      _this.__P_476_0.hide();
                      qx.tool.compiler.Console.log(_colorOn + TYPES[(msgId || {}).type || "error"] + ": " + str);
                      _this.__P_476_0.show();
                    } else {
                      _this.__P_476_0.show(_colorOn + str);
                    }
                  });
                }
              case 8:
                if (_this.__P_476_0) {
                  _this.addListener("writingApplications", function () {
                    return _this.__P_476_0.show("Writing Applications", 0);
                  });
                  _this.addListener("writtenApplications", function () {
                    return _this.__P_476_0.show("Writing Applications", 1);
                  });
                  _this.addListener("writingApplication", function (evt) {
                    return _this.__P_476_0.pulse("Writing Application " + evt.getData().appMeta.getApplication().getName());
                  });
                  _this.addListener("compilingClass", function (evt) {
                    return _this.__P_476_0.pulse("Compiling " + evt.getData().classFile.getClassName());
                  });
                  _this.addListener("minifyingApplication", function (evt) {
                    return _this.__P_476_0.pulse("Minifying " + evt.getData().application.getName() + " " + evt.getData().filename);
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
                  if (_this.__P_476_0) {
                    _this.__P_476_0.show("Compiling", 1);
                  } else {
                    qx.tool.compiler.Console.print("qx.tool.cli.compile.makeBegins");
                  }
                });
                _this.addListener("made", function (evt) {
                  if (_this.__P_476_0) {
                    _this.__P_476_0.show("Compiling", 1);
                  } else {
                    qx.tool.compiler.Console.print("qx.tool.cli.compile.makeEnds");
                  }
                });
                _this.addListener("writtenApplications", function (e) {
                  if (_this.argv.verbose) {
                    qx.tool.compiler.Console.log("\nCompleted all applications, libraries used are:");
                    Object.values(_this.__P_476_2).forEach(function (lib) {
                      return qx.tool.compiler.Console.log("   ".concat(lib.getNamespace(), " (").concat(lib.getRootDir(), ")"));
                    });
                  }
                });
                _context.n = 9;
                return _this._loadConfigAndStartMaking();
              case 9:
                if (!_this.argv.watch) {
                  success = _this.__P_476_1.every(function (maker) {
                    return maker.getSuccess();
                  });
                  hasWarnings = _this.__P_476_1.every(function (maker) {
                    return maker.getHasWarnings();
                  });
                  if (success && hasWarnings && _this.argv.warnAsError) {
                    success = false;
                  }
                  if (!_this.argv.deploying && !_this.argv["machine-readable"] && _this.argv["feedback"] && _this.__P_476_3 && _this.argv.target === "build") {
                    qx.tool.compiler.Console.warn("   *******************************************************************************************\n   **                                                                                       **\n   **  Your compilation will include temporary files that are only necessary during         **\n   **  development; these files speed up the compilation, but take up space that you would  **\n   **  probably not want to put on a production server.                                     **\n   **                                                                                       **\n   **  When you are ready to deploy, try running `qx deploy` to get a minimised version     **\n   **                                                                                       **\n   *******************************************************************************************");
                  }
                  _process.exitCode = success ? 0 : 1;
                }
              case 10:
                return _context.a(2);
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
          var config, makers, countMaking, collateDispatchEvent, isFirstWatcher, _t5;
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.p = _context7.n) {
              case 0:
                if (!_this2.getCompilerApi().compileJsonExists() && !qx.tool.cli.Cli.getInstance().compileJsExists()) {
                  qx.tool.compiler.Console.error("Cannot find either compile.json nor compile.js");
                  _process.exit(1);
                }
                config = _this2.getCompilerApi().getConfiguration();
                _context7.n = 1;
                return _this2.createMakersFromConfig(config);
              case 1:
                makers = _this2.__P_476_1 = _context7.v;
                if (!(!makers || !makers.length)) {
                  _context7.n = 2;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Error: Cannot find anything to make");
              case 2:
                countMaking = 0;
                collateDispatchEvent = function collateDispatchEvent(evt) {
                  if (countMaking == 1) {
                    _this2.dispatchEvent(evt.clone());
                  }
                };
                isFirstWatcher = true;
                _context7.n = 3;
                return qx.Promise.all(makers.map(/*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(maker) {
                    var analyser, cfg, target, appInfos, stat, watch, arr, _t4;
                    return _regenerator().w(function (_context6) {
                      while (1) switch (_context6.p = _context6.n) {
                        case 0:
                          analyser = maker.getAnalyser();
                          _context6.n = 1;
                          return qx.tool.cli.ConfigDb.getInstance();
                        case 1:
                          cfg = _context6.v;
                          analyser.setWritePoLineNumbers(cfg.db("qx.translation.strictPoCompatibility", false));
                          _context6.n = 2;
                          return fs.existsAsync(maker.getOutputDir());
                        case 2:
                          if (_context6.v) {
                            _context6.n = 3;
                            break;
                          }
                          _this2.__P_476_3 = true;
                        case 3:
                          if (!_this2.argv["clean"]) {
                            _context6.n = 6;
                            break;
                          }
                          _context6.n = 4;
                          return maker.eraseOutputDir();
                        case 4:
                          _context6.n = 5;
                          return qx.tool.utils.files.Utils.safeUnlink(analyser.getDbFilename());
                        case 5:
                          _context6.n = 6;
                          return qx.tool.utils.files.Utils.safeUnlink(analyser.getResDbFilename());
                        case 6:
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
                          target.addListener("writingApplication", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
                            var appInfo;
                            return _regenerator().w(function (_context2) {
                              while (1) switch (_context2.n) {
                                case 0:
                                  appInfo = {
                                    maker: maker,
                                    target: target,
                                    appMeta: target.getAppMeta()
                                  };
                                  appInfos.push(appInfo);
                                  _context2.n = 1;
                                  return _this2.fireDataEventAsync("writingApplication", appInfo);
                                case 1:
                                  return _context2.a(2);
                              }
                            }, _callee2);
                          })));
                          target.addListener("writtenApplication", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
                            return _regenerator().w(function (_context3) {
                              while (1) switch (_context3.n) {
                                case 0:
                                  _context3.n = 1;
                                  return _this2.fireDataEventAsync("writtenApplication", {
                                    maker: maker,
                                    target: target,
                                    appMeta: target.getAppMeta()
                                  });
                                case 1:
                                  return _context3.a(2);
                              }
                            }, _callee3);
                          })));
                          maker.addListener("writingApplications", collateDispatchEvent);
                          maker.addListener("writtenApplications", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
                            return _regenerator().w(function (_context4) {
                              while (1) switch (_context4.n) {
                                case 0:
                                  _context4.n = 1;
                                  return _this2.fireDataEventAsync("writtenApplications", appInfos);
                                case 1:
                                  return _context4.a(2);
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
                          _context6.n = 7;
                          return qx.tool.utils.files.Utils.safeStat("source/index.html");
                        case 7:
                          stat = _context6.v;
                          if (stat) {
                            qx.tool.compiler.Console.print("qx.tool.cli.compile.legacyFiles", "source/index.html");
                          }

                          // Simple one of make
                          if (_this2.argv.watch) {
                            _context6.n = 9;
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
                          _context6.n = 8;
                          return maker.make();
                        case 8:
                          return _context6.a(2, _context6.v);
                        case 9:
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
                          watch.addListener("configChanged", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
                            return _regenerator().w(function (_context5) {
                              while (1) switch (_context5.n) {
                                case 0:
                                  _context5.n = 1;
                                  return watch.stop();
                                case 1:
                                  setImmediate(function () {
                                    return _this2._loadConfigAndStartMaking();
                                  });
                                case 2:
                                  return _context5.a(2);
                              }
                            }, _callee5);
                          })));
                          arr = [_this2._compileJsFilename, _this2._compileJsonFilename].filter(function (str) {
                            return Boolean(str);
                          });
                          watch.setConfigFilenames(arr);
                          if (!(target instanceof qx.tool.compiler.targets.SourceTarget && isFirstWatcher)) {
                            _context6.n = 13;
                            break;
                          }
                          isFirstWatcher = false;
                          _context6.p = 10;
                          _context6.n = 11;
                          return _this2.__P_476_7(watch);
                        case 11:
                          _context6.n = 13;
                          break;
                        case 12:
                          _context6.p = 12;
                          _t4 = _context6.v;
                          qx.tool.compiler.Console.error(_t4);
                        case 13:
                          return _context6.a(2, watch.start());
                      }
                    }, _callee6, null, [[10, 12]]);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }()));
              case 3:
                if (_this2.argv.watch) {
                  _context7.n = 7;
                  break;
                }
                _context7.p = 4;
                _context7.n = 5;
                return _this2.__P_476_7(null);
              case 5:
                _context7.n = 7;
                break;
              case 6:
                _context7.p = 6;
                _t5 = _context7.v;
                qx.tool.compiler.Console.error(_t5);
              case 7:
                return _context7.a(2);
            }
          }, _callee7, null, [[4, 6]]);
        }))();
      },
      __P_476_7: function __P_476_7(watch) {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
          var classFiles, _scanImpl, metaDb, _i, _Object$values, lib, dir, _iterator, _step, filename, tsWriter, debounce, _t6;
          return _regenerator().w(function (_context0) {
            while (1) switch (_context0.p = _context0.n) {
              case 0:
                classFiles = []; // Scans a directory recursively to find all .js files
                _scanImpl = /*#__PURE__*/function () {
                  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(filename) {
                    var basename, stat, files, i, subname;
                    return _regenerator().w(function (_context8) {
                      while (1) switch (_context8.n) {
                        case 0:
                          basename = path.basename(filename);
                          _context8.n = 1;
                          return fs.promises.stat(filename);
                        case 1:
                          stat = _context8.v;
                          if (!(stat.isFile() && basename.match(/\.js$/))) {
                            _context8.n = 2;
                            break;
                          }
                          classFiles.push(filename);
                          _context8.n = 6;
                          break;
                        case 2:
                          if (!(stat.isDirectory() && (basename == "." || basename[0] != "."))) {
                            _context8.n = 6;
                            break;
                          }
                          _context8.n = 3;
                          return fs.promises.readdir(filename);
                        case 3:
                          files = _context8.v;
                          i = 0;
                        case 4:
                          if (!(i < files.length)) {
                            _context8.n = 6;
                            break;
                          }
                          subname = path.join(filename, files[i]);
                          _context8.n = 5;
                          return _scanImpl(subname);
                        case 5:
                          i++;
                          _context8.n = 4;
                          break;
                        case 6:
                          return _context8.a(2);
                      }
                    }, _callee8);
                  }));
                  return function scanImpl(_x2) {
                    return _ref6.apply(this, arguments);
                  };
                }(); // Do the initial scan
                qx.tool.compiler.Console.info("Loading meta data ...");
                metaDb = new qx.tool.compiler.MetaDatabase().set({
                  rootDir: _this3.__P_476_4
                });
                _context0.n = 1;
                return metaDb.load();
              case 1:
                // Scan all library directories
                metaDb.getDatabase().libraries = {};
                _i = 0, _Object$values = Object.values(_this3.__P_476_2);
              case 2:
                if (!(_i < _Object$values.length)) {
                  _context0.n = 4;
                  break;
                }
                lib = _Object$values[_i];
                dir = path.join(lib.getRootDir(), lib.getSourcePath());
                metaDb.getDatabase().libraries[lib.getNamespace()] = {
                  sourceDir: dir
                };
                _context0.n = 3;
                return _scanImpl(dir);
              case 3:
                _i++;
                _context0.n = 2;
                break;
              case 4:
                _iterator = _createForOfIteratorHelper(classFiles);
                _context0.p = 5;
                _iterator.s();
              case 6:
                if ((_step = _iterator.n()).done) {
                  _context0.n = 8;
                  break;
                }
                filename = _step.value;
                _context0.n = 7;
                return metaDb.addFile(filename, !!_this3.argv.clean);
              case 7:
                _context0.n = 6;
                break;
              case 8:
                _context0.n = 10;
                break;
              case 9:
                _context0.p = 9;
                _t6 = _context0.v;
                _iterator.e(_t6);
              case 10:
                _context0.p = 10;
                _iterator.f();
                return _context0.f(10);
              case 11:
                _context0.n = 12;
                return metaDb.reparseAll();
              case 12:
                _context0.n = 13;
                return metaDb.save();
              case 13:
                _context0.n = 14;
                return _this3.fireDataEventAsync("writtenMetaData", metaDb);
              case 14:
                // Do the inital write
                tsWriter = null;
                if (!_this3.__P_476_5) {
                  _context0.n = 15;
                  break;
                }
                qx.tool.compiler.Console.info("Generating typescript output ...");
                tsWriter = new qx.tool.compiler.targets.TypeScriptWriter(metaDb);
                if (_this3.__P_476_6) {
                  tsWriter.setOutputTo(_this3.__P_476_6);
                } else {
                  tsWriter.setOutputTo(path.join(_this3.__P_476_4, "..", "qooxdoo.d.ts"));
                }
                _context0.n = 15;
                return tsWriter.process();
              case 15:
                if (watch) {
                  _context0.n = 16;
                  break;
                }
                return _context0.a(2);
              case 16:
                // Redo the files that change, as they change
                classFiles = {};
                debounce = new qx.tool.utils.Debounce(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
                  var filesParsed, addFilePromises, arr;
                  return _regenerator().w(function (_context9) {
                    while (1) switch (_context9.n) {
                      case 0:
                        filesParsed = false;
                        qx.tool.compiler.Console.info("Loading meta data ...");
                        addFilePromises = [];
                      case 1:
                        if (!true) {
                          _context9.n = 3;
                          break;
                        }
                        arr = Object.keys(classFiles);
                        if (!(arr.length == 0)) {
                          _context9.n = 2;
                          break;
                        }
                        return _context9.a(3, 3);
                      case 2:
                        filesParsed = true;
                        classFiles = {};
                        arr.forEach(function (filename) {
                          if (_this3.argv.verbose) {
                            qx.tool.compiler.Console.info("Processing meta for ".concat(filename, " ..."));
                          }
                          addFilePromises.push(metaDb.addFile(filename));
                        });
                        _context9.n = 1;
                        break;
                      case 3:
                        if (!filesParsed) {
                          _context9.n = 7;
                          break;
                        }
                        qx.tool.compiler.Console.info("Generating typescript output ...");
                        _context9.n = 4;
                        return Promise.all(addFilePromises);
                      case 4:
                        _context9.n = 5;
                        return metaDb.reparseAll();
                      case 5:
                        _context9.n = 6;
                        return metaDb.save();
                      case 6:
                        if (!_this3.__P_476_5) {
                          _context9.n = 7;
                          break;
                        }
                        _context9.n = 7;
                        return tsWriter.process();
                      case 7:
                        return _context9.a(2);
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
              case 17:
                return _context0.a(2);
            }
          }, _callee0, null, [[5, 9, 10, 11]]);
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
          var _data$meta, _data$meta2, _data$meta4;
          var Console, t, _data$babel, _data$meta3, argvAppNames, argvAppGroups, targetConfigs, defaultTargetConfig, allAppNames, libraries, librariesArray, _iterator2, _step2, libPath, _library2, qxLib, qxPath, library, errors, targetOutputPaths, makers, _t7;
          return _regenerator().w(function (_context1) {
            while (1) switch (_context1.p = _context1.n) {
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
                  _this4.__P_476_5 = data.meta.typescript;
                } else if (qx.lang.Type.isString(data === null || data === void 0 || (_data$meta2 = data.meta) === null || _data$meta2 === void 0 ? void 0 : _data$meta2.typescript)) {
                  _this4.__P_476_5 = true;
                  _this4.__P_476_6 = path.relative(_process.cwd(), path.resolve(data === null || data === void 0 || (_data$meta3 = data.meta) === null || _data$meta3 === void 0 ? void 0 : _data$meta3.typescript));
                }
                if (qx.lang.Type.isBoolean(_this4.argv.typescript)) {
                  _this4.__P_476_5 = _this4.argv.typescript;
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
                libraries = _this4.__P_476_2 = {};
                librariesArray = [];
                _iterator2 = _createForOfIteratorHelper(data.libraries);
                _context1.p = 1;
                _iterator2.s();
              case 2:
                if ((_step2 = _iterator2.n()).done) {
                  _context1.n = 5;
                  break;
                }
                libPath = _step2.value;
                _context1.n = 3;
                return qx.tool.compiler.app.Library.createLibrary(libPath);
              case 3:
                _library2 = _context1.v;
                libraries[_library2.getNamespace()] = _library2;
                librariesArray.push(_library2);
              case 4:
                _context1.n = 2;
                break;
              case 5:
                _context1.n = 7;
                break;
              case 6:
                _context1.p = 6;
                _t7 = _context1.v;
                _iterator2.e(_t7);
              case 7:
                _context1.p = 7;
                _iterator2.f();
                return _context1.f(7);
              case 8:
                // Search for Qooxdoo library if not already provided
                qxLib = libraries["qx"];
                if (qxLib) {
                  _context1.n = 11;
                  break;
                }
                _context1.n = 9;
                return qx.tool.config.Utils.getQxPath();
              case 9:
                qxPath = _context1.v;
                _context1.n = 10;
                return qx.tool.compiler.app.Library.createLibrary(qxPath);
              case 10:
                library = _context1.v;
                libraries[library.getNamespace()] = library;
                librariesArray.push(library);
                qxLib = libraries["qx"];
              case 11:
                if (_this4.argv.verbose) {
                  Console.log("Qooxdoo found in " + qxLib.getRootDir());
                }
                _context1.n = 12;
                return _this4.__P_476_8(Object.values(libraries), data.packages);
              case 12:
                errors = _context1.v;
                if (!(errors.length > 0)) {
                  _context1.n = 14;
                  break;
                }
                if (!_this4.argv.warnAsError) {
                  _context1.n = 13;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError(errors.join("\n"));
              case 13:
                qx.tool.compiler.Console.log(errors.join("\n"));
              case 14:
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
                _this4.__P_476_4 = (_data$meta4 = data.meta) === null || _data$meta4 === void 0 ? void 0 : _data$meta4.output;
                if (!_this4.__P_476_4) {
                  _this4.__P_476_4 = path.relative(_process.cwd(), path.resolve(targetConfigs[0].outputPath, "../meta"));
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
                    if (_this4.__P_476_6) {
                      Console.warn("Multiple conflicting locations for the Typescript output - choosing to write to " + _this4.__P_476_6 + " and NOT " + targetConfig.typescript);
                    } else {
                      _this4.__P_476_5 = true;
                      _this4.__P_476_6 = path.relative(_process.cwd(), path.resolve(targetConfig.typescript));
                    }
                  }
                  if (data.environment) {
                    maker.setEnvironment(data.environment);
                  }

                  /*
                  Libraries have to be added first because there is qx library
                  which includes a framework version
                  */
                  for (var _i2 = 0, _librariesArray = librariesArray; _i2 < _librariesArray.length; _i2++) {
                    var _library = _librariesArray[_i2];
                    maker.getAnalyser().addLibrary(_library);
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
                  var browserifyConfig = qx.lang.Object.clone(data.browserify || {}, true);
                  browserifyConfig.options = browserifyConfig.options || {};
                  qx.lang.Object.mergeWith(browserifyConfig.options, targetConfig.browserifyOptions || {});
                  maker.getAnalyser().setBrowserifyConfig(browserifyConfig);
                  var addCreatedAt = targetConfig["addCreatedAt"] || t.argv["addCreatedAt"];
                  if (addCreatedAt) {
                    maker.getAnalyser().setAddCreatedAt(true);
                  }
                  var verboseCreatedAt = targetConfig["verboseCreatedAt"] || t.argv["verboseCreatedAt"];
                  if (verboseCreatedAt) {
                    maker.getAnalyser().setVerboseCreatedAt(true);
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
                return _context1.a(2, makers);
            }
          }, _callee1, null, [[1, 6, 7, 8]]);
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
      __P_476_8: function __P_476_8(libs, packages) {
        var _this5 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
          var Console, errors, _iterator3, _step3, lib, requires, range, requires_uris, urisToInstall, pkg_libs, installer, _iterator4, _step4, _loop, _t9, _t0;
          return _regenerator().w(function (_context11) {
            while (1) switch (_context11.p = _context11.n) {
              case 0:
                Console = qx.tool.compiler.Console.getInstance();
                errors = []; // check all requires
                _iterator3 = _createForOfIteratorHelper(libs);
                _context11.p = 1;
                _iterator3.s();
              case 2:
                if ((_step3 = _iterator3.n()).done) {
                  _context11.n = 13;
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
                  _context11.n = 5;
                  break;
                }
                if (!_this5.argv.download) {
                  _context11.n = 4;
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
                _context11.n = 3;
                return installer.process();
              case 3:
                throw new qx.tool.utils.Utils.UserError("Library ".concat(lib.getNamespace(), " requires ").concat(urisToInstall.join(","), " - we have tried to download and install these additional libraries, please restart the compilation."));
              case 4:
                throw new qx.tool.utils.Utils.UserError("No library information available. Try 'qx compile --download'");
              case 5:
                _iterator4 = _createForOfIteratorHelper(requires_uris);
                _context11.p = 6;
                _loop = /*#__PURE__*/_regenerator().m(function _loop() {
                  var reqUri, requiredRange, rangeIsCommitHash, qxVersion, l, libVersion, _t8;
                  return _regenerator().w(function (_context10) {
                    while (1) switch (_context10.n) {
                      case 0:
                        reqUri = _step4.value;
                        requiredRange = requires[reqUri];
                        rangeIsCommitHash = /^[0-9a-f]{40}$/.test(requiredRange);
                        _t8 = reqUri;
                        _context10.n = _t8 === "@qooxdoo/compiler" ? 1 : _t8 === "@qooxdoo/framework" ? 2 : 4;
                        break;
                      case 1:
                        return _context10.a(3, 6);
                      case 2:
                        _context10.n = 3;
                        return _this5.getQxVersion();
                      case 3:
                        qxVersion = _context10.v;
                        if (!semver.satisfies(qxVersion, requiredRange, {
                          loose: true
                        })) {
                          errors.push("".concat(lib.getNamespace(), ": Needs @qooxdoo/framework version ").concat(requiredRange, ", found ").concat(qxVersion));
                        }
                        return _context10.a(3, 6);
                      case 4:
                        l = libs.find(function (entry) {
                          return path.relative("", entry.getRootDir()) === packages[reqUri];
                        });
                        if (l) {
                          _context10.n = 5;
                          break;
                        }
                        errors.push("".concat(lib.getNamespace(), ": Cannot find required library '").concat(reqUri, "'"));
                        return _context10.a(3, 6);
                      case 5:
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
                        return _context10.a(3, 6);
                      case 6:
                        return _context10.a(2);
                    }
                  }, _loop);
                });
                _iterator4.s();
              case 7:
                if ((_step4 = _iterator4.n()).done) {
                  _context11.n = 9;
                  break;
                }
                return _context11.d(_regeneratorValues(_loop()), 8);
              case 8:
                _context11.n = 7;
                break;
              case 9:
                _context11.n = 11;
                break;
              case 10:
                _context11.p = 10;
                _t9 = _context11.v;
                _iterator4.e(_t9);
              case 11:
                _context11.p = 11;
                _iterator4.f();
                return _context11.f(11);
              case 12:
                _context11.n = 2;
                break;
              case 13:
                _context11.n = 15;
                break;
              case 14:
                _context11.p = 14;
                _t0 = _context11.v;
                _iterator3.e(_t0);
              case 15:
                _context11.p = 15;
                _iterator3.f();
                return _context11.f(15);
              case 16:
                return _context11.a(2, errors);
            }
          }, _callee10, null, [[6, 10, 11, 12], [1, 14, 15, 16]]);
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
        return this.__P_476_1;
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
        if (this.__P_476_1.length == 1) {
          return this.__P_476_1[0];
        }
        throw new Error("Cannot get a single maker - there are " + this.__P_476_1.length + " available");
      },
      /**
       * Returns the makers for a given application name
       *
       * @param appName {String} the name of the application
       * @return {qx.tool.compiler.makers.Maker}
       */
      getMakersForApp: function getMakersForApp(appName) {
        return this.__P_476_1.filter(function (maker) {
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
        return this.__P_476_2;
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

//# sourceMappingURL=Compile.js.map?dt=1782967161067