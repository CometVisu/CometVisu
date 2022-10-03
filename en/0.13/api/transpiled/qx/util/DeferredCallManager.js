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
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.lang.Function": {
        "construct": true
      },
      "qx.lang.Object": {},
      "qx.event.GlobalError": {
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
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * This class manages the timer used for deferred calls. All
   * {@link qx.util.DeferredCall} instances use the single timer from this class.
   * 
   * NOTE: Instances of this class must be disposed of after use
   *
   */
  qx.Class.define("qx.util.DeferredCallManager", {
    extend: qx.core.Object,
    type: "singleton",
    implement: [qx.core.IDisposable],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      this.__P_486_0 = {};
      this.__P_486_1 = qx.lang.Function.bind(this.__P_486_2, this);
      this.__P_486_3 = false;
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_486_4: null,
      __P_486_5: null,
      __P_486_0: null,
      __P_486_3: null,
      __P_486_1: null,

      /**
       * Schedule a deferred call
       *
       * @param deferredCall {qx.util.DeferredCall} The call to schedule
       */
      schedule: function schedule(deferredCall) {
        if (this.__P_486_4 == null) {
          this.__P_486_4 = window.setTimeout(this.__P_486_1, 0);
        }

        var callKey = deferredCall.toHashCode(); // the flush is currently running and the call is already
        // scheduled

        if (this.__P_486_5 && this.__P_486_5[callKey]) {
          return;
        }

        this.__P_486_0[callKey] = deferredCall;
        this.__P_486_3 = true;
      },

      /**
       * Refresh the timeout if the current one is not active anymore.
       * This is a very special case which can happen in unit tests using
       * fakeTimers, which overrides the window.setTimeout function (amongst others)
       * after restoring the sinon sandbox the timeout must be refreshed otherwise
       * DeferredCalls would never fire.
       */
      refreshTimeout: function refreshTimeout() {
        if (this.__P_486_4 !== null) {
          this.__P_486_4 = window.setTimeout(this.__P_486_1, 0);
        }
      },

      /**
       * Cancel a scheduled deferred call
       *
       * @param deferredCall {qx.util.DeferredCall} The call to schedule
       */
      cancel: function cancel(deferredCall) {
        var callKey = deferredCall.toHashCode(); // the flush is currently running and the call is already
        // scheduled -> remove it from the current queue

        if (this.__P_486_5 && this.__P_486_5[callKey]) {
          this.__P_486_5[callKey] = null;
          return;
        }

        delete this.__P_486_0[callKey]; // stop timer if no other calls are waiting

        if (qx.lang.Object.isEmpty(this.__P_486_0) && this.__P_486_4 != null) {
          window.clearTimeout(this.__P_486_4);
          this.__P_486_4 = null;
        }
      },

      /**
       * Helper function for the timer.
       *
       * @signature function()
       */
      __P_486_2: qx.event.GlobalError.observeMethod(function () {
        this.__P_486_4 = null; // the queue may change while doing the flush so we work on a copy of
        // the queue and loop while the queue has any entries.

        while (this.__P_486_3) {
          this.__P_486_5 = qx.lang.Object.clone(this.__P_486_0);
          this.__P_486_0 = {};
          this.__P_486_3 = false;

          for (var key in this.__P_486_5) {
            var call = this.__P_486_5[key];

            if (call) {
              this.__P_486_5[key] = null;
              call.call();
            }
          }
        }

        this.__P_486_5 = null;
      })
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      if (this.__P_486_4 != null) {
        window.clearTimeout(this.__P_486_4);
      }

      this.__P_486_1 = this.__P_486_0 = null;
    }
  });
  qx.util.DeferredCallManager.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DeferredCallManager.js.map?dt=1664784652170