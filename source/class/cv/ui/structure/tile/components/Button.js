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
      check: ['button', 'trigger', 'push'],
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
    },
    text: {
      check: 'String',
      init: '',
      apply: '_applyText'
    }
  },
  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __writeAddresses: null,
    __textLabel: null,

    _init() {
      const element = this._element;
      if (element.hasAttribute('type')) {
        this.setType(element.getAttribute('type'));
      }
      if (element.hasAttribute('text')) {
        this.setText(element.getAttribute('text'));
      }
      let hasReadAddress = false;
      let writeAddresses = [];
      Array.prototype.forEach.call(element.querySelectorAll(':scope > cv-address'), address => {
        const mode = address.hasAttribute('mode') ? address.getAttribute('mode') : 'readwrite';
        switch (mode) {
          case 'readwrite':
            hasReadAddress = true;
            writeAddresses.push(address);
            break;
          case 'read':
            hasReadAddress = true;
            break;
          case 'write':
            writeAddresses.push(address);
            break;
        }
      });
      this.__writeAddresses = writeAddresses;

      if (writeAddresses.length > 0) {
        const events = {};
        writeAddresses.forEach(addr => {
          let event = addr.hasAttribute('on') ? addr.getAttribute('on') : 'click';
          switch (event) {
            case 'click':
              events.click = this.onClicked.bind(this);
              break;
            case 'up':
              events.pointerup = this.onPointerUp.bind(this);
              break;
            case 'down':
              events.pointerdown = this.onPointerDown.bind(this);
              break;
          }
        });
        Object.getOwnPropertyNames(events).forEach(eventName => element.addEventListener(eventName, ev => {
          events[eventName](ev);
        }));
      }
      if (hasReadAddress) {
        element.addEventListener('stateUpdate', ev => {
          this.onStateUpdate(ev);
          // cancel event here
          ev.preventDefault();
        });
      } else if (element.hasAttribute('mapping') || element.hasAttribute('styling')) {
        // apply the trigger state
        const triggerAddresses = writeAddresses.filter(addr => addr.hasAttribute('value') && !addr.hasAttribute('on'));
        if (triggerAddresses.length === 1) {
          const value = triggerAddresses[0].getAttribute('value');
          qx.event.Timer.once(() => {
            // using == comparisons to make sure that e.g. 1 equals "1"
            // noinspection EqualityComparisonWithCoercionJS
            this.setOn(value == this.getOnValue());
          }, this, 1000);
        }
      }

      // detect button type
      if (!hasReadAddress && writeAddresses.filter(addr => addr.hasAttribute('value') && !addr.hasAttribute('on')).length === 1) {
        // only one write address with a fixed value and no special event => simple trigger
        this.setType('trigger');
      } else {
        let hasDown = false;
        let hasUp = false;
        writeAddresses.some(addr => {
          if (addr.hasAttribute('value') && addr.hasAttribute('on')) {
            if (!hasDown) {
              hasDown = addr.getAttribute('on') === 'down';
            }
            if (!hasUp) {
              hasUp = addr.getAttribute('on') === 'up';
            }
          }
          return hasUp && hasDown;
        });
        if (hasUp && hasDown) {
          // has an address for up and one for down event with a fixed value -> pushbutton
          this.setType('push');
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

    _applyText(value) {
      if (!this.__textLabel) {
        this.__textLabel = document.createElement('label');
        this.__textLabel.classList.add('button-label');
        this._element.parentNode.insertBefore(this.__textLabel, this._element.nextElementSibling);
      }
      this.__textLabel.textContent = value;
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
      if (ev.detail.source instanceof cv.ui.structure.tile.elements.Address) {
        const addressElement = ev.detail.source.getElement();
        if (addressElement.hasAttribute('value')) {
          // noinspection EqualityComparisonWithCoercionJS
          this.setOn(ev.detail.state == addressElement.getAttribute('value'));
          return;
        }
      }
      // using == comparisons to make sure that e.g. 1 equals "1"
      // noinspection EqualityComparisonWithCoercionJS
      this.setOn(ev.detail.state == this.getOnValue());
    },

    onClicked() {
      const ev = new CustomEvent('sendState', {
        detail: {
          value: this.isOn() ? this.getOffValue() : this.getOnValue(),
          source: this
        }
      });
      this.__writeAddresses.filter(addr => !addr.hasAttribute('on') || addr.getAttribute('on') === 'click').forEach(address => address.dispatchEvent(ev));
    },

    onPointerDown() {
      this.__writeAddresses.filter(addr => addr.getAttribute('on') === 'down' && addr.hasAttribute('value')).forEach(address => {
        address.dispatchEvent(new CustomEvent('sendState', {
          detail: {
            value: address.getAttribute('value'),
            source: this
          }
        }));
      });
    },

    onPointerUp() {
      this.__writeAddresses.filter(addr => addr.getAttribute('on') === 'up' && addr.hasAttribute('value')).forEach(address => {
        address.dispatchEvent(new CustomEvent('sendState', {
          detail: {
            value: address.getAttribute('value'),
            source: this
          }
        }));
      });
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
