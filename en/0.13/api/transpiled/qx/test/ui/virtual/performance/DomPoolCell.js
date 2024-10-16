(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.virtual.performance.AbstractLayerTest": {
        "require": true
      },
      "qx.test.ui.virtual.performance.layer.DomPoolCell": {}
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

  qx.Class.define("qx.test.ui.virtual.performance.DomPoolCell", {
    extend: qx.test.ui.virtual.performance.AbstractLayerTest,
    type: "abstract",
    // disabled

    members: {
      getLayer: function getLayer() {
        return new qx.test.ui.virtual.performance.layer.DomPoolCell();
      }
    }
  });
  qx.test.ui.virtual.performance.DomPoolCell.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DomPoolCell.js.map?dt=1729101247329