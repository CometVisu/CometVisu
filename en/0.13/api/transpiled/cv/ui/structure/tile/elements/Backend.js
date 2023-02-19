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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
      "cv.Config": {},
      "cv.io.BackendConnections": {},
      "qx.log.Logger": {},
      "qx.locale.Manager": {},
      "cv.core.notifications.Router": {},
      "cv.TemplateEngine": {},
      "qx.event.message.Bus": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Backend.js
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
   * <cv-backend> Custom element to define a backend connection
   */
  qx.Class.define('cv.ui.structure.tile.elements.Backend', {
    extend: cv.ui.structure.tile.elements.AbstractCustomElement,
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _name: null,
      __P_86_0: null,
      _init: function _init() {
        var _this = this;
        var element = this._element;
        var type = element.getAttribute('type');
        var uriString = element.hasAttribute('uri') ? element.getAttribute('uri') : '';
        var uri;
        if (uriString) {
          try {
            uri = new URL(uriString, window.location.origin + window.location.pathname);
          } catch (e) {
            this.error('Error parsing uri: ' + uriString);
          }
        }
        if (type) {
          var credentials = null;
          if (element.hasAttribute('username')) {
            credentials = {
              username: element.getAttribute('username'),
              password: element.getAttribute('password') || ''
            };
          } else if (uri && uri.username) {
            credentials = {
              username: uri.username,
              password: uri.password
            };
          }
          var model = cv.data.Model.getInstance();
          var backendUrl = uri ? uri.toString() : null;
          var backendUrlConfigKey;
          switch (type) {
            case 'knxd':
              backendUrlConfigKey = 'backendKnxdUrl';
              break;
            case 'openhab':
              backendUrlConfigKey = 'backendOpenHABUrl';
              break;
            case 'mqtt':
              backendUrlConfigKey = 'backendMQTTUrl';
              break;
          }
          if (backendUrlConfigKey) {
            // override by URL settings
            if (cv.Config.URL[backendUrlConfigKey]) {
              backendUrl = cv.Config.URL[backendUrlConfigKey];
            } else if (!backendUrl && cv.Config.server[backendUrlConfigKey]) {
              backendUrl = cv.Config.server[backendUrlConfigKey];
            }
          }
          var name = type;
          if (element.hasAttribute('name')) {
            name = element.getAttribute('name');
          } else if (!cv.io.BackendConnections.hasClient('main')) {
            // we need one main backend
            name = 'main';
          } else if (cv.io.BackendConnections.getClient('main').configuredIn === 'config') {
            qx.log.Logger.warn(this, "there is already a backend registered with name \"main\" and type ".concat(type, " skipping this one"));
            return;
          }
          qx.log.Logger.debug(this, 'init backend', name);
          if (cv.io.BackendConnections.hasClient(name)) {
            var notification = {
              topic: 'cv.config.error',
              title: qx.locale.Manager.tr('Config error'),
              message: qx.locale.Manager.tr('There already exists a backend named: "%1"', name),
              severity: 'urgent',
              unique: true,
              deletable: true
            };
            cv.core.notifications.Router.dispatchMessage(notification.topic, notification);
            return;
          }
          var client = cv.io.BackendConnections.addBackendClient(name, type, backendUrl, 'config');
          this._client = client;
          this._name = name;
          this.__P_86_0 = [];
          client.update = function (data) {
            return model.updateFrom(name, data);
          }; // override clients update function
          client.login(true, credentials, function () {
            _this.debug(name, 'connected');
            if (element.hasAttribute('default') && element.getAttribute('default') === 'true') {
              model.setDefaultBackendName(name);
            }
            var doSubscribe = function doSubscribe() {
              var _iterator = _createForOfIteratorHelper(_this.__P_86_0),
                _step;
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var _step$value = _slicedToArray(_step.value, 2),
                    address = _step$value[0],
                    value = _step$value[1];
                  _this.debug(name, 'apply update', address, value);
                  model.onUpdate(address, value, name);
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              var addressesToSubscribe = model.getAddresses(name);
              _this.debug(name, 'subscribing to', addressesToSubscribe.length, 'addresses');
              if (addressesToSubscribe.length !== 0) {
                client.subscribe(addressesToSubscribe);
              }
            };
            if (cv.TemplateEngine.getInstance().isDomFinished()) {
              doSubscribe();
            } else {
              qx.event.message.Bus.subscribe('setup.dom.finished', function () {
                doSubscribe();
              }, _this);
            }
          });
          var _iterator2 = _createForOfIteratorHelper(element.querySelectorAll(':scope > cv-resource')),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var data = _step2.value;
              client.setResourcePath(data.getAttribute('name'), data.textContent.trim());
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        } else {
          this.error('<cv-backend> must have a type attribute');
        }
      },
      _disconnected: function _disconnected() {
        if (this._client) {
          var model = cv.data.Model.getInstance();
          if (this._element.hasAttribute('default') && this._element.getAttribute('default') === 'true') {
            model.resetDefaultBackendName();
          }
          this._client.terminate();
          cv.io.BackendConnections.removeClient(this._client);
          this._client.dispose();
          this._client = null;
        }
      }
    },
    defer: function defer(Clazz) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'backend', /*#__PURE__*/function (_QxConnector) {
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
  cv.ui.structure.tile.elements.Backend.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Backend.js.map?dt=1676809301508