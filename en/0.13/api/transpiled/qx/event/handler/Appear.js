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
      "qx.core.ObjectRegistry": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.event.Utils": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "browser.documentmode": {
          "className": "qx.bom.client.Browser"
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
  
  ************************************************************************ */

  /**
   * This class supports <code>appear</code> and <code>disappear</code> events
   * on DOM level.
   * 
   * NOTE: Instances of this class must be disposed of after use
   *
   */
  qx.Class.define("qx.event.handler.Appear", {
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
      qx.core.Object.constructor.call(this);
      this.__P_203_0 = manager;
      this.__P_203_1 = {}; // Register

      qx.event.handler.Appear.__P_203_2[this.toHashCode()] = this;
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
        appear: true,
        disappear: true
      },

      /** @type {Integer} Which target check to use */
      TARGET_CHECK: qx.event.IEventHandler.TARGET_DOMNODE,

      /** @type {Integer} Whether the method "canHandleEvent" must be called */
      IGNORE_CAN_HANDLE: true,

      /** @type {Map} Stores all appear manager instances */
      __P_203_2: {},

      /**
       * Refreshes all appear handlers. Useful after massive DOM manipulations e.g.
       * through qx.html.Element.
       *
       */
      refresh: function refresh() {
        var all = this.__P_203_2;

        for (var hash in all) {
          all[hash].refresh();
        }
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_203_0: null,
      __P_203_1: null,

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER INTERFACE
      ---------------------------------------------------------------------------
      */
      // interface implementation
      canHandleEvent: function canHandleEvent(target, type) {},
      // interface implementation
      registerEvent: function registerEvent(target, type, capture) {
        var hash = qx.core.ObjectRegistry.toHashCode(target) + type;
        var targets = this.__P_203_1;

        if (targets && !targets[hash]) {
          targets[hash] = target;
          target.$$displayed = target.offsetWidth > 0;
        }
      },
      // interface implementation
      unregisterEvent: function unregisterEvent(target, type, capture) {
        var hash = qx.core.ObjectRegistry.toHashCode(target) + type;
        var targets = this.__P_203_1;

        if (!targets) {
          return;
        }

        if (targets[hash]) {
          delete targets[hash];
        }
      },

      /*
      ---------------------------------------------------------------------------
        USER ACCESS
      ---------------------------------------------------------------------------
      */

      /**
       * This method should be called by all DOM tree modifying routines
       * to check the registered nodes for changes.
       *
       * @return {qx.Promise?} a promise, if one or more of the event handlers returned one 
       */
      refresh: function refresh() {
        var targets = this.__P_203_1;
        var legacyIe = qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.documentmode") < 9;
        var tracker = {};
        var self = this;
        Object.keys(targets).forEach(function (hash) {
          var elem = targets[hash];

          if (elem === undefined) {
            return;
          }

          qx.event.Utils.then(tracker, function () {
            var displayed = elem.offsetWidth > 0;

            if (!displayed && legacyIe) {
              // force recalculation in IE 8. See bug #7872
              displayed = elem.offsetWidth > 0;
            }

            if (!!elem.$$displayed !== displayed) {
              elem.$$displayed = displayed;
              var evt = qx.event.Registration.createEvent(displayed ? "appear" : "disappear");
              return self.__P_203_0.dispatchEvent(elem, evt);
            }
          });
        });
        return tracker.promise;
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__P_203_0 = this.__P_203_1 = null; // Deregister

      delete qx.event.handler.Appear.__P_203_2[this.toHashCode()];
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
  qx.event.handler.Appear.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Appear.js.map?dt=1664609801959