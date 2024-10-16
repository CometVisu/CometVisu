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
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.event.Manager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2020 Christian Boulanger
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (cboulanger)
  
  ************************************************************************ */

  qx.Class.define("qx.test.event.GlobalEventMonitors", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MRequirements,
    events: {
      test: "qx.event.type.Event"
    },
    members: {
      setUp: function setUp() {
        this.called = false;
      },
      tearDown: function tearDown() {
        qx.event.Manager.resetGlobalEventMonitors();
      },
      "test: add and call global event monitors": function test_add_and_call_global_event_monitors() {
        qx.event.Manager.addGlobalEventMonitor(function (target, event) {
          this.assertEquals(this, target);
          this.assertEquals("test", event.getType());
          this.called = true;
        }, this);
        this.fireEvent("test");
        this.assertTrue(this.called, "Monitor function was not called");
      },
      "test: remove global event monitor": function test_remove_global_event_monitor() {
        this.value = false;
        var fn1 = function fn1() {
          this.value = true;
        };
        var fn2 = function fn2() {
          this.value = false;
        };
        qx.event.Manager.addGlobalEventMonitor(fn1, this);
        this.fireEvent("test");
        this.assertTrue(this.value, "Value should be true after adding fn1");
        qx.event.Manager.addGlobalEventMonitor(fn2, this);
        this.fireEvent("test");
        this.assertFalse(this.value, "Value should be false after adding fn2");
        qx.event.Manager.removeGlobalEventMonitor(fn2, this);
        this.fireEvent("test");
        this.assertTrue(this.value, "Value should be true after removing fn2");
      },
      "test: disallow event manipulation": function test_disallow_event_manipulation() {
        var errorWasThrown = false;
        qx.event.Manager.addGlobalEventMonitor(function (target, event) {
          event.preventDefault();
        }, this);
        try {
          this.fireEvent("test");
        } catch (e) {
          errorWasThrown = true;
        }
        this.assertTrue(errorWasThrown, "No error was thrown after manipulating event object");
      }
    }
  });
  qx.test.event.GlobalEventMonitors.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=GlobalEventMonitors.js.map?dt=1729101240127