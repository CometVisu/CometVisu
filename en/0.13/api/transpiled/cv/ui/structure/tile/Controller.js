function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "defer": "runtime",
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
      "qx.io.request.Xhr": {},
      "cv.TemplateEngine": {},
      "qx.util.Request": {},
      "cv.data.Model": {},
      "qx.lang.String": {
        "defer": "runtime"
      },
      "cv.ui.structure.tile.widgets.TemplateWidget": {},
      "cv.Application": {
        "defer": "runtime"
      },
      "cv.ui.structure.tile.elements.AbstractCustomElement": {
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
      },
      scrolled: {
        check: 'Boolean',
        init: false,
        apply: '_applyScrolled'
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
      _templateWidgets: null,
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
        var page = document.querySelector('cv-page#' + pageId);
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
        /*      if (xml.querySelectorAll('cv-backend').length === 0) {
                // no backends defined, use the default one;
                const client = cv.io.BackendConnections.initBackendClient();
                client.login(true, cv.Config.configSettings.credentials, () => {
                  this.debug('logged in');
                  cv.io.BackendConnections.startInitialRequests();
                });
              }*/
        return false;
      },
      /**
       * Parses structure specific settings
       * @param config {XMLDocument} loaded config
       */
      parseSettings: function parseSettings(config) {
        var _this = this;
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
            var target = _this.getRenderTarget();
            _this.debug('creating pages');
            // register custom elements for templates in this document
            _this.registerTemplates(content);
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
            _this.debug('finalizing');
            _this.observeVisibility();
            qx.event.message.Bus.dispatchByName('setup.dom.append');
            _this.debug('pages created');
            _this.__P_72_5();
            _this.debug('setup.dom.finished');
            qx.event.message.Bus.dispatchByName('setup.dom.finished.before');
            cv.TemplateEngine.getInstance().setDomFinished(true);
            var main = document.body.querySelector(':scope > main');
            if (main) {
              var shrinkHeight = -1;
              var canAnimate = false;
              main.addEventListener('scroll', function () {
                // we need to know the space that we gain in height, when the shrinked elements are not shown
                // and must not start the effect before we reach that threshold, otherwise
                // main.scrollTop would go back to 0 because we have more height available and do not have to scroll+
                // anymore, that would lead to an endless toggling this effect
                // so long story short: avoid that applying this effect would lead to: main.scrollTop === 0
                if (shrinkHeight < 0) {
                  shrinkHeight = 1;
                  var style;
                  var _iterator3 = _createForOfIteratorHelper(document.body.querySelectorAll(':scope > header [hide-on-scroll="true"]')),
                    _step3;
                  try {
                    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                      var elem = _step3.value;
                      style = getComputedStyle(elem);
                      if (!canAnimate) {
                        // we need at least one element that has a defined height, to get a working animation
                        canAnimate = !!elem.style.height;
                      }
                      shrinkHeight += parseInt(style.height) + parseInt(style.paddingTop) + parseInt(style.paddingBottom) + parseInt(style.marginTop) + parseInt(style.marginBottom);
                    }
                  } catch (err) {
                    _iterator3.e(err);
                  } finally {
                    _iterator3.f();
                  }
                }
                if (!_this.isScrolled() && main.scrollTop > shrinkHeight) {
                  _this.setScrolled(true);
                  if (!canAnimate) {
                    main.scrollTop -= shrinkHeight;
                  }
                } else if (_this.isScrolled() && main.scrollTop === 0) {
                  _this.setScrolled(false);
                  shrinkHeight = -1;
                }
              });
            }
            _this.enablePullToRefresh();
          });
          ajaxRequest.addListener('statusError', function (e) {
            var status = e.getTarget().getTransport().status;
            if (!qx.util.Request.isSuccessful(status)) {
              _this.error('filenotfound', templates);
            }
            document.body.classList.remove('loading-structure');
          });
          ajaxRequest.send();
        }
      },
      _applyScrolled: function _applyScrolled(value) {
        if (value) {
          var _iterator4 = _createForOfIteratorHelper(document.body.querySelectorAll(':scope > header [hide-on-scroll="true"]')),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var elem = _step4.value;
              elem.classList.add('scrolled');
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        } else {
          var _iterator5 = _createForOfIteratorHelper(document.body.querySelectorAll(':scope > header [hide-on-scroll="true"]')),
            _step5;
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var _elem = _step5.value;
              _elem.classList.remove('scrolled');
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        }
      },
      /**
       * Pre parsing hook, do everything here that is needed before the real parsing process can start
       * @param xml {XMLDocument}
       */
      preParse: function preParse(xml) {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
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
                      _this2.error('system theme detection not possible in this browser');
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
        var _iterator6 = _createForOfIteratorHelper(document.querySelectorAll('iframe[data-src], img[data-src]')),
          _step6;
        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var iframe = _step6.value;
            observer.observe(iframe);
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
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
          var _iterator7 = _createForOfIteratorHelper(doc.querySelectorAll("*[".concat(attr, "^=\"tr(\"]"))),
            _step7;
          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var trNameElement = _step7.value;
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
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
        }
        var _iterator8 = _createForOfIteratorHelper(doc.querySelectorAll('*[tr="true"]')),
          _step8;
        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var trTextElement = _step8.value;
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
          _iterator8.e(err);
        } finally {
          _iterator8.f();
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
        return '';
      },
      // for compatibility with pure controller
      parseLabel: function parseLabel() {
        return '';
      },
      _onChangeLocale: function _onChangeLocale() {
        this.translate(document.body, false, true);
      },
      enablePullToRefresh: function enablePullToRefresh() {
        var startY = 0;
        var scrollContainer;
        var refreshSpinner = document.createElement('div');
        refreshSpinner.classList.add('pull-to-refresh');
        var icon = document.createElement('i');
        icon.classList.add('ri-loader-4-fill');
        refreshSpinner.append(icon);
        document.body.append(refreshSpinner);
        var eventSource = document;
        var onMove = function onMove(ev) {
          var touchY = ev.touches[0].clientY;
          var touchDiff = touchY - startY;
          if (touchDiff > 60 && scrollContainer.scrollTop === 0) {
            refreshSpinner.classList.add('visible');
          } else {
            refreshSpinner.classList.remove('visible');
          }
        };
        var onEnd = function onEnd() {
          _finish();
          if (refreshSpinner.classList.contains('visible')) {
            refreshSpinner.classList.remove('visible');
            location.reload();
          }
        };
        var _finish = function finish() {
          eventSource.removeEventListener('touchmove', onMove);
          eventSource.removeEventListener('touchend', onEnd);
          eventSource.removeEventListener('touchcancel', _finish);
        };
        eventSource.addEventListener('touchstart', function (ev) {
          startY = ev.touches[0].clientY;
          scrollContainer = document.querySelector('main');
          if (scrollContainer && scrollContainer.scrollTop === 0) {
            eventSource.addEventListener('touchmove', onMove);
            eventSource.addEventListener('touchend', onEnd);
            eventSource.addEventListener('touchcancel', _finish);
          }
        });
      },
      isTemplateWidget: function isTemplateWidget(name) {
        return this._templateWidgets.includes(name);
      },
      /**
       * Registers customElements for all templates in the given xml that are direct children of a <templates structure="tile"> element
       * @param xml {XMLDocument}
       */
      registerTemplates: function registerTemplates(xml) {
        var _this3 = this;
        if (this._templateWidgets === null) {
          this._templateWidgets = [];
        }
        var _iterator9 = _createForOfIteratorHelper(xml.querySelectorAll('templates[structure=\'tile\'] > template')),
          _step9;
        try {
          var _loop = function _loop() {
            var template = _step9.value;
            var className = qx.lang.String.firstUp(qx.lang.String.camelCase(template.getAttribute('id')));
            var Clazz = qx.Class.getByName("cv.ui.structure.tile.widgets.".concat(className));
            if (!Clazz) {
              Clazz = cv.ui.structure.tile.widgets.TemplateWidget;
            }
            customElements.define(cv.ui.structure.tile.Controller.PREFIX + template.getAttribute('id'), /*#__PURE__*/function (_TemplatedElement) {
              "use strict";

              function _class() {
                _classCallCheck(this, _class);
                return _callSuper(this, _class, [template.getAttribute('id'), Clazz]);
              }
              _inherits(_class, _TemplatedElement);
              return _createClass(_class);
            }(TemplatedElement));
            _this3._templateWidgets.push(cv.ui.structure.tile.Controller.PREFIX + template.getAttribute('id'));
          };
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }
      },
      updateSentryScope: function updateSentryScope() {
        if (cv.Config.sentryEnabled && window.Sentry) {
          Sentry.setTag('ui.structure', 'tile');
          Sentry.setTag('ui.design', cv.Config.getDesign());
        }
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

  /* eslint-disable-next-line no-redeclare */
  var QxConnector = /*#__PURE__*/function (_HTMLElement) {
    "use strict";

    function QxConnector(QxClass) {
      var _this4;
      _classCallCheck(this, QxConnector);
      _this4 = _callSuper(this, QxConnector);
      if (QxClass) {
        if (qx.Class.isSubClassOf(QxClass, cv.ui.structure.tile.elements.AbstractCustomElement)) {
          _this4._instance = new QxClass(_this4);
        } else {
          throw Error(QxClass + ' must be a subclass of cv.ui.structure.tile.elements.AbstractCustomElement');
        }
      }
      if (_this4.hasAttribute('colspan')) {
        _this4.classList.add('colspan-' + _this4.getAttribute('colspan'));
      }
      if (_this4.hasAttribute('rowspan')) {
        _this4.classList.add('rowspan-' + _this4.getAttribute('rowspan'));
      }
      return _this4;
    }
    _inherits(QxConnector, _HTMLElement);
    return _createClass(QxConnector, [{
      key: "getInstance",
      value: function getInstance() {
        return this._instance;
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        if (this._instance) {
          this._instance.setConnected(true);
        }
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        if (this._instance) {
          this._instance.setConnected(false);
        }
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        name = qx.lang.String.camelCase(name);
        if (this._instance && qx.Class.hasProperty(this._instance.constructor, name)) {
          this._instance.set(name, newValue);
        }
      }
    }]);
  }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
  window.QxConnector = QxConnector;
  var TemplatedElement = /*#__PURE__*/function (_QxConnector) {
    "use strict";

    function TemplatedElement(templateId, QxClass) {
      var _this5;
      _classCallCheck(this, TemplatedElement);
      _this5 = _callSuper(this, TemplatedElement, [QxClass]);
      var controller = cv.ui.structure.tile.Controller.getInstance();
      var template = document.getElementById(templateId);
      if (template) {
        var slotAttributes = ['name', 'replaces', 'parent-scope'];
        var content = template.content.cloneNode(true);

        // copy all attributes, except 'id' of the template itself to the widget
        var _iterator10 = _createForOfIteratorHelper(template.getAttributeNames()),
          _step10;
        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var name = _step10.value;
            if (name !== 'id' && !_this5.hasAttribute(name)) {
              _this5.setAttribute(name, template.getAttribute(name));
            }
          }

          // move slots into template
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }
        var _iterator11 = _createForOfIteratorHelper(content.querySelectorAll('slot')),
          _step11;
        try {
          var _loop2 = function _loop2() {
            var slot = _step11.value;
            var slotName = slot.getAttribute('name');
            var replacementSelector = slot.hasAttribute('replaces') ? slot.getAttribute('replaces') : '';
            var slotParentScope = slot.hasAttribute('parent-scope') ? parseInt(slot.getAttribute('parent-scope')) : 0;
            var slotContents = _this5.querySelectorAll("[slot='".concat(slotName, "']"));
            if (slotContents.length === 0 && slotName === 'default') {
              // add all elements that have no slot to this default slot
              slotContents = _this5.querySelectorAll(':scope > *:not([slot])');
            }
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
                if (parentNode.children.length === 0 && slotParentScope >= 0) {
                  // also remove slots parent when it has no content
                  // can be obeyed by setting parent-scope="-1"
                  parentNode.remove();
                }
              }
            }
          };
          for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
            _loop2();
          }
          // transfer attribute slots
        } catch (err) {
          _iterator11.e(err);
        } finally {
          _iterator11.f();
        }
        var attributes = _this5.getAttributeNames();
        var _iterator12 = _createForOfIteratorHelper(attributes),
          _step12;
        try {
          for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
            var _name = _step12.value;
            var value = _this5.getAttribute(_name);
            var slotAttributeName = "slot-".concat(_name);
            var targets = content.querySelectorAll("[".concat(slotAttributeName, "]"));
            var targetName = _name;
            var _iterator14 = _createForOfIteratorHelper(targets),
              _step14;
            try {
              for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
                var target = _step14.value;
                if (target.hasAttribute(slotAttributeName)) {
                  var targetValue = target.getAttribute(slotAttributeName);
                  if (targetValue.startsWith(':')) {
                    // this template slot-attribute contains some configuration
                    var _iterator15 = _createForOfIteratorHelper(targetValue.substring(1).split(',')),
                      _step15;
                    try {
                      for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
                        var entry = _step15.value;
                        var _entry$split = entry.split('='),
                          _entry$split2 = _slicedToArray(_entry$split, 2),
                          key = _entry$split2[0],
                          val = _entry$split2[1];
                        switch (key) {
                          case 'target':
                            targetName = val;
                            break;
                          case 'value':
                            // not needed here
                            break;
                          default:
                            qx.log.Logger.error(_this5, 'unhandled slot-attribute configuration key', key);
                            break;
                        }
                      }
                    } catch (err) {
                      _iterator15.e(err);
                    } finally {
                      _iterator15.f();
                    }
                  }
                }
                target.setAttribute(targetName, value);
                target.removeAttribute(slotAttributeName);
              }
            } catch (err) {
              _iterator14.e(err);
            } finally {
              _iterator14.f();
            }
            if (targets.length > 0) {
              _this5.removeAttribute(_name);
            }
          }
        } catch (err) {
          _iterator12.e(err);
        } finally {
          _iterator12.f();
        }
        var _iterator13 = _createForOfIteratorHelper(content.querySelectorAll('*')),
          _step13;
        try {
          for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
            var elem = _step13.value;
            for (var _i3 = 0, _arr2 = _toConsumableArray(elem.attributes); _i3 < _arr2.length; _i3++) {
              var attr = _arr2[_i3];
              if (attr.name.startsWith('slot-')) {
                var attrValue = attr.value;
                var _targetName = attr.name.substring(5);
                // only e.g. map slot-progress-mapping to mapping if we have no slot-mapping attribute
                if (attr.name.endsWith('-mapping') && elem.hasAttribute('slot-mapping')) {
                  _targetName = 'mapping';
                } else if (attr.name.endsWith('-styling') && elem.hasAttribute('slot-styling')) {
                  _targetName = 'styling';
                } else if (attr.name.endsWith('-format') && elem.hasAttribute('slot-format')) {
                  _targetName = 'format';
                } else if (attr.value.startsWith(':')) {
                  attrValue = '';
                  // this template slot-attribute contains some configuration
                  var parts = attr.value.substring(1).split(',');
                  var _iterator16 = _createForOfIteratorHelper(parts),
                    _step16;
                  try {
                    for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
                      var _entry = _step16.value;
                      var _entry$split3 = _entry.split('='),
                        _entry$split4 = _slicedToArray(_entry$split3, 2),
                        _key2 = _entry$split4[0],
                        _val = _entry$split4[1];
                      switch (_key2) {
                        case 'target':
                          _targetName = _val;
                          break;
                        case 'value':
                          attrValue = _val;
                          break;
                        default:
                          qx.log.Logger.error(_this5, 'unhandled slot-attribute configuration key', _key2);
                          break;
                      }
                    }
                  } catch (err) {
                    _iterator16.e(err);
                  } finally {
                    _iterator16.f();
                  }
                }
                if (attrValue) {
                  elem.setAttribute(_targetName, attrValue);
                }
                elem.removeAttribute(attr.name);
              }
            }
          }

          // clear content
        } catch (err) {
          _iterator13.e(err);
        } finally {
          _iterator13.f();
        }
        _this5.innerHTML = '';
        _this5.appendChild(content);
        _this5.classList.add('cv-widget');
      } else {
        qx.log.Logger.error(controller, '[' + templateId + '] no template found for id', templateId);
      }
      return _this5;
    }
    _inherits(TemplatedElement, _QxConnector);
    return _createClass(TemplatedElement);
  }(QxConnector);
  cv.ui.structure.tile.Controller.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Controller.js.map?dt=1731948095901