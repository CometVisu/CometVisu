/* Slider.js 
 * 
 * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
 * 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

//noinspection JSUnusedGlobalSymbols
/**
 * Slider
 *
 * @author Tobias Bräutigam
 * @since 0.11.0 (2017)
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

    init: function() {
      this.base(arguments);
      if (this.getChildren(".ui-slider-range").length === 0) {
        this.append(qx.ui.website.Widget.create("<div>")
          .addClass("ui-slider-range"));
      }
      this.on("changePosition", function(pos) {
        var knob = this.getChildren(".ui-slider-range");
        var paddingLeft = Math.ceil(parseFloat(this.getStyle("paddingLeft")) || 0);
        knob.setStyle("width", (pos+paddingLeft)+"px");
        knob.setStyle("marginLeft", paddingLeft*-1+"px");
      }, this);
      qx.event.Registration.addListener(this.getParents()[0], "pointerup", this._onSliderPointerUp, this);
      this.off("pointerup", this._onSliderPointerUp, this);
    },

    // overridden
    _getKnobContent: function() {
      if (this.getFormat() && this.getValue() !== undefined) {
        return cv.util.String.sprintf(this.getFormat(), this.getValue());
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

    //overridden
    _onDocPointerUp: function(e) {
      this.__pointerMoveEvent = false;
      this.base(arguments, e);
    },

    isInPointerMove: function() {
      return this.__pointerMoveEvent === true;
    },

    dispose: function() {
      qx.event.Registration.removeListener(this.getParents()[0], "pointerup", this._onSliderPointerUp, this);
      this.base(arguments);
    }
  }
});