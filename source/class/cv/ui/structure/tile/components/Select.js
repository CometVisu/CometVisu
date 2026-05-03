/* Select.js
 *
 * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
 * Allows the selection of one element out of a list of <cv-option> elements
 */
qx.Class.define('cv.ui.structure.tile.components.Select', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    show: {
      check: ['icon', 'label', 'both'],
      init: 'both',
      apply: '_applyShow'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __options: null,
    __value: null,
    __popup: null,
    __bodyClickListener: null,
    __bodyClickFrame: null,

    _init() {
      super._init();
      const element = this._element;
      this.__options = new Map();
      if (!this.__bodyClickListener) {
        this.__bodyClickListener = ev => this.handleEvent(ev);
      }

      let popup = element.querySelector(':scope > .popup');
      if (!popup) {
        popup = (this.__popup = document.createElement('div'));
        popup.classList.add('popup');
        element.querySelectorAll(':scope > cv-option').forEach((option, i) => {
          popup.appendChild(option);
          if (!option.hasAttribute('key')) {
            option.setAttribute('key', '' + i);
          }
          this.__options.set(option.getAttribute('key'), option);
        });
      } else {
        // restore from existing popup
        this.__popup = popup;
        element.querySelectorAll(':scope > cv-option').forEach((option, i) => {
          this.__options.set(option.getAttribute('key'), option);
        });
      }
      let value = element.querySelector(':scope > .value');
      if (!value) {
        value = document.createElement('span');
        value.classList.add('value');
        element.appendChild(value);
      }
      element.appendChild(popup);
      this.__value = value;
      let handle = element.querySelector(':scope > .dropdown');
      if (!handle) {
        handle = document.createElement('cv-icon');
        handle.classList.add('dropdown');
        handle.classList.add('ri-arrow-down-s-line');
        element.appendChild(handle);
      }

      if (this._writeAddresses.length > 0) {
        element.addEventListener('click', ev => this.onClicked(ev));
      }
    },

    _toggleOptions(close) {
      // open popup
      if (!this.__popup.classList.contains('open') && !close) {
        this.__popup.classList.add('open');
        if (this.__bodyClickFrame !== null) {
          window.cancelAnimationFrame(this.__bodyClickFrame);
        }
        this.__bodyClickFrame = window.requestAnimationFrame(() => {
          this.__bodyClickFrame = null;
          if (!this.isConnected()) {
            return;
          }
          // delay adding this listener, otherwise it would fire immediately
          document.body.addEventListener('click', this.__bodyClickListener, true);
        });
      } else {
        this.__popup.classList.remove('open');
        if (this.__bodyClickFrame !== null) {
          window.cancelAnimationFrame(this.__bodyClickFrame);
          this.__bodyClickFrame = null;
        }
        document.body.removeEventListener('click', this.__bodyClickListener, true);
      }
    },

    handleEvent(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      this._toggleOptions(true);
    },

    onClicked(ev) {
      let target = ev.target;
      // find out event target (either the cv-select of cv-option
      while (target !== ev.currentTarget && target.tagName.toLowerCase() !== 'cv-option') {
        target = target.parentElement;
      }
      if (target.tagName.toLowerCase() === 'cv-option') {
        // select this option
        this._sendSelection(target.getAttribute('key'), true);
      }
      this._toggleOptions();
    },

    _sendSelection(key, predictive) {
      const ev = new CustomEvent('sendState', {
        detail: {
          value: key,
          source: this
        }
      });

      this._writeAddresses
        .filter(addr => !addr.hasAttribute('on') || addr.getAttribute('on') === 'click')
        .forEach(address => address.dispatchEvent(ev));
      if (predictive === true) {
        this.setValue(key);
      }
    },

    _updateValue(mappedValue, value) {
      const key = typeof mappedValue !== 'undefined' ? '' + mappedValue : '';
      if (this.__options.has(key)) {
        this.__value.innerHTML = '';
        const current = this.__options.get(key);
        switch (this.getShow()) {
          case 'icon':
            // if we have non text children, we only use them (only icons no text)
            for (const child of current.children) {
              if (child.nodeName.toLowerCase() === 'cv-icon') {
                this.__value.appendChild(child.cloneNode());
              }
            }
            break;

          case 'label':
            for (const child of current.childNodes) {
              if (child.nodeType === Node.TEXT_NODE || (child.nodeType === Node.ELEMENT_NODE && child.nodeName.toLowerCase() === 'label')) {
                this.__value.appendChild(child.cloneNode());
              }
            }
            break;

          case 'both':
            this.__value.innerHTML = current.innerHTML;
            break;
        }
      }
    },

    _disconnected() {
      if (this.__bodyClickFrame !== null) {
        window.cancelAnimationFrame(this.__bodyClickFrame);
        this.__bodyClickFrame = null;
      }
      super._disconnected();
      if (this.__bodyClickListener) {
        document.body.removeEventListener('click', this.__bodyClickListener, true);
      }
      if (this.__popup) {
        this.__popup.style.display = 'none';
      }
    },

    _applyShow(show) {
      if (this.getValue()) {
        this._updateValue(this.getValue());
      }
    }
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'select',
      class extends QxConnector {
        static observedAttributes = ['show'];
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
