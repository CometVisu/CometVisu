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
      "qx.ui.core.Widget": {},
      "qx.core.AssertionError": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  qx.Class.define("qx.test.ui.core.SizeHint", {
    extend: qx.dev.unit.TestCase,
    type: "abstract",
    members: {
      setUp: function setUp() {
        this.widget = new qx.ui.core.Widget();
      },
      tearDown: function tearDown() {
        this.widget.dispose();
      },
      getHint: function getHint() {
        this.widget.invalidateLayoutCache();
        return this.widget.getSizeHint();
      },
      assertHint: function assertHint(min, size, max) {
        throw new Error("abstract method call");
      },
      getDefaultSize: function getDefaultSize() {
        throw new Error("abstract method call");
      },
      setSize: function setSize(min, size, max) {
        throw new Error("abstract method call");
      },
      setStretching: function setStretching(shrink, grow) {
        throw new Error("abstract method call");
      },
      testDefaultSize: function testDefaultSize() {
        this.assertHint(0, this.getDefaultSize(), Infinity);
      },
      testSize: function testSize() {
        this.setStretching(true, true);
        this.setSize(null, 200, null);
        this.assertHint(0, 200, Infinity);
      },
      testMinLargerThanSize: function testMinLargerThanSize() {
        this.setStretching(true, true);
        this.setSize(200, 100, null);
        this.assertHint(200, 200, Infinity);
      },
      testMinSmallerThanSize: function testMinSmallerThanSize() {
        this.setStretching(true, true);
        this.setSize(50, 150, null);
        this.assertHint(50, 150, Infinity);
      },
      testMaxSmallerThanSize: function testMaxSmallerThanSize() {
        this.setStretching(true, true);
        this.setSize(null, 100, 10);
        this.assertHint(0, 10, 10);
      },
      testMaxLargerThanSize: function testMaxLargerThanSize() {
        this.setStretching(true, true);
        this.setSize(null, 100, 150);
        this.assertHint(0, 100, 150);
      },
      testNoGrow: function testNoGrow() {
        this.setStretching(true, false);
        this.setSize(null, 100, null);
        this.assertHint(0, 100, 100);
      },
      testNoShrink: function testNoShrink() {
        this.setStretching(false, true);
        this.setSize(null, 100, null);
        this.assertHint(100, 100, Infinity);
      },
      testNoStretch: function testNoStretch() {
        this.setStretching(false, false);
        this.setSize(null, 100, null);
        this.assertHint(100, 100, 100);
      },
      testNoGrowAndMaxLargerThanSize: function testNoGrowAndMaxLargerThanSize() {
        this.setStretching(true, false);
        this.setSize(null, 100, 150);
        this.assertHint(0, 100, 100);
      },
      testNoGrowAndMaxSmallerThanSize: function testNoGrowAndMaxSmallerThanSize() {
        this.setStretching(true, false);
        this.setSize(null, 100, 50);
        this.assertHint(0, 50, 50);
      },
      testNoGrowAndMinLargerThanSize: function testNoGrowAndMinLargerThanSize() {
        this.setStretching(true, false);
        this.setSize(150, 100, null);
        this.assertHint(150, 150, 150);
      },
      testNoShrinkAndMinLargerSize: function testNoShrinkAndMinLargerSize() {
        this.setStretching(false, true);
        this.setSize(150, 100, null);
        this.assertHint(150, 150, Infinity);
      },
      testNoShrinkAndMinSmallerSize: function testNoShrinkAndMinSmallerSize() {
        this.setStretching(false, true);
        this.setSize(50, 100, null);
        this.assertHint(100, 100, Infinity);
      },
      testNoShrinkAndMaxSmallerSize: function testNoShrinkAndMaxSmallerSize() {
        this.setStretching(false, true);
        this.setSize(null, 100, 50);
        this.assertHint(50, 50, 50);
      },
      testMinLargerThanMax: function testMinLargerThanMax() {
        this.setStretching(true, true);
        this.setSize(200, 100, 150);
        if (this.isDebugOn()) {
          var that = this;
          this.assertException(function () {
            that.getHint();
          }, qx.core.AssertionError);
        }
      },
      testMinAndMaxLargerThanSize: function testMinAndMaxLargerThanSize() {
        this.setStretching(true, true);
        this.setSize(150, 100, 200);
        this.assertHint(150, 150, 200);
      },
      testMinAndMaxSmallerThanSize: function testMinAndMaxSmallerThanSize() {
        this.setStretching(true, true);
        this.setSize(150, 300, 200);
        this.assertHint(150, 200, 200);
      }
    }
  });
  qx.test.ui.core.SizeHint.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SizeHint.js.map?dt=1717235393560