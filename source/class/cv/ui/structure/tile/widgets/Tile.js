/* Tile.js 
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
    },

    /**
     * Turn this tile into a popup
     */
    popup: {
      check: 'Boolean',
      init: false,
      apply: '_applyPopup'
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
      this._initPopupChild();
      if (this._element.hasAttribute('background-image')) {
        this.setBackgroundImage(this._element.getAttribute('background-image'));
      }
      if (this._childPopup) {
        this._childPopup.addEventListener('closed', () => {
          this.resetPopup();
        });
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

    open() {
      if (this._childPopup) {
        this._openPopupChild();
      } else {
        let closeButton = this._element.querySelector(':scope > button.close');
        if (!closeButton) {
          closeButton = document.createElement('button');
          closeButton.classList.add('close');
          const icon = document.createElement('i');
          icon.classList.add('ri-close-line');
          closeButton.appendChild(icon);
          this._element.appendChild(closeButton);
          closeButton.addEventListener('click', () => this.setPopup(false));
        }
        closeButton.style.display = 'block';
        this._element.classList.add('popup');
        this.registerModalPopup();
      }
    },

    close(keepState) {
      if (!keepState) {
        this.setPopup(false);
      }
      if (this._childPopup) {
        this._closePopupChild();
      } else {
        this._element.classList.remove('popup');
        let closeButton = this._element.querySelector(':scope > button.close');
        if (closeButton) {
          closeButton.style.display = 'none';
        }
        this.unregisterModalPopup();
      }
      if (this._autoCloseTimer) {
        this._autoCloseTimer.stop();
      }
    },

    _applyPopup(value) {
      if (value) {
        this.open();
      } else {
        this.close(true);
      }
    },

    /**
     * Handles the incoming data from the backend for this widget
     *
     * @param ev {CustomEvent} stateUpdate event fired from a cv-address component
     */
    onStateUpdate(ev) {
      if (!this.base(arguments, ev)) {
        switch (ev.detail.target) {
          case 'background-image':
            this.setBackgroundImage(ev.detail.state);
            break;

          case 'popup':
            if (ev.detail.addressValue) {
              // only open when the sent value equals the fixed value
              // noinspection EqualityComparisonWithCoercionJS
              if (ev.detail.addressValue == ev.detail.state) {
                this.setPopup(true);
                // this is not closing by address, so we set a close timeout to 3 minutes
                if (!this._autoCloseTimer) {
                  this._autoCloseTimer = new qx.event.Timer(180 * 1000);
                  this._autoCloseTimer.addListener('interval', this.close, this);
                }
                this._autoCloseTimer.restart();
              }
            } else {
              // open / close depending on value
              // noinspection EqualityComparisonWithCoercionJS
              this.setPopup(ev.detail.state == 1);
            }
            break;

          default:
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
