(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.MenuButton": {
        "construct": true,
        "require": true
      },
      "qx.ui.table.IColumnMenuButton": {
        "require": true
      },
      "qx.ui.core.Blocker": {
        "construct": true
      },
      "qx.ui.menu.Menu": {},
      "qx.ui.table.columnmenu.MenuItem": {},
      "qx.ui.menu.Button": {},
      "qx.ui.menu.Separator": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2009 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * The traditional qx.ui.menu.MenuButton to access the column visibility menu.
   */
  qx.Class.define("qx.ui.table.columnmenu.Button", {
    extend: qx.ui.form.MenuButton,
    implement: qx.ui.table.IColumnMenuButton,

    /**
     * Create a new instance of a column visibility menu button. This button
     * also contains the factory for creating each of the sub-widgets.
     */
    construct: function construct() {
      qx.ui.form.MenuButton.constructor.call(this); // add blocker

      this.__P_407_0 = new qx.ui.core.Blocker(this);
    },
    members: {
      __P_407_1: null,
      __P_407_0: null,
      // Documented in qx.ui.table.IColumnMenu
      factory: function factory(item, options) {
        switch (item) {
          case "menu":
            var menu = new qx.ui.menu.Menu();
            this.setMenu(menu);
            return menu;

          case "menu-button":
            var menuButton = new qx.ui.table.columnmenu.MenuItem(options.text);
            menuButton.setColumnVisible(options.bVisible);
            this.getMenu().add(menuButton);
            return menuButton;

          case "user-button":
            var button = new qx.ui.menu.Button(options.text);
            button.set({
              appearance: "table-column-reset-button"
            });
            return button;

          case "separator":
            return new qx.ui.menu.Separator();

          default:
            throw new Error("Unrecognized factory request: " + item);
        }
      },

      /**
       * Returns the blocker of the columnmenu button.
       *
       * @return {qx.ui.core.Blocker} the blocker.
       */
      getBlocker: function getBlocker() {
        return this.__P_407_0;
      },
      // Documented in qx.ui.table.IColumnMenu
      empty: function empty() {
        var menu = this.getMenu();
        var entries = menu.getChildren();

        for (var i = 0, l = entries.length; i < l; i++) {
          entries[0].destroy();
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__P_407_0.dispose();
    }
  });
  qx.ui.table.columnmenu.Button.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Button.js.map?dt=1625667798762