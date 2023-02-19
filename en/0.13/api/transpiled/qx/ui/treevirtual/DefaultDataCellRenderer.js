(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.table.cellrenderer.Default": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * The default data cell renderer for a virtual tree (columns other than the
   * tree column)
   */
  qx.Class.define("qx.ui.treevirtual.DefaultDataCellRenderer", {
    extend: qx.ui.table.cellrenderer.Default
  });
  qx.ui.treevirtual.DefaultDataCellRenderer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DefaultDataCellRenderer.js.map?dt=1676809330409