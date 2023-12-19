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
  include: [
    cv.ui.structure.tile.components.energy.MEntity,
    cv.ui.structure.tile.components.energy.MConnectable
  ],

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
    _applyType(value) {
      const settings = cv.ui.structure.tile.components.energy.PowerEntity.typeSettings[value];
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
      if (!element.hasAttribute('mapping')) {
        element.setAttribute('mapping', 'tile-kilo-watts');
      }
      this._noValue = element.querySelectorAll(':scope > cv-address, :scope > cv-address-group').length === 0;
      this.setUseConnectionSum(this._noValue && this.getType() === 'house');
      if (this._noValue && this.getType() !== 'house') {
        // this has no addresses and therefore no values, we only show the icon then without circle
        for (const elem of this._svg.querySelectorAll('circle, text:not(.icon)')) {
          elem.remove();
        }
        this._iconSize = 32;
        const icon = this._svg.querySelector('text.icon');
        if (icon) {
          icon.style.fontSize = this._iconSize + 'px';
        }
      }
      window.requestAnimationFrame(() => {
        this._applyConnectTo(this.getConnectTo());
        this._applyConnectFrom(this.getConnectFrom());
      });

      this.addListener('changeValue', this._updateDirection, this);
    }
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'power-entity',
      class extends QxConnector {
        static observedAttributes = ['icon', 'type', 'stroke', 'radius', 'x', 'y', 'row', 'column', 'rowspan', 'colspan', 'foreground-color', 'connect-to', 'connect-from', 'connection-points', 'title'];
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
