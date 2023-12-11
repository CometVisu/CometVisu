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
    this.debouncedCalc = qx.util.Function.debounce(this._updateCalculation.bind(this), 10);
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
    EVENTS
  ***********************************************
  */
  events: {
    changeValue: 'qx.event.type.Data'
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {

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
    },

    valid: {
      check: 'Boolean',
      init: true,
      apply: '_applyValid'
    },

    nonZeroValues: {
      check: 'Number',
      init: 0,
      event: 'changeNonZeroValues'
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
    __value: null,

    setValue(val) {
      if (this.__value !== val) {
        const oldValue = this.__value;
        this.__value = val;
        this.fireDataEvent('changeValue', val, oldValue);
        this._applyValue(val);
      }
    },

    getValue() {
      return this.__value;
    },

    resetValue() {
      this.__value = null;
    },

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

    _applyValid(valid) {
      this._element.setAttribute('data-valid', '' + valid);
    },

    _updateCalculation() {
      if (this.isConnected()) {
        let val = 0;
        if (this._values.length > 0) {
          this.setNonZeroValues(this._values.filter(v => v !== 0).length);
          switch (this.getOperator()) {
            case '+':
              val = this._values.reduce((accumulator, currentValue) => accumulator + currentValue, val);
              break;

            case '-':
              // subtract all from first one
              val = this._values[0];
              for (let i = 1; i < this._values.length; i++) {
                val -= this._values[i];
              }
              break;

            case '*':
              val = this._values.reduce((accumulator, currentValue) => accumulator * currentValue, val);
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
        const valid = !isNaN(val) && isFinite(val);
        this.setValid(valid);
        if (valid) {
          val *= this.getFactor();
          if (this.isRound()) {
            val = Math.round(val);
          }
          this.setValue(val);
        } else {
          this.resetValue();
        }
      }
    },

    onStateUpdate(ev) {
      const index = Array.prototype.indexOf.call(this._element.children, ev.detail.source.getElement());
      if (index >= 0) {
        this._values[index] = ev.detail.state;
        this.debouncedCalc();
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

