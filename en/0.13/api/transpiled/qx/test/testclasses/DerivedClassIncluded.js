(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.testclasses.BaseClassIncluded": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.testclasses.DerivedClassIncluded", {
    extend: qx.test.testclasses.BaseClassIncluded,
    construct: function construct() {
      qx.test.testclasses.BaseClassIncluded.constructor.call(this);
      this.state.push("derived");
    },
    members: {
      getSomething: function getSomething() {
        return qx.test.testclasses.DerivedClassIncluded.superclass.prototype.getSomething.call(this) + ":derived";
      }
    }
  });
  qx.test.testclasses.DerivedClassIncluded.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DerivedClassIncluded.js.map?dt=1726089056645