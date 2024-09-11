(function () {
  var $$dbClassInfo = {
    "dependsOn": {
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
      "qx.event.Registration": {
        "defer": "runtime",
        "require": true
      },
      "qx.ui.mobile.core.Widget": {}
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
       * Tino Butz (tbtz)
  
  ************************************************************************ */

  /**
   * This class provides the <code>domupdated</code> event. The event is
   * delegated to all widget instances that have a
   * listener for the <code>domupdated</code> event registered.
   *
   * @internal
   */
  qx.Class.define("qx.ui.mobile.core.DomUpdatedHandler", {
    extend: qx.core.Object,
    implement: qx.event.IEventHandler,
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
      this.__P_616_0 = manager;
      this.__P_616_1 = {};

      // Register
      qx.ui.mobile.core.DomUpdatedHandler.__P_616_2[this.toHashCode()] = this;
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
        domupdated: 1
      },
      /** @type {Integer} Whether the method "canHandleEvent" must be called */
      IGNORE_CAN_HANDLE: false,
      /** @type {Map} Stores all domUpdated manager instances */
      __P_616_2: {},
      /**
       * Informs all handlers. Useful after massive DOM manipulations e.g.
       * through {@link qx.ui.mobile.core.Widget}.
       *
       */
      refresh: function refresh() {
        var all = this.__P_616_2;
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
      __P_616_0: null,
      __P_616_1: null,
      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER INTERFACE
      ---------------------------------------------------------------------------
      */
      // interface implementation
      canHandleEvent: function canHandleEvent(target, type) {
        return target instanceof qx.ui.mobile.core.Widget;
      },
      // interface implementation
      registerEvent: function registerEvent(target, type, capture) {
        var hash = target.toHashCode();
        var targets = this.__P_616_1;
        if (targets && !targets[hash]) {
          targets[hash] = target;
        }
      },
      // interface implementation
      unregisterEvent: function unregisterEvent(target, type, capture) {
        var hash = target.toHashCode();
        var targets = this.__P_616_1;
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
       * This method is called by all DOM tree modifying routines
       * to inform the widgets.
       *
       */
      refresh: function refresh() {
        var targets = this.__P_616_1;
        var target;
        for (var hash in targets) {
          target = targets[hash];
          if (target && !target.$$disposed && target.isSeeable()) {
            var evt = qx.event.Registration.createEvent("domupdated");
            this.__P_616_0.dispatchEvent(target, evt);
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
      this.__P_616_0 = this.__P_616_1 = null;

      // Deregister
      delete qx.ui.mobile.core.DomUpdatedHandler.__P_616_2[this.toHashCode()];
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
  qx.ui.mobile.core.DomUpdatedHandler.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DomUpdatedHandler.js.map?dt=1726089078308