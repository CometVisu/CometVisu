/**
 *
 * @author Tobias Bräutigam
 * @since 2022
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
    this.__store = new Map();
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
    name: {
      check: 'String',
      init: '',
      apply: '_applyName'
    },
    progress: {
      check: 'Number',
      init: -1,
      apply: '_applyProgress',
      transform: '_parseInt'
    }
  },
  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _writeAddresses: null,
    __textLabel: null,
    __circumference: null,
    /**
     * @var {Map} value store for addresses to be able to use them e.g. in mapping formulas
     */
    __store: null,

    _parseInt(val) {
      const intVal = parseInt(val);
      return Number.isNaN(intVal) ? 0 : intVal;
    },

    _init() {
      const element = this._element;
      if (element.hasAttribute('type')) {
        this.setType(element.getAttribute('type'));
      }
      if (element.hasAttribute('name')) {
        this.setName(element.getAttribute('name'));
      }
      if (element.hasAttribute('progress')) {
        this.setProgress(element.getAttribute('progress'));
      }
      if (element.hasAttribute('on-value')) {
        this.setOnValue(element.getAttribute('on-value'));
      }
      if (element.hasAttribute('off-value')) {
        this.setOffValue(element.getAttribute('off-value'));
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
      this._writeAddresses = writeAddresses;

      if (writeAddresses.length > 0) {
        const events = {};
        let eventSource = element;
        if (element.getAttribute('whole-tile') === 'true') {
          // find parent tile and use it as event source
          let parent = element.parentElement;
          let level = 0;
          while (level <= 2) {
            parent = parent.parentElement;
            level++;
            if (parent.tagName.toLowerCase() === 'cv-tile') {
              eventSource = parent;
              eventSource.classList.add('clickable');
            }
          }
        }
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
        Object.getOwnPropertyNames(events).forEach(eventName => eventSource.addEventListener(eventName, ev => {
          events[eventName](ev);
        }));
      }
      if (hasReadAddress) {
        element.addEventListener('stateUpdate', ev => {
          this.onStateUpdate(ev);
          // cancel event here
          ev.stopPropagation();
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

    _initProgress() {
      const element = this._element;
      this.__circumference = 100 * Math.PI;
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.setAttribute('type', 'circle');
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.classList.add('bar');
      circle.setAttribute('r', '49');
      circle.setAttribute('cx', '50');
      circle.setAttribute('cy', '50');
      circle.setAttribute('stroke-width', '2');
      circle.setAttribute('stroke-dasharray', this.__circumference + ' ' + this.__circumference);
      circle.setAttribute('stroke-dashoffset', '' + this.__circumference);
      svg.appendChild(circle);
      element.appendChild(svg);
      // make sure that we do not override the progress bar by state appearance
      element.classList.add('progress');
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
          mappedValue = cv.Application.structureController.mapValue(this._element.getAttribute('mapping'), value, this.__store);
        }
        const target = this._element.querySelector('.value');
        if (target && target.tagName.toLowerCase() === 'cv-icon') {
          if (target._instance) {
            target._instance.setId(mappedValue);
          } else {
            target.textContent = mappedValue;
          }
        } else {
          this.updateValue(mappedValue);
        }
        let styleClass = this.isOn() ? this.getOnClass() : this.getOffClass();
        if (this._element.hasAttribute('styling')) {
          styleClass = cv.Application.structureController.styleValue(this._element.getAttribute('styling'), value, this.__store);
        }
        this.setStyleClass(styleClass);
      }
    },

    _applyProgress(value) {
      let valueElement = this._element.querySelector(':scope > svg > circle.bar');
      if (!valueElement) {
        this._initProgress();
        valueElement = this._element.querySelector(':scope > svg > circle.bar');
      }
      if (valueElement) {
        if (this._element.hasAttribute('progress-mapping')) {
          value = cv.Application.structureController.mapValue(this._element.getAttribute('progress-mapping'), value, this.__store);
        }
        valueElement.setAttribute('stroke-dashoffset', '' + (this.__circumference - value / 100 * this.__circumference));
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

    _applyName(value) {
      if (!this.__textLabel) {
        this.__textLabel = document.createElement('label');
        this.__textLabel.classList.add('button-label');
        this._element.appendChild(this.__textLabel);
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
      // using == comparisons to make sure that e.g. 1 equals "1"
      // noinspection EqualityComparisonWithCoercionJS
      let value = ev.detail.state == this.getOnValue();
      let target = ev.detail.target || 'default';
      if (ev.detail.source instanceof cv.ui.structure.tile.elements.Address) {
        const addressElement = ev.detail.source.getElement();
        if (addressElement.hasAttribute('value')) {
          // noinspection EqualityComparisonWithCoercionJS
          value = ev.detail.state == addressElement.getAttribute('value');
        }
      }
      if (target === 'default') {
        this.setOn(value);
      } else if (target === 'progress') {
        this.setProgress(ev.detail.state);
      } else if (target.startsWith('store:')) {
        this.__store.set(target.substring(6), ev.detail.state);
      }
    },

    onClicked(event) {
      this.createRipple(event);
      if (!this._writeAddresses) {
        this._writeAddresses = Array.prototype.filter.call(this._element.querySelectorAll('addresses > cv-address'),
          address => !address.hasAttribute('mode') || address.getAttribute('mode') !== 'read');
      }
      const ev = new CustomEvent('sendState', {
        detail: {
          value: this.isOn() ? this.getOffValue() : this.getOnValue(),
          source: this
        }
      });
      if (this.getType('trigger')) {
        // simulate feedback
        this.setOn(true);
        qx.event.Timer.once(() => {
          this.setOn(false);
        }, null, 250);
      }
      this._writeAddresses.filter(addr => !addr.hasAttribute('on') || addr.getAttribute('on') === 'click').forEach(address => address.dispatchEvent(ev));
      event.stopPropagation();
    },

    onPointerDown() {
      this._writeAddresses.filter(addr => addr.getAttribute('on') === 'down' && addr.hasAttribute('value')).forEach(address => {
        address.dispatchEvent(new CustomEvent('sendState', {
          detail: {
            value: address.getAttribute('value'),
            source: this
          }
        }));
      });
    },

    onPointerUp() {
      this._writeAddresses.filter(addr => addr.getAttribute('on') === 'up' && addr.hasAttribute('value')).forEach(address => {
        address.dispatchEvent(new CustomEvent('sendState', {
          detail: {
            value: address.getAttribute('value'),
            source: this
          }
        }));
      });
    },

    createRipple(event) {
      const button = event.currentTarget;
      let container = button.querySelector(':scope .ripple-container');
      if (!container) {
        container = document.createElement('div');
        container.classList.add('ripple-container');
        button.appendChild(container);
      }
      const circle = document.createElement('span');
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;
      circle.style.width = circle.style.height = `${diameter}px`;
      let x = event.clientX - (button.offsetLeft + radius);
      let y = event.clientY - (button.offsetTop + radius);
      if (button === this._element) {
        x -= button.offsetParent.offsetLeft;
        y -= button.offsetParent.offsetTop;
      }
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;
      circle.classList.add('ripple');
      // remove old ones
      container.querySelectorAll('.ripple').forEach(ripple => ripple.remove());
      container.appendChild(circle);
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
