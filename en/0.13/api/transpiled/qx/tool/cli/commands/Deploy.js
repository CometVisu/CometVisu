function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
      "qx.tool.cli.commands.Compile": {
        "require": true
      },
      "qx.tool.compiler.Console": {
        "defer": "runtime"
      },
      "qx.lang.Object": {},
      "qx.tool.utils.Promisify": {},
      "qx.tool.utils.files.Utils": {},
      "qx.tool.utils.Utils": {},
      "qx.Promise": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2020 Zenesis Ltd https://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (john.spackman@zenesis.com, @johnspackman)
       * Henner Kollmann (Henner.Kollmann@gmx.de, @hkollmann)
  
  ************************************************************************ */
  var fs = require("fs");
  var path = require("upath");

  /**
   * Build and deploy a project.
   *
   * To add your own deployment actions, use the `compile.js` file by
   *
   * - adding a listener for the "afterDeploy" event fired on the command
   * instance  in the `load()` method of the class extending {@link
   * qx.tool.cli.api.LibraryApi} or {@link qx.tool.cli.api.CompilerApi}.
   *
   * - or by implementing a `afterDeploy()` method in the class
   * extending {@link qx.tool.cli.api.CompilerApi}
   *
   * The event and/or method is called with a {@link qx.event.type.Data}
   * containing an object with the properties described below.
   *
   */
  qx.Class.define("qx.tool.cli.commands.Deploy", {
    extend: qx.tool.cli.commands.Compile,
    statics: {
      YARGS_BUILDER: {
        out: {
          describe: "Output directory for the deployment",
          alias: "o"
        },
        "app-name": {
          describe: "The name of the application to deploy (default is all apps), can be comma separated list",
          nargs: 1,
          type: "string"
        },
        "source-maps": {
          describe: "Enable source maps",
          type: "boolean",
          "default": false,
          alias: "m"
        }
      },
      getYargsCommand: function getYargsCommand() {
        return {
          command: "deploy [options]",
          describe: "deploys qooxdoo application(s)",
          builder: function () {
            var res = Object.assign({}, qx.tool.cli.commands.Compile.YARGS_BUILDER, qx.tool.cli.commands.Deploy.YARGS_BUILDER);
            delete res.watch;
            delete res["write-library-info"];
            delete res.download;
            delete res["update-po-files"];
            delete res["save-unminified"];
            delete res.bundling;
            delete res.minify;
            return res;
          }()
        };
      }
    },
    events: {
      /***
       * fired after deploying. With this event
       * application can do aditional copying.
       *
       * The event data is an object with the following properties:
       *
       * targetDir  : {String}  The target dir of the build
       * deployDir  : {String}  The output dir for the deployment
       * argv       : {Object}  Arguments
       * application: {Object}  application to build
       */
      afterDeploy: "qx.event.type.Data"
    },
    members: {
      /*
       * @Override
       */
      processArgs: function processArgs(argv) {
        qx.tool.cli.commands.Deploy.superclass.prototype.processArgs.call(this, argv);
        if (!argv.clean) {
          qx.tool.compiler.Console.print("qx.tool.cli.deploy.notClean");
        }
        var compileArgv = {
          writeLibraryInfo: false,
          download: false,
          updatePoFiles: false,
          saveUnminified: false,
          bundling: true,
          minify: "mangle",
          target: "build",
          deploying: true
        };
        qx.lang.Object.mergeWith(argv, compileArgv);
      },
      /*
       * @Override
       */
      process: function process() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
          var argv, appNames;
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return qx.tool.cli.commands.Deploy.superclass.prototype.process.call(_this);
              case 2:
                argv = _this.argv;
                appNames = null;
                if (argv.appName) {
                  appNames = {};
                  argv.appName.split(",").forEach(function (appName) {
                    return appNames[appName] = true;
                  });
                }
                if (!argv.clean) {
                  _context5.next = 8;
                  break;
                }
                _context5.next = 8;
                return qx.tool.utils.Promisify.eachOfSeries(_this.getMakers(), /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(maker) {
                    var target;
                    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                      while (1) switch (_context2.prev = _context2.next) {
                        case 0:
                          target = maker.getTarget();
                          _context2.next = 3;
                          return qx.tool.utils.Promisify.eachOfSeries(maker.getApplications(), /*#__PURE__*/function () {
                            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(app) {
                              var deployDir;
                              return _regeneratorRuntime().wrap(function _callee$(_context) {
                                while (1) switch (_context.prev = _context.next) {
                                  case 0:
                                    if (!(appNames && !appNames[app.getName()])) {
                                      _context.next = 2;
                                      break;
                                    }
                                    return _context.abrupt("return");
                                  case 2:
                                    if (!(app.getDeploy() === false)) {
                                      _context.next = 4;
                                      break;
                                    }
                                    return _context.abrupt("return");
                                  case 4:
                                    deployDir = argv.out || typeof target.getDeployDir == "function" && target.getDeployDir();
                                    if (!deployDir) {
                                      _context.next = 8;
                                      break;
                                    }
                                    _context.next = 8;
                                    return qx.tool.utils.files.Utils.deleteRecursive(deployDir);
                                  case 8:
                                  case "end":
                                    return _context.stop();
                                }
                              }, _callee);
                            }));
                            return function (_x2) {
                              return _ref2.apply(this, arguments);
                            };
                          }());
                        case 3:
                        case "end":
                          return _context2.stop();
                      }
                    }, _callee2);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());
              case 8:
                _context5.next = 10;
                return qx.tool.utils.Promisify.eachOfSeries(_this.getMakers(), /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(maker, makerIndex) {
                    var target;
                    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                      while (1) switch (_context4.prev = _context4.next) {
                        case 0:
                          target = maker.getTarget();
                          _context4.next = 3;
                          return qx.tool.utils.Promisify.eachOfSeries(maker.getApplications(), /*#__PURE__*/function () {
                            var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(app) {
                              var deployDir, sourceMaps, appRoot, destRoot, from, to, _from, _to, data;
                              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                                while (1) switch (_context3.prev = _context3.next) {
                                  case 0:
                                    if (!(appNames && !appNames[app.getName()])) {
                                      _context3.next = 2;
                                      break;
                                    }
                                    return _context3.abrupt("return");
                                  case 2:
                                    if (!(app.getDeploy() === false)) {
                                      _context3.next = 4;
                                      break;
                                    }
                                    return _context3.abrupt("return");
                                  case 4:
                                    deployDir = argv.out || typeof target.getDeployDir == "function" && target.getDeployDir();
                                    if (deployDir) {
                                      _context3.next = 8;
                                      break;
                                    }
                                    qx.tool.compiler.Console.print("qx.tool.cli.deploy.deployDirNotSpecified", target.getType());
                                    return _context3.abrupt("return");
                                  case 8:
                                    sourceMaps = argv.sourceMaps || typeof target.getDeployMap == "function" && target.getDeployMap() || typeof target.getSaveSourceInMap == "function" && target.getSaveSourceInMap();
                                    appRoot = target.getApplicationRoot(app);
                                    destRoot = path.join(deployDir, app.getName());
                                    _context3.next = 13;
                                    return _this.__P_466_0(appRoot, destRoot, sourceMaps);
                                  case 13:
                                    from = path.join(target.getOutputDir(), "resource");
                                    if (!fs.existsSync(from)) {
                                      _context3.next = 21;
                                      break;
                                    }
                                    to = path.join(deployDir, "resource");
                                    if (!(makerIndex == 0 && argv.clean)) {
                                      _context3.next = 19;
                                      break;
                                    }
                                    _context3.next = 19;
                                    return qx.tool.utils.files.Utils.deleteRecursive(to);
                                  case 19:
                                    _context3.next = 21;
                                    return qx.tool.utils.files.Utils.sync(from, to);
                                  case 21:
                                    _from = path.join(target.getOutputDir(), "index.html");
                                    _to = path.join(deployDir, "index.html");
                                    if (fs.existsSync(_from)) {
                                      fs.copyFileSync(_from, _to);
                                    }
                                    data = {
                                      targetDir: target.getOutputDir(),
                                      deployDir: deployDir,
                                      argv: argv,
                                      application: app
                                    };
                                    _context3.next = 27;
                                    return _this.fireDataEventAsync("afterDeploy", data);
                                  case 27:
                                    if (!(_this.getCompilerApi() && typeof _this.getCompilerApi().afterDeploy == "function")) {
                                      _context3.next = 30;
                                      break;
                                    }
                                    _context3.next = 30;
                                    return _this.getCompilerApi().afterDeploy(data);
                                  case 30:
                                  case "end":
                                    return _context3.stop();
                                }
                              }, _callee3);
                            }));
                            return function (_x5) {
                              return _ref4.apply(this, arguments);
                            };
                          }());
                        case 3:
                        case "end":
                          return _context4.stop();
                      }
                    }, _callee4);
                  }));
                  return function (_x3, _x4) {
                    return _ref3.apply(this, arguments);
                  };
                }());
              case 10:
              case "end":
                return _context5.stop();
            }
          }, _callee5);
        }))();
      },
      __P_466_0: function __P_466_0(srcDir, destDir, sourceMaps) {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
          var files;
          return _regeneratorRuntime().wrap(function _callee7$(_context7) {
            while (1) switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return qx.tool.utils.Utils.makeDirs(destDir);
              case 2:
                _context7.next = 4;
                return fs.readdirAsync(srcDir);
              case 4:
                files = _context7.sent;
                _context7.next = 7;
                return qx.tool.utils.Promisify.eachOf(files, /*#__PURE__*/function () {
                  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(file) {
                    var from, to, stat, ext, rs, ws, ss;
                    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                      while (1) switch (_context6.prev = _context6.next) {
                        case 0:
                          from = path.join(srcDir, file);
                          to = path.join(destDir, file);
                          _context6.next = 4;
                          return fs.statAsync(from);
                        case 4:
                          stat = _context6.sent;
                          if (stat.isFile()) {
                            _context6.next = 9;
                            break;
                          }
                          _context6.next = 8;
                          return _this2.__P_466_0(from, to, sourceMaps);
                        case 8:
                          return _context6.abrupt("return");
                        case 9:
                          ext = path.extname(file);
                          if (!(ext == ".map" && !sourceMaps)) {
                            _context6.next = 12;
                            break;
                          }
                          return _context6.abrupt("return");
                        case 12:
                          if (!(ext == ".js" && !sourceMaps)) {
                            _context6.next = 22;
                            break;
                          }
                          _context6.next = 15;
                          return qx.tool.utils.Utils.makeParentDir(to);
                        case 15:
                          rs = fs.createReadStream(from, {
                            encoding: "utf8",
                            emitClose: true
                          });
                          ws = fs.createWriteStream(to, {
                            encoding: "utf8",
                            emitClose: true
                          });
                          ss = new qx.tool.utils.Utils.StripSourceMapTransform();
                          _context6.next = 20;
                          return new qx.Promise(function (resolve, reject) {
                            rs.on("error", reject);
                            ws.on("error", reject);
                            ws.on("finish", resolve);
                            rs.pipe(ss);
                            ss.pipe(ws);
                          });
                        case 20:
                          _context6.next = 24;
                          break;
                        case 22:
                          _context6.next = 24;
                          return qx.tool.utils.files.Utils.copyFile(from, to);
                        case 24:
                        case "end":
                          return _context6.stop();
                      }
                    }, _callee6);
                  }));
                  return function (_x6) {
                    return _ref5.apply(this, arguments);
                  };
                }());
              case 7:
              case "end":
                return _context7.stop();
            }
          }, _callee7);
        }))();
      }
    },
    defer: function defer(statics) {
      qx.tool.compiler.Console.addMessageIds({
        "qx.tool.cli.deploy.deployDirNotSpecified": "No deploy dir for target <%1> configured! Use --out parameter or deployPath target property in compile.json."
      }, "error");
      qx.tool.compiler.Console.addMessageIds({
        "qx.tool.cli.deploy.notClean": "Incremental build compilation - this is faster but may preserve old artifacts, it is recommended to use --clean command line option"
      }, "warning");
    }
  });
  qx.tool.cli.commands.Deploy.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Deploy.js.map?dt=1729101251006