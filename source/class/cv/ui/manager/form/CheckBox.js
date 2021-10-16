/**
 *
 */
qx.Class.define("cv.ui.manager.form.CheckBox", {
  extend: qx.ui.form.CheckBox,
  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _onExecute : function(e) {
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

    _applyValue : function(value, old) {
      this.base(arguments, value, old);
      if (value === null) {
        this.setLabel(" - " + this.tr("not set") + " - ");
      } else {
        this.setLabel("");
      }
    }
  }
});
