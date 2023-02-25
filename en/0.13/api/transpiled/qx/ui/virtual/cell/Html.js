(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.virtual.cell.Cell": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 STZ-IDA, Germany, http://www.stz-ida.de
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */
  qx.Class.define("qx.ui.virtual.cell.Html", {
    extend: qx.ui.virtual.cell.Cell,
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      appearance: {
        refine: true,
        init: "cell-html"
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /*
      ---------------------------------------------------------------------------
        IMPLEMENT CELL API
      ---------------------------------------------------------------------------
      */
      getContent: function getContent(value, states) {
        return value;
      }
    }
  });
  qx.ui.virtual.cell.Html.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Html.js.map?dt=1677362769869