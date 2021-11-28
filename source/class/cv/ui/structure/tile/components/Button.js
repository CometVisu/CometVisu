/**
 *
 */
qx.Class.define('cv.ui.structure.tile.components.Button', {
  extend: cv.ui.structure.tile.elements.AbstractCustomElement,

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
    type: {
      check: ['button', 'trigger'],
      init: 'button'
    },
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
      init: '0'
    },
    styleClass: {
      check: 'String',
      nullable: true,
      apply: '_applyStyleClass'
    }
  },
  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __writeAddresses: null,

    _init() {
      const element = this._element;
      if (element.hasAttribute('type')) {
        this.setType(element.getAttribute('type'));
      }
      let hasReadAddress = false;
      let hasWriteAddress = false;
      Array.prototype.some.call(element.querySelectorAll(':scope > cv-address'), address => {
        const mode = address.hasAttribute('mode') ? address.getAttribute('mode') : 'readwrite';
        switch (mode) {
          case 'readwrite':
            hasReadAddress = true;
            hasWriteAddress = true;
            break;
          case 'read':
            hasReadAddress = true;
            break;
          case 'write':
            hasWriteAddress = true;
            break;
        }
        return hasWriteAddress && hasReadAddress;
      });

      if (hasWriteAddress) {
        element.addEventListener('click', () => {
          this.onClicked();
        });
      }
      if (hasReadAddress) {
        element.addEventListener('stateUpdate', ev => {
          this.onStateUpdate(ev);
          // cancel event here
          ev.preventDefault();
        });
      } else if (element.hasAttribute('mapping') || element.hasAttribute('styling')) {
        // apply the trigger state
        const writeAddress = element.querySelector(':scope > cv-address[mode="write"]');
        if (writeAddress.hasAttribute('value')) {
          const value = writeAddress.getAttribute('value');
          // a write only with a fixed value
          this.setType('trigger');
          qx.event.Timer.once(() => {
            // using == comparisons to make sure that e.g. 1 equals "1"
            // noinspection EqualityComparisonWithCoercionJS
            this.setOn(value == this.getOnValue());
          }, this, 1000);
        }
      }
    },

    _applyConnected(value) {
      this.base(arguments, value);
      if (value) {
        if (this.getType() !== 'trigger') {
          // delay this because we need the mappings to be ready
          qx.event.Timer.once(this._applyOn, this, 1000);
        }
      }
    },
    _applyOn() {
      if (this.isConnected()) {
        let value = this.isOn() ? this.getOnValue() : this.getOffValue();
        this._element.setAttribute('value', value || '');
        let mappedValue = value;
        if (this._element.hasAttribute('mapping')) {
          mappedValue = cv.Application.structureController.mapValue(this._element.getAttribute('mapping'), value);
        }
        const target = this._element.querySelector('.value');
        if (target && target.tagName.toLowerCase() === 'cv-icon') {
          target._instance.setId(mappedValue);
        } else {
          this.updateValue(mappedValue);
        }
        let styleClass = this.isOn() ? this.getOnClass() : this.getOffClass();
        if (this._element.hasAttribute('styling')) {
          styleClass = cv.Application.structureController.styleValue(this._element.getAttribute('styling'), value);
        }
        this.setStyleClass(styleClass);
      }
    },

    _applyStyleClass(value, oldValue) {
      const classes = this._element.classList;
      if (oldValue) {
        if (classes.contains(oldValue)) {
          classes.replace(oldValue, value);
        } else {
          classes.add(value);
          classes.remove(oldValue);
        }
      } else if (value) {
        classes.add(value);
      }
    },

    updateValue(value) {
      const elem = this._element.querySelector('span.value');
      if (elem) {
        elem.innerHTML = value;
      }
    },

    /**
     * Handles the incoming data from the backend for this widget
     *
     * @param ev {CustomEvent} stateUpdate event fired from an cv-address component
     */
    onStateUpdate(ev) {
      // using == comparisons to make sure that e.g. 1 equals "1"
      // noinspection EqualityComparisonWithCoercionJS
      this.setOn(ev.detail.state == this.getOnValue());
    },

    onClicked() {
      if (!this.__writeAddresses) {
        this.__writeAddresses = Array.prototype.filter.call(this._element.querySelectorAll(':scope > cv-address'),
          address => !address.hasAttribute('mode') || address.getAttribute('mode') !== 'read');
      }
      const ev = new CustomEvent('sendState', {
        detail: {
          value: this.isOn() ? this.getOffValue() : this.getOnValue(),
          source: this
        }
      });
      this.__writeAddresses.forEach(address => address.dispatchEvent(ev));
    }
  },

  defer(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'button', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
  }
});
