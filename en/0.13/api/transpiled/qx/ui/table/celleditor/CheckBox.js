(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.ui.table.ICellEditorFactory": {
        "require": true
      },
      "qx.ui.container.Composite": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.form.CheckBox": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 David Perez
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * David Perez (david-perez)
  
  ************************************************************************ */

  /**
   * For editing boolean data in a checkbox. It is advisable to use this in
   * conjunction with {@link qx.ui.table.cellrenderer.Boolean}.
   */
  qx.Class.define("qx.ui.table.celleditor.CheckBox", {
    extend: qx.core.Object,
    implement: qx.ui.table.ICellEditorFactory,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      // interface implementation
      createCellEditor: function createCellEditor(cellInfo) {
        var editor = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
          alignX: "center",
          alignY: "middle"
        })).set({
          focusable: true
        });
        var checkbox = new qx.ui.form.CheckBox().set({
          value: cellInfo.value
        });
        editor.add(checkbox); // propagate focus

        editor.addListener("focus", function () {
          checkbox.focus();
        }); // propagate active state

        editor.addListener("activate", function () {
          checkbox.activate();
        });
        return editor;
      },
      // interface implementation
      getCellEditorValue: function getCellEditorValue(cellEditor) {
        return cellEditor.getChildren()[0].getValue();
      }
    }
  });
  qx.ui.table.celleditor.CheckBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CheckBox.js.map?dt=1646073062104