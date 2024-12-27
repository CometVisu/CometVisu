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
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
      "cv.ui.structure.tile.elements.AbstractCustomElement": {
        "require": true
      },
      "cv.io.BackendConnections": {},
      "cv.data.Model": {},
      "cv.Config": {},
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
      __P_95_0: null,
      _init: function _init() {
        var _this = this;
        var element = this._element;
        var type = element.getAttribute('type');
        if (type && type.startsWith('class:')) {
          var className = type.split(':').pop();
          if (!cv.io.BackendConnections.isRegistered(className)) {
            // wait until client class has been loaded
            cv.io.BackendConnections.addClassLoadedListener(className, function () {
              _this._init();
            });
            return;
          }
          type = className;
        }
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
          this.__P_95_0 = [];
          client.update = function (data) {
            return model.updateFrom(name, data);
          }; // override clients update function
          var _iterator = _createForOfIteratorHelper(element.querySelectorAll(':scope > cv-resource')),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var data = _step.value;
              client.setResourcePath(data.getAttribute('name'), data.textContent.trim());
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          client.login(true, credentials, function () {
            _this.debug(name, 'connected');
            if (element.hasAttribute('default') && element.getAttribute('default') === 'true') {
              model.setDefaultBackendName(name);
            }
            var doSubscribe = function doSubscribe() {
              var _iterator2 = _createForOfIteratorHelper(_this.__P_95_0),
                _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var _step2$value = _slicedToArray(_step2.value, 2),
                    address = _step2$value[0],
                    value = _step2$value[1];
                  _this.debug(name, 'apply update', address, value);
                  model.onUpdate(address, value, name);
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
              cv.io.BackendConnections.startInitialRequest(name);
            };
            if (cv.TemplateEngine.getInstance().isDomFinished()) {
              doSubscribe();
            } else {
              qx.event.message.Bus.subscribe('setup.dom.finished', function () {
                doSubscribe();
              }, _this);
            }
          });
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

        function _class() {
          _classCallCheck(this, _class);
          return _callSuper(this, _class, [Clazz]);
        }
        _inherits(_class, _QxConnector);
        return _createClass(_class);
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.elements.Backend.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Backend.js.map?dt=1735341762626