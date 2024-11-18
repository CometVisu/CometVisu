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
      "qx.ui.form.Button": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.performance.widget.Button", {
    extend: qx.test.performance.widget.AbstractWidget,
    members: {
      _createWidget: function _createWidget() {
        return new qx.ui.form.Button();
      }
    }
  });
  qx.test.performance.widget.Button.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Button.js.map?dt=1731948118273