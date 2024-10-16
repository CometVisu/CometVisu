(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "defer": "runtime",
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
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.testclasses.BaseClassBoth", {
    extend: qx.test.testclasses.RootClass,
    include: [qx.test.testclasses.MMixinOne],
    construct: function construct() {
      qx.test.testclasses.RootClass.constructor.call(this);
      this.state.push("base");
    },
    defer: function defer() {
      qx.Class.patch(qx.test.testclasses.BaseClassBoth, qx.test.testclasses.MMixinTwo);
    }
  });
  qx.test.testclasses.BaseClassBoth.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BaseClassBoth.js.map?dt=1729101243146