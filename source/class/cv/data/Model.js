/* Model.js 
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
 * Internal Model which holds all relevant data like addresses and widgetData
 * and the states. Widget can add themselves as listeners to updates of certain addresses.
 *
 * @author Tobias Bräutigam
 * @since 0.11.0 (2017)
 */
qx.Class.define('cv.data.Model', {
  extend: qx.core.Object,
  type: 'singleton',

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function() {
    this.__states = {};
    this.__stateListeners = {};
    this.__addressList = {};
    this.__widgetData = {};
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    READ: 1,
    WRITE: 2,

    isReadAddress: function(address) {
      return !!(address.mode & cv.data.Model.READ);
    },

    isWriteAddress: function(address) {
      return !!(address.mode & cv.data.Model.WRITE);
    }
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    defaultBackendName: {
      check: 'String',
      init: 'main'
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __states : null,
    __stateListeners: null,
    __addressList : null,
    __widgetData: null,

    /**
     * @param backendName {String?} name of the backend
     * @return {Map}
     */
    getStateListener: function (backendName) {
      if (!backendName) {
        backendName = this.getDefaultBackendName();
      }
      return Object.prototype.hasOwnProperty.call(this.__stateListeners, backendName) ? this.__stateListeners : {};
    },

    /**
     * Updates the state of a single address
     *
     * @param address {String} KNX-GA or openHAB item name
     * @param state {variant} new state
     * @param backendName {String} name of the backend
     */
    onUpdate: function(address, state, backendName) {
      if (!backendName) {
        backendName = this.getDefaultBackendName();
      }
      if (!Object.prototype.hasOwnProperty.call(this.__states, backendName)) {
        this.__states[backendName] = {};
      }
      const initial = !Object.prototype.hasOwnProperty.call(this.__states[backendName], address);
      const changed = initial || this.__states[backendName][address] !== state;
      this.__states[backendName][address] = state;
      // notify listeners
      if (Object.prototype.hasOwnProperty.call(this.__stateListeners, backendName) && this.__stateListeners[backendName][address]) {
        this.__stateListeners[backendName][address].forEach(function(listener) {
          listener[0].call(listener[1], address, state, initial, changed);
        }, this);
      }
    },

    /**
     * Handle incoming data from backend
     * @param data {Map} Key/value map of address/state
     */
    update: function(data) {
      this.updateFrom(this.getDefaultBackendName(), data);
    },

    /**
     * handles incomind data from a specitic backend.
     * @param backendName {String} name of the backend
     * @param data {Map} Key/value map of address/state
     */
    updateFrom (backendName, data) {
      if (!data) {
        return;
      }
      const addressList = this.__addressList[backendName];
      Object.getOwnPropertyNames(data).forEach(function(address) {
        if (Object.prototype.hasOwnProperty.call(addressList, address)) {
          this.onUpdate(address, data[address], backendName);
        }
      }, this);
    },

    /**
     * Get the current state of an address.
     *
     * @param address {String} KNX-GA or openHAB item name
     * @param backendName {String} name of the backend
     * @return {variant}
     */
    getState: function(address, backendName) {
      if (!backendName) {
        backendName = this.getDefaultBackendName();
      }
      return Object.prototype.hasOwnProperty.call(this.__states, backendName) ? this.__states[backendName][address] : undefined;
    },

    /**
     * Add a listener to an address, that gets called when an update for that address has been received.
     *
     * @param address {String} KNX-GA or openHAB item name
     * @param callback {Function} called on updates
     * @param context {Object} context of the callback
     * @param backendName {String} name of the backend
     */
    addUpdateListener: function(address, callback, context, backendName) {
      if (!backendName) {
        backendName = this.getDefaultBackendName();
      }
      if (!Object.prototype.hasOwnProperty.call(this.__stateListeners, backendName)) {
        this.__stateListeners[backendName] = {};
      }

      if (!this.__stateListeners[backendName][address]) {
        this.__stateListeners[backendName][address] = [];
      }
      this.__stateListeners[backendName][address].push([callback, context]);
    },

    /**
     * Remove an address listener
     *
     * @param address {String} KNX-GA or openHAB item name
     * @param callback {Function} called on updates
     * @param context {Object} context of the callback
     * @param backendName {String} name of the backend
     */
    removeUpdateListener: function(address, callback, context, backendName) {
      if (!backendName) {
        backendName = this.getDefaultBackendName();
      }
      if (Object.prototype.hasOwnProperty.call(this.__stateListeners, backendName)) {
        if (this.__stateListeners[backendName][address]) {
          let removeIndex = -1;
          this.__stateListeners[backendName][address].some(function (entry, i) {
            if (entry[0] === callback && entry[1] === context) {
              removeIndex = i;
              return true;
            }
            return false;
          });
          if (removeIndex >= 0) {
            this.__stateListeners[backendName][address].splice(removeIndex, 1);
            if (this.__stateListeners[backendName][address].length === 0) {
              delete this.__stateListeners[backendName][address];
            }
          }
        }
      }
    },

    /**
     * Add an Address -> Path mapping to the addressList
     * @param address {String} KNX-GA or openHAB item name
     * @param id {String} path to the widget
     * @param backendName {String?} optional backend name for this address
     */
    addAddress: function (address, id, backendName) {
      if (!backendName) {
        backendName = this.getDefaultBackendName();
      }
      if (!Object.prototype.hasOwnProperty.call(this.__addressList, backendName)) {
        this.__addressList[backendName] = {};
      }
      const list = this.__addressList[backendName];
      if (address in list) {
        list[address].push(id);
      } else {
        list[address] = [id];
      }
    },

    /**
     * Get the addresses as Array.
     * @param backendName {String?} optional backend name for this address
     * @return {Array<String>} list of addresses
     */
    getAddresses: function (backendName) {
      if (!backendName) {
        backendName = this.getDefaultBackendName();
      }
      return Object.prototype.hasOwnProperty.call(this.__addressList, backendName) ? Object.keys(this.__addressList[backendName]) : [];
    },

    /**
     * Setter for address list.
     * @param value {Map} Address -> path mapping
     * @param backendName {String?} optional backend name for this address
     */
    setAddressList: function(value, backendName) {
      this.__addressList[backendName || this.getDefaultBackendName()] = value;
    },

    /**
     * Getter for the address list.
     * @param backendName {String?} optional backend name for this address
     * @return {Map} Address -> path mapping
     */
    getAddressList: function(backendName) {
      return this.__addressList[backendName || this.getDefaultBackendName()];
    },

    /**
     * Clears the current address list.
     * @param backendName {String?} optional backend name for this address
     * @internal
     */
    resetAddressList: function(backendName) {
      this.__addressList[backendName || this.getDefaultBackendName()] = {};
    },

    /**
     * Return (reference to) widgetData object by path.
     * @param path {String} widget path
     * @return {Map} widget data map
     */
    getWidgetData: function (path) {
      return this.__widgetData[path] || (this.__widgetData[path] = {});
    },


    /**
     * Return (reference to) widget data by element
     * @param element {Element} DOM-Element to retrieve the widgetData for
     * @return {Map} widget data Map
     */
    getWidgetDataByElement: function (element) {
      const parent = element.parentNode;
      let path = parent.getAttribute('id');

      if (path === undefined) {
        path = parent.parentNode.getAttribute('id');
      }
      return this.getWidgetData(path);
    },

    /**
     * Merge obj in the widgetData.
     *
     * @param path {String} widget path to store the data
     * @param obj {Map} data to store
     * @return {Map} updated widget data map
     */
    setWidgetData: function (path, obj) {
      const data = this.getWidgetData(path);

      Object.getOwnPropertyNames(obj).forEach(function(attrname) {
        data[attrname] = obj[attrname];
      }, this);
      return data;
    },

    /**
     * Setter for widget data model
     * @param value {Map} path -> widget data map
     */
    setWidgetDataModel: function(value) {
      this.__widgetData = value;
    },

    /**
     * Getter for widget data model
     * @return {Map} path -> widget data map
     */
    getWidgetDataModel: function() {
      return this.__widgetData;
    },

    /**
     * Clear the widget data model.
     * @internal
     */
    resetWidgetDataModel: function() {
      this.__widgetData = {};
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
