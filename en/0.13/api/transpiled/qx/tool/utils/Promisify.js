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
      "qx.Promise": {}
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

  var _require = require("util"),
    promisify = _require.promisify;
  var nodePromisify = promisify;
  var PromisePool = require("es6-promise-pool");
  qx.Class.define("qx.tool.utils.Promisify", {
    statics: {
      MAGIC_KEY: "__isPromisified__",
      IGNORED_PROPS: /^(?:promises|length|name|arguments|caller|callee|prototype|__isPromisified__)$/,
      promisifyAll: function promisifyAll(target, fn) {
        var _this = this;
        Object.getOwnPropertyNames(target).forEach(function (key) {
          if (_this.IGNORED_PROPS.test(key) || fn && fn(key, target) === false) {
            return;
          }
          if (typeof target[key] !== "function") {
            return;
          }
          if (_this.isPromisified(target[key])) {
            return;
          }
          var promisifiedKey = key + "Async";
          target[promisifiedKey] = _this.promisify(target[key]);
          [key, promisifiedKey].forEach(function (key) {
            Object.defineProperty(target[key], _this.MAGIC_KEY, {
              value: true,
              configurable: true,
              enumerable: false,
              writable: true
            });
          });
        });
        return target;
      },
      isPromisified: function isPromisified(fn) {
        try {
          return fn[this.MAGIC_KEY] === true;
        } catch (e) {
          return false;
        }
      },
      promisify: function promisify(fn, context) {
        fn = nodePromisify(fn);
        if (context) {
          fn = fn.bind(context);
        }
        return fn;
      },
      poolEachOf: function poolEachOf(arr, size, fn) {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var index, pool;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                index = 0;
                pool = new PromisePool(function () {
                  if (index >= arr.length) {
                    return null;
                  }
                  var item = arr[index++];
                  return fn(item);
                }, 10);
                _context.next = 4;
                return pool.start();
              case 4:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      map: function map(arr, fn) {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return qx.Promise.all(arr.map(fn));
              case 2:
                return _context2.abrupt("return", _context2.sent);
              case 3:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      some: function some(arr, fn) {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return new qx.Promise(function (resolve, reject) {
                  var count = 0;
                  arr.forEach(function () {
                    qx.Promise.resolve(fn.apply(void 0, arguments)).then(function (result) {
                      count++;
                      if (result && resolve) {
                        resolve(true);
                        resolve = null;
                      }
                      if (count == arr.length && resolve) {
                        resolve(false);
                      }
                      return null;
                    });
                  });
                });
              case 2:
                return _context3.abrupt("return", _context3.sent);
              case 3:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }))();
      },
      someEach: function someEach(arr, fn) {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          var index, _next2;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                index = 0;
                _next2 = function next() {
                  if (index >= arr.length) {
                    return qx.Promise.resolve(false);
                  }
                  var item = arr[index++];
                  return qx.Promise.resolve(fn(item)).then(function (result) {
                    if (result) {
                      return true;
                    }
                    return _next2();
                  });
                };
                _context4.next = 4;
                return _next2();
              case 4:
                return _context4.abrupt("return", _context4.sent);
              case 5:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }))();
      },
      somePool: function somePool(arr, size, fn) {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return new qx.Promise(function (resolve, reject) {
                  var index = 0;
                  var pool = new PromisePool(function () {
                    if (!resolve) {
                      return null;
                    }
                    if (index >= arr.length) {
                      resolve(false);
                      return null;
                    }
                    var item = arr[index++];
                    return fn(item).then(function (result) {
                      if (result && resolve) {
                        resolve(true);
                        resolve = null;
                      }
                    });
                  }, 10);
                  pool.start();
                });
              case 2:
                return _context5.abrupt("return", _context5.sent);
              case 3:
              case "end":
                return _context5.stop();
            }
          }, _callee5);
        }))();
      },
      call: function call(fn) {
        return new Promise(function (resolve, reject) {
          fn(function (err) {
            if (err) {
              reject(err);
            } else {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              resolve.apply(void 0, args);
            }
          });
        });
      },
      callback: function callback(promise, cb) {
        if (cb) {
          promise = promise.then(function () {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }
            return cb.apply(void 0, [null].concat(args));
          })["catch"](function (err) {
            return cb(err);
          });
        }
        return promise;
      },
      fs: null,
      each: function each(coll, fn) {
        return qx.tool.utils.Promisify.eachOf(coll, fn);
      },
      forEachOf: function forEachOf(coll, fn) {
        return qx.tool.utils.Promisify.eachOf(coll, fn);
      },
      eachOf: function eachOf(coll, fn) {
        var promises = Object.keys(coll).map(function (key) {
          return fn(coll[key], key);
        });
        return qx.Promise.all(promises);
      },
      eachSeries: function eachSeries(coll, fn) {
        return qx.tool.utils.Promisify.eachOfSeries(coll, fn);
      },
      forEachOfSeries: function forEachOfSeries(coll, fn) {
        return qx.tool.utils.Promisify.eachOfSeries(coll, fn);
      },
      eachOfSeries: function eachOfSeries(coll, fn) {
        var keys = Object.keys(coll);
        var index = 0;
        function next() {
          if (index == keys.length) {
            return qx.Promise.resolve();
          }
          var key = keys[index];
          index++;
          var result = fn(coll[key], key);
          return qx.Promise.resolve(result).then(next);
        }
        return next();
      }
    },
    defer: function defer(statics) {
      statics.fs = statics.promisifyAll(require("fs"), function (key, fs) {
        return key !== "SyncWriteStream";
      });
    }
  });
  qx.tool.utils.Promisify.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Promisify.js.map?dt=1722151849368