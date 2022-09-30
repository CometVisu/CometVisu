(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.basic.Label": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
  
  ************************************************************************ */

  /**
   * A navigation bar title widget.
   */
  qx.Class.define("qx.ui.mobile.navigationbar.Title", {
    extend: qx.ui.mobile.basic.Label,
    properties: {
      wrap: {
        refine: true,
        init: false
      },
      // overridden
      defaultCssClass: {
        refine: true,
        init: "title"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      // overridden
      _getTagName: function _getTagName() {
        return "h1";
      }
    }
  });
  qx.ui.mobile.navigationbar.Title.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Title.js.map?dt=1664557360595