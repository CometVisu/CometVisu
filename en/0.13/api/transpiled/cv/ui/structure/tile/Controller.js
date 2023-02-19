function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
      "cv.ui.structure.IController": {
        "require": true
      },
      "qx.bom.Stylesheet": {
        "construct": true
      },
      "qx.util.ResourceManager": {
        "construct": true
      },
      "cv.Config": {
        "construct": true
      },
      "qx.locale.Manager": {
        "construct": true,
        "defer": "runtime"
      },
      "qx.log.Logger": {
        "defer": "runtime"
      },
      "qx.bom.History": {},
      "qx.event.message.Bus": {},
      "cv.io.BackendConnections": {},
      "qx.io.request.Xhr": {},
      "cv.TemplateEngine": {},
      "qx.util.Request": {},
      "cv.data.Model": {},
      "cv.Application": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Controller.js
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
   * Controller for the 'tile' structure.
   *
   * This structure is based on web-components and does not need a parser to work.
   * The config file is directly attached to the document body.
   * The widgets in this structure register a customElement and the browser automatically creates instances
   * of this widgets once the customElement is added to the body.
   *
   * The basic structure is a set of pages that contain a list of tiles.
   * Each tile contains a grid of 3 rows and 3 columns. The components can be added to a cell of that grid
   * but also can spread over more than one cell by using row-/column spanning.
   *
   * This structure provides some tiles with a pre-defined content, e.g. a <cv-switch> which
   * contains of a button in the middle of the tile and a primary- and secondary label in the third row.
   *
   * Those pre-defined tiles are provided by a <template> (@see https://developer.mozilla.org/de/docs/Web/HTML/Element/template)
   * User are able to define own templates for re-usable tiles if they need one that this structure does not provide.
   *
   * @asset(structures/tile/*)
   * @author Tobias Bräutigam
   * @since 2022
   * @ignore(IntersectionObserver)
   */
  qx.Class.define('cv.ui.structure.tile.Controller', {
    extend: qx.core.Object,
    type: 'singleton',
    implement: cv.ui.structure.IController,
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_72_0 = '';
      qx.bom.Stylesheet.includeFile(qx.util.ResourceManager.getInstance().toUri('designs/tile-globals.scss').replace('.scss', '.css') + (cv.Config.forceReload === true ? '?' + Date.now() : ''));
      qx.locale.Manager.getInstance().addListener('changeLocale', this._onChangeLocale, this);
    },
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      // prefix for all custom components uses/provided by this structure
      PREFIX: 'cv-',
      __P_72_1: {},
      __P_72_2: {},
      MAPPING_PARAM_REGEX: /^(.+)\(([^)]+)\)$/,
      register: function register(webComponentName, qxClass) {
        this.__P_72_1[webComponentName] = qxClass;
      },
      onComponentCreated: function onComponentCreated(element) {
        var name = element.tagName.toLowerCase();
        if (Object.prototype.hasOwnProperty.call(this, name)) {
          var QxClass = this.__P_72_1[name];
          if (!Object.prototype.hasOwnProperty.call(this, name)) {
            this.__P_72_2[name] = [];
          }
          this.__P_72_2[name].push(new QxClass(element));
        } else {
          qx.log.Logger.error(this, 'no QxClass registered for custom element ' + name);
        }
      }
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      /**
       * The target this structure should be inserted into
       */
      renderTarget: {
        check: 'Element',
        init: document.body
      },
      /**
       * Namespace for path ids
       */
      namespace: {
        check: 'String',
        init: ''
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_72_0: null,
      __P_72_3: null,
      __P_72_4: null,
      getHtmlStructure: function getHtmlStructure() {
        return this.__P_72_0;
      },
      supports: function supports(feature, subfeature) {
        return false;
      },
      initLayout: function initLayout() {},
      __P_72_5: function __P_72_5() {
        // open first page
        if (!document.location.hash) {
          this.scrollToPage(this.getInitialPageId());
        } else {
          this.scrollToPage(document.location.hash.substring(1));
        }
      },
      onHistoryRequest: function onHistoryRequest(anchor) {
        if (anchor) {
          this.scrollToPage(anchor);
        }
      },
      scrollToPage: function scrollToPage(pageId, skipHistory) {
        if (!pageId) {
          return;
        }
        var page = document.querySelector('#' + pageId);
        if (page) {
          if (!page.classList.contains('active')) {
            var _iterator = _createForOfIteratorHelper(document.querySelectorAll('cv-page.active')),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var oldPage = _step.value;
                oldPage.classList.remove('active');
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            var _iterator2 = _createForOfIteratorHelper(document.querySelectorAll('cv-page.sub-active')),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var _oldPage = _step2.value;
                _oldPage.classList.remove('sub-active');
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
            page.classList.add('active');
            // mark parent pages that there is an active subpage
            var parentElement = page.parentElement;
            while (parentElement && parentElement.nodeName.toLowerCase() !== 'main') {
              if (parentElement.nodeName.toLowerCase() === 'cv-page') {
                parentElement.classList.add('sub-active');
              }
              parentElement = parentElement.parentElement;
            }
            if (skipHistory === undefined) {
              var headline = page.getAttribute('name');
              var pageTitle = 'CometVisu';
              if (headline) {
                pageTitle = headline + ' - ' + pageTitle;
              }
              qx.bom.History.getInstance().addToHistory(pageId, pageTitle);
            }
            qx.event.message.Bus.dispatchByName('cv.ui.structure.tile.currentPage', page);
          }
        } else {
          this.warn('no page with id', pageId, 'found');
        }
      },
      // not needed, backend parse/init themselves
      parseBackendSettings: function parseBackendSettings(xml) {
        var _this = this;
        if (xml.querySelectorAll('cv-backend').length === 0) {
          // no backends defined, use the default one;
          var client = cv.io.BackendConnections.initBackendClient();
          client.login(true, cv.Config.configSettings.credentials, function () {
            _this.debug('logged in');
            cv.io.BackendConnections.startInitialRequest();
          });
        }
        return false;
      },
      /**
       * Parses structure specific settings
       * @param config {XMLDocument} loaded config
       */
      parseSettings: function parseSettings(config) {
        var _this2 = this;
        document.body.classList.add('loading-structure');
        var settings = cv.Config.configSettings;
        var configElement = config.documentElement;
        settings.bindClickToWidget = configElement.getAttribute('bind_click_to_widget') === 'true';
        this.translate(config, true);
        if (!cv.Config.cacheUsed) {
          var templates = qx.util.ResourceManager.getInstance().toUri('structures/tile/templates.xml');
          var ajaxRequest = new qx.io.request.Xhr(templates);
          ajaxRequest.set({
            accept: 'application/xml',
            cache: !cv.Config.forceReload
          });
          ajaxRequest.addListenerOnce('success', function (e) {
            var content = e.getTarget().getResponse();
            var target = _this2.getRenderTarget();
            _this2.debug('creating pages');
            // register custom elements for templates in this document
            _this2.registerTemplates(content);
            var child;
            // we need the documents to be in HTML namespace
            if (!content.documentElement.xmlns) {
              var text = e.getTarget().getResponseText();
              text = text.replace('<templates', '<templates xmlns="http://www.w3.org/1999/xhtml"');
              var parser = new DOMParser();
              content = parser.parseFromString(text, 'text/xml');
            }
            while (child = content.documentElement.firstElementChild) {
              target.appendChild(child);
            }
            while (child = configElement.firstElementChild) {
              target.appendChild(child);
            }
            document.body.classList.remove('loading-structure');
            _this2.debug('finalizing');
            _this2.observeVisibility();
            qx.event.message.Bus.dispatchByName('setup.dom.append');
            _this2.debug('pages created');
            _this2.__P_72_5();
            _this2.debug('setup.dom.finished');
            qx.event.message.Bus.dispatchByName('setup.dom.finished.before');
            cv.TemplateEngine.getInstance().setDomFinished(true);
          });
          ajaxRequest.addListener('statusError', function (e) {
            var status = e.getTarget().getTransport().status;
            if (!qx.util.Request.isSuccessful(status)) {
              _this2.error('filenotfound', templates);
            }
            document.body.classList.remove('loading-structure');
          });
          ajaxRequest.send();
        }
      },
      /**
       * Registers customElements for all templates in the given xml that are direct children of a <templates structure="tile"> element
       * @param xml {XMLDocument}
       */
      registerTemplates: function registerTemplates(xml) {
        xml.querySelectorAll('templates[structure=\'tile\'] > template').forEach(function (template) {
          customElements.define(cv.ui.structure.tile.Controller.PREFIX + template.getAttribute('id'), /*#__PURE__*/function (_TemplatedElement) {
            "use strict";

            _inherits(_class, _TemplatedElement);
            var _super = _createSuper(_class);
            function _class() {
              _classCallCheck(this, _class);
              return _super.call(this, template.getAttribute('id'));
            }
            return _createClass(_class);
          }(TemplatedElement));
        });
      },
      /**
       * Pre parsing hook, do everything here that is needed before the real parsing process can start
       * @param xml {XMLDocument}
       */
      preParse: function preParse(xml) {
        var _this3 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var theme, data;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (xml.documentElement.hasAttribute('theme')) {
                  theme = xml.documentElement.getAttribute('theme');
                  data = {};
                  if (theme === 'system') {
                    if (window.matchMedia) {
                      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                      document.documentElement.setAttribute('data-theme', theme);
                      data['theme'] = theme;
                      cv.data.Model.getInstance().updateFrom('system', data);
                      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
                        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
                        data['theme'] = e.matches ? 'dark' : 'light';
                        cv.data.Model.getInstance().updateFrom('system', data);
                      });
                    } else {
                      _this3.error('system theme detection not possible in this browser');
                    }
                  } else {
                    document.documentElement.setAttribute('data-theme', theme);
                    data['theme'] = theme;
                    cv.data.Model.getInstance().updateFrom('system', data);
                  }
                }
                return _context.abrupt("return", true);
              case 2:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      /**
       * Generate the UI code from the config file
       * @param config {Object} loaded config file usually an XMLDocument but other structures might use different formats
       */
      createUI: function createUI(config) {},
      observeVisibility: function observeVisibility() {
        // find all pages with an iframe with attribute "data-src" and observe its parent page
        var observer = new IntersectionObserver(function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && entry.target.hasAttribute('data-src')) {
              entry.target.setAttribute('src', entry.target.getAttribute('data-src'));
              entry.target.removeAttribute('data-src');
              observer.unobserve(entry.target);
            }
          }, {
            root: document.querySelector('body > main')
          });
        });
        var _iterator3 = _createForOfIteratorHelper(document.querySelectorAll('iframe[data-src], img[data-src]')),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var iframe = _step3.value;
            observer.observe(iframe);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      },
      translate: function translate(doc, rememberKeys, useKeys) {
        var language = qx.locale.Manager.getInstance().getLanguage();
        var match = /locale=([a-z]{2,3})/.exec(document.location.search);
        if (match) {
          language = match[1];
        }
        if (rememberKeys) {
          this._trKeys = {};
        }
        for (var _i = 0, _arr = ['name', 'label', 'title', 'format']; _i < _arr.length; _i++) {
          var attr = _arr[_i];
          var _iterator4 = _createForOfIteratorHelper(doc.querySelectorAll("*[".concat(attr, "^=\"tr(\"]"))),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var trNameElement = _step4.value;
              var _match = /^tr\('([^']+)'\)$/.exec(trNameElement.getAttribute(attr));
              if (!_match && !useKeys) {
                this.warn('attribute content no valid translation string', trNameElement.getAttribute(attr));
                continue;
              }
              var key = useKeys ? this._trKeys[trNameElement.getAttribute(attr)] : _match[1];
              var translation = doc.querySelector("cv-translations > language[name=\"".concat(language, "\"] > tr[key='").concat(key, "']"));
              if (translation) {
                if (rememberKeys) {
                  this._trKeys[translation.textContent.trim()] = key;
                }
                trNameElement.setAttribute(attr, translation.textContent.trim());
              } else {
                trNameElement.setAttribute(attr, key);
                this.warn("[".concat(language, "] no translation found for: \"").concat(key, "\""));
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
        var _iterator5 = _createForOfIteratorHelper(doc.querySelectorAll('*[tr="true"]')),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var trTextElement = _step5.value;
            var _key = useKeys ? this._trKeys[trTextElement.textContent.trim()] : trTextElement.textContent.trim();
            var _translation = doc.querySelector("cv-translations > language[name=\"".concat(language, "\"] > tr[key='").concat(_key, "']"));
            if (_translation) {
              if (rememberKeys) {
                this._trKeys[_translation.textContent.trim()] = _key;
              }
              trTextElement.textContent = _translation.textContent.trim();
            } else {
              trTextElement.textContent = _key;
              this.warn("[".concat(language, "] no translation found for: \"").concat(_key, "\""));
            }
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      },
      /**
       * Handle fired event from screensaver
       * @return {Array<string>} Array with addresses
       */
      doScreenSave: function doScreenSave() {
        if (cv.Config.configSettings.screensave_page) {
          this.scrollToPage(cv.Config.configSettings.screensave_page);
        }
      },
      /**
       * Return the addresses needed to update all states on the initially loaded page
       */
      getInitialAddresses: function getInitialAddresses() {
        return [];
      },
      /**
       * Returns the widget id of the page item initially loaded
       * @returns {String} widget path like 'id_'...
       */
      getInitialPageId: function getInitialPageId() {
        var firstPage = document.querySelector('cv-page');
        return firstPage ? firstPage.id : '';
      },
      /**
       *
       * @param name {String} mapping name
       * @param mapping {cv.ui.structure.tile.elements.Mapping}
       */
      addMapping: function addMapping(name, mapping) {
        if (!this.__P_72_3) {
          this.__P_72_3 = {};
        }
        this.__P_72_3[name] = mapping;
      },
      removeMapping: function removeMapping(name) {
        if (this.__P_72_3) {
          delete this.__P_72_3[name];
        }
      },
      mapValue: function mapValue(mappingName, value, store) {
        var match;
        var params = [];
        if ((match = cv.ui.structure.tile.Controller.MAPPING_PARAM_REGEX.exec(mappingName)) !== null) {
          // this mapping name contains a parameter
          try {
            params = JSON.parse("[".concat(match[2].replaceAll('\'', '"'), "]"));
          } catch (e) {
            this.error('error parsing parameters from ' + mappingName);
          }
          mappingName = match[1];
        }
        if (this.__P_72_3 && Object.prototype.hasOwnProperty.call(this.__P_72_3, mappingName)) {
          return this.__P_72_3[mappingName].mapValue(value, store, params);
        }
        return value;
      },
      /**
       * @param name {String} styling name
       * @param styling {cv.ui.structure.tile.elements.Styling}
       */
      addStyling: function addStyling(name, styling) {
        if (!this.__P_72_4) {
          this.__P_72_4 = {};
        }
        this.__P_72_4[name] = styling;
      },
      removeStyling: function removeStyling(name) {
        if (this.__P_72_4) {
          delete this.__P_72_4[name];
        }
      },
      styleValue: function styleValue(stylingName, value, store) {
        if (this.__P_72_4 && Object.prototype.hasOwnProperty.call(this.__P_72_4, stylingName)) {
          return this.__P_72_4[stylingName].mapValue(value, store);
        }
        return value;
      },
      // for compatibility with pure controller
      parseLabel: function parseLabel() {
        return '';
      },
      _onChangeLocale: function _onChangeLocale() {
        this.translate(document.body, false, true);
      }
    },
    defer: function defer(statics) {
      if (!window.cvTestMode) {
        // do not apply ourselves automatically in test mode
        cv.Application.structureController = statics.getInstance();
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      qx.locale.Manager.getInstance().removeListener('changeLocale', this._onChangeLocale, this);
    }
  });
  var TemplatedElement = /*#__PURE__*/function (_HTMLElement) {
    "use strict";

    _inherits(TemplatedElement, _HTMLElement);
    var _super2 = _createSuper(TemplatedElement);
    function TemplatedElement(templateId) {
      var _this4;
      _classCallCheck(this, TemplatedElement);
      _this4 = _super2.call(this);
      var controller = cv.ui.structure.tile.Controller.getInstance();
      var template = document.getElementById(templateId);
      if (template) {
        var slotAttributes = ['name', 'replaces', 'parent-scope'];
        var content = template.content.cloneNode(true);

        // copy all attributes, except 'id' of the template itself to the widget
        var _iterator6 = _createForOfIteratorHelper(template.getAttributeNames()),
          _step6;
        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var name = _step6.value;
            if (name !== 'id') {
              _this4.setAttribute(name, template.getAttribute(name));
            }
          }

          // move slots into template
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
        var _iterator7 = _createForOfIteratorHelper(content.querySelectorAll('slot')),
          _step7;
        try {
          var _loop = function _loop() {
            var slot = _step7.value;
            var slotName = slot.getAttribute('name');
            var replacementSelector = slot.hasAttribute('replaces') ? slot.getAttribute('replaces') : '';
            var slotParentScope = slot.hasAttribute('parent-scope') ? parseInt(slot.getAttribute('parent-scope')) : 0;
            var slotContents = _this4.querySelectorAll("[slot='".concat(slotName, "']"));
            var attrs = {};
            for (var i = 0, l = slot.attributes.length; i < l; i++) {
              if (!slotAttributes.includes(slot.attributes[i].name)) {
                attrs[slot.attributes[i].name] = slot.attributes[i].value;
              }
            }
            if (slotContents.length > 0) {
              Array.from(slotContents).forEach(function (slotContent) {
                var newNode = slotContent.cloneNode(true);
                Object.keys(attrs).forEach(function (attrName) {
                  if (newNode.hasAttribute(attrName)) {
                    if (attrName === 'class') {
                      // append it
                      newNode.classList.add(attrs[attrName]);
                    } else {
                      qx.log.Logger.debug(controller, '[' + templateId + '] attribute', attrName, 'already set, skipping');
                    }
                  } else {
                    newNode.setAttribute(attrName, attrs[attrName]);
                  }
                });
                newNode.removeAttribute('slot');
                slot.parentNode.insertBefore(newNode, slot);
              });
              slot.remove();
              if (replacementSelector) {
                content.querySelectorAll(replacementSelector).forEach(function (replaced) {
                  replaced.remove();
                });
              }
            } else {
              var parentNode = slot.parentNode;
              if (slotParentScope > 0) {
                // got slotParentScope elements up and remove that one
                var _i2 = slotParentScope - 1;
                while (_i2 > 0) {
                  parentNode = parentNode.parentNode;
                  _i2--;
                }
                if (parentNode) {
                  parentNode.remove();
                }
              } else {
                slot.remove();
                if (parentNode.children.length === 0) {
                  // also remove slots parent when it has no content
                  parentNode.remove();
                }
              }
            }
          };
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            _loop();
          }
          // transfer attribute slots
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
        var attributes = _this4.getAttributeNames();
        attributes.forEach(function (name) {
          var value = _this4.getAttribute(name);
          var targets = content.querySelectorAll('[slot-' + name + ']');
          var targetName = name;
          // allow names like percent-mapping that should also be mapped to a certain elements 'mapping' attribute
          if (name.endsWith('-mapping')) {
            targetName = 'mapping';
          } else if (name.endsWith('-styling')) {
            targetName = 'styling';
          } else if (name.endsWith('-format')) {
            targetName = 'format';
          }
          targets.forEach(function (target) {
            if (targetName !== name && target.hasAttribute('slot-' + name)) {
              target.setAttribute(name, value || target.getAttribute('slot-' + name));
              target.removeAttribute('slot-' + name);
            } else {
              target.setAttribute(targetName, value || target.getAttribute('slot-' + targetName));
              target.removeAttribute('slot-' + targetName);
            }
          });
          if (targets.length > 0) {
            _this4.removeAttribute(name);
          }
        });
        content.querySelectorAll('*').forEach(function (elem) {
          _toConsumableArray(elem.attributes).forEach(function (attr) {
            if (attr.name.startsWith('slot-')) {
              var targetName = attr.name.substring(5);
              // only e.g. map slot-progress-mapping to mapping if we have no slot-mapping attribute
              if (attr.name.endsWith('-mapping') && elem.hasAttribute('slot-mapping')) {
                targetName = 'mapping';
              } else if (attr.name.endsWith('-styling') && elem.hasAttribute('slot-styling')) {
                targetName = 'styling';
              } else if (attr.name.endsWith('-format') && elem.hasAttribute('slot-format')) {
                targetName = 'format';
              }
              if (attr.value) {
                elem.setAttribute(targetName, attr.value);
              }
              elem.removeAttribute(attr.name);
            }
          });
        });

        // clear content
        _this4.innerHTML = '';
        _this4.appendChild(content);
        _this4.classList.add('cv-widget');
      } else {
        qx.log.Logger.error(controller, '[' + templateId + '] no template found for id', templateId);
      }
      return _this4;
    }
    return _createClass(TemplatedElement);
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
  cv.ui.structure.tile.Controller.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Controller.js.map?dt=1676809299823