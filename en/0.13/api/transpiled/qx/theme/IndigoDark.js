(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.indigo.ColorDark": {
        "require": true
      },
      "qx.theme.indigo.DecorationDark": {
        "require": true
      },
      "qx.theme.indigo.Font": {
        "require": true
      },
      "qx.theme.indigo.AppearanceDark": {
        "require": true
      },
      "qx.theme.icon.Tango": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Scott Knick (sknick)
  
  ************************************************************************ */
  /**
   * IndigoDark Theme
   */
  qx.Theme.define("qx.theme.IndigoDark", {
    title: "IndigoDark",
    meta: {
      color: qx.theme.indigo.ColorDark,
      decoration: qx.theme.indigo.DecorationDark,
      font: qx.theme.indigo.Font,
      appearance: qx.theme.indigo.AppearanceDark,
      icon: qx.theme.icon.Tango
    }
  });
  qx.theme.IndigoDark.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IndigoDark.js.map?dt=1722153835123