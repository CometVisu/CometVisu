(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.tangible.ColorDark": {
        "require": true
      },
      "qx.theme.tangible.Decoration": {
        "require": true
      },
      "qx.theme.tangible.Font": {
        "require": true
      },
      "qx.theme.tangible.Appearance": {
        "require": true
      },
      "qx.theme.icon.Tango": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
    OSparc Dark Theme for Qooxdoo
  
    Copyright:
       2018 IT'IS Foundation
  
    License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
    Authors:
      * Tobias Oetiker (oetiker)
  
    Origin:
      This theme is based in large parts on the osparc.theme
  ************************************************************************ */

  /**
   * Tangible Theme (Dark)
   *
   * The tangible theme is inspired by ideas from material design. A lot of work went into designing a higly automated color
   * system. In order to customize the theme to your taste, simply create your own color system. Use qx.theme.tangible.ColorDark for inspiration.
   *
   * The Tangible Theme is very new and still in a state of flux. PRs highly welcome. Use https://material.io as a visual guide.
   * 
   */
  qx.Theme.define("qx.theme.TangibleDark", {
    title: "Tangible Dark Theme",
    meta: {
      color: qx.theme.tangible.ColorDark,
      decoration: qx.theme.tangible.Decoration,
      font: qx.theme.tangible.Font,
      appearance: qx.theme.tangible.Appearance,
      icon: qx.theme.icon.Tango
    }
  });
  qx.theme.TangibleDark.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TangibleDark.js.map?dt=1702895810690