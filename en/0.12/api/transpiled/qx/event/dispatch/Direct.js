(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.event.IEventDispatcher": {
        "require": true
      },
      "qx.event.Registration": {
        "defer": "runtime",
        "require": true
      },
      "qx.event.type.Event": {},
      "qx.event.Utils": {}
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
   * Dispatches events directly on the event target (no bubbling nor capturing).
   */
  qx.Class.define("qx.event.dispatch.Direct", {
    extend: qx.core.Object,
    implement: qx.event.IEventDispatcher,

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
      this._manager = manager;
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /** @type {Integer} Priority of this dispatcher */
      PRIORITY: qx.event.Registration.PRIORITY_LAST
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /*
      ---------------------------------------------------------------------------
        EVENT DISPATCHER INTERFACE
      ---------------------------------------------------------------------------
      */
      // interface implementation
      canDispatchEvent: function canDispatchEvent(target, event, type) {
        return !event.getBubbles();
      },
      // interface implementation
      dispatchEvent: function dispatchEvent(target, event, type) {
        event.setEventPhase(qx.event.type.Event.AT_TARGET);
        var tracker = {};
        var self = this;

        var listeners = this._manager.getListeners(target, type, false);

        if (listeners) {
          listeners.forEach(function (listener) {
            if (self._manager.isBlacklisted(listener.unique)) {
              return;
            }

            var context = listener.context || target;
            qx.event.Utils.then(tracker, function () {
              return listener.handler.call(context, event);
            });
          });
        }

        return tracker.promise;
      }
    },

    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */
    defer: function defer(statics) {
      qx.event.Registration.addDispatcher(statics);
    }
  });
  qx.event.dispatch.Direct.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Direct.js.map?dt=1604955472620