(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.util.format.NumberFormat": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.table.cellrenderer.Default": {
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
       2007 by Tartan Solutions, Inc, http://www.tartansolutions.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
  
     Authors:
       * Dan Hummon
  
  ************************************************************************ */

  /**
   * The conditional cell renderer allows special per cell formatting based on
   * conditions on the cell's value.
   *
   * @require(qx.util.format.NumberFormat)
   */
  qx.Class.define("qx.ui.table.cellrenderer.Conditional", {
    extend: qx.ui.table.cellrenderer.Default,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param align {String|null}
     *   The default text alignment to format the cell with by default.
     *
     * @param color {String|null}
     *   The default font color to format the cell with by default.
     *
     * @param style {String|null}
     *   The default font style to format the cell with by default.
     *
     * @param weight {String|null}
     *   The default font weight to format the cell with by default.
     */
    construct: function construct(align, color, style, weight) {
      qx.ui.table.cellrenderer.Default.constructor.call(this);
      this.numericAllowed = ["==", "!=", ">", "<", ">=", "<="];
      this.betweenAllowed = ["between", "!between"];
      this.conditions = [];
      this.__P_425_0 = align || "";
      this.__P_425_1 = color || "";
      this.__P_425_2 = style || "";
      this.__P_425_3 = weight || "";
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_425_0: null,
      __P_425_1: null,
      __P_425_2: null,
      __P_425_3: null,

      /**
       * Applies the cell styles to the style map.
       * @param condition {Array} The matched condition
       * @param style {Map} map of already applied styles.
       */
      __P_425_4: function __P_425_4(condition, style) {
        if (condition[1] != null) {
          style["text-align"] = condition[1];
        }

        if (condition[2] != null) {
          style["color"] = condition[2];
        }

        if (condition[3] != null) {
          style["font-style"] = condition[3];
        }

        if (condition[4] != null) {
          style["font-weight"] = condition[4];
        }
      },

      /**
       * The addNumericCondition method is used to add a basic numeric condition to
       * the cell renderer.
       *
       * Note: Passing null is different from passing an empty string in the align,
       * color, style and weight arguments. Null will allow pre-existing formatting
       * to pass through, where an empty string will clear it back to the default
       * formatting set in the constructor.
       *
       *
       * @param condition {String} The type of condition. Accepted strings are "==", "!=", ">", "<", ">=",
       *     and "<=".
       * @param value1 {Integer} The value to compare against.
       * @param align {String|null} The text alignment to format the cell with if the condition matches.
       * @param color {String|null} The font color to format the cell with if the condition matches.
       * @param style {String|null} The font style to format the cell with if the condition matches.
       * @param weight {String|null} The font weight to format the cell with if the condition matches.
       * @param target {String|null} The text value of the column to compare against. If this is null,
       *     comparisons will be against the contents of this cell.
       * @throws {Error} If the condition can not be recognized or value is null.
       */
      addNumericCondition: function addNumericCondition(condition, value1, align, color, style, weight, target) {
        var temp = null;

        if (this.numericAllowed.includes(condition)) {
          if (value1 != null) {
            temp = [condition, align, color, style, weight, value1, target];
          }
        }

        if (temp != null) {
          this.conditions.push(temp);
        } else {
          throw new Error("Condition not recognized or value is null!");
        }
      },

      /**
       * The addBetweenCondition method is used to add a between condition to the
       * cell renderer.
       *
       * Note: Passing null is different from passing an empty string in the align,
       * color, style and weight arguments. Null will allow pre-existing formatting
       * to pass through, where an empty string will clear it back to the default
       * formatting set in the constructor.
       *
       *
       * @param condition {String} The type of condition. Accepted strings are "between" and "!between".
       * @param value1 {Integer} The first value to compare against.
       * @param value2 {Integer} The second value to compare against.
       * @param align {String|null} The text alignment to format the cell with if the condition matches.
       * @param color {String|null} The font color to format the cell with if the condition matches.
       * @param style {String|null} The font style to format the cell with if the condition matches.
       * @param weight {String|null} The font weight to format the cell with if the condition matches.
       * @param target {String|null} The text value of the column to compare against. If this is null,
       *     comparisons will be against the contents of this cell.
       * @throws {Error} If the condition can not be recognized or value is null.
       */
      addBetweenCondition: function addBetweenCondition(condition, value1, value2, align, color, style, weight, target) {
        if (this.betweenAllowed.includes(condition)) {
          if (value1 != null && value2 != null) {
            var temp = [condition, align, color, style, weight, value1, value2, target];
          }
        }

        if (temp != null) {
          this.conditions.push(temp);
        } else {
          throw new Error("Condition not recognized or value1/value2 is null!");
        }
      },

      /**
       * The addRegex method is used to add a regular expression condition to the
       * cell renderer.
       *
       * Note: Passing null is different from passing an empty string in the align,
       * color, style and weight arguments. Null will allow pre-existing formatting
       * to pass through, where an empty string will clear it back to the default
       * formatting set in the constructor.
       *
       *
       * @param regex {String} The regular expression to match against.
       * @param align {String|null} The text alignment to format the cell with if the condition matches.
       * @param color {String|null} The font color to format the cell with if the condition matches.
       * @param style {String|null} The font style to format the cell with if the condition matches.
       * @param weight {String|null} The font weight to format the cell with if the condition matches.
       * @param target {String|null} The text value of the column to compare against. If this is null,
       *     comparisons will be against the contents of this cell.
       * @throws {Error} If the regex is null.
       */
      addRegex: function addRegex(regex, align, color, style, weight, target) {
        if (regex != null) {
          var temp = ["regex", align, color, style, weight, regex, target];
        }

        if (temp != null) {
          this.conditions.push(temp);
        } else {
          throw new Error("regex cannot be null!");
        }
      },

      /**
       * Overridden; called whenever the cell updates. The cell will iterate through
       * each available condition and apply formatting for those that
       * match. Multiple conditions can match, but later conditions will override
       * earlier ones. Conditions with null values will stack with other conditions
       * that apply to that value.
       *
       * @param cellInfo {Map} The information about the cell.
       *          See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.
       * @return {Map}
       */
      _getCellStyle: function _getCellStyle(cellInfo) {
        var tableModel = cellInfo.table.getTableModel();
        var i;
        var cond_test;
        var compareValue;
        var style = {
          "text-align": this.__P_425_0,
          "color": this.__P_425_1,
          "font-style": this.__P_425_2,
          "font-weight": this.__P_425_3
        };

        for (i in this.conditions) {
          cond_test = false;

          if (this.numericAllowed.includes(this.conditions[i][0])) {
            if (this.conditions[i][6] == null) {
              compareValue = cellInfo.value;
            } else {
              compareValue = tableModel.getValueById(this.conditions[i][6], cellInfo.row);
            }

            switch (this.conditions[i][0]) {
              case "==":
                if (compareValue == this.conditions[i][5]) {
                  cond_test = true;
                }

                break;

              case "!=":
                if (compareValue != this.conditions[i][5]) {
                  cond_test = true;
                }

                break;

              case ">":
                if (compareValue > this.conditions[i][5]) {
                  cond_test = true;
                }

                break;

              case "<":
                if (compareValue < this.conditions[i][5]) {
                  cond_test = true;
                }

                break;

              case ">=":
                if (compareValue >= this.conditions[i][5]) {
                  cond_test = true;
                }

                break;

              case "<=":
                if (compareValue <= this.conditions[i][5]) {
                  cond_test = true;
                }

                break;
            }
          } else if (this.betweenAllowed.includes(this.conditions[i][0])) {
            if (this.conditions[i][7] == null) {
              compareValue = cellInfo.value;
            } else {
              compareValue = tableModel.getValueById(this.conditions[i][7], cellInfo.row);
            }

            switch (this.conditions[i][0]) {
              case "between":
                if (compareValue >= this.conditions[i][5] && compareValue <= this.conditions[i][6]) {
                  cond_test = true;
                }

                break;

              case "!between":
                if (compareValue < this.conditions[i][5] || compareValue > this.conditions[i][6]) {
                  cond_test = true;
                }

                break;
            }
          } else if (this.conditions[i][0] == "regex") {
            if (this.conditions[i][6] == null) {
              compareValue = cellInfo.value;
            } else {
              compareValue = tableModel.getValueById(this.conditions[i][6], cellInfo.row);
            }

            var the_pattern = new RegExp(this.conditions[i][5], 'g');
            cond_test = the_pattern.test(compareValue);
          } // Apply formatting, if any.


          if (cond_test == true) {
            this.__P_425_4(this.conditions[i], style);
          }
        }

        var styleString = [];

        for (var key in style) {
          if (style[key]) {
            styleString.push(key, ":", style[key], ";");
          }
        }

        return styleString.join("");
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.numericAllowed = this.betweenAllowed = this.conditions = null;
    }
  });
  qx.ui.table.cellrenderer.Conditional.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Conditional.js.map?dt=1664557362523