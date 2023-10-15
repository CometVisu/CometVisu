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
 * Mixin for all Entity-Classes.
 *
 * @since 2023
 * @author Tobias Bräutigam
 */
qx.Mixin.define('cv.ui.structure.tile.components.energy.MEntity', {
  include: cv.ui.structure.tile.MStringTransforms,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    type: {
      check: ['pv', 'battery', 'grid', 'house', 'charger', 'heatpump', 'consumer'],
      nullable: true,
      apply: '_applyType'
    },

    row: {
      check: 'Number',
      init: 0,
      apply: '_applyPosition',
      transform: '_parseFloat'
    },

    column: {
      check: 'Number',
      init: 0,
      apply: '_applyPosition',
      transform: '_parseFloat'
    },

    foregroundColor: {
      check: 'String',
      nullable: true,
      apply: '_applyForegroundColor'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _noValue: null,

    hasNoValue() {
      return this._noValue;
    },

    preMappingHook(value) {
      // we only show positive values here, power flow is shown via connection direction
      return Math.abs(value);
    },

    _applyForegroundColor(value) {
      const bar = this._svg ? this._svg.querySelector('circle.bar') : null;
      if (bar) {
        bar.style.stroke = value;
      }
    },

    _applyPosition() {
      if (this._parentGridLayout && this._svg) {
        this._parentGridLayout.layout(this._svg, this.getRow(), this.getColumn());
      }
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this._disposeObjects('_connectorTo', '_connectorFrom');
    this._connections.clear();
    this._inverseConnections.clear();
  }
});
