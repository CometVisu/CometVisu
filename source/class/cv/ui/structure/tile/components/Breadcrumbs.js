/* Menu.js
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
 * Generates breadcrumb navigation bar down to the currently shown page.
 *
 * @author Tobias Bräutigam
 * @since 2022
 */
qx.Class.define('cv.ui.structure.tile.components.Breadcrumbs', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {

  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _init() {
      qx.event.message.Bus.subscribe('cv.ui.structure.tile.currentPage', this._update, this);
    },

    _update() {
      let list = this._element.querySelector(':scope > ul');
      if (!list) {
        list = document.createElement('ul');
        this._element.appendChild(list);
      }
      const listItems = [];
      const activePage = document.body.querySelector('cv-page.active');
      const startPage = document.body.querySelector('main > cv-page:first-of-type');

      if (activePage && activePage !== startPage) {
        let currentPage = activePage;
        while (currentPage) {
          let li = this._createListItem(currentPage.getAttribute('id'), currentPage.getAttribute('name'));
          listItems.unshift(li);
          let parent = currentPage.parentElement;
          while (parent) {
            if (parent.localName === 'cv-page') {
              currentPage = parent;
              break;
            }
            parent = parent.parentElement;
          }
          if (!parent) {
            break;
          }
        }
      }
      let start = list.querySelector(':scope > li.start');
      if (!start) {
        start = this._createListItem(startPage.getAttribute('id'), startPage.getAttribute('name'));
        start.classList.add('start');
      }
      listItems.unshift(start);

      list.replaceChildren(...listItems);
    },

    _createListItem(pageId, text) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.setAttribute('href', '#' + pageId);
      a.textContent = text;
      li.appendChild(a);
      return li;
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    qx.event.message.Bus.unsubscribe('cv.ui.structure.tile.currentPage', this._update, this);
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'breadcrumbs',
      class extends QxConnector {
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
