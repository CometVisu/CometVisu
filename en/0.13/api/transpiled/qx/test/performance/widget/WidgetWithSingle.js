(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.performance.widget.AbstractWidget": {
        "require": true
      },
      "qx.ui.core.Widget": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.performance.widget.WidgetWithSingle", {
    extend: qx.test.performance.widget.AbstractWidget,
    members: {
      CREATE_ITERATIONS: 100,
      RESIZE_ITERATIONS: 50,
      DISPOSE_ITERATIONS: 100,
      _createWidget: function _createWidget() {
        return new qx.ui.core.Widget().set({
          decorator: "window"
        });
      }
    }
  });
  qx.test.performance.widget.WidgetWithSingle.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=WidgetWithSingle.js.map?dt=1726089056572