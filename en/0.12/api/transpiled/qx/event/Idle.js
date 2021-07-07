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
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.event.Timer": {}
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
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * A generic singleton that fires an "interval" event all 100 milliseconds. It
   * can be used whenever one needs to run code periodically. The main purpose of
   * this class is reduce the number of timers.
   * 
   * NOTE: Instances of this class must be disposed of after use
   *
   */
  qx.Class.define("qx.event.Idle", {
    extend: qx.core.Object,
    implement: [qx.core.IDisposable],
    type: "singleton",
    construct: function construct() {
      qx.core.Object.constructor.call(this);
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** This event if fired each time the interval time has elapsed */
      "interval": "qx.event.type.Event"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * Interval for the timer, which periodically fires the "interval" event,
       * in milliseconds.
       */
      timeoutInterval: {
        check: "Number",
        init: 100,
        apply: "_applyTimeoutInterval"
      }
    },
    members: {
      __P_175_0: null,
      // property apply
      _applyTimeoutInterval: function _applyTimeoutInterval(value) {
        if (this.__P_175_0) {
          this.__P_175_0.setInterval(value);
        }
      },

      /**
       * Fires an "interval" event
       */
      _onInterval: function _onInterval() {
        this.fireEvent("interval");
      },

      /**
       * Starts the timer but only if there are listeners for the "interval" event
       */
      __P_175_1: function __P_175_1() {
        if (!this.__P_175_0 && this.hasListener("interval")) {
          var timer = new qx.event.Timer(this.getTimeoutInterval());
          timer.addListener("interval", this._onInterval, this);
          timer.start();
          this.__P_175_0 = timer;
        }
      },

      /**
       * Stops the timer but only if there are no listeners for the interval event
       */
      __P_175_2: function __P_175_2() {
        if (this.__P_175_0 && !this.hasListener("interval")) {
          this.__P_175_0.stop();

          this.__P_175_0.dispose();

          this.__P_175_0 = null;
        }
      },

      /*
       * @Override
       */
      addListener: function addListener(type, listener, self, capture) {
        var result = qx.event.Idle.prototype.addListener.base.call(this, type, listener, self, capture);

        this.__P_175_1();

        return result;
      },

      /*
       * @Override
       */
      addListenerOnce: function addListenerOnce(type, listener, self, capture) {
        var result = qx.event.Idle.prototype.addListenerOnce.base.call(this, type, listener, self, capture);

        this.__P_175_1();

        return result;
      },

      /*
       * @Override
       */
      removeListener: function removeListener(type, listener, self, capture) {
        var result = qx.event.Idle.prototype.removeListener.base.call(this, type, listener, self, capture);

        this.__P_175_2();

        return result;
      },

      /*
       * @Override
       */
      removeListenerById: function removeListenerById(id) {
        var result = qx.event.Idle.prototype.removeListenerById.base.call(this, id);

        this.__P_175_2();

        return result;
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      if (this.__P_175_0) {
        this.__P_175_0.stop();
      }

      this.__P_175_0 = null;
    }
  });
  qx.event.Idle.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Idle.js.map?dt=1625667780731