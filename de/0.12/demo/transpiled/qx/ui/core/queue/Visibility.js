(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.Array": {},
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
  
  ************************************************************************ */

  /**
   * Keeps data about the visibility of all widgets. Updates the internal
   * tree when widgets are added, removed or modify their visibility.
   */
  qx.Class.define("qx.ui.core.queue.Visibility", {
    statics: {
      /** @type {Array} This contains all the queued widgets for the next flush. */
      __P_239_0: [],

      /** @type {Map} map of widgets by hash code which are in the queue */
      __P_239_1: {},

      /** @type {Map} Maps hash codes to visibility */
      __P_239_2: {},

      /**
       * Clears the cached data of the given widget. Normally only used
       * during interims disposes of one or a few widgets.
       *
       * @param widget {qx.ui.core.Widget} The widget to clear
       */
      remove: function remove(widget) {
        if (this.__P_239_1[widget.toHashCode()]) {
          delete this.__P_239_1[widget.toHashCode()];
          qx.lang.Array.remove(this.__P_239_0, widget);
        }

        delete this.__P_239_2[widget.toHashCode()];
      },

      /**
       * Whether the given widget is visible.
       *
       * Please note that the information given by this method is queued and may not be accurate
       * until the next queue flush happens.
       *
       * @param widget {qx.ui.core.Widget} The widget to query
       * @return {Boolean} Whether the widget is visible
       */
      isVisible: function isVisible(widget) {
        return this.__P_239_2[widget.toHashCode()] || false;
      },

      /**
       * Computes the visibility for the given widget
       *
       * @param widget {qx.ui.core.Widget} The widget to update
       * @return {Boolean} Whether the widget is visible
       */
      __P_239_3: function __P_239_3(widget) {
        var data = this.__P_239_2;
        var hash = widget.toHashCode();
        var visible; // Respect local value

        if (widget.isExcluded()) {
          visible = false;
        } else {
          // Parent hierarchy
          var parent = widget.$$parent;

          if (parent) {
            visible = this.__P_239_3(parent);
          } else {
            visible = widget.isRootWidget();
          }
        }

        return data[hash] = visible;
      },

      /**
       * Adds a widget to the queue.
       *
       * Should only be used by {@link qx.ui.core.Widget}.
       *
       * @param widget {qx.ui.core.Widget} The widget to add.
       */
      add: function add(widget) {
        if (this.__P_239_1[widget.toHashCode()]) {
          return;
        }

        this.__P_239_0.unshift(widget);

        this.__P_239_1[widget.toHashCode()] = widget;
        qx.ui.core.queue.Manager.scheduleFlush("visibility");
      },

      /**
       * Flushes the visibility queue.
       *
       * This is used exclusively by the {@link qx.ui.core.queue.Manager}.
       */
      flush: function flush() {
        // Dispose all registered objects
        var queue = this.__P_239_0;
        var data = this.__P_239_2; // Dynamically add children to queue
        // Only respect already known widgets because otherwise the children
        // are also already in the queue (added on their own)

        for (var i = queue.length - 1; i >= 0; i--) {
          var hash = queue[i].toHashCode();

          if (data[hash] != null) {
            // recursive method call which adds widgets to the queue so be
            // careful with that one (performance critical)
            queue[i].addChildrenToQueue(queue);
          }
        } // Cache old data, clear current data
        // Do this before starting with recomputation because
        // new data may also be added by related widgets and not
        // only the widget itself.


        var oldData = {};

        for (var i = queue.length - 1; i >= 0; i--) {
          var hash = queue[i].toHashCode();
          oldData[hash] = data[hash];
          data[hash] = null;
        } // Finally recompute


        for (var i = queue.length - 1; i >= 0; i--) {
          var widget = queue[i];
          var hash = widget.toHashCode();
          queue.splice(i, 1); // Only update when not already updated by another widget

          if (data[hash] == null) {
            this.__P_239_3(widget);
          } // Check for updates required to the appearance.
          // Hint: Invisible widgets are ignored inside appearance flush


          if (data[hash] && data[hash] != oldData[hash]) {
            widget.checkAppearanceNeeds();
          }
        } // Recreate the array is cheaper compared to keep a sparse array over time


        this.__P_239_0 = [];
        this.__P_239_1 = {};
      }
    }
  });
  qx.ui.core.queue.Visibility.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Visibility.js.map?dt=1620071719219