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
      "qx.bom.AnimationFrame": {}
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

  qx.Class.define("qx.test.bom.AnimationFrame", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MMock],
    members: {
      setUp: function setUp() {
        this.__P_303_0 = new qx.bom.AnimationFrame();
      },
      testStart: function testStart() {
        var clb = this.spy();
        this.__P_303_0.once("frame", clb);
        this.__P_303_0.startSequence(300);
        this.wait(500, function () {
          this.assertCalledOnce(clb);
          this.assertTrue(clb.args[0][0] >= 0);
        }, this);
      },
      testCancel: function testCancel() {
        var clb = this.spy();
        this.__P_303_0.once("frame", clb);
        this.__P_303_0.startSequence(300);
        this.__P_303_0.cancelSequence();
        this.wait(500, function () {
          this.assertNotCalled(clb);
        }, this);
      }
    }
  });
  qx.test.bom.AnimationFrame.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AnimationFrame.js.map?dt=1729101236672