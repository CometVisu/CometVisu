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
  construct: function (element) {
    this.base(arguments, element);
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
      this.base(arguments, value, oldValue, name);
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
     * @return {string|*|string}
     */
    mapValue(val, store) {
      if (Object.prototype.hasOwnProperty.call(this.__cache, val)) {
        return this.__cache[val];
      }
      let mappedValue = '' + val;
      const exactMatch = this._element.querySelector(':scope > entry[value="'+val+'"]');
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
          formula._formula = new Function('x', 'store', 'let y;' + content + '; return y;');
        }
        mappedValue = this._convert(formula._formula(val, store), type);
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
          const rangeMax = entry.hasAttribute('range-max') ? parseFloat(entry.getAttribute('range-max')) : Number.POSITIVE_INFINITY;
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
  destruct: function () {
    this.__cache = null;
  },

  defer(Clazz) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'mapping', class extends QxConnector {
      constructor() {
        super(Clazz);
      }
    });
  }
});
