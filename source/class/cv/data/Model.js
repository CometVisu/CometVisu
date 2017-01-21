/* Model.js 
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
 * Internal Model which holds all relevant data like addresses and widgetData
 *
 * @author Tobias Bräutigam
 * @since 0.10.0 (2016)
 */
qx.Class.define('cv.data.Model', {
  extend: qx.core.Object,
  type: "singleton",

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __states : {},
    __stateListeners: {},
    __addressList : {},
    __widgetData: {},

    onUpdate: function(address, state) {
      this.__states[address] = state;
      // notify listeners
      if (this.__stateListeners[address]) {
        this.__stateListeners[address].forEach(function(listener) {
          listener[0].call(listener[1], address, state);
        }, this);
      }
    },

    /**
     * Handle incoming data from backend
     * @param data {Map} Key/value map
     */
    update: function(data) {
      var addressList = this.__addressList;
      Object.getOwnPropertyNames(data).forEach(function(address) {
        if (addressList.hasOwnProperty(address)) {
          this.onUpdate(address, data[address]);
        }
      }, this);
    },

    getState: function(address) {
      return this.__states[address];
    },

    addUpdateListener: function(address, callback, context) {
      if (!this.__stateListeners[address]) {
        this.__stateListeners[address] = [];
      }
      this.__stateListeners[address].push([callback, context]);
    },

    /**
     * Add an Address -> Path mapping to the addressList
     * @param address {String} KNX-GA or openHAB item name
     * @param id {String} path to the widget
     */
    addAddress: function (address, id) {
      var list = this.__addressList;
      if (address in list) {
        list[address].push(id);
      }
      else {
        list[address] = [id];
      }
    },

    /**
     * Get the addresses as Array
     * @return {Array} Addresses
     */
    getAddresses: function () {
      return Object.keys(this.__addressList);
    },

    setAddressList: function(value) {
      this.__addressList = value;
    },

    getAddressList: function() {
      return this.__addressList;
    },

    /**
     * Return (reference to) widgetData object by path.
     * @param path {String} widget path
     */
    getWidgetData: function (path) {
      return this.__widgetData[path] || (this.__widgetData[path] = {});
    },


    /**
     * Return (reference to) widget data by element
     * @param element {Element} DOM-Element to retrieve the widgetData for
     * @return {Map} widgetData Map
     */
    getWidgetDataByElement: function (element) {
      var
        parent = qx.dom.Element.getParentElement(element),
        path = qx.bom.element.Attribute.get(parent, 'id');

      if (path === undefined) {
        path = qx.bom.element.Attribute.get(qx.dom.Element.getParentElement(parent), 'id');
      }
      return this.getWidgetData(path);
    },

    /**
     * Merge obj in the widgetData.
     *
     * @param path {String} widget path to store the data
     * @param obj {Map} data to store
     */
    setWidgetData: function (path, obj) {
      var data = this.getWidgetData(path);

      Object.getOwnPropertyNames(obj).forEach(function(attrname) {
        data[attrname] = obj[attrname];
      }, this);
      return data;
    },

    setWidgetDataModel: function(value) {
      this.__widgetData = value;
    },

    getWidgetDataModel: function() {
      return this.__widgetData;
    },

    /**
     * Clear the model, internal method for testing purposes
     * @internal
     */
    clear: function() {
      this.__addressList = {};
      this.__widgetData = {};
      this.__states = {};
      this.__stateListeners = {};
    }
  }

});