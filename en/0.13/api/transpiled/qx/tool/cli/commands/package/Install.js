function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
      __P_473_0: false,
      /**
       * API method to install a library via its URI and version tag
       * @param {String} library_uri
       * @param {String} release_tag
       * @return {Promise<void>}
       */
      install: function install(library_uri, release_tag) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var installee;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                installee = library_uri + (release_tag ? "@" + release_tag : "");
                if (_this.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> To be installed: ".concat(installee));
                }
                _this.argv.uri = installee;
                _this.argv.fromPath = false;
                _context.next = 6;
                return _this.process();
              case 6:
              case "end":
                return _context.stop();
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
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                if (!path.isAbsolute(local_path)) {
                  local_path = path.join(process.cwd(), local_path);
                }
                if (_this2.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> To be installed: ".concat(library_uri || "local libarary", " from ").concat(local_path));
                }
                _this2.argv.uri = library_uri;
                _this2.argv.fromPath = local_path;
                _context2.next = 6;
                return _this2.process();
              case 6:
              case "end":
                return _context2.stop();
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
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this3.getLockfileModel();
              case 2:
                return _context3.abrupt("return", _context3.sent.getValue("libraries").some(function (lib) {
                  return lib.uri === library_uri && (release_tag === undefined || release_tag === lib.repo_tag);
                }));
              case 3:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }))();
      },
      /**
       * Installs a package
       */
      process: function process() {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          var _yield$_this4$_getCon, _yield$_this4$_getCon2, manifestModel, lockfileModel, uri, id, _uri$split, _uri$split2, saveToManifest;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return qx.tool.cli.commands["package"].Install.superclass.prototype.process.call(_this4);
              case 2:
                _context4.next = 4;
                return _this4.__P_473_1();
              case 4:
                _context4.next = 6;
                return _this4._getConfigData();
              case 6:
                _yield$_this4$_getCon = _context4.sent;
                _yield$_this4$_getCon2 = _slicedToArray(_yield$_this4$_getCon, 2);
                manifestModel = _yield$_this4$_getCon2[0];
                lockfileModel = _yield$_this4$_getCon2[1];
                // create shorthand for uri@id
                _this4.argv.uri = _this4.argv.uri || _this4.argv["uri@release_tag"];

                // if no library uri has been passed, install from lockfile or manifest
                if (!(!_this4.argv.uri && !_this4.argv.fromPath)) {
                  _context4.next = 22;
                  break;
                }
                if (!lockfileModel.getValue("libraries").length) {
                  _context4.next = 17;
                  break;
                }
                _context4.next = 15;
                return _this4.__P_473_2();
              case 15:
                _context4.next = 21;
                break;
              case 17:
                _context4.next = 19;
                return _this4.__P_473_3(manifestModel.getData());
              case 19:
                _context4.next = 21;
                return _this4._saveConfigData();
              case 21:
                return _context4.abrupt("return");
              case 22:
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
                  _context4.next = 33;
                  break;
                }
                if (!id) {
                  _context4.next = 28;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Version identifier cannot be used when installing from local path.");
              case 28:
                saveToManifest = uri ? _this4.argv.save : false;
                _context4.next = 31;
                return _this4.__P_473_4(uri, _this4.argv.fromPath, saveToManifest);
              case 31:
                _context4.next = 40;
                break;
              case 33:
                if (!(!id || qx.lang.Type.isString(id) && id.startsWith("v"))) {
                  _context4.next = 38;
                  break;
                }
                _context4.next = 36;
                return _this4.__P_473_5(uri, id, _this4.argv.save);
              case 36:
                _context4.next = 40;
                break;
              case 38:
                _context4.next = 40;
                return _this4.__P_473_6(uri, id, _this4.argv.save);
              case 40:
                _context4.next = 42;
                return _this4._saveConfigData();
              case 42:
                if (_this4.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Done.");
                }
              case 43:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }))();
      },
      /**
       * Update repo cache
       * @return {Promise<void>}
       * @private
       */
      __P_473_1: function __P_473_1() {
        var _this5 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
          var repos_cache;
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                repos_cache = _this5.getCache().repos;
                if (!(repos_cache.list.length === 0)) {
                  _context5.next = 8;
                  break;
                }
                if (!_this5.argv.quiet) {
                  qx.tool.compiler.Console.info(">>> Updating cache...");
                }
                _this5.clearCache();
                // implicit update
                _context5.next = 6;
                return new qx.tool.cli.commands["package"].Update({
                  quiet: true
                }).process();
              case 6:
                _context5.next = 8;
                return new qx.tool.cli.commands["package"].List({
                  quiet: true
                }).process();
              case 8:
              case "end":
                return _context5.stop();
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
      __P_473_7: function __P_473_7(uri) {
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
      __P_473_5: function __P_473_5(uri, tag_name, writeToManifest) {
        var _this6 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
          var qxVersion, _this6$__P_473_, repo_name, package_path, cache, options, _yield$_this6$__P_, download_path, found, repo_data, release_data, _iterator, _step, manifest_path, library_uri;
          return _regeneratorRuntime().wrap(function _callee6$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _this6.getAppQxVersion();
              case 2:
                qxVersion = _context6.sent.replace("-beta", "");
                _this6$__P_473_ = _this6.__P_473_7(uri), repo_name = _this6$__P_473_.repo_name, package_path = _this6$__P_473_.package_path;
                if (tag_name) {
                  _context6.next = 16;
                  break;
                }
                cache = _this6.getCache();
                if (!(cache.compat[qxVersion] === undefined)) {
                  _context6.next = 12;
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
                _context6.next = 11;
                return new qx.tool.cli.commands["package"].List(options).process();
              case 11:
                cache = _this6.getCache(true);
              case 12:
                tag_name = cache.compat[qxVersion] && cache.compat[qxVersion][repo_name];
                if (tag_name) {
                  _context6.next = 16;
                  break;
                }
                qx.tool.compiler.Console.warn("'".concat(repo_name, "' has no (stable) release compatible with qooxdoo version ").concat(qxVersion, ".\n             To install anyways, use '--release <release>' or 'qx install ").concat(repo_name, "@<release>'.\n             Please ask the library maintainer to release a compatible version."));
                return _context6.abrupt("return");
              case 16:
                if (_this6.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Installing '".concat(uri, "', release '").concat(tag_name, "' for qooxdoo version: ").concat(qxVersion));
                }
                _context6.next = 19;
                return _this6.__P_473_8(repo_name, tag_name);
              case 19:
                _yield$_this6$__P_ = _context6.sent;
                download_path = _yield$_this6$__P_.download_path;
                // iterate over contained libraries
                found = false;
                repo_data = _this6.getCache().repos.data[repo_name];
                if (repo_data) {
                  _context6.next = 25;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("A repository '".concat(repo_name, "' cannot be found."));
              case 25:
                release_data = repo_data.releases.data[tag_name];
                if (release_data) {
                  _context6.next = 28;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("'".concat(repo_name, "' has no release '").concat(tag_name, "'."));
              case 28:
                // TO DO: the path in the cache data should be the path to the library containing Manifest.json, not to the Manifest.json itself
                _iterator = _createForOfIteratorHelper(release_data.manifests);
                _context6.prev = 29;
                _iterator.s();
              case 31:
                if ((_step = _iterator.n()).done) {
                  _context6.next = 41;
                  break;
                }
                manifest_path = _step.value.path;
                if (!(package_path && path.dirname(manifest_path) !== package_path)) {
                  _context6.next = 35;
                  break;
                }
                return _context6.abrupt("continue", 39);
              case 35:
                library_uri = path.join(repo_name, path.dirname(manifest_path));
                found = true;
                _context6.next = 39;
                return _this6.__P_473_9(library_uri, tag_name, download_path, writeToManifest);
              case 39:
                _context6.next = 31;
                break;
              case 41:
                _context6.next = 46;
                break;
              case 43:
                _context6.prev = 43;
                _context6.t0 = _context6["catch"](29);
                _iterator.e(_context6.t0);
              case 46:
                _context6.prev = 46;
                _iterator.f();
                return _context6.finish(46);
              case 49:
                if (found) {
                  _context6.next = 51;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("The package/library identified by '".concat(uri, "' could not be found."));
              case 51:
              case "end":
                return _context6.stop();
            }
          }, _callee6, null, [[29, 43, 46, 49]]);
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
      __P_473_6: function __P_473_6(uri, hash, writeToManifest) {
        var _this7 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
          var qxVersion, _this7$__P_473_, repo_name, _yield$_this7$__P_, download_path;
          return _regeneratorRuntime().wrap(function _callee7$(_context7) {
            while (1) switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _this7.getAppQxVersion();
              case 2:
                qxVersion = _context7.sent;
                if (_this7.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Installing '".concat(uri, "' from tree hash '").concat(hash, "' for qooxdoo version ").concat(qxVersion));
                }
                _this7$__P_473_ = _this7.__P_473_7(uri), repo_name = _this7$__P_473_.repo_name;
                _context7.next = 7;
                return _this7.__P_473_8(repo_name, hash);
              case 7:
                _yield$_this7$__P_ = _context7.sent;
                download_path = _yield$_this7$__P_.download_path;
                _context7.next = 11;
                return _this7.__P_473_9(uri, hash, download_path, writeToManifest);
              case 11:
              case "end":
                return _context7.stop();
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
      __P_473_4: function __P_473_4(uri, dir) {
        var _arguments = arguments,
          _this8 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
          var writeToManifest, qxVersion;
          return _regeneratorRuntime().wrap(function _callee8$(_context8) {
            while (1) switch (_context8.prev = _context8.next) {
              case 0:
                writeToManifest = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : false;
                _context8.next = 3;
                return _this8.getAppQxVersion();
              case 3:
                qxVersion = _context8.sent;
                if (_this8.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Installing '".concat(uri, "' from '").concat(dir, "' for qooxdoo version ").concat(qxVersion));
                }
                _context8.next = 7;
                return _this8.__P_473_9(uri, undefined, dir, writeToManifest);
              case 7:
              case "end":
                return _context8.stop();
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
      __P_473_9: function __P_473_9(uri, id, download_path, writeToManifest) {
        var _this9 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
          var _ref, repo_name, package_path, _yield$_this9$_getCon, _yield$_this9$_getCon2, manifestModel, lockfileModel, library_path, manifest_path, _qx$tool$utils$Json$p, info, local_path, lib, index, appsInstalled, depsInstalled;
          return _regeneratorRuntime().wrap(function _callee9$(_context9) {
            while (1) switch (_context9.prev = _context9.next) {
              case 0:
                _ref = uri ? _this9.__P_473_7(uri) : {
                  repo_name: "",
                  package_path: ""
                }, repo_name = _ref.repo_name, package_path = _ref.package_path;
                _context9.next = 3;
                return _this9._getConfigData();
              case 3:
                _yield$_this9$_getCon = _context9.sent;
                _yield$_this9$_getCon2 = _slicedToArray(_yield$_this9$_getCon, 2);
                manifestModel = _yield$_this9$_getCon2[0];
                lockfileModel = _yield$_this9$_getCon2[1];
                library_path = path.join(download_path, package_path);
                manifest_path = path.join(library_path, qx.tool.config.Manifest.config.fileName);
                if (fs.existsSync(manifest_path)) {
                  _context9.next = 11;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("No manifest file in '".concat(library_path, "'."));
              case 11:
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
                _context9.next = 21;
                return _this9.__P_473_10(library_path);
              case 21:
                appsInstalled = _context9.sent;
                if (!appsInstalled && _this9.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> No applications installed for ".concat(uri, "."));
                }
                _context9.next = 25;
                return _this9.__P_473_11(library_path);
              case 25:
                depsInstalled = _context9.sent;
                if (!depsInstalled && _this9.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> No dependencies installed for ".concat(uri, "."));
                }
                if (!_this9.argv.quiet) {
                  qx.tool.compiler.Console.info("Installed ".concat(info.name, " (").concat(uri, ", ").concat(info.version, ")"));
                }
              case 28:
              case "end":
                return _context9.stop();
            }
          }, _callee9);
        }))();
      },
      /**
       * Given a download path of a library, install its dependencies
       * @param {String} downloadPath
       * @return {Promise<Boolean>} Wether any libraries were installed
       */
      __P_473_11: function __P_473_11(downloadPath) {
        var _this10 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
          var manifest_file, manifest;
          return _regeneratorRuntime().wrap(function _callee10$(_context10) {
            while (1) switch (_context10.prev = _context10.next) {
              case 0:
                manifest_file = path.join(downloadPath, qx.tool.config.Manifest.config.fileName);
                _context10.next = 3;
                return qx.tool.utils.Json.loadJsonAsync(manifest_file);
              case 3:
                manifest = _context10.sent;
                if (manifest.requires) {
                  _context10.next = 7;
                  break;
                }
                if (_this10.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> ".concat(manifest_file, " does not contain library dependencies."));
                }
                return _context10.abrupt("return", false);
              case 7:
                if (_this10.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Installing libraries from ".concat(manifest_file, "."));
                }
                return _context10.abrupt("return", _this10.__P_473_3(manifest));
              case 9:
              case "end":
                return _context10.stop();
            }
          }, _callee10);
        }))();
      },
      /**
       * Given a library's manifest data, install its dependencies
       * @param {Object} manifest
       * @return {Promise<Boolean>} Wether any libraries were installed
       */
      __P_473_3: function __P_473_3(manifest) {
        var _this11 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
          var _iterator2, _step2, lib_uri, lib_range, qxVersion, _this11$__P_473_, tag;
          return _regeneratorRuntime().wrap(function _callee11$(_context11) {
            while (1) switch (_context11.prev = _context11.next) {
              case 0:
                if (manifest.requires) {
                  _context11.next = 2;
                  break;
                }
                return _context11.abrupt("return", false);
              case 2:
                _iterator2 = _createForOfIteratorHelper(Object.getOwnPropertyNames(manifest.requires));
                _context11.prev = 3;
                _iterator2.s();
              case 5:
                if ((_step2 = _iterator2.n()).done) {
                  _context11.next = 45;
                  break;
                }
                lib_uri = _step2.value;
                lib_range = manifest.requires[lib_uri];
                _context11.t0 = lib_uri;
                _context11.next = _context11.t0 === "@qooxdoo/compiler" ? 11 : _context11.t0 === "qooxdoo-sdk" ? 11 : _context11.t0 === "qooxdoo-compiler" ? 11 : _context11.t0 === "@qooxdoo/framework" ? 12 : 18;
                break;
              case 11:
                return _context11.abrupt("break", 43);
              case 12:
                _context11.next = 14;
                return _this11.getAppQxVersion();
              case 14:
                qxVersion = _context11.sent;
                if (!(!semver.satisfies(qxVersion, lib_range, {
                  loose: true
                }) && _this11.argv.ignore)) {
                  _context11.next = 17;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Library '".concat(lib_uri, "' needs @qooxdoo/framework version ").concat(lib_range, ", found ").concat(qxVersion));
              case 17:
                return _context11.abrupt("break", 43);
              case 18:
                if (!semver.validRange(lib_range)) {
                  _context11.next = 30;
                  break;
                }
                _this11$__P_473_ = _this11.__P_473_12(lib_uri, lib_range), tag = _this11$__P_473_.tag;
                if (tag) {
                  _context11.next = 22;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("No satisfying release found for ".concat(lib_uri, "@").concat(lib_range, "!"));
              case 22:
                _context11.next = 24;
                return _this11.isInstalled(lib_uri, tag);
              case 24:
                if (_context11.sent) {
                  _context11.next = 28;
                  break;
                }
                _context11.next = 27;
                return _this11.__P_473_5(lib_uri, tag, false);
              case 27:
                return _context11.abrupt("break", 43);
              case 28:
                if (_this11.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> ".concat(lib_uri, "@").concat(tag, " is already installed."));
                }
                return _context11.abrupt("break", 43);
              case 30:
                _context11.next = 32;
                return _this11.isInstalled(lib_uri, lib_range);
              case 32:
                if (_context11.sent) {
                  _context11.next = 42;
                  break;
                }
                _context11.prev = 33;
                _context11.next = 36;
                return _this11.__P_473_6(lib_uri, lib_range, false);
              case 36:
                return _context11.abrupt("break", 43);
              case 39:
                _context11.prev = 39;
                _context11.t1 = _context11["catch"](33);
                throw new qx.tool.utils.Utils.UserError("Could not install ".concat(lib_uri, "@").concat(lib_range, ": ").concat(_context11.t1.message));
              case 42:
                if (_this11.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> ".concat(lib_uri, "@").concat(lib_range, " is already installed."));
                }
              case 43:
                _context11.next = 5;
                break;
              case 45:
                _context11.next = 50;
                break;
              case 47:
                _context11.prev = 47;
                _context11.t2 = _context11["catch"](3);
                _iterator2.e(_context11.t2);
              case 50:
                _context11.prev = 50;
                _iterator2.f();
                return _context11.finish(50);
              case 53:
                return _context11.abrupt("return", true);
              case 54:
              case "end":
                return _context11.stop();
            }
          }, _callee11, null, [[3, 47, 50, 53], [33, 39]]);
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
      __P_473_12: function __P_473_12(lib_uri, lib_range) {
        var _this12 = this;
        var _this$__P_473_ = this.__P_473_7(lib_uri),
          repo_name = _this$__P_473_.repo_name;
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
            _this12.debug("".concat(repo_name, "/").concat(tag, ": Invalid Manifest!"));
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
      __P_473_10: function __P_473_10(downloadPath) {
        var _this13 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
          var manifest, manifestApp, compileConfigModel, app;
          return _regeneratorRuntime().wrap(function _callee12$(_context12) {
            while (1) switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return qx.tool.utils.Json.loadJsonAsync(path.join(downloadPath, qx.tool.config.Manifest.config.fileName));
              case 2:
                manifest = _context12.sent;
                if (!(!manifest.provides || !manifest.provides.application)) {
                  _context12.next = 5;
                  break;
                }
                return _context12.abrupt("return", false);
              case 5:
                manifestApp = manifest.provides.application;
                _context12.next = 8;
                return qx.tool.config.Compile.getInstance();
              case 8:
                compileConfigModel = _context12.sent;
                _context12.next = 11;
                return compileConfigModel.exists();
              case 11:
                if (_context12.sent) {
                  _context12.next = 14;
                  break;
                }
                qx.tool.compiler.Console.info(">>> Cannot install application " + (manifestApp.name || manifestApp["class"]) + " because compile.json does not exist (you must manually add it)");
                return _context12.abrupt("return", false);
              case 14:
                // relaod config. We need a fresh model here because data will be verified.
                // The original model is enriched during parsing so validate will fail.
                compileConfigModel.setLoaded(false);
                _context12.next = 17;
                return compileConfigModel.load();
              case 17:
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
                  _context12.next = 22;
                  break;
                }
                _context12.next = 22;
                return compileConfigModel.save();
              case 22:
                if (_this13.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Installed application " + (app.name || app["class"]));
                }
                return _context12.abrupt("return", true);
              case 24:
              case "end":
                return _context12.stop();
            }
          }, _callee12);
        }))();
      },
      /**
       * Download repos listed in the lockfile
       * @return {Promise<void>}
       * @private
       */
      __P_473_2: function __P_473_2() {
        var _this14 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
          var libraries;
          return _regeneratorRuntime().wrap(function _callee13$(_context13) {
            while (1) switch (_context13.prev = _context13.next) {
              case 0:
                if (_this14.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Downloading libraries listed in ".concat(qx.tool.config.Lockfile.config.fileName, "..."));
                }
                _context13.next = 3;
                return _this14.getLockfileData();
              case 3:
                libraries = _context13.sent.libraries;
                return _context13.abrupt("return", qx.Promise.all(libraries.filter(function (lib) {
                  return lib.repo_name && lib.repo_tag;
                }).map(function (lib) {
                  return _this14.__P_473_8(lib.repo_name, lib.repo_tag);
                })));
              case 5:
              case "end":
                return _context13.stop();
            }
          }, _callee13);
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
      __P_473_8: function __P_473_8(repo_name) {
        var _arguments2 = arguments,
          _this15 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
          var treeish, force, url, dir_name, parts, dir_exists, download_path;
          return _regeneratorRuntime().wrap(function _callee14$(_context14) {
            while (1) switch (_context14.prev = _context14.next) {
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
                  _context14.next = 11;
                  break;
                }
                if (_this15.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Repository '".concat(repo_name, "', '").concat(treeish, "' has already been downloaded to ").concat(download_path, ". To download again, execute 'qx clean'."));
                }
                _context14.next = 23;
                break;
              case 11:
                if (_this15.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Downloading repository '".concat(repo_name, "', '").concat(treeish, "' from ").concat(url, " to ").concat(download_path));
                }
                _context14.prev = 12;
                _context14.next = 15;
                return download(url, download_path, {
                  extract: true,
                  strip: 1
                });
              case 15:
                _context14.next = 23;
                break;
              case 17:
                _context14.prev = 17;
                _context14.t0 = _context14["catch"](12);
                // remove download path so that failed downloads do not result in empty folder
                if (_this15.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Download failed: ".concat(_context14.t0.message, ". Removing download folder."));
                }
                rimraf.sync(download_path);
                qx.tool.compiler.Console.error("Could not install '".concat(repo_name, "@").concat(treeish, "'. Use the --verbose flag for more information."));
                process.exit(1);
              case 23:
                return _context14.abrupt("return", {
                  download_path: download_path,
                  dir_exists: dir_exists
                });
              case 24:
              case "end":
                return _context14.stop();
            }
          }, _callee14, null, [[12, 17]]);
        }))();
      }
    }
  });
  qx.tool.cli.commands["package"].Install.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Install.js.map?dt=1735383870394