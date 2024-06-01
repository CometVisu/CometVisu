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
      "qx.data.marshal.Json": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.performance.data.Marshaling", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MMeasure,
    members: {
      CREATE_ITERATIONS: 100000,
      __P_365_0: null,
      __P_365_1: null,
      setUp: function setUp() {
        this.__P_365_1 = new qx.data.marshal.Json();
      },
      tearDown: function tearDown() {
        this.__P_365_1.dispose();
        this.__P_365_1 = null;
      },
      testJsonSimpleToClass: function testJsonSimpleToClass() {
        var data = {
          a: 10
        };
        var self = this;
        this.measure("simple json class creation", function () {
          for (var i = 0; i < self.CREATE_ITERATIONS; i++) {
            self.__P_365_1.toClass(data);
          }
        }, function () {
          qx.Class.undefine("qx.data.model.a");
        }, this.CREATE_ITERATIONS);
      },
      testJsonSimpleToClassWithBubble: function testJsonSimpleToClassWithBubble() {
        var data = {
          a: 10
        };
        var self = this;
        this.measure("simple json class creation with bubble events", function () {
          for (var i = 0; i < self.CREATE_ITERATIONS; i++) {
            self.__P_365_1.toClass(data, true);
          }
        }, function () {
          qx.Class.undefine("qx.data.model.a");
        }, this.CREATE_ITERATIONS);
      },
      testJsonSimpleToModel: function testJsonSimpleToModel() {
        var data = {
          a: 10
        };
        this.__P_365_1.toClass(data);
        var self = this;
        this.__P_365_0 = [];
        this.measure("simple json object creation", function () {
          for (var i = 0; i < self.CREATE_ITERATIONS; i++) {
            self.__P_365_0.push(self.__P_365_1.toModel(data));
          }
        }, function () {
          for (var i = 0; i < self.__P_365_0.length; i++) {
            self.__P_365_0[i].dispose();
          }
          qx.Class.undefine("qx.data.model.a");
        }, this.CREATE_ITERATIONS);
      }
    }
  });
  qx.test.performance.data.Marshaling.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Marshaling.js.map?dt=1717235392112