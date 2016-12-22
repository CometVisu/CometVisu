/**
 * Slider
 *
 * @author tobiasb
 * @since 2016
 */

qx.Class.define('cv.ui.website.Slider', {
  extend: qx.ui.website.Slider,

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    _config : {
      minimum : 0,
      maximum : 100,
      offset : 0,
      step : 1
    },

    _templates : {
      knobContent : "{{value}}"
    },

    slider: qx.ui.website.Slider.slider
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    format: {
      check: "String",
      nullable: true
    },
    sendOnFinish: {
      check: "Boolean",
      init: false
    }
  },


  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    // overridden
    _getKnobContent: function() {
      if (this.getFormat() && this.getValue() !== undefined) {
        return sprintf(this.getFormat(), this.getValue())
      } else {
        return "";
      }
    },

    /**
     * Listener for the pointerdown event. Initializes drag or tracking mode.
     *
     * @param e {qx.event.Emitter} Incoming event object
     */
    _onPointerDown : function(e) {
      // this can happen if the user releases the button while dragging outside
      // of the browser viewport
      if (this._dragMode) {
        return;
      }

      this._dragMode = true;

      qxWeb(document.documentElement).on("pointermove", this._onPointerMove, this)
        .setStyle("cursor", "pointer");

      e.stopPropagation();
    },

    /**
     * Listener for the pointermove event for the knob. Only used in drag mode.
     *
     * @param e {qx.event.Emitter} Incoming event object
     */
    _onPointerMove : function(e) {
      e.preventDefault();

      if (this._dragMode) {
        var dragPosition = e.getDocumentLeft();
        var dragBoundaries = this._getDragBoundaries();
        var paddingLeft = Math.ceil(parseFloat(this.getStyle("paddingLeft")) || 0);
        var positionKnob = dragPosition - this.getOffset().left - this._getHalfKnobWidth() - paddingLeft;

        if (dragPosition >= dragBoundaries.min && dragPosition <= dragBoundaries.max) {
          if (!this.isSendOnFinish()) {
            this.setValue(this._getNearestValue(dragPosition));
          }
          if (positionKnob > 0) {
            this._setKnobPosition(positionKnob);
            this.emit("changePosition", positionKnob);
          }
        }
        e.stopPropagation();
      }
    },

    /**
     * Listener for the pointerup event. Used for cleanup of previously
     * initialized modes.
     *
     * @param e {qx.event.Emitter} Incoming event object
     */
    _onDocPointerUp : function(e) {
      if (this._dragMode === true) {
        // Cleanup status flags
        delete this._dragMode;

        this._valueToPosition(this.getValue());

        qxWeb(document.documentElement).off("pointermove", this._onPointerMove, this)
          .setStyle("cursor", "auto");
        e.stopPropagation();
      }
    },
    /**
     * Positions the slider knob to the given value and fires the "changePosition"
     * event with the current position as integer.
     *
     * @param value {Integer} slider step value
     */
    _valueToPosition : function(value)
    {
      var pixels = this._getPixels();
      var paddingLeft = Math.ceil(parseFloat(this.getStyle("paddingLeft")) || 0);
      var valueToPixel;
      if (pixels.length > 0) {
        // Get the pixel value of the current step value
        valueToPixel = pixels[this.getConfig("step").indexOf(value)] - paddingLeft;
      } else {
        var dragBoundaries = this._getDragBoundaries();
        var availableWidth = dragBoundaries.max - dragBoundaries.min;
        var range = this.getConfig("maximum") - this.getConfig("minimum");
        var fraction = (value - this.getConfig("minimum")) / range;
        valueToPixel = (availableWidth * fraction) + dragBoundaries.min - paddingLeft;
      }

      // relative position is necessary here
      var position = valueToPixel - this.getOffset().left - this._getHalfKnobWidth();
      this._setKnobPosition(position);

      this.emit("changePosition", position);
    }
  }
});