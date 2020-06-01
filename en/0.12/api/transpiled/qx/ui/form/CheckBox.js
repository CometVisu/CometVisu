(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.ToggleButton": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.MForm": {
        "require": true
      },
      "qx.ui.form.MModelProperty": {
        "require": true
      },
      "qx.ui.form.IForm": {
        "require": true
      },
      "qx.ui.form.IModel": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
       * Andreas Ecker (ecker)
  
  ************************************************************************ */

  /**
   * A check box widget with an optional label.
   */
  qx.Class.define("qx.ui.form.CheckBox", {
    extend: qx.ui.form.ToggleButton,
    include: [qx.ui.form.MForm, qx.ui.form.MModelProperty],
    implement: [qx.ui.form.IForm, qx.ui.form.IModel],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param label {String?null} An optional label for the check box.
     */
    construct: function construct(label) {
      qx.ui.form.ToggleButton.constructor.call(this, label); // Initialize the checkbox to a valid value (the default is null which
      // is invalid)

      this.setValue(false);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "checkbox"
      },
      // overridden
      allowGrowX: {
        refine: true,
        init: false
      }
    },
    members: {
      /**
       * @lint ignoreReferenceField(_forwardStates)
       */
      _forwardStates: {
        invalid: true,
        focused: true,
        undetermined: true,
        checked: true,
        hovered: true
      },

      /**
       * overridden (from MExecutable to keep the icon out of the binding)
       * @lint ignoreReferenceField(_bindableProperties)
       */
      _bindableProperties: ["enabled", "label", "toolTipText", "value", "menu"]
    }
  });
  qx.ui.form.CheckBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CheckBox.js.map?dt=1591013419779