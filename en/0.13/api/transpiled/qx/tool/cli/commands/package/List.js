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
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var localPathRepoName, repos_cache, qxVersion, num_compat_repos, repo, _columnify_options, data, pretty, columns, columnify_options, list, expanded_list, _iterator2, _step2, _repo, repo_libs, _iterator3, _step3, library, uri, exp;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return qx.tool.cli.commands["package"].List.superclass.prototype.process.call(_this);
              case 2:
                _this.__P_474_0 = [];
                _this.__P_474_1 = {};
                _this.__P_474_2 = {};
                localPathRepoName = qx.tool.cli.commands["package"].List.localPathRepoName;
                repos_cache = _this.getCache().repos; // implicit qx package update, disabled
                // if (repos_cache.list.length === 0 || this.getCache().version !== qx.tool.config.Lockfile.getInstance().getVersion()) {
                //   await (new qx.tool.cli.commands.package.Update({quiet:true})).process();
                // }
                _context.prev = 7;
                _context.next = 10;
                return _this.getAppQxVersion();
              case 10:
                qxVersion = _context.sent;
                _context.next = 17;
                break;
              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](7);
                qx.tool.compiler.Console.error("Cannot determine a qooxdoo version to show packages only for this version, because you are not in a project directory.");
                process.exit(1);
              case 17:
                _context.next = 19;
                return _this.__P_474_3(qxVersion);
              case 19:
                num_compat_repos = _context.sent;
                if (_this.argv.verbose) {
                  _this.debug(">>> We have ".concat(num_compat_repos, " packages compatible with qooxdoo version ").concat(qxVersion));
                }
                if (!(num_compat_repos === 0 && !_this.argv.all && !_this.argv.quiet)) {
                  _context.next = 24;
                  break;
                }
                qx.tool.compiler.Console.info("Currently, no packages compatible with qooxdoo version ".concat(qxVersion, " exist."));
                return _context.abrupt("return");
              case 24:
                // detailed repo information
                repo = _this.argv.repository;
                if (!repo) {
                  _context.next = 30;
                  break;
                }
                if (repos_cache.list.includes(repo)) {
                  _context.next = 28;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Repository ".concat(repo, " does not exist or is not a qooxdoo package repo."));
              case 28:
                if (_this.__P_474_1[repo] && _this.__P_474_1[repo].length) {
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
                    data = _this.__P_474_1[repo]
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
                return _context.abrupt("return");
              case 30:
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
                list = _this.argv.all ? _this.__P_474_0 : _this.__P_474_0.filter(function (item) {
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
                _context.prev = 37;
                _iterator2.s();
              case 39:
                if ((_step2 = _iterator2.n()).done) {
                  _context.next = 67;
                  break;
                }
                _repo = _step2.value;
                repo_libs = [];
                if (qx.lang.Type.isArray(_this.__P_474_1[_repo.name])) {
                  _context.next = 44;
                  break;
                }
                return _context.abrupt("continue", 65);
              case 44:
                _iterator3 = _createForOfIteratorHelper(_this.__P_474_1[_repo.name]);
                _context.prev = 45;
                _iterator3.s();
              case 47:
                if ((_step3 = _iterator3.n()).done) {
                  _context.next = 55;
                  break;
                }
                library = _step3.value;
                if (semver.valid(library.version)) {
                  _context.next = 52;
                  break;
                }
                if (_this.argv.verbose) {
                  qx.tool.compiler.Console.warn(">>> Ignoring '".concat(_repo.name, "' ").concat(library.name, "': invalid version format '").concat(library.version, "'."));
                }
                return _context.abrupt("continue", 53);
              case 52:
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
              case 53:
                _context.next = 47;
                break;
              case 55:
                _context.next = 60;
                break;
              case 57:
                _context.prev = 57;
                _context.t1 = _context["catch"](45);
                _iterator3.e(_context.t1);
              case 60:
                _context.prev = 60;
                _iterator3.f();
                return _context.finish(60);
              case 63:
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
              case 65:
                _context.next = 39;
                break;
              case 67:
                _context.next = 72;
                break;
              case 69:
                _context.prev = 69;
                _context.t2 = _context["catch"](37);
                _iterator2.e(_context.t2);
              case 72:
                _context.prev = 72;
                _iterator2.f();
                return _context.finish(72);
              case 75:
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
                _this.getCache().compat[qxVersion] = _this.__P_474_2[qxVersion];
                _context.next = 81;
                return _this.saveCache();
              case 81:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[7, 13], [37, 69, 72, 75], [45, 57, 60, 63]]);
        }))();
      }),
      /**
       * compatibility indexes
       */
      __P_474_0: null,
      __P_474_1: null,
      __P_474_2: null,
      /**
       * Create compatibilty indexes of repositories and the contained libraries
       * @param qooxdoo_version {String} The qooxdoo version to check compatibiity with
       * @return {Number} The number of repositories containing compatible libraries
       */
      __P_474_3: function __P_474_3(qooxdoo_version) {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var localPathRepoName, libData, _iterator4, _step4, lib, manifest_path, manifest, info, repos_cache, num_compat_repos, _iterator5, _step5, repo_name, repo_data, d, tag_names, description, hasCompatibleRelease, latestVersion, repoInstalledVersion, _iterator6, _step6, tag_name, release_data, prerelease, manifests, _iterator7, _step7, _manifest, qx_versions, _info, provides, _manifest_path, installedVersion, library_name, version, tag_version, installed, _lib, compatibility, latestCompatibleRelease, latestCompatibleVersion;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                if (!_this2.argv.installed) {
                  _context2.next = 29;
                  break;
                }
                // local libraries
                localPathRepoName = qx.tool.cli.commands["package"].List.localPathRepoName;
                _this2.__P_474_0.push({
                  name: localPathRepoName,
                  description: "Libraries on local filesystem"
                });
                _this2.__P_474_1[localPathRepoName] = [];
                _context2.next = 6;
                return _this2.getLockfileData();
              case 6:
                libData = _context2.sent;
                _iterator4 = _createForOfIteratorHelper(libData.libraries);
                _context2.prev = 8;
                _iterator4.s();
              case 10:
                if ((_step4 = _iterator4.n()).done) {
                  _context2.next = 21;
                  break;
                }
                lib = _step4.value;
                if (lib.repo_name) {
                  _context2.next = 19;
                  break;
                }
                manifest_path = path.join(process.cwd(), lib.path, qx.tool.config.Manifest.config.fileName);
                _context2.next = 16;
                return qx.tool.utils.Json.loadJsonAsync(manifest_path);
              case 16:
                manifest = _context2.sent;
                info = manifest.info;
                _this2.__P_474_1[localPathRepoName].push({
                  name: info.name,
                  namespace: manifest.provides.namespace,
                  summary: info.summary,
                  version: "v" + info.version,
                  compatibility: semver.satisfies(qooxdoo_version, manifest.requires["qooxdoo-sdk"], true),
                  path: path.relative(process.cwd(), path.dirname(manifest_path)),
                  installedVersion: "v" + info.version,
                  manifest: manifest
                });
              case 19:
                _context2.next = 10;
                break;
              case 21:
                _context2.next = 26;
                break;
              case 23:
                _context2.prev = 23;
                _context2.t0 = _context2["catch"](8);
                _iterator4.e(_context2.t0);
              case 26:
                _context2.prev = 26;
                _iterator4.f();
                return _context2.finish(26);
              case 29:
                // repositories
                repos_cache = _this2.getCache().repos;
                num_compat_repos = 0;
                if (_this2.__P_474_2[qooxdoo_version] === undefined) {
                  _this2.__P_474_2[qooxdoo_version] = {};
                }

                // iterate over repositories
                _iterator5 = _createForOfIteratorHelper(repos_cache.list);
                _context2.prev = 33;
                _iterator5.s();
              case 35:
                if ((_step5 = _iterator5.n()).done) {
                  _context2.next = 113;
                  break;
                }
                repo_name = _step5.value;
                repo_data = repos_cache.data[repo_name]; // filter out repositories that are deprecated or should not be listed unless --all
                d = repo_data.description;
                if (!(!_this2.argv.all && d && (d.includes("(deprecated)") || d.includes("(unlisted)")))) {
                  _context2.next = 42;
                  break;
                }
                if (_this2.argv.verbose) {
                  qx.tool.compiler.Console.warn(">>> Ignoring ".concat(repo_name, ": Deprecated or unlisted. "));
                }
                return _context2.abrupt("continue", 111);
              case 42:
                tag_names = repo_data.releases.list;
                description = repo_data.description;
                hasCompatibleRelease = false;
                latestVersion = false;
                repoInstalledVersion = false; // iterate over releases
                _iterator6 = _createForOfIteratorHelper(tag_names);
                _context2.prev = 48;
                _iterator6.s();
              case 50:
                if ((_step6 = _iterator6.n()).done) {
                  _context2.next = 101;
                  break;
                }
                tag_name = _step6.value;
                release_data = repo_data.releases.data[tag_name];
                prerelease = release_data.prerelease, manifests = release_data.manifests; // iterate over library manifests in that release
                _iterator7 = _createForOfIteratorHelper(manifests);
                _context2.prev = 55;
                _iterator7.s();
              case 57:
                if ((_step7 = _iterator7.n()).done) {
                  _context2.next = 91;
                  break;
                }
                _manifest = _step7.value;
                qx_versions = _manifest.qx_versions, _info = _manifest.info, provides = _manifest.provides, _manifest_path = _manifest.path;
                installedVersion = false;
                if (!(_info === undefined)) {
                  _context2.next = 64;
                  break;
                }
                if (_this2.argv.verbose) {
                  qx.tool.compiler.Console.warn(">>> Ignoring ".concat(repo_name, " ").concat(tag_name, ": Undefined info field. "));
                }
                return _context2.abrupt("continue", 89);
              case 64:
                // library version MUST match tag name (which can be longer, for example with pre-release info (alpha, beta, pre, rc etc)
                library_name = _info.name;
                version = _info.version;
                tag_version = tag_name.replace(/v/, "");
                if (!(version !== tag_version.substr(0, version.length))) {
                  _context2.next = 70;
                  break;
                }
                if (_this2.argv.verbose) {
                  qx.tool.compiler.Console.warn(">>> Ignoring ".concat(repo_name, " ").concat(tag_name, ", library '").concat(library_name, "': mismatch between tag version '").concat(tag_version, "' and library version '").concat(version, "'."));
                }
                return _context2.abrupt("continue", 89);
              case 70:
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
                _context2.next = 73;
                return _this2.getInstalledLibraryTag(repo_name, library_name);
              case 73:
                installed = _context2.sent;
                if (!installed) {
                  _context2.next = 79;
                  break;
                }
                installedVersion = installed;
                repoInstalledVersion = installed;
                _context2.next = 83;
                break;
              case 79:
                _context2.next = 81;
                return _this2.getInstalledLibraryData(library_name);
              case 81:
                _lib = _context2.sent;
                if (_lib) {
                  installedVersion = "v" + _lib.library_version;
                }
              case 83:
                // check compatibility of library
                compatibility = semver.satisfies(qooxdoo_version, qx_versions, true); // prepare indexes
                if (_this2.__P_474_1[repo_name] === undefined) {
                  _this2.__P_474_1[repo_name] = [];
                }

                // use the latest compatible release, i.e the one that satisfies the following conditions:
                // 1) must be semver-compatible with the qooxdoo version
                // 2) must be the higher than any other version found so far
                // 3) should not be a pre-release unless there are no other compatible releases
                latestCompatibleRelease = _this2.__P_474_2[qooxdoo_version][repo_name];
                latestCompatibleVersion = latestCompatibleRelease ? latestCompatibleRelease.replace(/v/, "") : undefined;
                if (compatibility === true && (latestCompatibleRelease === undefined || semver.gt(tag_version, latestCompatibleVersion, false) && (!prerelease || _this2.argv.prereleases))) {
                  _this2.__P_474_2[qooxdoo_version][repo_name] = tag_name;
                  hasCompatibleRelease = true;
                }

                // save data
                _this2.__P_474_1[repo_name].push({
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
              case 89:
                _context2.next = 57;
                break;
              case 91:
                _context2.next = 96;
                break;
              case 93:
                _context2.prev = 93;
                _context2.t1 = _context2["catch"](55);
                _iterator7.e(_context2.t1);
              case 96:
                _context2.prev = 96;
                _iterator7.f();
                return _context2.finish(96);
              case 99:
                _context2.next = 50;
                break;
              case 101:
                _context2.next = 106;
                break;
              case 103:
                _context2.prev = 103;
                _context2.t2 = _context2["catch"](48);
                _iterator6.e(_context2.t2);
              case 106:
                _context2.prev = 106;
                _iterator6.f();
                return _context2.finish(106);
              case 109:
                if (hasCompatibleRelease) {
                  num_compat_repos++;
                }

                // add to list
                _this2.__P_474_0.push({
                  name: repo_name,
                  description: description,
                  installedVersion: repoInstalledVersion,
                  latestVersion: latestVersion,
                  latestCompatible: hasCompatibleRelease ? _this2.__P_474_2[qooxdoo_version][repo_name] : false
                });
              case 111:
                _context2.next = 35;
                break;
              case 113:
                _context2.next = 118;
                break;
              case 115:
                _context2.prev = 115;
                _context2.t3 = _context2["catch"](33);
                _iterator5.e(_context2.t3);
              case 118:
                _context2.prev = 118;
                _iterator5.f();
                return _context2.finish(118);
              case 121:
                return _context2.abrupt("return", num_compat_repos);
              case 122:
              case "end":
                return _context2.stop();
            }
          }, _callee2, null, [[8, 23, 26, 29], [33, 115, 118, 121], [48, 103, 106, 109], [55, 93, 96, 99]]);
        }))();
      }
    }
  });
  qx.tool.cli.commands["package"].List.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=List.js.map?dt=1735222437578