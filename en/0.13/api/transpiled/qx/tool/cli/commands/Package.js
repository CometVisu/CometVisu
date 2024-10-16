function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
      __P_468_0: null,
      /**
       * @override
       */
      checkMigrations: function checkMigrations() {
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
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
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fs.unlinkAsync(_this.getLockfilePath());
              case 2:
              case "end":
                return _context2.stop();
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
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this2.getLockfileModel();
              case 2:
                return _context3.abrupt("return", _context3.sent.getData());
              case 3:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }))();
      },
      /**
       * Returns the model of the lockfile
       * @return {Promise<qx.tool.config.Lockfile>}
       */
      getLockfileModel: function getLockfileModel() {
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", qx.tool.config.Lockfile.getInstance().load());
              case 1:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }))();
      },
      /**
       * Returns the model of the manifest
       * @return {Promise<qx.tool.config.Manifest>}
       */
      getManifestModel: function getManifestModel() {
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", qx.tool.config.Manifest.getInstance().load());
              case 1:
              case "end":
                return _context5.stop();
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
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
          return _regeneratorRuntime().wrap(function _callee6$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _this3.getManifestModel();
              case 2:
                _context6.t0 = _context6.sent;
                _context6.next = 5;
                return _this3.getLockfileModel();
              case 5:
                _context6.t1 = _context6.sent;
                return _context6.abrupt("return", [_context6.t0, _context6.t1]);
              case 7:
              case "end":
                return _context6.stop();
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
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
          var _yield$_this4$_getCon, _yield$_this4$_getCon2, manifestModel, lockfileModel;
          return _regeneratorRuntime().wrap(function _callee7$(_context7) {
            while (1) switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _this4._getConfigData();
              case 2:
                _yield$_this4$_getCon = _context7.sent;
                _yield$_this4$_getCon2 = _slicedToArray(_yield$_this4$_getCon, 2);
                manifestModel = _yield$_this4$_getCon2[0];
                lockfileModel = _yield$_this4$_getCon2[1];
                if (!(_this4.argv.save && manifestModel.isDirty())) {
                  _context7.next = 10;
                  break;
                }
                _context7.next = 9;
                return manifestModel.save();
              case 9:
                if (_this4.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Saved dependency data to ".concat(manifestModel.getRelativeDataPath()));
                }
              case 10:
                if (!lockfileModel.isDirty()) {
                  _context7.next = 14;
                  break;
                }
                _context7.next = 13;
                return lockfileModel.save();
              case 13:
                if (_this4.argv.verbose) {
                  qx.tool.compiler.Console.info(">>> Saved library data to ".concat(lockfileModel.getRelativeDataPath()));
                }
              case 14:
              case "end":
                return _context7.stop();
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
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
          var library;
          return _regeneratorRuntime().wrap(function _callee8$(_context8) {
            while (1) switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _this5.getLockfileModel();
              case 2:
                library = _context8.sent.getValue("libraries").find(function (lib) {
                  return lib.repo_name === repo_name && lib.library_name === library_name;
                });
                return _context8.abrupt("return", library ? library.repo_tag : false);
              case 4:
              case "end":
                return _context8.stop();
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
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
          return _regeneratorRuntime().wrap(function _callee9$(_context9) {
            while (1) switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return _this6.getLockfileModel();
              case 2:
                return _context9.abrupt("return", _context9.sent.getValue("libraries").find(function (lib) {
                  return lib.library_name === library_name;
                }));
              case 3:
              case "end":
                return _context9.stop();
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
        if (!readFromFile && this.__P_468_0 && _typeof(this.__P_468_0) == "object") {
          return this.__P_468_0;
        }
        try {
          this.__P_468_0 = JSON.parse(fs.readFileSync(this.getCachePath(), "UTF-8"));
        } catch (e) {
          this.__P_468_0 = {
            repos: {
              list: [],
              data: {}
            },
            compat: {}
          };
        }
        return this.__P_468_0;
      },
      /**
       * Manually overwrite the cache data
       * @param data {Object}
       * @return {void}
       */
      setCache: function setCache(data) {
        this.__P_468_0 = data;
      },
      /**
       * Saves the cache to a hidden local file
       * @return {void}
       */
      saveCache: function saveCache() {
        var _this7 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
          return _regeneratorRuntime().wrap(function _callee10$(_context10) {
            while (1) switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return qx.tool.utils.Utils.makeParentDir(_this7.getCachePath());
              case 2:
                _context10.next = 4;
                return fs.writeFileAsync(_this7.getCachePath(), JSON.stringify(_this7.__P_468_0, null, 2), "UTF-8");
              case 4:
              case "end":
                return _context10.stop();
            }
          }, _callee10);
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
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
          var cache, data;
          return _regeneratorRuntime().wrap(function _callee11$(_context11) {
            while (1) switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                cache = _this8.__P_468_0 || _this8.getCache(true);
                data = stringify(cache, {
                  space: 2
                });
                _context11.next = 5;
                return fs.writeFileAsync(path, data, "UTF-8");
              case 5:
                _context11.next = 11;
                break;
              case 7:
                _context11.prev = 7;
                _context11.t0 = _context11["catch"](0);
                qx.tool.compiler.Console.error("Error exporting cache to ".concat(path, ":") + _context11.t0.message);
                process.exit(1);
              case 11:
              case "end":
                return _context11.stop();
            }
          }, _callee11, null, [[0, 7]]);
        }))();
      },
      /**
       * Clears the cache
       */
      clearCache: function clearCache() {
        this.__P_468_0 = null;
        try {
          fs.unlinkSync(this.getCachePath());
        } catch (e) {}
      }
    }
  });
  qx.tool.cli.commands.Package.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Package.js.map?dt=1729101251430