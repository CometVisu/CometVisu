(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.dialog.Dialog": {},
      "qx.ui.form.ComboBox": {},
      "qx.ui.form.ListItem": {}
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
  qx.Class.define("qxl.dialog.formElement.ComboBox", {
    statics: {
      register: function register() {
        qxl.dialog.Dialog.registerFormElementHandlers("combobox", this._registration);
      },
      _registration: {
        initElement: function initElement(fieldType, fieldData, key) {
          var formElement = new qx.ui.form.ComboBox();
          fieldData.options.forEach(function (item) {
            var listItem = new qx.ui.form.ListItem(item.label, item.icon);
            formElement.add(listItem);
          });
          return formElement;
        },
        addToFormController: function addToFormController(fieldType, fieldData, key, formElement) {
          this._formController.addTarget(formElement, "value", key, true, null, {
            converter: function (value) {
              this._form.getValidationManager().validate();

              return value;
            }.bind(this)
          });
        }
      }
    }
  });
  qxl.dialog.formElement.ComboBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ComboBox.js.map?dt=1650269573333