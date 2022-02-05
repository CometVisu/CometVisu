(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.dialog.Dialog": {},
      "qx.ui.form.Spinner": {},
      "qx.util.format.NumberFormat": {}
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
  qx.Class.define("qxl.dialog.formElement.Spinner", {
    statics: {
      register: function register() {
        qxl.dialog.Dialog.registerFormElementHandlers("spinner", this._registration);
      },
      _registration: {
        initElement: function initElement(fieldType, fieldData, key) {
          var formElement = new qx.ui.form.Spinner();

          if (fieldData.min) {
            formElement.setMinimum(fieldData.min);
          }

          if (fieldData.max) {
            formElement.setMaximum(fieldData.max);
          }

          if (fieldData.step) {
            formElement.setSingleStep(fieldData.step);
          }

          if (fieldData.fractionsDigits) {
            var fd = fieldData.fractionsDigits;
            var nf = new qx.util.format.NumberFormat();

            if (fd.min) {
              nf.setMinimumFractionDigits(fd.min);
            }

            if (fd.max) {
              nf.setMaximumFractionDigits(fd.max);
            }

            formElement.setNumberFormat(nf);
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
  qxl.dialog.formElement.Spinner.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Spinner.js.map?dt=1644052399858