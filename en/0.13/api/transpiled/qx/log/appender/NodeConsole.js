(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Assert": {},
      "qx.log.Logger": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006-2011 1&1 Internet AG, Germany, http://www.1and1.org
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Daniel Wagner (d_wagner)
       * Thomas Herchenroeder (thron7)
       * Christian Boulanger (cboulanger)
  
  ************************************************************************ */

  /**
   * Log appender for qooxdoo applications running in Node.js. Writes log
   * messages to STDOUT/STDERR.
   *
   * @ignore(process.*)
   */
  qx.Class.define("qx.log.appender.NodeConsole", {
    statics: {
      /**
       * process.stdout
       */
      __P_276_0: null,

      /**
       * process.stderr
       */
      __P_276_1: null,

      /**
       * Whether to use color codes
       */
      __P_276_2: false,

      /**
       * Which ANSI color codes to use for which log level
       */
      __P_276_3: {
        debug: "\x1B[38;5;3m",
        // yellow
        info: "\x1B[38;5;12m",
        // light blue
        warn: "\x1B[38;5;9m",
        // light right
        error: "\x1B[38;5;1m",
        // red
        reset: "\x1B[0m"
      },

      /**
       * Turn the use of colors on or off
       * @param {Boolean} value
       */
      setUseColors: function setUseColors(value) {
        qx.core.Assert.assertBoolean(value);
        this.__P_276_2 = value;
      },

      /**
       * Writes a message to the shell. Errors will be sent to STDERR, everything
       * else goes to STDOUT
       *
       * @param logMessage {String} Message to be logged
       * @param level {String} Log level. One of "debug", "info", "warn", "error"
       */
      log: function log(logMessage, level) {
        if (this.__P_276_2 && this.__P_276_3[level]) {
          logMessage = this.__P_276_3[level] + logMessage + this.__P_276_3.reset;
        }

        if (level === "error") {
          this.__P_276_1.write(logMessage + "\n");
        } else {
          this.__P_276_0.write(logMessage + "\n");
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

        for (var _i = 0, _Object$keys = Object.keys(entry); _i < _Object$keys.length; _i++) {
          var prop = _Object$keys[_i];

          if (prop === "items") {
            var items = entry[prop];

            for (var p = 0; p < items.length; p++) {
              var item = items[p];
              this[level](item.text);
            }
          }
        }
      }
    },

    /**
     * @ignore(process.*)
     */
    defer: function defer(statics) {
      if (typeof process !== "undefined") {
        statics.__P_276_0 = process.stdout;
        statics.__P_276_1 = process.stderr;
        qx.log.Logger.register(statics);
      }
    }
  });
  qx.log.appender.NodeConsole.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=NodeConsole.js.map?dt=1685978128372