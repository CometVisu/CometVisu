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
      "qx.ui.form.IModel": {},
      "qx.ui.form.ListItem": {},
      "qx.ui.form.RadioButton": {},
      "qx.ui.groupbox.RadioGroupBox": {},
      "qx.ui.form.CheckBox": {},
      "qx.ui.groupbox.CheckGroupBox": {},
      "qx.ui.tree.TreeFolder": {},
      "qx.ui.tree.TreeFile": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.form.ModelProperty", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __P_405_0: function __P_405_0(widget) {
        // check for the interface
        this.assertTrue(qx.Class.hasInterface(widget.constructor, qx.ui.form.IModel), "Interface not implemented");

        // test the init value (null)
        this.assertNull(widget.getModel());

        // set a string
        widget.setModel("affe");
        this.assertEquals("affe", widget.getModel());

        // set a number (check that no check is implemented)
        widget.setModel(123);
        this.assertEquals(123, widget.getModel());

        // test the reset
        widget.resetModel();
        this.assertNull(widget.getModel());

        // check the event
        var self = this;
        this.assertEventFired(widget, "changeModel", function () {
          widget.setModel(true);
        }, function (e) {
          self.assertEquals(true, e.getData());
          self.assertEquals(null, e.getOldData());
        }, "Event is wrong!");

        // check the event again with data in the event
        var self = this;
        this.assertEventFired(widget, "changeModel", function () {
          widget.setModel("abc");
        }, function (e) {
          self.assertEquals("abc", e.getData());
          self.assertEquals(true, e.getOldData());
        }, "Event is wrong!");
        widget.dispose();
      },
      testListItem: function testListItem() {
        this.__P_405_0(new qx.ui.form.ListItem());
      },
      testRadioButton: function testRadioButton() {
        this.__P_405_0(new qx.ui.form.RadioButton());
      },
      testRadioGroupBox: function testRadioGroupBox() {
        this.__P_405_0(new qx.ui.groupbox.RadioGroupBox());
      },
      testCheckBox: function testCheckBox() {
        this.__P_405_0(new qx.ui.form.CheckBox());
      },
      testCheckGroupBox: function testCheckGroupBox() {
        this.__P_405_0(new qx.ui.groupbox.CheckGroupBox());
      },
      testTreeFolder: function testTreeFolder() {
        this.__P_405_0(new qx.ui.tree.TreeFolder());
      },
      testTreeFile: function testTreeFile() {
        this.__P_405_0(new qx.ui.tree.TreeFile());
      }
    }
  });
  qx.test.ui.form.ModelProperty.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ModelProperty.js.map?dt=1735383864530