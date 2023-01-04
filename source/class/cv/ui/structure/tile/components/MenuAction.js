/* ListItem.js
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
 * Represents an action that should be executed when the related menu item has been clicked.
 */
qx.Class.define('cv.ui.structure.tile.components.MenuAction', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _currentState: null,

    _init() {
      super._init();
      const action = this._element.getAttribute('action');
      switch (action) {
        case 'toggleState': {
          let hasAddress = false;
          for (let address of this._element.querySelectorAll(':scope > cv-address')) {
            hasAddress = true;
            if (address.getAttribute('mode') !== 'write') {
              this._element.addEventListener('stateUpdate', ev => {
                this.onStateUpdate(ev);
                // cancel event here
                ev.stopPropagation();
              });
            }
          }
          if (!hasAddress) {
            this.error('a cv-menu-item with action "toggleState" needs at least one cv-address to read the write the state,');
          }
          break;
        }
        case 'popup':
          if (this._element.querySelector(':scope > cv-popup')) {
            this.error('a cv-menu-item with action "popup" must have a cv-popup as child,');
          }
          break;
      }
    },

    onClick(event) {
      switch (this._element.getAttribute('action')) {
        case 'popup': {
          const popup = this._element.querySelector(':scope > cv-popup');
          if (popup) {
            popup.getInstance().open();
          }
          event.stopPropagation();
          break;
        }
        case 'toggleState': {
          const ev = new CustomEvent('sendState', {
            detail: {
              value: !this._currentState,
              source: this
            }
          });
          for (let address of this._element.querySelectorAll(':scope > cv-address')) {
            if (address.getAttribute('mode') !== 'read') {
              address.dispatchEvent(ev);
            }
          }
          event.stopPropagation();
          break;
        }
      }
    },

    /**
     * Handles the incoming data from the backend for this widget
     *
     * @param ev {CustomEvent} stateUpdate event fired from an cv-address component
     */
    onStateUpdate(ev) {
      // using == comparisons to make sure that e.g. 1 equals "1"
      // noinspection EqualityComparisonWithCoercionJS
      let value = ev.detail.state == '1';
      if (ev.detail.source instanceof cv.ui.structure.tile.elements.Address) {
        const addressElement = ev.detail.source.getElement();
        if (addressElement.hasAttribute('value')) {
          // noinspection EqualityComparisonWithCoercionJS
          value = ev.detail.state == addressElement.getAttribute('value');
        }
      }
      this._currentState = value;
    }
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'menu-item',
      class extends QxConnector {
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
