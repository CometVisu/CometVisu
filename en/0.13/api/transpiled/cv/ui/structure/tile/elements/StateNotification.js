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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
      "cv.ui.structure.tile.elements.AbstractCustomElement": {
        "require": true
      },
      "cv.core.notifications.Router": {},
      "cv.ui.NotificationCenter": {},
      "cv.data.Model": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* StateNotification.js
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
   * Parse notification settings and load them into the cv.core.notifications.Router
   * @author Tobias Bräutigam
   * @since 2022
   */
  qx.Class.define('cv.ui.structure.tile.elements.StateNotification', {
    extend: cv.ui.structure.tile.elements.AbstractCustomElement,
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _init: function _init() {
        var stateConfig = {};
        var elem = this._element;
        var target = cv.core.notifications.Router.getTarget(elem.getAttribute('target')) || cv.ui.NotificationCenter.getInstance();
        var addressContainer = elem.querySelector('cv-addresses');
        var config = {
          target: target,
          severity: elem.getAttribute('severity'),
          skipInitial: elem.getAttribute('skip-initial') !== 'false',
          deletable: elem.getAttribute('deletable') !== 'false',
          unique: elem.getAttribute('unique') === 'true',
          valueMapping: addressContainer.getAttribute('value-mapping'),
          addressMapping: addressContainer.getAttribute('address-mapping'),
          enabled: !elem.hasAttribute('enabled') || elem.getAttribute('enabled') === 'true'
        };
        if (elem.hasAttribute('id')) {
          config.id = elem.getAttribute('id');
          // notifications with id can be changed by the system backend, so we need to listen to some addresses
          var model = cv.data.Model.getInstance();
          model.addUpdateListener("notification:".concat(config.id, ":enabled"), this._onStateUpdate, this, 'system');
          model.addUpdateListener("notification:".concat(config.id, ":severity"), this._onStateUpdate, this, 'system');
          model.onUpdate("notification:".concat(config.id, ":enabled"), config.enabled, 'system');
          model.onUpdate("notification:".concat(config.id, ":severity"), config.severity, 'system');
        }
        var name = elem.getAttribute('name');
        if (name) {
          config.topic = 'cv.state.' + name;
        }
        var icon = elem.getAttribute('icon');
        if (icon) {
          config.icon = icon;
          var iconClasses = elem.getAttribute('icon-classes');
          if (iconClasses) {
            config.iconClasses = iconClasses;
          }
        }

        // templates
        var titleElem = elem.querySelector('cv-title-template');
        if (titleElem) {
          config.titleTemplate = titleElem.innerHTML;
        }
        var messageElem = elem.querySelector('cv-message-template');
        if (messageElem) {
          config.messageTemplate = messageElem.innerHTML;
        }

        // condition
        var conditionElem = elem.querySelector('cv-condition');
        var condition = conditionElem.textContent;
        if (condition === 'true') {
          condition = true;
        } else if (condition === 'false') {
          condition = false;
        }
        config.condition = condition;
        var address;
        var _iterator = _createForOfIteratorHelper(addressContainer.querySelectorAll(':scope > cv-address')),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var addressElement = _step.value;
            address = addressElement.textContent.trim();
            if (!Object.prototype.hasOwnProperty.call(stateConfig, address)) {
              stateConfig[address] = [];
            }
            var addressConfig = Object.assign({}, config);
            var mode = 1 | 2; // Bit 0 = read, Bit 1 = write  => 1|2 = 3 = readwrite
            switch (addressElement.getAttribute('mode')) {
              case 'disable':
                mode = 0;
                break;
              case 'read':
                mode = 1;
                break;
              case 'write':
                mode = 2;
                break;
              case 'readwrite':
                mode = 1 | 2;
                break;
            }
            addressConfig.addressConfig = {
              transform: addressElement.getAttribute('transform'),
              mode: mode,
              selector: addressElement.getAttribute('selector'),
              ignoreError: addressElement.getAttribute('ignore-error') === 'true',
              qos: (addressElement.getAttribute('qos') || 0) | 0,
              // force integer
              retain: addressElement.getAttribute('retain') === 'true',
              variantInfo: addressElement.getAttribute('variant')
            };
            stateConfig[address].push(addressConfig);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        cv.core.notifications.Router.getInstance().registerStateUpdateHandler(stateConfig);
      },
      _onStateUpdate: function _onStateUpdate(address, state, initial, changed) {
        var _address$split = address.split(':'),
          _address$split2 = _slicedToArray(_address$split, 3),
          id = _address$split2[1],
          property = _address$split2[2];
        var router = cv.core.notifications.Router.getInstance();
        if (property === 'enabled') {
          router.enableStateUpdateHandler(id, state == 1);
        } else if (property === 'severity') {
          router.changeStateUpdateHandlerSeverity(id, state);
        }
      }
    },
    defer: function defer(Clazz) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'state-notification', /*#__PURE__*/function (_QxConnector) {
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
  cv.ui.structure.tile.elements.StateNotification.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=StateNotification.js.map?dt=1709410141839