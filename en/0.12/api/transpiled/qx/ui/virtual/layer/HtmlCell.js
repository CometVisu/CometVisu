(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.virtual.layer.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.bom.client.Css": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.boxmodel": {
          "className": "qx.bom.client.Css"
        }
      }
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
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * The HtmlCell layer renders each cell with custom HTML markup. The concrete
   * markup for each cell is provided by a cell provider.
   */
  qx.Class.define("qx.ui.virtual.layer.HtmlCell", {
    extend: qx.ui.virtual.layer.Abstract,

    /**
     * @param htmlCellProvider {qx.ui.virtual.core.IHtmlCellProvider} This class
     *    provides the HTML markup for each cell.
     */
    construct: function construct(htmlCellProvider) {
      qx.ui.virtual.layer.Abstract.constructor.call(this);
      this.setZIndex(12);
      this._cellProvider = htmlCellProvider;
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * Get the cell size taking the box model into account
       *
       * @param width {Integer} The cell's (border-box) width in pixel
       * @param height {Integer} The cell's (border-box) height in pixel
       * @param insetX {Integer} The cell's horizontal insets, i.e. the sum of
       *    horizontal paddings and borders
       * @param insetY {Integer} The cell's vertical insets, i.e. the sum of
       *    vertical paddings and borders
       * @return {String} The CSS style string for the cell size
       */
      _getCellSizeStyle: function _getCellSizeStyle(width, height, insetX, insetY) {
        var style = "";

        if (qx.core.Environment.get("css.boxmodel") == "content") {
          width -= insetX;
          height -= insetY;
        }

        style += "width:" + width + "px;";
        style += "height:" + height + "px;";
        return style;
      },
      // overridden
      _fullUpdate: function _fullUpdate(firstRow, firstColumn, rowSizes, columnSizes) {
        var html = [];
        var left = 0;
        var top = 0;
        var row = firstRow;
        var column = firstColumn;

        for (var y = 0; y < rowSizes.length; y++) {
          var left = 0;
          var column = firstColumn;
          var height = rowSizes[y];

          for (var x = 0; x < columnSizes.length; x++) {
            var width = columnSizes[x];

            var cellProperties = this._cellProvider.getCellProperties(row, column);

            var insets = cellProperties.insets || [0, 0];
            html.push("<div ", "style='", "left:", left, "px;", "top:", top, "px;", this._getCellSizeStyle(width, height, insets[0], insets[1]), cellProperties.style || "", "' ", "class='", cellProperties.classes || "", "' ", cellProperties.attributes || "", ">", cellProperties.content || "", "</div>");
            column++;
            left += width;
          }

          top += height;
          row++;
        }

        this.getContentElement().setAttribute("html", html.join(""));
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._cellProvider = null;
    }
  });
  qx.ui.virtual.layer.HtmlCell.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=HtmlCell.js.map?dt=1590928208181