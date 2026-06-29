function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var index, pool;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                index = 0;
                pool = new PromisePool(function () {
                  if (index >= arr.length) {
                    return null;
                  }
                  var item = arr[index++];
                  return fn(item);
                }, 10);
                _context.n = 1;
                return pool.start();
              case 1:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      map: function map(arr, fn) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _context2.n = 1;
                return qx.Promise.all(arr.map(fn));
              case 1:
                return _context2.a(2, _context2.v);
            }
          }, _callee2);
        }))();
      },
      some: function some(arr, fn) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                _context3.n = 1;
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
              case 1:
                return _context3.a(2, _context3.v);
            }
          }, _callee3);
        }))();
      },
      someEach: function someEach(arr, fn) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var index, _next2;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
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
                _context4.n = 1;
                return _next2();
              case 1:
                return _context4.a(2, _context4.v);
            }
          }, _callee4);
        }))();
      },
      somePool: function somePool(arr, size, fn) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                _context5.n = 1;
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
              case 1:
                return _context5.a(2, _context5.v);
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

//# sourceMappingURL=Promisify.js.map?dt=1782705796020