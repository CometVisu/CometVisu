(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.testclasses.BaseClassBoth": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.testclasses.DerivedClassBoth", {
    extend: qx.test.testclasses.BaseClassBoth,
    construct: function construct() {
      qx.test.testclasses.BaseClassBoth.constructor.call(this);
      this.state.push("derived");
    },
    members: {
      getSomething: function getSomething() {
        return qx.test.testclasses.DerivedClassBoth.superclass.prototype.getSomething.call(this) + ":derived";
      }
    }
  });
  qx.test.testclasses.DerivedClassBoth.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DerivedClassBoth.js.map?dt=1722151835069