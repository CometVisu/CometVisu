(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.progressive.renderer.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.ui.progressive.renderer.table.cell.Default": {
        "construct": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
      },
      "qx.theme.manager.Meta": {
        "construct": true
      },
      "qx.bom.client.Css": {
        "require": true
      },
      "qx.bom.Style": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.manager.Color": {},
      "qx.bom.Stylesheet": {},
      "qx.bom.element.Scroll": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.textoverflow": {
          "load": true,
          "className": "qx.bom.client.Css"
        },
        "css.userselect": {
          "load": true,
          "className": "qx.bom.client.Css"
        },
        "css.userselect.none": {
          "load": true,
          "className": "qx.bom.client.Css"
        },
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
      2008 Derrell Lipman
     License:
      MIT: https://opensource.org/licenses/MIT
      See the LICENSE file in the project's top-level directory for details.
     Authors:
      * Derrell Lipman (derrell)
  ************************************************************************ */

  /**
   * Table Row renderer for Progressive.
   */
  qx.Class.define("qx.ui.progressive.renderer.table.Row", {
    extend: qx.ui.progressive.renderer.Abstract,
    /**
     * @param columnWidths {qx.ui.progressive.renderer.table.Widths}
     *   Information that indicates how to resize each of the column widths
     */
    construct: function construct(columnWidths) {
      qx.ui.progressive.renderer.Abstract.constructor.call(this);

      // Save the column widths
      this.__P_431_0 = columnWidths;

      // Create space to store renderers for each column
      this.__P_431_1 = {};

      // We need a default cell renderer to use if none is specified
      this.__P_431_2 = new qx.ui.progressive.renderer.table.cell.Default();

      // We don't yet know who our Progressive will be
      this.__P_431_3 = null;
      this.__P_431_4 = {};
      this.__P_431_5();

      // This layout is not connected to a widget but to this class. This class
      // must implement the method "getLayoutChildren", which must return all
      // columns (LayoutItems) which should be recalculated. The call
      // "layout.renderLayout" will call the method "renderLayout" on each
      // column data object The advantage of the use of the normal layout
      // manager is that the semantics of flex and percent are exactly the same
      // as in the widget code.
      this.__P_431_6 = new qx.ui.layout.HBox();
      this.__P_431_6.connectToWidget(this);

      // dynamic theme switch
      {
        qx.theme.manager.Meta.getInstance().addListener("changeTheme", this.__P_431_5, this);
      }
    },
    statics: {
      /**
       * Storage for each progressive.
       *
       * @internal
       */
      __P_431_7: null,
      /**
       * Default row padding.
       *
       * @internal
       */
      __P_431_8: 6,
      // modify padding parameter below too if this changes

      /**
       * Default style sheet for table cells.
       *
       * @internal
       */
      __P_431_9: "  position: absolute;  top: 0px;  height: 100%;  overflow:hidden;" + (qx.core.Environment.get("css.textoverflow") ? qx.bom.Style.getCssName(qx.core.Environment.get("css.textoverflow")) + ":ellipsis;" : "") + "  white-space:nowrap;" + "  border-right:1px solid #f2f2f2;" + "  border-bottom:1px solid #eeeeee;" + "  padding : 0px 6px 0px 6px;" + "  cursor:default;" + "  font-size: 11px;" + "  font-family: 'Segoe UI', Corbel, Calibri, Tahoma, 'Lucida Sans Unicode', sans-serif;" + (qx.core.Environment.get("css.userselect") ? qx.bom.Style.getCssName(qx.core.Environment.get("css.userselect")) + ":" + qx.core.Environment.get("css.userselect.none") + ";" : "")
    },
    properties: {
      /** The default height of a row, if not altered by a cell renderer. */
      defaultRowHeight: {
        init: 16
      }
    },
    members: {
      __P_431_3: null,
      __P_431_10: null,
      __P_431_11: null,
      __P_431_0: null,
      __P_431_1: null,
      __P_431_2: null,
      __P_431_4: null,
      __P_431_6: null,
      /**
       * Helper to link the theme colors to the current class
       */
      __P_431_5: function __P_431_5() {
        // link to color theme
        var colorMgr = qx.theme.manager.Color.getInstance();
        this.__P_431_4.bgcol = [];
        this.__P_431_4.bgcol[0] = colorMgr.resolve("progressive-table-row-background-even");
        this.__P_431_4.bgcol[1] = colorMgr.resolve("progressive-table-row-background-odd");
      },
      // overridden
      join: function join(progressive, name) {
        // Are we already joined?
        if (this.__P_431_3) {
          // Yup.  Let 'em know they can't do that.
          throw new Error("Renderer is already joined to a Progressive.");
        }

        // Save the Progressive to which we're joined
        this.__P_431_3 = progressive;

        // Save the name that Progressive knows us by
        this.__P_431_10 = name;

        // If we haven't created style sheets for this table yet...
        var tr = qx.ui.progressive.renderer.table.Row;
        if (!tr.__P_431_7) {
          tr.__P_431_7 = {};
        }
        var hash = progressive.toHashCode();
        if (!tr.__P_431_7[hash]) {
          // ... then do it now.
          tr.__P_431_7[hash] = {
            rowstylesheet: null,
            cellstylesheet: []
          };
          var stylesheet = ".qx-progressive-" + hash + "-row {" + "  width : 100%;" + "}";
          tr.__P_431_7[hash].rowstylesheet = qx.bom.Stylesheet.createElement(stylesheet);
          var columnData = this.__P_431_0.getData();
          for (var i = 0; i < columnData.length; i++) {
            var stylesheet = ".qx-progressive-" + hash + "-col-" + i + " {" + tr.__P_431_9 + "}";
            tr.__P_431_7[hash].cellstylesheet[i] = qx.bom.Stylesheet.createElement(stylesheet);
          }

          // Save the hash too
          this.__P_431_11 = hash;

          // Arrange to be called when the window appears or is resized, so we
          // can set each style sheet's left and width field appropriately.
          var pane = progressive.getStructure().getPane();
          pane.addListener("resize", this._resizeColumns, this);
        }
      },
      /**
       * Add a cell renderer for use within a row rendered by this row
       * renderer.
       *
       * @param column {Integer}
       *   The column number for which the cell renderer applies
       *
       * @param renderer {qx.ui.progressive.renderer.table.cell.Abstract}
       *   The cell renderer for the specified column.
       *
       */
      addRenderer: function addRenderer(column, renderer) {
        var columnData = this.__P_431_0.getData();
        if (column < 0 || column >= columnData.length) {
          throw new Error("Column " + column + " out of range (max: " + (columnData.length - 1) + ")");
        }
        this.__P_431_1[column] = renderer;
      },
      /**
       * Remove a cell renderer previously added with {@link #addRenderer}.
       *
       * @param column {Integer}
       *   The column for which the cell renderer is to be removed.
       *
       */
      removeRenderer: function removeRenderer(column) {
        var columnData = this.__P_431_0.getData();
        if (column < 0 || column >= columnData.length) {
          throw new Error("Column " + column + " out of range (max: " + (columnData.length - 1) + ")");
        }
        if (!this.__P_431_1[column]) {
          throw new Error("No existing renderer for column " + column);
        }
        delete this.__P_431_1[column];
      },
      // overridden
      render: function render(state, element) {
        var data = element.data;
        var html = [];
        var cellInfo;
        var renderer;
        var height = 0;

        // Initialize row counter, if necessary.  We'll use this for shading
        // alternate rows.

        if (state.getRendererData()[this.__P_431_10].end === undefined) {
          state.getRendererData()[this.__P_431_10] = {
            end: 0,
            start: 1,
            rows: 0,
            totalHeight: 0
          };
        }

        // Create the div for this row
        var div = document.createElement("div");

        // For each cell...
        for (var i = 0; i < data.length; i++) {
          var stylesheet = "qx-progressive-" + this.__P_431_11 + "-col-" + i;

          // Determine what renderer to use for this column
          renderer = this.__P_431_1[i] || this.__P_431_2;

          // Specify information that cell renderer will need
          cellInfo = {
            state: state,
            rowDiv: div,
            stylesheet: stylesheet,
            element: element,
            dataIndex: i,
            cellData: data[i],
            height: height,
            rowRenderer: this // useful, e.g., for getting default row height
          };

          // Render this cell
          html.push(renderer.render(cellInfo));

          // If this cell's height was greater than our current maximum...
          if (cellInfo.height > height) {
            // ... then it becomes our row height
            height = cellInfo.height;
          }
        }
        height = height > 0 ? height : this.getDefaultRowHeight();

        // Get a reference to our renderer data
        var rendererData = state.getRendererData()[this.__P_431_10];

        // Track total height so we can determine if there's a vertical scrollbar
        rendererData.totalHeight += height;

        // Set properties for the row div
        div.style.position = "relative";
        div.style.height = height + "px";
        div.className = "qx-progressive-" + this.__P_431_11 + "-row";
        div.innerHTML = html.join("");

        // Add this row to the table
        switch (element.location) {
          case "end":
            // Determine color of row based on state of last added row
            var index = rendererData.end || 0;

            // Set the background color of this row
            div.style.backgroundColor = this.__P_431_4.bgcol[index];

            // Update state for next time
            rendererData.end = index == 0 ? 1 : 0;

            // Append our new row to the pane.
            state.getPane().getContentElement().getDomElement().appendChild(div);
            break;
          case "start":
            // Get the pane element
            var elem = state.getPane().getContentElement().getDomElement();

            // Get its children array
            var children = elem.childNodes;

            // Are there any children?
            if (children.length > 0) {
              // Yup.  Determine color of row based on state of last added row
              var index = rendererData.start;

              // Set the background color of this row
              div.style.backgroundColor = this.__P_431_4.bgcol[index];

              // Update state for next time
              rendererData.start = index == 0 ? 1 : 0;

              // Insert our new row before the first child.
              elem.insertBefore(div, children[0]);
              break;
            } else {
              /* No children yet.  We can append our new row. */
              elem.appendChild(div);
            }
            break;
          default:
            throw new Error("Invalid location: " + element.location);
        }

        // Increment row count
        ++rendererData.rows;
      },
      /**
       * This method is required by the box layout. If returns an array of items
       * to relayout.
       * @return {Array} Array of column data.
       */
      getLayoutChildren: function getLayoutChildren() {
        return this.__P_431_0.getData();
      },
      /**
       * Event handler for the "resize" event.  We recalculate the
       * widths of each of the columns, and modify the stylesheet rule
       * applicable to each column, to apply the new widths.
       *
       * @param e {qx.event.type.Event}
       *   Ignored
       *
       */
      _resizeColumns: function _resizeColumns(e) {
        var pane = this.__P_431_3.getStructure().getPane();
        var width = pane.getBounds().width - qx.bom.element.Scroll.getScrollbarWidth();

        // Get the style sheet rule name for this row
        var stylesheet = ".qx-progressive-" + this.__P_431_11 + "-row";

        // Remove the style rule for this row
        var tr = qx.ui.progressive.renderer.table.Row;
        qx.bom.Stylesheet.removeRule(tr.__P_431_7[this.__P_431_11].rowstylesheet, stylesheet);

        // Create the new rule for this row
        var rule = "width: " + width + "px;";

        // Apply the new rule
        qx.bom.Stylesheet.addRule(tr.__P_431_7[this.__P_431_11].rowstylesheet, stylesheet, rule);

        // Compute the column widths
        this.__P_431_6.renderLayout(width, 100, {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        });

        // Get the column data
        var columnData = this.__P_431_0.getData();

        // Reset each of the column style sheets to deal with width changes
        for (var i = 0, left = 0; i < columnData.length; i++, left += width) {
          // Get the style sheet rule name for this cell
          var stylesheet = ".qx-progressive-" + this.__P_431_11 + "-col-" + i;

          // Remove the style rule for this column
          var tr = qx.ui.progressive.renderer.table.Row;
          qx.bom.Stylesheet.removeRule(tr.__P_431_7[this.__P_431_11].cellstylesheet[i], stylesheet);

          // Get this column width.
          width = columnData[i].getComputedWidth();
          // Make our width calculations box-model independent
          var inset;
          if (qx.core.Environment.get("css.boxmodel") == "content") {
            inset = qx.ui.progressive.renderer.table.Row.__P_431_8 * 2;
          } else {
            inset = -1;
          }

          // Create the new rule, based on calculated widths
          var widthRule = width - inset + "px;";
          var paddingRule = "0px " + qx.ui.progressive.renderer.table.Row.__P_431_8 + "px " + "0px " + qx.ui.progressive.renderer.table.Row.__P_431_8 + "px;";
          var leftRule = left + "px;";
          var rule = tr.__P_431_9 + "width: " + widthRule + "left: " + leftRule + "padding: " + paddingRule;

          // Apply the new rule
          qx.bom.Stylesheet.addRule(tr.__P_431_7[this.__P_431_11].cellstylesheet[i], stylesheet, rule);
        }
      }
    },
    destruct: function destruct() {
      // remove dynamic theme listener
      qx.theme.manager.Meta.getInstance().removeListener("changeTheme", this.__P_431_5, this);
      var name;
      for (name in this.__P_431_1) {
        this.__P_431_1[name] = null;
      }

      // Remove any style sheets that we had added
      var tr = qx.ui.progressive.renderer.table.Row;
      var hash = this.__P_431_3.toHashCode();
      if (tr.__P_431_7 && tr.__P_431_7[hash]) {
        // Remove the row stylesheet
        if (tr.__P_431_7[hash].rowstylesheet) {
          // Get the style sheet rule name for this row
          var stylesheet = ".qx-progressive-" + this.__P_431_11 + "-row";

          // Remove the style rule for this row
          var tr = qx.ui.progressive.renderer.table.Row;
          qx.bom.Stylesheet.removeRule(tr.__P_431_7[this.__P_431_11].rowstylesheet, stylesheet);
        }

        // Remove each of the column style sheets
        if (tr.__P_431_7[hash].cellstylesheet) {
          for (var i = tr.__P_431_7[hash].cellstylesheet.length - 1; i >= 0; i--) {
            // Get the style sheet rule name for this cell
            var stylesheet = ".qx-progressive-" + this.__P_431_11 + "-col-" + i;
            var rule = tr.__P_431_7[this.__P_431_11].cellstylesheet[i];

            // Remove the style rule for this column
            var tr = qx.ui.progressive.renderer.table.Row;
            qx.bom.Stylesheet.removeRule(rule, stylesheet);
          }
        }
      }
      if (this.__P_431_3 && this.__P_431_3.getRendererData) {
        var rendererData = this.__P_431_3.getRendererData();
        if (rendererData && rendererData[this.__P_431_10] && rendererData[this.__P_431_10].end !== undefined) {
          rendererData[this.__P_431_10] = null;
        }
      }
      this.__P_431_4 = this.__P_431_1 = this.__P_431_3 = this.__P_431_0 = null;
      this._disposeObjects("__P_431_6", "__P_431_2", "__columnData");
    }
  });
  qx.ui.progressive.renderer.table.Row.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Row.js.map?dt=1705596682425