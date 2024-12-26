(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.simple.Color": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Theme.define("qx.test.theme.manager.mock.Color", {
    extend: qx.theme.simple.Color,
    colors: {
      "text-label": "red",
      "border-button": "green",
      "button-start": "orange",
      "button-end": "yellow"
    }
  });
  qx.test.theme.manager.mock.Color.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Color.js.map?dt=1735222430392