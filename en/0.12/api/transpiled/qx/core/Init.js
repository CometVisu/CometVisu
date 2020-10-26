(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.event.handler.Application": {
        "require": true,
        "defer": "runtime"
      },
      "qx.event.handler.Window": {
        "require": true,
        "defer": "runtime"
      },
      "qx.event.dispatch.Direct": {
        "require": true,
        "defer": "runtime"
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.BaseInit": {
        "require": true
      },
      "qx.event.Registration": {
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
   * This is the base class for all qooxdoo applications.
   *
   * @require(qx.event.handler.Application)
   * @require(qx.event.handler.Window)
   * @require(qx.event.dispatch.Direct)
   */
  qx.Class.define("qx.core.Init", {
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /**
       * Returns the instantiated qooxdoo application.
       *
       * @return {qx.core.Object} The application instance.
       */
      getApplication: qx.core.BaseInit.getApplication,

      /**
       * Runs when the application is loaded. Automatically creates an instance
       * of the class defined by the setting <code>qx.application</code>.
       *
       */
      ready: qx.core.BaseInit.ready,

      /**
       * Runs before the document is unloaded. Calls the application's close
       * method to check if the unload process should be stopped.
       *
       * @param e {qx.event.type.Native} Incoming beforeunload event.
       */
      __P_129_0: function __P_129_0(e) {
        var app = this.getApplication();

        if (app) {
          e.setReturnValue(app.close());
        }
      },

      /**
       * Runs when the document is unloaded. Automatically terminates a previously
       * created application instance.
       *
       */
      __P_129_1: function __P_129_1() {
        var app = this.getApplication();

        if (app) {
          app.terminate();
        }
      }
    },

    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */
    defer: function defer(statics) {
      qx.event.Registration.addListener(window, "ready", statics.ready, statics);
      qx.event.Registration.addListener(window, "shutdown", statics.__P_129_1, statics);
      qx.event.Registration.addListener(window, "beforeunload", statics.__P_129_0, statics);
    }
  });
  qx.core.Init.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Init.js.map?dt=1603737124567