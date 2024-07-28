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
      "qx.dev.unit.MMeasure": {
        "require": true
      },
      "qx.test.performance.Extend": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.performance.BaseCall", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MMeasure,
    members: {
      ITERATIONS: 100000,
      testBaseCall: function testBaseCall() {
        var obj = new qx.test.performance.Extend();
        var self = this;
        this.measure("this.base()", function () {
          for (var i = 0; i < self.ITERATIONS; i++) {
            obj.foo_base();
          }
        }, function () {}, this.ITERATIONS);
      },
      testPlainCall: function testPlainCall() {
        var obj = new qx.test.performance.Extend();
        var self = this;
        this.measure("Base.prototype.foo_base.call", function () {
          for (var i = 0; i < self.ITERATIONS; i++) {
            obj.foo_call();
          }
        }, function () {}, this.ITERATIONS);
      },
      testPlainApply: function testPlainApply() {
        var obj = new qx.test.performance.Extend();
        var self = this;
        this.measure("Base.prototype.foo_base.apply", function () {
          for (var i = 0; i < self.ITERATIONS; i++) {
            obj.foo_apply();
          }
        }, function () {}, this.ITERATIONS);
      }
    }
  });
  qx.test.performance.BaseCall.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BaseCall.js.map?dt=1722153829743