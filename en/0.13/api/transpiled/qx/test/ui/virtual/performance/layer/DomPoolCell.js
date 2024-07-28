(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.virtual.layer.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.queue.Manager": {},
      "qx.bom.element.Style": {},
      "qx.bom.element.Attribute": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  qx.Class.define("qx.test.ui.virtual.performance.layer.DomPoolCell", {
    extend: qx.ui.virtual.layer.Abstract,
    construct: function construct() {
      qx.ui.virtual.layer.Abstract.constructor.call(this);
      this._nodePool = [];
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      _nodePool: null,
      _fullUpdate: function _fullUpdate(firstRow, firstColumn, rowSizes, columnSizes) {
        qx.ui.core.queue.Manager.flush();
        var start = new Date();
        var el = this.getContentElement().getDomElement();
        if (!el) {
          return;
        }
        var childNodes = el.childNodes;
        var i = 0;
        el.innerHTML = "";
        var Style = qx.bom.element.Style;
        var Attribute = qx.bom.element.Attribute;
        var left = 0;
        var top = 0;
        var row = firstRow;
        var col = firstColumn;
        for (var x = 0; x < rowSizes.length; x++) {
          var left = 0;
          var col = firstColumn;
          for (var y = 0; y < columnSizes.length; y++) {
            var content = col + " / " + row;
            var cell = childNodes[i++];
            if (!cell) {
              var cell = document.createElement("div");
              var doAppend = true;
            }
            Style.setCss(cell, ["position:absolute;", "left:", left, "px;", "top:", top, "px;", "width:", columnSizes[y], "px;", "height:", rowSizes[x], "px;"].join(""));
            Attribute.set(cell, "text", content);
            left += columnSizes[y];
            if (doAppend) {
              el.appendChild(cell);
            }
          }
          top += rowSizes[x];
          row++;
        }
        for (var j = i; j < childNodes.length; i++) {
          el.removeChild(childNodes[i]);
        }
      }
    }
  });
  qx.test.ui.virtual.performance.layer.DomPoolCell.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DomPoolCell.js.map?dt=1722151839199