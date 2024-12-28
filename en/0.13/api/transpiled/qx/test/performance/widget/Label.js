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
      "qx.ui.basic.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.performance.widget.Label", {
    extend: qx.test.performance.widget.AbstractWidget,
    members: {
      _createWidget: function _createWidget() {
        return new qx.ui.basic.Label("juhu");
      }
    }
  });
  qx.test.performance.widget.Label.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Label.js.map?dt=1735383863060