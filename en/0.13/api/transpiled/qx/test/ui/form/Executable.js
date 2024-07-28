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
      "qx.ui.form.IExecutable": {},
      "qx.ui.command.Command": {},
      "qx.ui.form.ToggleButton": {},
      "qx.ui.form.CheckBox": {},
      "qx.ui.form.Button": {},
      "qx.ui.form.RepeatButton": {},
      "qx.ui.form.MenuButton": {},
      "qx.ui.form.RadioButton": {},
      "qx.ui.toolbar.Button": {},
      "qx.ui.toolbar.SplitButton": {},
      "qx.ui.menu.CheckBox": {},
      "qx.ui.menu.RadioButton": {},
      "qx.ui.menu.Button": {},
      "qx.ui.groupbox.CheckGroupBox": {},
      "qx.ui.groupbox.RadioGroupBox": {},
      "qx.ui.control.DateChooser": {}
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
  qx.Class.define("qx.test.ui.form.Executable", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __P_397_0: function __P_397_0(widget) {
        // check if the interface is implemented
        this.assertTrue(qx.Class.hasInterface(widget.constructor, qx.ui.form.IExecutable), "Interface is not implemented.");
        var command = new qx.ui.command.Command();

        // check if the setter works
        widget.setCommand(command);
        this.assertEquals(command, widget.getCommand(), "Setter / Getter not working.");

        // check the event and execute method
        this.assertEventFired(widget, "execute", function () {
          widget.execute();
        }, function (e) {
          // do nothing
        }, "Execute event on the widget is wrong! (1)");
        this.assertEventFired(command, "execute", function () {
          widget.execute();
        }, function (e) {
          // do nothing
        }, "Execute event on the command is wrong! (2)");
        this.assertEventFired(command, "execute", function () {
          command.execute();
        }, function (e) {
          // do nothing
        }, "Execute event on the command is wrong! (3)");
        this.assertEventFired(widget, "execute", function () {
          command.execute();
        }, function (e) {
          // do nothing
        }, "Execute event on the widget is wrong! (4)");

        // test removing of the command
        widget.setCommand(null);

        // check if the listener has been removed
        this.assertEventNotFired(widget, "execute", function () {
          command.execute();
        }, function (e) {
          // do nothing
        }, "Execute event on the widget is wrong! (5)");
        command.dispose();
        widget.destroy();
      },
      testToggleButton: function testToggleButton() {
        this.__P_397_0(new qx.ui.form.ToggleButton());
      },
      testCheckBox: function testCheckBox() {
        this.__P_397_0(new qx.ui.form.CheckBox());
      },
      testButton: function testButton() {
        this.__P_397_0(new qx.ui.form.Button());
      },
      testRepeatButton: function testRepeatButton() {
        this.__P_397_0(new qx.ui.form.RepeatButton());
      },
      testMenuButton: function testMenuButton() {
        this.__P_397_0(new qx.ui.form.MenuButton());
      },
      testRadioButton: function testRadioButton() {
        this.__P_397_0(new qx.ui.form.RadioButton());
      },
      testToolbarButton: function testToolbarButton() {
        this.__P_397_0(new qx.ui.toolbar.Button());
      },
      testSplitButton: function testSplitButton() {
        this.__P_397_0(new qx.ui.toolbar.SplitButton());
      },
      testMenuCheckBox: function testMenuCheckBox() {
        this.__P_397_0(new qx.ui.menu.CheckBox());
      },
      testMenuRadioButton: function testMenuRadioButton() {
        this.__P_397_0(new qx.ui.menu.RadioButton());
      },
      testButtonInMenu: function testButtonInMenu() {
        this.__P_397_0(new qx.ui.menu.Button());
      },
      testCheckGroupBox: function testCheckGroupBox() {
        this.__P_397_0(new qx.ui.groupbox.CheckGroupBox());
      },
      testRadioGroupBox: function testRadioGroupBox() {
        this.__P_397_0(new qx.ui.groupbox.RadioGroupBox());
      },
      testDateChooser: function testDateChooser() {
        this.__P_397_0(new qx.ui.control.DateChooser());
      }
    }
  });
  qx.test.ui.form.Executable.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Executable.js.map?dt=1722151836517