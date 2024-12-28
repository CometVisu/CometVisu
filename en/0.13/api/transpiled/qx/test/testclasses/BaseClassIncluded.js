(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.testclasses.RootClass": {
        "construct": true,
        "require": true
      },
      "qx.test.testclasses.MMixinOne": {
        "require": true
      },
      "qx.test.testclasses.MMixinTwo": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.testclasses.BaseClassIncluded", {
    extend: qx.test.testclasses.RootClass,
    include: [qx.test.testclasses.MMixinOne, qx.test.testclasses.MMixinTwo],
    construct: function construct() {
      qx.test.testclasses.RootClass.constructor.call(this);
      this.state.push("base");
    }
  });
  qx.test.testclasses.BaseClassIncluded.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BaseClassIncluded.js.map?dt=1735383863117