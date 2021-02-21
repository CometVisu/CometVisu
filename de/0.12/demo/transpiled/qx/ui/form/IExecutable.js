(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
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
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * Form interface for all form widgets which are executable in some way. This
   * could be a button for example.
   */
  qx.Interface.define("qx.ui.form.IExecutable", {
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /**
       * Fired when the widget is executed. Sets the "data" property of the
       * event to the object that issued the command.
       */
      "execute": "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        COMMAND PROPERTY
      ---------------------------------------------------------------------------
      */

      /**
       * Set the command of this executable.
       *
       * @param command {qx.ui.command.Command} The command.
       */
      setCommand: function setCommand(command) {
        return arguments.length == 1;
      },

      /**
       * Return the current set command of this executable.
       *
       * @return {qx.ui.command.Command} The current set command.
       */
      getCommand: function getCommand() {},

      /**
       * Fire the "execute" event on the command.
       */
      execute: function execute() {}
    }
  });
  qx.ui.form.IExecutable.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IExecutable.js.map?dt=1613908792428