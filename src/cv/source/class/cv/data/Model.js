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
    }
  }

});