(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.tool.config.Abstract": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2019 The qooxdoo developers
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (info@bibliograph.org, @cboulanger)
  
  ************************************************************************ */

  /**
   * A model for the Manifest.json file
   */
  qx.Class.define("qx.tool.config.Manifest", {
    extend: qx.tool.config.Abstract,
    type: "singleton",
    statics: {
      config: {
        fileName: "Manifest.json",
        version: "2.0.0"
      }
    },
    construct: function construct() {
      qx.tool.config.Abstract.constructor.call(this, qx.tool.config.Manifest.config);
    }
  });
  qx.tool.config.Manifest.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Manifest.js.map?dt=1735383874172