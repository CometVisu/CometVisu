/**
 *
 */
qx.Class.define("cv.ui.manager.model.config.Section", {
  extend: qx.core.Object,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (name) {
    this.base(arguments);
    this.setName(name);
    this.initOptions(new qx.data.Array());
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    name: {
      check: "String",
      event: "changeName",
      init: ""
    },

    options: {
      check: "qx.data.Array",
      deferredInit: true,
      event: "changeOptions"
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    addOption: function(key, value) {
      var options = this.getOptions();
      var found = options.some(function (option) {
        if (option.getKey() === key) {
          option.setValue(value);
        }
      }, this);
      if (!found) {
        options.push(new cv.ui.manager.model.config.Option(key, value));
      }
    }
  }
});
