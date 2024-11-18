(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.ui.table.headerrenderer.Default": {
        "require": true
      },
      "qx.ui.table.cellrenderer.Default": {
        "require": true
      },
      "qx.ui.table.celleditor.TextField": {
        "require": true
      },
      "qx.lang.Array": {}
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
  
  ************************************************************************ */

  /**
   * A model that contains all meta data about columns, such as width, renderer,
   * visibility and order.
   *
   * @see qx.ui.table.ITableModel
   */
  qx.Class.define("qx.ui.table.columnmodel.Basic", {
    extend: qx.core.Object,
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_408_0 = [];
      this.__P_408_1 = [];
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /**
       * Fired when the width of a column has changed. The data property of the event is
       * a map having the following attributes:
       * <ul>
       *   <li>col: The model index of the column the width of which has changed.</li>
       *   <li>newWidth: The new width of the column in pixels.</li>
       *   <li>oldWidth: The old width of the column in pixels.</li>
       * </ul>
       */
      "widthChanged": "qx.event.type.Data",

      /**
       * Fired when the visibility of a column has changed. This event is equal to
        * "visibilityChanged", but is fired right before.
       */
      "visibilityChangedPre": "qx.event.type.Data",

      /**
       * Fired when the visibility of a column has changed. The data property of the
       * event is a map having the following attributes:
       * <ul>
       *   <li>col: The model index of the column the visibility of which has changed.</li>
       *   <li>visible: Whether the column is now visible.</li>
       * </ul>
       */
      "visibilityChanged": "qx.event.type.Data",

      /**
       * Fired when the column order has changed. The data property of the
       * event is a map having the following attributes:
       * <ul>
       *   <li>col: The model index of the column that was moved.</li>
       *   <li>fromOverXPos: The old overall x position of the column.</li>
       *   <li>toOverXPos: The new overall x position of the column.</li>
       * </ul>
       */
      "orderChanged": "qx.event.type.Data",

      /**
       * Fired when the cell renderer of a column has changed.
       * The data property of the event is a map having the following attributes:
       * <ul>
       *   <li>col: The model index of the column that was moved.</li>
       * </ul>
       */
      "headerCellRendererChanged": "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /** @type {Integer} the default width of a column in pixels. */
      DEFAULT_WIDTH: 100,

      /** @type {qx.ui.table.headerrenderer.Default} the default header cell renderer. */
      DEFAULT_HEADER_RENDERER: qx.ui.table.headerrenderer.Default,

      /** @type {qx.ui.table.cellrenderer.Default} the default data cell renderer. */
      DEFAULT_DATA_RENDERER: qx.ui.table.cellrenderer.Default,

      /** @type {qx.ui.table.celleditor.TextField} the default editor factory. */
      DEFAULT_EDITOR_FACTORY: qx.ui.table.celleditor.TextField
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_408_2: null,
      __P_408_3: null,
      __P_408_1: null,
      __P_408_0: null,
      __P_408_4: null,
      __P_408_5: null,
      __P_408_6: null,
      __P_408_7: null,

      /**
       * Initializes the column model.
       *
       * @param colCount {Integer}
       *   The number of columns the model should have.
       *
       * @param table {qx.ui.table.Table}
       *   The table to which this column model is attached.
       */
      init: function init(colCount, table) {
        this.__P_408_4 = [];
        var width = qx.ui.table.columnmodel.Basic.DEFAULT_WIDTH;
        var headerRenderer = this.__P_408_5 || (this.__P_408_5 = new qx.ui.table.columnmodel.Basic.DEFAULT_HEADER_RENDERER());
        var dataRenderer = this.__P_408_6 || (this.__P_408_6 = new qx.ui.table.columnmodel.Basic.DEFAULT_DATA_RENDERER());
        var editorFactory = this.__P_408_7 || (this.__P_408_7 = new qx.ui.table.columnmodel.Basic.DEFAULT_EDITOR_FACTORY());
        this.__P_408_0 = [];
        this.__P_408_1 = []; // Get the initially hidden column array, if one was provided. Older
        // subclasses may not provide the 'table' argument, so we treat them
        // traditionally with no initially hidden columns.

        var initiallyHiddenColumns; // Was a table provided to us?

        if (table) {
          // Yup. Get its list of initially hidden columns, if the user provided
          // such a list.
          initiallyHiddenColumns = table.getInitiallyHiddenColumns();
        } // If no table was specified, or if the user didn't provide a list of
        // initially hidden columns, use an empty list.


        initiallyHiddenColumns = initiallyHiddenColumns || [];

        for (var col = 0; col < colCount; col++) {
          this.__P_408_4[col] = {
            width: width,
            headerRenderer: headerRenderer,
            dataRenderer: dataRenderer,
            editorFactory: editorFactory
          };
          this.__P_408_0[col] = col;
          this.__P_408_1[col] = col;
        }

        this.__P_408_3 = null; // If any columns are initially hidden, hide them now. Make it an
        // internal change so that events are not generated.

        this.__P_408_2 = true;

        for (var hidden = 0; hidden < initiallyHiddenColumns.length; hidden++) {
          this.setColumnVisible(initiallyHiddenColumns[hidden], false);
        }

        this.__P_408_2 = false;

        for (col = 0; col < colCount; col++) {
          var data = {
            col: col,
            visible: this.isColumnVisible(col)
          };
          this.fireDataEvent("visibilityChangedPre", data);
          this.fireDataEvent("visibilityChanged", data);
        }
      },

      /**
       * Return the array of visible columns
       *
       * @return {Array} List of all visible columns
       */
      getVisibleColumns: function getVisibleColumns() {
        return this.__P_408_1 != null ? this.__P_408_1 : [];
      },

      /**
       * Sets the width of a column.
       *
       * @param col {Integer}
       *   The model index of the column.
       *
       * @param width {Integer}
       *   The new width the column should get in pixels.
       *
       * @param isPointerAction {Boolean}
       *   <i>true</i> if the column width is being changed as a result of a
       *   pointer drag in the header; false or undefined otherwise.
       *
       */
      setColumnWidth: function setColumnWidth(col, width, isPointerAction) {
        var oldWidth = this.__P_408_4[col].width;

        if (oldWidth != width) {
          this.__P_408_4[col].width = width;
          var data = {
            col: col,
            newWidth: width,
            oldWidth: oldWidth,
            isPointerAction: isPointerAction || false
          };
          this.fireDataEvent("widthChanged", data);
        }
      },

      /**
       * Returns the width of a column.
       *
       * @param col {Integer} the model index of the column.
       * @return {Integer} the width of the column in pixels.
       */
      getColumnWidth: function getColumnWidth(col) {
        return this.__P_408_4[col].width;
      },

      /**
       * Sets the header renderer of a column. Use setHeaderCellRenderers
       * instead of this method if you want to set the header renderer of many
       * columns.
       *
       * @param col {Integer} the model index of the column.
       * @param renderer {qx.ui.table.IHeaderRenderer} the new header renderer the column
       *      should get.
       */
      setHeaderCellRenderer: function setHeaderCellRenderer(col, renderer) {
        var oldRenderer = this.__P_408_4[col].headerRenderer;

        if (oldRenderer !== this.__P_408_5) {
          oldRenderer.dispose();
        }

        this.__P_408_4[col].headerRenderer = renderer;

        if (!this.__P_408_2) {
          this.fireDataEvent("headerCellRendererChanged", {
            col: col
          });
        }
      },

      /**
       * Sets the header renderer of one or more columns. Use this method, in
       * favor of setHeaderCellRenderer, if you want to set the header renderer
       * of many columns. This method fires the "headerCellRendererChanged"
       * event only once, after setting all renderers, whereas
       * setHeaderCellRenderer fires it for each changed renderer which can be
       * slow with many columns.
       *
       * @param renderers {Map}
       *   Map, where the keys are column numbers and values are the renderers,
       *   implementing qx.ui.table.IHeaderRenderer, of the the new header
       *   renderers for that column
       */
      setHeaderCellRenderers: function setHeaderCellRenderers(renderers) {
        var col; // Prevent firing "headerCellRendererChanged" for each column. Instead,
        // we'll fire it once at the end.

        this.__P_408_2 = true; // For each listed column...

        for (col in renderers) {
          // ... set that column's renderer
          this.setHeaderCellRenderer(+col, renderers[col]);
        } // Turn off the internal-change flag so operation returns to normal


        this.__P_408_2 = false; // Now we can fire the event once. The data indicates which columns
        // changed. Internally to qooxdoo, nothing cares about the event data.

        this.fireDataEvent("headerCellRendererChanged", {
          cols: Object.keys(renderers)
        });
      },

      /**
       * Returns the header renderer of a column.
       *
       * @param col {Integer} the model index of the column.
       * @return {qx.ui.table.IHeaderRenderer} the header renderer of the column.
       */
      getHeaderCellRenderer: function getHeaderCellRenderer(col) {
        return this.__P_408_4[col].headerRenderer;
      },

      /**
       * Sets the data renderer of a column.
       *
       * @param col {Integer} the model index of the column.
       * @param renderer {qx.ui.table.ICellRenderer} the new data renderer
       *   the column should get.
       * @return {qx.ui.table.ICellRenderer?null} If an old renderer was set and
       *   it was not the default renderer, the old renderer is returned for
       *   pooling or disposing.
       */
      setDataCellRenderer: function setDataCellRenderer(col, renderer) {
        var oldRenderer = this.__P_408_4[col].dataRenderer;
        this.__P_408_4[col].dataRenderer = renderer;

        if (oldRenderer !== this.__P_408_6) {
          return oldRenderer;
        }

        return null;
      },

      /**
       * Returns the data renderer of a column.
       *
       * @param col {Integer} the model index of the column.
       * @return {qx.ui.table.ICellRenderer} the data renderer of the column.
       */
      getDataCellRenderer: function getDataCellRenderer(col) {
        return this.__P_408_4[col].dataRenderer;
      },

      /**
       * Sets the cell editor factory of a column.
       *
       * @param col {Integer} the model index of the column.
       * @param factory {qx.ui.table.ICellEditorFactory} the new cell editor factory the column should get.
       */
      setCellEditorFactory: function setCellEditorFactory(col, factory) {
        var oldFactory = this.__P_408_4[col].editorFactory;

        if (oldFactory === factory) {
          return;
        }

        if (oldFactory !== this.__P_408_7) {
          oldFactory.dispose();
        }

        this.__P_408_4[col].editorFactory = factory;
      },

      /**
       * Returns the cell editor factory of a column.
       *
       * @param col {Integer} the model index of the column.
       * @return {qx.ui.table.ICellEditorFactory} the cell editor factory of the column.
       */
      getCellEditorFactory: function getCellEditorFactory(col) {
        return this.__P_408_4[col].editorFactory;
      },

      /**
       * Returns the map that translates model indexes to x positions.
       *
       * The returned map contains for a model index (int) a map having two
       * properties: overX (the overall x position of the column, int) and
       * visX (the visible x position of the column, int). visX is missing for
       * hidden columns.
       *
       * @return {Map} the "column to x position" map.
       */
      _getColToXPosMap: function _getColToXPosMap() {
        if (this.__P_408_3 == null) {
          this.__P_408_3 = {};

          for (var overX = 0; overX < this.__P_408_0.length; overX++) {
            var col = this.__P_408_0[overX];
            this.__P_408_3[col] = {
              overX: overX
            };
          }

          for (var visX = 0; visX < this.__P_408_1.length; visX++) {
            var col = this.__P_408_1[visX];
            this.__P_408_3[col].visX = visX;
          }
        }

        return this.__P_408_3;
      },

      /**
       * Returns the number of visible columns.
       *
       * @return {Integer} the number of visible columns.
       */
      getVisibleColumnCount: function getVisibleColumnCount() {
        return this.__P_408_1 != null ? this.__P_408_1.length : 0;
      },

      /**
       * Returns the model index of a column at a certain visible x position.
       *
       * @param visXPos {Integer} the visible x position of the column.
       * @return {Integer} the model index of the column.
       */
      getVisibleColumnAtX: function getVisibleColumnAtX(visXPos) {
        return this.__P_408_1[visXPos];
      },

      /**
       * Returns the visible x position of a column.
       *
       * @param col {Integer} the model index of the column.
       * @return {Integer} the visible x position of the column.
       */
      getVisibleX: function getVisibleX(col) {
        return this._getColToXPosMap()[col].visX;
      },

      /**
       * Returns the overall number of columns (including hidden columns).
       *
       * @return {Integer} the overall number of columns.
       */
      getOverallColumnCount: function getOverallColumnCount() {
        return this.__P_408_0.length;
      },

      /**
       * Returns the model index of a column at a certain overall x position.
       *
       * @param overXPos {Integer} the overall x position of the column.
       * @return {Integer} the model index of the column.
       */
      getOverallColumnAtX: function getOverallColumnAtX(overXPos) {
        return this.__P_408_0[overXPos];
      },

      /**
       * Returns the overall x position of a column.
       *
       * @param col {Integer} the model index of the column.
       * @return {Integer} the overall x position of the column.
       */
      getOverallX: function getOverallX(col) {
        return this._getColToXPosMap()[col].overX;
      },

      /**
       * Returns whether a certain column is visible.
       *
       * @param col {Integer} the model index of the column.
       * @return {Boolean} whether the column is visible.
       */
      isColumnVisible: function isColumnVisible(col) {
        return this._getColToXPosMap()[col].visX != null;
      },

      /**
       * Sets whether a certain column is visible.
       *
       * @param col {Integer} the model index of the column.
       * @param visible {Boolean} whether the column should be visible.
       */
      setColumnVisible: function setColumnVisible(col, visible) {
        if (visible != this.isColumnVisible(col)) {
          if (visible) {
            var colToXPosMap = this._getColToXPosMap();

            var overX = colToXPosMap[col].overX;

            if (overX == null) {
              throw new Error("Showing column failed: " + col + ". The column is not added to this TablePaneModel.");
            } // get the visX of the next visible column after the column to show


            var nextVisX;

            for (var x = overX + 1; x < this.__P_408_0.length; x++) {
              var currCol = this.__P_408_0[x];
              var currVisX = colToXPosMap[currCol].visX;

              if (currVisX != null) {
                nextVisX = currVisX;
                break;
              }
            } // If there comes no visible column any more, then show the column
            // at the end


            if (nextVisX == null) {
              nextVisX = this.__P_408_1.length;
            } // Add the column to the visible columns


            this.__P_408_1.splice(nextVisX, 0, col);
          } else {
            var visX = this.getVisibleX(col);

            this.__P_408_1.splice(visX, 1);
          } // Invalidate the __colToXPosMap


          this.__P_408_3 = null; // Inform the listeners

          if (!this.__P_408_2) {
            var data = {
              col: col,
              visible: visible
            };
            this.fireDataEvent("visibilityChangedPre", data);
            this.fireDataEvent("visibilityChanged", data);
          }
        }
      },

      /**
       * Moves a column.
       *
       * @param fromOverXPos {Integer} the overall x position of the column to move.
       * @param toOverXPos {Integer} the overall x position of where the column should be
       *      moved to.
       */
      moveColumn: function moveColumn(fromOverXPos, toOverXPos) {
        this.__P_408_2 = true;
        var col = this.__P_408_0[fromOverXPos];
        var visible = this.isColumnVisible(col);

        if (visible) {
          this.setColumnVisible(col, false);
        }

        this.__P_408_0.splice(fromOverXPos, 1);

        this.__P_408_0.splice(toOverXPos, 0, col); // Invalidate the __colToXPosMap


        this.__P_408_3 = null;

        if (visible) {
          this.setColumnVisible(col, true);
        }

        this.__P_408_2 = false; // Inform the listeners

        var data = {
          col: col,
          fromOverXPos: fromOverXPos,
          toOverXPos: toOverXPos
        };
        this.fireDataEvent("orderChanged", data);
      },

      /**
       * Reorders all columns to new overall positions. Will fire one "orderChanged" event
       * without data afterwards
       *
       * @param newPositions {Integer[]} Array mapping the index of a column in table model to its wanted overall
       *                            position on screen (both zero based). If the table models holds
       *                            col0, col1, col2 and col3 and you give [1,3,2,0], the new column order
       *                            will be col1, col3, col2, col0
       */
      setColumnsOrder: function setColumnsOrder(newPositions) {
        if (newPositions.length == this.__P_408_0.length) {
          this.__P_408_2 = true; // Go through each column an switch visible ones to invisible. Reason is unknown,
          // this just mimicks the behaviour of moveColumn. Possibly useful because setting
          // a column visible later updates a map with its screen coords.

          var isVisible = new Array(newPositions.length);

          for (var colIdx = 0; colIdx < this.__P_408_0.length; colIdx++) {
            var visible = this.isColumnVisible(colIdx);
            isVisible[colIdx] = visible; //Remember, as this relies on this.__colToXPosMap which is cleared below

            if (visible) {
              this.setColumnVisible(colIdx, false);
            }
          } // Store new position values


          this.__P_408_0 = qx.lang.Array.clone(newPositions); // Invalidate the __colToXPosMap

          this.__P_408_3 = null; // Go through each column an switch invisible ones back to visible

          for (var colIdx = 0; colIdx < this.__P_408_0.length; colIdx++) {
            if (isVisible[colIdx]) {
              this.setColumnVisible(colIdx, true);
            }
          }

          this.__P_408_2 = false; // Inform the listeners. Do not add data as all known listeners in qooxdoo
          // only take this event to mean "total repaint necesscary". Fabian will look
          // after deprecating the data part of the orderChanged - event

          this.fireDataEvent("orderChanged");
        } else {
          throw new Error("setColumnsOrder: Invalid number of column positions given, expected " + this.__P_408_0.length + ", got " + newPositions.length);
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      for (var i = 0; i < this.__P_408_4.length; i++) {
        this.__P_408_4[i].headerRenderer.dispose();

        this.__P_408_4[i].dataRenderer.dispose();

        this.__P_408_4[i].editorFactory.dispose();
      }

      this.__P_408_0 = this.__P_408_1 = this.__P_408_4 = this.__P_408_3 = null;

      this._disposeObjects("__P_408_5", "__P_408_6", "__P_408_7");
    }
  });
  qx.ui.table.columnmodel.Basic.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Basic.js.map?dt=1731946693963