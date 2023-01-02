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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
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
      "cv.util.ScriptLoader": {},
      "qx.util.ResourceManager": {},
      "qx.event.Timer": {},
      "qx.locale.Manager": {},
      "cv.io.BackendConnections": {},
      "cv.io.Fetch": {},
      "cv.util.String": {},
      "cv.core.notifications.Router": {},
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
    include: cv.ui.structure.tile.MVisibility,
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      ChartCounter: 0,
      JS_LOADED: new Promise( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
          var check, timer, counter;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
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
            decimal: ',',
            thousands: '.',
            grouping: [3],
            currency: ['€', '']
          });
          d3.timeFormatDefaultLocale({
            dateTime: '%A, der %e. %B %Y, %X',
            date: '%d.%m.%Y',
            time: '%H:%M:%S',
            periods: ['AM', 'PM'],
            days: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
            shortDays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
            months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            shortMonths: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
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
      type: {
        check: ['axis-mixed', 'bar', 'line', 'scatter', 'pie', 'percentage'],
        init: 'line'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _downloadedImage: null,
      _url: null,
      _headers: null,
      _request: null,
      _chart: null,
      _width: null,
      _height: null,
      _loaded: null,
      _dataSetConfigs: null,
      _init: function _init() {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var element, chartId, button, buttonAddress, icon, tileAddress, parent, tileWidget;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  element = _this._element;
                  if (element.hasAttribute('type')) {
                    _this.setType(element.getAttribute('type'));
                  }
                  _context2.next = 4;
                  return cv.ui.structure.tile.components.Chart.JS_LOADED;
                case 4:
                  if (_this.isVisible()) {
                    _this._loadData();
                  }
                  if (element.hasAttribute('allow-fullscreen') && element.getAttribute('allow-fullscreen') === 'true') {
                    chartId = 'chart-' + cv.ui.structure.tile.components.Chart.ChartCounter; // add fullscreen button + address
                    button = document.createElement('cv-button');
                    button.classList.add('fullscreen');
                    buttonAddress = document.createElement('cv-address');
                    buttonAddress.setAttribute('backend', 'system');
                    buttonAddress.textContent = "state:".concat(chartId, "-popup");
                    button.appendChild(buttonAddress);
                    icon = document.createElement('cv-icon');
                    icon.textContent = 'ri-fullscreen-line';
                    button.appendChild(icon);
                    element.parentElement.insertBefore(button, element);

                    // address
                    tileAddress = document.createElement('cv-address');
                    tileAddress.setAttribute('mode', 'read');
                    tileAddress.setAttribute('target', 'fullscreen-popup');
                    tileAddress.setAttribute('backend', 'system');
                    tileAddress.setAttribute('send-mode', 'always');
                    tileAddress.textContent = buttonAddress.textContent;
                    element.parentElement.appendChild(tileAddress);

                    // listen to parent tile of popup is opened or not
                    parent = element;
                    while (parent && parent.nodeName.toLowerCase() !== 'cv-tile') {
                      parent = parent.parentElement;
                    }
                    if (parent) {
                      tileWidget = parent.getInstance();
                      tileWidget.addListener('closed', function () {
                        var ev = new CustomEvent('sendState', {
                          detail: {
                            value: 0,
                            source: _this
                          }
                        });
                        buttonAddress.dispatchEvent(ev);
                      });

                      // because we added a read address to the tile after is has been initialized we need to init the listener here manually
                      parent.addEventListener('stateUpdate', function (ev) {
                        tileWidget.onStateUpdate(ev);
                        // cancel event here
                        ev.stopPropagation();
                      });
                    }
                  }
                  cv.ui.structure.tile.components.Chart.ChartCounter++;
                case 7:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))();
      },
      _applyVisible: function _applyVisible(value) {
        if (value && _typeof(window.d3) === 'object') {
          this._loadData();
        }
      },
      _loadData: function _loadData() {
        var _this2 = this;
        if (this._loaded && Date.now() - this._loaded < 300000) {
          // don't reload within 5 minutes
          return;
        }
        var client = cv.io.BackendConnections.getClient();
        var url;
        var dataSets = this._element.querySelectorAll(':scope > dataset');
        var series = this._element.getAttribute('series') || 'day';
        var seriesConfig = {};
        switch (series) {
          case 'hour':
            seriesConfig.xTicks = d3.timeMinute.every(5);
            seriesConfig.start = 'end-1' + series;
            break;
          case 'day':
            seriesConfig.xTicks = d3.timeHour.every(4);
            seriesConfig.start = 'end-1' + series;
            break;
          case 'week':
            seriesConfig.xTicks = d3.timeDay.every(1);
            seriesConfig.start = 'end-1' + series;
            break;
          case 'month':
            seriesConfig.xTicks = d3.timeDay.every(5);
            seriesConfig.start = 'end-1' + series;
            break;
          case 'year':
            seriesConfig.xTicks = d3.timeDay.every(31);
            seriesConfig.start = 'end-1' + series;
            break;
        }
        var promises = [];
        this._dataSetConfigs = {};
        var _iterator = _createForOfIteratorHelper(dataSets),
          _step;
        try {
          var _loop = function _loop() {
            var dataSet = _step.value;
            var ts = Object.assign({
              showArea: true,
              color: '#FF9900',
              type: 'line',
              title: '',
              start: 'end-1day',
              end: 'now',
              xTicks: d3.timeHour.every(4)
            }, seriesConfig);
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
            var start = new Date();
            start.setTime(start.getTime() - 86400000);
            url = client.getResourcePath('charts', {
              src: ts.src,
              start: ts.start,
              end: ts.end
            });
            if (!url) {
              return "continue";
            }
            _this2._dataSetConfigs[ts.src] = ts;
            promises.push(cv.io.Fetch.fetch(url, null, false, client).then(function (data) {
              if (client.hasCustomChartsDataProcessor(data)) {
                data = client.processChartsData(data, ts);
              }
              return {
                data: data,
                ts: ts
              };
            })["catch"](function (err) {
              _this2._onStatusError(ts, url, err);
            }));
          };
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _ret = _loop();
            if (_ret === "continue") continue;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        Promise.all(promises).then(function (responses) {
          _this2._onSuccess(responses);
        });
      },
      _onSuccess: function _onSuccess(data) {
        var _this3 = this;
        if (!this.isVisible()) {
          return;
        }
        var chartData = [];
        var _iterator2 = _createForOfIteratorHelper(data),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var entry = _step2.value;
            var tsdata = entry.data;
            if (tsdata !== null) {
              var _iterator3 = _createForOfIteratorHelper(tsdata),
                _step3;
              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  var _step3$value = _slicedToArray(_step3.value, 2),
                    time = _step3$value[0],
                    value = _step3$value[1];
                  chartData.push({
                    src: entry.ts.src,
                    time: time,
                    value: value
                  });
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        var minVal = d3.min(chartData, function (d) {
          return +d.value;
        });
        var maxVal = d3.max(chartData, function (d) {
          return +d.value;
        }) + 1;
        if (minVal > 1.0) {
          minVal -= 1;
        }
        var format = this._element.hasAttribute('y-format') ? this._element.getAttribute('y-format') : '%s';
        var timeFormat = null;
        if (this._element.hasAttribute('x-format')) {
          var formatString = this._element.getAttribute('x-format');
          timeFormat = function timeFormat(date) {
            return d3.timeFormat(formatString)(date);
          };
        } else {
          // format auto-detection
          timeFormat = this.multiTimeFormat([['.%L', function (d) {
            return d.getMilliseconds();
          }], [':%S', function (d) {
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
        this._chart = this._lineChart(chartData, {
          x: function x(d) {
            return d.time;
          },
          y: function y(d) {
            return d.value;
          },
          z: function z(d) {
            return d.src;
          },
          color: function color(d) {
            return d && _this3._dataSetConfigs[d].color;
          },
          title: function title(d) {
            return cv.util.String.sprintf(format, d.value);
          },
          chartTitle: this._element.hasAttribute('title') ? this._element.getAttribute('title') : null,
          //yLabel: ts.unit,
          xDomain: d3.extent(chartData, function (d) {
            return d.time;
          }),
          yDomain: [minVal, maxVal],
          showArea: function showArea(d) {
            return _this3._dataSetConfigs[d].showArea;
          },
          mixBlendMode: 'normal',
          xFormat: timeFormat
        });
        this._loaded = Date.now();
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
          message: qx.locale.Manager.tr('URL: %1<br/><br/>Response:</br>%2', JSON.stringify(key), err)
        });
        this.error('Chart _onStatusError', ts, key, err);
      },
      /**
       * Copyright 2021 Observable, Inc.
       * Released under the ISC license.
       * https://observablehq.com/@d3/multi-line-chart
       *
       * @param data
       * @param c
       * @private
       */
      _lineChart: function _lineChart(data, c) {
        var _this4 = this;
        if (!cv.ui.structure.tile.components.Chart.CONFIG) {
          cv.ui.structure.tile.components.Chart.CONFIG = {
            x: function x(d) {
              return d[0];
            },
            // given d in data, returns the (temporal) x-value
            y: function y(d) {
              return d[1];
            },
            // given d in data, returns the (quantitative) y-value
            z: function z() {
              return 1;
            },
            // given d in data, returns the (categorical) z-value
            chartTitle: undefined,
            // title for the chart
            title: undefined,
            // given d in data, returns the title text
            defined: undefined,
            // for gaps in data
            curve: d3.curveLinear,
            // method of interpolation between points
            marginTop: 24,
            // top margin, in pixels
            marginRight: 24,
            // right margin, in pixels
            marginBottom: 24,
            // bottom margin, in pixels
            marginLeft: 30,
            // left margin, in pixels
            width: 392,
            // outer width, in pixels
            height: 192,
            // outer height, in pixels
            xType: d3.scaleTime,
            // type of x-scale
            xDomain: undefined,
            // [xmin, xmax]
            xRange: undefined,
            // [left, right]
            xFormat: undefined,
            // a format specifier string for the x-axis
            yType: d3.scaleLinear,
            // type of y-scale
            yDomain: undefined,
            // [ymin, ymax]
            yRange: undefined,
            // [bottom, top]
            yFormat: undefined,
            // a format specifier string for the y-axis
            yLabel: undefined,
            // a label for the y-axis
            zDomain: undefined,
            // array of z-values
            color: 'currentColor',
            // stroke color of line, as a constant or a function of *z*
            strokeLinecap: undefined,
            // stroke line cap of line
            strokeLinejoin: undefined,
            // stroke line join of line
            strokeWidth: 1.5,
            // stroke width of line
            strokeOpacity: undefined,
            // stroke opacity of line
            mixBlendMode: 'multiply',
            // blend mode of lines
            showArea: undefined,
            // show area below the line,
            xPadding: 0.1 // amount of x-range to reserve to separate bars
          };
        }

        var config = Object.assign({}, cv.ui.structure.tile.components.Chart.CONFIG, c);
        config.xRange = [config.marginLeft, config.width - config.marginRight]; // [left, right]
        config.yRange = [config.height - config.marginBottom, config.marginTop]; // [bottom, top]

        // Compute values.
        var X = d3.map(data, config.x);
        var Y = d3.map(data, config.y);
        var Z = d3.map(data, config.z);
        var O = d3.map(data, function (d) {
          return d;
        });
        if (config.defined === undefined) {
          config.defined = function (d, i) {
            return !isNaN(X[i]) && !isNaN(Y[i]);
          };
        }
        //const D = d3.map(data, config.defined);

        // Compute default domains, and unique the z-domain.
        if (config.xDomain === undefined) {
          config.xDomain = d3.extent(X);
        }
        if (config.yDomain === undefined) {
          config.yDomain = [0, d3.max(Y, function (d) {
            return typeof d === 'string' ? +d : d;
          })];
        }
        if (config.zDomain === undefined) {
          config.zDomain = Z;
        }
        config.zDomain = new d3.InternSet(config.zDomain);

        // Omit any data not present in the z-domain.
        var I = d3.range(X.length).filter(function (i) {
          return config.zDomain.has(Z[i]);
        });

        // Construct scales and axes.
        var xScale = config.xType(config.xDomain, config.xRange);
        var yScale = config.yType(config.yDomain, config.yRange);
        var xAxis = d3.axisBottom(xScale).ticks(config.width / 80).tickSizeOuter(0).tickFormat(config.xFormat);
        var yAxis = d3.axisLeft(yScale).ticks(config.height / 60, config.yFormat);

        // Compute titles.
        var T = config.title === undefined ? Z : config.title === null ? null : d3.map(data, config.title);
        d3.select(this._element).select('svg').remove();
        var tooltip = d3.select(this._element).append('div').style('opacity', 0).attr('class', 'tooltip');
        var linePath;
        var pointerMoved = function pointerMoved(event) {
          var _d3$pointer = d3.pointer(event),
            _d3$pointer2 = _slicedToArray(_d3$pointer, 2),
            xm = _d3$pointer2[0],
            ym = _d3$pointer2[1];
          var i = d3.least(I, function (i) {
            return Math.hypot(xScale(X[i]) - xm, yScale(Y[i]) - ym);
          });
          var scaleFactorX = _this4._element.offsetWidth / config.width;
          var scaleFactorY = _this4._element.offsetHeight / config.height;
          // closest point
          dot.attr('transform', "translate(".concat(xScale(X[i]), ",").concat(yScale(Y[i]), ")"));
          if (T) {
            var ttNode = tooltip.node();
            var timeString = config.xFormat(new Date(X[i]));
            var top = ym * scaleFactorY - ttNode.offsetHeight - 40;
            var left = xm * scaleFactorX + ttNode.offsetWidth > _this4._element.offsetWidth ? xm * scaleFactorX - ttNode.offsetWidth : xm * scaleFactorX;
            var key = Z[i];
            var lineTitle = _this4._dataSetConfigs[key] && _this4._dataSetConfigs[key].title ? _this4._dataSetConfigs[key].title + ': ' : '';
            tooltip.html("".concat(timeString, "<br/>").concat(lineTitle).concat(T[i])).style('left', left + 'px').style('top', top + 'px');
          }
          svg.property('value', O[i]).dispatch('input', {
            bubbles: true
          });
        };
        var pointerEntered = function pointerEntered() {
          dot.attr('display', null);
          tooltip.style('opacity', 1);
        };
        var pointerLeft = function pointerLeft(ev) {
          if (ev.relatedTarget !== tooltip.node()) {
            dot.attr('display', 'none');
            svg.node().value = null;
            svg.dispatch('input', {
              bubbles: true
            });
            tooltip.style('opacity', 0);
          }
        };
        var svg = d3.select(this._element).append('svg').attr('viewBox', [0, 0, config.width, config.height]).attr('style', 'max-width: 100%; height: auto; height: intrinsic;').style('-webkit-tap-highlight-color', 'transparent').on('pointerenter', pointerEntered).on('pointermove', pointerMoved).on('pointerleave', pointerLeft).on('touchmove', function (event) {
          var y = event.targetTouches[0].clientY;
          if (linePath) {
            var pathRect = linePath.node().getBoundingClientRect();
            if (y > pathRect.y && y < pathRect.y + pathRect.height) {
              event.preventDefault();
            }
          }
        }, {
          passive: false
        });
        var showXAxis = !this._element.hasAttribute('show-x-axis') || this._element.getAttribute('show-x-axis') === 'true';
        var showYAxis = !this._element.hasAttribute('show-y-axis') || this._element.getAttribute('show-y-axis') === 'true';
        if (showXAxis) {
          svg.append('g').attr('transform', "translate(0,".concat(config.height - config.marginBottom, ")")).call(xAxis);
        }
        if (showYAxis) {
          svg.append('g').attr('transform', "translate(".concat(config.marginLeft, ",0)")).call(yAxis).call(function (g) {
            return g.select('.domain').remove();
          }).call(function (g) {
            return g.append('text').attr('x', -config.marginLeft).attr('y', 10).attr('fill', 'currentColor').attr('text-anchor', 'start').text(config.yLabel);
          });
        }
        if (config.chartTitle) {
          svg.append('text').attr('x', config.width / 2).attr('y', config.marginTop).attr('class', 'chart-title').text(config.chartTitle);
        }
        var lineGroups = new Map();
        var areaGroups = new Map();
        var barGroups = new Map();
        var _iterator4 = _createForOfIteratorHelper(I),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var i = _step4.value;
            var key = Z[i];
            if (typeof config.showArea === 'function' && config.showArea(key)) {
              if (!areaGroups.has(key)) {
                areaGroups.set(key, []);
              }
              areaGroups.get(key).push(i);
            }
            switch (this._dataSetConfigs[key].type) {
              case 'line':
                if (!lineGroups.has(key)) {
                  lineGroups.set(key, []);
                }
                lineGroups.get(key).push(i);
                break;
              case 'bar':
                if (!barGroups.has(key)) {
                  barGroups.set(key, []);
                }
                barGroups.get(key).push(i);
                break;
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
        if (lineGroups.size > 0) {
          // Construct a line generator.
          var line = d3.line()
          //.defined(i => D[i])
          .curve(config.curve).x(function (i) {
            return xScale(X[i]);
          }).y(function (i) {
            return yScale(Y[i]);
          });
          linePath = svg.append('g').attr('fill', 'none').attr('stroke', typeof config.color === 'string' ? config.color : null).attr('stroke-linecap', config.strokeLinecap).attr('stroke-linejoin', config.strokeLinejoin).attr('stroke-width', config.strokeWidth).attr('stroke-opacity', config.strokeOpacity).selectAll('path').data(lineGroups).join('path').style('mix-blend-mode', config.mixBlendMode).attr('stroke', typeof config.color === 'function' ? function (p) {
            return config.color(p[0]);
          } : null).attr('d', function (d) {
            return line(d[1]);
          });
        }

        // Add the area
        if (areaGroups.size > 0) {
          var area = d3.area()
          //.defined(i => D[i])
          .curve(config.curve).x(function (i) {
            return xScale(X[i]);
          }).y0(function () {
            return config.yRange[0];
          }).y1(function (i) {
            return yScale(Y[i]);
          });
          svg.append('g').attr('stroke', 'none').attr('fill', typeof config.color === 'string' ? config.color + '30' : null).selectAll('path').data(areaGroups).join('path').style('mix-blend-mode', config.mixBlendMode).attr('fill', typeof config.color === 'function' ? function (p) {
            return config.color(p[0]) + '30';
          } : null).attr('d', function (d) {
            return area(d[1]);
          });
        }
        if (barGroups.size > 0) {
          var xBarScale = d3.scaleBand().domain(X).range(config.xRange).padding(config.xPadding);
          svg.append('g').selectAll('g').data(barGroups).join('g').attr('fill', typeof config.color === 'function' ? function (d) {
            return config.color(d[0]) + '30';
          } : null).selectAll('rect').data(function (d) {
            return d[1].map(function (val) {
              return {
                key: d[0],
                value: val
              };
            });
          }).join('rect').attr('x', function (d) {
            return xBarScale(X[d.value]);
          }).attr('y', function (d) {
            return yScale(Y[d.value]);
          }).attr('height', function (d) {
            return config.yRange[0] - yScale(Y[d.value]);
          }).attr('width', xBarScale.bandwidth());
        }
        var dot = svg.append('g').attr('display', 'none').attr('fill', 'currentColor');
        dot.append('circle').attr('r', 2.5);
        dot.append('text').attr('font-family', 'sans-serif').attr('font-size', 10).attr('text-anchor', 'middle').attr('y', -8);
        return Object.assign(svg.node(), {
          value: null
        });
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._chart = null;
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

//# sourceMappingURL=Chart.js.map?dt=1672653480367