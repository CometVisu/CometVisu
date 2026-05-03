/*
 * Copyright (c) 2023-2026, Christian Mayer and the CometVisu contributors.
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
 *
 */

/**
 *
 */
qx.Mixin.define('cv.ui.structure.tile.MFullscreen', {

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    fullscreen: {
      check: 'Boolean',
      init: false,
      apply: '__applyFullscreen',
      event: 'changeFullscreen'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __uuid: null,
    __popupAddress: null,
    __button: null,
    __tileAddress: null,
    __tileAddressStateUpdateHandler: null,
    __tileClosedHandler: null,
    __tileWidget: null,

    getUuid() {
      if (!this.__uuid) {
        this.__uuid = qx.util.Uuid.createUuidV4();
      }
      return this.__uuid;
    },

    getPopupAddress() {
      if (!this.__popupAddress) {
        this.__popupAddress = `state:${this.getUuid()}-popup`;
      }
      return this.__popupAddress;
    },

    __applyFullscreen(value) {
      if (typeof this._applyFullscreen === 'function') {
        // call the original apply function
        this._applyFullscreen(value);
      } else {
        const sendValue = value ? '1' : '0';
        this.__button.setAttribute('data-value', sendValue);
        cv.data.Model.getInstance().onUpdate(this.getPopupAddress(), sendValue, 'system');
      }
    },

    _initFullscreenSwitch() {
      this.__cleanupFullscreenBindings();

      // add fullscreen button + address
      const button = this.__button && this.__button.isConnected ? this.__button : this._buttonFactory('ri-fullscreen-line', ['fullscreen']);
      this.__button = button;
      button.setAttribute('data-value', '0');
      if (!button.isConnected) {
        button.addEventListener('click', () => this.toggleFullscreen());
        this.appendToHeader(button, 'right');
      }

      let parent = this._element;
      while (parent && parent.nodeName.toLowerCase() !== 'cv-tile') {
        parent = parent.parentElement;
      }
      if (parent) {
        this.__tileWidget = parent.getInstance();
        this.__tileClosedHandler = () => this.setFullscreen(false);
        this.__tileWidget.addListener('closed', this.__tileClosedHandler, this);
      }

      if (typeof this._applyFullscreen === 'undefined') {
        if (!this.__tileAddress) {
          this.__tileAddress = document.createElement('cv-address');
          this.__tileAddress.setAttribute('mode', 'read');
          this.__tileAddress.setAttribute('target', 'fullscreen-popup');
          this.__tileAddress.setAttribute('backend', 'system');
          this.__tileAddress.setAttribute('send-mode', 'always');
          this.__tileAddress.textContent = this.getPopupAddress();
        }
        if (this.__tileAddress.parentElement !== this._element.parentElement) {
          this._element.parentElement.appendChild(this.__tileAddress);
        }
        if (this.__tileWidget) {
          this.__tileAddressStateUpdateHandler = ev => {
            this.__tileWidget.onStateUpdate(ev);
            ev.stopPropagation();
          };
          this.__tileAddress.addEventListener('stateUpdate', this.__tileAddressStateUpdateHandler);
        }
      }
    },

    __cleanupFullscreenBindings() {
      if (this.__tileWidget && this.__tileClosedHandler) {
        this.__tileWidget.removeListener('closed', this.__tileClosedHandler, this);
      }
      if (this.__tileAddress && this.__tileAddressStateUpdateHandler) {
        this.__tileAddress.removeEventListener('stateUpdate', this.__tileAddressStateUpdateHandler);
      }
      this.__tileWidget = null;
      this.__tileClosedHandler = null;
      this.__tileAddressStateUpdateHandler = null;
    },

    _buttonFactory(icon, classes) {
      const button = document.createElement('button');
      button.classList.add(...classes);
      if (icon) {
        const i = document.createElement('i');
        i.classList.add(icon);
        button.appendChild(i);
      }
      return button;
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this.__cleanupFullscreenBindings();
    this.__button = null;
    this.__tileAddress = null;
  }
});
