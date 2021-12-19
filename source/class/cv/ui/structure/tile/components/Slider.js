/**
 * Shows a range slider.
 */
qx.Class.define('cv.ui.structure.tile.components.Slider', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    stepWidth: {
      check: 'Number',
      init: 5
    },
    min: {
      check: 'Number',
      init: 1,
      apply: '_applyMin'
    },
    max: {
      check: 'Number',
      init: 100,
      apply: '_applyMax'
    },
    showValue: {
      check: 'Boolean',
      init: true,
      apply: '_applyShowValue'
    },
    throttleInterval: {
      check: 'Number',
      init: 250,
      apply: '_applyThrottleInterval'
    }
  },
  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __throttled: null,
    __input: null,

    _init() {
      this.base(arguments);
      const element = this._element;
      if (element.hasAttribute('throttle-interval')) {
        this.setThrottleInterval(parseInt(element.getAttribute('throttle-interval')));
      } else {
        this._applyThrottleInterval(this.getThrottleInterval());
      }

      // init components
      let input = element.querySelector(':scope > input');
      if (!input) {
        input = document.createElement('input');
        input.classList.add('slider');
        input.setAttribute('type', 'range');
        element.insertBefore(input, element.querySelector(':scope > .up'));
        input.oninput = () => this.__throttled.call();
      }
      this.__input = input;
      if (element.hasAttribute('step-width')) {
        this.setStepWidth(parseInt(element.getAttribute('step-width')));
      }
      if (element.hasAttribute('min')) {
        this.setMin(parseInt(element.getAttribute('min')));
      }
      if (element.hasAttribute('max')) {
        this.setMax(parseInt(element.getAttribute('max')));
      }
      if (element.hasAttribute('hide-value') && element.getAttribute('hide-value') === 'true') {
        this.setShowValue(false);
      } else {
        this._applyShowValue(true);
      }

      const decreaseElement = element.querySelector(':scope > .decrease');
      if (decreaseElement) {
        decreaseElement.addEventListener('click', ev => this.onDecrease());
      }
      const increaseElement = element.querySelector(':scope > .increase');
      if (increaseElement) {
        increaseElement.addEventListener('click', ev => this.onIncrease());
      }
    },

    _applyThrottleInterval(value) {
      if (value > 0) {
        this.__throttled = cv.util.Function.throttle(this.onInput, 250, { trailing: true }, this);
      } else {
        // no throttling, direct call
        this.__throttled = {
          call: () => this.onInput(),
          abort: () => {}
        };
      }
    },

    _applyMin(value) {
      const input = this._element.querySelector(':scope > input');
      input.setAttribute('min', '' + value);
    },

    _applyMax(value) {
      const input = this._element.querySelector(':scope > input');
      input.setAttribute('max', '' + value);
    },

    _applyShowValue(value) {
      let valueLabel = this._element.querySelector(':scope > label.value');
      if (value) {
        if (!valueLabel) {
          valueLabel = document.createElement('label');
          valueLabel.classList.add('value');
          valueLabel.classList.add('secondary');
          this._element.insertBefore(valueLabel, this._element.firstChild);
        }
      }
    },

    _updateValue(mappedValue, value) {
      const target = this._element.querySelector(':scope > input');
      if (target) {
        target.setAttribute('value', value);
      }
      if (this.isShowValue()) {
        let valueLabel = this._element.querySelector(':scope > label.value');
        if (valueLabel) {
          valueLabel.innerText = mappedValue;
        }
      }
    },

    onInput() {
      console.log(this.__input.value);
      this.__sendValue(this.__input.value);
    },

    onDecrease() {
      const value = this.getValue() - this.getStepWidth();
      this.__sendValue(value, 'decrease');
    },

    onIncrease() {
      const value = this.getValue() + this.getStepWidth();
      this.__sendValue(value, 'increase');
    },

    __sendValue(value, on) {
      const ev = new CustomEvent('sendState', {
        detail: {
          value: value,
          source: this
        }
      });
      this._writeAddresses.filter(addr => !addr.hasAttribute('on') || addr.getAttribute('on') === on).forEach(address => address.dispatchEvent(ev));
    }
  },

  defer(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'slider', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
  }
});
