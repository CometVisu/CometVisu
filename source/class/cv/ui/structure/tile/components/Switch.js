/**
 *
 */
qx.Class.define('cv.ui.structure.tile.components.Switch', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (element) {
    this.base(arguments, element);
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    on: {
      check: 'Boolean',
      init: false,
      apply: '_applyOn'
    },
    onClass: {
      check: 'String',
      init: 'active'
    },
    offClass: {
      check: 'String',
      init: 'inactive'
    },
    onValue: {
      check: 'String',
      init: '1'
    },
    offValue: {
      check: 'String',
      init: 'O'
    }
  },
  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __writeAddresses: null,

    _applyConnected(value) {
      if (value) {
        this._element.classList.add('round-button');
        this._applyOn();
      }
    },
    _applyOn() {
      if (this.isConnected()) {
        this._element.setAttribute('value', this.isOn() ? this.getOnValue() : this.getOffValue());
        this._element.setAttribute('text', this.isOn() ? 'I' : '0');
        const classes = this._element.classList;
        if (this.isOn()) {
          if (classes.contains(this.getOffClass())) {
            classes.replace(this.getOffClass(), this.getOnClass());
          } else {
            classes.add(this.getOnClass());
          }
        } else if (classes.contains(this.getOnClass())) {
          classes.replace(this.getOnClass(), this.getOffClass());
        } else {
          classes.add(this.getOffClass());
        }
      }
    },

    /**
     * Handles the incoming data from the backend for this widget
     *
     * @param address {String} address that got this value update
     * @param data {variant}  incoming unprocessed data
     */
    update: function(address, data) {
      if (address) {
        const addressElement = Array.prototype.find.call(this._element.querySelectorAll(':scope > cv-address'), elem => elem.textContent === address);
        if (addressElement) {
          let transform = addressElement.getAttribute('transform') || 'raw';
          // transform the raw value to a JavaScript type
          data = cv.Transform.decode(transform, data);
        }
      }
      // using == comparisons to make sure that e.g. 1 equals "1"
      // noinspection EqualityComparisonWithCoercionJS
      this.setOn(data == this.getOnValue());
    },

    onClicked() {
      if (!this.__writeAddresses) {
        this.__writeAddresses = Array.prototype.filter.call(this._element.querySelectorAll(':scope > cv-address'),
          address => !address.hasAttribute('mode') || address.getAttribute('mode') !== 'read');
      }
      // noinspection EqualityComparisonWithCoercionJS
      const value = this.isOn() ? this.getOffValue() : this.getOnValue();
      this.__writeAddresses.forEach(address => {
        const encoding = address.getAttribute('transform');
        const encodedValue = cv.Transform.encodeBusAndRaw(encoding, value);
        // noinspection EqualityComparisonWithCoercionJS
        if (!Object.prototype.hasOwnProperty.call(address, 'lastSentValue') || encodedValue.raw !== address.lastSentValue) {
          cv.TemplateEngine.getClient().write(address.textContent, encodedValue.bus, address);
          address.lastSentValue = encodedValue.raw;
        }
      });
    }
  },

  defer(statics) {
    cv.html.ComponentRegistry.register(cv.ui.structure.tile.Controller.PREFIX + 'switch-button', statics);
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'switch-button', class extends QxConnector {
      static get observedAttributes() {
        return ['text'];
      }

      constructor() {
        super();
        const hasWriteAddresses = Array.prototype.some.call(this.querySelectorAll(':scope > cv-address'),
          address => !address.hasAttribute('mode') || address.getAttribute('mode') !== 'read');
        if (hasWriteAddresses) {
          this.addEventListener('click', () => {
            this.qxComponent.onClicked();
          });
        }
      }

      connectedCallback() {
        super.connectedCallback();
        if (!this.querySelector('span')) {
          const valueElem = document.createElement('span');
          valueElem.classList.add('value');
          valueElem.textContent = this.getAttribute('text');
          this.appendChild(valueElem);
        }
      }

      updateValue(value) {
        const elem = this.querySelector('span.value');
        if (elem) {
          elem.textContent = value;
        }
      }

      attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'text') {
          this.updateValue(newValue);
        } else {
          // eslint-disable-next-line no-console
          console.log('unhandled attribute change of', name, 'from', oldValue, 'to', newValue);
        }
      }
    });
  }
});
