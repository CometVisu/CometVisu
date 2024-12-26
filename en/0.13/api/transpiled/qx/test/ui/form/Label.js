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
      "qx.ui.basic.Label": {},
      "qx.ui.form.TextField": {},
      "qx.ui.form.Spinner": {},
      "qx.ui.form.CheckBox": {}
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
  qx.Class.define("qx.test.ui.form.Label", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __P_402_0: null,
      __P_402_1: null,
      setUp: function setUp() {
        this.__P_402_1 = new qx.ui.basic.Label("abc");
      },
      tearDown: function tearDown() {
        this.__P_402_1.destroy();
        this.__P_402_0.destroy();
      },
      __P_402_2: function __P_402_2() {
        this.__P_402_1.setBuddy(this.__P_402_0);

        // check the initial enabled state
        this.assertTrue(this.__P_402_0.getEnabled(), "Form widget is disabled.");
        this.assertTrue(this.__P_402_1.getEnabled(), "Label widget is disabled.");

        // disable the textfield. Label should be disabled too
        this.__P_402_0.setEnabled(false);

        // check if both are disabled
        this.assertFalse(this.__P_402_0.getEnabled(), "Form widget is not disabled.");
        this.assertFalse(this.__P_402_1.getEnabled(), "Label widget is not disabled.");

        // enabled the label, textfield should stay
        this.__P_402_1.setEnabled(true);

        // check if the enabled properties are still correct
        this.assertFalse(this.__P_402_0.getEnabled(), "Form widget is not disabled at the end.");
        this.assertTrue(this.__P_402_1.getEnabled(), "Label widget is ensabled at the end.");
      },
      __P_402_3: function __P_402_3() {
        this.__P_402_1.setBuddy(this.__P_402_0);

        // disable the textfield. Label should be disabled too
        this.__P_402_0.setEnabled(false);

        // check if both are disabled
        this.assertFalse(this.__P_402_0.getEnabled(), "Form widget is not disabled.");
        this.assertFalse(this.__P_402_1.getEnabled(), "Label widget is not disabled.");

        // remove the buddy
        this.__P_402_1.setBuddy(null);
        // enabled the textfield. label should stay
        this.__P_402_0.setEnabled(true);

        // check if the enabled properties are still correct
        this.assertFalse(this.__P_402_1.getEnabled(), "Label widget is not disabled at the end.");
        this.assertTrue(this.__P_402_0.getEnabled(), "Form widget is ensabled at the end.");
      },
      __P_402_4: function __P_402_4() {
        var _this = this;
        // NEEDED FOR THE FOCUS
        this.getRoot().add(this.__P_402_0);
        this.__P_402_1.setBuddy(this.__P_402_0);
        this.__P_402_0.addListener("focus", function () {
          _this.resume(function () {
            // do nothing. Just check for the event
          }, _this);
        });
        this.tapOn(this.__P_402_1);
        this.wait();
      },
      __P_402_5: function __P_402_5() {
        // NEEDED FOR THE FOCUS
        this.getRoot().add(this.__P_402_0);
        this.__P_402_1.setBuddy(this.__P_402_0);
        this.__P_402_1.setBuddy(null);
        var focused = false;
        this.__P_402_0.addListener("focus", function () {
          focused = true;
        });
        var self = this;
        window.setTimeout(function () {
          self.resume(function () {
            this.assertFalse(self.__P_402_1.hasListener("click"), "Listener still there.");
            this.assertFalse(focused, "Element has been focused");
          }, self);
        }, 1000);
        this.tapOn(this.__P_402_1);
        this.wait();
      },
      testEnabledRemoveTextField: function testEnabledRemoveTextField() {
        this.__P_402_0 = new qx.ui.form.TextField("abc");
        this.__P_402_3();
      },
      testEnabledTextField: function testEnabledTextField() {
        this.__P_402_0 = new qx.ui.form.TextField("abc");
        this.__P_402_2();
      },
      testEnabledRemoveSpinner: function testEnabledRemoveSpinner() {
        this.__P_402_0 = new qx.ui.form.Spinner();
        this.__P_402_3();
      },
      testEnabledSpinner: function testEnabledSpinner() {
        this.__P_402_0 = new qx.ui.form.Spinner();
        this.__P_402_2();
      },
      testEnabledRemoveCheckBox: function testEnabledRemoveCheckBox() {
        this.__P_402_0 = new qx.ui.form.CheckBox();
        this.__P_402_3();
      },
      testEnabledCheckBox: function testEnabledCheckBox() {
        this.__P_402_0 = new qx.ui.form.CheckBox();
        this.__P_402_2();
      },
      testFocusTextField: function testFocusTextField() {
        this.__P_402_0 = new qx.ui.form.TextField("abc");
        this.__P_402_4();
      },
      testFocusSpinner: function testFocusSpinner() {
        this.__P_402_0 = new qx.ui.form.Spinner();
        this.__P_402_4();
      },
      testFocusCheckBox: function testFocusCheckBox() {
        this.__P_402_0 = new qx.ui.form.CheckBox();
        this.__P_402_4();
      },
      testFocusRemoveTextField: function testFocusRemoveTextField() {
        this.__P_402_0 = new qx.ui.form.TextField("abc");
        this.__P_402_5();
      },
      testFocusRemoveSpinner: function testFocusRemoveSpinner() {
        this.__P_402_0 = new qx.ui.form.Spinner();
        this.__P_402_5();
      },
      testFocusRemoveCheckBox: function testFocusRemoveCheckBox() {
        this.__P_402_0 = new qx.ui.form.CheckBox();
        this.__P_402_5();
      },
      testFocusNotFocusableTextField: function testFocusNotFocusableTextField() {
        this.__P_402_0 = new qx.ui.form.TextField();
        this.__P_402_0.setReadOnly(true);
        this.__P_402_1.setBuddy(this.__P_402_0);
        this.tapOn(this.__P_402_1);
      }
    },
    destruct: function destruct() {
      this.__P_402_1 = this.__P_402_0 = null;
    }
  });
  qx.test.ui.form.Label.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Label.js.map?dt=1735222431578