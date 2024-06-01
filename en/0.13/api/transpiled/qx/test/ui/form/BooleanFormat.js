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
      "qx.ui.form.IBooleanForm": {},
      "qx.ui.form.CheckBox": {},
      "qx.ui.form.ToggleButton": {},
      "qx.ui.menu.CheckBox": {},
      "qx.ui.form.RadioButton": {},
      "qx.ui.menu.RadioButton": {},
      "qx.ui.groupbox.RadioGroupBox": {},
      "qx.ui.groupbox.CheckGroupBox": {}
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
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.form.BooleanFormat", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __P_392_0: function __P_392_0(widget, initValue) {
        // check if the interface is implemented
        this.assertTrue(qx.Class.hasInterface(widget.constructor, qx.ui.form.IBooleanForm), "Interface is not implemented.");

        // check for the init value
        this.assertEquals(initValue, widget.getValue(), "Wrong init value set.");

        // just check if the method is available
        widget.resetValue();

        // check the getter and setter
        widget.setValue(true);
        this.assertEquals(true, widget.getValue(), "Set or get does not work.");
        var self = this;
        this.assertEventFired(widget, "changeValue", function () {
          widget.setValue(false);
        }, function (e) {
          self.assertEquals(false, e.getData(), "Not the right data in the event.");
          self.assertEquals(true, e.getOldData(), "Wrong old data in the event.");
        }, "Event is wrong!");

        // test for null values
        widget.setValue(null);
        widget.destroy();
      },
      testCheckBox: function testCheckBox() {
        this.__P_392_0(new qx.ui.form.CheckBox(), false);
      },
      testToggleButton: function testToggleButton() {
        this.__P_392_0(new qx.ui.form.ToggleButton(), false);
      },
      testMenuCheckBox: function testMenuCheckBox() {
        this.__P_392_0(new qx.ui.menu.CheckBox(), false);
      },
      testRadioButton: function testRadioButton() {
        this.__P_392_0(new qx.ui.form.RadioButton(), false);
      },
      testMenuRadioButton: function testMenuRadioButton() {
        this.__P_392_0(new qx.ui.menu.RadioButton(), false);
      },
      testRadioGroupBox: function testRadioGroupBox() {
        this.__P_392_0(new qx.ui.groupbox.RadioGroupBox(), true);
      },
      testCheckGroupBox: function testCheckGroupBox() {
        this.__P_392_0(new qx.ui.groupbox.CheckGroupBox(), true);
      }
    }
  });
  qx.test.ui.form.BooleanFormat.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BooleanFormat.js.map?dt=1717235393752