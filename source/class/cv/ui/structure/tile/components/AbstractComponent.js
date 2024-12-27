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
    CONSTRUCTOR
  ***********************************************
  */
  construct(element) {
    super(element);
    this._preMappingHooks = [];
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    value: {
      apply: '_applyValue',
      init: null,
      nullable: true,
      event: 'changeValue'
    },

    styleClass: {
      check: 'String',
      nullable: true,
      apply: '_applyStyleClass',
      event: 'changeStyleClass'
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
      init: false
    },

    /**
     * True if this tile is the content of a popup
     */
    inPopup: {
      check: 'Boolean',
      init: false
    }
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    dateFormats: {}
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _writeAddresses: null,
    _headerFooterParent: null,
    _preMappingHooks: null,
    _tileElement: null,
    __mobileReplacements: null,

    _checkEnvironment() {
      let inPopup = false;
      if (this._element.parentElement.localName === 'cv-popup') {
        this._headerFooterParent = this._element.parentElement;
        inPopup = true;
      } else {
        let tile = this._getTileParent();
        if (tile) {
          let parent = tile.parentElement;
          this._headerFooterParent = parent;
          if (parent.localName === 'cv-popup') {
            inPopup = true;
          }
        }
      }
      this.setInPopup(inPopup);
    },

    _getTileParent() {
      if (!this._tileElement) {
        let tile = this._element;
        let i = 0;
        while (tile && tile.localName !== 'cv-tile') {
          tile = tile.parentElement;
          i++;
          if (i > 2) {
            tile = null;
            break;
          }
        }
        if (tile && tile.localName === 'cv-tile') {
          this._tileElement = tile;
        }
      }
      return this._tileElement;
    },

    _init() {
      this._checkEnvironment();

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
      if (!hasReadAddress) {
        // address groups are read-only
        hasReadAddress = element.querySelectorAll(':scope > cv-address-group').length > 0;
      }

      this._writeAddresses = writeAddresses;

      if (hasReadAddress) {
        element.addEventListener('stateUpdate', ev => {
          this.onStateUpdate(ev);
          // cancel event here
          ev.stopPropagation();
        });
      }

      // has mobile attributes
      this.__mobileReplacements = [];

      const check = element => {
        for (const name of element.getAttributeNames()) {
          if (name.startsWith('mobile-')) {
            const targetName = name.substring(7);
            this.__mobileReplacements.push({
              name: targetName,
              mobile: element.getAttribute(name),
              desktop: element.getAttribute(targetName),
              target: element
            });
          }
        }
      };
      check(element);
      if (this._headerFooterParent && this._headerFooterParent.localName === 'cv-widget') {
        check(this._headerFooterParent);
      }

      if (this.__mobileReplacements.length > 0) {
        qx.core.Init.getApplication().addListener('changeMobile', this.__updateAttributes, this);
      }

      if (document.body.classList.contains('mobile')) {
        this.__updateAttributes();
      }
    },

    __updateAttributes() {
      const isMobile = document.body.classList.contains('mobile');
      for (const entry of this.__mobileReplacements) {
        entry.target.setAttribute(entry.name, isMobile ? entry.mobile : entry.desktop);
      }
    },

    getElement() {
      return this._element;
    },

    /**
     * Append the given element to a header inside the widget this component is a direct child of.
     * If the header does not exist yet, it will be created.
     * Does nothing when this component is no direct child of a widget.
     * @param element {HTMLElement}
     * @param align {String} center (default), left or right
     */
    appendToHeader(element, align = undefined) {
      if (this._headerFooterParent) {
        let header = this._headerFooterParent.querySelector(':scope > header');
        if (!header) {
          header = document.createElement('header');
          this._headerFooterParent.insertBefore(header, this._headerFooterParent.firstElementChild);
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
     * @return {Element|null}
     */
    getHeader(selector) {
      if (this._headerFooterParent) {
        if (!selector) {
          return this._headerFooterParent.querySelector(':scope > header');
        } 
          const header = this._headerFooterParent.querySelector(':scope > header');
          if (header) {
            return header.querySelector(selector);
          }
      }
      return null;
    },

    /**
     * Append the given element to a footer inside the widget this component is a direct child of.
     * If the footer does not exist yet, it will be created.
     * Does nothing when this component is no direct child of a widget.
     * @param element {HTMLElement}
     */
    appendToFooter(element) {
      if (this._headerFooterParent) {
        let footer = this._headerFooterParent.querySelector(':scope > footer');
        if (!footer) {
          footer = document.createElement('footer');
          this._headerFooterParent.appendChild(footer);
        }
        footer.appendChild(element);
      }
    },

    /**
     * Gets the footer or an element inside it, if the selector is not empty
     * @param selector {String} css selector
     * @return {Element|null}
     */
    getFooter(selector) {
      if (this._headerFooterParent) {
        if (!selector) {
          return this._headerFooterParent.querySelector(':scope > footer');
        } 
          const footer = this._headerFooterParent.querySelector(':scope > footer');
          if (footer) {
            return footer.querySelector(selector);
          }
      }
      return null;
    },

    /**
     * Register hook function {Function(value: number) : number} that is called before the mapping gets applied.
     * It must return a number that is used as a new value for mapping.
     * @param callback {{(value: number) : number}}
     * @param context {object}
     */
    registerPreMappingHook(callback, context) {
      const exists = this._preMappingHooks.some(e => e[0] === callback);
      if (!exists) {
        this._preMappingHooks.push([callback, context || this]);
      }
    },

    /**
     * Unregister pre-mapping hook
     * @param callback {{(value: number) : number}}
     */
    unregisterPreMappingHook(callback) {
      this._preMappingHooks = this._preMappingHooks.filter(e => e[0] !== callback);
    },

    // property apply
    _applyValue(value) {
      if (this.isConnected()) {
        this._element.setAttribute('value', value || '');
        let mappedValue = value;
        for (const hookEntry of this._preMappingHooks) {
          mappedValue = hookEntry[0].call(hookEntry[1], mappedValue);
        }
        if (mappedValue !== null) {
          if (this._element.hasAttribute('mapping') && this._element.getAttribute('mapping')) {
            mappedValue = cv.Application.structureController.mapValue(this._element.getAttribute('mapping'), mappedValue);
          }
          if (this._element.hasAttribute('format') && this._element.getAttribute('format')) {
            const format = this._element.getAttribute('format');
            if (mappedValue instanceof Date && !format.includes('%')) {
              if (!cv.ui.structure.tile.components.AbstractComponent.dateFormats[format]) {
                cv.ui.structure.tile.components.AbstractComponent[format] = new qx.util.format.DateFormat(format);
              }
              mappedValue = cv.ui.structure.tile.components.AbstractComponent[format].format(mappedValue);
            } else {
              mappedValue = cv.util.String.sprintf(
                format,
                mappedValue instanceof Date ? mappedValue.toLocaleString() : mappedValue);
            }
          }
        }
        this._updateValue(mappedValue, value);
        if (this._element.hasAttribute('styling') && this._element.getAttribute('styling')) {
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
      if (oldValue && classes.contains(oldValue)) {
        classes.remove(oldValue);
      }
      if (value) {
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
          target.style.display = null;
          break;

        case 'hidden':
          target.style.opacity = '0';
          break;

        case 'excluded':
          target.style.display = 'none';
          break;
      }
    },

    /**
     * Handles the incoming data from the backend for this widget
     *
     * @param ev {CustomEvent} stateUpdate event fired from a cv-address component
     * @return {Boolean} true of the update has been handled
     */
    onStateUpdate(ev) {
      // noinspection EqualityComparisonWithCoercionJS
      const active = ev.detail.addressValue === null ? !!ev.detail.state : ev.detail.addressValue == ev.detail.state;
      switch (ev.detail.target) {
        case 'enabled':
          this.setEnabled(active);
          ev.stopPropagation();
          return true;

        case 'show-exclude':
          this.setVisibility(active ? 'visible' : 'excluded');
          ev.stopPropagation();
          return true;

        case 'show-hide':
          this.setVisibility(active ? 'visible' : 'hidden');
          ev.stopPropagation();
          return true;

        case 'styling': {
          let styling = '';
          if (ev.detail.targetConfig) {
            // use address styling if available
            styling = ev.detail.targetConfig[0];
          } else if (this._element.hasAttribute('styling') && this._element.getAttribute('styling')) {
            // fallback to element styling
            styling = this._element.getAttribute('styling');
          }
          const styleClass = cv.Application.structureController.styleValue(styling, ev.detail.state);
          this.setStyleClass(styleClass);
          ev.stopPropagation();
          return true;
        }

        case '':
          this.setValue(ev.detail.state);
          ev.stopPropagation();
          return true;
      }

      return false;
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this._writeAddresses = null;
    this._headerFooterParent = null;
    qx.core.Init.getApplication().removeListener('changeMobile', this.__updateAttributes, this);
  }
});
