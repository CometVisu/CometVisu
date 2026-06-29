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
      "qx.tool.config.Manifest": {},
      "qx.tool.utils.Json": {}
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
  var semver = require("semver");
  var columnify = require("columnify");
  var path = require("upath");

  /**
   * Lists compatible packages
   */
  qx.Class.define("qx.tool.cli.commands.package.List", {
    extend: qx.tool.cli.commands.Package,
    statics: {
      /**
       * The name of a "fake" repository containing libraries from local paths
       */
      localPathRepoName: "_local_",
      /**
       * Returns the yargs command data
       * @return {Object}
       */
      getYargsCommand: function getYargsCommand() {
        return {
          command: "list [repository]",
          describe: 'if no repository name is given, lists all available packages that are compatible with the project\'s qooxdoo version ("--all" lists incompatible ones as well). Otherwise, list all compatible packages.',
          builder: {
            all: {
              alias: "a",
              describe: "Show all versions, including incompatible ones"
            },
            verbose: {
              alias: "v",
              describe: "Verbose logging"
            },
            quiet: {
              alias: "q",
              describe: "No output"
            },
            json: {
              alias: "j",
              describe: "Output list as JSON literal"
            },
            installed: {
              alias: "i",
              describe: "Show only installed libraries"
            },
            namespace: {
              alias: "n",
              describe: "Display library namespace"
            },
            match: {
              alias: "m",
              describe: "Filter by regular expression (case-insensitive)"
            },
            libraries: {
              alias: "l",
              describe: "List libraries only (no repositories)"
            },
            "short": {
              alias: "s",
              describe: "Omit title and description to make list more compact"
            },
            noheaders: {
              alias: "H",
              describe: "Omit header and footer"
            },
            prereleases: {
              alias: "p",
              describe: "Include prereleases into latest compatible releases"
            },
            "uris-only": {
              alias: "u",
              describe: "Output only the GitHub URIs of the packages which are used to install the packages. Implies --noheaders and --libraries."
            },
            "qx-version": {
              check: function check(argv) {
                return semver.valid(argv.qxVersion);
              },
              describe: "A semver string. If given, the qooxdoo version for which to generate the listings"
            }
          }
        };
      }
    },
    members: {
      /**
       * Lists library packages compatible with the current project
       */
      process: function (_process) {
        function process() {
          return _process.apply(this, arguments);
        }
        process.toString = function () {
          return _process.toString();
        };
        return process;
      }(function () {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var localPathRepoName, repos_cache, qxVersion, num_compat_repos, repo, _columnify_options, data, pretty, columns, columnify_options, list, expanded_list, _iterator2, _step2, _repo, repo_libs, _iterator3, _step3, library, uri, exp, _t, _t2, _t3;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                _context.n = 1;
                return qx.tool.cli.commands["package"].List.superclass.prototype.process.call(_this);
              case 1:
                _this.__P_484_0 = [];
                _this.__P_484_1 = {};
                _this.__P_484_2 = {};
                localPathRepoName = qx.tool.cli.commands["package"].List.localPathRepoName;
                repos_cache = _this.getCache().repos; // implicit qx package update, disabled
                // if (repos_cache.list.length === 0 || this.getCache().version !== qx.tool.config.Lockfile.getInstance().getVersion()) {
                //   await (new qx.tool.cli.commands.package.Update({quiet:true})).process();
                // }
                _context.p = 2;
                _context.n = 3;
                return _this.getAppQxVersion();
              case 3:
                qxVersion = _context.v;
                _context.n = 5;
                break;
              case 4:
                _context.p = 4;
                _t = _context.v;
                qx.tool.compiler.Console.error("Cannot determine a qooxdoo version to show packages only for this version, because you are not in a project directory.");
                process.exit(1);
              case 5:
                _context.n = 6;
                return _this.__P_484_3(qxVersion);
              case 6:
                num_compat_repos = _context.v;
                if (_this.argv.verbose) {
                  _this.debug(">>> We have ".concat(num_compat_repos, " packages compatible with qooxdoo version ").concat(qxVersion));
                }
                if (!(num_compat_repos === 0 && !_this.argv.all && !_this.argv.quiet)) {
                  _context.n = 7;
                  break;
                }
                qx.tool.compiler.Console.info("Currently, no packages compatible with qooxdoo version ".concat(qxVersion, " exist."));
                return _context.a(2);
              case 7:
                // detailed repo information
                repo = _this.argv.repository;
                if (!repo) {
                  _context.n = 9;
                  break;
                }
                if (repos_cache.list.includes(repo)) {
                  _context.n = 8;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Repository ".concat(repo, " does not exist or is not a qooxdoo package repo."));
              case 8:
                if (_this.__P_484_1[repo] && _this.__P_484_1[repo].length) {
                  _columnify_options = {
                    columnSplitter: "   ",
                    config: {
                      description: {
                        maxWidth: 60
                      },
                      compatibility: {
                        dataTransform: function dataTransform(data) {
                          switch (data) {
                            case "false":
                              return "not compatible / untested";
                            case "true":
                              return "√";
                            default:
                              return "";
                          }
                        }
                      },
                      installedVersion: {
                        dataTransform: function dataTransform(data) {
                          switch (data) {
                            case "false":
                              return "-";
                            default:
                              return data;
                          }
                        }
                      }
                    }
                  };
                  if (!_this.argv.quiet) {
                    data = _this.__P_484_1[repo]
                    // shallow copy
                    .map(function (row) {
                      return Object.assign({}, row);
                    })
                    // sort
                    .sort(function (a, b) {
                      return a.name.localeCompare(b.name);
                    });
                    pretty = data
                    // another shallow copy
                    .map(function (row) {
                      return Object.assign({}, row);
                    })
                    // clean up and omit redundant cell values
                    .map(function (row, index) {
                      delete row.manifest;
                      if (index) {
                        var previousRow = data[index - 1];
                        var _iterator = _createForOfIteratorHelper(Object.getOwnPropertyNames(row).reverse()),
                          _step;
                        try {
                          for (_iterator.s(); !(_step = _iterator.n()).done;) {
                            var key = _step.value;
                            if (["compatibility", "required_qx_version"].indexOf(key) > -1) {
                              continue;
                            }
                            if (row[key] === previousRow[key] && row.name === previousRow.name) {
                              row[key] = "";
                            }
                          }
                        } catch (err) {
                          _iterator.e(err);
                        } finally {
                          _iterator.f();
                        }
                      }
                      return row;
                    }); // output list
                    if (_this.argv.json) {
                      // as JSON
                      qx.tool.compiler.Console.info(JSON.stringify(data, null, 2));
                    } else {
                      qx.tool.compiler.Console.info(columnify(pretty, _columnify_options));
                    }
                  }
                } else if (_this.argv.verbose) {
                  qx.tool.compiler.Console.info("Repository ".concat(repo, " does not contain suitable qooxdoo libraries."));
                }
                return _context.a(2);
              case 9:
                if (_this.argv.urisOnly) {
                  columns = ["uri"];
                  _this.argv.noheaders = true;
                  _this.argv.libraries = true;
                } else if (_this.argv["short"]) {
                  columns = ["uri", "installedVersion", "latestVersion", "latestCompatible"];
                } else {
                  columns = ["uri", "name", "description", "installedVersion", "latestVersion", "latestCompatible"];
                }
                if (_this.argv.namespace || _this.argv.installed) {
                  columns.splice(1, 0, "namespace");
                }
                columnify_options = {
                  showHeaders: !_this.argv.noheaders,
                  columnSplitter: "   ",
                  columns: columns,
                  config: {
                    name: {
                      maxWidth: 25
                    },
                    description: {
                      maxWidth: 60
                    },
                    installedVersion: {
                      headingTransform: function headingTransform() {
                        return "INSTALLED";
                      },
                      dataTransform: function dataTransform(data) {
                        return data === "false" ? "" : data;
                      }
                    },
                    latestVersion: {
                      headingTransform: function headingTransform() {
                        return "LATEST";
                      },
                      dataTransform: function dataTransform(data) {
                        return data === "false" ? "-" : data;
                      }
                    },
                    latestCompatible: {
                      headingTransform: function headingTransform() {
                        return "COMPATIBLE";
                      },
                      dataTransform: function dataTransform(data) {
                        return data === "false" ? "-" : data;
                      }
                    }
                  }
                }; // filter by compatibility unless --all
                list = _this.argv.all ? _this.__P_484_0 : _this.__P_484_0.filter(function (item) {
                  return item.latestCompatible || _this.argv.installed && item.name === localPathRepoName;
                }); // sort
                list.sort(function (l, r) {
                  l = l.name.toLowerCase();
                  r = r.name.toLowerCase();
                  return l < r ? -1 : l > r ? 1 : 0;
                });
                // list all libraries contained in a repo
                expanded_list = [];
                _iterator2 = _createForOfIteratorHelper(list);
                _context.p = 10;
                _iterator2.s();
              case 11:
                if ((_step2 = _iterator2.n()).done) {
                  _context.n = 22;
                  break;
                }
                _repo = _step2.value;
                repo_libs = [];
                if (qx.lang.Type.isArray(_this.__P_484_1[_repo.name])) {
                  _context.n = 12;
                  break;
                }
                return _context.a(3, 21);
              case 12:
                _iterator3 = _createForOfIteratorHelper(_this.__P_484_1[_repo.name]);
                _context.p = 13;
                _iterator3.s();
              case 14:
                if ((_step3 = _iterator3.n()).done) {
                  _context.n = 17;
                  break;
                }
                library = _step3.value;
                if (semver.valid(library.version)) {
                  _context.n = 15;
                  break;
                }
                if (_this.argv.verbose) {
                  qx.tool.compiler.Console.warn(">>> Ignoring '".concat(_repo.name, "' ").concat(library.name, "': invalid version format '").concat(library.version, "'."));
                }
                return _context.a(3, 16);
              case 15:
                if (_repo.name === localPathRepoName || semver.eq(library.version, _repo.latestVersion)) {
                  uri = _repo.name === qx.tool.cli.commands["package"].List.localPathRepoName ? library.path : path.join(_repo.name, library.path || "");
                  repo_libs.push({
                    type: "library",
                    uri: uri,
                    namespace: library.namespace,
                    name: library.name,
                    description: library.summary || _repo.description,
                    installedVersion: library.installedVersion,
                    latestVersion: _repo.latestVersion,
                    latestCompatible: _repo.latestCompatible,
                    manifest: library.manifest
                  });
                }
              case 16:
                _context.n = 14;
                break;
              case 17:
                _context.n = 19;
                break;
              case 18:
                _context.p = 18;
                _t2 = _context.v;
                _iterator3.e(_t2);
              case 19:
                _context.p = 19;
                _iterator3.f();
                return _context.f(19);
              case 20:
                // add title to multiple-library repos
                if (repo_libs.length > 1 && !(_this.argv.libraries || _this.argv["short"] || _repo.name === localPathRepoName)) {
                  expanded_list.push({
                    type: "repository",
                    uri: _repo.name,
                    name: "",
                    description: _repo.description,
                    installedVersion: "",
                    latestVersion: _repo.latestVersion,
                    latestCompatible: _repo.latestCompatible
                  });
                  if (!_this.argv.json && !_this.argv.installed && !_this.argv.match && !_this.argv.urisOnly) {
                    // add an indent to group libraries in a repository
                    repo_libs = repo_libs.map(function (lib) {
                      lib.uri = "| " + lib.uri;
                      return lib;
                    });
                  }
                }
                expanded_list = expanded_list.concat(repo_libs);
              case 21:
                _context.n = 11;
                break;
              case 22:
                _context.n = 24;
                break;
              case 23:
                _context.p = 23;
                _t3 = _context.v;
                _iterator2.e(_t3);
              case 24:
                _context.p = 24;
                _iterator2.f();
                return _context.f(24);
              case 25:
                // filter by regular expression if requested
                if (_this.argv.match) {
                  exp = new RegExp(_this.argv.match, "i");
                  expanded_list = expanded_list.filter(function (lib) {
                    return lib.uri.match(exp) || lib.name.match(exp) || lib.description.match(exp);
                  });
                }

                // show only installed libraries if requested
                if (_this.argv.installed) {
                  expanded_list = expanded_list.filter(function (lib) {
                    return Boolean(lib.installedVersion);
                  });
                }

                // output list
                if (_this.argv.json) {
                  // as JSON
                  qx.tool.compiler.Console.info(JSON.stringify(expanded_list, null, 2));
                } else if (!_this.argv.quiet) {
                  // as columns
                  qx.tool.compiler.Console.info(columnify(expanded_list, columnify_options));
                  if (!_this.argv.noheaders) {
                    qx.tool.compiler.Console.info();
                    qx.tool.compiler.Console.info("Note on columns: LATEST: Latest release that can be installed with this CLI;");
                    qx.tool.compiler.Console.info("                 COMPATIBLE: Latest release that is semver-compatible with the qooxdoo version used.");
                    if (!_this.argv.all) {
                      qx.tool.compiler.Console.info("To see all libraries, including potentially incompatible ones, use 'qx package list --all'.");
                    }
                  }
                }

                // save to cache
                _this.getCache().compat[qxVersion] = _this.__P_484_2[qxVersion];
                _context.n = 26;
                return _this.saveCache();
              case 26:
                return _context.a(2);
            }
          }, _callee, null, [[13, 18, 19, 20], [10, 23, 24, 25], [2, 4]]);
        }))();
      }),
      /**
       * compatibility indexes
       */
      __P_484_0: null,
      __P_484_1: null,
      __P_484_2: null,
      /**
       * Create compatibilty indexes of repositories and the contained libraries
       * @param qooxdoo_version {String} The qooxdoo version to check compatibiity with
       * @return {Number} The number of repositories containing compatible libraries
       */
      __P_484_3: function __P_484_3(qooxdoo_version) {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var localPathRepoName, libData, _iterator4, _step4, lib, manifest_path, manifest, info, repos_cache, num_compat_repos, _iterator5, _step5, repo_name, repo_data, d, tag_names, description, hasCompatibleRelease, latestVersion, repoInstalledVersion, _iterator6, _step6, tag_name, release_data, prerelease, manifests, _iterator7, _step7, _manifest, qx_versions, _info, provides, _manifest_path, installedVersion, library_name, version, tag_version, installed, _lib, compatibility, latestCompatibleRelease, latestCompatibleVersion, _t4, _t5, _t6, _t7;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                if (!_this2.argv.installed) {
                  _context2.n = 9;
                  break;
                }
                // local libraries
                localPathRepoName = qx.tool.cli.commands["package"].List.localPathRepoName;
                _this2.__P_484_0.push({
                  name: localPathRepoName,
                  description: "Libraries on local filesystem"
                });
                _this2.__P_484_1[localPathRepoName] = [];
                _context2.n = 1;
                return _this2.getLockfileData();
              case 1:
                libData = _context2.v;
                _iterator4 = _createForOfIteratorHelper(libData.libraries);
                _context2.p = 2;
                _iterator4.s();
              case 3:
                if ((_step4 = _iterator4.n()).done) {
                  _context2.n = 6;
                  break;
                }
                lib = _step4.value;
                if (lib.repo_name) {
                  _context2.n = 5;
                  break;
                }
                manifest_path = path.join(process.cwd(), lib.path, qx.tool.config.Manifest.config.fileName);
                _context2.n = 4;
                return qx.tool.utils.Json.loadJsonAsync(manifest_path);
              case 4:
                manifest = _context2.v;
                info = manifest.info;
                _this2.__P_484_1[localPathRepoName].push({
                  name: info.name,
                  namespace: manifest.provides.namespace,
                  summary: info.summary,
                  version: "v" + info.version,
                  compatibility: semver.satisfies(qooxdoo_version, manifest.requires["qooxdoo-sdk"], true),
                  path: path.relative(process.cwd(), path.dirname(manifest_path)),
                  installedVersion: "v" + info.version,
                  manifest: manifest
                });
              case 5:
                _context2.n = 3;
                break;
              case 6:
                _context2.n = 8;
                break;
              case 7:
                _context2.p = 7;
                _t4 = _context2.v;
                _iterator4.e(_t4);
              case 8:
                _context2.p = 8;
                _iterator4.f();
                return _context2.f(8);
              case 9:
                // repositories
                repos_cache = _this2.getCache().repos;
                num_compat_repos = 0;
                if (_this2.__P_484_2[qooxdoo_version] === undefined) {
                  _this2.__P_484_2[qooxdoo_version] = {};
                }

                // iterate over repositories
                _iterator5 = _createForOfIteratorHelper(repos_cache.list);
                _context2.p = 10;
                _iterator5.s();
              case 11:
                if ((_step5 = _iterator5.n()).done) {
                  _context2.n = 33;
                  break;
                }
                repo_name = _step5.value;
                repo_data = repos_cache.data[repo_name]; // filter out repositories that are deprecated or should not be listed unless --all
                d = repo_data.description;
                if (!(!_this2.argv.all && d && (d.includes("(deprecated)") || d.includes("(unlisted)")))) {
                  _context2.n = 12;
                  break;
                }
                if (_this2.argv.verbose) {
                  qx.tool.compiler.Console.warn(">>> Ignoring ".concat(repo_name, ": Deprecated or unlisted. "));
                }
                return _context2.a(3, 32);
              case 12:
                tag_names = repo_data.releases.list;
                description = repo_data.description;
                hasCompatibleRelease = false;
                latestVersion = false;
                repoInstalledVersion = false; // iterate over releases
                _iterator6 = _createForOfIteratorHelper(tag_names);
                _context2.p = 13;
                _iterator6.s();
              case 14:
                if ((_step6 = _iterator6.n()).done) {
                  _context2.n = 28;
                  break;
                }
                tag_name = _step6.value;
                release_data = repo_data.releases.data[tag_name];
                prerelease = release_data.prerelease, manifests = release_data.manifests; // iterate over library manifests in that release
                _iterator7 = _createForOfIteratorHelper(manifests);
                _context2.p = 15;
                _iterator7.s();
              case 16:
                if ((_step7 = _iterator7.n()).done) {
                  _context2.n = 24;
                  break;
                }
                _manifest = _step7.value;
                qx_versions = _manifest.qx_versions, _info = _manifest.info, provides = _manifest.provides, _manifest_path = _manifest.path;
                installedVersion = false;
                if (!(_info === undefined)) {
                  _context2.n = 17;
                  break;
                }
                if (_this2.argv.verbose) {
                  qx.tool.compiler.Console.warn(">>> Ignoring ".concat(repo_name, " ").concat(tag_name, ": Undefined info field. "));
                }
                return _context2.a(3, 23);
              case 17:
                // library version MUST match tag name (which can be longer, for example with pre-release info (alpha, beta, pre, rc etc)
                library_name = _info.name;
                version = _info.version;
                tag_version = tag_name.replace(/v/, "");
                if (!(version !== tag_version.substr(0, version.length))) {
                  _context2.n = 18;
                  break;
                }
                if (_this2.argv.verbose) {
                  qx.tool.compiler.Console.warn(">>> Ignoring ".concat(repo_name, " ").concat(tag_name, ", library '").concat(library_name, "': mismatch between tag version '").concat(tag_version, "' and library version '").concat(version, "'."));
                }
                return _context2.a(3, 23);
              case 18:
                // save latest version
                try {
                  if (!latestVersion || semver.gt(version, latestVersion, true)) {
                    latestVersion = tag_name;
                  }
                } catch (e) {
                  if (_this2.argv.verbose) {
                    qx.tool.compiler.Console.warn(">>> Ignoring ".concat(repo_name, " ").concat(tag_name, ", library '").concat(library_name, "': invalid version format '").concat(version, "'."));
                  }
                }

                // installed from GitHub?
                _context2.n = 19;
                return _this2.getInstalledLibraryTag(repo_name, library_name);
              case 19:
                installed = _context2.v;
                if (!installed) {
                  _context2.n = 20;
                  break;
                }
                installedVersion = installed;
                repoInstalledVersion = installed;
                _context2.n = 22;
                break;
              case 20:
                _context2.n = 21;
                return _this2.getInstalledLibraryData(library_name);
              case 21:
                _lib = _context2.v;
                if (_lib) {
                  installedVersion = "v" + _lib.library_version;
                }
              case 22:
                // check compatibility of library
                compatibility = semver.satisfies(qooxdoo_version, qx_versions, true); // prepare indexes
                if (_this2.__P_484_1[repo_name] === undefined) {
                  _this2.__P_484_1[repo_name] = [];
                }

                // use the latest compatible release, i.e the one that satisfies the following conditions:
                // 1) must be semver-compatible with the qooxdoo version
                // 2) must be the higher than any other version found so far
                // 3) should not be a pre-release unless there are no other compatible releases
                latestCompatibleRelease = _this2.__P_484_2[qooxdoo_version][repo_name];
                latestCompatibleVersion = latestCompatibleRelease ? latestCompatibleRelease.replace(/v/, "") : undefined;
                if (compatibility === true && (latestCompatibleRelease === undefined || semver.gt(tag_version, latestCompatibleVersion, false) && (!prerelease || _this2.argv.prereleases))) {
                  _this2.__P_484_2[qooxdoo_version][repo_name] = tag_name;
                  hasCompatibleRelease = true;
                }

                // save data
                _this2.__P_484_1[repo_name].push({
                  name: _info.name,
                  namespace: provides ? provides.namespace : "",
                  summary: _info.summary,
                  version: version,
                  compatibility: compatibility,
                  required_qx_version: qx_versions,
                  path: path.dirname(_manifest_path),
                  installedVersion: installedVersion,
                  manifest: _manifest
                });
              case 23:
                _context2.n = 16;
                break;
              case 24:
                _context2.n = 26;
                break;
              case 25:
                _context2.p = 25;
                _t5 = _context2.v;
                _iterator7.e(_t5);
              case 26:
                _context2.p = 26;
                _iterator7.f();
                return _context2.f(26);
              case 27:
                _context2.n = 14;
                break;
              case 28:
                _context2.n = 30;
                break;
              case 29:
                _context2.p = 29;
                _t6 = _context2.v;
                _iterator6.e(_t6);
              case 30:
                _context2.p = 30;
                _iterator6.f();
                return _context2.f(30);
              case 31:
                if (hasCompatibleRelease) {
                  num_compat_repos++;
                }

                // add to list
                _this2.__P_484_0.push({
                  name: repo_name,
                  description: description,
                  installedVersion: repoInstalledVersion,
                  latestVersion: latestVersion,
                  latestCompatible: hasCompatibleRelease ? _this2.__P_484_2[qooxdoo_version][repo_name] : false
                });
              case 32:
                _context2.n = 11;
                break;
              case 33:
                _context2.n = 35;
                break;
              case 34:
                _context2.p = 34;
                _t7 = _context2.v;
                _iterator5.e(_t7);
              case 35:
                _context2.p = 35;
                _iterator5.f();
                return _context2.f(35);
              case 36:
                return _context2.a(2, num_compat_repos);
            }
          }, _callee2, null, [[15, 25, 26, 27], [13, 29, 30, 31], [10, 34, 35, 36], [2, 7, 8, 9]]);
        }))();
      }
    }
  });
  qx.tool.cli.commands["package"].List.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=List.js.map?dt=1782705792900