/*
 * Copyright (c) 2023, Christian Mayer and the CometVisu contributors.
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
 *
 */
qx.Class.define('cv.ui.structure.tile.widgets.TemplateWidget', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    widget: {
      refine: true,
      init: true
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __mobileReplacements: null,

    _checkEnvironment() {
      this._headerFooterParent = this._element;
    },

    _getTileParent() {
      if (!this._tileElement) {
        this._tileElement = this._element.querySelector(':scope > cv-tile');
      }
      return this._tileElement;
    },

    _init() {
      super._init();
      const element = this._element;

      // has mobile attributes
      this.__mobileReplacements = [];

      for (const name of element.getAttributeNames()) {
        if (name.startsWith('mobile-')) {
          const targetName = name.substring(7);
          this.__mobileReplacements.push({
            name: targetName,
            mobile: element.getAttribute(name),
            desktop: element.getAttribute(targetName)
          });
        }
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
        this._element.setAttribute(entry.name, isMobile ? entry.mobile : entry.desktop);
      }
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    qx.core.Init.getApplication().removeListener('changeMobile', this.__updateAttributes, this);
  }
});
