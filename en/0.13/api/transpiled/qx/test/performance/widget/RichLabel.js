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
  qx.Class.define("qx.test.performance.widget.RichLabel", {
    extend: qx.test.performance.widget.AbstractWidget,
    members: {
      _createWidget: function _createWidget() {
        return new qx.ui.basic.Label("<b>juhu</b>").set({
          rich: true
        });
      }
    }
  });
  qx.test.performance.widget.RichLabel.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RichLabel.js.map?dt=1735222430160