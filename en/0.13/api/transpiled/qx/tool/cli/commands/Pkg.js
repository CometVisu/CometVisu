(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.tool.cli.commands.Package": {
        "require": true
      },
      "qx.tool.cli.Cli": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2017 Christian Boulanger
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (info@bibliograph.org, @cboulanger)
  
  ************************************************************************ */
  /**
   * "qx pkg" is an alias for "qx package"
   */
  qx.Class.define("qx.tool.cli.commands.Pkg", {
    extend: qx.tool.cli.commands.Package,
    statics: {
      /**
       * The yargs command data
       * @return {{}}
       */
      getYargsCommand: function getYargsCommand() {
        return {
          command: "pkg <command> [options]",
          desc: "alias for 'qx package'",
          builder: function builder(yargs) {
            qx.tool.cli.Cli.addYargsCommands(yargs, ["Install", "List", "Publish", "Remove", "Update", "Upgrade", "Migrate"], "qx.tool.cli.commands.package");
            return yargs.demandCommand().showHelpOnFail().help();
          },
          handler: function handler() {
            // Nothing
          }
        };
      }
    }
  });
  qx.tool.cli.commands.Pkg.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Pkg.js.map?dt=1735383869603