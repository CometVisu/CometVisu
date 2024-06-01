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
        "construct": true,
        "require": true
      },
      "cv.ui.structure.tile.MVisibility": {
        "require": true
      },
      "cv.ui.structure.tile.MResize": {
        "require": true
      },
      "qx.util.Function": {},
      "cv.Application": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Value.js
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
   * Shows a value from the backend, as label or image/icon
   * @author Tobias Bräutigam
   * @since 2022
   */
  qx.Class.define('cv.ui.structure.tile.components.Value', {
    extend: cv.ui.structure.tile.components.AbstractComponent,
    include: [cv.ui.structure.tile.MVisibility, cv.ui.structure.tile.MResize],
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
      MEMBERS
    ***********************************************
    */
    members: {
      _queuedOverflowDetection: null,
      _debouncedDetectOverflow: null,
      _init: function _init() {
        cv.ui.structure.tile.components.Value.superclass.prototype._init.call(this);
        this._debouncedDetectOverflow = qx.util.Function.debounce(this._detectOverflow, 20);
        var target = this._element.querySelector('.value');
        if (target && target.tagName.toLowerCase() === 'label') {
          // check for overflowing text, when labels parent gets resized
          this.setResizeTarget(this._element);
          this.addListener('resized', this._debouncedDetectOverflow, this);
        }
      },
      _applyVisible: function _applyVisible(ev) {
        if (ev.getData()) {
          if (this._queuedOverflowDetection) {
            this._debouncedDetectOverflow();
          }
        } else {
          var target = this._element.querySelector('.value');
          if (target && target.classList.contains('scroll')) {
            target.classList.remove('scroll');
          }
        }
      },
      _detectOverflow: function _detectOverflow() {
        var target = this._element.querySelector('.value');
        if (this.isVisible()) {
          this._queuedOverflowDetection = false;
          if (target.clientWidth > target.parentElement.clientWidth) {
            target.classList.add('scroll');
          } else {
            target.classList.remove('scroll');
          }
        } else {
          this._queuedOverflowDetection = true;
        }
      },
      _updateValue: function _updateValue(mappedValue, value) {
        var _this = this;
        var styleClass = '';
        var _iterator = _createForOfIteratorHelper(this._element.querySelectorAll('.value')),
          _step;
        try {
          var _loop = function _loop() {
            var target = _step.value;
            var tagName = target.tagName.toLowerCase();
            switch (tagName) {
              case 'cv-icon':
                if (_this._element.hasAttribute('styling')) {
                  styleClass = cv.Application.structureController.styleValue(_this._element.getAttribute('styling'), value, _this.__P_87_0);
                }
                if (target._instance) {
                  target._instance.setId('' + mappedValue);
                  target._instance.setStyleClass(styleClass);
                } else {
                  // try again in next frame
                  window.requestAnimationFrame(function () {
                    if (target._instance) {
                      target._instance.setId('' + mappedValue);
                      target._instance.setStyleClass(styleClass);
                    } else {
                      _this.error('id and styleClass could not be applied, custom element not initialized yet!');
                    }
                  });
                }
                break;
              case 'meter':
                target.setAttribute('value', value);
                break;
              case 'cv-round-progress':
                if (typeof value === 'string') {
                  value = parseInt(value);
                }
                target._instance.setProgress(value);
                target._instance.setText('' + mappedValue);
                break;
              case 'label':
                target.innerHTML = mappedValue;
                _this._debouncedDetectOverflow();
                break;
            }
          };
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'value', /*#__PURE__*/function (_QxConnector) {
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
  cv.ui.structure.tile.components.Value.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Value.js.map?dt=1717235369340