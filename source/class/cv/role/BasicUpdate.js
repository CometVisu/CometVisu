/* _common.js
 *
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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
 * @class cv.role.BasicUpdate
 */
qx.Mixin.define("cv.role.BasicUpdate", {

  include: [
    cv.role.HasAddress
  ],

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    value: {
      nullable: true,
      init: null
    },
    basicValue: {
      nullable: true,
      init: null
    },
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
    parse: function (xml, path) {
      var data = cv.data.Model.getInstance().getWidgetData(path);
      var value = qx.bom.element.Attribute.get(xml, 'format');
      if (value) {
        data.format = value;
      }
      // data.format = qx.bom.element.Attribute.get(xml, 'format') || "";
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    formatValueCache : null,

    applyTransform: function (address, data) {
      if (address) {
        var transform = this.getAddress()[address][0];
        // transform the raw value to a JavaScript type
        return cv.Transform.decode(transform, data);
      }
      return data;
    },

    applyTransformEncode: function (address, data) {
      if (address) {
        var transform = this.getAddress()[address][0];
        // transform the raw value to a JavaScript type
        return cv.Transform.encode(transform, data);
      }
      return data;
    },

    applyMapping: function (value) {
      var this_map = this.getMapping();
      if (this_map && cv.ui.Mappings.hasMapping(this_map)) {
        var m = cv.ui.Mappings.getMapping(this_map);

        var ret = value;
        if (m.formula) {
          ret = m.formula(ret);
        }

        var mapValue = function (v) {
          if (m[v]) {
            return m[v];
          } else if (m['range']) {
            var valueFloat = parseFloat(v);
            var range = m['range'];
            for (var min in range) {
              if (min > valueFloat) continue;
              if (range[min][0] < valueFloat) continue; // check max
              return range[min][1];
            }
          }
          return v; // pass through when nothing was found
        }
        var ret = mapValue(ret);
        if (!ret && m['defaultValue']) {
          ret = mapValue(m['defaultValue']);
        }
        if (ret !== undefined) {
          return ret;
        }
      }
      return value;
    },

    /**
     * Look up the entry for @param value in the mapping @param this_map and
     * @return the next value in the list (including wrap around).
     */
    getNextMappedValue: function (value, this_map) {
      if (this_map && cv.ui.Mappings.hasMapping(this_map)) {
        var keys = Object.keys(cv.ui.Mappings.getMapping(this_map));
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

        return sprintf.apply(this, this.formatValueCache);
      }
      return value;
    },

    defaultValueHandling: function (address, data) {

      // #1: transform the raw value to a JavaScript type
      var value = this.applyTransform(address, data);

      // store it to be able to suppress sending of unchanged data
      value !== undefined && this.setBasicValue(value);

      // #2: map it to a value the user wants to see
      value = this.applyMapping(value);

      // #3: format it in a way the user understands the value
      if (value !== undefined) {
        value = this.applyFormat(address, value);
      }

      value !== undefined && this.setValue(value);

      if (value && value.constructor == Date) {
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
     * @method defaultValue2DOM
     * @param {} value
     * @param {} modifyFn
     */
    defaultValue2DOM: function (value, modifyFn) {
      if (('string' === typeof value) || ('number' === typeof value))
        modifyFn(value);
      else if ('function' === typeof value)
      // thisValue(valueElement);
        this.error('typeof value === function - special case not handled anymore!');
      else if (!Array.isArray(value)) {
        var element = value.cloneNode();
        if (value.getContext) {
          fillRecoloredIcon(element);
        }
        modifyFn(element);
      } else {
        for (var i = 0; i < value.length; i++) {
          var thisValue = value[i];
          if (!thisValue) continue;

          if (('string' === typeof thisValue) || ('number' === typeof thisValue))
            modifyFn(thisValue);
          else if ('function' === typeof thisValue)
          // thisValue(valueElement);
            this.error('typeof value === function - special case not handled anymore!');
          else {
            var element = thisValue.cloneNode();
            if (thisValue.getContext) {
              fillRecoloredIcon(element);
            }
            modifyFn(element);
          }
        }
      }
    },

    /**
     * ga:            address
     * data:          the raw value from the bus
     * passedElement: the element to update
     * @method defaultUpdate
     * @param {} ga
     * @param {} data
     * @param {} passedElement
     * @param {} newVersion
     * @param {} path
     * @return value
     */
    defaultUpdate: function (ga, data, passedElement) {
      var element = passedElement || this.getDomElement();
      var value = this.defaultValueHandling(ga, data);

      // TODO: check if this is the right place for this
      // might be if the styling removes the align class
      if (this.getAlign())
        qx.bom.element.Class.add(element, this.getAlign());

      var valueElement = qx.bom.Selector.query('.value', element)[0];
      qx.dom.Element.empty(valueElement);
      if (undefined !== value)
        this.defaultValue2DOM(value, function (e) {
          if (qx.lang.Type.isString(e) || qx.lang.Type.isNumber(e)) {
            qx.dom.Element.insertEnd(document.createTextNode(e), valueElement);
          } else {
            qx.dom.Element.insertEnd(e, valueElement);
          }
        });
      else {
        qx.dom.Element.insertEnd(document.createTextNode('-'), valueElement);
      }
      return value;
    }
  }
});