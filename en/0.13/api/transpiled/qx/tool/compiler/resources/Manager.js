function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.tool.utils.LogManager": {
        "usage": "dynamic",
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
      "qx.tool.compiler.resources.ImageLoader": {
        "construct": true
      },
      "qx.tool.compiler.resources.MetaLoader": {
        "construct": true
      },
      "qx.tool.compiler.resources.ScssConverter": {
        "construct": true
      },
      "qx.tool.compiler.resources.ScssIncludeConverter": {
        "construct": true
      },
      "qx.tool.utils.Json": {},
      "qx.tool.compiler.Console": {},
      "qx.tool.utils.Values": {},
      "qx.lang.Type": {},
      "qx.Promise": {},
      "qx.tool.utils.files.Utils": {},
      "qx.tool.compiler.resources.Asset": {},
      "qx.tool.utils.Promisify": {},
      "qx.lang.Array": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
   *
   *    qooxdoo-compiler - node.js based replacement for the Qooxdoo python
   *    toolchain
   *
   *    https://github.com/qooxdoo/qooxdoo
   *
   *    Copyright:
   *      2011-2017 Zenesis Limited, http://www.zenesis.com
   *
   *    License:
   *      MIT: https://opensource.org/licenses/MIT
   *
   *      This software is provided under the same licensing terms as Qooxdoo,
   *      please see the LICENSE file in the Qooxdoo project's top-level directory
   *      for details.
   *
   *    Authors:
   *      * John Spackman (john.spackman@zenesis.com, @johnspackman)
   *
   * *********************************************************************** */

  /* eslint-disable @qooxdoo/qx/no-illegal-private-usage */

  var path = require("upath");
  var log = qx.tool.utils.LogManager.createLog("resource-manager");

  /**
   * Analyses library resources, collecting information into a cached database
   * file
   */
  qx.Class.define("qx.tool.compiler.resources.Manager", {
    extend: qx.core.Object,
    /**
     * Constructor
     *
     * @param analyser {qx.tool.compiler.Analyser}
     */
    construct: function construct(analyser) {
      qx.core.Object.constructor.call(this);
      this.__P_495_0 = analyser;
      this.__P_495_1 = analyser.getResDbFilename() || "resource-db.json";
      this.__P_495_2 = [new qx.tool.compiler.resources.ImageLoader(this), new qx.tool.compiler.resources.MetaLoader(this)];
      this.__P_495_3 = [new qx.tool.compiler.resources.ScssConverter(), new qx.tool.compiler.resources.ScssIncludeConverter()];
    },
    members: {
      /** {String} filename of database */
      __P_495_1: null,
      /** {Object} Database */
      __P_495_4: null,
      /** the used analyser */
      __P_495_0: null,
      /** {Map{String,Library}} Lookup of libraries, indexed by resource URI */
      __P_495_5: null,
      /** {String[]} Array of all resource URIs, sorted alphabetically (ie these are the keys in __librariesByResourceUri) */
      __P_495_6: null,
      /** {ResourceLoader[]} list of resource loaders, used to add info to the database */
      __P_495_2: null,
      /** {ResourceConverter[]} list of resource converters, used to copy resources to the target */
      __P_495_3: null,
      /**
       * Loads the cached database
       */
      loadDatabase: function loadDatabase() {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return qx.tool.utils.Json.loadJsonAsync(_this.__P_495_1);
              case 2:
                _context.t0 = _context.sent;
                if (_context.t0) {
                  _context.next = 5;
                  break;
                }
                _context.t0 = {};
              case 5:
                _this.__P_495_4 = _context.t0;
              case 6:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      /**
       * Saves the database
       */
      saveDatabase: function saveDatabase() {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                log.debug("saving resource manager database");
                return _context2.abrupt("return", qx.tool.utils.Json.saveJsonAsync(_this2.__P_495_1, _this2.__P_495_4));
              case 2:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      /**
       * Returns the loaded database
       *
       * @returns
       */
      getDatabase: function getDatabase() {
        return this.__P_495_4;
      },
      /**
       * Finds the library needed for a resource, see `findLibrariesForResource`.  This reports
       * an error if more than one library is found.
       *
       * @param uri {String} URI
       * @return {qx.tool.compiler.app.Library[]} the libraries, empty list if not found
       */
      findLibraryForResource: function findLibraryForResource(uri) {
        var result = this.findLibrariesForResource(uri);
        if (result.length == 0) {
          return null;
        }
        if (result.length > 1) {
          qx.tool.compiler.Console.error("Cannot determine a single library for the URI '".concat(uri, "'; ") + "found ".concat(result.map(function (l) {
            return l.getNamespace();
          }).join(","), " returning first library"));
        }
        return result[0];
      },
      /**
       * Finds the libraries needed for a resource; this depends on `findAllResources` having
       * already been called.  `uri` can include optional explicit namespace (eg "qx:blah/blah.png"),
       * otherwise the library resource lookups are examined to find the library.
       *
       * Note that there can be more than one directory because the lookup holds directory names (used
       * for wildcards) and they are allowed to be duplicated.
       *
       * @param uri {String} URI
       * @return {qx.tool.compiler.app.Library[]} the libraries, empty list if not found
       */
      findLibrariesForResource: function findLibrariesForResource(uri) {
        var _this3 = this;
        var findLibrariesForResourceImpl = function findLibrariesForResourceImpl() {
          var ns;
          var pos;

          // check for absolute path first, in windows c:/ is a valid absolute name
          if (path.isAbsolute(uri)) {
            var library = _this3.__P_495_0.getLibraries().find(function (lib) {
              return uri.startsWith(path.resolve(lib.getRootDir()));
            });
            return library || null;
          }

          // Explicit library?
          pos = uri.indexOf(":");
          if (pos !== -1) {
            ns = uri.substring(0, pos);
            var _library = _this3.__P_495_0.findLibrary(ns);
            return _library || null;
          }

          // Non-wildcards are a direct lookup
          // check for $ and *. less pos wins
          // fix for https://github.com/qooxdoo/qooxdoo/issues/260
          var pos1 = uri.indexOf("$"); // Variable references are effectively a wildcard lookup
          var pos2 = uri.indexOf("*");
          if (pos1 === -1) {
            pos = pos2;
          } else if (pos2 === -1) {
            pos = pos1;
          } else {
            pos = Math.min(pos1, pos2);
          }
          if (pos === -1) {
            var _library2 = _this3.__P_495_5[uri] || null;
            return _library2;
          }

          // Strip wildcard
          var isFolderMatch = uri[pos - 1] === "/";
          uri = uri.substring(0, pos - 1);

          // Fast folder match
          if (isFolderMatch) {
            var _library3 = _this3.__P_495_5[uri] || null;
            return _library3;
          }

          // Slow scan
          if (!_this3.__P_495_6) {
            _this3.__P_495_6 = Object.keys(_this3.__P_495_5).sort();
          }
          var thisUriPos = qx.tool.utils.Values.binaryStartsWith(_this3.__P_495_6, uri);
          if (thisUriPos > -1) {
            var libraries = {};
            for (; thisUriPos < _this3.__P_495_6.length; thisUriPos++) {
              var thisUri = _this3.__P_495_6[thisUriPos];
              if (!thisUri.startsWith(uri)) {
                break;
              }
              pos = uri.indexOf(":");
              if (pos !== -1) {
                ns = uri.substring(0, pos);
                if (!libraries[ns]) {
                  libraries[ns] = _this3.__P_495_0.findLibrary(ns);
                }
              }
            }
            return Object.values(libraries);
          }
          return null;
        };
        var result = findLibrariesForResourceImpl();
        if (!result) {
          return [];
        }
        if (!qx.lang.Type.isArray(result)) {
          return [result];
        }
        return result;
      },
      /**
       * Scans all libraries looking for resources; this does not analyse the
       * files, simply compiles the list
       */
      findAllResources: function findAllResources() {
        var _this4 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
          var t, db;
          return _regeneratorRuntime().wrap(function _callee8$(_context8) {
            while (1) switch (_context8.prev = _context8.next) {
              case 0:
                t = _this4;
                db = _this4.__P_495_4;
                if (!db.resources) {
                  db.resources = {};
                }
                t.__P_495_5 = {};
                _this4.__P_495_6 = null;
                _this4.__P_495_7 = {};
                _context8.next = 8;
                return qx.Promise.all(t.__P_495_0.getLibraries().map( /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(library) {
                    var resources, unconfirmed, relFile, scanResources;
                    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                      while (1) switch (_context6.prev = _context6.next) {
                        case 0:
                          resources = db.resources[library.getNamespace()];
                          if (!resources) {
                            db.resources[library.getNamespace()] = resources = {};
                          }
                          unconfirmed = {};
                          for (relFile in resources) {
                            unconfirmed[relFile] = true;
                          }
                          scanResources = /*#__PURE__*/function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(resourcePath) {
                              var rootDir;
                              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                                while (1) switch (_context4.prev = _context4.next) {
                                  case 0:
                                    // If the root folder exists, scan it
                                    rootDir = path.join(library.getRootDir(), library.get(resourcePath));
                                    _context4.next = 3;
                                    return qx.tool.utils.files.Utils.findAllFiles(rootDir, /*#__PURE__*/function () {
                                      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(filename) {
                                        var relFile, fileInfo, asset;
                                        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                                          while (1) switch (_context3.prev = _context3.next) {
                                            case 0:
                                              relFile = filename.substring(rootDir.length + 1).replace(/\\/g, "/");
                                              fileInfo = resources[relFile];
                                              delete unconfirmed[relFile];
                                              if (!fileInfo) {
                                                fileInfo = resources[relFile] = {};
                                              }
                                              fileInfo.resourcePath = resourcePath;
                                              _context3.next = 7;
                                              return qx.tool.utils.files.Utils.safeStat(filename).mtime;
                                            case 7:
                                              fileInfo.mtime = _context3.sent;
                                              asset = new qx.tool.compiler.resources.Asset(library, relFile, fileInfo);
                                              _this4.__P_495_8(asset);
                                            case 10:
                                            case "end":
                                              return _context3.stop();
                                          }
                                        }, _callee3);
                                      }));
                                      return function (_x3) {
                                        return _ref3.apply(this, arguments);
                                      };
                                    }());
                                  case 3:
                                  case "end":
                                    return _context4.stop();
                                }
                              }, _callee4);
                            }));
                            return function scanResources(_x2) {
                              return _ref2.apply(this, arguments);
                            };
                          }();
                          _context6.next = 7;
                          return scanResources("resourcePath");
                        case 7:
                          _context6.next = 9;
                          return scanResources("themePath");
                        case 9:
                          _context6.next = 11;
                          return qx.Promise.all(Object.keys(unconfirmed).map( /*#__PURE__*/function () {
                            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(filename) {
                              var fileInfo, stat;
                              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                                while (1) switch (_context5.prev = _context5.next) {
                                  case 0:
                                    fileInfo = resources[filename];
                                    if (fileInfo) {
                                      _context5.next = 5;
                                      break;
                                    }
                                    delete resources[filename];
                                    _context5.next = 9;
                                    break;
                                  case 5:
                                    _context5.next = 7;
                                    return qx.tool.utils.files.Utils.safeStat(filename);
                                  case 7:
                                    stat = _context5.sent;
                                    if (!stat) {
                                      delete resources[filename];
                                    }
                                  case 9:
                                  case "end":
                                    return _context5.stop();
                                }
                              }, _callee5);
                            }));
                            return function (_x4) {
                              return _ref4.apply(this, arguments);
                            };
                          }()));
                        case 11:
                        case "end":
                          return _context6.stop();
                      }
                    }, _callee6);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }()));
              case 8:
                _context8.next = 10;
                return qx.tool.utils.Promisify.poolEachOf(Object.values(_this4.__P_495_7), 10, /*#__PURE__*/function () {
                  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(asset) {
                    var fileInfo, altPath, lib, otherAsset, dependsOn;
                    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                      while (1) switch (_context7.prev = _context7.next) {
                        case 0:
                          _context7.next = 2;
                          return asset.load();
                        case 2:
                          fileInfo = asset.getFileInfo();
                          if (fileInfo.meta) {
                            for (altPath in fileInfo.meta) {
                              lib = _this4.findLibraryForResource(altPath);
                              if (!lib) {
                                lib = asset.getLibrary();
                              }
                              otherAsset = _this4.__P_495_7[lib.getNamespace() + ":" + altPath];
                              if (otherAsset) {
                                otherAsset.addMetaReferee(asset);
                                asset.addMetaReferTo(otherAsset);
                              } else {
                                qx.tool.compiler.Console.warn("Cannot find asset " + altPath + " referenced in " + asset);
                              }
                            }
                          }
                          if (fileInfo.dependsOn) {
                            dependsOn = [];
                            fileInfo.dependsOn.forEach(function (str) {
                              var otherAsset = _this4.__P_495_7[str];
                              if (!otherAsset) {
                                qx.tool.compiler.Console.warn("Cannot find asset " + str + " depended on by " + asset);
                              } else {
                                dependsOn.push(otherAsset);
                              }
                            });
                            if (dependsOn.length) {
                              asset.setDependsOn(dependsOn);
                            }
                          }
                          return _context7.abrupt("return", null);
                        case 6:
                        case "end":
                          return _context7.stop();
                      }
                    }, _callee7);
                  }));
                  return function (_x5) {
                    return _ref5.apply(this, arguments);
                  };
                }());
              case 10:
              case "end":
                return _context8.stop();
            }
          }, _callee8);
        }))();
      },
      /**
       * Adds an asset
       *
       * @param asset {Asset} the asset to add
       */
      __P_495_8: function __P_495_8(asset) {
        var _this5 = this;
        this.__P_495_7[asset.toUri()] = asset;
        var library = asset.getLibrary();
        var filename = asset.getFilename();
        var tmp = "";
        filename.split("/").forEach(function (seg, index) {
          if (index) {
            tmp += "/";
          }
          tmp += seg;
          var current = _this5.__P_495_5[tmp];
          if (current) {
            if (qx.lang.Type.isArray(current)) {
              if (!qx.lang.Array.contains(current, library)) {
                current.push(library);
              }
            } else if (current !== library) {
              current = _this5.__P_495_5[tmp] = [current, library];
            }
          } else {
            _this5.__P_495_5[tmp] = library;
          }
        });
        asset.setLoaders(this.__P_495_2.filter(function (loader) {
          return loader.matches(filename, library);
        }));
        asset.setConverters(this.__P_495_3.filter(function (converter) {
          return converter.matches(filename, library);
        }));
      },
      /**
       * Gets an individual asset
       *
       * @param srcPath {String} the resource name, with or without a namespace prefix
       * @param create {Boolean?} if true the asset will be created if it does not exist
       * @param isThemeFile {Boolean?} if true the asset will be expected to be in the theme folder
       * @return {Asset?} the asset, if found
       */
      getAsset: function getAsset(srcPath, create, isThemeFile) {
        var library = this.findLibraryForResource(srcPath);
        if (!library) {
          qx.tool.compiler.Console.warn("Cannot find library for " + srcPath);
          return null;
        }
        var resourceDir = path.join(library.getRootDir(), isThemeFile ? library.getThemePath() : library.getResourcePath());
        srcPath = path.relative(resourceDir, path.isAbsolute(srcPath) ? srcPath : path.join(resourceDir, srcPath));
        var asset = this.__P_495_7[library.getNamespace() + ":" + srcPath];
        if (!asset && create) {
          asset = new qx.tool.compiler.resources.Asset(library, srcPath, {
            resourcePath: "resourcePath"
          });
          this.__P_495_8(asset);
        }
        return asset;
      },
      /**
       * Collects information about the assets listed in srcPaths;
       *
       * @param srcPaths
       * @return {Asset[]}
       */
      getAssetsForPaths: function getAssetsForPaths(srcPaths) {
        var _this6 = this;
        var db = this.__P_495_4;

        // Generate a lookup that maps the resource name to the meta file that
        //  contains the composite
        var metas = {};
        for (var libraryName in db.resources) {
          var libraryData = db.resources[libraryName];
          for (var resourcePath in libraryData) {
            var fileInfo = libraryData[resourcePath];
            if (!fileInfo.meta) {
              continue;
            }
            for (var altPath in fileInfo.meta) {
              metas[altPath] = resourcePath;
            }
          }
        }
        var assets = [];
        var assetPaths = {};
        srcPaths.forEach(function (srcPath) {
          var pos = srcPath.indexOf(":");
          var libraries = null;
          if (pos > -1) {
            var ns = srcPath.substring(0, pos);
            var tmp = _this6.__P_495_0.findLibrary(ns);
            libraries = tmp ? [tmp] : [];
            srcPath = srcPath.substring(pos + 1);
          } else {
            libraries = _this6.findLibrariesForResource(srcPath);
          }
          if (libraries.length == 0) {
            qx.tool.compiler.Console.warn("Cannot find library for " + srcPath);
            return;
          }
          libraries.forEach(function (library) {
            var libraryData = db.resources[library.getNamespace()];
            pos = srcPath.indexOf("*");
            var resourceNames = [];
            if (pos > -1) {
              srcPath = srcPath.substring(0, pos);
              resourceNames = Object.keys(libraryData).filter(function (resourceName) {
                return resourceName.substring(0, srcPath.length) === srcPath;
              });
            } else if (libraryData[srcPath]) {
              resourceNames = [srcPath];
            }
            resourceNames.forEach(function (resourceName) {
              if (assetPaths[resourceName] !== undefined) {
                return;
              }
              var asset = _this6.__P_495_7[library.getNamespace() + ":" + resourceName];
              var fileInfo = asset.getFileInfo();
              if (fileInfo.doNotCopy === true) {
                return;
              }
              (asset.getMetaReferees() || []).forEach(function (meta) {
                // Extract the fragment from the meta data for this particular resource
                var resMetaData = meta.getFileInfo().meta[resourceName];
                fileInfo.composite = resMetaData[3];
                fileInfo.x = resMetaData[4];
                fileInfo.y = resMetaData[5];
              });
              assets.push(asset);
              assetPaths[resourceName] = assets.length - 1;
            });
          });
        });
        return assets;
      }
    }
  });
  qx.tool.compiler.resources.Manager.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Manager.js.map?dt=1717235404368