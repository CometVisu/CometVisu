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
qx.Class.define('cv.ui.structure.tile.Page', {
  extend: cv.ui.structure.tile.AbstractTileWidget,
  implement: cv.ui.structure.IPage,

  include: [
    cv.ui.common.HasChildren
  ],

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(props) {
    this.base(arguments, props);
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    allPages: document.createDocumentFragment(),

    /**
     * Append the complete generated HTML code to the DOM tree at the end of the generation process
     */
    createFinal: function() { // special function - only for pages!
      document.body.append(this.allPages);
      qx.event.message.Bus.unsubscribe('setup.dom.append', this.createFinal, this);
    }

  },


  /*
   ******************************************************
   PROPERTIES
   ******************************************************
   */
  properties: {
    initialized: {
      check: 'Boolean',
      init: false,
      event: 'changeInitialized'
    },
    anonymous : {
      refine: true,
      init: true
    },
    name: {
      check: 'String',
      init: '', nullable: true
    },
    size: {
      check: 'String',
      nullable: true
    },
    backdropAlign: {check: 'String', nullable: true },
    backdropType: {check: 'String', nullable: true },
    showNavbarTop : {
      check: 'Boolean',
      init: false,
      event: 'changeShowNavbarTop'
    },
    showNavbarBottom : {
      check: 'Boolean',
      init: false,
      event: 'changeShowNavbarBottom'
    },
    showNavbarLeft : {
      check: 'Boolean',
      init: false,
      event: 'changeShowNavbarLeft'
    },
    showNavbarRight : {
      check: 'Boolean',
      init: false,
      event: 'changeShowNavbarRight'
    }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    __normalizedDomId: null,
    __element: null,

    // overridden
    _createDomElement: function() {
      const page = document.createElement('div');
      page.classList.add('page', 'tile-list');
      page.setAttribute('id', this.getPath());
      const content = document.createElement('div');
      content.append(this.getChildrenDom());
      page.appendChild(content);
      cv.ui.structure.tile.Page.allPages.appendChild(page);
      return page;
    }
  },

  defer: function(statics) {
    qx.log.Logger.info(statics, `registering ${cv.ui.structure.tile.Controller.PREFIX}page component`);

    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'page', class extends HTMLElement {
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
