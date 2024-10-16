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
  qx.Mixin.define("qx.test.testclasses.MMixinOne", {
    construct: function construct() {
      qx.core.Assert.assertTrue(this.state !== null);
      this.state.push("mixin-one");
    },
    members: {
      getSomething: function getSomething() {
        return "mixin-one";
      }
    }
  });
  qx.test.testclasses.MMixinOne.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MMixinOne.js.map?dt=1729101243218