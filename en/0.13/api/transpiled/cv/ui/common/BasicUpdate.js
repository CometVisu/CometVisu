(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.common.HasAddress": {
        "require": true
      },
      "cv.Config": {},
      "cv.Transform": {},
      "cv.util.String": {},
      "cv.util.IconTools": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* BasicUpdate.js 
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
      /**
       * Apply the given mapping to the value
       *
       * @param {*} value - value to be mapped
       * @param {string} mappingName - mapping name, if not set the <code>mapping</code> property value is used
       * @return {*} the mapped value
       */
      applyMapping: function applyMapping(value, mappingName) {
        if (mappingName && cv.Config.hasMapping(mappingName)) {
          var mapping = cv.Config.getMapping(mappingName);
          var ret = value;

          if (mapping.formula) {
            ret = mapping.formula(ret);
          }

          var mapValue = function mapValue(v) {
            if (v === null && mapping.NULL) {
              return mapping.NULL;
            } else if (mapping[v]) {
              return mapping[v];
            } else if (mapping.range) {
              var valueFloat = parseFloat(v);
              var range = mapping.range;

              for (var min in range) {
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
      applyTransform: function applyTransform(address, data) {
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
      applyMapping: function applyMapping(value, mappingName) {
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
      getNextMappedValue: function getNextMappedValue(value, this_map) {
        if (this_map && cv.Config.hasMapping(this_map)) {
          var keys = Object.keys(cv.Config.getMapping(this_map));
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
      applyFormat: function applyFormat(address, value) {
        if (this.getFormat()) {
          if (!this.formatValueCache) {
            this.formatValueCache = [this.getFormat()];
          }

          var argListPos = this.getAddress() && this.getAddress()[address] ? this.getAddress()[address].formatPos : 1;
          this.formatValueCache[argListPos] = value;
          return cv.util.String.sprintf.apply(this, this.formatValueCache);
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
      defaultValueHandling: function defaultValueHandling(address, data) {
        // #1: transform the raw value to a JavaScript type
        var value = this.applyTransform(address, data); // store it to be able to suppress sending of unchanged data

        if (value !== undefined) {
          this.setBasicValue(value);
        } // #2: map it to a value the user wants to see


        value = this.applyMapping(value); // #3: format it in a way the user understands the value

        if (value !== undefined) {
          value = this.applyFormat(address, value);
          this.setValue(value);
        }

        if (value && value.constructor === Date) {
          switch (this.getAddress()[address].transform) {
            // special case for KNX
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

        this.applyStyling(this.getBasicValue()); // #4 will happen outside: style the value to be pretty

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
      defaultValue2DOM: function defaultValue2DOM(value, targetElement) {
        var _this = this;

        var modifyFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this._applyValueToDom;

        if (Array.isArray(value)) {
          value.forEach(function (v) {
            return _this.defaultValue2DOM(v, targetElement, modifyFn);
          });
          return;
        }

        if (value instanceof Node) {
          var element = value.cloneNode(true);

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
      defaultUpdate: function defaultUpdate(ga, data, passedElement) {
        var element = passedElement || this.getDomElement();
        var value = this.defaultValueHandling(ga, data); // TODO: check if this is the right place for this
        // might be if the styling removes the align class

        if (this.getAlign()) {
          element.classList.add(this.getAlign());
        }

        var valueElement = this.getValueElement ? this.getValueElement() : element.querySelector('.value');

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
      _applyValueToDom: function _applyValueToDom(targetElement, value) {
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
  cv.ui.common.BasicUpdate.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BasicUpdate.js.map?dt=1664784655137