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
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
        var styleClass = '';
        var _iterator = _createForOfIteratorHelper(this._element.querySelectorAll('.value')),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var target = _step.value;
            var tagName = target.tagName.toLowerCase();
            switch (tagName) {
              case 'cv-icon':
                target._instance.setId(mappedValue);
                if (this._element.hasAttribute('styling')) {
                  styleClass = cv.Application.structureController.styleValue(this._element.getAttribute('styling'), value, this.__P_87_0);
                }
                target._instance.setStyleClass(styleClass);
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
                this._debouncedDetectOverflow();
                break;
            }
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
  cv.ui.structure.tile.components.Value.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Value.js.map?dt=1704036753684