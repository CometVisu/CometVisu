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
      "qx.util.ColorUtil": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Color.js 
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
   * Shows a html color input
   * @author Tobias Bräutigam
   * @since 2022
   */
  qx.Class.define('cv.ui.structure.tile.components.Color', {
    extend: cv.ui.structure.tile.components.AbstractComponent,

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
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
      __P_73_0: null,
      _init: function _init() {
        var _this = this;

        cv.ui.structure.tile.components.Color.superclass.prototype._init.call(this);

        var element = this._element;

        if (element.hasAttribute('throttle-interval')) {
          this.setThrottleInterval(parseInt(element.getAttribute('throttle-interval')));
        } else {
          this._applyThrottleInterval(this.getThrottleInterval());
        } // init components


        var input = element.querySelector(':scope > input');

        if (!input) {
          input = document.createElement('input');
          input.setAttribute('type', 'color');
          element.appendChild(input);

          input.oninput = function () {
            return _this.__P_73_1.call();
          };
        }

        this.__P_73_0 = input;
      },
      _applyThrottleInterval: function _applyThrottleInterval(value) {
        var _this2 = this;

        if (value > 0) {
          this.__P_73_1 = cv.util.Function.throttle(this.onInput, value, {
            trailing: true
          }, this);
        } else {
          // no throttling, direct call
          this.__P_73_1 = {
            call: function call() {
              return _this2.onInput();
            },
            abort: function abort() {}
          };
        }
      },
      onInput: function onInput() {
        this.__P_73_2(this.__P_73_0.value);
      },
      _updateValue: function _updateValue(mappedValue, value) {
        var target = this._element.querySelector(':scope > .value');

        var rgb = mappedValue.substring(0, 7);

        if (target) {
          var tagName = target.tagName.toLowerCase();
          var alpha = mappedValue.length === 9 ? parseInt(mappedValue.substring(7, 9), 16) / 255 : 1.0;

          switch (tagName) {
            case 'cv-icon':
              target.style.color = rgb;
              target.style.opacity = Math.max(alpha, 0.05); // do not blend it out totally

              break;
          }
        }

        var input = this._element.querySelector(':scope > input');

        input.value = rgb; // this input can't handle the alpha value

        if (!target) {
          // only if we do not have another value handler
          this._element.style.backgroundColor = mappedValue;
        }
      },
      onStateUpdate: function onStateUpdate(ev) {
        var handled = false;

        if (ev.detail.target) {
          handled = cv.ui.structure.tile.components.Color.superclass.prototype.onStateUpdate.call(this, ev);
        }

        if (!handled) {
          var value = ev.detail.state;
          var rgb;
          var alpha = '';

          switch (ev.detail.variant) {
            case 'hsv':
              rgb = qx.util.ColorUtil.hsbToRgb([value.get('h'), value.get('s'), 100]);
              alpha = Math.round(value.get('v') / 100 * 255).toString(16).padStart(2, '0');
              this.setValue("#".concat(rgb[0].toString(16).padStart(2, '0')).concat(rgb[1].toString(16).padStart(2, '0')).concat(rgb[2].toString(16).padStart(2, '0')).concat(alpha));
              break;
          }
        }
      },
      __P_73_2: function __P_73_2(value) {
        var hsvArray = qx.util.ColorUtil.rgbToHsb([parseInt(value.substring(1, 3), 16), parseInt(value.substring(3, 5), 16), parseInt(value.substring(5, 7), 16)]);
        var hsv = new Map([['h', hsvArray[0]], ['s', hsvArray[1]], ['v', hsvArray[2]]]);
        var ev = new CustomEvent('sendState', {
          detail: {
            value: hsv,
            source: this
          }
        });

        this._writeAddresses.filter(function (addr) {
          return addr.getAttribute('variant') === 'hsv';
        }).forEach(function (address) {
          return address.dispatchEvent(ev);
        });
      }
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'color', /*#__PURE__*/function (_QxConnector) {
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
  cv.ui.structure.tile.components.Color.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Color.js.map?dt=1664789571965