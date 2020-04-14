(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     Copyright:
       2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     Authors:
       * Mustafa Sak (msak)
  
  ************************************************************************ */

  /**
   * Registrar for commands to be able to group them.
   */
  qx.Class.define("qx.ui.command.Group", {
    extend: qx.core.Object,
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this._cmds = {};
    },
    properties: {
      /**
       * Activates or deactivates all commands in group.
       */
      active: {
        init: true,
        check: "Boolean",
        apply: "_applyActive"
      }
    },
    members: {
      _cmds: null,
      // property apply
      _applyActive: function _applyActive(value) {
        for (var cmdkey in this._cmds) {
          this._cmds[cmdkey].setActive(value);
        }
      },

      /*
      ---------------------------------------------------------------------------
        PUBLIC API
      ---------------------------------------------------------------------------
      */

      /**
       * Adds a command with a key to the group.
       *
       * @param key {String} Key to be able to addresses the command
       * @param command {qx.ui.command.Command} Command
       *
       * @return {Boolean} <code>false</code> if key already added before
       */
      add: function add(key, command) {
        if (this.has(key)) {
          return false;
        }

        this._cmds[key] = command;
        return true;
      },

      /**
       * Returns a command by key.
       *
       * @param key {String} Key which addresses the command
       *
       * @return {qx.ui.command.Command | null} Corresponding command instance or null
       */
      get: function get(key) {
        var cmd = this._cmds[key];

        if (!cmd) {
          return null;
        }

        return cmd;
      },

      /**
       * Returns true if a command is registered by key.
       *
       * @param key {String} Key which addresses the command
       *
       * @return {Boolean} Returns <code>true</code> if a command is registered by a key
       */
      has: function has(key) {
        return !!this._cmds[key];
      },

      /**
       * Removes a command by key from group. Returns the command.
       *
       * @param key {String} Key which addresses the command
       *
       * @return {qx.ui.command.Command | null} Corresponding command instance or null
       */
      remove: function remove(key) {
        var cmd = this._cmds[key];

        if (!cmd) {
          return null;
        }

        delete this._cmds[key];
        return cmd;
      }
    },
    destruct: function destruct() {
      this._cmds = null;
    }
  });
  qx.ui.command.Group.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Group.js.map?dt=1586894640919