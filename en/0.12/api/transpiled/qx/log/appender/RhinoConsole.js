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
       2006-2010 1&1 Internet AG, Germany, http://www.1and1.org
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Daniel Wagner (d_wagner)
  
  ************************************************************************ */

  /**
   * Log appender for qooxdoo applications running in Mozilla Rhino. Writes log
   * messages to STDOUT/STDERR.
   *
   * @ignore(java.*)
   */
  qx.Class.define("qx.log.appender.RhinoConsole", {
    statics: {
      /**
       * java.lang.System.out
       */
      __P_241_0: null,

      /**
       * java.lang.System.err
       */
      __P_241_1: null,

      /**
       * Writes a message to the shell. Errors will be sent to STDERR, everything
       * else goes to STDOUT
       *
       * @param logMessage {String} Message to be logged
       * @param level {String} Log level. One of "debug", "info", "warn", "error"
       */
      log: function log(logMessage, level) {
        if (level == "error") {
          this.__P_241_1.println(logMessage);
        } else {
          this.__P_241_0.println(logMessage);
        }
      },

      /**
       * Logs a debug message
       *
       * @param logMessage {String} Message to be logged
       */
      debug: function debug(logMessage) {
        this.log(logMessage, "debug");
      },

      /**
       * Logs an info message
       *
       * @param logMessage {String} Message to be logged
       */
      info: function info(logMessage) {
        this.log(logMessage, "info");
      },

      /**
       * Logs a warning message
       *
       * @param logMessage {String} Message to be logged
       */
      warn: function warn(logMessage) {
        this.log(logMessage, "warn");
      },

      /**
       * Logs an error message
       *
       * @param logMessage {String} Message to be logged
       */
      error: function error(logMessage) {
        this.log(logMessage, "error");
      },

      /**
       * Process a log entry object from qooxdoo's logging system.
       *
       * @param entry {Map} Log entry object
       */
      process: function process(entry) {
        var level = entry.level || "info";

        for (var prop in entry) {
          if (prop == "items") {
            var items = entry[prop];

            for (var p = 0, l = items.length; p < l; p++) {
              var item = items[p];
              this[level](item.text);
            }
          }
        }
      }
    },
    defer: function defer() {
      if (typeof java !== "undefined" && typeof java.lang !== "undefined") {
        qx.log.appender.RhinoConsole.__P_241_0 = java.lang.System.out;
        qx.log.appender.RhinoConsole.__P_241_1 = java.lang.System.err;
      }
    }
  });
  qx.log.appender.RhinoConsole.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RhinoConsole.js.map?dt=1648713975050