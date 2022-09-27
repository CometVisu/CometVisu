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
      "cv.ui.structure.tile.MPopup": {
        "require": true
      },
      "qx.event.Timer": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Tile.js 
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
   * Shows a tile
   */
  qx.Class.define('cv.ui.structure.tile.widgets.Tile', {
    extend: cv.ui.structure.tile.components.AbstractComponent,
    include: cv.ui.structure.tile.MPopup,

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      backgroundImage: {
        check: 'String',
        nullable: true,
        apply: '_applyBackgroundImage'
      },

      /**
       * Turn this tile into a popup
       */
      popup: {
        check: 'Boolean',
        init: false,
        apply: '_applyPopup'
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

        cv.ui.structure.tile.widgets.Tile.superclass.prototype._init.call(this);

        this._initPopupChild();

        if (this._element.hasAttribute('background-image')) {
          this.setBackgroundImage(this._element.getAttribute('background-image'));
        }

        if (this._childPopup) {
          this._childPopup.addEventListener('closed', function () {
            _this.resetPopup();
          });
        }
      },
      _applyBackgroundImage: function _applyBackgroundImage(value) {
        if (value) {
          this._element.style.backgroundImage = "url(".concat(value, ")");

          var overlay = this._element.querySelector(':scope > div.overlay');

          if (!overlay) {
            overlay = document.createElement('div');
            overlay.classList.add('overlay');

            this._element.insertBefore(overlay, this._element.firstChild);
          }

          this._element.classList.add('has-bg-image');
        } else {
          this._element.style.backgroundImage = '';

          this._element.classList.remove('has-bg-image');
        }
      },
      open: function open() {
        var _this2 = this;

        if (this._childPopup) {
          this._openPopupChild();
        } else {
          var closeButton = this._element.querySelector(':scope > button.close');

          if (!closeButton) {
            closeButton = document.createElement('button');
            closeButton.classList.add('close');
            var icon = document.createElement('i');
            icon.classList.add('ri-close-line');
            closeButton.appendChild(icon);

            this._element.appendChild(closeButton);

            closeButton.addEventListener('click', function () {
              return _this2.setPopup(false);
            });
          }

          closeButton.style.display = 'block';

          this._element.classList.add('popup');

          this.registerModalPopup();
        }
      },
      close: function close(keepState) {
        if (!keepState) {
          this.setPopup(false);
        }

        if (this._childPopup) {
          this._closePopupChild();
        } else {
          this._element.classList.remove('popup');

          var closeButton = this._element.querySelector(':scope > button.close');

          if (closeButton) {
            closeButton.style.display = 'none';
          }

          this.unregisterModalPopup();
        }

        if (this._autoCloseTimer) {
          this._autoCloseTimer.stop();
        }
      },
      _applyPopup: function _applyPopup(value) {
        if (value) {
          this.open();
        } else {
          this.close(true);
        }
      },

      /**
       * Handles the incoming data from the backend for this widget
       *
       * @param ev {CustomEvent} stateUpdate event fired from a cv-address component
       */
      onStateUpdate: function onStateUpdate(ev) {
        if (!cv.ui.structure.tile.widgets.Tile.superclass.prototype.onStateUpdate.call(this, ev)) {
          switch (ev.detail.target) {
            case 'background-image':
              this.setBackgroundImage(ev.detail.state);
              break;

            case 'popup':
              if (ev.detail.addressValue) {
                // only open when the sent value equals the fixed value
                // noinspection EqualityComparisonWithCoercionJS
                if (ev.detail.addressValue == ev.detail.state) {
                  this.setPopup(true); // this is not closing by address, so we set a close timeout to 3 minutes

                  if (!this._autoCloseTimer) {
                    this._autoCloseTimer = new qx.event.Timer(180000);

                    this._autoCloseTimer.addListener('interval', this.close, this);
                  }

                  this._autoCloseTimer.restart();
                }
              } else {
                // open / close depending on value
                // noinspection EqualityComparisonWithCoercionJS
                this.setPopup(ev.detail.state == 1);
              }

              break;

            default:
              this.debug('unhandled address target', ev.detail.target);
          }
        }
      }
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'tile', /*#__PURE__*/function (_QxConnector) {
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
  cv.ui.structure.tile.widgets.Tile.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Tile.js.map?dt=1664297874004