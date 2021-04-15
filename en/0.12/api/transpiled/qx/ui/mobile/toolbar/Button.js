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
       * Gabriel Munteanu (gabios)
  
  ************************************************************************ */

  /**
   * A button used in toolbars.
   *
   */
  qx.Class.define("qx.ui.mobile.toolbar.Button", {
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
        init: "toolbar-button"
      }
    }
  });
  qx.ui.mobile.toolbar.Button.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Button.js.map?dt=1618502905885