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
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
      "cv.io.Fetch": {},
      "cv.io.listmodel.Registry": {},
      "qx.data.Array": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* List.js
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

  /**
   * Generates a list of items. A &lt;template&gt;-element defines the content of the list-items and a model is used to
   * generate those items and apply the models content to the list-items.
   * It allows custom Javascript code in a &lt;script&gt;-Element to fill the model or address-Elements as model source.
   * The model can be refreshed in a time defined interval, which is set by the 'refresh' attribute.
   *
   * @widgetexample <settings>
   *    <caption>Example list</caption>
   *    <screenshot name="list_simple"/>
   *  </settings>
      <cv-list refresh="10">
        <model>
          <script><![CDATA[
           for (let i = 0; i < Math.round(Math.random()*10); i++) {
             model.push({
               label: 'This is list item no ' + i,
               subLabel: 'Sublabel number ' + i
             })
           }
           ]]>
           </script>
         </model>
         <template>
           <li>
             <label class="primary">${label}</label>
             <label class="secondary">${subLabel}</label>
           </li>
         </template>
         <template when="empty">
           <li>
             <label class="primary">Model is empty!</label>
           </li>
         </template>
     </cv-list>
   */
  qx.Class.define('cv.ui.structure.tile.components.List', {
    extend: cv.ui.structure.tile.components.AbstractComponent,
    include: [cv.ui.structure.tile.MVisibility, cv.ui.structure.tile.MRefresh],
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      value: {
        refine: true,
        init: []
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _target: null,
      _timer: null,
      _model: null,
      _getModel: null,
      _filterModel: null,
      _sortModel: null,
      _limit: null,
      _modelInstance: null,
      _init: function _init() {
        var _this = this;
        var element = this._element;
        this._model = [];
        var refreshOnUpdate = false;
        var model = element.querySelector('model');
        if (element.parentElement) {
          element.parentElement.classList.add('has-list');
        }
        if (!model) {
          this.error('cv-list needs a model');
          return;
        }
        if (model.hasAttribute('filter')) {
          this._filterModel = new Function('item', 'index', '"use strict"; return ' + model.getAttribute('filter'));
        }
        if (model.hasAttribute('limit')) {
          this._limit = parseInt(model.getAttribute('limit'));
        }
        var readAddresses = model.querySelectorAll(':scope > cv-address:not([mode="write"])');

        // if we have top level write addresses, we need to listen to sendState Events from the list items
        var _iterator = _createForOfIteratorHelper(element.querySelectorAll(':scope > cv-address')),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var address = _step.value;
            if (address.getAttribute('mode') !== 'read') {
              element.addEventListener('sendState', function (ev) {
                // forward event copy (dispatching the same is not possible) to all write addresses
                var evCopy = new CustomEvent('sendState', {
                  bubbles: ev.bubbles,
                  cancelable: ev.cancelable,
                  detail: ev.detail
                });
                var _iterator4 = _createForOfIteratorHelper(element.querySelectorAll(':scope > cv-address')),
                  _step4;
                try {
                  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                    var a = _step4.value;
                    a.dispatchEvent(evCopy);
                  }
                } catch (err) {
                  _iterator4.e(err);
                } finally {
                  _iterator4.f();
                }
              });
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (model.hasAttribute('sort-by')) {
          var sortBy = model.getAttribute('sort-by');
          // reverse order in 'desc' sort mode
          var sortModifier = model.getAttribute('sort-mode') === 'desc' ? -1 : 1;
          this._sortModel = function (left, right) {
            var leftVal = left[sortBy];
            var rightVal = right[sortBy];
            if (leftVal === rightVal) {
              return 0;
            } else if (_typeof(leftVal) === _typeof(rightVal)) {
              switch (_typeof(leftVal)) {
                case 'number':
                  return (leftVal - rightVal) * sortModifier;
                case 'boolean':
                  return (leftVal ? -1 : 1) * sortModifier;
                case 'string':
                  return leftVal.localeCompare(rightVal) * sortModifier;
                default:
                  return JSON.stringify(leftVal).localeCompare(JSON.stringify(rightVal)) * sortModifier;
              }
            } else if (leftVal === undefined || leftVal === null) {
              return 1 * sortModifier;
            } else if (rightVal === undefined || rightVal === null) {
              return -1 * sortModifier;
            }
            return 0;
          };
        }
        if (model.hasAttribute('src') || model.hasAttribute('config-section')) {
          // fetch from url
          this._getModel = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var options, _i, _arr, proxyParam, res;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  options = {
                    ttl: _this.getRefresh()
                  };
                  for (_i = 0, _arr = ['self-signed', 'config-section', 'auth-type']; _i < _arr.length; _i++) {
                    proxyParam = _arr[_i];
                    if (model.hasAttribute(proxyParam)) {
                      options[proxyParam] = model.getAttribute(proxyParam);
                    }
                  }
                  _context.next = 4;
                  return cv.io.Fetch.cachedFetch(model.getAttribute('src'), options, model.getAttribute('proxy') === 'true');
                case 4:
                  res = _context.sent;
                  return _context.abrupt("return", res);
                case 6:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
        } else if (model.hasAttribute('class')) {
          // initialize internal class instance that implements cv.io.listmodel.IListModel
          var Clazz = cv.io.listmodel.Registry.get(model.getAttribute('class'));
          if (Clazz) {
            var modelInstance = this._modelInstance = new Clazz();
            modelInstance.addListener('refresh', function () {
              return _this.refresh();
            });
            if (model.hasAttribute('parameters')) {
              var props = {};
              var _iterator2 = _createForOfIteratorHelper(model.getAttribute('parameters').split(',')),
                _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var entry = _step2.value;
                  var _entry$split$map = entry.split('=').map(function (n) {
                      return n.trim();
                    }),
                    _entry$split$map2 = _slicedToArray(_entry$split$map, 2),
                    name = _entry$split$map2[0],
                    value = _entry$split$map2[1];
                  props[name] = value.startsWith('\'') ? value.substring(1, value.length - 1) : value;
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
              modelInstance.set(props);
            }
            this._getModel = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return modelInstance.refresh();
                  case 2:
                    return _context2.abrupt("return", modelInstance.getModel());
                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
          } else {
            this.error("clazz \"cv.io.listmodel.".concat(model.getAttribute('class'), "\" not found"));
          }
        } else {
          var script = model.querySelector(':scope > script');
          var data = model.querySelectorAll(':scope > cv-data');
          if (script) {
            this._getModel = new Function('"use strict";let model = []; ' + script.innerText.trim() + '; return model');
            this._model = this._getModel();
          } else if (readAddresses.length > 0) {
            // model has an address that triggers a refresh on update, so we just have to read the model from the updated value
            this._getModel = this.getValue;
            refreshOnUpdate = true;
          } else if (data.length > 0) {
            this._model = [];
            this._getModel = function () {
              return _this._model;
            };
            data.forEach(function (elem, i) {
              var d = {
                index: i
              };
              var _iterator3 = _createForOfIteratorHelper(elem.attributes),
                _step3;
              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  var a = _step3.value;
                  d[a.name] = a.value;
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
              _this._model.push(d);
            });
          } else {
            this.error('cv-list > model must have at least one read address, src-attribute, cv-data child or a script that fills the model.');
            return;
          }
        }
        if (readAddresses.length > 0) {
          element.addEventListener('stateUpdate', function (ev) {
            return _this.onStateUpdate(ev);
          });
        }
        if (!refreshOnUpdate) {
          if (this.isVisible()) {
            // only load when visible
            this.refresh();
          }
          if (element.hasAttribute('refresh')) {
            this.setRefresh(parseInt(element.getAttribute('refresh')));
          }
        }
        this._element.addEventListener('click', function (ev) {
          var templateRoot = ev.target;
          var data = {};
          var collectData = function collectData(elem) {
            if (elem) {
              for (var i = 0; i < elem.attributes.length; i++) {
                var attrib = elem.attributes[i];
                if (attrib.name.startsWith('data-')) {
                  data[attrib.name.substring(5)] = attrib.value;
                }
              }
            }
          };
          collectData(templateRoot);
          var level = 0;
          var model = templateRoot.$$model;
          while (templateRoot && (!model || !data.action) && level <= 5) {
            templateRoot = templateRoot.parentElement;
            if (templateRoot === _this._element) {
              break;
            }
            if (templateRoot) {
              if (!model && templateRoot.$$model) {
                model = templateRoot.$$model;
              }
              if (!data.action && templateRoot.hasAttribute('data-action')) {
                collectData(templateRoot);
              }
            }
            level++;
          }
          if (data.action && _this._modelInstance && _this._modelInstance.handleEvent(ev, data, model)) {
            ev.stopPropagation();
          }
        });
      },
      onStateUpdate: function onStateUpdate(ev) {
        if (ev.detail.target === 'refresh') {
          if (this.isVisible()) {
            // only load when visible
            this.refresh();
          } else {
            // reset lastRefresh to that the refresh get called when this item gets visible
            this._lastRefresh = null;
          }
        } else {
          cv.ui.structure.tile.components.List.superclass.prototype.onStateUpdate.call(this, ev);
        }
        // cancel event here
        ev.stopPropagation();
      },
      _applyValue: function _applyValue() {
        // reset last refresh, because with new data its obsolete
        this._lastRefresh = 0;
        this.refresh();
      },
      refresh: function refresh() {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var element, template, newModel, target, whenEmptyTemplate, emptyModel, emptyElem, child, i, itemTemplate, _i2, elem, getValue;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                element = _this2._element;
                template = element.querySelector(':scope > template:not([when])');
                newModel = [];
                if (typeof _this2._getModel === 'function') {
                  newModel = _this2._getModel();
                }
                if (!(newModel instanceof Promise)) {
                  _context3.next = 14;
                  break;
                }
                _context3.prev = 5;
                _context3.next = 8;
                return newModel;
              case 8:
                newModel = _context3.sent;
                _context3.next = 14;
                break;
              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](5);
                _this2.error('error refreshing async model:', _context3.t0);
              case 14:
                target = element.querySelector(':scope > ul');
                if (!(template.getAttribute('wrap') === 'false')) {
                  _context3.next = 19;
                  break;
                }
                target = element;
                _context3.next = 30;
                break;
              case 19:
                if (!template.hasAttribute('target')) {
                  _context3.next = 29;
                  break;
                }
                _context3.t1 = template.getAttribute('target');
                _context3.next = _context3.t1 === 'parent' ? 23 : 26;
                break;
              case 23:
                target = element.parentElement;
                // we do not need the list to be visible then
                element.style.display = 'none';
                return _context3.abrupt("break", 27);
              case 26:
                throw new Error('invalid target: ' + template.getAttribute('target'));
              case 27:
                _context3.next = 30;
                break;
              case 29:
                if (!target) {
                  target = document.createElement('ul');
                  target.classList.add('content');
                  element.appendChild(target);
                }
              case 30:
                _this2.debug('refreshing with new model length', newModel.length);
                if (!(Array.isArray(newModel) || newModel instanceof qx.data.Array)) {
                  _context3.next = 55;
                  break;
                }
                if (typeof _this2._filterModel === 'function') {
                  newModel = newModel.filter(_this2._filterModel);
                }
                if (typeof _this2._sortModel === 'function') {
                  newModel.sort(_this2._sortModel);
                }
                if (_this2._limit) {
                  newModel = newModel.slice(0, _this2._limit);
                }
                if (!(newModel.length === 0)) {
                  _context3.next = 45;
                  break;
                }
                whenEmptyTemplate = element.querySelector(':scope > template[when="empty"]'); // remove old entries
                while (target.firstElementChild && target.firstElementChild.hasAttribute('data-row')) {
                  target.removeChild(target.firstElementChild);
                }
                if (!(whenEmptyTemplate && !target.querySelector(':scope > .empty-model'))) {
                  _context3.next = 43;
                  break;
                }
                emptyModel = whenEmptyTemplate.content.firstElementChild.cloneNode(true);
                emptyModel.classList.add('empty-model');
                target.appendChild(emptyModel);
                return _context3.abrupt("return");
              case 43:
                _context3.next = 48;
                break;
              case 45:
                emptyElem = target.querySelector(':scope > .empty-model');
                if (emptyElem) {
                  emptyElem.remove();
                }
                for (i = target.children.length - 1; i >= 0; i--) {
                  child = target.children[i];
                  if (child.hasAttribute('data-row') && parseInt(child.getAttribute('data-row')) >= newModel.length) {
                    target.removeChild(child);
                  }
                }
              case 48:
                itemTemplate = document.createElement('template'); // remove entries we do not need anymore
                for (_i2 = newModel.length; _i2 < _this2._model.length; _i2++) {
                  elem = target.querySelector(":scope > [data-row=\"".concat(_i2, "\"]"));
                  if (elem) {
                    elem.remove();
                  }
                }
                getValue = function getValue(name, entry) {
                  var index = -1;
                  if (name.endsWith(']')) {
                    // array access
                    index = parseInt(name.substring(name.indexOf('[') + 1, name.length - 1));
                    if (isNaN(index)) {
                      _this2.error('error parsing array index from ' + name, name.substring(name.indexOf('[') + 1, name.length - 1));
                      return '';
                    }
                    name = name.substring(0, name.indexOf('['));
                  }
                  if (Object.prototype.hasOwnProperty.call(entry, name)) {
                    var val = entry[name];
                    if (index >= 0 && Array.isArray(val)) {
                      return val[index];
                    }
                    return val;
                  }
                  return '';
                };
                newModel.forEach(function (entry, i) {
                  var elem = target.querySelector(":scope > [data-row=\"".concat(i, "\"]"));
                  var html = template.innerHTML.replaceAll(/\${([^}]+)}/g, function (match, content) {
                    if (content === 'index') {
                      return '' + i;
                    }
                    if (content.includes('||')) {
                      // elements are or'ed use the first one with value
                      var val = '';
                      var _iterator5 = _createForOfIteratorHelper(content.split('||').map(function (n) {
                          return n.trim();
                        })),
                        _step5;
                      try {
                        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                          var name = _step5.value;
                          val = getValue(name, entry);
                          if (val) {
                            return val;
                          }
                        }
                      } catch (err) {
                        _iterator5.e(err);
                      } finally {
                        _iterator5.f();
                      }
                    }
                    return getValue(content, entry);
                  });
                  itemTemplate.innerHTML = html;
                  // check for elements with when attributes
                  itemTemplate.content.firstElementChild.querySelectorAll('[when]').forEach(function (elem) {
                    var _elem$getAttribute$sp = elem.getAttribute('when').split('=').map(function (n) {
                        return n.trim();
                      }),
                      _elem$getAttribute$sp2 = _slicedToArray(_elem$getAttribute$sp, 2),
                      leftVal = _elem$getAttribute$sp2[0],
                      rightVal = _elem$getAttribute$sp2[1];
                    // noinspection EqualityComparisonWithCoercionJS
                    if (leftVal != rightVal) {
                      elem.parentElement.removeChild(elem);
                    } else {
                      elem.removeAttribute('when');
                    }
                  });
                  if (elem) {
                    // update existing
                    elem.innerHTML = itemTemplate.content.firstElementChild.innerHTML;
                    elem.setAttribute('data-row', '' + i);
                    _this2._initElement(elem, entry);
                  } else {
                    // append new child
                    itemTemplate.content.firstElementChild.setAttribute('data-row', '' + i);
                    elem = itemTemplate.content.cloneNode(true);
                    _this2._initElement(elem.firstElementChild, entry);
                    target.appendChild(elem);
                  }
                });
                _this2._model = newModel;
                _context3.next = 56;
                break;
              case 55:
                _this2.error('model must be an array', newModel);
              case 56:
              case "end":
                return _context3.stop();
            }
          }, _callee3, null, [[5, 11]]);
        }))();
      },
      _initElement: function _initElement(elem, entry) {
        elem.$$model = entry;
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._disposeObjects('_modelInstance', '_timer');
      this._model = null;
      this._filterModel = null;
      this._sortModel = null;
      this._target = null;
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'list', /*#__PURE__*/function (_QxConnector) {
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
  cv.ui.structure.tile.components.List.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=List.js.map?dt=1692560693156