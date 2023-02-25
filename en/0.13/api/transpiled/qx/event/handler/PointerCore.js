(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.bom.client.Event": {
        "require": true,
        "construct": true
      },
      "qx.bom.client.Device": {
        "require": true,
        "construct": true
      },
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "construct": true,
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.bom.client.Engine": {
        "construct": true,
        "require": true
      },
      "qx.bom.client.Browser": {
        "construct": true,
        "require": true
      },
      "qx.lang.Function": {},
      "qx.dom.Node": {},
      "qx.event.Emitter": {},
      "qx.bom.Event": {},
      "qx.event.type.dom.Pointer": {},
      "qx.bom.client.OperatingSystem": {
        "require": true
      },
      "qx.lang.Array": {},
      "qx.event.Utils": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "load": true,
          "className": "qx.bom.client.Engine",
          "construct": true
        },
        "browser.documentmode": {
          "load": true,
          "className": "qx.bom.client.Browser",
          "construct": true
        },
        "event.mspointer": {
          "construct": true,
          "className": "qx.bom.client.Event"
        },
        "device.touch": {
          "construct": true,
          "className": "qx.bom.client.Device"
        },
        "os.name": {
          "className": "qx.bom.client.OperatingSystem"
        },
        "event.dispatchevent": {
          "className": "qx.bom.client.Event"
        },
        "browser.name": {
          "className": "qx.bom.client.Browser"
        },
        "browser.version": {
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
       * Christopher Zuendorf (czuendorf)
       * Daniel Wagner (danielwagner)
  
  ************************************************************************ */

  /**
   * Low-level pointer event handler.
   *
   * @require(qx.bom.client.Event)
   * @require(qx.bom.client.Device)
   */
  qx.Bootstrap.define("qx.event.handler.PointerCore", {
    extend: Object,
    implement: [qx.core.IDisposable],
    statics: {
      MOUSE_TO_POINTER_MAPPING: {
        mousedown: "pointerdown",
        mouseup: "pointerup",
        mousemove: "pointermove",
        mouseout: "pointerout",
        mouseover: "pointerover"
      },
      TOUCH_TO_POINTER_MAPPING: {
        touchstart: "pointerdown",
        touchend: "pointerup",
        touchmove: "pointermove",
        touchcancel: "pointercancel"
      },
      MSPOINTER_TO_POINTER_MAPPING: {
        MSPointerDown: "pointerdown",
        MSPointerMove: "pointermove",
        MSPointerUp: "pointerup",
        MSPointerCancel: "pointercancel",
        MSPointerLeave: "pointerleave",
        MSPointerEnter: "pointerenter",
        MSPointerOver: "pointerover",
        MSPointerOut: "pointerout"
      },
      POINTER_TO_GESTURE_MAPPING: {
        pointerdown: "gesturebegin",
        pointerup: "gesturefinish",
        pointercancel: "gesturecancel",
        pointermove: "gesturemove"
      },
      LEFT_BUTTON: qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.documentmode") <= 8 ? 1 : 0,
      SIM_MOUSE_DISTANCE: 25,
      SIM_MOUSE_DELAY: 2500,
      /**
       * Coordinates of the last touch. This needs to be static because the target could
       * change between touch and simulated mouse events. Touch events will be detected
       * by one instance which moves the target. The simulated mouse events will be fired with
       * a delay which causes another target and with that, another instance of this handler.
       * last touch was.
       */
      __P_222_0: null
    },
    /**
     * Create a new instance
     *
     * @param target {Element} element on which to listen for native touch events
     * @param emitter {qx.event.Emitter?} Event emitter (used if dispatchEvent
     * is not supported, e.g. in IE8)
     */
    construct: function construct(target, emitter) {
      this.__P_222_1 = target;
      this.__P_222_2 = emitter;
      this.__P_222_3 = [];
      this.__P_222_4 = [];
      this.__P_222_5 = [];
      this._processedFlag = "$$qx" + this.classname.substr(this.classname.lastIndexOf(".") + 1) + "Processed";
      var engineName = qx.core.Environment.get("engine.name");
      var docMode = parseInt(qx.core.Environment.get("browser.documentmode"), 10);
      if (engineName == "mshtml" && docMode == 10) {
        // listen to native prefixed events and custom unprefixed (see bug #8921)
        this.__P_222_3 = ["MSPointerDown", "MSPointerMove", "MSPointerUp", "MSPointerCancel", "MSPointerOver", "MSPointerOut", "pointerdown", "pointermove", "pointerup", "pointercancel", "pointerover", "pointerout"];
        this._initPointerObserver();
      } else {
        if (qx.core.Environment.get("event.mspointer")) {
          this.__P_222_6 = true;
        }
        this.__P_222_3 = ["pointerdown", "pointermove", "pointerup", "pointercancel", "pointerover", "pointerout"];
        this._initPointerObserver();
      }
      if (!qx.core.Environment.get("event.mspointer")) {
        if (qx.core.Environment.get("device.touch")) {
          this.__P_222_3 = ["touchstart", "touchend", "touchmove", "touchcancel"];
          this._initObserver(this._onTouchEvent);
        }
        this.__P_222_3 = ["mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "contextmenu"];
        this._initObserver(this._onMouseEvent);
      }
    },
    members: {
      __P_222_1: null,
      __P_222_2: null,
      __P_222_3: null,
      __P_222_6: false,
      __P_222_7: null,
      __P_222_8: 0,
      __P_222_4: null,
      __P_222_9: null,
      __P_222_5: null,
      _processedFlag: null,
      /**
       * Adds listeners to native pointer events if supported
       */
      _initPointerObserver: function _initPointerObserver() {
        this._initObserver(this._onPointerEvent);
      },
      /**
       * Register native event listeners
       * @param callback {Function} listener callback
       * @param useEmitter {Boolean} attach listener to Emitter instead of
       * native event
       */
      _initObserver: function _initObserver(callback, useEmitter) {
        this.__P_222_7 = qx.lang.Function.listener(callback, this);
        this.__P_222_3.forEach(function (type) {
          if (useEmitter && qx.dom.Node.isDocument(this.__P_222_1)) {
            if (!this.__P_222_1.$$emitter) {
              this.__P_222_1.$$emitter = new qx.event.Emitter();
            }
            this.__P_222_1.$$emitter.on(type, this.__P_222_7);
          } else {
            qx.bom.Event.addNativeListener(this.__P_222_1, type, this.__P_222_7);
          }
        }.bind(this));
      },
      /**
       * Handler for native pointer events
       * @param domEvent {Event}  Native DOM event
       */
      _onPointerEvent: function _onPointerEvent(domEvent) {
        if (!qx.core.Environment.get("event.mspointer") ||
        // workaround for bug #8533
        qx.core.Environment.get("browser.documentmode") === 10 && domEvent.type.toLowerCase().indexOf("ms") == -1) {
          return;
        }
        if (!this.__P_222_6) {
          domEvent.stopPropagation();
        }
        var type = qx.event.handler.PointerCore.MSPOINTER_TO_POINTER_MAPPING[domEvent.type] || domEvent.type;
        var target = qx.bom.Event.getTarget(domEvent);
        var evt = new qx.event.type.dom.Pointer(type, domEvent);
        this._fireEvent(evt, type, target);
      },
      /**
       * Handler for touch events
       * @param domEvent {Event} Native DOM event
       */
      _onTouchEvent: function _onTouchEvent(domEvent) {
        if (domEvent[this._processedFlag]) {
          return;
        }
        domEvent[this._processedFlag] = true;
        var type = qx.event.handler.PointerCore.TOUCH_TO_POINTER_MAPPING[domEvent.type];
        var changedTouches = domEvent.changedTouches;
        this._determineActiveTouches(domEvent.type, changedTouches);

        // Detecting vacuum touches. (Touches which are not active anymore, but did not fire a touchcancel event)
        if (domEvent.touches.length < this.__P_222_5.length) {
          // Firing pointer cancel for previously active touches.
          for (var i = this.__P_222_5.length - 1; i >= 0; i--) {
            var cancelEvent = new qx.event.type.dom.Pointer("pointercancel", domEvent, {
              identifier: this.__P_222_5[i].identifier,
              target: domEvent.target,
              pointerType: "touch",
              pointerId: this.__P_222_5[i].identifier + 2
            });
            this._fireEvent(cancelEvent, "pointercancel", domEvent.target);
          }

          // Reset primary identifier
          this.__P_222_9 = null;

          // cleanup of active touches array.
          this.__P_222_5 = [];

          // Do nothing after pointer cancel.
          return;
        }
        if (domEvent.type == "touchstart" && this.__P_222_9 === null) {
          this.__P_222_9 = changedTouches[0].identifier;
        }
        for (var i = 0, l = changedTouches.length; i < l; i++) {
          var touch = changedTouches[i];
          var touchTarget = domEvent.view.document.elementFromPoint(touch.clientX, touch.clientY) || domEvent.target;
          var touchProps = {
            clientX: touch.clientX,
            clientY: touch.clientY,
            pageX: touch.pageX,
            pageY: touch.pageY,
            identifier: touch.identifier,
            screenX: touch.screenX,
            screenY: touch.screenY,
            target: touchTarget,
            pointerType: "touch",
            pointerId: touch.identifier + 2
          };
          if (domEvent.type == "touchstart") {
            // Fire pointerenter before pointerdown
            var overEvt = new qx.event.type.dom.Pointer("pointerover", domEvent, touchProps);
            this._fireEvent(overEvt, "pointerover", touchProps.target);
          }
          if (touch.identifier == this.__P_222_9) {
            touchProps.isPrimary = true;
            // always simulate left click on touch interactions for primary pointer
            touchProps.button = 0;
            touchProps.buttons = 1;
            qx.event.handler.PointerCore.__P_222_0 = {
              x: touch.clientX,
              y: touch.clientY,
              time: new Date().getTime()
            };
          }
          var evt = new qx.event.type.dom.Pointer(type, domEvent, touchProps);
          this._fireEvent(evt, type, touchProps.target);
          if (domEvent.type == "touchend" || domEvent.type == "touchcancel") {
            // Fire pointerout after pointerup
            var outEvt = new qx.event.type.dom.Pointer("pointerout", domEvent, touchProps);

            // fire on the original target to make sure over / out event are on the same target
            this._fireEvent(outEvt, "pointerout", domEvent.target);
            if (this.__P_222_9 == touch.identifier) {
              this.__P_222_9 = null;
            }
          }
        }
      },
      /**
       * Handler for touch events
       * @param domEvent {Event} Native DOM event
       */
      _onMouseEvent: function _onMouseEvent(domEvent) {
        if (domEvent[this._processedFlag]) {
          return;
        }
        domEvent[this._processedFlag] = true;
        if (this._isSimulatedMouseEvent(domEvent.clientX, domEvent.clientY)) {
          /*
            Simulated MouseEvents are fired by browsers directly after TouchEvents
            for improving compatibility. They should not trigger PointerEvents.
          */
          return;
        }
        if (domEvent.type == "mousedown") {
          this.__P_222_4[domEvent.which] = 1;
        } else if (domEvent.type == "mouseup") {
          if (qx.core.Environment.get("os.name") == "osx" && qx.core.Environment.get("engine.name") == "gecko") {
            if (this.__P_222_4[domEvent.which] != 1 && domEvent.ctrlKey) {
              this.__P_222_4[1] = 0;
            }
          }
          this.__P_222_4[domEvent.which] = 0;
        }
        var type = qx.event.handler.PointerCore.MOUSE_TO_POINTER_MAPPING[domEvent.type];
        var target = qx.bom.Event.getTarget(domEvent);
        var buttonsPressed = qx.lang.Array.sum(this.__P_222_4);
        var mouseProps = {
          pointerType: "mouse",
          pointerId: 1
        };

        // if the button state changes but not from or to zero
        if (this.__P_222_8 != buttonsPressed && buttonsPressed !== 0 && this.__P_222_8 !== 0) {
          var moveEvt = new qx.event.type.dom.Pointer("pointermove", domEvent, mouseProps);
          this._fireEvent(moveEvt, "pointermove", target);
        }
        this.__P_222_8 = buttonsPressed;

        // pointerdown should only trigger form the first pressed button.
        if (domEvent.type == "mousedown" && buttonsPressed > 1) {
          return;
        }

        // pointerup should only trigger if user releases all buttons.
        if (domEvent.type == "mouseup" && buttonsPressed > 0) {
          return;
        }
        if (domEvent.type == "contextmenu") {
          this.__P_222_4[domEvent.which] = 0;
          return;
        }
        var evt = new qx.event.type.dom.Pointer(type, domEvent, mouseProps);
        this._fireEvent(evt, type, target);
      },
      /**
       * Determines the current active touches.
       * @param type {String} the DOM event type.
       * @param changedTouches {Array} the current changed touches.
       */
      _determineActiveTouches: function _determineActiveTouches(type, changedTouches) {
        if (type == "touchstart") {
          for (var i = 0; i < changedTouches.length; i++) {
            this.__P_222_5.push(changedTouches[i]);
          }
        } else if (type == "touchend" || type == "touchcancel") {
          var updatedActiveTouches = [];
          for (var i = 0; i < this.__P_222_5.length; i++) {
            var add = true;
            for (var j = 0; j < changedTouches.length; j++) {
              if (this.__P_222_5[i].identifier == changedTouches[j].identifier) {
                add = false;
                break;
              }
            }
            if (add) {
              updatedActiveTouches.push(this.__P_222_5[i]);
            }
          }
          this.__P_222_5 = updatedActiveTouches;
        }
      },
      /**
       * Detects whether the given MouseEvent position is identical to the previously fired TouchEvent position.
       * If <code>true</code> the corresponding event can be identified as simulated.
       * @param x {Integer} current mouse x
       * @param y {Integer} current mouse y
       * @return {Boolean} <code>true</code> if passed mouse position is a synthetic MouseEvent.
       */
      _isSimulatedMouseEvent: function _isSimulatedMouseEvent(x, y) {
        var touch = qx.event.handler.PointerCore.__P_222_0;
        if (touch) {
          var timeSinceTouch = new Date().getTime() - touch.time;
          var dist = qx.event.handler.PointerCore.SIM_MOUSE_DISTANCE;
          var distX = Math.abs(x - qx.event.handler.PointerCore.__P_222_0.x);
          var distY = Math.abs(y - qx.event.handler.PointerCore.__P_222_0.y);
          if (timeSinceTouch < qx.event.handler.PointerCore.SIM_MOUSE_DELAY) {
            if (distX < dist || distY < dist) {
              return true;
            }
          }
        }
        return false;
      },
      /**
       * Removes native pointer event listeners.
       */
      _stopObserver: function _stopObserver() {
        for (var i = 0; i < this.__P_222_3.length; i++) {
          qx.bom.Event.removeNativeListener(this.__P_222_1, this.__P_222_3[i], this.__P_222_7);
        }
      },
      /**
       * Fire a touch event with the given parameters
       *
       * @param domEvent {Event} DOM event
       * @param type {String ? null} type of the event
       * @param target {Element ? null} event target
       * @return {qx.Promise?} a promise, if one was returned by event handlers
       */
      _fireEvent: function _fireEvent(domEvent, type, target) {
        target = target || domEvent.target;
        type = type || domEvent.type;
        var gestureEvent;
        if ((domEvent.pointerType !== "mouse" || domEvent.button <= qx.event.handler.PointerCore.LEFT_BUTTON) && (type == "pointerdown" || type == "pointerup" || type == "pointermove")) {
          gestureEvent = new qx.event.type.dom.Pointer(qx.event.handler.PointerCore.POINTER_TO_GESTURE_MAPPING[type], domEvent);
          qx.event.type.dom.Pointer.normalize(gestureEvent);
          try {
            gestureEvent.srcElement = target;
          } catch (ex) {
            // Nothing - strict mode prevents writing to read only properties
          }
        }
        if (qx.core.Environment.get("event.dispatchevent")) {
          var tracker = {};
          if (!this.__P_222_6) {
            qx.event.Utils.then(tracker, function () {
              return target.dispatchEvent(domEvent);
            });
          }
          if (gestureEvent) {
            qx.event.Utils.then(tracker, function () {
              return target.dispatchEvent(gestureEvent);
            });
          }
          return tracker.promise;
        } else {
          if (qx.core.Environment.get("browser.name") === "msie" && qx.core.Environment.get("browser.version") < 9) {
            // ensure compatibility with native events for IE8
            try {
              domEvent.srcElement = target;
            } catch (ex) {
              // Nothing - strict mode prevents writing to read only properties
            }
          }
          while (target) {
            if (target.$$emitter) {
              domEvent.currentTarget = target;
              if (!domEvent._stopped) {
                target.$$emitter.emit(type, domEvent);
              }
              if (gestureEvent && !gestureEvent._stopped) {
                gestureEvent.currentTarget = target;
                target.$$emitter.emit(gestureEvent.type, gestureEvent);
              }
            }
            target = target.parentNode;
          }
        }
      },
      /**
       * Dispose this object
       */
      dispose: function dispose() {
        this._stopObserver();
        this.__P_222_1 = this.__P_222_2 = null;
      }
    }
  });
  qx.event.handler.PointerCore.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PointerCore.js.map?dt=1677345931918