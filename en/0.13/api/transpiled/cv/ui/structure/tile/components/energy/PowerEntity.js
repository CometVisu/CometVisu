function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
      "cv.ui.structure.tile.components.svg.RoundValue": {
        "require": true
      },
      "cv.ui.structure.tile.components.energy.MEntity": {
        "require": true
      },
      "cv.ui.structure.tile.components.energy.MConnectable": {
        "require": true
      },
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /*
   * Copyright (c) 2023, Christian Mayer and the CometVisu contributors.
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
   *
   */

  /**
   * cv.ui.structure.tile.components.svg.RoundValue for power entities.
   * @since 2023
   * @author Tobias Bräutigam
   */
  qx.Class.define('cv.ui.structure.tile.components.energy.PowerEntity', {
    extend: cv.ui.structure.tile.components.svg.RoundValue,
    include: [cv.ui.structure.tile.components.energy.MEntity, cv.ui.structure.tile.components.energy.MConnectable],
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      typeSettings: {
        pv: {
          icon: 'knxuf-weather_sun',
          styling: 'tile-pv-power'
        },
        battery: {
          icon: 'knxuf-measure_battery_100',
          styling: 'tile-battery-power',
          'foreground-color': 'var(--batteryConsumeColor)'
        },
        grid: {
          icon: 'knxuf-scene_power_grid',
          styling: 'tile-grid-power'
        },
        house: {
          icon: 'knxuf-control_building_empty'
        },
        charger: {
          icon: 'knxuf-veh_wallbox'
        },
        heatpump: {
          icon: 'knxuf-sani_earth_source_heat_pump'
        },
        consumer: {
          icon: 'knxuf-measure_smart_meter'
        }
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _applyType: function _applyType(value) {
        var settings = cv.ui.structure.tile.components.energy.PowerEntity.typeSettings[value];
        if (settings) {
          for (var attribute in settings) {
            this._element.setAttribute(attribute, settings[attribute]);
          }
        }
      },
      _init: function _init() {
        var _this = this;
        cv.ui.structure.tile.components.energy.PowerEntity.superclass.prototype._init.call(this);
        var element = this._element;
        if (element.hasAttribute('id')) {
          this._svg.setAttribute('id', element.getAttribute('id'));
        }
        if (!element.hasAttribute('mapping')) {
          element.setAttribute('mapping', 'tile-kilo-watts');
        }
        this._noValue = element.querySelectorAll(':scope > cv-address, :scope > cv-address-group').length === 0;
        this.setUseConnectionSum(this._noValue && this.getType() === 'house');
        if (this._noValue && this.getType() !== 'house') {
          // this has no addresses and therefore no values, we only show the icon then without circle
          var _iterator = _createForOfIteratorHelper(this._svg.querySelectorAll('circle, text:not(.icon)')),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var elem = _step.value;
              elem.remove();
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          this._iconSize = 32;
          var icon = this._svg.querySelector('text.icon');
          if (icon) {
            icon.style.fontSize = this._iconSize + 'px';
          }
        }
        window.requestAnimationFrame(function () {
          _this._applyConnectTo(_this.getConnectTo());
          _this._applyConnectFrom(_this.getConnectFrom());
        });
        this.addListener('changeValue', this._updateDirection, this);
      }
    },
    defer: function defer(QxClass) {
      var _Class;
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'power-entity', (_Class = /*#__PURE__*/function (_QxConnector) {
        "use strict";

        function _Class() {
          _classCallCheck(this, _Class);
          return _callSuper(this, _Class, [QxClass]);
        }
        _inherits(_Class, _QxConnector);
        return _createClass(_Class);
      }(QxConnector), _defineProperty(_Class, "observedAttributes", ['icon', 'type', 'stroke', 'radius', 'x', 'y', 'row', 'column', 'rowspan', 'colspan', 'foreground-color', 'connect-to', 'connect-from', 'connection-points', 'title']), _Class));
    }
  });
  cv.ui.structure.tile.components.energy.PowerEntity.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PowerEntity.js.map?dt=1735341762307