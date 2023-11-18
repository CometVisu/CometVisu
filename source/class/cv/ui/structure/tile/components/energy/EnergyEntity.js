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

    _applyType(value) {
      const settings = cv.ui.structure.tile.components.energy.EnergyEntity.typeSettings[value];
      if (settings) {
        for (const attribute in settings) {
          this._element.setAttribute(attribute, settings[attribute]);
        }
      }
    },

    _init() {
      super._init();
      const element = this._element;
      if (element.hasAttribute('id')) {
        this._svg.setAttribute('id', element.getAttribute('id'));
      }
      this._autoFormat = !element.hasAttribute('format');
      this._applyUnit(this.getUnit());
      const direction = this.getDirection();
      if (direction !== 'none') {
        this._applyDirection(direction);
      }
    },

    _applyUnit(value) {
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

    _applyDirection(direction) {
      if (direction === 'none') {
        this.resetColor();
        let arrow = this._target ? this._target.querySelector('path.direction') : null;
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
        let arrow = this._target.querySelector('path.energy-direction');
        if (!arrow) {
          arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          arrow.classList.add('energy-direction');
          arrow.setAttribute('d', 'M 0 0 L 6 4 L 0 8');
          arrow.setAttribute('stroke', this.getIconColor());
          arrow.setAttribute('stroke-width', '1');
          arrow.setAttribute('fill', 'transparent');
          this._target.appendChild(arrow);
        }
        this.__updateDirectionPosition();
      }
    },

    _applyOffsetY(value) {
      super._applyOffsetY(value);
      this.__updateDirectionPosition();
    },

    _applyScale(scale) {
      super._applyScale(scale);
      this.__updateDirectionPosition();
    },

    __updateDirectionPosition() {
      let arrow = this._target.querySelector('path.energy-direction');
      if (arrow) {
        arrow.setAttribute('transform', `translate(28, ${this.getOffsetY() + 8}) rotate(${this.getDirection() === 'incoming' ? '90' : '-90'}, 3, 4)`);
      }
    }
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'energy-entity',
      class extends QxConnector {
        static observedAttributes = ['icon', 'type', 'x', 'y', 'row', 'column', 'rowspan', 'colspan', 'direction', 'unit', 'color'];
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
