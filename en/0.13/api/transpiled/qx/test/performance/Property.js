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
      "qx.core.Object": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.performance.Property", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MMeasure,
    members: {
      SET_ITERATIONS: 10000,
      testPropertySet: function testPropertySet() {
        var Clazz = qx.Class.define("demo.MyClass", {
          extend: qx.core.Object,
          properties: {
            alpha: {
              init: null,
              nullable: true,
              check: "String",
              event: "changeAlpha"
            }
          }
        });
        var obj = new Clazz();
        obj.addListener("changeAlpha", function () {});
        var self = this;
        this.measure("property set", function () {
          for (var i = 0; i < self.SET_ITERATIONS; i++) {
            obj.setAlpha("value #" + i);
          }
        }, function () {
          obj.dispose();
          qx.Class.undefine("demo.MyClass");
        }, this.SET_ITERATIONS);
      },
      testAsyncPropertySet: function testAsyncPropertySet() {
        {
          (console.log || this.warn)("Long Stack Traces are enabled - this will significantly slow down the test");
        }
        var Clazz = qx.Class.define("demo.MyClass", {
          extend: qx.core.Object,
          properties: {
            alpha: {
              init: null,
              nullable: true,
              check: "String",
              event: "changeAlpha",
              async: true
            }
          }
        });
        var obj = new Clazz();
        obj.addListener("changeAlpha", function () {});
        var self = this;
        this.measure("property set", function () {
          for (var i = 0; i < self.SET_ITERATIONS; i++) {
            obj.setAlpha("value #" + i);
          }
        }, function () {
          obj.dispose();
          qx.Class.undefine("demo.MyClass");
        }, this.SET_ITERATIONS);
      }
    }
  });
  qx.test.performance.Property.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Property.js.map?dt=1722151834832