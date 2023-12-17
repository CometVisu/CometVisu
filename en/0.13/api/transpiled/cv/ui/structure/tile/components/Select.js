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
        "require": true
      },
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Select.js
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
   * Allows the selection of one element out of a list of <cv-option> elements
   */
  qx.Class.define('cv.ui.structure.tile.components.Select', {
    extend: cv.ui.structure.tile.components.AbstractComponent,
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_84_0: null,
      __P_84_1: null,
      __P_84_2: null,
      _init: function _init() {
        var _this = this;
        cv.ui.structure.tile.components.Select.superclass.prototype._init.call(this);
        var element = this._element;
        this.__P_84_0 = new Map();
        var popup = this.__P_84_2 = document.createElement('div');
        popup.classList.add('popup');
        element.querySelectorAll(':scope > cv-option').forEach(function (option, i) {
          popup.appendChild(option);
          if (!option.hasAttribute('key')) {
            option.setAttribute('key', '' + i);
          }
          _this.__P_84_0.set(option.getAttribute('key'), option);
        });
        var value = this.__P_84_1 = document.createElement('span');
        value.classList.add('value');
        element.appendChild(value);
        element.appendChild(popup);
        var handle = document.createElement('cv-icon');
        handle.classList.add('dropdown');
        handle.classList.add('ri-arrow-down-s-line');
        element.appendChild(handle);
        if (this._writeAddresses.length > 0) {
          element.addEventListener('click', function (ev) {
            return _this.onClicked(ev);
          });
        }
      },
      onClicked: function onClicked(ev) {
        var style = getComputedStyle(this.__P_84_2);
        var target = ev.target;
        // find out event target (either the cv-select of cv-option
        while (target !== ev.currentTarget && target.tagName.toLowerCase() !== 'cv-option') {
          target = target.parentElement;
        }
        if (target.tagName.toLowerCase() === 'cv-option') {
          // select this option
          this._sendSelection(target.getAttribute('key'), true);
        }
        // open popup
        if (style.getPropertyValue('display') === 'none') {
          this.__P_84_2.style.display = 'block';
        } else {
          this.__P_84_2.style.display = 'none';
        }
      },
      _sendSelection: function _sendSelection(key, predictive) {
        var ev = new CustomEvent('sendState', {
          detail: {
            value: key,
            source: this
          }
        });
        this._writeAddresses.filter(function (addr) {
          return !addr.hasAttribute('on') || addr.getAttribute('on') === 'click';
        }).forEach(function (address) {
          return address.dispatchEvent(ev);
        });
        if (predictive === true) {
          this.setValue(key);
        }
      },
      _updateValue: function _updateValue(mappedValue, value) {
        if (this.__P_84_0.has(mappedValue)) {
          this.__P_84_1.innerHTML = '';
          var current = this.__P_84_0.get(mappedValue);
          if (current.children.length > 0) {
            // if we have non text children, we only use them (only icons no text)
            var _iterator = _createForOfIteratorHelper(current.children),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var child = _step.value;
                this.__P_84_1.appendChild(child.cloneNode());
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          } else {
            this.__P_84_1.innerHTML = current.innerHTML;
          }
        }
      }
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'select', /*#__PURE__*/function (_QxConnector) {
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
  cv.ui.structure.tile.components.Select.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Select.js.map?dt=1702815211876