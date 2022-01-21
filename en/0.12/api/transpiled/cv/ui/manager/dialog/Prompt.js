(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.dialog.Prompt": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   *
   */
  qx.Class.define('cv.ui.manager.dialog.Prompt', {
    extend: qxl.dialog.Prompt,

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _createWidgetContent: function _createWidgetContent() {
        cv.ui.manager.dialog.Prompt.prototype._createWidgetContent.base.call(this);

        this._textField.setLiveUpdate(true);
      }
    }
  });
  cv.ui.manager.dialog.Prompt.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Prompt.js.map?dt=1642804661523