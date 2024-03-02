function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
  cv.ui.structure.tile.components.Spinner.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Spinner.js.map?dt=1709410141166