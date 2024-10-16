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
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.ui.form.IForm": {},
      "qx.ui.form.Spinner": {},
      "qx.ui.form.Slider": {},
      "qx.ui.form.TextField": {},
      "qx.ui.form.TextArea": {},
      "qx.ui.form.PasswordField": {},
      "qx.ui.form.ComboBox": {},
      "qx.ui.form.SelectBox": {},
      "qx.ui.form.CheckBox": {},
      "qx.ui.form.RadioButton": {},
      "qx.ui.groupbox.GroupBox": {},
      "qx.ui.groupbox.RadioGroupBox": {},
      "qx.ui.groupbox.CheckGroupBox": {},
      "qx.ui.form.List": {},
      "qx.ui.tree.Tree": {},
      "qx.ui.form.DateField": {},
      "qx.ui.form.RadioGroup": {},
      "qx.ui.form.RadioButtonGroup": {},
      "qx.ui.form.Form": {}
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
  qx.Class.define("qx.test.ui.form.Form", {
    extend: qx.test.ui.LayoutTestCase,
    include: qx.dev.unit.MMock,
    members: {
      __P_398_0: function __P_398_0(widget) {
        // check if the interface is implemented
        this.assert(qx.Class.hasInterface(widget.constructor, qx.ui.form.IForm), "Interface not implemented.");

        // test for the default (false)
        this.assertFalse(widget.getRequired(), "Default required state is wrong.");

        // check for the event
        var self = this;
        widget.setRequired(false);
        this.assertEventFired(widget, "changeRequired", function () {
          widget.setRequired(true);
        }, function (e) {
          self.assertTrue(e.getData(), "Wrong data in the event!");
          self.assertFalse(e.getOldData(), "Wrong old data in the event!");
        }, "Change event not fired!");

        // check if the state is set
        this.assertTrue(widget.getRequired(), "Setting of the required flag did not work.");
        widget.dispose();
      },
      __P_398_1: function __P_398_1(widget, where) {
        // check if the interface is implemented
        this.assert(qx.Class.hasInterface(widget.constructor, qx.ui.form.IForm), "Interface not implemented.");
        this.getRoot().add(widget);

        // test for the default (true)
        this.assertTrue(widget.getValid(), "Default valid state is wrong.");
        this.assertFalse(!!widget.hasState("invalid"), "Should not have the invalid state.");
        widget.setValid(false);

        // check if the state is set
        this.assertFalse(widget.getValid(), "Setting of the valid flag did not work.");
        this.assertTrue(widget.hasState("invalid"), "Should have the invalid state.");

        // check for the event
        var self = this;
        this.assertEventFired(widget, "changeValid", function () {
          widget.setValid(true);
        }, function (e) {
          self.assertTrue(e.getData(), "Wrong data in the event.");
          self.assertFalse(e.getOldData(), "Wrong old data in the event.");
        }, "Change event not fired!");

        // check for the event
        this.assertEventFired(widget, "changeInvalidMessage", function () {
          widget.setInvalidMessage("affe");
        }, function (e) {
          self.assertEquals("affe", e.getData(), "Wrong data in the event.");
          self.assertEquals(null, e.getOldData(), "Wrong old data in the event.");
        }, "Change event not fired!");

        // set the widget to invalid
        widget.setValid(false);
        if (where !== "dont") {
          // needs to be tests async because of a strange behavior in opera 9
          var self = this;
          window.setTimeout(function () {
            self.resume(function () {
              this.__P_398_2(widget);
              widget.destroy();
            }, self);
          }, 100);
          this.wait();
        }
        widget.destroy();
      },
      __P_398_2: function __P_398_2(widget) {
        this.flush();

        // check for the invalid decorator
        this.assertNotEquals(-1, widget.getDecorator().indexOf("invalid"), "Decorator not set!");

        // check the focus
        widget.focus();
        this.flush();
        this.assertNotEquals(-1, widget.getDecorator().indexOf("invalid"), "Decorator not set!");
      },
      testRequiredSpinner: function testRequiredSpinner() {
        this.__P_398_0(new qx.ui.form.Spinner());
      },
      testValidSpinner: function testValidSpinner() {
        this.__P_398_1(new qx.ui.form.Spinner());
      },
      testRequiredSlider: function testRequiredSlider() {
        this.__P_398_0(new qx.ui.form.Slider());
      },
      testValidSlider: function testValidSlider() {
        this.__P_398_1(new qx.ui.form.Slider());
      },
      testRequiredTextField: function testRequiredTextField() {
        this.__P_398_0(new qx.ui.form.TextField());
      },
      testValidTextField: function testValidTextField() {
        this.__P_398_1(new qx.ui.form.TextField());
      },
      testRequiredTextArea: function testRequiredTextArea() {
        this.__P_398_0(new qx.ui.form.TextArea());
      },
      testValidTextArea: function testValidTextArea() {
        this.__P_398_1(new qx.ui.form.TextArea());
      },
      testRequiredPasswordField: function testRequiredPasswordField() {
        this.__P_398_0(new qx.ui.form.PasswordField());
      },
      testValidPasswordField: function testValidPasswordField() {
        this.__P_398_1(new qx.ui.form.PasswordField());
      },
      testRequiredComboBox: function testRequiredComboBox() {
        this.__P_398_0(new qx.ui.form.ComboBox());
      },
      testValidComboBox: function testValidComboBox() {
        this.__P_398_1(new qx.ui.form.ComboBox());
      },
      testRequiredSelectBox: function testRequiredSelectBox() {
        this.__P_398_0(new qx.ui.form.SelectBox());
      },
      testValidSelectBox: function testValidSelectBox() {
        this.__P_398_1(new qx.ui.form.SelectBox());
      },
      testRequiredCheckBox: function testRequiredCheckBox() {
        this.__P_398_0(new qx.ui.form.CheckBox());
      },
      testValidCheckBox: function testValidCheckBox() {
        this.__P_398_1(new qx.ui.form.CheckBox(), "dont");
      },
      testValidRadioButton: function testValidRadioButton() {
        this.__P_398_1(new qx.ui.form.RadioButton(), "dont");
      },
      testRequiredRadioButton: function testRequiredRadioButton() {
        this.__P_398_0(new qx.ui.form.RadioButton());
      },
      testValidGroupBox: function testValidGroupBox() {
        this.__P_398_1(new qx.ui.groupbox.GroupBox(), "dont");
      },
      testRequiredGroupBox: function testRequiredGroupBox() {
        this.__P_398_0(new qx.ui.groupbox.GroupBox());
      },
      testValidRadioGroupBox: function testValidRadioGroupBox() {
        this.__P_398_1(new qx.ui.groupbox.RadioGroupBox(), "dont");
      },
      testRequiredRadioGroupBox: function testRequiredRadioGroupBox() {
        this.__P_398_0(new qx.ui.groupbox.RadioGroupBox());
      },
      testValidCheckGroupBox: function testValidCheckGroupBox() {
        this.__P_398_1(new qx.ui.groupbox.CheckGroupBox(), "dont");
      },
      testRequiredCheckGroupBox: function testRequiredCheckGroupBox() {
        this.__P_398_0(new qx.ui.groupbox.CheckGroupBox());
      },
      testValidList: function testValidList() {
        this.__P_398_1(new qx.ui.form.List());
      },
      testRequiredList: function testRequiredList() {
        this.__P_398_0(new qx.ui.form.List());
      },
      testValidTree: function testValidTree() {
        this.__P_398_1(new qx.ui.tree.Tree());
      },
      testRequiredTree: function testRequiredTree() {
        this.__P_398_0(new qx.ui.tree.Tree());
      },
      testRequiredDateField: function testRequiredDateField() {
        this.__P_398_0(new qx.ui.form.DateField());
      },
      testValidDateField: function testValidDateField() {
        this.__P_398_1(new qx.ui.form.DateField());
      },
      testRequiredDateChooser: function testRequiredDateChooser() {
        this.__P_398_0(new qx.ui.form.DateField());
      },
      testValidDateChooser: function testValidDateChooser() {
        this.__P_398_1(new qx.ui.form.DateField());
      },
      testValidRadioGroup: function testValidRadioGroup() {
        var group = new qx.ui.form.RadioGroup();
        var rb = new qx.ui.form.RadioButton();
        group.add(rb);

        // check if the interface is implemented
        this.assert(qx.Class.hasInterface(group.constructor, qx.ui.form.IForm), "Interface not implemented.");

        // test for the default (true)
        this.assertTrue(group.getValid(), "Default valid state is wrong.");
        group.setValid(false);

        // check if the state is set
        this.assertFalse(group.getValid(), "Setting of the valid flag did not work.");

        // check for the event
        var self = this;
        this.assertEventFired(group, "changeValid", function () {
          group.setValid(true);
        }, function (e) {
          self.assertTrue(e.getData(), "Wrong data in the event.");
          self.assertFalse(e.getOldData(), "Wrong old data in the event.");
        }, "Change event not fired!");

        // check for the event
        this.assertEventFired(group, "changeInvalidMessage", function () {
          group.setInvalidMessage("affe");
        }, function (e) {
          self.assertEquals("affe", e.getData(), "Wrong data in the event.");
          self.assertEquals("", e.getOldData(), "Wrong old data in the event.");
        }, "Change event not fired!");

        // set the widget to invalid
        group.setValid(false);

        // check if the child is invalid
        this.assertFalse(rb.getValid(), "Child is valid!");
        // check the invalid message of the child
        this.assertEquals("affe", rb.getInvalidMessage(), "Invalid messages not set on child.");
        group.dispose();
        rb.destroy();
      },
      testRequiredRadioGroup: function testRequiredRadioGroup() {
        this.__P_398_0(new qx.ui.form.RadioGroup());
      },
      testRequiredRadioButtonGroup: function testRequiredRadioButtonGroup() {
        this.__P_398_0(new qx.ui.form.RadioButtonGroup());
      },
      testValidRadioButtonGroup: function testValidRadioButtonGroup() {
        var cont = new qx.ui.form.RadioButtonGroup();
        var rb = new qx.ui.form.RadioButton();
        cont.add(rb);

        // check if the interface is implemented
        this.assert(qx.Class.hasInterface(cont.constructor, qx.ui.form.IForm), "Interface not implemented.");

        // test for the default (true)
        this.assertTrue(cont.getValid(), "Default valid state is wrong.");
        cont.setValid(false);

        // check if the state is set
        this.assertFalse(cont.getValid(), "Setting of the valid flag did not work.");

        // check for the event
        var self = this;
        this.assertEventFired(cont, "changeValid", function () {
          cont.setValid(true);
        }, function (e) {
          self.assertTrue(e.getData(), "Wrong data in the event.");
          self.assertFalse(e.getOldData(), "Wrong old data in the event.");
        }, "Change event not fired!");

        // check for the event
        this.assertEventFired(cont, "changeInvalidMessage", function () {
          cont.setInvalidMessage("affe");
        }, function (e) {
          self.assertEquals("affe", e.getData(), "Wrong data in the event.");
          self.assertEquals("", e.getOldData(), "Wrong old data in the event.");
        }, "Change event not fired!");

        // set the widget to invalid
        cont.setValid(false);

        // check if the child is invalid
        this.assertFalse(rb.getValid(), "Child is valid!");
        // check the invalid message of the child
        this.assertEquals("affe", rb.getInvalidMessage(), "Invalid messages not set on child.");
        cont.dispose();
        rb.destroy();
      },
      testRedefineItem: function testRedefineItem() {
        var form = new qx.ui.form.Form();
        var resetter = form._resetter;
        resetter.redefineItem = this.spy(resetter.redefineItem);
        var item = new qx.ui.form.TextField();
        form.add(item, "xyz");
        form.redefineResetterItem(item);
        this.assertCalledOnce(resetter.redefineItem);
        item.dispose();
        form.dispose();
      }
    }
  });
  qx.test.ui.form.Form.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Form.js.map?dt=1729101244729