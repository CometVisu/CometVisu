function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.tool.utils.LogManager": {
        "usage": "dynamic",
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
      "qx.tool.utils.IndexedArray": {
        "construct": true
      },
      "qx.tool.compiler.resources.Manager": {},
      "qx.tool.utils.Json": {},
      "qx.tool.utils.Promisify": {},
      "qx.tool.compiler.Console": {},
      "qx.tool.utils.files.Utils": {},
      "qx.tool.compiler.ClassFile": {},
      "qx.tool.compiler.app.Cldr": {},
      "qx.tool.compiler.app.Translation": {},
      "qx.Promise": {},
      "qx.lang.Type": {},
      "qx.tool.compiler.app.ManifestFont": {},
      "qx.tool.config.Utils": {}
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
   * *********************************************************************** */

  /* eslint no-nested-ternary: 0 */
  /* eslint no-inner-declarations: 0 */

  var fs = require("fs");
  var path = require("path");
  var async = require("async");
  var hash = require("object-hash");
  var _require = require("util"),
    promisify = _require.promisify;
  var readFile = promisify(fs.readFile);
  var writeFile = promisify(fs.writeFile);
  var log = qx.tool.utils.LogManager.createLog("analyser");

  /**
   * Entry point for analysing source files; maintains a list of known libraries
   * (eg a qooxdoo application, packages, qooxdoo framework etc.), known classes
   * (and the files and library in which the class is defined, and environment
   * checks which have been used (env checks imply a dependency).
   */
  qx.Class.define("qx.tool.compiler.Analyser", {
    extend: qx.core.Object,
    /**
     * Constructor
     *
     * @param dbFilename
     *          {String} the name of the database, defaults to "db.json"
     */
    construct: function construct(dbFilename) {
      qx.core.Object.constructor.call(this);
      this.__P_477_0 = dbFilename || "db.json";
      this.__P_477_1 = [];
      this.__P_477_2 = {};
      this.__P_477_3 = new qx.tool.utils.IndexedArray();
      this.__P_477_4 = {};
      this.__P_477_5 = {};
      this.__P_477_6 = {};
      this.__P_477_7 = {};
      this.__P_477_8 = {};
    },
    properties: {
      /** Output directory for the compiled application */
      outputDir: {
        nullable: true,
        check: "String"
      },
      /** Directory for proxy source files, if they are to be used */
      proxySourcePath: {
        init: null,
        nullable: true,
        check: "String"
      },
      /** Supported application types */
      applicationTypes: {
        init: ["node", "browser"],
        check: "Array"
      },
      /** Whether to preserve line numbers */
      trackLineNumbers: {
        check: "Boolean",
        init: false,
        nullable: false
      },
      /** Whether to process resources */
      processResources: {
        init: true,
        nullable: false,
        check: "Boolean"
      },
      /** Whether to add `$$createdAt` to new objects */
      addCreatedAt: {
        init: false,
        nullable: false,
        check: "Boolean"
      },
      /** Whether to add verbose tracking to `$$createdAt`. Has no effect if `addCreatedAt=false` */
      verboseCreatedAt: {
        init: false,
        nullable: false,
        check: "Boolean"
      },
      /** Environment during compile time */
      environment: {
        init: null,
        check: "Map",
        apply: "_applyEnvironment"
      },
      /** configuration of babel */
      babelConfig: {
        init: null,
        nullable: true,
        check: "Object"
      },
      /** list of global ignores */
      ignores: {
        init: [],
        nullable: false,
        check: "Array"
      },
      /** list of global symbols */
      globalSymbols: {
        init: [],
        nullable: false,
        check: "Array"
      },
      /** Whether and how to mangle private identifiers */
      manglePrivates: {
        init: "readable",
        check: ["off", "readable", "unreadable"]
      },
      /** Whether to write line numbers to .po files */
      writePoLineNumbers: {
        init: false,
        check: "Boolean"
      }
    },
    events: {
      /**
       * Fired when a class is about to be compiled; data is a map:
       *
       * dbClassInfo: {Object} the newly populated class info
       * oldDbClassInfo: {Object} the previous populated class info
       * classFile - {ClassFile} the qx.tool.compiler.ClassFile instance
       */
      compilingClass: "qx.event.type.Data",
      /**
       * Fired when a class is compiled; data is a map:
       * dbClassInfo: {Object} the newly populated class info
       * oldDbClassInfo: {Object} the previous populated class info
       * classFile - {ClassFile} the qx.tool.compiler.ClassFile instance
       */
      compiledClass: "qx.event.type.Data",
      /**
       * Fired when a class is already compiled (but needed for compilation); data is a map:
       * className: {String}
       * dbClassInfo: {Object} the newly populated class info
       */
      alreadyCompiledClass: "qx.event.type.Data",
      /**
       * Fired when the database is been saved
       * database: {Object} the database to save
       */
      saveDatabase: "qx.event.type.Data"
    },
    members: {
      __P_477_9: false,
      __P_477_10: null,
      __P_477_0: null,
      __P_477_11: null,
      /** {Library[]} All libraries */
      __P_477_1: null,
      /** {Map{String,Library}} Lookup of libraries, indexed by namespace */
      __P_477_2: null,
      __P_477_12: null,
      __P_477_3: null,
      __P_477_4: null,
      __P_477_5: null,
      /** @type{qx.tool.compiler.app.ManifestFont[]} list of fonts in provides.fonts */
      __P_477_8: null,
      __P_477_6: null,
      __P_477_7: null,
      __P_477_13: false,
      __P_477_14: null,
      __P_477_15: null,
      /**
       * Opens the analyser, loads database etc
       *
       * @async
       */
      open: function open() {
        var p;
        if (!this.__P_477_9) {
          this.__P_477_9 = true;
          var resManager = null;
          if (this.isProcessResources()) {
            resManager = new qx.tool.compiler.resources.Manager(this);
          }
          this.__P_477_10 = resManager;
          p = Promise.all([this.loadDatabase(), resManager && resManager.loadDatabase()]);
        } else {
          p = Promise.resolve();
        }
        return p;
      },
      /**
       * Scans the source files for javascript class and resource references and
       * calculates the dependency tree
       *
       * @param cb
       */
      initialScan: function initialScan(cb) {
        var t = this;
        if (!this.__P_477_11) {
          this.__P_477_11 = {};
        }
        log.debug("Scanning source code");
        async.parallel([
        // Load Resources
        function (cb) {
          if (!t.__P_477_10) {
            cb(null);
            return;
          }
          t.__P_477_10.findAllResources().then(function () {
            return cb();
          })["catch"](cb);
        },
        // Find all classes
        function (cb) {
          async.each(t.__P_477_1, function (library, cb) {
            library.scanForClasses(function (err) {
              log.debug("Finished scanning for " + library.getNamespace());
              cb(err);
            });
          }, function (err) {
            log.debug("Finished scanning for all libraries");
            cb(err);
          });
        }], function (err) {
          log.debug("processed source and resources");
          cb(err);
        });
      },
      /**
       * Loads the database if available
       */
      loadDatabase: function loadDatabase() {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return qx.tool.utils.Json.loadJsonAsync(_this.getDbFilename());
              case 2:
                _context.t0 = _context.sent;
                if (_context.t0) {
                  _context.next = 5;
                  break;
                }
                _context.t0 = {};
              case 5:
                _this.__P_477_11 = _context.t0;
              case 6:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      /**
       * Resets the database
       *
       * @return {Promise}
       */
      resetDatabase: function resetDatabase() {
        this.__P_477_11 = null;
        if (this.__P_477_10) {
          this.__P_477_10.dispose();
          this.__P_477_10 = null;
        }
        this.__P_477_9 = false;
        return this.open();
      },
      /**
       * Saves the database
       */
      saveDatabase: function saveDatabase() {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                log.debug("saving generator database");
                _context2.next = 3;
                return _this2.fireDataEventAsync("saveDatabase", _this2.__P_477_11);
              case 3:
                _context2.next = 5;
                return qx.tool.utils.Json.saveJsonAsync(_this2.getDbFilename(), _this2.__P_477_11).then(function () {
                  return _this2.__P_477_10 && _this2.__P_477_10.saveDatabase();
                });
              case 5:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      /**
       * Returns the loaded database
       *
       * @returns
       */
      getDatabase: function getDatabase() {
        return this.__P_477_11;
      },
      /**
       * Parses all the source files recursively until all classes and all
       * dependent classes are loaded
       */
      analyseClasses: function analyseClasses() {
        var _this3 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          var t, db, metaWrittenLog, compiledClasses, metaFixupDescendants, listenerId, classes, getConstructDependencies, getIndirectLoadDependencies, classIndex, dbClassInfo, deps, depName;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                getIndirectLoadDependencies = function _getIndirectLoadDepen(className) {
                  var deps = [];
                  var info = t.__P_477_11.classInfo[className];
                  if (info && info.dependsOn) {
                    for (var depName in info.dependsOn) {
                      if (info.dependsOn[depName].load) {
                        getConstructDependencies(depName).forEach(function (className) {
                          deps.push(className);
                        });
                      }
                    }
                  }
                  return deps;
                };
                getConstructDependencies = function _getConstructDependen(className) {
                  var deps = [];
                  var info = t.__P_477_11.classInfo[className];
                  if (info.dependsOn) {
                    for (var depName in info.dependsOn) {
                      if (info.dependsOn[depName].construct) {
                        deps.push(depName);
                      }
                    }
                  }
                  return deps;
                };
                t = _this3;
                if (!_this3.__P_477_11) {
                  _this3.__P_477_11 = {};
                }
                db = _this3.__P_477_11;
                metaWrittenLog = {};
                compiledClasses = {};
                metaFixupDescendants = {};
                listenerId = _this3.addListener("compiledClass", function (evt) {
                  var data = evt.getData();
                  if (data.oldDbClassInfo) {
                    if (data.oldDbClassInfo["extends"]) {
                      metaFixupDescendants[data.oldDbClassInfo["extends"]] = true;
                    }
                    if (data.oldDbClassInfo.implement) {
                      data.oldDbClassInfo.implement.forEach(function (name) {
                        return metaFixupDescendants[name] = true;
                      });
                    }
                    if (data.oldDbClassInfo.include) {
                      data.oldDbClassInfo.include.forEach(function (name) {
                        return metaFixupDescendants[name] = true;
                      });
                    }
                  }
                  if (data.dbClassInfo["extends"]) {
                    metaFixupDescendants[data.dbClassInfo["extends"]] = true;
                  }
                  if (data.dbClassInfo.implement) {
                    data.dbClassInfo.implement.forEach(function (name) {
                      return metaFixupDescendants[name] = true;
                    });
                  }
                  if (data.dbClassInfo.include) {
                    data.dbClassInfo.include.forEach(function (name) {
                      return metaFixupDescendants[name] = true;
                    });
                  }
                  compiledClasses[data.classFile.getClassName()] = data;
                }); // Note that it is important to pre-load the classes in all libraries - this is because
                //  Babel plugins MUST be synchronous (ie cannot afford an async lookup of files on disk
                //  in mid parse)
                _context4.next = 11;
                return qx.tool.utils.Promisify.map(_this3.__P_477_1, /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(library) {
                    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                      while (1) switch (_context3.prev = _context3.next) {
                        case 0:
                          return _context3.abrupt("return", qx.tool.utils.Promisify.call(function (cb) {
                            return library.scanForClasses(cb);
                          }));
                        case 1:
                        case "end":
                          return _context3.stop();
                      }
                    }, _callee3);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());
              case 11:
                classes = t.__P_477_12 = t.__P_477_3.toArray();
                classIndex = 0;
              case 13:
                if (!(classIndex < classes.length)) {
                  _context4.next = 31;
                  break;
                }
                _context4.prev = 14;
                _context4.next = 17;
                return qx.tool.utils.Promisify.call(function (cb) {
                  return t.getClassInfo(classes[classIndex], cb);
                });
              case 17:
                dbClassInfo = _context4.sent;
                if (dbClassInfo) {
                  deps = dbClassInfo.dependsOn;
                  for (depName in deps) {
                    t._addRequiredClass(depName);
                  }
                }
                _context4.next = 28;
                break;
              case 21:
                _context4.prev = 21;
                _context4.t0 = _context4["catch"](14);
                if (!(_context4.t0.code === "ENOCLASSFILE")) {
                  _context4.next = 27;
                  break;
                }
                qx.tool.compiler.Console.error(_context4.t0.message);
                _context4.next = 28;
                break;
              case 27:
                throw _context4.t0;
              case 28:
                classIndex++;
                _context4.next = 13;
                break;
              case 31:
                classes.forEach(function (className) {
                  var info = t.__P_477_11.classInfo[className];
                  var deps = getIndirectLoadDependencies(className);
                  deps.forEach(function (depName) {
                    if (!info.dependsOn) {
                      info.dependsOn = {};
                    }
                    if (!info.dependsOn[depName]) {
                      info.dependsOn[depName] = {};
                    }
                    info.dependsOn[depName].load = true;
                  });
                });
                t.removeListenerById(listenerId);
              case 33:
              case "end":
                return _context4.stop();
            }
          }, _callee4, null, [[14, 21]]);
        }))();
      },
      /**
       * Called when a reference to a class is made
       * @param className
       * @private
       */
      _addRequiredClass: function _addRequiredClass(className) {
        var t = this;

        // __classes will be null if analyseClasses has not formally been called; this would be if the
        //  analyser is only called externally for getClass()
        if (!t.__P_477_12) {
          t.__P_477_12 = [];
        }

        // Add it
        if (t.__P_477_12.indexOf(className) == -1) {
          t.__P_477_12.push(className);
        }
      },
      /**
       * Returns the full list of required classes
       * @returns {null}
       */
      getDependentClasses: function getDependentClasses() {
        return this.__P_477_12;
      },
      /**
       * Returns cached class info - returns null if not loaded or not in the database
       * @returb DbClassInfo
       */
      getCachedClassInfo: function getCachedClassInfo(className) {
        return this.__P_477_11 ? this.__P_477_11.classInfo[className] : null;
      },
      /**
       * Loads a class
       * @param className {String} the name of the class
       * @param forceScan {Boolean?} true if the class is to be compiled whether it needs it or not (default false)
       * @param cb {Function} (err, DbClassInfo)
       */
      getClassInfo: function getClassInfo(className, forceScan, cb) {
        var t = this;
        if (!this.__P_477_11) {
          this.__P_477_11 = {};
        }
        var db = this.__P_477_11;
        if (typeof forceScan == "function") {
          cb = forceScan;
          forceScan = false;
        }
        if (!db.classInfo) {
          db.classInfo = {};
        }
        var library = t.getLibraryFromClassname(className);
        if (!library) {
          var err = new Error("Cannot find class file " + className);
          err.code = "ENOCLASSFILE";
          cb && cb(err);
          return;
        }
        var sourceClassFilename = this.getClassSourcePath(library, className);
        var outputClassFilename = this.getClassOutputPath(className);
        var scanFile = /*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
            var sourceStat, dbClassInfo, outputStat, dbMtime, oldDbClassInfo, classFile;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return qx.tool.utils.files.Utils.safeStat(sourceClassFilename);
                case 2:
                  sourceStat = _context5.sent;
                  if (sourceStat) {
                    _context5.next = 5;
                    break;
                  }
                  throw new Error("Cannot find " + sourceClassFilename);
                case 5:
                  dbClassInfo = db.classInfo[className];
                  if (!dbClassInfo || !forceScan && dbClassInfo.filename != sourceClassFilename) {
                    forceScan = true;
                  }
                  if (forceScan) {
                    _context5.next = 19;
                    break;
                  }
                  _context5.next = 10;
                  return qx.tool.utils.files.Utils.safeStat(outputClassFilename);
                case 10:
                  outputStat = _context5.sent;
                  if (!(dbClassInfo && outputStat)) {
                    _context5.next = 19;
                    break;
                  }
                  dbMtime = null;
                  try {
                    dbMtime = dbClassInfo.mtime && new Date(dbClassInfo.mtime);
                  } catch (e) {}
                  if (!(dbMtime && dbMtime.getTime() == sourceStat.mtime.getTime())) {
                    _context5.next = 19;
                    break;
                  }
                  if (!(outputStat.mtime.getTime() >= sourceStat.mtime.getTime())) {
                    _context5.next = 19;
                    break;
                  }
                  _context5.next = 18;
                  return t.fireDataEventAsync("alreadyCompiledClass", {
                    className: className,
                    dbClassInfo: dbClassInfo
                  });
                case 18:
                  return _context5.abrupt("return", dbClassInfo);
                case 19:
                  // Add database entry
                  oldDbClassInfo = db.classInfo[className] ? Object.assign({}, db.classInfo[className]) : null;
                  dbClassInfo = db.classInfo[className] = {
                    mtime: sourceStat.mtime,
                    libraryName: library.getNamespace(),
                    filename: sourceClassFilename
                  };

                  // Analyse it and collect unresolved symbols and dependencies
                  classFile = new qx.tool.compiler.ClassFile(t, className, library);
                  _context5.next = 24;
                  return t.fireDataEventAsync("compilingClass", {
                    dbClassInfo: dbClassInfo,
                    oldDbClassInfo: oldDbClassInfo,
                    classFile: classFile
                  });
                case 24:
                  _context5.next = 26;
                  return qx.tool.utils.Promisify.call(function (cb) {
                    return classFile.load(cb);
                  });
                case 26:
                  // Save it
                  classFile.writeDbInfo(dbClassInfo);
                  _context5.next = 29;
                  return t.fireDataEventAsync("compiledClass", {
                    dbClassInfo: dbClassInfo,
                    oldDbClassInfo: oldDbClassInfo,
                    classFile: classFile
                  });
                case 29:
                  return _context5.abrupt("return", dbClassInfo);
                case 30:
                case "end":
                  return _context5.stop();
              }
            }, _callee5);
          }));
          return function scanFile() {
            return _ref2.apply(this, arguments);
          };
        }();
        qx.tool.utils.Promisify.callback(scanFile(), cb);
      },
      /**
       * Returns the absolute path to the class file
       *
       * @param library  {qx.tool.compiler.app.Library}
       * @param className {String}
       * @returns {String}
       */
      getClassSourcePath: function getClassSourcePath(library, className) {
        var filename = className.replace(/\./g, path.sep) + library.getSourceFileExtension(className);
        if (this.getProxySourcePath()) {
          var test = path.join(this.getProxySourcePath(), filename);
          if (fs.existsSync(test)) {
            return path.resolve(test);
          }
        }
        return path.join(library.getRootDir(), library.getSourcePath(), className.replace(/\./g, path.sep) + library.getSourceFileExtension(className));
      },
      /**
       * Returns the path to the rewritten class file
       *
       * @param className {String}
       * @returns {String}
       */
      getClassOutputPath: function getClassOutputPath(className) {
        var filename = path.join(this.getOutputDir(), "transpiled", className.replace(/\./g, path.sep) + ".js");
        return filename;
      },
      /**
       * Returns the CLDR data for a given locale
       * @param locale {String} the locale string
       * @returns {Promise<qx.tool.compiler.app.Cldr>}
       */
      getCldr: function getCldr(locale) {
        var _this4 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
          var t, cldr;
          return _regeneratorRuntime().wrap(function _callee6$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                t = _this4;
                cldr = _this4.__P_477_4[locale];
                if (!cldr) {
                  _context6.next = 4;
                  break;
                }
                return _context6.abrupt("return", cldr);
              case 4:
                return _context6.abrupt("return", qx.tool.compiler.app.Cldr.loadCLDR(locale).then(function (cldr) {
                  return t.__P_477_4[locale] = cldr;
                }));
              case 5:
              case "end":
                return _context6.stop();
            }
          }, _callee6);
        }))();
      },
      /**
       * Gets the translation for the locale and library, caching the result.
       * @param library
       * @param locale
       * @returns {qx.tool.compiler.app.Translation}
       */
      getTranslation: function getTranslation(library, locale) {
        var _this5 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
          var t, id, translation;
          return _regeneratorRuntime().wrap(function _callee7$(_context7) {
            while (1) switch (_context7.prev = _context7.next) {
              case 0:
                t = _this5;
                id = locale + ":" + library.getNamespace();
                translation = t.__P_477_5[id];
                if (translation) {
                  _context7.next = 8;
                  break;
                }
                translation = t.__P_477_5[id] = new qx.tool.compiler.app.Translation(library, locale);
                translation.setWriteLineNumbers(_this5.isWritePoLineNumbers());
                _context7.next = 8;
                return translation.checkRead();
              case 8:
                return _context7.abrupt("return", translation);
              case 9:
              case "end":
                return _context7.stop();
            }
          }, _callee7);
        }))();
      },
      /**
       * Updates all translations to include all msgids found in code
       * @param appLibrary {qx.tool.compiler.app.Library} the library to update
       * @param locales {String[]} locales
       * @param libraries {qx.tool.compiler.app.Library[]} all libraries
       * @param copyAllMsgs {Boolean} whether to copy everything, or just those that are required
       */
      updateTranslations: function updateTranslations(appLibrary, locales, libraries, copyAllMsgs) {
        var _this6 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
          return _regeneratorRuntime().wrap(function _callee11$(_context11) {
            while (1) switch (_context11.prev = _context11.next) {
              case 0:
                if (!libraries) {
                  libraries = [];
                }
                libraries = libraries.filter(function (lib) {
                  return lib != appLibrary;
                });
                _context11.next = 4;
                return qx.Promise.all(locales.map( /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(locale) {
                    var libTranslations, translation, unusedEntries, msgid;
                    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                      while (1) switch (_context10.prev = _context10.next) {
                        case 0:
                          libTranslations = {};
                          _context10.next = 3;
                          return qx.Promise.all(libraries.map( /*#__PURE__*/function () {
                            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(lib) {
                              var translation;
                              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                                while (1) switch (_context8.prev = _context8.next) {
                                  case 0:
                                    translation = new qx.tool.compiler.app.Translation(lib, locale);
                                    _context8.next = 3;
                                    return translation.read();
                                  case 3:
                                    libTranslations[lib.toHashCode()] = translation;
                                  case 4:
                                  case "end":
                                    return _context8.stop();
                                }
                              }, _callee8);
                            }));
                            return function (_x3) {
                              return _ref4.apply(this, arguments);
                            };
                          }()));
                        case 3:
                          translation = new qx.tool.compiler.app.Translation(appLibrary, locale);
                          translation.setWriteLineNumbers(_this6.isWritePoLineNumbers());
                          _context10.next = 7;
                          return translation.read();
                        case 7:
                          unusedEntries = {};
                          for (msgid in translation.getEntries()) {
                            unusedEntries[msgid] = true;
                          }
                          _context10.next = 11;
                          return qx.Promise.all(_this6.__P_477_12.map( /*#__PURE__*/function () {
                            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(classname) {
                              var isAppClass, classLibrary, dbClassInfo, isEmpty;
                              return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                                while (1) switch (_context9.prev = _context9.next) {
                                  case 0:
                                    isEmpty = function _isEmpty(entry) {
                                      if (!entry) {
                                        return true;
                                      }
                                      if (qx.lang.Type.isArray(entry.msgstr)) {
                                        return entry.msgstr.every(function (value) {
                                          return !value;
                                        });
                                      }
                                      return !entry.msgstr;
                                    };
                                    isAppClass = appLibrary.isClass(classname);
                                    classLibrary = !isAppClass && libraries.find(function (lib) {
                                      return lib.isClass(classname);
                                    }) || null;
                                    if (!(!isAppClass && !classLibrary)) {
                                      _context9.next = 5;
                                      break;
                                    }
                                    return _context9.abrupt("return");
                                  case 5:
                                    _context9.next = 7;
                                    return qx.tool.utils.Promisify.call(function (cb) {
                                      return _this6.getClassInfo(classname, cb);
                                    });
                                  case 7:
                                    dbClassInfo = _context9.sent;
                                    if (dbClassInfo.translations) {
                                      _context9.next = 10;
                                      break;
                                    }
                                    return _context9.abrupt("return");
                                  case 10:
                                    dbClassInfo.translations.forEach(function (src) {
                                      delete unusedEntries[src.msgid];
                                      if (classLibrary) {
                                        var _entry = translation.getEntry(src.msgid);
                                        if (!isEmpty(_entry)) {
                                          return;
                                        }
                                        var libTranslation = libTranslations[classLibrary.toHashCode()];
                                        var libEntry = libTranslation.getEntry(src.msgid);
                                        if (isEmpty(libEntry) || copyAllMsgs) {
                                          if (!_entry) {
                                            _entry = translation.getOrCreateEntry(src.msgid);
                                          }
                                          if (libEntry !== null) {
                                            Object.assign(_entry, libEntry);
                                          }
                                        }
                                        return;
                                      }
                                      var entry = translation.getOrCreateEntry(src.msgid);
                                      if (src.msgid_plural) {
                                        entry.msgid_plural = src.msgid_plural;
                                      }
                                      if (!entry.comments) {
                                        entry.comments = {};
                                      }
                                      entry.comments.extracted = src.comment;
                                      entry.comments.reference = {};
                                      var ref = entry.comments.reference;
                                      var fileName = classname.replace(/\./g, "/") + ".js";
                                      var fnAddReference = function fnAddReference(lineNo) {
                                        var arr = ref[fileName];
                                        if (!arr) {
                                          arr = ref[fileName] = [];
                                        }
                                        if (!arr.includes(src.lineNo)) {
                                          arr.push(lineNo);
                                        }
                                      };
                                      if (qx.lang.Type.isArray(src.lineNo)) {
                                        src.lineNo.forEach(fnAddReference);
                                      } else {
                                        fnAddReference(src.lineNo);
                                      }
                                    });
                                  case 11:
                                  case "end":
                                    return _context9.stop();
                                }
                              }, _callee9);
                            }));
                            return function (_x4) {
                              return _ref5.apply(this, arguments);
                            };
                          }()));
                        case 11:
                          Object.keys(unusedEntries).forEach(function (msgid) {
                            var entry = translation.getEntry(msgid);
                            if (entry) {
                              if (!entry.comments) {
                                entry.comments = {};
                              }
                              if (Object.keys(entry.comments).length == 0 && entry.msgstr === "") {
                                translation.deleteEntry(msgid);
                              } else {
                                entry.comments.extracted = "NO LONGER USED";
                                entry.comments.reference = {};
                              }
                            }
                          });
                          _context10.next = 14;
                          return translation.write();
                        case 14:
                        case "end":
                          return _context10.stop();
                      }
                    }, _callee10);
                  }));
                  return function (_x2) {
                    return _ref3.apply(this, arguments);
                  };
                }()));
              case 4:
              case "end":
                return _context11.stop();
            }
          }, _callee11);
        }))();
      },
      /**
       * Returns the path to the qooxdoo library
       *
       * @returns
       */
      getQooxdooPath: function getQooxdooPath() {
        var lib = this.findLibrary("qx");
        if (lib !== null) {
          return lib.getRootDir();
        }
        return null;
      },
      /**
       * Finds the library with a name(space)
       */
      findLibrary: function findLibrary(name) {
        var lib = this.__P_477_2[name];
        return lib;
      },
      /**
       * Returns all libraries
       * @returns {null}
       */
      getLibraries: function getLibraries() {
        return this.__P_477_1;
      },
      /**
       * Adds a library definition
       *
       * @param library
       */
      addLibrary: function addLibrary(library) {
        var existingLibrary = this.__P_477_2[library.getNamespace()];
        if (existingLibrary) {
          throw new Error("Multiple libraries with namespace " + library.getNamespace() + " found " + library.getRootDir() + " and " + existingLibrary.getRootDir());
        }
        this.__P_477_1.push(library);
        this.__P_477_2[library.getNamespace()] = library;
      },
      /**
       * Returns a font by name
       *
       * @param {String} name
       * @param {Boolean?} create whether to create the font if it does not exist (default is false)
       * @returns {qx.tool.compiler.app.ManifestFont?} null if it does not exist and `create` is falsey
       */
      getFont: function getFont(name, create) {
        var font = this.__P_477_8[name] || null;
        if (!font && create) {
          font = this.__P_477_8[name] = new qx.tool.compiler.app.ManifestFont(name);
        }
        return font;
      },
      /**
       * Detects whether the filename is one of the fonts
       *
       * @param {String} filename
       * @returns {Boolean} whether the filename is a font asset
       */
      isFontAsset: function isFontAsset(filename) {
        var isFont = false;
        if (filename.endsWith("svg")) {
          for (var fontName in this.__P_477_8) {
            var font = this.__P_477_8[fontName];
            var sources = font.getSources() || [];
            isFont = sources.find(function (source) {
              return source == filename;
            });
          }
        }
        return isFont;
      },
      /**
       * Returns the map of all fonts, indexed by name
       *
       * @returns {Map<String, qx.tool.compiler.app.ManifestFont>}
       */
      getFonts: function getFonts() {
        return this.__P_477_8;
      },
      /**
       * Adds a required class to be analysed by analyseClasses()
       *
       * @param classname
       */
      addClass: function addClass(classname) {
        this.__P_477_3.push(classname);
      },
      /**
       * Removes a class from the list of required classes to analyse
       * @param classname {String}
       */
      removeClass: function removeClass(classname) {
        this.__P_477_3.remove(classname);
      },
      /**
       * Detects the symbol type, ie class, package, member, etc
       * @param name
       * @returns {{symbolType,name,className}?}
       */
      getSymbolType: function getSymbolType(name) {
        var t = this;
        for (var j = 0; j < t.__P_477_1.length; j++) {
          var library = t.__P_477_1[j];
          var info = library.getSymbolType(name);
          if (info) {
            return info;
          }
        }
        return null;
      },
      /**
       * Returns the library for a given classname, supports private files
       * @param className
       * @returns {*}
       */
      getLibraryFromClassname: function getLibraryFromClassname(className) {
        var t = this;
        var info = this.__P_477_6[className];
        if (info) {
          return info.library;
        }
        for (var j = 0; j < t.__P_477_1.length; j++) {
          var library = t.__P_477_1[j];
          info = library.getSymbolType(className);
          if (info && (info.symbolType == "class" || info.symbolType == "member")) {
            return library;
          }
        }
        return null;
      },
      /**
       * Returns the classname
       * @param className
       * @returns {string}
       */
      getClassFilename: function getClassFilename(className) {
        var library = this.getLibraryFromClassname(className);
        if (!library) {
          return null;
        }
        var path = library.getRootDir() + "/" + library.getSourcePath() + "/" + className.replace(/\./g, "/") + ".js";
        return path;
      },
      /**
       * Sets an environment value as being checked for
       *
       * @param key
       * @param value
       */
      setEnvironmentCheck: function setEnvironmentCheck(key, value) {
        if (_typeof(key) == "object") {
          var map = key;
          for (key in map) {
            this.__P_477_7[key] = map[key];
          }
        } else if (value === undefined) {
          delete this.__P_477_7[key];
        } else {
          this.__P_477_7[key] = value;
        }
      },
      /**
       * Tests whether an environment value is checked for
       *
       * @param key
       * @returns
       */
      getEnvironmentCheck: function getEnvironmentCheck(key) {
        return this.__P_477_7[key];
      },
      /**
       * Returns the resource manager
       */
      getResourceManager: function getResourceManager() {
        return this.__P_477_10;
      },
      /**
       * Returns the version of Qooxdoo
       * @returns {String}
       */
      getQooxdooVersion: function getQooxdooVersion() {
        if (this.__P_477_14) {
          return this.__P_477_14;
        }
        if (!this.__P_477_14) {
          var lib = this.findLibrary("qx");
          if (lib) {
            this.__P_477_14 = lib.getVersion();
          }
        }
        return this.__P_477_14;
      },
      /**
       * Returns the database filename
       * @returns {null}
       */
      getDbFilename: function getDbFilename() {
        return this.__P_477_0;
      },
      /**
       * Returns the resource database filename
       * @returns {null}
       */
      getResDbFilename: function getResDbFilename() {
        var m = this.__P_477_0.match(/(^.*)\/([^/]+)$/);
        var resDb;
        if (m && m.length == 3) {
          resDb = m[1] + "/resource-db.json";
        } else {
          resDb = "resource-db.json";
        }
        return resDb;
      },
      // property apply
      _applyEnvironment: function _applyEnvironment(value) {
        // Cache the hash because we will need it later
        this.__P_477_15 = hash(value);
      },
      /**
       * Whether the compilation context has changed since last analysis
       * e.g. compiler version, environment variables
       *
       * @return {Boolean}
       */
      isContextChanged: function isContextChanged() {
        var db = this.getDatabase();

        // Check if environment is the same as the last time
        // If the environment hash is null, environment variables have
        // not been loaded yet. In that case don't consider the environment
        // changed
        if (this.__P_477_15 && this.__P_477_15 !== db.environmentHash) {
          return true;
        }

        // then check if compiler version is the same
        if (db.compilerVersion !== qx.tool.config.Utils.getCompilerVersion()) {
          return true;
        }
        return false;
      },
      /**
       * Sets the environment data in the __db.
       * The data beeing set are:
       *  * a hash of the current environment values
       *  * the compiler version
       *  * a list of the libraries used
       *
       */
      updateEnvironmentData: function updateEnvironmentData() {
        var libraries = this.getLibraries().reduce(function (acc, library) {
          acc[library.getNamespace()] = library.getVersion();
          return acc;
        }, {});
        var db = this.getDatabase();
        db.libraries = libraries;
        db.environmentHash = this.__P_477_15;
        db.compilerVersion = qx.tool.config.Utils.getCompilerVersion();
      }
    }
  });
  qx.tool.compiler.Analyser.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Analyser.js.map?dt=1722153840306