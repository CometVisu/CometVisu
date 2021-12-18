/**
 * Base class for all components.
 */
qx.Class.define('cv.ui.structure.tile.components.AbstractComponent', {
  extend: cv.ui.structure.tile.elements.AbstractCustomElement,
  type: 'abstract',

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    value: {
      apply: '_applyValue'
    },
    styleClass: {
      check: 'String',
      nullable: true,
      apply: '_applyStyleClass'
    },
    enabled: {
      check: 'Boolean',
      init: true,
      apply: '_applyEnabled'
    }
  },
  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _writeAddresses: null,

    _init() {
      const element = this._element;
      let hasReadAddress = false;
      const writeAddresses = [];

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

      if (hasReadAddress) {
        element.addEventListener('stateUpdate', ev => {
          this.onStateUpdate(ev);
          // cancel event here
          ev.preventDefault();
        });
      }
    },

    // property apply
    _applyValue(value) {
      if (this.isConnected()) {
        this._element.setAttribute('value', value || '');
        let mappedValue = value;
        if (this._element.hasAttribute('mapping')) {
          mappedValue = cv.Application.structureController.mapValue(this._element.getAttribute('mapping'), value);
        }
        if (this._element.hasAttribute('format')) {
          mappedValue = cv.util.String.sprintf(this._element.getAttribute('format'), mappedValue);
        }
        this._updateValue(mappedValue, value);
        if (this._element.hasAttribute('styling')) {
          let styleClass = cv.Application.structureController.styleValue(this._element.getAttribute('styling'), value);
          this.setStyleClass(styleClass);
        }
      }
    },

    // needs to be implemented by inheriting classes
    _updateValue(mappedValue, value) {
    },

    // property apply
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

    _applyEnabled(value) {
      let blocker = this._element.querySelector(':scope > .blocker');
      if (!blocker) {
        blocker = document.createElement('div');
        blocker.classList.add('blocker');
        this._element.appendChild(blocker);
        blocker.addEventListener('click', ev => {
          ev.preventDefault();
          ev.stopPropagation();
        });
        blocker.addEventListener('pointerdown', ev => {
          ev.preventDefault();
          ev.stopPropagation();
        });
        blocker.addEventListener('pointerup', ev => {
          ev.preventDefault();
          ev.stopPropagation();
        });
      }
      this._element.setAttribute('disabled', value === false ? 'true' : 'false');
      blocker.style.display = value === true ? 'none' : 'block';
    },

    /**
     * Handles the incoming data from the backend for this widget
     *
     * @param ev {CustomEvent} stateUpdate event fired from an cv-address component
     */
    onStateUpdate(ev) {
      this.setValue(ev.detail.state);
    }
  }
});
