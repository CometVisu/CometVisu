/**
 * Shows a tile
 */
qx.Class.define('cv.ui.structure.tile.components.Tile', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {

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
      } else if (ev.detail.target === 'enabled') {
        this.setEnabled(ev.detail.state);
      } else if (ev.detail.target === 'show-exclude') {
        this.setVisibility(ev.detail.state ? 'visible' : 'excluded');
      } else if (ev.detail.target === 'show-hide') {
        this.setVisibility(ev.detail.state ? 'visible' : 'hidden');
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
