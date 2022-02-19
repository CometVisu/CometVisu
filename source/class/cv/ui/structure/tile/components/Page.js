/* Page.js 
 * 
 * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
 * Creates a new sub page and adds a corresponding link to the current page.
 *
 * @author Tobias Bräutigam
 * @since 2021
 */
qx.Class.define('cv.ui.structure.tile.components.Page', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    _init() {}
  },

  defer: function(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'page', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'row', class extends HTMLElement {
      constructor() {
        super();
        if (this.hasAttribute('colspan')) {
          this.classList.add('colspan-' + this.getAttribute('colspan'));
        }
        if (this.hasAttribute('rowspan')) {
          this.classList.add('rowspan-' + this.getAttribute('rowspan'));
        }
      }
    });
  }
});
