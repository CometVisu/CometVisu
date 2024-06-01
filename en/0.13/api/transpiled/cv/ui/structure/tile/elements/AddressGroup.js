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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.tile.elements.Address": {
        "construct": true,
        "require": true
      },
      "cv.ui.structure.tile.MStringTransforms": {
        "require": true
      },
      "qx.util.Function": {
        "construct": true
      },
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /*
   * Copyright (c) 2023, Christian Mayer and the CometVisu contributors.
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
   *
   */

  /**
   * Aggregates values from sub-elements like other cv.ui.structure.tile.elements.AddressGroups
   * or cv.ui.structure.tile.elements.Address.
   *
   *  @author Tobias Bräutigam
   *  @since 2023
   */
  qx.Class.define('cv.ui.structure.tile.elements.AddressGroup', {
    extend: cv.ui.structure.tile.elements.Address,
    include: cv.ui.structure.tile.MStringTransforms,
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(element) {
      cv.ui.structure.tile.elements.Address.constructor.call(this, element);
      if (!element.hasAttribute('id')) {
        element.setAttribute('id', "address-group_".concat(cv.ui.structure.tile.elements.AddressGroup.C++));
      }
      this.debouncedCalc = qx.util.Function.debounce(this._updateCalculation.bind(this), 10);
    },
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      C: 0
    },
    /*
    ***********************************************
      EVENTS
    ***********************************************
    */
    events: {
      changeValue: 'qx.event.type.Data'
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      operator: {
        check: ['+', '-', '/', '*'],
        init: '+',
        apply: '_updateCalculation'
      },
      round: {
        check: 'Boolean',
        init: false,
        transform: '_parseBoolean'
      },
      factor: {
        check: 'Number',
        init: 1,
        transform: '_parseFloat'
      },
      valid: {
        check: 'Boolean',
        init: true,
        apply: '_applyValid'
      },
      nonZeroValues: {
        check: 'Number',
        init: 0,
        event: 'changeNonZeroValues'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _i: null,
      _values: null,
      __P_93_0: null,
      setValue: function setValue(val) {
        if (this.__P_93_0 !== val) {
          var oldValue = this.__P_93_0;
          this.__P_93_0 = val;
          this.fireDataEvent('changeValue', val, oldValue);
          this._applyValue(val);
        }
      },
      getValue: function getValue() {
        return this.__P_93_0;
      },
      resetValue: function resetValue() {
        this.__P_93_0 = null;
      },
      getAddress: function getAddress() {
        return this._element.getAttribute('id');
      },
      _init: function _init() {
        var _this = this;
        var element = this._element;
        this._values = new Array(element.children.length).fill(0);
        this._stateUpdateTarget = element.parentElement;
        element.addEventListener('stateUpdate', function (ev) {
          _this.onStateUpdate(ev);
          // cancel event here
          ev.stopPropagation();
        });
      },
      _applyValue: function _applyValue(value) {
        if (this.isConnected()) {
          this._element.setAttribute('data-value', '' + value);
          this.fireStateUpdate(this.getAddress(), value);
        }
      },
      _applyValid: function _applyValid(valid) {
        this._element.setAttribute('data-valid', '' + valid);
      },
      _updateCalculation: function _updateCalculation() {
        if (this.isConnected()) {
          var val = 0;
          if (this._values.length > 0) {
            this.setNonZeroValues(this._values.filter(function (v) {
              return v !== 0;
            }).length);
            switch (this.getOperator()) {
              case '+':
                val = this._values.reduce(function (accumulator, currentValue) {
                  return accumulator + currentValue;
                }, val);
                break;
              case '-':
                // subtract all from first one
                val = this._values[0];
                for (var i = 1; i < this._values.length; i++) {
                  val -= this._values[i];
                }
                break;
              case '*':
                val = this._values.reduce(function (accumulator, currentValue) {
                  return accumulator * currentValue;
                }, val);
                break;
              case '/':
                // divide all from first one
                val = this._values[0];
                for (var _i = 1; _i < this._values.length; _i++) {
                  val /= this._values[_i];
                }
                break;
            }
          }
          var valid = !isNaN(val) && isFinite(val);
          this.setValid(valid);
          if (valid) {
            val *= this.getFactor();
            if (this.isRound()) {
              val = Math.round(val);
            }
            this.setValue(val);
          } else {
            this.resetValue();
          }
        }
      },
      onStateUpdate: function onStateUpdate(ev) {
        var index = Array.prototype.indexOf.call(this._element.children, ev.detail.source.getElement());
        if (index >= 0) {
          var val = ev.detail.state;
          if (typeof val === 'string') {
            val = parseFloat(val);
          }
          if (typeof val === 'number') {
            this._values[index] = val;
            this.debouncedCalc();
          } else {
            this.error('update value is not a number', _typeof(val), 'calculation not possible');
          }
        }
      }
    },
    defer: function defer(Clazz) {
      var _Class;
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'address-group', (_Class = /*#__PURE__*/function (_QxConnector) {
        "use strict";

        function _Class() {
          _classCallCheck(this, _Class);
          return _callSuper(this, _Class, [Clazz]);
        }
        _inherits(_Class, _QxConnector);
        return _createClass(_Class);
      }(QxConnector), _defineProperty(_Class, "observedAttributes", ['round', 'operator', 'factor']), _Class));
    }
  });
  cv.ui.structure.tile.elements.AddressGroup.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AddressGroup.js.map?dt=1717235369815