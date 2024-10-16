(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Theme.define("qx.test.ui.core.AppearanceTheme", {
    appearances: {
      test: {
        style: function style(states) {
          return {
            backgroundColor: "red"
          };
        }
      },
      "test/text": {
        style: function style(states) {
          return {
            backgroundColor: "blue"
          };
        }
      },
      textfield: {
        style: function style(states) {
          return {
            backgroundColor: "green"
          };
        }
      },
      test2: {
        style: function style(states) {
          return {
            backgroundColor: "yellow"
          };
        }
      },
      "test2/text2": {
        style: function style(states) {
          return {
            backgroundColor: "black"
          };
        }
      }
    }
  });
  qx.test.ui.core.AppearanceTheme.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AppearanceTheme.js.map?dt=1729101244246