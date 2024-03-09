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
 * Flow management widget.
 *
 * @author Tobias Bräutigam
 * @since 2023
 *
 * @ignore(d3.select)
 * @ignore(screen)
 * @ignore(SVGElement)
 */
qx.Class.define('cv.ui.structure.tile.components.Flow', {
  extend: cv.ui.structure.tile.components.AbstractComponent,
  include: [
    cv.ui.structure.tile.components.svg.MSvgGrid,
    cv.ui.structure.tile.MResize,
    cv.ui.structure.tile.MStringTransforms,
    cv.ui.structure.tile.MFullscreen
  ],

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
    },

    pagination: {
      check: ['none', 'horizontal', 'vertical', 'both'],
      init: 'none',
      apply: '_applyPagination'
    },

    centerX: {
      check: 'Boolean',
      init: false,
      apply: '_applyCenterX',
      transform: '_parseBoolean'
    },

    centerY: {
      check: 'Boolean',
      init: false,
      apply: '_applyCenterY',
      transform: '_parseBoolean'
    },

    fullscreenViewBox: {
      check: 'String',
      nullable: true,
      event: 'changeFullscreenViewBox'
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
    _expiredTouchStart: null,
    _viewBoxBinding: null,
    _lastBBox: null,
    _additionalViewBoxUpdate: null,
    _ready: null,

    getSvg() {
      if (!this.SVG) {
        this.SVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this._element.appendChild(this.SVG);
      }
      return this.SVG;
    },

    _init() {
      super._init();
      this.getSvg();

      this.setResizeTarget(this._element);
      this._observer.observe(this.SVG);
      this.addListener('resized', this._updateDimensions, this);
      for (const layoutEvent of ['changeRows', 'changeColumns', 'changeOuterPadding', 'changeSpacing']) {
        this.addListener(layoutEvent, this._updateCellSize, this);
      }

      let title = this.getHeader('label.title');
      const element = this._element;
      if (element.hasAttribute('title') && !title) {
        title = document.createElement('label');
        title.classList.add('title');
        let span = document.createElement('span');
        title.appendChild(span);
        span.textContent = element.getAttribute('title');
        this.appendToHeader(title);
      }

      if (element.hasAttribute('allow-fullscreen') && element.getAttribute('allow-fullscreen') === 'true') {
        this._initFullscreenSwitch();
        this.addListener('changeFullscreen', ev => {
          if (ev.getData()) {
            if (!this._viewBoxBinding && this.getFullscreenViewBox()) {
              this._viewBoxBinding = this.bind('fullscreenViewBox', this, 'viewBox');
            }
          } else if (this._viewBoxBinding) {
            this.removeBinding(this._viewBoxBinding);
            this._viewBoxBinding = null;

            // restore old value
            if (this._element.hasAttribute('view-box')) {
              this.setViewBox(this._element.getAttribute('view-box'));
            } else {
              this.resetViewBox();
            }
          }
          this._updateDimensions();
        });
      }

      this.addListener('changeViewBox', this._updateViewBox, this);
      window.requestAnimationFrame(() => this._updateViewBox());
      if (this.getPan()) {
        this._applyPan(true);
      }
      this._applyPagination(this.getPagination());

      if (element.querySelectorAll(':scope > cv-power-entity:not([type="house"]), :scope > cv-svg-round-value').length === 0) {
        // remove the house
        const house = element.querySelector(':scope > cv-power-entity[type="house"]');
        if (house) {
          house.remove();
        }
      }

      // make sure that the initial setup viewBox changes are not animated
      setTimeout(() => {
        this._ready = true;
        this._center();
      }, 2000);
    },

    _applyCenterX(value) {
      if (value) {
        this.__applyCenter('row', this.getRows());
      }
    },

    _applyCenterY(value) {
      if (value) {
        this.__applyCenter('column', this.getColumns());
      }
    },

    __applyCenter(selector, total) {
      // do not center the middle one(s)
      let skip = [];
      if (total > 2) {
        if (total % 2 > 0) {
          skip.push(Math.floor(total / 2));
        } else {
          skip.push((total / 2) - 1);
          skip.push(total / 2);
        }
      }
      for (let i = 0; i < total; i++) {
        if (!skip.includes(i)) {
          if (selector === 'row') {
            this.__adjustRow(this._element.querySelectorAll(`:scope > *[row="${i}"]`));
          } else {
            this.__adjustColumn(this._element.querySelectorAll(`:scope > *[column="${i}"]`));
          }
        }
      }
    },

    __adjustRow(rowElements) {
      if (rowElements.length === 1) {
        rowElements[0].setAttribute('column', '1');
      } else if (rowElements.length === 2) {
        const sorted = Array.from(rowElements);
        sorted.sort((a, b) => parseFloat(a.getAttribute('column')) - parseFloat(b.getAttribute('column')));
        sorted[0].setAttribute('column', '0.5');
        sorted[1].setAttribute('column', '1.5');
      }
    },

    __adjustColumn(columnElements) {
      if (columnElements.length === 1) {
        columnElements[0].setAttribute('row', '1');
      } else if (columnElements.length === 2) {
        const sorted = Array.from(columnElements);
        sorted.sort((a, b) => parseFloat(a.getAttribute('row')) - parseFloat(b.getAttribute('row')));
        sorted[0].setAttribute('row', '0.5');
        sorted[1].setAttribute('row', '1.5');
      }
    },

    _drag(ev) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      const CTM = this.SVG.getScreenCTM().inverse();
      this._dragPoint.x = ev.clientX;
      this._dragPoint.y = ev.clientY;
      this._dragPoint = this._dragPoint.matrixTransform(CTM);
      this.SVG.viewBox.baseVal.x -= this._dragPoint.x - this._startPoint.x;
      this.SVG.viewBox.baseVal.y -= this._dragPoint.y - this._startPoint.y;
    },

    _cancelEvent(ev) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
    },

    _startDrag(ev) {
      if (typeof this.drag !== 'function') {
        this.drag = this._drag.bind(this);
      }
      this._element.addEventListener('pointermove', this.drag);
      this._element.addEventListener('touchmove', this._cancelEvent);

      const CTM = this.SVG.getScreenCTM().inverse();
      this._dragPoint.x = ev.clientX;
      this._dragPoint.y = ev.clientY;
      this._startPoint = this._dragPoint.matrixTransform(CTM);
    },

    _endDrag(ev) {
      if (this.drag) {
        this._element.removeEventListener('pointermove', this.drag);
      }
      this._element.removeEventListener('touchmove', this._cancelEvent);
    },

    _touchStart(ev) {
      if (ev.touches.length === 1) {
        if (!this._expiredTouchStart) {
          this._expiredTouchStart = ev.timeStamp + 400;
        } else if (ev.timeStamp <= this._expiredTouchStart) {
          // remove the default of this event ( Zoom )
          //ev.preventDefault()
          this.resetDrag();
          // then reset the variable for other "double Touches" event
          this._expiredTouchStart = null;
        } else {
          // if the second touch was expired, make it as it's the first
          this._expiredTouchStart = ev.timeStamp + 400;
        }
      }
      ev.preventDefault();
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
          if (typeof this.resetDrag !== 'function') {
            this.resetDrag = this._updateViewBox.bind(this);
          }
          if (typeof this.touchStart !== 'function') {
            this.touchStart = this._touchStart.bind(this);
          }

          this._element.addEventListener('pointerdown', this.startDrag);
          this._element.addEventListener('pointerup', this.endDrag);
          this._element.addEventListener('pointerleave', this.endDrag);
          this._element.addEventListener('pointercancel', this.endDrag);
          this._element.addEventListener('dblclick', this.resetDrag);
          this._element.addEventListener('touchstart', this.touchStart);
        } else {
          this._element.removeEventListener('pointerdown', this.startDrag);
          this._element.removeEventListener('pointerup', this.endDrag);
          this._element.removeEventListener('pointerleave', this.endDrag);
          this._element.removeEventListener('pointercancel', this.endDrag);
          this._element.removeEventListener('dblclick', this.resetDrag);
          this._element.removeEventListener('touchstart', this.touchStart);
        }
      }
    },

    _applyPagination(value) {
      const showH = value === 'both' || value === 'horizontal';
      const showV = value === 'both' || value === 'vertical';
      const addButtons = [];
      const removeButtons = [];
      if (showH) {
        addButtons.push('left');
        addButtons.push('right');
      } else {
        removeButtons.push('left');
        removeButtons.push('right');
      }
      if (showV) {
        addButtons.push('top');
        addButtons.push('bottom');
      } else {
        removeButtons.push('top');
        removeButtons.push('bottom');
      }
      for (const dir of addButtons) {
        let button = this._element.querySelector(`div.pagination.${dir}`);
        if (!button) {
          button = document.createElement('div');
          button.classList.add('pagination', dir);
          this._element.appendChild(button);
        }
      }

      for (const dir of removeButtons) {
        let button = this._element.querySelector(`div.pagination.${dir}`);
        if (button) {
          button.remove();
        }
      }

      this._updatePaginationButtons();
    },

    _enablePaginationButton(button, dir, enabled) {
      let callback;
      switch (dir) {
        case 'left':
          callback = this._paginateLeft;
          break;

        case 'right':
          callback = this._paginateRight;
          break;

        case 'top':
          callback = this._paginateTop;
          break;

        case 'bottom':
          callback = this._paginateBottom;
          break;
      }
      if (enabled) {
        button.classList.add('clickable');
        qx.event.Registration.addListener(button, 'tap', callback, this);
      } else {
        if (button.classList.contains('clickable')) {
          button.classList.remove('clickable');
        }
        qx.event.Registration.removeListener(button, 'tap', callback, this);
      }
    },

    _updatePaginationButtons() {
      let [column, row, width, height] = this.getViewBox().split(' ').map(v => parseInt(v));
      for (const dir of ['top', 'bottom', 'left', 'right']) {
        const button = this._element.querySelector(`div.pagination.${dir}`);
        if (!button) {
          continue;
        }
        switch (dir) {
          case 'left':
            this._enablePaginationButton(button, dir, column - width >= 0);
            break;

          case 'right':
            this._enablePaginationButton(button, dir, column+width < this.getColumns());
            break;

          case 'top':
            this._enablePaginationButton(button, dir, row - height >= 0);
            break;

          case 'bottom':
            this._enablePaginationButton(button, dir, row + height < this.getRows());
            break;
        }
      }
    },

    _paginateLeft() {
      this._paginate('left');
    },

    _paginateRight() {
      this._paginate('right');
    },

    _paginateTop() {
      this._paginate('top');
    },

    _paginateBottom() {
      this._paginate('bottom');
    },

    _paginate(direction) {
      let [column, row, width, height] = this.getViewBox().split(' ').map(v => parseInt(v));
      switch (direction) {
        case 'left':
          if (column - width >= 0) {
            column -= width;
          }
          break;

        case 'right':
          if (column+width < this.getColumns()) {
            column += width;
          }
          break;

        case 'top':
          if (row - height >= 0) {
            row -= height;
          }
          break;

        case 'bottom':
          if (row + height < this.getRows()) {
            row += height;
          }
      }
      this._element.setAttribute('view-box', `${column} ${row} ${width} ${height}`);
    },

    _updateDimensions(ev) {
      if (ev) {
        const entry = ev.getData();
        if (entry.contentBoxSize) {
          if (entry.target instanceof SVGElement) {
            this._center(entry.contentRect.width, entry.contentRect.height);
            return;
          }
        }
      }
      const isFullscreen = this.isFullscreen();
      if (isFullscreen) {
        const minSize = Math.min(screen.availHeight, screen.availWidth);
        if (minSize > 600) {
          this.setOuterPadding(16);
          this.setSpacing(32);
        } else if (minSize >= 400) {
          this.setOuterPadding(16);
          this.setSpacing(26);
        }
        // set fixed height
        let height = 0;
        if (screen.availHeight > screen.availWidth) {
          const bbox = this.SVG.getBBox();
          height = Math.min(screen.availHeight, Math.max(bbox.height, this.getRows() * 100));
        } else {
          height = screen.availHeight;
        }
        if (this._tileElement) {
          this._tileElement.style.height = `${height}px`;
        }
      } else {
        if (this._tileElement) {
          this._tileElement.style.height = 'unset';
        }
        if (this._element.hasAttribute('outer-padding')) {
          this.setOuterPadding(this._element.getAttribute('outer-padding'));
        } else {
          this.resetOuterPadding();
        }
        if (this._element.hasAttribute('spacing')) {
          this.setSpacing(this._element.getAttribute('spacing'));
        } else {
          this.resetSpacing();
        }
      }
      window.requestAnimationFrame(() => this._updateCellSize());
    },

    _updateViewBox() {
      const viewBox = this.getViewBox();
      if (viewBox) {
        const parts = viewBox.split(' ').map(v => parseInt(v));
        if (parts.length === 4) {
          this._updatePaginationButtons();
          const totalOuterPadding = this.getOuterPadding() * 2;
          const x = this.getCellWidth() * parts[0] + (parts[0] > 1 ? (parts[0]-1) * this.getSpacing() : 0);
          const y = this.getCellHeight() * parts[1] + (parts[1] > 1 ? (parts[1]-1) * this.getSpacing() : 0);
          const width = totalOuterPadding + this.getCellWidth() * parts[2] + (parts[2] > 1 ? (parts[2]-1) * this.getSpacing() : 0);
          const height = totalOuterPadding + this.getCellHeight() * parts[3] + (parts[3] > 1 ? (parts[3]-1) * this.getSpacing() : 0);

          if (this._ready && typeof window.d3 === 'object') {
            const svg = d3.select(this._element).select('svg');
            svg.transition()
              .duration(500)
              .attr('viewBox', `${x} ${y} ${width} ${height}`);
            setTimeout(() => this._center(), 510);
          } else {
            this.SVG.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);
            setTimeout(() => this._center(), 10);
          }
        }
      } else {
        this.SVG.removeAttribute('viewBox');
      }
    },

    _center(width, height) {
      if (this.SVG && this._ready) {
        const bbox = this.SVG.getBBox();
        if (this._lastBBox && (this._lastBBox.width === bbox.width && this._lastBBox.height === bbox.height)) {
          // no change
          return;
        }
        if (!width || !height) {
          const parts = this.SVG.hasAttribute('viewBox') ? this.SVG.getAttribute('viewBox').split(' ').map(v => parseInt(v)) : [];
          if (parts.length === 4) {
            width = parts[2];
            height = parts[3];
          } else {
            return;
          }
        }

        const totalOuterPadding = this.getOuterPadding() * 2;
        let visibleColumns = this.getColumns();
        let visibleRows = this.getRows();
        const gridViewBox = this.getViewBox();
        let firstColumn = 0;
        let lastColumn = 2;
        let firstRow = 0;
        let lastRow = 2;
        if (gridViewBox) {
          const gridParts = gridViewBox.split(' ').map(s => parseInt(s));
          visibleColumns = gridParts[2] - gridParts[0];
          visibleRows = gridParts[3] - gridParts[1];
          firstColumn = gridParts[0];
          lastColumn = firstColumn + gridParts[2] - 1;
          firstRow = gridParts[1];
          lastRow = firstRow + gridParts[3] - 1;
        }
        let usedColumns = 3;
        let usedRows = 3;
        let col;
        let row;
        for (const elem of this._element.querySelectorAll('*[column]')) {
          col = parseInt(elem.getAttribute('column')) + 1;
          if (firstColumn <= col && lastColumn > col && col > usedColumns) {
            usedColumns = col;
          }
        }
        for (const elem of this._element.querySelectorAll('*[row]')) {
          row = parseInt(elem.getAttribute('row')) + 1;
          if (firstRow <= col && lastRow > row && row > usedRows) {
            usedRows = row;
          }
        }

        const visibleWidth = usedColumns > visibleColumns ? visibleColumns / this.getColumns() : 1.0;
        const visibleHeight = usedRows > visibleRows ? visibleRows / this.getRows() : 1.0;

        const heightDiff = height - totalOuterPadding - bbox.height * visibleHeight;
        const widthDiff = width - totalOuterPadding - bbox.width * visibleWidth;
        if (heightDiff > 0 || widthDiff > 0) {
          this.SVG.setAttribute('transform', `translate(${Math.max(0, widthDiff / 2)}, ${Math.max(0, heightDiff / 2)})`);
        } else {
          this.SVG.removeAttribute('transform');
        }
        this._lastBBox = bbox;
        window.requestAnimationFrame(() => this._center());
      }
    },

    _updateCellSize() {
      if (this._element.clientWidth === 0 || this._element.clientHeight === 0) {
        return;
      }
      let visibleColumns = this.getColumns();
      let visibleRows = this.getRows();
      const viewBox = this.getViewBox();
      if (viewBox) {
        const box = viewBox.split(' ').map(v => parseInt(v));
        visibleColumns = box[2];
        visibleRows = box[3];
      }
      const padding = this.getOuterPadding() * 2;
      const spacing = this.getSpacing() / 2;
      const cellWidth = Math.floor((this._element.clientWidth - padding) / visibleColumns - spacing);
      const cellHeight = Math.floor((this._element.clientHeight - padding) / visibleRows - spacing);
      this.debug('cellWidth', cellWidth, 'cellHeight', cellHeight);
      const changed = this.getCellWidth() !== cellWidth || this.getCellHeight() !== cellHeight;
      this.setCellWidth(cellWidth);
      this.setCellHeight(cellHeight);
      if (changed) {
        window.requestAnimationFrame(() => {
          this._updateViewBox();
        });
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
      cv.ui.structure.tile.Controller.PREFIX + 'flow',
      class extends QxConnector {
        // @ignore
        static observedAttributes = ['view-box', 'fullscreen-view-box', 'pan', 'rows', 'columns', 'cell-width', 'cell-height', 'outer-padding', 'spacing', 'pagination', 'center-x', 'center-y'];
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
