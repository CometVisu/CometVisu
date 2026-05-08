function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var argv, qxVersion, status, cfg, github, response, token, octokit, libraries, version, manifestModels, mainManifestModel, cwd, registryModel, _iterator, _step, library, manifestModel, old_version, new_version, tag, url, repo_name, _repo_name$split, _repo_name$split2, owner, repo, repoExists, result, topics, semver_range, doRelease, question, answer, _i, _manifestModels, _manifestModel, package_json_path, data, message, _question, _answer, run, release_data, topic, _t, _t2, _t3, _t4, _t5, _t6;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                _context.n = 1;
                return qx.tool.cli.commands["package"].Publish.superclass.prototype.process.call(_this);
              case 1:
                // init
                argv = _this.argv;
                if (argv.dryrun) {
                  qx.tool.compiler.Console.info('The "--dryrun" option is deprecated. Please use "--dry-run" instead.');
                  argv.dryRun = true;
                }

                // qooxdoo version
                _context.n = 2;
                return _this.getQxVersion();
              case 2:
                qxVersion = _context.v;
                if (!fs.existsSync("Manifest.json")) {
                  _context.n = 4;
                  break;
                }
                _context.n = 3;
                return _this.getAppQxVersion();
              case 3:
                qxVersion = _context.v;
              case 4:
                if (argv.verbose) {
                  _this.info("Using qooxdoo version:  ".concat(qxVersion));
                }

                // check git status
                _context.p = 5;
                _context.n = 6;
                return qx.tool.utils.Utils.exec("git status --porcelain");
              case 6:
                status = _context.v;
                _context.n = 8;
                break;
              case 7:
                _context.p = 7;
                _t = _context.v;
                throw new qx.tool.utils.Utils.UserError("Cannot determine remote repository.");
              case 8:
                _this.debug(status);
                if (!(status.trim() !== "")) {
                  _context.n = 9;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Please commit or stash all remaining changes first.");
              case 9:
                _context.n = 10;
                return qx.tool.utils.Utils.exec("git status --porcelain --branch");
              case 10:
                status = _context.v;
                _this.debug(status);
                if (!status.includes("ahead")) {
                  _context.n = 11;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Please push all local commits to GitHub first.");
              case 11:
                _context.n = 12;
                return qx.tool.cli.ConfigDb.getInstance();
              case 12:
                cfg = _context.v;
                github = cfg.db("github", {});
                if (github.token) {
                  _context.n = 15;
                  break;
                }
                _context.n = 13;
                return inquirer.prompt([{
                  type: "input",
                  name: "token",
                  message: "Publishing to GitHub requires an API token - visit https://github.com/settings/tokens to obtain one (you must assign permission to publish);\nWhat is your GitHub API Token ? "
                }]);
              case 13:
                response = _context.v;
                if (response.token) {
                  _context.n = 14;
                  break;
                }
                qx.tool.compiler.Console.error("You have not provided a GitHub token.");
                return _context.a(2);
              case 14:
                github.token = response.token;
                cfg.save();
              case 15:
                token = github.token;
                if (token) {
                  _context.n = 16;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("GitHub access token required.");
              case 16:
                octokit = new Octokit({
                  auth: token
                }); // create index file first?
                if (!argv.i) {
                  _context.n = 17;
                  break;
                }
                _context.n = 17;
                return _this.__P_485_0(argv);
              case 17:
                manifestModels = [];
                cwd = _process.cwd();
                registryModel = qx.tool.config.Registry.getInstance();
                _context.n = 18;
                return registryModel.exists();
              case 18:
                if (!_context.v) {
                  _context.n = 28;
                  break;
                }
                _context.n = 19;
                return registryModel.load();
              case 19:
                libraries = registryModel.getValue("libraries");
                _iterator = _createForOfIteratorHelper(libraries);
                _context.p = 20;
                _iterator.s();
              case 21:
                if ((_step = _iterator.n()).done) {
                  _context.n = 24;
                  break;
                }
                library = _step.value;
                _context.n = 22;
                return new qx.tool.config.Abstract(qx.tool.config.Manifest.config).set({
                  baseDir: path.join(cwd, library.path)
                }).load();
              case 22:
                manifestModel = _context.v;
                manifestModels.push(manifestModel);
                // use the first manifest or the one with a truthy property "main" as reference
                if (!version || library.main) {
                  version = manifestModel.getValue("info.version");
                  mainManifestModel = manifestModel;
                }
              case 23:
                _context.n = 21;
                break;
              case 24:
                _context.n = 26;
                break;
              case 25:
                _context.p = 25;
                _t2 = _context.v;
                _iterator.e(_t2);
              case 26:
                _context.p = 26;
                _iterator.f();
                return _context.f(26);
              case 27:
                _context.n = 31;
                break;
              case 28:
                _context.n = 29;
                return qx.tool.config.Manifest.getInstance().load();
              case 29:
                mainManifestModel = _context.v;
                manifestModels.push(mainManifestModel);
                // prevent accidental publication of demo manifest.
                if (!(!argv.force && mainManifestModel.getValue("provides.namespace").includes(".demo"))) {
                  _context.n = 30;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("This seems to be the library demo. Please go into the library root directory to publish the library.");
              case 30:
                libraries = [{
                  path: "."
                }];
              case 31:
                // version
                old_version = mainManifestModel.getValue("info.version");
                if (!argv.useVersion) {
                  _context.n = 33;
                  break;
                }
                // use user-supplied value
                new_version = semver.coerce(argv.useVersion);
                if (new_version) {
                  _context.n = 32;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("".concat(argv.useVersion, " is not a valid version number."));
              case 32:
                new_version = new_version.toString();
                _context.n = 35;
                break;
              case 33:
                if (semver.valid(old_version)) {
                  _context.n = 34;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Invalid version number in Manifest. Must be a valid semver version (x.y.z).");
              case 34:
                if (!argv.type) {
                  argv.type = semver.prerelease(old_version) ? "prerelease" : "patch";
                }
                argv.prerelease = Boolean(argv.prerelease) || argv.type === "prerelease" || argv.type === "prepatch" || argv.type === "preminor" || argv.type === "premajor";
                new_version = semver.inc(old_version, argv.type);
              case 35:
                // tag and repo name
                tag = "v".concat(new_version);
                _context.p = 36;
                _context.n = 37;
                return qx.tool.utils.Utils.exec("git config --get remote.origin.url");
              case 37:
                url = _context.v.trim();
                _context.n = 39;
                break;
              case 38:
                _context.p = 38;
                _t3 = _context.v;
                throw new qx.tool.utils.Utils.UserError("Cannot determine remote repository.");
              case 39:
                repo_name = url.replace(/(https:\/\/github.com\/|git@github.com:)/, "").replace(/\.git/, "");
                _repo_name$split = repo_name.split(/\//), _repo_name$split2 = _slicedToArray(_repo_name$split, 2), owner = _repo_name$split2[0], repo = _repo_name$split2[1];
                if (argv.verbose) {
                  _this.debug(">>> Repository:  ".concat(repo_name));
                }
                repoExists = false;
                _context.p = 40;
                _context.n = 41;
                return octokit.repos.getReleaseByTag({
                  owner: owner,
                  repo: repo,
                  tag: tag
                });
              case 41:
                repoExists = true;
                _context.n = 43;
                break;
              case 42:
                _context.p = 42;
                _t4 = _context.v;
              case 43:
                if (!repoExists) {
                  _context.n = 44;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("A release with tag '".concat(tag, " already exists.'"));
              case 44:
                _context.p = 44;
                _context.n = 45;
                return octokit.repos.getAllTopics({
                  owner: owner,
                  repo: repo
                });
              case 45:
                result = _context.v;
                topics = result.data.names;
                _context.n = 48;
                break;
              case 46:
                _context.p = 46;
                _t5 = _context.v;
                if (!_t5.message.includes("Bad credentials")) {
                  _context.n = 47;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Your token is invalid.");
              case 47:
                throw _t5;
              case 48:
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
                  _context.n = 50;
                  break;
                }
                question = {
                  type: "confirm",
                  name: "doRelease",
                  message: "This will ".concat(argv.version ? "set" : "increment", " the version from ").concat(old_version, " to ").concat(new_version, ", having a dependency on qooxdoo ").concat(semver_range, ", and create a release of the current master on GitHub. Do you want to proceed?"),
                  "default": "y"
                };
                _context.n = 49;
                return inquirer.prompt(question);
              case 49:
                answer = _context.v;
                doRelease = answer.doRelease;
              case 50:
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
                _context.n = 51;
                return fs.existsAsync(package_json_path);
              case 51:
                if (!_context.v) {
                  _context.n = 55;
                  break;
                }
                _context.n = 52;
                return qx.tool.utils.Json.loadJsonAsync(package_json_path);
              case 52:
                data = _context.v;
                data.version = new_version;
                if (!_this.argv.dryRun) {
                  _context.n = 53;
                  break;
                }
                qx.tool.compiler.Console.info("Dry run: Not changing package.json version...");
                _context.n = 55;
                break;
              case 53:
                _context.n = 54;
                return qx.tool.utils.Json.saveJsonAsync(package_json_path, data);
              case 54:
                if (!_this.argv.quiet) {
                  qx.tool.compiler.Console.info("Updated version in package.json.");
                }
              case 55:
                _context.n = 56;
                return _this.fireDataEventAsync("beforeCommit", {
                  version: new_version,
                  argv: _this.argv
                });
              case 56:
                if (!argv.dryRun) {
                  _context.n = 57;
                  break;
                }
                qx.tool.compiler.Console.info("Dry run: not creating tag and release '".concat(tag, "' of ").concat(repo_name, "..."));
                return _context.a(2);
              case 57:
                if (!argv.message) {
                  _context.n = 58;
                  break;
                }
                message = argv.message.replace(/"/g, '\\"');
                _context.n = 60;
                break;
              case 58:
                if (argv.noninteractive) {
                  _context.n = 60;
                  break;
                }
                _question = {
                  type: "input",
                  name: "message",
                  message: "Please enter a commit message:"
                };
                _context.n = 59;
                return inquirer.prompt([_question]);
              case 59:
                _answer = _context.v;
                message = _answer.message;
              case 60:
                if (!message) {
                  message = "Release v".concat(new_version);
                }
                if (!argv.quiet) {
                  qx.tool.compiler.Console.info("Creating tag and release '".concat(tag, "' of ").concat(repo_name, "..."));
                }

                // commit and push
                run = qx.tool.utils.Utils.run;
                _context.p = 61;
                _context.n = 62;
                return run("git", ["add", "--all"]);
              case 62:
                _context.n = 63;
                return run("git", ["commit", "-m \"".concat(message, "\""), "--allow-empty"]);
              case 63:
                _context.n = 64;
                return run("git", ["push"]);
              case 64:
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
                _context.n = 65;
                return octokit.repos.createRelease(release_data);
              case 65:
                if (!argv.quiet) {
                  qx.tool.compiler.Console.info("Published new version '".concat(tag, "'."));
                }
                _context.n = 67;
                break;
              case 66:
                _context.p = 66;
                _t6 = _context.v;
                throw new qx.tool.utils.Utils.UserError(_t6.message);
              case 67:
                // add GitHub topic
                topic = "qooxdoo-package";
                if (topics.includes(topic)) {
                  _context.n = 69;
                  break;
                }
                topics.push(topic);
                _context.n = 68;
                return octokit.repos.replaceAllTopics({
                  owner: owner,
                  repo: repo,
                  names: topics
                });
              case 68:
                if (!argv.quiet) {
                  qx.tool.compiler.Console.info("Added GitHub topic '".concat(topic, "'."));
                }
              case 69:
                run("git", ["pull"]);
              case 70:
                return _context.a(2);
            }
          }, _callee, null, [[61, 66], [44, 46], [40, 42], [36, 38], [20, 25, 26, 27], [5, 7]]);
        }))();
      },
      /**
       * Creates a qooxdoo.json file with paths to Manifest.json files in this repository
       * @private
       */
      __P_485_0: function () {
        var _P_485_ = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(argv) {
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                return _context3.a(2, new Promise(function (resolve, reject) {
                  if (argv.verbose && !argv.quiet) {
                    qx.tool.compiler.Console.info("Creating index file...");
                  }
                  glob(qx.tool.config.Manifest.config.fileName, {
                    matchBase: true
                  }, /*#__PURE__*/function () {
                    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(err, files) {
                      var mainpath, choices, answer, data, registryModel;
                      return _regenerator().w(function (_context2) {
                        while (1) switch (_context2.n) {
                          case 0:
                            if (err) {
                              reject(err);
                            }
                            if (!files || !files.length) {
                              reject(new qx.tool.utils.Utils.UserError("No Manifest.json files could be found"));
                            }
                            if (!(files.length > 1)) {
                              _context2.n = 2;
                              break;
                            }
                            choices = files.map(function (p) {
                              var m = qx.tool.utils.Json.parseJson(fs.readFileSync(path.join(_process.cwd(), p), "utf-8"));
                              return {
                                name: m.info.name + (m.info.summary ? ": " + m.info.summary : ""),
                                value: p
                              };
                            });
                            _context2.n = 1;
                            return inquirer.prompt({
                              name: "mainpath",
                              message: "Please choose the main library",
                              type: "list",
                              choices: choices
                            });
                          case 1:
                            answer = _context2.v;
                            mainpath = answer.mainpath;
                          case 2:
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
                              _context2.n = 3;
                              break;
                            }
                            qx.tool.compiler.Console.info("Dry run: not creating index file ".concat(registryModel.getRelativeDataPath(), " with the following content:"));
                            qx.tool.compiler.Console.info(data);
                            _context2.n = 6;
                            break;
                          case 3:
                            _context2.n = 4;
                            return registryModel.load(data);
                          case 4:
                            _context2.n = 5;
                            return registryModel.save();
                          case 5:
                            if (!argv.quiet) {
                              qx.tool.compiler.Console.info("Created index file ".concat(registryModel.getRelativeDataPath(), "'."));
                            }
                          case 6:
                            resolve();
                          case 7:
                            return _context2.a(2);
                        }
                      }, _callee2);
                    }));
                    return function (_x2, _x3) {
                      return _ref.apply(this, arguments);
                    };
                  }());
                }));
            }
          }, _callee3);
        }));
        function __P_485_0(_x) {
          return _P_485_.apply(this, arguments);
        }
        return __P_485_0;
      }()
    }
  });
  qx.tool.cli.commands["package"].Publish.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Publish.js.map?dt=1778272842314