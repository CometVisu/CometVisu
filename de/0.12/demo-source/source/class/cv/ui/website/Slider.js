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
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
    // This event is send when the user interaction end (pointerup)
    'done': 'qx.event.type.Data'
  },


  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __pointerMoveEvent: null,
    __positionKnob: null,
    __invalidPageSizeListener: null,
    __sizeStates: null,

    init: function() {
      this.base(arguments);
      this.__sizeStates = cv.ui.layout.ResizeHandler.states;
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
      if (this.getEnabled()) {
        this.on("pointerdown", function (ev) {
          this._onSliderPointerUp(ev);
          this._onPointerDown(ev);
        }, this);
      }
    },

    // overridden
    _getKnobContent: function() {
      if (this.getFormat() && this.getValue() !== undefined) {
        return cv.util.String.sprintf(this.getFormat(), this.getValue());
      } else {
        return "";
      }
    },

    // overridden
    _onKeyDown: function(e) {
      if (this.getEnabled()) {
        this.base(arguments, e);
      }
    },

    /**
     * Update slider knob position
     */
    updatePositions: function() {
      this._onWindowResize();
    },

    _onWindowResize: function () {
      var args = arguments;
      if (this.__sizeStates.isPageSizeInvalid()) {
        if (!this.__invalidPageSizeListener) {
          this.__invalidPageSizeListener = this.__sizeStates.addListener('changePageSizeInvalid', function (ev) {
            if (ev.getData() === false) {
              this.__sizeStates.removeListenerById(this.__invalidPageSizeListener);
              this.__invalidPageSizeListener = null;
              this.base(args);
            }
          }, this);
        }
      } else {
        this.base(args);
      }
    },

    //overridden
    _onPointerMove : function(e) {
      this.__pointerMoveEvent = true;
      e.preventDefault();

      if (this.__dragMode) {
        // position normalization
        var dragBoundaries = this._getDragBoundaries();
        var dragPosition = Math.max(e.getDocumentLeft(), dragBoundaries.min);
        dragPosition = Math.min(dragPosition, dragBoundaries.max);

        var paddingLeft = Math.ceil(parseFloat(this.getStyle("paddingLeft")) || 0);
        var positionKnob = dragPosition - this.getOffset().left - this._getHalfKnobWidth() - paddingLeft;

        if (this.__positionKnob !== positionKnob) {
          this.setValue(this._getNearestValue(dragPosition));
          this._setKnobPosition(positionKnob);
          this.emit("changePosition", positionKnob);
          this.__positionKnob = positionKnob;
        }
        e.stopPropagation();
      }
    },

    // overridden
    _onSliderPointerUp: function(e) {
      this.__pointerMoveEvent = false;
      this.base(arguments, e);
    },

    _onPointerDown : function(e) {
      // this can happen if the user releases the button while dragging outside
      // of the browser viewport
      if (this.__dragMode || !this.getEnabled()) {
        return;
      }

      this.base(arguments, e);
      this.__dragMode = true;
    },


    //overridden
    _onDocPointerUp: function(e) {
      this.__pointerMoveEvent = false;
      var callDone = this.__dragMode;
      this.base(arguments, e);
      this.__dragMode = false;
      if (callDone) {
        this.emit('done', this.getValue());
      }
    },

    isInPointerMove: function() {
      return this.__pointerMoveEvent === true;
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this.__sizeStates = null;
  }
});