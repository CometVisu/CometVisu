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
      "qx.ui.menu.Menu": {},
      "qx.ui.menu.Button": {},
      "qx.ui.form.MenuButton": {},
      "qx.ui.menu.Manager": {}
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
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.form.MenuButton", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __P_403_0: null,
      __P_403_1: null,
      setUp: function setUp() {
        qx.test.ui.form.MenuButton.superclass.prototype.setUp.call(this);
        this.__P_403_0 = new qx.ui.menu.Menu();
        this.__P_403_0.add(new qx.ui.menu.Button("Undo"));
        this.__P_403_0.add(new qx.ui.menu.Button("Redo"));
        this.__P_403_0.add(new qx.ui.menu.Button("Cut"));
        this.__P_403_1 = new qx.ui.form.MenuButton("Menu Button", null, this.__P_403_0);
        this.getRoot().add(this.__P_403_1);
        this.flush();
      },
      tearDown: function tearDown() {
        qx.test.ui.form.MenuButton.superclass.prototype.tearDown.call(this);
        var buttons = this.__P_403_0.getChildren();
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].dispose();
        }
        this.__P_403_0.dispose();
        this.__P_403_1.dispose();
        this.flush();
      },
      testOpen: function testOpen() {
        this.__P_403_1.open();
        this.assertTrue(this.__P_403_0.isVisible());
        this.assertNull(this.__P_403_0.getSelectedButton());
        qx.ui.menu.Manager.getInstance().hideAll();
        this.assertFalse(this.__P_403_0.isVisible());
      },
      testOpenSelectFirst: function testOpenSelectFirst() {
        this.__P_403_1.open(true);
        this.assertTrue(this.__P_403_0.isVisible());
        this.assertEquals(this.__P_403_0.getChildren()[0], this.__P_403_0.getSelectedButton());
        qx.ui.menu.Manager.getInstance().hideAll();
        this.assertFalse(this.__P_403_0.isVisible());
      },
      testOpenSelectFirstWithDisabledElement: function testOpenSelectFirstWithDisabledElement() {
        this.__P_403_0.getChildren()[0].setEnabled(false);
        this.__P_403_1.open(true);
        this.assertTrue(this.__P_403_0.isVisible());
        this.assertEquals(this.__P_403_0.getChildren()[1], this.__P_403_0.getSelectedButton());
        qx.ui.menu.Manager.getInstance().hideAll();
        this.assertFalse(this.__P_403_0.isVisible());
      }
    }
  });
  qx.test.ui.form.MenuButton.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MenuButton.js.map?dt=1731948120075