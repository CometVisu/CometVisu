(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.TextField": {
        "require": true
      },
      "qx.html.Input": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
  
  ************************************************************************ */

  /**
   * A password input field, which hides the entered text.
   */
  qx.Class.define("qx.ui.form.PasswordField", {
    extend: qx.ui.form.TextField,
    members: {
      // overridden
      _createInputElement: function _createInputElement() {
        return new qx.html.Input("password");
      }
    }
  });
  qx.ui.form.PasswordField.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PasswordField.js.map?dt=1588446015093