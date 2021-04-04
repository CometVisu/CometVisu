/**
 * Option model for a VirtualComboBox / -SelectBox
 */
qx.Class.define('cv.ui.manager.form.Option', {
  extend: qx.core.Object,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (label, icon, value) {
    this.base(arguments);
    if (label) {
      this.setLabel(label);
    }
    if (icon) {
      this.setIcon(icon);
    }
    if (value) {
      this.setValue(value);
    }
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    type: {
      check: ["default", "group"],
      init: "default",
      event: "changeType"
    },
    label: {
      check: "String",
      event: "changeLabel"
    },
    icon: {
      event: "changeIcon",
      nullable: true
    },
    value: {
      check: "String",
      event: "changeValue"
    }
  }
});
