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
 * Energy management widget.
 *
 * @author Tobias Bräutigam
 * @since 2023
 */
qx.Class.define('cv.ui.structure.tile.widgets.Energy', {
  extend: cv.ui.structure.tile.widgets.Tile,
  include: [cv.ui.structure.tile.components.svg.MSvgGrid, cv.ui.structure.tile.MResize],

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    pan: {
      check: 'Boolean',
      init: false,
      transform: '_stringToBool',
      apply: '_applyPan'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    SVG: null,
    _dragPoint: null,
    _startPoint: null,

    _init() {
      super._init();
      const svg = this.SVG = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg');
      this._element.appendChild(svg);

      this.setResizeTarget(this._element);
      this.addListener('resized', this._updateCellSize, this);
      for (const layoutEvent of ['changeRows', 'changeColumns', 'changeOuterPadding', 'changeSpacing']) {
        this.addListener(layoutEvent, this._updateCellSize, this);
      }

      this.addListener('changeViewBox', this._updateViewBox, this);
      this._updateViewBox();
      if (this.getPan()) {
        this._applyPan(true);
      }
    },

    _drag(ev) {
      ev.preventDefault();
      const CTM = this.SVG.getScreenCTM().inverse();
      this._dragPoint.x = ev.clientX;
      this._dragPoint.y = ev.clientY;
      this._dragPoint = this._dragPoint.matrixTransform(CTM);
      this.SVG.viewBox.baseVal.x -= this._dragPoint.x - this._startPoint.x;
      this.SVG.viewBox.baseVal.y -= this._dragPoint.y - this._startPoint.y;
      const bbox = this.SVG.getBBox();
      if (this.SVG.viewBox.baseVal.x < 0) {
        this.SVG.viewBox.baseVal.x = 0;
      } else if ((bbox.width - (this.SVG.viewBox.baseVal.x + this.SVG.viewBox.baseVal.width)) < -10) {
        this.SVG.viewBox.baseVal.x = bbox.width - this.SVG.viewBox.baseVal.width + 10;
      }
      if (this.SVG.viewBox.baseVal.y < 0) {
        this.SVG.viewBox.baseVal.y = 0;
      } else if ((bbox.height - (this.SVG.viewBox.baseVal.y + this.SVG.viewBox.baseVal.height)) < -10) {
        this.SVG.viewBox.baseVal.y = bbox.height - this.SVG.viewBox.baseVal.height + 10;
      }
    },

    _startDrag(ev) {
      if (typeof this.drag !== 'function') {
        this.drag = this._drag.bind(this);
      }
      this._element.addEventListener('mousemove', this.drag);

      const CTM = this.SVG.getScreenCTM().inverse();
      this._dragPoint.x = ev.clientX;
      this._dragPoint.y = ev.clientY;
      this._startPoint = this._dragPoint.matrixTransform(CTM);
    },

    _endDrag() {
      this._element.removeEventListener("mousemove", this.drag);
    },

    _applyPan(draggable) {
      if (this.SVG) {
        if (draggable) {
          this._dragPoint = this.SVG.createSVGPoint();

          if (typeof this.startDrag !== 'function') {
            this.startDrag = this._startDrag.bind(this);
          }
          if (typeof this.endDrag !== 'function') {
            this.endDrag = this._endDrag.bind(this);
          }

          this._element.addEventListener('pointerdown', this.startDrag);
          this._element.addEventListener('pointerup', this.endDrag);
          this._element.addEventListener('pointerleave', this.endDrag);
        } else {
          this._element.removeEventListener('pointerdown', this.startDrag);
          this._element.removeEventListener('pointerup', this.endDrag);
          this._element.removeEventListener('pointerleave', this.endDrag);
        }
      }
    },

    _updateViewBox() {
      const viewBox = this.getViewBox();
      if (viewBox) {
        const parts = viewBox.split(' ').map(v => parseInt(v));
        if (parts.length === 4) {
          const x = this.getOuterPadding() + this.getCellWidth() * parts[0] + (parts[0] > 1 ? (parts[0]-1) * this.getSpacing() : 0);
          const y = this.getOuterPadding() + this.getCellHeight() * parts[1] + (parts[1] > 1 ? (parts[1]-1) * this.getSpacing() : 0);
          const width = this.getOuterPadding() + this.getCellWidth() * parts[2] + (parts[2] > 1 ? (parts[2]-1) * this.getSpacing() : 0);
          const height = this.getOuterPadding() + this.getCellHeight() * parts[2] + (parts[2] > 1 ? (parts[2]-1) * this.getSpacing() : 0);
          this.SVG.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);
        }
      } else {
        this.SVG.removeAttribute('viewBox');
      }
    },

    _updateCellSize() {
      if (this._element.clientWidth === 0 || this._element.clientHeight === 0) {
        return;
      }
      const padding = this.getOuterPadding() * 2;
      const spacing = this.getSpacing() / 2;
      const cellWidth = Math.floor((this._element.clientWidth - padding) / this.getColumns() - spacing);
      const cellHeight = Math.floor((this._element.clientHeight - padding) / this.getRows() - spacing);
      this.debug('cellWidth', cellWidth, 'cellHeight', cellHeight);
      const changed = this.getCellWidth() !== cellWidth || this.getCellHeight() !== cellHeight;
      this.setCellWidth(cellWidth);
      this.setCellHeight(cellHeight);
      if (changed) {
        this._updateViewBox();
      }
    },

    _stringToBool(value) {
      if (typeof value === 'string') {
        return value === 'true';
      } else if (value === null || value === undefined) {
        return false;
      }
      return value;
    }
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'energy',
      class extends QxConnector {
        static observedAttributes = ['view-box', 'pan'];
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
