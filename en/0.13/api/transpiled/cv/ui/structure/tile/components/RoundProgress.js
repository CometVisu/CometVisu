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
        "construct": true,
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
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(element) {
      cv.ui.structure.tile.components.AbstractComponent.constructor.call(this, element);
      this.addListener('changeVisible', this._applyVisible, this);
    },
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
      __P_83_0: null,
      __P_83_1: null,
      __P_83_2: null,
      __P_83_3: null,
      __P_83_4: null,
      __P_83_5: null,
      __P_83_6: null,
      __P_83_7: null,
      __P_83_8: null,
      _queuedFitText: null,
      _init: function _init() {
        var _this = this;
        cv.ui.structure.tile.components.RoundProgress.superclass.prototype._init.call(this);
        var element = this._element;
        var style = document.querySelector(':root').style;
        var hasFixedRadius = element.hasAttribute('radius');
        var radius = this.__P_83_4 = element.getAttribute('radius') || parseInt(style.getPropertyValue('--tileCellWidth')) || 56;
        var strokeWidth = element.getAttribute('stroke') || 8;
        var normalizedRadius = this.__P_83_3 = radius - strokeWidth / 2;
        this.__P_83_1 = normalizedRadius * 2 * Math.PI;
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
        var ns = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(ns, 'svg');
        svg.setAttribute('height', height);
        svg.setAttribute('width', '' + radius * 2);
        svg.setAttribute('type', type);
        if (type === 'circle') {
          if (!element.hasAttribute('no-background')) {
            var bg = document.createElementNS(ns, 'circle');
            bg.classList.add('bg');
            bg.setAttribute('r', '' + normalizedRadius);
            bg.setAttribute('cx', '50%');
            bg.setAttribute('cy', '50%');
            bg.setAttribute('fill', 'transparent');
            bg.setAttribute('stroke-width', strokeWidth);
            if (element.hasAttribute('background-color')) {
              bg.style.stroke = element.getAttribute('background-color');
            }
            svg.appendChild(bg);
          }
          var bar = document.createElementNS(ns, 'circle');
          bar.classList.add('bar');
          bar.setAttribute('r', '' + normalizedRadius);
          bar.setAttribute('cx', '50%');
          bar.setAttribute('cy', '50%');
          bar.setAttribute('stroke-width', strokeWidth);
          bar.setAttribute('stroke-dasharray', "".concat(this.__P_83_1, " ").concat(this.__P_83_1));
          bar.setAttribute('stroke-dashoffset', this.__P_83_1);
          if (element.hasAttribute('foreground-color')) {
            bar.style.stroke = element.getAttribute('foreground-color');
          }
          svg.appendChild(bar);
        } else if (type === 'semiCircle') {
          if (!element.hasAttribute('no-background')) {
            var _bg = document.createElementNS(ns, 'path');
            _bg.classList.add('bg');
            _bg.setAttribute('d', "M ".concat(strokeWidth / 2, " ").concat(radius, " A ").concat(normalizedRadius, " ").concat(normalizedRadius, " 0 0 1 ").concat(radius * 2 - strokeWidth / 2, " ").concat(radius));
            _bg.setAttribute('fill', 'transparent');
            _bg.setAttribute('stroke-width', strokeWidth);
            if (element.hasAttribute('background-color')) {
              _bg.style.stroke = element.getAttribute('background-color');
            }
            svg.appendChild(_bg);
          }
          this.__P_83_2 = {
            x: strokeWidth / 2,
            y: radius
          };
          var _bar = document.createElementNS(ns, 'path');
          _bar.classList.add('bar');
          _bar.setAttribute('d', "M ".concat(strokeWidth / 2, " ").concat(radius, " A ").concat(normalizedRadius, " ").concat(normalizedRadius, " 0 0 0 ").concat(strokeWidth / 2, " ").concat(radius));
          _bar.setAttribute('fill', 'transparent');
          _bar.setAttribute('stroke-width', strokeWidth);
          if (element.hasAttribute('foreground-color')) {
            _bar.style.stroke = element.getAttribute('foreground-color');
          }
          svg.appendChild(_bar);
        }
        element.replaceChildren(svg, document.createElement('label'));
        this.__P_83_7 = radius * 2 - strokeWidth * 2 - 24;
        if (!hasFixedRadius) {
          qx.event.message.Bus.subscribe('cv.design.tile.cellWidthChanged', function (ev) {
            _this.__P_83_4 = ev.getData();
            _this.__P_83_3 = _this.__P_83_4 - strokeWidth / 2;
            _this.__P_83_1 = _this.__P_83_3 * 2 * Math.PI;
            height = type === 'semiCircle' ? _this.__P_83_4 : _this.__P_83_4 * 2;
            var svg = element.querySelector(':scope > svg');
            svg.setAttribute('height', '' + height);
            svg.setAttribute('width', '' + _this.__P_83_4 * 2);
            if (type === 'circle') {
              _this._element.querySelectorAll(':scope > svg > circle').forEach(function (circle) {
                circle.setAttribute('r', '' + _this.__P_83_3);
                if (circle.classList.contains('bar')) {
                  circle.setAttribute('stroke-dasharray', _this.__P_83_1 + ' ' + _this.__P_83_1);
                  circle.setAttribute('stroke-dashoffset', '' + _this.__P_83_1);
                }
              });
            } else if (type === 'semiCircle') {
              _this.__P_83_2.y = _this.__P_83_4;
              var _bg2 = _this._element.querySelector(':scope > svg > path.bg');
              if (_bg2) {
                _bg2.setAttribute('d', "M ".concat(strokeWidth / 2, " ").concat(_this.__P_83_4, " A ").concat(_this.__P_83_3, " ").concat(_this.__P_83_3, " 0 0 1 ").concat(_this.__P_83_4 * 2 - strokeWidth / 2, " ").concat(_this.__P_83_4));
              }
            }
            _this._applyProgress(_this.isPropertyInitialized('progress') ? _this.getProgress() : 0);
          });
        }
      },
      __P_83_9: function __P_83_9(angle) {
        var angleRad = angle * (Math.PI / 180.0);
        return {
          x: this.__P_83_4 - this.__P_83_3 * Math.cos(angleRad),
          y: this.__P_83_4 - this.__P_83_3 * Math.sin(angleRad)
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
              valueElement.setAttribute('stroke-dashoffset', '' + this.__P_83_1 - percent / 100 * this.__P_83_1);
              break;
            case 'semiCircle':
              valueElement = this._element.querySelector(':scope > svg > path.bar');
              end = this.__P_83_9(1.8 * percent);
              valueElement.setAttribute('d', ['M', this.__P_83_2.x, this.__P_83_2.y, 'A', this.__P_83_3, this.__P_83_3, 0, 0, 1, end.x, end.y].join(' '));
              break;
          }
        }
      },
      _fitText: function _fitText() {
        if (this.__P_83_5 && this.__P_83_5.textContent) {
          if (this.isVisible()) {
            if (!this.__P_83_6) {
              this.__P_83_6 = document.createElement('canvas');
              this.__P_83_10 = this.__P_83_6.getContext('2d');
              var compStyle = window.getComputedStyle(this.__P_83_5);
              this.__P_83_10.font = compStyle.getPropertyValue('font');
              this.__P_83_8 = compStyle.getPropertyValue('font-size');
            }
            var metrics = this.__P_83_10.measureText(this.__P_83_5.textContent);
            if (metrics.width > this.__P_83_7) {
              // adjust font-size
              var factor = this.__P_83_7 / metrics.width;
              this.__P_83_5.style.fontSize = Math.floor(parseInt(this.__P_83_8) * factor) + 'px';
            } else {
              this.__P_83_5.style.fontSize = this.__P_83_8;
            }
            this._queuedFitText = false;
          } else {
            this._queuedFitText = true;
          }
        }
      },
      _applyVisible: function _applyVisible(ev) {
        if (ev.getData() && this._queuedFitText) {
          this._fitText();
        }
      },
      _applyText: function _applyText(value) {
        if (this.isConnected()) {
          if (!this.__P_83_5) {
            this.__P_83_5 = this._element.querySelector(':scope > label');
          }
          this.__P_83_5.textContent = value;
          if (!value) {
            // empty text, just reset to default font size
            if (this.__P_83_8) {
              this.__P_83_5.style.fontSize = this.__P_83_8;
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
      this.__P_83_5 = null;
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'round-progress', /*#__PURE__*/function (_QxConnector) {
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
  cv.ui.structure.tile.components.RoundProgress.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RoundProgress.js.map?dt=1722153806850