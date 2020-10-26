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
   * Registrar for command groups to be able to active or deactive them.
   */
  qx.Class.define("qx.ui.command.GroupManager", {
    extend: qx.core.Object,
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_55_0 = [];
    },
    members: {
      __P_55_0: null,
      __P_55_1: null,

      /**
       * Add command group.
       *
       * @param group {qx.ui.command.Group} Command group
       *
       * @return {Boolean} <code>false</code> if group was already added before
       */
      add: function add(group) {
        if (this.__P_55_0.includes(group)) {
          return false;
        }

        this.__P_55_0.push(group); // deactivate added group to prevent collusions


        group.setActive(false);
        return true;
      },

      /**
       * Whether a command manager was added.
       *
       * @param group {qx.ui.command.Group} Command group
       *
       * @return {Boolean} <code>true</code> if group already added
       */
      has: function has(group) {
        return !!this._getGroup(group);
      },

      /**
       * Removes a command group from group manager. If removed group was the
       * active group, active group will be set to <code>null</code> Returns the
       * group.
       *
       * @param group {qx.ui.command.Group} Command group
       *
       * @return {qx.ui.command.Group | null} Command group or null if group was not added before
       */
      remove: function remove(group) {
        var index = this.__P_55_0.indexOf(group);

        if (index === -1) {} // reset active group


        if (this.getActive() === group) {
          this.__P_55_1 = null;
        } // remove group from internal array


        this.__P_55_0.splice(index, 1);

        return group;
      },

      /**
       * Activates a command group and deactivates all other added groups.
       *
       * @param group {qx.ui.command.Group} Command group
       *
       * @return {Boolean} <code>false</code> if group was not added before
       */
      setActive: function setActive(group) {
        if (!this.has(group)) {
          return false;
        } // iterate through all groups and deactivate all expect the given one


        for (var i = 0; i < this.__P_55_0.length; i++) {
          var item = this.__P_55_0[i];

          if (item == group) {
            item.setActive(true);
            this.__P_55_1 = item;
            continue;
          }

          item.setActive(false);
        }

        return true;
      },

      /**
       * Returns active command group.
       *
       * @return {qx.ui.command.Group | null} Active command group
       */
      getActive: function getActive() {
        return this.__P_55_1;
      },

      /**
       * Blocks the active command group.
       */
      block: function block() {
        if (this.__P_55_1) {
          this.__P_55_1.setActive(false);
        }
      },

      /**
       * Unblocks the active command group.
       */
      unblock: function unblock() {
        if (this.__P_55_1) {
          this.__P_55_1.setActive(true);
        }
      },

      /**
       * Helper function returns added command group.
       *
       * @param group {qx.ui.command.Group} Command group
       *
       * @return {qx.ui.command.Group | null} Command group or null
       */
      _getGroup: function _getGroup(group) {
        var index = this.__P_55_0.indexOf(group);

        if (index === -1) {
          return null;
        }

        return this.__P_55_0[index];
      }
    },
    destruct: function destruct() {
      this.__P_55_0 = this.__P_55_1 = null;
    }
  });
  qx.ui.command.GroupManager.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=GroupManager.js.map?dt=1603737740098