(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Assert": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Mixin.define("qx.test.testclasses.MMixinTwo", {
    construct: function construct() {
      qx.core.Assert.assertTrue(this.state !== null);
      this.state.push("mixin-two");
    }
  });
  qx.test.testclasses.MMixinTwo.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MMixinTwo.js.map?dt=1717235392385