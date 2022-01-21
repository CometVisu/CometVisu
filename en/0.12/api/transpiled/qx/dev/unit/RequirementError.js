(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
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
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Daniel Wagner (d_wagner)
  
  ************************************************************************ */

  /**
   * This error is thrown by the unit test class if an infrastructure requirement
   * is not met. The unit testing framework should skip the test and visually mark
   * the test as not having been executed.
   */
  qx.Class.define("qx.dev.unit.RequirementError", {
    extend: Error,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param requirement {String?} The requirement ID, e.g. "SSL"
     * @param message {String?} Optional error message
     */
    construct: function construct(requirement, message) {
      this.__P_168_0 = message || "Requirement not met";
      this.__P_168_1 = requirement;
      var inst = Error.call(this, this.__P_168_0); // map stack trace properties since they're not added by Error's constructor

      if (inst.stack) {
        this.stack = inst.stack;
      }

      if (inst.stacktrace) {
        this.stacktrace = inst.stacktrace;
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_168_0: null,
      __P_168_1: null,

      /**
       * Returns the ID of the requirement that was not satisfied.
       *
       * @return {String} The requirement ID
       */
      getRequirement: function getRequirement() {
        return this.__P_168_1;
      },

      /**
       * Returns a string representation of the error.
       *
       * @return {String} Error message
       */
      toString: function toString() {
        var msg = this.__P_168_0;

        if (this.__P_168_1) {
          msg += ": " + this.__P_168_1;
        }

        return msg;
      }
    }
  });
  qx.dev.unit.RequirementError.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RequirementError.js.map?dt=1642804672547