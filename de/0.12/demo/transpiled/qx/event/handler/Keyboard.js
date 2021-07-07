(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.event.handler.UserAction": {
        "require": true,
        "defer": "runtime"
      },
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.event.IEventHandler": {
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.bom.client.Engine": {
        "construct": true,
        "defer": "load",
        "require": true
      },
      "qx.event.Registration": {
        "defer": "runtime",
        "require": true
      },
      "qx.event.type.KeyInput": {},
      "qx.event.Utils": {},
      "qx.event.type.Data": {},
      "qx.event.type.KeySequence": {},
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.event.util.Keyboard": {},
      "qx.event.handler.Focus": {},
      "qx.lang.Function": {},
      "qx.bom.Event": {},
      "qx.event.GlobalError": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.ObjectRegistry": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "construct": true,
          "className": "qx.bom.client.Engine",
          "load": true,
          "defer": true
        },
        "browser.version": {
          "className": "qx.bom.client.Browser",
          "load": true
        },
        "engine.version": {
          "className": "qx.bom.client.Engine"
        }
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
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * This class provides unified key event handler for Internet Explorer,
   * Firefox, Opera and Safari.
   *
   * NOTE: Instances of this class must be disposed of after use
   *
   * @require(qx.event.handler.UserAction)
   */
  qx.Class.define("qx.event.handler.Keyboard", {
    extend: qx.core.Object,
    implement: [qx.event.IEventHandler, qx.core.IDisposable],

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
      qx.core.Object.constructor.call(this); // Define shorthands

      this.__P_302_0 = manager;
      this.__P_302_1 = manager.getWindow(); // Gecko ignores key events when not explicitly clicked in the document.

      if (qx.core.Environment.get("engine.name") == "gecko") {
        this.__P_302_2 = this.__P_302_1;
      } else {
        this.__P_302_2 = this.__P_302_1.document.documentElement;
      } // Internal sequence cache


      this.__P_302_3 = {}; // Initialize observer

      this._initKeyObserver();
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /** @type {Integer} Priority of this handler */
      PRIORITY: qx.event.Registration.PRIORITY_NORMAL,

      /** @type {Map} Supported event types */
      SUPPORTED_TYPES: {
        keyup: 1,
        keydown: 1,
        keypress: 1,
        keyinput: 1
      },

      /** @type {Integer} Which target check to use */
      TARGET_CHECK: qx.event.IEventHandler.TARGET_DOMNODE,

      /** @type {Integer} Whether the method "canHandleEvent" must be called */
      IGNORE_CAN_HANDLE: true
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_302_4: null,
      __P_302_0: null,
      __P_302_1: null,
      __P_302_2: null,
      __P_302_3: null,
      __P_302_5: null,
      __P_302_6: null,
      __P_302_7: null,

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER INTERFACE
      ---------------------------------------------------------------------------
      */
      // interface implementation
      canHandleEvent: function canHandleEvent(target, type) {},
      // interface implementation
      registerEvent: function registerEvent(target, type, capture) {// Nothing needs to be done here
      },
      // interface implementation
      unregisterEvent: function unregisterEvent(target, type, capture) {// Nothing needs to be done here
      },

      /*
      ---------------------------------------------------------------------------
        HELPER
      ---------------------------------------------------------------------------
      */

      /**
       * Fire a key input event with the given parameters
       *
       * @param domEvent {Event} DOM event
       * @param charCode {Integer} character code
       * @return {qx.Promise?} a promise if the event handlers created one
       */
      _fireInputEvent: function _fireInputEvent(domEvent, charCode) {
        var target = this.__P_302_8();

        var tracker = {};
        var self = this; // Only fire when target is defined and visible

        if (target && target.offsetWidth != 0) {
          var event = qx.event.Registration.createEvent("keyinput", qx.event.type.KeyInput, [domEvent, target, charCode]);
          qx.event.Utils.then(tracker, function () {
            self.__P_302_0.dispatchEvent(target, event);
          });
        } // Fire user action event
        // Needs to check if still alive first


        if (this.__P_302_1) {
          var self = this;
          qx.event.Utils.then(tracker, function () {
            return qx.event.Registration.fireEvent(self.__P_302_1, "useraction", qx.event.type.Data, ["keyinput"]);
          });
        }

        return tracker.promise;
      },

      /**
       * Fire a key up/down/press event with the given parameters
       *
       * @param domEvent {Event} DOM event
       * @param type {String} type og the event
       * @param keyIdentifier {String} key identifier
       * @return {qx.Promise?} a promise, if any of the event handlers returned a promise
       */
      _fireSequenceEvent: function _fireSequenceEvent(domEvent, type, keyIdentifier) {
        var target = this.__P_302_8();

        var keyCode = domEvent.keyCode;
        var tracker = {};
        var self = this; // Fire key event

        var event = qx.event.Registration.createEvent(type, qx.event.type.KeySequence, [domEvent, target, keyIdentifier]);
        qx.event.Utils.then(tracker, function () {
          return self.__P_302_0.dispatchEvent(target, event);
        }); // IE and Safari suppress a "keypress" event if the "keydown" event's
        // default action was prevented. In this case we emulate the "keypress"
        //
        // FireFox suppresses "keypress" when "keydown" default action is prevented.
        // from version 29: https://bugzilla.mozilla.org/show_bug.cgi?id=935876.

        if (event.getDefaultPrevented() && type == "keydown") {
          if (qx.core.Environment.get("engine.name") == "mshtml" || qx.core.Environment.get("engine.name") == "webkit" || qx.core.Environment.get("engine.name") == "gecko" && qx.core.Environment.get("browser.version") >= 29) {
            // some key press events are already emulated. Ignore these events.
            if (!qx.event.util.Keyboard.isNonPrintableKeyCode(keyCode) && !this._emulateKeyPress[keyCode]) {
              qx.event.Utils.then(tracker, function () {
                return self._fireSequenceEvent(domEvent, "keypress", keyIdentifier);
              });
            }
          }
        } // Fire user action event
        // Needs to check if still alive first


        if (this.__P_302_1) {
          qx.event.Utils.then(tracker, function () {
            return qx.event.Registration.fireEvent(self.__P_302_1, "useraction", qx.event.type.Data, [type]);
          });
        }

        return tracker.promise;
      },

      /**
       * Get the target element for key events
       *
       * @return {Element} the event target element
       */
      __P_302_8: function __P_302_8() {
        var focusHandler = this.__P_302_0.getHandler(qx.event.handler.Focus);

        var target = focusHandler.getActive(); // Fallback to focused element when active is null or invisible

        if (!target || target.offsetWidth == 0) {
          target = focusHandler.getFocus();
        } // Fallback to body when focused is null or invisible


        if (!target || target.offsetWidth == 0) {
          target = this.__P_302_0.getWindow().document.body;
        }

        return target;
      },

      /*
      ---------------------------------------------------------------------------
        OBSERVER INIT/STOP
      ---------------------------------------------------------------------------
      */

      /**
       * Initializes the native key event listeners.
       *
       * @signature function()
       */
      _initKeyObserver: function _initKeyObserver() {
        this.__P_302_4 = qx.lang.Function.listener(this.__P_302_9, this);
        this.__P_302_7 = qx.lang.Function.listener(this.__P_302_10, this);
        var Event = qx.bom.Event;
        Event.addNativeListener(this.__P_302_2, "keyup", this.__P_302_4);
        Event.addNativeListener(this.__P_302_2, "keydown", this.__P_302_4);
        Event.addNativeListener(this.__P_302_2, "keypress", this.__P_302_7);
      },

      /**
       * Stops the native key event listeners.
       *
       * @signature function()
       */
      _stopKeyObserver: function _stopKeyObserver() {
        var Event = qx.bom.Event;
        Event.removeNativeListener(this.__P_302_2, "keyup", this.__P_302_4);
        Event.removeNativeListener(this.__P_302_2, "keydown", this.__P_302_4);
        Event.removeNativeListener(this.__P_302_2, "keypress", this.__P_302_7);

        for (var key in this.__P_302_6 || {}) {
          var listener = this.__P_302_6[key];
          Event.removeNativeListener(listener.target, "keypress", listener.callback);
        }

        delete this.__P_302_6;
      },

      /*
      ---------------------------------------------------------------------------
        NATIVE EVENT OBSERVERS
      ---------------------------------------------------------------------------
      */

      /**
       * Low level handler for "keyup" and "keydown" events
       *
       * @internal
       * @signature function(domEvent)
       * @param domEvent {Event} DOM event object
       */
      __P_302_9: qx.event.GlobalError.observeMethod(qx.core.Environment.select("engine.name", {
        "gecko|webkit|mshtml": function geckoWebkitMshtml(domEvent) {
          var keyCode = 0;
          var charCode = 0;
          var type = domEvent.type;
          keyCode = domEvent.keyCode;
          var tracker = {};
          var self = this;
          qx.event.Utils.track(tracker, this._idealKeyHandler(keyCode, charCode, type, domEvent)); // On non print-able character be sure to add a keypress event

          if (type == "keydown") {
            /*
             * We need an artificial keypress event for every keydown event.
             * Newer browsers do not fire keypress for a regular charachter key (e.g when typing 'a')
             * if it was typed with the CTRL, ALT or META Key pressed during typing, like
             * doing it when typing the combination CTRL+A
             */
            var isModifierDown = domEvent.ctrlKey || domEvent.altKey || domEvent.metaKey; // non-printable, backspace, tab or the modfier keys are down

            if (qx.event.util.Keyboard.isNonPrintableKeyCode(keyCode) || this._emulateKeyPress[keyCode] || isModifierDown) {
              qx.event.Utils.then(tracker, function () {
                return self._idealKeyHandler(keyCode, charCode, "keypress", domEvent);
              });
            }
          } // Store last type


          this.__P_302_3[keyCode] = type;
          return tracker.promise;
        },
        "opera": function opera(domEvent) {
          this.__P_302_5 = domEvent.keyCode;
          return this._idealKeyHandler(domEvent.keyCode, 0, domEvent.type, domEvent);
        }
      })),

      /**
       * some keys like "up", "down", "pageup", "pagedown" do not bubble a
       * "keypress" event in Firefox. To work around this bug we attach keypress
       * listeners directly to the input events.
       *
       * https://bugzilla.mozilla.org/show_bug.cgi?id=467513
       *
       * @signature function(target, type, keyCode)
       * @param target {Element} The event target
       * @param type {String} The event type
       * @param keyCode {Integer} the key code
       */
      __P_302_11: qx.core.Environment.select("engine.name", {
        "gecko": function gecko(target, type, keyCode) {
          if (type === "keydown" && (keyCode == 33 || keyCode == 34 || keyCode == 38 || keyCode == 40) && target.type == "text" && target.tagName.toLowerCase() === "input" && target.getAttribute("autoComplete") !== "off") {
            if (!this.__P_302_6) {
              this.__P_302_6 = {};
            }

            var hash = qx.core.ObjectRegistry.toHashCode(target);

            if (this.__P_302_6[hash]) {
              return;
            }

            var self = this;
            this.__P_302_6[hash] = {
              target: target,
              callback: function callback(domEvent) {
                qx.bom.Event.stopPropagation(domEvent);

                self.__P_302_10(domEvent);
              }
            };
            var listener = qx.event.GlobalError.observeMethod(this.__P_302_6[hash].callback);
            qx.bom.Event.addNativeListener(target, "keypress", listener);
          }
        },
        "default": null
      }),

      /**
       * Low level key press handler
       *
       * @signature function(domEvent)
       * @param domEvent {Event} DOM event object
       */
      __P_302_10: qx.event.GlobalError.observeMethod(qx.core.Environment.select("engine.name", {
        "mshtml": function mshtml(domEvent) {
          domEvent = window.event || domEvent;

          if (this._charCode2KeyCode[domEvent.keyCode]) {
            return this._idealKeyHandler(this._charCode2KeyCode[domEvent.keyCode], 0, domEvent.type, domEvent);
          } else {
            return this._idealKeyHandler(0, domEvent.keyCode, domEvent.type, domEvent);
          }
        },
        "gecko": function gecko(domEvent) {
          if (qx.core.Environment.get("engine.version") < 66) {
            var charCode = domEvent.charCode;
            var type = domEvent.type;
            return this._idealKeyHandler(domEvent.keyCode, charCode, type, domEvent);
          } else {
            if (this._charCode2KeyCode[domEvent.keyCode]) {
              return this._idealKeyHandler(this._charCode2KeyCode[domEvent.keyCode], 0, domEvent.type, domEvent);
            } else {
              return this._idealKeyHandler(0, domEvent.keyCode, domEvent.type, domEvent);
            }
          }
        },
        "webkit": function webkit(domEvent) {
          if (this._charCode2KeyCode[domEvent.keyCode]) {
            return this._idealKeyHandler(this._charCode2KeyCode[domEvent.keyCode], 0, domEvent.type, domEvent);
          } else {
            return this._idealKeyHandler(0, domEvent.keyCode, domEvent.type, domEvent);
          }
        },
        "opera": function opera(domEvent) {
          var keyCode = domEvent.keyCode;
          var type = domEvent.type; // Some keys are identified differently for key up/down and keypress
          // (e.g. "v" gets identified as "F7").
          // So we store the last key up/down keycode and compare it to the
          // current keycode.
          // See http://bugzilla.qooxdoo.org/show_bug.cgi?id=603

          if (keyCode != this.__P_302_5) {
            return this._idealKeyHandler(0, this.__P_302_5, type, domEvent);
          } else {
            if (qx.event.util.Keyboard.keyCodeToIdentifierMap[domEvent.keyCode]) {
              return this._idealKeyHandler(domEvent.keyCode, 0, domEvent.type, domEvent);
            } else {
              return this._idealKeyHandler(0, domEvent.keyCode, domEvent.type, domEvent);
            }
          }
        }
      })),

      /*
      ---------------------------------------------------------------------------
        IDEAL KEY HANDLER
      ---------------------------------------------------------------------------
      */

      /**
       * Key handler for an idealized browser.
       * Runs after the browser specific key handlers have normalized the key events.
       *
       * @param keyCode {String} keyboard code
       * @param charCode {String} character code
       * @param eventType {String} type of the event (keydown, keypress, keyup)
       * @param domEvent {Element} DomEvent
       * @return {qx.Promise?} a promise, if an event handler created one
       */
      _idealKeyHandler: function _idealKeyHandler(keyCode, charCode, eventType, domEvent) {
        var keyIdentifier; // Use: keyCode

        if (keyCode || !keyCode && !charCode) {
          keyIdentifier = qx.event.util.Keyboard.keyCodeToIdentifier(keyCode);
          return this._fireSequenceEvent(domEvent, eventType, keyIdentifier);
        } // Use: charCode
        else {
            keyIdentifier = qx.event.util.Keyboard.charCodeToIdentifier(charCode);
            var tracker = {};
            var self = this;
            qx.event.Utils.track(tracker, this._fireSequenceEvent(domEvent, "keypress", keyIdentifier));
            return qx.event.Utils.then(tracker, function () {
              return self._fireInputEvent(domEvent, charCode);
            });
          }
      },

      /*
      ---------------------------------------------------------------------------
        KEY MAPS
      ---------------------------------------------------------------------------
      */

      /**
       * @type {Map} maps the charcodes of special keys for key press emulation
       *
       * @lint ignoreReferenceField(_emulateKeyPress)
       */
      _emulateKeyPress: qx.core.Environment.select("engine.name", {
        "mshtml": {
          8: true,
          9: true
        },
        "webkit": {
          8: true,
          9: true,
          27: true
        },
        "gecko": qx.core.Environment.get("browser.version") >= 65 ? {
          8: true,
          9: true,
          27: true
        } : {},
        "default": {}
      }),

      /*
      ---------------------------------------------------------------------------
        HELPER METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * converts a key identifier back to a keycode
       *
       * @param keyIdentifier {String} The key identifier to convert
       * @return {Integer} keyboard code
       */
      _identifierToKeyCode: function _identifierToKeyCode(keyIdentifier) {
        return qx.event.util.Keyboard.identifierToKeyCodeMap[keyIdentifier] || keyIdentifier.charCodeAt(0);
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._stopKeyObserver();

      this.__P_302_5 = this.__P_302_0 = this.__P_302_1 = this.__P_302_2 = this.__P_302_3 = null;
    },

    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */
    defer: function defer(statics, members) {
      // register at the event handler
      qx.event.Registration.addHandler(statics);

      if (qx.core.Environment.get("engine.name") !== "opera") {
        members._charCode2KeyCode = {
          13: 13,
          27: 27
        };
      }
    }
  });
  qx.event.handler.Keyboard.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Keyboard.js.map?dt=1625668987383