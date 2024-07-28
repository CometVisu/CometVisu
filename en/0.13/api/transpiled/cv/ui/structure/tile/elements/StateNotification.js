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

        function _class() {
          _classCallCheck(this, _class);
          return _callSuper(this, _class, [Clazz]);
        }
        _inherits(_class, _QxConnector);
        return _createClass(_class);
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.elements.StateNotification.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=StateNotification.js.map?dt=1722151813595