(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.LayoutTestCase": {
        "require": true
      },
      "qx.ui.table.model.Simple": {},
      "qx.ui.table.Table": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.table.columnmodel.Basic", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      createModel: function createModel() {
        var tableModel = new qx.ui.table.model.Simple();
        tableModel.setColumns(["ID", "A number", "String", "A date", "Boolean"]);
        tableModel.setData(this.createRandomRows(5));
        return tableModel;
      },
      createRandomRows: function createRandomRows(rowCount) {
        var rowData = [];
        var nextId = 0;
        var strings = ["a", "b", "c", "d"];
        for (var row = 0; row < rowCount; row++) {
          var date = new Date(row * row * row);
          var number = row % 2 == 0 ? row / 2 : NaN;
          rowData.push([nextId++, number, strings[row % 4], date, row % 2 == 1]);
        }
        return rowData;
      },
      testSetColumnWidth: function testSetColumnWidth() {
        var model = this.createModel();
        var table = new qx.ui.table.Table(model);
        var tcm = table.getTableColumnModel();
        table.destroy();
        model.dispose();
      },
      testGetColumnWidth: function testGetColumnWidth() {
        var model = this.createModel();
        var table = new qx.ui.table.Table(model);
        var tcm = table.getTableColumnModel();
        table.destroy();
        model.dispose();
      },
      testSetHeaderCellRenderer: function testSetHeaderCellRenderer() {
        var model = this.createModel();
        var table = new qx.ui.table.Table(model);
        var tcm = table.getTableColumnModel();
        table.destroy();
        model.dispose();
      },
      testGetHeaderCellRenderer: function testGetHeaderCellRenderer() {
        var model = this.createModel();
        var table = new qx.ui.table.Table(model);
        var tcm = table.getTableColumnModel();
        table.destroy();
        model.dispose();
      },
      testSetDataCellRenderer: function testSetDataCellRenderer() {
        var model = this.createModel();
        var table = new qx.ui.table.Table(model);
        var tcm = table.getTableColumnModel();
        table.destroy();
        model.dispose();
      },
      testGetDataCellRenderer: function testGetDataCellRenderer() {
        var model = this.createModel();
        var table = new qx.ui.table.Table(model);
        var tcm = table.getTableColumnModel();
        table.destroy();
        model.dispose();
      },
      testSetCellEditorFactory: function testSetCellEditorFactory() {
        var model = this.createModel();
        var table = new qx.ui.table.Table(model);
        var tcm = table.getTableColumnModel();
        table.destroy();
        model.dispose();
      },
      testGetCellEditorFactory: function testGetCellEditorFactory() {
        var model = this.createModel();
        var table = new qx.ui.table.Table(model);
        var tcm = table.getTableColumnModel();
        table.destroy();
        model.dispose();
      }
    }
  });
  qx.test.ui.table.columnmodel.Basic.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Basic.js.map?dt=1735341782434