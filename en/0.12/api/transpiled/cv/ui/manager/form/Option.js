(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

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
    construct: function construct(label, icon, value, hints) {
      qx.core.Object.constructor.call(this);

      if (label) {
        this.setLabel(label);
      }

      if (icon) {
        this.setIcon(icon);
      }

      if (value) {
        this.setValue(value);
      }

      if (hints) {
        this.setHints(hints);
      }
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      type: {
        check: ["default", "group", "state", "error"],
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
        event: "changeValue",
        nullable: true
      },
      hints: {
        check: 'Object',
        nullable: true
      }
    }
  });
  cv.ui.manager.form.Option.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Option.js.map?dt=1620512020395