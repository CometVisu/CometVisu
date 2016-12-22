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
    }
  },


  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __pointerMoveEvent: null,

    // overridden
    _getKnobContent: function() {
      if (this.getFormat() && this.getValue() !== undefined) {
        return sprintf(this.getFormat(), this.getValue())
      } else {
        return "";
      }
    },

    /**
     * Update slider knob position
     */
    updatePositions: function() {
      this._onWindowResize();
    },

    //overridden
    _onPointerMove : function(e) {
      this.__pointerMoveEvent = true;
      this.base(arguments, e);
    },

    // overridden
    _onSliderPointerUp: function(e) {
      this.__pointerMoveEvent = false;
      this.base(arguments, e);
    },

    _onDocPointerUp: function(e) {
      this.__pointerMoveEvent = false;
      this.base(arguments, e);
    },

    isInPointerMove: function() {
      return this.__pointerMoveEvent === true;
    }
  }
});