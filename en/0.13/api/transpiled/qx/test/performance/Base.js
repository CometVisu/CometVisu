(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.performance.Base", {
    extend: qx.core.Object,
    members: {
      foo_base: function foo_base(a, b, c) {}
    }
  });
  qx.test.performance.Base.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Base.js.map?dt=1735383862907