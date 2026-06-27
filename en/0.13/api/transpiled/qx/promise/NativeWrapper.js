function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
      "qx.Promise": {},
      "qx.util.ConcurrencyLimiter": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2016 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
   * John Spackman (john.spackman@zenesis.com)
   * Patryk Malinowski (pmalinowski@vmn.digital)
  
   ************************************************************************ */

  /**
   * Wrapper around a native promise, adding some extra helpful methods which are found in Bluebird.js,
   * such as .map, .reduce, .filter, and many more.
   *
   * @ignore(AggregateError)
   */
  qx.Class.define("qx.promise.NativeWrapper", {
    extend: qx.core.Object,
    /**
     * @overload
     * @param {(resolve: Function, reject: Function) => void} arg0 The executor for the promise
     *
     * @overload
     * Wraps a native promise in the wrapper class
     * @param {Promise} arg0 A native Promise
     */
    construct: function construct(arg0) {
      qx.core.Object.constructor.call(this);
      if (typeof arg0 === "function") {
        this.__P_309_0 = new Promise(arg0);
      } else if (_typeof(arg0) === "object" && arg0.constructor === Promise) {
        this.__P_309_0 = arg0;
      }
    },
    members: {
      /**
       * @type {Object} The context that this promise is bound to
       */
      __P_309_1: null,
      /**
       * Creates a new promise just like this one, but with a context set
       * @see
       * @param {Object} context
       * @returns
       */
      bind: function bind(context) {
        var promise = new qx.promise.NativeWrapper(this.__P_309_0);
        return promise.__P_309_2(context);
      },
      /**
       * Same as for Native Promise
       * @returns {qx.promise.NativeWrapper}
       */
      then: function then(onResolved, onRejected) {
        onResolved = onResolved.bind(this.__P_309_1);
        if (onRejected) {
          onRejected = onRejected.bind(this.__P_309_1);
        }
        return qx.promise.NativeWrapper.__P_309_3(this.__P_309_0.then(onResolved, onRejected)).__P_309_2(this.__P_309_1);
      },
      /**
       * Same as for Native Promise
       * @returns {qx.promise.NativeWrapper}
       */
      "catch": function _catch(handler) {
        handler = handler.bind(this.__P_309_1);
        return qx.promise.NativeWrapper.__P_309_3(this.__P_309_0["catch"](handler)).__P_309_2(this.__P_309_1);
      },
      /**
       * Same as for Native Promise
       * @returns {qx.promise.NativeWrapper}
       */
      spread: function spread(fulfilledHandler) {
        return this.then(function (values) {
          return fulfilledHandler.apply(void 0, _toConsumableArray(values));
        });
      },
      /**
       * Same as for Native Promise
       * @returns {qx.promise.NativeWrapper}
       */
      "finally": function _finally(handler) {
        handler = handler.bind(this.__P_309_1);
        return qx.promise.NativeWrapper.__P_309_3(this.__P_309_0["finally"](handler)).__P_309_2(this.__P_309_1);
      },
      /**
       * Due to the high complexity of implementing this feature, it is not supported in qx.promise.NativeWrapper
       */
      cancel: function cancel() {
        throw new Error("qx.promise.NativeWrapper does not support canceling promises");
      },
      /**
       * Note: Only call when this promise will resolve to an array
       * Same as Promise.all, but passed with the array that this promise resolves to
       * @returns {qx.promise.NativeWrapper}
       */
      all: function all() {
        var _qx$promise$NativeWra;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return (_qx$promise$NativeWra = qx.promise.NativeWrapper).all.apply(_qx$promise$NativeWra, [this].concat(args));
      },
      /**
       * Note: Only call when this promise will resolve to an array
       * Same as Promise.race, but passed with the array that this promise resolves to
       * @returns {qx.promise.NativeWrapper}
       */
      race: function race() {
        return qx.promise.NativeWrapper.race(this);
      },
      /**
       * Note: Only call when this promise will resolve to an array
       * Same as Promise.any, but passed with the array that this promise resolves to
       * @returns {qx.promise.NativeWrapper}
       */
      any: function any() {
        return qx.promise.NativeWrapper.any(this);
      },
      /**
       * Same as {@link qx.promise.NativeWrapper.some} except that it iterates over the value of this promise, when
       * it is fulfilled; return a promise that is fulfilled as soon as count promises are fulfilled
       * in the array. The fulfillment value is an array with count values in the order they were fulfilled.
       *
       * @param count {Integer}
       * @return {qx.promise.NativeWrapper}
       */
      some: function some(count) {
        return qx.promise.NativeWrapper.some(this, count);
      },
      /**
       * Same as {@link qx.promise.NativeWrapper.each} except that it iterates over the value of this promise, when
       * it is fulfilled; iterates over the values with the given <code>iterator</code> function with the signature
       * <code>(value, index, length)</code> where <code>value</code> is the resolved value. Iteration happens
       * serially. If any promise is rejected the returned promise is rejected as well.
       *
       * Resolves to the original array unmodified, this method is meant to be used for side effects. If the iterator
       * function returns a promise or a thenable, then the result of the promise is awaited, before continuing with
       * next iteration.
       *
       * @param iterator {Function} the callback, with <code>(value, index, length)</code>
       * @return {qx.promise.NativeWrapper}
       */
      each: function each(iterator) {
        return qx.promise.NativeWrapper.each(this, iterator);
      },
      /**
       * Same as {@link qx.promise.NativeWrapper.filter} except that it iterates over the value of this promise, when it is fulfilled;
       * iterates over all the values into an array and filter the array to another using the given filterer function.
       *
       * @param iterable {Iterable} An iterable object, such as an Array
       * @param iterator {Function} the callback, with <code>(value, index, length)</code>
       * @param options {Object?} options; can be:
       *  <code>concurrency</code> max nuber of simultaneous filters, default is <code>Infinity</code>
       * @return {qx.promise.NativeWrapper}
       */
      filter: function filter(iterator, options) {
        return qx.promise.NativeWrapper.filter(this, iterator, options);
      },
      /**
       * Same as {@link qx.promise.NativeWrapper.map} except that it iterates over the value of this promise, when it is fulfilled;
       * iterates over all the values into an array and map the array to another using the given mapper function.
       *
       * Promises returned by the mapper function are awaited for and the returned promise doesn't fulfill
       * until all mapped promises have fulfilled as well. If any promise in the array is rejected, or
       * any promise returned by the mapper function is rejected, the returned promise is rejected as well.
       *
       * The mapper function for a given item is called as soon as possible, that is, when the promise
       * for that item's index in the input array is fulfilled. This doesn't mean that the result array
       * has items in random order, it means that .map can be used for concurrency coordination unlike
       * .all.
       *
       * @param iterator {Function} the callback, with <code>(value, index, length)</code>
       * @param options {Object?} * A native object with one key: <code>concurrency</code>: max number of simultaneous maps, default is <code>Infinity</code>
       * @return {qx.promise.NativeWrapper}
       */
      map: function map(iterator, options) {
        return qx.promise.NativeWrapper.map(this, iterator, options);
      },
      /**
       * Same as {@link qx.promise.NativeWrapper.mapSeries} except that it iterates over the value of this promise, when
       * it is fulfilled; iterates over all the values into an array and iterate over the array serially,
       * in-order.
       *
       * Returns a promise for an array that contains the values returned by the iterator function in their
       * respective positions. The iterator won't be called for an item until its previous item, and the
       * promise returned by the iterator for that item are fulfilled. This results in a mapSeries kind of
       * utility but it can also be used simply as a side effect iterator similar to Array#forEach.
       *
       * If any promise in the input array is rejected or any promise returned by the iterator function is
       * rejected, the result will be rejected as well.
       *
       * @param iterator {Function} the callback, with <code>(value, index, length)</code>
       * @return {qx.promise.NativeWrapper}
       */
      mapSeries: function mapSeries(iterator, options) {
        return qx.promise.NativeWrapper.mapSeries(this, iterator, options);
      },
      /**
       * Same as {@link qx.promise.NativeWrapper.reduce} except that it iterates over the value of this promise, when
       * it is fulfilled; iterates over all the values in the <code>Iterable</code> into an array and
       * reduce the array to a value using the given reducer function.
       *
       * If the reducer function returns a promise, then the result of the promise is awaited, before
       * continuing with next iteration. If any promise in the array is rejected or a promise returned
       * by the reducer function is rejected, the result is rejected as well.
       *
       * If initialValue is undefined (or a promise that resolves to undefined) and the iterable contains
       * only 1 item, the callback will not be called and the iterable's single item is returned. If the
       * iterable is empty, the callback will not be called and initialValue is returned (which may be
       * undefined).
       *
       * qx.promise.NativeWrapper.reduce will start calling the reducer as soon as possible, this is why you might want to
       * use it over qx.promise.NativeWrapper.all (which awaits for the entire array before you can call Array#reduce on it).
       *
       * @param reducer {Function} the callback, with <code>(value, index, length)</code>
       * @param initialValue {Object?} optional initial value
       * @return {qx.promise.NativeWrapper}
       */
      reduce: function reduce(reducer, initialValue) {
        return qx.promise.NativeWrapper.reduce(this, reducer, initialValue);
      },
      /**
       *
       * @param {Object} context
       * @returns {qx.promise.NativeWrapper} this object to support chaining
       */
      __P_309_2: function __P_309_2(context) {
        this.__P_309_1 = context;
        return this;
      }
    },
    statics: {
      /**
       * Wraps a promise in a qx.promise.NativeWrapper
       * @param {Promise} promise
       * @returns
       */
      __P_309_3: function __P_309_3(promise) {
        return new qx.promise.NativeWrapper(promise);
      },
      /**
       * Returns a Promise object that is resolved with the given value. If the value is a thenable (i.e.
       * has a then method), the returned promise will "follow" that thenable, adopting its eventual
       * state; otherwise the returned promise will be fulfilled with the value. Generally, if you
       * don't know if a value is a promise or not, Promise.resolve(value) it instead and work with
       * the return value as a promise.
       *
       * @param value {Object}
       * @return {qx.promise.NativeWrapper}
       */
      resolve: function resolve(value) {
        return qx.promise.NativeWrapper.__P_309_3(Promise.resolve(value));
      },
      /**
       * Returns a Promise object that is rejected with the given reason.
       * @param reason {Object?} Reason why this Promise rejected. A warning is generated if not instanceof Error. If undefined, a default Error is used.
       * @return {qx.promise.NativeWrapper}
       */
      reject: function reject(reason) {
        return qx.promise.NativeWrapper.__P_309_3(Promise.reject(reason));
      },
      /**
       * Returns a promise that resolves when all of the promises in the object properties have resolved,
       * or rejects with the reason of the first passed promise that rejects.  The result of each property
       * is placed back in the object, replacing the promise.  Note that non-promise values are untouched.
       *
       * @param value {var} An object
       * @return {qx.promise.NativeWrapper}
       */
      allOf: function allOf(value) {
        function action(value) {
          var arr = [];
          var names = [];
          for (var name in value) {
            if (value.hasOwnProperty(name) && qx.Promise.isPromise(value[name])) {
              arr.push(value[name]);
              names.push(name);
            }
          }
          return qx.promise.NativeWrapper.all(arr).then(function (arr) {
            arr.forEach(function (item, index) {
              value[names[index]] = item;
            });
            return value;
          });
        }
        return qx.Promise.isPromise(value) ? value.then(action) : action(value);
      },
      /**
       * Returns a promise that resolves when all of the promises in the iterable argument have resolved,
       * or rejects with the reason of the first passed promise that rejects.  Note that non-promise values
       * are untouched.
       *
       * @param iterable {Iterable} An iterable object, such as an Array
       * @return {qx.promise.NativeWrapper}
       */
      all: function all(iterable) {
        return qx.promise.NativeWrapper.resolve(iterable).then(function (iterable) {
          return qx.promise.NativeWrapper.__P_309_3(Promise.all(iterable));
        });
      },
      /**
       * Returns a promise that resolves or rejects as soon as one of the promises in the iterable resolves
       * or rejects, with the value or reason from that promise.
       * @param iterable {Iterable} An iterable object, such as an Array
       * @return {qx.promise.NativeWrapper}
       */
      race: function race(iterable) {
        return qx.promise.NativeWrapper.resolve(iterable).then(function (iterableResolved) {
          return new qx.promise.NativeWrapper(Promise.race(iterableResolved));
        });
      },
      /* *********************************************************************************
       *
       * Extension API methods
       *
       */
      /**
       * Like Promise.some, with 1 as count. However, if the promise fulfills, the fulfillment value is not an
       * array of 1 but the value directly.
       *
       * @param iterable {Iterable} An iterable object, such as an Array
       * @return {qx.promise.NativeWrapper}
       */
      any: function any(iterable) {
        return qx.promise.NativeWrapper.resolve(iterable).then(function (iterableResolved) {
          return new qx.promise.NativeWrapper(Promise.any(iterableResolved));
        });
      },
      /**
       * Given an Iterable (arrays are Iterable), or a promise of an Iterable, which produces promises (or a mix
       * of promises and values), iterate over all the values in the Iterable into an array and return a promise
       * that is fulfilled as soon as count promises are fulfilled in the array. The fulfillment value is an
       * array with count values in the order they were fulfilled.
       *
       * @param iterable {Iterable} An iterable object, such as an Array
       * @param count {Integer}
       * @return {qx.promise.NativeWrapper}
       */
      some: function some(iterable, count) {
        return new qx.promise.NativeWrapper(function (resolve, reject) {
          qx.promise.NativeWrapper.resolve(iterable).then(function (iterable) {
            var resolved = [];
            var rejected = [];
            var minToReject = iterable.length - count + 1;
            var onResolved = function onResolved(value) {
              if (resolved.length >= count) {
                return;
              }
              resolved.push(value);
              if (resolved.length == count) {
                resolve(resolved);
              }
            };
            var onRejected = function onRejected(reason) {
              rejected.push(reason);
              if (--minToReject == 0) {
                reject(new AggregateError(rejected));
              }
            };
            iterable.forEach(function (elem, index) {
              if (qx.Promise.isPromise(elem)) {
                elem.then(onResolved, onRejected);
              } else {
                onResolved(elem);
              }
            });
          });
        });
      },
      /**
       * Iterate over an array, or a promise of an array, which contains promises (or a mix of promises and values)
       * with the given <code>iterator</code> function with the signature <code>(value, index, length)</code> where
       * <code>value</code> is the resolved value of a respective promise in the input array. Iteration happens
       * serially. If any promise in the input array is rejected the returned promise is rejected as well.
       *
       * Resolves to the original array unmodified, this method is meant to be used for side effects. If the iterator
       * function returns a promise or a thenable, then the result of the promise is awaited, before continuing with
       * next iteration.
       *
       * @param iterable {Iterable} An iterable object, such as an Array
       * @param iterator {Function} the callback, with <code>(value, index, length)</code>
       * @return {qx.promise.NativeWrapper}
       */
      each: function each(iterable, iterator) {
        var f = /*#__PURE__*/function () {
          var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
            var iterableValue, index, _iterator, _step, item, itemResolved, _t;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.p = _context.n) {
                case 0:
                  _context.n = 1;
                  return iterable;
                case 1:
                  iterableValue = _context.v;
                  index = 0;
                  _iterator = _createForOfIteratorHelper(iterableValue);
                  _context.p = 2;
                  _iterator.s();
                case 3:
                  if ((_step = _iterator.n()).done) {
                    _context.n = 6;
                    break;
                  }
                  item = _step.value;
                  _context.n = 4;
                  return item;
                case 4:
                  itemResolved = _context.v;
                  _context.n = 5;
                  return iterator(itemResolved, index++, iterable.length);
                case 5:
                  _context.n = 3;
                  break;
                case 6:
                  _context.n = 8;
                  break;
                case 7:
                  _context.p = 7;
                  _t = _context.v;
                  _iterator.e(_t);
                case 8:
                  _context.p = 8;
                  _iterator.f();
                  return _context.f(8);
                case 9:
                  return _context.a(2);
              }
            }, _callee, null, [[2, 7, 8, 9]]);
          }));
          return function f() {
            return _ref.apply(this, arguments);
          };
        }();
        return new qx.promise.NativeWrapper(f());
      },
      /**
       * Given an Iterable(arrays are Iterable), or a promise of an Iterable, which produces promises (or a mix of
       * promises and values), iterate over all the values in the Iterable into an array and filter the array to
       * another using the given filterer function.
       *
       * It is essentially an efficient shortcut for doing a .map and then Array#filter:
       * <pre>
       *   qx.promise.NativeWrapper.map(valuesToBeFiltered, function(value, index, length) {
       *       return Promise.all([filterer(value, index, length), value]);
       *   }).then(function(values) {
       *       return values.filter(function(stuff) {
       *           return stuff[0] == true
       *       }).map(function(stuff) {
       *           return stuff[1];
       *       });
       *   });
       * </pre>
       *
       * @param iterable {Iterable} An iterable object, such as an Array
       * @param iterator {Function} the callback, with <code>(value, index, length)</code>
       * @param options {Object?} Either:
       *   A native object with one key: <code>concurrency</code>: max number of simultaneous filters, default is <code>Infinity</code>
       * Or: any other object, in which case this will be the context for the iterator
       * @return {qx.promise.NativeWrapper}
       */
      filter: function filter(iterable, iterator, options) {
        var limiter = new qx.util.ConcurrencyLimiter(options === null || options === void 0 ? void 0 : options.concurrency);
        var doit = /*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
            var iterableResolved, resultsPromises, values;
            return _regenerator().w(function (_context3) {
              while (1) switch (_context3.n) {
                case 0:
                  _context3.n = 1;
                  return iterable;
                case 1:
                  iterableResolved = _context3.v;
                  resultsPromises = iterableResolved.map(function (item, index) {
                    return limiter.add(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
                      var itemResolved, keep;
                      return _regenerator().w(function (_context2) {
                        while (1) switch (_context2.n) {
                          case 0:
                            _context2.n = 1;
                            return item;
                          case 1:
                            itemResolved = _context2.v;
                            _context2.n = 2;
                            return iterator(itemResolved, index, iterableResolved.length);
                          case 2:
                            keep = _context2.v;
                            return _context2.a(2, {
                              keep: keep,
                              val: itemResolved
                            });
                        }
                      }, _callee2);
                    })));
                  });
                  _context3.n = 2;
                  return qx.promise.NativeWrapper.all(resultsPromises);
                case 2:
                  values = _context3.v;
                  return _context3.a(2, values.filter(function (_ref4) {
                    var keep = _ref4.keep;
                    return keep;
                  }).map(function (_ref5) {
                    var val = _ref5.val;
                    return val;
                  }));
              }
            }, _callee3);
          }));
          return function doit() {
            return _ref2.apply(this, arguments);
          };
        }();
        return new qx.promise.NativeWrapper(doit());
      },
      /**
       * Given an <code>Iterable</code> (arrays are <code>Iterable</code>), or a promise of an
       * <code>Iterable</code>, which produces promises (or a mix of promises and values), iterate over
       * all the values in the <code>Iterable</code> into an array and map the array to another using
       * the given mapper function.
       *
       * Promises returned by the mapper function are awaited for and the returned promise doesn't fulfill
       * until all mapped promises have fulfilled as well. If any promise in the array is rejected, or
       * any promise returned by the mapper function is rejected, the returned promise is rejected as well.
       *
       * The mapper function for a given item is called as soon as possible, that is, when the promise
       * for that item's index in the input array is fulfilled. This doesn't mean that the result array
       * has items in random order, it means that .map can be used for concurrency coordination unlike
       * .all.
       *
       * A common use of Promise.map is to replace the .push+Promise.all boilerplate:
       *
       * <pre>
       *   var promises = [];
       *   for (var i = 0; i < fileNames.length; ++i) {
       *       promises.push(fs.readFileAsync(fileNames[i]));
       *   }
       *   qx.promise.NativeWrapper.all(promises).then(function() {
       *       console.log("done");
       *   });
       *
       *   // Using Promise.map:
       *   qx.promise.NativeWrapper.map(fileNames, function(fileName) {
       *       // Promise.map awaits for returned promises as well.
       *       return fs.readFileAsync(fileName);
       *   }).then(function() {
       *       console.log("done");
       *   });
       * </pre>
       *
       * @param iterable {Iterable} An iterable object, such as an Array
       * @param iterator {Function} the callback, with <code>(value, index, length)</code>
       * @param options {Object?} * A native object with one key: <code>concurrency</code>: max number of simultaneous maps, default is <code>Infinity</code>
       * @return {qx.promise.NativeWrapper}
       */
      map: function map(iterable, iterator, options) {
        return qx.promise.NativeWrapper.resolve(iterable).then(function (iterable) {
          var limiter = new qx.util.ConcurrencyLimiter(options === null || options === void 0 ? void 0 : options.concurrency);
          var resultsPromises = iterable.map(function (item, index) {
            return limiter.add(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
              var itemResolved, result;
              return _regenerator().w(function (_context4) {
                while (1) switch (_context4.n) {
                  case 0:
                    _context4.n = 1;
                    return item;
                  case 1:
                    itemResolved = _context4.v;
                    _context4.n = 2;
                    return iterator(itemResolved, index, iterable.length);
                  case 2:
                    result = _context4.v;
                    return _context4.a(2, result);
                }
              }, _callee4);
            })));
          });
          return qx.promise.NativeWrapper.all(resultsPromises);
        });
      },
      /**
       * Given an <code>Iterable</code>(arrays are <code>Iterable</code>), or a promise of an
       * <code>Iterable</code>, which produces promises (or a mix of promises and values), iterate over
       * all the values in the <code>Iterable</code> into an array and iterate over the array serially,
       * in-order.
       *
       * Returns a promise for an array that contains the values returned by the iterator function in their
       * respective positions. The iterator won't be called for an item until its previous item, and the
       * promise returned by the iterator for that item are fulfilled. This results in a mapSeries kind of
       * utility but it can also be used simply as a side effect iterator similar to Array#forEach.
       *
       * If any promise in the input array is rejected or any promise returned by the iterator function is
       * rejected, the result will be rejected as well.
       *
       * Example where .mapSeries(the instance method) is used for iterating with side effects:
       *
       * <pre>
       * // Source: http://jakearchibald.com/2014/es7-async-functions/
       * function loadStory() {
       *   return getJSON('story.json')
       *     .then(function(story) {
       *       addHtmlToPage(story.heading);
       *       return story.chapterURLs.map(getJSON);
       *     })
       *     .mapSeries(function(chapter) { addHtmlToPage(chapter.html); })
       *     .then(function() { addTextToPage("All done"); })
       *     .catch(function(err) { addTextToPage("Argh, broken: " + err.message); })
       *     .then(function() { document.querySelector('.spinner').style.display = 'none'; });
       * }
       * </pre>
       *
       * @param iterable {Iterable} An iterable object, such as an Array
       * @param iterator {Function} the callback, with <code>(value, index, length)</code>
       * @return {qx.promise.NativeWrapper}
       */
      mapSeries: function mapSeries(iterable, iterator) {
        return new qx.promise.NativeWrapper(/*#__PURE__*/function () {
          var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(resolve, reject) {
            var failed, fail, result, index, _iterator2, _step2, promise, value, mapped, _t2, _t3;
            return _regenerator().w(function (_context5) {
              while (1) switch (_context5.p = _context5.n) {
                case 0:
                  failed = false;
                  fail = function fail(reason) {
                    if (!failed) {
                      failed = true;
                      reject(reason);
                    }
                  }; //We must handle the rejections of promises ASAP
                  //to prevent unhandled promise rejections
                  qx.promise.NativeWrapper.all(iterable)["catch"](fail);
                  result = [];
                  _context5.n = 1;
                  return iterable;
                case 1:
                  iterable = _context5.v;
                  _context5.p = 2;
                  index = 0;
                  _iterator2 = _createForOfIteratorHelper(iterable);
                  _context5.p = 3;
                  _iterator2.s();
                case 4:
                  if ((_step2 = _iterator2.n()).done) {
                    _context5.n = 8;
                    break;
                  }
                  promise = _step2.value;
                  _context5.n = 5;
                  return promise;
                case 5:
                  value = _context5.v;
                  _context5.n = 6;
                  return iterator(value, index++, iterable.length);
                case 6:
                  mapped = _context5.v;
                  result.push(mapped);
                case 7:
                  _context5.n = 4;
                  break;
                case 8:
                  _context5.n = 10;
                  break;
                case 9:
                  _context5.p = 9;
                  _t2 = _context5.v;
                  _iterator2.e(_t2);
                case 10:
                  _context5.p = 10;
                  _iterator2.f();
                  return _context5.f(10);
                case 11:
                  _context5.n = 13;
                  break;
                case 12:
                  _context5.p = 12;
                  _t3 = _context5.v;
                  fail(_t3);
                case 13:
                  resolve(result);
                case 14:
                  return _context5.a(2);
              }
            }, _callee5, null, [[3, 9, 10, 11], [2, 12]]);
          }));
          return function (_x, _x2) {
            return _ref7.apply(this, arguments);
          };
        }());
      },
      /**
       * Given an <code>Iterable</code> (arrays are <code>Iterable</code>), or a promise of an
       * <code>Iterable</code>, which produces promises (or a mix of promises and values), iterate
       * over all the values in the <code>Iterable</code> into an array and reduce the array to a
       * value using the given reducer function.
       *
       * If the reducer function returns a promise, then the result of the promise is awaited, before
       * continuing with next iteration. If any promise in the array is rejected or a promise returned
       * by the reducer function is rejected, the result is rejected as well.
       *
       * Read given files sequentially while summing their contents as an integer. Each file contains
       * just the text 10.
       *
       * <pre>
       *   qx.promise.NativeWrapper.reduce(["file1.txt", "file2.txt", "file3.txt"], function(total, fileName) {
       *       return fs.readFileAsync(fileName, "utf8").then(function(contents) {
       *           return total + parseInt(contents, 10);
       *       });
       *   }, 0).then(function(total) {
       *       //Total is 30
       *   });
       * </pre>
       *
       * If initialValue is undefined (or a promise that resolves to undefined) and the iterable contains
       * only 1 item, the callback will not be called and the iterable's single item is returned. If the
       * iterable is empty, the callback will not be called and initialValue is returned (which may be
       * undefined).
       *
       * Promise.reduce will start calling the reducer as soon as possible, this is why you might want to
       * use it over Promise.all (which awaits for the entire array before you can call Array#reduce on it).
       *
       * @param iterable {Iterable} An iterable object, such as an Array
       * @param reducer {Function} the callback, with <code>(value, index, length)</code>
       * @param initialValue {Object?} optional initial value
       * @return {qx.promise.NativeWrapper}
       */
      reduce: function reduce(iterable, reducer, initialValue) {
        return new qx.promise.NativeWrapper(/*#__PURE__*/function () {
          var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(resolve, reject) {
            var failed, fail, iterableResolved, accum, index, _iterator3, _step3, promise, data, _t4, _t5;
            return _regenerator().w(function (_context6) {
              while (1) switch (_context6.p = _context6.n) {
                case 0:
                  fail = function _fail(reason) {
                    if (!failed) {
                      failed = true;
                      reject(reason);
                    }
                  };
                  failed = false;
                  _context6.p = 1;
                  _context6.n = 2;
                  return iterable;
                case 2:
                  iterableResolved = _context6.v;
                  //We must handle the rejections of promises ASAP
                  //to prevent unhandled promise rejections
                  iterableResolved.forEach(function (item, index) {
                    if (qx.Promise.isPromise(item)) {
                      item["catch"](fail);
                    }
                  });
                  accum = initialValue;
                  index = 0;
                  _iterator3 = _createForOfIteratorHelper(iterableResolved);
                  _context6.p = 3;
                  _iterator3.s();
                case 4:
                  if ((_step3 = _iterator3.n()).done) {
                    _context6.n = 8;
                    break;
                  }
                  promise = _step3.value;
                  _context6.n = 5;
                  return promise;
                case 5:
                  data = _context6.v;
                  _context6.n = 6;
                  return reducer(accum, data, index, iterableResolved.length);
                case 6:
                  accum = _context6.v;
                  index++;
                case 7:
                  _context6.n = 4;
                  break;
                case 8:
                  _context6.n = 10;
                  break;
                case 9:
                  _context6.p = 9;
                  _t4 = _context6.v;
                  _iterator3.e(_t4);
                case 10:
                  _context6.p = 10;
                  _iterator3.f();
                  return _context6.f(10);
                case 11:
                  resolve(accum);
                  _context6.n = 13;
                  break;
                case 12:
                  _context6.p = 12;
                  _t5 = _context6.v;
                  fail(_t5);
                case 13:
                  return _context6.a(2);
              }
            }, _callee6, null, [[3, 9, 10, 11], [1, 12]]);
          }));
          return function (_x3, _x4) {
            return _ref8.apply(this, arguments);
          };
        }());
      },
      /**
       * Returns a new function that wraps the given function fn. The new function will always return a promise that is
       * fulfilled with the original functions return values or rejected with thrown exceptions from the original function.
       * @param cb {Function}
       * @return {Function}
       */
      method: function method(cb) {
        var _this = this;
        return function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          return new qx.promise.NativeWrapper(function (resolve) {
            return resolve(cb.call.apply(cb, [_this.__P_309_1].concat(args)));
          });
        };
      },
      /**
       * Like .all but for object properties or Maps* entries instead of iterated values. Returns a promise that
       * is fulfilled when all the properties of the object or the Map's' values** are fulfilled. The promise's
       * fulfillment value is an object or a Map with fulfillment values at respective keys to the original object
       * or a Map. If any promise in the object or Map rejects, the returned promise is rejected with the rejection
       * reason.
       *
       * If object is a trusted Promise, then it will be treated as a promise for object rather than for its
       * properties. All other objects (except Maps) are treated for their properties as is returned by
       * Object.keys - the object's own enumerable properties.
       *
       * @param input {Object} An Object
       * @return {qx.promise.NativeWrapper}
       */
      props: function props(input) {
        return qx.promise.NativeWrapper.resolve(input).then(function (input) {
          var entries = Object.entries(input);
          var promises = entries.map(function (entry) {
            return new qx.promise.NativeWrapper(/*#__PURE__*/function () {
              var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(resolve) {
                var value;
                return _regenerator().w(function (_context7) {
                  while (1) switch (_context7.n) {
                    case 0:
                      _context7.n = 1;
                      return entry[1];
                    case 1:
                      value = _context7.v;
                      resolve([entry[0], value]);
                    case 2:
                      return _context7.a(2);
                  }
                }, _callee7);
              }));
              return function (_x5) {
                return _ref9.apply(this, arguments);
              };
            }());
          });
          return qx.promise.NativeWrapper.all(promises).then(function (values) {
            var result = {};
            values.forEach(function (entry) {
              result[entry[0]] = entry[1];
            });
            return result;
          });
        });
      }
    }
  });
  qx.promise.NativeWrapper.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=NativeWrapper.js.map?dt=1782595059957