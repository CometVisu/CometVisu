function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
      "qx.tool.cli.ConfigDb": {},
      "qx.tool.config.Registry": {},
      "qx.tool.config.Abstract": {},
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
  var fs = require("fs");
  var path = require("upath");
  var _process = require("process");
  var _require = require("@octokit/rest"),
    Octokit = _require.Octokit;
  var semver = require("semver");
  var inquirer = require("inquirer");
  var glob = require("glob");

  /**
   * Publishes a release on GitHub
   */
  qx.Class.define("qx.tool.cli.commands.package.Publish", {
    extend: qx.tool.cli.commands.Package,
    statics: {
      getYargsCommand: function getYargsCommand() {
        return {
          command: "publish",
          describe: "publishes a new release of the package on GitHub. Requires a GitHub access token. By default, makes a patch release.",
          builder: {
            type: {
              alias: "t",
              describe: "Set the release type",
              nargs: 1,
              choices: "major,premajor,minor,preminor,patch,prepatch,prerelease".split(/,/),
              type: "string"
            },
            noninteractive: {
              alias: "I",
              type: "boolean",
              describe: "Do not prompt user"
            },
            "use-version": {
              alias: "V",
              type: "string",
              describe: "Use given version number"
            },
            prerelease: {
              type: "boolean",
              alias: "p",
              describe: "Publish as a prerelease (as opposed to a stable release)"
            },
            quiet: {
              type: "boolean",
              alias: "q",
              describe: "No output"
            },
            message: {
              alias: "m",
              type: "string",
              describe: "Set commit/release message"
            },
            dryrun: {
              type: "boolean",
              describe: "Deprecated. Use --dry-run"
            },
            "dry-run": {
              type: "boolean",
              alias: "d",
              describe: "Show result only, do not publish to GitHub"
            },
            force: {
              type: "boolean",
              alias: "f",
              describe: "Ignore warnings (such as demo check)"
            },
            "create-index": {
              type: "boolean",
              alias: "i",
              describe: "Create an index file (qooxdoo.json) with paths to Manifest.json files"
            },
            "qx-version": {
              type: "string",
              check: function check(argv) {
                return semver.valid(argv.qxVersion);
              },
              describe: "A semver string. If given, the qooxdoo version for which to publish the package"
            },
            breaking: {
              type: "boolean",
              describe: "Do not create a backwards-compatible release, i.e. allow compatibility with current version only"
            },
            "qx-version-range": {
              type: "string",
              describe: "A semver range. If given, it overrides --qx-version and --breaking and sets this specific version range"
            }
          }
        };
      }
    },
    events: {
      /**
       * Fired before commit happens. Data is an object with
       *   version: new_version,
       *   argv: this.argv
       */
      beforeCommit: "qx.event.type.Data"
    },
    members: {
      /**
       * Publishes a new release of the package on GitHub, by executing the following steps:
       *
       * 1. In Manifest.json, update the qooxdoo-range value to include the version of the qooxdoo
       *    framework (As per package.json).
       * 2. In Manifest.json, based the given options, increment the version number (patch,
       *    feature, breaking).
       * 3. Create a release with the tag vX.Y.Z according to the current version.
       * 4. Add "qooxdoo-package" to the list of GitHub topics.
       *
       */
      process: function process() {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var argv, qxVersion, status, cfg, github, response, token, octokit, libraries, version, manifestModels, mainManifestModel, cwd, registryModel, _iterator, _step, library, manifestModel, old_version, new_version, tag, url, repo_name, _repo_name$split, _repo_name$split2, owner, repo, repoExists, result, topics, semver_range, doRelease, question, answer, _i, _manifestModels, _manifestModel, package_json_path, data, message, _question, _answer, run, release_data, topic;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return qx.tool.cli.commands["package"].Publish.superclass.prototype.process.call(_this);
              case 2:
                // init
                argv = _this.argv;
                if (argv.dryrun) {
                  qx.tool.compiler.Console.info('The "--dryrun" option is deprecated. Please use "--dry-run" instead.');
                  argv.dryRun = true;
                }

                // qooxdoo version
                _context.next = 6;
                return _this.getQxVersion();
              case 6:
                qxVersion = _context.sent;
                if (!fs.existsSync("Manifest.json")) {
                  _context.next = 11;
                  break;
                }
                _context.next = 10;
                return _this.getAppQxVersion();
              case 10:
                qxVersion = _context.sent;
              case 11:
                if (argv.verbose) {
                  _this.info("Using qooxdoo version:  ".concat(qxVersion));
                }

                // check git status
                _context.prev = 12;
                _context.next = 15;
                return qx.tool.utils.Utils.exec("git status --porcelain");
              case 15:
                status = _context.sent;
                _context.next = 21;
                break;
              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](12);
                throw new qx.tool.utils.Utils.UserError("Cannot determine remote repository.");
              case 21:
                _this.debug(status);
                if (!(status.trim() !== "")) {
                  _context.next = 24;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Please commit or stash all remaining changes first.");
              case 24:
                _context.next = 26;
                return qx.tool.utils.Utils.exec("git status --porcelain --branch");
              case 26:
                status = _context.sent;
                _this.debug(status);
                if (!status.includes("ahead")) {
                  _context.next = 30;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Please push all local commits to GitHub first.");
              case 30:
                _context.next = 32;
                return qx.tool.cli.ConfigDb.getInstance();
              case 32:
                cfg = _context.sent;
                github = cfg.db("github", {});
                if (github.token) {
                  _context.next = 43;
                  break;
                }
                _context.next = 37;
                return inquirer.prompt([{
                  type: "input",
                  name: "token",
                  message: "Publishing to GitHub requires an API token - visit https://github.com/settings/tokens to obtain one (you must assign permission to publish);\nWhat is your GitHub API Token ? "
                }]);
              case 37:
                response = _context.sent;
                if (response.token) {
                  _context.next = 41;
                  break;
                }
                qx.tool.compiler.Console.error("You have not provided a GitHub token.");
                return _context.abrupt("return");
              case 41:
                github.token = response.token;
                cfg.save();
              case 43:
                token = github.token;
                if (token) {
                  _context.next = 46;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("GitHub access token required.");
              case 46:
                octokit = new Octokit({
                  auth: token
                }); // create index file first?
                if (!argv.i) {
                  _context.next = 50;
                  break;
                }
                _context.next = 50;
                return _this.__P_474_0(argv);
              case 50:
                manifestModels = [];
                cwd = _process.cwd();
                registryModel = qx.tool.config.Registry.getInstance();
                _context.next = 55;
                return registryModel.exists();
              case 55:
                if (!_context.sent) {
                  _context.next = 81;
                  break;
                }
                _context.next = 58;
                return registryModel.load();
              case 58:
                libraries = registryModel.getValue("libraries");
                _iterator = _createForOfIteratorHelper(libraries);
                _context.prev = 60;
                _iterator.s();
              case 62:
                if ((_step = _iterator.n()).done) {
                  _context.next = 71;
                  break;
                }
                library = _step.value;
                _context.next = 66;
                return new qx.tool.config.Abstract(qx.tool.config.Manifest.config).set({
                  baseDir: path.join(cwd, library.path)
                }).load();
              case 66:
                manifestModel = _context.sent;
                manifestModels.push(manifestModel);
                // use the first manifest or the one with a truthy property "main" as reference
                if (!version || library.main) {
                  version = manifestModel.getValue("info.version");
                  mainManifestModel = manifestModel;
                }
              case 69:
                _context.next = 62;
                break;
              case 71:
                _context.next = 76;
                break;
              case 73:
                _context.prev = 73;
                _context.t1 = _context["catch"](60);
                _iterator.e(_context.t1);
              case 76:
                _context.prev = 76;
                _iterator.f();
                return _context.finish(76);
              case 79:
                _context.next = 88;
                break;
              case 81:
                _context.next = 83;
                return qx.tool.config.Manifest.getInstance().load();
              case 83:
                mainManifestModel = _context.sent;
                manifestModels.push(mainManifestModel);
                // prevent accidental publication of demo manifest.
                if (!(!argv.force && mainManifestModel.getValue("provides.namespace").includes(".demo"))) {
                  _context.next = 87;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("This seems to be the library demo. Please go into the library root directory to publish the library.");
              case 87:
                libraries = [{
                  path: "."
                }];
              case 88:
                // version
                old_version = mainManifestModel.getValue("info.version");
                if (!argv.useVersion) {
                  _context.next = 96;
                  break;
                }
                // use user-supplied value
                new_version = semver.coerce(argv.useVersion);
                if (new_version) {
                  _context.next = 93;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("".concat(argv.useVersion, " is not a valid version number."));
              case 93:
                new_version = new_version.toString();
                _context.next = 101;
                break;
              case 96:
                if (semver.valid(old_version)) {
                  _context.next = 98;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Invalid version number in Manifest. Must be a valid semver version (x.y.z).");
              case 98:
                if (!argv.type) {
                  argv.type = semver.prerelease(old_version) ? "prerelease" : "patch";
                }
                argv.prerelease = Boolean(argv.prerelease) || argv.type === "prerelease" || argv.type === "prepatch" || argv.type === "preminor" || argv.type === "premajor";
                new_version = semver.inc(old_version, argv.type);
              case 101:
                // tag and repo name
                tag = "v".concat(new_version);
                _context.prev = 102;
                _context.next = 105;
                return qx.tool.utils.Utils.exec("git config --get remote.origin.url");
              case 105:
                url = _context.sent.trim();
                _context.next = 111;
                break;
              case 108:
                _context.prev = 108;
                _context.t2 = _context["catch"](102);
                throw new qx.tool.utils.Utils.UserError("Cannot determine remote repository.");
              case 111:
                repo_name = url.replace(/(https:\/\/github.com\/|git@github.com:)/, "").replace(/\.git/, "");
                _repo_name$split = repo_name.split(/\//), _repo_name$split2 = _slicedToArray(_repo_name$split, 2), owner = _repo_name$split2[0], repo = _repo_name$split2[1];
                if (argv.verbose) {
                  _this.debug(">>> Repository:  ".concat(repo_name));
                }
                repoExists = false;
                _context.prev = 115;
                _context.next = 118;
                return octokit.repos.getReleaseByTag({
                  owner: owner,
                  repo: repo,
                  tag: tag
                });
              case 118:
                repoExists = true;
                _context.next = 123;
                break;
              case 121:
                _context.prev = 121;
                _context.t3 = _context["catch"](115);
              case 123:
                if (!repoExists) {
                  _context.next = 125;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("A release with tag '".concat(tag, " already exists.'"));
              case 125:
                _context.prev = 125;
                _context.next = 128;
                return octokit.repos.getAllTopics({
                  owner: owner,
                  repo: repo
                });
              case 128:
                result = _context.sent;
                topics = result.data.names;
                _context.next = 137;
                break;
              case 132:
                _context.prev = 132;
                _context.t4 = _context["catch"](125);
                if (!_context.t4.message.includes("Bad credentials")) {
                  _context.next = 136;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Your token is invalid.");
              case 136:
                throw _context.t4;
              case 137:
                // semver range of framework dependency
                semver_range = _this.argv.qxVersionRange; // use CLI-supplied range
                if (!semver_range) {
                  // no CLI value
                  if (_this.argv.breaking) {
                    // use current version only -> breaking
                    semver_range = "^" + qxVersion;
                  } else {
                    // get current semver range -> backward-compatible
                    semver_range = mainManifestModel.getValue("requires.@qooxdoo/framework");
                    if (!semver.satisfies(qxVersion, semver_range, {
                      loose: true
                    })) {
                      // make it compatible with current version
                      semver_range = "^".concat(qxVersion, " || ").concat(semver_range);
                    }
                  }
                }

                // prompt user to confirm
                doRelease = true;
                if (argv.noninteractive) {
                  _context.next = 146;
                  break;
                }
                question = {
                  type: "confirm",
                  name: "doRelease",
                  message: "This will ".concat(argv.version ? "set" : "increment", " the version from ").concat(old_version, " to ").concat(new_version, ", having a dependency on qooxdoo ").concat(semver_range, ", and create a release of the current master on GitHub. Do you want to proceed?"),
                  "default": "y"
                };
                _context.next = 144;
                return inquirer.prompt(question);
              case 144:
                answer = _context.sent;
                doRelease = answer.doRelease;
              case 146:
                if (!doRelease) {
                  _process.exit(0);
                }

                // update Manifest(s)
                for (_i = 0, _manifestModels = manifestModels; _i < _manifestModels.length; _i++) {
                  _manifestModel = _manifestModels[_i];
                  _manifestModel.setValue("requires.@qooxdoo/framework", semver_range).setValue("info.version", new_version);
                  if (argv.dryRun) {
                    if (!argv.quiet) {
                      qx.tool.compiler.Console.info("Dry run: Not committing ".concat(_manifestModel.getRelativeDataPath(), " with the following content:"));
                      qx.tool.compiler.Console.info(JSON.stringify(_manifestModel.getData(), null, 2));
                    }
                  } else {
                    _manifestModel.save();
                  }
                }

                // package.json, only supported in the root
                package_json_path = path.join(_process.cwd(), "package.json");
                _context.next = 151;
                return fs.existsAsync(package_json_path);
              case 151:
                if (!_context.sent) {
                  _context.next = 163;
                  break;
                }
                _context.next = 154;
                return qx.tool.utils.Json.loadJsonAsync(package_json_path);
              case 154:
                data = _context.sent;
                data.version = new_version;
                if (!_this.argv.dryRun) {
                  _context.next = 160;
                  break;
                }
                qx.tool.compiler.Console.info("Dry run: Not changing package.json version...");
                _context.next = 163;
                break;
              case 160:
                _context.next = 162;
                return qx.tool.utils.Json.saveJsonAsync(package_json_path, data);
              case 162:
                if (!_this.argv.quiet) {
                  qx.tool.compiler.Console.info("Updated version in package.json.");
                }
              case 163:
                _context.next = 165;
                return _this.fireDataEventAsync("beforeCommit", {
                  version: new_version,
                  argv: _this.argv
                });
              case 165:
                if (!argv.dryRun) {
                  _context.next = 168;
                  break;
                }
                qx.tool.compiler.Console.info("Dry run: not creating tag and release '".concat(tag, "' of ").concat(repo_name, "..."));
                return _context.abrupt("return");
              case 168:
                if (!argv.message) {
                  _context.next = 172;
                  break;
                }
                message = argv.message.replace(/"/g, '\\"');
                _context.next = 178;
                break;
              case 172:
                if (argv.noninteractive) {
                  _context.next = 178;
                  break;
                }
                _question = {
                  type: "input",
                  name: "message",
                  message: "Please enter a commit message:"
                };
                _context.next = 176;
                return inquirer.prompt([_question]);
              case 176:
                _answer = _context.sent;
                message = _answer.message;
              case 178:
                if (!message) {
                  message = "Release v".concat(new_version);
                }
                if (!argv.quiet) {
                  qx.tool.compiler.Console.info("Creating tag and release '".concat(tag, "' of ").concat(repo_name, "..."));
                }

                // commit and push
                run = qx.tool.utils.Utils.run;
                _context.prev = 181;
                _context.next = 184;
                return run("git", ["add", "--all"]);
              case 184:
                _context.next = 186;
                return run("git", ["commit", "-m \"".concat(message, "\""), "--allow-empty"]);
              case 186:
                _context.next = 188;
                return run("git", ["push"]);
              case 188:
                release_data = {
                  owner: owner,
                  repo: repo,
                  tag_name: tag,
                  target_commitish: "master",
                  name: tag,
                  body: message,
                  draft: false,
                  prerelease: argv.prerelease
                };
                _context.next = 191;
                return octokit.repos.createRelease(release_data);
              case 191:
                if (!argv.quiet) {
                  qx.tool.compiler.Console.info("Published new version '".concat(tag, "'."));
                }
                _context.next = 197;
                break;
              case 194:
                _context.prev = 194;
                _context.t5 = _context["catch"](181);
                throw new qx.tool.utils.Utils.UserError(_context.t5.message);
              case 197:
                // add GitHub topic
                topic = "qooxdoo-package";
                if (topics.includes(topic)) {
                  _context.next = 203;
                  break;
                }
                topics.push(topic);
                _context.next = 202;
                return octokit.repos.replaceAllTopics({
                  owner: owner,
                  repo: repo,
                  names: topics
                });
              case 202:
                if (!argv.quiet) {
                  qx.tool.compiler.Console.info("Added GitHub topic '".concat(topic, "'."));
                }
              case 203:
                run("git", ["pull"]);
              case 204:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[12, 18], [60, 73, 76, 79], [102, 108], [115, 121], [125, 132], [181, 194]]);
        }))();
      },
      /**
       * Creates a qooxdoo.json file with paths to Manifest.json files in this repository
       * @private
       */
      __P_474_0: function () {
        var _P_474_ = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(argv) {
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", new Promise(function (resolve, reject) {
                  if (argv.verbose && !argv.quiet) {
                    qx.tool.compiler.Console.info("Creating index file...");
                  }
                  glob(qx.tool.config.Manifest.config.fileName, {
                    matchBase: true
                  }, /*#__PURE__*/function () {
                    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(err, files) {
                      var mainpath, choices, answer, data, registryModel;
                      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                        while (1) switch (_context2.prev = _context2.next) {
                          case 0:
                            if (err) {
                              reject(err);
                            }
                            if (!files || !files.length) {
                              reject(new qx.tool.utils.Utils.UserError("No Manifest.json files could be found"));
                            }
                            if (!(files.length > 1)) {
                              _context2.next = 8;
                              break;
                            }
                            choices = files.map(function (p) {
                              var m = qx.tool.utils.Json.parseJson(fs.readFileSync(path.join(_process.cwd(), p), "utf-8"));
                              return {
                                name: m.info.name + (m.info.summary ? ": " + m.info.summary : ""),
                                value: p
                              };
                            });
                            _context2.next = 6;
                            return inquirer.prompt({
                              name: "mainpath",
                              message: "Please choose the main library",
                              type: "list",
                              choices: choices
                            });
                          case 6:
                            answer = _context2.sent;
                            mainpath = answer.mainpath;
                          case 8:
                            data = {
                              libraries: files.map(function (p) {
                                return files.length > 1 && p === mainpath ? {
                                  path: path.dirname(p),
                                  main: true
                                } : {
                                  path: path.dirname(p)
                                };
                              })
                            }; // write index file
                            registryModel = qx.tool.config.Registry.getInstance();
                            if (!argv.dryRun) {
                              _context2.next = 15;
                              break;
                            }
                            qx.tool.compiler.Console.info("Dry run: not creating index file ".concat(registryModel.getRelativeDataPath(), " with the following content:"));
                            qx.tool.compiler.Console.info(data);
                            _context2.next = 20;
                            break;
                          case 15:
                            _context2.next = 17;
                            return registryModel.load(data);
                          case 17:
                            _context2.next = 19;
                            return registryModel.save();
                          case 19:
                            if (!argv.quiet) {
                              qx.tool.compiler.Console.info("Created index file ".concat(registryModel.getRelativeDataPath(), "'."));
                            }
                          case 20:
                            resolve();
                          case 21:
                          case "end":
                            return _context2.stop();
                        }
                      }, _callee2);
                    }));
                    return function (_x2, _x3) {
                      return _ref.apply(this, arguments);
                    };
                  }());
                }));
              case 1:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }));
        function __P_474_0(_x) {
          return _P_474_.apply(this, arguments);
        }
        return __P_474_0;
      }()
    }
  });
  qx.tool.cli.commands["package"].Publish.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Publish.js.map?dt=1722153839743