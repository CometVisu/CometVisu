function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
        "require": true
      },
      "qx.event.Registration": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Select.js
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
   * Allows the selection of one element out of a list of <cv-option> elements
   */
  qx.Class.define('cv.ui.structure.tile.components.Select', {
    extend: cv.ui.structure.tile.components.AbstractComponent,
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      show: {
        check: ['icon', 'label', 'both'],
        init: 'both',
        apply: '_applyShow'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_84_0: null,
      __P_84_1: null,
      __P_84_2: null,
      _init: function _init() {
        var _this = this;
        cv.ui.structure.tile.components.Select.superclass.prototype._init.call(this);
        var element = this._element;
        this.__P_84_0 = new Map();
        var popup = this.__P_84_2 = document.createElement('div');
        popup.classList.add('popup');
        element.querySelectorAll(':scope > cv-option').forEach(function (option, i) {
          popup.appendChild(option);
          if (!option.hasAttribute('key')) {
            option.setAttribute('key', '' + i);
          }
          _this.__P_84_0.set(option.getAttribute('key'), option);
        });
        var value = this.__P_84_1 = document.createElement('span');
        value.classList.add('value');
        element.appendChild(value);
        element.appendChild(popup);
        var handle = document.createElement('cv-icon');
        handle.classList.add('dropdown');
        handle.classList.add('ri-arrow-down-s-line');
        element.appendChild(handle);
        if (this._writeAddresses.length > 0) {
          element.addEventListener('click', function (ev) {
            return _this.onClicked(ev);
          });
        }
      },
      _toggleOptions: function _toggleOptions(close) {
        var _this2 = this;
        // open popup
        var style = getComputedStyle(this.__P_84_2);
        if (style.getPropertyValue('display') === 'none' && !close) {
          this.__P_84_2.style.display = 'block';
          window.requestAnimationFrame(function () {
            // delay adding this listener, otherwise it would fire immediately
            // also the native addEventListener does not allow the listener to be re-added once removed, so we use the qx way here
            // which works fine
            qx.event.Registration.addListener(document.body, 'click', _this2.handleEvent, _this2, true);
          });
        } else {
          this.__P_84_2.style.display = 'none';
          qx.event.Registration.removeListener(document.body, 'click', this.handleEvent, this, true);
        }
      },
      handleEvent: function handleEvent(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        this._toggleOptions(true);
      },
      onClicked: function onClicked(ev) {
        var target = ev.target;
        // find out event target (either the cv-select of cv-option
        while (target !== ev.currentTarget && target.tagName.toLowerCase() !== 'cv-option') {
          target = target.parentElement;
        }
        if (target.tagName.toLowerCase() === 'cv-option') {
          // select this option
          this._sendSelection(target.getAttribute('key'), true);
        }
        this._toggleOptions();
      },
      _sendSelection: function _sendSelection(key, predictive) {
        var ev = new CustomEvent('sendState', {
          detail: {
            value: key,
            source: this
          }
        });
        this._writeAddresses.filter(function (addr) {
          return !addr.hasAttribute('on') || addr.getAttribute('on') === 'click';
        }).forEach(function (address) {
          return address.dispatchEvent(ev);
        });
        if (predictive === true) {
          this.setValue(key);
        }
      },
      _updateValue: function _updateValue(mappedValue, value) {
        var key = typeof mappedValue !== 'undefined' ? '' + mappedValue : '';
        if (this.__P_84_0.has(key)) {
          this.__P_84_1.innerHTML = '';
          var current = this.__P_84_0.get(key);
          switch (this.getShow()) {
            case 'icon':
              // if we have non text children, we only use them (only icons no text)
              var _iterator = _createForOfIteratorHelper(current.children),
                _step;
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var child = _step.value;
                  if (child.nodeName.toLowerCase() === 'cv-icon') {
                    this.__P_84_1.appendChild(child.cloneNode());
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              break;
            case 'label':
              var _iterator2 = _createForOfIteratorHelper(current.childNodes),
                _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var _child = _step2.value;
                  if (_child.nodeType === Node.TEXT_NODE || _child.nodeType === Node.ELEMENT_NODE && _child.nodeName.toLowerCase() === 'label') {
                    this.__P_84_1.appendChild(_child.cloneNode());
                  }
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
              break;
            case 'both':
              this.__P_84_1.innerHTML = current.innerHTML;
              break;
          }
        }
      },
      _applyShow: function _applyShow(show) {
        if (this.getValue()) {
          this._updateValue(this.getValue());
        }
      }
    },
    defer: function defer(QxClass) {
      var _Class;
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'select', (_Class = /*#__PURE__*/function (_QxConnector) {
        "use strict";

        function _Class() {
          _classCallCheck(this, _Class);
          return _callSuper(this, _Class, [QxClass]);
        }
        _inherits(_Class, _QxConnector);
        return _createClass(_Class);
      }(QxConnector), _defineProperty(_Class, "observedAttributes", ['show']), _Class));
    }
  });
  cv.ui.structure.tile.components.Select.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Select.js.map?dt=1722153806894