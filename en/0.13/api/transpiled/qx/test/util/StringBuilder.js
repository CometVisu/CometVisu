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
      "qx.util.StringBuilder": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.util.StringBuilder", {
    extend: qx.dev.unit.TestCase,
    members: {
      setUp: function setUp() {
        this.__P_455_0 = new qx.util.StringBuilder();
      },
      testAddGet: function testAddGet() {
        this.__P_455_0.add("1");
        this.__P_455_0.add("2");
        this.assertEquals("12", this.__P_455_0.get());
        this.__P_455_0.add("3");
        this.assertEquals("123", this.__P_455_0.get());
      },
      testSize: function testSize() {
        this.__P_455_0.add("123");
        this.assertEquals(3, this.__P_455_0.size());
        this.__P_455_0.add("4567");
        this.assertEquals(7, this.__P_455_0.size());
      },
      testEmptyClear: function testEmptyClear() {
        this.assertTrue(this.__P_455_0.isEmpty());
        this.__P_455_0.add("123");
        this.assertFalse(this.__P_455_0.isEmpty());
        this.__P_455_0.clear();
        this.assertTrue(this.__P_455_0.isEmpty());
      }
    }
  });
  qx.test.util.StringBuilder.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=StringBuilder.js.map?dt=1735383866927