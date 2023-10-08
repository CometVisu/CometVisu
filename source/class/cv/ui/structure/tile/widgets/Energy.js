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
 * Energy management widget.
 *
 * @author Tobias Bräutigam
 * @since 2023
 */
qx.Class.define('cv.ui.structure.tile.widgets.Energy', {
  extend: cv.ui.structure.tile.widgets.Tile,

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    SVG: null,
    _ns: null,
    __styleClasses: null,

    _init() {
      super._init();
      this.__styleClasses = {};

      const ns = this._ns = 'http://www.w3.org/2000/svg';
      const svg = this.SVG = document.createElementNS(ns, 'svg');
      this._element.appendChild(svg);

      // create arrow markers
      const defs = document.createElementNS(ns, 'defs');

      // define paths for re-use
      const arrowPath = document.createElementNS(ns, 'path');
      arrowPath.setAttribute('id', 'h-arrow-path');
      arrowPath.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
      defs.appendChild(arrowPath);
      const vertArrowPath = document.createElementNS(ns, 'path');
      vertArrowPath.setAttribute('id', 'v-arrow-path');
      vertArrowPath.setAttribute('d', 'M 0 0 L 10 0 L 5 10 z');
      defs.appendChild(vertArrowPath);

      const arrow = document.createElementNS(ns, 'marker');
      arrow.setAttribute('id', 'arrow');
      arrow.setAttribute('viewBox', '0 0 10 10');
      arrow.setAttribute('refX', '10');
      arrow.setAttribute('refY', '5');
      arrow.setAttribute('markerWidth', '6');
      arrow.setAttribute('markerHeight', '6');
      arrow.setAttribute('fill', 'var(--borderColor)');
      arrow.setAttribute('orient', 'auto-start-reverse');
      let use = document.createElementNS(ns, 'use');
      use.setAttribute('href', '#h-arrow-path');
      arrow.appendChild(use);
      defs.appendChild(arrow);

      const vertArrow = document.createElementNS(ns, 'marker');
      vertArrow.setAttribute('id', 'vertical-arrow');
      vertArrow.setAttribute('viewBox', '0 0 10 10');
      vertArrow.setAttribute('refX', '5');
      vertArrow.setAttribute('refY', '10');
      vertArrow.setAttribute('markerWidth', '6');
      vertArrow.setAttribute('markerHeight', '6');
      vertArrow.setAttribute('fill', 'var(--borderColor)');
      vertArrow.setAttribute('orient', 'auto-start-reverse');
      use = document.createElementNS(ns, 'use');
      use.setAttribute('href', '#v-arrow-path');
      vertArrow.appendChild(use);
      defs.appendChild(vertArrow);

      svg.appendChild(defs);

      let hasGrid = false;
      let hasBattery = false;
      let hasPv = false;
      let hasCharger = false;
      let hasHeatpump = false;
      let hasConsumers = false;

      const valueRadius = 28;
      const houseSize = 64;
      const connects = [];

      // centered house icon
      const house = document.createElementNS(ns, "foreignObject");
      house.setAttribute('width', `${houseSize}px`);
      house.setAttribute('height', `${houseSize}px`);
      house.setAttribute('x', `calc(50% - ${houseSize/2}px)`);
      house.setAttribute('y', `calc(50% - ${houseSize/2}px)`);
      const houseIcon = document.createElement('cv-icon');
      houseIcon.style.fontSize = `${houseSize}px`;
      houseIcon.setAttribute('class', 'knxuf-control_building_empty');
      house.appendChild(houseIcon);
      svg.appendChild(house);

      // pv
      const pvPowerTotalAddress =  this._element.querySelector(':scope > cv-address[entity="pv"]');
      if (pvPowerTotalAddress) {
        const valueElement = this.__createValueElement('knxuf-weather_sun', valueRadius, [pvPowerTotalAddress]);
        valueElement.appendChild(pvPowerTotalAddress);
        valueElement.setAttribute('styling', 'tile-pv-power');
        valueElement.setAttribute('x', `calc(50% - ${valueRadius}px)`);
        hasPv = true;
        this._element.appendChild(valueElement);
        connects.push([valueElement._instance.getSvg(), house, '#pv-connection', valueElement._instance]);

        valueElement._instance.addListener('changeValue', this._onPvPowerValueChanged, this);
      }

      // battery
      const batAddresses =  this._element.querySelectorAll(':scope > cv-address[entity="battery"]');
      if (batAddresses.length > 0) {
        const valueElement = this.__createValueElement('knxuf-measure_battery_100', valueRadius, batAddresses);
        valueElement.setAttribute('styling', 'tile-battery-power');
        valueElement.setAttribute('foreground-color', 'var(--batteryConsumeColor)');
        valueElement.setAttribute('y', `calc(50% - ${valueRadius}px)`);
        valueElement.setAttribute('x', `8px`);
        hasBattery = true;
        this._element.appendChild(valueElement);
        connects.push([valueElement._instance.getSvg(), house, '#battery-connection', valueElement._instance]);

        valueElement._instance.addListener('changeValue', this._onBatteryPowerValueChanged, this);

        // listen to
        const socAddress = Array.from(batAddresses).find(a => a.getAttribute('type') === 'soc');
        if (socAddress) {
          socAddress.addEventListener('stateUpdate', ev => {
            const quarter = Math.ceil(ev.detail.state / 25) * 25;
            valueElement.setAttribute('icon', `knxuf-measure_battery_${quarter}`);
          });
        }
      }

      // grid
      const gridAddresses =  this._element.querySelectorAll(':scope > cv-address[entity="grid"]');
      if (gridAddresses.length > 0) {
        const valueElement = this.__createValueElement('knxuf-scene_power_grid', valueRadius, gridAddresses);
        valueElement.setAttribute('styling', 'tile-grid-power');
        valueElement.setAttribute('y', `calc(50% - ${valueRadius}px)`);
        valueElement.setAttribute('x', `calc(100% - ${valueRadius*2 + 8}px)`);
        hasGrid = true;
        this._element.appendChild(valueElement);
        connects.push([house, valueElement._instance.getSvg(), '#grid-connection', valueElement._instance]);

        valueElement._instance.addListener('changeValue', this._onGridPowerValueChanged, this);
        valueElement._instance.addListener('changeStyleClass', ev => {
          this._copyStyleClass('#grid-connection', ev.getData(), ev.getOldData());
        });
      }

      setTimeout(() => {
        for (const [source, target, id, widget] of connects) {
          this._connect(svg, source, target, id);
          this._copyStyleClass(id, widget.getStyleClass());
        }
      }, 1000);

      // TODO: consumers
    },

    _copyStyleClass(connectionId, newClass, oldClass) {
      const connection = this.SVG.querySelector(connectionId);
      if (connection) {
        if (oldClass && connection.classList.contains(oldClass)) {
          connection.classList.remove(oldClass);
        }
        if (newClass) {
          connection.classList.add(newClass);
        }
        this.__styleClasses[connectionId] = newClass;
      }
    },

    _onGridPowerValueChanged(ev) {
      this._handleDirectionChanges('#grid-connection', ev.getData());
    },

    _onBatteryPowerValueChanged(ev) {
      this._handleDirectionChanges('#battery-connection', ev.getData(), true);
    },

    _onPvPowerValueChanged(ev) {
      this._handleDirectionChanges('#pv-connection', ev.getData(), true, 'vertical-arrow');
    },

    _handleDirectionChanges(connectionId, value, inverse = false, arrowId = 'arrow') {
      const connection = this.SVG.querySelector(connectionId);
      if (connection) {
        const markerId = this.__getMarkerId(arrowId, this.__styleClasses[connectionId]);

        if ((value < 0 && !inverse) || (inverse && value > 0)) {
          connection.setAttribute('marker-end', `url(#${markerId})`);
          connection.removeAttribute('marker-start');
        } else if ((!inverse && value > 0) || (inverse && value < 0)) {
          connection.setAttribute('marker-start', `url(#${markerId})`);
          connection.removeAttribute('marker-end');
        } else {
          connection.removeAttribute('marker-start');
          connection.removeAttribute('marker-end');
        }
      }
    },

    __getMarkerId(arrowId, styleClass) {
      if (styleClass) {
        const id = `${arrowId}-${styleClass}`;
        // check if we have a marker with this ID
        let marker = this.SVG.querySelector(`#${id}`);
        if (!marker) {
          const baseMarker = this.SVG.querySelector(`#${arrowId}`);
          const newMarker = baseMarker.cloneNode(true);
          newMarker.removeAttribute('fill');
          newMarker.setAttribute('class', 'connection ' + styleClass);
          newMarker.setAttribute('id', id);
          this.SVG.querySelector('defs').appendChild(newMarker);
        }
        return id;
      }
      return arrowId;
    },

    _connect(svg, source, target, id) {
      let path = svg.querySelector(id);
      if (!path) {
        path = document.createElementNS(this._ns, 'path');
        path.setAttribute('id', id.substring(1));
        path.setAttribute('stroke', 'var(--borderColor)');
        path.setAttribute('fill', 'transparent');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('class', 'connection');
      }
      let sourceCoord = {
        x: source.x.baseVal.value,
        y: source.y.baseVal.value,
        width: source.width.baseVal.value,
        height: source.width.baseVal.value
      };
      let targetCoord = {
        x: target.x.baseVal.value,
        y: target.y.baseVal.value,
        width: target.width.baseVal.value,
        height: target.width.baseVal.value,
      }

      let startX = 0;
      let startY = 0;
      let endX = 0;
      let endY = 0;

      if (Math.abs(sourceCoord.x - targetCoord.x) < Math.abs(sourceCoord.y - targetCoord.y)) {
        startX = sourceCoord.x + sourceCoord.width / 2;
        startY = sourceCoord.y + sourceCoord.height;
        endX = targetCoord.x + targetCoord.width / 2;
        endY = targetCoord.y;
      } else {
        startX = sourceCoord.x + sourceCoord.width;
        startY = sourceCoord.y + sourceCoord.height / 2;
        endX = targetCoord.x;
        endY = targetCoord.y + targetCoord.height / 2;
      }

      svg.appendChild(path);
      this.drawPath(path, startX, startY, endX, endY);
    },

    drawPath(path, startX, startY, endX, endY) {
      const deltaX = (endX - startX) * 0.15;
      const deltaY = (endY - startY) * 0.15;
      // for further calculations which ever is the shortest distance
      const delta  =  deltaY < Math.abs(deltaX) ? deltaY : Math.abs(deltaX);

      let arc1 = 0;
      let arc2 = 1;
      if (startX > endX) {
        arc1 = 1;
        arc2 = 0;
      }

      // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end
      path.setAttribute("d",  "M"  + startX + " " + startY +
        " V" + (startY + delta) +
        " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (startX + delta*Math.sign(deltaX)) + " " + (startY + 2*delta) +
        " H" + (endX - delta*Math.sign(deltaX)) +
        " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + endX + " " + (startY + 3*delta) +
        " V" + endY );
    },

    __createValueElement(icon, radius, addresses) {
      const valueElement = document.createElement('cv-svg-value');
      valueElement.setAttribute('icon', icon);
      valueElement.setAttribute('mapping', 'tile-kilo-watts');
      valueElement.setAttribute('radius', '' + radius);
      for (const a of addresses) {
        a.removeAttribute('slot');
        valueElement.appendChild(a);
      }
      return valueElement;
    }
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'energy',
      class extends QxConnector {
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
