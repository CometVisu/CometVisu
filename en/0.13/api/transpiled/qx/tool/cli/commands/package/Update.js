function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
      __P_477_0: null,
      /**
       * Updates the cache with information from GitHub.
       */
      process: function process() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var cfg, github, response, num_libraries;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                qx.tool.cli.commands["package"].Update.superclass.prototype.process.call(_this);

                // init
                _this.__P_477_0 = [];

                // export only
                if (!_this.argv.exportOnly) {
                  _context.next = 6;
                  break;
                }
                if (!_this.argv.file) {
                  qx.tool.compiler.Console.error("Path required via --file argument.");
                  _process.exit(1);
                }
                _this.exportCache(_this.argv.file);
                return _context.abrupt("return");
              case 6:
                if (!_this.argv.repository) {
                  _this.clearCache();
                }
                _context.next = 9;
                return qx.tool.cli.ConfigDb.getInstance();
              case 9:
                cfg = _context.sent;
                github = cfg.db("github", {}); // Create the cache
                if (_this.argv.search) {
                  _context.next = 16;
                  break;
                }
                _context.next = 14;
                return _this.updateFromRepository();
              case 14:
                _context.next = 27;
                break;
              case 16:
                if (github.token) {
                  _context.next = 25;
                  break;
                }
                _context.next = 19;
                return inquirer.prompt([{
                  type: "input",
                  name: "token",
                  message: "Searching GitHub requires an API token - visit https://github.com/settings/tokens to obtain one (you do not need to assign any permissions, just create a token);\nWhat is your GitHub API Token ? "
                }]);
              case 19:
                response = _context.sent;
                if (response.token) {
                  _context.next = 23;
                  break;
                }
                qx.tool.compiler.Console.error("You have not provided a GitHub token.");
                return _context.abrupt("return");
              case 23:
                github.token = response.token;
                cfg.save();
              case 25:
                _context.next = 27;
                return _this.updateFromGitHubAPI(github.token);
              case 27:
                num_libraries = _this.getCache().num_libraries;
                if (num_libraries && !_this.argv.quiet) {
                  qx.tool.compiler.Console.info("Found ".concat(num_libraries, " releases of libraries."));
                  qx.tool.compiler.Console.info("Run 'qx package list' in the root dir of your project to see which versions of these libraries are compatible.");
                }

                // save cache and export it if requested
                _context.next = 31;
                return _this.saveCache();
              case 31:
                if (!_this.argv.file) {
                  _context.next = 34;
                  break;
                }
                _context.next = 34;
                return _this.exportCache(_this.argv.file);
              case 34:
              case "end":
                return _context.stop();
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
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var url, fetch, res, data;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                if (!_this2.argv.quiet) {
                  qx.tool.compiler.Console.info("Downloading cache from GitHub ...");
                }
                url = _this2.getRepositoryCacheUrl();
                _context2.prev = 2;
                _context2.next = 5;
                return import("node-fetch");
              case 5:
                fetch = _context2.sent["default"];
                _context2.next = 8;
                return fetch(url);
              case 8:
                res = _context2.sent;
                _context2.next = 11;
                return res.json();
              case 11:
                data = _context2.sent;
                _this2.setCache(data);
                _context2.next = 18;
                break;
              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](2);
                throw new qx.tool.utils.Utils.UserError(_context2.t0.message);
              case 18:
              case "end":
                return _context2.stop();
            }
          }, _callee2, null, [[2, 15]]);
        }))();
      },
      /**
       * Updates the package cache from the GitHub Api
       * @param {String} token
       * @return {Promise<void>}
       */
      updateFromGitHubAPI: function updateFromGitHubAPI(token) {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var auth, search, num_libraries, query, result, result2, repos, repo_lookup, repos_data, _iterator, _step, repo, name, repository, releases_data, releases, versions, _iterator2, _step2, release, tag_name, _releases, manifests, qooxdoo_data, data, _iterator3, _step3, _step3$value, index, manifest, manifest_data, manifest_path, _data, qx_version_range, zip_url;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
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
                _context3.next = 8;
                return search.forRepositories({
                  q: query
                });
              case 8:
                result = _context3.sent;
                // backwards-compatibility
                query = "topic:qooxdoo-contrib fork:true";
                if (_this3.argv.repository) {
                  query += " " + _this3.argv.repository;
                }
                _context3.next = 13;
                return search.forRepositories({
                  q: query
                });
              case 13:
                result2 = _context3.sent;
                repos = result.data.concat(result2.data);
                repo_lookup = {};
                repos_data = _this3.getCache().repos.data; // iterate over repositories
                _iterator = _createForOfIteratorHelper(repos);
                _context3.prev = 18;
                _iterator.s();
              case 20:
                if ((_step = _iterator.n()).done) {
                  _context3.next = 131;
                  break;
                }
                repo = _step.value;
                name = repo.full_name; // already dealt with
                if (!repo_lookup[name]) {
                  _context3.next = 25;
                  break;
                }
                return _context3.abrupt("continue", 129);
              case 25:
                repo_lookup[name] = repo;
                // if a repository name has been given, only update this repo
                if (!(_this3.argv.repository && name !== _this3.argv.repository)) {
                  _context3.next = 28;
                  break;
                }
                return _context3.abrupt("continue", 129);
              case 28:
                if (_this3.argv.verbose) {
                  qx.tool.compiler.Console.info("### Found ".concat(name, " ..."));
                }
                _this3.__P_477_0.push(name);
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
                _context3.prev = 32;
                _context3.next = 35;
                return repository.listReleases();
              case 35:
                releases_data = _context3.sent;
                _context3.next = 42;
                break;
              case 38:
                _context3.prev = 38;
                _context3.t0 = _context3["catch"](32);
                qx.tool.compiler.Console.error("Error retrieving releases: " + _context3.t0);
                return _context3.abrupt("continue", 129);
              case 42:
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
                _context3.prev = 46;
                _iterator2.s();
              case 48:
                if ((_step2 = _iterator2.n()).done) {
                  _context3.next = 121;
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
                _context3.prev = 55;
                _context3.next = 58;
                return repository.getContents(tag_name, "qooxdoo.json", true);
              case 58:
                qooxdoo_data = _context3.sent;
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
                _context3.next = 68;
                break;
              case 65:
                _context3.prev = 65;
                _context3.t1 = _context3["catch"](55);
                // no qooxdoo.json
                if (_context3.t1.message.match(/404/)) {
                  if (_this3.argv.verbose) {
                    _this3.debug(">>> No qooxdoo.json");
                  }
                } else if (_this3.argv.verbose) {
                  qx.tool.compiler.Console.warn("!!! Error: ".concat(_context3.t1.message));
                }
              case 68:
                // create a list of libraries via their manifests
                _iterator3 = _createForOfIteratorHelper(manifests.entries());
                _context3.prev = 69;
                _iterator3.s();
              case 71:
                if ((_step3 = _iterator3.n()).done) {
                  _context3.next = 108;
                  break;
                }
                _step3$value = _slicedToArray(_step3.value, 2), index = _step3$value[0], manifest = _step3$value[1];
                manifest_data = void 0;
                manifest_path = path.join(manifest.path, qx.tool.config.Manifest.config.fileName);
                _context3.prev = 75;
                if (_this3.argv.verbose) {
                  _this3.debug(">>> Retrieving Manifest file '".concat(manifest_path, "' for ").concat(name, " ").concat(tag_name, "..."));
                }
                _context3.next = 79;
                return repository.getContents(tag_name, manifest_path, true);
              case 79:
                manifest_data = _context3.sent;
                _context3.next = 86;
                break;
              case 82:
                _context3.prev = 82;
                _context3.t2 = _context3["catch"](75);
                if (_context3.t2.message.match(/404/)) {
                  if (_this3.argv.verbose) {
                    qx.tool.compiler.Console.warn("!!!  File does not exist.");
                  }
                } else if (_this3.argv.verbose) {
                  qx.tool.compiler.Console.warn("!!! Error: ".concat(_context3.t2.message));
                }
                return _context3.abrupt("continue", 106);
              case 86:
                // retrieve compatible qooxdoo versions
                _data = manifest_data.data; // @todo check if the method can return JSON to save parsing
                if (!(typeof _data == "string")) {
                  _context3.next = 96;
                  break;
                }
                _context3.prev = 88;
                _data = qx.tool.utils.Json.parseJson(_data);
                _context3.next = 96;
                break;
              case 92:
                _context3.prev = 92;
                _context3.t3 = _context3["catch"](88);
                if (_this3.argv.verbose) {
                  qx.tool.compiler.Console.warn("!!! Parse error: ".concat(_context3.t3.message));
                  _this3.debug(_data);
                }
                return _context3.abrupt("continue", 106);
              case 96:
                qx_version_range = _data.requires && _data.requires["@qooxdoo/framework"];
                if (qx_version_range) {
                  _context3.next = 100;
                  break;
                }
                if (_this3.argv.verbose) {
                  qx.tool.compiler.Console.warn("!!! No valid qooxdoo version information in the manifest, skipping...");
                }
                return _context3.abrupt("continue", 106);
              case 100:
                if (semver.validRange(qx_version_range, {
                  loose: true
                })) {
                  _context3.next = 103;
                  break;
                }
                if (_this3.argv.verbose) {
                  qx.tool.compiler.Console.warn("!!! Invalid qooxdoo version information in the Manifest, skipping...");
                }
                return _context3.abrupt("continue", 106);
              case 103:
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
              case 106:
                _context3.next = 71;
                break;
              case 108:
                _context3.next = 113;
                break;
              case 110:
                _context3.prev = 110;
                _context3.t4 = _context3["catch"](69);
                _iterator3.e(_context3.t4);
              case 113:
                _context3.prev = 113;
                _iterator3.f();
                return _context3.finish(113);
              case 116:
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
              case 119:
                _context3.next = 48;
                break;
              case 121:
                _context3.next = 126;
                break;
              case 123:
                _context3.prev = 123;
                _context3.t5 = _context3["catch"](46);
                _iterator2.e(_context3.t5);
              case 126:
                _context3.prev = 126;
                _iterator2.f();
                return _context3.finish(126);
              case 129:
                _context3.next = 20;
                break;
              case 131:
                _context3.next = 136;
                break;
              case 133:
                _context3.prev = 133;
                _context3.t6 = _context3["catch"](18);
                _iterator.e(_context3.t6);
              case 136:
                _context3.prev = 136;
                _iterator.f();
                return _context3.finish(136);
              case 139:
                // end iteration over repos

                // wrap-up
                _this3.getCache().version = qx.tool.config.Lockfile.getInstance().getVersion();
                _this3.getCache().num_libraries = num_libraries;
                if (!_this3.argv.repository) {
                  _this3.getCache().repos.list = _this3.__P_477_0.sort();
                }
                if (!_this3.argv.quiet && !_this3.argv.verbose) {
                  _process.stdout.write("\n");
                }
              case 143:
              case "end":
                return _context3.stop();
            }
          }, _callee3, null, [[18, 133, 136, 139], [32, 38], [46, 123, 126, 129], [55, 65], [69, 110, 113, 116], [75, 82], [88, 92]]);
        }))();
      }
    }
  });
  qx.tool.cli.commands["package"].Update.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Update.js.map?dt=1735341787786