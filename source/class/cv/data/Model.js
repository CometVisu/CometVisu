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
  extend: cv.Object,
  type: "singleton",

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    addressList: {
      check: "Object",
      init: {}
    },

    widgetDataModel: {
      check: "Object",
      init: {}
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {

    /**
     * Add an Address -> Path mapping to the addressList
     * @param address {String} KNX-GA or openHAB item name
     * @param id {String} path to the widget
     */
    addAddress: function (address, id) {
      var list = this.getAddressList();
      if (address in list) {
        list[address].push(id);
      }
      else {
        list[address] = [id];
      }
    },

    /**
     * Get the addresses as Array
     * @returns {Array} Addresses
     */
    getAddresses: function () {
      return Object.keys(this.getAddressList());
    },

    /**
     * Return (reference to) widgetData object by path.
     * @param path {String} widget path
     */
    getWidgetData: function (path) {
      return this.getWidgetDataModel()[path] || (this.getWidgetDataModel()[path] = {});
    },


    /**
     * Return (reference to) widget data by element
     * @param element {Element} DOM-Element to retrieve the widgetData for
     * @returns {Map} widgetData Map
     */
    getWidgetDataByElement: function (element) {
      var
        parent = qx.dom.Element.getParentElement(element),
        path = qx.bom.element.Attribute.get(parent, 'id');

      if (path === undefined)
        path = qx.bom.element.Attribute.get(qx.dom.Element.getParentElement(parent), 'id');

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

      for (var attrname in obj)
        data[attrname] = obj[attrname];

      return data;
    },

    clear: function() {
      this.setAddressList({});
      this.setWidgetDataModel({});
    }
  }

});