function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.tile.components.svg.TextValue": {
        "require": true
      },
      "cv.ui.structure.tile.components.energy.MEntity": {
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
   * TextValue for energy entities.
   *
   * @since 2023
   * @author Tobias Bräutigam
   */
  qx.Class.define('cv.ui.structure.tile.components.energy.EnergyEntity', {
    extend: cv.ui.structure.tile.components.svg.TextValue,
    include: cv.ui.structure.tile.components.energy.MEntity,
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      typeSettings: {
        pv: {
          icon: 'knxuf-weather_sun',
          color: 'var(--pvColor)'
        },
        battery: {
          icon: 'knxuf-measure_battery_100'
        },
        grid: {
          icon: 'knxuf-scene_power_grid'
        },
        house: {
          icon: 'knxuf-control_building_empty'
        },
        charger: {
          icon: 'knxuf-veh_wallbox',
          color: 'var(--powerConsumeColor)'
        },
        heatpump: {
          icon: 'knxuf-sani_earth_source_heat_pump',
          color: 'var(--powerConsumeColor)'
        },
        consumer: {
          icon: 'knxuf-measure_smart_meter',
          color: 'var(--powerConsumeColor)'
        }
      }
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      direction: {
        check: ['incoming', 'outgoing', 'none'],
        init: 'none',
        apply: '_applyDirection'
      },
      unit: {
        check: ['Wh', 'kWh'],
        init: 'kWh',
        apply: '_applyUnit'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _autoFormat: null,
      _applyType: function _applyType(value) {
        var settings = cv.ui.structure.tile.components.energy.EnergyEntity.typeSettings[value];
        if (settings) {
          for (var attribute in settings) {
            this._element.setAttribute(attribute, settings[attribute]);
          }
        }
      },
      _init: function _init() {
        cv.ui.structure.tile.components.energy.EnergyEntity.superclass.prototype._init.call(this);
        var element = this._element;
        if (element.hasAttribute('id')) {
          this._svg.setAttribute('id', element.getAttribute('id'));
        }
        this._autoFormat = !element.hasAttribute('format');
        this._applyUnit(this.getUnit());
        var direction = this.getDirection();
        if (direction !== 'none') {
          this._applyDirection(direction);
        }
      },
      _applyUnit: function _applyUnit(value) {
        if (this.isConnected() && this._autoFormat) {
          if (!this._element.hasAttribute('format')) {
            switch (value) {
              case 'Wh':
                this._element.setAttribute('format', '%d Wh');
                break;
              case 'kWh':
                this._element.setAttribute('format', '%.2f kWh');
                break;
              default:
                this._element.removeAttribute('format');
                break;
            }
          }
        }
      },
      _applyDirection: function _applyDirection(direction) {
        if (direction === 'none') {
          this.resetColor();
          var arrow = this._target ? this._target.querySelector('path.direction') : null;
          if (arrow) {
            arrow.remove();
          }
          return;
        }
        switch (this.getType()) {
          case 'battery':
            this.setColor(direction === 'incoming' ? 'var(--batteryConsumeColor)' : 'var(--batteryInjectColor)');
            break;
          case 'grid':
            this.setColor(direction === 'incoming' ? 'var(--gridConsumeColor)' : 'var(--gridInjectColor)');
            break;
        }
        if (this._target) {
          var _arrow = this._target.querySelector('path.energy-direction');
          if (!_arrow) {
            _arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            _arrow.classList.add('energy-direction');
            _arrow.setAttribute('d', 'M 0 0 L 6 4 L 0 8');
            _arrow.setAttribute('stroke', this.getIconColor());
            _arrow.setAttribute('stroke-width', '1');
            _arrow.setAttribute('fill', 'transparent');
            this._target.appendChild(_arrow);
          }
          this.__P_88_0();
        }
      },
      _applyOffsetY: function _applyOffsetY(value) {
        cv.ui.structure.tile.components.energy.EnergyEntity.superclass.prototype._applyOffsetY.call(this, value);
        this.__P_88_0();
      },
      _applyScale: function _applyScale(scale) {
        cv.ui.structure.tile.components.energy.EnergyEntity.superclass.prototype._applyScale.call(this, scale);
        this.__P_88_0();
      },
      __P_88_0: function __P_88_0() {
        var arrow = this._target.querySelector('path.energy-direction');
        if (arrow) {
          arrow.setAttribute('transform', "translate(28, ".concat(this.getOffsetY() + 8, ") rotate(").concat(this.getDirection() === 'incoming' ? '90' : '-90', ", 3, 4)"));
        }
      }
    },
    defer: function defer(QxClass) {
      var _class;
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'energy-entity', (_class = /*#__PURE__*/function (_QxConnector) {
        "use strict";

        _inherits(_class, _QxConnector);
        var _super = _createSuper(_class);
        function _class() {
          _classCallCheck(this, _class);
          return _super.call(this, QxClass);
        }
        return _createClass(_class);
      }(QxConnector), _defineProperty(_class, "observedAttributes", ['icon', 'type', 'x', 'y', 'row', 'column', 'rowspan', 'colspan', 'direction', 'unit', 'color']), _class));
    }
  });
  cv.ui.structure.tile.components.energy.EnergyEntity.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=EnergyEntity.js.map?dt=1703705662950