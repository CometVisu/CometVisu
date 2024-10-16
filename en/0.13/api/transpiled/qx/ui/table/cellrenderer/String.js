(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.table.cellrenderer.Conditional": {
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
       2007 OpenHex SPRL, http://www.openhex.org
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Gaetan de Menten (ged)
  
  ************************************************************************ */

  /**
   * The string data cell renderer. All it does is escape the incoming String
   * values.
   */
  qx.Class.define("qx.ui.table.cellrenderer.String", {
    extend: qx.ui.table.cellrenderer.Conditional,
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // overridden
      _getContentHtml: function _getContentHtml(cellInfo) {
        return qx.bom.String.escape(cellInfo.value || "");
      },
      // overridden
      _getCellClass: function _getCellClass(cellInfo) {
        return "qooxdoo-table-cell";
      }
    }
  });
  qx.ui.table.cellrenderer.String.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=String.js.map?dt=1729101267582