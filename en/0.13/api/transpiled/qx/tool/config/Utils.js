function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
      "qx.tool.config.Registry": {},
      "qx.tool.utils.Json": {},
      "qx.lang.Type": {},
      "qx.tool.config.Manifest": {},
      "qx.tool.config.Compile": {},
      "qx.tool.utils.Utils": {},
      "qx.log.Logger": {},
      "qx.tool.config.Abstract": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2017-2021 The authors
  
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
  var semver = require("semver");

  /**
   * NOTE: some of the names of the methods in this class do not express very clearly
   * what they do and might be renamed before 7.0.0
   */
  qx.Class.define("qx.tool.config.Utils", {
    type: "static",
    statics: {
      /** @type{Promise<String} promise for cache of getQxPath() */
      __P_511_0: null,
      /**
       * Returns data on the project in the currect working directory.
       * If a qooxdoo.json file exists, the data is taken from there.
       * If not, the relies on the following assumptions:
       *
       * 1. If a Manifest.json exists in the current working directory,
       * it is assumed to be the main library directory.
       *
       * 2. If a compile.json file exists in the current working directory,
       * it is assumed to be the directory in which the application can be found.
       *
       * The method returns a promise that resolves to a map containing the following keys:
       * 'libraries': an array of maps containing a 'path' property with a relative path to a library folder,
       * 'applications': an array of maps containing a 'path' property with a relative path to an
       * application folder.
       *
       * If no libraries or applications can be found, empty arrays are returned.
       *
       * @param {String?} dir The base directory. If not given, the current working dir is used
       * @return {Promise<Object>}
       */
      getProjectData: function getProjectData() {
        var _arguments = arguments;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var dir, qooxdooJsonPath, data, qooxdooJson;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                dir = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : null;
                dir = dir || process.cwd();
                qooxdooJsonPath = path.join(dir, qx.tool.config.Registry.config.fileName);
                data = {
                  libraries: [],
                  applications: []
                };
                _context.next = 6;
                return fs.existsAsync(qooxdooJsonPath);
              case 6:
                if (!_context.sent) {
                  _context.next = 12;
                  break;
                }
                _context.next = 9;
                return qx.tool.utils.Json.loadJsonAsync(qooxdooJsonPath);
              case 9:
                qooxdooJson = _context.sent;
                if (qx.lang.Type.isArray(qooxdooJson.libraries)) {
                  data.libraries = qooxdooJson.libraries;
                }
                if (qx.lang.Type.isArray(qooxdooJson.applications)) {
                  data.applications = qooxdooJson.applications;
                }
              case 12:
                _context.next = 14;
                return fs.existsAsync(path.join(dir, qx.tool.config.Manifest.config.fileName));
              case 14:
                if (!_context.sent) {
                  _context.next = 16;
                  break;
                }
                if (!data.libraries.find(function (lib) {
                  return lib.path === ".";
                })) {
                  data.libraries.push({
                    path: "."
                  });
                }
              case 16:
                _context.next = 18;
                return fs.existsAsync(path.join(dir, qx.tool.config.Compile.config.fileName));
              case 18:
                if (!_context.sent) {
                  _context.next = 20;
                  break;
                }
                if (!data.applications.find(function (app) {
                  return app.path === ".";
                })) {
                  data.applications.push({
                    path: "."
                  });
                }
              case 20:
                return _context.abrupt("return", data);
              case 21:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      /**
       * Returns the path to the library in the current working directory. If that
       * directory contains several libraries, the first one found is returned.
       *
       * @param {String?} dir The base directory. If not given, the current working dir is used
       * @throws {Error} Throws an error if no library can be found.
       * @return {String} A promise that resolves with the absolute path to the library
       */
      getLibraryPath: function getLibraryPath() {
        var _arguments2 = arguments,
          _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var dir, _yield$_this$getProje, libraries;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                dir = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : null;
                dir = dir || process.cwd();
                _context2.next = 4;
                return _this.getProjectData(dir);
              case 4:
                _yield$_this$getProje = _context2.sent;
                libraries = _yield$_this$getProje.libraries;
                if (!(libraries instanceof Array && libraries.length)) {
                  _context2.next = 8;
                  break;
                }
                return _context2.abrupt("return", path.resolve(process.cwd(), libraries[0].path));
              case 8:
                throw new qx.tool.utils.Utils.UserError("Cannot find library path - are you in the right directory?");
              case 9:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      /**
       * Returns the path to the current application, depending on
       * the current working directory. If a directory contains
       * several applications, the first one found is returned.
       *
       * @param {String?} dir The base directory. If not given, the current working dir is used
       * @throws {Error} Throws an error if no application can be found.
       * @return {Promise<String>} A promise that resolves with the absolute path to the application
       */
      getApplicationPath: function getApplicationPath() {
        var _arguments3 = arguments,
          _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var dir, _yield$_this2$getProj, applications;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                dir = _arguments3.length > 0 && _arguments3[0] !== undefined ? _arguments3[0] : null;
                dir = dir || process.cwd();
                _context3.next = 4;
                return _this2.getProjectData(dir);
              case 4:
                _yield$_this2$getProj = _context3.sent;
                applications = _yield$_this2$getProj.applications;
                if (!(applications instanceof Array && applications.length)) {
                  _context3.next = 8;
                  break;
                }
                return _context3.abrupt("return", path.resolve(process.cwd(), applications[0].path));
              case 8:
                throw new qx.tool.utils.Utils.UserError("Cannot find application path - are you in the right directory?");
              case 9:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }))();
      },
      /**
       * Compute the path to the qooxdoo library (the `qx` namespace)
       * which is used independently of the application being compiled.
       *
       * The path will be resolved via the following strategies:
       *
       * 1. finding a `Manifest.json` in the current working directory that provides
       * the `qx` library, or such a file in the parent directory, its parent dir,
       * etc., up to the root.
       *
       * 2. The qx library contained in the projects `node_modules` folder, if it exists,
       * or in the parent directory's, etc.
       *
       * 3. if not found try 1. and 2. with current script dir
       *
       * 4. A globally installed `@qooxdoo/framework` NPM package.
       *
       * If all strategies fail, an error is thrown.
       *
       * @param {String?} dir The base directory. If not given, the current working dir is used
       * @return {Promise<string>}
       */
      getQxPath: function getQxPath() {
        var _this3 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
          var scanAncestors, getQxPathImpl;
          return _regeneratorRuntime().wrap(function _callee6$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                if (!_this3.__P_511_0) {
                  _context6.next = 4;
                  break;
                }
                _context6.next = 3;
                return _this3.__P_511_0;
              case 3:
                return _context6.abrupt("return", _context6.sent);
              case 4:
                scanAncestors = /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(dir) {
                    var root, npmdir;
                    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                      while (1) switch (_context4.prev = _context4.next) {
                        case 0:
                          root = path.parse(dir).root;
                        case 1:
                          if (!(dir !== root)) {
                            _context4.next = 14;
                            break;
                          }
                          _context4.next = 4;
                          return _this3.isQxLibrary(dir);
                        case 4:
                          if (!_context4.sent) {
                            _context4.next = 6;
                            break;
                          }
                          return _context4.abrupt("return", dir);
                        case 6:
                          // 2. node_modules folders
                          npmdir = path.join(dir, "node_modules", "@qooxdoo", "framework");
                          _context4.next = 9;
                          return _this3.isQxLibrary(npmdir);
                        case 9:
                          if (!_context4.sent) {
                            _context4.next = 11;
                            break;
                          }
                          return _context4.abrupt("return", npmdir);
                        case 11:
                          // walk up the directory tree
                          dir = path.resolve(path.join(dir, ".."));
                          _context4.next = 1;
                          break;
                        case 14:
                          return _context4.abrupt("return", null);
                        case 15:
                        case "end":
                          return _context4.stop();
                      }
                    }, _callee4);
                  }));
                  return function scanAncestors(_x) {
                    return _ref.apply(this, arguments);
                  };
                }();
                getQxPathImpl = /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
                    var res, npmdir;
                    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                      while (1) switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return scanAncestors(path.parse(require.main.filename).dir);
                        case 2:
                          res = _context5.sent;
                          if (!res) {
                            _context5.next = 5;
                            break;
                          }
                          return _context5.abrupt("return", res);
                        case 5:
                          _context5.next = 7;
                          return scanAncestors(path.resolve(process.cwd()));
                        case 7:
                          res = _context5.sent;
                          if (!res) {
                            _context5.next = 10;
                            break;
                          }
                          return _context5.abrupt("return", res);
                        case 10:
                          _context5.next = 12;
                          return scanAncestors(__dirname);
                        case 12:
                          res = _context5.sent;
                          if (!res) {
                            _context5.next = 15;
                            break;
                          }
                          return _context5.abrupt("return", res);
                        case 15:
                          _context5.next = 17;
                          return qx.tool.utils.Utils.exec("npm root -g");
                        case 17:
                          npmdir = _context5.sent.trim();
                          res = path.join(npmdir, "@qooxdoo", "framework");
                          _context5.next = 21;
                          return _this3.isQxLibrary(res);
                        case 21:
                          if (!_context5.sent) {
                            _context5.next = 23;
                            break;
                          }
                          return _context5.abrupt("return", res);
                        case 23:
                          throw new qx.tool.utils.Utils.UserError("Path to the qx library cannot be determined.");
                        case 24:
                        case "end":
                          return _context5.stop();
                      }
                    }, _callee5);
                  }));
                  return function getQxPathImpl() {
                    return _ref2.apply(this, arguments);
                  };
                }();
                _this3.__P_511_0 = getQxPathImpl();
                _context6.next = 9;
                return _this3.__P_511_0;
              case 9:
                return _context6.abrupt("return", _context6.sent);
              case 10:
              case "end":
                return _context6.stop();
            }
          }, _callee6);
        }))();
      },
      /**
       * Returns true if a compilable application exists in the given directory by checking
       * if there is a "compile.json" file.
       *
       * @param {String?} dir The base directory. If not given, the current working dir is used
       * @return {Promise<Boolean>}
       */
      applicationExists: function applicationExists(dir) {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
          return _regeneratorRuntime().wrap(function _callee7$(_context7) {
            while (1) switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return fs.existsAsync(path.join(dir, qx.tool.config.Compile.config.fileName));
              case 2:
                return _context7.abrupt("return", _context7.sent);
              case 3:
              case "end":
                return _context7.stop();
            }
          }, _callee7);
        }))();
      },
      /**
       * Returns the qooxdoo version from the current environment (not the application)
       * @param {String?} dir The base directory. If not given, the current working dir is used
       * @return {Promise<String>}
       */
      getQxVersion: function getQxVersion() {
        var _this4 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
          var qxpath;
          return _regeneratorRuntime().wrap(function _callee8$(_context8) {
            while (1) switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _this4.getQxPath();
              case 2:
                qxpath = _context8.sent;
                return _context8.abrupt("return", qx.tool.config.Utils.getLibraryVersion(qxpath));
              case 4:
              case "end":
                return _context8.stop();
            }
          }, _callee8);
        }))();
      },
      /**
       * returns the compiler version.
       * The version is written during compiler compile into the enviroment
       * @return {String}
       */
      getCompilerVersion: function getCompilerVersion() {
        return "7.7.1";
      },
      /**
       * Returns the qooxdoo version used in the application in the current or given
       * directory. Throws if no such version can be determined
       *
       * @param {String?} baseDir The base directory. If not given, the current working dir is used
       * @return {Promise<String>}
       */
      getAppQxVersion: function getAppQxVersion() {
        var _arguments4 = arguments;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
          var baseDir, manifestRequiresKey, manifestModel, qxVersion, qxVersionRange;
          return _regeneratorRuntime().wrap(function _callee9$(_context9) {
            while (1) switch (_context9.prev = _context9.next) {
              case 0:
                baseDir = _arguments4.length > 0 && _arguments4[0] !== undefined ? _arguments4[0] : null;
                baseDir = baseDir || process.cwd();
                manifestRequiresKey = "@qooxdoo/framework";
                _context9.next = 5;
                return qx.tool.config.Manifest.getInstance().set({
                  baseDir: baseDir,
                  warnOnly: true,
                  validate: false
                }).load();
              case 5:
                manifestModel = _context9.sent;
                qxVersionRange = manifestModel.getValue("requires.".concat(manifestRequiresKey));
                qx.log.Logger.debug("Manifest in ".concat(baseDir, " requires ").concat(manifestRequiresKey, ": ").concat(qxVersionRange));
                if (qxVersionRange && !qxVersionRange.match(/[<>]/)) {
                  // cannot do comparisons
                  try {
                    // get the highest version mentioned with a tilde or caret range
                    qxVersion = qxVersionRange.match(/[\^~]?([-0-9a-z._]+)/g).sort().reverse()[0].slice(1);
                  } catch (e) {}
                }
                if (!(!qxVersion || !semver.valid(qxVersion))) {
                  _context9.next = 11;
                  break;
                }
                throw new Error("Cannot determine the qooxdoo version used to compile the application. " + "Please specify a caret or tilde range for the requires.".concat(manifestRequiresKey, " key in the Manifest\")"));
              case 11:
                return _context9.abrupt("return", qxVersion);
              case 12:
              case "end":
                return _context9.stop();
            }
          }, _callee9);
        }))();
      },
      /**
       * Returns true if the library in the given path provides the "qx" library
       * @param {String} libraryPath
       * @return {Promise<boolean>}
       */
      isQxLibrary: function isQxLibrary(libraryPath) {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
          var manifestPath, manifest;
          return _regeneratorRuntime().wrap(function _callee10$(_context10) {
            while (1) switch (_context10.prev = _context10.next) {
              case 0:
                manifestPath = path.join(libraryPath, qx.tool.config.Manifest.config.fileName);
                _context10.next = 3;
                return fs.existsAsync(manifestPath);
              case 3:
                if (_context10.sent) {
                  _context10.next = 5;
                  break;
                }
                return _context10.abrupt("return", false);
              case 5:
                _context10.prev = 5;
                _context10.next = 8;
                return qx.tool.utils.Json.loadJsonAsync(manifestPath);
              case 8:
                manifest = _context10.sent;
                if (!(manifest.provides && manifest.provides.namespace === "qx")) {
                  _context10.next = 11;
                  break;
                }
                return _context10.abrupt("return", true);
              case 11:
                _context10.next = 16;
                break;
              case 13:
                _context10.prev = 13;
                _context10.t0 = _context10["catch"](5);
                throw new qx.tool.utils.Utils.UserError("Invalid manifest file ".concat(manifestPath, "."));
              case 16:
                return _context10.abrupt("return", false);
              case 17:
              case "end":
                return _context10.stop();
            }
          }, _callee10, null, [[5, 13]]);
        }))();
      },
      /**
       * Returns an array of {@link qx.tool.config.Abstract} Objects which contain
       * metadata on the `Manifest.json` file(s) in the current project/package.
       * @param {String?} cwd The working directory. If not given, the current working dir is used
       * @return {Promise<qx.tool.config.Manifest[]>}
       */
      getManifestModels: function getManifestModels() {
        var _arguments5 = arguments;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
          var cwd, registryModel, manifestModels, libraries, _iterator, _step, library;
          return _regeneratorRuntime().wrap(function _callee11$(_context11) {
            while (1) switch (_context11.prev = _context11.next) {
              case 0:
                cwd = _arguments5.length > 0 && _arguments5[0] !== undefined ? _arguments5[0] : null;
                cwd = cwd || process.cwd();
                registryModel = qx.tool.config.Registry.getInstance();
                manifestModels = [];
                _context11.next = 6;
                return registryModel.exists();
              case 6:
                if (!_context11.sent) {
                  _context11.next = 14;
                  break;
                }
                _context11.next = 9;
                return registryModel.load();
              case 9:
                libraries = registryModel.getLibraries();
                _iterator = _createForOfIteratorHelper(libraries);
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    library = _step.value;
                    manifestModels.push(new qx.tool.config.Abstract(qx.tool.config.Manifest.config).set({
                      baseDir: path.join(cwd, library.path)
                    }));
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
                _context11.next = 18;
                break;
              case 14:
                _context11.next = 16;
                return fs.existsAsync(qx.tool.config.Manifest.config.fileName);
              case 16:
                if (!_context11.sent) {
                  _context11.next = 18;
                  break;
                }
                manifestModels.push(qx.tool.config.Manifest.getInstance());
              case 18:
                return _context11.abrupt("return", manifestModels);
              case 19:
              case "end":
                return _context11.stop();
            }
          }, _callee11);
        }))();
      },
      /**
       * Given the path to a library folder, returns the library version from its manifest
       * @param {String} libPath
       * @return {Promise<String>} Version
       */
      getLibraryVersion: function getLibraryVersion(libPath) {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
          var manifestPath, manifest, version;
          return _regeneratorRuntime().wrap(function _callee12$(_context12) {
            while (1) switch (_context12.prev = _context12.next) {
              case 0:
                manifestPath = path.join(libPath, qx.tool.config.Manifest.config.fileName);
                _context12.next = 3;
                return qx.tool.utils.Json.loadJsonAsync(manifestPath);
              case 3:
                manifest = _context12.sent;
                if (manifest) {
                  _context12.next = 6;
                  break;
                }
                throw new Error("No Manifest exists at ".concat(manifestPath, "."));
              case 6:
                _context12.prev = 6;
                version = manifest.info.version;
                _context12.next = 13;
                break;
              case 10:
                _context12.prev = 10;
                _context12.t0 = _context12["catch"](6);
                throw new Error("No valid version data in ".concat(manifestPath, "."));
              case 13:
                if (semver.valid(version)) {
                  _context12.next = 15;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Manifest at ".concat(manifestPath, " contains invalid version number \"").concat(version, "\". Please use a semver compatible version."));
              case 15:
                return _context12.abrupt("return", version);
              case 16:
              case "end":
                return _context12.stop();
            }
          }, _callee12, null, [[6, 10]]);
        }))();
      }
    }
  });
  qx.tool.config.Utils.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Utils.js.map?dt=1717235406298