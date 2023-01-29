/* AbstractComponent.js
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
 * Base class for all components.
 */
qx.Class.define('cv.ui.structure.tile.components.AbstractComponent', {
  extend: cv.ui.structure.tile.elements.AbstractCustomElement,
  type: 'abstract',

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    value: {
      apply: '_applyValue',
      init: null
    },

    styleClass: {
      check: 'String',
      nullable: true,
      apply: '_applyStyleClass'
    },

    enabled: {
      check: 'Boolean',
      init: true,
      apply: '_applyEnabled'
    },

    visibility: {
      check: ['visible', 'excluded', 'hidden'],
      init: 'visible',
      apply: '_applyVisibility',
      event: 'changeVisibility'
    },

    /**
     * True if this tile is the content of a template based widget
     */
    widget: {
      check: 'Boolean',
      init: 'false'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _writeAddresses: null,
    _visibleDisplayMode: null,

    __checkIfWidget() {
      const parent = this._element.parentElement ? this._element.parentElement.parentElement : null;
      let isWidget = false;
      if (parent) {
        const name = parent ? parent.tagName.toLowerCase() : '';
        if (name.startsWith('cv-')) {
          isWidget = name === 'cv-widget' || !!document.getElementById(name.substring(3));
        }
      }
      this.setWidget(isWidget);
    },

    _init() {
      this.__checkIfWidget();

      const element = this._element;
      let hasReadAddress = false;
      const writeAddresses = [];
      Array.prototype.forEach.call(element.querySelectorAll(':scope > cv-address'), address => {
        const mode = address.hasAttribute('mode') ? address.getAttribute('mode') : 'readwrite';
        switch (mode) {
          case 'readwrite':
            hasReadAddress = true;
            writeAddresses.push(address);
            break;
          case 'read':
            hasReadAddress = true;
            break;
          case 'write':
            writeAddresses.push(address);
            break;
        }
      });

      this._writeAddresses = writeAddresses;

      if (hasReadAddress) {
        element.addEventListener('stateUpdate', ev => {
          this.onStateUpdate(ev);
          // cancel event here
          ev.stopPropagation();
        });
      }
    },

    /**
     * Append the given element to a header inside the widget this component is a direct child of.
     * If the header does not exist yet, it will be created.
     * Does nothing when this component is no direct child of a widget.
     * @param element {HTMLElement}
     * @param align {String} center (default), left or right
     */
    appendToHeader(element, align) {
      if (this.isWidget()) {
        let header = this._element.parentElement.parentElement.querySelector(':scope > header');
        if (!header) {
          header = document.createElement('header');
          this._element.parentElement.parentElement.insertBefore(header, this._element.parentElement.parentElement.firstElementChild);
        }
        let targetParent = header;
        if (align) {
          targetParent = header.querySelector('.' + align);
          if (!targetParent) {
            targetParent = document.createElement('div');
            targetParent.classList.add(align);
          }
          header.appendChild(targetParent);
        }
        targetParent.appendChild(element);
      }
    },

    /**
     * Gets the header or an element inside it, if the selector is not empty
     * @param selector {String} css selector
     * @return {Element|undefined}
     */
    getHeader(selector) {
      if (!selector) {
        return this._element.parentElement.parentElement.querySelector(':scope > header');
      } else {
        const header = this._element.parentElement.parentElement.querySelector(':scope > header');
        if (header) {
          return header.querySelector(selector);
        }
      }
    },

    /**
     * Append the given element to a footer inside the widget this component is a direct child of.
     * If the footer does not exist yet, it will be created.
     * Does nothing when this component is no direct child of a widget.
     * @param element {HTMLElement}
     */
    appendToFooter(element) {
      if (this.isWidget()) {
        let footer = this._element.parentElement.parentElement.querySelector(':scope > footer');
        if (!footer) {
          footer = document.createElement('footer');
          this._element.parentElement.parentElement.appendChild(footer);
        }
        footer.appendChild(element);
      }
    },

    /**
     * Gets the footer or an element inside it, if the selector is not empty
     * @param selector {String} css selector
     * @return {Element|undefined}
     */
    getFooter(selector) {
      if (!selector) {
        return this._element.parentElement.parentElement.querySelector(':scope > footer');
      } else {
        const footer = this._element.parentElement.parentElement.querySelector(':scope > footer');
        if (footer) {
          return footer.querySelector(selector);
        }
      }
    },

    // property apply
    _applyValue(value) {
      if (this.isConnected()) {
        this._element.setAttribute('value', value || '');
        let mappedValue = value;
        if (this._element.hasAttribute('mapping')) {
          mappedValue = cv.Application.structureController.mapValue(this._element.getAttribute('mapping'), value);
        }
        if (this._element.hasAttribute('format')) {
          mappedValue = cv.util.String.sprintf(
            this._element.getAttribute('format'),
            mappedValue instanceof Date ? mappedValue.toLocaleString() : mappedValue
          );
        }
        this._updateValue(mappedValue, value);
        if (this._element.hasAttribute('styling')) {
          let styleClass = cv.Application.structureController.styleValue(this._element.getAttribute('styling'), value);

          this.setStyleClass(styleClass);
        }
      }
    },

    // needs to be implemented by inheriting classes
    _updateValue(mappedValue, value) {},

    // property apply
    _applyStyleClass(value, oldValue) {
      const classes = this._element.classList;
      if (oldValue) {
        if (classes.contains(oldValue)) {
          classes.replace(oldValue, value);
        } else {
          classes.add(value);
          classes.remove(oldValue);
        }
      } else if (value) {
        classes.add(value);
      }
    },

    _applyEnabled(value) {
      let blocker = this._element.querySelector(':scope > .blocker');
      if (!blocker) {
        blocker = document.createElement('div');
        blocker.classList.add('blocker');
        this._element.appendChild(blocker);
        blocker.addEventListener('click', ev => {
          ev.preventDefault();
          ev.stopPropagation();
        });
        blocker.addEventListener('pointerdown', ev => {
          ev.preventDefault();
          ev.stopPropagation();
        });
        blocker.addEventListener('pointerup', ev => {
          ev.preventDefault();
          ev.stopPropagation();
        });
      }
      this._element.setAttribute('disabled', value === false ? 'true' : 'false');

      blocker.style.display = value === true ? 'none' : 'block';
    },

    _applyVisibility(value, oldValue) {
      const target = this.isWidget() ? this._element.parentElement : this._element;
      if (oldValue === 'hidden') {
        target.style.opacity = '1.0';
      }
      switch (value) {
        case 'visible':
          if (this._visibleDisplayMode) {
            target.style.display = this._visibleDisplayMode || 'initial';
          }
          break;

        case 'hidden':
          target.style.opacity = '0';
          break;

        case 'excluded':
          this._visibleDisplayMode = getComputedStyle(target).getPropertyValue('display');
          target.style.display = 'none';
          break;
      }
    },

    /**
     * Handles the incoming data from the backend for this widget
     *
     * @param ev {CustomEvent} stateUpdate event fired from an cv-address component
     * @return {Boolean} true of the update has been handled
     */
    onStateUpdate(ev) {
      switch (ev.detail.target) {
        case 'enabled':
          this.setEnabled(ev.detail.state);
          ev.stopPropagation();
          return true;
        case 'show-exclude':
          this.setVisibility(ev.detail.state ? 'visible' : 'excluded');
          ev.stopPropagation();
          return true;
        case 'show-hide':
          this.setVisibility(ev.detail.state ? 'visible' : 'hidden');
          ev.stopPropagation();
          return true;
        case '':
          this.setValue(ev.detail.state);
          ev.stopPropagation();
          return true;
      }

      return false;
    }
  }
});
