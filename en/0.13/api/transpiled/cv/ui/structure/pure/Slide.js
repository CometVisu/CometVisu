(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.pure.AbstractWidget": {
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
      "cv.ui.structure.pure.layout.ResizeHandler": {
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
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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
    extend: cv.ui.structure.pure.AbstractWidget,
    include: [cv.ui.common.Operate, cv.ui.common.Update],
    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct(props) {
      var _this = this;
      cv.ui.structure.pure.AbstractWidget.constructor.call(this, props);
      this.__P_67_0 = new cv.util.LimitedRateUpdateAnimator(this.__P_67_1, this);
      this.__P_67_2 = cv.ui.structure.pure.layout.ResizeHandler.states.addListener('changePageSizeInvalid', function () {
        // Quick fix for issue https://github.com/CometVisu/CometVisu/issues/1369
        // make sure that the `__invalidateScreensize` is delayed so that
        // reading the available spaces is valid.
        // Just to be sure, wait for two frames
        window.requestAnimationFrame(function () {
          window.requestAnimationFrame(_this.__P_67_3.bind(_this));
        });
      });
      this.__P_67_4 = {};
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      cv.ui.structure.pure.layout.ResizeHandler.states.removeListenerById(this.__P_67_2);
      this.__P_67_2 = null;
      this.__P_67_5 = null;
    },
    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      min: {
        check: 'Number',
        init: 0
      },
      max: {
        check: 'Number',
        init: 100
      },
      step: {
        check: 'Number',
        init: 0.5
      },
      showInvalidValues: {
        check: 'Boolean',
        init: false
      },
      sendOnFinish: {
        check: 'Boolean',
        init: false
      }
    },
    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_67_4: null,
      __P_67_0: null,
      __P_67_5: undefined,
      // cache for DOM element
      __P_67_6: undefined,
      // cache for DOM element
      __P_67_7: undefined,
      __P_67_8: undefined,
      __P_67_2: undefined,
      __P_67_9: false,
      // is the handle currently dragged?
      __P_67_10: undefined,
      // minimal screen coordinate of slider
      // overridden
      _getInnerDomString: function _getInnerDomString() {
        var placeholder = this.getFormat() === '' ? '' : '-';
        return "\n        <div class=\"actor ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all\" style=\"touch-action: pan-y;\">\n          <button class=\"ui-slider-handle ui-state-default ui-corner-all\" draggable=\"false\" unselectable=\"true\" style=\"transform: translate3d(0px, 0px, 0px);\">" + placeholder + "</button>\n          <div class=\"ui-slider-range value\" style=\"margin-left: 0px; width: 0px;\"></div>\n        </div>\n      ";
      },
      // overridden
      _onDomReady: function _onDomReady() {
        cv.ui.structure.pure.Slide.superclass.prototype._onDomReady.call(this);
        this.__P_67_11 = cv.util.Function.throttle(this.__P_67_12, 250, {
          trailing: true
        }, this);
        this.getActor().addEventListener('pointerdown', this);
      },
      _update: function _update(address, data) {
        var transform = this.getAddress()[address].transform;
        if (this.__P_67_9 || this.__P_67_4[transform] === data) {
          // slider in use -> ignore value from bus
          // internal state unchanged -> also do nothing
          return;
        }
        this.__P_67_4 = {}; // forget all other transforms as they might not be valid anymore
        this.__P_67_4[transform] = data;
        var value = cv.Transform.decode(this.getAddress()[address], data);

        // animate when visible, otherwise jump to the target value
        this.__P_67_13(value, !this.isVisible());
      },
      /**
       * The the internal slider state and its handle and displayed value
       * @param value {Number} The new value
       * @param instant {Boolean} Animate or instant change
       * @param relaxDisplay {Boolean} Let the handle move to an unstable position
       *   to give visual feedback that something does happen during interaction
       * @returns {Number} The real value that is respecting the configured restraints
       * @private
       */
      __P_67_13: function __P_67_13(value, instant) {
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
          var stepValue = Math.round((realValue - min) / step) * step + min;
          // use max when the value is greater than the middle point between the
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
        }

        // store it to be able to suppress sending of unchanged data
        this.setBasicValue(realValue);
        if (this.getFormat() !== '') {
          // #2: map it to a value the user wants to see
          var displayValue = this.applyMapping(realValue);

          // #3: format it in a way the user understands the value
          displayValue = this.applyFormat(undefined, displayValue);
          this.setValue(displayValue);
          this.applyStyling(realValue);
          var button = this.getDomElement().querySelector('button');
          button.replaceChildren(); // delete anything inside
          this.defaultValue2DOM(displayValue, button);
        }
        this.__P_67_0.setTo(ratio, instant);
        return realValue;
      },
      __P_67_1: function __P_67_1(ratio) {
        if (this.__P_67_5 === undefined) {
          var element = this.getDomElement();
          this.__P_67_5 = element.querySelector('button');
          this.__P_67_6 = element.querySelector('.ui-slider-range');
        }
        if (this.__P_67_5 === null) {
          // most likely reason: the widget / DOM tree was deleted (e.g. due to
          // browsing to a new page or during unit tests)
          this._disposeObjects("__P_67_0");
          return;
        }
        var actorWidth = this.__P_67_14();
        var length = actorWidth >= 1e10 ? 0 : ratio * actorWidth;
        this.__P_67_5.style.transform = 'translate3d(' + (length - this.__P_67_8 / 2) + 'px, 0px, 0px)';
        this.__P_67_6.style.width = length + 'px';
      },
      __P_67_3: function __P_67_3() {
        var min = this.getMin();
        var max = this.getMax();
        this.__P_67_7 = undefined; // invalidate cached values
        this.__P_67_0.setTo(max === min ? 0 : (this.getBasicValue() - min) / (max - min), true);
      },
      handleEvent: function handleEvent(event) {
        var newRatio = 0;
        switch (event.type) {
          case 'pointerdown':
            {
              this.__P_67_9 = true;
              document.addEventListener('pointermove', this);
              document.addEventListener('pointerup', this);
              var boundingRect = event.currentTarget.getBoundingClientRect();
              var computedStyle = window.getComputedStyle(event.currentTarget);
              this.__P_67_10 = boundingRect.left + parseFloat(computedStyle.paddingLeft);
              newRatio = (event.clientX - this.__P_67_10) / this.__P_67_14();
              break;
            }
          case 'pointermove':
            if (!this.__P_67_9) {
              return;
            }
            newRatio = (event.clientX - this.__P_67_10) / this.__P_67_14();
            break;
          case 'pointerup':
            this.__P_67_9 = false;
            document.removeEventListener('pointermove', this);
            document.removeEventListener('pointerup', this);
            newRatio = (event.clientX - this.__P_67_10) / this.__P_67_14();
            break;
        }
        newRatio = Math.min(Math.max(newRatio, 0.0), 1.0); // limit to 0..1
        var newValue = this.getMin() + newRatio * (this.getMax() - this.getMin());
        var realValue = this.__P_67_13(newValue, this.__P_67_9, this.__P_67_9);
        if (!this.getSendOnFinish() || event.type === 'pointerup') {
          this.__P_67_11.call(realValue);
        }
      },
      __P_67_12: function __P_67_12(value) {
        this.__P_67_4 = this.sendToBackend(value, false, this.__P_67_4);
      },
      __P_67_14: function __P_67_14() {
        if (this.__P_67_7 === undefined || this.__P_67_8 === undefined) {
          if (cv.ui.structure.pure.layout.ResizeHandler.states.isPageSizeInvalid()) {
            return 1e10; // a no valid value that doesn't break other calculations
          }
          var actor = this.getDomElement().querySelector('.actor');
          var actorStyles = window.getComputedStyle(actor);
          this.__P_67_7 = parseFloat(actorStyles.getPropertyValue('width'));
          this.__P_67_8 = parseFloat(window.getComputedStyle(this.__P_67_5).getPropertyValue('width'));
          this.__P_67_6.style.marginLeft = '-' + actorStyles.getPropertyValue('padding-left');
          this.__P_67_6.style.borderRadius = actorStyles.getPropertyValue('border-radius');
        }
        return this.__P_67_7;
      }
    },
    defer: function defer(statics) {
      cv.ui.structure.WidgetFactory.registerClass('slide', statics);
    }
  });
  cv.ui.structure.pure.Slide.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Slide.js.map?dt=1735341760414