(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.event.handler.Pointer": {
        "require": true,
        "defer": "runtime"
      },
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.handler.GestureCore": {
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
      "qx.event.type.Tap": {
        "require": true
      },
      "qx.event.type.Swipe": {
        "require": true
      },
      "qx.event.type.Rotate": {
        "require": true
      },
      "qx.event.type.Pinch": {
        "require": true
      },
      "qx.event.type.Track": {
        "require": true
      },
      "qx.event.type.Roll": {
        "require": true
      },
      "qx.lang.Function": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.bom.Event": {},
      "qx.bom.client.Event": {},
      "qx.event.type.Pointer": {},
      "qx.event.type.Data": {}
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
       2014 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Daniel Wagner (danielwagner)
  
  ************************************************************************ */

  /**
   * Unified gesture event handler.
   *
   * @require(qx.event.handler.Pointer)
   */
  qx.Class.define("qx.event.handler.Gesture", {
    extend: qx.event.handler.GestureCore,
    implement: [qx.event.IEventHandler, qx.core.IDisposable],
    statics: {
      /** @type {Integer} Priority of this handler */
      PRIORITY: qx.event.Registration.PRIORITY_NORMAL,
      /** @type {Map} Supported event types */
      SUPPORTED_TYPES: {
        tap: 1,
        swipe: 1,
        longtap: 1,
        dbltap: 1,
        rotate: 1,
        pinch: 1,
        track: 1,
        trackstart: 1,
        trackend: 1,
        roll: 1
      },
      GESTURE_EVENTS: ["gesturebegin", "gesturefinish", "gesturemove", "gesturecancel"],
      /** @type {Integer} Which target check to use */
      TARGET_CHECK: qx.event.IEventHandler.TARGET_DOMNODE + qx.event.IEventHandler.TARGET_DOCUMENT,
      /** @type {Integer} Whether the method "canHandleEvent" must be called */
      IGNORE_CAN_HANDLE: true,
      EVENT_CLASSES: {
        tap: qx.event.type.Tap,
        longtap: qx.event.type.Tap,
        dbltap: qx.event.type.Tap,
        swipe: qx.event.type.Swipe,
        rotate: qx.event.type.Rotate,
        pinch: qx.event.type.Pinch,
        track: qx.event.type.Track,
        trackstart: qx.event.type.Track,
        trackend: qx.event.type.Track,
        roll: qx.event.type.Roll
      }
    },
    /**
     * Create a new instance
     *
     * @param manager {qx.event.Manager} Event manager for the window to use
     */
    construct: function construct(manager) {
      // Define shorthands
      this.__P_221_0 = manager;
      this.__P_221_1 = manager.getWindow();
      this.__P_221_2 = this.__P_221_1.document;
      qx.event.handler.GestureCore.apply(this, [this.__P_221_2]);
    },
    members: {
      __P_221_0: null,
      __P_221_1: null,
      __P_221_2: null,
      __P_221_3: null,
      __P_221_4: null,
      __P_221_5: null,
      /**
       * Getter for the internal __window object
       * @return {Window} DOM window instance
       */
      getWindow: function getWindow() {
        return this.__P_221_1;
      },
      // interface implementation
      canHandleEvent: function canHandleEvent(target, type) {},
      // interface implementation
      registerEvent: function registerEvent(target, type, capture) {
        // Nothing needs to be done here
      },
      // interface implementation
      unregisterEvent: function unregisterEvent(target, type, capture) {
        // Nothing needs to be done here
      },
      // overridden
      _initObserver: function _initObserver() {
        this.__P_221_3 = qx.lang.Function.listener(this.checkAndFireGesture, this);
        qx.event.handler.Gesture.GESTURE_EVENTS.forEach(function (type) {
          qx.event.Registration.addListener(this.__P_221_2, type, this.__P_221_3, this);
        }.bind(this));
        if (qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.documentmode") < 9) {
          this.__P_221_4 = qx.lang.Function.listener(this._onDblClick, this);
          qx.bom.Event.addNativeListener(this.__P_221_2, "dblclick", this.__P_221_4);
        }

        // list to wheel events
        var data = qx.bom.client.Event.getMouseWheel(this.__P_221_1);
        this.__P_221_5 = qx.lang.Function.listener(this._fireRoll, this);
        // replaced the useCapture (4th parameter) from this to true
        // see https://github.com/qooxdoo/qooxdoo/pull/9292
        qx.bom.Event.addNativeListener(data.target, data.type, this.__P_221_5, true, false);
      },
      /**
       * Checks if a gesture was made and fires the gesture event.
       *
       * @param pointerEvent {qx.event.type.Pointer} Pointer event
       * @param type {String ? null} type of the event
       * @param target {Element ? null} event target
       */
      checkAndFireGesture: function checkAndFireGesture(pointerEvent, type, target) {
        this.__P_221_6("checkAndFireGesture", [pointerEvent.getNativeEvent(), pointerEvent.getType(), pointerEvent.getTarget()]);
      },
      // overridden
      _stopObserver: function _stopObserver() {
        qx.event.handler.Gesture.GESTURE_EVENTS.forEach(function (type) {
          qx.event.Registration.removeListener(this.__P_221_2, type, this.__P_221_3);
        }.bind(this));
        if (qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.documentmode") < 9) {
          qx.bom.Event.removeNativeListener(this.__P_221_2, "dblclick", this.__P_221_4);
        }
        var data = qx.bom.client.Event.getMouseWheel(this.__P_221_1);
        qx.bom.Event.removeNativeListener(data.target, data.type, this.__P_221_5);
      },
      // overridden
      _hasIntermediaryHandler: function _hasIntermediaryHandler(target) {
        /* This check is irrelevant for qx.Desktop since there is only one
           gesture handler */
        return false;
      },
      /**
       * Fire a touch event with the given parameters
       *
       * @param domEvent {Event} DOM event
       * @param type {String ? null} type of the event
       * @param target {Element ? null} event target
       */
      _fireEvent: function _fireEvent(domEvent, type, target) {
        if (!target) {
          target = qx.bom.Event.getTarget(domEvent);
        }
        if (!type) {
          type = domEvent.type;
        }
        var eventTypeClass = qx.event.handler.Gesture.EVENT_CLASSES[type] || qx.event.type.Pointer;
        if (target && target.nodeType) {
          qx.event.Registration.fireEvent(target, type, eventTypeClass, [domEvent, target, null, true, true]);
        }

        // Fire user action event
        qx.event.Registration.fireEvent(this.__P_221_1, "useraction", qx.event.type.Data, [type]);
      },
      /**
       * Dispose this object
       */
      dispose: function dispose() {
        this._stopObserver();
        this.__P_221_6("dispose");
        this.__P_221_0 = this.__P_221_1 = this.__P_221_2 = this.__P_221_4 = null;
      },
      /**
       * Call overridden method.
       *
       * @param method {String} Name of the overridden method.
       * @param args {Array} Arguments.
       */
      __P_221_6: function __P_221_6(method, args) {
        qx.event.handler.GestureCore.prototype[method].apply(this, args || []);
      }
    },
    defer: function defer(statics) {
      qx.event.Registration.addHandler(statics);
      qx.event.Registration.addListener(window, "appinitialized", function () {
        qx.event.Registration.getManager(document).getHandler(statics);
      });
    }
  });
  qx.event.handler.Gesture.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Gesture.js.map?dt=1726089044864