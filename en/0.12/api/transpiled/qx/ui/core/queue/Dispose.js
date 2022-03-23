(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.queue.Manager": {}
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
   * The DisposeQueue registers all widgets which are should be disposed.
   * This queue makes it possible to remove widgets from the DOM using
   * the layout and element queues and dispose them afterwards.
   */
  qx.Class.define("qx.ui.core.queue.Dispose", {
    statics: {
      /** @type {Array} This contains all the queued widgets for the next flush. */
      __P_287_0: [],

      /**
       * Adds a widget to the queue.
       *
       * Should only be used by {@link qx.ui.core.Widget}.
       *
       * @param widget {qx.ui.core.Widget} The widget to add.
       */
      add: function add(widget) {
        var queue = this.__P_287_0;

        if (queue.includes(widget)) {
          return;
        }

        queue.unshift(widget);
        qx.ui.core.queue.Manager.scheduleFlush("dispose");
      },

      /**
       * Whether the dispose queue is empty
       * @return {Boolean}
       * @internal
       */
      isEmpty: function isEmpty() {
        return this.__P_287_0.length == 0;
      },

      /**
       * Flushes the dispose queue.
       *
       * This is used exclusively by the {@link qx.ui.core.queue.Manager}.
       */
      flush: function flush() {
        // Dispose all registered objects
        var queue = this.__P_287_0;

        for (var i = queue.length - 1; i >= 0; i--) {
          var widget = queue[i];
          queue.splice(i, 1);
          widget.dispose();
        } // Empty check


        if (queue.length != 0) {
          return;
        } // Recreate the array is cheaper compared to keep a sparse array over time


        this.__P_287_0 = [];
      }
    }
  });
  qx.ui.core.queue.Dispose.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Dispose.js.map?dt=1648073868070