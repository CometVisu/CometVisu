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
  construct(props) {
    super(props);
    this.__animator = new cv.util.LimitedRateUpdateAnimator(this.__updateHandlePosition, this);

    this.__pageSizeListener = cv.ui.structure.pure.layout.ResizeHandler.states.addListener('changePageSizeInvalid', () => {
      // Quick fix for issue https://github.com/CometVisu/CometVisu/issues/1369
      // make sure that the `__invalidateScreensize` is delayed so that
      // reading the available spaces is valid.
      // Just to be sure, wait for two frames
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(this.__invalidateScreensize.bind(this));
      });
    });
    this.__lastBusValue = {};
  },
  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    cv.ui.structure.pure.layout.ResizeHandler.states.removeListenerById(this.__pageSizeListener);

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
    __lastBusValue: null,
    __animator: null,
    __button: undefined, // cache for DOM element
    __range: undefined, // cache for DOM element
    __actorWidth: undefined,
    __buttonWidth: undefined,
    __pageSizeListener: undefined,
    __inDrag: false, // is the handle currently dragged?
    __coordMin: undefined, // minimal screen coordinate of slider

    // overridden
    _getInnerDomString() {
      const placeholder = this.getFormat() === '' ? '' : '-';
      return (
        `
        <div class="actor ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" style="touch-action: pan-y;">
          <button class="ui-slider-handle ui-state-default ui-corner-all" draggable="false" unselectable="true" style="transform: translate3d(0px, 0px, 0px);">` +
        placeholder +
        `</button>
          <div class="ui-slider-range value" style="margin-left: 0px; width: 0px;"></div>
        </div>
      `
      );
    },

    // overridden
    _onDomReady() {
      super._onDomReady();

      this.__throttled = cv.util.Function.throttle(this.__onChangeValue, 250, { trailing: true }, this);

      this.getActor().addEventListener('pointerdown', this);
    },

    _update(address, data) {
      let transform = this.getAddress()[address].transform;
      if (this.__inDrag || this.__lastBusValue[transform] === data) {
        // slider in use -> ignore value from bus
        // internal state unchanged -> also do nothing
        return;
      }
      this.__lastBusValue = {}; // forget all other transforms as they might not be valid anymore
      this.__lastBusValue[transform] = data;

      let value = cv.Transform.decode(this.getAddress()[address], data);

      // animate when visible, otherwise jump to the target value
      this.__setSliderTo(value, !this.isVisible());
    },

    /**
     * The the internal slider state and its handle and displayed value
     * @param value {Number} The new value
     * @param instant {Boolean} Animate or instant change
     * @param relaxDisplay {Boolean} Let the handle move to an unstable position
     *   to give visual feedback that something does happen during interaction
     * @returns realValue - the real value that is respecting the configured restraints
     * @private
     */
    __setSliderTo(value, instant, relaxDisplay = false) {
      let min = this.getMin();
      let max = this.getMax();
      let step = this.getStep();
      if (step === 0 || Math.abs((max - min) / step) > 10000) {
        // limit too small step size - it's not necessary to have more than
        // 10000 steps for the range as even the biggest screen doesn't have
        // that many pixels
        step = (max - min) / 10000;
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

      let ratio = max === min ? 0 : (realValue - min) / (max - min);

      if (relaxDisplay) {
        let valueRatio = max === min ? 0 : (Math.min(Math.max(value, min), max) - min) / (max - min);
        let delta = ratio - valueRatio;
        let stepCount = (max - min) / step;
        let factor = (2 * stepCount) ** 3;
        ratio -= Math.min(factor * delta ** 4, Math.abs(delta)) * Math.sign(delta);
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
        button.replaceChildren(); // delete anything inside
        this.defaultValue2DOM(displayValue, button);
      }

      this.__animator.setTo(ratio, instant);
      return realValue;
    },

    __updateHandlePosition(ratio) {
      if (this.__button === undefined) {
        let element = this.getDomElement();
        this.__button = element.querySelector('button');
        this.__range = element.querySelector('.ui-slider-range');
      }
      if (this.__button === null) {
        // most likely reason: the widget / DOM tree was deleted (e.g. due to
        // browsing to a new page or during unit tests)
        this._disposeObjects('__animator');
        return;
      }
      const actorWidth = this.__getActorWidth();
      let length = actorWidth >= 1e10 ? 0 : ratio * actorWidth;
      this.__button.style.transform = 'translate3d(' + (length - this.__buttonWidth / 2) + 'px, 0px, 0px)';
      this.__range.style.width = length + 'px';
    },

    __invalidateScreensize() {
      let min = this.getMin();
      let max = this.getMax();
      this.__actorWidth = undefined; // invalidate cached values
      this.__animator.setTo(max === min ? 0 : (this.getBasicValue() - min) / (max - min), true);
    },

    handleEvent(event) {
      let newRatio = 0;

      switch (event.type) {
        case 'pointerdown': {
          this.__inDrag = true;
          document.addEventListener('pointermove', this);
          document.addEventListener('pointerup', this);
          let boundingRect = event.currentTarget.getBoundingClientRect();
          let computedStyle = window.getComputedStyle(event.currentTarget);
          this.__coordMin = boundingRect.left + parseFloat(computedStyle.paddingLeft);
          newRatio = (event.clientX - this.__coordMin) / this.__getActorWidth();
          break;
        }

        case 'pointermove':
          if (!this.__inDrag) {
            return;
          }
          newRatio = (event.clientX - this.__coordMin) / this.__getActorWidth();
          break;

        case 'pointerup':
          this.__inDrag = false;
          document.removeEventListener('pointermove', this);
          document.removeEventListener('pointerup', this);
          newRatio = (event.clientX - this.__coordMin) / this.__getActorWidth();
          break;
      }

      newRatio = Math.min(Math.max(newRatio, 0.0), 1.0); // limit to 0..1
      let newValue = this.getMin() + newRatio * (this.getMax() - this.getMin());
      const realValue = this.__setSliderTo(newValue, this.__inDrag, this.__inDrag);
      if (!this.getSendOnFinish() || event.type === 'pointerup') {
        this.__throttled.call(realValue);
      }
    },

    __onChangeValue(value) {
      this.__lastBusValue = this.sendToBackend(value, false, this.__lastBusValue);
    },

    __getActorWidth() {
      if (this.__actorWidth === undefined || this.__buttonWidth === undefined) {
        if (cv.ui.structure.pure.layout.ResizeHandler.states.isPageSizeInvalid()) {
          return 1e10; // a no valid value that doesn't break other calculations
        }
        let actor = this.getDomElement().querySelector('.actor');
        let actorStyles = window.getComputedStyle(actor);
        this.__actorWidth = parseFloat(actorStyles.getPropertyValue('width'));
        this.__buttonWidth = parseFloat(window.getComputedStyle(this.__button).getPropertyValue('width'));

        this.__range.style.marginLeft = '-' + actorStyles.getPropertyValue('padding-left');
        this.__range.style.borderRadius = actorStyles.getPropertyValue('border-radius');
      }
      return this.__actorWidth;
    }
  },

  defer(statics) {
    cv.ui.structure.WidgetFactory.registerClass('slide', statics);
  }
});
