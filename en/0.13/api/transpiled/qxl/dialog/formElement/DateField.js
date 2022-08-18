(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.dialog.Dialog": {},
      "qx.ui.form.DateField": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo dialog library
     https://github.com/qooxdoo/qxl.dialog
  
     Copyright:
       2020 Christian Boulanger, rDerrell Lipman
  
     License:
       LGPL: http://www.gnu.org/licenses/lgpl.html
       EPL: http://www.eclipse.org/org/documents/epl-v10.php
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       *  Christian Boulanger (cboulanger)
       *  Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * @asset(qx/icon/*)
  */
  qx.Class.define("qxl.dialog.formElement.DateField", {
    statics: {
      register: function register() {
        qxl.dialog.Dialog.registerFormElementHandlers("datefield", this._registration);
      },
      _registration: {
        initElement: function initElement(fieldType, fieldData, key) {
          var formElement = new qx.ui.form.DateField();

          if (fieldData.dateFormat) {
            formElement.setDateFormat(fieldData.dateFormat);
          }

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
  qxl.dialog.formElement.DateField.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DateField.js.map?dt=1660800185055