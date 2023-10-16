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
 * Aggregates values from sub-elements like other cv.ui.structure.tile.elements.AddressGroups
 * or cv.ui.structure.tile.elements.Address.
 *
 *  @author Tobias Bräutigam
 *  @since 2023
 */
qx.Class.define('cv.ui.structure.tile.elements.AddressGroup', {
  extend: cv.ui.structure.tile.elements.Address,
  include: cv.ui.structure.tile.MStringTransforms,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct(element) {
    super(element);
    if (!element.hasAttribute('id')) {
      element.setAttribute('id', `address-group_${cv.ui.structure.tile.elements.AddressGroup.C++}`);
    }
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    C: 0
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    value: {
      apply: '_applyValue',
      init: null,
      event: 'changeValue'
    },

    operator: {
      check: ['+', '-', '/', '*'],
      init: '+',
      apply: '_updateCalculation'
    },

    round: {
      check: 'Boolean',
      init: false,
      transform: '_parseBoolean'
    },

    factor: {
      check: 'Number',
      init: 1,
      transform: '_parseFloat'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _i: null,
    _values: null,

    getAddress() {
      return this._element.getAttribute('id');
    },

    _init() {
      const element = this._element;
      this._values = new Array(element.children.length).fill(0);
      this._stateUpdateTarget = element.parentElement;
      element.addEventListener('stateUpdate', ev => {
        this.onStateUpdate(ev);
        // cancel event here
        ev.stopPropagation();
      });
    },

    _applyValue(value) {
      if (this.isConnected()) {
        this._element.setAttribute('data-value', '' + value);
        this.fireStateUpdate(this.getAddress(), value);
      }
    },

    _updateCalculation() {
      if (this.isConnected()) {
        let val = 0;
        if (this._values.length > 0) {
          switch (this.getOperator()) {
            case '+':
              val = this._values.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
              }, val);
              break;

            case '-':
              // subtract all from first one
              val = this._values[0];
              for (let i = 1; i < this._values.length; i++) {
                val -= this._values[i];
              }
              break;

            case '*':
              val = this._values.reduce((accumulator, currentValue) => {
                return accumulator * currentValue;
              }, val);
              break;

            case '/':
              // divide all from first one
              val = this._values[0];
              for (let i = 1; i < this._values.length; i++) {
                val /= this._values[i];
              }
              break;
          }
        }
        val *= this.getFactor();
        if (this.isRound()) {
          val = Math.round(val);
        }
        this.setValue(val);
      }
    },

    onStateUpdate(ev) {
      const index = Array.prototype.indexOf.call(this._element.children, ev.detail.source.getElement());
      if (index >= 0) {
        this._values[index] = ev.detail.state;
        this._updateCalculation();
      }
    }
  },

  defer(Clazz) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'address-group',
      class extends QxConnector {
        static observedAttributes = ['round', 'operator', 'factor'];
        constructor() {
          super(Clazz);
        }
      }
    );
  }
});

