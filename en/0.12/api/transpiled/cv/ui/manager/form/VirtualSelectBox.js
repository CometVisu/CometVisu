(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.VirtualSelectBox": {
        "require": true
      },
      "cv.ui.manager.form.ListItem": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * qx.ui.form.VirtualSelectBox that uses cv.ui.manager.form.ListItem as 'atom' childcontrol.
   */
  qx.Class.define('cv.ui.manager.form.VirtualSelectBox', {
    extend: qx.ui.form.VirtualSelectBox,

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
          case "atom":
            control = new cv.ui.manager.form.ListItem("");
            control.setCenter(false);
            control.setAnonymous(true);

            this._add(control, {
              flex: 1
            });

            break;
        }

        return control || cv.ui.manager.form.VirtualSelectBox.prototype._createChildControlImpl.base.call(this, id, hash);
      }
    }
  });
  cv.ui.manager.form.VirtualSelectBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=VirtualSelectBox.js.map?dt=1620512020541