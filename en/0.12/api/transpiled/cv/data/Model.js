(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Model.js 
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
    construct: function construct() {
      this.__P_497_0 = {};
      this.__P_497_1 = {};
      this.__P_497_2 = {};
      this.__P_497_3 = {};
    },

    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      READ: 1,
      WRITE: 2,
      isReadAddress: function isReadAddress(address) {
        return !!(address.mode & cv.data.Model.READ);
      },
      isWriteAddress: function isWriteAddress(address) {
        return !!(address.mode & cv.data.Model.WRITE);
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_497_0: null,
      __P_497_1: null,
      __P_497_2: null,
      __P_497_3: null,
      getStateListener: function getStateListener() {
        return this.__P_497_1;
      },

      /**
       * Updates the state of a single address
       *
       * @param address {String} KNX-GA or openHAB item name
       * @param state {var} new state
       */
      onUpdate: function onUpdate(address, state) {
        var initial = !Object.prototype.hasOwnProperty.call(this.__P_497_0, address);
        var changed = initial || this.__P_497_0[address] !== state;
        this.__P_497_0[address] = state; // notify listeners

        if (this.__P_497_1[address]) {
          this.__P_497_1[address].forEach(function (listener) {
            listener[0].call(listener[1], address, state, initial, changed);
          }, this);
        }
      },

      /**
       * Handle incoming data from backend
       * @param data {Map} Key/value map of address/state
       */
      update: function update(data) {
        if (!data) {
          return;
        }

        var addressList = this.__P_497_2;
        Object.getOwnPropertyNames(data).forEach(function (address) {
          if (Object.prototype.hasOwnProperty.call(addressList, address)) {
            this.onUpdate(address, data[address]);
          }
        }, this);
      },

      /**
       * Get the current state of an address.
       *
       * @param address {String} KNX-GA or openHAB item name
       * @return {var}
       */
      getState: function getState(address) {
        return this.__P_497_0[address];
      },

      /**
       * Add a listener to an address, that gets called when an update for that address has been received.
       *
       * @param address {String} KNX-GA or openHAB item name
       * @param callback {Function} called on updates
       * @param context {Object} context of the callback
       */
      addUpdateListener: function addUpdateListener(address, callback, context) {
        if (!this.__P_497_1[address]) {
          this.__P_497_1[address] = [];
        }

        this.__P_497_1[address].push([callback, context]);
      },

      /**
       * Remove an address listener
       *
       * @param address {String} KNX-GA or openHAB item name
       * @param callback {Function} called on updates
       * @param context {Object} context of the callback
       */
      removeUpdateListener: function removeUpdateListener(address, callback, context) {
        if (this.__P_497_1[address]) {
          var removeIndex = -1;

          this.__P_497_1[address].some(function (entry, i) {
            if (entry[0] === callback && entry[1] === context) {
              removeIndex = i;
              return true;
            }

            return false;
          });

          if (removeIndex >= 0) {
            this.__P_497_1[address].splice(removeIndex, 1);

            if (this.__P_497_1[address].length === 0) {
              delete this.__P_497_1[address];
            }
          }
        }
      },

      /**
       * Add an Address -> Path mapping to the addressList
       * @param address {String} KNX-GA or openHAB item name
       * @param id {String} path to the widget
       */
      addAddress: function addAddress(address, id) {
        var list = this.__P_497_2;

        if (address in list) {
          list[address].push(id);
        } else {
          list[address] = [id];
        }
      },

      /**
       * Get the addresses as Array.
       * @return {Map} Address -> path mapping
       */
      getAddresses: function getAddresses() {
        return Object.keys(this.__P_497_2);
      },

      /**
       * Setter for address list.
       * @param value {Map} Address -> path mapping
       */
      setAddressList: function setAddressList(value) {
        this.__P_497_2 = value;
      },

      /**
       * Getter for the address list.
       * @return {Map} Address -> path mapping
       */
      getAddressList: function getAddressList() {
        return this.__P_497_2;
      },

      /**
       * Clears the current address list.
       * @internal
       */
      resetAddressList: function resetAddressList() {
        this.__P_497_2 = {};
      },

      /**
       * Return (reference to) widgetData object by path.
       * @param path {String} widget path
       * @return {Map} widget data map
       */
      getWidgetData: function getWidgetData(path) {
        return this.__P_497_3[path] || (this.__P_497_3[path] = {});
      },

      /**
       * Return (reference to) widget data by element
       * @param element {Element} DOM-Element to retrieve the widgetData for
       * @return {Map} widget data Map
       */
      getWidgetDataByElement: function getWidgetDataByElement(element) {
        var parent = element.parentNode;
        var path = parent.getAttribute('id');

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
      setWidgetData: function setWidgetData(path, obj) {
        var data = this.getWidgetData(path);
        Object.getOwnPropertyNames(obj).forEach(function (attrname) {
          data[attrname] = obj[attrname];
        }, this);
        return data;
      },

      /**
       * Setter for widget data model
       * @param value {Map} path -> widget data map
       */
      setWidgetDataModel: function setWidgetDataModel(value) {
        this.__P_497_3 = value;
      },

      /**
       * Getter for widget data model
       * @return {Map} path -> widget data map
       */
      getWidgetDataModel: function getWidgetDataModel() {
        return this.__P_497_3;
      },

      /**
       * Clear the widget data model.
       * @internal
       */
      resetWidgetDataModel: function resetWidgetDataModel() {
        this.__P_497_3 = {};
      },

      /**
       * Clear the model, internal method for testing purposes
       * @internal
       */
      clear: function clear() {
        this.__P_497_2 = {};
        this.__P_497_3 = {};
        this.__P_497_0 = {};
        this.__P_497_1 = {};
      }
    }
  });
  cv.data.Model.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Model.js.map?dt=1642362623549