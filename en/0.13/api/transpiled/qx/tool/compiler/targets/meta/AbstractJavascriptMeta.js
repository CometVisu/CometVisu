function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
      "qx.tool.utils.Utils": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
   *
   *    qooxdoo-compiler - node.js based replacement for the Qooxdoo python
   *    toolchain
   *
   *    https://github.com/qooxdoo/qooxdoo-compiler
   *
   *    Copyright:
   *      2011-2021 Zenesis Limited, http://www.zenesis.com
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
   * ************************************************************************/

  var fs = qx.tool.utils.Promisify.fs;
  var path = require("upath");
  var sourceMap = require("source-map-js");

  /**
   * An AbstractJavascriptMeta provides an abstraction of some source code, and might be
   * comprised of a number of input files which are merged together as required.
   *
   * This object could represent a file which already exists on disk (eg a transpiled
   * source file), or something that is generated on the fly (such as a index.js), or
   * a compilation of files (eg a part)
   */
  qx.Class.define("qx.tool.compiler.targets.meta.AbstractJavascriptMeta", {
    extend: qx.core.Object,
    /**
     * Constructor
     *
     * @param appMeta {qx.tool.compiler.targets.meta.ApplicationMeta}
     * @param filename {String} the sourcefile
     * @param originalSourceFile {String?} the URI to give to the source map
     */
    construct: function construct(appMeta, filename, originalSourceFile) {
      qx.core.Object.constructor.call(this);
      this._appMeta = appMeta;
      this.__filename = filename;
      this.__P_501_0 = originalSourceFile;
    },
    properties: {
      /** If true, this is generated on the fly and needs to be output */
      needsWriteToDisk: {
        init: false,
        check: "Boolean"
      }
    },
    members: {
      _appMeta: null,
      __filename: null,
      __P_501_0: null,
      __P_501_1: null,
      /**
       * Returns the ApplicationMeta
       *
       * @return {ApplicationMeta}
       */
      getAppMeta: function getAppMeta() {
        return this._appMeta;
      },
      /**
       * Returns the filename for the output of this JS
       *
       * @return {String}
       */
      getFilename: function getFilename() {
        return this.__filename;
      },
      wrap: function wrap(jsMeta) {
        this.__P_501_1 = jsMeta;
      },
      getWrapper: function getWrapper() {
        return this.__P_501_1;
      },
      unwrap: function unwrap() {
        if (this.__P_501_1) {
          return this.__P_501_1.unwrap();
        }
        return this;
      },
      /**
       * Writes the file to disk, if appropriate
       */
      writeToDisk: function writeToDisk() {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var ws, map;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                if (!_this.isNeedsWriteToDisk()) {
                  _context2.next = 11;
                  break;
                }
                ws = new qx.tool.utils.Utils.LineCountingTransform();
                ws.pipe(fs.createWriteStream(_this.__filename, "utf8"));
                _context2.next = 5;
                return new Promise( /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve) {
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) switch (_context.prev = _context.next) {
                        case 0:
                          ws.on("finish", resolve);
                          _context.next = 3;
                          return _this.writeSourceCodeToStream(ws);
                        case 3:
                          ws.end();
                        case 4:
                        case "end":
                          return _context.stop();
                      }
                    }, _callee);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());
              case 5:
                _context2.next = 7;
                return _this.getSourceMap();
              case 7:
                map = _context2.sent;
                if (!map) {
                  _context2.next = 11;
                  break;
                }
                _context2.next = 11;
                return fs.writeFileAsync(_this.__filename + ".map", JSON.stringify(map, null, 2), "utf8");
              case 11:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      /**
       * Writes the source code as a stream, merging source files etc
       * as necessary
       *
       * @param ws {NodeJS.WritableStream} the stream to write to
       */
      writeSourceCodeToStream: function writeSourceCodeToStream(ws) {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                throw new Error("No implementation for ".concat(_this2.classname, ".writeSourceCodeToStream"));
              case 1:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }))();
      },
      /**
       * Reads the source map as a string
       */
      getSourceMap: function getSourceMap() {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", null);
              case 1:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }))();
      },
      /**
       * Utility method that merges multiple source maps
       */
      _copySourceMap: function _copySourceMap(jsMetas, lineOffsets) {
        var _this3 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
          var generator, _loop, map, i, res, _i;
          return _regeneratorRuntime().wrap(function _callee5$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                generator = new sourceMap.SourceMapGenerator({
                  file: _this3.getFilename() + ".map"
                });
                _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                  var js, lineOffset, data;
                  return _regeneratorRuntime().wrap(function _loop$(_context5) {
                    while (1) switch (_context5.prev = _context5.next) {
                      case 0:
                        js = jsMetas[i];
                        lineOffset = lineOffsets[i];
                        _context5.next = 4;
                        return js.getSourceMap();
                      case 4:
                        data = _context5.sent;
                        if (data) {
                          map = new sourceMap.SourceMapConsumer(data);
                          map.eachMapping(function (mapping) {
                            mapping = {
                              generated: {
                                line: mapping.generatedLine + lineOffset,
                                column: mapping.generatedColumn
                              },
                              original: {
                                line: mapping.originalLine || 1,
                                column: mapping.originalColumn || 1
                              },
                              source: mapping.source || js.getFilename()
                            };
                            generator.addMapping(mapping);
                          });
                          if (_this3._appMeta.getTarget().getSaveSourceInMap && _this3._appMeta.getTarget().getSaveSourceInMap()) {
                            map.sources.forEach(function (source) {
                              return generator.setSourceContent(source, map.sourceContentFor(source));
                            });
                          }
                        }
                      case 6:
                      case "end":
                        return _context5.stop();
                    }
                  }, _loop);
                });
                i = 0;
              case 3:
                if (!(i < jsMetas.length)) {
                  _context6.next = 8;
                  break;
                }
                return _context6.delegateYield(_loop(), "t0", 5);
              case 5:
                i++;
                _context6.next = 3;
                break;
              case 8:
                res = JSON.parse(generator.toString());
                if (_this3._appMeta.getTarget().getSourceMapRelativePaths && _this3._appMeta.getTarget().getSourceMapRelativePaths()) {
                  for (_i = 0; _i < res.sources.length; _i++) {
                    res.sources[_i] = path.relative("", res.sources[_i]);
                  }
                }
                return _context6.abrupt("return", res);
              case 11:
              case "end":
                return _context6.stop();
            }
          }, _callee5);
        }))();
      }
    }
  });
  qx.tool.compiler.targets.meta.AbstractJavascriptMeta.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractJavascriptMeta.js.map?dt=1722151847670