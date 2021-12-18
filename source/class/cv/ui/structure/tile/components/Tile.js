/**
 * Shows a tile
 */
qx.Class.define('cv.ui.structure.tile.components.Tile', {
  extend: cv.ui.structure.tile.elements.AbstractCustomElement,

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
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

    /**
     * Handles the incoming data from the backend for this widget
     *
     * @param ev {CustomEvent} stateUpdate event fired from an cv-address component
     */
    onStateUpdate(ev) {
      if (ev.detail.target === 'background-image') {
        this._element.style.backgroundImage = ev.detail.state ? `url(${ev.detail.state})` : '';
        let overlay = this._element.querySelector(':scope > div.overlay');
        if (!overlay) {
          overlay = document.createElement('div');
          overlay.classList.add('overlay');
          this._element.insertBefore(overlay, this._element.firstChild);
        }
        if (ev.detail.state) {
          this._element.classList.add('has-bg-image');
        } else {
          this._element.classList.remove('has-bg-image');
        }
      } else {
        this.debug('unhandled address target', ev.detail.target);
      }
    }
  },

  defer(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'tile', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
  }
});
