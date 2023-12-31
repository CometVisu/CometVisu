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
      "cv.ui.structure.tile.elements.AbstractCustomElement": {
        "require": true
      },
      "cv.data.Model": {},
      "cv.ui.structure.tile.components.Button": {},
      "cv.Transform": {},
      "qx.event.Timer": {},
      "cv.io.BackendConnections": {},
      "cv.Application": {},
      "cv.util.String": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Address.js
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
   * Address element that connect a widget/component to the backend.
   *
   *  @author Tobias Bräutigam
   *  @since 2022
   */
  qx.Class.define('cv.ui.structure.tile.elements.Address', {
    extend: cv.ui.structure.tile.elements.AbstractCustomElement,
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_92_0: null,
      __P_92_1: null,
      _stateUpdateTarget: null,
      getAddress: function getAddress() {
        return this._element.textContent.trim();
      },
      _init: function _init() {
        var _this = this;
        var element = this._element;
        this._stateUpdateTarget = element;
        var address = this.getAddress();
        if (address) {
          var model = cv.data.Model.getInstance();
          var backendName = element.getAttribute('backend');
          model.addAddress(address, element.getAttribute('id'), backendName);
          var mode = element.hasAttribute('mode') ? element.getAttribute('mode') : 'readwrite';
          if (mode !== 'write') {
            // subscribe
            // this is a read address register for updates
            var state = model.getState(address, backendName);
            if (state !== undefined) {
              this.fireStateUpdate(address, state);
            }
            //add listener
            model.addUpdateListener(address, this.fireStateUpdate, this, backendName);
            if (element.hasAttribute('target') && element.getAttribute('target').startsWith('last-update')) {
              if (state === undefined) {
                // notify tile that we have no value, so its outdated
                this.fireStateUpdate(address, '-');
              }
            }
          }
          if (mode !== 'read') {
            // listen for sendState events
            element.addEventListener('sendState', function (ev) {
              var value = null;
              if (Object.prototype.hasOwnProperty.call(ev.detail, 'value')) {
                value = ev.detail.value;
              }
              if (element.hasAttribute('value')) {
                // address has a fixed value that must be sent
                value = element.getAttribute('value');
              }
              var allowDuplicates = ev.detail.source && ev.detail.source instanceof cv.ui.structure.tile.components.Button && (ev.detail.source.getType() === 'trigger' || ev.detail.source.getType() === 'push');
              if (value !== null) {
                var encoding = element.getAttribute('transform') || 'raw';
                var encodedValue = cv.Transform.encodeBusAndRaw({
                  transform: encoding,
                  selector: _this._element.getAttribute('selector'),
                  ignoreError: _this._element.getAttribute('ignore-error') === 'true',
                  variantInfo: _this._element.getAttribute('variant'),
                  qos: (_this._element.getAttribute('qos') || 0) | 0
                }, value);

                // noinspection EqualityComparisonWithCoercionJS
                if (allowDuplicates || !Object.prototype.hasOwnProperty.call(element, 'lastSentValue') || encodedValue.raw !== element.lastSentValue) {
                  if (element.hasAttribute('delay')) {
                    var delay = parseInt(element.getAttribute('delay'));
                    _this.debug("send with delay of ".concat(delay, "ms"));
                    qx.event.Timer.once(function () {
                      cv.io.BackendConnections.getClient(backendName).write(address, encodedValue.bus, element);
                      if (!allowDuplicates) {
                        element.lastSentValue = encodedValue.raw;
                      }
                    }, _this, delay);
                  } else {
                    cv.io.BackendConnections.getClient(backendName).write(address, encodedValue.bus, element);
                    if (!allowDuplicates) {
                      element.lastSentValue = encodedValue.raw;
                    }
                  }
                }
              }
            });
          }
        }
      },
      /**
       * Creates a 'stateUpdate' event with the transformed value and dispatches it to the <cv-address>-Element.
       * @param address {String} address
       * @param state {variant} state to send
       */
      fireStateUpdate: function fireStateUpdate(address, state) {
        if (this.__P_92_0 !== state || this._element.getAttribute('send-mode') === 'always') {
          var transform = this._element.getAttribute('transform') || 'raw';
          var transformedState = cv.Transform.decode({
            transform: transform,
            selector: this._element.getAttribute('selector'),
            ignoreError: this._element.getAttribute('ignore-error') === 'true',
            variantInfo: this._element.getAttribute('variant'),
            qos: (this._element.getAttribute('qos') || 0) | 0
          }, state);
          var mapping = '';
          if (this._element.hasAttribute('mapping')) {
            mapping = this._element.getAttribute('mapping');
            transformedState = cv.Application.structureController.mapValue(mapping, transformedState);
          }
          if (this._element.hasAttribute('format')) {
            transformedState = cv.util.String.sprintf(this._element.getAttribute('format'), transformedState instanceof Date ? transformedState.toLocaleString() : transformedState);
          }
          var targetConfig = this._element.hasAttribute('target') ? this._element.getAttribute('target').split(':') : [];
          var target = targetConfig.length > 0 ? targetConfig.shift() : '';
          var ev = new CustomEvent('stateUpdate', {
            bubbles: true,
            cancelable: true,
            detail: {
              address: this.getAddress(),
              state: transformedState,
              target: target,
              targetConfig: targetConfig,
              raw: state,
              mapping: mapping,
              addressValue: this._element.hasAttribute('value') ? this._element.getAttribute('value') : null,
              source: this,
              variant: this._element.hasAttribute('variant') ? this._element.getAttribute('variant') : null
            }
          });
          this.__P_92_1 = transformedState;
          //console.log(ev.detail);
          this._stateUpdateTarget.dispatchEvent(ev);
          this.__P_92_0 = state;
          // reset lastSentValue
          if (state !== this._element.lastSentValue) {
            this._element.lastSentValue = null;
          }
        }
      },
      /**
       *
       * @return {boolean} true if this is a read address
       */
      isRead: function isRead() {
        return this._element.getAttribute('mode') !== 'write';
      },
      /**
       *
       * @return {boolean} true if this is a write address
       */
      isWrite: function isWrite() {
        return this._element.getAttribute('mode') !== 'read';
      },
      getValue: function getValue() {
        return this.__P_92_1;
      }
    },
    defer: function defer(Clazz) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'address', /*#__PURE__*/function (_QxConnector) {
        "use strict";

        _inherits(_class, _QxConnector);
        var _super = _createSuper(_class);
        function _class() {
          _classCallCheck(this, _class);
          return _super.call(this, Clazz);
        }
        return _createClass(_class);
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.elements.Address.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Address.js.map?dt=1704036754111