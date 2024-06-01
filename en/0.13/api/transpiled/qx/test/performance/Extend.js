(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.performance.Base": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.performance.Extend", {
    extend: qx.test.performance.Base,
    members: {
      foo_base: function foo_base(a, b, c) {
        qx.test.performance.Extend.superclass.prototype.foo_base.call(this, a, b, c);
      },
      foo_call: function foo_call(a, b, c) {
        qx.test.performance.Base.prototype.foo_base.call(this, a, b, c);
      },
      foo_apply: function foo_apply(a, b, c) {
        qx.test.performance.Base.prototype.foo_base.apply(this, arguments);
      }
    }
  });
  qx.test.performance.Extend.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Extend.js.map?dt=1717235392064