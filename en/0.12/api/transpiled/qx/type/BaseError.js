(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
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
      2007-2008 1&1 Internet AG, Germany, http://www.1und1.de
     License:
      MIT: https://opensource.org/licenses/MIT
      See the LICENSE file in the project's top-level directory for details.
     Authors:
      * Fabian Jakobs (fjakobs)
      * Martin Wittemann (martinwittemann)
  ************************************************************************ */

  /**
   * This class is the common super class for all error classes in qooxdoo.
   *
   * It has a comment and a fail message as members. The toString method returns
   * the comment and the fail message separated by a colon.
   */
  qx.Bootstrap.define("qx.type.BaseError", {
    extend: Error,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param comment {String} Comment passed to the assertion call
     * @param failMessage {String} Fail message provided by the assertion
     */
    construct: function construct(comment, failMessage) {
      var inst = Error.call(this, failMessage); // map stack trace properties since they're not added by Error's constructor

      if (inst.stack) {
        this.stack = inst.stack;
      }

      if (inst.stacktrace) {
        this.stacktrace = inst.stacktrace;
      }

      this.__P_252_0 = comment || ""; // opera 10 crashes if the message is an empty string!!!?!?!

      this.message = failMessage || qx.type.BaseError.DEFAULTMESSAGE;
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      DEFAULTMESSAGE: "error"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_252_1: null,
      __P_252_0: null,

      /** @type {String} Fail message provided by the assertion */
      message: null,

      /**
       * Comment passed to the assertion call
       *
       * @return {String} The comment passed to the assertion call
       */
      getComment: function getComment() {
        return this.__P_252_0;
      },

      /**
       * Get the error message
       *
       * @return {String} The error message
       */
      toString: function toString() {
        return this.__P_252_0 + (this.message ? ": " + this.message : "");
      }
    }
  });
  qx.type.BaseError.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BaseError.js.map?dt=1604955479008