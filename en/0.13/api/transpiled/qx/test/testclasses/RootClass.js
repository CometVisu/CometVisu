(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.core.Assert": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.testclasses.RootClass", {
    extend: qx.core.Object,
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      qx.core.Assert.assertTrue(this.state === null);
      this.state = ["root"];
    },
    members: {
      state: null,
      getSomething: function getSomething() {
        return "root";
      }
    }
  });
  qx.test.testclasses.RootClass.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RootClass.js.map?dt=1735222430262