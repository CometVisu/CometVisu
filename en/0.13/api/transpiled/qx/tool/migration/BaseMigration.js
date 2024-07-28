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
      "qx.tool.utils.Promisify": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.tool.migration.Runner": {},
      "qx.tool.config.Utils": {},
      "qx.tool.compiler.Console": {},
      "qx.core.Assert": {},
      "qx.tool.config.Abstract": {},
      "qx.tool.cli.commands.package.Upgrade": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2021 The authors
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (info@bibliograph.org, @cboulanger)
  
  ************************************************************************ */

  var process = require("process");
  var fs = qx.tool.utils.Promisify.fs;
  var fsp = require("fs").promises;
  var replaceInFile = require("replace-in-file");
  var semver = require("semver");

  /**
   * The base class for migrations, containing useful methods to
   * manipulate source files, and to update runtime information
   * on the individual migration class. It also holds a reference
   * to the runner which contains meta data for all migrations.
   */
  qx.Class.define("qx.tool.migration.BaseMigration", {
    type: "abstract",
    extend: qx.core.Object,
    /**
     * Constructor
     * @param {qx.tool.migration.Runner} runner The runner instance
     */
    construct: function construct(runner) {
      qx.core.Object.constructor.call(this);
      this.setRunner(runner);
    },
    properties: {
      runner: {
        check: "qx.tool.migration.Runner"
      },
      applied: {
        check: "Number",
        init: 0
      },
      pending: {
        check: "Number",
        init: 0
      }
    },
    members: {
      /**
       * Returns the version of qooxdoo this migration applies to.
       */
      getVersion: function getVersion() {
        return this.classname.match(/\.M([0-9_]+)$/)[1].replace(/_/g, ".");
      },
      /**
       * Returns the qooxdoo version that has been passed to the Runner or the
       * one from the environment
       * @return {Promise<String>}
       */
      getQxVersion: function getQxVersion() {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.getRunner().getQxVersion();
              case 2:
                _context.t0 = _context.sent;
                if (_context.t0) {
                  _context.next = 5;
                  break;
                }
                _context.t0 = qx.tool.config.Utils.getQxVersion();
              case 5:
                return _context.abrupt("return", _context.t0);
              case 6:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      /**
       * Output message that announces a migration. What this does is to mark it
       * visually
       * @param message
       */
      announce: function announce(message) {
        if (this.getRunner().getVerbose()) {
          qx.tool.compiler.Console.info("*** " + message);
        }
      },
      /**
       * Marks one or more migration steps as applied
       * @param {Number|String} param Optional. If number, number of migrations to mark
       * as applied, defaults to 1; if String, message to be `info()`ed if verbose=true
       */
      markAsApplied: function markAsApplied(param) {
        var numberOfMigrations = 1;
        if (typeof param == "string") {
          if (this.getRunner().getVerbose()) {
            qx.tool.compiler.Console.info(param);
          }
        } else if (typeof param == "number") {
          numberOfMigrations = param;
        } else if (typeof param != "undefined") {
          throw new TypeError("Argument must be string or number");
        }
        this.setApplied(this.getApplied() + numberOfMigrations);
      },
      /**
       * Marks one or more migration steps as pending
       * @param {Number|String} param Optional. If number, number of migrations to mark
       * as pending, defaults to 1; if String, message to be `announce()`ed
       */
      markAsPending: function markAsPending(param) {
        var numberOfMigrations = 1;
        if (typeof param == "string") {
          if (this.getRunner().getVerbose()) {
            this.announce(param);
          }
        } else if (typeof param == "number") {
          numberOfMigrations = param;
        } else if (typeof param != "undefined") {
          throw new TypeError("Argument must be string or number");
        }
        this.setPending(this.getPending() + numberOfMigrations);
      },
      /**
       * Rename source files, unless this is a dry run, in which case
       * it will only annouce it and mark the migration step as pending.
       * @param {String[]} fileList Array containing arrays of [new name, old name]
       */
      renameFilesUnlessDryRun: function renameFilesUnlessDryRun(fileList) {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var dryRun, filesToRename, _iterator, _step, _step$value, newPath, oldPath, _iterator2, _step2, _step2$value, _newPath, _oldPath;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                dryRun = _this2.getRunner().getDryRun();
                qx.core.Assert.assertArray(fileList);
                _context2.next = 4;
                return _this2.checkFilesToRename(fileList);
              case 4:
                filesToRename = _context2.sent;
                if (!filesToRename.length) {
                  _context2.next = 39;
                  break;
                }
                if (!dryRun) {
                  _context2.next = 13;
                  break;
                }
                // announce migration
                _this2.announce("The following files will be renamed:");
                _iterator = _createForOfIteratorHelper(filesToRename);
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    _step$value = _slicedToArray(_step.value, 2), newPath = _step$value[0], oldPath = _step$value[1];
                    _this2.announce("'".concat(oldPath, "' => '").concat(newPath, "'."));
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
                _this2.markAsPending();
                _context2.next = 39;
                break;
              case 13:
                // apply migration
                _iterator2 = _createForOfIteratorHelper(filesToRename);
                _context2.prev = 14;
                _iterator2.s();
              case 16:
                if ((_step2 = _iterator2.n()).done) {
                  _context2.next = 30;
                  break;
                }
                _step2$value = _slicedToArray(_step2.value, 2), _newPath = _step2$value[0], _oldPath = _step2$value[1];
                _context2.prev = 18;
                _context2.next = 21;
                return fs.renameAsync(_oldPath, _newPath);
              case 21:
                _this2.debug("Renamed '".concat(_oldPath, "' to '").concat(_newPath, "'."));
                _context2.next = 28;
                break;
              case 24:
                _context2.prev = 24;
                _context2.t0 = _context2["catch"](18);
                qx.tool.compiler.Console.error("Renaming '".concat(_oldPath, "' to '").concat(_newPath, "' failed: ").concat(_context2.t0.message, "."));
                process.exit(1);
              case 28:
                _context2.next = 16;
                break;
              case 30:
                _context2.next = 35;
                break;
              case 32:
                _context2.prev = 32;
                _context2.t1 = _context2["catch"](14);
                _iterator2.e(_context2.t1);
              case 35:
                _context2.prev = 35;
                _iterator2.f();
                return _context2.finish(35);
              case 38:
                _this2.markAsApplied();
              case 39:
              case "end":
                return _context2.stop();
            }
          }, _callee2, null, [[14, 32, 35, 38], [18, 24]]);
        }))();
      },
      /**
       * Given an array of [newPath,oldPath], filter by those which exist
       * at oldPath and not at newPath
       * @param fileList {[]}
       * @return {Promise<[]>}
       */
      checkFilesToRename: function checkFilesToRename(fileList) {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var filesToRename, _iterator3, _step3, _step3$value, newPath, oldPath;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                filesToRename = [];
                _iterator3 = _createForOfIteratorHelper(fileList);
                _context3.prev = 2;
                _iterator3.s();
              case 4:
                if ((_step3 = _iterator3.n()).done) {
                  _context3.next = 17;
                  break;
                }
                _step3$value = _slicedToArray(_step3.value, 2), newPath = _step3$value[0], oldPath = _step3$value[1];
                _context3.next = 8;
                return fs.existsAsync(newPath);
              case 8:
                _context3.t0 = !_context3.sent;
                if (!_context3.t0) {
                  _context3.next = 13;
                  break;
                }
                _context3.next = 12;
                return fs.existsAsync(oldPath);
              case 12:
                _context3.t0 = _context3.sent;
              case 13:
                if (!_context3.t0) {
                  _context3.next = 15;
                  break;
                }
                filesToRename.push([newPath, oldPath]);
              case 15:
                _context3.next = 4;
                break;
              case 17:
                _context3.next = 22;
                break;
              case 19:
                _context3.prev = 19;
                _context3.t1 = _context3["catch"](2);
                _iterator3.e(_context3.t1);
              case 22:
                _context3.prev = 22;
                _iterator3.f();
                return _context3.finish(22);
              case 25:
                return _context3.abrupt("return", filesToRename);
              case 26:
              case "end":
                return _context3.stop();
            }
          }, _callee3, null, [[2, 19, 22, 25]]);
        }))();
      },
      /**
       * Checks if the given file or array of files contains a given text
       * @param {String|String[]} files
       * @param {String} text
       * @return {Promise<Boolean>}
       */
      checkFilesContain: function checkFilesContain(files, text) {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          var _iterator4, _step4, file;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                files = Array.isArray(files) ? files : [files];
                _iterator4 = _createForOfIteratorHelper(files);
                _context4.prev = 2;
                _iterator4.s();
              case 4:
                if ((_step4 = _iterator4.n()).done) {
                  _context4.next = 17;
                  break;
                }
                file = _step4.value;
                _context4.next = 8;
                return fsp.stat(file);
              case 8:
                _context4.t0 = _context4.sent.isFile();
                if (!_context4.t0) {
                  _context4.next = 13;
                  break;
                }
                _context4.next = 12;
                return fsp.readFile(file, "utf8");
              case 12:
                _context4.t0 = _context4.sent.includes(text);
              case 13:
                if (!_context4.t0) {
                  _context4.next = 15;
                  break;
                }
                return _context4.abrupt("return", true);
              case 15:
                _context4.next = 4;
                break;
              case 17:
                _context4.next = 22;
                break;
              case 19:
                _context4.prev = 19;
                _context4.t1 = _context4["catch"](2);
                _iterator4.e(_context4.t1);
              case 22:
                _context4.prev = 22;
                _iterator4.f();
                return _context4.finish(22);
              case 25:
                return _context4.abrupt("return", false);
              case 26:
              case "end":
                return _context4.stop();
            }
          }, _callee4, null, [[2, 19, 22, 25]]);
        }))();
      },
      /**
       * Replace text in source files, unless this is a dry run, in which case
       * it will only annouce it and mark the migration step as pending.
       * @param {{files: string, from: string, to: string}[]} replaceInFilesArr
       *    Array containing objects compatible with https://github.com/adamreisnz/replace-in-file
       * @return {Promise<void>}
       */
      replaceInFilesUnlessDryRun: function replaceInFilesUnlessDryRun() {
        var _arguments = arguments,
          _this3 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
          var replaceInFilesArr, dryRun, _iterator5, _step5, replaceInFiles;
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                replaceInFilesArr = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : [];
                qx.core.Assert.assertArray(replaceInFilesArr);
                dryRun = _this3.getRunner().getDryRun();
                _iterator5 = _createForOfIteratorHelper(replaceInFilesArr);
                _context5.prev = 4;
                _iterator5.s();
              case 6:
                if ((_step5 = _iterator5.n()).done) {
                  _context5.next = 28;
                  break;
                }
                replaceInFiles = _step5.value;
                _context5.next = 10;
                return _this3.checkFilesContain(replaceInFiles.files, replaceInFiles.from);
              case 10:
                if (!_context5.sent) {
                  _context5.next = 26;
                  break;
                }
                if (!dryRun) {
                  _context5.next = 15;
                  break;
                }
                _this3.announce("In the file(s) ".concat(replaceInFiles.files, ", '").concat(replaceInFiles.from, "' will be changed to '").concat(replaceInFiles.to, "'."));
                _this3.markAsPending();
                return _context5.abrupt("continue", 26);
              case 15:
                _context5.prev = 15;
                _this3.debug("Replacing '".concat(replaceInFiles.from, "' with '").concat(replaceInFiles.to, "' in ").concat(replaceInFiles.files));
                _context5.next = 19;
                return replaceInFile(replaceInFiles);
              case 19:
                _this3.markAsApplied();
                _context5.next = 26;
                break;
              case 22:
                _context5.prev = 22;
                _context5.t0 = _context5["catch"](15);
                qx.tool.compiler.Console.error("Error replacing in files: ".concat(_context5.t0.message));
                process.exit(1);
              case 26:
                _context5.next = 6;
                break;
              case 28:
                _context5.next = 33;
                break;
              case 30:
                _context5.prev = 30;
                _context5.t1 = _context5["catch"](4);
                _iterator5.e(_context5.t1);
              case 33:
                _context5.prev = 33;
                _iterator5.f();
                return _context5.finish(33);
              case 36:
              case "end":
                return _context5.stop();
            }
          }, _callee5, null, [[4, 30, 33, 36], [15, 22]]);
        }))();
      },
      /**
       * Updates a dependency in the given Manifest model, , unless this is a dry run, in which case
       * it will only annouce it and mark the migration step as pending.
       * @param {qx.tool.config.Manifest} manifestModel
       * @param {String} dependencyName The name of the dependency in the `require object
       * @param {String} semverRange A semver-compatible range string
       * @return {Promise<void>}
       * @private
       * @return {Promise<void>}
       */
      updateDependencyUnlessDryRun: function updateDependencyUnlessDryRun(manifestModel, dependencyName, semverRange) {
        var _this4 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
          var oldRange;
          return _regeneratorRuntime().wrap(function _callee6$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                oldRange = manifestModel.getValue("requires.".concat(dependencyName));
                if (_this4.getRunner().getDryRun()) {
                  _this4.announce("Manifest version range for ".concat(dependencyName, " will be updated from ").concat(oldRange, " to ").concat(semverRange, "."));
                  _this4.markAsPending();
                } else {
                  manifestModel.setValue("requires.".concat(dependencyName), semverRange);
                  _this4.markAsApplied();
                }
              case 2:
              case "end":
                return _context6.stop();
            }
          }, _callee6);
        }))();
      },
      /**
       * Updates the `@qooxdoo/framework` dependency in the given Manifest model, if
       * the current qooxdoo version is not covered by it. If this is a dry run, the
       * change will only be annouced and the migration step marked as pending.
       *
       * @param {qx.tool.config.Manifest} manifestModel
       * @return {Promise<void>}
       */
      updateQxDependencyUnlessDryRun: function updateQxDependencyUnlessDryRun(manifestModel) {
        var _this5 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
          var qxVersion, qxRange;
          return _regeneratorRuntime().wrap(function _callee7$(_context7) {
            while (1) switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _this5.getQxVersion();
              case 2:
                qxVersion = _context7.sent;
                qxRange = manifestModel.getValue("requires.@qooxdoo/framework");
                if (semver.satisfies(qxVersion, qxRange)) {
                  _context7.next = 8;
                  break;
                }
                qxRange = "^".concat(qxVersion);
                _context7.next = 8;
                return _this5.updateDependencyUnlessDryRun(manifestModel, "@qooxdoo/framework", qxRange);
              case 8:
              case "end":
                return _context7.stop();
            }
          }, _callee7);
        }))();
      },
      /**
       * Updates the json-schema in a configuration file, unless this is a dry run, in which case
       * it will only annouce it and mark the migration step as pending.
       * @param {qx.tool.config.Abstract} configModel
       * @param {String} schemaUri
       * @return {Promise<void>}
       */
      updateSchemaUnlessDryRun: function updateSchemaUnlessDryRun(configModel, schemaUri) {
        var _this6 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
          return _regeneratorRuntime().wrap(function _callee8$(_context8) {
            while (1) switch (_context8.prev = _context8.next) {
              case 0:
                qx.core.Assert.assertInstance(configModel, qx.tool.config.Abstract);
                if (configModel.getValue("$schema") !== schemaUri) {
                  if (_this6.getRunner().getDryRun()) {
                    _this6.markAsPending("Schema version for ".concat(configModel.getDataPath(), " will be set to ").concat(schemaUri, "."));
                  } else {
                    configModel.setValue("$schema", schemaUri);
                    _this6.markAsApplied("Schema version for ".concat(configModel.getDataPath(), " updated."));
                  }
                }
              case 2:
              case "end":
                return _context8.stop();
            }
          }, _callee8);
        }))();
      },
      /**
       * Upgrades the applications's installed packages, unless this is a dry run, in which case
       * it will only annouce it and mark the migration step as pending.
       * @return {Promise<void>}
       */
      upgradePackagesUnlessDryRun: function upgradePackagesUnlessDryRun() {
        var _this7 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
          var runner, options;
          return _regeneratorRuntime().wrap(function _callee9$(_context9) {
            while (1) switch (_context9.prev = _context9.next) {
              case 0:
                runner = _this7.getRunner();
                if (!runner.getDryRun()) {
                  _context9.next = 6;
                  break;
                }
                _this7.announce("Packages will be upgraded.");
                _this7.markAsPending();
                _context9.next = 10;
                break;
              case 6:
                options = {
                  verbose: runner.getVerbose(),
                  qxVersion: runner.getQxVersion()
                };
                _context9.next = 9;
                return new qx.tool.cli.commands["package"].Upgrade(options).process();
              case 9:
                _this7.markAsApplied();
              case 10:
              case "end":
                return _context9.stop();
            }
          }, _callee9);
        }))();
      }
    }
  });
  qx.tool.migration.BaseMigration.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BaseMigration.js.map?dt=1722153844165