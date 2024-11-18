(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.menu.CheckBox": {
        "construct": true,
        "require": true
      },
      "qx.ui.table.IColumnMenuItem": {
        "require": true
      }
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
  
  ************************************************************************ */

  /**
   * A menu item.
   */
  qx.Class.define("qx.ui.table.columnmenu.MenuItem", {
    extend: qx.ui.menu.CheckBox,
    implement: qx.ui.table.IColumnMenuItem,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * Create a new instance of an item for insertion into the table column
     * visibility menu.
     *
     * @param text {String}
     *   Text for the menu item, most typically the name of the column in the
     *   table.
     */
    construct: function construct(text) {
      qx.ui.menu.CheckBox.constructor.call(this, text); // Two way binding this.columnVisible <--> this.value

      this.bind("value", this, "columnVisible");
      this.bind("columnVisible", this, "value");
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      columnVisible: {
        check: "Boolean",
        init: true,
        event: "changeColumnVisible"
      }
    }
  });
  qx.ui.table.columnmenu.MenuItem.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MenuItem.js.map?dt=1731946693913