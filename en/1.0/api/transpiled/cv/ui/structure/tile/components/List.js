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
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.tile.components.AbstractComponent": {
        "construct": true,
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
   * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(element) {
      cv.ui.structure.tile.components.AbstractComponent.constructor.call(this, element);
      this.setDebouncedRefresh(500);
    },
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
        if (this._initCounter === 0) {
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
          var writeAddresses = element.querySelectorAll(':scope > cv-address:not([mode="read"])');
          if (writeAddresses.length > 0) {
            element.addEventListener('sendState', function (ev) {
              ev.stopPropagation();
              var _iterator = _createForOfIteratorHelper(writeAddresses),
                _step;
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var a = _step.value;
                  a.dispatchEvent(new CustomEvent('sendState', {
                    bubbles: false,
                    cancelable: true,
                    detail: ev.detail
                  }));
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            });
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
            this._getModel = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
              var options, _i, _arr, proxyParam;
              return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
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
                    _context.n = 1;
                    return cv.io.Fetch.cachedFetch(model.getAttribute('src'), options, model.getAttribute('proxy') === 'true');
                  case 1:
                    return _context.a(2, _context.v);
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
              this._getModel = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
                return _regenerator().w(function (_context2) {
                  while (1) switch (_context2.n) {
                    case 0:
                      _context2.n = 1;
                      return modelInstance.refresh();
                    case 1:
                      return _context2.a(2, modelInstance.getModel());
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
        this.debouncedRefresh();
      },
      refresh: function refresh() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var element, template, newModel, target, whenEmptyTemplate, emptyModel, emptyElem, child, i, itemTemplate, _i2, elem, getValue, _t, _t2;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.p = _context3.n) {
              case 0:
                if (!(_this2._model === null)) {
                  _context3.n = 1;
                  break;
                }
                return _context3.a(2);
              case 1:
                element = _this2._element;
                template = element.querySelector(':scope > template:not([when])');
                newModel = [];
                if (typeof _this2._getModel === 'function') {
                  newModel = _this2._getModel();
                }
                if (!(newModel instanceof Promise)) {
                  _context3.n = 5;
                  break;
                }
                _context3.p = 2;
                _context3.n = 3;
                return newModel;
              case 3:
                newModel = _context3.v;
                _context3.n = 5;
                break;
              case 4:
                _context3.p = 4;
                _t = _context3.v;
                _this2.error('error refreshing async model:', _t);
              case 5:
                target = element.querySelector(':scope > ul');
                if (!(template.getAttribute('wrap') === 'false')) {
                  _context3.n = 6;
                  break;
                }
                target = element;
                _context3.n = 11;
                break;
              case 6:
                if (!template.hasAttribute('target')) {
                  _context3.n = 10;
                  break;
                }
                _t2 = template.getAttribute('target');
                _context3.n = _t2 === 'parent' ? 7 : 8;
                break;
              case 7:
                target = element.parentElement;
                // we do not need the list to be visible then
                element.style.display = 'none';
                return _context3.a(3, 9);
              case 8:
                throw new Error('invalid target: ' + template.getAttribute('target'));
              case 9:
                _context3.n = 11;
                break;
              case 10:
                if (!target) {
                  target = document.createElement('ul');
                  target.classList.add('content');
                  element.appendChild(target);
                }
              case 11:
                _this2.debug('refreshing with new model length', newModel.length);
                if (!(Array.isArray(newModel) || newModel instanceof qx.data.Array)) {
                  _context3.n = 15;
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
                  _context3.n = 13;
                  break;
                }
                whenEmptyTemplate = element.querySelector(':scope > template[when="empty"]'); // remove old entries
                while (target.firstElementChild && target.firstElementChild.hasAttribute('data-row')) {
                  target.removeChild(target.firstElementChild);
                }
                if (!(whenEmptyTemplate && !target.querySelector(':scope > .empty-model'))) {
                  _context3.n = 12;
                  break;
                }
                emptyModel = whenEmptyTemplate.content.firstElementChild.cloneNode(true);
                emptyModel.classList.add('empty-model');
                target.appendChild(emptyModel);
                return _context3.a(2);
              case 12:
                _context3.n = 14;
                break;
              case 13:
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
              case 14:
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
                      var _iterator4 = _createForOfIteratorHelper(content.split('||').map(function (n) {
                          return n.trim();
                        })),
                        _step4;
                      try {
                        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                          var name = _step4.value;
                          val = getValue(name, entry);
                          if (val) {
                            return val;
                          }
                        }
                      } catch (err) {
                        _iterator4.e(err);
                      } finally {
                        _iterator4.f();
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
                _context3.n = 16;
                break;
              case 15:
                _this2.error('model must be an array', newModel);
              case 16:
                return _context3.a(2);
            }
          }, _callee3, null, [[2, 4]]);
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

        function _class() {
          _classCallCheck(this, _class);
          return _callSuper(this, _class, [QxClass]);
        }
        _inherits(_class, _QxConnector);
        return _createClass(_class);
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.components.List.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=List.js.map?dt=1782967141584