/* Slide.js 
 * 
 * copyright (c) 2010-2020, Christian Mayer and the CometVisu contributers.
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
    this.__animator = new cv.util.UpdateRateLimiter(this.__updateHandlePosition, this);
    this.__pageSizeListener = cv.ui.layout.ResizeHandler.states.addListener('changePageSizeInvalid',()=>{this.__invalidateScreensize();});
  },
  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    cv.ui.layout.ResizeHandler.states.removeListenerById(this.__pageSizeListener);
    this.__pageSizeListener = null;
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
    showInvalidValues: {
      check: "Boolean",
      init: false
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
    __lastBusValue: {},
    __animator: null,
    __actorWidth: undefined,
    __buttonWidth: undefined,
    __pageSizeListener: undefined,
    __inDrag: false,       // is the handle currently dragged?
    __coordMin: undefined, // minimal screen coordinate of slider

    // overridden
    _getInnerDomString: function () {
      var placeholder = this.getFormat() === '' ? '' : '-';
      return `
        <div class="actor ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" style="touch-action: pan-y;">
          <button class="ui-slider-handle ui-state-default ui-corner-all" draggable="false" unselectable="true" style="transform: translate3d(0px, 0px, 0px);">`+placeholder+`</button>
          <div class="ui-slider-range" style="margin-left: 0px; width: 0px;"></div>
        </div>
      `;
    },

    // overridden
    _onDomReady: function() {
      this.base(arguments);

      this.__throttled = cv.util.Function.throttle(this.__onChangeValue, 250, {trailing: true}, this);

      this.getActor().addEventListener('pointerdown', this);
      this.getActor().addEventListener('wheel', this);
    },

    _update: function (address, data) {
      let transform = this.getAddress()[address][0];
      if (this.__inDrag || this.__lastBusValue[transform] === data) {
        // slider in use -> ignore value from bus
        // internal state unchanged -> also do nothing
        return;
      }
      this.__lastBusValue = {}; // forget all other transforms as they might not be valid anymore
      this.__lastBusValue[transform] = data;

      let value = cv.Transform.decode(transform, data);

      // animate when visible, otherwise jump to the target value
      this.__setSliderTo(value, !this.isVisible());
    },

    /**
     * The the internal slider state and its handle and displayed value
     * @param value {Number} The new value
     * @param instant {Boolean} Animate or instant change
     * @param relaxDisplay {Boolean} Let the handle move to an unstable position
     *   to give visual feedback that something does happen during interaction
     * @private
     */
    __setSliderTo: function(value, instant, relaxDisplay = false) {
      let min = this.getMin();
      let max = this.getMax();
      let step = this.getStep();
      if (step === 0 || Math.abs((max-min)/step) > 10000) {
        // limit too small step size - it's not necessary to have more than
        // 10000 steps for the range as even the biggest screen doesn't have
        // that many pixels
        step = (max-min)/10000;
      }
      let realValue = Math.min(Math.max(value, min), max);

      if (!this.getShowInvalidValues()) {
        // map to closest allowed value
        let stepValue = Math.round((realValue - min) / step) * step + min;
        // use max when the value is greater than the middle point between the
        // biggest allowed step and the maximum
        let maxSwitchValue = (Math.floor((max - min) / step) * step + min + max) / 2;
        realValue = realValue < maxSwitchValue ? stepValue : max;
      }

      let ratio = max===min ? 0 : (realValue-min)/(max-min);

      if (relaxDisplay) {
        let valueRatio = max===min ? 0 : (Math.min(Math.max(value, min), max)-min)/(max-min);
        let delta = ratio - valueRatio;
        let stepCount = (max - min) / step;
        let factor = (2*stepCount) ** 3;
        ratio -= Math.min(factor * delta**4, Math.abs(delta)) * Math.sign(delta);
      }

      // store it to be able to suppress sending of unchanged data
      this.setBasicValue(realValue);

      if (this.getFormat() !== '') {
        // #2: map it to a value the user wants to see
        let displayValue = this.applyMapping(realValue);

        // #3: format it in a way the user understands the value
        displayValue = this.applyFormat(undefined, displayValue);
        this.setValue(displayValue);

        this.applyStyling(realValue);

        let button = this.getDomElement().querySelector('button');
        this.defaultValue2DOM(displayValue, (e) => {button.innerHTML = e;});
      }

      this.__animator.setTo(ratio, instant);
    },

    __updateHandlePosition: function (ratio) {
      let element = this.getDomElement();
      let button = element.querySelector('button');
      if (button === null) {
        // most likely reason: the widget / DOM tree was deleted (e.g. due to
        // browsing to a new page or during unit tests)
        this._disposeObjects('__animator');
        return;
      }
      let range = element.querySelector('.ui-slider-range');
      if (this.__actorWidth === undefined || this.__buttonWidth === undefined) {
        let actor = element.querySelector('.actor');
        this.__actorWidth = parseFloat(window.getComputedStyle(actor).getPropertyValue('width'));
        this.__buttonWidth = parseFloat(window.getComputedStyle(button).getPropertyValue('width'));
      }
      let length = ratio * this.__actorWidth;
      button.style.transform = 'translate3d(' + (length-this.__buttonWidth/2) + 'px, 0px, 0px)';
      range.style.width = length + 'px';
    },

    __invalidateScreensize: function () {
      let min = this.getMin();
      let max = this.getMax();
      this.__actorWidth = undefined; // invalidate cached values
      this.__animator.setTo(max===min ? 0 : (this.getBasicValue()-min)/(max-min));
    },

    handleEvent: function (event) {
      let newRatio = 0;

      switch(event.type) {
        case 'pointerdown':
          this.__inDrag = true;
          document.addEventListener('pointermove', this);
          document.addEventListener('pointerup', this);
          let boundingRect = event.currentTarget.getBoundingClientRect();
          let computedStyle = window.getComputedStyle(event.currentTarget);
          this.__coordMin = boundingRect.left + parseFloat(computedStyle.paddingLeft);
          newRatio = (event.clientX - this.__coordMin)/this.__actorWidth;
          break;

        case 'pointermove':
          if (!this.__inDrag) {
            return;
          }
          newRatio = (event.clientX - this.__coordMin)/this.__actorWidth;
          break;

        case 'pointerup':
          this.__inDrag = false;
          document.removeEventListener('pointermove', this);
          document.removeEventListener('pointerup', this);
          newRatio = (event.clientX - this.__coordMin)/this.__actorWidth;
          break;

        case 'wheel':
          break;
      }

      newRatio = Math.min(Math.max(newRatio, 0.0), 1.0); // limit to 0..1
      let newValue = this.getMin() + newRatio * (this.getMax() - this.getMin());
      this.__setSliderTo(newValue, this.__inDrag, this.__inDrag);
      if (!this.getSendOnFinish() || event.type === 'pointerup') {
        this.__throttled.call(newValue);
      }
    },

    __onChangeValue: function(value) {
      this.__lastBusValue = this.sendToBackend(value, false, this.__lastBusValue );
    }
  },

  defer: function(statics) {
    cv.ui.structure.WidgetFactory.registerClass("slide", statics);
  }
});
