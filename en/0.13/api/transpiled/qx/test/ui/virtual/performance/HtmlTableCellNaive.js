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
      "qx.test.ui.virtual.performance.layer.HtmlTableCellNaive": {}
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

  qx.Class.define("qx.test.ui.virtual.performance.HtmlTableCellNaive", {
    extend: qx.test.ui.virtual.performance.AbstractLayerTest,
    type: "abstract",
    // disabled

    members: {
      getLayer: function getLayer() {
        return new qx.test.ui.virtual.performance.layer.HtmlTableCellNaive(this);
      },
      getCellHtml: function getCellHtml(row, column, left, top, width, height) {
        var html = ["<td ", "width: " + width + " ", "height: " + height + " ", "style='", "border-collapse: collapse;", "margin: 0px;", "padding: 0px;", "'>", row, " / ", column, "</td>"];
        return html.join("");
      }
    }
  });
  qx.test.ui.virtual.performance.HtmlTableCellNaive.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=HtmlTableCellNaive.js.map?dt=1726089060840