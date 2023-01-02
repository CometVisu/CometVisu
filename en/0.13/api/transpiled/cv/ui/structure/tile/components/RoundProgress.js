function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
      "cv.ui.structure.tile.MVisibility": {
        "require": true
      },
      "qx.event.message.Bus": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* RoundProgress.js
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
   * Shows a round progress bar (partially filled circle).
   * This component must be used inside a cv-value component, it is not meant to be used standalone.
   *
   * @author Tobias Bräutigam
   * @since 2022
   */
  qx.Class.define('cv.ui.structure.tile.components.RoundProgress', {
    extend: cv.ui.structure.tile.components.AbstractComponent,
    include: cv.ui.structure.tile.MVisibility,
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      progress: {
        check: 'Number',
        apply: '_applyProgress'
      },
      text: {
        check: 'String',
        apply: '_applyText'
      },
      type: {
        check: ['circle', 'semiCircle'],
        init: 'circle'
      },
      min: {
        check: 'Number',
        init: 0
      },
      max: {
        check: 'Number',
        init: 100
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_79_0: null,
      __P_79_1: null,
      __P_79_2: null,
      __P_79_3: null,
      __P_79_4: null,
      __P_79_5: null,
      __P_79_6: null,
      __P_79_7: null,
      __P_79_8: null,
      _queuedFitText: null,
      _init: function _init() {
        var _this = this;
        cv.ui.structure.tile.components.RoundProgress.superclass.prototype._init.call(this);
        var element = this._element;
        var style = document.querySelector(':root').style;
        var hasFixedRadius = element.hasAttribute('radius');
        var radius = this.__P_79_4 = element.getAttribute('radius') || parseInt(style.getPropertyValue('--tileCellWidth')) || 56;
        var strokeWidth = element.getAttribute('stroke') || 8;
        var normalizedRadius = this.__P_79_3 = radius - strokeWidth / 2;
        this.__P_79_1 = normalizedRadius * 2 * Math.PI;
        if (element.hasAttribute('min')) {
          var min = parseInt(element.getAttribute('min'));
          if (!isNaN(min)) {
            this.setMin(min);
          }
        }
        if (element.hasAttribute('max')) {
          var max = parseInt(element.getAttribute('max'));
          if (!isNaN(max)) {
            this.setMax(max);
          }
        }
        if (element.hasAttribute('type')) {
          this.setType(element.getAttribute('type'));
        }
        var type = this.getType();
        var height = type === 'semiCircle' ? radius : radius * 2;
        var code = "<svg height=\"".concat(height, "\" width=\"").concat(radius * 2, "\" type=\"").concat(type, "\">");
        if (type === 'circle') {
          if (!element.hasAttribute('no-background')) {
            code += "<circle class=\"bg\" \n                r=\"".concat(normalizedRadius, "\" \n                cx=\"50%\" \n                cy=\"50%\" \n                fill=\"transparent\" \n                stroke-width=\"").concat(strokeWidth, "\"/>");
          }
          code += "<circle class=\"bar\" \n              r=\"".concat(normalizedRadius, "\" \n              cx=\"50%\" \n              cy=\"50%\" \n              stroke-width=\"").concat(strokeWidth, "\" \n              stroke-dasharray=\"").concat(this.__P_79_1, " ").concat(this.__P_79_1, "\" \n              stroke-dashoffset=\"").concat(this.__P_79_1, "\"/>");
        } else if (type === 'semiCircle') {
          if (!element.hasAttribute('no-background')) {
            code += "<path class=\"bg\" d=\"M ".concat(strokeWidth / 2, " ").concat(radius, " A ").concat(normalizedRadius, " ").concat(normalizedRadius, " 0 0 1 ").concat(radius * 2 - strokeWidth / 2, " ").concat(radius, "\" fill=\"transparent\" stroke-width=\"").concat(strokeWidth, "\"/>");
          }
          this.__P_79_2 = {
            x: strokeWidth / 2,
            y: radius
          };
          code += "<path class=\"bar\" d=\"M ".concat(strokeWidth / 2, " ").concat(radius, " A ").concat(normalizedRadius, " ").concat(normalizedRadius, " 0 0 0 ").concat(strokeWidth / 2, " ").concat(radius, "\" fill=\"transparent\" stroke-width=\"").concat(strokeWidth, "\"/>");
        }
        code += '</svg><label></label>';
        element.innerHTML = code;
        this.__P_79_7 = radius * 2 - strokeWidth * 2 - 24;
        if (!hasFixedRadius) {
          qx.event.message.Bus.subscribe('cv.design.tile.cellWidthChanged', function (ev) {
            _this.__P_79_4 = ev.getData();
            _this.__P_79_3 = _this.__P_79_4 - strokeWidth / 2;
            _this.__P_79_1 = _this.__P_79_3 * 2 * Math.PI;
            height = type === 'semiCircle' ? _this.__P_79_4 : _this.__P_79_4 * 2;
            var svg = element.querySelector(':scope > svg');
            svg.setAttribute('height', '' + height);
            svg.setAttribute('width', '' + _this.__P_79_4 * 2);
            if (type === 'circle') {
              _this._element.querySelectorAll(':scope > svg > circle').forEach(function (circle) {
                circle.setAttribute('r', '' + _this.__P_79_3);
                if (circle.classList.contains('bar')) {
                  circle.setAttribute('stroke-dasharray', _this.__P_79_1 + ' ' + _this.__P_79_1);
                  circle.setAttribute('stroke-dashoffset', '' + _this.__P_79_1);
                }
              });
            } else if (type === 'semiCircle') {
              _this.__P_79_2.y = _this.__P_79_4;
              var bg = _this._element.querySelector(':scope > svg > path.bg');
              if (bg) {
                bg.setAttribute('d', "M ".concat(strokeWidth / 2, " ").concat(_this.__P_79_4, " A ").concat(_this.__P_79_3, " ").concat(_this.__P_79_3, " 0 0 1 ").concat(_this.__P_79_4 * 2 - strokeWidth / 2, " ").concat(_this.__P_79_4));
              }
            }
            _this._applyProgress(_this.isPropertyInitialized('progress') ? _this.getProgress() : 0);
          });
        }
      },
      __P_79_9: function __P_79_9(angle) {
        var angleRad = angle * (Math.PI / 180.0);
        return {
          x: this.__P_79_4 - this.__P_79_3 * Math.cos(angleRad),
          y: this.__P_79_4 - this.__P_79_3 * Math.sin(angleRad)
        };
      },
      _applyProgress: function _applyProgress(value) {
        if (this.isConnected()) {
          var valueElement;
          var end;
          var valueInRange = value - this.getMin();
          var percent = Math.max(0, Math.min(100, 100 / (this.getMax() - this.getMin()) * valueInRange));
          switch (this.getType()) {
            case 'circle':
              valueElement = this._element.querySelector(':scope > svg > circle.bar');
              valueElement.setAttribute('stroke-dashoffset', '' + this.__P_79_1 - percent / 100 * this.__P_79_1);
              break;
            case 'semiCircle':
              valueElement = this._element.querySelector(':scope > svg > path.bar');
              end = this.__P_79_9(1.8 * percent);
              valueElement.setAttribute('d', ['M', this.__P_79_2.x, this.__P_79_2.y, 'A', this.__P_79_3, this.__P_79_3, 0, 0, 1, end.x, end.y].join(' '));
              break;
          }
        }
      },
      _fitText: function _fitText() {
        if (this.__P_79_5 && this.__P_79_5.textContent) {
          if (this.isVisible()) {
            if (!this.__P_79_6) {
              this.__P_79_6 = document.createElement('canvas');
              this.__P_79_10 = this.__P_79_6.getContext('2d');
              var compStyle = window.getComputedStyle(this.__P_79_5);
              this.__P_79_10.font = compStyle.getPropertyValue('font');
              this.__P_79_8 = compStyle.getPropertyValue('font-size');
            }
            var metrics = this.__P_79_10.measureText(this.__P_79_5.textContent);
            if (metrics.width > this.__P_79_7) {
              // adjust font-size
              var factor = this.__P_79_7 / metrics.width;
              this.__P_79_5.style.fontSize = Math.floor(parseInt(this.__P_79_8) * factor) + 'px';
            } else {
              this.__P_79_5.style.fontSize = this.__P_79_8;
            }
            this._queuedFitText = false;
          } else {
            this._queuedFitText = true;
          }
        }
      },
      _applyVisible: function _applyVisible(visible) {
        if (visible && this._queuedFitText) {
          this._fitText();
        }
      },
      _applyText: function _applyText(value) {
        if (this.isConnected()) {
          if (!this.__P_79_5) {
            this.__P_79_5 = this._element.querySelector(':scope > label');
          }
          this.__P_79_5.textContent = value;
          if (!value) {
            // empty text, just reset to default font size
            if (this.__P_79_8) {
              this.__P_79_5.style.fontSize = this.__P_79_8;
            }
          } else {
            this._fitText();
          }
        }
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.__P_79_5 = null;
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'round-progress', /*#__PURE__*/function (_QxConnector) {
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
  cv.ui.structure.tile.components.RoundProgress.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RoundProgress.js.map?dt=1672653481161