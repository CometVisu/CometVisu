(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.IForm": {
        "require": true
      },
      "qx.ui.form.INumberForm": {
        "require": true
      },
      "qx.ui.form.IRange": {
        "require": true
      },
      "qx.ui.form.MForm": {
        "require": true
      },
      "qx.ui.layout.Canvas": {
        "construct": true
      },
      "qx.theme.manager.Decoration": {},
      "qx.bom.element.Location": {},
      "qx.event.Timer": {},
      "qx.bom.AnimationFrame": {},
      "qx.event.type.Data": {}
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
   * The Slider widget provides a vertical or horizontal slider.
   *
   * The Slider is the classic widget for controlling a bounded value.
   * It lets the user move a slider handle along a horizontal or vertical
   * groove and translates the handle's position into an integer value
   * within the defined range.
   *
   * The Slider has very few of its own functions.
   * The most useful functions are slideTo() to set the slider directly to some
   * value; setSingleStep(), setPageStep() to set the steps; and setMinimum()
   * and setMaximum() to define the range of the slider.
   *
   * A slider accepts focus on Tab and provides both a mouse wheel and
   * a keyboard interface. The keyboard interface is the following:
   *
   * * Left/Right move a horizontal slider by one single step.
   * * Up/Down move a vertical slider by one single step.
   * * PageUp moves up one page.
   * * PageDown moves down one page.
   * * Home moves to the start (minimum).
   * * End moves to the end (maximum).
   *
   * Here are the main properties of the class:
   *
   * # <code>value</code>: The bounded integer that {@link qx.ui.form.INumberForm}
   * maintains.
   * # <code>minimum</code>: The lowest possible value.
   * # <code>maximum</code>: The highest possible value.
   * # <code>singleStep</code>: The smaller of two natural steps that an abstract
   * sliders provides and typically corresponds to the user pressing an arrow key.
   * # <code>pageStep</code>: The larger of two natural steps that an abstract
   * slider provides and typically corresponds to the user pressing PageUp or
   * PageDown.
   *
   * @childControl knob {qx.ui.core.Widget} knob to set the value of the slider
   */
  qx.Class.define("qx.ui.form.Slider", {
    extend: qx.ui.core.Widget,
    implement: [qx.ui.form.IForm, qx.ui.form.INumberForm, qx.ui.form.IRange],
    include: [qx.ui.form.MForm],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param orientation {String?"horizontal"} Configure the
     * {@link #orientation} property
     */
    construct: function construct(orientation) {
      qx.ui.core.Widget.constructor.call(this); // Force canvas layout

      this._setLayout(new qx.ui.layout.Canvas()); // Add listeners


      this.addListener("keypress", this._onKeyPress);
      this.addListener("roll", this._onRoll);
      this.addListener("pointerdown", this._onPointerDown);
      this.addListener("pointerup", this._onPointerUp);
      this.addListener("losecapture", this._onPointerUp);
      this.addListener("resize", this._onUpdate); // Stop events

      this.addListener("contextmenu", this._onStopEvent);
      this.addListener("tap", this._onStopEvent);
      this.addListener("dbltap", this._onStopEvent); // Initialize orientation

      if (orientation != null) {
        this.setOrientation(orientation);
      } else {
        this.initOrientation();
      }
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /**
       * Change event for the value.
       */
      changeValue: 'qx.event.type.Data',

      /** Fired as soon as the slide animation ended. */
      slideAnimationEnd: 'qx.event.type.Event'
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "slider"
      },
      // overridden
      focusable: {
        refine: true,
        init: true
      },

      /** Whether the slider is horizontal or vertical. */
      orientation: {
        check: ["horizontal", "vertical"],
        init: "horizontal",
        apply: "_applyOrientation"
      },

      /**
       * The current slider value.
       *
       * Strictly validates according to {@link #minimum} and {@link #maximum}.
       * Do not apply any value correction to the incoming value. If you depend
       * on this, please use {@link #slideTo} instead.
       */
      value: {
        check: "typeof value==='number'&&value>=this.getMinimum()&&value<=this.getMaximum()",
        init: 0,
        apply: "_applyValue",
        nullable: true
      },

      /**
       * The minimum slider value (may be negative). This value must be smaller
       * than {@link #maximum}.
       */
      minimum: {
        check: "Integer",
        init: 0,
        apply: "_applyMinimum",
        event: "changeMinimum"
      },

      /**
       * The maximum slider value (may be negative). This value must be larger
       * than {@link #minimum}.
       */
      maximum: {
        check: "Integer",
        init: 100,
        apply: "_applyMaximum",
        event: "changeMaximum"
      },

      /**
       * The amount to increment on each event. Typically corresponds
       * to the user pressing an arrow key.
       */
      singleStep: {
        check: "Integer",
        init: 1
      },

      /**
       * The amount to increment on each event. Typically corresponds
       * to the user pressing <code>PageUp</code> or <code>PageDown</code>.
       */
      pageStep: {
        check: "Integer",
        init: 10
      },

      /**
       * Factor to apply to the width/height of the knob in relation
       * to the dimension of the underlying area.
       */
      knobFactor: {
        check: "Number",
        apply: "_applyKnobFactor",
        nullable: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_309_0: null,
      __P_309_1: null,
      __P_309_2: null,
      __P_309_3: null,
      __P_309_4: null,
      __P_309_5: null,
      __P_309_6: null,
      __P_309_7: null,
      __P_309_8: null,
      // event delay stuff during drag
      __P_309_9: null,
      __P_309_10: null,
      __P_309_11: null,
      __P_309_12: null,
      // overridden

      /**
       * @lint ignoreReferenceField(_forwardStates)
       */
      _forwardStates: {
        invalid: true
      },
      // overridden
      renderLayout: function renderLayout(left, top, width, height) {
        qx.ui.form.Slider.prototype.renderLayout.base.call(this, left, top, width, height); // make sure the layout engine does not override the knob position

        this._updateKnobPosition();
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "knob":
            control = new qx.ui.core.Widget();
            control.addListener("resize", this._onUpdate, this);
            control.addListener("pointerover", this._onPointerOver);
            control.addListener("pointerout", this._onPointerOut);

            this._add(control);

            break;
        }

        return control || qx.ui.form.Slider.prototype._createChildControlImpl.base.call(this, id);
      },

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER
      ---------------------------------------------------------------------------
      */

      /**
       * Event handler for pointerover events at the knob child control.
       *
       * Adds the 'hovered' state
       *
       * @param e {qx.event.type.Pointer} Incoming pointer event
       */
      _onPointerOver: function _onPointerOver(e) {
        this.addState("hovered");
      },

      /**
       * Event handler for pointerout events at the knob child control.
       *
       * Removes the 'hovered' state
       *
       * @param e {qx.event.type.Pointer} Incoming pointer event
       */
      _onPointerOut: function _onPointerOut(e) {
        this.removeState("hovered");
      },

      /**
       * Listener of roll event
       *
       * @param e {qx.event.type.Roll} Incoming event object
       */
      _onRoll: function _onRoll(e) {
        // only wheel
        if (e.getPointerType() != "wheel") {
          return;
        }

        var axis = this.getOrientation() === "horizontal" ? "x" : "y";
        var delta = e.getDelta()[axis];
        var direction = delta > 0 ? 1 : delta < 0 ? -1 : 0;
        this.slideBy(direction * this.getSingleStep());
        e.stop();
      },

      /**
       * Event handler for keypress events.
       *
       * Adds support for arrow keys, page up, page down, home and end keys.
       *
       * @param e {qx.event.type.KeySequence} Incoming keypress event
       */
      _onKeyPress: function _onKeyPress(e) {
        var isHorizontal = this.getOrientation() === "horizontal";
        var backward = isHorizontal ? "Left" : "Up";
        var forward = isHorizontal ? "Right" : "Down";

        switch (e.getKeyIdentifier()) {
          case forward:
            this.slideForward();
            break;

          case backward:
            this.slideBack();
            break;

          case "PageDown":
            this.slidePageForward(100);
            break;

          case "PageUp":
            this.slidePageBack(100);
            break;

          case "Home":
            this.slideToBegin(200);
            break;

          case "End":
            this.slideToEnd(200);
            break;

          default:
            return;
        } // Stop processed events


        e.stop();
      },

      /**
       * Listener of pointerdown event. Initializes drag or tracking mode.
       *
       * @param e {qx.event.type.Pointer} Incoming event object
       */
      _onPointerDown: function _onPointerDown(e) {
        // this can happen if the user releases the button while dragging outside
        // of the browser viewport
        if (this.__P_309_3) {
          return;
        }

        var isHorizontal = this.__P_309_13;
        var knob = this.getChildControl("knob");
        var locationProperty = isHorizontal ? "left" : "top";
        var cursorLocation = isHorizontal ? e.getDocumentLeft() : e.getDocumentTop();
        var decorator = this.getDecorator();
        decorator = qx.theme.manager.Decoration.getInstance().resolve(decorator);

        if (isHorizontal) {
          var decoratorPadding = decorator ? decorator.getInsets().left : 0;
          var padding = (this.getPaddingLeft() || 0) + decoratorPadding;
        } else {
          var decoratorPadding = decorator ? decorator.getInsets().top : 0;
          var padding = (this.getPaddingTop() || 0) + decoratorPadding;
        }

        var sliderLocation = this.__P_309_0 = qx.bom.element.Location.get(this.getContentElement().getDomElement())[locationProperty];
        sliderLocation += padding;
        var knobLocation = this.__P_309_1 = qx.bom.element.Location.get(knob.getContentElement().getDomElement())[locationProperty];

        if (e.getTarget() === knob) {
          // Switch into drag mode
          this.__P_309_3 = true;

          if (!this.__P_309_9) {
            // create a timer to fire delayed dragging events if dragging stops.
            this.__P_309_9 = new qx.event.Timer(100);

            this.__P_309_9.addListener("interval", this._fireValue, this);
          }

          this.__P_309_9.start(); // Compute dragOffset (includes both: inner position of the widget and
          // cursor position on knob)


          this.__P_309_4 = cursorLocation + sliderLocation - knobLocation; // add state

          knob.addState("pressed");
        } else {
          // Switch into tracking mode
          this.__P_309_5 = true; // Detect tracking direction

          this.__P_309_6 = cursorLocation <= knobLocation ? -1 : 1; // Compute end value

          this.__P_309_14(e); // Directly call interval method once


          this._onInterval(); // Initialize timer (when needed)


          if (!this.__P_309_8) {
            this.__P_309_8 = new qx.event.Timer(100);

            this.__P_309_8.addListener("interval", this._onInterval, this);
          } // Start timer


          this.__P_309_8.start();
        } // Register move listener


        this.addListener("pointermove", this._onPointerMove); // Activate capturing

        this.capture(); // Stop event

        e.stopPropagation();
      },

      /**
       * Listener of pointerup event. Used for cleanup of previously
       * initialized modes.
       *
       * @param e {qx.event.type.Pointer} Incoming event object
       */
      _onPointerUp: function _onPointerUp(e) {
        if (this.__P_309_3) {
          // Release capture mode
          this.releaseCapture(); // Cleanup status flags

          delete this.__P_309_3; // as we come out of drag mode, make
          // sure content gets synced

          this.__P_309_9.stop();

          this._fireValue();

          delete this.__P_309_4; // remove state

          this.getChildControl("knob").removeState("pressed"); // it's necessary to check whether the cursor is over the knob widget to be able to
          // to decide whether to remove the 'hovered' state.

          if (e.getType() === "pointerup") {
            var deltaSlider;
            var deltaPosition;
            var positionSlider;

            if (this.__P_309_13) {
              deltaSlider = e.getDocumentLeft() - (this._valueToPosition(this.getValue()) + this.__P_309_0);
              positionSlider = qx.bom.element.Location.get(this.getContentElement().getDomElement())["top"];
              deltaPosition = e.getDocumentTop() - (positionSlider + this.getChildControl("knob").getBounds().top);
            } else {
              deltaSlider = e.getDocumentTop() - (this._valueToPosition(this.getValue()) + this.__P_309_0);
              positionSlider = qx.bom.element.Location.get(this.getContentElement().getDomElement())["left"];
              deltaPosition = e.getDocumentLeft() - (positionSlider + this.getChildControl("knob").getBounds().left);
            }

            if (deltaPosition < 0 || deltaPosition > this.__P_309_2 || deltaSlider < 0 || deltaSlider > this.__P_309_2) {
              this.getChildControl("knob").removeState("hovered");
            }
          }
        } else if (this.__P_309_5) {
          // Stop timer interval
          this.__P_309_8.stop(); // Release capture mode


          this.releaseCapture(); // Cleanup status flags

          delete this.__P_309_5;
          delete this.__P_309_6;
          delete this.__P_309_7;
        } // Remove move listener again


        this.removeListener("pointermove", this._onPointerMove); // Stop event

        if (e.getType() === "pointerup") {
          e.stopPropagation();
        }
      },

      /**
       * Listener of pointermove event for the knob. Only used in drag mode.
       *
       * @param e {qx.event.type.Pointer} Incoming event object
       */
      _onPointerMove: function _onPointerMove(e) {
        if (this.__P_309_3) {
          var dragStop = this.__P_309_13 ? e.getDocumentLeft() : e.getDocumentTop();
          var position = dragStop - this.__P_309_4;
          this.slideTo(this._positionToValue(position));
        } else if (this.__P_309_5) {
          // Update tracking end on pointermove
          this.__P_309_14(e);
        } // Stop event


        e.stopPropagation();
      },

      /**
       * Listener of interval event by the internal timer. Only used
       * in tracking sequences.
       *
       * @param e {qx.event.type.Event} Incoming event object
       */
      _onInterval: function _onInterval(e) {
        // Compute new value
        var value = this.getValue() + this.__P_309_6 * this.getPageStep(); // Limit value

        if (value < this.getMinimum()) {
          value = this.getMinimum();
        } else if (value > this.getMaximum()) {
          value = this.getMaximum();
        } // Stop at tracking position (where the pointer is pressed down)


        var slideBack = this.__P_309_6 == -1;

        if (slideBack && value <= this.__P_309_7 || !slideBack && value >= this.__P_309_7) {
          value = this.__P_309_7;
        } // Finally slide to the desired position


        this.slideTo(value);
      },

      /**
       * Listener of resize event for both the slider itself and the knob.
       *
       * @param e {qx.event.type.Data} Incoming event object
       */
      _onUpdate: function _onUpdate(e) {
        // Update sliding space
        var availSize = this.getInnerSize();
        var knobSize = this.getChildControl("knob").getBounds();
        var sizeProperty = this.__P_309_13 ? "width" : "height"; // Sync knob size

        this._updateKnobSize(); // Store knob size


        this.__P_309_15 = availSize[sizeProperty] - knobSize[sizeProperty];
        this.__P_309_2 = knobSize[sizeProperty]; // Update knob position (sliding space must be updated first)

        this._updateKnobPosition();
      },

      /*
      ---------------------------------------------------------------------------
        UTILS
      ---------------------------------------------------------------------------
      */

      /** @type {Boolean} Whether the slider is laid out horizontally */
      __P_309_13: false,

      /**
       * @type {Integer} Available space for knob to slide on, computed on resize of
       * the widget
       */
      __P_309_15: 0,

      /**
       * Computes the value where the tracking should end depending on
       * the current pointer position.
       *
       * @param e {qx.event.type.Pointer} Incoming pointer event
       */
      __P_309_14: function __P_309_14(e) {
        var isHorizontal = this.__P_309_13;
        var cursorLocation = isHorizontal ? e.getDocumentLeft() : e.getDocumentTop();
        var sliderLocation = this.__P_309_0;
        var knobLocation = this.__P_309_1;
        var knobSize = this.__P_309_2; // Compute relative position

        var position = cursorLocation - sliderLocation;

        if (cursorLocation >= knobLocation) {
          position -= knobSize;
        } // Compute stop value


        var value = this._positionToValue(position);

        var min = this.getMinimum();
        var max = this.getMaximum();

        if (value < min) {
          value = min;
        } else if (value > max) {
          value = max;
        } else {
          var old = this.getValue();
          var step = this.getPageStep();
          var method = this.__P_309_6 < 0 ? "floor" : "ceil"; // Fix to page step

          value = old + Math[method]((value - old) / step) * step;
        } // Store value when undefined, otherwise only when it follows the
        // current direction e.g. goes up or down


        if (this.__P_309_7 == null || this.__P_309_6 == -1 && value <= this.__P_309_7 || this.__P_309_6 == 1 && value >= this.__P_309_7) {
          this.__P_309_7 = value;
        }
      },

      /**
       * Converts the given position to a value.
       *
       * Does not respect single or page step.
       *
       * @param position {Integer} Position to use
       * @return {Integer} Resulting value (rounded)
       */
      _positionToValue: function _positionToValue(position) {
        // Reading available space
        var avail = this.__P_309_15; // Protect undefined value (before initial resize) and division by zero

        if (avail == null || avail == 0) {
          return 0;
        } // Compute and limit percent


        var percent = position / avail;

        if (percent < 0) {
          percent = 0;
        } else if (percent > 1) {
          percent = 1;
        } // Compute range


        var range = this.getMaximum() - this.getMinimum(); // Compute value

        return this.getMinimum() + Math.round(range * percent);
      },

      /**
       * Converts the given value to a position to place
       * the knob to.
       *
       * @param value {Integer} Value to use
       * @return {Integer} Computed position (rounded)
       */
      _valueToPosition: function _valueToPosition(value) {
        // Reading available space
        var avail = this.__P_309_15;

        if (avail == null) {
          return 0;
        } // Computing range


        var range = this.getMaximum() - this.getMinimum(); // Protect division by zero

        if (range == 0) {
          return 0;
        } // Translating value to distance from minimum


        var value = value - this.getMinimum(); // Compute and limit percent

        var percent = value / range;

        if (percent < 0) {
          percent = 0;
        } else if (percent > 1) {
          percent = 1;
        } // Compute position from available space and percent


        return Math.round(avail * percent);
      },

      /**
       * Updates the knob position following the currently configured
       * value. Useful on reflows where the dimensions of the slider
       * itself have been modified.
       *
       */
      _updateKnobPosition: function _updateKnobPosition() {
        this._setKnobPosition(this._valueToPosition(this.getValue()));
      },

      /**
       * Moves the knob to the given position.
       *
       * @param position {Integer} Any valid position (needs to be
       *   greater or equal than zero)
       */
      _setKnobPosition: function _setKnobPosition(position) {
        // Use the DOM Element to prevent unnecessary layout recalculations
        var knob = this.getChildControl("knob");
        var dec = this.getDecorator();
        dec = qx.theme.manager.Decoration.getInstance().resolve(dec);
        var content = knob.getContentElement();

        if (this.__P_309_13) {
          if (dec && dec.getPadding()) {
            position += dec.getPadding().left;
          }

          position += this.getPaddingLeft() || 0;
          content.setStyle("left", position + "px", true);
        } else {
          if (dec && dec.getPadding()) {
            position += dec.getPadding().top;
          }

          position += this.getPaddingTop() || 0;
          content.setStyle("top", position + "px", true);
        }
      },

      /**
       * Reconfigures the size of the knob depending on
       * the optionally defined {@link #knobFactor}.
       *
       */
      _updateKnobSize: function _updateKnobSize() {
        // Compute knob size
        var knobFactor = this.getKnobFactor();

        if (knobFactor == null) {
          return;
        } // Ignore when not rendered yet


        var avail = this.getInnerSize();

        if (avail == null) {
          return;
        } // Read size property


        if (this.__P_309_13) {
          this.getChildControl("knob").setWidth(Math.round(knobFactor * avail.width));
        } else {
          this.getChildControl("knob").setHeight(Math.round(knobFactor * avail.height));
        }
      },

      /*
      ---------------------------------------------------------------------------
        SLIDE METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Slides backward to the minimum value
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      slideToBegin: function slideToBegin(duration) {
        this.slideTo(this.getMinimum(), duration);
      },

      /**
       * Slides forward to the maximum value
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      slideToEnd: function slideToEnd(duration) {
        this.slideTo(this.getMaximum(), duration);
      },

      /**
       * Slides forward (right or bottom depending on orientation)
       *
       */
      slideForward: function slideForward() {
        this.slideBy(this.getSingleStep());
      },

      /**
       * Slides backward (to left or top depending on orientation)
       *
       */
      slideBack: function slideBack() {
        this.slideBy(-this.getSingleStep());
      },

      /**
       * Slides a page forward (to right or bottom depending on orientation)
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      slidePageForward: function slidePageForward(duration) {
        this.slideBy(this.getPageStep(), duration);
      },

      /**
       * Slides a page backward (to left or top depending on orientation)
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      slidePageBack: function slidePageBack(duration) {
        this.slideBy(-this.getPageStep(), duration);
      },

      /**
       * Slides by the given offset.
       *
       * This method works with the value, not with the coordinate.
       *
       * @param offset {Integer} Offset to scroll by
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      slideBy: function slideBy(offset, duration) {
        this.slideTo(this.getValue() + offset, duration);
      },

      /**
       * Slides to the given value
       *
       * This method works with the value, not with the coordinate.
       *
       * @param value {Integer} Scroll to a value between the defined
       *   minimum and maximum.
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      slideTo: function slideTo(value, duration) {
        this.stopSlideAnimation();

        if (duration) {
          this.__P_309_16(value, duration);
        } else {
          this.updatePosition(value);
        }
      },

      /**
       * Updates the position property considering the minimum and maximum values.
       * @param value {Number} The new position.
       */
      updatePosition: function updatePosition(value) {
        this.setValue(this.__P_309_17(value));
      },

      /**
       * In case a slide animation is currently running, it will be stopped.
       * If not, the method does nothing.
       */
      stopSlideAnimation: function stopSlideAnimation() {
        if (this.__P_309_12) {
          this.__P_309_12.cancelSequence();

          this.__P_309_12 = null;
        }
      },

      /**
       * Internal helper to normalize the given value concerning the minimum
       * and maximum value.
       * @param value {Number} The value to normalize.
       * @return {Number} The normalized value.
       */
      __P_309_17: function __P_309_17(value) {
        // Bring into allowed range or fix to single step grid
        if (value < this.getMinimum()) {
          value = this.getMinimum();
        } else if (value > this.getMaximum()) {
          value = this.getMaximum();
        } else {
          value = this.getMinimum() + Math.round((value - this.getMinimum()) / this.getSingleStep()) * this.getSingleStep();
        }

        return value;
      },

      /**
       * Animation helper which takes care of the animated slide.
       * @param to {Number} The target value.
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      __P_309_16: function __P_309_16(to, duration) {
        to = this.__P_309_17(to);
        var from = this.getValue();
        this.__P_309_12 = new qx.bom.AnimationFrame();

        this.__P_309_12.on("frame", function (timePassed) {
          this.setValue(parseInt(timePassed / duration * (to - from) + from));
        }, this);

        this.__P_309_12.on("end", function () {
          this.setValue(to);
          this.__P_309_12 = null;
          this.fireEvent("slideAnimationEnd");
        }, this);

        this.__P_309_12.startSequence(duration);
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyOrientation: function _applyOrientation(value, old) {
        var knob = this.getChildControl("knob"); // Update private flag for faster access

        this.__P_309_13 = value === "horizontal"; // Toggle states and knob layout

        if (this.__P_309_13) {
          this.removeState("vertical");
          knob.removeState("vertical");
          this.addState("horizontal");
          knob.addState("horizontal");
          knob.setLayoutProperties({
            top: 0,
            right: null,
            bottom: 0
          });
        } else {
          this.removeState("horizontal");
          knob.removeState("horizontal");
          this.addState("vertical");
          knob.addState("vertical");
          knob.setLayoutProperties({
            right: 0,
            bottom: null,
            left: 0
          });
        } // Sync knob position


        this._updateKnobPosition();
      },
      // property apply
      _applyKnobFactor: function _applyKnobFactor(value, old) {
        if (value != null) {
          this._updateKnobSize();
        } else {
          if (this.__P_309_13) {
            this.getChildControl("knob").resetWidth();
          } else {
            this.getChildControl("knob").resetHeight();
          }
        }
      },
      // property apply
      _applyValue: function _applyValue(value, old) {
        if (value != null) {
          this._updateKnobPosition();

          if (this.__P_309_3) {
            this.__P_309_11 = [value, old];
          } else {
            this.fireEvent("changeValue", qx.event.type.Data, [value, old]);
          }
        } else {
          this.resetValue();
        }
      },

      /**
       * Helper for applyValue which fires the changeValue event.
       */
      _fireValue: function _fireValue() {
        if (!this.__P_309_11) {
          return;
        }

        var tmp = this.__P_309_11;
        this.__P_309_11 = null;
        this.fireEvent("changeValue", qx.event.type.Data, tmp);
      },
      // property apply
      _applyMinimum: function _applyMinimum(value, old) {
        if (this.getValue() < value) {
          this.setValue(value);
        }

        this._updateKnobPosition();
      },
      // property apply
      _applyMaximum: function _applyMaximum(value, old) {
        if (this.getValue() > value) {
          this.setValue(value);
        }

        this._updateKnobPosition();
      }
    }
  });
  qx.ui.form.Slider.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Slider.js.map?dt=1612690409574