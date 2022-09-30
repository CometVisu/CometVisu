(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.log.Logger": {},
      "qx.bom.client.OperatingSystem": {
        "require": true
      },
      "qx.Bootstrap": {},
      "qx.event.handler.Application": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "engine.version": {
          "className": "qx.bom.client.Engine"
        },
        "os.name": {
          "className": "qx.bom.client.OperatingSystem"
        },
        "qx.application": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Daniel Wagner (d_wagner)
       * John Spackman
  
  ************************************************************************ */

  /**
   * This is the base class for non-browser qooxdoo applications.
   */
  qx.Class.define("qx.core.BaseInit", {
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      __P_156_0: null,

      /**
       * Returns the instantiated qooxdoo application.
       *
       * @return {qx.core.Object} The application instance.
       */
      getApplication: function getApplication() {
        return this.__P_156_0 || null;
      },

      /**
       * Runs when the application is loaded. Automatically creates an instance
       * of the class defined by the setting <code>qx.application</code>.
       *
       */
      ready: function ready() {
        if (this.__P_156_0) {
          return;
        }

        if (qx.core.Environment.get("engine.name") == "") {
          qx.log.Logger.warn("Could not detect engine!");
        }

        if (qx.core.Environment.get("engine.version") == "") {
          qx.log.Logger.warn("Could not detect the version of the engine!");
        }

        if (qx.core.Environment.get("os.name") == "") {
          qx.log.Logger.warn("Could not detect operating system!");
        }

        qx.log.Logger.debug(this, "Load runtime: " + (new Date() - qx.Bootstrap.LOADSTART) + "ms");
        var app = qx.core.Environment.get("qx.application");
        var clazz = qx.Class.getByName(app);

        if (clazz) {
          this.__P_156_0 = new clazz();
          var start = new Date();

          this.__P_156_0.main();

          qx.log.Logger.debug(this, "Main runtime: " + (new Date() - start) + "ms");
          var start = new Date();

          this.__P_156_0.finalize();

          qx.log.Logger.debug(this, "Finalize runtime: " + (new Date() - start) + "ms");
          qx.event.handler.Application.onAppInstanceInitialized();
        } else {
          qx.log.Logger.warn("Missing application class: " + app);
        }
      },

      /**
       * Runs before the document is unloaded. Calls the application's close
       * method to check if the unload process should be stopped.
       *
       * @param e {qx.event.type.Native} Incoming beforeunload event.
       */
      __P_156_1: function __P_156_1(e) {
        var app = this.__P_156_0;

        if (app) {
          app.close();
        }
      },

      /**
       * Runs when the document is unloaded. Automatically terminates a previously
       * created application instance.
       *
       */
      __P_156_2: function __P_156_2() {
        var app = this.__P_156_0;

        if (app) {
          app.terminate();
        }
      }
    }
  });
  qx.core.BaseInit.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BaseInit.js.map?dt=1664560753354