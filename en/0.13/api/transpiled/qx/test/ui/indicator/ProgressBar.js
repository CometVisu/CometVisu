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
      "qx.ui.indicator.ProgressBar": {}
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
       * Adrian Olaru (adrianolaru)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.indicator.ProgressBar", {
    extend: qx.dev.unit.TestCase,
    members: {
      __P_423_0: null,
      tearDown: function tearDown() {
        this.__P_423_0.destroy();
      },
      testConstructor: function testConstructor() {
        //defaults
        var val = 0,
          max = 100;
        this.__P_423_0 = new qx.ui.indicator.ProgressBar();
        this.assertIdentical(val, this.__P_423_0.getValue());
        this.assertIdentical(max, this.__P_423_0.getMaximum());

        //value
        val = 10;
        this.__P_423_0.dispose();
        this.__P_423_0 = new qx.ui.indicator.ProgressBar(val);
        this.assertIdentical(val, this.__P_423_0.getValue());
        this.assertIdentical(max, this.__P_423_0.getMaximum());

        //value, max
        max = 120;
        this.__P_423_0.dispose();
        this.__P_423_0 = new qx.ui.indicator.ProgressBar(val, max);
        this.assertIdentical(val, this.__P_423_0.getValue());
        this.assertIdentical(max, this.__P_423_0.getMaximum());

        //limit value to max
        this.__P_423_0.dispose();
        this.__P_423_0 = new qx.ui.indicator.ProgressBar(1200, 1000);
        this.assertIdentical(1000, this.__P_423_0.getValue());
        this.assertIdentical(1000, this.__P_423_0.getMaximum());
      },
      testValue: function testValue() {
        var val = 20;
        this.__P_423_0 = new qx.ui.indicator.ProgressBar();

        //returns exactly what was set
        this.assertIdentical(val, this.__P_423_0.setValue(val));
        this.assertIdentical(val, this.__P_423_0.getValue());
      },
      testLimitValueToZero: function testLimitValueToZero() {
        this.__P_423_0 = new qx.ui.indicator.ProgressBar();
        this.__P_423_0.setValue(-20);
        this.assertIdentical(0, this.__P_423_0.getValue());
      },
      testLimitValueToMaximum: function testLimitValueToMaximum() {
        this.__P_423_0 = new qx.ui.indicator.ProgressBar();
        this.__P_423_0.setValue(this.__P_423_0.getMaximum() + 1);
        this.assertIdentical(this.__P_423_0.getMaximum(), this.__P_423_0.getValue());
      },
      testMaximum: function testMaximum() {
        var max = 200;
        this.__P_423_0 = new qx.ui.indicator.ProgressBar();

        //returns exactly what was set
        this.assertIdentical(max, this.__P_423_0.setMaximum(max));
        this.assertIdentical(max, this.__P_423_0.getMaximum());
      },
      testDoNothingIfMaximumIsSetToZero: function testDoNothingIfMaximumIsSetToZero() {
        this.__P_423_0 = new qx.ui.indicator.ProgressBar();
        this.__P_423_0.setMaximum(0);

        //default is 100
        this.assertIdentical(100, this.__P_423_0.getMaximum());
      },
      testLimitMaximumToValue: function testLimitMaximumToValue() {
        var val = 20;
        this.__P_423_0 = new qx.ui.indicator.ProgressBar();
        this.__P_423_0.setValue(val);
        this.__P_423_0.setMaximum(val - 1);
        this.assertIdentical(val, this.__P_423_0.getMaximum());
      },
      testChangeEvent: function testChangeEvent() {
        var that = this,
          val = 10;
        this.__P_423_0 = new qx.ui.indicator.ProgressBar();
        this.assertEventFired(this.__P_423_0, "change", function () {
          that.__P_423_0.setValue(val);
        }, function (e) {
          that.assertIdentical(0, e.getOldData());
          that.assertIdentical(val, e.getData());
        }, "event not fired.");
      },
      testCompleteEvent: function testCompleteEvent() {
        var that = this,
          max = this.__P_423_0.getMaximum();
        this.__P_423_0 = new qx.ui.indicator.ProgressBar();
        this.assertEventFired(this.__P_423_0, "complete", function () {
          that.__P_423_0.setValue(max);
        }, null, "event not fired.");
        max = 200;
        this.__P_423_0.dispose();
        this.__P_423_0 = new qx.ui.indicator.ProgressBar(0, max);
        this.assertEventFired(this.__P_423_0, "complete", function () {
          that.__P_423_0.setValue(max);
        }, null, "event not fired.");
      },
      testCompleteEventFiresOnTime: function testCompleteEventFiresOnTime() {
        var that = this,
          max = 200;
        this.__P_423_0 = new qx.ui.indicator.ProgressBar(0, max);
        this.assertEventNotFired(this.__P_423_0, "complete", function () {
          that.__P_423_0.setValue(max - 1);
        }, null, "event fired.");
        this.assertEventFired(this.__P_423_0, "complete", function () {
          that.__P_423_0.setValue(max);
        }, null, "event not fired.");
      }
    }
  });
  qx.test.ui.indicator.ProgressBar.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ProgressBar.js.map?dt=1735341781696