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
      if (value) {
        cv.Application.structureController.addMapping(this._element.getAttribute('name'), this);
      } else {
        cv.Application.structureController.removeMapping(this._element.getAttribute('name'));
      }
    },

    mapValue(val) {
      if (Object.prototype.hasOwnProperty.call(this.__cache, val)) {
        return this.__cache[val];
      }
      let mappedValue = '' + val;
      const exactMatch = this._element.querySelector(':scope > entry[value="'+val+'"]');
      if (exactMatch) {
        mappedValue = exactMatch.innerHTML.trim();
        this.__cache[val] = mappedValue;
        return mappedValue;
      }
      const formula = this._element.querySelector(':scope > formula');
      if (formula) {
        if (!formula._formula) {
          formula._formula = new Function('x', 'let y;' + formula.textContent + '; return y;');
        }
        mappedValue = formula._formula(val);
        this.__cache[val] = mappedValue;
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
            mappedValue = entry.innerHTML.trim();
            matches = true;
          }
          if (isDefaultValue) {
            defaultValue = value;
          }
        } else if (entry.hasAttribute('range_min') && entry.hasAttribute('range_max')) {
          const rangeMin = parseFloat(entry.getAttribute('range_min'));
          const rangeMax = parseFloat(entry.getAttribute('range_max'));
          const floatValue = parseFloat(val);
          if (rangeMin <= floatValue && floatValue <= rangeMax) {
            mappedValue = entry.innerHTML.trim();
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
