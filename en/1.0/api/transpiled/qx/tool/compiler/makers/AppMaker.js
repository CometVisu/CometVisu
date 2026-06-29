function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
      "qx.tool.compiler.makers.AbstractAppMaker": {
        "construct": true,
        "require": true
      },
      "qx.tool.compiler.app.Application": {
        "construct": true
      },
      "qx.tool.utils.Values": {},
      "qx.tool.compiler.ClassFile": {},
      "qx.tool.config.Utils": {},
      "qx.tool.utils.Utils": {},
      "qx.tool.utils.files.Utils": {},
      "qx.tool.compiler.Console": {}
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
  var log = qx.tool.utils.LogManager.createLog("analyser");

  /**
   * Application maker; supports multiple applications to compile against a single
   * target
   */
  qx.Class.define("qx.tool.compiler.makers.AppMaker", {
    extend: qx.tool.compiler.makers.AbstractAppMaker,
    /**
     * Constructor
     * @param className {String|String[]} classname(s) to generate
     * @param theme {String} the theme classname
     */
    construct: function construct(className, theme) {
      qx.tool.compiler.makers.AbstractAppMaker.constructor.call(this);
      this.__P_502_0 = [];
      if (className) {
        var app = new qx.tool.compiler.app.Application(className);
        if (theme) {
          app.setTheme(theme);
        }
        this.addApplication(app);
      }
    },
    members: {
      __P_502_0: null,
      /**
       * Adds an Application to be made
       * @param app
       */
      addApplication: function addApplication(app) {
        this.__P_502_0.push(app);
      },
      /**
       * Returns the array of applications
       * @returns {qx.tool.compiler.app.Application[]}
       */
      getApplications: function getApplications() {
        return this.__P_502_0;
      },
      /*
       * @Override
       */
      make: function make() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var analyser, target, success, hasWarnings, compileEnv, preserve, tmp, appEnvironments, allAppEnv, _iterator, _step, library, fontsData, fontName, fontData, font, compiledClasses, db, appsThisTime, allAppInfos, i, application, appEnv, appInfo, _t3, _t4, _t5;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                analyser = _this.getAnalyser();
                target = _this.getTarget();
                _context2.n = 1;
                return _this.fireEventAsync("making");
              case 1:
                _this.setSuccess(null);
                _this.setHasWarnings(null);
                success = true;
                hasWarnings = false; // merge all environment settings for the analyser
                compileEnv = qx.tool.utils.Values.merge({}, qx.tool.compiler.ClassFile.ENVIRONMENT_CONSTANTS, {
                  "qx.compiler": true,
                  "qx.compiler.version": qx.tool.config.Utils.getCompilerVersion()
                }, _this.getEnvironment(), target.getDefaultEnvironment(), target.getEnvironment());
                preserve = target.getPreserveEnvironment();
                if (preserve) {
                  tmp = {};
                  preserve.forEach(function (key) {
                    return tmp[key] = true;
                  });
                  preserve = tmp;
                } else {
                  preserve = {};
                }
                appEnvironments = {};
                _this.getApplications().forEach(function (app) {
                  appEnvironments[app.toHashCode()] = qx.tool.utils.Values.merge({}, compileEnv, app.getCalculatedEnvironment());
                });

                // Analyze the list of environment variables, detect which are shared between all apps
                allAppEnv = {};
                _this.getApplications().forEach(function (app) {
                  var env = appEnvironments[app.toHashCode()];
                  Object.keys(env).forEach(function (key) {
                    if (!allAppEnv[key]) {
                      allAppEnv[key] = {
                        value: env[key],
                        same: true
                      };
                    } else if (allAppEnv[key].value !== env[key]) {
                      allAppEnv[key].same = false;
                    }
                  });
                });

                // If an env setting is the same for all apps, move it to the target for code elimination; similarly,
                //  if it varies between apps, then remove it from the target and make each app specify it individually
                _this.getApplications().forEach(function (app) {
                  var env = appEnvironments[app.toHashCode()];
                  Object.keys(allAppEnv).forEach(function (key) {
                    if (preserve[key]) {
                      env[key] = compileEnv[key];
                    } else if (allAppEnv[key].same) {
                      delete env[key];
                    } else if (env[key] === undefined) {
                      env[key] = compileEnv[key];
                    }
                  });
                });

                // Cleanup to remove env that have been moved to the app
                Object.keys(allAppEnv).forEach(function (key) {
                  if (!preserve[key] && allAppEnv[key].same) {
                    compileEnv[key] = allAppEnv[key].value;
                  } else {
                    delete compileEnv[key];
                  }
                });
                _context2.n = 2;
                return analyser.open();
              case 2:
                analyser.setEnvironment(compileEnv);
                if (!(!_this.isNoErase() && analyser.isContextChanged())) {
                  _context2.n = 5;
                  break;
                }
                log.log("enviroment changed - delete output dir");
                _context2.n = 3;
                return _this.eraseOutputDir();
              case 3:
                _context2.n = 4;
                return qx.tool.utils.Utils.makeParentDir(_this.getOutputDir());
              case 4:
                _context2.n = 5;
                return analyser.resetDatabase();
              case 5:
                _context2.n = 6;
                return qx.tool.utils.Utils.promisifyThis(analyser.initialScan, analyser);
              case 6:
                _context2.n = 7;
                return analyser.updateEnvironmentData();
              case 7:
                target.setAnalyser(analyser);
                _this.__P_502_0.forEach(function (app) {
                  return app.setAnalyser(analyser);
                });
                _context2.n = 8;
                return target.open();
              case 8:
                _iterator = _createForOfIteratorHelper(analyser.getLibraries());
                _context2.p = 9;
                _iterator.s();
              case 10:
                if ((_step = _iterator.n()).done) {
                  _context2.n = 14;
                  break;
                }
                library = _step.value;
                fontsData = library.getFontsData();
                _t3 = _regeneratorKeys(fontsData);
              case 11:
                if ((_t4 = _t3()).done) {
                  _context2.n = 13;
                  break;
                }
                fontName = _t4.value;
                fontData = fontsData[fontName];
                font = analyser.getFont(fontName);
                if (font) {
                  _context2.n = 12;
                  break;
                }
                font = analyser.getFont(fontName, true);
                _context2.n = 12;
                return font.updateFromManifest(fontData, library);
              case 12:
                _context2.n = 11;
                break;
              case 13:
                _context2.n = 10;
                break;
              case 14:
                _context2.n = 16;
                break;
              case 15:
                _context2.p = 15;
                _t5 = _context2.v;
                _iterator.e(_t5);
              case 16:
                _context2.p = 16;
                _iterator.f();
                return _context2.f(16);
              case 17:
                _this.__P_502_0.forEach(function (app) {
                  app.getRequiredClasses().forEach(function (className) {
                    analyser.addClass(className);
                  });
                  if (app.getTheme()) {
                    analyser.addClass(app.getTheme());
                  }
                });
                _context2.n = 18;
                return analyser.analyseClasses();
              case 18:
                _context2.n = 19;
                return analyser.saveDatabase();
              case 19:
                _context2.n = 20;
                return _this.fireEventAsync("writingApplications");
              case 20:
                // Detect which applications need to be recompiled by looking for classes recently compiled
                //  which is on the application's dependency list.  The first time `.make()` is called there
                //  will be no dependencies so we just compile anyway, but `qx compile --watch` will call it
                //  multiple times
                compiledClasses = _this.getRecentlyCompiledClasses(true);
                db = analyser.getDatabase();
                _context2.n = 21;
                return _this.__P_502_0.filter(/*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(app) {
                    var loadDeps, res, localModules, requireName, _db$modulesInfo, stat, _t, _t2;
                    return _regenerator().w(function (_context) {
                      while (1) switch (_context.n) {
                        case 0:
                          loadDeps = app.getDependencies();
                          if (!(!loadDeps || !loadDeps.length)) {
                            _context.n = 1;
                            break;
                          }
                          return _context.a(2, true);
                        case 1:
                          res = loadDeps.some(function (name) {
                            return Boolean(compiledClasses[name]);
                          });
                          localModules = app.getLocalModules();
                          _t = _regeneratorKeys(localModules);
                        case 2:
                          if ((_t2 = _t()).done) {
                            _context.n = 4;
                            break;
                          }
                          requireName = _t2.value;
                          _context.n = 3;
                          return qx.tool.utils.files.Utils.safeStat(localModules[requireName]);
                        case 3:
                          stat = _context.v;
                          res || (res = stat.mtime.getTime() > ((db === null || db === void 0 || (_db$modulesInfo = db.modulesInfo) === null || _db$modulesInfo === void 0 ? void 0 : _db$modulesInfo.localModules[requireName]) || 0));
                          _context.n = 2;
                          break;
                        case 4:
                          return _context.a(2, res);
                      }
                    }, _callee);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());
              case 21:
                appsThisTime = _context2.v;
                allAppInfos = [];
                i = 0;
              case 22:
                if (!(i < appsThisTime.length)) {
                  _context2.n = 27;
                  break;
                }
                application = appsThisTime[i];
                if (application.getType() != "browser" && !compileEnv["qx.headless"]) {
                  qx.tool.compiler.Console.print("qx.tool.compiler.maker.appNotHeadless", application.getName());
                }
                appEnv = qx.tool.utils.Values.merge({}, compileEnv, appEnvironments[application.toHashCode()]);
                application.calcDependencies();
                if (!application.getFatalCompileErrors()) {
                  _context2.n = 23;
                  break;
                }
                qx.tool.compiler.Console.print("qx.tool.compiler.maker.appFatalError", application.getName());
                success = false;
                return _context2.a(3, 26);
              case 23:
                if (!hasWarnings) {
                  application.getDependencies().forEach(function (classname) {
                    if (!db.classInfo[classname] || !db.classInfo[classname].markers) {
                      return;
                    }
                    db.classInfo[classname].markers.forEach(function (marker) {
                      var type = qx.tool.compiler.Console.getInstance().getMessageType(marker.msgId);
                      if (type == "warning") {
                        hasWarnings = true;
                      }
                    });
                  });
                }
                appInfo = {
                  application: application,
                  analyser: analyser,
                  maker: _this
                };
                allAppInfos.push(appInfo);
                _context2.n = 24;
                return _this.fireDataEventAsync("writingApplication", appInfo);
              case 24:
                _context2.n = 25;
                return target.generateApplication(application, appEnv);
              case 25:
                _context2.n = 26;
                return _this.fireDataEventAsync("writtenApplication", appInfo);
              case 26:
                i++;
                _context2.n = 22;
                break;
              case 27:
                _context2.n = 28;
                return _this.fireDataEventAsync("writtenApplications", allAppInfos);
              case 28:
                _context2.n = 29;
                return analyser.saveDatabase();
              case 29:
                _context2.n = 30;
                return _this.fireEventAsync("made");
              case 30:
                _this.setSuccess(success);
                _this.setHasWarnings(hasWarnings);
              case 31:
                return _context2.a(2);
            }
          }, _callee2, null, [[9, 15, 16, 17]]);
        }))();
      }
    }
  });
  qx.tool.compiler.makers.AppMaker.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AppMaker.js.map?dt=1782705794251