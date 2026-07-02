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
      "qx.tool.config.Registry": {},
      "qx.tool.utils.Json": {},
      "qx.lang.Type": {},
      "qx.tool.config.Manifest": {},
      "qx.tool.config.Compile": {},
      "qx.tool.utils.Utils": {},
      "qx.log.Logger": {},
      "qx.tool.config.Abstract": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2017-2021 The authors
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (john.spackman@zenesis.com, @johnspackman)
       * Christian Boulanger (info@bibliograph.org, @cboulanger)
  
  ************************************************************************ */

  var fs = qx.tool.utils.Promisify.fs;
  var process = require("process");
  var path = require("upath");
  var semver = require("semver");

  /**
   * NOTE: some of the names of the methods in this class do not express very clearly
   * what they do and might be renamed before 7.0.0
   */
  qx.Class.define("qx.tool.config.Utils", {
    type: "static",
    statics: {
      /** @type{Promise<String} promise for cache of getQxPath() */
      __P_522_0: null,
      /**
       * Returns data on the project in the currect working directory.
       * If a qooxdoo.json file exists, the data is taken from there.
       * If not, the relies on the following assumptions:
       *
       * 1. If a Manifest.json exists in the current working directory,
       * it is assumed to be the main library directory.
       *
       * 2. If a compile.json file exists in the current working directory,
       * it is assumed to be the directory in which the application can be found.
       *
       * The method returns a promise that resolves to a map containing the following keys:
       * 'libraries': an array of maps containing a 'path' property with a relative path to a library folder,
       * 'applications': an array of maps containing a 'path' property with a relative path to an
       * application folder.
       *
       * If no libraries or applications can be found, empty arrays are returned.
       *
       * @param {String?} dir The base directory. If not given, the current working dir is used
       * @return {Promise<Object>}
       */
      getProjectData: function getProjectData() {
        var _arguments = arguments;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var dir, qooxdooJsonPath, data, qooxdooJson;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                dir = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : null;
                dir = dir || process.cwd();
                qooxdooJsonPath = path.join(dir, qx.tool.config.Registry.config.fileName);
                data = {
                  libraries: [],
                  applications: []
                };
                _context.n = 1;
                return fs.existsAsync(qooxdooJsonPath);
              case 1:
                if (!_context.v) {
                  _context.n = 3;
                  break;
                }
                _context.n = 2;
                return qx.tool.utils.Json.loadJsonAsync(qooxdooJsonPath);
              case 2:
                qooxdooJson = _context.v;
                if (qx.lang.Type.isArray(qooxdooJson.libraries)) {
                  data.libraries = qooxdooJson.libraries;
                }
                if (qx.lang.Type.isArray(qooxdooJson.applications)) {
                  data.applications = qooxdooJson.applications;
                }
              case 3:
                _context.n = 4;
                return fs.existsAsync(path.join(dir, qx.tool.config.Manifest.config.fileName));
              case 4:
                if (!_context.v) {
                  _context.n = 5;
                  break;
                }
                if (!data.libraries.find(function (lib) {
                  return lib.path === ".";
                })) {
                  data.libraries.push({
                    path: "."
                  });
                }
              case 5:
                _context.n = 6;
                return fs.existsAsync(path.join(dir, qx.tool.config.Compile.config.fileName));
              case 6:
                if (!_context.v) {
                  _context.n = 7;
                  break;
                }
                if (!data.applications.find(function (app) {
                  return app.path === ".";
                })) {
                  data.applications.push({
                    path: "."
                  });
                }
              case 7:
                return _context.a(2, data);
            }
          }, _callee);
        }))();
      },
      /**
       * Returns the path to the library in the current working directory. If that
       * directory contains several libraries, the first one found is returned.
       *
       * @param {String?} dir The base directory. If not given, the current working dir is used
       * @throws {Error} Throws an error if no library can be found.
       * @return {String} A promise that resolves with the absolute path to the library
       */
      getLibraryPath: function getLibraryPath() {
        var _arguments2 = arguments,
          _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var dir, _yield$_this$getProje, libraries;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                dir = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : null;
                dir = dir || process.cwd();
                _context2.n = 1;
                return _this.getProjectData(dir);
              case 1:
                _yield$_this$getProje = _context2.v;
                libraries = _yield$_this$getProje.libraries;
                if (!(libraries instanceof Array && libraries.length)) {
                  _context2.n = 2;
                  break;
                }
                return _context2.a(2, path.resolve(process.cwd(), libraries[0].path));
              case 2:
                throw new qx.tool.utils.Utils.UserError("Cannot find library path - are you in the right directory?");
              case 3:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      /**
       * Returns the path to the current application, depending on
       * the current working directory. If a directory contains
       * several applications, the first one found is returned.
       *
       * @param {String?} dir The base directory. If not given, the current working dir is used
       * @throws {Error} Throws an error if no application can be found.
       * @return {Promise<String>} A promise that resolves with the absolute path to the application
       */
      getApplicationPath: function getApplicationPath() {
        var _arguments3 = arguments,
          _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var dir, _yield$_this2$getProj, applications;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                dir = _arguments3.length > 0 && _arguments3[0] !== undefined ? _arguments3[0] : null;
                dir = dir || process.cwd();
                _context3.n = 1;
                return _this2.getProjectData(dir);
              case 1:
                _yield$_this2$getProj = _context3.v;
                applications = _yield$_this2$getProj.applications;
                if (!(applications instanceof Array && applications.length)) {
                  _context3.n = 2;
                  break;
                }
                return _context3.a(2, path.resolve(process.cwd(), applications[0].path));
              case 2:
                throw new qx.tool.utils.Utils.UserError("Cannot find application path - are you in the right directory?");
              case 3:
                return _context3.a(2);
            }
          }, _callee3);
        }))();
      },
      /**
       * Compute the path to the qooxdoo library (the `qx` namespace)
       * which is used independently of the application being compiled.
       *
       * The path will be resolved via the following strategies:
       *
       * 1. finding a `Manifest.json` in the current working directory that provides
       * the `qx` library, or such a file in the parent directory, its parent dir,
       * etc., up to the root.
       *
       * 2. The qx library contained in the projects `node_modules` folder, if it exists,
       * or in the parent directory's, etc.
       *
       * 3. if not found try 1. and 2. with current script dir
       *
       * 4. A globally installed `@qooxdoo/framework` NPM package.
       *
       * If all strategies fail, an error is thrown.
       *
       * @param {String?} dir The base directory. If not given, the current working dir is used
       * @return {Promise<string>}
       */
      getQxPath: function getQxPath() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
          var scanAncestors, getQxPathImpl;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.n) {
              case 0:
                if (!_this3.__P_522_0) {
                  _context6.n = 2;
                  break;
                }
                _context6.n = 1;
                return _this3.__P_522_0;
              case 1:
                return _context6.a(2, _context6.v);
              case 2:
                scanAncestors = /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(dir) {
                    var root, npmdir;
                    return _regenerator().w(function (_context4) {
                      while (1) switch (_context4.n) {
                        case 0:
                          root = path.parse(dir).root;
                        case 1:
                          if (!(dir !== root)) {
                            _context4.n = 6;
                            break;
                          }
                          _context4.n = 2;
                          return _this3.isQxLibrary(dir);
                        case 2:
                          if (!_context4.v) {
                            _context4.n = 3;
                            break;
                          }
                          return _context4.a(2, dir);
                        case 3:
                          // 2. node_modules folders
                          npmdir = path.join(dir, "node_modules", "@qooxdoo", "framework");
                          _context4.n = 4;
                          return _this3.isQxLibrary(npmdir);
                        case 4:
                          if (!_context4.v) {
                            _context4.n = 5;
                            break;
                          }
                          return _context4.a(2, npmdir);
                        case 5:
                          // walk up the directory tree
                          dir = path.resolve(path.join(dir, ".."));
                          _context4.n = 1;
                          break;
                        case 6:
                          return _context4.a(2, null);
                      }
                    }, _callee4);
                  }));
                  return function scanAncestors(_x) {
                    return _ref.apply(this, arguments);
                  };
                }();
                getQxPathImpl = /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
                    var res, npmdir;
                    return _regenerator().w(function (_context5) {
                      while (1) switch (_context5.n) {
                        case 0:
                          _context5.n = 1;
                          return scanAncestors(path.parse(require.main.filename).dir);
                        case 1:
                          res = _context5.v;
                          if (!res) {
                            _context5.n = 2;
                            break;
                          }
                          return _context5.a(2, res);
                        case 2:
                          _context5.n = 3;
                          return scanAncestors(path.resolve(process.cwd()));
                        case 3:
                          res = _context5.v;
                          if (!res) {
                            _context5.n = 4;
                            break;
                          }
                          return _context5.a(2, res);
                        case 4:
                          _context5.n = 5;
                          return scanAncestors(__dirname);
                        case 5:
                          res = _context5.v;
                          if (!res) {
                            _context5.n = 6;
                            break;
                          }
                          return _context5.a(2, res);
                        case 6:
                          _context5.n = 7;
                          return qx.tool.utils.Utils.exec("npm root -g");
                        case 7:
                          npmdir = _context5.v.trim();
                          res = path.join(npmdir, "@qooxdoo", "framework");
                          _context5.n = 8;
                          return _this3.isQxLibrary(res);
                        case 8:
                          if (!_context5.v) {
                            _context5.n = 9;
                            break;
                          }
                          return _context5.a(2, res);
                        case 9:
                          throw new qx.tool.utils.Utils.UserError("Path to the qx library cannot be determined.");
                        case 10:
                          return _context5.a(2);
                      }
                    }, _callee5);
                  }));
                  return function getQxPathImpl() {
                    return _ref2.apply(this, arguments);
                  };
                }();
                _this3.__P_522_0 = getQxPathImpl();
                _context6.n = 3;
                return _this3.__P_522_0;
              case 3:
                return _context6.a(2, _context6.v);
            }
          }, _callee6);
        }))();
      },
      /**
       * Returns true if a compilable application exists in the given directory by checking
       * if there is a "compile.json" file.
       *
       * @param {String?} dir The base directory. If not given, the current working dir is used
       * @return {Promise<Boolean>}
       */
      applicationExists: function applicationExists(dir) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.n) {
              case 0:
                _context7.n = 1;
                return fs.existsAsync(path.join(dir, qx.tool.config.Compile.config.fileName));
              case 1:
                return _context7.a(2, _context7.v);
            }
          }, _callee7);
        }))();
      },
      /**
       * Returns the qooxdoo version from the current environment (not the application)
       * @param {String?} dir The base directory. If not given, the current working dir is used
       * @return {Promise<String>}
       */
      getQxVersion: function getQxVersion() {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
          var qxpath;
          return _regenerator().w(function (_context8) {
            while (1) switch (_context8.n) {
              case 0:
                _context8.n = 1;
                return _this4.getQxPath();
              case 1:
                qxpath = _context8.v;
                return _context8.a(2, qx.tool.config.Utils.getLibraryVersion(qxpath));
            }
          }, _callee8);
        }))();
      },
      /**
       * returns the compiler version.
       * The version is written during compiler compile into the enviroment
       * @return {String}
       */
      getCompilerVersion: function getCompilerVersion() {
        return "7.3.3";
      },
      /**
       * Returns the qooxdoo version used in the application in the current or given
       * directory. Throws if no such version can be determined
       *
       * @param {String?} baseDir The base directory. If not given, the current working dir is used
       * @return {Promise<String>}
       */
      getAppQxVersion: function getAppQxVersion() {
        var _arguments4 = arguments;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
          var baseDir, manifestRequiresKey, manifestModel, qxVersion, qxVersionRange;
          return _regenerator().w(function (_context9) {
            while (1) switch (_context9.n) {
              case 0:
                baseDir = _arguments4.length > 0 && _arguments4[0] !== undefined ? _arguments4[0] : null;
                baseDir = baseDir || process.cwd();
                manifestRequiresKey = "@qooxdoo/framework";
                _context9.n = 1;
                return qx.tool.config.Manifest.getInstance().set({
                  baseDir: baseDir,
                  warnOnly: true,
                  validate: false
                }).load();
              case 1:
                manifestModel = _context9.v;
                qxVersionRange = manifestModel.getValue("requires.".concat(manifestRequiresKey));
                qx.log.Logger.debug("Manifest in ".concat(baseDir, " requires ").concat(manifestRequiresKey, ": ").concat(qxVersionRange));
                if (qxVersionRange && !qxVersionRange.match(/[<>]/)) {
                  // cannot do comparisons
                  try {
                    // get the highest version mentioned with a tilde or caret range
                    qxVersion = qxVersionRange.match(/[\^~]?([-0-9a-z._]+)/g).sort().reverse()[0].slice(1);
                  } catch (e) {}
                }
                if (!(!qxVersion || !semver.valid(qxVersion))) {
                  _context9.n = 2;
                  break;
                }
                throw new Error("Cannot determine the qooxdoo version used to compile the application. " + "Please specify a caret or tilde range for the requires.".concat(manifestRequiresKey, " key in the Manifest\")"));
              case 2:
                return _context9.a(2, qxVersion);
            }
          }, _callee9);
        }))();
      },
      /**
       * Returns true if the library in the given path provides the "qx" library
       * @param {String} libraryPath
       * @return {Promise<boolean>}
       */
      isQxLibrary: function isQxLibrary(libraryPath) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
          var manifestPath, manifest, _t;
          return _regenerator().w(function (_context0) {
            while (1) switch (_context0.p = _context0.n) {
              case 0:
                manifestPath = path.join(libraryPath, qx.tool.config.Manifest.config.fileName);
                _context0.n = 1;
                return fs.existsAsync(manifestPath);
              case 1:
                if (_context0.v) {
                  _context0.n = 2;
                  break;
                }
                return _context0.a(2, false);
              case 2:
                _context0.p = 2;
                _context0.n = 3;
                return qx.tool.utils.Json.loadJsonAsync(manifestPath);
              case 3:
                manifest = _context0.v;
                if (!(manifest.provides && manifest.provides.namespace === "qx")) {
                  _context0.n = 4;
                  break;
                }
                return _context0.a(2, true);
              case 4:
                _context0.n = 6;
                break;
              case 5:
                _context0.p = 5;
                _t = _context0.v;
                throw new qx.tool.utils.Utils.UserError("Invalid manifest file ".concat(manifestPath, "."));
              case 6:
                return _context0.a(2, false);
            }
          }, _callee0, null, [[2, 5]]);
        }))();
      },
      /**
       * Returns an array of {@link qx.tool.config.Abstract} Objects which contain
       * metadata on the `Manifest.json` file(s) in the current project/package.
       * @param {String?} cwd The working directory. If not given, the current working dir is used
       * @return {Promise<qx.tool.config.Manifest[]>}
       */
      getManifestModels: function getManifestModels() {
        var _arguments5 = arguments;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
          var cwd, registryModel, manifestModels, libraries, _iterator, _step, library;
          return _regenerator().w(function (_context1) {
            while (1) switch (_context1.n) {
              case 0:
                cwd = _arguments5.length > 0 && _arguments5[0] !== undefined ? _arguments5[0] : null;
                cwd = cwd || process.cwd();
                registryModel = qx.tool.config.Registry.getInstance();
                manifestModels = [];
                _context1.n = 1;
                return registryModel.exists();
              case 1:
                if (!_context1.v) {
                  _context1.n = 3;
                  break;
                }
                _context1.n = 2;
                return registryModel.load();
              case 2:
                libraries = registryModel.getLibraries();
                _iterator = _createForOfIteratorHelper(libraries);
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    library = _step.value;
                    manifestModels.push(new qx.tool.config.Abstract(qx.tool.config.Manifest.config).set({
                      baseDir: path.join(cwd, library.path)
                    }));
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
                _context1.n = 5;
                break;
              case 3:
                _context1.n = 4;
                return fs.existsAsync(qx.tool.config.Manifest.config.fileName);
              case 4:
                if (!_context1.v) {
                  _context1.n = 5;
                  break;
                }
                manifestModels.push(qx.tool.config.Manifest.getInstance());
              case 5:
                return _context1.a(2, manifestModels);
            }
          }, _callee1);
        }))();
      },
      /**
       * Given the path to a library folder, returns the library version from its manifest
       * @param {String} libPath
       * @return {Promise<String>} Version
       */
      getLibraryVersion: function getLibraryVersion(libPath) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
          var manifestPath, manifest, version, _t2;
          return _regenerator().w(function (_context10) {
            while (1) switch (_context10.p = _context10.n) {
              case 0:
                manifestPath = path.join(libPath, qx.tool.config.Manifest.config.fileName);
                _context10.n = 1;
                return qx.tool.utils.Json.loadJsonAsync(manifestPath);
              case 1:
                manifest = _context10.v;
                if (manifest) {
                  _context10.n = 2;
                  break;
                }
                throw new Error("No Manifest exists at ".concat(manifestPath, "."));
              case 2:
                _context10.p = 2;
                version = manifest.info.version;
                _context10.n = 4;
                break;
              case 3:
                _context10.p = 3;
                _t2 = _context10.v;
                throw new Error("No valid version data in ".concat(manifestPath, "."));
              case 4:
                if (semver.valid(version)) {
                  _context10.n = 5;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Manifest at ".concat(manifestPath, " contains invalid version number \"").concat(version, "\". Please use a semver compatible version."));
              case 5:
                return _context10.a(2, version);
            }
          }, _callee10, null, [[2, 3]]);
        }))();
      }
    }
  });
  qx.tool.config.Utils.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Utils.js.map?dt=1782967164505