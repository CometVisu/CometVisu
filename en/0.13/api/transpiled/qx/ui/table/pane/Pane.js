(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 STZ-IDA, Germany, http://www.stz-ida.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The table pane that shows a certain section from a table. This class handles
   * the display of the data part of a table and is therefore the base for virtual
   * scrolling.
   */
  qx.Class.define("qx.ui.table.pane.Pane", {
    extend: qx.ui.core.Widget,
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * @param paneScroller {qx.ui.table.pane.Scroller} the TablePaneScroller the header belongs to.
     */
    construct: function construct(paneScroller) {
      qx.ui.core.Widget.constructor.call(this);
      this.__P_460_0 = paneScroller;
      this.__P_460_1 = 0;
      this.__P_460_2 = 0;
      this.__P_460_3 = [];
    },
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /**
       * Whether the current view port of the pane has not loaded data.
       * The data object of the event indicates if the table pane has to reload
       * data or not. Can be used to give the user feedback of the loading state
       * of the rows.
       */
      paneReloadsData: "qx.event.type.Data",
      /**
       * Whenever the content of the table pane has been updated (rendered)
       * trigger a paneUpdated event. This allows the canvas cellrenderer to act
       * once the new cells have been integrated in the dom.
       */
      paneUpdated: "qx.event.type.Event"
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /** The index of the first row to show. */
      firstVisibleRow: {
        check: "Number",
        init: 0,
        apply: "_applyFirstVisibleRow"
      },
      /** The number of rows to show. */
      visibleRowCount: {
        check: "Number",
        init: 0,
        apply: "_applyVisibleRowCount"
      },
      /**
       * Maximum number of cached rows. If the value is <code>-1</code> the cache
       * size is unlimited
       */
      maxCacheLines: {
        check: "Number",
        init: 1000,
        apply: "_applyMaxCacheLines"
      },
      // overridden
      allowShrinkX: {
        refine: true,
        init: false
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __P_460_2: null,
      __P_460_1: null,
      __P_460_0: null,
      __P_460_4: null,
      __P_460_5: null,
      __P_460_6: null,
      // sparse array to cache rendered rows
      __P_460_3: null,
      __P_460_7: 0,
      // property modifier
      _applyFirstVisibleRow: function _applyFirstVisibleRow(value, old) {
        this.updateContent(false, value - old);
      },
      // property modifier
      _applyVisibleRowCount: function _applyVisibleRowCount(value, old) {
        this.updateContent(true);
      },
      // overridden
      _getContentHint: function _getContentHint() {
        // the preferred height is 400 pixel. We don't use rowCount * rowHeight
        // because this is typically too large.
        return {
          width: this.getPaneScroller().getTablePaneModel().getTotalWidth(),
          height: 400
        };
      },
      /**
       * Returns the TablePaneScroller this pane belongs to.
       *
       * @return {qx.ui.table.pane.Scroller} the TablePaneScroller.
       */
      getPaneScroller: function getPaneScroller() {
        return this.__P_460_0;
      },
      /**
       * Returns the table this pane belongs to.
       *
       * @return {qx.ui.table.Table} the table.
       */
      getTable: function getTable() {
        return this.__P_460_0.getTable();
      },
      /**
       * Sets the currently focused cell.
       *
       * @param col {Integer?null} the model index of the focused cell's column.
       * @param row {Integer?null} the model index of the focused cell's row.
       * @param massUpdate {Boolean ? false} Whether other updates are planned as well.
       *          If true, no repaint will be done.
       */
      setFocusedCell: function setFocusedCell(col, row, massUpdate) {
        if (col != this.__P_460_6 || row != this.__P_460_5) {
          var oldRow = this.__P_460_5;
          this.__P_460_6 = col;
          this.__P_460_5 = row;

          // Update the focused row background
          if (row != oldRow && !massUpdate) {
            if (oldRow !== null) {
              this.updateContent(false, null, oldRow, true);
            }
            if (row !== null) {
              this.updateContent(false, null, row, true);
            }
          }
        }
      },
      /**
       * Event handler. Called when the selection has changed.
       */
      onSelectionChanged: function onSelectionChanged() {
        this.updateContent(false, null, null, true);
      },
      /**
       * Event handler. Called when the table gets or looses the focus.
       */
      onFocusChanged: function onFocusChanged() {
        this.updateContent(false, null, null, true);
      },
      /**
       * Sets the column width.
       *
       * @param col {Integer} the column to change the width for.
       * @param width {Integer} the new width.
       */
      setColumnWidth: function setColumnWidth(col, width) {
        this.updateContent(true);
      },
      /**
       * Event handler. Called the column order has changed.
       *
       */
      onColOrderChanged: function onColOrderChanged() {
        this.updateContent(true);
      },
      /**
       * Event handler. Called when the pane model has changed.
       */
      onPaneModelChanged: function onPaneModelChanged() {
        this.updateContent(true);
      },
      /**
       * Event handler. Called when the table model data has changed.
       *
       * @param firstRow {Integer} The index of the first row that has changed.
       * @param lastRow {Integer} The index of the last row that has changed.
       * @param firstColumn {Integer} The model index of the first column that has changed.
       * @param lastColumn {Integer} The model index of the last column that has changed.
       */
      onTableModelDataChanged: function onTableModelDataChanged(firstRow, lastRow, firstColumn, lastColumn) {
        this.__P_460_8();
        var paneFirstRow = this.getFirstVisibleRow();
        var rowCount = this.getVisibleRowCount();
        if (lastRow == -1 || lastRow >= paneFirstRow && firstRow < paneFirstRow + rowCount) {
          // The change intersects this pane, check if a full or partial update is required
          if (firstRow === lastRow && this.getTable().getTableModel().getRowCount() > 1) {
            this.updateContent(false, null, firstRow, false);
          } else {
            this.updateContent();
          }
        }
      },
      /**
       * Event handler. Called when the table model meta data has changed.
       *
       */
      onTableModelMetaDataChanged: function onTableModelMetaDataChanged() {
        this.updateContent(true);
      },
      // property apply method
      _applyMaxCacheLines: function _applyMaxCacheLines(value, old) {
        if (this.__P_460_7 >= value && value !== -1) {
          this.__P_460_8();
        }
      },
      /**
       * Clear the row cache
       */
      __P_460_8: function __P_460_8() {
        this.__P_460_3 = [];
        this.__P_460_7 = 0;
      },
      /**
       * Get a line from the row cache.
       *
       * @param row {Integer} Row index to get
       * @param selected {Boolean} Whether the row is currently selected
       * @param focused {Boolean} Whether the row is currently focused
       * @return {String|null} The cached row or null if a row with the given
       *     index is not cached.
       */
      __P_460_9: function __P_460_9(row, selected, focused) {
        if (!selected && !focused && this.__P_460_3[row]) {
          return this.__P_460_3[row];
        } else {
          return null;
        }
      },
      /**
       * Add a line to the row cache.
       *
       * @param row {Integer} Row index to set
       * @param rowString {String} computed row string to cache
       * @param selected {Boolean} Whether the row is currently selected
       * @param focused {Boolean} Whether the row is currently focused
       */
      __P_460_10: function __P_460_10(row, rowString, selected, focused) {
        var maxCacheLines = this.getMaxCacheLines();
        if (!selected && !focused && !this.__P_460_3[row] && maxCacheLines > 0) {
          this._applyMaxCacheLines(maxCacheLines);
          this.__P_460_3[row] = rowString;
          this.__P_460_7 += 1;
        }
      },
      /**
       * Updates the content of the pane.
       *
       * @param completeUpdate {Boolean ? false} if true a complete update is performed.
       *      On a complete update all cell widgets are recreated.
       * @param scrollOffset {Integer ? null} If set specifies how many rows to scroll.
       * @param onlyRow {Integer ? null} if set only the specified row will be updated.
       * @param onlySelectionOrFocusChanged {Boolean ? false} if true, cell values won't
       *          be updated. Only the row background will.
       */
      updateContent: function updateContent(completeUpdate, scrollOffset, onlyRow, onlySelectionOrFocusChanged) {
        if (completeUpdate) {
          this.__P_460_8();
        }
        if (scrollOffset && Math.abs(scrollOffset) <= Math.min(10, this.getVisibleRowCount())) {
          this._scrollContent(scrollOffset);
        } else if (onlySelectionOrFocusChanged && !this.getTable().getAlwaysUpdateCells()) {
          this._updateRowStyles(onlyRow);
        } else if (typeof onlyRow == "number" && onlyRow >= 0) {
          this._updateSingleRow(onlyRow);
        } else {
          this._updateAllRows();
        }
      },
      /**
       * If only focus or selection changes it is sufficient to only update the
       * row styles. This method updates the row styles of all visible rows or
       * of just one row.
       *
       * @param onlyRow {Integer|null ? null} If this parameter is set only the row
       *     with this index is updated.
       */
      _updateRowStyles: function _updateRowStyles(onlyRow) {
        var elem = this.getContentElement().getDomElement();
        if (!elem || !elem.firstChild) {
          this._updateAllRows();
          return;
        }
        var table = this.getTable();
        var selectionModel = table.getSelectionModel();
        var tableModel = table.getTableModel();
        var rowRenderer = table.getDataRowRenderer();
        var rowNodes = elem.firstChild.childNodes;
        var cellInfo = {
          table: table
        };

        // We don't want to execute the row loop below more than necessary. If
        // onlyRow is not null, we want to do the loop only for that row.
        // In that case, we start at (set the "row" variable to) that row, and
        // stop at (set the "end" variable to the offset of) the next row.
        var row = this.getFirstVisibleRow();
        var y = 0;

        // How many rows do we need to update?
        var end = rowNodes.length;
        if (onlyRow != null) {
          // How many rows are we skipping?
          var offset = onlyRow - row;
          if (offset >= 0 && offset < end) {
            row = onlyRow;
            y = offset;
            end = offset + 1;
          } else {
            return;
          }
        }
        for (; y < end; y++, row++) {
          cellInfo.row = row;
          cellInfo.selected = selectionModel.isSelectedIndex(row);
          cellInfo.focusedRow = this.__P_460_5 == row;
          cellInfo.rowData = tableModel.getRowData(row);
          rowRenderer.updateDataRowElement(cellInfo, rowNodes[y]);
        }
      },
      /**
       * Get the HTML table fragment for the given row range.
       *
       * @param firstRow {Integer} Index of the first row
       * @param rowCount {Integer} Number of rows
       * @return {String} The HTML table fragment for the given row range.
       */
      _getRowsHtml: function _getRowsHtml(firstRow, rowCount) {
        var table = this.getTable();
        var selectionModel = table.getSelectionModel();
        var tableModel = table.getTableModel();
        var columnModel = table.getTableColumnModel();
        var paneModel = this.getPaneScroller().getTablePaneModel();
        var rowRenderer = table.getDataRowRenderer();
        tableModel.prefetchRows(firstRow, firstRow + rowCount - 1);
        var rowHeight = table.getRowHeight();
        var colCount = paneModel.getColumnCount();
        var left = 0;
        var cols = [];

        // precompute column properties
        for (var x = 0; x < colCount; x++) {
          var col = paneModel.getColumnAtX(x);
          var cellWidth = columnModel.getColumnWidth(col);
          cols.push({
            col: col,
            xPos: x,
            editable: tableModel.isColumnEditable(col),
            focusedCol: this.__P_460_6 == col,
            styleLeft: left,
            styleWidth: cellWidth
          });
          left += cellWidth;
        }
        var rowsArr = [];
        var paneReloadsData = false;
        for (var row = firstRow; row < firstRow + rowCount; row++) {
          var selected = selectionModel.isSelectedIndex(row);
          var focusedRow = this.__P_460_5 == row;
          var cachedRow = this.__P_460_9(row, selected, focusedRow);
          if (cachedRow) {
            rowsArr.push(cachedRow);
            continue;
          }
          var rowHtml = [];
          var cellInfo = {
            table: table
          };
          cellInfo.styleHeight = rowHeight;
          cellInfo.row = row;
          cellInfo.selected = selected;
          cellInfo.focusedRow = focusedRow;
          cellInfo.rowData = tableModel.getRowData(row);
          if (!cellInfo.rowData) {
            paneReloadsData = true;
          }
          rowHtml.push("<div ");
          var rowAttributes = rowRenderer.getRowAttributes(cellInfo);
          if (rowAttributes) {
            rowHtml.push(rowAttributes);
          }
          var rowClass = rowRenderer.getRowClass(cellInfo);
          if (rowClass) {
            rowHtml.push('class="', rowClass, '" ');
          }
          var rowStyle = rowRenderer.createRowStyle(cellInfo);
          rowStyle += ";position:relative;" + rowRenderer.getRowHeightStyle(rowHeight) + "width:100%;";
          if (rowStyle) {
            rowHtml.push('style="', rowStyle, '" ');
          }
          rowHtml.push(">");
          var stopLoop = false;
          for (x = 0; x < colCount && !stopLoop; x++) {
            var col_def = cols[x];
            for (var attr in col_def) {
              cellInfo[attr] = col_def[attr];
            }
            var col = cellInfo.col;

            // Use the "getValue" method of the tableModel to get the cell's
            // value working directly on the "rowData" object
            // (-> cellInfo.rowData[col];) is not a solution because you can't
            // work with the columnIndex -> you have to use the columnId of the
            // columnIndex This is exactly what the method "getValue" does
            cellInfo.value = tableModel.getValue(col, row);
            var cellRenderer = columnModel.getDataCellRenderer(col);

            // Retrieve the current default cell style for this column.
            cellInfo.style = cellRenderer.getDefaultCellStyle();

            // Allow a cell renderer to tell us not to draw any further cells in
            // the row. Older, or traditional cell renderers don't return a
            // value, however, from createDataCellHtml, so assume those are
            // returning false.
            //
            // Tested with http://tinyurl.com/333hyhv
            stopLoop = cellRenderer.createDataCellHtml(cellInfo, rowHtml) || false;
          }
          rowHtml.push("</div>");
          var rowString = rowHtml.join("");
          this.__P_460_10(row, rowString, selected, focusedRow);
          rowsArr.push(rowString);
        }
        this.fireDataEvent("paneReloadsData", paneReloadsData);
        return rowsArr.join("");
      },
      /**
       * Scrolls the pane's contents by the given offset.
       *
       * @param rowOffset {Integer} Number of lines to scroll. Scrolling up is
       *     represented by a negative offset.
       */
      _scrollContent: function _scrollContent(rowOffset) {
        var el = this.getContentElement().getDomElement();
        if (!(el && el.firstChild)) {
          this._updateAllRows();
          return;
        }
        var tableBody = el.firstChild;
        var tableChildNodes = tableBody.childNodes;
        var rowCount = this.getVisibleRowCount();
        var firstRow = this.getFirstVisibleRow();
        var tabelModel = this.getTable().getTableModel();
        var modelRowCount = 0;
        modelRowCount = tabelModel.getRowCount();

        // don't handle this special case here
        if (firstRow + rowCount > modelRowCount) {
          this._updateAllRows();
          return;
        }

        // remove old lines
        var removeRowBase = rowOffset < 0 ? rowCount + rowOffset : 0;
        var addRowBase = rowOffset < 0 ? 0 : rowCount - rowOffset;
        for (var i = Math.abs(rowOffset) - 1; i >= 0; i--) {
          var rowElem = tableChildNodes[removeRowBase];
          try {
            tableBody.removeChild(rowElem);
          } catch (exp) {
            break;
          }
        }

        // render new lines
        if (!this.__P_460_4) {
          this.__P_460_4 = document.createElement("div");
        }
        var tableDummy = "<div>";
        tableDummy += this._getRowsHtml(firstRow + addRowBase, Math.abs(rowOffset));
        tableDummy += "</div>";
        this.__P_460_4.innerHTML = tableDummy;
        var newTableRows = this.__P_460_4.firstChild.childNodes;

        // append new lines
        if (rowOffset > 0) {
          for (var i = newTableRows.length - 1; i >= 0; i--) {
            var rowElem = newTableRows[0];
            tableBody.appendChild(rowElem);
          }
        } else {
          for (var i = newTableRows.length - 1; i >= 0; i--) {
            var rowElem = newTableRows[newTableRows.length - 1];
            tableBody.insertBefore(rowElem, tableBody.firstChild);
          }
        }

        // update focus indicator
        if (this.__P_460_5 !== null) {
          this._updateRowStyles(this.__P_460_5 - rowOffset);
          this._updateRowStyles(this.__P_460_5);
        }
        this.fireEvent("paneUpdated");
      },
      _updateSingleRow: function _updateSingleRow(row) {
        var elem = this.getContentElement().getDomElement();
        if (!elem || !elem.firstChild) {
          // pane has not yet been rendered, just exit
          return;
        }
        var visibleRowCount = this.getVisibleRowCount();
        var firstRow = this.getFirstVisibleRow();
        if (row < firstRow || row > firstRow + visibleRowCount) {
          // No need to redraw it
          return;
        }
        var modelRowCount = this.getTable().getTableModel().getRowCount();
        var tableBody = elem.firstChild;
        var tableChildNodes = tableBody.childNodes;
        var offset = row - firstRow;
        var rowElem = tableChildNodes[offset];

        // `row` can be too big if rows were deleted. In that case, we
        // can't update the current single row
        if (row >= modelRowCount || typeof rowElem == "undefined") {
          this._updateAllRows();
          return;
        }

        // render new lines
        if (!this.__P_460_4) {
          this.__P_460_4 = document.createElement("div");
        }
        this.__P_460_4.innerHTML = "<div>" + this._getRowsHtml(row, 1) + "</div>";
        var newTableRows = this.__P_460_4.firstChild.childNodes;
        tableBody.replaceChild(newTableRows[0], rowElem);

        // update focus indicator
        this._updateRowStyles(null);
        this.fireEvent("paneUpdated");
      },
      /**
       * Updates the content of the pane (implemented using array joins).
       */
      _updateAllRows: function _updateAllRows() {
        var elem = this.getContentElement().getDomElement();
        if (!elem) {
          // pane has not yet been rendered
          this.addListenerOnce("appear", this._updateAllRows, this);
          return;
        }
        var table = this.getTable();
        var tableModel = table.getTableModel();
        var paneModel = this.getPaneScroller().getTablePaneModel();
        var colCount = paneModel.getColumnCount();
        var rowHeight = table.getRowHeight();
        var firstRow = this.getFirstVisibleRow();
        var rowCount = this.getVisibleRowCount();
        var modelRowCount = tableModel.getRowCount();
        if (firstRow + rowCount > modelRowCount) {
          rowCount = Math.max(0, modelRowCount - firstRow);
        }
        var rowWidth = paneModel.getTotalWidth();
        var htmlArr;

        // If there are any rows...
        if (rowCount > 0) {
          // ... then create a div for them and add the rows to it.
          htmlArr = ["<div style='", "width: 100%;", table.getForceLineHeight() ? "line-height: " + rowHeight + "px;" : "", "overflow: hidden;", "'>", this._getRowsHtml(firstRow, rowCount), "</div>"];
        } else {
          // Otherwise, don't create the div, as even an empty div creates a
          // white row in IE.
          htmlArr = [];
        }
        var data = htmlArr.join("");
        elem.innerHTML = data;
        this.setWidth(rowWidth);
        this.__P_460_1 = colCount;
        this.__P_460_2 = rowCount;
        this.fireEvent("paneUpdated");
      },
      getRenderedRowHeight: function getRenderedRowHeight() {
        var rowHeight = this.getTable().getRowHeight();
        var elem = this.getContentElement().getDomElement();
        if (elem && elem.firstChild) {
          // pane has been rendered
          var tableBody = elem.firstChild;
          if (tableBody.childNodes && tableBody.childNodes.length > 0) {
            rowHeight = tableBody.childNodes[0].getBoundingClientRect().height;
          }
        }
        return rowHeight;
      }
    },
    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__P_460_4 = this.__P_460_0 = this.__P_460_3 = null;
      this.removeListener("track", this._onTrack, this);
    }
  });
  qx.ui.table.pane.Pane.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Pane.js.map?dt=1702815237535