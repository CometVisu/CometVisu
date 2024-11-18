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
      "qx.tool.migration.BaseMigration": {
        "require": true
      },
      "qx.tool.config.Registry": {},
      "qx.tool.cli.commands.Package": {},
      "qx.tool.cli.ConfigDb": {},
      "qx.tool.config.Utils": {},
      "qx.lang.Type": {},
      "qx.tool.compiler.Console": {},
      "qx.tool.config.Compile": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2021 The authors
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (info@bibliograph.org, @cboulanger)
  
  **********************************************************************/

  var process = require("process");
  var path = require("upath");
  var semver = require("semver");
  var fs = qx.tool.utils.Promisify.fs;

  /**
   * Migration class for updating from v5 to v6
   */
  qx.Class.define("qx.tool.migration.M6_0_0", {
    extend: qx.tool.migration.BaseMigration,
    members: {
      /**
       * Check for legacy compile.js - needs manual intervention
       */
      migrateCompileJs: function migrateCompileJs() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var compileJsFilename, data;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                compileJsFilename = path.join(process.cwd(), "compile.js");
                _context.next = 3;
                return fs.existsAsync(compileJsFilename);
              case 3:
                if (!_context.sent) {
                  _context.next = 8;
                  break;
                }
                _context.next = 6;
                return fs.readFileAsync(compileJsFilename, "utf8");
              case 6:
                data = _context.sent;
                if (data.indexOf("module.exports") < 0) {
                  _this.announce("Your compile.js appears to be missing a module.exports statement and must be manually updated - please see https://git.io/fjBqU for more details");
                  _this.markAsPending();
                }
              case 8:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      migrateQooxdooJs: function migrateQooxdooJs() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var compileJsFilename, model;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                compileJsFilename = path.join(process.cwd(), "qooxdoo.json");
                _context2.next = 3;
                return fs.existsAsync(compileJsFilename);
              case 3:
                if (!_context2.sent) {
                  _context2.next = 8;
                  break;
                }
                _context2.next = 6;
                return qx.tool.config.Registry.getInstance().set({
                  warnOnly: true,
                  validate: false
                }).load();
              case 6:
                model = _context2.sent;
                if (model.getValue("$schema") !== model.getSchemaUri()) {
                  if (_this2.getRunner().getDryRun()) {
                    _this2.markAsPending("Add schema to qooxdoo.json");
                  } else {
                    model.setValue("$schema", model.getSchemaUri());
                    model.save();
                    _this2.markAsApplied();
                  }
                }
              case 8:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      migrateConfigFiles: function migrateConfigFiles() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var dryRun, pkg, cwd, migrateFiles;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                dryRun = _this3.getRunner().getDryRun();
                pkg = qx.tool.cli.commands.Package;
                cwd = process.cwd(); // rename configuration files from initial names
                // replace those static variables with verbatims
                migrateFiles = [[path.join(cwd, pkg.lockfile.filename), path.join(cwd, "contrib.json")], [path.join(cwd, pkg.cache_dir), path.join(cwd, "contrib")], [path.join(qx.tool.cli.ConfigDb.getDirectory(), pkg.package_cache_name), path.join(qx.tool.cli.ConfigDb.getDirectory(), "contrib-cache.json")]]; // change names in .gitignore
                _context3.next = 6;
                return _this3.checkFilesToRename(migrateFiles);
              case 6:
                if (!_context3.sent.length) {
                  _context3.next = 17;
                  break;
                }
                _context3.next = 9;
                return _this3.renameFilesUnlessDryRun(migrateFiles);
              case 9:
                if (!dryRun) {
                  _context3.next = 14;
                  break;
                }
                _this3.announce(".gitignore needs to be updated.");
                _this3.markAsPending(3);
                _context3.next = 17;
                break;
              case 14:
                _context3.next = 16;
                return _this3.replaceInFilesUnlessDryRun([{
                  files: path.join(cwd, ".gitignore"),
                  from: "contrib/",
                  to: "qx_packages/"
                }, {
                  files: path.join(cwd, ".gitignore"),
                  from: "contrib.json",
                  to: "qx-lock.json"
                }]);
              case 16:
                _this3.markAsApplied();
              case 17:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }))();
      },
      migrateManifest: function migrateManifest() {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          var dryRun, verbose, updateManifest, _iterator, _step, _loop;
          return _regeneratorRuntime().wrap(function _callee4$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                dryRun = _this4.getRunner().getDryRun();
                verbose = _this4.getRunner().getVerbose(); // Update all Manifests
                updateManifest = false;
                _context5.t0 = _createForOfIteratorHelper;
                _context5.next = 6;
                return qx.tool.config.Utils.getManifestModels();
              case 6:
                _context5.t1 = _context5.sent;
                _iterator = (0, _context5.t0)(_context5.t1);
                _context5.prev = 8;
                _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                  var manifestModel, obj;
                  return _regeneratorRuntime().wrap(function _loop$(_context4) {
                    while (1) switch (_context4.prev = _context4.next) {
                      case 0:
                        manifestModel = _step.value;
                        _context4.next = 3;
                        return manifestModel.set({
                          warnOnly: true,
                          validate: false
                        }).load();
                      case 3:
                        if (!qx.lang.Type.isArray(manifestModel.getValue("info.authors"))) {
                          updateManifest = true;
                        }
                        if (!semver.valid(manifestModel.getValue("info.version"))) {
                          updateManifest = true;
                        }
                        obj = {
                          "info.qooxdoo-versions": null,
                          "info.qooxdoo-range": null,
                          "provides.type": null,
                          "requires.qxcompiler": null,
                          "requires.qooxdoo-sdk": null,
                          "requires.qooxdoo-compiler": null
                        };
                        if (manifestModel.keyExists(obj)) {
                          updateManifest = true;
                        }
                        if (!updateManifest) {
                          _context4.next = 20;
                          break;
                        }
                        if (!dryRun) {
                          _context4.next = 12;
                          break;
                        }
                        _this4.markAsPending(2);
                        _context4.next = 20;
                        break;
                      case 12:
                        manifestModel.transform("info.authors", function (authors) {
                          if (authors === "") {
                            return [];
                          } else if (qx.lang.Type.isString(authors)) {
                            return [{
                              name: authors
                            }];
                          } else if (qx.lang.Type.isObject(authors)) {
                            return [{
                              name: authors.name,
                              email: authors.email
                            }];
                          } else if (qx.lang.Type.isArray(authors)) {
                            return authors.map(function (r) {
                              return qx.lang.Type.isObject(r) ? {
                                name: r.name,
                                email: r.email
                              } : {
                                name: r
                              };
                            });
                          }
                          return [];
                        }).transform("info.version", function (version) {
                          var coerced = semver.coerce(version);
                          if (coerced === null) {
                            qx.tool.compiler.Console.warn("Version string '".concat(version, "' in ").concat(manifestModel.getDataPath(), " is not a valid semver version, will be set to 1.0.0"));
                            return "1.0.0";
                          }
                          return String(coerced);
                        }).unset("info.qooxdoo-versions").unset("info.qooxdoo-range").unset("provides.type").unset("requires.qxcompiler").unset("requires.qooxdoo-compiler").unset("requires.qooxdoo-sdk");
                        verbose && qx.tool.compiler.Console.info("Updated settings in ".concat(manifestModel.getRelativeDataPath(), "."));
                        _context4.next = 16;
                        return manifestModel.save();
                      case 16:
                        _this4.markAsApplied();
                        _context4.next = 19;
                        return _this4.updateDependencyUnlessDryRun(manifestModel, "@qooxdoo/compiler", "^1.0.0");
                      case 19:
                        verbose && qx.tool.compiler.Console.info("Updated dependencies in ".concat(manifestModel.getRelativeDataPath(), "."));
                      case 20:
                        _context4.next = 22;
                        return _this4.updateSchemaUnlessDryRun(manifestModel, "https://qooxdoo.org/schema/Manifest-1-0-0.json");
                      case 22:
                        _context4.next = 24;
                        return _this4.updateQxDependencyUnlessDryRun(manifestModel);
                      case 24:
                        if (_this4.getRunner().getDryRun()) {
                          _context4.next = 28;
                          break;
                        }
                        manifestModel.setValidate(false); // shouldn't be necessary
                        _context4.next = 28;
                        return manifestModel.save();
                      case 28:
                      case "end":
                        return _context4.stop();
                    }
                  }, _loop);
                });
                _iterator.s();
              case 11:
                if ((_step = _iterator.n()).done) {
                  _context5.next = 15;
                  break;
                }
                return _context5.delegateYield(_loop(), "t2", 13);
              case 13:
                _context5.next = 11;
                break;
              case 15:
                _context5.next = 20;
                break;
              case 17:
                _context5.prev = 17;
                _context5.t3 = _context5["catch"](8);
                _iterator.e(_context5.t3);
              case 20:
                _context5.prev = 20;
                _iterator.f();
                return _context5.finish(20);
              case 23:
              case "end":
                return _context5.stop();
            }
          }, _callee4, null, [[8, 17, 20, 23]]);
        }))();
      },
      migrateCompileJson: function migrateCompileJson() {
        var _this5 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
          var compileJsonModel, eslintExtends, newEsLintExtends;
          return _regeneratorRuntime().wrap(function _callee5$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                compileJsonModel = qx.tool.config.Compile.getInstance().set({
                  warnOnly: true,
                  validate: false
                });
                _context6.next = 3;
                return compileJsonModel.load();
              case 3:
                eslintExtends = compileJsonModel.getValue("eslintConfig.extends");
                newEsLintExtends = ["@qooxdoo/qx/browser", "@qooxdoo/qx", "@qooxdoo/jsdoc-disable"];
                if (eslintExtends !== newEsLintExtends) {
                  if (_this5.getRunner().getDryRun()) {
                    _this5.announce("eslintConfig.extends will be updated.");
                    _this5.markAsPending();
                  } else {
                    compileJsonModel.setValue("eslintConfig.extends", newEsLintExtends);
                    _this5.markAsApplied();
                  }
                }
                _context6.next = 8;
                return _this5.updateSchemaUnlessDryRun(compileJsonModel, "https://qooxdoo.org/schema/compile-1-0-0.json");
              case 8:
                if (_this5.getRunner().getDryRun()) {
                  _context6.next = 14;
                  break;
                }
                _context6.next = 11;
                return compileJsonModel.save();
              case 11:
                compileJsonModel.set({
                  validate: true
                });
                _context6.next = 14;
                return compileJsonModel.load();
              case 14:
              case "end":
                return _context6.stop();
            }
          }, _callee5);
        }))();
      }
    }
  });
  qx.tool.migration.M6_0_0.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=M6_0_0.js.map?dt=1731948131863