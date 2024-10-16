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
      "qx.util.placement.DirectAxis": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  qx.Class.define("qx.test.util.placement.DirectAxis", {
    extend: qx.dev.unit.TestCase,
    members: {
      setUp: function setUp() {
        this.axis = qx.util.placement.DirectAxis;
      },
      tearDown: function tearDown() {
        delete this.axis;
      },
      testEnoughSpace: function testEnoughSpace() {
        var size = 50;
        var target = {
          start: 500,
          end: 600
        };
        var offsets = {
          start: 10,
          end: 20
        };
        var areaSize = 1000;
        this.assertEquals(430, this.axis.computeStart(size, target, offsets, areaSize, "edge-start"));
        this.assertEquals(610, this.axis.computeStart(size, target, offsets, areaSize, "edge-end"));
        this.assertEquals(510, this.axis.computeStart(size, target, offsets, areaSize, "align-start"));
        this.assertEquals(535, this.axis.computeStart(size, target, offsets, areaSize, "align-center"));
        this.assertEquals(530, this.axis.computeStart(size, target, offsets, areaSize, "align-end"));
      }
    }
  });
  qx.test.util.placement.DirectAxis.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DirectAxis.js.map?dt=1729101248182