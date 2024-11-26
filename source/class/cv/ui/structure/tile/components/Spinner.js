/* Spinner.js
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
 * Shows a number value that can be increased and decreased by a defined step width.
 */
qx.Class.define('cv.ui.structure.tile.components.Spinner', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    stepWidth: {
      check: 'Number',
      init: 1.0
    },

    mode: {
      check: ['relative', 'absolute'],
      init: 'absolute'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _init() {
      super._init();
      const element = this._element;
      if (element.hasAttribute('step-width')) {
        this.setStepWidth(parseFloat(element.getAttribute('step-width')));
      }
      if (element.hasAttribute('mode')) {
        this.setMode(element.getAttribute('mode'));
      }
      // init components
      let valueElement = element.querySelector(':scope > .value');
      if (!valueElement) {
        valueElement = document.createElement('label');
        valueElement.classList.add('value');
        valueElement.classList.add('primary');
        element.appendChild(valueElement);
      }
      // add increase / decrease buttons
      const decrease = document.createElement('div');
      decrease.classList.add('clickable');
      decrease.classList.add('left');
      const decreaseIcon = document.createElement('cv-icon');
      decreaseIcon.classList.add('ri-arrow-down-s-line');
      decrease.addEventListener('click', (ev) => this.onDecrease(ev));
      decrease.appendChild(decreaseIcon);
      element.insertBefore(decrease, valueElement);

      const increase = document.createElement('div');
      increase.classList.add('clickable');
      increase.classList.add('right');
      const increaseIcon = document.createElement('cv-icon');
      increaseIcon.classList.add('ri-arrow-up-s-line');
      increase.appendChild(increaseIcon);
      increase.addEventListener('click', (ev) => this.onIncrease(ev));
      element.appendChild(increase);
    },

    onDecrease(ev) {
      const value = this.getMode() === 'absolute' ? this.getValue() - this.getStepWidth() : this.getStepWidth() * -1;
      ev.stopPropagation();
      this.__sendValue(value, 'decrease');
    },

    onIncrease(ev) {
      const value = this.getMode() === 'absolute' ? this.getValue() + this.getStepWidth() : this.getStepWidth();
      ev.stopPropagation();
      this.__sendValue(value, 'increase');
    },

    _updateValue(mappedValue) {
      const target = this._element.querySelector('.value');
      if (target) {
        target.innerHTML = mappedValue;
      }
    },

    __sendValue(value, on) {
      const ev = new CustomEvent('sendState', {
        detail: {
          value: value,
          source: this
        }
      });

      this._writeAddresses
        .filter(addr => !addr.hasAttribute('on') || addr.getAttribute('on') === on)
        .forEach(address => address.dispatchEvent(ev));
    }
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'spinner',
      class extends QxConnector {
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
