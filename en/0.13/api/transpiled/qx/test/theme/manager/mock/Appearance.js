(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.simple.Appearance": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Theme.define("qx.test.theme.manager.mock.Appearance", {
    extend: qx.theme.simple.Appearance,
    appearances: {
      "test-button-gradient": {
        alias: "button",
        style: function style(states) {
          return {
            padding: [30, 80],
            decorator: "test-button-gradient"
          };
        }
      },
      "test-button-gradient/label": {
        style: function style(states) {
          return {
            textColor: "red"
          };
        }
      },
      "button-frame": {
        alias: "atom",
        style: function style(states) {
          return {
            decorator: "button-box",
            padding: [30, 80]
          };
        }
      },
      "button-frame/label": {
        alias: "atom/label",
        style: function style(states) {
          return {
            textColor: "text"
          };
        }
      }
    }
  });
  qx.test.theme.manager.mock.Appearance.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Appearance.js.map?dt=1726089056851