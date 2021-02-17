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
      "qx.ui.core.scroll.IScrollBar": {
        "require": true
      },
      "qx.ui.core.scroll.ScrollSlider": {},
      "qx.ui.form.RepeatButton": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.layout.VBox": {}
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
   * The scroll bar widget, is a special slider, which is used in qooxdoo instead
   * of the native browser scroll bars.
   *
   * Scroll bars are used by the {@link qx.ui.container.Scroll} container. Usually
   * a scroll bar is not used directly.
   *
   * @childControl slider {qx.ui.core.scroll.ScrollSlider} scroll slider component
   * @childControl button-begin {qx.ui.form.RepeatButton} button to scroll to top
   * @childControl button-end {qx.ui.form.RepeatButton} button to scroll to bottom
   *
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *   var scrollBar = new qx.ui.core.scroll.ScrollBar("horizontal");
   *   scrollBar.set({
   *     maximum: 500
   *   })
   *   this.getRoot().add(scrollBar);
   * </pre>
   *
   * This example creates a horizontal scroll bar with a maximum value of 500.
   *
   * *External Documentation*
   *
   * <a href='http://qooxdoo.org/docs/#desktop/widget/scrollbar.md' target='_blank'>
   * Documentation of this widget in the qooxdoo manual.</a>
   */
  qx.Class.define("qx.ui.core.scroll.ScrollBar", {
    extend: qx.ui.core.Widget,
    implement: qx.ui.core.scroll.IScrollBar,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param orientation {String?"horizontal"} The initial scroll bar orientation
     */
    construct: function construct(orientation) {
      qx.ui.core.Widget.constructor.call(this); // Create child controls

      this._createChildControl("button-begin");

      this._createChildControl("slider").addListener("resize", this._onResizeSlider, this);

      this._createChildControl("button-end"); // Configure orientation


      if (orientation != null) {
        this.setOrientation(orientation);
      } else {
        this.initOrientation();
      } // prevent drag & drop on scrolling


      this.addListener("track", function (e) {
        e.stopPropagation();
      }, this);
    },
    events: {
      /** Change event for the value. */
      "scrollAnimationEnd": "qx.event.type.Event"
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
        init: "scrollbar"
      },

      /**
       * The scroll bar orientation
       */
      orientation: {
        check: ["horizontal", "vertical"],
        init: "horizontal",
        apply: "_applyOrientation"
      },

      /**
       * The maximum value (difference between available size and
       * content size).
       */
      maximum: {
        check: "PositiveInteger",
        apply: "_applyMaximum",
        init: 100
      },

      /**
       * Position of the scrollbar (which means the scroll left/top of the
       * attached area's pane)
       *
       * Strictly validates according to {@link #maximum}.
       * Does not apply any correction to the incoming value. If you depend
       * on this, please use {@link #scrollTo} instead.
       */
      position: {
        check: "qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getMaximum()",
        init: 0,
        apply: "_applyPosition",
        event: "scroll"
      },

      /**
       * Step size for each tap on the up/down or left/right buttons.
       */
      singleStep: {
        check: "Integer",
        init: 20
      },

      /**
       * The amount to increment on each event. Typically corresponds
       * to the user pressing <code>PageUp</code> or <code>PageDown</code>.
       */
      pageStep: {
        check: "Integer",
        init: 10,
        apply: "_applyPageStep"
      },

      /**
       * Factor to apply to the width/height of the knob in relation
       * to the dimension of the underlying area.
       */
      knobFactor: {
        check: "PositiveNumber",
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
      __P_334_0: 2,
      __P_334_1: 0,
      // overridden
      _computeSizeHint: function _computeSizeHint() {
        var hint = qx.ui.core.scroll.ScrollBar.prototype._computeSizeHint.base.call(this);

        if (this.getOrientation() === "horizontal") {
          this.__P_334_1 = hint.minWidth;
          hint.minWidth = 0;
        } else {
          this.__P_334_1 = hint.minHeight;
          hint.minHeight = 0;
        }

        return hint;
      },
      // overridden
      renderLayout: function renderLayout(left, top, width, height) {
        var changes = qx.ui.core.scroll.ScrollBar.prototype.renderLayout.base.call(this, left, top, width, height);
        var horizontal = this.getOrientation() === "horizontal";

        if (this.__P_334_1 >= (horizontal ? width : height)) {
          this.getChildControl("button-begin").setVisibility("hidden");
          this.getChildControl("button-end").setVisibility("hidden");
        } else {
          this.getChildControl("button-begin").setVisibility("visible");
          this.getChildControl("button-end").setVisibility("visible");
        }

        return changes;
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "slider":
            control = new qx.ui.core.scroll.ScrollSlider();
            control.setPageStep(100);
            control.setFocusable(false);
            control.addListener("changeValue", this._onChangeSliderValue, this);
            control.addListener("slideAnimationEnd", this._onSlideAnimationEnd, this);

            this._add(control, {
              flex: 1
            });

            break;

          case "button-begin":
            // Top/Left Button
            control = new qx.ui.form.RepeatButton();
            control.setFocusable(false);
            control.addListener("execute", this._onExecuteBegin, this);

            this._add(control);

            break;

          case "button-end":
            // Bottom/Right Button
            control = new qx.ui.form.RepeatButton();
            control.setFocusable(false);
            control.addListener("execute", this._onExecuteEnd, this);

            this._add(control);

            break;
        }

        return control || qx.ui.core.scroll.ScrollBar.prototype._createChildControlImpl.base.call(this, id);
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyMaximum: function _applyMaximum(value) {
        this.getChildControl("slider").setMaximum(value);
      },
      // property apply
      _applyPosition: function _applyPosition(value) {
        this.getChildControl("slider").setValue(value);
      },
      // property apply
      _applyKnobFactor: function _applyKnobFactor(value) {
        this.getChildControl("slider").setKnobFactor(value);
      },
      // property apply
      _applyPageStep: function _applyPageStep(value) {
        this.getChildControl("slider").setPageStep(value);
      },
      // property apply
      _applyOrientation: function _applyOrientation(value, old) {
        // Dispose old layout
        var oldLayout = this._getLayout();

        if (oldLayout) {
          oldLayout.dispose();
        } // Reconfigure


        if (value === "horizontal") {
          this._setLayout(new qx.ui.layout.HBox());

          this.setAllowStretchX(true);
          this.setAllowStretchY(false);
          this.replaceState("vertical", "horizontal");
          this.getChildControl("button-begin").replaceState("up", "left");
          this.getChildControl("button-end").replaceState("down", "right");
        } else {
          this._setLayout(new qx.ui.layout.VBox());

          this.setAllowStretchX(false);
          this.setAllowStretchY(true);
          this.replaceState("horizontal", "vertical");
          this.getChildControl("button-begin").replaceState("left", "up");
          this.getChildControl("button-end").replaceState("right", "down");
        } // Sync slider orientation


        this.getChildControl("slider").setOrientation(value);
      },

      /*
      ---------------------------------------------------------------------------
        METHOD REDIRECTION TO SLIDER
      ---------------------------------------------------------------------------
      */

      /**
       * Scrolls to the given position.
       *
       * This method automatically corrects the given position to respect
       * the {@link #maximum}.
       *
       * @param position {Integer} Scroll to this position. Must be greater zero.
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      scrollTo: function scrollTo(position, duration) {
        this.getChildControl("slider").slideTo(position, duration);
      },

      /**
       * Scrolls by the given offset.
       *
       * This method automatically corrects the given position to respect
       * the {@link #maximum}.
       *
       * @param offset {Integer} Scroll by this offset
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      scrollBy: function scrollBy(offset, duration) {
        this.getChildControl("slider").slideBy(offset, duration);
      },

      /**
       * Scrolls by the given number of steps.
       *
       * This method automatically corrects the given position to respect
       * the {@link #maximum}.
       *
       * @param steps {Integer} Number of steps
       * @param duration {Number} The time in milliseconds the slide to should take.
       */
      scrollBySteps: function scrollBySteps(steps, duration) {
        var size = this.getSingleStep();
        this.getChildControl("slider").slideBy(steps * size, duration);
      },

      /**
       * Updates the position property considering the minimum and maximum values.
       * @param position {Number} The new position.
       */
      updatePosition: function updatePosition(position) {
        this.getChildControl("slider").updatePosition(position);
      },

      /**
       * If a scroll animation is running, it will be stopped.
       */
      stopScrollAnimation: function stopScrollAnimation() {
        this.getChildControl("slider").stopSlideAnimation();
      },

      /*
      ---------------------------------------------------------------------------
        EVENT LISTENER
      ---------------------------------------------------------------------------
      */

      /**
       * Executed when the up/left button is executed (pressed)
       *
       * @param e {qx.event.type.Event} Execute event of the button
       */
      _onExecuteBegin: function _onExecuteBegin(e) {
        this.scrollBy(-this.getSingleStep(), 50);
      },

      /**
       * Executed when the down/right button is executed (pressed)
       *
       * @param e {qx.event.type.Event} Execute event of the button
       */
      _onExecuteEnd: function _onExecuteEnd(e) {
        this.scrollBy(this.getSingleStep(), 50);
      },

      /**
       * Change listener for slider animation end.
       */
      _onSlideAnimationEnd: function _onSlideAnimationEnd() {
        this.fireEvent("scrollAnimationEnd");
      },

      /**
       * Change listener for slider value changes.
       *
       * @param e {qx.event.type.Data} The change event object
       */
      _onChangeSliderValue: function _onChangeSliderValue(e) {
        this.setPosition(e.getData());
      },

      /**
       * Hide the knob of the slider if the slidebar is too small or show it
       * otherwise.
       *
       * @param e {qx.event.type.Data} event object
       */
      _onResizeSlider: function _onResizeSlider(e) {
        var knob = this.getChildControl("slider").getChildControl("knob");
        var knobHint = knob.getSizeHint();
        var hideKnob = false;
        var sliderSize = this.getChildControl("slider").getInnerSize();

        if (this.getOrientation() == "vertical") {
          if (sliderSize.height < knobHint.minHeight + this.__P_334_0) {
            hideKnob = true;
          }
        } else {
          if (sliderSize.width < knobHint.minWidth + this.__P_334_0) {
            hideKnob = true;
          }
        }

        if (hideKnob) {
          knob.exclude();
        } else {
          knob.show();
        }
      }
    }
  });
  qx.ui.core.scroll.ScrollBar.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ScrollBar.js.map?dt=1613591268219