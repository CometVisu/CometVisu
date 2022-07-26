/**
 * Creates a popup that contains arbitrary content and can be opened as an overlay over the current UI.
 *
 * @author Tobias Bräutigam
 * @since 2022
 */
qx.Class.define('cv.ui.structure.tile.widgets.Popup', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    openedPopups: []
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {

    _init() {
      this.base(arguments);
      const popup = this._element;
      const closeable = !popup.hasAttribute('closeable') || popup.getAttribute('closeable') === 'true';
      if (closeable) {
        this._closeButton = document.createElement('button');
        this._closeButton.classList.add('close');
        const icon = document.createElement('i');
        icon.classList.add('ri-close-line');
        this._closeButton.appendChild(icon);
        popup.insertBefore(this._closeButton, popup.firstChild);
        this._closeButton.addEventListener('click', () => this.close());
      }
      if (popup.hasAttribute('auto-close-timeout')) {
        const timeoutSeconds = parseInt(popup.getAttribute('auto-close-timeout'));
        if (!isNaN(timeoutSeconds)) {
          this._autoCloseTimer = new qx.event.Timer(timeoutSeconds * 1000);
          this._autoCloseTimer.addListener('interval', () => {
            this._autoCloseTimer.stop();
            this.close();
          });
        } else {
          this.error('invalid auto-close-timeout value:', popup.getAttribute('auto-close-timeout'));
        }
      }
    },

    open() {
      const popup = this._element;
      if (!popup.hasAttribute('open')) {
        popup.setAttribute('open', '');
        if (popup.hasAttribute('modal') && popup.getAttribute('modal') === 'true') {
          this.registerModalPopup();
        }
        if (this._autoCloseTimer) {
          this._autoCloseTimer.start();
        }
      }
    },

    close() {
      const popup = this._element;
      if (popup) {
        popup.removeAttribute('open');
        if (popup.hasAttribute('modal') && popup.getAttribute('modal') === 'true') {
          this.unregisterModalPopup();
        }
        if (this._autoCloseTimer) {
          this._autoCloseTimer.stop();
        }
      }
    },


    /**
     * Handles the incoming data from the backend for this widget.
     * The popup handles the special address-targets:
     *  - open: opens the popup when the address value is 'true' or 1 => no auto closing
     *  - close: closes the popup when the address value is 'false' or 0 => no auto opening
     *  - open-close: the upper both combined => popup visibility fully dependent on the address value, auto-opening + auto-closing
     *
     * @param ev {CustomEvent} stateUpdate event fired from an cv-address component
     */
    onStateUpdate(ev) {
      if (!this.base(arguments, ev)) {
        switch (ev.detail.target) {
          case 'open':
            if (ev.detail.state) {
              this.open();
            }
            break;

          case 'open-close':
            if (ev.detail.state) {
              this.open();
            } else {
              this.close();
            }
            break;

          case 'close':
            if (!ev.detail.state) {
              this.close();
            }
            break;

          default:
            this.debug('unhandled address target', ev.detail.target);
            break;
        }
      }
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._disposeObjects('_autoCloseTimer');
    if (this._closeButton) {
      this._closeButton.remove();
      this._closeButton = null;
    }
  },

  defer: function(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'popup', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
  }
});
