/* Page.js
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
 * Creates a new sub-page and adds a corresponding link to the current page.
 *
 * @ignore(InstallTrigger)
 * @author Tobias Bräutigam
 * @since 2021
 */
qx.Class.define('cv.ui.structure.tile.widgets.Page', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    visibility: {
      refine: true,
      init: 'excluded'
    }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    _supportsContentVisibility: null,
    _visibleDisplayMode: null,

    _init() {
      const browserEngine = qx.core.Environment.get('browser.name');
      const version = parseInt(qx.core.Environment.get('browser.version').split('.')[0]);
      if ((browserEngine.includes('firefox') && version < 125) ||
        (browserEngine.includes('safari') && version < 18)) {
        // firefox/safari do not support content-visibility CSS property in these versions
        // see: https://caniuse.com/css-content-visibility
        this._element.classList.add('no-content-visibility');
        this._supportsContentVisibility = false;
      } else {
        this._supportsContentVisibility = true;
      }
    },

    _applyVisibility(value) {
      switch (value) {
        case 'visible':
          if (this._supportsContentVisibility) {
            this._element.style.contentVisibility = 'visible';
          } else if (this._visibleDisplayMode) {
            this._element.style.display = this._visibleDisplayMode || 'initial';
          }
          break;

        case 'hidden':
        case 'excluded':
          if (this._supportsContentVisibility) {
            this._element.style.contentVisibility = 'hidden';
          } else {
            this._visibleDisplayMode = getComputedStyle(this._element).getPropertyValue('display');
            this._element.style.display = 'none';
          }
          break;
      }
    }
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'page',
      class extends QxConnector {
        constructor() {
          super(QxClass);
        }
      }
    );

    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'row',
      class extends HTMLElement {
        constructor() {
          super();
          if (this.hasAttribute('colspan')) {
            this.classList.add('colspan-' + this.getAttribute('colspan'));
          }
          if (this.hasAttribute('rowspan')) {
            this.classList.add('rowspan-' + this.getAttribute('rowspan'));
          }
        }
      }
    );
  }
});
