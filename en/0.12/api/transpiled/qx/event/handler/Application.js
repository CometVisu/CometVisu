(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.bom.client.Engine": {
        "require": true,
        "defer": "runtime"
      },
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.event.IEventHandler": {
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.event.Registration": {
        "defer": "runtime",
        "require": true
      },
      "qx.lang.Function": {},
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.bom.Event": {},
      "qx.bom.client.Runtime": {
        "require": true
      },
      "qx.event.GlobalError": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "browser.documentmode": {
          "className": "qx.bom.client.Browser"
        },
        "runtime.name": {
          "className": "qx.bom.client.Runtime"
        }
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
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * This handler provides events for qooxdoo application startup/shutdown logic.
   * 
   * NOTE: Instances of this class must be disposed of after use
   *
   * @require(qx.bom.client.Engine)
   */
  qx.Class.define("qx.event.handler.Application", {
    extend: qx.core.Object,
    implement: [qx.event.IEventHandler, qx.core.IDisposable],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * Create a new instance
     *
     * @param manager {qx.event.Manager} Event manager for the window to use
     */
    construct: function construct(manager) {
      qx.core.Object.constructor.call(this); // Define shorthands

      this._window = manager.getWindow();
      this.__P_173_0 = false;
      this.__P_173_1 = false;
      this.__P_173_2 = false;
      this.__P_173_3 = false;
      this.__P_173_4 = false; // Initialize observers

      this._initObserver(); // Store instance (only supported for main app window, this
      // is the reason why this is OK here)


      qx.event.handler.Application.$$instance = this;
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /** @type {Integer} Priority of this handler */
      PRIORITY: qx.event.Registration.PRIORITY_NORMAL,

      /** @type {Map} Supported event types */
      SUPPORTED_TYPES: {
        ready: 1,
        shutdown: 1
      },

      /** @type {Integer} Which target check to use */
      TARGET_CHECK: qx.event.IEventHandler.TARGET_WINDOW,

      /** @type {Integer} Whether the method "canHandleEvent" must be called */
      IGNORE_CAN_HANDLE: true,

      /**
       * Sends the currently running application the ready signal. Used
       * exclusively by package loader system.
       *
       * @internal
       */
      onScriptLoaded: function onScriptLoaded() {
        var inst = qx.event.handler.Application.$$instance;

        if (inst) {
          inst.__P_173_5();
        }
      },

      /**
       * Notifies that the application has finished initialization
       *
       * @internal
       */
      onAppInstanceInitialized: function onAppInstanceInitialized() {
        var inst = qx.event.handler.Application.$$instance;

        if (inst) {
          inst.__P_173_6();
        }
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER INTERFACE
      ---------------------------------------------------------------------------
      */
      // interface implementation
      canHandleEvent: function canHandleEvent(target, type) {},
      // interface implementation
      registerEvent: function registerEvent(target, type, capture) {// Nothing needs to be done here
      },
      // interface implementation
      unregisterEvent: function unregisterEvent(target, type, capture) {// Nothing needs to be done here
      },
      __P_173_2: null,
      __P_173_3: null,
      __P_173_0: null,
      __P_173_1: null,
      __P_173_4: null,

      /*
      ---------------------------------------------------------------------------
        USER ACCESS
      ---------------------------------------------------------------------------
      */

      /**
       * Fires a global ready event.
       *
       */
      __P_173_5: function __P_173_5() {
        // Wrapper qxloader needed to be compatible with old generator
        if (!this.__P_173_2 && this.__P_173_0 && qx.$$loader.scriptLoaded) {
          // If qooxdoo is loaded within a frame in IE, the document is ready before
          // the "ready" listener can be added. To avoid any startup issue check
          // for the availability of the "ready" listener before firing the event.
          // So at last the native "load" will trigger the "ready" event.
          if (qx.core.Environment.get("engine.name") == "mshtml") {
            if (qx.event.Registration.hasListener(this._window, "ready")) {
              this.__P_173_2 = true; // Fire user event

              qx.event.Registration.fireEvent(this._window, "ready");
            }
          } else {
            this.__P_173_2 = true; // Fire user event

            qx.event.Registration.fireEvent(this._window, "ready");
          }
        }
      },

      /**
       * Fires a global "appinitialized" event.
       *
       */
      __P_173_6: function __P_173_6() {
        this.__P_173_3 = true; // Fire user event

        qx.event.Registration.fireEvent(this._window, "appinitialized");
      },

      /**
       * Whether the application is ready.
       *
       * @return {Boolean} ready status
       */
      isApplicationReady: function isApplicationReady() {
        return this.__P_173_2;
      },

      /**
       * Whether the application is initialized
       *
       * @return {Boolean} initialization status
       */
      isApplicationInitialized: function isApplicationInitialized() {
        return this.__P_173_3;
      },

      /*
      ---------------------------------------------------------------------------
        OBSERVER INIT/STOP
      ---------------------------------------------------------------------------
      */

      /**
       * Initializes the native application event listeners.
       *
       */
      _initObserver: function _initObserver() {
        // in Firefox the loader script sets the ready state
        if (qx.$$domReady || document.readyState == "complete" || document.readyState == "ready") {
          this.__P_173_0 = true;

          this.__P_173_5();
        } else {
          this._onNativeLoadWrapped = qx.lang.Function.bind(this._onNativeLoad, this);

          if (qx.core.Environment.get("engine.name") == "gecko" || qx.core.Environment.get("engine.name") == "opera" || qx.core.Environment.get("engine.name") == "webkit" || qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.documentmode") > 8) {
            // Using native method supported by Mozilla, Webkit, Opera and IE >= 9
            qx.bom.Event.addNativeListener(this._window, "DOMContentLoaded", this._onNativeLoadWrapped);
          } else {
            var self = this; // Continually check to see if the document is ready

            var timer = function timer() {
              try {
                // If IE is used, use the trick by Diego Perini
                // http://javascript.nwbox.com/IEContentLoaded/
                document.documentElement.doScroll("left");

                if (document.body) {
                  self._onNativeLoadWrapped();
                }
              } catch (error) {
                window.setTimeout(timer, 100);
              }
            };

            timer();
          } // Additional load listener as fallback


          qx.bom.Event.addNativeListener(this._window, "load", this._onNativeLoadWrapped);
        }

        if (qx.core.Environment.get("runtime.name") == "rhino" || qx.core.Environment.get("runtime.name") == "node.js") {
          return;
        }

        this._onNativeUnloadWrapped = qx.lang.Function.bind(this._onNativeUnload, this);
        qx.bom.Event.addNativeListener(this._window, "unload", this._onNativeUnloadWrapped);
      },

      /**
       * Disconnect the native application event listeners.
       *
       */
      _stopObserver: function _stopObserver() {
        if (this._onNativeLoadWrapped) {
          qx.bom.Event.removeNativeListener(this._window, "load", this._onNativeLoadWrapped);
        }

        qx.bom.Event.removeNativeListener(this._window, "unload", this._onNativeUnloadWrapped);
        this._onNativeLoadWrapped = null;
        this._onNativeUnloadWrapped = null;
      },

      /*
      ---------------------------------------------------------------------------
        NATIVE LISTENER
      ---------------------------------------------------------------------------
      */

      /**
       * When qx.globalErrorHandling is enabled the callback will observed
       */
      _onNativeLoad: function _onNativeLoad() {
        var callback = qx.event.GlobalError.observeMethod(this.__P_173_7);
        callback.apply(this, arguments);
      },

      /**
       * Event listener for native load event
       */
      __P_173_7: function __P_173_7() {
        this.__P_173_0 = true;

        this.__P_173_5();
      },

      /**
       * When qx.globalErrorHandling is enabled the callback will observed
       */
      _onNativeUnload: function _onNativeUnload() {
        var callback = qx.event.GlobalError.observeMethod(this.__P_173_8);
        callback.apply(this, arguments);
      },

      /**
       * Event listener for native unload event
       */
      __P_173_8: function __P_173_8() {
        if (!this.__P_173_4) {
          this.__P_173_4 = true;

          try {
            // Fire user event
            qx.event.Registration.fireEvent(this._window, "shutdown");
          } catch (e) {
            // IE doesn't execute the "finally" block if no "catch" block is present
            throw e;
          }
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._stopObserver();

      this._window = null;
    },

    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */
    defer: function defer(statics) {
      qx.event.Registration.addHandler(statics);
    }
  });
  qx.event.handler.Application.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Application.js.map?dt=1612690399605