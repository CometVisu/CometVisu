function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
      this.__P_488_0 = dbFilename || "db.json";
      this.__P_488_1 = [];
      this.__P_488_2 = {};
      this.__P_488_3 = new qx.tool.utils.IndexedArray();
      this.__P_488_4 = {};
      this.__P_488_5 = {};
      this.__P_488_6 = {};
      this.__P_488_7 = {};
      this.__P_488_8 = {};
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
      /** configuration of browserify */
      browserifyConfig: {
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
      __P_488_9: false,
      __P_488_10: null,
      __P_488_0: null,
      __P_488_11: null,
      /** {Library[]} All libraries */
      __P_488_1: null,
      /** {Map{String,Library}} Lookup of libraries, indexed by namespace */
      __P_488_2: null,
      __P_488_12: null,
      __P_488_3: null,
      __P_488_4: null,
      __P_488_5: null,
      /** @type{qx.tool.compiler.app.ManifestFont[]} list of fonts in provides.fonts */
      __P_488_8: null,
      __P_488_6: null,
      __P_488_7: null,
      __P_488_13: false,
      __P_488_14: null,
      __P_488_15: null,
      /**
       * Opens the analyser, loads database etc
       *
       * @async
       */
      open: function open() {
        var p;
        if (!this.__P_488_9) {
          this.__P_488_9 = true;
          var resManager = null;
          if (this.isProcessResources()) {
            resManager = new qx.tool.compiler.resources.Manager(this);
          }
          this.__P_488_10 = resManager;
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
        if (!this.__P_488_11) {
          this.__P_488_11 = {};
        }
        log.debug("Scanning source code");
        async.parallel([
        // Load Resources
        function (cb) {
          if (!t.__P_488_10) {
            cb(null);
            return;
          }
          t.__P_488_10.findAllResources().then(function () {
            return cb();
          })["catch"](cb);
        },
        // Find all classes
        function (cb) {
          async.each(t.__P_488_1, function (library, cb) {
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _context.n = 1;
                return qx.tool.utils.Json.loadJsonAsync(_this.getDbFilename());
              case 1:
                _t = _context.v;
                if (_t) {
                  _context.n = 2;
                  break;
                }
                _t = {};
              case 2:
                _this.__P_488_11 = _t;
              case 3:
                return _context.a(2);
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
        this.__P_488_11 = null;
        if (this.__P_488_10) {
          this.__P_488_10.dispose();
          this.__P_488_10 = null;
        }
        this.__P_488_9 = false;
        return this.open();
      },
      /**
       * Saves the database
       */
      saveDatabase: function saveDatabase() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                log.debug("saving generator database");
                _context2.n = 1;
                return _this2.fireDataEventAsync("saveDatabase", _this2.__P_488_11);
              case 1:
                _context2.n = 2;
                return qx.tool.utils.Json.saveJsonAsync(_this2.getDbFilename(), _this2.__P_488_11).then(function () {
                  return _this2.__P_488_10 && _this2.__P_488_10.saveDatabase();
                });
              case 2:
                return _context2.a(2);
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
        return this.__P_488_11;
      },
      /**
       * Parses all the source files recursively until all classes and all
       * dependent classes are loaded
       */
      analyseClasses: function analyseClasses() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var t, db, metaWrittenLog, compiledClasses, metaFixupDescendants, listenerId, classes, getConstructDependencies, getIndirectLoadDependencies, classIndex, dbClassInfo, deps, depName, _t2;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.p = _context4.n) {
              case 0:
                getIndirectLoadDependencies = function _getIndirectLoadDepen(className) {
                  var deps = [];
                  var info = t.__P_488_11.classInfo[className];
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
                  var info = t.__P_488_11.classInfo[className];
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
                if (!_this3.__P_488_11) {
                  _this3.__P_488_11 = {};
                }
                db = _this3.__P_488_11;
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
                _context4.n = 1;
                return qx.tool.utils.Promisify.map(_this3.__P_488_1, /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(library) {
                    return _regenerator().w(function (_context3) {
                      while (1) switch (_context3.n) {
                        case 0:
                          return _context3.a(2, qx.tool.utils.Promisify.call(function (cb) {
                            return library.scanForClasses(cb);
                          }));
                      }
                    }, _callee3);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());
              case 1:
                classes = t.__P_488_12 = t.__P_488_3.toArray();
                classIndex = 0;
              case 2:
                if (!(classIndex < classes.length)) {
                  _context4.n = 8;
                  break;
                }
                _context4.p = 3;
                _context4.n = 4;
                return qx.tool.utils.Promisify.call(function (cb) {
                  return t.getClassInfo(classes[classIndex], cb);
                });
              case 4:
                dbClassInfo = _context4.v;
                if (dbClassInfo) {
                  deps = dbClassInfo.dependsOn;
                  for (depName in deps) {
                    t._addRequiredClass(depName);
                  }
                }
                _context4.n = 7;
                break;
              case 5:
                _context4.p = 5;
                _t2 = _context4.v;
                if (!(_t2.code === "ENOCLASSFILE")) {
                  _context4.n = 6;
                  break;
                }
                qx.tool.compiler.Console.error(_t2.message);
                _context4.n = 7;
                break;
              case 6:
                throw _t2;
              case 7:
                classIndex++;
                _context4.n = 2;
                break;
              case 8:
                classes.forEach(function (className) {
                  var info = t.__P_488_11.classInfo[className];
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
              case 9:
                return _context4.a(2);
            }
          }, _callee4, null, [[3, 5]]);
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
        if (!t.__P_488_12) {
          t.__P_488_12 = [];
        }

        // Add it
        if (t.__P_488_12.indexOf(className) == -1) {
          t.__P_488_12.push(className);
        }
      },
      /**
       * Returns the full list of required classes
       * @returns {null}
       */
      getDependentClasses: function getDependentClasses() {
        return this.__P_488_12;
      },
      /**
       * Returns cached class info - returns null if not loaded or not in the database
       * @returb DbClassInfo
       */
      getCachedClassInfo: function getCachedClassInfo(className) {
        return this.__P_488_11 ? this.__P_488_11.classInfo[className] : null;
      },
      /**
       * Loads a class
       * @param className {String} the name of the class
       * @param forceScan {Boolean?} true if the class is to be compiled whether it needs it or not (default false)
       * @param cb {Function} (err, DbClassInfo)
       */
      getClassInfo: function getClassInfo(className, forceScan, cb) {
        var t = this;
        if (!this.__P_488_11) {
          this.__P_488_11 = {};
        }
        var db = this.__P_488_11;
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
          var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
            var sourceStat, dbClassInfo, outputStat, dbMtime, oldDbClassInfo, classFile;
            return _regenerator().w(function (_context5) {
              while (1) switch (_context5.n) {
                case 0:
                  _context5.n = 1;
                  return qx.tool.utils.files.Utils.safeStat(sourceClassFilename);
                case 1:
                  sourceStat = _context5.v;
                  if (sourceStat) {
                    _context5.n = 2;
                    break;
                  }
                  throw new Error("Cannot find " + sourceClassFilename);
                case 2:
                  dbClassInfo = db.classInfo[className];
                  if (!dbClassInfo || !forceScan && dbClassInfo.filename != sourceClassFilename) {
                    forceScan = true;
                  }
                  if (forceScan) {
                    _context5.n = 5;
                    break;
                  }
                  _context5.n = 3;
                  return qx.tool.utils.files.Utils.safeStat(outputClassFilename);
                case 3:
                  outputStat = _context5.v;
                  if (!(dbClassInfo && outputStat)) {
                    _context5.n = 5;
                    break;
                  }
                  dbMtime = null;
                  try {
                    dbMtime = dbClassInfo.mtime && new Date(dbClassInfo.mtime);
                  } catch (e) {}
                  if (!(dbMtime && dbMtime.getTime() == sourceStat.mtime.getTime())) {
                    _context5.n = 5;
                    break;
                  }
                  if (!(outputStat.mtime.getTime() >= sourceStat.mtime.getTime())) {
                    _context5.n = 5;
                    break;
                  }
                  _context5.n = 4;
                  return t.fireDataEventAsync("alreadyCompiledClass", {
                    className: className,
                    dbClassInfo: dbClassInfo
                  });
                case 4:
                  return _context5.a(2, dbClassInfo);
                case 5:
                  // Add database entry
                  oldDbClassInfo = db.classInfo[className] ? Object.assign({}, db.classInfo[className]) : null;
                  dbClassInfo = db.classInfo[className] = {
                    mtime: sourceStat.mtime,
                    libraryName: library.getNamespace(),
                    filename: sourceClassFilename
                  };

                  // Analyse it and collect unresolved symbols and dependencies
                  classFile = new qx.tool.compiler.ClassFile(t, className, library);
                  _context5.n = 6;
                  return t.fireDataEventAsync("compilingClass", {
                    dbClassInfo: dbClassInfo,
                    oldDbClassInfo: oldDbClassInfo,
                    classFile: classFile
                  });
                case 6:
                  _context5.n = 7;
                  return qx.tool.utils.Promisify.call(function (cb) {
                    return classFile.load(cb);
                  });
                case 7:
                  // Save it
                  classFile.writeDbInfo(dbClassInfo);
                  _context5.n = 8;
                  return t.fireDataEventAsync("compiledClass", {
                    dbClassInfo: dbClassInfo,
                    oldDbClassInfo: oldDbClassInfo,
                    classFile: classFile
                  });
                case 8:
                  return _context5.a(2, dbClassInfo);
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
          var t, cldr;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.n) {
              case 0:
                t = _this4;
                cldr = _this4.__P_488_4[locale];
                if (!cldr) {
                  _context6.n = 1;
                  break;
                }
                return _context6.a(2, cldr);
              case 1:
                return _context6.a(2, qx.tool.compiler.app.Cldr.loadCLDR(locale).then(function (cldr) {
                  return t.__P_488_4[locale] = cldr;
                }));
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
          var t, id, translation;
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.n) {
              case 0:
                t = _this5;
                id = locale + ":" + library.getNamespace();
                translation = t.__P_488_5[id];
                if (translation) {
                  _context7.n = 1;
                  break;
                }
                translation = t.__P_488_5[id] = new qx.tool.compiler.app.Translation(library, locale);
                translation.setWriteLineNumbers(_this5.isWritePoLineNumbers());
                _context7.n = 1;
                return translation.checkRead();
              case 1:
                return _context7.a(2, translation);
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
          return _regenerator().w(function (_context1) {
            while (1) switch (_context1.n) {
              case 0:
                if (!libraries) {
                  libraries = [];
                }
                libraries = libraries.filter(function (lib) {
                  return lib != appLibrary;
                });
                _context1.n = 1;
                return qx.Promise.all(locales.map(/*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(locale) {
                    var libTranslations, translation, unusedEntries, msgid;
                    return _regenerator().w(function (_context0) {
                      while (1) switch (_context0.n) {
                        case 0:
                          libTranslations = {};
                          _context0.n = 1;
                          return qx.Promise.all(libraries.map(/*#__PURE__*/function () {
                            var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(lib) {
                              var translation;
                              return _regenerator().w(function (_context8) {
                                while (1) switch (_context8.n) {
                                  case 0:
                                    translation = new qx.tool.compiler.app.Translation(lib, locale);
                                    _context8.n = 1;
                                    return translation.read();
                                  case 1:
                                    libTranslations[lib.toHashCode()] = translation;
                                  case 2:
                                    return _context8.a(2);
                                }
                              }, _callee8);
                            }));
                            return function (_x3) {
                              return _ref4.apply(this, arguments);
                            };
                          }()));
                        case 1:
                          translation = new qx.tool.compiler.app.Translation(appLibrary, locale);
                          translation.setWriteLineNumbers(_this6.isWritePoLineNumbers());
                          _context0.n = 2;
                          return translation.read();
                        case 2:
                          unusedEntries = {};
                          for (msgid in translation.getEntries()) {
                            unusedEntries[msgid] = true;
                          }
                          _context0.n = 3;
                          return qx.Promise.all(_this6.__P_488_12.map(/*#__PURE__*/function () {
                            var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(classname) {
                              var isAppClass, classLibrary, dbClassInfo, isEmpty;
                              return _regenerator().w(function (_context9) {
                                while (1) switch (_context9.n) {
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
                                      _context9.n = 1;
                                      break;
                                    }
                                    return _context9.a(2);
                                  case 1:
                                    _context9.n = 2;
                                    return qx.tool.utils.Promisify.call(function (cb) {
                                      return _this6.getClassInfo(classname, cb);
                                    });
                                  case 2:
                                    dbClassInfo = _context9.v;
                                    if (dbClassInfo.translations) {
                                      _context9.n = 3;
                                      break;
                                    }
                                    return _context9.a(2);
                                  case 3:
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
                                  case 4:
                                    return _context9.a(2);
                                }
                              }, _callee9);
                            }));
                            return function (_x4) {
                              return _ref5.apply(this, arguments);
                            };
                          }()));
                        case 3:
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
                          _context0.n = 4;
                          return translation.write();
                        case 4:
                          return _context0.a(2);
                      }
                    }, _callee0);
                  }));
                  return function (_x2) {
                    return _ref3.apply(this, arguments);
                  };
                }()));
              case 1:
                return _context1.a(2);
            }
          }, _callee1);
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
        var lib = this.__P_488_2[name];
        return lib;
      },
      /**
       * Returns all libraries
       * @returns {null}
       */
      getLibraries: function getLibraries() {
        return this.__P_488_1;
      },
      /**
       * Adds a library definition
       *
       * @param library
       */
      addLibrary: function addLibrary(library) {
        var existingLibrary = this.__P_488_2[library.getNamespace()];
        if (existingLibrary) {
          throw new Error("Multiple libraries with namespace " + library.getNamespace() + " found " + library.getRootDir() + " and " + existingLibrary.getRootDir());
        }
        this.__P_488_1.push(library);
        this.__P_488_2[library.getNamespace()] = library;
      },
      /**
       * Returns a font by name
       *
       * @param {String} name
       * @param {Boolean?} create whether to create the font if it does not exist (default is false)
       * @returns {qx.tool.compiler.app.ManifestFont?} null if it does not exist and `create` is falsey
       */
      getFont: function getFont(name, create) {
        var font = this.__P_488_8[name] || null;
        if (!font && create) {
          font = this.__P_488_8[name] = new qx.tool.compiler.app.ManifestFont(name);
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
          for (var fontName in this.__P_488_8) {
            var font = this.__P_488_8[fontName];
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
        return this.__P_488_8;
      },
      /**
       * Adds a required class to be analysed by analyseClasses()
       *
       * @param classname
       */
      addClass: function addClass(classname) {
        this.__P_488_3.push(classname);
      },
      /**
       * Removes a class from the list of required classes to analyse
       * @param classname {String}
       */
      removeClass: function removeClass(classname) {
        this.__P_488_3.remove(classname);
      },
      /**
       * Detects the symbol type, ie class, package, member, etc
       * @param name
       * @returns {{symbolType,name,className}?}
       */
      getSymbolType: function getSymbolType(name) {
        var t = this;
        for (var j = 0; j < t.__P_488_1.length; j++) {
          var library = t.__P_488_1[j];
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
        var info = this.__P_488_6[className];
        if (info) {
          return info.library;
        }
        for (var j = 0; j < t.__P_488_1.length; j++) {
          var library = t.__P_488_1[j];
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
            this.__P_488_7[key] = map[key];
          }
        } else if (value === undefined) {
          delete this.__P_488_7[key];
        } else {
          this.__P_488_7[key] = value;
        }
      },
      /**
       * Tests whether an environment value is checked for
       *
       * @param key
       * @returns
       */
      getEnvironmentCheck: function getEnvironmentCheck(key) {
        return this.__P_488_7[key];
      },
      /**
       * Returns the resource manager
       */
      getResourceManager: function getResourceManager() {
        return this.__P_488_10;
      },
      /**
       * Returns the version of Qooxdoo
       * @returns {String}
       */
      getQooxdooVersion: function getQooxdooVersion() {
        if (this.__P_488_14) {
          return this.__P_488_14;
        }
        if (!this.__P_488_14) {
          var lib = this.findLibrary("qx");
          if (lib) {
            this.__P_488_14 = lib.getVersion();
          }
        }
        return this.__P_488_14;
      },
      /**
       * Returns the database filename
       * @returns {null}
       */
      getDbFilename: function getDbFilename() {
        return this.__P_488_0;
      },
      /**
       * Returns the resource database filename
       * @returns {null}
       */
      getResDbFilename: function getResDbFilename() {
        var m = this.__P_488_0.match(/(^.*)\/([^/]+)$/);
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
        this.__P_488_15 = hash(value);
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
        if (this.__P_488_15 && this.__P_488_15 !== db.environmentHash) {
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
        db.environmentHash = this.__P_488_15;
        db.compilerVersion = qx.tool.config.Utils.getCompilerVersion();
      }
    }
  });
  qx.tool.compiler.Analyser.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Analyser.js.map?dt=1782705793349