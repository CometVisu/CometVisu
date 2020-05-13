(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.AbstractWidget": {
        "construct": true,
        "require": true
      },
      "cv.ui.common.Operate": {
        "require": true
      },
      "cv.ui.common.Update": {
        "require": true
      },
      "cv.util.LimitedRateUpdateAnimator": {
        "construct": true
      },
      "cv.ui.layout.ResizeHandler": {
        "construct": true
      },
      "cv.util.Function": {},
      "cv.Transform": {},
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

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
    construct: function construct(props) {
      var _this = this;

      cv.ui.structure.AbstractWidget.constructor.call(this, props);
      this.__animator = new cv.util.LimitedRateUpdateAnimator(this.__updateHandlePosition, this);
      this.__pageSizeListener = cv.ui.layout.ResizeHandler.states.addListener('changePageSizeInvalid', function () {
        _this.__invalidateScreensize();
      });
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      cv.ui.layout.ResizeHandler.states.removeListenerById(this.__pageSizeListener);
      this.__pageSizeListener = null;
      this.__button = null;
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
      __button: undefined,
      // cache for DOM element
      __range: undefined,
      // cache for DOM element
      __actorWidth: undefined,
      __buttonWidth: undefined,
      __pageSizeListener: undefined,
      __inDrag: false,
      // is the handle currently dragged?
      __coordMin: undefined,
      // minimal screen coordinate of slider
      // overridden
      _getInnerDomString: function _getInnerDomString() {
        var placeholder = this.getFormat() === '' ? '' : '-';
        return "\n        <div class=\"actor ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all\" style=\"touch-action: pan-y;\">\n          <button class=\"ui-slider-handle ui-state-default ui-corner-all\" draggable=\"false\" unselectable=\"true\" style=\"transform: translate3d(0px, 0px, 0px);\">" + placeholder + "</button>\n          <div class=\"ui-slider-range\" style=\"margin-left: 0px; width: 0px;\"></div>\n        </div>\n      ";
      },
      // overridden
      _onDomReady: function _onDomReady() {
        cv.ui.structure.pure.Slide.prototype._onDomReady.base.call(this);

        this.__throttled = cv.util.Function.throttle(this.__onChangeValue, 250, {
          trailing: true
        }, this);
        this.getActor().addEventListener('pointerdown', this);
      },
      _update: function _update(address, data) {
        var transform = this.getAddress()[address][0];

        if (this.__inDrag || this.__lastBusValue[transform] === data) {
          // slider in use -> ignore value from bus
          // internal state unchanged -> also do nothing
          return;
        }

        this.__lastBusValue = {}; // forget all other transforms as they might not be valid anymore

        this.__lastBusValue[transform] = data;
        var value = cv.Transform.decode(transform, data); // animate when visible, otherwise jump to the target value

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
      __setSliderTo: function __setSliderTo(value, instant) {
        var relaxDisplay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var min = this.getMin();
        var max = this.getMax();
        var step = this.getStep();

        if (step === 0 || Math.abs((max - min) / step) > 10000) {
          // limit too small step size - it's not necessary to have more than
          // 10000 steps for the range as even the biggest screen doesn't have
          // that many pixels
          step = (max - min) / 10000;
        }

        var realValue = Math.min(Math.max(value, min), max);

        if (!this.getShowInvalidValues()) {
          // map to closest allowed value
          var stepValue = Math.round((realValue - min) / step) * step + min; // use max when the value is greater than the middle point between the
          // biggest allowed step and the maximum

          var maxSwitchValue = (Math.floor((max - min) / step) * step + min + max) / 2;
          realValue = realValue < maxSwitchValue ? stepValue : max;
        }

        var ratio = max === min ? 0 : (realValue - min) / (max - min);

        if (relaxDisplay) {
          var valueRatio = max === min ? 0 : (Math.min(Math.max(value, min), max) - min) / (max - min);
          var delta = ratio - valueRatio;
          var stepCount = (max - min) / step;
          var factor = Math.pow(2 * stepCount, 3);
          ratio -= Math.min(factor * Math.pow(delta, 4), Math.abs(delta)) * Math.sign(delta);
        } // store it to be able to suppress sending of unchanged data


        this.setBasicValue(realValue);

        if (this.getFormat() !== '') {
          // #2: map it to a value the user wants to see
          var displayValue = this.applyMapping(realValue); // #3: format it in a way the user understands the value

          displayValue = this.applyFormat(undefined, displayValue);
          this.setValue(displayValue);
          this.applyStyling(realValue);
          var button = this.getDomElement().querySelector('button');
          this.defaultValue2DOM(displayValue, function (e) {
            button.innerHTML = e;
          });
        }

        this.__animator.setTo(ratio, instant);
      },
      __updateHandlePosition: function __updateHandlePosition(ratio) {
        if (this.__button === undefined) {
          var element = this.getDomElement();
          this.__button = element.querySelector('button');
          this.__range = element.querySelector('.ui-slider-range');
        }

        if (this.__button === null) {
          // most likely reason: the widget / DOM tree was deleted (e.g. due to
          // browsing to a new page or during unit tests)
          this._disposeObjects('__animator');

          return;
        }

        if (this.__actorWidth === undefined || this.__buttonWidth === undefined) {
          var actor = this.getDomElement().querySelector('.actor');
          this.__actorWidth = parseFloat(window.getComputedStyle(actor).getPropertyValue('width'));
          this.__buttonWidth = parseFloat(window.getComputedStyle(this.__button).getPropertyValue('width'));
        }

        var length = ratio * this.__actorWidth;
        this.__button.style.transform = 'translate3d(' + (length - this.__buttonWidth / 2) + 'px, 0px, 0px)';
        this.__range.style.width = length + 'px';
      },
      __invalidateScreensize: function __invalidateScreensize() {
        var min = this.getMin();
        var max = this.getMax();
        this.__actorWidth = undefined; // invalidate cached values

        this.__animator.setTo(max === min ? 0 : (this.getBasicValue() - min) / (max - min));
      },
      handleEvent: function handleEvent(event) {
        var newRatio = 0;

        switch (event.type) {
          case 'pointerdown':
            this.__inDrag = true;
            document.addEventListener('pointermove', this);
            document.addEventListener('pointerup', this);
            var boundingRect = event.currentTarget.getBoundingClientRect();
            var computedStyle = window.getComputedStyle(event.currentTarget);
            this.__coordMin = boundingRect.left + parseFloat(computedStyle.paddingLeft);
            newRatio = (event.clientX - this.__coordMin) / this.__actorWidth;
            break;

          case 'pointermove':
            if (!this.__inDrag) {
              return;
            }

            newRatio = (event.clientX - this.__coordMin) / this.__actorWidth;
            break;

          case 'pointerup':
            this.__inDrag = false;
            document.removeEventListener('pointermove', this);
            document.removeEventListener('pointerup', this);
            newRatio = (event.clientX - this.__coordMin) / this.__actorWidth;
            break;
        }

        newRatio = Math.min(Math.max(newRatio, 0.0), 1.0); // limit to 0..1

        var newValue = this.getMin() + newRatio * (this.getMax() - this.getMin());

        this.__setSliderTo(newValue, this.__inDrag, this.__inDrag);

        if (!this.getSendOnFinish() || event.type === 'pointerup') {
          this.__throttled.call(newValue);
        }
      },
      __onChangeValue: function __onChangeValue(value) {
        this.__lastBusValue = this.sendToBackend(value, false, this.__lastBusValue);
      }
    },
    defer: function defer(statics) {
      cv.ui.structure.WidgetFactory.registerClass("slide", statics);
    }
  });
  cv.ui.structure.pure.Slide.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Slide.js.map?dt=1589400485445