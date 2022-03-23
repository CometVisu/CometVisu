(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.dialog.Dialog": {},
      "qx.ui.form.CheckBox": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo dialog library
     https://github.com/qooxdoo/qxl.dialog
  
     Copyright:
       2020 Christian Boulanger, Derrell Lipman
  
     License:
       LGPL: http://www.gnu.org/licenses/lgpl.html
       EPL: http://www.eclipse.org/org/documents/epl-v10.php
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       *  Christian Boulanger (cboulanger)
       *  Derrell Lipman (derrell)
  
  ************************************************************************ */
  qx.Class.define("qxl.dialog.formElement.CheckBox", {
    statics: {
      register: function register() {
        qxl.dialog.Dialog.registerFormElementHandlers("checkbox", this._registration);
      },
      _registration: {
        initElement: function initElement(fieldType, fieldData, key) {
          var formElement = new qx.ui.form.CheckBox(fieldData.label);
          return formElement;
        },
        addToFormController: function addToFormController(fieldType, fieldData, key, formElement) {
          this._formController.addTarget(formElement, "value", key, true, null);
        }
      }
    }
  });
  qxl.dialog.formElement.CheckBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CheckBox.js.map?dt=1648068897548