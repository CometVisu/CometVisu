/**
 * Model
 *
 * @author tobiasb
 * @since 2016
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

    widgetData: {
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

    addAddress: function (address, id) {
      var list = this.getAddressList();
      if (address in list) {
        list[address].push(id);
      }
      else {
        list[address] = [id];
      }
    },

    getAddresses: function () {
      return Object.keys(this.getAddressList());
    },

    /**
     * Return (reference to) widgetData object by path.
     */
    getWidgetData: function (path) {
      return this.widgetData[path] || (this.widgetData[path] = {});
    },


    /**
     * Return (reference to) widget data by element
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
     */
    setWidgetData: function (path, obj) {
      var data = this.getWidgetData(path);

      for (var attrname in obj)
        data[attrname] = obj[attrname];

      return data;
    }
  }

});