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
    CONSTRUCTOR
  ******************************************************
  */
  construct: function() {
    this.setAddresses(new qx.data.Array());
  },


  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    addresses: {
      check: "qx.data.Array"
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    addAddress: function (address, id) {
      if (address in this.getAddresses()) {
        this.getAddresses()[address].push(id);
      }
      else {
        this.getAddresses()[address] = [id];
      }
    },

    getAddresses: function () {
      return Object.keys(this.getAddresses());
    }
  }

});