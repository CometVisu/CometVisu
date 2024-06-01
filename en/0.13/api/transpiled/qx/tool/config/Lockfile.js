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
      },
      "qx.tool.cli.commands.Package": {
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
   * A model for the lockfile, which has a version, but no "official" schema (yet)
   */
  var version = "2.1.0";
  qx.Class.define("qx.tool.config.Lockfile", {
    extend: qx.tool.config.Abstract,
    type: "singleton",
    statics: {
      config: {
        fileName: qx.tool.cli.commands.Package.lockfile.filename,
        version: version,
        validate: false,
        createIfNotExists: true,
        templateFunction: function templateFunction() {
          return {
            libraries: [],
            version: version
          };
        }
      }
    },
    construct: function construct() {
      qx.tool.config.Abstract.constructor.call(this, qx.tool.config.Lockfile.config);
    }
  });
  qx.tool.config.Lockfile.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Lockfile.js.map?dt=1717235406140