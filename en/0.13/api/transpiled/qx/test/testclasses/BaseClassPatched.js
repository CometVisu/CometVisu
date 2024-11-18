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
        "defer": "runtime"
      },
      "qx.test.testclasses.MMixinTwo": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.testclasses.BaseClassPatched", {
    extend: qx.test.testclasses.RootClass,
    construct: function construct() {
      qx.test.testclasses.RootClass.constructor.call(this);
      this.state.push("base");
    },
    defer: function defer() {
      qx.Class.patch(qx.test.testclasses.BaseClassPatched, qx.test.testclasses.MMixinOne);
      qx.Class.patch(qx.test.testclasses.BaseClassPatched, qx.test.testclasses.MMixinTwo);
    }
  });
  qx.test.testclasses.BaseClassPatched.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BaseClassPatched.js.map?dt=1731948118366