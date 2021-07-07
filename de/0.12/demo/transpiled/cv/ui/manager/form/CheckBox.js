(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.CheckBox": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   *
   */
  qx.Class.define('cv.ui.manager.form.CheckBox', {
    extend: qx.ui.form.CheckBox,

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _onExecute: function _onExecute(e) {
        if (this.isTriState()) {
          // toggle between three states
          if (this.getValue() === true) {
            this.setValue(false);
          } else if (this.getValue() === false) {
            this.setValue(null);
          } else {
            this.setValue(true);
          }
        } else {
          this.toggleValue();
        }
      },
      _applyValue: function _applyValue(value, old) {
        cv.ui.manager.form.CheckBox.prototype._applyValue.base.call(this, value, old);

        if (value === null) {
          this.setLabel(" - " + this.tr("not set") + " - ");
        } else {
          this.setLabel("");
        }
      }
    }
  });
  cv.ui.manager.form.CheckBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CheckBox.js.map?dt=1625668964712