/*
 * Copyright (c) 2023, Christian Mayer and the CometVisu contributors.
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
      const sendValue = value ? '1' : '0';
      this.__button.setAttribute('data-value', sendValue);
      cv.data.Model.getInstance().onUpdate(this.getPopupAddress(), sendValue, 'system');
    },

    _initFullscreenSwitch() {
      // add fullscreen button + address
      const button= this.__button = this._buttonFactory('ri-fullscreen-line', ['fullscreen']);
      button.setAttribute('data-value', '0');
      button.addEventListener('click', () => this.toggleFullscreen());
      this.appendToHeader(button, 'right');

      // address
      const tileAddress = document.createElement('cv-address');
      tileAddress.setAttribute('mode', 'read');
      tileAddress.setAttribute('target', 'fullscreen-popup');
      tileAddress.setAttribute('backend', 'system');
      tileAddress.setAttribute('send-mode', 'always');
      tileAddress.textContent = this.getPopupAddress();
      this._element.parentElement.appendChild(tileAddress);

      // listen to parent tile of popup is opened or not
      let parent = this._element;
      while (parent && parent.nodeName.toLowerCase() !== 'cv-tile') {
        parent = parent.parentElement;
      }
      if (parent) {
        const tileWidget = parent.getInstance();
        tileWidget.addListener('closed', () => this.setFullscreen(false));

        // because we added a read address to the tile after it has been initialized we need to init the listener here manually
        parent.addEventListener('stateUpdate', ev => {
          tileWidget.onStateUpdate(ev);
          // cancel event here
          ev.stopPropagation();
        });
      }
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
    this.__button = null;
  }
});
