function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.tile.components.AbstractComponent": {
        "require": true
      },
      "cv.ui.structure.tile.MVisibility": {
        "require": true
      },
      "cv.ui.structure.tile.MRefresh": {
        "require": true
      },
      "cv.ui.structure.tile.MResize": {
        "require": true
      },
      "cv.util.ScriptLoader": {},
      "qx.util.ResourceManager": {},
      "qx.event.Timer": {},
      "qx.locale.Manager": {},
      "qx.locale.Number": {},
      "qx.locale.Date": {},
      "cv.data.Model": {},
      "cv.util.String": {},
      "cv.io.BackendConnections": {},
      "cv.io.Fetch": {},
      "cv.core.notifications.Router": {},
      "qx.util.format.DateFormat": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Chart.js
   *
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
   *
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

  /* eslint-disable arrow-body-style */
  /**
   * Shows an chart.
   * @asset(libs/d3.min.js)
   * @ignore(d3)
   */
  qx.Class.define('cv.ui.structure.tile.components.Chart', {
    extend: cv.ui.structure.tile.components.AbstractComponent,
    include: [cv.ui.structure.tile.MVisibility, cv.ui.structure.tile.MRefresh, cv.ui.structure.tile.MResize],
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      ChartCounter: 0,
      DEFAULT_ASPECT_RATIO: 2.0416666666666665,
      JS_LOADED: new Promise( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
          var check, timer, counter;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                check = function check() {
                  return _typeof(window.d3) === 'object';
                };
                _context.next = 3;
                return cv.util.ScriptLoader.includeScript(qx.util.ResourceManager.getInstance().toUri('libs/d3.min.js'));
              case 3:
                if (!check()) {
                  timer = new qx.event.Timer(50);
                  counter = 0;
                  timer.addListener('interval', function () {
                    counter++;
                    if (check()) {
                      resolve(true);
                    } else if (counter > 5) {
                      reject(new Error('Error loaded d3 library'));
                    }
                  });
                } else {
                  resolve(true);
                }
              case 4:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }()).then(function () {
        if (qx.locale.Manager.getInstance().getLanguage() === 'de') {
          // localize
          d3.formatDefaultLocale({
            decimal: qx.locale.Number.getDecimalSeparator().translate().toString(),
            thousands: qx.locale.Number.getGroupSeparator().translate().toString(),
            grouping: [3],
            currency: ['€', '']
          });
          d3.timeFormatDefaultLocale({
            dateTime: '%A, der %e. %B %Y, %X',
            date: '%d.%m.%Y',
            time: '%H:%M:%S',
            periods: [qx.locale.Date.getAmMarker().translate().toString(), qx.locale.Date.getPmMarker().translate().toString()],
            days: qx.locale.Date.getDayNames('wide', null, 'format').map(function (t) {
              return t.translate().toString();
            }),
            shortDays: qx.locale.Date.getDayNames('narrow', null, 'stand-alone').map(function (t) {
              return t.translate().toString();
            }),
            months: qx.locale.Date.getMonthNames('wide').map(function (t) {
              return t.translate().toString();
            }),
            shortMonths: qx.locale.Date.getMonthNames('narrow', null, 'stand-alone').map(function (t) {
              return t.translate().toString();
            })
          });
        }
      }),
      CONFIG: null
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      currentSeries: {
        check: ['hour', 'day', 'week', 'month', 'year'],
        init: 'day',
        apply: '_refreshData'
      },
      currentPeriod: {
        check: 'Number',
        init: 0,
        apply: '_refreshData'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _id: null,
      _downloadedImage: null,
      _url: null,
      _headers: null,
      _request: null,
      _width: null,
      _height: null,
      _loaded: null,
      _dataSetConfigs: null,
      _initializing: null,
      _navigationEnabled: null,
      __P_75_0: null,
      __P_75_1: false,
      __P_75_2: null,
      __P_75_3: null,
      /**
      * @type {d3.Selection}
      */
      _dot: null,
      /**
       * @type {d3.Selection}
       */
      _svg: null,
      /**
       * @type {HTMLElement}
       */
      _tooltip: null,
      /**
       * @type {String}
       */
      _titleString: null,
      __P_75_4: null,
      __P_75_5: null,
      // all chart properties
      _chartConf: null,
      _init: function _init() {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var element, chartId, inBackground, title, span, seriesSelection, s, currentSeries, button, _span, i, popup, option, _iterator, _step, _s, _button, popupAddress, tileAddress, parent, tileWidget, svg, noToolTips, format, timeFormat, formatString, datasetSources, readAddresses;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _this._checkIfWidget();
                _this._initializing = true;
                element = _this._element;
                _context2.next = 5;
                return cv.ui.structure.tile.components.Chart.JS_LOADED;
              case 5:
                if (_this.isVisible()) {
                  _this._loadData();
                }
                _this._id = cv.ui.structure.tile.components.Chart.ChartCounter++;
                chartId = 'chart-' + _this._id;
                element.setAttribute('data-chart-id', _this._id.toString());
                inBackground = _this._element.hasAttribute('background') && _this._element.getAttribute('background') === 'true';
                title = _this.getHeader('label.title');
                if (!inBackground && element.hasAttribute('title') && !title) {
                  title = document.createElement('label');
                  title.classList.add('title');
                  span = document.createElement('span');
                  title.appendChild(span);
                  span.textContent = element.getAttribute('title');
                  _this.appendToHeader(title);
                }
                if (title) {
                  // save base title for updating
                  _this._titleString = title.textContent.trim();
                }
                seriesSelection = [];
                if (!inBackground && element.hasAttribute('selection')) {
                  s = element.getAttribute('selection');
                  if (s === 'none') {
                    seriesSelection = [];
                  } else if (s === 'all') {
                    seriesSelection = ['hour', 'day', 'week', 'month', 'year'];
                  } else {
                    seriesSelection = s.split(',').map(function (n) {
                      return n.trim().toLowerCase();
                    });
                  }
                }
                if (element.hasAttribute('series')) {
                  _this.setCurrentSeries(element.getAttribute('series'));
                }
                currentSeries = _this.getCurrentSeries();
                if (seriesSelection.length > 0 && !seriesSelection.includes(currentSeries)) {
                  seriesSelection.push(currentSeries);
                }
                _this._navigationEnabled = seriesSelection.length > 0;
                if (seriesSelection.length > 0) {
                  // back button
                  button = _this._buttonFactory('ri-arrow-left-s-line', ['prev']);
                  button.setAttribute('title', qx.locale.Manager.tr('previous'));
                  button.addEventListener('click', function () {
                    return _this._onSeriesPrev();
                  });
                  if (!title) {
                    title = document.createElement('label');
                    title.classList.add('title');
                    _span = document.createElement('span');
                    title.appendChild(_span);
                    _this.appendToHeader(title);
                  }
                  title.parentElement.insertBefore(button, title);
                  i = document.createElement('i');
                  i.classList.add('ri-arrow-down-s-fill');
                  title.appendChild(i);

                  // current selection
                  popup = document.createElement('div');
                  popup.classList.add('popup', 'series');
                  _iterator = _createForOfIteratorHelper(seriesSelection);
                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      _s = _step.value;
                      option = document.createElement('cv-option');
                      option.setAttribute('key', _s);
                      if (_s === currentSeries) {
                        option.setAttribute('selected', 'selected');
                      }
                      option.textContent = _this._seriesToShort(_s);
                      option.addEventListener('click', function (ev) {
                        popup.style.display = 'none';
                        _this._onSeriesChange(ev.target.getAttribute('key'));
                        ev.stopPropagation();
                        ev.preventDefault();
                      });
                      popup.appendChild(option);
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }
                  title.appendChild(popup);

                  // make title clickable
                  title.classList.add('clickable');
                  title.addEventListener('click', function (ev) {
                    var style = getComputedStyle(popup);
                    if (style.getPropertyValue('display') === 'none') {
                      popup.style.display = 'flex';
                    } else {
                      popup.style.display = 'none';
                    }
                    ev.stopPropagation();
                    ev.preventDefault();
                  });

                  // forward button
                  button = _this._buttonFactory('ri-arrow-right-s-line', ['next']);
                  button.setAttribute('title', qx.locale.Manager.tr('next'));
                  // initially we cannot go into the future
                  button.disabled = true;
                  button.addEventListener('click', function () {
                    return _this._onSeriesNext();
                  });
                  _this.appendToHeader(button);
                }
                if (!inBackground && element.hasAttribute('allow-fullscreen') && element.getAttribute('allow-fullscreen') === 'true') {
                  // add fullscreen button + address
                  _button = _this._buttonFactory('ri-fullscreen-line', ['fullscreen']);
                  _button.setAttribute('data-value', '0');
                  popupAddress = "state:".concat(chartId, "-popup");
                  _button.addEventListener('click', function () {
                    cv.data.Model.getInstance().onUpdate(popupAddress, _button.getAttribute('data-value') === '0' ? '1' : '0', 'system');
                  });
                  _this.appendToHeader(_button, 'right');

                  // address
                  tileAddress = document.createElement('cv-address');
                  tileAddress.setAttribute('mode', 'read');
                  tileAddress.setAttribute('target', 'fullscreen-popup');
                  tileAddress.setAttribute('backend', 'system');
                  tileAddress.setAttribute('send-mode', 'always');
                  tileAddress.textContent = popupAddress;
                  element.parentElement.appendChild(tileAddress);

                  // listen to parent tile of popup is opened or not
                  parent = element;
                  while (parent && parent.nodeName.toLowerCase() !== 'cv-tile') {
                    parent = parent.parentElement;
                  }
                  if (parent) {
                    tileWidget = parent.getInstance();
                    tileWidget.addListener('closed', function () {
                      return cv.data.Model.getInstance().onUpdate(popupAddress, '0', 'system');
                    });

                    // because we added a read address to the tile after is has been initialized we need to init the listener here manually
                    parent.addEventListener('stateUpdate', function (ev) {
                      tileWidget.onStateUpdate(ev);
                      // cancel event here
                      ev.stopPropagation();
                    });

                    // only on mobile we need this, because of height: auto
                    if (document.body.classList.contains('mobile')) {
                      tileWidget.addListener('fullscreenChanged', function () {
                        _this._onRendered();
                      });
                    }
                  }
                }
                if (element.hasAttribute('refresh')) {
                  _this.setRefresh(parseInt(element.getAttribute('refresh')));
                }

                // create needed elements
                svg = d3.select(_this._element).append('svg');
                noToolTips = false;
                if (inBackground) {
                  noToolTips = true;
                  svg.style('opacity', 0.4);
                }
                if (!noToolTips) {
                  _this._tooltip = document.createElement('div');
                  _this._tooltip.classList.add('tooltip');
                  _this._tooltip.style.display = 'none';
                  _this._element.appendChild(_this._tooltip);
                  svg.on('pointerenter', _this._onPointerEntered.bind(_this));
                  svg.on('pointermove', _this._onPointerMoved.bind(_this));
                  svg.on('pointerleave', _this._onPointerLeft.bind(_this));
                }
                svg.on('touchmove', function (event) {
                  if (_this._loaded) {
                    var y = event.targetTouches[0].clientY;
                    var pathRect = _this._element.querySelector(':scope > svg').getBoundingClientRect();
                    if (y > pathRect.y && y < pathRect.y + pathRect.height) {
                      event.preventDefault();
                    }
                  }
                }, {
                  passive: false
                });

                // init some fixed settings
                format = _this._element.hasAttribute('y-format') ? _this._element.getAttribute('y-format') : '%s';
                timeFormat = null;
                if (_this._element.hasAttribute('x-format')) {
                  formatString = _this._element.getAttribute('x-format');
                  timeFormat = function timeFormat(date) {
                    return d3.timeFormat(formatString)(date);
                  };
                } else {
                  // format auto-detection
                  timeFormat = _this.multiTimeFormat([['%H:%M:%S', function (d) {
                    return d.getSeconds();
                  }], ['%H:%M', function (d) {
                    return d.getMinutes();
                  }], ['%H', function (d) {
                    return d.getHours();
                  }], ['%a %d', function (d) {
                    return d.getDay() && d.getDate() !== 1;
                  }], ['%b %d', function (d) {
                    return d.getDate() !== 1;
                  }], ['%B', function (d) {
                    return d.getMonth();
                  }], ['%Y', function () {
                    return true;
                  }]]);
                }
                _this.__P_75_5 = {
                  x: function x(d) {
                    return d.time;
                  },
                  // given d in data, returns the (temporal) x-value
                  y: function y(d) {
                    return +d.value;
                  },
                  // given d in data, returns the (quantitative) y-value
                  z: function z(d) {
                    return d.src;
                  },
                  // given d in data, returns the (categorical) z-value
                  color: function color(d) {
                    return d && _this._dataSetConfigs[d].color;
                  },
                  // stroke color of line, as a constant or a function of *z*
                  title: function title(d) {
                    return cv.util.String.sprintf(format, d.value);
                  },
                  // given d in data, returns the title text
                  curve: d3.curveLinear,
                  // method of interpolation between points
                  marginTop: 12,
                  // top margin, in pixels
                  marginRight: 24,
                  // right margin, in pixels
                  marginBottom: 20,
                  // bottom margin, in pixels
                  marginLeft: 24,
                  // left margin, in pixels
                  width: 392,
                  // outer width, in pixels
                  height: 192,
                  // outer height, in pixels
                  aspectRatio: 2.0416666666666665,
                  xType: d3.scaleTime,
                  // type of x-scale
                  xFormat: timeFormat,
                  // a format specifier string for the x-axis
                  yType: d3.scaleLinear,
                  // type of y-scale
                  yFormat: undefined,
                  // a format specifier string for the y-axis
                  yLabel: undefined,
                  // a label for the y-axis
                  strokeLinecap: undefined,
                  // stroke line cap of line
                  strokeLinejoin: undefined,
                  // stroke line join of line
                  strokeWidth: 1.5,
                  // stroke width of line
                  strokeOpacity: undefined,
                  // stroke opacity of line
                  mixBlendMode: 'normal',
                  // blend mode of lines
                  showArea: function showArea(d) {
                    return _this._dataSetConfigs[d].showArea;
                  },
                  // show area below the line,
                  showXAxis: !_this._element.hasAttribute('show-x-axis') || _this._element.getAttribute('show-x-axis') === 'true',
                  showYAxis: !_this._element.hasAttribute('show-y-axis') || _this._element.getAttribute('show-y-axis') === 'true',
                  xPadding: 0.1 // amount of x-range to reserve to separate bars
                };

                _this._initializing = false;
                _this.__P_75_6();

                // check if we have a read address for live updates
                datasetSources = Array.from(_this._element.querySelectorAll(':scope > dataset')).map(function (elem) {
                  return elem.getAttribute('src');
                });
                readAddresses = Array.from(element.querySelectorAll(':scope > cv-address:not([mode="write"])')).filter(function (elem) {
                  return datasetSources.includes(elem.getAttribute('target'));
                });
                if (readAddresses.length > 0) {
                  element.addEventListener('stateUpdate', function (ev) {
                    _this.onStateUpdate(ev);
                    // cancel event here
                    ev.stopPropagation();
                  });
                }
              case 36:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      onStateUpdate: function onStateUpdate(ev) {
        var targetDataset = this._element.querySelector(':scope > dataset[src="' + ev.detail.target + '"]');
        var config = this._dataSetConfigs ? this._dataSetConfigs[ev.detail.target] : null;
        if (targetDataset && config) {
          var ts = Date.now();
          if (config.aggregationInterval) {
            var mins = config.aggregationInterval * 60 * 1000;
            ts = Math.round(ts / mins) * mins;
          }
          this._renderChart({
            src: ev.detail.target,
            time: ts,
            value: ev.detail.state
          }, true);
        }
      },
      _onSeriesPrev: function _onSeriesPrev() {
        this.setCurrentPeriod(this.getCurrentPeriod() + 1);
      },
      _onSeriesChange: function _onSeriesChange(select) {
        this._initializing = true;
        // reset offset when series changed
        this.resetCurrentPeriod();
        this._initializing = false;
        // reset configuration, we need a new one
        this._chartConf = null;
        this.setCurrentSeries(select);
      },
      _onSeriesNext: function _onSeriesNext() {
        var currentPeriod = this.getCurrentPeriod();
        if (currentPeriod > 0) {
          this.setCurrentPeriod(currentPeriod - 1);
        }
      },
      refresh: function refresh() {
        this._loaded = false;
        this._loadData();
      },
      // triggered after a change os series or period
      _refreshData: function _refreshData() {
        var nextButton = this.getHeader('.next');
        if (nextButton) {
          if (this.getCurrentPeriod() === 0) {
            nextButton.setAttribute('disabled', 'disabled');
          } else {
            nextButton.removeAttribute('disabled');
          }
        }
        if (!this._initializing) {
          this._loaded = false;
          this._loadData();
        }
        this.__P_75_6();
      },
      _loadData: function _loadData() {
        var _this2 = this;
        if (this._loaded && Date.now() - this._loaded < 300000) {
          // don't reload within 5 minutes
          return;
        }
        var client = cv.io.BackendConnections.getClient();
        if (!client) {
          return;
        }
        if (!client.isConnected()) {
          client.addListenerOnce('changeConnected', function () {
            _this2._loadData();
          });
          return;
        }
        var url;
        var dataSets = this._element.querySelectorAll(':scope > dataset');
        var series = this.getCurrentSeries();
        var currentPeriod = this.getCurrentPeriod();
        var start = 'end-1' + series;
        var end = 'now';
        var interval = 0;
        switch (series) {
          case 'hour':
            interval = 3600000;
            break;
          case 'day':
            interval = 86400000;
            break;
          case 'week':
            interval = 604800000;
            break;
          case 'month':
            interval = 2592000000;
            break;
          case 'year':
            interval = 31536000000;
            break;
        }
        if (currentPeriod > 0 && interval > 0) {
          end = Math.round((Date.now() - currentPeriod * interval) / 1000);
        }
        var promises = [];
        if (!this._dataSetConfigs) {
          this._dataSetConfigs = {};
          var _iterator2 = _createForOfIteratorHelper(dataSets),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var dataSet = _step2.value;
              var ts = {
                showArea: true,
                color: '#FF9900',
                chartType: 'line',
                title: '',
                curve: 'linear',
                aggregationInterval: 0
              };
              var attr = void 0;
              var name = void 0;
              var value = void 0;
              for (var i = 0; i < dataSet.attributes.length; i++) {
                attr = dataSet.attributes.item(i);
                // CamelCase attribute names
                name = attr.name.split('-').map(function (part, i) {
                  if (i > 0) {
                    return "".concat(part.substring(0, 1).toUpperCase()).concat(part.substring(1));
                  }
                  return part;
                }).join('');
                value = attr.value;
                if (value === 'true' || value === 'false') {
                  value = value === 'true';
                } else if (/^\d+$/.test(value)) {
                  value = parseInt(value);
                } else if (/^[\d.]+$/.test(value)) {
                  value = parseFloat(value);
                }
                ts[name] = value;
              }
              this._dataSetConfigs[ts.src] = ts;
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
        var _loop = function _loop() {
          url = client.getResourcePath('charts', {
            src: src,
            start: start,
            end: end
          });
          var ts = _this2._dataSetConfigs[src];
          if (!url) {
            return "continue";
          }
          _this2.debug('loading', url);
          promises.push(cv.io.Fetch.cachedFetch(url, {
            ttl: _this2.getRefresh()
          }, false, client).then(function (data) {
            _this2.debug('successfully loaded', url);
            if (client.hasCustomChartsDataProcessor(data)) {
              data = client.processChartsData(data, ts);
            }
            if (!_this2._lastRefresh) {
              _this2._lastRefresh = Date.now();
            }
            return {
              data: data || [],
              ts: ts
            };
          })["catch"](function (err) {
            _this2._onStatusError(ts, url, err);
            return {
              data: [],
              ts: ts
            };
          }));
        };
        for (var src in this._dataSetConfigs) {
          var _ret = _loop();
          if (_ret === "continue") continue;
        }
        Promise.all(promises).then(function (responses) {
          _this2._onSuccess(responses);
        });
      },
      _onSuccess: function _onSuccess(data) {
        var _this3 = this;
        var chartData = [];
        var _iterator3 = _createForOfIteratorHelper(data),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var entry = _step3.value;
            var tsdata = entry.data;
            if (tsdata !== null) {
              // TODO: stacked bar times (entry.ts.chartType === 'stacked-bar') must be aggregated, they have to be at the same time index for stacking
              var mins = entry.ts.aggregationInterval > 0 ? entry.ts.aggregationInterval * 60 * 1000 : 0;
              var _iterator4 = _createForOfIteratorHelper(tsdata),
                _step4;
              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  var _step4$value = _slicedToArray(_step4.value, 2),
                    time = _step4$value[0],
                    value = _step4$value[1];
                  chartData.push({
                    src: entry.ts.src,
                    time: mins > 0 ? Math.round(time / mins) * mins : time,
                    value: value
                  });
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        if (this._element.hasAttribute('background') && this._element.getAttribute('background') === 'true') {
          // no margins
          this.__P_75_5 = Object.assign(this.__P_75_5, {
            marginRight: 0,
            marginBottom: 0,
            marginLeft: 0
          });

          // because we have no margins we need to cut the overflow on the tile
          var tile = this._element.parentElement;
          while (tile && tile.localName !== 'cv-tile') {
            tile = tile.parentElement;
          }
          if (tile && tile.localName === 'cv-tile') {
            tile.style.overflow = 'hidden';
          }
        }

        // wait some time to let the element size settle
        window.requestAnimationFrame(function () {
          setTimeout(function () {
            _this3._onRendered(chartData);
          }, 100);
        });
      },
      _onRendered: function _onRendered(chartData, retries) {
        var _this4 = this;
        if (this.__P_75_3) {
          clearTimeout(this.__P_75_3);
          this.__P_75_3 = null;
        }
        if (this.isVisible()) {
          var _this$_getSize = this._getSize(),
            _this$_getSize2 = _slicedToArray(_this$_getSize, 2),
            width = _this$_getSize2[0],
            height = _this$_getSize2[1];
          if ((width < 20 || height < 10) && (!retries || retries <= 5)) {
            // this makes no sense
            this.__P_75_3 = setTimeout(function () {
              _this4._onRendered(chartData, retries > 0 ? retries + 1 : 1);
            }, 150);
          }
          if (width < 20 || height < 10) {
            // do nothing, these values are invalid
            return;
          }
          this.__P_75_5.width = width;
          this.__P_75_5.height = height;
          d3.select(this._element).select('svg').attr('viewBox', "0, 0, ".concat(width, ", ").concat(height));
          if (chartData) {
            this._renderChart(chartData);
            this._loaded = Date.now();
          }
        }
      },
      _getSize: function _getSize() {
        var parent = this._element.parentElement;
        var padding = this._element.getAttribute('background') === 'true' ? 0 : 8;
        var containerWidth = this._element.offsetWidth - padding;
        var containerHeight = this._element.offsetHeight - padding;
        var factor = 1;
        var landscape = containerWidth > containerHeight;
        var width = 0;
        var height = 0;
        if (landscape && containerHeight > 0) {
          // obeying aspect ratio in landscape mode is not necessary
          width = Math.round(containerWidth / factor);
          height = Math.round(containerHeight / factor);
        } else {
          width = Math.round(containerWidth / factor);
          height = width / cv.ui.structure.tile.components.Chart.DEFAULT_ASPECT_RATIO;
        }
        if (!this._element.style.height && (parent.localName === 'cv-popup' && parent.getAttribute('fullscreen') === 'true' || this._element.getAttribute('allow-fullscreen') === 'true' && parent.parentElement.classList.contains('fullscreen'))) {
          // the parent container has height: auto, so we need to have one
          this._element.style.height = height + this.__P_75_5.marginTop + this.__P_75_5.marginBottom + 'px';
        }
        return [width, height];
      },
      multiTimeFormat: function multiTimeFormat(formatsArray) {
        /**
         * @param date
         */
        function multiFormat(date) {
          var i = 0;
          var found = false;
          var fmt = '%c';
          while (!found && i < formatsArray.length) {
            found = formatsArray[i][1](date);
            if (found) {
              fmt = formatsArray[i][0];
            }
            i++;
          }
          return fmt;
        }
        return function (date) {
          return d3.timeFormat(multiFormat(date))(date);
        };
      },
      _onStatusError: function _onStatusError(ts, key, err) {
        cv.core.notifications.Router.dispatchMessage('cv.charts.error', {
          title: qx.locale.Manager.tr('Communication error'),
          severity: 'urgent',
          message: qx.locale.Manager.tr('URL: %1<br/><br/>Response:</br>%2', JSON.stringify(key), JSON.stringify(err))
        });
        this.error('Chart _onStatusError', ts, key, err);
      },
      /**
       * Get svg element selection (create if not exists)
       * @param parent d3.selection of the parent this element should be a child of
       * @param nodeName {String} Element name
       * @param classes {Array<String>} array of css classes used to identify this element
       * @param attributes {Map<String, String>?} set these attributes if the element has to be created, when it already exists these are ignored
       * @private
       */
      _getSvgElement: function _getSvgElement(parent, nodeName, classes, attributes) {
        var elem = parent.select(nodeName + '.' + classes.join('.'));
        if (elem.empty()) {
          elem = parent.append(nodeName).attr('class', classes.join(' '));
          if (attributes) {
            for (var name in attributes) {
              elem.attr(name, attributes[name]);
            }
          }
        }
        return elem;
      },
      /**
       * Copyright 2021 Observable, Inc.
       * Released under the ISC license.
       * https://observablehq.com/@d3/multi-line-chart
       *
       * @param data
       * @param single
       * @private
       */
      _renderChart: function _renderChart(data, single) {
        var _this5 = this;
        var config = this.__P_75_5;
        var svg = d3.select(this._element).select('svg');

        // Compute values.
        var X;
        var Y;
        var Z;
        var O;
        var T;
        if (single) {
          if (!this._helpers) {
            return;
          }
          X = this._helpers.X;
          Y = this._helpers.Y;
          Z = this._helpers.Z;
          O = this._helpers.O;
          T = this._helpers.T;
          if (X[X.length - 1] === data.time) {
            // replace last value instead of adding one
            Y[Y.length - 1] = data.value;
          } else {
            X.push(data.time);
            Y.push(data.value);
            Z.push(data.src);
            O.push(data);
            T.push(config.title === undefined ? data.src : config.title === null ? null : config.title(data));

            // cleanup
            X.shift();
            Y.shift();
            Z.shift();
            O.shift();
            T.shift();
          }
        } else {
          X = d3.map(data, config.x);
          Y = d3.map(data, config.y);
          Z = d3.map(data, config.z);
          O = d3.map(data, function (d) {
            return d;
          });
          // Compute titles.
          T = config.title === undefined ? Z : config.title === null ? null : d3.map(data, config.title);
        }

        // Compute default domains, and unique the z-domain.
        var xDomain = d3.extent(X);
        var minVal = 0;
        if (this._element.hasAttribute('zero-based') && this._element.getAttribute('zero-based') === 'false') {
          minVal = d3.min(Y);
          if (minVal > 1.0) {
            minVal -= 1;
          }
        }
        var maxVal = d3.max(Y);
        if (maxVal > 1.0) {
          // add some inner chart padding
          maxVal += 1;
        } else {
          maxVal += 0.1;
        }
        var yDomain = [minVal, maxVal];
        var zDomain = new d3.InternSet(Z);
        // Omit any data not present in the z-domain.
        var I = d3.range(X.length).filter(function (i) {
          return zDomain.has(Z[i]);
        });
        if (config.showYAxis) {
          var maxValue = config.yFormat ? config.yFormat(yDomain[1]) : yDomain[1].toFixed(maxVal < 1 ? 2 : 1);
          // check if we need more space for the y-axis
          if (maxValue.length >= 2) {
            config.marginLeft = maxValue.length * 8;
          }
        }
        var xTicks = config.width / 80;
        var yTicks = config.height / 60;
        var additionalXRangePadding = this._element.getAttribute('background') === 'true' ? 0 : 2;
        var xRange = [config.marginLeft + additionalXRangePadding, config.width - config.marginRight - additionalXRangePadding]; // [left, right]
        if (!this._chartConf) {
          var yRange = [config.height - config.marginBottom, config.marginTop]; // [bottom, top]

          // initialize everything once
          this._chartConf = {
            // x/y scales
            x: config.xType().range(xRange),
            y: config.yType().range(yRange)
          };
          this._chartConf.xAxis = config.showXAxis ? d3.axisBottom(this._chartConf.x).ticks(xTicks).tickSizeOuter(0).tickFormat(config.xFormat) : undefined;
          this._chartConf.yAxis = config.showYAxis ? d3.axisLeft(this._chartConf.y).ticks(yTicks, config.yFormat) : undefined;

          // add elements
          var showGrid = this._element.hasAttribute('show-grid') ? this._element.getAttribute('show-grid') : 'xy';
          if (showGrid.includes('x')) {
            this._chartConf.xGrid = d3.axisBottom(this._chartConf.x).ticks(xTicks).tickSize(-config.height + config.marginBottom + config.marginTop).tickFormat('');
            this._getSvgElement(svg, 'g', ['grid', 'x'], {
              transform: "translate(0,".concat(config.height - config.marginBottom, ")")
            }).call(this._chartConf.xGrid);
          }
          if (showGrid.includes('y')) {
            this._chartConf.yGrid = d3.axisLeft(this._chartConf.y).ticks(yTicks).tickSize(-config.width + config.marginRight + config.marginLeft).tickFormat('');
            this._getSvgElement(svg, 'g', ['grid', 'y'], {
              transform: "translate(".concat(config.marginLeft, ",0)")
            }).call(this._chartConf.yGrid);
          }
          if (config.showXAxis) {
            this._getSvgElement(svg, 'g', ['axis', 'x']).attr('transform', "translate(0,".concat(config.height - config.marginBottom, ")")).call(this._chartConf.xAxis);
          }
          if (config.showYAxis) {
            var yAxisElement = this._getSvgElement(svg, 'g', ['axis', 'y']).attr('transform', "translate(".concat(config.marginLeft, ",0)"));
            if (config.label && yAxisElement.select('text').empty()) {
              yAxisElement.append('text').attr('x', -config.marginLeft).attr('y', 10).attr('fill', 'currentColor').attr('text-anchor', 'start').text(config.yLabel);
            }
            yAxisElement.call(this._chartConf.yAxis).call(function (g) {
              return g.select('.domain').remove();
            });
          }

          // find chart types
          var lineGroups = new Map();
          var areaGroups = new Map();
          var barGroups = new Map();
          var stackedBarGroups = new Map();
          var lineFunctions = {};
          var areaFunctions = {};
          var xBar;
          var xzScale;
          var _iterator5 = _createForOfIteratorHelper(zDomain),
            _step5;
          try {
            var _loop2 = function _loop2() {
              var key = _step5.value;
              switch (_this5._dataSetConfigs[key].chartType) {
                case 'line':
                  {
                    var idx = I.filter(function (i) {
                      return Z[i] === key;
                    });
                    lineGroups.set(key, idx);
                    var curveName = _this5._dataSetConfigs[key].curve || 'linear';
                    if (!Object.prototype.hasOwnProperty.call(lineFunctions, curveName)) {
                      var curveFunction;
                      switch (curveName) {
                        case 'linear':
                          curveFunction = d3.curveLinear;
                          break;
                        case 'step':
                          curveFunction = d3.curveStep;
                          break;
                        case 'natural':
                          curveFunction = d3.curveNatural;
                          break;
                      }
                      if (curveFunction) {
                        // Construct a line generator.
                        lineFunctions[curveName] = d3.line().curve(curveFunction).x(function (i) {
                          return _this5._chartConf.x(_this5._helpers.X[i]);
                        }).y(function (i) {
                          return _this5._chartConf.y(_this5._helpers.Y[i]);
                        });
                      }
                      if (_this5._dataSetConfigs[key].chartType === 'line' && typeof config.showArea === 'function' && config.showArea(key)) {
                        areaGroups.set(key, idx);
                        if (curveFunction) {
                          // Construct a line generator.
                          var minY = _this5._chartConf.y.range()[0];
                          areaFunctions[curveName] = d3.area().curve(curveFunction).x(function (i) {
                            return _this5._chartConf.x(_this5._helpers.X[i]);
                          }).y0(function () {
                            return minY;
                          }).y1(function (i) {
                            return _this5._chartConf.y(_this5._helpers.Y[i]);
                          });
                        }
                      }
                    }
                    break;
                  }
                case 'bar':
                  barGroups.set(key, I.filter(function (i) {
                    return Z[i] === key;
                  }));
                  if (!xBar) {
                    xBar = d3.scaleBand().range(_this5._chartConf.x.range()).padding(config.xPadding);
                  }
                  if (!xzScale) {
                    xzScale = d3.scaleBand().padding(0.05);
                  }
                  break;
                case 'stacked-bar':
                  stackedBarGroups.set(key, I.filter(function (i) {
                    return Z[i] === key;
                  }));
                  break;
              }
            };
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              _loop2();
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
          this._chartConf.lineGroups = lineGroups;
          this._chartConf.areaGroups = areaGroups;
          this._chartConf.barGroups = barGroups;
          this._chartConf.stackedBarGroups = stackedBarGroups;
          this._chartConf.lineFunctions = lineFunctions;
          this._chartConf.areaFunctions = areaFunctions;
          this._chartConf.xBar = xBar;
          if (xzScale) {
            this._chartConf.xz = xzScale;
          }

          // prepare elements for chart elements
          if (this._chartConf.lineGroups.size > 0) {
            this._chartConf.lineContainer = this._getSvgElement(svg, 'g', ['line'], {
              fill: 'none',
              stroke: typeof config.color === 'string' ? config.color : null,
              'stroke-linecap': config.strokeLinecap,
              'stroke-linejoin': config.strokeLinejoin,
              'stroke-width': config.strokeWidth,
              'stroke-opacity': config.strokeOpacity
            });
          }
          if (this._chartConf.areaGroups.size > 0) {
            this._chartConf.areaContainer = this._getSvgElement(svg, 'g', ['area'], {
              stroke: 'none',
              fill: typeof config.color === 'string' ? this.__P_75_7(config.color, '30') : null
            });
          }
          if (this._chartConf.barGroups.size > 0) {
            this._chartConf.barContainer = this._getSvgElement(svg, 'g', ['bars']);
          }
        }

        // apply domains to scales
        this._chartConf.x.domain(xDomain);
        this._chartConf.y.domain(yDomain);
        this._helpers = {
          X: X,
          Y: Y,
          I: I,
          T: T,
          Z: Z,
          O: O
        };
        if (this._chartConf.xAxis) {
          this._getSvgElement(svg, 'g', ['axis', 'x']).call(this._chartConf.xAxis);
        }
        if (this._chartConf.yAxis) {
          this._getSvgElement(svg, 'g', ['axis', 'y']).call(this._chartConf.yAxis);
        }
        if (this._chartConf.xBar) {
          this._chartConf.xBar.domain(new d3.InternSet(X));
        }
        if (this._chartConf.xz) {
          this._chartConf.xz.domain(zDomain);
          this._chartConf.x.range([xRange[0], xRange[1] - this._chartConf.xBar.bandwidth()]);
          this._chartConf.xz.range([0, this._chartConf.xBar.bandwidth()]);
        }

        // update groups
        var _iterator6 = _createForOfIteratorHelper(this._chartConf.lineGroups.keys()),
          _step6;
        try {
          var _loop3 = function _loop3() {
            var key = _step6.value;
            var idx = I.filter(function (i) {
              return Z[i] === key;
            });
            _this5._chartConf.lineGroups.set(key, idx);
          };
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            _loop3();
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
        var _iterator7 = _createForOfIteratorHelper(this._chartConf.areaGroups.keys()),
          _step7;
        try {
          var _loop4 = function _loop4() {
            var key = _step7.value;
            var idx = I.filter(function (i) {
              return Z[i] === key && Y[i] !== undefined;
            });
            _this5._chartConf.areaGroups.set(key, idx);
          };
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            _loop4();
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
        var _iterator8 = _createForOfIteratorHelper(this._chartConf.barGroups.keys()),
          _step8;
        try {
          var _loop5 = function _loop5() {
            var key = _step8.value;
            var idx = I.filter(function (i) {
              return Z[i] === key && Y[i] !== undefined;
            });
            _this5._chartConf.barGroups.set(key, idx);
          };
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            _loop5();
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
        var _iterator9 = _createForOfIteratorHelper(this._chartConf.stackedBarGroups.keys()),
          _step9;
        try {
          var _loop6 = function _loop6() {
            var key = _step9.value;
            var idx = I.filter(function (i) {
              return Z[i] === key && Y[i] !== undefined;
            });
            _this5._chartConf.stackedBarGroups.set(key, idx);
          };
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            _loop6();
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }
        this.__P_75_5 = config;
        this._dot = svg.select('g.dot');
        var t = d3.transition().duration(single ? 0 : 500).ease(d3.easeLinear);
        if (this._chartConf.lineContainer) {
          this._chartConf.lineContainer.selectAll('path').data(this._chartConf.lineGroups).join(function (enter) {
            return enter.append('path').style('mix-blend-mode', config.mixBlendMode).attr('stroke', typeof config.color === 'function' ? function (p) {
              return config.color(p[0]);
            } : null);
          }).transition(t).attr('d', function (d) {
            var curveName = _this5._dataSetConfigs[d[0]].curve || 'linear';
            var func = _this5._chartConf.lineFunctions[curveName] || _this5._chartConf.lineFunctions.linear;
            var val = func(d[1]);
            return val;
          });
        }

        // Add the area
        if (this._chartConf.areaContainer) {
          this._chartConf.areaContainer.selectAll('path').data(this._chartConf.areaGroups).join(function (enter) {
            return enter.append('path').style('mix-blend-mode', config.mixBlendMode).attr('fill', typeof config.color === 'function' ? function (p) {
              return _this5.__P_75_7(config.color(p[0]), '30');
            } : null);
          }).transition(t).attr('d', function (d) {
            var curveName = _this5._dataSetConfigs[d[0]].curve || 'linear';
            var func = _this5._chartConf.areaFunctions[curveName] || _this5._chartConf.areaFunctions.linear;
            return func(d[1]);
          });
        }
        if (this._chartConf.barContainer) {
          var yMin = this._chartConf.y.range()[0];
          this._chartConf.barContainer.selectAll('g').data(this._chartConf.barGroups).join('g').attr('fill', typeof config.color === 'function' ? function (d) {
            return config.color(d[0]);
          } : null).selectAll('rect').data(function (d) {
            return d[1].map(function (val) {
              return {
                key: d[0],
                value: val
              };
            });
          }).join('rect').attr('x', function (d) {
            var x = _this5._chartConf.x(X[d.value]);
            var xz = _this5._chartConf.xz(d.key);
            return x + xz;
          }).attr('y', function (d) {
            return _this5._chartConf.y(Y[d.value]);
          }).attr('width', this._chartConf.xz.bandwidth()).transition(t).attr('height', function (d) {
            return yMin - _this5._chartConf.y(Y[d.value]);
          });
        }

        // dot must be added last
        var dot = svg.select('g.dot');
        if (dot.empty()) {
          svg.append('g').attr('class', 'dot').attr('display', 'none').attr('fill', 'currentColor').append('circle').attr('r', 2.5);
        }
        this._dot = svg.select('g.dot');
      },
      _onPointerEntered: function _onPointerEntered(ev) {
        var _this6 = this;
        if (this._loaded) {
          this.__P_75_0 = setTimeout(function () {
            _this6.__P_75_8(true, ev);
            _this6.__P_75_0 = null;
          }, 500);
        }
      },
      _onPointerLeft: function _onPointerLeft(ev) {
        if (this.__P_75_0) {
          clearTimeout(this.__P_75_0);
        }
        if (this._loaded) {
          if (ev.relatedTarget !== this._tooltip) {
            this.__P_75_8(false);
          }
        }
      },
      __P_75_8: function __P_75_8(val, ev) {
        this.__P_75_1 = val;
        if (val) {
          if (this._dot) {
            this._dot.attr('display', null);
            this._dot.raise();
          }
          this._tooltip.style.display = 'block';
          this._onPointerMoved(null, true);
        } else {
          if (this._dot) {
            this._dot.attr('display', 'none');
          }
          var svg = d3.select(this._element).select('svg');
          svg.node().value = null;
          svg.dispatch('input', {
            bubbles: true
          });
          this._tooltip.style.display = 'none';
        }
      },
      _onPointerMoved: function _onPointerMoved(event, center) {
        if (this._loaded && this.__P_75_1) {
          var xm = 0;
          var ym = 0;
          if (event) {
            var _d3$pointer = d3.pointer(event);
            var _d3$pointer2 = _slicedToArray(_d3$pointer, 2);
            xm = _d3$pointer2[0];
            ym = _d3$pointer2[1];
          } else if (center) {
            xm = this.__P_75_5.width / 2;
            ym = this.__P_75_5.height / 2;
          } else {
            return;
          }
          var _this$_helpers = this._helpers,
            X = _this$_helpers.X,
            Y = _this$_helpers.Y,
            I = _this$_helpers.I,
            T = _this$_helpers.T,
            Z = _this$_helpers.Z,
            O = _this$_helpers.O;
          var _this$_chartConf = this._chartConf,
            x = _this$_chartConf.x,
            y = _this$_chartConf.y,
            xz = _this$_chartConf.xz;
          var i = d3.least(I, function (i) {
            return Math.hypot(x(X[i]) - xm, y(Y[i]) - ym);
          });
          var scaleFactorX = this._element.offsetWidth / this.__P_75_5.width;
          var scaleFactorY = this._element.offsetHeight / this.__P_75_5.height;
          // closest point
          var xOffset = xz ? xz(Z[i]) + (typeof xz.bandwidth === 'function' ? xz.bandwidth() / 2 : 0) : 0;
          this._dot.attr('transform', "translate(".concat(x(X[i]) + xOffset, ",").concat(y(Y[i]), ")"));
          if (T) {
            var cursorOffset = event && event.pointerType === 'mouse' ? 16 : 40;
            var timeString = this.__P_75_5.xFormat(new Date(X[i]));
            var top = ym * scaleFactorY - this._tooltip.offsetHeight;
            if (top < 0) {
              top += cursorOffset + this._tooltip.offsetHeight;
            } else {
              top -= cursorOffset;
            }
            var left = xm * scaleFactorX;
            if (left > this._element.offsetWidth / 2) {
              left -= this._tooltip.offsetWidth + cursorOffset;
            } else {
              left += cursorOffset;
            }
            var key = Z[i];
            var lineTitle = this._dataSetConfigs[key] && this._dataSetConfigs[key].title ? this._dataSetConfigs[key].title + ': ' : '';
            this._tooltip.innerHTML = "".concat(timeString, "<br/>").concat(lineTitle).concat(T[i]);
            this._tooltip.style.left = left + 'px';
            this._tooltip.style.top = top + 'px';
          }
          d3.select(this._element).select('svg').property('value', O[i]).dispatch('input', {
            bubbles: true
          });
        }
      },
      _buttonFactory: function _buttonFactory(icon, classes) {
        var _button$classList;
        var button = document.createElement('button');
        (_button$classList = button.classList).add.apply(_button$classList, _toConsumableArray(classes));
        if (icon) {
          var i = document.createElement('i');
          i.classList.add(icon);
          button.appendChild(i);
        }
        return button;
      },
      __P_75_6: function __P_75_6() {
        if (this._navigationEnabled) {
          var title = this.getHeader('label.title span');
          if (title) {
            var chartTitle = this._titleString || '';
            title.textContent = (chartTitle ? chartTitle + ' - ' : '') + this._shownDateRange();
          }
        }
      },
      /**
       * Converts series to a shot string that is shown in a select box
       * @param series
       * @private
       */
      _seriesToShort: function _seriesToShort(series) {
        switch (series) {
          case 'hour':
            return qx.locale.Manager.tr('Hour');
          case 'day':
            return qx.locale.Manager.tr('Day');
          case 'week':
            return qx.locale.Manager.tr('Week');
          case 'month':
            return qx.locale.Manager.tr('Month');
          case 'year':
            return qx.locale.Manager.tr('Year');
        }
        return '';
      },
      /**
       * Convert the currently shown date range into a human-readable string
       * @private
       */
      _shownDateRange: function _shownDateRange() {
        var series = this.getCurrentSeries();
        var currentPeriod = this.getCurrentPeriod();
        var date = new Date();
        var format = new qx.util.format.DateFormat();
        switch (series) {
          case 'hour':
            date.setHours(date.getHours() - currentPeriod, 0, 0);
            format = new qx.util.format.DateFormat(qx.locale.Date.getDateTimeFormat('hmm', 'h:mm'));
            return format.format(date);
          case 'day':
            if (currentPeriod === 0) {
              return qx.locale.Manager.tr('today');
            } else if (currentPeriod === 1) {
              return qx.locale.Manager.tr('yesterday');
            }
            date.setDate(date.getDate() - currentPeriod);
            format = new qx.util.format.DateFormat(qx.locale.Date.getDateTimeFormat('MMMd', 'd. MMM'));
            return format.format(date);
          case 'week':
            date.setDate(date.getDate() - currentPeriod * 7);
            return qx.locale.Manager.trc('CW = calendar week', 'CW %1', this.getWeekNumber(date));
          case 'month':
            date.setMonth(date.getMonth() - currentPeriod);
            if (date.getFullYear() === new Date().getFullYear()) {
              // no year needed
              format = new qx.util.format.DateFormat(qx.locale.Date.getDateTimeFormat('MMM', 'MMM'));
            } else {
              format = new qx.util.format.DateFormat(qx.locale.Date.getDateTimeFormat('yyMMM', 'MMM yy'));
            }
            return format.format(date);
          case 'year':
            return date.getFullYear() - currentPeriod;
        }
        return '';
      },
      getWeekNumber: function getWeekNumber(d) {
        d = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        // Set to the nearest Thursday: current date + 4 - current day number
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        // Get first day of year
        var yearStart = new Date(d.getFullYear(), 0, 1);
        // Calculate full weeks to the nearest Thursday
        return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
      },
      /**
       * add opacity to color
       * @param color
       * @param opacity {string} hex number 0 - 255
       * @return {string|*}
       * @private
       */
      __P_75_7: function __P_75_7(color, opacity) {
        if (color.startsWith('rgb(')) {
          return 'rgba(' + color.substring(4, color.length - 1) + ', ' + (parseInt(opacity, 16) / 255).toFixed(2) + ')';
        } else if (color.startsWith('#') && color.length === 7) {
          return color + opacity;
        }
        return color;
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._chartConf = null;
      this._helpers = null;
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'chart', /*#__PURE__*/function (_QxConnector) {
        "use strict";

        _inherits(_class, _QxConnector);
        var _super = _createSuper(_class);
        function _class() {
          _classCallCheck(this, _class);
          return _super.call(this, QxClass);
        }
        return _createClass(_class);
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.components.Chart.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Chart.js.map?dt=1677362719495