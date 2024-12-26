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
      "qx.ui.form.VirtualSelectBox": {},
      "qx.ui.form.VirtualComboBox": {},
      "qx.data.Array": {}
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
  qx.Class.define("qx.test.ui.form.AbstractVirtualBox", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      setUp: function setUp() {
        this.__P_392_0 = new qx.ui.form.VirtualSelectBox();
        this.getRoot().add(this.__P_392_0);
        this.__P_392_1 = new qx.ui.form.VirtualComboBox();
        this.getRoot().add(this.__P_392_1);
        this.flush();
      },
      tearDown: function tearDown() {
        qx.test.ui.form.AbstractVirtualBox.superclass.prototype.tearDown.call(this);
        this.__P_392_0.dispose();
        this.__P_392_0 = null;
        this.__P_392_1.dispose();
        this.__P_392_1 = null;
      },
      testStatePopupOpen: function testStatePopupOpen() {
        this.__P_392_0.open();
        this.flush();
        this.assertTrue(this.__P_392_0.hasState("popupOpen"));
        this.__P_392_0.close();
        this.flush();
        this.assertFalse(this.__P_392_0.hasState("popupOpen"));
        this.__P_392_1.open();
        this.flush();
        this.assertTrue(this.__P_392_1.hasState("popupOpen"));
        this.__P_392_1.close();
        this.flush();
        this.assertFalse(this.__P_392_1.hasState("popupOpen"));
      },
      testListLengthAfterModelChangeSelectBox: function testListLengthAfterModelChangeSelectBox() {
        var model = new qx.data.Array(["a", "b", "c"]);
        this.__P_392_0.setModel(model);
        this.__P_392_0.open();
        this.flush();
        var dropDown = this.__P_392_0.getChildControl("dropdown");
        var firstHeight = dropDown.getBounds().height;
        this.assertPositiveInteger(firstHeight);
        model.replace(["d", "e", "f", "g", "h", "j", "k", "l"]);
        this.flush();
        var secondHeight = dropDown.getBounds().height;
        this.assertPositiveInteger(secondHeight);
        this.assertNotEquals(secondHeight, firstHeight);
        this.assertTrue(secondHeight > firstHeight);
        this.__P_392_0.close();
        this.__P_392_0.resetModel();
      },
      testListLengthAfterModelChangeComboBox: function testListLengthAfterModelChangeComboBox() {
        var model = new qx.data.Array(["a", "b", "c"]);
        this.__P_392_1.setModel(model);
        this.__P_392_1.open();
        this.flush();
        var dropDown = this.__P_392_1.getChildControl("dropdown");
        var firstHeight = dropDown.getBounds().height;
        this.assertPositiveInteger(firstHeight);
        model.replace(["d", "e", "f", "g", "h", "j", "k", "l"]);
        this.flush();
        var secondHeight = dropDown.getBounds().height;
        this.assertPositiveInteger(secondHeight);
        this.assertNotEquals(secondHeight, firstHeight);
        this.assertTrue(secondHeight > firstHeight);
        this.__P_392_1.close();
        this.__P_392_1.resetModel();
      }
    }
  });
  qx.test.ui.form.AbstractVirtualBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractVirtualBox.js.map?dt=1735222431280