(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.ui.command.Command": {},
      "qx.ui.form.Button": {},
      "qx.ui.toolbar.Button": {},
      "qx.ui.menu.Button": {},
      "qx.locale.Manager": {},
      "qx.ui.menu.CheckBox": {},
      "qx.ui.menu.RadioButton": {},
      "qx.ui.form.ToggleButton": {},
      "qx.ui.form.SplitButton": {},
      "qx.ui.menu.Menu": {},
      "qx.ui.core.queue.Manager": {}
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
       * Mustafa Sak (msak)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.command.Command", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MMock,
    members: {
      __P_381_0: null,
      __P_381_1: null,
      __P_381_2: null,
      __P_381_3: null,
      setUp: function setUp() {
        this.__P_381_0 = new qx.ui.command.Command();
        this.__P_381_1 = new qx.ui.form.Button("a");
        this.__P_381_1.setCommand(this.__P_381_0);
        this.__P_381_2 = new qx.ui.toolbar.Button("b");
        this.__P_381_2.setCommand(this.__P_381_0);
        this.__P_381_3 = new qx.ui.menu.Button("c");
        this.__P_381_3.setCommand(this.__P_381_0);
        qx.locale.Manager.getInstance().setLocale("en");
      },
      tearDown: function tearDown() {
        this.__P_381_0.dispose();
        this.__P_381_1.destroy();
        this.__P_381_2.destroy();
        this.__P_381_3.destroy();
        qx.locale.Manager.getInstance().resetLocale();
      },
      testLabel: function testLabel() {
        // set a label
        this.__P_381_0.setLabel("a");
        this.assertEquals(this.__P_381_0.getLabel(), this.__P_381_1.getLabel());
        this.assertEquals(this.__P_381_0.getLabel(), this.__P_381_2.getLabel());
        this.assertEquals(this.__P_381_0.getLabel(), this.__P_381_3.getLabel());

        // set null
        this.__P_381_0.setLabel(null);
        this.assertEquals(this.__P_381_0.getLabel(), this.__P_381_1.getLabel());
        this.assertEquals(this.__P_381_0.getLabel(), this.__P_381_2.getLabel());
        this.assertEquals(this.__P_381_0.getLabel(), this.__P_381_3.getLabel());

        // set a second string
        this.__P_381_0.setLabel("b");
        this.assertEquals(this.__P_381_0.getLabel(), this.__P_381_1.getLabel());
        this.assertEquals(this.__P_381_0.getLabel(), this.__P_381_2.getLabel());
        this.assertEquals(this.__P_381_0.getLabel(), this.__P_381_3.getLabel());

        // reset
        this.__P_381_0.resetLabel();
        this.assertEquals(this.__P_381_0.getLabel(), this.__P_381_1.getLabel());
        this.assertEquals(this.__P_381_0.getLabel(), this.__P_381_2.getLabel());
        this.assertEquals(this.__P_381_0.getLabel(), this.__P_381_3.getLabel());
      },
      testEnabled: function testEnabled() {
        {
          // set disabled
          this.__P_381_0.setEnabled(false);
          this.assertEquals(this.__P_381_0.getEnabled(), this.__P_381_1.getEnabled());
          this.assertEquals(this.__P_381_0.getEnabled(), this.__P_381_2.getEnabled());
          this.assertEquals(this.__P_381_0.getEnabled(), this.__P_381_3.getEnabled());

          // set enabled
          this.__P_381_0.setEnabled(true);
          this.assertEquals(this.__P_381_0.getEnabled(), this.__P_381_1.getEnabled());
          this.assertEquals(this.__P_381_0.getEnabled(), this.__P_381_2.getEnabled());
          this.assertEquals(this.__P_381_0.getEnabled(), this.__P_381_3.getEnabled());
        }
      },
      testIcon: function testIcon() {
        // set a string
        this.__P_381_0.setIcon("a");
        this.assertEquals(this.__P_381_0.getIcon(), this.__P_381_1.getIcon());
        this.assertEquals(this.__P_381_0.getIcon(), this.__P_381_2.getIcon());
        this.assertEquals(this.__P_381_0.getIcon(), this.__P_381_3.getIcon());

        // set null
        this.__P_381_0.setIcon(null);
        this.assertEquals(this.__P_381_0.getIcon(), this.__P_381_1.getIcon());
        this.assertEquals(this.__P_381_0.getIcon(), this.__P_381_2.getIcon());
        this.assertEquals(this.__P_381_0.getIcon(), this.__P_381_3.getIcon());

        // set a second string
        this.__P_381_0.setIcon("b");
        this.assertEquals(this.__P_381_0.getIcon(), this.__P_381_1.getIcon());
        this.assertEquals(this.__P_381_0.getIcon(), this.__P_381_2.getIcon());
        this.assertEquals(this.__P_381_0.getIcon(), this.__P_381_3.getIcon());

        // reset
        this.__P_381_0.resetIcon();
        this.assertEquals(this.__P_381_0.getIcon(), this.__P_381_1.getIcon());
        this.assertEquals(this.__P_381_0.getIcon(), this.__P_381_2.getIcon());
        this.assertEquals(this.__P_381_0.getIcon(), this.__P_381_3.getIcon());
      },
      testToolTipText: function testToolTipText() {
        // set a string
        this.__P_381_0.setToolTipText("a");
        this.assertEquals(this.__P_381_0.getToolTipText(), this.__P_381_1.getToolTipText());
        this.assertEquals(this.__P_381_0.getToolTipText(), this.__P_381_2.getToolTipText());
        this.assertEquals(this.__P_381_0.getToolTipText(), this.__P_381_3.getToolTipText());

        // set null
        this.__P_381_0.setIcon(null);
        this.assertEquals(this.__P_381_0.getToolTipText(), this.__P_381_1.getToolTipText());
        this.assertEquals(this.__P_381_0.getToolTipText(), this.__P_381_2.getToolTipText());
        this.assertEquals(this.__P_381_0.getToolTipText(), this.__P_381_3.getToolTipText());

        // set a second string
        this.__P_381_0.setIcon("b");
        this.assertEquals(this.__P_381_0.getToolTipText(), this.__P_381_1.getToolTipText());
        this.assertEquals(this.__P_381_0.getToolTipText(), this.__P_381_2.getToolTipText());
        this.assertEquals(this.__P_381_0.getToolTipText(), this.__P_381_3.getToolTipText());

        // reset
        this.__P_381_0.resetIcon();
        this.assertEquals(this.__P_381_0.getToolTipText(), this.__P_381_1.getToolTipText());
        this.assertEquals(this.__P_381_0.getToolTipText(), this.__P_381_2.getToolTipText());
        this.assertEquals(this.__P_381_0.getToolTipText(), this.__P_381_3.getToolTipText());
      },
      testRemoveCommand: function testRemoveCommand() {
        // remove the command (has been set in the setUp method)
        this.__P_381_1.setCommand(null);
        this.__P_381_2.setCommand(null);
        this.__P_381_3.setCommand(null);

        // set a label
        this.__P_381_0.setLabel("x");
        // check if the label has been set
        this.assertEquals("a", this.__P_381_1.getLabel());
        this.assertEquals("b", this.__P_381_2.getLabel());
        this.assertEquals("c", this.__P_381_3.getLabel());
      },
      testValue: function testValue() {
        var menuCheckBox = new qx.ui.menu.CheckBox();
        var menuRadioButton = new qx.ui.menu.RadioButton();
        var toggleButton = new qx.ui.form.ToggleButton();

        // set the command
        menuRadioButton.setCommand(this.__P_381_0);
        menuCheckBox.setCommand(this.__P_381_0);
        toggleButton.setCommand(this.__P_381_0);

        // set the value
        this.__P_381_0.setValue(true);
        this.assertEquals(this.__P_381_0.getValue(), menuCheckBox.getValue());
        this.assertEquals(this.__P_381_0.getValue(), menuRadioButton.getValue());
        this.assertEquals(this.__P_381_0.getValue(), toggleButton.getValue());

        // set the value
        this.__P_381_0.setValue(false);
        this.assertEquals(this.__P_381_0.getValue(), menuCheckBox.getValue());
        this.assertEquals(this.__P_381_0.getValue(), menuRadioButton.getValue());
        this.assertEquals(this.__P_381_0.getValue(), toggleButton.getValue());
        toggleButton.dispose();
        menuCheckBox.dispose();
        menuRadioButton.dispose();
      },
      testMenu: function testMenu() {
        var splitButton = new qx.ui.form.SplitButton();
        splitButton.setCommand(this.__P_381_0);
        var menu = new qx.ui.menu.Menu();

        // set the menu
        this.__P_381_0.setMenu(menu);
        this.assertEquals(menu, splitButton.getMenu());
        this.assertEquals(menu, this.__P_381_3.getMenu());

        // reset the menu
        this.__P_381_0.resetMenu();
        this.assertNull(splitButton.getMenu());
        this.assertNull(this.__P_381_3.getMenu());
        splitButton.dispose();
        menu.destroy();
      },
      testInit: function testInit() {
        // check if the init values after setting the command was added
        this.assertEquals("a", this.__P_381_1.getLabel());
        this.assertEquals("b", this.__P_381_2.getLabel());
        this.assertEquals("c", this.__P_381_3.getLabel());

        // add a new command
        var cmd = new qx.ui.command.Command();
        cmd.setLabel("x");
        this.__P_381_1.setCommand(cmd);
        this.__P_381_2.setCommand(cmd);
        this.__P_381_3.setCommand(cmd);
        this.assertEquals(cmd.getLabel(), this.__P_381_1.getLabel());
        this.assertEquals(cmd.getLabel(), this.__P_381_2.getLabel());
        this.assertEquals(cmd.getLabel(), this.__P_381_3.getLabel());
        cmd.dispose();
      },
      testIconAsToolTipText: function testIconAsToolTipText() {
        // for [BUG #4534]
        var cmd = new qx.ui.command.Command("Control+D");
        cmd.setToolTipText("affe");
        var button1 = new qx.ui.form.Button("x", "y");
        button1.setCommand(cmd);
        this.assertEquals("affe", button1.getToolTipText());
        button1.dispose();
        cmd.dispose();
      },
      testDestructExecutable: function testDestructExecutable() {
        // Create the command
        var cmd = new qx.ui.command.Command("Meta+T");

        // Create a button linked to cmd
        var button = new qx.ui.form.Button("Command button", null, cmd);
        cmd.setEnabled(false);
        button.destroy();
        // make sure the dispose queue is flushed
        qx.ui.core.queue.Manager.flush();
        cmd.setEnabled(true);
        cmd.dispose();

        // test makes sure that code is running, no assert needed
      },
      testFireExecuteCount: function testFireExecuteCount() {
        var handler = this.spy();

        // Create the command
        var cmd = new qx.ui.command.Command("Meta+T");
        cmd.addListener("execute", handler);
        cmd.setEnabled(false);
        cmd.setActive(false);
        cmd.execute();
        this.assertCallCount(handler, 0);
        cmd.setEnabled(true);
        cmd.setActive(false);
        cmd.execute();
        this.assertCallCount(handler, 0);
        cmd.setEnabled(true);
        cmd.setActive(true);
        cmd.execute();
        this.assertCallCount(handler, 1);
        cmd.dispose();
      },
      testGetShortcut: function testGetShortcut() {
        // for bug #7036
        var cmd = new qx.ui.command.Command("Control+X");
        this.assertEquals("Control+X", cmd.getShortcut());
        cmd.dispose();
      },
      testShortCutToString: function testShortCutToString() {
        // for bug #8465
        var cmd = new qx.ui.command.Command("Ctrl+X");
        this.assertEquals("Ctrl+X", cmd.toString());
        cmd.dispose();
        this.assertEquals("qx.ui.command.Command[undefined]", cmd.toString());
      }
    }
  });
  qx.test.ui.command.Command.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Command.js.map?dt=1731948119264