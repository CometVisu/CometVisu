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
  /* Popup.js
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
   * Creates a popup that contains arbitrary content and can be opened as an overlay over the current UI.
   *
   * @author Tobias Bräutigam
   * @since 2022
   */
  qx.Class.define('cv.ui.structure.tile.widgets.Popup', {
    extend: cv.ui.structure.tile.components.AbstractComponent,
    include: cv.ui.structure.tile.MPopup,
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      openedPopups: []
    },
    /*
     ******************************************************
     MEMBERS
     ******************************************************
     */
    members: {
      _closeButton: null,
      _init: function _init() {
        var _this = this;
        cv.ui.structure.tile.widgets.Popup.superclass.prototype._init.call(this);
        var popup = this._element;
        var closeable = !popup.hasAttribute('closeable') || popup.getAttribute('closeable') === 'true';
        if (closeable) {
          this._closeButton = document.createElement('button');
          this._closeButton.classList.add('close');
          var icon = document.createElement('i');
          icon.classList.add('ri-close-line');
          this._closeButton.appendChild(icon);
          popup.insertBefore(this._closeButton, popup.firstChild);
          this._closeButton.addEventListener('click', function () {
            return _this.close();
          });
        }
        popup.addEventListener('close', function (ev) {
          _this.close();
        });
        if (popup.hasAttribute('title')) {
          var header = document.createElement('header');
          popup.insertBefore(header, popup.firstChild);
          var title = document.createElement('h2');
          title.textContent = popup.getAttribute('title');
          header.appendChild(title);
        }
        if (popup.hasAttribute('auto-close-timeout')) {
          var timeoutSeconds = parseInt(popup.getAttribute('auto-close-timeout'));
          if (!isNaN(timeoutSeconds)) {
            this._autoCloseTimer = new qx.event.Timer(timeoutSeconds * 1000);
            this._autoCloseTimer.addListener('interval', function () {
              _this._autoCloseTimer.stop();
              _this.close();
            });
          } else {
            this.error('invalid auto-close-timeout value:', popup.getAttribute('auto-close-timeout'));
          }
        }
      },
      open: function open() {
        var popup = this._element;
        if (!popup.hasAttribute('open')) {
          popup.setAttribute('open', '');
          if (popup.hasAttribute('modal') && popup.getAttribute('modal') === 'true') {
            this.registerModalPopup();
          }
          if (this._autoCloseTimer) {
            this._autoCloseTimer.start();
          }
        }
      },
      close: function close() {
        var popup = this._element;
        if (popup) {
          popup.removeAttribute('open');
          if (popup.hasAttribute('modal') && popup.getAttribute('modal') === 'true') {
            this.unregisterModalPopup();
          }
          if (this._autoCloseTimer) {
            this._autoCloseTimer.stop();
          }
          popup.dispatchEvent(new CustomEvent('closed'));
        }
      },
      /**
       * Handles the incoming data from the backend for this widget.
       * The popup handles the special address-targets:
       *  - open: opens the popup when the address value is 'true' or 1 => no auto closing
       *  - close: closes the popup when the address value is 'false' or 0 => no auto opening
       *  - open-close: the upper both combined => popup visibility fully dependent on the address value, auto-opening + auto-closing
       *
       * @param ev {CustomEvent} stateUpdate event fired from an cv-address component
       */
      onStateUpdate: function onStateUpdate(ev) {
        if (!cv.ui.structure.tile.widgets.Popup.superclass.prototype.onStateUpdate.call(this, ev)) {
          switch (ev.detail.target) {
            case 'open':
              if (ev.detail.state) {
                this.open();
              }
              break;
            case 'open-close':
              if (ev.detail.state) {
                this.open();
              } else {
                this.close();
              }
              break;
            case 'close':
              if (!ev.detail.state) {
                this.close();
              }
              break;
            default:
              this.debug('unhandled address target', ev.detail.target);
              break;
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
      this._disposeObjects('_autoCloseTimer');
      if (this._closeButton) {
        this._closeButton.remove();
        this._closeButton = null;
      }
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'popup', /*#__PURE__*/function (_QxConnector) {
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
  cv.ui.structure.tile.widgets.Popup.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Popup.js.map?dt=1703705663812