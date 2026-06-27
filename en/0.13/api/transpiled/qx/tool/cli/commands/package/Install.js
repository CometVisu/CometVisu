function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
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
      "qx.tool.cli.commands.Package": {
        "require": true
      },
      "qx.tool.compiler.Console": {},
      "qx.tool.utils.Utils": {},
      "qx.lang.Type": {},
      "qx.tool.cli.commands.package.Update": {},
      "qx.tool.cli.commands.package.List": {},
      "qx.tool.config.Manifest": {},
      "qx.tool.utils.Json": {},
      "qx.tool.config.Compile": {},
      "qx.tool.config.Lockfile": {},
      "qx.Promise": {},
      "qx.core.Assert": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2017-2021 Christian Boulanger
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (info@bibliograph.org, @cboulanger)
  
  ************************************************************************ */

  var download = require("download");
  var fs = qx.tool.utils.Promisify.fs;
  var path = require("upath");
  var process = require("process");
  var semver = require("semver");
  var rimraf = require("rimraf");

  /**
   * Installs a package
   */
  qx.Class.define("qx.tool.cli.commands.package.Install", {
    extend: qx.tool.cli.commands.Package,
    statics: {
      /**
       * Yarg commands data
       * @return {{}}
       */
      getYargsCommand: function getYargsCommand() {
        return {
          command: "install [uri[@release_tag]]",
          describe: "installs the latest compatible release of package (as per Manifest.json). Use \"-r <release tag>\" or @<release tag> to install a particular release.\n        examples:\n           * qx package install name: Install latest published version\n           * qx package install name@v0.0.2: Install version 0.0.2,\n           * qx package install name@master: Install current master branch from github",
          builder: {
            release: {
              alias: "r",
              describe: "Use a specific release tag instead of the tag of the latest compatible release",
              nargs: 1,
              requiresArg: true,
              type: "string"
            },
            ignore: {
              alias: "i",
              describe: "Ignore unmatch of qooxdoo"
            },
            verbose: {
              alias: "v",
              describe: "Verbose logging"
            },
            quiet: {
              alias: "q",
              describe: "No output"
            },
            save: {
              alias: "s",
              "default": false,
              describe: "Save the libraries as permanent dependencies"
            },
            "from-path": {
              alias: "p",
              nargs: 1,
              describe: "Install a library/the given library from a local path"
            },
            "qx-version": {
              check: function check(argv) {
                return semver.valid(argv.qxVersion);
              },
              describe: "A semver string. If given, the maximum qooxdoo version for which to install a package"
            }
          }
        };
      }
    },
    members: {
      /**
       * @var {Boolean}
       */
      __P_483_0: false,
      /**
       * API method to install a library via its URI and version tag
       * @param {String} library_uri
       * @param {String} release_tag
       * @return {Promise<void>}
       */
      install: function install(library_uri, release_tag) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var installee;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                installee = library_uri + (release_tag ? "@" + release_tag : "");
                if (_this.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> To be installed: ".concat(installee));
                }
                _this.argv.uri = installee;
                _this.argv.fromPath = false;
                _context.n = 1;
                return _this.process();
              case 1:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      /**
       * API method to install a library from a local path
       * @param {String} local_path
       * @param {String} library_uri Optional library URI.
       * @return {Promise<void>}
       */
      installFromLocaPath: function installFromLocaPath(local_path, library_uri) {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                if (!path.isAbsolute(local_path)) {
                  local_path = path.join(process.cwd(), local_path);
                }
                if (_this2.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> To be installed: ".concat(library_uri || "local libarary", " from ").concat(local_path));
                }
                _this2.argv.uri = library_uri;
                _this2.argv.fromPath = local_path;
                _context2.n = 1;
                return _this2.process();
              case 1:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      /**
       * API method to check if a library has been installed
       * @param {String} library_uri
       * @param {String} release_tag
       * @return {Promise<Boolean>}
       */
      isInstalled: function isInstalled(library_uri, release_tag) {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                _context3.n = 1;
                return _this3.getLockfileModel();
              case 1:
                return _context3.a(2, _context3.v.getValue("libraries").some(function (lib) {
                  return lib.uri === library_uri && (release_tag === undefined || release_tag === lib.repo_tag);
                }));
            }
          }, _callee3);
        }))();
      },
      /**
       * Installs a package
       */
      process: function process() {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var _yield$_this4$_getCon, _yield$_this4$_getCon2, manifestModel, lockfileModel, uri, id, _uri$split, _uri$split2, saveToManifest;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                _context4.n = 1;
                return qx.tool.cli.commands["package"].Install.superclass.prototype.process.call(_this4);
              case 1:
                _context4.n = 2;
                return _this4.__P_483_1();
              case 2:
                _context4.n = 3;
                return _this4._getConfigData();
              case 3:
                _yield$_this4$_getCon = _context4.v;
                _yield$_this4$_getCon2 = _slicedToArray(_yield$_this4$_getCon, 2);
                manifestModel = _yield$_this4$_getCon2[0];
                lockfileModel = _yield$_this4$_getCon2[1];
                // create shorthand for uri@id
                _this4.argv.uri = _this4.argv.uri || _this4.argv["uri@release_tag"];

                // if no library uri has been passed, install from lockfile or manifest
                if (!(!_this4.argv.uri && !_this4.argv.fromPath)) {
                  _context4.n = 8;
                  break;
                }
                if (!lockfileModel.getValue("libraries").length) {
                  _context4.n = 5;
                  break;
                }
                _context4.n = 4;
                return _this4.__P_483_2();
              case 4:
                _context4.n = 7;
                break;
              case 5:
                _context4.n = 6;
                return _this4.__P_483_3(manifestModel.getData());
              case 6:
                _context4.n = 7;
                return _this4._saveConfigData();
              case 7:
                return _context4.a(2);
              case 8:
                // library uri and id, which can be none (=latest), version, or tree-ish expression
                uri = _this4.argv.uri;
                if (_this4.argv.release) {
                  id = _this4.argv.release;
                } else if (uri) {
                  _uri$split = uri.split(/@/);
                  _uri$split2 = _slicedToArray(_uri$split, 2);
                  uri = _uri$split2[0];
                  id = _uri$split2[1];
                }

                // prepend "v" to valid semver strings
                if (semver.valid(id) && id[0] !== "v") {
                  if (_this4.argv.verbose) {
                    qx.tool.compiler.Console.info(">>> Prepending \"v\" to ".concat(id, "."));
                  }
                  id = "v".concat(id);
                }
                if (!_this4.argv.fromPath) {
                  _context4.n = 11;
                  break;
                }
                if (!id) {
                  _context4.n = 9;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Version identifier cannot be used when installing from local path.");
              case 9:
                saveToManifest = uri ? _this4.argv.save : false;
                _context4.n = 10;
                return _this4.__P_483_4(uri, _this4.argv.fromPath, saveToManifest);
              case 10:
                _context4.n = 14;
                break;
              case 11:
                if (!(!id || qx.lang.Type.isString(id) && id.startsWith("v"))) {
                  _context4.n = 13;
                  break;
                }
                _context4.n = 12;
                return _this4.__P_483_5(uri, id, _this4.argv.save);
              case 12:
                _context4.n = 14;
                break;
              case 13:
                _context4.n = 14;
                return _this4.__P_483_6(uri, id, _this4.argv.save);
              case 14:
                _context4.n = 15;
                return _this4._saveConfigData();
              case 15:
                if (_this4.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Done.");
                }
              case 16:
                return _context4.a(2);
            }
          }, _callee4);
        }))();
      },
      /**
       * Update repo cache
       * @return {Promise<void>}
       * @private
       */
      __P_483_1: function __P_483_1() {
        var _this5 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
          var repos_cache;
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                repos_cache = _this5.getCache().repos;
                if (!(repos_cache.list.length === 0)) {
                  _context5.n = 2;
                  break;
                }
                if (!_this5.argv.quiet) {
                  qx.tool.compiler.Console.info(">>> Updating cache...");
                }
                _this5.clearCache();
                // implicit update
                _context5.n = 1;
                return new qx.tool.cli.commands["package"].Update({
                  quiet: true
                }).process();
              case 1:
                _context5.n = 2;
                return new qx.tool.cli.commands["package"].List({
                  quiet: true
                }).process();
              case 2:
                return _context5.a(2);
            }
          }, _callee5);
        }))();
      },
      /**
       * Returns information on the given URI
       * @param {String} uri
       * @return {{package_path: string | string, repo_name: string}}
       * @private
       */
      __P_483_7: function __P_483_7(uri) {
        if (!uri) {
          throw new qx.tool.utils.Utils.UserError("No package resource identifier given");
        }
        // currently, the uri is github_username/repo_name[/path/to/repo].
        var parts = uri.split(/\//);
        var repo_name = parts.slice(0, 2).join("/");
        var package_path = parts.length > 2 ? parts.slice(2).join("/") : "";
        if (!this.getCache().repos.data[repo_name]) {
          throw new qx.tool.utils.Utils.UserError("A repository '".concat(repo_name, "' cannot be found."));
        }
        return {
          repo_name: repo_name,
          package_path: package_path
        };
      },
      /**
       * Installs libraries in a repository from a given release tag name
       * @param {String} uri The name of the repository (e.g. qooxdoo/qxl.apiviewer),
       *  or of a library within a repository (such as ergobyte/qookery/qookeryace)
       * @param {String} tag_name The tag name of the release, such as "v1.1.0"
       * @param {Boolean} writeToManifest Whether the library should be written to
       * Manifest.json as a dependency
       * @return {Promise<void>}
       * @private
       */
      __P_483_5: function __P_483_5(uri, tag_name, writeToManifest) {
        var _this6 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
          var qxVersion, _this6$__P_483_, repo_name, package_path, cache, options, _yield$_this6$__P_, download_path, found, repo_data, release_data, _iterator, _step, manifest_path, library_uri, _t;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.p = _context6.n) {
              case 0:
                _context6.n = 1;
                return _this6.getAppQxVersion();
              case 1:
                qxVersion = _context6.v.replace("-beta", "");
                _this6$__P_483_ = _this6.__P_483_7(uri), repo_name = _this6$__P_483_.repo_name, package_path = _this6$__P_483_.package_path;
                if (tag_name) {
                  _context6.n = 4;
                  break;
                }
                cache = _this6.getCache();
                if (!(cache.compat[qxVersion] === undefined)) {
                  _context6.n = 3;
                  break;
                }
                if (_this6.argv.verbose && !_this6.argv.quiet) {
                  qx.tool.compiler.Console.info(">>> Updating cache...");
                }
                options = {
                  quiet: true,
                  all: true,
                  qxVersion: qxVersion
                };
                _context6.n = 2;
                return new qx.tool.cli.commands["package"].List(options).process();
              case 2:
                cache = _this6.getCache(true);
              case 3:
                tag_name = cache.compat[qxVersion] && cache.compat[qxVersion][repo_name];
                if (tag_name) {
                  _context6.n = 4;
                  break;
                }
                qx.tool.compiler.Console.warn("'".concat(repo_name, "' has no (stable) release compatible with qooxdoo version ").concat(qxVersion, ".\n             To install anyways, use '--release <release>' or 'qx install ").concat(repo_name, "@<release>'.\n             Please ask the library maintainer to release a compatible version."));
                return _context6.a(2);
              case 4:
                if (_this6.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Installing '".concat(uri, "', release '").concat(tag_name, "' for qooxdoo version: ").concat(qxVersion));
                }
                _context6.n = 5;
                return _this6.__P_483_8(repo_name, tag_name);
              case 5:
                _yield$_this6$__P_ = _context6.v;
                download_path = _yield$_this6$__P_.download_path;
                // iterate over contained libraries
                found = false;
                repo_data = _this6.getCache().repos.data[repo_name];
                if (repo_data) {
                  _context6.n = 6;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("A repository '".concat(repo_name, "' cannot be found."));
              case 6:
                release_data = repo_data.releases.data[tag_name];
                if (release_data) {
                  _context6.n = 7;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("'".concat(repo_name, "' has no release '").concat(tag_name, "'."));
              case 7:
                // TO DO: the path in the cache data should be the path to the library containing Manifest.json, not to the Manifest.json itself
                _iterator = _createForOfIteratorHelper(release_data.manifests);
                _context6.p = 8;
                _iterator.s();
              case 9:
                if ((_step = _iterator.n()).done) {
                  _context6.n = 12;
                  break;
                }
                manifest_path = _step.value.path;
                if (!(package_path && path.dirname(manifest_path) !== package_path)) {
                  _context6.n = 10;
                  break;
                }
                return _context6.a(3, 11);
              case 10:
                library_uri = path.join(repo_name, path.dirname(manifest_path));
                found = true;
                _context6.n = 11;
                return _this6.__P_483_9(library_uri, tag_name, download_path, writeToManifest);
              case 11:
                _context6.n = 9;
                break;
              case 12:
                _context6.n = 14;
                break;
              case 13:
                _context6.p = 13;
                _t = _context6.v;
                _iterator.e(_t);
              case 14:
                _context6.p = 14;
                _iterator.f();
                return _context6.f(14);
              case 15:
                if (found) {
                  _context6.n = 16;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("The package/library identified by '".concat(uri, "' could not be found."));
              case 16:
                return _context6.a(2);
            }
          }, _callee6, null, [[8, 13, 14, 15]]);
        }))();
      },
      /**
       * Installs libraries in a given repository from the given hash of a code tree
       * independent from the library cache. This ignores dependency constraints.
       * The given uri must point to a folder containing Manifest.json
       * @param {String} uri
       *  The path to a library in a a repository
       *  (e.g. qooxdoo/qxl.apiviewer or ergobyte/qookery/qookeryace)
       * @param {String} hash
       *  A path into the code tree on GitHub such as "tree/892f44d1d1ae5d65c7dd99b18da6876de2f2a920"
       * @param {Boolean} writeToManifest Whether the library should be written to
       * Manifest.json as a dependency
       * @return {Promise<void>}
       * @private
       */
      __P_483_6: function __P_483_6(uri, hash, writeToManifest) {
        var _this7 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
          var qxVersion, _this7$__P_483_, repo_name, _yield$_this7$__P_, download_path;
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.n) {
              case 0:
                _context7.n = 1;
                return _this7.getAppQxVersion();
              case 1:
                qxVersion = _context7.v;
                if (_this7.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Installing '".concat(uri, "' from tree hash '").concat(hash, "' for qooxdoo version ").concat(qxVersion));
                }
                _this7$__P_483_ = _this7.__P_483_7(uri), repo_name = _this7$__P_483_.repo_name;
                _context7.n = 2;
                return _this7.__P_483_8(repo_name, hash);
              case 2:
                _yield$_this7$__P_ = _context7.v;
                download_path = _yield$_this7$__P_.download_path;
                _context7.n = 3;
                return _this7.__P_483_9(uri, hash, download_path, writeToManifest);
              case 3:
                return _context7.a(2);
            }
          }, _callee7);
        }))();
      },
      /**
       * Installs libraries from a local path
       * @param {String} uri
       *  The URI identifying a library (e.g. qooxdoo/qxl.apiviewer or
       *  ergobyte/qookery/qookeryace)
       * @param {String} dir
       *  The path to a local directory
       * @param {Boolean} writeToManifest
       *  Whether the library should be written to Manifest.json as a dependency
       * @return {Promise<void>}
       * @private
       */
      __P_483_4: function __P_483_4(uri, dir) {
        var _arguments = arguments,
          _this8 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
          var writeToManifest, qxVersion;
          return _regenerator().w(function (_context8) {
            while (1) switch (_context8.n) {
              case 0:
                writeToManifest = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : false;
                _context8.n = 1;
                return _this8.getAppQxVersion();
              case 1:
                qxVersion = _context8.v;
                if (_this8.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Installing '".concat(uri, "' from '").concat(dir, "' for qooxdoo version ").concat(qxVersion));
                }
                _context8.n = 2;
                return _this8.__P_483_9(uri, undefined, dir, writeToManifest);
              case 2:
                return _context8.a(2);
            }
          }, _callee8);
        }))();
      },
      /**
       * Updates the data in the lockfile and (optionally) in the manifest
       * @param {String} uri The path to a library in a a repository
       * (e.g. qooxdoo/qxl.apiviewer or ergobyte/qookery/qookeryace)
       * @param {String} id
       *  The tag name of a release such as "v1.1.0" or a tree hash such as
       *  tree/892f44d1d1ae5d65c7dd99b18da6876de2f2a920
       * @param {String} download_path The path to the downloaded repository
       * @param {Boolean} writeToManifest
       *  Whether the library should be written to Manifest.json as a dependency
       * @return {Promise<void>}
       * @private
       */
      __P_483_9: function __P_483_9(uri, id, download_path, writeToManifest) {
        var _this9 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
          var _ref, repo_name, package_path, _yield$_this9$_getCon, _yield$_this9$_getCon2, manifestModel, lockfileModel, library_path, manifest_path, _qx$tool$utils$Json$p, info, local_path, lib, index, appsInstalled, depsInstalled;
          return _regenerator().w(function (_context9) {
            while (1) switch (_context9.n) {
              case 0:
                _ref = uri ? _this9.__P_483_7(uri) : {
                  repo_name: "",
                  package_path: ""
                }, repo_name = _ref.repo_name, package_path = _ref.package_path;
                _context9.n = 1;
                return _this9._getConfigData();
              case 1:
                _yield$_this9$_getCon = _context9.v;
                _yield$_this9$_getCon2 = _slicedToArray(_yield$_this9$_getCon, 2);
                manifestModel = _yield$_this9$_getCon2[0];
                lockfileModel = _yield$_this9$_getCon2[1];
                library_path = path.join(download_path, package_path);
                manifest_path = path.join(library_path, qx.tool.config.Manifest.config.fileName);
                if (fs.existsSync(manifest_path)) {
                  _context9.n = 2;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("No manifest file in '".concat(library_path, "'."));
              case 2:
                _qx$tool$utils$Json$p = qx.tool.utils.Json.parseJson(fs.readFileSync(manifest_path, "utf-8")), info = _qx$tool$utils$Json$p.info;
                local_path = path.relative(process.cwd(), library_path); // create entry
                lib = {
                  library_name: info.name,
                  library_version: info.version,
                  path: local_path
                };
                if (uri) {
                  lib.uri = uri;
                }
                // remote library info
                if (repo_name) {
                  lib.repo_name = repo_name;
                  if (id) {
                    lib.repo_tag = id;
                  }
                }

                // do we already have an entry for the library that matches either the URI or the local path?
                index = lockfileModel.getValue("libraries").findIndex(function (elem) {
                  return uri && elem.uri === uri || !uri && elem.path === local_path;
                });
                if (index >= 0) {
                  lockfileModel.setValue(["libraries", index], lib);
                  if (_this9.argv.verbose) {
                    qx.tool.compiler.Console.info(">>> Updating already existing lockfile entry for ".concat(info.name, ", ").concat(info.version, ", installed from '").concat(uri ? uri : local_path, "'."));
                  }
                } else {
                  lockfileModel.transform("libraries", function (libs) {
                    return libs.push(lib) && libs;
                  });
                  if (_this9.argv.verbose) {
                    qx.tool.compiler.Console.info(">>> Added new lockfile entry for ".concat(info.name, ", ").concat(info.version, ", installed from '").concat(uri ? uri : local_path, "'."));
                  }
                }
                if (writeToManifest) {
                  manifestModel.setValue(["requires", uri], "^" + info.version);
                }
                _context9.n = 3;
                return _this9.__P_483_10(library_path);
              case 3:
                appsInstalled = _context9.v;
                if (!appsInstalled && _this9.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> No applications installed for ".concat(uri, "."));
                }
                _context9.n = 4;
                return _this9.__P_483_11(library_path);
              case 4:
                depsInstalled = _context9.v;
                if (!depsInstalled && _this9.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> No dependencies installed for ".concat(uri, "."));
                }
                if (!_this9.argv.quiet) {
                  qx.tool.compiler.Console.info("Installed ".concat(info.name, " (").concat(uri, ", ").concat(info.version, ")"));
                }
              case 5:
                return _context9.a(2);
            }
          }, _callee9);
        }))();
      },
      /**
       * Given a download path of a library, install its dependencies
       * @param {String} downloadPath
       * @return {Promise<Boolean>} Wether any libraries were installed
       */
      __P_483_11: function __P_483_11(downloadPath) {
        var _this0 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
          var manifest_file, manifest;
          return _regenerator().w(function (_context0) {
            while (1) switch (_context0.n) {
              case 0:
                manifest_file = path.join(downloadPath, qx.tool.config.Manifest.config.fileName);
                _context0.n = 1;
                return qx.tool.utils.Json.loadJsonAsync(manifest_file);
              case 1:
                manifest = _context0.v;
                if (manifest.requires) {
                  _context0.n = 2;
                  break;
                }
                if (_this0.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> ".concat(manifest_file, " does not contain library dependencies."));
                }
                return _context0.a(2, false);
              case 2:
                if (_this0.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Installing libraries from ".concat(manifest_file, "."));
                }
                return _context0.a(2, _this0.__P_483_3(manifest));
            }
          }, _callee0);
        }))();
      },
      /**
       * Given a library's manifest data, install its dependencies
       * @param {Object} manifest
       * @return {Promise<Boolean>} Wether any libraries were installed
       */
      __P_483_3: function __P_483_3(manifest) {
        var _this1 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
          var _iterator2, _step2, lib_uri, lib_range, qxVersion, _this1$__P_483_, tag, _t2, _t3, _t4;
          return _regenerator().w(function (_context1) {
            while (1) switch (_context1.p = _context1.n) {
              case 0:
                if (manifest.requires) {
                  _context1.n = 1;
                  break;
                }
                return _context1.a(2, false);
              case 1:
                _iterator2 = _createForOfIteratorHelper(Object.getOwnPropertyNames(manifest.requires));
                _context1.p = 2;
                _iterator2.s();
              case 3:
                if ((_step2 = _iterator2.n()).done) {
                  _context1.n = 20;
                  break;
                }
                lib_uri = _step2.value;
                lib_range = manifest.requires[lib_uri];
                _t2 = lib_uri;
                _context1.n = _t2 === "@qooxdoo/compiler" ? 4 : _t2 === "qooxdoo-sdk" ? 4 : _t2 === "qooxdoo-compiler" ? 4 : _t2 === "@qooxdoo/framework" ? 5 : 8;
                break;
              case 4:
                return _context1.a(3, 19);
              case 5:
                _context1.n = 6;
                return _this1.getAppQxVersion();
              case 6:
                qxVersion = _context1.v;
                if (!(!semver.satisfies(qxVersion, lib_range, {
                  loose: true
                }) && _this1.argv.ignore)) {
                  _context1.n = 7;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Library '".concat(lib_uri, "' needs @qooxdoo/framework version ").concat(lib_range, ", found ").concat(qxVersion));
              case 7:
                return _context1.a(3, 19);
              case 8:
                if (!semver.validRange(lib_range)) {
                  _context1.n = 13;
                  break;
                }
                _this1$__P_483_ = _this1.__P_483_12(lib_uri, lib_range), tag = _this1$__P_483_.tag;
                if (tag) {
                  _context1.n = 9;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("No satisfying release found for ".concat(lib_uri, "@").concat(lib_range, "!"));
              case 9:
                _context1.n = 10;
                return _this1.isInstalled(lib_uri, tag);
              case 10:
                if (_context1.v) {
                  _context1.n = 12;
                  break;
                }
                _context1.n = 11;
                return _this1.__P_483_5(lib_uri, tag, false);
              case 11:
                return _context1.a(3, 19);
              case 12:
                if (_this1.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> ".concat(lib_uri, "@").concat(tag, " is already installed."));
                }
                return _context1.a(3, 19);
              case 13:
                _context1.n = 14;
                return _this1.isInstalled(lib_uri, lib_range);
              case 14:
                if (_context1.v) {
                  _context1.n = 18;
                  break;
                }
                _context1.p = 15;
                _context1.n = 16;
                return _this1.__P_483_6(lib_uri, lib_range, false);
              case 16:
                return _context1.a(3, 19);
              case 17:
                _context1.p = 17;
                _t3 = _context1.v;
                throw new qx.tool.utils.Utils.UserError("Could not install ".concat(lib_uri, "@").concat(lib_range, ": ").concat(_t3.message));
              case 18:
                if (_this1.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> ".concat(lib_uri, "@").concat(lib_range, " is already installed."));
                }
              case 19:
                _context1.n = 3;
                break;
              case 20:
                _context1.n = 22;
                break;
              case 21:
                _context1.p = 21;
                _t4 = _context1.v;
                _iterator2.e(_t4);
              case 22:
                _context1.p = 22;
                _iterator2.f();
                return _context1.f(22);
              case 23:
                return _context1.a(2, true);
            }
          }, _callee1, null, [[15, 17], [2, 21, 22, 23]]);
        }))();
      },
      /**
       * Given the URI of a library repo and a semver range, returns the highest
       * version compatible with the semver range and the release tag containing
       * this version.
       * @param {String} lib_uri The URI of the library
       * @param {String} lib_range The semver range
       * @return {Object} Returns an object with the keys "tag" and "version"
       * @private
       */
      __P_483_12: function __P_483_12(lib_uri, lib_range) {
        var _this10 = this;
        var _this$__P_483_ = this.__P_483_7(lib_uri),
          repo_name = _this$__P_483_.repo_name;
        var lib = this.getCache().repos.data[repo_name];
        if (!lib) {
          throw new qx.tool.utils.Utils.UserError("".concat(lib_uri, " is not in the library registry!"));
        }
        // map version to release (this helps with prereleases)
        var version2release = {};
        var versionList = lib.releases.list.map(function (tag) {
          // all libraries in a package MUST have the same version
          var manifest = lib.releases.data[tag].manifests[0];
          if (!qx.lang.Type.isObject(manifest) || !qx.lang.Type.isObject(manifest.info) || !manifest.info.version) {
            _this10.debug("".concat(repo_name, "/").concat(tag, ": Invalid Manifest!"));
            return null;
          }
          var version = manifest.info.version;
          version2release[version] = tag;
          return version;
        }).filter(function (version) {
          return Boolean(version);
        });
        var highestCompatibleVersion = semver.maxSatisfying(versionList, lib_range, {
          loose: true
        });
        return {
          version: highestCompatibleVersion,
          tag: version2release[highestCompatibleVersion]
        };
      },
      /**
       * Given the download path of a library, install its applications
       * todo use config API, use compile.js where it exists
       * @param {String} downloadPath
       * @return {Promise<Boolean>} Returns true if applications were installed
       */
      __P_483_10: function __P_483_10(downloadPath) {
        var _this11 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
          var manifest, manifestApp, compileConfigModel, app;
          return _regenerator().w(function (_context10) {
            while (1) switch (_context10.n) {
              case 0:
                _context10.n = 1;
                return qx.tool.utils.Json.loadJsonAsync(path.join(downloadPath, qx.tool.config.Manifest.config.fileName));
              case 1:
                manifest = _context10.v;
                if (!(!manifest.provides || !manifest.provides.application)) {
                  _context10.n = 2;
                  break;
                }
                return _context10.a(2, false);
              case 2:
                manifestApp = manifest.provides.application;
                _context10.n = 3;
                return qx.tool.config.Compile.getInstance();
              case 3:
                compileConfigModel = _context10.v;
                _context10.n = 4;
                return compileConfigModel.exists();
              case 4:
                if (_context10.v) {
                  _context10.n = 5;
                  break;
                }
                qx.tool.compiler.Console.info(">>> Cannot install application " + (manifestApp.name || manifestApp["class"]) + " because compile.json does not exist (you must manually add it)");
                return _context10.a(2, false);
              case 5:
                // relaod config. We need a fresh model here because data will be verified.
                // The original model is enriched during parsing so validate will fail.
                compileConfigModel.setLoaded(false);
                _context10.n = 6;
                return compileConfigModel.load();
              case 6:
                app = compileConfigModel.getValue("applications").find(function (app) {
                  if (manifestApp.name && app.name) {
                    return manifestApp.name === app.name;
                  }
                  return manifestApp["class"] === app["class"];
                });
                if (!app) {
                  compileConfigModel.transform("applications", function (apps) {
                    return apps.concat([manifestApp]);
                  });
                  app = manifestApp;
                }
                if (!compileConfigModel.isDirty()) {
                  _context10.n = 7;
                  break;
                }
                _context10.n = 7;
                return compileConfigModel.save();
              case 7:
                if (_this11.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Installed application " + (app.name || app["class"]));
                }
                return _context10.a(2, true);
            }
          }, _callee10);
        }))();
      },
      /**
       * Download repos listed in the lockfile
       * @return {Promise<void>}
       * @private
       */
      __P_483_2: function __P_483_2() {
        var _this12 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
          var libraries;
          return _regenerator().w(function (_context11) {
            while (1) switch (_context11.n) {
              case 0:
                if (_this12.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Downloading libraries listed in ".concat(qx.tool.config.Lockfile.config.fileName, "..."));
                }
                _context11.n = 1;
                return _this12.getLockfileData();
              case 1:
                libraries = _context11.v.libraries;
                return _context11.a(2, qx.Promise.all(libraries.filter(function (lib) {
                  return lib.repo_name && lib.repo_tag;
                }).map(function (lib) {
                  return _this12.__P_483_8(lib.repo_name, lib.repo_tag);
                })));
            }
          }, _callee11);
        }))();
      },
      /**
       * Downloads a release
       * @return {Object} A map containing {release_data, download_path}
       * @param {String} repo_name The name of the repository
       * @param {String} treeish
       *  If prefixed by "v", the name of a release tag. Otherwise, arbitrary
       *  tree-ish expression (see https://help.github.com/en/articles/getting-permanent-links-to-files)
       * @param {Boolean} force Overwrite existing downloads
       * @return {{download_path:String}}
       */
      __P_483_8: function __P_483_8(repo_name) {
        var _arguments2 = arguments,
          _this13 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
          var treeish, force, url, dir_name, parts, dir_exists, download_path, _t5;
          return _regenerator().w(function (_context12) {
            while (1) switch (_context12.p = _context12.n) {
              case 0:
                treeish = _arguments2.length > 1 && _arguments2[1] !== undefined ? _arguments2[1] : null;
                force = _arguments2.length > 2 && _arguments2[2] !== undefined ? _arguments2[2] : false;
                qx.core.Assert.assertNotNull(treeish, "Empty tree-ish id is not allowed");
                url = "https://github.com/".concat(repo_name, "/archive/").concat(treeish, ".zip"); // create local directory
                dir_name = "".concat(repo_name, "_").concat(treeish).replace(/[\^./*?"'<>:]/g, "_");
                parts = [process.cwd(), qx.tool.cli.commands.Package.cache_dir, dir_name];
                download_path = parts.reduce(function (prev, current) {
                  var dir = prev + path.sep + current;
                  if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                    dir_exists = false;
                  } else {
                    dir_exists = true;
                  }
                  return dir;
                }); // download zip
                if (!(!force && dir_exists)) {
                  _context12.n = 1;
                  break;
                }
                if (_this13.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Repository '".concat(repo_name, "', '").concat(treeish, "' has already been downloaded to ").concat(download_path, ". To download again, execute 'qx clean'."));
                }
                _context12.n = 5;
                break;
              case 1:
                if (_this13.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Downloading repository '".concat(repo_name, "', '").concat(treeish, "' from ").concat(url, " to ").concat(download_path));
                }
                _context12.p = 2;
                _context12.n = 3;
                return download(url, download_path, {
                  extract: true,
                  strip: 1
                });
              case 3:
                _context12.n = 5;
                break;
              case 4:
                _context12.p = 4;
                _t5 = _context12.v;
                // remove download path so that failed downloads do not result in empty folder
                if (_this13.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Download failed: ".concat(_t5.message, ". Removing download folder."));
                }
                rimraf.sync(download_path);
                qx.tool.compiler.Console.error("Could not install '".concat(repo_name, "@").concat(treeish, "'. Use the --verbose flag for more information."));
                process.exit(1);
              case 5:
                return _context12.a(2, {
                  download_path: download_path,
                  dir_exists: dir_exists
                });
            }
          }, _callee12, null, [[2, 4]]);
        }))();
      }
    }
  });
  qx.tool.cli.commands["package"].Install.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Install.js.map?dt=1782595070551