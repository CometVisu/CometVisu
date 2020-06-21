(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.classic.Color": {
        "require": true
      },
      "qx.theme.classic.Decoration": {
        "require": true
      },
      "qx.theme.classic.Font": {
        "require": true
      },
      "qx.theme.classic.Appearance": {
        "require": true
      },
      "qx.theme.icon.Oxygen": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
  
  ************************************************************************ */

  /**
   * Classic Windows Theme
   */
  qx.Theme.define("qx.theme.Classic", {
    title: "Classic Windows",
    meta: {
      color: qx.theme.classic.Color,
      decoration: qx.theme.classic.Decoration,
      font: qx.theme.classic.Font,
      appearance: qx.theme.classic.Appearance,
      icon: qx.theme.icon.Oxygen
    }
  });
  qx.theme.Classic.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Classic.js.map?dt=1592777091619