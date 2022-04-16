(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.dialog.Dialog": {
        "require": true
      },
      "qxl.dialog.MForm": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo dialog library
     https://github.com/qooxdoo/qxl.dialog
  
     Copyright:
       2007-2020 Christian Boulanger and others
  
     License:
       LGPL: http://www.gnu.org/licenses/lgpl.html
       EPL: http://www.eclipse.org/org/documents/epl-v10.php
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       *  Christian Boulanger (cboulanger)
       *  Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * A dialog with a form that is constructed on-the-fly
   */
  qx.Class.define("qxl.dialog.Form", {
    extend: qxl.dialog.Dialog,
    include: [qxl.dialog.MForm],
    members: {
      /**
       * Create OK Button
       * unlike our superclass, we do not add an appear listener to focus OK
       * @override
       * @return {qx.ui.form.Button}
       */
      _createOkButton: function _createOkButton() {
        return qxl.dialog.Form.prototype._createOkButton.base.call(this, true);
      }
    }
  });
  qxl.dialog.Form.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Form.js.map?dt=1650122806148