(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.event.handler.Focus": {
        "defer": "runtime"
      },
      "qx.event.handler.Window": {
        "defer": "runtime"
      },
      "qx.event.handler.Capture": {
        "defer": "runtime"
      },
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.dispatch.AbstractBubbling": {
        "construct": true,
        "require": true
      },
      "qx.event.Registration": {
        "defer": "runtime",
        "require": true
      },
      "qx.dom.Hierarchy": {},
      "qx.bom.Event": {},
      "qx.event.type.Event": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.bom.client.OperatingSystem": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "load": true,
          "className": "qx.bom.client.Engine"
        },
        "browser.documentmode": {
          "load": true,
          "className": "qx.bom.client.Browser"
        },
        "os.version": {
          "load": true,
          "className": "qx.bom.client.OperatingSystem"
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
      * Fabian Jakobs (fjakobs)
  ************************************************************************ */

  /**
   * Implementation of the Internet Explorer specific event capturing mode for
   * mouse events http://msdn2.microsoft.com/en-us/library/ms536742.aspx.
   *
   * This class is used internally by {@link qx.event.Manager} to do mouse event
   * capturing.
   *
   * @use(qx.event.handler.Focus)
   * @use(qx.event.handler.Window)
   * @use(qx.event.handler.Capture)
   */
  qx.Class.define("qx.event.dispatch.MouseCapture", {
    extend: qx.event.dispatch.AbstractBubbling,

    /**
     * @param manager {qx.event.Manager} Event manager for the window to use
     * @param registration {qx.event.Registration} The event registration to use
     */
    construct: function construct(manager, registration) {
      qx.event.dispatch.AbstractBubbling.constructor.call(this, manager);
      this.__window = manager.getWindow();
      this.__registration = registration;
      manager.addListener(this.__window, "blur", this.releaseCapture, this);
      manager.addListener(this.__window, "focus", this.releaseCapture, this);
      manager.addListener(this.__window, "scroll", this.releaseCapture, this);
    },
    statics: {
      /** @type {Integer} Priority of this dispatcher */
      PRIORITY: qx.event.Registration.PRIORITY_FIRST
    },
    members: {
      __registration: null,
      __captureElement: null,
      __containerCapture: true,
      __window: null,
      // overridden
      _getParent: function _getParent(target) {
        return target.parentNode;
      },

      /*
      ---------------------------------------------------------------------------
        EVENT DISPATCHER INTERFACE
      ---------------------------------------------------------------------------
      */
      // overridden
      canDispatchEvent: function canDispatchEvent(target, event, type) {
        return !!(this.__captureElement && this.__captureEvents[type]);
      },
      // overridden
      dispatchEvent: function dispatchEvent(target, event, type) {
        if (type == "click") {
          event.stopPropagation();
          this.releaseCapture();
          return;
        }

        if (this.__containerCapture || !qx.dom.Hierarchy.contains(this.__captureElement, target)) {
          target = this.__captureElement;
        }

        return qx.event.dispatch.MouseCapture.prototype.dispatchEvent.base.call(this, target, event, type);
      },

      /*
      ---------------------------------------------------------------------------
        HELPER
      ---------------------------------------------------------------------------
      */

      /**
       * @lint ignoreReferenceField(__captureEvents)
       */
      __captureEvents: {
        "mouseup": 1,
        "mousedown": 1,
        "click": 1,
        "dblclick": 1,
        "mousemove": 1,
        "mouseout": 1,
        "mouseover": 1,
        "pointerdown": 1,
        "pointerup": 1,
        "pointermove": 1,
        "pointerover": 1,
        "pointerout": 1,
        "tap": 1,
        "dbltap": 1
      },

      /*
      ---------------------------------------------------------------------------
        USER ACCESS
      ---------------------------------------------------------------------------
      */

      /**
       * Set the given element as target for event
       *
       * @param element {Element} The element which should capture the mouse events.
       * @param containerCapture {Boolean?true} If true all events originating in
       *   the container are captured. IF false events originating in the container
       *   are not captured.
       */
      activateCapture: function activateCapture(element, containerCapture) {
        var containerCapture = containerCapture !== false;

        if (this.__captureElement === element && this.__containerCapture == containerCapture) {
          return;
        }

        if (this.__captureElement) {
          this.releaseCapture();
        } // turn on native mouse capturing if the browser supports it


        if (this.hasNativeCapture) {
          this.nativeSetCapture(element, containerCapture);
          var self = this;

          var onNativeListener = function onNativeListener() {
            qx.bom.Event.removeNativeListener(element, "losecapture", onNativeListener);
            self.releaseCapture();
          };

          qx.bom.Event.addNativeListener(element, "losecapture", onNativeListener);
        }

        this.__containerCapture = containerCapture;
        this.__captureElement = element;

        this.__registration.fireEvent(element, "capture", qx.event.type.Event, [true, false]);
      },

      /**
       * Get the element currently capturing events.
       *
       * @return {Element|null} The current capture element. This value may be
       *    null.
       */
      getCaptureElement: function getCaptureElement() {
        return this.__captureElement;
      },

      /**
       * Stop capturing of mouse events.
       */
      releaseCapture: function releaseCapture() {
        var element = this.__captureElement;

        if (!element) {
          return;
        }

        this.__captureElement = null;

        this.__registration.fireEvent(element, "losecapture", qx.event.type.Event, [true, false]); // turn off native mouse capturing if the browser supports it


        this.nativeReleaseCapture(element);
      },

      /** Whether the browser should use native mouse capturing */
      hasNativeCapture: qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.documentmode") < 9 || parseInt(qx.core.Environment.get("os.version"), 10) > 7 && qx.core.Environment.get("browser.documentmode") > 9,

      /**
       * If the browser supports native mouse capturing, sets the mouse capture to
       * the object that belongs to the current document.
       *
       * Please note that under Windows 7 (but not Windows 8), capturing is
       * not only applied to mouse events as expected, but also to native pointer events.
       *
       * @param element {Element} The capture DOM element
       * @param containerCapture {Boolean?true} If true all events originating in
       *   the container are captured. If false events originating in the container
       *   are not captured.
       * @signature function(element, containerCapture)
       */
      nativeSetCapture: qx.core.Environment.select("engine.name", {
        "mshtml": function mshtml(element, containerCapture) {
          element.setCapture(containerCapture !== false);
        },
        "default": function _default() {}
      }),

      /**
       * If the browser supports native mouse capturing, removes mouse capture
       * from the object in the current document.
       *
       * @param element {Element} The DOM element to release the capture for
       * @signature function(element)
       */
      nativeReleaseCapture: qx.core.Environment.select("engine.name", {
        "mshtml": function mshtml(element) {
          element.releaseCapture();
        },
        "default": function _default() {}
      })
    },
    defer: function defer(statics) {
      qx.event.Registration.addDispatcher(statics);
    }
  });
  qx.event.dispatch.MouseCapture.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MouseCapture.js.map?dt=1589124110348