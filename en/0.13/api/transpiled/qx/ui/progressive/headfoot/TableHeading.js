(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.progressive.headfoot.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.ui.basic.Atom": {
        "construct": true
      },
      "qx.ui.core.Widget": {
        "construct": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
      },
      "qx.bom.element.Scroll": {}
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
   * A header for a standard table.
   */
  qx.Class.define("qx.ui.progressive.headfoot.TableHeading", {
    extend: qx.ui.progressive.headfoot.Abstract,

    /**
     * @param columnWidths {qx.ui.progressive.renderer.table.Widths}
     *   The set of widths, minimum widths, and maximum widths to be used for
     *   each of the columns in the table.
     *
     * @param labelArr {Array}
     *   Array of labels, one for each of the columns.
     *
     */
    construct: function construct(columnWidths, labelArr) {
      qx.ui.progressive.headfoot.Abstract.constructor.call(this); // Save the Widths object containing all of our column widths

      this.__P_403_0 = columnWidths; // Get the array of column width data

      var columnData = columnWidths.getData(); // Create a place to put labels

      this.__P_403_1 = []; // For each label...

      for (var i = 0; i < columnData.length; i++) {
        // ... create an atom to hold the label
        var label = new qx.ui.basic.Atom(labelArr[i]);
        label.setAppearance("progressive-table-header-cell"); // Add the label to this heading.

        this.add(label); // Save this label so we can resize it later

        this.__P_403_1[i] = label;
      } // Add a spacer to take up the scroll-bar width


      var spacer = new qx.ui.core.Widget();
      spacer.set({
        height: 16,
        appearance: "progressive-table-header-cell",
        minWidth: 0,
        width: 0
      });
      this.add(spacer, {
        flex: 1
      }); // Arrange to be called when the window appears or is resized, so we
      // can set each style sheet's left and width field appropriately.

      this.addListener("resize", this._resizeColumns, this); // This layout is not connected to a widget but to this class. This class
      // must implement the method "getLayoutChildren", which must return all
      // columns (LayoutItems) which should be recalculated. The call
      // "layout.renderLayout" will call the method "renderLayout" on each
      // column data object The advantage of the use of the normal layout
      // manager is that the semantics of flex and percent are exactly the same
      // as in the widget code.

      this.__P_403_2 = new qx.ui.layout.HBox();

      this.__P_403_2.connectToWidget(this);
    },
    properties: {
      appearance: {
        refine: true,
        init: "progressive-table-header"
      }
    },
    members: {
      __P_403_0: null,
      __P_403_3: null,
      __P_403_1: null,
      __P_403_2: null,
      // overridden
      join: function join(progressive) {
        // Save the progressive handle
        qx.ui.progressive.headfoot.TableHeading.superclass.prototype.join.call(this, progressive);
      },

      /**
       * This method is required by the box layout. If returns an array of items
       * to relayout.
       * @return {Array} List of child items
       */
      getLayoutChildren: function getLayoutChildren() {
        if (this.__P_403_3) {
          return this.__P_403_0.getData();
        } else {
          return qx.ui.progressive.headfoot.TableHeading.superclass.prototype.getLayoutChildren.call(this);
        }
      },

      /**
       * Event handler for the "resize" event.  We recalculate and set the
       * new widths of each of our columns.
       *
       * @param e {qx.event.type.Event}
       *   Ignored.
       *
       */
      _resizeColumns: function _resizeColumns(e) {
        var insets = this.getInsets();
        var width = this.getBounds().width - qx.bom.element.Scroll.getScrollbarWidth() - insets.left - insets.right; // Compute the column widths

        this.__P_403_3 = true;
        var padding = {
          top: this.getPaddingTop(),
          right: this.getPaddingRight(),
          bottom: this.getPaddingBottom(),
          left: this.getPaddingLeft()
        };

        this.__P_403_2.renderLayout(width, 100, padding);

        this.__P_403_3 = false; // Get the column data

        var columnData = this.__P_403_0.getData(); // Get the column width data.  For each label...


        for (var i = 0; i < columnData.length; i++) {
          // ... reset the width of the corresponding column (label)
          this.__P_403_1[i].setWidth(columnData[i].getComputedWidth());
        }
      }
    },
    destruct: function destruct() {
      this.__P_403_0 = this.__P_403_1 = null;

      this._disposeObjects("_layout");
    }
  });
  qx.ui.progressive.headfoot.TableHeading.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TableHeading.js.map?dt=1664552181818