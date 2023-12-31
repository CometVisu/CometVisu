function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
      "cv.ui.structure.tile.components.AbstractComponent": {
        "require": true
      },
      "cv.ui.structure.tile.MVisibility": {
        "require": true
      },
      "cv.ui.structure.tile.MRefresh": {
        "require": true
      },
      "cv.ui.structure.tile.MFullscreen": {
        "require": true
      },
      "cv.io.Fetch": {},
      "cv.io.listmodel.Registry": {},
      "qx.data.Array": {},
      "qx.util.format.DateFormat": {},
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
    include: [cv.ui.structure.tile.MVisibility, cv.ui.structure.tile.MRefresh, cv.ui.structure.tile.MFullscreen],
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
        this._checkEnvironment();
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
        if (element.hasAttribute('allow-fullscreen') && element.getAttribute('allow-fullscreen') === 'true') {
          this._initFullscreenSwitch();
        }
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
                    } else if (content.includes('|')) {
                      // formatting rules
                      var _content$split = content.split('|'),
                        _content$split2 = _slicedToArray(_content$split, 2),
                        _name = _content$split2[0],
                        format = _content$split2[1];
                      var _val = getValue(_name, entry);
                      if (_val instanceof Date) {
                        var df = new qx.util.format.DateFormat(format);
                        return df.format(_val);
                      } else if (_val) {
                        return _val;
                      }
                    } else if (content.includes('.')) {
                      // first part is an object value, the latter part is JS code then
                      var _content$split3 = content.split('.', 1),
                        _content$split4 = _slicedToArray(_content$split3, 1),
                        _name2 = _content$split4[0];
                      var code = content.substring(_name2.length + 1);
                      var _val2 = getValue(_name2, entry);
                      if (_val2 instanceof Object) {
                        try {
                          var func = new Function('obj', "return obj.".concat(code, ";"));
                          return func(_val2);
                        } catch (e) {}
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

//# sourceMappingURL=List.js.map?dt=1704036753253