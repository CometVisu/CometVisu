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
   * Represents horizontal or vertical lines.
   */
  qx.Class.define("qx.ui.virtual.layer.GridLines", {
    extend: qx.ui.virtual.layer.Abstract,
    /**
     * @param orientation {String?"horizontal"} The grid line orientation.
     * @param lineColor {Color?null} The default color for grid lines
     * @param lineSize {PositiveInteger|null} The default width/height for grid
     *    lines.
     */
    construct: function construct(orientation, lineColor, lineSize) {
      qx.ui.virtual.layer.Abstract.constructor.call(this);
      this.setZIndex(11);
      if (lineColor) {
        this.setDefaultLineColor(lineColor);
      }
      if (lineSize !== undefined) {
        this.setDefaultLineSize(lineSize);
      }
      this.__P_709_0 = [];
      this.__P_709_1 = [];
      this._isHorizontal = (orientation || "horizontal") == "horizontal";
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /** The default color for grid lines.*/
      defaultLineColor: {
        init: "gray",
        check: "Color",
        themeable: true
      },
      /** The default width/height for grid lines.*/
      defaultLineSize: {
        init: 1,
        check: "PositiveInteger",
        themeable: true
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /** Stores the colors for deviant grid lines. */
      __P_709_0: null,
      /** Stores the width/height for deviant grid lines. */
      __P_709_1: null,
      /**
       * Whether horizontal lines are rendered
       *
       * @return {Boolean} Whether horizontal lines are rendered
       */
      isHorizontal: function isHorizontal() {
        return this._isHorizontal;
      },
      /**
       * Sets the color for the grid line with the given index.
       *
       * @param index {PositiveNumber} The index of the line.
       * @param color {Color} The color.
       */
      setLineColor: function setLineColor(index, color) {
        this.__P_709_0[index] = color;
        if (this.__P_709_2(index)) {
          this.updateLayerData();
        }
      },
      /**
       * Sets the width/height for the grid line with the given index.
       *
       * @param index {PositiveNumber} The index of the line.
       * @param size {PositiveInteger} The size.
       */
      setLineSize: function setLineSize(index, size) {
        this.__P_709_1[index] = size;
        if (this.__P_709_2(index)) {
          this.updateLayerData();
        }
      },
      /**
       * Whether the line with the given index is currently rendered (i.e. in the
       * layer's view port).
       *
       * @param index {Integer} The line's index
       * @return {Boolean} Whether the line is rendered
       */
      __P_709_2: function __P_709_2(index) {
        if (this._isHorizontal) {
          var firstColumn = this.getFirstColumn();
          var lastColumn = firstColumn + this.getColumnSizes().length - 1;
          return index >= firstColumn && index <= lastColumn;
        } else {
          var firstRow = this.getFirstRow();
          var lastRow = firstRow + this.getRowSizes().length - 1;
          return index >= firstRow && index <= lastRow;
        }
      },
      /**
       * Returns the size of the grid line with the given index.
       *
       * @param index {PositiveNumber} The index of the line.
       * @return {PositiveInteger} The size.
       */
      getLineSize: function getLineSize(index) {
        return this.__P_709_1[index] || this.getDefaultLineSize();
      },
      /**
       * Returns the color of the grid line with the given index.
       *
       * @param index {PositiveNumber} The index of the line.
       * @return {String} The color.
       */
      getLineColor: function getLineColor(index) {
        return this.__P_709_0[index] || this.getDefaultLineColor();
      },
      /**
       * Helper function to render horizontal lines.
       *
       * @param htmlArr {Array} An array to store the generated HTML in.
       * @param firstRow {Integer} The first visible row
       * @param rowSizes {Array} An array containing the row sizes.
       */
      __P_709_3: function __P_709_3(htmlArr, firstRow, rowSizes) {
        var top = 0;
        var color, height;
        for (var y = 0; y < rowSizes.length - 1; y++) {
          color = this.getLineColor(firstRow + y);
          height = this.getLineSize(firstRow + y);
          top += rowSizes[y];
          htmlArr.push("<div style='", "position: absolute;", "height: " + height + "px;", "width: 100%;", "top:", top - (height > 1 ? Math.floor(height / 2) : 1), "px;", "background-color:", color, "'>", "</div>");
        }
      },
      /**
       * Helper function to render vertical lines.
       *
       * @param htmlArr {Array} The array to store the generated HTML in.
       * @param firstColumn {Integer} The first visible column
       * @param columnSizes {Array} An array containing the column sizes.
       */
      __P_709_4: function __P_709_4(htmlArr, firstColumn, columnSizes) {
        var left = 0;
        var color, width;
        for (var x = 0; x < columnSizes.length - 1; x++) {
          color = this.getLineColor(firstColumn + x);
          width = this.getLineSize(firstColumn + x);
          left += columnSizes[x];
          htmlArr.push("<div style='", "position: absolute;", "width: " + width + "px;", "height: 100%;", "top: 0px;", "left:", left - (width > 1 ? Math.floor(width / 2) : 1), "px;", "background-color:", color, "'>", "</div>");
        }
      },
      // overridden
      _fullUpdate: function _fullUpdate(firstRow, firstColumn, rowSizes, columnSizes) {
        var html = [];
        if (this._isHorizontal) {
          this.__P_709_3(html, firstRow, rowSizes);
        } else {
          this.__P_709_4(html, firstColumn, columnSizes);
        }
        this.getContentElement().setAttribute("html", html.join(""));
      },
      // overridden
      _updateLayerWindow: function _updateLayerWindow(firstRow, firstColumn, rowSizes, columnSizes) {
        var rowChanged = firstRow !== this.getFirstRow() || rowSizes.length !== this.getRowSizes().length;
        var columnChanged = firstColumn !== this.getFirstColumn() || columnSizes.length !== this.getColumnSizes().length;
        if (this._isHorizontal && rowChanged || !this._isHorizontal && columnChanged) {
          this._fullUpdate(firstRow, firstColumn, rowSizes, columnSizes);
        }
      }
    },
    /*
     *****************************************************************************
        DESTRUCT
     *****************************************************************************
     */
    destruct: function destruct() {
      this.__P_709_0 = this.__P_709_1 = null;
    }
  });
  qx.ui.virtual.layer.GridLines.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=GridLines.js.map?dt=1731948143078