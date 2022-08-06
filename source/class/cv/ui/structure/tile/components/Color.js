/**
 * Shows a html color input
 * @author Tobias Bräutigam
 * @since 2022
 */
qx.Class.define('cv.ui.structure.tile.components.Color', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
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
        input.setAttribute('type', 'color');
        element.appendChild(input);
        input.oninput = () => this.__throttled.call();
      }
      this.__input = input;
    },

    _applyThrottleInterval(value) {
      if (value > 0) {
        this.__throttled = cv.util.Function.throttle(this.onInput, value, { trailing: true }, this);
      } else {
        // no throttling, direct call
        this.__throttled = {
          call: () => this.onInput(),
          abort: () => {}
        };
      }
    },

    onInput() {
      this.__sendValue(this.__input.value);
    },

    _updateValue(mappedValue, value) {
      let target = this._element.querySelector(':scope > .value');
      if (target) {
        const tagName = target.tagName.toLowerCase();
        switch (tagName) {
          case 'cv-icon':
            target.style.color = mappedValue;
            break;
        }
      }
      const input = this._element.querySelector(':scope > input');
      input.value = mappedValue;
      if (!target) {
        // only if we do not have another value handler
        this._element.style.backgroundColor = mappedValue;
      }
    },

    onStateUpdate(ev) {
      let handled = false;
      if (ev.detail.target) {
        handled = this.base(arguments, ev);
      }
      if (!handled) {
        const value = ev.detail.state;
        switch (ev.detail.variant) {
          case 'rgb':
            this.setValue(`#${value.get('r').toString(16).padStart(2, '0')}${value.get('g').toString(16).padStart(2, '0')}${value.get('b').toString(16).padStart(2, '0')}`);
            break;
        }
      }
    },

    __sendValue(value) {
      const rgb = new Map([
        ['r', parseInt(value.substring(1, 3), 16)],
        ['b', parseInt(value.substring(3, 5), 16)],
        ['w', parseInt(value.substring(5, 7), 16)]
      ]);
      const ev = new CustomEvent('sendState', {
        detail: {
          value: rgb,
          source: this
        }
      });
      this._writeAddresses.filter(addr => addr.getAttribute('variant') === 'rgb').forEach(address => address.dispatchEvent(ev));
    }
  },

  defer(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'color', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
  }
});
