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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
          var argv, appNames;
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                _context5.n = 1;
                return qx.tool.cli.commands.Deploy.superclass.prototype.process.call(_this);
              case 1:
                argv = _this.argv;
                appNames = null;
                if (argv.appName) {
                  appNames = {};
                  argv.appName.split(",").forEach(function (appName) {
                    return appNames[appName] = true;
                  });
                }
                if (!argv.clean) {
                  _context5.n = 2;
                  break;
                }
                _context5.n = 2;
                return qx.tool.utils.Promisify.eachOfSeries(_this.getMakers(), /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(maker) {
                    var target;
                    return _regenerator().w(function (_context2) {
                      while (1) switch (_context2.n) {
                        case 0:
                          target = maker.getTarget();
                          _context2.n = 1;
                          return qx.tool.utils.Promisify.eachOfSeries(maker.getApplications(), /*#__PURE__*/function () {
                            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(app) {
                              var deployDir;
                              return _regenerator().w(function (_context) {
                                while (1) switch (_context.n) {
                                  case 0:
                                    if (!(appNames && !appNames[app.getName()])) {
                                      _context.n = 1;
                                      break;
                                    }
                                    return _context.a(2);
                                  case 1:
                                    if (!(app.getDeploy() === false)) {
                                      _context.n = 2;
                                      break;
                                    }
                                    return _context.a(2);
                                  case 2:
                                    deployDir = argv.out || typeof target.getDeployDir == "function" && target.getDeployDir();
                                    if (!deployDir) {
                                      _context.n = 3;
                                      break;
                                    }
                                    _context.n = 3;
                                    return qx.tool.utils.files.Utils.deleteRecursive(deployDir);
                                  case 3:
                                    return _context.a(2);
                                }
                              }, _callee);
                            }));
                            return function (_x2) {
                              return _ref2.apply(this, arguments);
                            };
                          }());
                        case 1:
                          return _context2.a(2);
                      }
                    }, _callee2);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());
              case 2:
                _context5.n = 3;
                return qx.tool.utils.Promisify.eachOfSeries(_this.getMakers(), /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(maker, makerIndex) {
                    var target;
                    return _regenerator().w(function (_context4) {
                      while (1) switch (_context4.n) {
                        case 0:
                          target = maker.getTarget();
                          _context4.n = 1;
                          return qx.tool.utils.Promisify.eachOfSeries(maker.getApplications(), /*#__PURE__*/function () {
                            var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(app) {
                              var deployDir, sourceMaps, appRoot, destRoot, from, to, _from, _to, data;
                              return _regenerator().w(function (_context3) {
                                while (1) switch (_context3.n) {
                                  case 0:
                                    if (!(appNames && !appNames[app.getName()])) {
                                      _context3.n = 1;
                                      break;
                                    }
                                    return _context3.a(2);
                                  case 1:
                                    if (!(app.getDeploy() === false)) {
                                      _context3.n = 2;
                                      break;
                                    }
                                    return _context3.a(2);
                                  case 2:
                                    deployDir = argv.out || typeof target.getDeployDir == "function" && target.getDeployDir();
                                    if (deployDir) {
                                      _context3.n = 3;
                                      break;
                                    }
                                    qx.tool.compiler.Console.print("qx.tool.cli.deploy.deployDirNotSpecified", target.getType());
                                    return _context3.a(2);
                                  case 3:
                                    sourceMaps = argv.sourceMaps || typeof target.getDeployMap == "function" && target.getDeployMap() || typeof target.getSaveSourceInMap == "function" && target.getSaveSourceInMap();
                                    appRoot = target.getApplicationRoot(app);
                                    destRoot = path.join(deployDir, app.getName());
                                    _context3.n = 4;
                                    return _this.__P_477_0(appRoot, destRoot, sourceMaps);
                                  case 4:
                                    from = path.join(target.getOutputDir(), "resource");
                                    if (!fs.existsSync(from)) {
                                      _context3.n = 6;
                                      break;
                                    }
                                    to = path.join(deployDir, "resource");
                                    if (!(makerIndex == 0 && argv.clean)) {
                                      _context3.n = 5;
                                      break;
                                    }
                                    _context3.n = 5;
                                    return qx.tool.utils.files.Utils.deleteRecursive(to);
                                  case 5:
                                    _context3.n = 6;
                                    return qx.tool.utils.files.Utils.sync(from, to);
                                  case 6:
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
                                    _context3.n = 7;
                                    return _this.fireDataEventAsync("afterDeploy", data);
                                  case 7:
                                    if (!(_this.getCompilerApi() && typeof _this.getCompilerApi().afterDeploy == "function")) {
                                      _context3.n = 8;
                                      break;
                                    }
                                    _context3.n = 8;
                                    return _this.getCompilerApi().afterDeploy(data);
                                  case 8:
                                    return _context3.a(2);
                                }
                              }, _callee3);
                            }));
                            return function (_x5) {
                              return _ref4.apply(this, arguments);
                            };
                          }());
                        case 1:
                          return _context4.a(2);
                      }
                    }, _callee4);
                  }));
                  return function (_x3, _x4) {
                    return _ref3.apply(this, arguments);
                  };
                }());
              case 3:
                return _context5.a(2);
            }
          }, _callee5);
        }))();
      },
      __P_477_0: function __P_477_0(srcDir, destDir, sourceMaps) {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
          var files;
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.n) {
              case 0:
                _context7.n = 1;
                return qx.tool.utils.Utils.makeDirs(destDir);
              case 1:
                _context7.n = 2;
                return fs.readdirAsync(srcDir);
              case 2:
                files = _context7.v;
                _context7.n = 3;
                return qx.tool.utils.Promisify.eachOf(files, /*#__PURE__*/function () {
                  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(file) {
                    var from, to, stat, ext, rs, ws, ss;
                    return _regenerator().w(function (_context6) {
                      while (1) switch (_context6.n) {
                        case 0:
                          from = path.join(srcDir, file);
                          to = path.join(destDir, file);
                          _context6.n = 1;
                          return fs.statAsync(from);
                        case 1:
                          stat = _context6.v;
                          if (stat.isFile()) {
                            _context6.n = 3;
                            break;
                          }
                          _context6.n = 2;
                          return _this2.__P_477_0(from, to, sourceMaps);
                        case 2:
                          return _context6.a(2);
                        case 3:
                          ext = path.extname(file);
                          if (!(ext == ".map" && !sourceMaps)) {
                            _context6.n = 4;
                            break;
                          }
                          return _context6.a(2);
                        case 4:
                          if (!(ext == ".js" && !sourceMaps)) {
                            _context6.n = 7;
                            break;
                          }
                          _context6.n = 5;
                          return qx.tool.utils.Utils.makeParentDir(to);
                        case 5:
                          rs = fs.createReadStream(from, {
                            encoding: "utf8",
                            emitClose: true
                          });
                          ws = fs.createWriteStream(to, {
                            encoding: "utf8",
                            emitClose: true
                          });
                          ss = new qx.tool.utils.Utils.StripSourceMapTransform();
                          _context6.n = 6;
                          return new qx.Promise(function (resolve, reject) {
                            rs.on("error", reject);
                            ws.on("error", reject);
                            ws.on("finish", resolve);
                            rs.pipe(ss);
                            ss.pipe(ws);
                          });
                        case 6:
                          _context6.n = 8;
                          break;
                        case 7:
                          _context6.n = 8;
                          return qx.tool.utils.files.Utils.copyFile(from, to);
                        case 8:
                          return _context6.a(2);
                      }
                    }, _callee6);
                  }));
                  return function (_x6) {
                    return _ref5.apply(this, arguments);
                  };
                }());
              case 3:
                return _context7.a(2);
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

//# sourceMappingURL=Deploy.js.map?dt=1782595069879