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
 * Mixin for SVG elements that provide a grid layout.
 * @since 2023
 * @author Tobias Bräutigam
 */
qx.Mixin.define('cv.ui.structure.tile.components.svg.MSvgGrid', {

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct() {
    this._cells = {};
    this._isLayoutValid = true;
    this.debouncedLayoutAll = qx.module.util.Function.debounce(this._layoutAll.bind(this), 100);
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    rows: {
      check: 'Number',
      init: 3,
      event: 'changeRows',
      apply: '_invalidateLayout',
      transform: '__toInt'
    },

    columns: {
      check: 'Number',
      init: 3,
      event: 'changeColumns',
      apply: '_invalidateLayout',
      transform: '__toInt'
    },

    outerPadding: {
      check: 'Number',
      event: 'changeOuterPadding',
      init: 4,
      apply: '_invalidateLayout',
      transform: '__toInt'
    },

    spacing: {
      check: 'Number',
      init: 4,
      event: 'changeSpacing',
      apply: '_invalidateLayout',
      transform: '__toInt'
    },

    cellWidth: {
      check: 'Number',
      init: 56,
      apply: '_invalidateLayout',
      event: 'changeSize',
      transform: '__toInt'
    },

    cellHeight: {
      check: 'Number',
      init: 56,
      apply: '_invalidateLayout',
      event: 'changeSize',
      transform: '__toInt'
    },

    viewBox: {
      check: 'String',
      nullable: true,
      event: 'changeViewBox'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _cells: null,
    _isLayoutValid: null,

    __toInt(value) {
      if (typeof value === 'string') {
        return parseInt(value);
      }
      return value;
    },

    _invalidateLayout() {
      this._isLayoutValid = false;
      this.debouncedLayoutAll();
    },

    _layoutAll() {
      this.debug('re-layout all items');
      for (const cellId in this._cells) {
        const position = cellId.split('-').map(i => parseFloat(i));
        this.layout(this._cells[cellId], position[0], position[1], true);
      }
      this._isLayoutValid = true;
    },

    /**
     * Returns the number of cells in this grid
     * @returns {number}
     */
    getCells() {
      return this.getRows() * this.getColumns();
    },

    /**
     * Add a SVGElement to a cell in the grid.
     * @param element {SVGGraphicsElement} element to place
     * @param row {number} row number (-1 to find next free row)
     * @param column {number} column cumber (-1 to use next free cell)
     * @param replace {boolean} it true replace current item in cell, otherwise the element will not be added when the cell is not empty
     * @param retries {number} internal value used to limit layout retries for one element. Do not set this externally!
     */
    layout(element, row = -1, column = -1, replace = false, retries = 0) {
      if (row === -1 || column === -1) {
        const [r, c] = this.getNextFreeCell(row, column);
        if (r === -1 || c === -1) {
          this.error('no next free cell found, element could not be placed');
          return;
        }
        row = r;
        column = c;
      }
      const cellId = row + '-' + column;
      if (this._cells[cellId] && !replace) {
        this.error(`cell ${row}/${column} is not empty`);
        return;
      }

      // remove old positions
      for (const id of Object.keys(this._cells)) {
        if (id !== cellId && this._cells[id] === element) {
          delete this._cells[id];
        }
      }
      let x = this.getOuterPadding() + column * this.getSpacing() + column * this.getCellWidth();
      let y  = this.getOuterPadding() + row * this.getSpacing() + row * this.getCellHeight();
      element.setAttribute('x', `${x}`);
      element.setAttribute('y', `${y}`);
      this._cells[cellId] = element;
    },

    getNextFreeCell(row, column) {
      let cellId;
      if (row === -1 && column === -1) {
        for (let r = 0; r < this.getRows(); r++) {
          for (let c = 0; c < this.getColumns(); c++) {
            cellId = r + '-' + c;
            if (!this._cells[cellId]) {
              return [r,  c];
            }
          }
        }
      } else if (row === -1) {
        for (let r = 0; r < this.getRows(); r++) {
          cellId = r + '-' + column;
          if (!this._cells[cellId]) {
            return [r, column];
          }
        }
      } else if (column === -1) {
        for (let c = 0; c < this.getColumns(); c++) {
          cellId = row + '-' + c;
          if (!this._cells[cellId]) {
            return [row, column];
          }
        }
      } else {
        let startCell = row * this.getColumns() + column;
        let r;
        let c;
        for (let i = startCell; i < this.getCells(); i++) {
          r = Math.floor(i / this.getColumns());
          c = i % this.getColumns();
          cellId = r + '-' + c;
          if (!this._cells[cellId]) {
            return [r,  c];
          }
        }
      }
      return [row, column];
    }
  }
});
