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
      this.__P_473_0 = maker;
      this.__P_473_1 = {
        classesCompiled: 0
      };
      this.__P_473_2 = {};
      this.__P_473_3 = [];
      this.__P_473_4 = {};
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
      __P_473_5: null,
      __P_473_6: null,
      __P_473_7: false,
      __P_473_0: null,
      __P_473_1: null,
      __P_473_8: null,
      __P_473_9: false,
      __P_473_10: null,
      __P_473_11: null,
      __P_473_2: null,
      __P_473_3: null,
      __P_473_12: null,
      /** @type{Map<String,Object>} list of runWhenWatching configurations, indexed by app name */
      __P_473_4: null,
      setConfigFilenames: function setConfigFilenames(arr) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                if (!arr) {
                  _this.__P_473_3 = [];
                } else {
                  _this.__P_473_3 = arr.map(function (filename) {
                    return path.resolve(filename);
                  });
                }
              case 1:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      setRunWhenWatching: function setRunWhenWatching(appName, config) {
        this.__P_473_4[appName] = config;
        var arr = qx.tool.utils.Utils.parseCommand(config.command);
        config._cmd = arr.shift();
        config._args = arr;
      },
      _onWrittenApplication: function _onWrittenApplication(evt) {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var appInfo, name, config, _t;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                appInfo = evt.getData();
                name = appInfo.application.getName();
                config = _this2.__P_473_4[name];
                if (config) {
                  _context2.n = 1;
                  break;
                }
                return _context2.a(2);
              case 1:
                if (!config._process) {
                  _context2.n = 7;
                  break;
                }
                _context2.p = 2;
                _context2.n = 3;
                return qx.tool.utils.Utils.killTree(config._process.pid);
              case 3:
                _context2.n = 5;
                break;
              case 4:
                _context2.p = 4;
                _t = _context2.v;
              case 5:
                if (!config._processPromise) {
                  _context2.n = 6;
                  break;
                }
                _context2.n = 6;
                return config._processPromise;
              case 6:
                config._process = null;
              case 7:
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
              case 8:
                return _context2.a(2);
            }
          }, _callee2, null, [[2, 4]]);
        }))();
      },
      start: function start() {
        var _this3 = this;
        if (this.isDebug()) {
          qx.tool.compiler.Console.debug("DEBUG: Starting watch");
        }
        if (this.__P_473_5) {
          throw new Error("Cannot start watching more than once");
        }
        this.__P_473_5 = qx.tool.utils.Utils.newExternalPromise();
        var dirs = [];
        var analyser = this.__P_473_0.getAnalyser();
        analyser.addListener("compiledClass", function () {
          _this3.__P_473_1.classesCompiled++;
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
        var applications = this.__P_473_6 = [];
        this.__P_473_0.getApplications().forEach(function (application) {
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
          _this3.__P_473_13().then(function () {
            var watcher = _this3._watcher = chokidar.watch(confirmed, {
              //ignored: /(^|[\/\\])\../
            });
            watcher.on("change", function (filename) {
              return _this3.__P_473_14("change", filename);
            });
            watcher.on("add", function (filename) {
              return _this3.__P_473_14("add", filename);
            });
            watcher.on("unlink", function (filename) {
              return _this3.__P_473_14("unlink", filename);
            });
            watcher.on("ready", function () {
              qx.tool.compiler.Console.log("Start watching ...");
              _this3.__P_473_7 = true;
            });
            watcher.on("error", function (err) {
              qx.tool.compiler.Console.print(err.code == "ENOSPC" ? "qx.tool.cli.watch.enospcError" : "qx.tool.cli.watch.watchError", err);
            });
          });
        });
        process.on("beforeExit", this.__P_473_15.bind(this));
        process.on("exit", this.__P_473_15.bind(this));
        return this.__P_473_5;
      },
      stop: function stop() {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                _this4.__P_473_9 = true;
                _this4._watcher.close();
                if (!_this4.__P_473_8) {
                  _context3.n = 1;
                  break;
                }
                _context3.n = 1;
                return _this4.__P_473_8;
              case 1:
                return _context3.a(2);
            }
          }, _callee3);
        }))();
      },
      __P_473_13: function __P_473_13() {
        var _this5 = this;
        if (this.__P_473_8) {
          this.__P_473_16 = true;
          return this.__P_473_8;
        }
        this.fireEvent("making");
        var t = this;
        var Console = qx.tool.compiler.Console;
        function make() {
          Console.print("qx.tool.cli.watch.makingApplications");
          t.__P_473_12 = null;
          var startTime = new Date().getTime();
          t.__P_473_1.classesCompiled = 0;
          t.__P_473_10 = false;
          return t.__P_473_0.make().then(function () {
            if (t.__P_473_9) {
              Console.print("qx.tool.cli.watch.makeStopping");
              return null;
            }
            if (t.__P_473_10) {
              return new qx.Promise(function (resolve) {
                setImmediate(function () {
                  Console.print("qx.tool.cli.watch.restartingMake");
                  t.fireEvent("remaking");
                  make().then(resolve);
                });
              });
            }
            var analyser = t.__P_473_0.getAnalyser();
            var db = analyser.getDatabase();
            var promises = [];
            t.__P_473_6.forEach(function (data) {
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
              Console.print("qx.tool.cli.watch.compiledClasses", t.__P_473_1.classesCompiled, qx.tool.utils.Utils.formatTime(endTime - startTime));
              t.fireEvent("made");
            });
          }).then(function () {
            t.__P_473_8 = null;
          })["catch"](function (err) {
            Console.print("qx.tool.cli.watch.compileFailed", err);
            t.__P_473_8 = null;
            t.fireEvent("made");
          });
        }
        var _runIt = function runIt() {
          return make().then(function () {
            if (_this5.__P_473_16) {
              delete _this5.__P_473_16;
              return _runIt();
            }
            return null;
          });
        };
        this.__P_473_8 = _runIt();
        return this.__P_473_8;
      },
      __P_473_17: function __P_473_17() {
        var _this6 = this;
        if (this.__P_473_8) {
          this.__P_473_16 = true;
          return this.__P_473_8;
        }
        if (this.__P_473_11) {
          clearTimeout(this.__P_473_11);
        }
        this.__P_473_11 = setTimeout(function () {
          return _this6.__P_473_13();
        });
        return null;
      },
      __P_473_14: function __P_473_14(type, filename) {
        var _this7 = this;
        var Console = qx.tool.compiler.Console;
        if (!this.__P_473_7) {
          return null;
        }
        filename = path.normalize(filename);
        var handleFileChange = /*#__PURE__*/function () {
          var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
            var outOfDate, outOfDateApps, outOfDateAppNames, analyser, fName, fileType, fileLibrary, _iterator, _step, lib, dir, rm, target, asset, dota, _t2;
            return _regenerator().w(function (_context4) {
              while (1) switch (_context4.p = _context4.n) {
                case 0:
                  outOfDate = false;
                  if (!_this7.__P_473_3.find(function (str) {
                    return str == filename;
                  })) {
                    _context4.n = 1;
                    break;
                  }
                  if (_this7.isDebug()) {
                    Console.debug("DEBUG: onFileChange: configChanged");
                  }
                  _this7.fireEvent("configChanged");
                  return _context4.a(2);
                case 1:
                  outOfDateApps = {};
                  _this7.__P_473_6.forEach(function (data) {
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
                  analyser = _this7.__P_473_0.getAnalyser();
                  fName = "";
                  fileType = null;
                  fileLibrary = null;
                  _iterator = _createForOfIteratorHelper(analyser.getLibraries());
                  _context4.p = 2;
                  _iterator.s();
                case 3:
                  if ((_step = _iterator.n()).done) {
                    _context4.n = 7;
                    break;
                  }
                  lib = _step.value;
                  dir = path.resolve(path.join(lib.getRootDir(), lib.getResourcePath()));
                  if (!filename.startsWith(dir)) {
                    _context4.n = 4;
                    break;
                  }
                  fName = path.relative(dir, filename);
                  fileType = "resource";
                  fileLibrary = lib;
                  return _context4.a(3, 7);
                case 4:
                  dir = path.resolve(path.join(lib.getRootDir(), lib.getThemePath()));
                  if (!filename.startsWith(dir)) {
                    _context4.n = 5;
                    break;
                  }
                  fName = path.relative(dir, filename);
                  fileType = "theme";
                  fileLibrary = lib;
                  return _context4.a(3, 7);
                case 5:
                  dir = path.resolve(path.join(lib.getRootDir(), lib.getSourcePath()));
                  if (!filename.startsWith(dir)) {
                    _context4.n = 6;
                    break;
                  }
                  fName = path.relative(dir, filename);
                  fileType = "source";
                  fileLibrary = lib;
                  return _context4.a(3, 7);
                case 6:
                  _context4.n = 3;
                  break;
                case 7:
                  _context4.n = 9;
                  break;
                case 8:
                  _context4.p = 8;
                  _t2 = _context4.v;
                  _iterator.e(_t2);
                case 9:
                  _context4.p = 9;
                  _iterator.f();
                  return _context4.f(9);
                case 10:
                  _this7.fireDataEvent("fileChanged", {
                    filename: fName,
                    fileType: fileType,
                    library: fileLibrary
                  });
                  if (!(fileType == "resource" || fileType == "theme")) {
                    _context4.n = 12;
                    break;
                  }
                  rm = analyser.getResourceManager();
                  target = _this7.__P_473_0.getTarget();
                  if (_this7.isDebug()) {
                    Console.debug("DEBUG: onFileChange: ".concat(filename, " is a resource"));
                  }
                  asset = rm.getAsset(fName, type != "unlink");
                  if (!(asset && type != "unlink")) {
                    _context4.n = 12;
                    break;
                  }
                  _context4.n = 11;
                  return asset.sync(target);
                case 11:
                  dota = asset.getDependsOnThisAsset();
                  if (!dota) {
                    _context4.n = 12;
                    break;
                  }
                  _context4.n = 12;
                  return qx.Promise.all(dota.map(function (asset) {
                    return asset.sync(target);
                  }));
                case 12:
                  if (outOfDate) {
                    _this7.__P_473_10 = true;
                    _this7.__P_473_17();
                  }
                case 13:
                  return _context4.a(2);
              }
            }, _callee4, null, [[2, 8, 9, 10]]);
          }));
          return function handleFileChange() {
            return _ref.apply(this, arguments);
          };
        }();
        var _runIt2 = function runIt(dbc) {
          return handleFileChange().then(function () {
            if (dbc.restart) {
              delete dbc.restart;
              return _runIt2(dbc);
            }
            return null;
          });
        };
        var dbc = this.__P_473_2[filename];
        if (!dbc) {
          dbc = this.__P_473_2[filename] = {
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
          dbc.promise = _runIt2(dbc).then(function () {
            return delete _this7.__P_473_2[filename];
          });
        }, 150);
        return null;
      },
      __P_473_15: function __P_473_15() {
        this.__P_473_5.resolve();
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

//# sourceMappingURL=Watch.js.map?dt=1778272840445