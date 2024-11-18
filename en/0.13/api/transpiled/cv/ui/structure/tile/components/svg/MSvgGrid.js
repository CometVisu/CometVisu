function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.module.util.Function": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
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
    construct: function construct() {
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
        transform: "__P_90_0"
      },
      columns: {
        check: 'Number',
        init: 3,
        event: 'changeColumns',
        apply: '_invalidateLayout',
        transform: "__P_90_0"
      },
      outerPadding: {
        check: 'Number',
        event: 'changeOuterPadding',
        init: 4,
        apply: '_invalidateLayout',
        transform: "__P_90_0"
      },
      spacing: {
        check: 'Number',
        init: 8,
        event: 'changeSpacing',
        apply: '_invalidateLayout',
        transform: "__P_90_0"
      },
      cellWidth: {
        check: 'Number',
        init: 56,
        apply: '_invalidateLayout',
        event: 'changeSize',
        transform: "__P_90_0"
      },
      cellHeight: {
        check: 'Number',
        init: 56,
        apply: '_invalidateLayout',
        event: 'changeSize',
        transform: "__P_90_0"
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
      __P_90_0: function __P_90_0(value) {
        if (typeof value === 'string') {
          return parseInt(value);
        }
        return value;
      },
      _invalidateLayout: function _invalidateLayout() {
        this._isLayoutValid = false;
        this.debouncedLayoutAll();
      },
      _layoutAll: function _layoutAll() {
        this.debug('re-layout all items');
        for (var cellId in this._cells) {
          var position = cellId.split('-').map(function (i) {
            return parseFloat(i);
          });
          this.layout(this._cells[cellId], position[0], position[1], true);
        }
        this._isLayoutValid = true;
      },
      /**
       * Returns the number of cells in this grid
       * @returns {number}
       */
      getCells: function getCells() {
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
      layout: function layout(element) {
        var row = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
        var column = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
        var replace = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var retries = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
        if (row === -1 || column === -1) {
          var _this$getNextFreeCell = this.getNextFreeCell(row, column),
            _this$getNextFreeCell2 = _slicedToArray(_this$getNextFreeCell, 2),
            r = _this$getNextFreeCell2[0],
            c = _this$getNextFreeCell2[1];
          if (r === -1 || c === -1) {
            this.error('no next free cell found, element could not be placed');
            return;
          }
          row = r;
          column = c;
        }
        var cellId = row + '-' + column;
        if (this._cells[cellId] && !replace) {
          this.error("cell ".concat(row, "/").concat(column, " is not empty"));
          return;
        }

        // remove old positions
        for (var _i = 0, _Object$keys = Object.keys(this._cells); _i < _Object$keys.length; _i++) {
          var id = _Object$keys[_i];
          if (id !== cellId && this._cells[id] === element) {
            delete this._cells[id];
          }
        }
        var x = this.getOuterPadding() + column * this.getSpacing() + column * this.getCellWidth();
        var y = this.getOuterPadding() + row * this.getSpacing() + row * this.getCellHeight();
        element.setAttribute('x', "".concat(x));
        element.setAttribute('y', "".concat(y));
        this._cells[cellId] = element;
      },
      getNextFreeCell: function getNextFreeCell(row, column) {
        var cellId;
        if (row === -1 && column === -1) {
          for (var r = 0; r < this.getRows(); r++) {
            for (var c = 0; c < this.getColumns(); c++) {
              cellId = r + '-' + c;
              if (!this._cells[cellId]) {
                return [r, c];
              }
            }
          }
        } else if (row === -1) {
          for (var _r = 0; _r < this.getRows(); _r++) {
            cellId = _r + '-' + column;
            if (!this._cells[cellId]) {
              return [_r, column];
            }
          }
        } else if (column === -1) {
          for (var _c = 0; _c < this.getColumns(); _c++) {
            cellId = row + '-' + _c;
            if (!this._cells[cellId]) {
              return [row, column];
            }
          }
        } else {
          var startCell = row * this.getColumns() + column;
          var _r2;
          var _c2;
          for (var i = startCell; i < this.getCells(); i++) {
            _r2 = Math.floor(i / this.getColumns());
            _c2 = i % this.getColumns();
            cellId = _r2 + '-' + _c2;
            if (!this._cells[cellId]) {
              return [_r2, _c2];
            }
          }
        }
        return [row, column];
      }
    }
  });
  cv.ui.structure.tile.components.svg.MSvgGrid.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MSvgGrid.js.map?dt=1731948097660