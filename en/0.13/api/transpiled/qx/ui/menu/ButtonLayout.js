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
      "qx.ui.layout.Abstract": {
        "require": true
      },
      "qx.lang.Array": {},
      "qx.ui.layout.Util": {},
      "qx.ui.menu.Menu": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.debug": {
          "load": true
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Layout used for the menu buttons which may contain four elements. A icon,
   * a label, a shortcut text and an arrow (for a sub menu)
   *
   * @internal
   */
  qx.Class.define("qx.ui.menu.ButtonLayout", {
    extend: qx.ui.layout.Abstract,
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // overridden
      verifyLayoutProperty: qx.core.Environment.select("qx.debug", {
        "true": function _true(item, name, value) {
          this.assert(name == "column", "The property '" + name + "' is not supported by the MenuButton layout!");
        },
        "false": null
      }),
      // overridden
      renderLayout: function renderLayout(availWidth, availHeight, padding) {
        var children = this._getLayoutChildren();
        var child;
        var column;
        var columnChildren = [];
        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];
          column = child.getLayoutProperties().column;
          columnChildren[column] = child;
        }
        var menu = this.__P_605_0(children[0]);
        var columns = menu.getColumnSizes();
        var spacing = menu.getSpacingX();

        // stretch label column
        var neededWidth = qx.lang.Array.sum(columns) + spacing * (columns.length - 1);
        if (neededWidth < availWidth) {
          columns[1] += availWidth - neededWidth;
        }
        var left = padding.left,
          top = padding.top;
        var Util = qx.ui.layout.Util;
        for (var i = 0, l = columns.length; i < l; i++) {
          child = columnChildren[i];
          if (child) {
            var hint = child.getSizeHint();
            var childTop = top + Util.computeVerticalAlignOffset(child.getAlignY() || "middle", hint.height, availHeight, 0, 0);
            var offsetLeft = Util.computeHorizontalAlignOffset(child.getAlignX() || "left", hint.width, columns[i], child.getMarginLeft(), child.getMarginRight());
            child.renderLayout(left + offsetLeft, childTop, hint.width, hint.height);
          }
          if (columns[i] > 0) {
            left += columns[i] + spacing;
          }
        }
      },
      /**
       * Get the widget's menu
       *
       * @param widget {qx.ui.core.Widget} the widget to get the menu for
       * @return {qx.ui.menu.Menu} the menu
       */
      __P_605_0: function __P_605_0(widget) {
        while (!(widget instanceof qx.ui.menu.Menu)) {
          widget = widget.getLayoutParent();
        }
        return widget;
      },
      // overridden
      _computeSizeHint: function _computeSizeHint() {
        var children = this._getLayoutChildren();
        var neededHeight = 0;
        var neededWidth = 0;
        for (var i = 0, l = children.length; i < l; i++) {
          var hint = children[i].getSizeHint();
          neededWidth += hint.width;
          neededHeight = Math.max(neededHeight, hint.height);
        }
        return {
          width: neededWidth,
          height: neededHeight
        };
      }
    }
  });
  qx.ui.menu.ButtonLayout.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ButtonLayout.js.map?dt=1722151854793