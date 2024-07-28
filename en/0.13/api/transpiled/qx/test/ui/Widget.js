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
      "qx.ui.core.Widget": {}
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
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.Widget", {
    extend: qx.dev.unit.TestCase,
    members: {
      __P_380_0: null,
      setUp: function setUp() {
        this.__P_380_0 = new qx.ui.core.Widget();
      },
      tearDown: function tearDown() {
        this.__P_380_0.destroy();
      },
      testAddState: function testAddState() {
        this.__P_380_0.addState("test");
        this.assertTrue(this.__P_380_0.hasState("test"));
      },
      testRemoveState: function testRemoveState() {
        this.__P_380_0.addState("test");
        this.assertTrue(this.__P_380_0.hasState("test"));
        this.__P_380_0.removeState("test");
        this.assertFalse(this.__P_380_0.hasState("test"));
      },
      testReplaceState: function testReplaceState() {
        this.__P_380_0.addState("test");
        this.assertTrue(this.__P_380_0.hasState("test"));
        this.__P_380_0.replaceState("test", "affe");
        this.assertTrue(this.__P_380_0.hasState("affe"));
        this.assertFalse(this.__P_380_0.hasState("test"));
      },
      testWidgetThatContainsItself: function testWidgetThatContainsItself() {
        this.assertFalse(qx.ui.core.Widget.contains(this.__P_380_0, this.__P_380_0));
      }
    }
  });
  qx.test.ui.Widget.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Widget.js.map?dt=1722153830806