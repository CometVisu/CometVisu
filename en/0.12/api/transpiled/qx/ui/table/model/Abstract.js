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
      "qx.ui.table.ITableModel": {
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
  
  ************************************************************************ */

  /**
   * An abstract table model that performs the column handling, so subclasses only
   * need to care for row handling.
   */
  qx.Class.define("qx.ui.table.model.Abstract", {
    type: "abstract",
    extend: qx.core.Object,
    implement: qx.ui.table.ITableModel,
    events: {
      /**
       * Fired when the table data changed (the stuff shown in the table body).
       * The data property of the event will be a map having the following
       * attributes:
       * <ul>
       *   <li>firstRow: The index of the first row that has changed.</li>
       *   <li>lastRow: The index of the last row that has changed.</li>
       *   <li>firstColumn: The model index of the first column that has changed.</li>
       *   <li>lastColumn: The model index of the last column that has changed.</li>
       * </ul>
       *
       * Additionally, if the data changed as a result of rows being removed
       * from the data model, then these additional attributes will be in the
       * data:
       * <ul>
       *   <li>removeStart: The model index of the first row that was removed.</li>
       *   <li>removeCount: The number of rows that were removed.</li>
       * </ul>
       */
      "dataChanged": "qx.event.type.Data",

      /**
       * Fired when the meta data changed (the stuff shown in the table header).
       */
      "metaDataChanged": "qx.event.type.Event",

      /**
       * Fired after the table is sorted (but before the metaDataChanged event)
       */
      "sorted": "qx.event.type.Data"
    },
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_411_0 = [];
      this.__P_411_1 = [];
      this.__P_411_2 = {};
    },
    members: {
      __P_411_0: null,
      __P_411_1: null,
      __P_411_2: null,
      __P_411_3: null,

      /**
       * Initialize the table model <--> table interaction. The table model is
       * passed to the table constructor, but the table model doesn't otherwise
       * know anything about the table nor can it operate on table
       * properties. This function provides the capability for the table model
       * to specify characteristics of the table. It is called when the table
       * model is applied to the table.
       *
       * @param table {qx.ui.table.Table}
       *   The table to which this model is attached
       */
      init: function init(table) {// default implementation has nothing to do
      },

      /**
       * Abstract method
       * @throws {Error} An error if this method is called.
       */
      getRowCount: function getRowCount() {
        throw new Error("getRowCount is abstract");
      },
      getRowData: function getRowData(rowIndex) {
        return null;
      },
      isColumnEditable: function isColumnEditable(columnIndex) {
        return false;
      },
      isColumnSortable: function isColumnSortable(columnIndex) {
        return false;
      },
      sortByColumn: function sortByColumn(columnIndex, ascending) {},
      getSortColumnIndex: function getSortColumnIndex() {
        return -1;
      },
      isSortAscending: function isSortAscending() {
        return true;
      },
      prefetchRows: function prefetchRows(firstRowIndex, lastRowIndex) {},

      /**
       * Abstract method
       *
       * @param columnIndex {Integer} the index of the column
       * @param rowIndex {Integer} the index of the row
       *
       * @throws {Error} An error if this method is called.
       */
      getValue: function getValue(columnIndex, rowIndex) {
        throw new Error("getValue is abstract");
      },
      getValueById: function getValueById(columnId, rowIndex) {
        return this.getValue(this.getColumnIndexById(columnId), rowIndex);
      },

      /**
       * Abstract method
       *
       * @param columnIndex {Integer} index of the column
       * @param rowIndex {Integer} index of the row
       * @param value {var} Value to be set
       *
       * @throws {Error} An error if this method is called.
       */
      setValue: function setValue(columnIndex, rowIndex, value) {
        throw new Error("setValue is abstract");
      },
      setValueById: function setValueById(columnId, rowIndex, value) {
        this.setValue(this.getColumnIndexById(columnId), rowIndex, value);
      },
      // overridden
      getColumnCount: function getColumnCount() {
        return this.__P_411_0.length;
      },
      // overridden
      getColumnIndexById: function getColumnIndexById(columnId) {
        return this.__P_411_2[columnId];
      },
      // overridden
      getColumnId: function getColumnId(columnIndex) {
        return this.__P_411_0[columnIndex];
      },
      // overridden
      getColumnName: function getColumnName(columnIndex) {
        return this.__P_411_1[columnIndex];
      },

      /**
       * Sets the column IDs. These IDs may be used internally to identify a
       * column.
       *
       * Note: This will clear previously set column names.
       *
       *
       * @param columnIdArr {String[]} the IDs of the columns.
       * @see #setColumns
       */
      setColumnIds: function setColumnIds(columnIdArr) {
        this.__P_411_0 = columnIdArr; // Create the reverse map

        this.__P_411_2 = {};

        for (var i = 0; i < columnIdArr.length; i++) {
          this.__P_411_2[columnIdArr[i]] = i;
        }

        this.__P_411_1 = new Array(columnIdArr.length); // Inform the listeners

        if (!this.__P_411_3) {
          this.fireEvent("metaDataChanged");
        }
      },

      /**
       * Sets the column names. These names will be shown to the user.
       *
       * Note: The column IDs have to be defined before.
       *
       *
       * @param columnNameArr {String[]} the names of the columns.
       * @throws {Error} If the amount of given columns is different from the table.
       * @see #setColumnIds
       */
      setColumnNamesByIndex: function setColumnNamesByIndex(columnNameArr) {
        if (this.__P_411_0.length != columnNameArr.length) {
          throw new Error("this.__columnIdArr and columnNameArr have different length: " + this.__P_411_0.length + " != " + columnNameArr.length);
        }

        this.__P_411_1 = columnNameArr; // Inform the listeners

        this.fireEvent("metaDataChanged");
      },

      /**
       * Sets the column names. These names will be shown to the user.
       *
       * Note: The column IDs have to be defined before.
       *
       *
       * @param columnNameMap {Map} a map containing the column IDs as keys and the
       *          column name as values.
       * @see #setColumnIds
       */
      setColumnNamesById: function setColumnNamesById(columnNameMap) {
        this.__P_411_1 = new Array(this.__P_411_0.length);

        for (var i = 0; i < this.__P_411_0.length; ++i) {
          this.__P_411_1[i] = columnNameMap[this.__P_411_0[i]];
        }
      },

      /**
       * Sets the column names (and optionally IDs)
       *
       * Note: You can not change the _number_ of columns this way.  The number
       *       of columns is highly intertwined in the entire table operation,
       *       and dynamically changing it would require as much work as just
       *       recreating your table.  If you must change the number of columns
       *       in a table then you should remove the table and add a new one.
       *
       * @param columnNameArr {String[]}
       *   The column names. These names will be shown to the user.
       *
       * @param columnIdArr {String[] ? null}
       *   The column IDs. These IDs may be used internally to identify a
       *   column. If null, the column names are used as IDs unless ID values
       *   have already been set. If ID values have already been set, they will
       *   continue to be used if no ID values are explicitly provided here.
       *
       * @throws {Error} If the amount of given columns is different from the table.
       *
       */
      setColumns: function setColumns(columnNameArr, columnIdArr) {
        var bSetIds = this.__P_411_0.length == 0 || columnIdArr;

        if (columnIdArr == null) {
          if (this.__P_411_0.length == 0) {
            columnIdArr = columnNameArr;
          } else {
            columnIdArr = this.__P_411_0;
          }
        }

        if (columnIdArr.length != columnNameArr.length) {
          throw new Error("columnIdArr and columnNameArr have different length: " + columnIdArr.length + " != " + columnNameArr.length);
        }

        if (bSetIds) {
          this.__P_411_3 = true;
          this.setColumnIds(columnIdArr);
          this.__P_411_3 = false;
        }

        this.setColumnNamesByIndex(columnNameArr);
      }
    },
    destruct: function destruct() {
      this.__P_411_0 = this.__P_411_1 = this.__P_411_2 = null;
    }
  });
  qx.ui.table.model.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Abstract.js.map?dt=1674150486807