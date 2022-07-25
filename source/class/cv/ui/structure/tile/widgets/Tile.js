/**
 * Shows a tile
 */
qx.Class.define('cv.ui.structure.tile.widgets.Tile', {
  extend: cv.ui.structure.tile.components.AbstractComponent,
  include: cv.ui.structure.tile.MPopup,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    backgroundImage: {
      check: 'String',
      nullable: true,
      apply: '_applyBackgroundImage'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {

    _init() {
      this.base(arguments);
      this.initPopup();
      if (this._element.hasAttribute('background-image')) {
        this.setBackgroundImage(this._element.getAttribute('background-image'));
      }
    },

    _applyBackgroundImage(value) {
      if (value) {
        this._element.style.backgroundImage = `url(${value})`;
        let overlay = this._element.querySelector(':scope > div.overlay');
        if (!overlay) {
          overlay = document.createElement('div');
          overlay.classList.add('overlay');
          this._element.insertBefore(overlay, this._element.firstChild);
        }
        this._element.classList.add('has-bg-image');
      } else {
        this._element.style.backgroundImage = '';
        this._element.classList.remove('has-bg-image');
      }
    },

    /**
     * Handles the incoming data from the backend for this widget
     *
     * @param ev {CustomEvent} stateUpdate event fired from a cv-address component
     */
    onStateUpdate(ev) {
      if (!this.base(arguments, ev)) {
        if (ev.detail.target === 'background-image') {
          this.setBackgroundImage(ev.detail.state);
        } else {
          this.debug('unhandled address target', ev.detail.target);
        }
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
