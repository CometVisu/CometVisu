(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.Button": {
        "construct": true,
        "require": true
      },
      "qx.event.AcceleratingTimer": {
        "construct": true
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
       * Martin Wittemann (martinwittemann)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The RepeatButton is a special button, which fires repeatedly {@link #execute}
   * events, while a button is pressed on the button. The initial delay
   * and the interval time can be set using the properties {@link #firstInterval}
   * and {@link #interval}. The {@link #execute} events will be fired in a shorter
   * amount of time if a button is hold, until the min {@link #minTimer}
   * is reached. The {@link #timerDecrease} property sets the amount of milliseconds
   * which will decreased after every firing.
   *
   * <pre class='javascript'>
   *   var button = new qx.ui.form.RepeatButton("Hello World");
   *
   *   button.addListener("execute", function(e) {
   *     alert("Button is executed");
   *   }, this);
   *
   *   this.getRoot.add(button);
   * </pre>
   *
   * This example creates a button with the label "Hello World" and attaches an
   * event listener to the {@link #execute} event.
   *
   * *External Documentation*
   *
   * <a href='http://qooxdoo.org/docs/#desktop/widget/repeatbutton.md' target='_blank'>
   * Documentation of this widget in the qooxdoo manual.</a>
   */
  qx.Class.define("qx.ui.form.RepeatButton", {
    extend: qx.ui.form.Button,
    /**
     * @param label {String} Label to use
     * @param icon {String?null} Icon to use
     */
    construct: function construct(label, icon) {
      qx.ui.form.Button.constructor.call(this, label, icon);

      // create the timer and add the listener
      this.__P_582_0 = new qx.event.AcceleratingTimer();
      this.__P_582_0.addListener("interval", this._onInterval, this);
    },
    events: {
      /**
       * This event gets dispatched with every interval. The timer gets executed
       * as long as the user holds down a button.
       */
      execute: "qx.event.type.Event",
      /**
       * This event gets dispatched when the button is pressed.
       */
      press: "qx.event.type.Event",
      /**
       * This event gets dispatched when the button is released.
       */
      release: "qx.event.type.Event"
    },
    properties: {
      /**
       * Interval used after the first run of the timer. Usually a smaller value
       * than the "firstInterval" property value to get a faster reaction.
       */
      interval: {
        check: "Integer",
        init: 100
      },
      /**
       * Interval used for the first run of the timer. Usually a greater value
       * than the "interval" property value to a little delayed reaction at the first
       * time.
       */
      firstInterval: {
        check: "Integer",
        init: 500
      },
      /** This configures the minimum value for the timer interval. */
      minTimer: {
        check: "Integer",
        init: 20
      },
      /** Decrease of the timer on each interval (for the next interval) until minTimer reached. */
      timerDecrease: {
        check: "Integer",
        init: 2
      }
    },
    members: {
      __P_582_1: null,
      __P_582_0: null,
      /**
       * Calling this function is like a tap from the user on the
       * button with all consequences.
       * <span style='color: red'>Be sure to call the {@link #release} function.</span>
       *
       */
      press: function press() {
        // only if the button is enabled
        if (this.isEnabled()) {
          // if the state pressed must be applied (first call)
          if (!this.hasState("pressed")) {
            // start the timer
            this.__P_582_2();
          }

          // set the states
          this.removeState("abandoned");
          this.addState("pressed");
        }
      },
      /**
       * Calling this function is like a release from the user on the
       * button with all consequences.
       * Usually the {@link #release} function will be called before the call of
       * this function.
       *
       * @param fireExecuteEvent {Boolean?true} flag which signals, if an event should be fired
       */
      release: function release(fireExecuteEvent) {
        // only if the button is enabled
        if (!this.isEnabled()) {
          return;
        }

        // only if the button is pressed
        if (this.hasState("pressed")) {
          // if the button has not been executed
          if (!this.__P_582_1) {
            this.execute();
          }
        }

        // remove button states
        this.removeState("pressed");
        this.removeState("abandoned");

        // stop the repeat timer and therefore the execution
        this.__P_582_3();
      },
      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // overridden
      _applyEnabled: function _applyEnabled(value, old) {
        qx.ui.form.RepeatButton.superclass.prototype._applyEnabled.call(this, value, old);
        if (!value) {
          if (this.isCapturing()) {
            // also release capture because out event is missing on iOS
            this.releaseCapture();
          }

          // remove button states
          this.removeState("pressed");
          this.removeState("abandoned");

          // stop the repeat timer and therefore the execution
          this.__P_582_3();
        }
      },
      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER
      ---------------------------------------------------------------------------
      */
      /**
       * Listener method for "pointerover" event
       * <ul>
       * <li>Adds state "hovered"</li>
       * <li>Removes "abandoned" and adds "pressed" state (if "abandoned" state is set)</li>
       * </ul>
       *
       * @param e {qx.event.type.Pointer} Pointer event
       */
      _onPointerOver: function _onPointerOver(e) {
        if (!this.isEnabled() || e.getTarget() !== this) {
          return;
        }
        if (this.hasState("abandoned")) {
          this.removeState("abandoned");
          this.addState("pressed");
          this.__P_582_0.start();
        }
        this.addState("hovered");
      },
      /**
       * Listener method for "pointerout" event
       * <ul>
       * <li>Removes "hovered" state</li>
       * <li>Adds "abandoned" and removes "pressed" state (if "pressed" state is set)</li>
       * </ul>
       *
       * @param e {qx.event.type.Pointer} Pointer event
       */
      _onPointerOut: function _onPointerOut(e) {
        if (!this.isEnabled() || e.getTarget() !== this) {
          return;
        }
        this.removeState("hovered");
        if (this.hasState("pressed")) {
          this.removeState("pressed");
          this.addState("abandoned");
          this.__P_582_0.stop();
        }
      },
      /**
       * Callback method for the "pointerdown" method.
       *
       * Sets the interval of the timer (value of firstInterval property) and
       * starts the timer. Additionally removes the state "abandoned" and adds the
       * state "pressed".
       *
       * @param e {qx.event.type.Pointer} pointerdown event
       */
      _onPointerDown: function _onPointerDown(e) {
        if (!e.isLeftPressed()) {
          return;
        }

        // Activate capturing if the button get a pointerout while
        // the button is pressed.
        this.capture();
        this.__P_582_2();
        e.stopPropagation();
      },
      /**
       * Callback method for the "pointerup" event.
       *
       * Handles the case that the user is releasing a button
       * before the timer interval method got executed. This way the
       * "execute" method get executed at least one time.
       *
       * @param e {qx.event.type.Pointer} pointerup event
       */
      _onPointerUp: function _onPointerUp(e) {
        this.releaseCapture();
        if (!this.hasState("abandoned")) {
          this.addState("hovered");
          if (this.hasState("pressed") && !this.__P_582_1) {
            this.execute();
          }
        }
        this.__P_582_3();
        e.stopPropagation();
      },
      // Nothing to do, 'execute' is already fired by _onPointerUp.
      _onTap: function _onTap(e) {},
      /**
       * Listener method for "keyup" event.
       *
       * Removes "abandoned" and "pressed" state (if "pressed" state is set)
       * for the keys "Enter" or "Space" and stops the internal timer
       * (same like pointer up).
       *
       * @param e {Event} Key event
       */
      _onKeyUp: function _onKeyUp(e) {
        switch (e.getKeyIdentifier()) {
          case "Enter":
          case "Space":
            if (this.hasState("pressed")) {
              if (!this.__P_582_1) {
                this.execute();
              }
              this.removeState("pressed");
              this.removeState("abandoned");
              e.stopPropagation();
              this.__P_582_3();
            }
        }
      },
      /**
       * Listener method for "keydown" event.
       *
       * Removes "abandoned" and adds "pressed" state
       * for the keys "Enter" or "Space". It also starts
       * the internal timer (same like pointerdown).
       *
       * @param e {Event} Key event
       */
      _onKeyDown: function _onKeyDown(e) {
        switch (e.getKeyIdentifier()) {
          case "Enter":
          case "Space":
            this.removeState("abandoned");
            this.addState("pressed");
            e.stopPropagation();
            this.__P_582_2();
        }
      },
      /**
       * Callback for the interval event.
       *
       * Stops the timer and starts it with a new interval
       * (value of the "interval" property - value of the "timerDecrease" property).
       * Dispatches the "execute" event.
       *
       * @param e {qx.event.type.Event} interval event
       */
      _onInterval: function _onInterval(e) {
        this.__P_582_1 = true;
        this.fireEvent("execute");
      },
      /*
      ---------------------------------------------------------------------------
        INTERNAL TIMER
      ---------------------------------------------------------------------------
      */
      /**
       * Starts the internal timer which causes firing of execution
       * events in an interval. It also presses the button.
       *
       */
      __P_582_2: function __P_582_2() {
        this.fireEvent("press");
        this.__P_582_1 = false;
        this.__P_582_0.set({
          interval: this.getInterval(),
          firstInterval: this.getFirstInterval(),
          minimum: this.getMinTimer(),
          decrease: this.getTimerDecrease()
        }).start();
        this.removeState("abandoned");
        this.addState("pressed");
      },
      /**
       * Stops the internal timer and releases the button.
       *
       */
      __P_582_3: function __P_582_3() {
        this.fireEvent("release");
        this.__P_582_0.stop();
        this.removeState("abandoned");
        this.removeState("pressed");
      }
    },
    /*
      *****************************************************************************
         DESTRUCTOR
      *****************************************************************************
      */
    destruct: function destruct() {
      this._disposeObjects("__P_582_0");
    }
  });
  qx.ui.form.RepeatButton.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RepeatButton.js.map?dt=1722151853282