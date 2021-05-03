(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.dialog.Dialog": {},
      "qx.ui.form.RadioGroup": {},
      "qx.ui.form.RadioButton": {}
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
  qx.Class.define("qxl.dialog.formElement.RadioGroup", {
    statics: {
      register: function register() {
        qxl.dialog.Dialog.registerFormElementHandlers("radiogroup", this._registration);
      },
      _registration: {
        initElement: function initElement(fieldType, fieldData, key) {
          var formElement = new qx.ui.form.RadioGroup();

          if (fieldData.orientation) {
            formElement.setUserData("orientation", fieldData.orientation);
          }

          fieldData.options.forEach(function (item) {
            var radioButton = new qx.ui.form.RadioButton(item.label);
            radioButton.setUserData("value", item.value !== undefined ? item.value : item.label);
            formElement.add(radioButton);
          }, this);
          return formElement;
        },
        addToFormController: function addToFormController(fieldType, fieldData, key, formElement) {
          this._formController.addTarget(formElement, "selection", key, true, {
            converter: function (value) {
              var selectables = formElement.getSelectables();
              var selection = [];

              if (value) {
                selectables.forEach(function (selectable) {
                  var sValue = selectable.getUserData("value");

                  if (sValue === value) {
                    selection = [selectable];
                  }
                }, this);
              }

              return selection;
            }.bind(this)
          }, {
            converter: function converter(selection) {
              var value = selection[0].getUserData("value");
              return value;
            }
          });
        }
      }
    }
  });
  qxl.dialog.formElement.RadioGroup.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RadioGroup.js.map?dt=1620070409317