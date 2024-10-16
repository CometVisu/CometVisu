function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.lang.Array": {},
      "qx.tool.utils.Promisify": {},
      "qx.tool.utils.files.Utils": {},
      "qx.tool.utils.Utils": {}
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
   *      2011-2019 Zenesis Limited, http://www.zenesis.com
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

  var path = require("upath");
  qx.Class.define("qx.tool.compiler.resources.Asset", {
    extend: qx.core.Object,
    construct: function construct(library, filename, fileInfo) {
      qx.core.Object.constructor.call(this);
      this.__P_494_0 = library;
      this.__filename = filename;
      this.__P_494_1 = fileInfo;
    },
    members: {
      /** {Library} that this asset belongs to */
      __P_494_0: null,
      /** {String} path within the library resources */
      __filename: null,
      /** {Object} the data in the database */
      __P_494_1: null,
      /** {ResourceLoader[]?} array of loaders */
      __P_494_2: null,
      /** {ResourceConverter[]?} array of converters */
      __P_494_3: null,
      /** {Asset[]?} list of assets which refer to this asset (eg for image combining) */
      __P_494_4: null,
      /** {Asset[]?} list of assets which the meta in this asset refers to (eg for image combining) */
      __P_494_5: null,
      /** {Asset[]?} list of assets which this asset depends on */
      __P_494_6: null,
      /** {Asset[]?} list of assets which depend on this asset */
      __P_494_7: null,
      getLibrary: function getLibrary() {
        return this.__P_494_0;
      },
      getFilename: function getFilename() {
        return this.__filename;
      },
      getFileInfo: function getFileInfo() {
        return this.__P_494_1;
      },
      isThemeFile: function isThemeFile() {
        return this.__P_494_1.resourcePath == "themePath";
      },
      getSourceFilename: function getSourceFilename() {
        return path.relative(process.cwd(), this.isThemeFile() ? this.__P_494_0.getThemeFilename(this.__filename) : this.__P_494_0.getResourceFilename(this.__filename));
      },
      getDestFilename: function getDestFilename(target) {
        var filename = null;
        if (this.__P_494_3) {
          filename = this.__P_494_3[this.__P_494_3.length - 1].getDestFilename(target, this);
        }
        return filename ? filename : path.relative(process.cwd(), path.join(target.getOutputDir(), "resource", this.__filename));
      },
      setLoaders: function setLoaders(loaders) {
        this.__P_494_2 = loaders.length ? loaders : null;
      },
      setConverters: function setConverters(converters) {
        this.__P_494_3 = converters.length ? converters : null;
      },
      addMetaReferee: function addMetaReferee(asset) {
        if (!this.__P_494_4) {
          this.__P_494_4 = [];
        }
        if (!qx.lang.Array.contains(this.__P_494_4, asset)) {
          this.__P_494_4.push(asset);
        }
      },
      getMetaReferees: function getMetaReferees() {
        return this.__P_494_4;
      },
      addMetaReferTo: function addMetaReferTo(asset) {
        if (!this.__P_494_5) {
          this.__P_494_5 = [];
        }
        if (!qx.lang.Array.contains(this.__P_494_5, asset)) {
          this.__P_494_5.push(asset);
        }
      },
      getMetaReferTo: function getMetaReferTo() {
        return this.__P_494_5;
      },
      setDependsOn: function setDependsOn(assets) {
        var _this = this;
        if (this.__P_494_6) {
          this.__P_494_6.forEach(function (thatAsset) {
            return delete thatAsset.__P_494_7[_this.getFilename];
          });
        }
        if (assets && assets.length) {
          this.__P_494_6 = assets;
          this.__P_494_1.dependsOn = assets.map(function (asset) {
            return asset.toUri();
          });
          assets.forEach(function (thatAsset) {
            if (!thatAsset.__P_494_7) {
              thatAsset.__P_494_7 = {};
            }
            thatAsset.__P_494_7[_this.getFilename()] = _this;
          });
        } else {
          this.__P_494_6 = null;
          delete this.__P_494_1.dependsOn;
        }
      },
      getDependsOn: function getDependsOn() {
        return this.__P_494_6;
      },
      getDependsOnThisAsset: function getDependsOnThisAsset() {
        return this.__P_494_7 ? Object.values(this.__P_494_7) : null;
      },
      load: function load() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (_this2.__P_494_2) {
                  _this2.__P_494_2.forEach(function (loader) {
                    return loader.load(_this2);
                  });
                }
              case 1:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      sync: function sync(target) {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          var destFilename, srcFilename, doNotCopy, destStat, filenames, needsIt, dependsOn, lastTempFilename, rm;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                destFilename = _this3.getDestFilename(target);
                srcFilename = _this3.getSourceFilename();
                if (!_this3.__P_494_3) {
                  _context4.next = 8;
                  break;
                }
                _context4.next = 5;
                return qx.tool.utils.Promisify.some(_this3.__P_494_3, function (converter) {
                  return converter.isDoNotCopy(srcFilename);
                });
              case 5:
                doNotCopy = _context4.sent;
                if (!doNotCopy) {
                  _context4.next = 8;
                  break;
                }
                return _context4.abrupt("return");
              case 8:
                _context4.next = 10;
                return qx.tool.utils.files.Utils.safeStat(destFilename);
              case 10:
                destStat = _context4.sent;
                if (!destStat) {
                  _context4.next = 23;
                  break;
                }
                filenames = [_this3.getSourceFilename()];
                if (_this3.__P_494_6) {
                  _this3.__P_494_6.forEach(function (asset) {
                    return filenames.push(asset.getSourceFilename());
                  });
                }
                _context4.next = 16;
                return qx.tool.utils.Promisify.some(filenames, /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(filename) {
                    var srcStat;
                    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                      while (1) switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return qx.tool.utils.files.Utils.safeStat(filename);
                        case 2:
                          srcStat = _context2.sent;
                          return _context2.abrupt("return", srcStat && srcStat.mtime.getTime() > destStat.mtime.getTime());
                        case 4:
                        case "end":
                          return _context2.stop();
                      }
                    }, _callee2);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());
              case 16:
                needsIt = _context4.sent;
                if (!(!needsIt && _this3.__P_494_3)) {
                  _context4.next = 21;
                  break;
                }
                _context4.next = 20;
                return qx.tool.utils.Promisify.some(_this3.__P_494_3, function (converter) {
                  return converter.needsConvert(target, _this3, srcFilename, destFilename, _this3.isThemeFile());
                });
              case 20:
                needsIt = _context4.sent;
              case 21:
                if (needsIt) {
                  _context4.next = 23;
                  break;
                }
                return _context4.abrupt("return");
              case 23:
                _context4.next = 25;
                return qx.tool.utils.Utils.makeParentDir(destFilename);
              case 25:
                if (!_this3.__P_494_3) {
                  _context4.next = 43;
                  break;
                }
                dependsOn = [];
                if (!(_this3.__P_494_3.length == 1)) {
                  _context4.next = 36;
                  break;
                }
                _context4.next = 30;
                return _this3.__P_494_3[0].convert(target, _this3, srcFilename, destFilename, _this3.isThemeFile());
              case 30:
                _context4.t0 = _context4.sent;
                if (_context4.t0) {
                  _context4.next = 33;
                  break;
                }
                _context4.t0 = [];
              case 33:
                dependsOn = _context4.t0;
                _context4.next = 38;
                break;
              case 36:
                lastTempFilename = null;
                qx.tool.utils.Promisify.each(_this3.__P_494_3, /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(converter, index) {
                    var tmpSrc, tmpDest, tmpDependsOn;
                    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                      while (1) switch (_context3.prev = _context3.next) {
                        case 0:
                          tmpSrc = lastTempFilename ? lastTempFilename : srcFilename;
                          tmpDest = index === _this3.__P_494_3.length - 1 ? destFilename : path.join(require("os").tmpdir(), path.basename(srcFilename) + "-pass" + (index + 1) + "-");
                          _context3.next = 4;
                          return converter.convert(target, _this3, tmpSrc, tmpDest, _this3.isThemeFile());
                        case 4:
                          _context3.t0 = _context3.sent;
                          if (_context3.t0) {
                            _context3.next = 7;
                            break;
                          }
                          _context3.t0 = [];
                        case 7:
                          tmpDependsOn = _context3.t0;
                          tmpDependsOn.forEach(function (str) {
                            return dependsOn.push(str);
                          });
                          lastTempFilename = tmpDest;
                        case 10:
                        case "end":
                          return _context3.stop();
                      }
                    }, _callee3);
                  }));
                  return function (_x2, _x3) {
                    return _ref2.apply(this, arguments);
                  };
                }());
              case 38:
                rm = target.getAnalyser().getResourceManager();
                dependsOn = dependsOn.map(function (filename) {
                  return rm.getAsset(path.resolve(filename), true, _this3.isThemeFile());
                }).filter(function (tmp) {
                  return tmp !== _this3;
                });
                _this3.setDependsOn(dependsOn);
                _context4.next = 45;
                break;
              case 43:
                _context4.next = 45;
                return qx.tool.utils.files.Utils.copyFile(srcFilename, destFilename);
              case 45:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }))();
      },
      toUri: function toUri() {
        return this.__P_494_0.getNamespace() + ":" + this.__filename;
      },
      toString: function toString() {
        return this.toUri();
      }
    }
  });
  qx.tool.compiler.resources.Asset.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Asset.js.map?dt=1729101255006