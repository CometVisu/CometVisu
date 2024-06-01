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
  qx.Class.define("qxl.apiviewer.UiModel", {
    extend: qx.core.Object,
    type: "singleton",
    properties: {
      /** whether to display inherited items */
      showInherited: {
        check: "Boolean",
        init: false,
        event: "changeShowInherited"
      },
      /** whether to display included items */
      showIncluded: {
        check: "Boolean",
        init: true,
        event: "changeShowIncluded"
      },
      /** whether to display protected items */
      expandProperties: {
        check: "Boolean",
        init: false,
        event: "changeExpandProperties"
      },
      /** whether to display protected items */
      showProtected: {
        check: "Boolean",
        init: false,
        event: "changeShowProtected"
      },
      /** whether to display private items */
      showPrivate: {
        check: "Boolean",
        init: false,
        event: "changeShowPrivate"
      },
      /** whether to display internal items */
      showInternal: {
        check: "Boolean",
        init: false,
        event: "changeShowInternal"
      }
    }
  });
  qxl.apiviewer.UiModel.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=UiModel.js.map?dt=1717235425304