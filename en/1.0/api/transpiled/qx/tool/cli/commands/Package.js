function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
      "qx.tool.cli.commands.Command": {
        "require": true
      },
      "qx.tool.cli.Cli": {},
      "qx.tool.config.Lockfile": {},
      "qx.tool.config.Manifest": {},
      "qx.tool.compiler.Console": {},
      "qx.tool.cli.ConfigDb": {},
      "qx.tool.utils.Utils": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2017 Christian Boulanger
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (info@bibliograph.org, @cboulanger)
  
  ************************************************************************ */
  var fs = qx.tool.utils.Promisify.fs;
  var path = require("upath");
  var process = require("process");
  var stringify = require("json-stable-stringify");

  /**
   * Handles library packages
   */
  qx.Class.define("qx.tool.cli.commands.Package", {
    extend: qx.tool.cli.commands.Command,
    statics: {
      /**
       * The name of the directory in which to download the package files
       */
      cache_dir: "qx_packages",
      /**
       * The name of the file that caches the package registry
       */
      package_cache_name: "package-cache.json",
      /**
       * The lockfile with library versions etc.
       */
      lockfile: {
        filename: "qx-lock.json"
      },
      /**
       * The URL of the cached repository data
       */
      repository_cache_url: "https://raw.githubusercontent.com/qooxdoo/package-cache/master/cache.json",
      /**
       * The yargs command data
       * @return {{}}
       */
      getYargsCommand: function getYargsCommand() {
        return {
          command: "package <command> [options]",
          desc: "manages qooxdoo packages",
          builder: function builder(yargs) {
            qx.tool.cli.Cli.addYargsCommands(yargs, ["Install", "List", "Publish", "Remove", "Update", "Upgrade", "Migrate"], "qx.tool.cli.commands.package");
            return yargs.showHelpOnFail().help();
          },
          handler: function handler() {
            // Nothing
          }
        };
      }
    },
    members: {
      /**
       * The current cache object
       */
      __P_479_0: null,
      /**
       * @override
       */
      checkMigrations: function checkMigrations() {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      /**
       * Returns the absolute path to the lockfile.
       * @return {String}
       */
      getLockfilePath: function getLockfilePath() {
        return path.join(process.cwd(), qx.tool.config.Lockfile.config.fileName);
      },
      /**
       * Deletes the lockfile
       * @return {Promise<void>}
       */
      deleteLockfile: function deleteLockfile() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _context2.n = 1;
                return fs.unlinkAsync(_this.getLockfilePath());
              case 1:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      /**
       * Returns the lockfile data. Deprecated. Use {@link qx.tool.cli.commands.Package#getLockfileModel}
       * @deprecated
       * @return {Object}
       */
      getLockfileData: function getLockfileData() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                _context3.n = 1;
                return _this2.getLockfileModel();
              case 1:
                return _context3.a(2, _context3.v.getData());
            }
          }, _callee3);
        }))();
      },
      /**
       * Returns the model of the lockfile
       * @return {Promise<qx.tool.config.Lockfile>}
       */
      getLockfileModel: function getLockfileModel() {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                return _context4.a(2, qx.tool.config.Lockfile.getInstance().load());
            }
          }, _callee4);
        }))();
      },
      /**
       * Returns the model of the manifest
       * @return {Promise<qx.tool.config.Manifest>}
       */
      getManifestModel: function getManifestModel() {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                return _context5.a(2, qx.tool.config.Manifest.getInstance().load());
            }
          }, _callee5);
        }))();
      },
      /**
       * Convenience method to return all config file models as an array
       * @return {Array} containing [{qx.tool.config.Manifest}, {qx.tool.config.Lockfile}, {qx.tool.config.Compile}]
       */
      _getConfigData: function _getConfigData() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
          var _t, _t2;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.n) {
              case 0:
                _context6.n = 1;
                return _this3.getManifestModel();
              case 1:
                _t = _context6.v;
                _context6.n = 2;
                return _this3.getLockfileModel();
              case 2:
                _t2 = _context6.v;
                return _context6.a(2, [_t, _t2]);
            }
          }, _callee6);
        }))();
      },
      /**
       * Save configuration data if their content has changed
       * @return {Promise<void>}
       * @private
       */
      _saveConfigData: function _saveConfigData() {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
          var _yield$_this4$_getCon, _yield$_this4$_getCon2, manifestModel, lockfileModel;
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.n) {
              case 0:
                _context7.n = 1;
                return _this4._getConfigData();
              case 1:
                _yield$_this4$_getCon = _context7.v;
                _yield$_this4$_getCon2 = _slicedToArray(_yield$_this4$_getCon, 2);
                manifestModel = _yield$_this4$_getCon2[0];
                lockfileModel = _yield$_this4$_getCon2[1];
                if (!(_this4.argv.save && manifestModel.isDirty())) {
                  _context7.n = 3;
                  break;
                }
                _context7.n = 2;
                return manifestModel.save();
              case 2:
                if (_this4.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Saved dependency data to ".concat(manifestModel.getRelativeDataPath()));
                }
              case 3:
                if (!lockfileModel.isDirty()) {
                  _context7.n = 5;
                  break;
                }
                _context7.n = 4;
                return lockfileModel.save();
              case 4:
                if (_this4.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Saved library data to ".concat(lockfileModel.getRelativeDataPath()));
                }
              case 5:
                return _context7.a(2);
            }
          }, _callee7);
        }))();
      },
      /**
       * Returns the tag name of the given library in the given package, if installed.
       * Returns false if not installed.
       * @param {String} repo_name
       * @param {String} library_name
       * @return {String|false}
       */
      getInstalledLibraryTag: function getInstalledLibraryTag(repo_name, library_name) {
        var _this5 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
          var library;
          return _regenerator().w(function (_context8) {
            while (1) switch (_context8.n) {
              case 0:
                _context8.n = 1;
                return _this5.getLockfileModel();
              case 1:
                library = _context8.v.getValue("libraries").find(function (lib) {
                  return lib.repo_name === repo_name && lib.library_name === library_name;
                });
                return _context8.a(2, library ? library.repo_tag : false);
            }
          }, _callee8);
        }))();
      },
      /**
       * Returns the data of the given library, if installed.
       * Returns false if not installed.
       * @param {String} library_name
       * @return {Object|false}
       */
      getInstalledLibraryData: function getInstalledLibraryData(library_name) {
        var _this6 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
          return _regenerator().w(function (_context9) {
            while (1) switch (_context9.n) {
              case 0:
                _context9.n = 1;
                return _this6.getLockfileModel();
              case 1:
                return _context9.a(2, _context9.v.getValue("libraries").find(function (lib) {
                  return lib.library_name === library_name;
                }));
            }
          }, _callee9);
        }))();
      },
      /**
       * Returns the absolute path to the file that persists the cache object
       * @return {String}
       */
      getCachePath: function getCachePath() {
        return path.join(qx.tool.cli.ConfigDb.getDirectory(), qx.tool.cli.commands.Package.package_cache_name);
      },
      /**
       * Returns the URL of the package registry data on GitHub
       * @return {String}
       */
      getRepositoryCacheUrl: function getRepositoryCacheUrl() {
        return qx.tool.cli.commands.Package.repository_cache_url;
      },
      /**
       * Returns the cache object, retrieving it from a local file if necessary
       * @return {Object}
       * @todo use config model API for cache file
       */
      getCache: function getCache() {
        var readFromFile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        if (!readFromFile && this.__P_479_0 && _typeof(this.__P_479_0) == "object") {
          return this.__P_479_0;
        }
        try {
          this.__P_479_0 = JSON.parse(fs.readFileSync(this.getCachePath(), "UTF-8"));
        } catch (e) {
          this.__P_479_0 = {
            repos: {
              list: [],
              data: {}
            },
            compat: {}
          };
        }
        return this.__P_479_0;
      },
      /**
       * Manually overwrite the cache data
       * @param data {Object}
       * @return {void}
       */
      setCache: function setCache(data) {
        this.__P_479_0 = data;
      },
      /**
       * Saves the cache to a hidden local file
       * @return {void}
       */
      saveCache: function saveCache() {
        var _this7 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
          return _regenerator().w(function (_context0) {
            while (1) switch (_context0.n) {
              case 0:
                _context0.n = 1;
                return qx.tool.utils.Utils.makeParentDir(_this7.getCachePath());
              case 1:
                _context0.n = 2;
                return fs.writeFileAsync(_this7.getCachePath(), JSON.stringify(_this7.__P_479_0, null, 2), "UTF-8");
              case 2:
                return _context0.a(2);
            }
          }, _callee0);
        }))();
      },
      /**
       * Exports the cache to an external file. Note that the structure of the cache
       * data can change any time. Do not build anything on it. You have been warned.
       * @param path {String}
       * @return {void}
       */
      exportCache: function exportCache(path) {
        var _this8 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
          var cache, data, _t3;
          return _regenerator().w(function (_context1) {
            while (1) switch (_context1.p = _context1.n) {
              case 0:
                _context1.p = 0;
                cache = _this8.__P_479_0 || _this8.getCache(true);
                data = stringify(cache, {
                  space: 2
                });
                _context1.n = 1;
                return fs.writeFileAsync(path, data, "UTF-8");
              case 1:
                _context1.n = 3;
                break;
              case 2:
                _context1.p = 2;
                _t3 = _context1.v;
                qx.tool.compiler.Console.error("Error exporting cache to ".concat(path, ":") + _t3.message);
                process.exit(1);
              case 3:
                return _context1.a(2);
            }
          }, _callee1, null, [[0, 2]]);
        }))();
      },
      /**
       * Clears the cache
       */
      clearCache: function clearCache() {
        this.__P_479_0 = null;
        try {
          fs.unlinkSync(this.getCachePath());
        } catch (e) {}
      }
    }
  });
  qx.tool.cli.commands.Package.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Package.js.map?dt=1782705792314