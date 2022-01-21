(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.dialog.Dialog": {},
      "qx.ui.form.SelectBox": {},
      "qx.data.marshal.Json": {},
      "qx.data.controller.List": {}
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
  qx.Class.define("qxl.dialog.formElement.SelectBox", {
    statics: {
      register: function register() {
        qxl.dialog.Dialog.registerFormElementHandlers("selectbox", this._registration);
      },
      _registration: {
        initElement: function initElement(fieldType, fieldData, key) {
          var formElement = new qx.ui.form.SelectBox();
          var model = qx.data.marshal.Json.createModel(fieldData.options);
          new qx.data.controller.List(model, formElement, "label");
          return formElement;
        },
        addToFormController: function addToFormController(fieldType, fieldData, key, formElement) {
          this._formController.addTarget(formElement, "selection", key, true, {
            converter: function (value) {
              var selected = null;
              var selectables = formElement.getSelectables();
              selectables.forEach(function (selectable) {
                if (selectable.getModel().getValue() === value) {
                  selected = selectable;
                }
              }, this);

              if (!selected) {
                return [selectables[0]];
              }

              return [selected];
            }.bind(this)
          }, {
            converter: function converter(selection) {
              var value = selection[0].getModel().getValue();
              return value;
            }
          });
        }
      }
    }
  });
  qxl.dialog.formElement.SelectBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SelectBox.js.map?dt=1642787831866