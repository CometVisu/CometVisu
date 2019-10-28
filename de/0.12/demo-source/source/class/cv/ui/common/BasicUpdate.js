/* BasicUpdate.js 
 * 
 * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
qx.Mixin.define("cv.ui.common.BasicUpdate", {
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
      event: "changeValue"
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
      check: "String",
      init: "",
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
     * @param value {var} value to be mapped
     * @param mappingName {String} mapping name, if not set the <code>mapping</code> property value is used
     * @return {var} the mapped value
     */
    applyMapping: function (value, mappingName) {
      if (mappingName && cv.Config.hasMapping(mappingName)) {
        var mapping = cv.Config.getMapping(mappingName);

        var ret = value;
        if (mapping.formula) {
          ret = mapping.formula(ret);
        }

        var mapValue = function (v) {
          if (v === null && mapping.NULL) {
            return mapping.NULL;
          } else if (mapping[v]) {
            return mapping[v];
          } else if (mapping.range) {
            var valueFloat = parseFloat(v);
            var range = mapping.range;
            for (var min in range) {
              if (min > valueFloat) { continue; }
              if (range[min][0] < valueFloat) { continue; } // check max
              return range[min][1];
            }
          } else if (mapping["*"]) {
            // catchall mapping
            return mapping["*"];
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
    formatValueCache : null,
    /**
     * Decode the given data with the addresses transform
     *
     * @param address {String} KNX-GA or openHAB-item name
     * @param data {var} value to be decoded
     * @return {var}
     */
    applyTransform: function (address, data) {
      if (address) {
        var transform = this.getAddress()[address][0];
        // transform the raw value to a JavaScript type
        return cv.Transform.decode(transform, data);
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
    applyMapping: function (value, mappingName) {
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
    getNextMappedValue: function (value, this_map) {
      if (this_map && cv.Config.hasMapping(this_map)) {
        var keys = Object.keys(cv.Config.getMapping(this_map));
        return keys[(keys.indexOf("" + value) + 1) % keys.length];
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
    applyFormat: function (address, value) {
      if (this.getFormat()) {
        if (!this.formatValueCache) {
          this.formatValueCache = [this.getFormat()];
        }

        var argListPos = (this.getAddress() && this.getAddress()[address]) ? this.getAddress()[address][3] : 1;

        this.formatValueCache[argListPos] = value;

        return cv.util.String.sprintf.apply(this, this.formatValueCache);
      }
      return value;
    },

    /**
     * The default value handling for most of the widgets.
     * This method applies the transform, mapping, format and styling to the value.
     *
     * @param address {String} KNX-GA or openHAB item name
     * @param data {var} value to be processes
     * @return {var} the processed value
     */
    defaultValueHandling: function (address, data) {

      // #1: transform the raw value to a JavaScript type
      var value = this.applyTransform(address, data);

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
        switch (this.getAddress()[address][0]) // special case for KNX
        {
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
     * Method to handle all special cases for the value. The might come from
     * the mapping where it can be quite complex as it can contain icons.
     * value: the value that will be inserted
     * modifyFn: callback function that modifies the DOM
     *
     * @param value {var}
     * @param modifyFn {Function}
     */
    defaultValue2DOM: function (value, modifyFn) {
      var element;
      if (('string' === typeof value) || ('number' === typeof value)) {
        modifyFn(value);
      }
      else if ('function' === typeof value) {
        // thisValue(valueElement);
        this.error('typeof value === function - special case not handled anymore!');
      }
      else if (!Array.isArray(value)) {
        element = value.cloneNode();
        if (value.getContext) {
          cv.util.IconTools.fillRecoloredIcon(element);
        }
        modifyFn(element);
      } else {
        for (var i = 0; i < value.length; i++) {
          var thisValue = value[i];
          if (!thisValue) { continue; }

          if (('string' === typeof thisValue) || ('number' === typeof thisValue)) {
            modifyFn(thisValue);
          }
          else if ('function' === typeof thisValue) {
            // thisValue(valueElement);
            this.error('typeof value === function - special case not handled anymore!');
          }
          else {
            element = thisValue.cloneNode();
            if (thisValue.getContext) {
              cv.util.IconTools.fillRecoloredIcon(element);
            }
            modifyFn(element);
          }
        }
      }
    },

    /**
     * Default update function, processes the incoming value and applies it to the Dom value element.
     *
     * @param ga {String} KNX-GA or openHAB item name
     * @param data {var} the raw value from the bus
     * @param passedElement {Element?} the element to update, if not given {@link getDomElement()} is used
     * @return {var} value
     */
    defaultUpdate: function (ga, data, passedElement) {
      var element = passedElement || this.getDomElement();
      var value = this.defaultValueHandling(ga, data);

      // TODO: check if this is the right place for this
      // might be if the styling removes the align class
      if (this.getAlign()) {
        element.classList.add(this.getAlign());
      }
      var valueElement = this.getValueElement ? this.getValueElement() : element.querySelector('.value');
      valueElement.innerHTML = '';
      if (undefined !== value) {
        var self = this;
        this.defaultValue2DOM(value, function(e){self._applyValueToDom(valueElement, e);});
      }
      else {
        valueElement.appendChild(document.createTextNode('-'));
      }
      return value;
    },

    /**
     * Internal function which updates the DOM element with the given value
     * @param valueElement {Element} element to update
     * @param e {var} value to add to the element
     */
    _applyValueToDom: function(valueElement, e) {
      if (typeof e === 'number') {
        valueElement.innerText = e;
      } else {
        valueElement.innerHTML += e;
      }
    }
  }
});