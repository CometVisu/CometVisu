/* BasicUpdate.js
 *
 * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
 * This role provides the basic update methods
 *
 */
qx.Mixin.define('cv.ui.common.BasicUpdate', {
  include: cv.ui.common.HasAddress,

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    /**
     * @type {var} the incoming value after transformation, mapping and formatting
     */
    value: {
      nullable: true,
      init: null,
      event: 'changeValue'
    },

    /**
     * @type {var} the incoming value after transformation
     */
    basicValue: {
      nullable: true,
      init: null
    },

    /**
     * Format to apply to incoming values
     */
    format: {
      check: 'String',
      init: '',
      nullable: true
    }
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    /** cache for {@link replaceMissingFormatValues}, keyed by format string and missing positions */
    __formatWithPlaceholders: {},

    /**
     * Shown instead of a value that has not been received yet. It is the same marker
     * {@link cv.util.String#sprintf} already returns when formatting fails.
     */
    MISSING_VALUE_PLACEHOLDER: '-',

    /**
     * The placeholder syntax of sprintf-js, taken from its own source (1.0.3) so that every case it
     * accepts is recognized here as well. The leading alternative keeps a literal "%%" from being
     * treated as a placeholder.
     *
     * This is a copy and can therefore drift apart when sprintf-js changes - 1.1.x for example added
     * the conversion characters "t", "T" and "v". The spec of this mixin compares the expression
     * against the parser of the installed sprintf-js, so such a change fails the tests. When that
     * happens, align this expression with the "placeholder" regex of the new version.
     */
    PLACEHOLDER_REGEX: /%%|%(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijosuxX])/,

    /**
     * A fresh global regex for the placeholder syntax. A global regex keeps its own lastIndex, so a
     * shared instance would make callers depend on each other's search progress.
     *
     * @return {RegExp} a copy of {@link cv.ui.common.BasicUpdate#PLACEHOLDER_REGEX} with the g flag
     */
    placeholderRegex() {
      return new RegExp(cv.ui.common.BasicUpdate.PLACEHOLDER_REGEX.source, 'g');
    },

    /**
     * Replace those placeholders of a format string whose value is still missing by a literal
     * placeholder text. The values of a widget's addresses arrive one by one, so a format that
     * refers to several of them would otherwise make sprintf throw until the last value was
     * received - substituting the value itself is no option, because the numeric conversions of
     * sprintf only accept real numbers.
     *
     * @param {string} format - the format string
     * @param {Array} values - the values by argument position, index 0 holds the format
     * @param {string} placeholder - text to show instead of a missing value
     * @return {string} the format string to hand to sprintf
     */
    replaceMissingFormatValues(format, values, placeholder) {
      const missing = [];
      const regex = cv.ui.common.BasicUpdate.placeholderRegex();
      let match = regex.exec(format);
      while (match !== null) {
        if (match[1] !== undefined && values[parseInt(match[1], 10)] === undefined) {
          missing.push(match[1]);
        }
        match = regex.exec(format);
      }
      if (missing.length === 0) {
        return format;
      }

      const cache = cv.ui.common.BasicUpdate.__formatWithPlaceholders;
      const key = JSON.stringify([format, placeholder, missing]);
      if (cache[key] === undefined) {
        cache[key] = format.replace(cv.ui.common.BasicUpdate.placeholderRegex(), (found, position) =>
          position !== undefined && missing.includes(position) ? placeholder : found
        );
      }
      return cache[key];
    },

    /**
     * Apply the given mapping to the value
     *
     * @param {*} value - value to be mapped
     * @param {string} mappingName - mapping name, if not set the <code>mapping</code> property value is used
     * @return {*} the mapped value
     */
    applyMapping(value, mappingName) {
      if (mappingName && cv.Config.hasMapping(mappingName)) {
        const mapping = cv.Config.getMapping(mappingName);

        let ret = value;
        if (mapping.formula) {
          ret = mapping.formula(ret);
        }

        const mapValue = function (v) {
          if (v === null && mapping.NULL) {
            return mapping.NULL;
          } else if (mapping[v]) {
            return mapping[v];
          } else if (mapping.range) {
            const valueFloat = parseFloat(v);
            const range = mapping.range;
            for (let min in range) {
              if (min > valueFloat) {
                continue;
              }
              if (range[min][0] < valueFloat) {
                continue;
              } // check max
              return range[min][1];
            }
          } else if (mapping['*']) {
            // catchall mapping
            return mapping['*'];
          }
          return v; // pass through when nothing was found
        };
        ret = mapValue(ret);
        if (!ret && mapping.defaultValue) {
          ret = mapValue(mapping.defaultValue);
        }
        if (ret !== undefined) {
          return ret;
        }
      }
      return value;
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    formatValueCache: null,
    /**
     * Decode the given data with the addresses transform
     *
     * @param address {String} KNX-GA or openHAB-item name
     * @param data {var} value to be decoded
     * @return {var}
     */
    applyTransform(address, data) {
      if (address) {
        // transform the raw value to a JavaScript type
        return cv.Transform.decode(this.getAddress()[address], data);
      }
      return data;
    },

    /**
     * Apply the given mapping to the value
     *
     * @param value {var} value to be mapped
     * @param mappingName {String?} mapping name, if not set the <code>mapping</code> property value is used
     * @return {var} the mapped value
     */
    applyMapping(value, mappingName) {
      if (!mappingName) {
        mappingName = this.getMapping();
      }
      return cv.ui.common.BasicUpdate.applyMapping(value, mappingName);
    },

    /**
     * Look up the entry for <code>value</code> in the mapping <code>this_map</code> and
     * return the next value in the list (including wrap around).
     *
     * @param value {var} value to look up
     * @param this_map {String} mapping name
     * @return {var} the next mapped value
     */
    getNextMappedValue(value, this_map) {
      if (this_map && cv.Config.hasMapping(this_map)) {
        const keys = Object.keys(cv.Config.getMapping(this_map));
        return keys[(keys.indexOf('' + value) + 1) % keys.length];
      }
      return value;
    },

    /**
     * Format the given value according to the defined format.
     * If no format is defined the value will not be changed.
     *
     * @param address {String} KNX-GA or openHAB item name
     * @param value {var} value to be formatted
     * @return {var} the formatted value
     */
    applyFormat(address, value) {
      const format = this.getFormat();
      if (format) {
        if (!this.formatValueCache) {
          this.formatValueCache = [format];
        }

        const argListPos = this.getAddress() && this.getAddress()[address] ? this.getAddress()[address].formatPos : 1;

        this.formatValueCache[argListPos] = value;

        // Show the values that are already known and a placeholder for the ones still missing. The
        // rewritten format must not replace the cached one, otherwise the next update would run the
        // replacement on an already substituted format.
        const args = this.formatValueCache.slice();
        args[0] = cv.ui.common.BasicUpdate.replaceMissingFormatValues(
          format,
          this.formatValueCache,
          cv.ui.common.BasicUpdate.MISSING_VALUE_PLACEHOLDER
        );

        return cv.util.String.sprintf.apply(this, args);
      }
      return value;
    },

    /**
     * The default value handling for most of the widgets.
     * This method applies the transform, mapping, format and styling to the value.
     *
     * @param {string} address - KNX-GA or openHAB item name
     * @param {*} data - value to be processes
     * @return {*} the processed value
     */
    defaultValueHandling(address, data) {
      // #1: transform the raw value to a JavaScript type
      let value = this.applyTransform(address, data);

      // store it to be able to suppress sending of unchanged data
      if (value !== undefined) {
        this.setBasicValue(value);
      }

      // #2: map it to a value the user wants to see
      value = this.applyMapping(value);

      // #3: format it in a way the user understands the value
      if (value !== undefined) {
        value = this.applyFormat(address, value);
        this.setValue(value);
      }

      if (value && value.constructor === Date) {
        switch (
          this.getAddress()[address].transform // special case for KNX
        ) {
          case 'DPT:10.001':
            value = value.toLocaleTimeString();
            break;
          case 'DPT:11.001':
            value = value.toLocaleDateString();
            break;
          case 'OH:datetime':
            value = value.toLocaleDateString();
            break;
          case 'OH:time':
            value = value.toLocaleTimeString();
            break;
        }
      }

      this.applyStyling(this.getBasicValue());
      // #4 will happen outside: style the value to be pretty
      return value;
    },

    /**
     * @typedef widgetValueTypes
     * @type {(string|number|Uint8Array|Map|Function)}
     */
    /**
     * Method to handle all special cases for the value. The might come from
     * the mapping where it can be quite complex as it can contain icons.
     * @param {(*|*[])} value - the value, or an array of values, that will be inserted
     * @param {HTMLElement} targetElement - the element where `value` will be added to
     * @param {Function?} modifyFn - callback function that modifies the DOM
     */
    defaultValue2DOM(value, targetElement, modifyFn = this._applyValueToDom) {
      if (Array.isArray(value)) {
        value.forEach(v => this.defaultValue2DOM(v, targetElement, modifyFn));
        return;
      }
      if (value instanceof Node) {
        let element = value.cloneNode(true);
        if (value.getContext) {
          cv.util.IconTools.fillRecoloredIcon(element);
        }
        modifyFn(targetElement, element);
      } else {
        modifyFn(targetElement, value);
      }
    },

    /**
     * Default update function, processes the incoming value and applies it to the DOM value element.
     *
     * @param {string} ga - KNX-GA or openHAB item name
     * @param {*} data - the raw value from the bus
     * @param {HTMLElement?} passedElement - the element to update, if not given {@link getDomElement()} is used
     * @return {*} - value
     */
    defaultUpdate(ga, data, passedElement) {
      const element = passedElement || this.getDomElement();
      const value = this.defaultValueHandling(ga, data);

      // TODO: check if this is the right place for this
      // might be if the styling removes the align class
      if (this.getAlign()) {
        element.classList.add(this.getAlign());
      }
      const valueElement = this.getValueElement ? this.getValueElement() : element.querySelector('.value');
      if (undefined !== value) {
        valueElement.replaceChildren(); // delete anything inside
        this.defaultValue2DOM(value, valueElement);
      } else {
        valueElement.textContent = '-';
      }
      return value;
    },

    /**
     * Internal function which updates the DOM element with the given value
     * @param {HTMLElement} targetElement - element to update
     * @param {*} value - value to add to the element
     */
    _applyValueToDom(targetElement, value) {
      if (value === undefined || value === null) {
        return;
      }
      if (value instanceof Node) {
        targetElement.appendChild(value);
      } else if (typeof value === 'number' || typeof value === 'string') {
        targetElement.appendChild(document.createTextNode(value));
      } else {
        targetElement.innerHTML += value;
      }
    }
  }
});
