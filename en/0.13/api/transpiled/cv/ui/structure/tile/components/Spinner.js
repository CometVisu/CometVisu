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
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Spinner.js
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
   * Shows a number value that can be increased and decreased by a defined step width.
   */
  qx.Class.define('cv.ui.structure.tile.components.Spinner', {
    extend: cv.ui.structure.tile.components.AbstractComponent,
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      stepWidth: {
        check: 'Number',
        init: 1.0
      },
      mode: {
        check: ['relative', 'absolute'],
        init: 'absolute'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _init: function _init() {
        var _this = this;
        cv.ui.structure.tile.components.Spinner.superclass.prototype._init.call(this);
        var element = this._element;
        if (element.hasAttribute('step-width')) {
          this.setStepWidth(parseFloat(element.getAttribute('step-width')));
        }
        if (element.hasAttribute('mode')) {
          this.setMode(element.getAttribute('mode'));
        }
        // init components
        var valueElement = element.querySelector(':scope > .value');
        if (!valueElement) {
          valueElement = document.createElement('label');
          valueElement.classList.add('value');
          valueElement.classList.add('primary');
          element.appendChild(valueElement);
        }
        // add increase / decrease buttons
        var decrease = document.createElement('div');
        decrease.classList.add('clickable');
        decrease.classList.add('left');
        var decreaseIcon = document.createElement('cv-icon');
        decreaseIcon.classList.add('ri-arrow-down-s-line');
        decrease.addEventListener('click', function () {
          return _this.onDecrease();
        });
        decrease.appendChild(decreaseIcon);
        element.insertBefore(decrease, valueElement);
        var increase = document.createElement('div');
        increase.classList.add('clickable');
        increase.classList.add('right');
        var increaseIcon = document.createElement('cv-icon');
        increaseIcon.classList.add('ri-arrow-up-s-line');
        increase.appendChild(increaseIcon);
        increase.addEventListener('click', function () {
          return _this.onIncrease();
        });
        element.appendChild(increase);
      },
      onDecrease: function onDecrease() {
        var value = this.getMode() === 'absolute' ? this.getValue() - this.getStepWidth() : this.getStepWidth() * -1;
        this.__P_86_0(value, 'decrease');
      },
      onIncrease: function onIncrease() {
        var value = this.getMode() === 'absolute' ? this.getValue() + this.getStepWidth() : this.getStepWidth();
        this.__P_86_0(value, 'increase');
      },
      _updateValue: function _updateValue(mappedValue) {
        var target = this._element.querySelector('.value');
        if (target) {
          target.innerHTML = mappedValue;
        }
      },
      __P_86_0: function __P_86_0(value, on) {
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
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'spinner', /*#__PURE__*/function (_QxConnector) {
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
  cv.ui.structure.tile.components.Spinner.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Spinner.js.map?dt=1722151812952