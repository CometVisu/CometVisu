(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.FileSelectorButton": {
        "construct": true,
        "require": true
      },
      "qx.ui.toolbar.PartContainer": {},
      "qx.ui.core.queue.Appearance": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo
  
     https://qooxdoo.org
  
     Copyright:
       2022 OETIKER+PARTNER AG
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tobias Oetiker (oetiker)
  
  ************************************************************************ */

  /**
   * A toolbar-aware version of the {@link qx.ui.form.FileSelectorButton}.
   */

  qx.Class.define("qx.ui.toolbar.FileSelectorButton", {
    extend: qx.ui.form.FileSelectorButton,
    construct: function construct(label, icon, command) {
      qx.ui.form.FileSelectorButton.constructor.call(this, label, icon, command);
      // Toolbar buttons should not support the keyboard events
      this.removeListener("keydown", this._onKeyDown);
      this.removeListener("keyup", this._onKeyUp);
    },
    properties: {
      appearance: {
        refine: true,
        init: "toolbar-button"
      },
      show: {
        refine: true,
        init: "inherit"
      },
      focusable: {
        refine: true,
        init: false
      }
    },
    members: {
      // overridden
      _applyVisibility: function _applyVisibility(value, old) {
        qx.ui.toolbar.FileSelectorButton.superclass.prototype._applyVisibility.call(this, value, old);
        // trigger a appearance recalculation of the parent
        var parent = this.getLayoutParent();
        if (parent && parent instanceof qx.ui.toolbar.PartContainer) {
          qx.ui.core.queue.Appearance.add(parent);
        }
      }
    }
  });
  qx.ui.toolbar.FileSelectorButton.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FileSelectorButton.js.map?dt=1735383882610