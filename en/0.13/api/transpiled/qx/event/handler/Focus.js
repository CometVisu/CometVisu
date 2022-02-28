(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.event.dispatch.DomBubbling": {
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
      "qx.bom.client.OperatingSystem": {
        "construct": true,
        "require": true
      },
      "qx.core.Init": {
        "construct": true
      },
      "qx.event.Registration": {
        "defer": "runtime",
        "require": true
      },
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.Selection": {},
      "qx.event.type.Focus": {},
      "qx.lang.Function": {},
      "qx.bom.Event": {},
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.event.GlobalError": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {},
      "qx.bom.element.Attribute": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "os.name": {
          "construct": true,
          "className": "qx.bom.client.OperatingSystem"
        },
        "os.version": {
          "construct": true,
          "className": "qx.bom.client.OperatingSystem"
        },
        "engine.name": {
          "load": true,
          "className": "qx.bom.client.Engine"
        },
        "browser.name": {
          "load": true,
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
       2007-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * This handler is used to normalize all focus/activation requirements
   * and normalize all cross browser quirks in this area.
   *
   * Notes:
   *
   * * Webkit and Opera (before 9.5) do not support tabIndex for all elements
   * (See also: https://bugs.webkit.org/show_bug.cgi?id=7138)
   *
   * * TabIndex is normally 0, which means all naturally focusable elements are focusable.
   * * TabIndex > 0 means that the element is focusable and tabable
   * * TabIndex < 0 means that the element, even if naturally possible, is not focusable.
   *
   * NOTE: Instances of this class must be disposed of after use
   *
   * @use(qx.event.dispatch.DomBubbling)
   */
  qx.Class.define("qx.event.handler.Focus", {
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
     *
     * @ignore(qx.application.Inline)
     */
    construct: function construct(manager) {
      qx.core.Object.constructor.call(this); // Define shorthands

      this._manager = manager;
      this._window = manager.getWindow();
      this._document = this._window.document;
      this._root = this._document.documentElement;
      this._body = this._document.body;

      if (qx.core.Environment.get("os.name") == "ios" && parseFloat(qx.core.Environment.get("os.version")) > 6 && (!qx.application.Inline || !qx.core.Init.getApplication() instanceof qx.application.Inline)) {
        this.__P_187_0 = true;
      } // Initialize


      this._initObserver();
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** The active DOM element */
      active: {
        apply: "_applyActive",
        nullable: true
      },

      /** The focussed DOM element */
      focus: {
        apply: "_applyFocus",
        nullable: true
      }
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
        focus: 1,
        blur: 1,
        focusin: 1,
        focusout: 1,
        activate: 1,
        deactivate: 1
      },

      /** @type {Integer} Whether the method "canHandleEvent" must be called */
      IGNORE_CAN_HANDLE: true,

      /**
       * @type {Map} See: http://msdn.microsoft.com/en-us/library/ms534654(VS.85).aspx
       */
      FOCUSABLE_ELEMENTS: qx.core.Environment.select("engine.name", {
        "mshtml": {
          a: 1,
          body: 1,
          button: 1,
          frame: 1,
          iframe: 1,
          img: 1,
          input: 1,
          object: 1,
          select: 1,
          textarea: 1
        },
        "gecko": {
          a: 1,
          body: 1,
          button: 1,
          frame: 1,
          iframe: 1,
          img: 1,
          input: 1,
          object: 1,
          select: 1,
          textarea: 1
        },
        "opera": {
          button: 1,
          input: 1,
          select: 1,
          textarea: 1
        },
        "webkit": {
          button: 1,
          input: 1,
          select: 1,
          textarea: 1
        }
      })
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_187_1: null,
      __P_187_2: null,
      __P_187_3: null,
      __P_187_4: null,
      __P_187_5: null,
      __P_187_6: null,
      __P_187_7: null,
      __P_187_8: null,
      __P_187_9: null,
      __P_187_10: null,
      __P_187_11: "",
      __P_187_12: "",
      __P_187_0: false,
      __P_187_13: null,

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
        FOCUS/BLUR USER INTERFACE
      ---------------------------------------------------------------------------
      */

      /**
       * Focuses the given DOM element
       *
       * @param element {Element} DOM element to focus
       */
      focus: function focus(element) {
        // Fixed timing issue with IE, see [BUG #3267]
        if (qx.core.Environment.get("engine.name") == "mshtml") {
          window.setTimeout(function () {
            try {
              // focus element before set cursor position
              element.focus(); // Fixed cursor position issue with IE, only when nothing is selected.
              // See [BUG #3519] for details.

              var selection = qx.bom.Selection.get(element);

              if (selection.length == 0 && typeof element.createTextRange == "function") {
                var textRange = element.createTextRange();
                textRange.moveStart('character', element.value.length);
                textRange.collapse();
                textRange.select();
              }
            } catch (ex) {}
          }, 0);
        } else {
          // Fix re-focusing on mousup event
          // See https://github.com/qooxdoo/qooxdoo/issues/9393 and
          // discussion in https://github.com/qooxdoo/qooxdoo/pull/9394
          window.setTimeout(function () {
            try {
              element.focus();
            } catch (ex) {}
          }, 0);
        }

        this.setFocus(element);
        this.setActive(element);
      },

      /**
       * Activates the given DOM element
       *
       * @param element {Element} DOM element to activate
       */
      activate: function activate(element) {
        this.setActive(element);
      },

      /**
       * Blurs the given DOM element
       *
       * @param element {Element} DOM element to focus
       */
      blur: function blur(element) {
        try {
          element.blur();
        } catch (ex) {}

        if (this.getActive() === element) {
          this.resetActive();
        }

        if (this.getFocus() === element) {
          this.resetFocus();
        }
      },

      /**
       * Deactivates the given DOM element
       *
       * @param element {Element} DOM element to activate
       */
      deactivate: function deactivate(element) {
        if (this.getActive() === element) {
          this.resetActive();
        }
      },

      /**
       * Tries to activate the given element. This checks whether
       * the activation is allowed first.
       *
       * @param element {Element} DOM element to activate
       */
      tryActivate: function tryActivate(element) {
        var active = this.__P_187_14(element);

        if (active) {
          this.setActive(active);
        }
      },

      /*
      ---------------------------------------------------------------------------
        HELPER
      ---------------------------------------------------------------------------
      */

      /**
       * Shorthand to fire events from within this class.
       *
       * @param target {Element} DOM element which is the target
       * @param related {Element} DOM element which is the related target
       * @param type {String} Name of the event to fire
       * @param bubbles {Boolean} Whether the event should bubble
       * @return {qx.Promise?} a promise, if one or more of the event handlers returned a promise
       */
      __P_187_15: function __P_187_15(target, related, type, bubbles) {
        var Registration = qx.event.Registration;
        var evt = Registration.createEvent(type, qx.event.type.Focus, [target, related, bubbles]);
        return Registration.dispatchEvent(target, evt);
      },

      /*
      ---------------------------------------------------------------------------
        WINDOW FOCUS/BLUR SUPPORT
      ---------------------------------------------------------------------------
      */

      /** @type {Boolean} Whether the window is focused currently */
      _windowFocused: true,

      /**
       * Helper for native event listeners to react on window blur
       */
      __P_187_16: function __P_187_16() {
        // Omit doubled blur events
        // which is a common behavior at least for gecko based clients
        if (this._windowFocused) {
          this._windowFocused = false;

          this.__P_187_15(this._window, null, "blur", false);
        }
      },

      /**
       * Helper for native event listeners to react on window focus
       */
      __P_187_17: function __P_187_17() {
        // Omit doubled focus events
        // which is a common behavior at least for gecko based clients
        if (!this._windowFocused) {
          this._windowFocused = true;

          this.__P_187_15(this._window, null, "focus", false);
        }
      },

      /*
      ---------------------------------------------------------------------------
        NATIVE OBSERVER
      ---------------------------------------------------------------------------
      */

      /**
       * Initializes event listeners.
       *
       * @signature function()
       */
      _initObserver: qx.core.Environment.select("engine.name", {
        "gecko": function gecko() {
          // Bind methods
          this.__P_187_1 = qx.lang.Function.listener(this.__P_187_18, this);
          this.__P_187_2 = qx.lang.Function.listener(this.__P_187_19, this);
          this.__P_187_3 = qx.lang.Function.listener(this.__P_187_20, this);
          this.__P_187_4 = qx.lang.Function.listener(this.__P_187_21, this);
          this.__P_187_5 = qx.lang.Function.listener(this.__P_187_22, this); // Register events

          qx.bom.Event.addNativeListener(this._document, "mousedown", this.__P_187_1, true);
          qx.bom.Event.addNativeListener(this._document, "mouseup", this.__P_187_2, true); // Capturing is needed for gecko to correctly
          // handle focus of input and textarea fields

          qx.bom.Event.addNativeListener(this._window, "focus", this.__P_187_3, true);
          qx.bom.Event.addNativeListener(this._window, "blur", this.__P_187_4, true); // Capture drag events

          qx.bom.Event.addNativeListener(this._window, "draggesture", this.__P_187_5, true);
        },
        "mshtml": function mshtml() {
          // Bind methods
          this.__P_187_1 = qx.lang.Function.listener(this.__P_187_18, this);
          this.__P_187_2 = qx.lang.Function.listener(this.__P_187_19, this);
          this.__P_187_7 = qx.lang.Function.listener(this.__P_187_23, this);
          this.__P_187_8 = qx.lang.Function.listener(this.__P_187_24, this);
          this.__P_187_6 = qx.lang.Function.listener(this.__P_187_25, this); // Register events

          qx.bom.Event.addNativeListener(this._document, "mousedown", this.__P_187_1);
          qx.bom.Event.addNativeListener(this._document, "mouseup", this.__P_187_2); // MSHTML supports their own focusin and focusout events
          // To detect which elements get focus the target is useful
          // The window blur can detected using focusout and look
          // for the toTarget property which is empty in this case.

          qx.bom.Event.addNativeListener(this._document, "focusin", this.__P_187_7);
          qx.bom.Event.addNativeListener(this._document, "focusout", this.__P_187_8); // Add selectstart to prevent selection

          qx.bom.Event.addNativeListener(this._document, "selectstart", this.__P_187_6);
        },
        "webkit": qx.core.Environment.select("browser.name", {
          // fix for [ISSUE #9174]
          // distinguish bettween MS Edge, which is reported
          // as engine webkit and all other webkit browsers
          "edge": function edge(domEvent) {
            // Bind methods
            this.__P_187_1 = qx.lang.Function.listener(this.__P_187_18, this);
            this.__P_187_2 = qx.lang.Function.listener(this.__P_187_19, this);
            this.__P_187_8 = qx.lang.Function.listener(this.__P_187_24, this);
            this.__P_187_7 = qx.lang.Function.listener(this.__P_187_23, this);
            this.__P_187_6 = qx.lang.Function.listener(this.__P_187_25, this); // Register events

            qx.bom.Event.addNativeListener(this._document, "mousedown", this.__P_187_1, true);
            qx.bom.Event.addNativeListener(this._document, "mouseup", this.__P_187_2, true);
            qx.bom.Event.addNativeListener(this._document, "selectstart", this.__P_187_6, false);
            qx.bom.Event.addNativeListener(this._document, "focusin", this.__P_187_7);
            qx.bom.Event.addNativeListener(this._document, "focusout", this.__P_187_8);
          },
          "default": function _default(domEvent) {
            // Bind methods
            this.__P_187_1 = qx.lang.Function.listener(this.__P_187_18, this);
            this.__P_187_2 = qx.lang.Function.listener(this.__P_187_19, this);
            this.__P_187_8 = qx.lang.Function.listener(this.__P_187_24, this);
            this.__P_187_3 = qx.lang.Function.listener(this.__P_187_20, this);
            this.__P_187_4 = qx.lang.Function.listener(this.__P_187_21, this);
            this.__P_187_6 = qx.lang.Function.listener(this.__P_187_25, this); // Register events

            qx.bom.Event.addNativeListener(this._document, "mousedown", this.__P_187_1, true);
            qx.bom.Event.addNativeListener(this._document, "mouseup", this.__P_187_2, true);
            qx.bom.Event.addNativeListener(this._document, "selectstart", this.__P_187_6, false);
            qx.bom.Event.addNativeListener(this._window, "DOMFocusOut", this.__P_187_8, true);
            qx.bom.Event.addNativeListener(this._window, "focus", this.__P_187_3, true);
            qx.bom.Event.addNativeListener(this._window, "blur", this.__P_187_4, true);
          }
        }),
        "opera": function opera() {
          // Bind methods
          this.__P_187_1 = qx.lang.Function.listener(this.__P_187_18, this);
          this.__P_187_2 = qx.lang.Function.listener(this.__P_187_19, this);
          this.__P_187_7 = qx.lang.Function.listener(this.__P_187_23, this);
          this.__P_187_8 = qx.lang.Function.listener(this.__P_187_24, this); // Register events

          qx.bom.Event.addNativeListener(this._document, "mousedown", this.__P_187_1, true);
          qx.bom.Event.addNativeListener(this._document, "mouseup", this.__P_187_2, true);
          qx.bom.Event.addNativeListener(this._window, "DOMFocusIn", this.__P_187_7, true);
          qx.bom.Event.addNativeListener(this._window, "DOMFocusOut", this.__P_187_8, true);
        }
      }),

      /**
       * Disconnects event listeners.
       *
       * @signature function()
       */
      _stopObserver: qx.core.Environment.select("engine.name", {
        "gecko": function gecko() {
          qx.bom.Event.removeNativeListener(this._document, "mousedown", this.__P_187_1, true);
          qx.bom.Event.removeNativeListener(this._document, "mouseup", this.__P_187_2, true);
          qx.bom.Event.removeNativeListener(this._window, "focus", this.__P_187_3, true);
          qx.bom.Event.removeNativeListener(this._window, "blur", this.__P_187_4, true);
          qx.bom.Event.removeNativeListener(this._window, "draggesture", this.__P_187_5, true);
        },
        "mshtml": function mshtml() {
          qx.bom.Event.removeNativeListener(this._document, "mousedown", this.__P_187_1);
          qx.bom.Event.removeNativeListener(this._document, "mouseup", this.__P_187_2);
          qx.bom.Event.removeNativeListener(this._document, "focusin", this.__P_187_7);
          qx.bom.Event.removeNativeListener(this._document, "focusout", this.__P_187_8);
          qx.bom.Event.removeNativeListener(this._document, "selectstart", this.__P_187_6);
        },
        "webkit": qx.core.Environment.select("browser.name", {
          // fix for [ISSUE #9174]
          // distinguish bettween MS Edge, which is reported
          // as engine webkit and all other webkit browsers
          "edge": function edge() {
            qx.bom.Event.removeNativeListener(this._document, "mousedown", this.__P_187_1);
            qx.bom.Event.removeNativeListener(this._document, "mouseup", this.__P_187_2);
            qx.bom.Event.removeNativeListener(this._document, "focusin", this.__P_187_7);
            qx.bom.Event.removeNativeListener(this._document, "focusout", this.__P_187_8);
            qx.bom.Event.removeNativeListener(this._document, "selectstart", this.__P_187_6);
          },
          "default": function _default() {
            qx.bom.Event.removeNativeListener(this._document, "mousedown", this.__P_187_1, true);
            qx.bom.Event.removeNativeListener(this._document, "mouseup", this.__P_187_2, true);
            qx.bom.Event.removeNativeListener(this._document, "selectstart", this.__P_187_6, false);
            qx.bom.Event.removeNativeListener(this._window, "DOMFocusOut", this.__P_187_8, true);
            qx.bom.Event.removeNativeListener(this._window, "focus", this.__P_187_3, true);
            qx.bom.Event.removeNativeListener(this._window, "blur", this.__P_187_4, true);
          }
        }),
        "opera": function opera() {
          qx.bom.Event.removeNativeListener(this._document, "mousedown", this.__P_187_1, true);
          qx.bom.Event.removeNativeListener(this._document, "mouseup", this.__P_187_2, true);
          qx.bom.Event.removeNativeListener(this._window, "DOMFocusIn", this.__P_187_7, true);
          qx.bom.Event.removeNativeListener(this._window, "DOMFocusOut", this.__P_187_8, true);
        }
      }),

      /*
      ---------------------------------------------------------------------------
        NATIVE LISTENERS
      ---------------------------------------------------------------------------
      */

      /**
       * Native event listener for <code>draggesture</code> event
       * supported by gecko. Used to stop native drag and drop when
       * selection is disabled.
       *
       * @see https://developer.mozilla.org/en-US/docs/Drag_and_Drop
       * @signature function(domEvent)
       * @param domEvent {Event} Native event
       */
      __P_187_22: qx.event.GlobalError.observeMethod(qx.core.Environment.select("engine.name", {
        "gecko": function gecko(domEvent) {
          var target = qx.bom.Event.getTarget(domEvent);

          if (!this.__P_187_26(target)) {
            qx.bom.Event.preventDefault(domEvent);
          }
        },
        "default": null
      })),

      /**
       * Native event listener for <code>DOMFocusIn</code> or <code>focusin</code>
       * depending on the client's engine.
       *
       * @signature function(domEvent)
       * @param domEvent {Event} Native event
       */
      __P_187_23: qx.event.GlobalError.observeMethod(qx.core.Environment.select("engine.name", {
        "mshtml": function mshtml(domEvent) {
          // Force window focus to be the first
          this.__P_187_17(); // Update internal data


          var target = qx.bom.Event.getTarget(domEvent); // IE focusin is also fired on elements which are not focusable at all
          // We need to look up for the next focusable element.

          var focusTarget = this.__P_187_27(target);

          if (focusTarget) {
            this.setFocus(focusTarget);
          } // Make target active


          this.tryActivate(target);
        },
        "webkit": qx.core.Environment.select("browser.name", {
          // fix for [ISSUE #9174]
          // distinguish bettween MS Edge, which is reported
          // as engine webkit and all other webkit browsers
          "edge": function edge(domEvent) {
            // Force window focus to be the first
            this.__P_187_17(); // Update internal data


            var target = qx.bom.Event.getTarget(domEvent); // IE focusin is also fired on elements which are not focusable at all
            // We need to look up for the next focusable element.

            var focusTarget = this.__P_187_27(target);

            if (focusTarget) {
              this.setFocus(focusTarget);
            } // Make target active


            this.tryActivate(target);
          },
          "default": null
        }),
        "opera": function opera(domEvent) {
          var target = qx.bom.Event.getTarget(domEvent);

          if (target == this._document || target == this._window) {
            this.__P_187_17();

            if (this.__P_187_9) {
              this.setFocus(this.__P_187_9);
              delete this.__P_187_9;
            }

            if (this.__P_187_10) {
              this.setActive(this.__P_187_10);
              delete this.__P_187_10;
            }
          } else {
            this.setFocus(target);
            this.tryActivate(target); // Clear selection

            if (!this.__P_187_26(target)) {
              target.selectionStart = 0;
              target.selectionEnd = 0;
            }
          }
        },
        "default": null
      })),

      /**
       * Native event listener for <code>DOMFocusOut</code> or <code>focusout</code>
       * depending on the client's engine.
       *
       * @signature function(domEvent)
       * @param domEvent {Event} Native event
       */
      __P_187_24: qx.event.GlobalError.observeMethod(qx.core.Environment.select("engine.name", {
        "mshtml": function mshtml(domEvent) {
          var relatedTarget = qx.bom.Event.getRelatedTarget(domEvent); // If the focus goes to nowhere (the document is blurred)

          if (relatedTarget == null) {
            // Update internal representation
            this.__P_187_16(); // Reset active and focus


            this.resetFocus();
            this.resetActive();
          }
        },
        "webkit": qx.core.Environment.select("browser.name", {
          // fix for [ISSUE #9174]
          // distinguish bettween MS Edge, which is reported
          // as engine webkit and all other webkit browsers
          "edge": function edge(domEvent) {
            var relatedTarget = qx.bom.Event.getRelatedTarget(domEvent); // If the focus goes to nowhere (the document is blurred)

            if (relatedTarget == null) {
              // Update internal representation
              this.__P_187_16(); // Reset active and focus


              this.resetFocus();
              this.resetActive();
            }
          },
          "default": function _default(domEvent) {
            var target = qx.bom.Event.getTarget(domEvent);

            if (target === this.getFocus()) {
              this.resetFocus();
            }

            if (target === this.getActive()) {
              this.resetActive();
            }
          }
        }),
        "opera": function opera(domEvent) {
          var target = qx.bom.Event.getTarget(domEvent);

          if (target == this._document) {
            this.__P_187_16(); // Store old focus/active elements
            // Opera do not fire focus events for them
            // when refocussing the window (in my opinion an error)


            this.__P_187_9 = this.getFocus();
            this.__P_187_10 = this.getActive();
            this.resetFocus();
            this.resetActive();
          } else {
            if (target === this.getFocus()) {
              this.resetFocus();
            }

            if (target === this.getActive()) {
              this.resetActive();
            }
          }
        },
        "default": null
      })),

      /**
       * Native event listener for <code>blur</code>.
       *
       * @signature function(domEvent)
       * @param domEvent {Event} Native event
       */
      __P_187_21: qx.event.GlobalError.observeMethod(qx.core.Environment.select("engine.name", {
        "gecko": function gecko(domEvent) {
          var target = qx.bom.Event.getTarget(domEvent);

          if (target === this._window || target === this._document) {
            this.__P_187_16();

            this.resetActive();
            this.resetFocus();
          }
        },
        "webkit": function webkit(domEvent) {
          var target = qx.bom.Event.getTarget(domEvent);

          if (target === this._window || target === this._document) {
            this.__P_187_16(); // Store old focus/active elements
            // Opera do not fire focus events for them
            // when refocussing the window (in my opinion an error)


            this.__P_187_9 = this.getFocus();
            this.__P_187_10 = this.getActive();
            this.resetActive();
            this.resetFocus();
          }
        },
        "default": null
      })),

      /**
       * Native event listener for <code>focus</code>.
       *
       * @signature function(domEvent)
       * @param domEvent {Event} Native event
       */
      __P_187_20: qx.event.GlobalError.observeMethod(qx.core.Environment.select("engine.name", {
        "gecko": function gecko(domEvent) {
          var target = qx.bom.Event.getTarget(domEvent);

          if (target === this._window || target === this._document) {
            this.__P_187_17(); // Always speak of the body, not the window or document


            target = this._body;
          }

          this.setFocus(target);
          this.tryActivate(target);
        },
        "webkit": function webkit(domEvent) {
          var target = qx.bom.Event.getTarget(domEvent);

          if (target === this._window || target === this._document) {
            this.__P_187_17();

            if (this.__P_187_9) {
              this.setFocus(this.__P_187_9);
              delete this.__P_187_9;
            }

            if (this.__P_187_10) {
              this.setActive(this.__P_187_10);
              delete this.__P_187_10;
            }
          } else {
            this.__P_187_13 = domEvent.relatedTarget;
            this.setFocus(target);
            this.__P_187_13 = null;
            this.tryActivate(target);
          }
        },
        "default": null
      })),

      /**
       * Native event listener for <code>mousedown</code>.
       *
       * @signature function(domEvent)
       * @param domEvent {Event} Native event
       */
      __P_187_18: qx.event.GlobalError.observeMethod(qx.core.Environment.select("engine.name", {
        "mshtml": function mshtml(domEvent) {
          var target = qx.bom.Event.getTarget(domEvent); // Stop events when no focus element available (or blocked)

          var focusTarget = this.__P_187_27(target);

          if (focusTarget) {
            // Add unselectable to keep selection
            if (!this.__P_187_26(target)) {
              // The element is not selectable. Block selection.
              target.unselectable = "on"; // Unselectable may keep the current selection which
              // is not what we like when changing the focus element.
              // So we clear it

              try {
                if (document.selection) {
                  document.selection.empty();
                }
              } catch (ex) {// ignore 'Unknown runtime error'
              } // The unselectable attribute stops focussing as well.
              // Do this manually.


              try {
                focusTarget.focus();
              } catch (ex) {// ignore "Can't move focus of this control" error
              }
            }
          } else {
            // Stop event for blocking support
            qx.bom.Event.preventDefault(domEvent); // Add unselectable to keep selection

            if (!this.__P_187_26(target)) {
              target.unselectable = "on";
            }
          }
        },
        "webkit": function webkit(domEvent) {
          var target = qx.bom.Event.getTarget(domEvent);

          var focusTarget = this.__P_187_27(target);

          if (focusTarget) {
            this.setFocus(focusTarget);
          } else {
            qx.bom.Event.preventDefault(domEvent);
          }
        },
        "gecko": function gecko(domEvent) {
          var target = qx.bom.Event.getTarget(domEvent);

          var focusTarget = this.__P_187_27(target);

          if (focusTarget) {
            this.setFocus(focusTarget);
          } else {
            qx.bom.Event.preventDefault(domEvent);
          }
        },
        "opera": function opera(domEvent) {
          var target = qx.bom.Event.getTarget(domEvent);

          var focusTarget = this.__P_187_27(target);

          if (!this.__P_187_26(target)) {
            // Prevent the default action for all non-selectable
            // targets. This prevents text selection and context menu.
            qx.bom.Event.preventDefault(domEvent); // The stopped event keeps the selection
            // of the previously focused element.
            // We need to clear the old selection.

            if (focusTarget) {
              var current = this.getFocus();

              if (current && current.selectionEnd) {
                current.selectionStart = 0;
                current.selectionEnd = 0;
                current.blur();
              } // The prevented event also stop the focus, do
              // it manually if needed.


              if (focusTarget) {
                this.setFocus(focusTarget);
              }
            }
          } else if (focusTarget) {
            this.setFocus(focusTarget);
          }
        },
        "default": null
      })),

      /**
       * Native event listener for <code>mouseup</code>.
       *
       * @signature function(domEvent)
       * @param domEvent {Event} Native event
       */
      __P_187_19: qx.event.GlobalError.observeMethod(qx.core.Environment.select("engine.name", {
        "mshtml": function mshtml(domEvent) {
          var target = qx.bom.Event.getTarget(domEvent);

          if (target.unselectable) {
            target.unselectable = "off";
          }

          this.tryActivate(this.__P_187_28(target));
        },
        "gecko": function gecko(domEvent) {
          // As of Firefox 3.0:
          // Gecko fires mouseup on XUL elements
          // We only want to deal with real HTML elements
          var target = qx.bom.Event.getTarget(domEvent);

          while (target && target.offsetWidth === undefined) {
            target = target.parentNode;
          }

          if (target) {
            this.tryActivate(target);
          }
        },
        "webkit": function webkit(domEvent) {
          var target = qx.bom.Event.getTarget(domEvent);
          this.tryActivate(this.__P_187_28(target));
        },
        "opera": function opera(domEvent) {
          var target = qx.bom.Event.getTarget(domEvent);
          this.tryActivate(this.__P_187_28(target));
        },
        "default": null
      })),

      /**
       * Fix for bug #9331.
       *
       * @signature function(target)
       * @param target {Element} element to check
       * @return {Element} return correct target (in case of compound input controls should always return textfield);
       */
      __P_187_29: function __P_187_29(target) {
        var focusedElement = this.getFocus();

        if (focusedElement && target != focusedElement) {
          if (focusedElement.nodeName.toLowerCase() === "input" || focusedElement.nodeName.toLowerCase() === "textarea") {
            return focusedElement;
          }

          if (qx.Class.isClass("qx.ui.core.Widget")) {
            // Check compound widgets
            var widget = qx.ui.core.Widget.getWidgetByElement(focusedElement),
                textField = widget && widget.getChildControl && widget.getChildControl("textfield", true);
          }

          if (textField) {
            return textField.getContentElement().getDomElement();
          }
        }

        return target;
      },

      /**
       * Fix for bug #2602.
       *
       * @signature function(target)
       * @param target {Element} target element from mouse up event
       * @return {Element} Element to activate;
       */
      __P_187_28: qx.event.GlobalError.observeMethod(qx.core.Environment.select("engine.name", {
        "mshtml": function mshtml(target) {
          return this.__P_187_29(target);
        },
        "webkit": function webkit(target) {
          return this.__P_187_29(target);
        },
        "default": function _default(target) {
          return target;
        }
      })),

      /**
       * Native event listener for <code>selectstart</code>.
       *
       *@signature function(domEvent)
       * @param domEvent {Event} Native event
       */
      __P_187_25: qx.event.GlobalError.observeMethod(qx.core.Environment.select("engine.name", {
        "mshtml": function mshtml(domEvent) {
          var target = qx.bom.Event.getTarget(domEvent);

          if (!this.__P_187_26(target)) {
            qx.bom.Event.preventDefault(domEvent);
          }
        },
        "webkit": function webkit(domEvent) {
          var target = qx.bom.Event.getTarget(domEvent);

          if (!this.__P_187_26(target)) {
            qx.bom.Event.preventDefault(domEvent);
          }
        },
        "default": null
      })),

      /*
      ---------------------------------------------------------------------------
        HELPER METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Whether the given element is focusable. This is perfectly modeled to the
       * browsers behavior and this way may differ in the various clients.
       *
       * @param el {Element} DOM Element to query
       * @return {Boolean} Whether the element is focusable
       */
      __P_187_30: function __P_187_30(el) {
        var index = qx.bom.element.Attribute.get(el, "tabIndex");

        if (index >= 1) {
          return true;
        }

        var focusable = qx.event.handler.Focus.FOCUSABLE_ELEMENTS;

        if (index >= 0 && focusable[el.tagName]) {
          return true;
        }

        return false;
      },

      /**
       * Returns the next focusable parent element of an activated DOM element.
       *
       * @param el {Element} Element to start lookup with.
       * @return {Element|null} The next focusable element.
       */
      __P_187_27: function __P_187_27(el) {
        while (el && el.nodeType === 1) {
          if (el.getAttribute("qxKeepFocus") == "on") {
            return null;
          }

          if (this.__P_187_30(el)) {
            return el;
          }

          el = el.parentNode;
        } // This should be identical to the one which is selected when
        // clicking into an empty page area. In mshtml this must be
        // the body of the document.


        return this._body;
      },

      /**
       * Returns the next activatable element. May be the element itself.
       * Works a bit different than the method {@link #__findFocusableElement}
       * as it looks up for a parent which is has a keep focus flag. When
       * there is such a parent it returns null otherwise the original
       * incoming element.
       *
       * @param el {Element} Element to start lookup with.
       * @return {Element} The next activatable element.
       */
      __P_187_14: function __P_187_14(el) {
        var orig = el;

        while (el && el.nodeType === 1) {
          if (el.getAttribute("qxKeepActive") == "on") {
            return null;
          }

          el = el.parentNode;
        }

        return orig;
      },

      /**
       * Whether the given el (or its content) should be selectable
       * by the user.
       *
       * @param node {Element} Node to start lookup with
       * @return {Boolean} Whether the content is selectable.
       */
      __P_187_26: function __P_187_26(node) {
        while (node && node.nodeType === 1) {
          var attr = node.getAttribute("qxSelectable");

          if (attr != null) {
            return attr === "on";
          }

          node = node.parentNode;
        }

        return true;
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // apply routine
      _applyActive: function _applyActive(value, old) {
        // Fire events
        if (old) {
          this.__P_187_15(old, value, "deactivate", true);
        }

        if (value) {
          this.__P_187_15(value, old, "activate", true);
        } // correct scroll position for iOS 7


        if (this.__P_187_0) {
          window.scrollTo(0, 0);
        }
      },
      // apply routine
      _applyFocus: function _applyFocus(value, old) {
        // Fire bubbling events
        if (old) {
          this.__P_187_15(old, value, "focusout", true);
        }

        if (value) {
          this.__P_187_15(value, old, "focusin", true);
        } // Fire after events


        if (old) {
          this.__P_187_15(old, value, "blur", false);
        }

        if (value) {
          this.__P_187_15(value, old || this.__P_187_13, "focus", false);
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._stopObserver();

      this._manager = this._window = this._document = this._root = this._body = this.__P_187_31 = this.__P_187_13 = null;
    },

    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */
    defer: function defer(statics) {
      qx.event.Registration.addHandler(statics); // For faster lookups generate uppercase tag names dynamically

      var focusable = statics.FOCUSABLE_ELEMENTS;

      for (var entry in focusable) {
        focusable[entry.toUpperCase()] = 1;
      }
    }
  });
  qx.event.handler.Focus.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Focus.js.map?dt=1646073042019