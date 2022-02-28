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
      "qx.ui.table.ICellEditorFactory": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 Christian Boulanger
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (cboulanger)
  
  ************************************************************************ */

  /**
   * A cell editor factory which can dynamically exchange the cell editor
   * based on information retrieved at runtime. This is useful when different
   * rows in a column should have different cellEditors based on cell content
   * or row meta data. A typical example would be a spreadsheet that has different
   * kind of data in one column.
   *
   */
  qx.Class.define("qx.ui.table.celleditor.Dynamic", {
    extend: qx.core.Object,
    implement: qx.ui.table.ICellEditorFactory,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param cellEditorFactoryFunction {Function?null} the factory function
     *    {@link #cellEditorFactoryFunction}.
     */
    construct: function construct(cellEditorFactoryFunction) {
      qx.core.Object.constructor.call(this);

      if (cellEditorFactoryFunction) {
        this.setCellEditorFactoryFunction(cellEditorFactoryFunction);
      }

      this.__P_401_0 = {};
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * Function that returns a cellEditorFactory instance which will be
       * used for the row that is currently being edited. The function is
       * defined like this:
       * <pre class="javascript">
       * myTable.getTableColumnModel().setCellEditorFactory(function(cellInfo){
       *   // based on the cellInfo map or other information, return the
       *   // appropriate cellEditorFactory
       *   if (cellInfo.row == 5)
       *     return new qx.ui.table.celleditor.CheckBox;
       *   else
       *     return new qx.ui.table.celleditor.TextField;
       * });
       * </pre>
       **/
      cellEditorFactoryFunction: {
        check: "Function",
        nullable: true,
        init: null
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_401_1: null,
      __P_401_0: null,

      /**
       * Creates the cell editor based on the cellEditorFactory instance
       * returned by the function stored in the cellEditorFactoryFunction
       * property. Passes the cellInfo map to the function.
       *
       * @param cellInfo {Map} A map containing the information about the cell to
       *      create.
       * @return {qx.ui.core.Widget}
       */
      createCellEditor: function createCellEditor(cellInfo) {
        var cellEditorFactoryFunction = this.getCellEditorFactoryFunction();
        this.__P_401_1 = cellEditorFactoryFunction(cellInfo);

        var cellEditor = this.__P_401_1.createCellEditor(cellInfo); // save the cell info to the editor (needed for getting the value)


        this.__P_401_0[cellEditor.toHashCode()] = cellInfo;
        return cellEditor;
      },
      // interface implementation
      getCellEditorValue: function getCellEditorValue(cellEditor) {
        var cellEditorFactoryFunction = this.getCellEditorFactoryFunction();

        var cellInfo = this.__P_401_0[cellEditor.toHashCode()]; // update the propper factory


        this.__P_401_1 = cellEditorFactoryFunction(cellInfo);

        var value = this.__P_401_1.getCellEditorValue(cellEditor);

        return value;
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__P_401_1 = null;
    }
  });
  qx.ui.table.celleditor.Dynamic.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Dynamic.js.map?dt=1646073062155