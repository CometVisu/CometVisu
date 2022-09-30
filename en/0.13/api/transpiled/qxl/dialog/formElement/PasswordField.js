(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.dialog.Dialog": {},
      "qx.ui.form.PasswordField": {}
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
  qx.Class.define("qxl.dialog.formElement.PasswordField", {
    statics: {
      register: function register() {
        qxl.dialog.Dialog.registerFormElementHandlers("passwordfield", this._registration);
      },
      _registration: {
        initElement: function initElement(fieldType, fieldData, key) {
          var formElement = new qx.ui.form.PasswordField();
          formElement.getContentElement().setAttribute("autocomplete", "password");
          formElement.setLiveUpdate(true);
          return formElement;
        },
        addToFormController: function addToFormController(fieldType, fieldData, key, formElement) {
          this._formController.addTarget(formElement, "value", key, true, null, {
            converter: function (value) {
              this._form.getValidationManager().validate();

              return value;
            }.bind(this)
          });
        },
        postProcess: function postProcess(fieldType, fieldData, key, formElement) {
          /*
           * This allows changing the default autocomplete behavior to disable
           * autocomplete on all text and password fields unless allowed at
           * either the form level or at the field level using the
           * allowBrowserAutocomplete key.
           */
          if (typeof fieldData.allowBrowserAutocomplete == "boolean") {
            if (!fieldData.allowBrowserAutocomplete) {
              //turn off autocomplete
              formElement.getContentElement().setAttribute("autocomplete", "new-password");
            } else {// leave autocomplete alone.
              // Note: Password field above sets attribute
            }
          } else if (!this.getAllowBrowserAutocomplete()) {
            //turn off autocomplete
            formElement.getContentElement().setAttribute("autocomplete", "new-password");
          }
        }
      }
    }
  });
  qxl.dialog.formElement.PasswordField.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PasswordField.js.map?dt=1664549005553