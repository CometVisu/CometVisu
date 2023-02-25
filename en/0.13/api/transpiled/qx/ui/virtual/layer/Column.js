(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.virtual.layer.AbstractBackground": {
        "require": true
      },
      "qx.lang.Array": {},
      "qx.bom.element.Style": {}
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

  /**
   * The Row layer renders row background colors.
   */
  qx.Class.define("qx.ui.virtual.layer.Column", {
    extend: qx.ui.virtual.layer.AbstractBackground,
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "column-layer"
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // overridden
      _fullUpdate: function _fullUpdate(firstRow, firstColumn, rowSizes, columnSizes) {
        var html = [];
        var height = qx.lang.Array.sum(rowSizes);
        var left = 0;
        var column = firstColumn;
        var childIndex = 0;
        for (var x = 0; x < columnSizes.length; x++) {
          var color = this.getColor(column);
          var backgroundColor = color ? "background-color:" + color + ";" : "";
          var decorator = this.getBackground(column);
          var styles = decorator ? qx.bom.element.Style.compile(decorator.getStyles()) : "";
          html.push("<div style='", "position: absolute;", "top: 0;", "left:", left, "px;", "width:", columnSizes[x], "px;", "height:", height, "px;", backgroundColor, styles, "'>", "</div>");
          childIndex++;
          left += columnSizes[x];
          column += 1;
        }
        var el = this.getContentElement().getDomElement();
        // hide element before changing the child nodes to avoid
        // premature reflow calculations
        el.style.display = "none";
        el.innerHTML = html.join("");
        el.style.display = "block";
        this._height = height;
      },
      updateLayerWindow: function updateLayerWindow(firstRow, firstColumn, rowSizes, columnSizes) {
        if (firstColumn !== this.getFirstColumn() || columnSizes.length !== this.getColumnSizes().length || this._height < qx.lang.Array.sum(rowSizes)) {
          this._fullUpdate(firstRow, firstColumn, rowSizes, columnSizes);
        }
      },
      // overridden
      setColor: function setColor(index, color) {
        qx.ui.virtual.layer.Column.superclass.prototype.setColor.call(this, index, color);
        var firstColumn = this.getFirstColumn();
        var lastColumn = firstColumn + this.getColumnSizes().length - 1;
        if (index >= firstColumn && index <= lastColumn) {
          this.updateLayerData();
        }
      }
    }
  });
  qx.ui.virtual.layer.Column.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Column.js.map?dt=1677362770472