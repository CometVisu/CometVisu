/* Slide.js 
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


/**
 * Adds a horizontal slider to the visu. This can be used, for example, to dim a light or change temperature values.
 *
 * @require(qx.module.Attribute)
 * @require(qx.module.Css)
 * @require(qx.module.Traversing)
 * @require(qx.module.Manipulating)
 * @require(qx.module.event.Keyboard)
 * @author Christian Mayer
 * @since 2012
 */
qx.Class.define('cv.ui.structure.pure.Slide', {
  extend: cv.ui.structure.AbstractWidget,
  include: [cv.ui.common.Operate, cv.ui.common.Update],

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(props) {
    this.base(arguments, props);
    // check provided address-items for at least one address which has write-access
    var readonly = true;
    for (var addrIdx in this.getAddress()) {
      //noinspection JSBitwiseOperatorUsage
      if (cv.data.Model.isWriteAddress(this.getAddress()[addrIdx])) {
        // write-access detected --> no read-only mode
        readonly = false;
        break;
      }
    }
    this.__readonly = readonly;

    // initialize value with min value
    if (this.getMin() <= 0 && 0 <= this.getMax()) {
      this.setValue(this.applyMapping(0));
    } else {
      this.setValue(this.applyMapping(this.getMin()));
    }
  },


  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    min: {
      check: "Number",
      init: 0
    },
    max: {
      check: "Number",
      init: 100
    },
    step: {
      check: "Number",
      init: 0.5
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
    __main: null,
    __timerId: null,
    __slider : null,
    __readonly: null,
    __initialized: null,
    __skipUpdatesFromSlider: null,

    // overridden
    _onDomReady: function() {
      this.base(arguments);
      if (!this.__initialized) {
        this.__skipUpdatesFromSlider = true;
        var actor = this.getActor();
        var slider = this.__slider = new cv.ui.website.Slider(actor, this.getPath());
        slider.setFormat(this.getFormat());
        slider.setConfig("step", this.getStep());
        slider.setConfig("minimum", this.getMin());
        slider.setConfig("maximum", this.getMax());

        if (this.__readonly) {
          slider.setEnabled(false);
        }
        slider.init();
        // set initial value
        slider.setValue(parseFloat(this.getValue()));
        var throttled = cv.util.Function.throttle(this._onChangeValue, 250, {trailing: true}, this);

        slider.on("changeValue", function (val) {
          if (!this.__skipUpdatesFromSlider) {
            throttled.call(val);
          }
        }, this);
        slider.on('done', function () {
          throttled.abort();
          if (this.isSendOnFinish()) {
            this._onChangeValue(slider.getValue(), true);
          }
        }, this);

        this.addListener("changeValue", function (ev) {
          this.__skipUpdatesFromSlider = true;
          slider.setValue(parseFloat(ev.getData()));
          this.__skipUpdatesFromSlider = false;
        }, this);

        // add CSS classes for compability with old sliders
        slider.addClasses(["ui-slider", "ui-slider-horizontal", "ui-widget", "ui-widget-content", "ui-corner-all"]);
        var knob = slider.find(".qx-slider-knob");
        knob.addClasses(["ui-slider-handle", "ui-state-default", "ui-corner-all"]);


        this.addListener("changeVisible", function (ev) {
          if (ev.getData() === true) {
            new qx.util.DeferredCall(this.__updateSlider, this).schedule();
          }
        }, this);
        if (this.isVisible()) {
          // delay the update, as the page width is not correct at this moment
          qx.event.Timer.once(this.__updateSlider, this, 5);
        }
        this.__skipUpdatesFromSlider = false;
        this.__initialized = true;

      }
    },

    /**
     * Refresh the slider position
     */
    __updateSlider: function() {
      if (this.__slider) {
        this.__skipUpdatesFromSlider = true;
        this.__slider.updatePositions();
        this.__skipUpdatesFromSlider = false;
      }
    },

    // overridden
    _getInnerDomString: function () {
      return '<div class="actor"></div>';
    },

    _update: function (ga, d) {
      if ((this.__slider && this.__slider.isInPointerMove()) || d === undefined) {
        return;
      }
      var value = this.applyTransform(ga, d);

      try {
        if (this.getValue() !== value) {
          this.setValue(value);
          if (this.__slider) {
            this.__skipUpdatesFromSlider = true;
            this.__slider.setValue(value);
            this.__skipUpdatesFromSlider = false;
          }
        }
      } catch(e) {
        this.error(e);
      }
    },

    // override Operate Mixins on click action, we handle that ourselfs with _onChangeValue
    _action: function() {},

    /**
     * Handle incoming value changes send by the slider widget (e.g. triggered by user interaction)
     * @param value {Number} the current value to send
     * @param finished {Boolean} if sendOnFinish is true settings this parameter to true triggers the value to be send
     */
    _onChangeValue: function(value, finished) {
      if (!this.__initialized || this.__skipUpdatesFromSlider === true) { return; }
      if ((this.isSendOnFinish() === true && finished) ||
        (this.isSendOnFinish() === false && this.__slider.isInPointerMove())
      ) {
        this._lastBusValue = this.sendToBackend(value, false, this._lastBusValue );
      }
      this.setValue(value);
    },

    /**
     * Get the value that should be send to backend after the action has been triggered
     */
    getActionValue: function () {
      return "";
    }
  },

  defer: function(statics) {
    cv.ui.structure.WidgetFactory.registerClass("slide", statics);
  }
});
