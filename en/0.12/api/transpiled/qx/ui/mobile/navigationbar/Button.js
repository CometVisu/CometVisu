(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.form.Button": {
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
   * A navigation bar button widget.
   */
  qx.Class.define("qx.ui.mobile.navigationbar.Button", {
    extend: qx.ui.mobile.form.Button,

    /*
     *****************************************************************************
        PROPERTIES
     *****************************************************************************
     */
    properties: {
      // overridden
      defaultCssClass: {
        refine: true,
        init: "navigationbar-button"
      }
    }
  });
  qx.ui.mobile.navigationbar.Button.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Button.js.map?dt=1614107144892