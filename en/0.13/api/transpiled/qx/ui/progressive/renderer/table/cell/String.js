(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.progressive.renderer.table.cell.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.bom.String": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2008 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * Table Cell Renderer for Progressive.
   */
  qx.Class.define("qx.ui.progressive.renderer.table.cell.String", {
    extend: qx.ui.progressive.renderer.table.cell.Abstract,

    /**
     */
    construct: function construct() {
      qx.ui.progressive.renderer.table.cell.Abstract.constructor.call(this);
    },
    members: {
      // overridden
      _getContentHtml: function _getContentHtml(cellInfo) {
        return qx.bom.String.escape(cellInfo.cellData);
      }
    }
  });
  qx.ui.progressive.renderer.table.cell.String.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=String.js.map?dt=1664609815609