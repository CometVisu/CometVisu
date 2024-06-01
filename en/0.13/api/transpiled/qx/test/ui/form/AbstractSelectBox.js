(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.LayoutTestCase": {
        "require": true
      },
      "qx.ui.form.SelectBox": {},
      "qx.ui.form.ComboBox": {}
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
       * Alexander Steitz (aback)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.form.AbstractSelectBox", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      setUp: function setUp() {
        this.__P_390_0 = new qx.ui.form.SelectBox();
        this.getRoot().add(this.__P_390_0);
        this.__P_390_1 = new qx.ui.form.ComboBox();
        this.getRoot().add(this.__P_390_1);
        this.flush();
      },
      tearDown: function tearDown() {
        qx.test.ui.form.AbstractSelectBox.superclass.prototype.tearDown.call(this);
        this.__P_390_0.dispose();
        this.__P_390_0 = null;
        this.__P_390_1.dispose();
        this.__P_390_1 = null;
      },
      testStatePopupOpen: function testStatePopupOpen() {
        this.__P_390_0.open();
        this.flush();
        this.assertTrue(this.__P_390_0.hasState("popupOpen"));
        this.__P_390_0.close();
        this.flush();
        this.assertFalse(this.__P_390_0.hasState("popupOpen"));
        this.__P_390_1.open();
        this.flush();
        this.assertTrue(this.__P_390_1.hasState("popupOpen"));
        this.__P_390_1.close();
        this.flush();
        this.assertFalse(this.__P_390_1.hasState("popupOpen"));
      }
    }
  });
  qx.test.ui.form.AbstractSelectBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractSelectBox.js.map?dt=1717235393719