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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
      "qx.util.format.DateFormat": {},
      "qx.locale.Date": {},
      "qx.event.Timer": {},
      "qx.util.TimerManager": {},
      "qx.locale.Manager": {},
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
      },
      outdated: {
        check: 'Boolean',
        init: false,
        apply: '_applyOutdated'
      },
      checkOutdated: {
        check: 'Boolean',
        init: false,
        apply: '_applyCheckOutdated'
      },
      outdatedMessage: {
        check: 'String',
        nullable: true,
        apply: '_applyOutdatedMessage'
      }
    },
    /*
    ***********************************************
      EVENTS
    ***********************************************
    */
    events: {
      fullscreenChanged: 'qx.event.type.Data'
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _fullScreenMode: null,
      _dateFormat: null,
      _checkOutdatedTimerId: null,
      _lastUpdate: null,
      _maxAge: null,
      _hideTimer: null,
      _checkEnvironment: function _checkEnvironment() {
        cv.ui.structure.tile.widgets.Tile.superclass.prototype._checkEnvironment.call(this);
        var parent = this._element.parentElement;
        var isWidget = parent.localName === 'cv-widget' || !!document.getElementById(parent.localName.substring(3));
        this.setWidget(isWidget);
      },
      _init: function _init() {
        var _this = this;
        cv.ui.structure.tile.widgets.Tile.superclass.prototype._init.call(this);
        this._dateFormat = new qx.util.format.DateFormat(qx.locale.Date.getDateFormat('medium') + ' ' + qx.locale.Date.getTimeFormat('medium'));
        this._initPopupChild();
        if (this._element.hasAttribute('background-image')) {
          this.setBackgroundImage(this._element.getAttribute('background-image'));
        }
        if (this._childPopup) {
          this._childPopup.addEventListener('closed', function () {
            _this.resetPopup();
          });
        }
        if (this._element.querySelector(':scope > label.title')) {
          this._element.classList.add('has-title');
        }
        this._hideTimer = new qx.event.Timer(5000);
        this._hideTimer.addListener('interval', function () {
          var elem = _this._element.querySelector(':scope > .outdated-value');
          if (elem.style.display !== 'none') {
            elem.style.display = 'none';
          }
          _this._hideTimer.stop();
        });
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
      _applyOutdated: function _applyOutdated(value) {
        var _this2 = this;
        var elem = this._element.querySelector(':scope > .outdated');
        if (value) {
          this._element.classList.add('outdated');
          if (!elem) {
            elem = document.createElement('div');
            elem.classList.add('outdated');
            elem.textContent = '!';
            this._element.insertBefore(elem, this._element.firstElementChild);
            // capture all clicks by stealing the initial event
            elem.addEventListener('pointerdown', function (ev) {
              ev.stopImmediatePropagation();
            });
            elem.addEventListener('click', function (ev) {
              // show last updated value for 5 seconds
              var valueElem = _this2._element.querySelector(':scope > .outdated-value');
              if (!valueElem) {
                valueElem = document.createElement('div');
                valueElem.classList.add('outdated-value');
                valueElem.textContent = _this2.getOutdatedMessage();
                _this2._element.appendChild(valueElem);
                _this2._element.insertBefore(valueElem, elem.nextElementSibling);
                // capture all clicks by stealing the initial event
                valueElem.addEventListener('pointerdown', function (ev) {
                  ev.stopImmediatePropagation();
                  valueElem.style.display = 'none';
                });
              } else {
                valueElem.style.display = 'block';
              }
              _this2._hideTimer.start();
            });
          }
          elem.style.display = 'block';
        } else {
          this._element.classList.remove('outdated');
          if (elem) {
            elem.style.display = 'none';
          }
        }
      },
      _applyOutdatedMessage: function _applyOutdatedMessage(value) {
        this._element.setAttribute('title', value);
        var valueElem = this._element.querySelector(':scope > .outdated-value');
        if (valueElem) {
          valueElem.textContent = value;
        }
      },
      _applyCheckOutdated: function _applyCheckOutdated(value) {
        var timer = qx.util.TimerManager.getInstance();
        if (value) {
          this._checkOutdatedTimerId = timer.start(this.checkOutdated, 5000, this);
        } else if (this._checkOutdatedTimerId) {
          timer.stop(this._checkOutdatedTimerId);
          this._checkOutdatedTimerId = null;
        }
      },
      checkOutdated: function checkOutdated() {
        if (this._lastUpdate instanceof Date) {
          if (isNaN(this._lastUpdate.getTime())) {
            this.setOutdated(true);
            this.setOutdatedMessage(qx.locale.Manager.tr('Last update: unknown'));
          } else {
            var age = Math.floor((Date.now() - this._lastUpdate.getTime()) / 1000);
            this.setOutdated(age > this._maxAge);
            this.setOutdatedMessage(qx.locale.Manager.tr('Last update: %1', this._dateFormat.format(this._lastUpdate)));
          }
        } else if (this._lastUpdate === '-') {
          this.setOutdated(true);
          this.setOutdatedMessage(qx.locale.Manager.tr('Last update: unknown'));
        } else {
          this.error('last-update value must be a Date object, but is of type:', _typeof(this._lastUpdate), this._lastUpdate);
          this.resetOutdatedMessage();
        }
      },
      open: function open() {
        var _this3 = this;
        if (this._childPopup) {
          this._openPopupChild();
        } else if (this._headerFooterParent) {
          var target = this._headerFooterParent;
          var closeButton = target.querySelector(':scope > button.close');
          if (!closeButton) {
            closeButton = document.createElement('button');
            closeButton.classList.add('close');
            var icon = document.createElement('i');
            icon.classList.add('ri-close-line');
            closeButton.appendChild(icon);
            target.appendChild(closeButton);
            closeButton.addEventListener('click', function () {
              return _this3.setPopup(false);
            });
          }
          closeButton.style.display = 'block';
          target.classList.add('popup');
          if (this._fullScreenMode) {
            target.classList.add('fullscreen');
            this.fireDataEvent('fullscreenChanged', true);
          }
          this.registerModalPopup();
        }
      },
      close: function close(keepState) {
        if (!keepState) {
          this.setPopup(false);
        }
        if (this._childPopup) {
          this._closePopupChild();
        } else if (this._headerFooterParent) {
          this._headerFooterParent.classList.remove('popup');
          if (this._fullScreenMode) {
            this._headerFooterParent.classList.remove('fullscreen');
            this.fireDataEvent('fullscreenChanged', true);
          }
          var closeButton = this._headerFooterParent.querySelector(':scope > button.close');
          if (closeButton) {
            closeButton.style.display = 'none';
          }
          this.unregisterModalPopup();
        }
        if (this._autoCloseTimer) {
          this._autoCloseTimer.stop();
        }
        this.fireEvent('closed');
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
            case 'fullscreen-popup':
              this._fullScreenMode = ev.detail.target === 'fullscreen-popup';
              if (ev.detail.addressValue) {
                // only open when the sent value equals the fixed value
                // noinspection EqualityComparisonWithCoercionJS
                if (ev.detail.addressValue == ev.detail.state) {
                  this.setPopup(true);
                  // this is not closing by address, so we set a close timeout to 3 minutes
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
            case 'last-update':
              this._maxAge = ev.detail.targetConfig && ev.detail.targetConfig.length > 0 ? parseInt(ev.detail.targetConfig.shift()) : Number.POSITIVE_INFINITY;
              this._lastUpdate = ev.detail.state;
              this.checkOutdated();
              break;
            default:
              this.debug('unhandled address target', ev.detail.target);
          }
        }
      },
      /*
      ***********************************************
        DESTRUCTOR
      ***********************************************
      */
      destruct: function destruct() {
        this._disposeObjects('_dateFormat');
        if (this._checkOutdatedTimerId) {
          qx.util.TimerManager.getInstance().stop(this._checkOutdatedTimerId);
          this._checkOutdatedTimerId = null;
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
        return _createClass(_class);
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.widgets.Tile.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Tile.js.map?dt=1702815212824