(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.dialog.Dialog": {}
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
  qx.Class.define("qxl.dialog.formElement.GroupHeader", {
    statics: {
      register: function register() {
        qxl.dialog.Dialog.registerFormElementHandlers("groupheader", this._registration);
      },
      _registration: {
        initElement: function initElement(fieldType, fieldData, key) {
          this._form.addGroupHeader(fieldData.label); // Headers don't return a form object


          return undefined;
        }
      }
    }
  });
  qxl.dialog.formElement.GroupHeader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=GroupHeader.js.map?dt=1646073075524