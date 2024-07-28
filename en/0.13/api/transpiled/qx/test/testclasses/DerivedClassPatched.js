(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.testclasses.BaseClassPatched": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.testclasses.DerivedClassPatched", {
    extend: qx.test.testclasses.BaseClassPatched,
    construct: function construct() {
      qx.test.testclasses.BaseClassPatched.constructor.call(this);
      this.state.push("derived");
    },
    members: {
      getSomething: function getSomething() {
        return qx.test.testclasses.DerivedClassPatched.superclass.prototype.getSomething.call(this) + ":derived";
      }
    }
  });
  qx.test.testclasses.DerivedClassPatched.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DerivedClassPatched.js.map?dt=1722153830066