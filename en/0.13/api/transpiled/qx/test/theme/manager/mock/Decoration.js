(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.simple.Decoration": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Theme.define("qx.test.theme.manager.mock.Decoration", {
    extend: qx.theme.simple.Decoration,
    decorations: {
      button: {
        style: {
          radius: 10,
          color: "border-button",
          width: 2,
          startColor: "button-start",
          endColor: "button-end",
          startColorPosition: 35,
          endColorPosition: 100
        }
      },
      "test-button-gradient": {
        style: {
          radius: 10,
          color: "border-button",
          width: 2,
          startColor: "red",
          endColor: "blue"
        }
      }
    }
  });
  qx.test.theme.manager.mock.Decoration.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Decoration.js.map?dt=1729101243423