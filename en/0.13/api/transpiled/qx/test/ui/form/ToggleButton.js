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
      "qx.ui.form.ToggleButton": {},
      "qx.event.type.Event": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tristan Koch (tristankoch)
  
  ************************************************************************ */

  qx.Class.define("qx.test.ui.form.ToggleButton", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __P_418_0: null,
      setUp: function setUp() {
        var button = this.__P_418_0 = new qx.ui.form.ToggleButton();
        this.getRoot().add(button);
        this.flush();
      },
      //
      // 2-state button
      //
      testInitial: function testInitial() {
        var button = this.__P_418_0;
        this.assertNotState(button, "checked");
      },
      testCheck: function testCheck() {
        var button = this.__P_418_0;
        button.setValue(true);
        this.assertState(button, "checked");
      },
      testUncheck: function testUncheck() {
        var button = this.__P_418_0;
        button.setValue(false);
        this.assertNotState(button, "checked");
      },
      //
      // 3-state button
      //
      testImplicitCheckTri: function testImplicitCheckTri() {
        var button = this.__P_418_0;
        button.setTriState(true);
        button.setValue(null);

        // [x] checked
        // [v] undetermined
        this.assertNotState(button, "checked");
        this.assertState(button, "undetermined");
      },
      testImplicitCheckTriLater: function testImplicitCheckTriLater() {
        var button = this.__P_418_0;
        button.setValue(null);
        button.setTriState(true);

        // [x] checked
        // [v] undetermined
        this.assertNotState(button, "checked");
        this.assertState(button, "undetermined");
      },
      testCheckTri: function testCheckTri() {
        var button = this.__P_418_0;
        button.setTriState(true);
        button.setValue(null);
        button.setValue(true);

        // [v] checked
        // [x] undetermined
        this.assertState(button, "checked");
        this.assertNotState(button, "undetermined");
      },
      testUncheckTri: function testUncheckTri() {
        var button = this.__P_418_0;
        button.setTriState(true);
        button.setValue(null);
        button.setValue(false);

        // [x] checked
        // [x] undetermined
        this.assertNotState(button, "checked");
        this.assertNotState(button, "undetermined");
      },
      //
      // Helper methods
      //
      assertState: function assertState(widget, state) {
        this.assertTrue(widget.hasState(state), "State " + state + " not set");
      },
      assertNotState: function assertNotState(widget, state) {
        this.assertFalse(widget.hasState(state), "State " + state + " is set");
      },
      executeOn: function executeOn(widget) {
        var that = this;
        window.setTimeout(function () {
          that.immediateExecuteOn(widget);
        });
      },
      immediateExecuteOn: function immediateExecuteOn(widget) {
        widget.fireEvent("execute", qx.event.type.Event, [false, true]);
      },
      tearDown: function tearDown() {
        qx.test.ui.form.ToggleButton.superclass.prototype.tearDown.call(this);
        this.__P_418_0.destroy();
      }
    }
  });
  qx.test.ui.form.ToggleButton.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ToggleButton.js.map?dt=1735383864781