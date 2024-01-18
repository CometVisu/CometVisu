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
      },
      "qx.ui.form.IListItem": {
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
    implement: [qx.ui.form.IForm, qx.ui.form.IModel, qx.ui.form.IListItem],
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * @param label {String?null} An optional label for the check box.
     */
    construct: function construct(label) {
      qx.ui.form.ToggleButton.constructor.call(this, label);

      // Initialize the checkbox to a valid value (the default is null which
      // is invalid)
      this.setValue(false);

      // ARIA attrs
      var contentEl = this.getContentElement();
      contentEl.setAttribute("role", "checkbox");
      contentEl.removeAttribute("aria-pressed");
      contentEl.setAttribute("aria-checked", false);
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
    /* eslint-disable @qooxdoo/qx/no-refs-in-members */
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
      _bindableProperties: ["enabled", "label", "toolTipText", "value", "menu"],
      // overridden
      _applyValue: function _applyValue(value, old) {
        value ? this.addState("checked") : this.removeState("checked");
        var ariaChecked = Boolean(value);
        if (this.isTriState()) {
          if (value === null) {
            ariaChecked = "mixed";
            this.addState("undetermined");
          } else if (old === null) {
            this.removeState("undetermined");
          }
        }

        // ARIA attrs
        this.getContentElement().setAttribute("aria-checked", ariaChecked);
      }
    }
  });
  qx.ui.form.CheckBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CheckBox.js.map?dt=1705596677894