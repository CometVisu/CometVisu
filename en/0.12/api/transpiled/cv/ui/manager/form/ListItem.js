(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.ListItem": {
        "require": true
      },
      "cv.ui.manager.basic.Image": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * ListItem that uses cv.ui.manager.basic.Image
   */
  qx.Class.define('cv.ui.manager.form.ListItem', {
    extend: qx.ui.form.ListItem,

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "icon":
            control = new cv.ui.manager.basic.Image(this.getIcon());
            control.setAnonymous(true);

            this._addAt(control, 0);

            if (this.getIcon() == null || this.getShow() === "label") {
              control.exclude();
            }

            break;
        }

        return control || cv.ui.manager.form.ListItem.prototype._createChildControlImpl.base.call(this, id);
      }
    }
  });
  cv.ui.manager.form.ListItem.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ListItem.js.map?dt=1620070362918