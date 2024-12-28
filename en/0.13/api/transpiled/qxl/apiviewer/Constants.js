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
  qx.Class.define("qxl.apiviewer.Constants", {
    extend: qx.core.Object,
    statics: {
      /** {Map} The primitive types. These types will not be shown with links. */
      PRIMITIVES: {
        "var": true,
        "void": true,
        undefined: true,
        arguments: true,
        "null": true,
        varargs: true,
        Boolean: true,
        String: true,
        Number: true,
        Integer: true,
        PositiveNumber: true,
        PositiveInteger: true,
        Float: true,
        Double: true,
        Color: true,
        Error: true,
        RegExp: true,
        Object: true,
        Array: true,
        Map: true,
        Function: true,
        Date: true,
        Node: true,
        Element: true,
        Document: true,
        Window: true,
        Event: true
      },
      MDC_LINKS: {
        Event: "https://developer.mozilla.org/en/DOM/event",
        Window: "https://developer.mozilla.org/en/DOM/window",
        Document: "https://developer.mozilla.org/en/DOM/document",
        Element: "https://developer.mozilla.org/en/DOM/element",
        Node: "https://developer.mozilla.org/en/DOM/node",
        Date: "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date",
        Function: "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function",
        Array: "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array",
        Object: "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object",
        Map: "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object",
        RegExp: "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/RegExp",
        Error: "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error",
        Number: "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Number",
        Boolean: "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Boolean",
        String: "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String",
        undefined: "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/undefined",
        arguments: "https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/arguments",
        Font: "https://developer.mozilla.org/en/CSS/font",
        Color: "https://developer.mozilla.org/en/CSS/color"
      }
    }
  });
  qxl.apiviewer.Constants.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Constants.js.map?dt=1735383889257