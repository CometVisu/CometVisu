(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.performance.widget.AbstractWidget": {
        "construct": true,
        "require": true
      },
      "qx.ui.decoration.Decorator": {
        "construct": true
      },
      "qx.ui.core.Widget": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.performance.widget.WidgetWithDecorator", {
    extend: qx.test.performance.widget.AbstractWidget,
    construct: function construct() {
      qx.test.performance.widget.AbstractWidget.constructor.call(this);
      this.__P_367_0 = new qx.ui.decoration.Decorator().set({
        width: 1,
        style: "solid",
        color: "red"
      });
    },
    members: {
      _createWidget: function _createWidget() {
        return new qx.ui.core.Widget().set({
          decorator: this.__P_367_0
        });
      }
    }
  });
  qx.test.performance.widget.WidgetWithDecorator.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=WidgetWithDecorator.js.map?dt=1731948118314