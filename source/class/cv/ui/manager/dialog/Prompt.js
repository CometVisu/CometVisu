/**
 *
 */
qx.Class.define("cv.ui.manager.dialog.Prompt", {
  extend: qxl.dialog.Prompt,
  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _createWidgetContent: function() {
      this.base(arguments);
      this._textField.setLiveUpdate(true);
    }
  }
});
