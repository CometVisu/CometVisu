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
              if (ev.detail.addressValue) {
                // only open when the sent value equals the fixed value
                // noinspection EqualityComparisonWithCoercionJS
                if (ev.detail.addressValue == ev.detail.state) {
                  this.open();
                }
              } else if (ev.detail.state) {
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

        function _class() {
          _classCallCheck(this, _class);
          return _callSuper(this, _class, [QxClass]);
        }
        _inherits(_class, _QxConnector);
        return _createClass(_class);
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.widgets.Popup.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Popup.js.map?dt=1729101220794