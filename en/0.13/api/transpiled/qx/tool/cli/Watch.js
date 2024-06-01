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
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.tool.utils.Utils": {},
      "qx.Promise": {},
      "qx.tool.compiler.Console": {
        "defer": "runtime"
      },
      "qx.tool.config.Compile": {},
      "qx.tool.utils.files.Utils": {}
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
       * Henner Kollmann (Henner.Kollmann@gmx.de, @hkollmann)
  
  ************************************************************************ */

  var fs = require("fs");
  var path = require("upath");
  var chokidar = require("chokidar");

  /**
   * @ignore(setImmediate)
   */
  qx.Class.define("qx.tool.cli.Watch", {
    extend: qx.core.Object,
    construct: function construct(maker) {
      qx.core.Object.constructor.call(this);
      this.__P_462_0 = maker;
      this.__P_462_1 = {
        classesCompiled: 0
      };
      this.__P_462_2 = {};
      this.__P_462_3 = [];
      this.__P_462_4 = {};
      maker.addListener("writtenApplication", this._onWrittenApplication, this);
    },
    properties: {
      debug: {
        init: false,
        check: "Boolean"
      }
    },
    events: {
      making: "qx.event.type.Event",
      remaking: "qx.event.type.Event",
      made: "qx.event.type.Event",
      configChanged: "qx.event.type.Event",
      /**
       * @typedef {Object} FileChangedEvent
       * @property {qx.tool.compiler.app.Library} library the library that contains the file
       * @property {String} filename the filename relative to the library root
       * @property {String} fileType either "source", "resource" or "theme"
       *
       * This event is fired when a file is changed, the data is {FileChangedEvent}
       */
      fileChanged: "qx.event.type.Data"
    },
    members: {
      __P_462_5: null,
      __P_462_6: null,
      __P_462_7: false,
      __P_462_0: null,
      __P_462_1: null,
      __P_462_8: null,
      __P_462_9: false,
      __P_462_10: null,
      __P_462_11: null,
      __P_462_2: null,
      __P_462_3: null,
      __P_462_12: null,
      /** @type{Map<String,Object>} list of runWhenWatching configurations, indexed by app name */
      __P_462_4: null,
      setConfigFilenames: function setConfigFilenames(arr) {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (!arr) {
                  _this.__P_462_3 = [];
                } else {
                  _this.__P_462_3 = arr.map(function (filename) {
                    return path.resolve(filename);
                  });
                }
              case 1:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      setRunWhenWatching: function setRunWhenWatching(appName, config) {
        this.__P_462_4[appName] = config;
        var arr = qx.tool.utils.Utils.parseCommand(config.command);
        config._cmd = arr.shift();
        config._args = arr;
      },
      _onWrittenApplication: function _onWrittenApplication(evt) {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var appInfo, name, config;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                appInfo = evt.getData();
                name = appInfo.application.getName();
                config = _this2.__P_462_4[name];
                if (config) {
                  _context2.next = 5;
                  break;
                }
                return _context2.abrupt("return");
              case 5:
                if (!config._process) {
                  _context2.next = 17;
                  break;
                }
                _context2.prev = 6;
                _context2.next = 9;
                return qx.tool.utils.Utils.killTree(config._process.pid);
              case 9:
                _context2.next = 13;
                break;
              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](6);
              case 13:
                if (!config._processPromise) {
                  _context2.next = 16;
                  break;
                }
                _context2.next = 16;
                return config._processPromise;
              case 16:
                config._process = null;
              case 17:
                console.log("Starting application: " + config._cmd + " " + config._args.join(" "));
                config._processPromise = new qx.Promise(function (resolve, reject) {
                  var child = config._process = require("child_process").spawn(config._cmd, config._args);
                  child.stdout.setEncoding("utf8");
                  child.stdout.on("data", function (data) {
                    return console.log(data);
                  });
                  child.stderr.setEncoding("utf8");
                  child.stderr.on("data", function (data) {
                    return console.log(data);
                  });
                  child.on("close", function (code) {
                    console.log("Application has terminated");
                    config._process = null;
                    resolve();
                  });
                  child.on("error", function (err) {
                    return console.error("Application has failed: " + err);
                  });
                });
              case 19:
              case "end":
                return _context2.stop();
            }
          }, _callee2, null, [[6, 11]]);
        }))();
      },
      start: function start() {
        var _this3 = this;
        if (this.isDebug()) {
          qx.tool.compiler.Console.debug("DEBUG: Starting watch");
        }
        if (this.__P_462_5) {
          throw new Error("Cannot start watching more than once");
        }
        this.__P_462_5 = qx.tool.utils.Utils.newExternalPromise();
        var dirs = [];
        var analyser = this.__P_462_0.getAnalyser();
        analyser.addListener("compiledClass", function () {
          _this3.__P_462_1.classesCompiled++;
        });
        dirs.push(qx.tool.config.Compile.config.fileName);
        dirs.push("compile.js");
        analyser.getLibraries().forEach(function (lib) {
          var dir = path.join(lib.getRootDir(), lib.getSourcePath());
          dirs.push(dir);
          dir = path.join(lib.getRootDir(), lib.getResourcePath());
          dirs.push(dir);
          dir = path.join(lib.getRootDir(), lib.getThemePath());
          dirs.push(dir);
        });
        if (analyser.getProxySourcePath()) {
          dirs.push(path.resolve(analyser.getProxySourcePath()));
        }
        var applications = this.__P_462_6 = [];
        this.__P_462_0.getApplications().forEach(function (application) {
          var data = {
            application: application,
            dependsOn: {},
            outOfDate: false
          };
          applications.push(data);
          var dir = application.getBootPath();
          if (dir && !dirs.includes(dir)) {
            dirs.push(dir);
          }
          var localModules = application.getLocalModules();
          for (var requireName in localModules) {
            var _dir = localModules[requireName];
            if (_dir && !dirs.includes(_dir)) {
              dirs.push(_dir);
            }
          }
        });
        if (this.isDebug()) {
          qx.tool.compiler.Console.debug("DEBUG: applications=".concat(JSON.stringify(applications.map(function (d) {
            return d.application.getName();
          }), 2)));
          qx.tool.compiler.Console.debug("DEBUG: dirs=".concat(JSON.stringify(dirs, 2)));
        }
        var confirmed = [];
        Promise.all(dirs.map(function (dir) {
          return new Promise(function (resolve, reject) {
            dir = path.resolve(dir);
            fs.stat(dir, function (err) {
              if (err) {
                if (err.code == "ENOENT") {
                  resolve();
                } else {
                  reject(err);
                }
                return;
              }

              // On case insensitive (but case preserving) filing systems, qx.tool.utils.files.Utils.correctCase
              // is needed corrects because chokidar needs the correct case in order to detect changes.
              qx.tool.utils.files.Utils.correctCase(dir).then(function (dir) {
                confirmed.push(dir);
                resolve();
              });
            });
          });
        })).then(function () {
          if (_this3.isDebug()) {
            qx.tool.compiler.Console.debug("DEBUG: confirmed=".concat(JSON.stringify(confirmed, 2)));
          }
          _this3.__P_462_13().then(function () {
            var watcher = _this3._watcher = chokidar.watch(confirmed, {
              //ignored: /(^|[\/\\])\../
            });
            watcher.on("change", function (filename) {
              return _this3.__P_462_14("change", filename);
            });
            watcher.on("add", function (filename) {
              return _this3.__P_462_14("add", filename);
            });
            watcher.on("unlink", function (filename) {
              return _this3.__P_462_14("unlink", filename);
            });
            watcher.on("ready", function () {
              qx.tool.compiler.Console.log("Start watching ...");
              _this3.__P_462_7 = true;
            });
            watcher.on("error", function (err) {
              qx.tool.compiler.Console.print(err.code == "ENOSPC" ? "qx.tool.cli.watch.enospcError" : "qx.tool.cli.watch.watchError", err);
            });
          });
        });
        process.on("beforeExit", this.__P_462_15.bind(this));
        process.on("exit", this.__P_462_15.bind(this));
        return this.__P_462_5;
      },
      stop: function stop() {
        var _this4 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                _this4.__P_462_9 = true;
                _this4._watcher.close();
                if (!_this4.__P_462_8) {
                  _context3.next = 5;
                  break;
                }
                _context3.next = 5;
                return _this4.__P_462_8;
              case 5:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }))();
      },
      __P_462_13: function __P_462_13() {
        var _this5 = this;
        if (this.__P_462_8) {
          this.__P_462_16 = true;
          return this.__P_462_8;
        }
        this.fireEvent("making");
        var t = this;
        var Console = qx.tool.compiler.Console;
        function make() {
          Console.print("qx.tool.cli.watch.makingApplications");
          t.__P_462_12 = null;
          var startTime = new Date().getTime();
          t.__P_462_1.classesCompiled = 0;
          t.__P_462_10 = false;
          return t.__P_462_0.make().then(function () {
            if (t.__P_462_9) {
              Console.print("qx.tool.cli.watch.makeStopping");
              return null;
            }
            if (t.__P_462_10) {
              return new qx.Promise(function (resolve) {
                setImmediate(function () {
                  Console.print("qx.tool.cli.watch.restartingMake");
                  t.fireEvent("remaking");
                  make().then(resolve);
                });
              });
            }
            var analyser = t.__P_462_0.getAnalyser();
            var db = analyser.getDatabase();
            var promises = [];
            t.__P_462_6.forEach(function (data) {
              data.dependsOn = {};
              var deps = data.application.getDependencies();
              deps.forEach(function (classname) {
                var info = db.classInfo[classname];
                var lib = analyser.findLibrary(info.libraryName);
                var parts = [lib.getRootDir(), lib.getSourcePath()].concat(classname.split("."));
                var filename = path.resolve.apply(path, parts) + ".js";
                data.dependsOn[filename] = true;
              });
              var localModules = data.application.getLocalModules();
              for (var requireName in localModules) {
                var _filename = path.resolve(localModules[requireName]);
                data.dependsOn[_filename] = true;
              }
              var filename = path.resolve(data.application.getLoaderTemplate());
              promises.push(qx.tool.utils.files.Utils.correctCase(filename).then(function (filename) {
                return data.dependsOn[filename] = true;
              }));
            });
            return Promise.all(promises).then(function () {
              var endTime = new Date().getTime();
              Console.print("qx.tool.cli.watch.compiledClasses", t.__P_462_1.classesCompiled, qx.tool.utils.Utils.formatTime(endTime - startTime));
              t.fireEvent("made");
            });
          }).then(function () {
            t.__P_462_8 = null;
          })["catch"](function (err) {
            Console.print("qx.tool.cli.watch.compileFailed", err);
            t.__P_462_8 = null;
            t.fireEvent("made");
          });
        }
        var runIt = function runIt() {
          return make().then(function () {
            if (_this5.__P_462_16) {
              delete _this5.__P_462_16;
              return runIt();
            }
            return null;
          });
        };
        this.__P_462_8 = runIt();
        return this.__P_462_8;
      },
      __P_462_17: function __P_462_17() {
        var _this6 = this;
        if (this.__P_462_8) {
          this.__P_462_16 = true;
          return this.__P_462_8;
        }
        if (this.__P_462_11) {
          clearTimeout(this.__P_462_11);
        }
        this.__P_462_11 = setTimeout(function () {
          return _this6.__P_462_13();
        });
        return null;
      },
      __P_462_14: function __P_462_14(type, filename) {
        var _this7 = this;
        var Console = qx.tool.compiler.Console;
        if (!this.__P_462_7) {
          return null;
        }
        filename = path.normalize(filename);
        var handleFileChange = /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
            var outOfDate, outOfDateApps, outOfDateAppNames, analyser, fName, fileType, fileLibrary, _iterator, _step, lib, dir, rm, target, asset, dota;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  outOfDate = false;
                  if (!_this7.__P_462_3.find(function (str) {
                    return str == filename;
                  })) {
                    _context4.next = 5;
                    break;
                  }
                  if (_this7.isDebug()) {
                    Console.debug("DEBUG: onFileChange: configChanged");
                  }
                  _this7.fireEvent("configChanged");
                  return _context4.abrupt("return");
                case 5:
                  outOfDateApps = {};
                  _this7.__P_462_6.forEach(function (data) {
                    if (data.dependsOn[filename]) {
                      outOfDateApps[data.application.getName()] = data.application;
                      outOfDate = true;
                    } else {
                      var boot = data.application.getBootPath();
                      if (boot) {
                        boot = path.resolve(boot);
                        if (filename.startsWith(boot)) {
                          outOfDateApps[data.application.getName()] = true;
                          outOfDate = true;
                        }
                      }
                    }
                  });
                  outOfDateAppNames = Object.keys(outOfDateApps);
                  if (_this7.isDebug()) {
                    if (outOfDateAppNames.length) {
                      Console.debug("DEBUG: onFileChange: ".concat(filename, " impacted applications: ").concat(JSON.stringify(outOfDateAppNames, 2)));
                    }
                  }
                  analyser = _this7.__P_462_0.getAnalyser();
                  fName = "";
                  fileType = null;
                  fileLibrary = null;
                  _iterator = _createForOfIteratorHelper(analyser.getLibraries());
                  _context4.prev = 14;
                  _iterator.s();
                case 16:
                  if ((_step = _iterator.n()).done) {
                    _context4.next = 38;
                    break;
                  }
                  lib = _step.value;
                  dir = path.resolve(path.join(lib.getRootDir(), lib.getResourcePath()));
                  if (!filename.startsWith(dir)) {
                    _context4.next = 24;
                    break;
                  }
                  fName = path.relative(dir, filename);
                  fileType = "resource";
                  fileLibrary = lib;
                  return _context4.abrupt("break", 38);
                case 24:
                  dir = path.resolve(path.join(lib.getRootDir(), lib.getThemePath()));
                  if (!filename.startsWith(dir)) {
                    _context4.next = 30;
                    break;
                  }
                  fName = path.relative(dir, filename);
                  fileType = "theme";
                  fileLibrary = lib;
                  return _context4.abrupt("break", 38);
                case 30:
                  dir = path.resolve(path.join(lib.getRootDir(), lib.getSourcePath()));
                  if (!filename.startsWith(dir)) {
                    _context4.next = 36;
                    break;
                  }
                  fName = path.relative(dir, filename);
                  fileType = "source";
                  fileLibrary = lib;
                  return _context4.abrupt("break", 38);
                case 36:
                  _context4.next = 16;
                  break;
                case 38:
                  _context4.next = 43;
                  break;
                case 40:
                  _context4.prev = 40;
                  _context4.t0 = _context4["catch"](14);
                  _iterator.e(_context4.t0);
                case 43:
                  _context4.prev = 43;
                  _iterator.f();
                  return _context4.finish(43);
                case 46:
                  _this7.fireDataEvent("fileChanged", {
                    filename: fName,
                    fileType: fileType,
                    library: fileLibrary
                  });
                  if (!(fileType == "resource" || fileType == "theme")) {
                    _context4.next = 59;
                    break;
                  }
                  rm = analyser.getResourceManager();
                  target = _this7.__P_462_0.getTarget();
                  if (_this7.isDebug()) {
                    Console.debug("DEBUG: onFileChange: ".concat(filename, " is a resource"));
                  }
                  asset = rm.getAsset(fName, type != "unlink");
                  if (!(asset && type != "unlink")) {
                    _context4.next = 59;
                    break;
                  }
                  _context4.next = 55;
                  return asset.sync(target);
                case 55:
                  dota = asset.getDependsOnThisAsset();
                  if (!dota) {
                    _context4.next = 59;
                    break;
                  }
                  _context4.next = 59;
                  return qx.Promise.all(dota.map(function (asset) {
                    return asset.sync(target);
                  }));
                case 59:
                  if (outOfDate) {
                    _this7.__P_462_10 = true;
                    _this7.__P_462_17();
                  }
                case 60:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, null, [[14, 40, 43, 46]]);
          }));
          return function handleFileChange() {
            return _ref.apply(this, arguments);
          };
        }();
        var runIt = function runIt(dbc) {
          return handleFileChange().then(function () {
            if (dbc.restart) {
              delete dbc.restart;
              return runIt(dbc);
            }
            return null;
          });
        };
        var dbc = this.__P_462_2[filename];
        if (!dbc) {
          dbc = this.__P_462_2[filename] = {
            types: {}
          };
        }
        dbc.types[type] = true;
        if (dbc.promise) {
          if (this.isDebug()) {
            Console.debug("DEBUG: onFileChange: seen '".concat(filename, "', but restarting promise"));
          }
          dbc.restart = 1;
          return dbc.promise;
        }
        if (dbc.timerId) {
          clearTimeout(dbc.timerId);
          dbc.timerId = null;
        }
        if (this.isDebug()) {
          Console.debug("DEBUG: onFileChange: seen '".concat(filename, "', queuing"));
        }
        dbc.timerId = setTimeout(function () {
          dbc.promise = runIt(dbc).then(function () {
            return delete _this7.__P_462_2[filename];
          });
        }, 150);
        return null;
      },
      __P_462_15: function __P_462_15() {
        this.__P_462_5.resolve();
      }
    },
    defer: function defer() {
      qx.tool.compiler.Console.addMessageIds({
        "qx.tool.cli.watch.makingApplications": ">>> Making the applications...",
        "qx.tool.cli.watch.restartingMake": ">>> Code changed during make, restarting...",
        "qx.tool.cli.watch.makeStopping": ">>> Not restarting make because make is stopping...",
        "qx.tool.cli.watch.compiledClasses": ">>> Compiled %1 classes in %2"
      });
      qx.tool.compiler.Console.addMessageIds({
        "qx.tool.cli.watch.compileFailed": ">>> Fatal error during compile: %1",
        "qx.tool.cli.watch.enospcError": ">>> ENOSPC error occured - try increasing fs.inotify.max_user_watches",
        "qx.tool.cli.watch.watchError": ">>> Error occured while watching files - file modifications may not be detected; error: %1"
      }, "error");
    }
  });
  qx.tool.cli.Watch.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Watch.js.map?dt=1717235399164