/*
 * Copyright (c) 2010-2024, Christian Mayer and the CometVisu contributors.
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
 * Shows HTML content in an iframe
 *
 * HINT: Proxy mode needs an PHP environment with php-curl installed.
 */
qx.Class.define('cv.ui.structure.tile.widgets.Web', {
  extend: cv.ui.structure.tile.components.AbstractComponent,
  include: [cv.ui.structure.tile.MVisibility, cv.ui.structure.tile.MRefresh],

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct(element) {
    super(element);
    this.addListener('changeVisible', this._loadContent, this);
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    /**
     * @type {URL}
     */
    _url: null,

    _init() {
      const element = this._element;
      let iframe = element.querySelector(':scope > iframe');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '100%');
        element.appendChild(iframe);
      }
      const src = element.getAttribute('src');
      if (src) {
        let base = window.location.origin;
        if (src.substring(0, 1) !== '/' && src.substring(0, 4) !== 'http') {
          // relative url
          base += window.location.pathname;
        }
        this._url = new URL(src, base);
        this._loadContent();
        if (element.hasAttribute('refresh')) {
          this.setRefresh(parseInt(element.getAttribute('refresh')));
        }
      }
      const useProxy = element.hasAttribute('proxy') && element.getAttribute('proxy') === 'true';
      if (useProxy) {
        this._url = new URL(cv.io.rest.Client.getBaseUrl() + '/proxy', window.location.origin);

        this._url.searchParams.set('url', element.getAttribute('src'));
      }
      this._headers = {};
      if (element.hasAttribute('auth-type')) {
        if (useProxy) {
          this._url.searchParams.set('auth-type', element.getAttribute('auth-type').toLowerCase());
        }
      }
    },

    _loadContent() {
      if (this.isVisible() && this._url) {
        let iframe = this._element.querySelector(':scope > iframe');
        iframe.src = this._url.toString();
      }
    },

    refresh() {
      let iframe = this._element.querySelector(':scope > iframe');
      if (iframe) {
        this._url.searchParams.set('r', '' + Math.random());
        this._loadContent();
      }
    }
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'web',
      class extends QxConnector {
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
