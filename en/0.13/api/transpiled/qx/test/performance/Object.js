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
      "qx.core.Object": {},
      "qx.core.ObjectRegistry": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.performance.Object", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MMeasure,
    members: {
      CREATE_ITERATIONS: 100000,
      testObjectCreate: function testObjectCreate() {
        var objects = this.__P_365_0 = [];
        var self = this;
        this.measure("create qx.core.Object", function () {
          for (var i = 0; i < self.CREATE_ITERATIONS; i++) {
            objects.push(new qx.core.Object());
          }
        }, function () {
          self._disposeArray("__P_365_0");
        }, this.CREATE_ITERATIONS);
      },
      testToHashCode: function testToHashCode() {
        var objects = [];
        var self = this;
        this.measure("toHashCode qx.core.Object", function () {
          for (var i = 0; i < self.CREATE_ITERATIONS; i++) {
            var object = {};
            qx.core.ObjectRegistry.toHashCode(object);
            objects.push(object);
          }
        }, function () {
          for (var i = 0; i < objects.length; i++) {
            qx.core.ObjectRegistry.clearHashCode(objects[i]);
          }
        }, this.CREATE_ITERATIONS);
      }
    }
  });
  qx.test.performance.Object.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Object.js.map?dt=1735341779766