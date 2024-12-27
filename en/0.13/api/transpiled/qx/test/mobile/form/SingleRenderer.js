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
      "qx.ui.mobile.form.Form": {},
      "qx.ui.mobile.form.Button": {},
      "qx.ui.mobile.form.TextField": {},
      "qx.data.Array": {},
      "qx.ui.mobile.form.SelectBox": {},
      "qx.ui.mobile.form.renderer.Single": {}
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

  qx.Class.define("qx.test.mobile.form.SingleRenderer", {
    extend: qx.test.mobile.MobileTestCase,
    members: {
      __P_360_0: null,
      __P_360_1: null,
      __P_360_2: null,
      __P_360_3: null,
      setUp: function setUp() {
        qx.test.mobile.form.SingleRenderer.superclass.prototype.setUp.call(this);
        this.__P_360_0 = new qx.ui.mobile.form.Form();
        this.__P_360_1 = new qx.ui.mobile.form.Button("a");
        this.__P_360_0.addButton(this.__P_360_1);
        this.__P_360_2 = new qx.ui.mobile.form.TextField("test");
        this.__P_360_0.add(this.__P_360_2, "label");
        var dd = new qx.data.Array(["1"]);
        this.__P_360_3 = new qx.ui.mobile.form.SelectBox();
        this.__P_360_3.setModel(dd);
        this.__P_360_0.add(this.__P_360_3, "select");
        this.__P_360_4 = new qx.ui.mobile.form.renderer.Single(this.__P_360_0);
        this.getRoot().add(this.__P_360_4);
      },
      tearDown: function tearDown() {
        this.__P_360_1.dispose();
        this.__P_360_2.dispose();
        this.__P_360_3.dispose();
        this.__P_360_0.dispose();
        this.__P_360_4.dispose();
        qx.test.mobile.form.SingleRenderer.superclass.prototype.tearDown.call(this);
      },
      testShowHideRow: function testShowHideRow() {
        this.__P_360_4.hideItem(this.__P_360_1);
        var isHidden = this.__P_360_1.getLayoutParent().hasCssClass("exclude");
        this.assertTrue(isHidden, "Buttons parent is expected to contain 'exclude' class");
        this.__P_360_4.showItem(this.__P_360_1);
        isHidden = this.__P_360_1.getLayoutParent().hasCssClass("exclude");
        this.assertFalse(isHidden, "Button parent is expected to not contain 'exclude' class anymore");
      },
      testItemRow: function testItemRow() {
        this.assertNotNull(this.__P_360_4._getChildren()[0]);
        this.assertTrue(2 === this.__P_360_4._getChildren()[1]._getChildren().length);

        // we have a label and a form element in the row
      },
      testButtonRow: function testButtonRow() {
        this.assertNotNull(this.__P_360_4._getChildren()[5]);
        var buttonRowLength = this.__P_360_4._getChildren()[5]._getChildren().length;
        this.assertTrue(1 === buttonRowLength); // we have only the button in the row
      },
      testTwoLinesRow: function testTwoLinesRow() {
        this.assertNotNull(this.__P_360_4._getChildren()[3]);
        var rowLength = this.__P_360_4._getChildren()[3]._getChildren().length;
        this.assertTrue(2 === rowLength);
      }
    }
  });
  qx.test.mobile.form.SingleRenderer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SingleRenderer.js.map?dt=1735341779524