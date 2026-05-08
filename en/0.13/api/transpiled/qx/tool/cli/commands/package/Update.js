function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
      "qx.tool.cli.commands.Package": {
        "require": true
      },
      "qx.tool.compiler.Console": {},
      "qx.tool.cli.ConfigDb": {},
      "qx.tool.utils.Utils": {},
      "qx.tool.utils.Json": {},
      "qx.tool.config.Manifest": {},
      "qx.tool.config.Lockfile": {}
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
  var _process = require("process");
  var Search = require("github-api/dist/components/Search");
  var Repository = require("github-api/dist/components/Repository");
  var semver = require("semver");
  var inquirer = require("inquirer");
  var path = require("upath");

  /**
   * Updates the local cache with information of available library packages
   * @ignore(github.*)
   */
  qx.Class.define("qx.tool.cli.commands.package.Update", {
    extend: qx.tool.cli.commands.Package,
    statics: {
      getYargsCommand: function getYargsCommand() {
        return {
          command: "update [repository]",
          describe: "updates information on packages from github. Has to be called before the other commands. If a package URI is supplied, only update information on that package",
          builder: {
            file: {
              alias: "f",
              describe: "Output result to a file"
            },
            search: {
              alias: "S",
              describe: "Search GitHub for repos (as opposed to using the cached nightly data)"
            },
            "all-versions": {
              alias: "a",
              describe: "Retrieve all releases (as opposed to the latest minor/patch release of each major release)"
            },
            verbose: {
              alias: "v",
              describe: "Verbose logging"
            },
            quiet: {
              alias: "q",
              describe: "No output"
            },
            "export-only": {
              alias: "E",
              describe: "Export the current cache without updating it first (requires --file)"
            }
          }
        };
      }
    },
    members: {
      __P_487_0: null,
      /**
       * Updates the cache with information from GitHub.
       */
      process: function process() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var cfg, github, response, num_libraries;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                qx.tool.cli.commands["package"].Update.superclass.prototype.process.call(_this);

                // init
                _this.__P_487_0 = [];

                // export only
                if (!_this.argv.exportOnly) {
                  _context.n = 1;
                  break;
                }
                if (!_this.argv.file) {
                  qx.tool.compiler.Console.error("Path required via --file argument.");
                  _process.exit(1);
                }
                _this.exportCache(_this.argv.file);
                return _context.a(2);
              case 1:
                if (!_this.argv.repository) {
                  _this.clearCache();
                }
                _context.n = 2;
                return qx.tool.cli.ConfigDb.getInstance();
              case 2:
                cfg = _context.v;
                github = cfg.db("github", {}); // Create the cache
                if (_this.argv.search) {
                  _context.n = 4;
                  break;
                }
                _context.n = 3;
                return _this.updateFromRepository();
              case 3:
                _context.n = 8;
                break;
              case 4:
                if (github.token) {
                  _context.n = 7;
                  break;
                }
                _context.n = 5;
                return inquirer.prompt([{
                  type: "input",
                  name: "token",
                  message: "Searching GitHub requires an API token - visit https://github.com/settings/tokens to obtain one (you do not need to assign any permissions, just create a token);\nWhat is your GitHub API Token ? "
                }]);
              case 5:
                response = _context.v;
                if (response.token) {
                  _context.n = 6;
                  break;
                }
                qx.tool.compiler.Console.error("You have not provided a GitHub token.");
                return _context.a(2);
              case 6:
                github.token = response.token;
                cfg.save();
              case 7:
                _context.n = 8;
                return _this.updateFromGitHubAPI(github.token);
              case 8:
                num_libraries = _this.getCache().num_libraries;
                if (num_libraries && !_this.argv.quiet) {
                  qx.tool.compiler.Console.info("Found ".concat(num_libraries, " releases of libraries."));
                  qx.tool.compiler.Console.info("Run 'qx package list' in the root dir of your project to see which versions of these libraries are compatible.");
                }

                // save cache and export it if requested
                _context.n = 9;
                return _this.saveCache();
              case 9:
                if (!_this.argv.file) {
                  _context.n = 10;
                  break;
                }
                _context.n = 10;
                return _this.exportCache(_this.argv.file);
              case 10:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      /**
       * Update the package cache from the nightly cron job
       * @return {Promise<void>}
       */
      updateFromRepository: function updateFromRepository() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var url, fetch, res, data, _t;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                if (!_this2.argv.quiet) {
                  qx.tool.compiler.Console.info("Downloading cache from GitHub ...");
                }
                url = _this2.getRepositoryCacheUrl();
                _context2.p = 1;
                _context2.n = 2;
                return import("node-fetch");
              case 2:
                fetch = _context2.v["default"];
                _context2.n = 3;
                return fetch(url);
              case 3:
                res = _context2.v;
                _context2.n = 4;
                return res.json();
              case 4:
                data = _context2.v;
                _this2.setCache(data);
                _context2.n = 6;
                break;
              case 5:
                _context2.p = 5;
                _t = _context2.v;
                throw new qx.tool.utils.Utils.UserError(_t.message);
              case 6:
                return _context2.a(2);
            }
          }, _callee2, null, [[1, 5]]);
        }))();
      },
      /**
       * Updates the package cache from the GitHub Api
       * @param {String} token
       * @return {Promise<void>}
       */
      updateFromGitHubAPI: function updateFromGitHubAPI(token) {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var auth, search, num_libraries, query, result, result2, repos, repo_lookup, repos_data, _iterator, _step, repo, name, repository, releases_data, releases, versions, _iterator2, _step2, release, tag_name, _releases, manifests, qooxdoo_data, data, _iterator3, _step3, _step3$value, index, manifest, manifest_data, manifest_path, _data, qx_version_range, zip_url, _t2, _t3, _t4, _t5, _t6, _t7, _t8;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.p = _context3.n) {
              case 0:
                auth = {
                  token: token
                };
                search = new Search({}, auth);
                num_libraries = 0; // repositories
                if (!_this3.argv.quiet) {
                  qx.tool.compiler.Console.info("Searching for package repositories on GitHub...");
                }
                query = "topic:qooxdoo-package fork:true";
                if (_this3.argv.repository) {
                  query += " " + _this3.argv.repository;
                }
                _context3.n = 1;
                return search.forRepositories({
                  q: query
                });
              case 1:
                result = _context3.v;
                // backwards-compatibility
                query = "topic:qooxdoo-contrib fork:true";
                if (_this3.argv.repository) {
                  query += " " + _this3.argv.repository;
                }
                _context3.n = 2;
                return search.forRepositories({
                  q: query
                });
              case 2:
                result2 = _context3.v;
                repos = result.data.concat(result2.data);
                repo_lookup = {};
                repos_data = _this3.getCache().repos.data; // iterate over repositories
                _iterator = _createForOfIteratorHelper(repos);
                _context3.p = 3;
                _iterator.s();
              case 4:
                if ((_step = _iterator.n()).done) {
                  _context3.n = 38;
                  break;
                }
                repo = _step.value;
                name = repo.full_name; // already dealt with
                if (!repo_lookup[name]) {
                  _context3.n = 5;
                  break;
                }
                return _context3.a(3, 37);
              case 5:
                repo_lookup[name] = repo;
                // if a repository name has been given, only update this repo
                if (!(_this3.argv.repository && name !== _this3.argv.repository)) {
                  _context3.n = 6;
                  break;
                }
                return _context3.a(3, 37);
              case 6:
                if (_this3.argv.verbose) {
                  qx.tool.compiler.Console.info("### Found ".concat(name, " ..."));
                }
                _this3.__P_487_0.push(name);
                repository = new Repository(name, auth);
                repos_data[name] = {
                  description: repo.description,
                  url: repo.url,
                  releases: {
                    list: [],
                    data: {}
                  }
                };

                // get releases
                _context3.p = 7;
                _context3.n = 8;
                return repository.listReleases();
              case 8:
                releases_data = _context3.v;
                _context3.n = 10;
                break;
              case 9:
                _context3.p = 9;
                _t2 = _context3.v;
                qx.tool.compiler.Console.error("Error retrieving releases: " + _t2);
                return _context3.a(3, 37);
              case 10:
                // filter releases to speed up updates
                releases = releases_data.data
                // filter out invalid release names unless "--all-versions"
                .filter(function (r) {
                  return _this3.argv["all-versions"] ? true : semver.valid(r.tag_name, true);
                })

                // attach a clean version number
                .map(function (r) {
                  r.version = semver.valid(r.tag_name, true) || "0.0.0";
                  return r;
                })
                // sort by version number
                .sort(function (a, b) {
                  return semver.compare(a.version, b.version);
                })
                // use only the latest minor/patch unless "--all-versions"
                .filter(function (r, i, a) {
                  return r.version !== "0.0.0" && (_this3.argv["all-versions"] ? true : i === a.length - 1 || semver.major(a[i + 1].version) > semver.major(r.version));
                });
                versions = releases.map(function (r) {
                  return r.version;
                });
                if (_this3.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Retrieved ".concat(releases.length, " release(s) of ").concat(name, ": ").concat(versions.join(", "), "."));
                }

                // get Manifest.json of each release to determine compatible qooxdoo versions
                _iterator2 = _createForOfIteratorHelper(releases);
                _context3.p = 11;
                _iterator2.s();
              case 12:
                if ((_step2 = _iterator2.n()).done) {
                  _context3.n = 34;
                  break;
                }
                release = _step2.value;
                tag_name = release.tag_name;
                _releases = repos_data[name].releases; // list of paths to manifest files, default is Manifest.json in the root dir
                manifests = [{
                  path: "."
                }]; // can be overridden by a qoxdoo.json in the root dir
                qooxdoo_data = void 0;
                if (_this3.argv.verbose) {
                  _this3.debug(">>> Trying to retrieve 'qooxdoo.json' for ".concat(name, " ").concat(tag_name, "..."));
                }
                _context3.p = 13;
                _context3.n = 14;
                return repository.getContents(tag_name, "qooxdoo.json", true);
              case 14:
                qooxdoo_data = _context3.v;
                if (_this3.argv.verbose) {
                  _this3.debug(">>>  File exists, checking for libraries...");
                }
                data = qooxdoo_data.data;
                if (typeof data == "string") {
                  try {
                    data = qx.tool.utils.Json.parseJson(data);
                  } catch (e) {
                    if (_this3.argv.verbose) {
                      qx.tool.compiler.Console.warn("!!!  Parse error: ".concat(e.message));
                    }
                  }
                }
                // we have a list of Manifest.json paths!
                manifests = data.libraries || data.contribs; // to do remove data.contribs. eventually, only there for BC
                _context3.n = 16;
                break;
              case 15:
                _context3.p = 15;
                _t3 = _context3.v;
                // no qooxdoo.json
                if (_t3.message.match(/404/)) {
                  if (_this3.argv.verbose) {
                    _this3.debug(">>> No qooxdoo.json");
                  }
                } else if (_this3.argv.verbose) {
                  qx.tool.compiler.Console.warn("!!! Error: ".concat(_t3.message));
                }
              case 16:
                // create a list of libraries via their manifests
                _iterator3 = _createForOfIteratorHelper(manifests.entries());
                _context3.p = 17;
                _iterator3.s();
              case 18:
                if ((_step3 = _iterator3.n()).done) {
                  _context3.n = 29;
                  break;
                }
                _step3$value = _slicedToArray(_step3.value, 2), index = _step3$value[0], manifest = _step3$value[1];
                manifest_data = void 0;
                manifest_path = path.join(manifest.path, qx.tool.config.Manifest.config.fileName);
                _context3.p = 19;
                if (_this3.argv.verbose) {
                  _this3.debug(">>> Retrieving Manifest file '".concat(manifest_path, "' for ").concat(name, " ").concat(tag_name, "..."));
                }
                _context3.n = 20;
                return repository.getContents(tag_name, manifest_path, true);
              case 20:
                manifest_data = _context3.v;
                _context3.n = 22;
                break;
              case 21:
                _context3.p = 21;
                _t4 = _context3.v;
                if (_t4.message.match(/404/)) {
                  if (_this3.argv.verbose) {
                    qx.tool.compiler.Console.warn("!!!  File does not exist.");
                  }
                } else if (_this3.argv.verbose) {
                  qx.tool.compiler.Console.warn("!!! Error: ".concat(_t4.message));
                }
                return _context3.a(3, 28);
              case 22:
                // retrieve compatible qooxdoo versions
                _data = manifest_data.data; // @todo check if the method can return JSON to save parsing
                if (!(typeof _data == "string")) {
                  _context3.n = 25;
                  break;
                }
                _context3.p = 23;
                _data = qx.tool.utils.Json.parseJson(_data);
                _context3.n = 25;
                break;
              case 24:
                _context3.p = 24;
                _t5 = _context3.v;
                if (_this3.argv.verbose) {
                  qx.tool.compiler.Console.warn("!!! Parse error: ".concat(_t5.message));
                  _this3.debug(_data);
                }
                return _context3.a(3, 28);
              case 25:
                qx_version_range = _data.requires && _data.requires["@qooxdoo/framework"];
                if (qx_version_range) {
                  _context3.n = 26;
                  break;
                }
                if (_this3.argv.verbose) {
                  qx.tool.compiler.Console.warn("!!! No valid qooxdoo version information in the manifest, skipping...");
                }
                return _context3.a(3, 28);
              case 26:
                if (semver.validRange(qx_version_range, {
                  loose: true
                })) {
                  _context3.n = 27;
                  break;
                }
                if (_this3.argv.verbose) {
                  qx.tool.compiler.Console.warn("!!! Invalid qooxdoo version information in the Manifest, skipping...");
                }
                return _context3.a(3, 28);
              case 27:
                // add information to manifest index
                manifests[index] = {
                  path: manifest_path,
                  qx_versions: qx_version_range,
                  info: _data.info,
                  requires: _data.requires,
                  provides: _data.provides
                };
                num_libraries++;
                if (_this3.argv.verbose) {
                  _this3.debug(">>> ".concat(name, " ").concat(tag_name, ": Found package '").concat(_data.info.name, "' (compatible with ").concat(qx_version_range, ")"));
                } else if (!_this3.argv.quiet) {
                  _process.stdout.write("."); // output dots to indicate progress
                }
              case 28:
                _context3.n = 18;
                break;
              case 29:
                _context3.n = 31;
                break;
              case 30:
                _context3.p = 30;
                _t6 = _context3.v;
                _iterator3.e(_t6);
              case 31:
                _context3.p = 31;
                _iterator3.f();
                return _context3.f(31);
              case 32:
                // end iteration over manifests
                // save data in cache
                zip_url = "https://github.com/".concat(name, "/archive/").concat(tag_name, ".zip");
                _releases.list.push(tag_name);
                _releases.data[tag_name] = {
                  id: release.id,
                  published_at: release.published_at,
                  comment: release.body,
                  title: release.name,
                  prerelease: release.prerelease,
                  manifests: manifests,
                  zip_url: zip_url
                };
              case 33:
                _context3.n = 12;
                break;
              case 34:
                _context3.n = 36;
                break;
              case 35:
                _context3.p = 35;
                _t7 = _context3.v;
                _iterator2.e(_t7);
              case 36:
                _context3.p = 36;
                _iterator2.f();
                return _context3.f(36);
              case 37:
                _context3.n = 4;
                break;
              case 38:
                _context3.n = 40;
                break;
              case 39:
                _context3.p = 39;
                _t8 = _context3.v;
                _iterator.e(_t8);
              case 40:
                _context3.p = 40;
                _iterator.f();
                return _context3.f(40);
              case 41:
                // end iteration over repos

                // wrap-up
                _this3.getCache().version = qx.tool.config.Lockfile.getInstance().getVersion();
                _this3.getCache().num_libraries = num_libraries;
                if (!_this3.argv.repository) {
                  _this3.getCache().repos.list = _this3.__P_487_0.sort();
                }
                if (!_this3.argv.quiet && !_this3.argv.verbose) {
                  _process.stdout.write("\n");
                }
              case 42:
                return _context3.a(2);
            }
          }, _callee3, null, [[23, 24], [19, 21], [17, 30, 31, 32], [13, 15], [11, 35, 36, 37], [7, 9], [3, 39, 40, 41]]);
        }))();
      }
    }
  });
  qx.tool.cli.commands["package"].Update.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Update.js.map?dt=1778272842474