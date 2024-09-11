(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.virtual.performance.AbstractLayerTest": {
        "construct": true,
        "require": true
      },
      "qx.ui.virtual.layer.WidgetCell": {},
      "qx.ui.basic.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  qx.Class.define("qx.test.ui.virtual.performance.WidgetCell", {
    extend: qx.test.ui.virtual.performance.AbstractLayerTest,
    type: "abstract",
    // disabled
    construct: function construct() {
      qx.test.ui.virtual.performance.AbstractLayerTest.constructor.call(this);
      this._pool = [];
    },
    members: {
      ITERATIONS: 3,
      getLayer: function getLayer() {
        return new qx.ui.virtual.layer.WidgetCell(this);
      },
      getCellWidget: function getCellWidget(row, column) {
        var widget = this._pool.pop() || new qx.ui.basic.Label();
        widget.setContent(row + " / " + column);
        return widget;
      },
      poolCellWidget: function poolCellWidget(widget) {
        this._pool.push(widget);
      }
    }
  });
  qx.test.ui.virtual.performance.WidgetCell.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=WidgetCell.js.map?dt=1726089060868