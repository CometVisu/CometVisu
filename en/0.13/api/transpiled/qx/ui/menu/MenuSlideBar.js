(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.container.SlideBar": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.HoverButton": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The MenuSlideBar is used to scroll menus if they don't fit on the screen.
   *
   * @childControl button-forward {qx.ui.form.HoverButton} scrolls forward of hovered
   * @childControl button-backward {qx.ui.form.HoverButton} scrolls backward if hovered
   *
   * @internal
   */
  qx.Class.define("qx.ui.menu.MenuSlideBar", {
    extend: qx.ui.container.SlideBar,
    construct: function construct() {
      qx.ui.container.SlideBar.constructor.call(this, "vertical");
    },
    properties: {
      appearance: {
        refine: true,
        init: "menu-slidebar"
      }
    },
    members: {
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "button-forward":
            control = new qx.ui.form.HoverButton();
            control.addListener("execute", this._onExecuteForward, this);

            this._addAt(control, 2);

            break;

          case "button-backward":
            control = new qx.ui.form.HoverButton();
            control.addListener("execute", this._onExecuteBackward, this);

            this._addAt(control, 0);

            break;
        }

        return control || qx.ui.menu.MenuSlideBar.prototype._createChildControlImpl.base.call(this, id);
      }
    }
  });
  qx.ui.menu.MenuSlideBar.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MenuSlideBar.js.map?dt=1643061804504