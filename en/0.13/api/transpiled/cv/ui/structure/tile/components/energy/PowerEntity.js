function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
      var _class;
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'power-entity', (_class = /*#__PURE__*/function (_QxConnector) {
        "use strict";

        _inherits(_class, _QxConnector);
        var _super = _createSuper(_class);
        function _class() {
          _classCallCheck(this, _class);
          return _super.call(this, QxClass);
        }
        return _createClass(_class);
      }(QxConnector), _defineProperty(_class, "observedAttributes", ['icon', 'type', 'stroke', 'radius', 'x', 'y', 'row', 'column', 'rowspan', 'colspan', 'foreground-color', 'connect-to', 'connect-from', 'connection-points']), _class));
    }
  });
  cv.ui.structure.tile.components.energy.PowerEntity.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PowerEntity.js.map?dt=1702815212125