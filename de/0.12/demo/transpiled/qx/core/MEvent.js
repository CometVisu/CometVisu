(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.event.dispatch.Direct": {},
      "qx.event.handler.Object": {},
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.Registration": {
        "require": true
      },
      "qx.Promise": {},
      "qx.event.type.Data": {}
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
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * This mixin offers basic event handling capabilities. It includes the
   * commonly known methods for managing event listeners and firing events.
   *
   * @use(qx.event.dispatch.Direct)
   * @use(qx.event.handler.Object)
   */
  qx.Mixin.define("qx.core.MEvent", {
    members: {
      /** @type {Class} Pointer to the regular event registration class */
      __P_184_0: qx.event.Registration,

      /**
       * Add event listener to this object.
       *
       * @param type {String} name of the event type
       * @param listener {Function} event callback function
       * @param self {Object ? null} Reference to the 'this' variable inside
       *         the event listener. When not given, the corresponding dispatcher
       *         usually falls back to a default, which is the target
       *         by convention. Note this is not a strict requirement, i.e.
       *         custom dispatchers can follow a different strategy.
       * @param capture {Boolean ? false} Whether to attach the event to the
       *         capturing phase or the bubbling phase of the event. The default is
       *         to attach the event handler to the bubbling phase.
       * @return {String} An opaque id, which can be used to remove the event listener
       *         using the {@link #removeListenerById} method.
       */
      addListener: function addListener(type, listener, self, capture) {
        if (!this.$$disposed) {
          return this.__P_184_0.addListener(this, type, listener, self, capture);
        }

        return null;
      },

      /**
       * Add event listener to this object, which is only called once. After the
       * listener is called the event listener gets removed.
       *
       * @param type {String} name of the event type
       * @param listener {Function} event callback function
       * @param context {Object ? window} reference to the 'this' variable inside the callback
       * @param capture {Boolean ? false} Whether to attach the event to the
       *         capturing phase or the bubbling phase of the event. The default is
       *         to attach the event handler to the bubbling phase.
       * @return {String} An opaque id, which can be used to remove the event listener
       *         using the {@link #removeListenerById} method.
       */
      addListenerOnce: function addListenerOnce(type, listener, context, capture) {
        var self = this; // self is needed to remove the listener inside the callback

        if (!context) {
          context = this;
        }

        var id; // store id in closure context

        var callback = function callback(e) {
          self.removeListenerById(id);
          listener.call(context, e);
        }; // check for wrapped callback storage


        if (!listener.$$wrapped_callback) {
          listener.$$wrapped_callback = {};
        } // store the call for each type in case the listener is
        // used for more than one type [BUG #8038]


        listener.$$wrapped_callback[type + this.toHashCode()] = callback;
        id = this.addListener(type, callback, context, capture);
        return id;
      },

      /**
       * Remove event listener from this object
       *
       * @param type {String} name of the event type
       * @param listener {Function} event callback function
       * @param self {Object ? null} reference to the 'this' variable inside the callback
       * @param capture {Boolean} Whether to remove the event listener of
       *   the bubbling or of the capturing phase.
       * @return {Boolean} Whether the event was removed successfully (has existed)
       */
      removeListener: function removeListener(type, listener, self, capture) {
        if (!this.$$disposed) {
          // special handling for wrapped once listener
          if (listener.$$wrapped_callback && listener.$$wrapped_callback[type + this.$$hash]) {
            var callback = listener.$$wrapped_callback[type + this.$$hash];
            delete listener.$$wrapped_callback[type + this.$$hash];
            listener = callback;
          }

          return this.__P_184_0.removeListener(this, type, listener, self, capture);
        }

        return false;
      },

      /**
       * Removes an event listener from an event target by an id returned by
       * {@link #addListener}
       *
       * @param id {String} The id returned by {@link #addListener}
       * @return {Boolean} Whether the event was removed successfully (has existed)
       */
      removeListenerById: function removeListenerById(id) {
        if (!this.$$disposed) {
          return this.__P_184_0.removeListenerById(this, id);
        }

        return false;
      },

      /**
       * Check if there are one or more listeners for an event type.
       *
       * @param type {String} name of the event type
       * @param capture {Boolean ? false} Whether to check for listeners of
       *         the bubbling or of the capturing phase.
       * @return {Boolean} Whether the object has a listener of the given type.
       */
      hasListener: function hasListener(type, capture) {
        return this.__P_184_0.hasListener(this, type, capture);
      },

      /**
       * Dispatch an event on this object
       *
       * @param evt {qx.event.type.Event} event to dispatch
       * @return {Boolean} Whether the event default was prevented or not.
       *     Returns true, when the event was NOT prevented.
       */
      dispatchEvent: function dispatchEvent(evt) {
        if (!this.$$disposed) {
          return this.__P_184_0.dispatchEvent(this, evt);
        }

        return true;
      },

      /**
       * Creates and dispatches an event on this object.
       *
       * @param type {String} Event type to fire
       * @param clazz {Class?qx.event.type.Event} The event class
       * @param args {Array?null} Arguments, which will be passed to
       *       the event's init method.
       * @return {Boolean|qx.Promise} whether the event default was prevented or not.
       *     Returns true, when the event was NOT prevented.
       */
      fireEvent: function fireEvent(type, clazz, args) {
        if (!this.$$disposed) {
          return this.__P_184_0.fireEvent(this, type, clazz, args);
        }

        return true;
      },

      /**
       * Creates and dispatches an event on this object; equivalent to fireEvent, except that it
       * always returns a promise
       *
       * @param type {String} Event type to fire
       * @param clazz {Class?qx.event.type.Event} The event class
       * @param args {Array?null} Arguments, which will be passed to
       *       the event's init method.
       * @return {qx.Promise} a promise aggregated from the event handlers;
       *  if the default was prevented, the promise is rejected
       */
      fireEventAsync: function fireEventAsync(type, clazz, args) {
        {
          throw new Error(this.classname + ".fireEventAsync not supported because qx.promise==false");
        }

        if (!this.$$disposed) {
          return this.__P_184_0.fireEventAsync(this, type, clazz, args);
        }

        return qx.Promise.resolve(true);
      },

      /**
       * Create an event object and dispatch it on this object.
       * The event dispatched with this method does never bubble! Use only if you
       * are sure that bubbling is not required.
       *
       * @param type {String} Event type to fire
       * @param clazz {Class?qx.event.type.Event} The event class
       * @param args {Array?null} Arguments, which will be passed to
       *       the event's init method.
       * @return {Boolean} Whether the event default was prevented or not.
       *     Returns true, when the event was NOT prevented.
       */
      fireNonBubblingEvent: function fireNonBubblingEvent(type, clazz, args) {
        if (!this.$$disposed) {
          return this.__P_184_0.fireNonBubblingEvent(this, type, clazz, args);
        }

        return true;
      },

      /**
       * Create an event object and dispatch it on this object; equivalent to fireNonBubblingEvent, 
       * except that it always returns a promise.
       * 
       * The event dispatched with this method does never bubble! Use only if you
       * are sure that bubbling is not required.
       *
       * @param type {String} Event type to fire
       * @param clazz {Class?qx.event.type.Event} The event class
       * @param args {Array?null} Arguments, which will be passed to
       *       the event's init method.
       * @return {qx.Promise} a promise aggregated from the event handlers;
       *  if the default was prevented, the promise is rejected
       */
      fireNonBubblingEventAsync: function fireNonBubblingEventAsync(type, clazz, args) {
        {
          throw new Error(this.classname + ".fireNonBubblingEventAsync not supported because qx.promise==false");
        }

        if (!this.$$disposed) {
          return this.__P_184_0.fireNonBubblingEventAsync(this, type, clazz, args);
        }

        return qx.Promise.resolve(true);
      },

      /**
       * Creates and dispatches an non-bubbling data event on this object.
       *
       * @param type {String} Event type to fire
       * @param data {var} User defined data attached to the event object
       * @param oldData {var?null} The event's old data (optional)
       * @param cancelable {Boolean?false} Whether or not an event can have its default
       *     action prevented. The default action can either be the browser's
       *     default action of a native event (e.g. open the context menu on a
       *     right click) or the default action of a qooxdoo class (e.g. close
       *     the window widget). The default action can be prevented by calling
       *     {@link qx.event.type.Event#preventDefault}
       * @return {Boolean|qx.Promise} whether the event default was prevented or not.
       *     Returns true, when the event was NOT prevented.
       */
      fireDataEvent: function fireDataEvent(type, data, oldData, cancelable) {
        if (!this.$$disposed) {
          if (oldData === undefined) {
            oldData = null;
          }

          return this.__P_184_0.fireEvent(this, type, qx.event.type.Data, [data, oldData, !!cancelable]);
        }

        return true;
      },

      /**
       * Creates and dispatches an non-bubbling data event on this object; equivalent to 
       * fireEvent, except that it always returns a promise.
       *
       * @param type {String} Event type to fire
       * @param data {var} User defined data attached to the event object
       * @param oldData {var?null} The event's old data (optional)
       * @param cancelable {Boolean?false} Whether or not an event can have its default
       *     action prevented. The default action can either be the browser's
       *     default action of a native event (e.g. open the context menu on a
       *     right click) or the default action of a qooxdoo class (e.g. close
       *     the window widget). The default action can be prevented by calling
       *     {@link qx.event.type.Event#preventDefault}
       * @return {qx.Promise} a promise aggregated from the event handlers;
       *  if the default was prevented, the promise is rejected
       */
      fireDataEventAsync: function fireDataEventAsync(type, data, oldData, cancelable) {
        {
          throw new Error(this.classname + ".fireDataEventAsync not supported because qx.promise==false");
        }

        if (!this.$$disposed) {
          if (oldData === undefined) {
            oldData = null;
          }

          return this.__P_184_0.fireEventAsync(this, type, qx.event.type.Data, [data, oldData, !!cancelable]);
        }

        return qx.Promise.resolve(true);
      }
    }
  });
  qx.core.MEvent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MEvent.js.map?dt=1613908789352