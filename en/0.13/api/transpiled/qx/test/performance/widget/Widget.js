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
  qx.Class.define("qx.test.performance.widget.Widget", {
    extend: qx.test.performance.widget.AbstractWidget,
    members: {
      _createWidget: function _createWidget() {
        return new qx.ui.core.Widget();
      }
    }
  });
  qx.test.performance.widget.Widget.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Widget.js.map?dt=1722153829960