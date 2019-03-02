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
 * A vertical box layout.
 *
 * The vertical box layout lays out widgets in a vertical column, from top
 * to bottom.
 *
 * *Features*
 *
 * * Minimum and maximum dimensions
 * * Prioritized growing/shrinking (flex)
 * * Margins (with vertical collapsing)
 * * Auto sizing (ignoring percent values)
 * * Percent heights (not relevant for size hint)
 * * Alignment (child property {@link qx.ui.core.LayoutItem#alignY} is ignored)
 * * Vertical spacing (collapsed with margins)
 * * Reversed children layout (from last to first)
 * * Horizontal children stretching (respecting size hints)
 *
 * *Item Properties*
 *
 * <ul>
 * <li><strong>flex</strong> <em>(Integer)</em>: The flexibility of a layout item determines how the container
 *   distributes remaining empty space among its children. If items are made
 *   flexible, they can grow or shrink accordingly. Their relative flex values
 *   determine how the items are being resized, i.e. the larger the flex ratio
 *   of two items, the larger the resizing of the first item compared to the
 *   second.
 *
 *   If there is only one flex item in a layout container, its actual flex
 *   value is not relevant. To disallow items to become flexible, set the
 *   flex value to zero.
 * </li>
 * <li><strong>height</strong> <em>(String)</em>: Allows to define a percent
 *   height for the item. The height in percent, if specified, is used instead
 *   of the height defined by the size hint. The minimum and maximum height still
 *   takes care of the element's limits. It has no influence on the layout's
 *   size hint. Percent values are mostly useful for widgets which are sized by
 *   the outer hierarchy.
 * </li>
 * </ul>
 *
 * *Example*
 *
 * Here is a little example of how to use the vertical box layout.
 *
 * <pre class="javascript">
 * var layout = new qx.ui.layout.VBox();
 * layout.setSpacing(4); // apply spacing
 *
 * var container = new qx.ui.container.Composite(layout);
 *
 * container.add(new qx.ui.core.Widget());
 * container.add(new qx.ui.core.Widget());
 * container.add(new qx.ui.core.Widget());
 * </pre>
 *
 * *External Documentation*
 *
 * See <a href='http://manual.qooxdoo.org/${qxversion}/pages/layout/box.html'>extended documentation</a>
 * and links to demos for this layout.
 *
 */
qx.Class.define("qx.ui.layout.VBox",
{
  extend : qx.ui.layout.Abstract,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param spacing {Integer?0} The spacing between child widgets {@link #spacing}.
   * @param alignY {String?"top"} Vertical alignment of the whole children
   *     block {@link #alignY}.
   * @param separator {String|qx.ui.decoration.IDecorator?} A separator to be rendered between the items
   */
  construct : function(spacing, alignY, separator)
  {
    this.base(arguments);

    if (spacing) {
      this.setSpacing(spacing);
    }

    if (alignY) {
      this.setAlignY(alignY);
    }

    if (separator) {
      this.setSeparator(separator);
    }
  },





  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * Vertical alignment of the whole children block. The vertical
     * alignment of the child is completely ignored in VBoxes (
     * {@link qx.ui.core.LayoutItem#alignY}).
     */
    alignY :
    {
      check : [ "top", "middle", "bottom" ],
      init : "top",
      apply : "_applyLayoutChange"
    },


    /**
     * Horizontal alignment of each child. Can be overridden through
     * {@link qx.ui.core.LayoutItem#alignX}.
     */
    alignX :
    {
      check : [ "left", "center", "right" ],
      init : "left",
      apply : "_applyLayoutChange"
    },


    /** Vertical spacing between two children */
    spacing :
    {
      check : "Integer",
      init : 0,
      apply : "_applyLayoutChange"
    },


    /** Separator lines to use between the objects */
    separator :
    {
      check : "Decorator",
      nullable : true,
      apply : "_applyLayoutChange"
    },


    /** Whether the actual children list should be laid out in reversed order. */
    reversed :
    {
      check : "Boolean",
      init : false,
      apply : "_applyReversed"
    }
  },





  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __heights : null,
    __flexs : null,
    __enableFlex : null,
    __children : null,


    /*
    ---------------------------------------------------------------------------
      HELPER METHODS
    ---------------------------------------------------------------------------
    */

    // property apply
    _applyReversed : function()
    {
      // easiest way is to invalidate the cache
      this._invalidChildrenCache = true;

      // call normal layout change
      this._applyLayoutChange();
    },


    /**
     * Rebuilds caches for flex and percent layout properties
     */
    __rebuildCache : function()
    {
      var children = this._getLayoutChildren();
      var length = children.length;
      var enableFlex = false;
      var reuse = this.__heights && this.__heights.length != length && this.__flexs && this.__heights;
      var props;

      // Sparse array (keep old one if lengths has not been modified)
      var heights = reuse ? this.__heights : new Array(length);
      var flexs = reuse ? this.__flexs : new Array(length);

      // Reverse support
      if (this.getReversed()) {
        children = children.concat().reverse();
      }

      // Loop through children to preparse values
      for (var i=0; i<length; i++)
      {
        props = children[i].getLayoutProperties();

        if (props.height != null) {
          heights[i] = parseFloat(props.height) / 100;
        }

        if (props.flex != null)
        {
          flexs[i] = props.flex;
          enableFlex = true;
        } else {
          // reset (in case the index of the children changed: BUG #3131)
          flexs[i] = 0;
        }
      }

      // Store data
      if (!reuse)
      {
        this.__heights = heights;
        this.__flexs = flexs;
      }

      this.__enableFlex = enableFlex;
      this.__children = children;

      // Clear invalidation marker
      delete this._invalidChildrenCache;
    },





    /*
    ---------------------------------------------------------------------------
      LAYOUT INTERFACE
    ---------------------------------------------------------------------------
    */

    // overridden
    verifyLayoutProperty : qx.core.Environment.select("qx.debug",
    {
      "true" : function(item, name, value)
      {
        this.assert(name === "flex" || name === "height", "The property '"+name+"' is not supported by the VBox layout!");

        if (name =="height")
        {
          this.assertMatch(value, qx.ui.layout.Util.PERCENT_VALUE);
        }
        else
        {
          // flex
          this.assertNumber(value);
          this.assert(value >= 0);
        }
      },

      "false" : null
    }),


    // overridden
    renderLayout : function(availWidth, availHeight, padding)
    {
      // Rebuild flex/height caches
      if (this._invalidChildrenCache) {
        this.__rebuildCache();
      }

      // Cache children
      var children = this.__children;
      var length = children.length;
      var util = qx.ui.layout.Util;


      // Compute gaps
      var spacing = this.getSpacing();
      var separator = this.getSeparator();
      if (separator) {
        var gaps = util.computeVerticalSeparatorGaps(children, spacing, separator);
      } else {
        var gaps = util.computeVerticalGaps(children, spacing, true);
      }


      // First run to cache children data and compute allocated height
      var i, child, height, percent;
      var heights = [];
      var allocatedHeight = gaps;

      for (i=0; i<length; i+=1)
      {
        percent = this.__heights[i];

        height = percent != null ?
          Math.floor((availHeight - gaps) * percent) :
          children[i].getSizeHint().height;

        heights.push(height);
        allocatedHeight += height;
      }


      // Flex support (growing/shrinking)
      if (this.__enableFlex && allocatedHeight != availHeight)
      {
        var flexibles = {};
        var flex, offset;

        for (i=0; i<length; i+=1)
        {
          flex = this.__flexs[i];

          if (flex > 0)
          {
            hint = children[i].getSizeHint();

            flexibles[i]=
            {
              min : hint.minHeight,
              value : heights[i],
              max : hint.maxHeight,
              flex : flex
            };
          }
        }

        var result = util.computeFlexOffsets(flexibles, availHeight, allocatedHeight);

        for (i in result)
        {
          offset = result[i].offset;

          heights[i] += offset;
          allocatedHeight += offset;
        }
      }


      // Start with top coordinate
      var top = children[0].getMarginTop();

      // Alignment support
      if (allocatedHeight < availHeight && this.getAlignY() != "top")
      {
        top = availHeight - allocatedHeight;

        if (this.getAlignY() === "middle") {
          top = Math.round(top / 2);
        }
      }


      // Layouting children
      var hint, left, width, height, marginBottom, marginLeft, marginRight;

      // Pre configure separators
      this._clearSeparators();

      // Compute separator height
      if (separator)
      {
        var separatorInsets = qx.theme.manager.Decoration.getInstance().resolve(separator).getInsets();
        var separatorHeight = separatorInsets.top + separatorInsets.bottom;
      }

      // Render children and separators
      for (i=0; i<length; i+=1)
      {
        child = children[i];
        height = heights[i];
        hint = child.getSizeHint();

        marginLeft = child.getMarginLeft();
        marginRight = child.getMarginRight();

        // Find usable width
        width = Math.max(hint.minWidth, Math.min(availWidth-marginLeft-marginRight, hint.maxWidth));

        // Respect horizontal alignment
        left = util.computeHorizontalAlignOffset(child.getAlignX()||this.getAlignX(), width, availWidth, marginLeft, marginRight);

        // Add collapsed margin
        if (i > 0)
        {
          // Whether a separator has been configured
          if (separator)
          {
            // add margin of last child and spacing
            top += marginBottom + spacing;

            // then render the separator at this position
            this._renderSeparator(separator, {
              top : top + padding.top,
              left : padding.left,
              height : separatorHeight,
              width : availWidth
            });

            // and finally add the size of the separator, the spacing (again) and the top margin
            top += separatorHeight + spacing + child.getMarginTop();
          }
          else
          {
            // Support margin collapsing when no separator is defined
            top += util.collapseMargins(spacing, marginBottom, child.getMarginTop());
          }
        }

        // Layout child
        child.renderLayout(left + padding.left, top + padding.top, width, height);

        // Add height
        top += height;

        // Remember bottom margin (for collapsing)
        marginBottom = child.getMarginBottom();
      }
    },


    // overridden
    _computeSizeHint : function()
    {
      // Rebuild flex/height caches
      if (this._invalidChildrenCache) {
        this.__rebuildCache();
      }

      var util = qx.ui.layout.Util;
      var children = this.__children;

      // Initialize
      var minHeight=0, height=0, percentMinHeight=0;
      var minWidth=0, width=0;
      var child, hint, margin;

      // Iterate over children
      for (var i=0, l=children.length; i<l; i+=1)
      {
        child = children[i];
        hint = child.getSizeHint();

        // Sum up heights
        height += hint.height;

        // Detect if child is shrinkable or has percent height and update minHeight
        var flex = this.__flexs[i];
        var percent = this.__heights[i];
        if (flex) {
          minHeight += hint.minHeight;
        } else if (percent) {
          percentMinHeight = Math.max(percentMinHeight, Math.round(hint.minHeight/percent));
        } else {
          minHeight += hint.height;
        }

        // Build horizontal margin sum
        margin = child.getMarginLeft() + child.getMarginRight();

        // Find biggest width
        if ((hint.width+margin) > width) {
          width = hint.width + margin;
        }

        // Find biggest minWidth
        if ((hint.minWidth+margin) > minWidth) {
          minWidth = hint.minWidth + margin;
        }
      }

      minHeight += percentMinHeight;

      // Respect gaps
      var spacing = this.getSpacing();
      var separator = this.getSeparator();
      if (separator) {
        var gaps = util.computeVerticalSeparatorGaps(children, spacing, separator);
      } else {
        var gaps = util.computeVerticalGaps(children, spacing, true);
      }

      // Return hint
      return {
        minHeight : minHeight + gaps,
        height : height + gaps,
        minWidth : minWidth,
        width : width
      };
    }
  },



  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this.__heights = this.__flexs = this.__children = null;
  }
});
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
 * Common set of utility methods used by the standard qooxdoo layouts.
 *
 * @internal
 */
qx.Class.define("qx.ui.layout.Util",
{
  statics :
  {
    /** @type {RegExp} Regular expression to match percent values */
    PERCENT_VALUE : /[0-9]+(?:\.[0-9]+)?%/,


    /**
     * Computes the flex offsets needed to reduce the space
     * difference as much as possible by respecting the
     * potential of the given elements (being in the range of
     * their min/max values)
     *
     * @param flexibles {Map} Each entry must have these keys:
     *   <code>id</code>, <code>potential</code> and <code>flex</code>.
     *   The ID is used in the result map as the key for the user to work
     *   with later (e.g. upgrade sizes etc. to respect the given offset)
     *   The potential is an integer value which is the difference of the
     *   currently interesting direction (e.g. shrinking=width-minWidth, growing=
     *   maxWidth-width). The flex key holds the flex value of the item.
     * @param avail {Integer} Full available space to allocate (ignoring used one)
     * @param used {Integer} Size of already allocated space
     * @return {Map} A map which contains the calculated offsets under the key
     *   which is identical to the ID given in the incoming map.
     */
    computeFlexOffsets : function(flexibles, avail, used)
    {
      var child, key, flexSum, flexStep;
      var grow = avail > used;
      var remaining = Math.abs(avail - used);
      var roundingOffset, currentOffset;


      // Preprocess data
      var result = {};
      for (key in flexibles)
      {
        child = flexibles[key];
        result[key] =
        {
          potential : grow ? child.max - child.value : child.value - child.min,
          flex : grow ? child.flex : 1 / child.flex,
          offset : 0
        };
      }


      // Continue as long as we need to do anything
      while (remaining != 0)
      {
        // Find minimum potential for next correction
        flexStep = Infinity;
        flexSum = 0;
        for (key in result)
        {
          child = result[key];

          if (child.potential > 0)
          {
            flexSum += child.flex;
            flexStep = Math.min(flexStep, child.potential / child.flex);
          }
        }


        // No potential found, quit here
        if (flexSum == 0) {
          break;
        }


        // Respect maximum potential given through remaining space
        // The parent should always win in such conflicts.
        flexStep = Math.min(remaining, flexStep * flexSum) / flexSum;


        // Start with correction
        roundingOffset = 0;
        for (key in result)
        {
          child = result[key];

          if (child.potential > 0)
          {
            // Compute offset for this step
            currentOffset = Math.min(remaining, child.potential, Math.ceil(flexStep * child.flex));

            // Fix rounding issues
            roundingOffset += currentOffset - flexStep * child.flex;
            if (roundingOffset >= 1)
            {
              roundingOffset -= 1;
              currentOffset -= 1;
            }

            // Update child status
            child.potential -= currentOffset;

            if (grow) {
              child.offset += currentOffset;
            } else {
              child.offset -= currentOffset;
            }

            // Update parent status
            remaining -= currentOffset;
          }
        }
      }

      return result;
    },


    /**
     * Computes the offset which needs to be added to the top position
     * to result in the stated vertical alignment. Also respects
     * existing margins (without collapsing).
     *
     * @param align {String} One of <code>top</code>, <code>center</code> or <code>bottom</code>.
     * @param width {Integer} The visible width of the widget
     * @param availWidth {Integer} The available inner width of the parent
     * @param marginLeft {Integer?0} Optional left margin of the widget
     * @param marginRight {Integer?0} Optional right margin of the widget
     * @return {Integer} Computed top coordinate
     */
    computeHorizontalAlignOffset : function(align, width, availWidth, marginLeft, marginRight)
    {
      if (marginLeft == null) {
        marginLeft = 0;
      }

      if (marginRight == null) {
        marginRight = 0;
      }

      var value = 0;
      switch(align)
      {
        case "left":
          value = marginLeft;
          break;

        case "right":
          // Align right changes priority to right edge:
          // To align to the right is more important here than to left.
          value = availWidth - width - marginRight;
          break;

        case "center":
          // Ideal center position
          value = Math.round((availWidth - width) / 2);

          // Try to make this possible (with left-right priority)
          if (value < marginLeft) {
            value = marginLeft;
          } else if (value < marginRight) {
            value = Math.max(marginLeft, availWidth-width-marginRight);
          }

          break;
      }

      return value;
    },


    /**
     * Computes the offset which needs to be added to the top position
     * to result in the stated vertical alignment. Also respects
     * existing margins (without collapsing).
     *
     * @param align {String} One of <code>top</code>, <code>middle</code> or <code>bottom</code>.
     * @param height {Integer} The visible height of the widget
     * @param availHeight {Integer} The available inner height of the parent
     * @param marginTop {Integer?0} Optional top margin of the widget
     * @param marginBottom {Integer?0} Optional bottom margin of the widget
     * @return {Integer} Computed top coordinate
     */
    computeVerticalAlignOffset : function(align, height, availHeight, marginTop, marginBottom)
    {
      if (marginTop == null) {
        marginTop = 0;
      }

      if (marginBottom == null) {
        marginBottom = 0;
      }

      var value = 0;
      switch(align)
      {
        case "top":
          value = marginTop;
          break;

        case "bottom":
          // Align bottom changes priority to bottom edge:
          // To align to the bottom is more important here than to top.
          value = availHeight - height - marginBottom;
          break;

        case "middle":
          // Ideal middle position
          value = Math.round((availHeight - height) / 2);

          // Try to make this possible (with top-down priority)
          if (value < marginTop) {
            value = marginTop;
          } else if (value < marginBottom) {
            value = Math.max(marginTop, availHeight-height-marginBottom);
          }

          break;
      }

      return value;
    },


    /**
     * Collapses two margins.
     *
     * Supports positive and negative margins.
     * Collapsing find the largest positive and the largest
     * negative value. Afterwards the result is computed through the
     * subtraction of the negative from the positive value.
     *
     * @param varargs {arguments} Any number of configured margins
     * @return {Integer} The collapsed margin
     */
    collapseMargins : function(varargs)
    {
      var max=0, min=0;
      for (var i=0, l=arguments.length; i<l; i++)
      {
        var value = arguments[i];

        if (value < 0) {
          min = Math.min(min, value);
        } else if (value > 0) {
          max = Math.max(max, value);
        }
      }

      return max + min;
    },


    /**
     * Computes the sum of all horizontal gaps. Normally the
     * result is used to compute the available width in a widget.
     *
     * The method optionally respects margin collapsing as well. In
     * this mode the spacing is collapsed together with the margins.
     *
     * @param children {Array} List of children
     * @param spacing {Integer?0} Spacing between every child
     * @param collapse {Boolean?false} Optional margin collapsing mode
     * @return {Integer} Sum of all gaps in the final layout.
     */
    computeHorizontalGaps : function(children, spacing, collapse)
    {
      if (spacing == null) {
        spacing = 0;
      }

      var gaps = 0;

      if (collapse)
      {
        // Add first child
        gaps += children[0].getMarginLeft();

        for (var i=1, l=children.length; i<l; i+=1) {
          gaps += this.collapseMargins(spacing, children[i-1].getMarginRight(), children[i].getMarginLeft());
        }

        // Add last child
        gaps += children[l-1].getMarginRight();
      }
      else
      {
        // Simple adding of all margins
        for (var i=1, l=children.length; i<l; i+=1) {
          gaps += children[i].getMarginLeft() + children[i].getMarginRight();
        }

        // Add spacing
        gaps += (spacing * (l-1));
      }

      return gaps;
    },


    /**
     * Computes the sum of all vertical gaps. Normally the
     * result is used to compute the available height in a widget.
     *
     * The method optionally respects margin collapsing as well. In
     * this mode the spacing is collapsed together with the margins.
     *
     * @param children {Array} List of children
     * @param spacing {Integer?0} Spacing between every child
     * @param collapse {Boolean?false} Optional margin collapsing mode
     * @return {Integer} Sum of all gaps in the final layout.
     */
    computeVerticalGaps : function(children, spacing, collapse)
    {
      if (spacing == null) {
        spacing = 0;
      }

      var gaps = 0;

      if (collapse)
      {
        // Add first child
        gaps += children[0].getMarginTop();

        for (var i=1, l=children.length; i<l; i+=1) {
          gaps += this.collapseMargins(spacing, children[i-1].getMarginBottom(), children[i].getMarginTop());
        }

        // Add last child
        gaps += children[l-1].getMarginBottom();
      }
      else
      {
        // Simple adding of all margins
        for (var i=1, l=children.length; i<l; i+=1) {
          gaps += children[i].getMarginTop() + children[i].getMarginBottom();
        }

        // Add spacing
        gaps += (spacing * (l-1));
      }

      return gaps;
    },


    /**
     * Computes the gaps together with the configuration of separators.
     *
     * @param children {qx.ui.core.LayoutItem[]} List of children
     * @param spacing {Integer} Configured spacing
     * @param separator {String|qx.ui.decoration.IDecorator} Separator to render
     * @return {Integer} Sum of gaps
     */
    computeHorizontalSeparatorGaps : function(children, spacing, separator)
    {
      var instance = qx.theme.manager.Decoration.getInstance().resolve(separator);
      var insets = instance.getInsets();
      var width = insets.left + insets.right;

      var gaps = 0;
      for (var i=0, l=children.length; i<l; i++)
      {
        var child = children[i];
        gaps += child.getMarginLeft() + child.getMarginRight();
      }

      gaps += (spacing + width + spacing) * (l-1);

      return gaps;
    },


    /**
     * Computes the gaps together with the configuration of separators.
     *
     * @param children {qx.ui.core.LayoutItem[]} List of children
     * @param spacing {Integer} Configured spacing
     * @param separator {String|qx.ui.decoration.IDecorator} Separator to render
     * @return {Integer} Sum of gaps
     */
    computeVerticalSeparatorGaps : function(children, spacing, separator)
    {
      var instance = qx.theme.manager.Decoration.getInstance().resolve(separator);
      var insets = instance.getInsets();
      var height = insets.top + insets.bottom;

      var gaps = 0;
      for (var i=0, l=children.length; i<l; i++)
      {
        var child = children[i];
        gaps += child.getMarginTop() + child.getMarginBottom();
      }

      gaps += (spacing + height + spacing) * (l-1);

      return gaps;
    },


    /**
     * Arranges two sizes in one box to best respect their individual limitations.
     *
     * Mainly used by split layouts (Split Panes) where the layout is mainly defined
     * by the outer dimensions.
     *
     * @param beginMin {Integer} Minimum size of first widget (from size hint)
     * @param beginIdeal {Integer} Ideal size of first widget (maybe after dragging the splitter)
     * @param beginMax {Integer} Maximum size of first widget (from size hint)
     * @param endMin {Integer} Minimum size of second widget (from size hint)
     * @param endIdeal {Integer} Ideal size of second widget (maybe after dragging the splitter)
     * @param endMax {Integer} Maximum size of second widget (from size hint)
     * @return {Map} Map with the keys <code>begin</code and <code>end</code> with the
     *   arranged dimensions.
     */
    arrangeIdeals : function(beginMin, beginIdeal, beginMax, endMin, endIdeal, endMax)
    {
      if (beginIdeal < beginMin || endIdeal < endMin)
      {
        if (beginIdeal < beginMin && endIdeal < endMin)
        {
          // Just increase both, can not rearrange them otherwise
          // Result into overflowing of the overlapping content
          // Should normally not happen through auto sizing!
          beginIdeal = beginMin;
          endIdeal = endMin;
        }
        else if (beginIdeal < beginMin)
        {
          // Reduce end, increase begin to min
          endIdeal -= (beginMin - beginIdeal);
          beginIdeal = beginMin;

          // Re-check to keep min size of end
          if (endIdeal < endMin) {
            endIdeal = endMin;
          }
        }
        else if (endIdeal < endMin)
        {
          // Reduce begin, increase end to min
          beginIdeal -= (endMin - endIdeal);
          endIdeal = endMin;

          // Re-check to keep min size of begin
          if (beginIdeal < beginMin) {
            beginIdeal = beginMin;
          }
        }
      }

      if (beginIdeal > beginMax || endIdeal > endMax)
      {
        if (beginIdeal > beginMax && endIdeal > endMax)
        {
          // Just reduce both, can not rearrange them otherwise
          // Leaves a blank area in the pane!
          beginIdeal = beginMax;
          endIdeal = endMax;
        }
        else if (beginIdeal > beginMax)
        {
          // Increase end, reduce begin to max
          endIdeal += (beginIdeal - beginMax);
          beginIdeal = beginMax;

          // Re-check to keep max size of end
          if (endIdeal > endMax) {
            endIdeal = endMax;
          }
        }
        else if (endIdeal > endMax)
        {
          // Increase begin, reduce end to max
          beginIdeal += (endIdeal - endMax);
          endIdeal = endMax;

          // Re-check to keep max size of begin
          if (beginIdeal > beginMax) {
            beginIdeal = beginMax;
          }
        }
      }

      return {
        begin : beginIdeal,
        end : endIdeal
      };
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tristan Koch (tristankoch)
     * Richard Sternagel (rsternagel)

************************************************************************ */

/**
 * Client-side wrapper of a REST resource.
 *
 * Each instance represents a resource in terms of REST. A number of actions
 * (usually HTTP methods) unique to the resource can be defined and invoked.
 * A resource with its actions is configured declaratively by passing a resource
 * description to the constructor, or programmatically using {@link #map}.
 *
 * Each action is associated to a route. A route is a combination of method,
 * URL pattern and optional parameter constraints.
 *
 * An action is invoked by calling a method with the same name. When a URL
 * pattern of a route contains positional parameters, those parameters must be
 * passed when invoking the associated action. Also, constraints defined in the
 * route must be satisfied.
 *
 * When an action is invoked, a request is configured according to the associated
 * route, is passed the URL parameters, request body data, and finally send.
 * What kind of request is send can be configured by overwriting {@link #_getRequest}.
 *
 * No constraints on the action's name or the scope of the URLs are imposed. However,
 * if you want to follow RESTful design patterns it is recommended to name actions
 * the same as the HTTP action.
 *
 * <pre class="javascript">
 * var description = {
 *  "get": { method: "GET", url: "/photo/{id}" },
 *  "put": { method: "PUT", url: "/photo/{id}"},
 *  "post": { method: "POST", url: "/photos/"}
 * };
 * var photo = new qx.io.rest.Resource(description);
 * // Can also be written: photo.invoke("get", {id: 1});
 * photo.get({id: 1});
 *
 * // Additionally sets request data (provide it as string or set the content type)
 * // In a RESTful environment this creates a new resource with the given 'id'
 * photo.configureRequest(function(req) {
 *  req.setRequestHeader("Content-Type", "application/json");
 * });
 * photo.put({id: 1}, {title: "Monkey"});
 *
 * // Additionally sets request data (provide it as string or set the content type)
 * // In a RESTful environment this adds a new resource to the resource collection 'photos'
 * photo.configureRequest(function(req) {
 *  req.setRequestHeader("Content-Type", "application/json");
 * });
 * photo.post(null, {title: "Monkey"});
 * </pre>
 *
 * To check for existence of URL parameters or constrain them to a certain format, you
 * can add a <code>check</code> property to the description. See {@link #map} for details.
 *
 * <pre class="javascript">
 * var description = {
 *  "get": { method: "GET", url: "/photo/{id}", check: { id: /\d+/ } }
 * };
 * var photo = new qx.io.rest.Resource(description);
 * // photo.get({id: "FAIL"});
 * // -- Error: "Parameter 'id' is invalid"
 * </pre>
 *
 * If your description happens to use the same action more than once, consider
 * defining another resource.
 *
 * <pre class="javascript">
 * var description = {
 *  "get": { method: "GET", url: "/photos"},
 * };
 * // Distinguish "photo" (singular) and "photos" (plural) resource
 * var photos = new qx.io.rest.Resource(description);
 * photos.get();
 * </pre>
 *
 * Basically, all routes of a resource should point to the same URL (resource in
 * terms of HTTP). One acceptable exception of this constraint are resources where
 * required parameters are part of the URL (<code>/photos/1/</code>) or filter
 * resources. For instance:
 *
 * <pre class="javascript">
 * var description = {
 *  "get": { method: "GET", url: "/photos/{tag}" }
 * };
 * var photos = new qx.io.rest.Resource(description);
 * photos.get();
 * photos.get({tag: "wildlife"})
 * </pre>
 *
 * Strictly speaking, the <code>photos</code> instance represents two distinct resources
 * and could therefore just as well mapped to two distinct resources (for instance,
 * named photos and photosTagged). What style to choose depends on the kind of data
 * returned. For instance, it seems sensible to stick with one resource if the filter
 * only limits the result set (i.e. the individual results have the same properties).
 *
 * In order to respond to successful (or erroneous) invocations of actions,
 * either listen to the generic "success" or "error" event and get the action
 * from the event data, or listen to action specific events defined at runtime.
 * Action specific events follow the pattern "&lt;action&gt;Success" and
 * "&lt;action&gt;Error", e.g. "indexSuccess".
 * 
 * NOTE: Instances of this class must be disposed of after use
 *
 */
qx.Class.define("qx.io.rest.Resource",
{
  extend: qx.core.Object,
  implement : [ qx.core.IDisposable ],

  /**
   * @param description {Map?} Each key of the map is interpreted as
   *  <code>action</code> name. The value associated to the key must be a map
   *  with the properties <code>method</code> and <code>url</code>.
   *  <code>check</code> is optional. Also see {@link #map}.
   *
   * For example:
   *
   * <pre class="javascript">
   * { get: {method: "GET", url: "/photos/{id}", check: { id: /\d+/ }} }
   * </pre>
   *
   * @see qx.bom.rest
   * @see qx.io.rest
   */
  construct: function(description)
  {
    this.base(arguments);

    this.__longPollHandlers = {};
    this.__pollTimers = {};
    this.__routes = {};

    this._resource = this._tailorResource(this._getResource());

    try {
      if (typeof description !== "undefined") {
        if (qx.core.Environment.get("qx.debug")) {
          qx.core.Assert.assertMap(description);
        }
        this.__mapFromDescription(description);
      }
    } catch(e) {
      this.dispose();
      throw e;
    }
  },

  events:
  {
    /**
     * Fired when any request was successful.
     *
     * The action the successful request is associated to, as well as the
     * request itself, can be retrieved from the event’s properties.
     * Additionally, an action specific event is fired that follows the pattern
     * "<action>Success", e.g. "indexSuccess".
     */
    "success": "qx.event.type.Rest",

    /**
     * Fired when request associated to action given in prefix was successful.
     *
     * For example, "indexSuccess" is fired when <code>index()</code> was
     * successful.
     */
    "actionSuccess": "qx.event.type.Rest",

    /**
     * Fired when any request fails.
     *
     * The action the failed request is associated to, as well as the
     * request itself, can be retrieved from the event’s properties.
     * Additionally, an action specific event is fired that follows the pattern
     * "<action>Error", e.g. "indexError".
     */
    "error": "qx.event.type.Rest",

    /**
     * Fired when any request associated to action given in prefix fails.
     *
     * For example, "indexError" is fired when <code>index()</code> failed.
     */
    "actionError": "qx.event.type.Rest"
  },

  statics:
  {
    /**
     * Number of milliseconds below a long-poll request is considered immediate and
     * subject to throttling checks.
     */
    POLL_THROTTLE_LIMIT: 100,

    /**
     * Number of immediate long-poll responses accepted before throttling takes place.
     */
    POLL_THROTTLE_COUNT: 30,

    /**
     * A symbol used in checks to declare required parameter.
     */
    REQUIRED: true,

    /**
     * Get placeholders from URL.
     *
     * @param url {String} The URL to parse for placeholders.
     * @return {Array} Array of placeholders without the placeholder prefix.
     */
    placeholdersFromUrl: function(url) {
      return qx.bom.rest.Resource.placeholdersFromUrl(url);
    }
  },

  members:
  {
    _resource: null,
    __longPollHandlers: null,
    __pollTimers: null,
    __routes: null,

    /**
     * Get resource.
     *
     * May be overridden to change type of resource.
     * @param description {Map?} See construct.
     * @return {qx.bom.rest.Resource} Resource implementation which does the heavy lifting.
     */
    _getResource: function(description) {
      return new qx.bom.rest.Resource(description);
    },

    /**
     * Tailors (apply dependency injection) the given resource to fit our needs.
     *
     * @param resource {qx.bom.rest.Resource} Resource.
     * @return {qx.bom.rest.Resource} Tailored resource.
     */
    _tailorResource: function(resource) {
      // inject different request implementation
      resource.setRequestFactory(this._getRequest);

      // inject different request handling
      resource.setRequestHandler({
          onsuccess: {
            callback: function(req, action) {
              return function() {
                var props = [req.getResponse(), null, false, req, action, req.getPhase()];
                this.fireEvent(action + "Success", qx.event.type.Rest, props);
                this.fireEvent("success", qx.event.type.Rest, props);
              };
            },
            context: this
          },
          onfail: {
            callback: function(req, action) {
              return function() {
                var props = [req.getResponse(), null, false, req, action, req.getPhase()];
                this.fireEvent(action + "Error", qx.event.type.Rest, props);
                this.fireEvent("error", qx.event.type.Rest, props);
              };
            },
            context: this
          },
          onloadend: {
            callback: function(req, action) {
              return function() {
                req.dispose();
              };
            },
            context: this
          }
      });

      return resource;
    },

    //
    // Request
    //

    /**
     * Configure request.
     *
     * @param callback {Function} Function called before request is send.
     *   Receives request, action, params and data.
     *
     * <pre class="javascript">
     * res.configureRequest(function(req, action, params, data) {
     *   if (action === "index") {
     *     req.setAccept("application/json");
     *   }
     * });
     * </pre>
     */
    configureRequest: function(callback) {
      this._resource.configureRequest(callback);
    },

    /**
     * Get request.
     *
     * May be overridden to change type of request.
     * @return {qx.io.request.Xhr} Xhr object
     */
    _getRequest: function() {
      return new qx.io.request.Xhr();
    },

    //
    // Routes and actions
    //

    /**
     * Map action to combination of method and URL pattern.
     *
     * <pre class="javascript">
     *   res.map("get", "GET", "/photos/{id}", {id: /\d+/});
     *
     *   // GET /photos/123
     *   res.get({id: "123"});
     * </pre>
     *
     * @param action {String} Action to associate to request.
     * @param method {String} Method to configure request with.
     * @param url {String} URL to configure request with. May contain positional
     *   parameters (<code>{param}</code>) that are replaced by values given when the action
     *   is invoked. Parameters are optional, unless a check is defined. A default
     *   value can be provided (<code>{param=default}</code>).
     * @param check {Map?} Map defining parameter constraints, where the key is
     *   the URL parameter and the value a regular expression (to match string) or
     *   <code>qx.io.rest.Resource.REQUIRED</code> (to verify existence).
     */
    map: function(action, method, url, check) {
      // add dynamic methods also on ourself to allow 'invoke()' delegation
      this.__addAction(action, method, url, check);

      this._resource.map(action, method, url, check);
    },

    /**
     * Map actions to members.
     *
     * @param action {String} Action to associate to request.
     * @param method {String} Method to configure request with.
     * @param url {String} URL to configure request with. May contain positional
     *   parameters (<code>{param}</code>) that are replaced by values given when the action
     *   is invoked. Parameters are optional, unless a check is defined. A default
     *   value can be provided (<code>{param=default}</code>).
     * @param check {Map?} Map defining parameter constraints, where the key is
     *   the URL parameter and the value a regular expression (to match string) or
     *   <code>qx.io.rest.Resource.REQUIRED</code> (to verify existence).
     */
    __addAction: function(action, method, url, check) {
      this.__routes[action] = [method, url, check];

      // Undefine generic getter when action is named "get"
      if (action == "get") {
        this[action] = undefined;
      }

      // Do not overwrite existing "non-action" methods unless the method is
      // null (i.e. because it exists as a stub for documentation)
      if (typeof this[action] !== "undefined" && this[action] !== null &&
          this[action].action !== true)
      {
        throw new Error("Method with name of action ("+action+") already exists");
      }

      this.__declareEvent(action + "Success");
      this.__declareEvent(action + "Error");

      this[action] = qx.lang.Function.bind(function() {
        Array.prototype.unshift.call(arguments, action);
        return this.invoke.apply(this, arguments);
      }, this);

      // Method is safe to overwrite
      this[action].action = true;

    },

    /**
     * Invoke action with parameters.
     *
     * Internally called by actions dynamically created.
     *
     * May be overridden to customize action and parameter handling.
     *
     * @lint ignoreUnused(successHandler, failHandler, loadEndHandler)
     *
     * @param action {String} Action to invoke.
     * @param params {Map} Map of parameters inserted into URL when a matching
     *  positional parameter is found.
     * @param data {Map|String} Data to be send as part of the request.
     *  See {@link qx.io.request.AbstractRequest#requestData}.
     * @return {Number} Id of the action's invocation.
     */
    invoke: function(action, params, data) {
      var params = (params == null) ? {} : params;

      // Cache parameters
      this.__routes[action].params = params;

      return this._resource.invoke(action, params, data);
    },

    /**
     * Set base URL.
     *
     * The base URL is prepended to the URLs given in the description.
     * Changes affect all future invocations.
     *
     * @param baseUrl {String} Base URL.
     */
    setBaseUrl: function(baseUrl) {
      this._resource.setBaseUrl(baseUrl);
    },

    /**
     * Abort action.
     *
     * Example:
     *
     * <pre class="javascript">
     *   // Abort all invocations of action
     *   res.get({id: 1});
     *   res.get({id: 2});
     *   res.abort("get");
     *
     *   // Abort specific invocation of action (by id)
     *   var actionId = res.get({id: 1});
     *   res.abort(actionId);
     * </pre>
     *
     * @param varargs {String|Number} Action of which all invocations to abort
     *  (when string), or a single invocation of an action to abort (when number)
     */
    abort: function(varargs) {
      this._resource.abort(varargs);
    },

    /**
     * Resend request associated to action.
     *
     * Replays parameters given when action was invoked originally.
     *
     * @param action {String} Action to refresh.
     */
    refresh: function(action) {
      this._resource.refresh(action);
    },

    /**
     * Periodically invoke action.
     *
     * Replays parameters given when action was invoked originally. When the
     * action was not yet invoked and requires parameters, parameters must be
     * given.
     *
     * Please note that IE tends to cache overly aggressive. One work-around is
     * to disable caching on the client side by configuring the request with
     * <code>setCache(false)</code>. If you control the server, a better
     * work-around is to include appropriate headers to explicitly control
     * caching. This way you still avoid requests that can be correctly answered
     * from cache (e.g. when nothing has changed since the last poll). Please
     * refer to <a href="http://www.mnot.net/javascript/xmlhttprequest/cache.html">
     * XMLHttpRequest Caching Test</a> for available options.
     *
     * @lint ignoreUnused(intervalListener)
     *
     * @param action {String} Action to poll.
     * @param interval {Number} Interval in ms.
     * @param params {Map?} Map of parameters. See {@link #invoke}.
     * @param immediately {Boolean?false} <code>true</code>, if the poll should
     *   invoke a call immediately.
     * @return {qx.event.Timer} Timer that periodically invokes action. Use to
     *   stop or resume. Is automatically disposed on disposal of object.
     */
    poll: function(action, interval, params, immediately) {
      // Dispose timer previously created for action
      if (this.__pollTimers[action]) {
        this.__pollTimers[action].dispose();
      }

      // Fallback to previous params
      if (typeof params == "undefined") {
        params = this.__routes[action].params;
      }

      // Invoke immediately
      if (immediately) {
        this.invoke(action, params);
      }

      var intervalListener = function() {
        var reqs = this.getRequestsByAction(action),
            req = (reqs) ? reqs[0] : null;

        if (!immediately && !req) {
          this.invoke(action, params);
          return;
        }
        if (req && (req.isDone() || req.isDisposed())) {
          this.refresh(action);
        }
      };

      var timer = this.__pollTimers[action] = new qx.event.Timer(interval);
      timer.addListener("interval", intervalListener, this._resource);
      timer.start();
      return timer;
    },

    /**
     * Long-poll action.
     *
     * Use Ajax long-polling to continuously fetch a resource as soon as the
     * server signals new data. The server determines when new data is available,
     * while the client keeps open a request. Requires configuration on the
     * server side. Basically, the server must not close a connection until
     * new data is available. For a high level introduction to long-polling,
     * refer to <a href="http://en.wikipedia.org/wiki/Comet_(programming)#Ajax_with_long_polling">
     * Ajax with long polling</a>.
     *
     * Uses {@link #refresh} internally. Make sure you understand the
     * implications of IE's tendency to cache overly aggressive.
     *
     * Note no interval is given on the client side.
     *
     * @lint ignoreUnused(longPollHandler)
     *
     * @param action {String} Action to poll.
     * @return {String} Id of handler responsible for long-polling. To stop
     *  polling, remove handler using {@link qx.core.Object#removeListenerById}.
     */
    longPoll: function(action) {
      var res = this,
          lastResponse,               // Keep track of last response
          immediateResponseCount = 0; // Count immediate responses

      // Throttle to prevent high load on server and client
      function throttle() {
        var isImmediateResponse =
          lastResponse &&
          ((new Date()) - lastResponse) < res._getThrottleLimit();

        if (isImmediateResponse) {
          immediateResponseCount += 1;
          if (immediateResponseCount > res._getThrottleCount()) {
            if (qx.core.Environment.get("qx.debug")) {
              res.debug("Received successful response more than " +
                res._getThrottleCount() + " times subsequently, each within " +
                res._getThrottleLimit() + " ms. Throttling.");
            }
            return true;
          }
        }

        // Reset counter on delayed response
        if (!isImmediateResponse) {
          immediateResponseCount = 0;
        }

        return false;
      }

      var handlerId = this.__longPollHandlers[action] =
        this.addListener(action + "Success", function longPollHandler() {
          if (res.isDisposed()) {
            return;
          }

          if (!throttle()) {
            lastResponse = new Date();
            res.refresh(action);
          }
        });

      this.invoke(action);
      return handlerId;
    },

    /**
     * Get request configuration for action and parameters.
     *
     * This is were placeholders are replaced with parameters.
     *
     * @param action {String} Action associated to request.
     * @param params {Map} Parameters to embed in request.
     * @return {Map} Map of configuration settings. Has the properties
     *   <code>method</code>, <code>url</code> and <code>check</code>.
     */
    _getRequestConfig: function(action, params) {
      return this._resource._getRequestConfig(action, params);
    },

    /**
     * Override to adjust the throttle limit.
     * @return {Integer} Throttle limit in milliseconds
     */
    _getThrottleLimit: function() {
      return qx.io.rest.Resource.POLL_THROTTLE_LIMIT;
    },

    /**
     * Override to adjust the throttle count.
     * @return {Integer} Throttle count
     */
    _getThrottleCount: function() {
      return qx.io.rest.Resource.POLL_THROTTLE_COUNT;
    },

    /**
     * Map actions from description.
     *
     * Allows to decoratively define routes.
     *
     * @param description {Map} Map that defines the routes.
     */
    __mapFromDescription: function(description) {
      Object.keys(description).forEach(function(action) {
        var route = description[action],
            method = route.method,
            url = route.url,
            check = route.check;

        if (qx.core.Environment.get("qx.debug")) {
          qx.core.Assert.assertString(method, "Method must be string for route '" + action + "'");
          qx.core.Assert.assertString(url, "URL must be string for route '" + action + "'");
        }

        this.map(action, method, url, check);
      }, this);
    },

    /**
     * Declare event at runtime.
     *
     * @param type {String} Type of event.
     */
    __declareEvent: function(type) {
      if (!this.constructor.$$events) {
        this.constructor.$$events = {};
      }

      if (!this.constructor.$$events[type]) {
        this.constructor.$$events[type] = "qx.event.type.Rest";
      }
    }
  },

  /**
   * Destructs the Resource.
   *
   * All created requests, routes and pollTimers will be disposed.
   */
  destruct: function() {
    var action;

    if (this.__pollTimers) {
      for (action in this.__pollTimers) {
        var timer = this.__pollTimers[action];
        timer.stop();
        timer.dispose();
      }
    }

    if (this.__longPollHandlers) {
      for (action in this.__longPollHandlers) {
        var id = this.__longPollHandlers[action];
        this.removeListenerById(id);
      }
    }

    this._resource.destruct();
    this._resource = this.__routes = this.__pollTimers = this.__longPollHandlers = null;
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2013 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Richard Sternagel (rsternagel)

************************************************************************ */

/**
 * Client-side wrapper of a REST resource.
 *
 * Each instance represents a resource in terms of REST. A number of actions
 * (usually HTTP methods) unique to the resource can be defined and invoked.
 * A resource with its actions is configured declaratively by passing a resource
 * description to the constructor, or programmatically using {@link #map}.
 *
 * Each action is associated to a route. A route is a combination of method,
 * URL pattern and optional parameter constraints.
 *
 * An action is invoked by calling a method with the same name. When a URL
 * pattern of a route contains positional parameters, those parameters must be
 * passed when invoking the associated action. Also, constraints defined in the
 * route must be satisfied.
 *
 * When an action is invoked, a request is configured according to the associated
 * route, is passed the URL parameters, request body data, and finally send.
 * What kind of request is send can be configured by overwriting {@link #_getRequest}.
 *
 * No constraints on the action's name or the scope of the URLs are imposed. However,
 * if you want to follow RESTful design patterns it is recommended to name actions
 * the same as the HTTP action.
 *
 * Strictly speaking, the <code>photos</code> instance represents two distinct resources
 * and could therefore just as well mapped to two distinct resources (for instance,
 * named photos and photosTagged). What style to choose depends on the kind of data
 * returned. For instance, it seems sensible to stick with one resource if the filter
 * only limits the result set (i.e. the individual results have the same properties).
 *
 * In order to respond to successful (or erroneous) invocations of actions,
 * either listen to the generic "success" or "error" event and get the action
 * from the event data, or listen to action specific events defined at runtime.
 * Action specific events follow the pattern "&lt;action&gt;Success" and
 * "&lt;action&gt;Error", e.g. "indexSuccess".
 *
 * @group (IO)
 * @ignore(qx.core.Object.*)
 */
qx.Bootstrap.define("qx.bom.rest.Resource",
{
  extend: qx.event.Emitter,
  implement: [ qx.core.IDisposable ],

  /**
   * @param description {Map?} Each key of the map is interpreted as
   *  <code>action</code> name. The value associated to the key must be a map
   *  with the properties <code>method</code> and <code>url</code>.
   *  <code>check</code> is optional. Also see {@link #map}.
   *
   * @see qx.bom.rest
   * @see qx.io.rest
   */
  construct: function(description)
  {
    this.__requests = {};
    this.__routes = {};
    this.__pollTimers = {};
    this.__longPollHandlers = {};

    try {
      if (typeof description !== "undefined") {
        if (qx.core.Environment.get("qx.debug")) {
          qx.core.Assert.assertMap(description);
        }
        this.__mapFromDescription(description);
      }
    } catch(e) {
      this.dispose();
      throw e;
    }
  },

  events:
  {
    /**
     * Fired when any request was successful.
     *
     * The action the successful request is associated to, as well as the
     * request itself, can be retrieved from the event’s properties.
     * Additionally, an action specific event is fired that follows the pattern
     * "<action>Success", e.g. "indexSuccess".
     */
    "success": "qx.bom.rest.Resource",

    /**
     * Fired when request associated to action given in prefix was successful.
     *
     * For example, "indexSuccess" is fired when <code>index()</code> was
     * successful.
     */
     "actionSuccess": "qx.bom.rest.Resource",

    /**
     * Fired when any request fails.
     *
     * The action the failed request is associated to, as well as the
     * request itself, can be retrieved from the event’s properties.
     * Additionally, an action specific event is fired that follows the pattern
     * "<action>Error", e.g. "indexError".
     */
    "error": "qx.bom.rest.Resource",

    /**
     * Fired when any request associated to action given in prefix fails.
     *
     * For example, "indexError" is fired when <code>index()</code> failed.
     */
     "actionError": "qx.bom.rest.Resource",

    /**
     * Fired when a request is sent to the given endpoint.
     */
    "sent": "qx.bom.rest.Resource",

    /**
     * Fired when any request associated to action is sent to the given endpoint.
     *
     * For example, "indexSent" is fired when <code>index()</code> was
     * called.
     */
     "actionSent": "qx.bom.rest.Resource",

    /**
     * Fired when a request is started to the given endpoint. This moment is right after the request
     * was opened and send.
     */
    "started": "qx.bom.rest.Resource",

    /**
     * Fired when any request associated to action is started to the given endpoint. This moment is
     * right after the request was opened and send.
     *
     * For example, "indexStarted" is fired when <code>index()</code> was called.
     */
     "actionStarted": "qx.bom.rest.Resource"
  },

  statics:
  {
    /**
     * Number of milliseconds below a long-poll request is considered immediate and
     * subject to throttling checks.
     */
    POLL_THROTTLE_LIMIT: 100,

    /**
     * Number of immediate long-poll responses accepted before throttling takes place.
     */
    POLL_THROTTLE_COUNT: 30,

    /**
     * A symbol used in checks to declare required parameter.
     */
    REQUIRED: true,

    /**
     * Get placeholders from URL.
     *
     * @param url {String} The URL to parse for placeholders.
     * @return {Array} Array of placeholders without the placeholder prefix.
     */
    placeholdersFromUrl: function(url) {
      var placeholderRe = /\{(\w+)(=\w+)?\}/g,
          match,
          placeholders = [];

      // With g flag set, searching begins at the regex object's
      // lastIndex, which is zero initially and increments with each match.
      while ((match = placeholderRe.exec(url))) {
        placeholders.push(match[1]);
      }

      return placeholders;
    }
  },

  members:
  {
    __requests: null,
    __routes: null,
    __baseUrl: null,
    __pollTimers: null,
    __longPollHandlers: null,
    __configureRequestCallback: null,

    /**
     * @type {Map} Request callbacks for 'onsuccess', 'onfail' and 'onloadend' - see {@link #setRequestHandler}.
     */
    __requestHandler: null,

    /**
     * @type {Function} Function which returns instances from {@link qx.io.request.AbstractRequest}.
     */
    __begetRequest: null,

    //
    // Request
    //

    /**
     * Set a request factory function to switch the request implementation.
     * The created requests have to implement {@link qx.io.request.AbstractRequest}.
     *
     * @param fn {Function} Function which returns request instances.
     *
     * @internal
     */
    setRequestFactory: function(fn) {
      this.__begetRequest = fn;
    },

    /**
     * Sets request callbacks for 'onsuccess', 'onfail' and 'onloadend'.
     *
     * @param handler {Map} Map defining callbacks and their context.
     *
     * @internal
     */
    setRequestHandler: function(handler) {
      this.__requestHandler = handler;
    },

    /**
     * Provides the request callbacks for 'onsuccess', 'onfail' and 'onloadend'.
     *
     * @return {Map} Map defining callbacks and their context.
     */
    _getRequestHandler: function() {
      return (this.__requestHandler === null) ? {
        onsuccess: {
          callback: function(req, action) {
            return function() {
              var response = {
                  "id": parseInt(req.toHashCode(), 10),
                  "response": req.getResponse(),
                  "request": req,
                  "action": action
              };
              this.emit(action + "Success", response);
              this.emit("success", response);
            };
          },
          context: this
        },
        onfail: {
          callback: function(req, action) {
            return function() {
              var response = {
                  "id": parseInt(req.toHashCode(), 10),
                  "response": req.getResponse(),
                  "request": req,
                  "action": action
              };
              this.emit(action + "Error", response);
              this.emit("error", response);
            };
          },
          context: this
        },
        onloadend: {
          callback: function(req, action) {
            return function() {
              // [#8315] // dispose asynchronous to work with Sinon.js
              window.setTimeout(function() {
                req.dispose();
              }, 0);
            };
          },
          context: this
        },
        onreadystatechange: {
          callback: function(req, action) {
            return function () {
              if (req.getTransport().readyState === qx.bom.request.Xhr.HEADERS_RECEIVED) {
                var response = {
                    "id": parseInt(req.toHashCode(), 10),
                    "request": req,
                    "action": action
                };
                this.emit(action + "Sent", response);
                this.emit("sent", response);
              }

              if (req.getTransport().readyState === qx.bom.request.Xhr.OPENED) {
                var payload = {
                  "id": parseInt(req.toHashCode(), 10),
                  "request": req,
                  "action": action
                };
                this.emit(action + "Started", payload);
                this.emit("started", payload);
              }
            };
          },
          context: this
        },
        onprogress: {
          callback: function(req, action) {
            return function () {
              var payload = {
                "id": parseInt(req.toHashCode(), 10),
                "request": req,
                "action": action,
                "progress": {
                  "lengthComputable": req.getTransport().progress.lengthComputable,
                  "loaded": req.getTransport().progress.loaded,
                  "total": req.getTransport().progress.total
                }
              };
              this.emit(action + "Progress", payload);
              this.emit("progress", payload);
            };
          },
          context: this
        }
      } : this.__requestHandler;
    },

    /**
     * Retrieve the currently stored request objects for an action.
     *
     * @param action {String} The action (e.g. "get", "post" ...).
     * @return {Array|null} Request objects.
     *
     * @internal
     */
    getRequestsByAction: function (action) {
      var hasRequests = (this.__requests !== null && action in this.__requests);
      return hasRequests ? this.__requests[action] : null;
    },

    /**
     * Configure request.
     *
     * @param callback {Function} Function called before request is send.
     *   Receives request, action, params and data.
     */
    configureRequest: function(callback) {
      this.__configureRequestCallback = callback;
    },

    /**
     * Get request.
     *
     * May be overridden to change type of request.
     * @return {qx.bom.request.SimpleXhr|qx.io.request.AbstractRequest} Request object
     */
    _getRequest: function() {
      return (this.__begetRequest === null) ? new qx.bom.request.SimpleXhr()
                                            : this.__begetRequest();
    },

    /**
     * Create request.
     *
     * @param action {String} The action the created request is associated to.
     * @return {qx.bom.request.SimpleXhr|qx.io.request.AbstractRequest} Request object
     */
    __createRequest: function(action) {
      var req = this._getRequest();

      if (!qx.lang.Type.isArray(this.__requests[action])) {
        this.__requests[action] = [];
      }

      qx.core.ObjectRegistry.register(req);
      this.__requests[action].push(req);

      return req;
    },

    //
    // Routes and actions
    //

    /**
     * Map action to combination of method and URL pattern.
     *
     * @param action {String} Action to associate to request.
     * @param method {String} Method to configure request with.
     * @param url {String} URL to configure request with. May contain positional
     *   parameters (<code>{param}</code>) that are replaced by values given when the action
     *   is invoked. Parameters are optional, unless a check is defined. A default
     *   value can be provided (<code>{param=default}</code>).
     * @param check {Map?} Map defining parameter constraints, where the key is
     *   the URL parameter and the value a regular expression (to match string) or
     *   <code>qx.bom.rest.Resource.REQUIRED</code> (to verify existence).
     */
    map: function(action, method, url, check) {
      this.__routes[action] = [method, url, check];

      // Track requests
      this.__requests[action] = [];

      // Undefine generic getter when action is named "get"
      if (action == "get") {
        this[action] = undefined;
      }

      // Do not overwrite existing "non-action" methods unless the method is
      // null (i.e. because it exists as a stub for documentation)
      if (typeof this[action] !== "undefined" && this[action] !== null &&
          this[action].action !== true)
      {
        throw new Error("Method with name of action (" +
          action + ") already exists");
      }

      this.__declareEvent(action + "Success");
      this.__declareEvent(action + "Error");

      this[action] = qx.lang.Function.bind(function() {
        Array.prototype.unshift.call(arguments, action);
        return this.invoke.apply(this, arguments);
      }, this);

      // Method is safe to overwrite
      this[action].action = true;
    },

    /**
     * Invoke action with parameters.
     *
     * Internally called by actions dynamically created.
     *
     * May be overridden to customize action and parameter handling.
     *
     * @lint ignoreUnused(successHandler, failHandler, loadEndHandler)
     *
     * @param action {String} Action to invoke.
     * @param params {Map} Map of parameters inserted into URL when a matching
     *  positional parameter is found.
     * @param data {Map|String} Data to be send as part of the request.
     *  See {@link qx.bom.request.SimpleXhr#getRequestData}.
     *  See {@link qx.io.request.AbstractRequest#requestData}.
     * @return {Number} Id of the action's invocation.
     */
    invoke: function(action, params, data) {
      var req = this.__createRequest(action),
          params = params == null ? {} : params,
          config = this._getRequestConfig(action, params);

      // Cache parameters
      this.__routes[action].params = params;

      // Check parameters
      this.__checkParameters(params, config.check);

      // Configure request
      this.__configureRequest(req, config, data);

      // Run configuration callback, passing in pre-configured request
      if (this.__configureRequestCallback) {
        this.__configureRequestCallback.call(this, req, action, params, data);
      }

      // Configure JSON request (content type may have been set in configuration callback)
      this.__configureJsonRequest(req, config, data);

      var reqHandler = this._getRequestHandler();

      // Handle successful request
      req.addListenerOnce(
        "success",
        reqHandler.onsuccess.callback(req, action),
        reqHandler.onsuccess.context
      );
      // Handle erroneous request
      req.addListenerOnce(
        "fail",
        reqHandler.onfail.callback(req, action),
        reqHandler.onfail.context
      );
      // Handle loadend (Note that loadEnd is fired after "success")
      req.addListenerOnce(
        "loadEnd",
        reqHandler.onloadend.callback(req, action),
        reqHandler.onloadend.context
      );
      if (reqHandler.hasOwnProperty("onreadystatechange")) {
        req.addListener(
          "readystatechange",
          reqHandler.onreadystatechange.callback(req, action),
          reqHandler.onreadystatechange.context
        );
      }
      // Handle progress (which is fired multiple times)
      if (reqHandler.hasOwnProperty("onprogress")) {
        req.addListener(
          "progress",
          reqHandler.onprogress.callback(req, action),
          reqHandler.onprogress.context
        );
      }

      req.send();

      return parseInt(req.toHashCode(), 10);
    },

    /**
     * Set base URL.
     *
     * The base URL is prepended to the URLs given in the description.
     * Changes affect all future invocations.
     *
     * @param baseUrl {String} Base URL.
     */
    setBaseUrl: function(baseUrl) {
      this.__baseUrl = baseUrl;
    },

    /**
     * Check parameters.
     *
     * @param params {Map} Parameters.
     * @param check {Map} Checks.
     */
    __checkParameters: function(params, check) {
      if(typeof check !== "undefined") {

        if (qx.core.Environment.get("qx.debug")) {
          qx.core.Assert.assertObject(check, "Check must be object with params as keys");
        }

        Object.keys(check).forEach(function(param) {

          // Warn about invalid check
          if (qx.core.Environment.get("qx.debug")) {
            if (check[param] !== true) {
              if (qx.core.Environment.get("qx.debug")) {
                qx.core.Assert.assertRegExp(check[param]);
              }
            }
          }

          // Missing parameter
          if (check[param] === qx.bom.rest.Resource.REQUIRED && typeof params[param] === "undefined") {
            throw new Error("Missing parameter '" + param + "'");
          }

          // Ignore invalid checks
          if (!(check[param] && typeof check[param].test == "function")) {
            return;
          }

          // Invalid parameter
          if (!check[param].test(params[param])) {
            throw new Error("Parameter '" + param + "' is invalid");
          }
        });
      }
    },

    /**
     * Configure request.
     *
     * @param req {qx.bom.request.SimpleXhr|qx.io.request.AbstractRequest} Request.
     * @param config {Map} Configuration.
     * @param data {Map} Data.
     */
    __configureRequest: function(req, config, data) {
      req.setUrl(config.url);

      if (!req.setMethod && config.method !== "GET") {
        throw new Error("Request (" + req.classname + ") doesn't support other HTTP methods than 'GET'");
      }

      if (req.setMethod) {
        req.setMethod(config.method);
      }

      if (data) {
        req.setRequestData(data);
      }
    },

    /**
     * Serialize data to JSON when content type indicates.
     *
     * @param req {qx.bom.request.SimpleXhr|qx.io.request.AbstractRequest} Request.
     * @param config {Map} Configuration.
     * @param data {Map} Data.
     */
    __configureJsonRequest: function(req, config, data) {
      if (data) {
        var contentType = req.getRequestHeader("Content-Type");

        if (req.getMethod && qx.util.Request.methodAllowsRequestBody(req.getMethod())) {
          if ((/application\/.*\+?json/).test(contentType)) {
            data = qx.lang.Json.stringify(data);
            req.setRequestData(data);
          }
        }
      }
    },

    /**
     * Abort action.
     *
     * @param varargs {String|Number} Action of which all invocations to abort
     *  (when string), or a single invocation of an action to abort (when number)
     */
    abort: function(varargs) {
      if (qx.lang.Type.isNumber(varargs)) {
        var id = varargs;
        var post = qx.core.ObjectRegistry.getPostId();
        var req = qx.core.ObjectRegistry.fromHashCode(id + post);
        if (req) {
          req.abort();
        }
      } else {
        var action = varargs;
        var reqs = this.__requests[action];
        if (this.__requests[action]) {
          reqs.forEach(function(req) {
            req.abort();
          });
        }
      }
    },

    /**
     * Resend request associated to action.
     *
     * Replays parameters given when action was invoked originally.
     *
     * @param action {String} Action to refresh.
     */
    refresh: function(action) {
      this.invoke(action, this.__routes[action].params);
    },

    /**
     * Periodically invoke action.
     *
     * Replays parameters given when action was invoked originally. When the
     * action was not yet invoked and requires parameters, parameters must be
     * given.
     *
     * Please note that IE tends to cache overly aggressive. One work-around is
     * to disable caching on the client side by configuring the request with
     * <code>setCache(false)</code>. If you control the server, a better
     * work-around is to include appropriate headers to explicitly control
     * caching. This way you still avoid requests that can be correctly answered
     * from cache (e.g. when nothing has changed since the last poll). Please
     * refer to <a href="http://www.mnot.net/javascript/xmlhttprequest/cache.html">
     * XMLHttpRequest Caching Test</a> for available options.
     *
     * @lint ignoreUnused(intervalListener)
     *
     * @param action {String} Action to poll.
     * @param interval {Number} Interval in ms.
     * @param params {Map?} Map of parameters. See {@link #invoke}.
     * @param immediately {Boolean?false} <code>true</code>, if the poll should
     *   invoke a call immediately.
     */
    poll: function(action, interval, params, immediately) {
      // Dispose timer previously created for action
      if (this.__pollTimers[action]) {
        this.stopPollByAction(action);
      }

      // Fallback to previous params
      if (typeof params == "undefined") {
        params = this.__routes[action].params;
      }

      // Invoke immediately
      if (immediately) {
        this.invoke(action, params);
      }

      var intervalListener = (function(scope) {
        return function() {
          var req = scope.__requests[action][0];
          if (!immediately && !req) {
            scope.invoke(action, params);
            return;
          }
          if (req.isDone() || req.isDisposed()) {
            scope.refresh(action);
          }
        };
      })(this);

      this._startPoll(action, intervalListener, interval);
    },


    /**
     * Start a poll process.
     *
     * @param action {String} Action to poll.
     * @param listener {Function} The function to repeatedly execute at the given interval.
     * @param interval {Number} Interval in ms.
     */
    _startPoll: function(action, listener, interval) {
      this.__pollTimers[action] = {
        "id": window.setInterval(listener, interval),
        "interval": interval,
        "listener": listener
      };
    },

    /**
     * Stops a poll process by the associated action.
     *
     * @param action {String} Action to poll.
     */
    stopPollByAction: function(action) {
      if (action in this.__pollTimers) {
        var intervalId = this.__pollTimers[action].id;
        window.clearInterval(intervalId);
      }
    },

    /**
     * Restarts a poll process by the associated action.
     *
     * @param action {String} Action to poll.
     */
    restartPollByAction: function(action) {
      if (action in this.__pollTimers) {
        var timer = this.__pollTimers[action];
        this.stopPollByAction(action);
        this._startPoll(action, timer.listener, timer.interval);
      }
    },

    /**
     * Long-poll action.
     *
     * Use Ajax long-polling to continuously fetch a resource as soon as the
     * server signals new data. The server determines when new data is available,
     * while the client keeps open a request. Requires configuration on the
     * server side. Basically, the server must not close a connection until
     * new data is available. For a high level introduction to long-polling,
     * refer to <a href="http://en.wikipedia.org/wiki/Comet_(programming)#Ajax_with_long_polling">
     * Ajax with long polling</a>.
     *
     * Uses {@link #refresh} internally. Make sure you understand the
     * implications of IE's tendency to cache overly aggressive.
     *
     * Note no interval is given on the client side.
     *
     * @lint ignoreUnused(longPollHandler)
     *
     * @param action {String} Action to poll.
     * @return {String} Id of handler responsible for long-polling. To stop
     *  polling, remove handler using {@link qx.core.Object#removeListenerById}.
     */
    longPoll: function(action) {
      var res = this,
          lastResponse,               // Keep track of last response
          immediateResponseCount = 0; // Count immediate responses

      // Throttle to prevent high load on server and client
      function throttle() {
        var isImmediateResponse =
          lastResponse &&
          ((new Date()) - lastResponse) < res._getThrottleLimit();

        if (isImmediateResponse) {
          immediateResponseCount += 1;
          if (immediateResponseCount > res._getThrottleCount()) {
            if (qx.core.Environment.get("qx.debug")) {
              qx.Bootstrap.debug("Received successful response more than " +
                res._getThrottleCount() + " times subsequently, each within " +
                res._getThrottleLimit() + " ms. Throttling.");
            }
            return true;
          }
        }

        // Reset counter on delayed response
        if (!isImmediateResponse) {
          immediateResponseCount = 0;
        }

        return false;
      }

      var handlerId = this.__longPollHandlers[action] =
        this.addListener(action + "Success", function longPollHandler() {
          if (res.isDisposed()) {
            return;
          }

          if (!throttle()) {
            lastResponse = new Date();
            res.refresh(action);
          }
        });

      this.invoke(action);
      return handlerId;
    },

    /**
     * Get request configuration for action and parameters.
     *
     * This is were placeholders are replaced with parameters.
     *
     * @param action {String} Action associated to request.
     * @param params {Map} Parameters to embed in request.
     * @return {Map} Map of configuration settings. Has the properties
     *   <code>method</code>, <code>url</code> and <code>check</code>.
     */
    _getRequestConfig: function(action, params) {
      var route = this.__routes[action];

      // Not modify original params
      var params = qx.lang.Object.clone(params);

      if (!qx.lang.Type.isArray(route)) {
        throw new Error("No route for action " + action);
      }

      var method = route[0],
          url = this.__baseUrl !== null ? this.__baseUrl + route[1] : route[1],
          check = route[2],
          placeholders = qx.bom.rest.Resource.placeholdersFromUrl(url);

      params = params || {};

      placeholders.forEach(function(placeholder) {
        // Placeholder part of template and default value
        var re = new RegExp("{" + placeholder + "=?(\\w+)?}"),
            defaultValue = url.match(re)[1];

        // Fill in default or empty string when missing
        if (typeof params[placeholder] === "undefined") {
          if (defaultValue) {
            params[placeholder] = defaultValue;
          } else {
            params[placeholder] = "";
          }
        }

        url = url.replace(re, params[placeholder]);
      });

      return {method: method, url: url, check: check};
    },

    /**
     * Override to adjust the throttle limit.
     * @return {Integer} Throttle limit in milliseconds
     */
    _getThrottleLimit: function() {
      return qx.bom.rest.Resource.POLL_THROTTLE_LIMIT;
    },

    /**
     * Override to adjust the throttle count.
     * @return {Integer} Throttle count
     */
    _getThrottleCount: function() {
      return qx.bom.rest.Resource.POLL_THROTTLE_COUNT;
    },

    /**
     * Map actions from description.
     *
     * Allows to decoratively define routes.
     *
     * @param description {Map} Map that defines the routes.
     */
    __mapFromDescription: function(description) {
      Object.keys(description).forEach(function(action) {
        var route = description[action],
            method = route.method,
            url = route.url,
            check = route.check;

        if (qx.core.Environment.get("qx.debug")) {
          qx.core.Assert.assertString(method, "Method must be string for route '" + action + "'");
          qx.core.Assert.assertString(url, "URL must be string for route '" + action + "'");
        }

        this.map(action, method, url, check);
      }, this);
    },

    /**
     * Declare event at runtime.
     *
     * @param type {String} Type of event.
     */
    __declareEvent: function(type) {
      if (!this.constructor.$$events) {
        this.constructor.$$events = {};
      }

      if (!this.constructor.$$events[type]) {
        this.constructor.$$events[type] = "qx.bom.rest.Resource";
      }
    },

    /*
    ---------------------------------------------------------------------------
      DISPOSER
    ---------------------------------------------------------------------------
    */

    /**
     * Returns true if the object is disposed.
     *
     * @return {Boolean} Whether the object has been disposed
     */
    isDisposed : function() {
      return this.$$disposed || false;
    },


    /**
     * Dispose this object
     *
     */
    dispose : function()
    {
      // Check first
      if (this.$$disposed) {
        return;
      }

      // Mark as disposed (directly, not at end, to omit recursions)
      this.$$disposed = true;

      // Debug output
      if (qx.core.Environment.get("qx.debug"))
      {
        if (qx.core.Environment.get("qx.debug.dispose.level") > 2) {
          qx.Bootstrap.debug(this, "Disposing " + this.classname + "[" + this.toHashCode() + "]");
        }
      }

      this.destruct();

      // Additional checks
      if (qx.core.Environment.get("qx.debug"))
      {
        if (qx.core.Environment.get("qx.debug.dispose.level") > 0)
        {
          var key, value;
          for (key in this)
          {
            value = this[key];

            // Check for Objects but respect values attached to the prototype itself
            if (value !== null && typeof value === "object" && !(qx.Bootstrap.isString(value)))
            {
              // Check prototype value
              // undefined is the best, but null may be used as a placeholder for
              // private variables (hint: checks in qx.Class.define). We accept both.
              if (this.constructor.prototype[key] != null) {
                continue;
              }

              var ff2 = navigator.userAgent.indexOf("rv:1.8.1") != -1;
              var ie6 = navigator.userAgent.indexOf("MSIE 6.0") != -1;
              // keep the old behavior for IE6 and FF2
              if (ff2 || ie6) {
                if (qx.core.Object && value instanceof qx.core.Object || qx.core.Environment.get("qx.debug.dispose.level") > 1) {
                  qx.Bootstrap.warn(this, "Missing destruct definition for '" + key + "' in " + this.classname + "[" + this.toHashCode() + "]: " + value);
                  delete this[key];
                }
              } else {
                if (qx.core.Environment.get("qx.debug.dispose.level") > 1) {
                  qx.Bootstrap.warn(this, "Missing destruct definition for '" + key + "' in " + this.classname + "[" + this.toHashCode() + "]: " + value);
                  delete this[key];
                }
              }
            }
          }
        }
      }
    },

    /**
     * Destructs the Resource.
     *
     * All created requests, routes and pollTimers will be disposed.
     */
    destruct: function() {
      var action;

      for (action in this.__requests) {
        if (this.__requests[action]) {
          this.__requests[action].forEach(function(req) {
            req.dispose();
          });
        }
      }

      if (this.__pollTimers) {
        for (action in this.__pollTimers) {
          this.stopPollByAction(action);
        }
      }

      if (this.__longPollHandlers) {
        for (action in this.__longPollHandlers) {
          var id = this.__longPollHandlers[action];
          this.removeListenerById(id);
        }
      }

      this.__requests = this.__routes = this.__pollTimers = null;
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2013 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Richard Sternagel (rsternagel)

************************************************************************ */

/**
 * This class is internal because it's tailored to {@link qx.io.rest.Resource}
 * which needs more functionality than {@link qx.bom.request.Xhr} provides.
 * The usage of {@link qx.io.request.Xhr} isn't possible either due to it's qx.Class nature.
 *
 * For alternatives to this class have a look at:
 *
 * * "qx.bom.request.Xhr" (low level, cross-browser XHR abstraction compatible with spec)
 * * "qx.io.request.Xhr" (high level XHR abstraction)
 *
 * A wrapper of {@link qx.bom.request.Xhr} which offers:
 *
 * * set/get HTTP method, URL, request data and headers
 * * retrieve the parsed response as object (content-type recognition)
 * * more fine-grained events such as success, fail, ...
 * * supports hash code for request identification
 *
 * It does *not* comply the interface defined by {@link qx.bom.request.IRequest}.
 *
 * <div class="desktop">
 * Example:
 *
 * <pre class="javascript">
 *  var req = new qx.bom.request.SimpleXhr("/some/path/file.json");
 *  req.setRequestData({"a":"b"});
 *  req.once("success", function successHandler() {
 *    var response = req.getResponse();
 *  }, this);
 *  req.once("fail", function successHandler() {
 *    var response = req.getResponse();
 *  }, this);
 *  req.send();
 * </pre>
 * </div>
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.request.SimpleXhr",
{

  extend: qx.event.Emitter,
  implement: [ qx.core.IDisposable ],

  /**
   * @param url {String?} The URL of the resource to request.
   * @param method {String?"GET"} The HTTP method.
   */
  construct: function(url, method) {
    if (url !== undefined) {
      this.setUrl(url);
    }

    this.useCaching(true);
    this.setMethod((method !== undefined) ? method : "GET");
    this._transport = this._registerTransportListener(this._createTransport());

    qx.core.ObjectRegistry.register(this);

    this.__requestHeaders = {};
    this.__parser = this._createResponseParser();
  },

  members :
  {
    /*
    ---------------------------------------------------------------------------
      PUBLIC
    ---------------------------------------------------------------------------
    */

    /**
     * Sets a request header.
     *
     * @param key {String} Key of the header.
     * @param value {String} Value of the header.
     * @return {qx.bom.request.SimpleXhr} Self for chaining.
     */
    setRequestHeader: function(key, value) {
      this.__requestHeaders[key] = value;
      return this;
    },

    /**
     * Gets a request header.
     *
     * @param key {String} Key of the header.
     * @return {String} The value of the header.
     */
    getRequestHeader: function(key) {
      return this.__requestHeaders[key];
    },


    /**
     * Returns a single response header
     *
     * @param header {String} Name of the header to get.
     * @return {String} Response header
     */
    getResponseHeader: function(header) {
      return this._transport.getResponseHeader(header);
    },


    /**
     * Returns all response headers
     * @return {String} String of response headers
     */
    getAllResponseHeaders: function() {
      return this._transport.getAllResponseHeaders();
    },

    /**
     * Sets the URL.
     *
     * @param url {String} URL to be requested.
     * @return {qx.bom.request.SimpleXhr} Self for chaining.
     */
    setUrl: function(url) {
      if (qx.lang.Type.isString(url)) {
        this.__url = url;
      }
      return this;
    },

    /**
     * Gets the URL.
     *
     * @return {String} URL to be requested.
     */
    getUrl: function() {
      return this.__url;
    },

    /**
     * Sets the HTTP-Method.
     *
     * @param method {String} The method.
     * @return {qx.bom.request.SimpleXhr} Self for chaining.
     */
    setMethod: function(method) {
      if (qx.util.Request.isMethod(method)) {
        this.__method = method;
      }
      return this;
    },

    /**
     * Gets the HTTP-Method.
     *
     * @return {String} The method.
     */
    getMethod: function() {
      return this.__method;
    },

    /**
     * Sets the request data to be send as part of the request.
     *
     * The request data is transparently included as URL query parameters or embedded in the
     * request body as form data.
     *
     * @param data {String|Object} The request data.
     * @return {qx.bom.request.SimpleXhr} Self for chaining.
     */
    setRequestData: function(data) {
      if (qx.lang.Type.isString(data) || qx.lang.Type.isObject(data) ||
         ["ArrayBuffer", "Blob", "FormData"].indexOf(qx.lang.Type.getClass(data)) !== -1) {
        this.__requestData = data;
      }
      return this;
    },

    /**
     * Gets the request data.
     *
     * @return {String} The request data.
     */
    getRequestData: function() {
      return this.__requestData;
    },

    /**
     * Gets parsed response.
     *
     * If problems occurred an empty string ("") is more likely to be returned (instead of null).
     *
     * @return {String|null} The parsed response of the request.
     */
    getResponse: function() {
      if (this.__response !== null) {
        return this.__response;
      } else {
        return (this._transport.responseXML !== null) ? this._transport.responseXML : this._transport.responseText;
      }

      return null;
    },

    /**
     * Gets low-level transport.
     *
     * Note: To be used with caution!
     *
     * This method can be used to query the transport directly,
     * but should be used with caution. Especially, it
     * is not advisable to call any destructive methods
     * such as <code>open</code> or <code>send</code>.
     *
     * @return {Object} An instance of a class found in
     *  <code>qx.bom.request.*</code>
     */
     // This method mainly exists so that some methods found in the
     // low-level transport can be deliberately omitted here,
     // but still be accessed should it be absolutely necessary.
     //
     // Valid use cases include to query the transport’s responseXML
     // property if performance is critical and any extra parsing
     // should be avoided at all costs.
     //
    getTransport: function() {
      return this._transport;
    },

    /**
     * Sets (i.e. override) the parser for the response parsing.
     *
     * @see qx.util.ResponseParser#setParser
     *
     * @param parser {String|Function}
     * @return {Function} The parser function
     */
    setParser: function(parser) {
      return this.__parser.setParser(parser);
    },

    /**
     * Sets the timout limit in milliseconds.
     *
     * @param millis {Number} limit in milliseconds.
     * @return {qx.bom.request.SimpleXhr} Self for chaining.
     */
    setTimeout: function(millis) {
      if (qx.lang.Type.isNumber(millis)) {
        this.__timeout = millis;
      }
      return this;
    },

    /**
     * The current timeout in milliseconds.
     *
     * @return {Number} The current timeout in milliseconds.
     */
    getTimeout: function() {
      return this.__timeout;
    },

    /**
     * Whether to allow request to be answered from cache.
     *
     * Allowed values:
     *
     * * <code>true</code>: Allow caching (Default)
     * * <code>false</code>: Prohibit caching. Appends 'nocache' parameter to URL.
     *
     * Consider setting a Cache-Control header instead. A request’s Cache-Control
     * header may contain a number of directives controlling the behavior of
     * any caches in between client and origin server and allows therefore a more
     * fine grained control over caching. If such a header is provided, the setting
     * of setCache() will be ignored.
     *
     * * <code>"no-cache"</code>: Force caches to submit request in order to
     * validate the freshness of the representation. Note that the requested
     * resource may still be served from cache if the representation is
     * considered fresh. Use this directive to ensure freshness but save
     * bandwidth when possible.
     * * <code>"no-store"</code>: Do not keep a copy of the representation under
     * any conditions.
     *
     * See <a href="http://www.mnot.net/cache_docs/#CACHE-CONTROL">
     * Caching tutorial</a> for an excellent introduction to Caching in general.
     * Refer to the corresponding section in the
     * <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9">
     * HTTP 1.1 specification</a> for more details and advanced directives.
     *
     * It is recommended to choose an appropriate Cache-Control directive rather
     * than prohibit caching using the nocache parameter.
     *
     * @param value {Boolean}
     * @return {qx.bom.request.SimpleXhr} Self for chaining.
     */
    useCaching: function(value) {
      if (qx.lang.Type.isBoolean(value)) {
        this.__cache = value;
      }
      return this;
    },

    /**
     * Whether requests are cached.
     *
     * @return {Boolean} Whether requests are cached.
     */
    isCaching: function() {
      return this.__cache;
    },

    /**
     * Whether request completed (is done).

     * @return {Boolean} Whether request is completed.
     */
    isDone: function() {
      return (this._transport.readyState === qx.bom.request.Xhr.DONE);
    },

    /**
     * Returns unique hash code of object.
     *
     * @return {Integer} unique hash code of the object
     */
    toHashCode : function() {
      return this.$$hash;
    },

    /**
     * Returns true if the object is disposed.
     *
     * @return {Boolean} Whether the object has been disposed
     */
    isDisposed: function() {
      return !!this.__disposed;
    },

    /**
     * Sends request.
     *
     * Relies on set before:
     * * a HTTP method
     * * an URL
     * * optional request headers
     * * optional request data
     */
    send: function() {
      var curTimeout = this.getTimeout(),
          hasRequestData = (this.getRequestData() !== null),
          hasCacheControlHeader = this.__requestHeaders.hasOwnProperty("Cache-Control"),
          isBodyForMethodAllowed = qx.util.Request.methodAllowsRequestBody(this.getMethod()),
          curContentType = this.getRequestHeader("Content-Type"),
          serializedData = this._serializeData(this.getRequestData(), curContentType);

      // add GET params if needed
      if (this.getMethod() === "GET" && hasRequestData) {
        this.setUrl(qx.util.Uri.appendParamsToUrl(this.getUrl(), serializedData));
      }

      // cache prevention
      if (this.isCaching() === false && !hasCacheControlHeader) {
        // Make sure URL cannot be served from cache and new request is made
        this.setUrl(qx.util.Uri.appendParamsToUrl(this.getUrl(), {nocache: new Date().valueOf()}));
      }

      // set timeout
      if (curTimeout) {
        this._transport.timeout = curTimeout;
      }

      // initialize request
      this._transport.open(this.getMethod(), this.getUrl(), true);

      // set all previously stored headers on initialized request
      for (var key in this.__requestHeaders) {
        this._transport.setRequestHeader(key, this.__requestHeaders[key]);
      }

      // send
      if (!isBodyForMethodAllowed) {
        // GET & HEAD
        this._transport.send();
      } else {
        // POST & PUT ...
        if (typeof curContentType === "undefined" && ["ArrayBuffer", "Blob", "FormData"].indexOf(qx.Bootstrap.getClass(serializedData)) === -1) {
          // by default, set content-type urlencoded for requests with body
          this._transport.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }

        this._transport.send(serializedData);
      }
    },

    /**
     * Aborts request.
     *
     * Cancels any network activity.
     * @return {qx.bom.request.SimpleXhr} Self for chaining.
     */
    abort: function() {
      this._transport.abort();
      return this;
    },

    /**
     * Disposes object and wrapped transport.
     * @return {Boolean} <code>true</code> if the object was successfully disposed
     */
    dispose: function() {
      if (this._transport.dispose()) {
        this.__parser = null;
        this.__disposed = true;
        return true;
      }
      return false;
    },

    /*
    ---------------------------------------------------------------------------
      PROTECTED
    ---------------------------------------------------------------------------
    */

    /**
     * Holds transport.
     */
    _transport: null,

    /**
     * Creates XHR transport.
     *
     * May be overridden to change type of resource.
     * @return {qx.bom.request.IRequest} Transport.
     */
    _createTransport: function() {
      return new qx.bom.request.Xhr();
    },

    /**
     * Registers common listeners on given transport.
     *
     * @param transport {qx.bom.request.IRequest} Transport.
     * @return {qx.bom.request.IRequest} Transport.
     */
    _registerTransportListener: function(transport) {
      transport.onreadystatechange = qx.lang.Function.bind(this._onReadyStateChange, this);
      transport.onloadend = qx.lang.Function.bind(this._onLoadEnd, this);
      transport.ontimeout = qx.lang.Function.bind(this._onTimeout, this);
      transport.onerror = qx.lang.Function.bind(this._onError, this);
      transport.onabort = qx.lang.Function.bind(this._onAbort, this);
      transport.onprogress = qx.lang.Function.bind(this._onProgress, this);
      return transport;
    },

    /**
     * Creates response parser.
     *
     * @return {qx.util.ResponseParser} parser.
     */
    _createResponseParser: function() {
        return new qx.util.ResponseParser();
    },

    /**
     * Sets the response.
     *
     * @param response {String} The parsed response of the request.
     */
    _setResponse: function(response) {
      this.__response = response;
    },

    /**
     * Serializes data.
     *
     * @param data {String|Map} Data to serialize.
     * @param contentType {String?} Content-Type which influences the serialization.
     * @return {String|null} Serialized data.
     */
    _serializeData: function(data, contentType) {
      var isPost = this.getMethod() === "POST",
          isJson = (/application\/.*\+?json/).test(contentType);

      if (!data) {
        return null;
      }

      if (qx.lang.Type.isString(data)) {
        return data;
      }

      if (isJson && (qx.lang.Type.isObject(data) || qx.lang.Type.isArray(data))) {
        return qx.lang.Json.stringify(data);
      }

      if (qx.lang.Type.isObject(data)) {
        return qx.util.Uri.toParameter(data, isPost);
      }

      if (["ArrayBuffer", "Blob", "FormData"].indexOf(qx.Bootstrap.getClass(data)) !== -1) {
        return data;
      }

      return null;
    },

    /*
    ---------------------------------------------------------------------------
      PRIVATE
    ---------------------------------------------------------------------------
    */

    /**
     * {Array} Request headers.
     */
    __requestHeaders: null,
    /**
     * {Object} Request data (i.e. body).
     */
    __requestData: null,
    /**
     * {String} HTTP method to use for request.
     */
    __method: "",
    /**
     * {String} Requested URL.
     */
    __url: "",
    /**
     * {Object} Response data.
     */
    __response: null,
    /**
     * {Function} Parser.
     */
    __parser: null,
    /**
     * {Boolean} Whether caching will be enabled.
     */
    __cache: null,
    /**
     * {Number} The current timeout in milliseconds.
     */
    __timeout: null,
    /**
     * {Boolean} Whether object has been disposed.
     */
    __disposed: null,

    /*
    ---------------------------------------------------------------------------
      EVENT HANDLING
    ---------------------------------------------------------------------------
    */

    /**
     * Adds an event listener for the given event name which is executed only once.
     *
     * @param name {String} The name of the event to listen to.
     * @param listener {Function} The function to execute when the event is fired
     * @param ctx {var?} The context of the listener.
     * @return {qx.bom.request.Xhr} Self for chaining.
     */
    addListenerOnce: function(name, listener, ctx) {
      this.once(name, listener, ctx);
      return this;
    },

    /**
     * Adds an event listener for the given event name.
     *
     * @param name {String} The name of the event to listen to.
     * @param listener {Function} The function to execute when the event is fired
     * @param ctx {var?} The context of the listener.
     * @return {qx.bom.request.Xhr} Self for chaining.
     */
    addListener: function(name, listener, ctx) {
      this._transport._emitter.on(name, listener, ctx);
      return this;
    },

    /**
     * Handles "readyStateChange" event.
     */
    _onReadyStateChange: function() {
      if (qx.core.Environment.get("qx.debug.io")) {
        qx.Bootstrap.debug("Fire readyState: " + this._transport.readyState);
      }

      if (this.isDone()) {
        this.__onReadyStateDone();
      }
    },

    /**
     * Called internally when readyState is DONE.
     */
    __onReadyStateDone: function() {
      if (qx.core.Environment.get("qx.debug.io")) {
        qx.Bootstrap.debug("Request completed with HTTP status: " + this._transport.status);
      }

      var response = this._transport.responseText;
      var contentType = this._transport.getResponseHeader("Content-Type");

      // Successful HTTP status
      if (qx.util.Request.isSuccessful(this._transport.status)) {

        // Parse response
        if (qx.core.Environment.get("qx.debug.io")) {
          qx.Bootstrap.debug("Response is of type: '" + contentType + "'");
        }

        this._setResponse(this.__parser.parse(response, contentType));

        this.emit("success");

      // Erroneous HTTP status
      } else {

        try {
          this._setResponse(this.__parser.parse(response, contentType));
        } catch (e) {
          // ignore if it does not work
        }

        // A remote error failure
        if (this._transport.status !== 0) {
          this.emit("fail");
        }
      }
    },

    /**
     * Handles "loadEnd" event.
     */
    _onLoadEnd: function() {
      this.emit("loadEnd");
    },

    /**
     * Handles "abort" event.
     */
    _onAbort: function() {
      this.emit("abort");
    },

    /**
     * Handles "timeout" event.
     */
    _onTimeout: function() {
      this.emit("timeout");

      // A network error failure
      this.emit("fail");
    },

    /**
     * Handles "error" event.
     */
    _onError: function() {
      this.emit("error");

      // A network error failure
      this.emit("fail");
    },

    /**
     * Handles "error" event.
     */
    _onProgress: function() {
      this.emit("progress");
    }

  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tristan Koch (tristankoch)

************************************************************************ */

/**
 * Rest event object.
 */
qx.Class.define("qx.event.type.Rest",
{
  extend: qx.event.type.Data,

  properties:
  {
    /**
     * The request of the event.
     */
    request: {
      check: "qx.io.request.AbstractRequest"
    },

    /**
     * The action that invoked the request.
     */
    action: {
      check: "String"
    },

    /**
     * The phase of the request.
     */
    phase: {
      check: "String"
    },

    /**
     * The id of the request.
     */
    id: {
      check: "Number"
    }
  },

  members:
  {
    /**
     * Initializes an event object.
     *
     * @param data {var} Then event's new data
     * @param old {var?null} The event's old data
     * @param cancelable {Boolean?false} Whether or not an event can have its default
     *  action prevented. The default action can either be the browser's
     *  default action of a native event (e.g. open the context menu on a
     *  right click) or the default action of a qooxdoo class (e.g. close
     *  the window widget). The default action can be prevented by calling
     *  {@link qx.event.type.Event#preventDefault}
     * @param request {qx.io.request.AbstractRequest} The associated request.
     * @param action {String} The associated action.
     * @param phase {String} The associated phase.
     * @return {qx.event.type.Data} The initialized instance.
     */
    init: function(data, old, cancelable, request, action, phase) {
      this.base(arguments, data, old, cancelable);

      this.setRequest(request);
      this.setAction(action);
      this.setPhase(phase);
      this.setId(parseInt(request.toHashCode(), 10));

      return this;
    },

    /**
     * Get a copy of this object
     *
     * @param embryo {qx.event.type.Data?null} Optional event class, which will
     *  be configured using the data of this event instance. The event must be
     *  an instance of this event class. If the data is <code>null</code>,
     *  a new pooled instance is created.
     * @return {qx.event.type.Data} A copy of this object.
     */
    clone: function(embryo) {
      var clone = this.base(arguments, embryo);
      clone.setAction(this.getAction());
      clone.setPhase(this.getPhase());
      clone.setRequest(this.getRequest());
      return clone;
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tristan Koch (tristankoch)

************************************************************************ */

/**
 * Handles response associated to a resource's action. The model property is
 * populated with the marshaled response. Note the action is invoked on the
 * resource, not the store.
 */
qx.Class.define("qx.data.store.Rest",
{
  extend: qx.core.Object,

  /**
   * @param resource {qx.io.rest.Resource} The resource.
   * @param actionName {String} The name of the resource's action to retrieve
   *  the response from.
   * @param delegate {Object?null} The delegate containing one of the methods
   *  specified in {@link qx.data.store.IStoreDelegate}.
   */
  construct: function(resource, actionName, delegate)
  {
    this.base(arguments);

    try {
      this.setResource(resource);
      this.setActionName(actionName);
    } catch(e) {
      this.dispose();
      throw e;
    }

    this._delegate = delegate;
    this._marshaler = new qx.data.marshal.Json(delegate);

    if (delegate && qx.lang.Type.isFunction(delegate.configureRequest)) {
      this.__configureRequest();
    }

    this.__onActionSuccessBound = qx.lang.Function.bind(this.__onActionSuccess, this);
    this.__addListeners();
  },

  properties:
  {
    /**
     * The resource.
     */
    resource: {
      check: "qx.io.rest.Resource"
    },

    /**
     * The name of the resource's action to retrieve the response from.
     */
    actionName: {
      check: "String"
    },

    /**
     * Populated with the marshaled response.
     */
    model: {
      nullable: true,
      event: "changeModel"
    }
  },

  members:
  {
    _marshaler: null,
    _delegate: null,

    __onActionSuccessBound: null,

    /**
     * Configure the resource's request by processing the delegate.
     */
    __configureRequest: function() {
      var resource = this.getResource(),
          delegate = this._delegate;

      // Overrides existing callback, if any
      resource.configureRequest(delegate.configureRequest);
    },

    /**
     * Listen to events fired by the resource.
     */
    __addListeners: function() {
      var resource = this.getResource(),
          actionName = this.getActionName();

      if (resource && actionName) {
        resource.addListener(this.getActionName() + "Success", this.__onActionSuccessBound);
      }
    },

    /**
     * Handle actionSuccess event.
     *
     * Updates model with marshaled response.
     *
     * @param e {qx.event.type.Rest} Rest event.
     */
    __onActionSuccess: function(e) {
      var data = e.getData(),
          marshaler = this._marshaler,
          model,
          oldModel = this.getModel(),
          delegate = this._delegate;

      // Skip if data is empty
      if (data) {

        // Manipulate received data
        if (delegate && delegate.manipulateData) {
          data = delegate.manipulateData(data);
        }

        // Create class suiting data and assign instance
        // initialized with data to model property
        marshaler.toClass(data, true);
        model = marshaler.toModel(data);
        if (model) {
          this.setModel(model);
        }
      }

      // Dispose instance marshaled before
      if (oldModel && oldModel.dispose) {
        oldModel.dispose();
      }
    }
  },

  destruct: function() {
    var model = this.getModel();
    if (model && typeof model.dispose === "function") {
      model.dispose();
    }

    this._marshaler && this._marshaler.dispose();
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * <h2>Form Controller</h2>
 *
 * *General idea*
 *
 * The form controller is responsible for connecting a form with a model. If no
 * model is given, a model can be created. This created model will fit exactly
 * to the given form and can be used for serialization. All the connections
 * between the form items and the model are handled by an internal
 * {@link qx.data.controller.Object}.
 *
 * *Features*
 *
 * * Connect a form to a model (bidirectional)
 * * Create a model for a given form
 *
 * *Usage*
 *
 * The controller only works if both a controller and a model are set.
 * Creating a model will automatically set the created model.
 *
 * *Cross reference*
 *
 * * If you want to bind single values, use {@link qx.data.controller.Object}
 * * If you want to bind a list like widget, use {@link qx.data.controller.List}
 * * If you want to bind a tree widget, use {@link qx.data.controller.Tree}
 */
qx.Class.define("qx.data.controller.Form",
{
  extend : qx.core.Object,
  implement: [ qx.core.IDisposable ],
  
  /**
   * @param model {qx.core.Object | null} The model to bind the target to. The
   *   given object will be set as {@link #model} property.
   * @param target {qx.ui.form.Form | null} The form which contains the form
   *   items. The given form will be set as {@link #target} property.
   * @param selfUpdate {Boolean?false} If set to true, you need to call the
   *   {@link #updateModel} method to get the data in the form to the model.
   *   Otherwise, the data will be synced automatically on every change of
   *   the form.
   */
  construct : function(model, target, selfUpdate)
  {
    this.base(arguments);

    this._selfUpdate = !!selfUpdate;
    this.__bindingOptions = {};

    if (model != null) {
      this.setModel(model);
    }

    if (target != null) {
      this.setTarget(target);
    }
  },


  properties :
  {
    /** Data object containing the data which should be shown in the target. */
    model :
    {
      check: "qx.core.Object",
      apply: "_applyModel",
      event: "changeModel",
      nullable: true,
      dereference: true
    },


    /** The target widget which should show the data. */
    target :
    {
      check: "qx.ui.form.Form",
      apply: "_applyTarget",
      event: "changeTarget",
      nullable: true,
      init: null,
      dereference: true
    }
  },


  members :
  {
    __objectController : null,
    __bindingOptions : null,


    /**
     * The form controller uses for setting up the bindings the fundamental
     * binding layer, the {@link qx.data.SingleValueBinding}. To achieve a
     * binding in both directions, two bindings are needed. With this method,
     * you have the opportunity to set the options used for the bindings.
     *
     * @param name {String} The name of the form item for which the options
     *   should be used.
     * @param model2target {Map} Options map used for the binding from model
     *   to target. The possible options can be found in the
     *   {@link qx.data.SingleValueBinding} class.
     * @param target2model {Map} Options map used for the binding from target
     *   to model. The possible options can be found in the
     *   {@link qx.data.SingleValueBinding} class.
     */
    addBindingOptions : function(name, model2target, target2model)
    {
      this.__bindingOptions[name] = [model2target, target2model];

      // return if not both, model and target are given
      if (this.getModel() == null || this.getTarget() == null) {
        return;
      }

      // renew the affected binding
      var item = this.getTarget().getItems()[name];
      var targetProperty =
        this.__isModelSelectable(item) ? "modelSelection[0]" : "value";

      // remove the binding
      this.__objectController.removeTarget(item, targetProperty, name);
      // set up the new binding with the options
      this.__objectController.addTarget(
        item, targetProperty, name, !this._selfUpdate, model2target, target2model
      );
    },


    /**
     * Creates and sets a model using the {@link qx.data.marshal.Json} object.
     * Remember that this method can only work if the form is set. The created
     * model will fit exactly that form. Changing the form or adding an item to
     * the form will need a new model creation.
     *
     * @param includeBubbleEvents {Boolean} Whether the model should support
     *   the bubbling of change events or not.
     * @return {qx.core.Object} The created model.
     */
    createModel : function(includeBubbleEvents) {
      var target = this.getTarget();

      // throw an error if no target is set
      if (target == null) {
        throw new Error("No target is set.");
      }

      var items = target.getItems();
      var data = {};
      for (var name in items) {
        var names = name.split(".");
        var currentData = data;
        for (var i = 0; i < names.length; i++) {
          // if its the last item
          if (i + 1 == names.length) {
            // check if the target is a selection
            var clazz = items[name].constructor;
            var itemValue = null;
            if (qx.Class.hasInterface(clazz, qx.ui.core.ISingleSelection)) {
              // use the first element of the selection because passed to the
              // marshaler (and its single selection anyway) [BUG #3541]
              itemValue = items[name].getModelSelection().getItem(0) || null;
            } else {
              itemValue = items[name].getValue();
            }
            // call the converter if available [BUG #4382]
            if (this.__bindingOptions[name] && this.__bindingOptions[name][1]) {
              itemValue = this.__bindingOptions[name][1].converter(itemValue);
            }
            currentData[names[i]] = itemValue;
          } else {
            // if its not the last element, check if the object exists
            if (!currentData[names[i]]) {
              currentData[names[i]] = {};
            }
            currentData = currentData[names[i]];
          }
        }
      }

      var model = qx.data.marshal.Json.createModel(data, includeBubbleEvents);
      this.setModel(model);

      return model;
    },


    /**
     * Responsible for syncing the data from entered in the form to the model.
     * Please keep in mind that this method only works if you create the form
     * with <code>selfUpdate</code> set to true. Otherwise, this method will
     * do nothing because updates will be synced automatically on every
     * change.
     */
    updateModel: function(){
      // only do stuff if self update is enabled and a model or target is set
      if (!this._selfUpdate || !this.getModel() || !this.getTarget()) {
        return;
      }

      var items = this.getTarget().getItems();
      for (var name in items) {
        var item = items[name];
        var sourceProperty =
          this.__isModelSelectable(item) ? "modelSelection[0]" : "value";

        var options = this.__bindingOptions[name];
        options = options && this.__bindingOptions[name][1];

        qx.data.SingleValueBinding.updateTarget(
          item, sourceProperty, this.getModel(), name, options
        );
      }
    },


    // apply method
    _applyTarget : function(value, old) {
      // if an old target is given, remove the binding
      if (old != null) {
        this.__tearDownBinding(old);
      }

      // do nothing if no target is set
      if (this.getModel() == null) {
        return;
      }

      // target and model are available
      if (value != null) {
        this.__setUpBinding();
      }
    },


    // apply method
    _applyModel : function(value, old) {

      // set the model to null to reset all items before removing them
      if (this.__objectController != null && value == null) {
        this.__objectController.setModel(null);
      }

      // first, get rid off all bindings (avoids wrong data population)
      if (this.__objectController != null && this.getTarget() != null) {
        var items = this.getTarget().getItems();
        for (var name in items) {
          var item = items[name];
          var targetProperty =
            this.__isModelSelectable(item) ? "modelSelection[0]" : "value";
          this.__objectController.removeTarget(item, targetProperty, name);
        }
      }

      // set the model of the object controller if available
      if (this.__objectController != null) {
        this.__objectController.setModel(value);
      }

      // do nothing is no target is set
      if (this.getTarget() == null) {
        return;
      }
      else {
        // if form was validated with errors and model changes
        // the errors should be cleared see #8977
        this.getTarget().getValidationManager().reset();
      }

      // model and target are available
      if (value != null) {
        this.__setUpBinding();
      }
    },


    /**
     * Internal helper for setting up the bindings using
     * {@link qx.data.controller.Object#addTarget}. All bindings are set
     * up bidirectional.
     */
    __setUpBinding : function() {
      // create the object controller
      if (this.__objectController == null) {
        this.__objectController = new qx.data.controller.Object(this.getModel());
      }

      // get the form items
      var items = this.getTarget().getItems();

      // connect all items
      for (var name in items) {
        var item = items[name];
        var targetProperty =
          this.__isModelSelectable(item) ? "modelSelection[0]" : "value";
        var options = this.__bindingOptions[name];

        // try to bind all given items in the form
        try {
          if (options == null) {
            this.__objectController.addTarget(item, targetProperty, name, !this._selfUpdate);
          } else {
            this.__objectController.addTarget(
              item, targetProperty, name, !this._selfUpdate, options[0], options[1]
            );
          }
        // ignore not working items
        } catch (ex) {
          if (qx.core.Environment.get("qx.debug")) {
            this.warn("Could not bind property " + name + " of " + this.getModel() + ":\n" + ex.stack);
          }
        }
      }
      // make sure the initial values of the model are taken for resetting [BUG #5874]
      this.getTarget().redefineResetter();
    },


    /**
     * Internal helper for removing all set up bindings using
     * {@link qx.data.controller.Object#removeTarget}.
     *
     * @param oldTarget {qx.ui.form.Form} The form which has been removed.
     */
    __tearDownBinding : function(oldTarget) {
      // do nothing if the object controller has not been created
      if (this.__objectController == null) {
        return;
      }

      // get the items
      var items = oldTarget.getItems();

      // disconnect all items
      for (var name in items) {
        var item = items[name];
        var targetProperty =
          this.__isModelSelectable(item) ? "modelSelection[0]" : "value";
        this.__objectController.removeTarget(item, targetProperty, name);
      }
    },


    /**
     * Returns whether the given item implements
     * {@link qx.ui.core.ISingleSelection} and
     * {@link qx.ui.form.IModelSelection}.
     *
     * @param item {qx.ui.form.IForm} The form item to check.
     *
     * @return {Boolean} true, if given item fits.
     */
    __isModelSelectable : function(item) {
      return qx.Class.hasInterface(item.constructor, qx.ui.core.ISingleSelection) &&
      qx.Class.hasInterface(item.constructor, qx.ui.form.IModelSelection);
    }

  },



  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */

   destruct : function() {
     // dispose the object controller because the bindings need to be removed
     if (this.__objectController) {
       this.__objectController.dispose();
     }
   }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Hagendorn (chris_schmidt)
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * Each object, which should support single selection have to
 * implement this interface.
 */
qx.Interface.define("qx.ui.core.ISingleSelection",
{
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */


  events :
  {
    /** Fires after the selection was modified */
    "changeSelection" : "qx.event.type.Data"
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */


  members :
  {
    /**
     * Returns an array of currently selected items.
     *
     * Note: The result is only a set of selected items, so the order can
     * differ from the sequence in which the items were added.
     *
     * @return {qx.ui.core.Widget[]} List of items.
     */
    getSelection : function() {
      return true;
    },

    /**
     * Replaces current selection with the given items.
     *
     * @param items {qx.ui.core.Widget[]} Items to select.
     * @throws {Error} if the item is not a child element.
     */
    setSelection : function(items) {
      return arguments.length == 1;
    },

    /**
     * Clears the whole selection at once.
     */
    resetSelection : function() {
      return true;
    },

    /**
     * Detects whether the given item is currently selected.
     *
     * @param item {qx.ui.core.Widget} Any valid selectable item
     * @return {Boolean} Whether the item is selected.
     * @throws {Error} if the item is not a child element.
     */
    isSelected : function(item) {
      return arguments.length == 1;
    },

    /**
     * Whether the selection is empty.
     *
     * @return {Boolean} Whether the selection is empty.
     */
    isSelectionEmpty : function() {
      return true;
    },

    /**
     * Returns all elements which are selectable.
     *
     * @param all {Boolean} true for all selectables, false for the
     *   selectables the user can interactively select
     * @return {qx.ui.core.Widget[]} The contained items.
     */
    getSelectables: function(all) {
      return arguments.length == 1;
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */


/**
 * <h2>Object Controller</h2>
 *
 * *General idea*
 *
 * The idea of the object controller is to make the binding of one model object
 * containing one or more properties as easy as possible. Therefore the
 * controller can take a model as property. Every property in that model can be
 * bound to one or more target properties. The binding will be for
 * atomic types only like Numbers, Strings, ...
 *
 * *Features*
 *
 * * Manages the bindings between the model properties and the different targets
 * * No need for the user to take care of the binding ids
 * * Can create an bidirectional binding (read- / write-binding)
 * * Handles the change of the model which means adding the old targets
 *
 * *Usage*
 *
 * The controller only can work if a model is set. If the model property is
 * null, the controller is not working. But it can be null on any time.
 *
 * *Cross reference*
 *
 * * If you want to bind a list like widget, use {@link qx.data.controller.List}
 * * If you want to bind a tree widget, use {@link qx.data.controller.Tree}
 * * If you want to bind a form widget, use {@link qx.data.controller.Form}
 */
qx.Class.define("qx.data.controller.Object",
{
  extend : qx.core.Object,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param model {qx.core.Object?null} The model for the model property.
   */
  construct : function(model)
  {
    this.base(arguments);

    // create a map for all created binding ids
    this.__bindings = {};
    // create an array to store all current targets
    this.__targets = [];

    if (model != null) {
      this.setModel(model);
    }
  },



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** The model object which does have the properties for the binding. */
    model :
    {
      check: "qx.core.Object",
      event: "changeModel",
      apply: "_applyModel",
      nullable: true,
      dereference: true
    }
  },



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // private members
    __targets : null,
    __bindings : null,

    /**
     * Apply-method which will be called if a new model has been set.
     * All bindings will be moved to the new model.
     *
     * @param value {qx.core.Object|null} The new model.
     * @param old {qx.core.Object|null} The old model.
     */
    _applyModel: function(value, old) {
      // for every target
      for (var i = 0; i < this.__targets.length; i++) {
        // get the properties
        var targetObject = this.__targets[i][0];
        var targetProperty = this.__targets[i][1];
        var sourceProperty = this.__targets[i][2];
        var bidirectional = this.__targets[i][3];
        var options = this.__targets[i][4];
        var reverseOptions = this.__targets[i][5];

        // remove it from the old if possible
        if (old != undefined && !old.isDisposed()) {
          this.__removeTargetFrom(targetObject, targetProperty, sourceProperty, old);
        }

        // add it to the new if available
        if (value != undefined) {
          this.__addTarget(
            targetObject, targetProperty, sourceProperty, bidirectional,
            options, reverseOptions
          );
        } else {
          // in shutdown situations, it may be that something is already
          // disposed [BUG #4343]
          if (targetObject.isDisposed() || qx.core.ObjectRegistry.inShutDown) {
            continue;
          }
          // if the model is null, reset the current target
          if (targetProperty.indexOf("[") == -1) {
            targetObject["reset" + qx.lang.String.firstUp(targetProperty)]();
          } else {
            var open = targetProperty.indexOf("[");
            var index = parseInt(
              targetProperty.substring(open + 1, targetProperty.length - 1), 10
            );
            targetProperty = targetProperty.substring(0, open);
            var targetArray = targetObject["get" + qx.lang.String.firstUp(targetProperty)]();
            if (index == "last") {
              index = targetArray.length;
            }
            if (targetArray) {
              targetArray.setItem(index, null);
            }
          }
        }
      }
    },


    /**
     * Adds a new target to the controller. After adding the target, the given
     * property of the model will be bound to the targets property.
     *
     * @param targetObject {qx.core.Object} The object on which the property
     *   should be bound.
     *
     * @param targetProperty {String} The property to which the binding should
     *   go.
     *
     * @param sourceProperty {String} The name of the property in the model.
     *
     * @param bidirectional {Boolean?false} Signals if the binding should also work
     *   in the reverse direction, from the target to source.
     *
     * @param options {Map?null} The options Map used by the binding from source
     *   to target. The possible options can be found in the
     *   {@link qx.data.SingleValueBinding} class.
     *
     * @param reverseOptions {Map?null} The options used by the binding in the
     *   reverse direction. The possible options can be found in the
     *   {@link qx.data.SingleValueBinding} class.
     */
    addTarget: function(
      targetObject, targetProperty, sourceProperty,
      bidirectional, options, reverseOptions
    ) {

      // store the added target
      this.__targets.push([
        targetObject, targetProperty, sourceProperty,
        bidirectional, options, reverseOptions
      ]);

      // delegate the adding
      this.__addTarget(
        targetObject, targetProperty, sourceProperty,
        bidirectional, options, reverseOptions
      );
    },


    /**
    * Does the work for {@link #addTarget} but without saving the target
    * to the internal target registry.
    *
    * @param targetObject {qx.core.Object} The object on which the property
    *   should be bound.
    *
    * @param targetProperty {String} The property to which the binding should
    *   go.
    *
    * @param sourceProperty {String} The name of the property in the model.
    *
    * @param bidirectional {Boolean?false} Signals if the binding should also work
    *   in the reverse direction, from the target to source.
    *
    * @param options {Map?null} The options Map used by the binding from source
    *   to target. The possible options can be found in the
    *   {@link qx.data.SingleValueBinding} class.
    *
    * @param reverseOptions {Map?null} The options used by the binding in the
    *   reverse direction. The possible options can be found in the
    *   {@link qx.data.SingleValueBinding} class.
    */
    __addTarget: function(
      targetObject, targetProperty, sourceProperty,
      bidirectional, options, reverseOptions
    ) {

      // do nothing if no model is set
      if (this.getModel() == null) {
        return;
      }

      // create the binding
      var id = this.getModel().bind(
        sourceProperty, targetObject, targetProperty, options
      );
      // create the reverse binding if necessary
      var idReverse = null;
      if (bidirectional) {
        idReverse = targetObject.bind(
          targetProperty, this.getModel(), sourceProperty, reverseOptions
        );
      }

      // save the binding
      var targetHash = targetObject.toHashCode();
      if (this.__bindings[targetHash] == undefined) {
        this.__bindings[targetHash] = [];
      }
      this.__bindings[targetHash].push(
        [id, idReverse, targetProperty, sourceProperty, options, reverseOptions]
      );
    },

    /**
     * Removes the target identified by the three properties.
     *
     * @param targetObject {qx.core.Object} The target object on which the
     *   binding exist.
     *
     * @param targetProperty {String} The targets property name used by the
     *   adding of the target.
     *
     * @param sourceProperty {String} The name of the property of the model.
     */
    removeTarget: function(targetObject, targetProperty, sourceProperty) {
      this.__removeTargetFrom(
        targetObject, targetProperty, sourceProperty, this.getModel()
      );

      // delete the target in the targets reference
      for (var i = 0; i < this.__targets.length; i++) {
        if (
          this.__targets[i][0] == targetObject
          && this.__targets[i][1] == targetProperty
          && this.__targets[i][2] == sourceProperty
        ) {
          this.__targets.splice(i, 1);
        }
      }
    },


    /**
     * Does the work for {@link #removeTarget} but without removing the target
     * from the internal registry.
     *
     * @param targetObject {qx.core.Object} The target object on which the
     *   binding exist.
     *
     * @param targetProperty {String} The targets property name used by the
     *   adding of the target.
     *
     * @param sourceProperty {String} The name of the property of the model.
     *
     * @param sourceObject {String} The source object from which the binding
     *   comes.
     */
    __removeTargetFrom: function(
      targetObject, targetProperty, sourceProperty, sourceObject
    ) {
      // check for not fitting targetObjects
      if (!(targetObject instanceof qx.core.Object)) {
        // just do nothing
        return;
      }

      var currentListing = this.__bindings[targetObject.toHashCode()];
      // if no binding is stored
      if (currentListing == undefined || currentListing.length == 0) {
        return;
      }

      // go threw all listings for the object
      for (var i = 0; i < currentListing.length; i++) {
        // if it is the listing
        if (
          currentListing[i][2] == targetProperty &&
          currentListing[i][3] == sourceProperty
        ) {
          // remove the binding
          var id = currentListing[i][0];
          sourceObject.removeBinding(id);
          // check for the reverse binding
          if (currentListing[i][1] != null) {
            targetObject.removeBinding(currentListing[i][1]);
          }
          // delete the entry and return
          currentListing.splice(i, 1);
          return;
        }
      }
    }
  },


  /*
   *****************************************************************************
      DESTRUCT
   *****************************************************************************
   */

  destruct : function() {
    // set the model to null to get the bindings removed
    if (this.getModel() != null && !this.getModel().isDisposed()) {
      this.setModel(null);
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * This interface should be used in all objects managing a set of items
 * implementing {@link qx.ui.form.IModel}.
 */
qx.Interface.define("qx.ui.form.IModelSelection",
{

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * Tries to set the selection using the given array containing the
     * representative models for the selectables.
     *
     * @param value {Array} An array of models.
     */
    setModelSelection : function(value) {},


    /**
     * Returns an array of the selected models.
     *
     * @return {Array} An array containing the models of the currently selected
     *   items.
     */
    getModelSelection : function() {}
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * This interface defines the necessary features a form renderer should have.
 * Keep in mind that all renderes has to be widgets.
 */
qx.Interface.define("qx.ui.form.renderer.IFormRenderer",
{
  members :
  {
    /**
     * Add a group of form items with the corresponding names. The names should
     * be displayed as hint for the user what to do with the form item.
     * The title is optional and can be used as grouping for the given form
     * items.
     *
     * @param items {qx.ui.core.Widget[]} An array of form items to render.
     * @param names {String[]} An array of names for the form items.
     * @param title {String?} A title of the group you are adding.
     * @param itemsOptions {Array?null} The added additional data.
     * @param headerOptions {Map?null} The options map as defined by the form
     *   for the current group header.
     */
    addItems : function(items, names, title, itemsOptions, headerOptions) {},


    /**
     * Adds a button the form renderer.
     *
     * @param button {qx.ui.form.Button} A button which should be added to
     *   the form.
     * @param options {Map?null} The added additional data.
     */
    addButton : function(button, options) {}

  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * Abstract renderer for {@link qx.ui.form.Form}. This abstract renderer should
 * be the superclass of all form renderer. It takes the form, which is
 * supplied as constructor parameter and configures itself. So if you need to
 * set some additional information on your renderer before adding the widgets,
 * be sure to do that before calling this.base(arguments, form).
 */
qx.Class.define("qx.ui.form.renderer.AbstractRenderer",
{
  type : "abstract",
  extend : qx.ui.core.Widget,
  implement : qx.ui.form.renderer.IFormRenderer,

  /**
   * @param form {qx.ui.form.Form} The form to render.
   */
  construct : function(form)
  {
    this.base(arguments);

    this._labels = [];

    // translation support
    if (qx.core.Environment.get("qx.dynlocale")) {
      qx.locale.Manager.getInstance().addListener(
        "changeLocale", this._onChangeLocale, this
      );
      this._names = [];
    }
    this._form = form;
    this._render();

    form.addListener("change", this._onFormChange, this);
  },

  properties :
  {
    /**
     * A string that is appended to the label if it is not empty.
     * Defaults to " :"
     */
    labelSuffix :
    {
      check : "String",
      init : " :",
      event : "changeLabelSuffix",
      nullable : true
    },

    /**
     * A string that is appended to the label and the label suffix if the corresponding
     * form field is mandatory. Defaults to space plus a red asterisk.
     */
    requiredSuffix :
    {
      check : "String",
      init : " <span style='color:red'>*</span> ",
      event : "changeRequiredSuffix",
      nullable : false
    }
  },


  members :
  {
    _names : null,
    _form : null,
    _labels : null,


    /**
     * Renders the form: adds the items and buttons.
     */
    _render : function() {
      // add the groups
      var groups = this._form.getGroups();
      for (var i = 0; i < groups.length; i++) {
        var group = groups[i];
        this.addItems(
          group.items, group.labels, group.title, group.options, group.headerOptions
        );
      }

      // add the buttons
      var buttons = this._form.getButtons();
      var buttonOptions = this._form.getButtonOptions();
      for (var i = 0; i < buttons.length; i++) {
        this.addButton(buttons[i], buttonOptions[i]);
      }
    },


    /**
     * Handler responsible for updating the rendered widget as soon as the
     * form changes.
     */
    _onFormChange : function() {
      this._removeAll();
      // remove all created labels
      for (var i=0; i < this._labels.length; i++) {
        this._labels[i].dispose();
      }
      this._labels = [];

      this._render();
    },


    /**
     * Helper to bind the item's visibility to the label's visibility.
     * @param item {qx.ui.core.Widget} The form element.
     * @param label {qx.ui.basic.Label} The label for the form element.
     */
    _connectVisibility : function(item, label) {
      // map the items visibility to the label
      item.bind("visibility", label, "visibility");
    },


    /**
     * Locale change event handler
     *
     * @signature function(e)
     * @param e {Event} the change event
     */
    _onChangeLocale : qx.core.Environment.select("qx.dynlocale",
    {
      "true" : function(e) {
        for (var i = 0; i < this._names.length; i++) {
          var entry = this._names[i];
          if (entry.name && entry.name.translate) {
            entry.name = entry.name.translate();
          }
          var newText = this._createLabelText(entry.name, entry.item);
          entry.label.setValue(newText);
        }
      },

      "false" : null
    }),


    /**
     * Creates the label text for the given form item.
     *
     * @param name {String} The content of the label without the
     *   trailing * and :
     * @param item {qx.ui.form.IForm} The item, which has the required state.
     * @return {String} The text for the given item.
     */
    _createLabelText : function(name, item)
    {
      var requiredSuffix = "";
      if (item.getRequired()) {
        requiredSuffix = this.getRequiredSuffix();
      }

      // Create the label. Append a suffix only if there's text to display.
      var labelSuffix = name.length > 0 || item.getRequired() ? this.getLabelSuffix() : "";
      return name + requiredSuffix + labelSuffix;
    },


    // interface implementation
    addItems : function(items, names, title) {
      throw new Error("Abstract method call");
    },


    // interface implementation
    addButton : function(button) {
      throw new Error("Abstract method call");
    }
  },



  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    if (qx.core.Environment.get("qx.dynlocale")) {
      qx.locale.Manager.getInstance().removeListener("changeLocale", this._onChangeLocale, this);
    }
    this._names = null;

    this._form.removeListener("change", this._onFormChange, this);
    this._form = null;
  }
});
