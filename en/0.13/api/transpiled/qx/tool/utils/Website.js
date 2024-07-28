function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
      "qx.util.ResourceManager": {
        "construct": true
      },
      "qx.tool.utils.files.Utils": {},
      "qx.tool.compiler.Console": {},
      "qx.tool.cli.commands.Create": {},
      "qx.tool.cli.commands.package.Install": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2011-2019 The authors
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (john.spackman@zenesis.com, @johnspackman)
       * Christian Boulanger (info@bibliograph.org, @cboulanger)
  
  ************************************************************************ */

  var fs = qx.tool.utils.Promisify.fs;
  var process = require("process");
  var path = require("upath");
  var rimraf = require("rimraf");
  var dot = require("dot");
  require("jstransformer-dot");
  var metalsmith = require("metalsmith");
  var layouts = require("@metalsmith/layouts");
  var markdown = require("@metalsmith/markdown");
  //const filenames = require("metalsmith-filenames");
  //var permalinks = require("metalsmith-permalinks");
  /**
   * @external(qx/tool/loadsass.js)
   * @ignore(loadSass)
   */
  /* global loadSass */
  var sass = loadSass();
  var chokidar = require("chokidar");

  // config
  dot.templateSettings.strip = false;
  qx.Class.define("qx.tool.utils.Website", {
    extend: qx.core.Object,
    statics: {
      APP_NAMESPACE: "apps"
    },
    construct: function construct() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      qx.core.Object.apply(this, arguments);
      var self = qx.tool.utils.Website;
      var p = qx.util.ResourceManager.getInstance().toUri("qx/tool/website/.gitignore");
      p = path.dirname(p);
      this.initSourceDir(p);
      this.initTargetDir(path.join(p, "build"));
      this.initAppsNamespace(self.APP_NAMESPACE);
      var _iterator = _createForOfIteratorHelper(Object.getOwnPropertyNames(options)),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;
          this.set(key, options[key]);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    properties: {
      appsNamespace: {
        check: "String",
        deferredInit: true
      },
      sourceDir: {
        check: "String",
        deferredInit: true
      },
      targetDir: {
        check: "String",
        deferredInit: true
      }
    },
    members: {
      /** @type {chokidar} watcher */
      __P_516_0: null,
      /** @type {Boolean} whether the watcher is ready yet */
      __P_516_1: false,
      /** @type {Integer} setTimeout timer ID for debouncing builds */
      __P_516_2: null,
      /** @type {Boolean} Whether the build is currently taking place */
      __P_516_3: false,
      /** @type {Boolean} Whether a rebuild is needed ASAP */
      __P_516_4: false,
      /**
       * Starts the watcher for files in the source directory and compiles as needed
       */
      startWatcher: function startWatcher() {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var sourceDir;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.stopWatcher();
              case 2:
                _context2.next = 4;
                return qx.tool.utils.files.Utils.correctCase(_this.getSourceDir());
              case 4:
                sourceDir = _context2.sent;
                _this._watcher = chokidar.watch([sourceDir], {});
                _this._watcher.on("change", function (filename) {
                  return _this.__P_516_5("change", filename);
                });
                _this._watcher.on("add", function (filename) {
                  return _this.__P_516_5("add", filename);
                });
                _this._watcher.on("unlink", function (filename) {
                  return _this.__P_516_5("unlink", filename);
                });
                _this._watcher.on("ready", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _this.triggerRebuild(true);
                      case 2:
                        _this.__P_516_1 = true;
                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                })));
                _this._watcher.on("error", function (err) {
                  qx.tool.compiler.Console.print(err.code == "ENOSPC" ? "qx.tool.cli.watch.enospcError" : "qx.tool.cli.watch.watchError", err);
                });
              case 11:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      /**
       * Stops the watcher, if its running
       */
      stopWatcher: function stopWatcher() {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                if (!_this2._watcher) {
                  _context3.next = 5;
                  break;
                }
                _context3.next = 3;
                return _this2._watcher.stop();
              case 3:
                _this2._watcher = null;
                _this2.__P_516_1 = false;
              case 5:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }))();
      },
      /**
       * Whether the watcher is running
       *
       * @return {Boolean} true if its running
       */
      isWatching: function isWatching() {
        return Boolean(this._watcher);
      },
      /**
       * Waits for the rebuild process to complete, if it is running
       */
      waitForRebuildComplete: function waitForRebuildComplete() {
        var _this3 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                if (!_this3.__P_516_6) {
                  _context4.next = 3;
                  break;
                }
                _context4.next = 3;
                return _this3.__P_516_6;
              case 3:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }))();
      },
      /**
       * Rebuilds everything needed for the website
       */
      rebuildAll: function rebuildAll() {
        var _this4 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _this4.generateSite();
              case 2:
                _context5.next = 4;
                return _this4.compileScss();
              case 4:
              case "end":
                return _context5.stop();
            }
          }, _callee5);
        }))();
      },
      /**
       * Event handler for changes to the source files
       *
       * @param type {String} type of change, one of "change", "add", "unlink"
       * @param filename {String} the file that changed
       */
      __P_516_5: function __P_516_5(type, filename) {
        if (this.__P_516_1) {
          if (!filename.toLowerCase().startsWith(this.getTargetDir().toLowerCase())) {
            this.triggerRebuild(false);
          }
        }
      },
      /**
       * Triggers a rebuild of the website, asynchronously.  Unless immediate is true,
       * the rebuild will only happen after a short delay; but each time this is called,
       * the delay is restarted.  This is to allow multiple files to be changed without
       * swamping the processor with compilations.
       *
       * @param immediate {Boolean?} if true, rebuild starts ASAP
       */
      triggerRebuild: function triggerRebuild(immediate) {
        var _this5 = this;
        if (this.__P_516_3) {
          this.__P_516_4 = true;
          return;
        }
        var _rebuilderImpl = /*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return _this5.rebuildAll();
                case 2:
                  if (!_this5.__P_516_4) {
                    _context6.next = 6;
                    break;
                  }
                  _this5.__P_516_4 = false;
                  _context6.next = 6;
                  return _rebuilderImpl();
                case 6:
                case "end":
                  return _context6.stop();
              }
            }, _callee6);
          }));
          return function rebuilderImpl() {
            return _ref2.apply(this, arguments);
          };
        }();
        var rebuilder = /*#__PURE__*/function () {
          var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
            return _regeneratorRuntime().wrap(function _callee7$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  _this5.__P_516_3 = true;
                  _context7.prev = 1;
                  _this5.__P_516_6 = _rebuilderImpl();
                  _context7.next = 5;
                  return _this5.__P_516_6;
                case 5:
                  _this5.__P_516_6 = null;
                case 6:
                  _context7.prev = 6;
                  _this5.__P_516_3 = false;
                  return _context7.finish(6);
                case 9:
                case "end":
                  return _context7.stop();
              }
            }, _callee7, null, [[1,, 6, 9]]);
          }));
          return function rebuilder() {
            return _ref3.apply(this, arguments);
          };
        }();
        if (this.__P_516_2) {
          clearTimeout(this.__P_516_2);
          this.__P_516_2 = null;
        }
        this.__P_516_2 = setTimeout(rebuilder, immediate ? 1 : 250);
      },
      /**
       * Metalsmith Plugin that collates a list of pages that are to be included in the site navigation
       * into the metadata, along with their URLs.
       *
       * If the metadata has a `sites.pages`, then it is expected to be an array of URLs which indicates
       * the ordering to be applied; `sites.pages` is replaced with an array of objects, one per page,
       * that contains `url` and `title` properties.
       *
       */
      getPages: function getPages(files, metalsmith) {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
          var metadata, pages, order, unorderedPages, addPage, _iterator2, _step2, filename, file;
          return _regeneratorRuntime().wrap(function _callee8$(_context8) {
            while (1) switch (_context8.prev = _context8.next) {
              case 0:
                addPage = function _addPage(url, title) {
                  var page = {
                    url: url,
                    title: title
                  };
                  var index = order[url];
                  if (index !== undefined) {
                    pages[index] = page;
                  } else {
                    unorderedPages.push(page);
                  }
                };
                metadata = metalsmith.metadata();
                pages = [];
                order = {};
                if (metadata.site.pages) {
                  metadata.site.pages.forEach(function (url, index) {
                    return typeof url == "string" ? order[url] = index : null;
                  });
                }
                unorderedPages = [];
                _iterator2 = _createForOfIteratorHelper(Object.getOwnPropertyNames(files));
                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    filename = _step2.value;
                    file = files[filename];
                    if (filename === "index.html") {
                      addPage("/", file.title || "Home Page");
                    } else if (file.permalink || file.navigation) {
                      addPage(file.permalink || filename, file.title || "Home Page");
                    }
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
                unorderedPages.forEach(function (page) {
                  return pages.push(page);
                });
                metadata.site.pages = pages;
              case 10:
              case "end":
                return _context8.stop();
            }
          }, _callee8);
        }))();
      },
      /**
       * Metalsmith plugin that loads partials and adding them to the metadata.partials map.  Each file
       * is added with its filename, and if it is a .html filename is also added without the .html
       * extension.
       *
       */
      loadPartials: function loadPartials(files, metalsmith) {
        var _this6 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
          var metadata, partialsDir, _iterator3, _step3, filename, m, _m, unused, name, ext, data, fn;
          return _regeneratorRuntime().wrap(function _callee9$(_context9) {
            while (1) switch (_context9.prev = _context9.next) {
              case 0:
                metadata = metalsmith.metadata();
                partialsDir = path.join(_this6.getSourceDir(), "partials");
                _context9.next = 4;
                return fs.readdirAsync(partialsDir, "utf8");
              case 4:
                files = _context9.sent;
                _iterator3 = _createForOfIteratorHelper(files);
                _context9.prev = 6;
                _iterator3.s();
              case 8:
                if ((_step3 = _iterator3.n()).done) {
                  _context9.next = 32;
                  break;
                }
                filename = _step3.value;
                m = filename.match(/^(.+)\.([^.]+)$/);
                if (m) {
                  _context9.next = 13;
                  break;
                }
                return _context9.abrupt("continue", 30);
              case 13:
                _m = _slicedToArray(m, 3), unused = _m[0], name = _m[1], ext = _m[2];
                if (unused) {
                  // this is simply to avoid linting errors until https://github.com/qooxdoo/qooxdoo/issues/461 is fixed
                }
                _context9.next = 17;
                return fs.readFileAsync(path.join(partialsDir, filename), "utf8");
              case 17:
                data = _context9.sent;
                fn = void 0;
                _context9.prev = 19;
                fn = dot.template(data);
                _context9.next = 27;
                break;
              case 23:
                _context9.prev = 23;
                _context9.t0 = _context9["catch"](19);
                qx.tool.compiler.Console.log("Failed to load partial " + filename + ": " + _context9.t0);
                return _context9.abrupt("continue", 30);
              case 27:
                fn.name = filename;
                metadata.partials[filename] = fn;
                if (ext === "html") {
                  metadata.partials[name] = fn;
                }
              case 30:
                _context9.next = 8;
                break;
              case 32:
                _context9.next = 37;
                break;
              case 34:
                _context9.prev = 34;
                _context9.t1 = _context9["catch"](6);
                _iterator3.e(_context9.t1);
              case 37:
                _context9.prev = 37;
                _iterator3.f();
                return _context9.finish(37);
              case 40:
              case "end":
                return _context9.stop();
            }
          }, _callee9, null, [[6, 34, 37, 40], [19, 23]]);
        }))();
      },
      /**
       * Generates the site with Metalsmith
       * @returns {Promise}
       */
      generateSite: function generateSite() {
        var _this7 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
          return _regeneratorRuntime().wrap(function _callee10$(_context10) {
            while (1) switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return new Promise(function (resolve, reject) {
                  metalsmith(_this7.getSourceDir()).metadata({
                    site: {
                      title: "Qooxdoo Application Server",
                      description: 'Mini website used by "qx serve"',
                      email: "info@qooxdoo.org",
                      twitter_username: "qooxdoo",
                      github_username: "qooxdoo",
                      pages: ["/", "/about/"]
                    },
                    baseurl: "",
                    url: "",
                    lang: "en",
                    partials: {}
                  }).source(path.join(_this7.getSourceDir(), "src")).destination(_this7.getTargetDir()).clean(true).use(_this7.loadPartials.bind(_this7)).use(markdown()).use(_this7.getPages.bind(_this7)).use(layouts({
                    engine: "dot"
                  })).build(function (err) {
                    if (err) {
                      reject(err);
                    } else {
                      resolve();
                    }
                  });
                });
              case 2:
              case "end":
                return _context10.stop();
            }
          }, _callee10);
        }))();
      },
      /**
       * Compiles SCSS into CSS
       *
       * @returns {Promise}
       */
      compileScss: function compileScss() {
        var _this8 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
          var result;
          return _regeneratorRuntime().wrap(function _callee11$(_context11) {
            while (1) switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return new Promise(function (resolve, reject) {
                  sass.render({
                    file: path.join(_this8.getSourceDir(), "sass", "qooxdoo.scss"),
                    outFile: path.join(_this8.getTargetDir(), "qooxdoo.css")
                  }, function (err, result) {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(result);
                    }
                  });
                });
              case 2:
                result = _context11.sent;
                _context11.next = 5;
                return fs.writeFileAsync(path.join(_this8.getTargetDir(), "qooxdoo.css"), result.css, "utf8");
              case 5:
              case "end":
                return _context11.stop();
            }
          }, _callee11);
        }))();
      },
      /**
       * Build the development tool apps (APIViewer, Playground, Widgetbrowser, Demobrowser)
       * @return {Promise<void>}
       */
      buildDevtools: function buildDevtools() {
        var _this9 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
          var namespace, apps_path, opts, _i, _arr, name;
          return _regeneratorRuntime().wrap(function _callee12$(_context12) {
            while (1) switch (_context12.prev = _context12.next) {
              case 0:
                namespace = _this9.getAppsNamespace();
                process.chdir(_this9.getTargetDir());
                apps_path = path.join(_this9.getTargetDir(), namespace);
                _context12.next = 5;
                return fs.existsAsync(apps_path);
              case 5:
                if (!_context12.sent) {
                  _context12.next = 7;
                  break;
                }
                rimraf.sync(apps_path);
              case 7:
                opts = {
                  noninteractive: true,
                  namespace: namespace,
                  theme: "indigo",
                  icontheme: "Tango"
                };
                _context12.next = 10;
                return new qx.tool.cli.commands.Create(opts).process();
              case 10:
                process.chdir(apps_path);
                _i = 0, _arr = ["apiviewer", "widgetbrowser", "playground", "demobrowser"];
              case 12:
                if (!(_i < _arr.length)) {
                  _context12.next = 19;
                  break;
                }
                name = _arr[_i];
                _context12.next = 16;
                return new qx.tool.cli.commands["package"].Install({}).install("qooxdoo/qxl." + name);
              case 16:
                _i++;
                _context12.next = 12;
                break;
              case 19:
              case "end":
                return _context12.stop();
            }
          }, _callee12);
        }))();
      }
    }
  });
  qx.tool.utils.Website.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Website.js.map?dt=1722153845233