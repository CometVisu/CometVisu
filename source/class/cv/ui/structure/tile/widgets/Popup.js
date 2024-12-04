/* Popup.js
 *
 * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

/**
 * Creates a popup that contains arbitrary content and can be opened as an overlay over the current UI.
 *
 * @author Tobias Bräutigam
 * @since 2022
 */
qx.Class.define('cv.ui.structure.tile.widgets.Popup', {
  extend: cv.ui.structure.tile.components.AbstractComponent,
  include: cv.ui.structure.tile.MPopup,

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
    _closeButton: null,

    _init() {
      super._init();
      const popup = this._element;
      const closeable = !popup.hasAttribute('closeable') || popup.getAttribute('closeable') === 'true';
      if (closeable) {
        this._closeButton = document.createElement('button');
        this._closeButton.classList.add('close');
        const icon = document.createElement('i');
        icon.classList.add('ri-close-line');
        this._closeButton.appendChild(icon);
        popup.insertBefore(this._closeButton, popup.firstChild);
        this._closeButton.addEventListener('click', ev => {
          ev.stopPropagation();
          this.close();
        });
      }
      popup.addEventListener('close', ev => {
        this.close();
      });
      if (popup.hasAttribute('title')) {
        const header = document.createElement('header');
        popup.insertBefore(header, popup.firstChild);
        const title = document.createElement('h2');
        title.textContent = popup.getAttribute('title');
        header.appendChild(title);
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
        popup.dispatchEvent(new CustomEvent('closed'));
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
      if (!super.onStateUpdate(ev)) {
        switch (ev.detail.target) {
          case 'open':
            if (ev.detail.addressValue) {
              // only open when the sent value equals the fixed value
              // noinspection EqualityComparisonWithCoercionJS
              if (ev.detail.addressValue == ev.detail.state) {
                this.open();
              }
            } else if (ev.detail.state) {
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
  destruct() {
    this._disposeObjects('_autoCloseTimer');
    if (this._closeButton) {
      this._closeButton.remove();
      this._closeButton = null;
    }
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'popup',
      class extends QxConnector {
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
