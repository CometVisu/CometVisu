/* AbstractCustomElement.js
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
 *
 */
qx.Class.define('cv.ui.structure.tile.elements.AbstractCustomElement', {
  extend: qx.core.Object,
  type: 'abstract',

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct(element) {
    super();
    this._element = element;
    this._deferInit = true; // activate deferred init handling by default; subclasses can set this to false if they do not support it
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    connected: {
      check: 'Boolean',
      init: false,
      apply: '_applyConnected',
      event: 'changeConnected'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    /**
     * @var {HTMLElement}
     */
    _element: null,

    /** 
     * @var {boolean} Whether this element supports deferring initialization until its page becomes active (true), does not support it (false)
     */
    _deferInit: null,

    _initialized: false,
    __deferredInitHandler: null,

    _applyConnected(value) {
      if (value && !this._initialized) {
        const page = this._deferInit && !cv.Config.testMode ? this._element.closest('cv-page') : null;
        if (page && !page.classList.contains('active') && !page.classList.contains('sub-active')) {
          // Defer init until this page (or a sub-page of it) becomes active
          this.__deferredInitHandler = msg => {
            const activePage = msg.getData();
            if (page === activePage || page.contains(activePage)) {
              if (this.__deferredInitHandler) {
                qx.event.message.Bus.unsubscribe('cv.ui.structure.tile.currentPage', this.__deferredInitHandler, this);
                this.__deferredInitHandler = null;
              }
              this._init();
              this._initialized = true;
              this._postInit();
            }
          };
          qx.event.message.Bus.subscribe('cv.ui.structure.tile.currentPage', this.__deferredInitHandler, this);
        } else {
          this._init();
          this._initialized = true;
          this._postInit();
        }
      } else if (!value && this._initialized) {
        this._disconnected();
        this._initialized = false;
      } else if (!value && !this._initialized && this.__deferredInitHandler) {
        // Disconnected before deferred init could run — clean up subscription
        qx.event.message.Bus.unsubscribe('cv.ui.structure.tile.currentPage', this.__deferredInitHandler, this);
        this.__deferredInitHandler = null;
      }
    },
    _init() {},
    _postInit() {},

    _disconnected() {},

    getElement() {
      return this._element;
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    if (this.__deferredInitHandler) {
      qx.event.message.Bus.unsubscribe('cv.ui.structure.tile.currentPage', this.__deferredInitHandler, this);
      this.__deferredInitHandler = null;
    }
    this._element = null;
  }
});
