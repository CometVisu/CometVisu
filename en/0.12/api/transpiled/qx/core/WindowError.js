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
  
  ************************************************************************ */

  /**
   * This exception is thrown by the {@link qx.event.GlobalError} handler if a
   * <code>window.onerror</code> event occurs in the browser.
   */
  qx.Bootstrap.define("qx.core.WindowError", {
    extend: Error,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param failMessage {String} The error message
     * @param uri {String} URI where error was raised
     * @param lineNumber {Integer} The line number where the error was raised
     * @param columnNumber {Integer} The column number where the error was raised
     * @param sourceException {Error} orginal error
     */
    construct: function construct(failMessage, uri, lineNumber, columnNumber, sourceException) {
      var inst = sourceException || Error.call(this, failMessage); // map stack trace properties since they're not added by Error's constructor

      if (inst.stack) {
        this.stack = inst.stack;
      }

      if (inst.stacktrace) {
        this.stacktrace = inst.stacktrace;
      }

      this.__P_147_0 = failMessage;
      this.__P_147_1 = uri || "";
      this.__P_147_2 = lineNumber === undefined ? -1 : lineNumber;
      this.__P_147_3 = columnNumber === undefined ? -1 : columnNumber;
      this.__P_147_4 = sourceException;
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_147_0: null,
      __P_147_1: null,
      __P_147_2: null,
      __P_147_3: null,
      __P_147_4: null,

      /**
       * Returns the error message.
       *
       * @return {String} error message
       */
      toString: function toString() {
        return this.__P_147_0;
      },

      /**
       * Get the URI where error was raised
       *
       * @return {String} URI where error was raised
       */
      getUri: function getUri() {
        return this.__P_147_1;
      },

      /**
       * Get the line number where the error was raised
       *
       * @return {Integer} The line number where the error was raised
       */
      getLineNumber: function getLineNumber() {
        return this.__P_147_2;
      },

      /**
       * Get the column number where the error was raised
       *
       * @return {Integer} The line number where the error was raised
       */
      getColumnNumber: function getColumnNumber() {
        return this.__P_147_3;
      },

      /**
       * Get the source exception
       *
       * @return {Error} The source error
       */
      getSourceException: function getSourceException() {
        return this.__P_147_4;
      }
    }
  });
  qx.core.WindowError.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=WindowError.js.map?dt=1702895804440