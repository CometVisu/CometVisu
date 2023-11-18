/* Mapping.js
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
 * Mapping maps a value to another value that can be used to show e.g. the current state.
 * @author Tobias Bräutigam
 * @since 2022
 */
qx.Class.define('cv.ui.structure.tile.elements.Mapping', {
  extend: cv.ui.structure.tile.elements.AbstractCustomElement,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct(element) {
    super(element);
    this.__cache = {};
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __cache: null,

    _applyConnected(value, oldValue, name) {
      super._applyConnected(value, oldValue, name);
      // avoid adding styling elements here as they inherit this method but call the super method too
      if (this._element.tagName.toLowerCase().endsWith('mapping')) {
        if (value) {
          cv.Application.structureController.addMapping(this._element.getAttribute('name'), this);
        } else {
          cv.Application.structureController.removeMapping(this._element.getAttribute('name'));
        }
      }
    },

    /**
     *
     * @param val {variant}
     * @param store {Map<string, variant>?} optional stored values from other addresses
     * @param params {Array<variant>?} optional array of parameters for the mapping
     * @param emptyWhenNoMatch {Boolean} return empty string when no mapped value is found, otherwise the value is returned (default)
     * @return {string|*|string}
     */
    mapValue(val, store, params, emptyWhenNoMatch = false) {
      if (Object.prototype.hasOwnProperty.call(this.__cache, val)) {
        return this.__cache[val];
      }
      let mappedValue = emptyWhenNoMatch ? '' : '' + val;
      const exactMatch = this._element.querySelector(':scope > entry[value="' + val + '"]');

      let type = this._element.hasAttribute('type') ? this._element.getAttribute('type') : 'string';
      if (exactMatch) {
        mappedValue = this._convert(exactMatch.innerHTML.trim(), type);
        this.__cache[val] = mappedValue;
        return mappedValue;
      }
      const formula = this._element.querySelector(':scope > formula');
      if (formula) {
        if (!formula._formula) {
          let content = formula.textContent;
          formula._formula = new Function('x', 'store', 'params', 'let y;' + content + '; return y;');
        }
        mappedValue = this._convert(formula._formula(val, store, params), type);
        return mappedValue;
      }
      const entries = this._element.querySelectorAll(':scope > entry');
      let defaultValue = null;

      const mapped = Array.from(entries).some(entry => {
        let matches = false;
        let isDefaultValue = entry.hasAttribute('default') && entry.getAttribute('default') === 'true';
        if (entry.hasAttribute('value')) {
          const value = entry.getAttribute('value');
          if (value === (val ? val : 'NULL') || value === '*') {
            mappedValue = this._convert(entry.innerHTML.trim(), type);
            matches = true;
          }
          if (isDefaultValue) {
            defaultValue = this._convert(value, type);
          }
        } else if (entry.hasAttribute('range-min')) {
          const rangeMin = parseFloat(entry.getAttribute('range-min'));
          const rangeMax = entry.hasAttribute('range-max')
            ? parseFloat(entry.getAttribute('range-max'))
            : Number.POSITIVE_INFINITY;
          const floatValue = parseFloat(val);
          if (rangeMin <= floatValue && floatValue <= rangeMax) {
            mappedValue = this._convert(entry.innerHTML.trim(), type);
            matches = true;
          }
          if (isDefaultValue) {
            defaultValue = rangeMin;
          }
        }
        return matches;
      });
      if (!mapped && defaultValue !== null) {
        mappedValue = this.mapValue(defaultValue);
      }
      this.__cache[val] = mappedValue;
      return mappedValue;
    },

    _convert(value, type) {
      switch (type.toLowerCase()) {
        case 'boolean':
          return value === 'true';
        case 'integer':
          return parseInt(value);
        case 'float':
          return parseFloat(value);
        default:
          return value;
      }
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this.__cache = null;
  },

  defer(Clazz) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'mapping',
      class extends QxConnector {
        constructor() {
          super(Clazz);
        }
      }
    );
  }
});
