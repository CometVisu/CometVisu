(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.mobile.MobileTestCase": {
        "require": true
      },
      "qx.ui.mobile.form.renderer.Single": {},
      "qx.bom.element.Class": {},
      "qx.ui.mobile.form.Form": {},
      "qx.ui.mobile.form.TextField": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
  
  ************************************************************************ */

  qx.Class.define("qx.test.mobile.form.Form", {
    extend: qx.test.mobile.MobileTestCase,
    members: {
      __P_358_0: null,
      testValidation: function testValidation() {
        var form = this.__P_358_1();
        var renderer = new qx.ui.mobile.form.renderer.Single(form);
        this.getRoot().add(renderer);
        this.assertFalse(form.validate());
        this.assertEquals(2, renderer._getChildren()[1].getChildren().length);
        this.assertTrue(qx.bom.element.Class.has(renderer._getChildren()[1].getChildren()[1].getContainerElement(), "invalid"));
        this.__P_358_0.setValue("myusername");
        this.assertTrue(form.validate());
        this.assertEquals(2, renderer._getChildren()[1].getChildren().length);
        this.assertFalse(qx.bom.element.Class.has(renderer._getChildren()[1]._getChildren()[1].getContainerElement(), "invalid"));
        this.__P_358_0.dispose();
        renderer.dispose();
        form.dispose();
      },
      __P_358_1: function __P_358_1() {
        var form = new qx.ui.mobile.form.Form();
        var validationManager = form.getValidationManager();
        var username = this.__P_358_0 = new qx.ui.mobile.form.TextField().set({
          placeholder: "Username"
        });
        username.setRequired(true);
        form.add(username, "Username: ");
        validationManager.add(username, function (value, item) {
          var valid = value != null && value.length > 3;
          if (!valid) {
            item.setInvalidMessage("username should have more than 3 characters!");
          }
          return valid;
        }, this);
        return form;
      }
    }
  });
  qx.test.mobile.form.Form.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Form.js.map?dt=1731948117742