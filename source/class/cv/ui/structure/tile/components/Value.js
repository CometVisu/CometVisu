/**
 * Shows a value from the backend, as label or image/icon
 */
qx.Class.define('cv.ui.structure.tile.components.Value', {
  extend: cv.ui.structure.tile.elements.AbstractCustomElement,

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
      const hasReadAddress = Array.prototype.some.call(element.querySelectorAll(':scope > cv-address'),
          address => !element.hasAttribute('mode') || element.getAttribute('mode') !== 'write');

      if (hasReadAddress) {
        element.addEventListener('stateUpdate', ev => {
          this.onStateUpdate(ev);
          // cancel event here
          ev.preventDefault();
        });
      }
    },

    _applyValue(value) {
      if (this.isConnected()) {
        this._element.setAttribute('value', value || '');
        let mappedValue = value;
        if (this._element.hasAttribute('mapping')) {
          mappedValue = cv.Application.structureController.mapValue(this._element.getAttribute('mapping'), value);
        }
        const target = this._element.querySelector('.value');
        if (target) {
          const tagName = target.tagName.toLowerCase();
          let roundProgress;
          switch (tagName) {
            case 'cv-icon':
              target._instance.setId(mappedValue);
              break;
            case 'meter':
            case 'progress':
              target.setAttribute('value', mappedValue);
              target.innerHTML = ''+mappedValue;
              break;
            case 'cv-round-progress':
              roundProgress = target.getQxInstance();
              roundProgress.setProgress(value);
              roundProgress.setText(mappedValue);
              break;
            case 'label':
              target.innerHTML = mappedValue;
              break;
          }
        }
        if (this._element.hasAttribute('styling')) {
          let styleClass = cv.Application.structureController.styleValue(this._element.getAttribute('styling'), value);
          this.setStyleClass(styleClass);
        }
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

    /**
     * Handles the incoming data from the backend for this widget
     *
     * @param ev {CustomEvent} stateUpdate event fired from an cv-address component
     */
    onStateUpdate(ev) {
      this.setValue(ev.detail.state);
    }
  },

  defer(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'value', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
  }
});
