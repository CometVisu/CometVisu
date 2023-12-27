function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
          this._values[index] = ev.detail.state;
          this.debouncedCalc();
        }
      }
    },
    defer: function defer(Clazz) {
      var _class;
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'address-group', (_class = /*#__PURE__*/function (_QxConnector) {
        "use strict";

        _inherits(_class, _QxConnector);
        var _super = _createSuper(_class);
        function _class() {
          _classCallCheck(this, _class);
          return _super.call(this, Clazz);
        }
        return _createClass(_class);
      }(QxConnector), _defineProperty(_class, "observedAttributes", ['round', 'operator', 'factor']), _class));
    }
  });
  cv.ui.structure.tile.elements.AddressGroup.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AddressGroup.js.map?dt=1703705663491