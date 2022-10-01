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
      _applyVisible: function _applyVisible(visible) {
        if (visible) {
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
        var target = this._element.querySelector('.value');

        var styleClass = '';

        if (target) {
          var tagName = target.tagName.toLowerCase();

          switch (tagName) {
            case 'cv-icon':
              target._instance.setId(mappedValue);

              if (this._element.hasAttribute('styling')) {
                styleClass = cv.Application.structureController.styleValue(this._element.getAttribute('styling'), value, this.__P_80_0);
              }

              target._instance.setStyleClass(styleClass);

              break;

            case 'meter':
              target.setAttribute('value', mappedValue);
              target.innerHTML = '' + mappedValue;
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

        return _class;
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.components.Value.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Value.js.map?dt=1664609793333