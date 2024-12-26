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
      "qx.bom.PageVisibility": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */

  qx.Class.define("qx.test.bom.PageVisibility", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MMock],
    members: {
      setUp: function setUp() {
        this.__P_312_0 = new qx.bom.PageVisibility();
      },
      testVisibilityState: function testVisibilityState() {
        var possible = ["hidden", "visible", "prerender", "unloaded"];
        var value = this.__P_312_0.getVisibilityState();
        this.assertInArray(value, possible);
      },
      testHidden: function testHidden() {
        this.assertBoolean(this.__P_312_0.isHidden());
      },
      testGetInstance: function testGetInstance() {
        this.assertEquals(qx.bom.PageVisibility.getInstance(), qx.bom.PageVisibility.getInstance());
      }
    }
  });
  qx.test.bom.PageVisibility.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PageVisibility.js.map?dt=1735222425577