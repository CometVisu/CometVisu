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
      "qx.tool.cli.commands.package.Update": {},
      "qx.tool.cli.commands.package.List": {},
      "qx.tool.compiler.Console": {},
      "qx.tool.cli.commands.package.Install": {},
      "qx.lang.Type": {},
      "qx.tool.utils.Utils": {}
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

  var semver = require("semver");

  /**
   * Lists compatible library packages
   */
  qx.Class.define("qx.tool.cli.commands.package.Upgrade", {
    extend: qx.tool.cli.commands.Package,
    statics: {
      getYargsCommand: function getYargsCommand() {
        return {
          command: "upgrade [library_uri]",
          describe: "if no library URI is given, upgrades all available libraries to the latest compatible version, otherwise upgrade only the package identified by the URI.",
          builder: {
            quiet: {
              alias: "q",
              describe: "No output"
            },
            verbose: {
              alias: "v",
              describe: "Verbose logging"
            },
            "releases-only": {
              alias: "r",
              describe: "Upgrade regular releases only (this leaves versions based on branches, commits etc. untouched)",
              "default": true
            },
            reinstall: {
              alias: "R",
              describe: "Do not upgrade, reinstall current version"
            },
            prereleases: {
              alias: "p",
              describe: "Use prereleases if available"
            },
            "dry-run": {
              alias: "d",
              describe: "Show result only, do not actually upgrade"
            },
            "qx-version": {
              check: function check(argv) {
                return semver.valid(argv.qxVersion);
              },
              describe: "A semver string. If given, the qooxdoo version for which to upgrade the package"
            }
          }
        };
      }
    },
    members: {
      /**
       * Process the command
       * @return {Promise<void>}
       */
      process: function process() {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var qxVersion, data, found, installer, _iterator, _step, library;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return qx.tool.cli.commands["package"].Upgrade.superclass.prototype.process.call(_this);
              case 2:
                _context.next = 4;
                return _this.getAppQxVersion();
              case 4:
                qxVersion = _context.sent;
                _context.next = 7;
                return new qx.tool.cli.commands["package"].Update({
                  quiet: true,
                  prereleases: _this.argv.prereleases
                }).process();
              case 7:
                _context.next = 9;
                return new qx.tool.cli.commands["package"].List({
                  quiet: true,
                  prereleases: _this.argv.prereleases,
                  qxVersion: qxVersion
                }).process();
              case 9:
                if (!_this.argv.quiet) {
                  qx.tool.compiler.Console.info("Upgrading project dependencies to the latest available release for qooxdoo version ".concat(qxVersion, ":"));
                }
                _context.next = 12;
                return _this.getLockfileData();
              case 12:
                data = _context.sent;
                found = false;
                installer = new qx.tool.cli.commands["package"].Install({
                  quiet: _this.argv.quiet,
                  verbose: _this.argv.verbose,
                  qxVersion: qxVersion
                });
                _iterator = _createForOfIteratorHelper(data.libraries);
                _context.prev = 16;
                _iterator.s();
              case 18:
                if ((_step = _iterator.n()).done) {
                  _context.next = 41;
                  break;
                }
                library = _step.value;
                if (!(!library.repo_name || !library.repo_tag)) {
                  _context.next = 22;
                  break;
                }
                return _context.abrupt("continue", 39);
              case 22:
                if (!library.uri) {
                  library.uri = library.repo_name;
                }
                // if a library to upgrade has been provided, skip non-matching ones
                if (!(_this.argv.library_uri && library.uri !== _this.argv.library_uri)) {
                  _context.next = 25;
                  break;
                }
                return _context.abrupt("continue", 39);
              case 25:
                found = true;
                if (!(_this.argv.releasesOnly && (!qx.lang.Type.isString(library.repo_tag) || !library.repo_tag.startsWith("v")))) {
                  _context.next = 29;
                  break;
                }
                if (!_this.argv.quiet) {
                  qx.tool.compiler.Console.info("Skipping ".concat(library.library_name, " (").concat(library.uri, "@").concat(library.repo_tag, ") since it is not a release."));
                }
                return _context.abrupt("continue", 39);
              case 29:
                if (!_this.argv.dryRun) {
                  _context.next = 32;
                  break;
                }
                qx.tool.compiler.Console.info("Dry run. Not upgrading ".concat(library.library_name, " (").concat(library.uri, "@").concat(library.repo_tag, ")."));
                return _context.abrupt("continue", 39);
              case 32:
                if (!(library.repo_tag && _this.argv.reinstall)) {
                  _context.next = 37;
                  break;
                }
                _context.next = 35;
                return installer.install(library.uri, library.repo_tag);
              case 35:
                _context.next = 39;
                break;
              case 37:
                _context.next = 39;
                return installer.install(library.uri);
              case 39:
                _context.next = 18;
                break;
              case 41:
                _context.next = 46;
                break;
              case 43:
                _context.prev = 43;
                _context.t0 = _context["catch"](16);
                _iterator.e(_context.t0);
              case 46:
                _context.prev = 46;
                _iterator.f();
                return _context.finish(46);
              case 49:
                if (found) {
                  _context.next = 55;
                  break;
                }
                if (!_this.argv.library_uri) {
                  _context.next = 54;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Library '".concat(_this.argv.library_uri, "' is not installed."));
              case 54:
                qx.tool.compiler.Console.info("No packages to upgrade.");
              case 55:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[16, 43, 46, 49]]);
        }))();
      }
    }
  });
  qx.tool.cli.commands["package"].Upgrade.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Upgrade.js.map?dt=1717235402312