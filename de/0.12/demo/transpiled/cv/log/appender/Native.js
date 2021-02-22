(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.log.appender.Util": {
        "require": true,
        "defer": "runtime"
      },
      "qx.bom.client.Html": {
        "require": true,
        "defer": "runtime"
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "cv.Config": {},
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
   2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
   License:
   MIT: https://opensource.org/licenses/MIT
   See the LICENSE file in the project's top-level directory for details.
  
   Authors:
   * Sebastian Werner (wpbasti)
  
   ************************************************************************ */

  /**
   * Processes the incoming log entry and displays it by means of the native
   * logging capabilities of the client. Can be disable during runtime
   *
   * @require(qx.log.appender.Util)
   * @require(qx.bom.client.Html)
   */
  qx.Bootstrap.define("cv.log.appender.Native", {
    /*
     *****************************************************************************
     STATICS
     *****************************************************************************
     */
    statics: {
      /**
       * Processes a single log entry
       *
       * @param entry {Map} The entry to process
       */
      process: function process(entry) {
        if (cv.Config.enableLogging) {
          // Firefox 4's Web Console doesn't support "debug"
          var level = console[entry.level] ? entry.level : "log";

          if (console[level]) {
            var args = qx.log.appender.Util.toText(entry);
            console[level](args);
          }
        }
      }
    },

    /*
     *****************************************************************************
     DEFER
     *****************************************************************************
     */
    defer: function defer(statics) {
      qx.log.Logger.register(statics);
    }
  });
  cv.log.appender.Native.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Native.js.map?dt=1614016343745