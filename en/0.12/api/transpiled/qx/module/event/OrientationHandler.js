(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.module.Event": {
        "require": true,
        "defer": "runtime"
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dom.Node": {},
      "qx.event.Emitter": {},
      "qx.event.handler.OrientationCore": {},
      "qxWeb": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Daniel Wagner (danielwagner)
  
  ************************************************************************ */

  /**
   * Orientation handler which is responsible for registering and unregistering a
   * {@link qx.event.handler.OrientationCore} handler for each given element.
   *
   * @require(qx.module.Event)
   *
   * @group (Event_Normalization)
   */
  qx.Bootstrap.define("qx.module.event.OrientationHandler", {
    statics: {
      /**
       * List of events that require an orientation handler
       */
      TYPES: ["orientationchange"],

      /**
       * Creates an orientation handler for the given window when an
       * orientationchange event listener is attached to it
       *
       * @param element {Window} DOM Window
       */
      register: function register(element) {
        if (!qx.dom.Node.isWindow(element)) {
          throw new Error("The 'orientationchange' event is only available on window objects!");
        }

        if (!element.__P_252_0) {
          if (!element.$$emitter) {
            element.$$emitter = new qx.event.Emitter();
          }

          element.__P_252_0 = new qx.event.handler.OrientationCore(element, element.$$emitter);
        }
      },

      /**
       * Removes the orientation event handler from the element if there are no more
       * orientationchange event listeners attached to it
       * @param element {Element} DOM element
       */
      unregister: function unregister(element) {
        if (element.__P_252_0) {
          if (!element.$$emitter) {
            element.__P_252_0 = null;
          } else {
            var hasListener = false;
            var listeners = element.$$emitter.getListeners();
            qx.module.event.OrientationHandler.TYPES.forEach(function (type) {
              if (type in listeners && listeners[type].length > 0) {
                hasListener = true;
              }
            });

            if (!hasListener) {
              element.__P_252_0 = null;
            }
          }
        }
      }
    },
    defer: function defer(statics) {
      qxWeb.$registerEventHook(statics.TYPES, statics.register, statics.unregister);
    }
  });
  qx.module.event.OrientationHandler.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=OrientationHandler.js.map?dt=1644052375013