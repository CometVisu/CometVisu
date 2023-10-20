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

qx.Mixin.define('cv.ui.structure.tile.components.svg.MGraphicsElement', {
  include: cv.ui.structure.tile.MStringTransforms,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    row: {
      check: 'Number',
      init: 0,
      apply: '_applyPosition',
      transform: '_parseFloat'
    },

    column: {
      check: 'Number',
      init: 0,
      apply: '_applyPosition',
      transform: '_parseFloat'
    },

    x: {
      check: 'String',
      nullable: true,
      apply: '_applyToSvg'
    },

    y: {
      check: 'String',
      nullable: true,
      apply: '_applyToSvg'
    },

    rowspan: {
      check: 'Number',
      init: 1,
      apply: '_updateHeight',
      transform: '_parseFloat'
    },

    colspan: {
      check: 'Number',
      init: 1,
      apply: '_updateWidth',
      transform: '_parseFloat'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _parentGridLayout: null,

    _findParentGridLayout() {
      let parentInstance = null;
      let p = this._element.parentElement;
      while (p && !parentInstance) {
        if (p.nodeName.toLowerCase().startsWith('cv-') && p._instance && qx.Class.hasOwnMixin(p._instance.constructor, cv.ui.structure.tile.components.svg.MSvgGrid)) {
          parentInstance = p._instance;
        } else if (p.nodeName.toLowerCase() === 'cv-page') {
          // do not look outside the page
          break;
        } else {
          p = p.parentElement;
        }
      }
      this._parentGridLayout = parentInstance;
    },

    _applyToSvg(val, oldVal, name) {
      if (this._svg) {
        this._svg.setAttribute(name, val);
      }
    },

    _updateWidth() {
      if (this._parentGridLayout && this._svg) {
        const width = this._parentGridLayout.getCellWidth() * this.getColspan();
        this._svg.setAttribute('width', `${width}`);
      }
    },

    _updateHeight() {
      if (this._parentGridLayout && this._svg) {
        const height = this._parentGridLayout.getCellHeight() * this.getRowspan();
        this._svg.setAttribute('height', `${height}`);
      }
    },

    _applyPosition() {
      if (this._parentGridLayout && this._svg) {
        this._parentGridLayout.layout(this._svg, this.getRow(), this.getColumn());
      }
    }
  }
});
