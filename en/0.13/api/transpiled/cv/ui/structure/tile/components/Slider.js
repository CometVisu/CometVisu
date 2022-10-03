function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
        init: 5
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
      __P_78_0: null,
      __P_78_1: null,
      _init: function _init() {
        var _this = this;

        cv.ui.structure.tile.components.Slider.superclass.prototype._init.call(this);

        var element = this._element;

        if (element.hasAttribute('throttle-interval')) {
          this.setThrottleInterval(parseInt(element.getAttribute('throttle-interval')));
        } else {
          this._applyThrottleInterval(this.getThrottleInterval());
        } // init components


        var input = element.querySelector(':scope > input');

        if (!input) {
          input = document.createElement('input');
          input.classList.add('slider');
          input.setAttribute('type', 'range');
          element.insertBefore(input, element.querySelector(':scope > .up'));

          input.oninput = function () {
            return _this.__P_78_0.call();
          };
        }

        this.__P_78_1 = input;

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
          this.__P_78_0 = cv.util.Function.throttle(this.onInput, value, {
            trailing: true
          }, this);
        } else {
          // no throttling, direct call
          this.__P_78_0 = {
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
        this.__P_78_2(this.__P_78_1.value);
      },
      onDecrease: function onDecrease() {
        var value = this.getValue() - this.getStepWidth();

        this.__P_78_2(value, 'decrease');
      },
      onIncrease: function onIncrease() {
        var value = this.getValue() + this.getStepWidth();

        this.__P_78_2(value, 'increase');
      },
      __P_78_2: function __P_78_2(value, on) {
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

        _inherits(_class, _QxConnector);

        var _super = _createSuper(_class);

        function _class() {
          _classCallCheck(this, _class);

          return _super.call(this, QxClass);
        }

        return _class;
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.components.Slider.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Slider.js.map?dt=1664788498964