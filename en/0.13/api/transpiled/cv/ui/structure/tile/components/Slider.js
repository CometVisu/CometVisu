function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
      "cv.util.Function": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Slider.js
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
   * Shows a range slider.
   */
  qx.Class.define('cv.ui.structure.tile.components.Slider', {
    extend: cv.ui.structure.tile.components.AbstractComponent,
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      stepWidth: {
        check: 'Number',
        init: 5,
        apply: '_applyStepWidth'
      },
      min: {
        check: 'Number',
        init: 1,
        apply: '_applyMin'
      },
      max: {
        check: 'Number',
        init: 100,
        apply: '_applyMax'
      },
      showValue: {
        check: 'Boolean',
        init: true,
        apply: '_applyShowValue'
      },
      throttleInterval: {
        check: 'Number',
        init: 250,
        apply: '_applyThrottleInterval'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_85_0: null,
      __P_85_1: null,
      _init: function _init() {
        var _this = this;
        cv.ui.structure.tile.components.Slider.superclass.prototype._init.call(this);
        var element = this._element;
        if (element.hasAttribute('throttle-interval')) {
          this.setThrottleInterval(parseInt(element.getAttribute('throttle-interval')));
        } else {
          this._applyThrottleInterval(this.getThrottleInterval());
        }

        // init components
        var input = element.querySelector(':scope > input');
        if (!input) {
          input = document.createElement('input');
          input.classList.add('slider');
          input.setAttribute('type', 'range');
          element.insertBefore(input, element.querySelector(':scope > .up'));
          input.oninput = function () {
            return _this.__P_85_0.call();
          };
        }
        this.__P_85_1 = input;
        if (element.hasAttribute('step-width')) {
          this.setStepWidth(parseInt(element.getAttribute('step-width')));
        }
        if (element.hasAttribute('min')) {
          this.setMin(parseInt(element.getAttribute('min')));
        }
        if (element.hasAttribute('max')) {
          this.setMax(parseInt(element.getAttribute('max')));
        }
        if (element.hasAttribute('hide-value') && element.getAttribute('hide-value') === 'true') {
          this.setShowValue(false);
        } else {
          this._applyShowValue(true);
        }
        var decreaseElement = element.querySelector(':scope > .decrease');
        if (decreaseElement) {
          decreaseElement.addEventListener('click', function (ev) {
            return _this.onDecrease();
          });
        }
        var increaseElement = element.querySelector(':scope > .increase');
        if (increaseElement) {
          increaseElement.addEventListener('click', function (ev) {
            return _this.onIncrease();
          });
        }
      },
      _applyThrottleInterval: function _applyThrottleInterval(value) {
        var _this2 = this;
        if (value > 0) {
          this.__P_85_0 = cv.util.Function.throttle(this.onInput, value, {
            trailing: true
          }, this);
        } else {
          // no throttling, direct call
          this.__P_85_0 = {
            call: function call() {
              return _this2.onInput();
            },
            abort: function abort() {}
          };
        }
      },
      _applyMin: function _applyMin(value) {
        var input = this._element.querySelector(':scope > input');
        input.setAttribute('min', '' + value);
      },
      _applyMax: function _applyMax(value) {
        var input = this._element.querySelector(':scope > input');
        input.setAttribute('max', '' + value);
      },
      _applyStepWidth: function _applyStepWidth(value) {
        var input = this._element.querySelector(':scope > input');
        input.setAttribute('step', '' + value);
      },
      _applyShowValue: function _applyShowValue(value) {
        var valueLabel = this._element.querySelector(':scope > label.value');
        if (value) {
          if (!valueLabel) {
            valueLabel = document.createElement('label');
            valueLabel.classList.add('value');
            valueLabel.classList.add('secondary');
            this._element.insertBefore(valueLabel, this._element.firstChild);
          }
        }
      },
      _updateValue: function _updateValue(mappedValue, value) {
        var target = this._element.querySelector(':scope > input');
        if (target) {
          target.value = value;
        }
        if (this.isShowValue()) {
          var valueLabel = this._element.querySelector(':scope > label.value');
          if (valueLabel) {
            valueLabel.innerText = mappedValue;
          }
        }
      },
      onInput: function onInput() {
        this.__P_85_2(this.__P_85_1.value);
      },
      onDecrease: function onDecrease() {
        var value = this.getValue() - this.getStepWidth();
        this.__P_85_2(value, 'decrease');
      },
      onIncrease: function onIncrease() {
        var value = this.getValue() + this.getStepWidth();
        this.__P_85_2(value, 'increase');
      },
      __P_85_2: function __P_85_2(value, on) {
        var ev = new CustomEvent('sendState', {
          detail: {
            value: value,
            source: this
          }
        });
        this._writeAddresses.filter(function (addr) {
          return !addr.hasAttribute('on') || addr.getAttribute('on') === on;
        }).forEach(function (address) {
          return address.dispatchEvent(ev);
        });
      }
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'slider', /*#__PURE__*/function (_QxConnector) {
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
  cv.ui.structure.tile.components.Slider.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Slider.js.map?dt=1722151812923