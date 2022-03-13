(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.table.celleditor.AbstractField": {
        "require": true
      },
      "qx.ui.form.PasswordField": {}
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
   * A cell editor factory creating password fields fields.
   */
  qx.Class.define("qx.ui.table.celleditor.PasswordField", {
    extend: qx.ui.table.celleditor.AbstractField,
    members: {
      _createEditor: function _createEditor() {
        var cellEditor = new qx.ui.form.PasswordField();
        cellEditor.setAppearance("table-editor-textfield");
        return cellEditor;
      }
    }
  });
  qx.ui.table.celleditor.PasswordField.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PasswordField.js.map?dt=1647153249763