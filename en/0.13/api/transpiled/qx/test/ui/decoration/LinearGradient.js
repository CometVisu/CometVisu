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
      "qx.ui.core.Widget": {},
      "qx.ui.decoration.Decorator": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2014 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */

  qx.Class.define("qx.test.ui.decoration.LinearGradient", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      setUp: function setUp() {
        this.__P_389_0 = new qx.ui.core.Widget();
        this.__P_389_0.setHeight(100);
        this.__P_389_1 = new qx.ui.decoration.Decorator();
        this.__P_389_1.set({
          startColor: "red",
          endColor: "black"
        });
        this.getRoot().add(this.__P_389_0);
      },
      tearDown: function tearDown() {
        this.__P_389_0.destroy();
        this.__P_389_1.dispose();
      },
      testDefault: function testDefault() {
        this.__P_389_1.set({
          startColorPosition: 0,
          endColorPosition: 100
        });
        this.__P_389_0.setDecorator(this.__P_389_1);
        this.flush();
      },
      testDefaultPx: function testDefaultPx() {
        this.__P_389_1.set({
          startColorPosition: 0,
          endColorPosition: 200,
          colorPositionUnit: "px"
        });
        this.__P_389_0.setDecorator(this.__P_389_1);
        this.flush();
      },
      testNegativeStart: function testNegativeStart() {
        this.__P_389_1.set({
          startColorPosition: -100,
          endColorPosition: 100
        });
        this.__P_389_0.setDecorator(this.__P_389_1);
        this.flush();
      },
      testBigEnd: function testBigEnd() {
        this.__P_389_1.set({
          startColorPosition: 0,
          endColorPosition: 200
        });
        this.__P_389_0.setDecorator(this.__P_389_1);
        this.flush();
      },
      testBigEndPx: function testBigEndPx() {
        this.__P_389_1.set({
          startColorPosition: 0,
          endColorPosition: 200,
          colorPositionUnit: "px"
        });
        this.__P_389_0.setDecorator(this.__P_389_1);
        this.flush();
      },
      testNegativeStartPx: function testNegativeStartPx() {
        this.__P_389_1.set({
          startColorPosition: 0,
          endColorPosition: 200,
          colorPositionUnit: "px"
        });
        this.__P_389_0.setDecorator(this.__P_389_1);
        this.flush();
      }
    }
  });
  qx.test.ui.decoration.LinearGradient.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=LinearGradient.js.map?dt=1735341780943