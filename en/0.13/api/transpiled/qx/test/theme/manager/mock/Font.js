(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.simple.Font": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Theme.define("qx.test.theme.manager.mock.Font", {
    extend: qx.theme.simple.Font,
    fonts: {
      "default": {
        size: 99,
        family: ["arial", "sans-serif"]
      }
    }
  });
  qx.test.theme.manager.mock.Font.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Font.js.map?dt=1726089056884