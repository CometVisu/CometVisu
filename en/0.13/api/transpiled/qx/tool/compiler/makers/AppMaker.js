function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
      this.__P_491_0 = [];
      if (className) {
        var app = new qx.tool.compiler.app.Application(className);
        if (theme) {
          app.setTheme(theme);
        }
        this.addApplication(app);
      }
    },
    members: {
      __P_491_0: null,
      /**
       * Adds an Application to be made
       * @param app
       */
      addApplication: function addApplication(app) {
        this.__P_491_0.push(app);
      },
      /**
       * Returns the array of applications
       * @returns {qx.tool.compiler.app.Application[]}
       */
      getApplications: function getApplications() {
        return this.__P_491_0;
      },
      /*
       * @Override
       */
      make: function make() {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var analyser, target, success, hasWarnings, compileEnv, preserve, tmp, appEnvironments, allAppEnv, _iterator, _step, library, fontsData, fontName, fontData, font, compiledClasses, db, appsThisTime, allAppInfos, i, application, appEnv, appInfo;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                analyser = _this.getAnalyser();
                target = _this.getTarget();
                _context2.next = 4;
                return _this.fireEventAsync("making");
              case 4:
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
                _context2.next = 19;
                return analyser.open();
              case 19:
                analyser.setEnvironment(compileEnv);
                if (!(!_this.isNoErase() && analyser.isContextChanged())) {
                  _context2.next = 28;
                  break;
                }
                log.log("enviroment changed - delete output dir");
                _context2.next = 24;
                return _this.eraseOutputDir();
              case 24:
                _context2.next = 26;
                return qx.tool.utils.Utils.makeParentDir(_this.getOutputDir());
              case 26:
                _context2.next = 28;
                return analyser.resetDatabase();
              case 28:
                _context2.next = 30;
                return qx.tool.utils.Utils.promisifyThis(analyser.initialScan, analyser);
              case 30:
                _context2.next = 32;
                return analyser.updateEnvironmentData();
              case 32:
                target.setAnalyser(analyser);
                _this.__P_491_0.forEach(function (app) {
                  return app.setAnalyser(analyser);
                });
                _context2.next = 36;
                return target.open();
              case 36:
                _iterator = _createForOfIteratorHelper(analyser.getLibraries());
                _context2.prev = 37;
                _iterator.s();
              case 39:
                if ((_step = _iterator.n()).done) {
                  _context2.next = 55;
                  break;
                }
                library = _step.value;
                fontsData = library.getFontsData();
                _context2.t0 = _regeneratorRuntime().keys(fontsData);
              case 43:
                if ((_context2.t1 = _context2.t0()).done) {
                  _context2.next = 53;
                  break;
                }
                fontName = _context2.t1.value;
                fontData = fontsData[fontName];
                font = analyser.getFont(fontName);
                if (font) {
                  _context2.next = 51;
                  break;
                }
                font = analyser.getFont(fontName, true);
                _context2.next = 51;
                return font.updateFromManifest(fontData, library);
              case 51:
                _context2.next = 43;
                break;
              case 53:
                _context2.next = 39;
                break;
              case 55:
                _context2.next = 60;
                break;
              case 57:
                _context2.prev = 57;
                _context2.t2 = _context2["catch"](37);
                _iterator.e(_context2.t2);
              case 60:
                _context2.prev = 60;
                _iterator.f();
                return _context2.finish(60);
              case 63:
                _this.__P_491_0.forEach(function (app) {
                  app.getRequiredClasses().forEach(function (className) {
                    analyser.addClass(className);
                  });
                  if (app.getTheme()) {
                    analyser.addClass(app.getTheme());
                  }
                });
                _context2.next = 66;
                return analyser.analyseClasses();
              case 66:
                _context2.next = 68;
                return analyser.saveDatabase();
              case 68:
                _context2.next = 70;
                return _this.fireEventAsync("writingApplications");
              case 70:
                // Detect which applications need to be recompiled by looking for classes recently compiled
                //  which is on the application's dependency list.  The first time `.make()` is called there
                //  will be no dependencies so we just compile anyway, but `qx compile --watch` will call it
                //  multiple times
                compiledClasses = _this.getRecentlyCompiledClasses(true);
                db = analyser.getDatabase();
                _context2.next = 74;
                return _this.__P_491_0.filter( /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(app) {
                    var loadDeps, res, localModules, requireName, _db$modulesInfo, stat;
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) switch (_context.prev = _context.next) {
                        case 0:
                          loadDeps = app.getDependencies();
                          if (!(!loadDeps || !loadDeps.length)) {
                            _context.next = 3;
                            break;
                          }
                          return _context.abrupt("return", true);
                        case 3:
                          res = loadDeps.some(function (name) {
                            return Boolean(compiledClasses[name]);
                          });
                          localModules = app.getLocalModules();
                          _context.t0 = _regeneratorRuntime().keys(localModules);
                        case 6:
                          if ((_context.t1 = _context.t0()).done) {
                            _context.next = 14;
                            break;
                          }
                          requireName = _context.t1.value;
                          _context.next = 10;
                          return qx.tool.utils.files.Utils.safeStat(localModules[requireName]);
                        case 10:
                          stat = _context.sent;
                          res || (res = stat.mtime.getTime() > ((db === null || db === void 0 || (_db$modulesInfo = db.modulesInfo) === null || _db$modulesInfo === void 0 ? void 0 : _db$modulesInfo.localModules[requireName]) || 0));
                          _context.next = 6;
                          break;
                        case 14:
                          return _context.abrupt("return", res);
                        case 15:
                        case "end":
                          return _context.stop();
                      }
                    }, _callee);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());
              case 74:
                appsThisTime = _context2.sent;
                allAppInfos = [];
                i = 0;
              case 77:
                if (!(i < appsThisTime.length)) {
                  _context2.next = 98;
                  break;
                }
                application = appsThisTime[i];
                if (application.getType() != "browser" && !compileEnv["qx.headless"]) {
                  qx.tool.compiler.Console.print("qx.tool.compiler.maker.appNotHeadless", application.getName());
                }
                appEnv = qx.tool.utils.Values.merge({}, compileEnv, appEnvironments[application.toHashCode()]);
                application.calcDependencies();
                if (!application.getFatalCompileErrors()) {
                  _context2.next = 86;
                  break;
                }
                qx.tool.compiler.Console.print("qx.tool.compiler.maker.appFatalError", application.getName());
                success = false;
                return _context2.abrupt("continue", 95);
              case 86:
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
                _context2.next = 91;
                return _this.fireDataEventAsync("writingApplication", appInfo);
              case 91:
                _context2.next = 93;
                return target.generateApplication(application, appEnv);
              case 93:
                _context2.next = 95;
                return _this.fireDataEventAsync("writtenApplication", appInfo);
              case 95:
                i++;
                _context2.next = 77;
                break;
              case 98:
                _context2.next = 100;
                return _this.fireDataEventAsync("writtenApplications", allAppInfos);
              case 100:
                _context2.next = 102;
                return analyser.saveDatabase();
              case 102:
                _context2.next = 104;
                return _this.fireEventAsync("made");
              case 104:
                _this.setSuccess(success);
                _this.setHasWarnings(hasWarnings);
              case 106:
              case "end":
                return _context2.stop();
            }
          }, _callee2, null, [[37, 57, 60, 63]]);
        }))();
      }
    }
  });
  qx.tool.compiler.makers.AppMaker.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AppMaker.js.map?dt=1722151846278