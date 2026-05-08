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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var compileJsFilename, data;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                compileJsFilename = path.join(process.cwd(), "compile.js");
                _context.n = 1;
                return fs.existsAsync(compileJsFilename);
              case 1:
                if (!_context.v) {
                  _context.n = 3;
                  break;
                }
                _context.n = 2;
                return fs.readFileAsync(compileJsFilename, "utf8");
              case 2:
                data = _context.v;
                if (data.indexOf("module.exports") < 0) {
                  _this.announce("Your compile.js appears to be missing a module.exports statement and must be manually updated - please see https://git.io/fjBqU for more details");
                  _this.markAsPending();
                }
              case 3:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      migrateQooxdooJs: function migrateQooxdooJs() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var compileJsFilename, model;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                compileJsFilename = path.join(process.cwd(), "qooxdoo.json");
                _context2.n = 1;
                return fs.existsAsync(compileJsFilename);
              case 1:
                if (!_context2.v) {
                  _context2.n = 3;
                  break;
                }
                _context2.n = 2;
                return qx.tool.config.Registry.getInstance().set({
                  warnOnly: true,
                  validate: false
                }).load();
              case 2:
                model = _context2.v;
                if (model.getValue("$schema") !== model.getSchemaUri()) {
                  if (_this2.getRunner().getDryRun()) {
                    _this2.markAsPending("Add schema to qooxdoo.json");
                  } else {
                    model.setValue("$schema", model.getSchemaUri());
                    model.save();
                    _this2.markAsApplied();
                  }
                }
              case 3:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      migrateConfigFiles: function migrateConfigFiles() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var dryRun, pkg, cwd, migrateFiles;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                dryRun = _this3.getRunner().getDryRun();
                pkg = qx.tool.cli.commands.Package;
                cwd = process.cwd(); // rename configuration files from initial names
                // replace those static variables with verbatims
                migrateFiles = [[path.join(cwd, pkg.lockfile.filename), path.join(cwd, "contrib.json")], [path.join(cwd, pkg.cache_dir), path.join(cwd, "contrib")], [path.join(qx.tool.cli.ConfigDb.getDirectory(), pkg.package_cache_name), path.join(qx.tool.cli.ConfigDb.getDirectory(), "contrib-cache.json")]]; // change names in .gitignore
                _context3.n = 1;
                return _this3.checkFilesToRename(migrateFiles);
              case 1:
                if (!_context3.v.length) {
                  _context3.n = 5;
                  break;
                }
                _context3.n = 2;
                return _this3.renameFilesUnlessDryRun(migrateFiles);
              case 2:
                if (!dryRun) {
                  _context3.n = 3;
                  break;
                }
                _this3.announce(".gitignore needs to be updated.");
                _this3.markAsPending(3);
                _context3.n = 5;
                break;
              case 3:
                _context3.n = 4;
                return _this3.replaceInFilesUnlessDryRun([{
                  files: path.join(cwd, ".gitignore"),
                  from: "contrib/",
                  to: "qx_packages/"
                }, {
                  files: path.join(cwd, ".gitignore"),
                  from: "contrib.json",
                  to: "qx-lock.json"
                }]);
              case 4:
                _this3.markAsApplied();
              case 5:
                return _context3.a(2);
            }
          }, _callee3);
        }))();
      },
      migrateManifest: function migrateManifest() {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var dryRun, verbose, updateManifest, _iterator, _step, _loop, _t, _t2;
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.p = _context5.n) {
              case 0:
                dryRun = _this4.getRunner().getDryRun();
                verbose = _this4.getRunner().getVerbose(); // Update all Manifests
                updateManifest = false;
                _t = _createForOfIteratorHelper;
                _context5.n = 1;
                return qx.tool.config.Utils.getManifestModels();
              case 1:
                _iterator = _t(_context5.v);
                _context5.p = 2;
                _loop = /*#__PURE__*/_regenerator().m(function _loop() {
                  var manifestModel, obj;
                  return _regenerator().w(function (_context4) {
                    while (1) switch (_context4.n) {
                      case 0:
                        manifestModel = _step.value;
                        _context4.n = 1;
                        return manifestModel.set({
                          warnOnly: true,
                          validate: false
                        }).load();
                      case 1:
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
                          _context4.n = 5;
                          break;
                        }
                        if (!dryRun) {
                          _context4.n = 2;
                          break;
                        }
                        _this4.markAsPending(2);
                        _context4.n = 5;
                        break;
                      case 2:
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
                        _context4.n = 3;
                        return manifestModel.save();
                      case 3:
                        _this4.markAsApplied();
                        _context4.n = 4;
                        return _this4.updateDependencyUnlessDryRun(manifestModel, "@qooxdoo/compiler", "^1.0.0");
                      case 4:
                        verbose && qx.tool.compiler.Console.info("Updated dependencies in ".concat(manifestModel.getRelativeDataPath(), "."));
                      case 5:
                        _context4.n = 6;
                        return _this4.updateSchemaUnlessDryRun(manifestModel, "https://qooxdoo.org/schema/Manifest-1-0-0.json");
                      case 6:
                        _context4.n = 7;
                        return _this4.updateQxDependencyUnlessDryRun(manifestModel);
                      case 7:
                        if (_this4.getRunner().getDryRun()) {
                          _context4.n = 8;
                          break;
                        }
                        manifestModel.setValidate(false); // shouldn't be necessary
                        _context4.n = 8;
                        return manifestModel.save();
                      case 8:
                        return _context4.a(2);
                    }
                  }, _loop);
                });
                _iterator.s();
              case 3:
                if ((_step = _iterator.n()).done) {
                  _context5.n = 5;
                  break;
                }
                return _context5.d(_regeneratorValues(_loop()), 4);
              case 4:
                _context5.n = 3;
                break;
              case 5:
                _context5.n = 7;
                break;
              case 6:
                _context5.p = 6;
                _t2 = _context5.v;
                _iterator.e(_t2);
              case 7:
                _context5.p = 7;
                _iterator.f();
                return _context5.f(7);
              case 8:
                return _context5.a(2);
            }
          }, _callee4, null, [[2, 6, 7, 8]]);
        }))();
      },
      migrateCompileJson: function migrateCompileJson() {
        var _this5 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
          var compileJsonModel, eslintExtends, newEsLintExtends;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.n) {
              case 0:
                compileJsonModel = qx.tool.config.Compile.getInstance().set({
                  warnOnly: true,
                  validate: false
                });
                _context6.n = 1;
                return compileJsonModel.load();
              case 1:
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
                _context6.n = 2;
                return _this5.updateSchemaUnlessDryRun(compileJsonModel, "https://qooxdoo.org/schema/compile-1-0-0.json");
              case 2:
                if (_this5.getRunner().getDryRun()) {
                  _context6.n = 4;
                  break;
                }
                _context6.n = 3;
                return compileJsonModel.save();
              case 3:
                compileJsonModel.set({
                  validate: true
                });
                _context6.n = 4;
                return compileJsonModel.load();
              case 4:
                return _context6.a(2);
            }
          }, _callee5);
        }))();
      }
    }
  });
  qx.tool.migration.M6_0_0.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=M6_0_0.js.map?dt=1778272845209