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
      "qx.ui.mobile.form.ToggleButton": {},
      "qx.bom.element.Class": {}
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

  qx.Class.define("qx.test.mobile.form.ToggleButton", {
    extend: qx.test.mobile.MobileTestCase,
    members: {
      testValue: function testValue() {
        var button = new qx.ui.mobile.form.ToggleButton(true);
        this.getRoot().add(button);
        this.assertBoolean(button.getValue());
        this.assertTrue(button.getValue());
        this.assertTrue(qx.bom.element.Class.has(button.getContentElement(), "checked"));
        this.assertEventFired(button, "changeValue", function () {
          button.setValue(false);
        });
        this.assertFalse(button.getValue());
        button.destroy();
      },
      testToggle: function testToggle() {
        var button = new qx.ui.mobile.form.ToggleButton(true);
        this.getRoot().add(button);
        this.assertBoolean(button.getValue());
        this.assertTrue(button.getValue());
        button.toggle();
        this.assertFalse(button.getValue());
        button.toggle();
        this.assertTrue(button.getValue());
        button.destroy();
      }
    }
  });
  qx.test.mobile.form.ToggleButton.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ToggleButton.js.map?dt=1735383862756