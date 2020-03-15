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
 * Docks children to one of the edges.
 *
 * *Features*
 *
 * * Percent width for left/right/center attached children
 * * Percent height for top/bottom/center attached children
 * * Minimum and maximum dimensions
 * * Prioritized growing/shrinking (flex)
 * * Auto sizing
 * * Margins and Spacings
 * * Alignment in orthogonal axis (e.g. alignX of north attached)
 * * Different sort options for children
 *
 * *Item Properties*
 *
 * <ul>
 * <li><strong>edge</strong> <em>(String)</em>: The edge where the layout item
 *   should be docked. This may be one of <code>north</code>, <code>east</code>,
 *   <code>south</code>, <code>west</code> or <code>center</code>. (Required)</li>
 * <li><strong>width</strong> <em>(String)</em>: Defines a percent
 *   width for the item. The percent width,
 *   when specified, is used instead of the width defined by the size hint.
 *   This is only supported for children added to the north or south edge or
 *   are centered in the middle of the layout.
 *   The minimum and maximum width still takes care of the elements limitations.
 *   It has no influence on the layout's size hint. Percents are mainly useful for
 *   widgets which are sized by the outer hierarchy.
 * </li>
 * <li><strong>height</strong> <em>(String)</em>: Defines a percent
 *   height for the item. The percent height,
 *   when specified, is used instead of the height defined by the size hint.
 *   This is only supported for children added to the west or east edge or
 *   are centered in the middle of the layout.
 *   The minimum and maximum height still takes care of the elements limitations.
 *   It has no influence on the layout's size hint. Percents are mainly useful for
 *   widgets which are sized by the outer hierarchy.
 * </li>
 * </ul>
 *
 * *Example*
 *
 * <pre class="javascript">
 * var layout = new qx.ui.layout.Dock();
 *
 * var w1 = new qx.ui.core.Widget();
 * var w2 = new qx.ui.core.Widget();
 * var w3 = new qx.ui.core.Widget();
 *
 * w1.setHeight(200);
 * w2.setWidth(150);
 *
 * var container = new qx.ui.container.Composite(layout);
 * container.add(w1, {edge:"north"});
 * container.add(w2, {edge:"west"});
 * container.add(w3, {edge:"center"});
 * </pre>
 *
 * *Detailed Description*
 *
 * Using this layout, items may be "docked" to a specific side
 * of the available space. Each displayed item reduces the available space
 * for the following children. Priorities depend on the position of
 * the child in the internal children list.
 *
 * *External Documentation*
 *
 * <a href='http://manual.qooxdoo.org/${qxversion}/pages/layout/dock.html'>
 * Extended documentation</a> and links to demos of this layout in the qooxdoo manual.
 */
qx.Class.define("qx.ui.layout.Dock",
{
  extend : qx.ui.layout.Abstract,



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param spacingX {Integer?0} The horizontal spacing. Sets {@link #spacingX}.
   * @param spacingY {Integer?0} The vertical spacing. Sets {@link #spacingY}.
   * @param separatorX {String|qx.ui.decoration.IDecorator} Separator to render between columns
   * @param separatorY {String|qx.ui.decoration.IDecorator} Separator to render between rows
   */
  construct : function(spacingX, spacingY, separatorX, separatorY)
  {
    this.base(arguments);

    if (spacingX) {
      this.setSpacingX(spacingX);
    }

    if (spacingY) {
      this.setSpacingY(spacingY);
    }

    if (separatorX) {
      this.setSeparatorX(separatorX);
    }

    if (separatorY) {
      this.setSeparatorY(separatorY);
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
     * The way the widgets should be displayed (in conjunction with their
     * position in the childrens array).
     */
    sort :
    {
      check : [ "auto", "y", "x" ],
      init : "auto",
      apply : "_applySort"
    },


    /** Separator lines to use between the horizontal objects */
    separatorX :
    {
      check : "Decorator",
      nullable : true,
      apply : "_applyLayoutChange"
    },


    /** Separator lines to use between the vertical objects */
    separatorY :
    {
      check : "Decorator",
      nullable : true,
      apply : "_applyLayoutChange"
    },


    /**
     * Whether separators should be collapsed so when a spacing is
     * configured the line go over into each other
     */
    connectSeparators :
    {
      check : "Boolean",
      init : false,
      apply : "_applyLayoutChange"
    },


    /** Horizontal spacing between two children */
    spacingX :
    {
      check : "Integer",
      init : 0,
      apply : "_applyLayoutChange"
    },


    /** Vertical spacing between two children */
    spacingY :
    {
      check : "Integer",
      init : 0,
      apply : "_applyLayoutChange"
    }
  },






  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __children : null,
    __edges : null,


    // overridden
    verifyLayoutProperty : qx.core.Environment.select("qx.debug",
    {
      "true" : function(item, name, value)
      {
        this.assertInArray(name, ["flex", "edge", "height", "width"], "The property '"+name+"' is not supported by the Dock layout!");

        if (name === "edge")
        {
          this.assertInArray(value, ["north", "south", "west", "east", "center"]);
        }
        else if (name === "flex")
        {
          this.assertNumber(value);
          this.assert(value >= 0);
        } else {
          this.assertMatch(value, qx.ui.layout.Util.PERCENT_VALUE);
        }
      },

      "false" : null
    }),


    // property apply
    _applySort : function()
    {
      // easiest way is to invalidate the cache
      this._invalidChildrenCache = true;

      // call normal layout change
      this._applyLayoutChange();
    },


    /**
     * @type {Map} Maps edge IDs to numeric values
     *
     * @lint ignoreReferenceField(__edgeMap)
     */
    __edgeMap :
    {
      north : 1,
      south : 2,
      west : 3,
      east : 4,
      center : 5
    },


    /**
     * @type {Map} Maps edges to align values
     *
     * @lint ignoreReferenceField(__alignMap)
     */
    __alignMap :
    {
      1 : "top",
      2 : "bottom",
      3 : "left",
      4 : "right"
    },


    /**
     * Rebuilds cache for sorted children list.
     *
     */
    __rebuildCache : function()
    {
      var all = this._getLayoutChildren();
      var child, center;
      var length = all.length;

      var high = [];
      var low = [];
      var edge = [];

      var yfirst = this.getSort() === "y";
      var xfirst = this.getSort() === "x";

      for (var i=0; i<length; i++)
      {
        child = all[i];
        edge = child.getLayoutProperties().edge;

        if (edge === "center")
        {
          if (center) {
            throw new Error("It is not allowed to have more than one child aligned to 'center'!");
          }

          center = child;
        }
        else if (xfirst || yfirst)
        {
          if (edge === "north" || edge === "south") {
            yfirst ? high.push(child) : low.push(child);
          } else if (edge === "west" || edge === "east") {
            yfirst ? low.push(child) : high.push(child);
          }
        }
        else
        {
          high.push(child);
        }
      }

      // Combine sorted children list
      var result = high.concat(low);
      if (center) {
        result.push(center);
      }

      this.__children = result;

      // Cache edges for faster access
      var edges=[];
      for (var i=0; i<length; i++)
      {
        edge = result[i].getLayoutProperties().edge;
        edges[i] = this.__edgeMap[edge] || 5;
      }

      this.__edges = edges;

      // Clear invalidation marker
      delete this._invalidChildrenCache;
    },




    /*
    ---------------------------------------------------------------------------
      LAYOUT INTERFACE
    ---------------------------------------------------------------------------
    */

    // overridden
    renderLayout : function(availWidth, availHeight, padding)
    {
      // Rebuild flex/width caches
      if (this._invalidChildrenCache) {
        this.__rebuildCache();
      }

      var util = qx.ui.layout.Util;
      var children = this.__children;
      var edges = this.__edges;
      var length = children.length;
      var flexibles, child, hint, props, flex, grow, width, height, offset;

      var widths = [];
      var heights = [];

      var separatorWidths = this._getSeparatorWidths();
      var spacingX = this.getSpacingX();
      var spacingY = this.getSpacingY();




      // **************************************
      //   Caching children data
      // **************************************

      var allocatedWidth = -spacingX;
      var allocatedHeight = -spacingY;

      if (separatorWidths.x) {
        allocatedWidth -= separatorWidths.x + spacingX;
      }

      if (separatorWidths.y) {
        allocatedHeight -= separatorWidths.y + spacingY;
      }

      for (var i=0; i<length; i++)
      {
        child = children[i];
        props = child.getLayoutProperties();
        hint = child.getSizeHint();

        width = hint.width;
        height = hint.height;

        if (props.width != null)
        {
          width = Math.floor(availWidth * parseFloat(props.width) / 100);
          if (width < hint.minWidth) {
            width = hint.minWidth;
          } else if (width > hint.maxWidth) {
            width = hint.maxWidth;
          }
        }

        if (props.height != null)
        {
          height = Math.floor(availHeight * parseFloat(props.height) / 100);
          if (height < hint.minHeight) {
            height = hint.minHeight;
          } else if (height > hint.maxHeight) {
            height = hint.maxHeight;
          }
        }

        widths[i] = width;
        heights[i] = height;

        // Update allocated width
        switch(edges[i])
        {
          // north+south
          case 1:
          case 2:
            allocatedHeight += height + child.getMarginTop() + child.getMarginBottom() + spacingY;
            if (separatorWidths.y) {
              allocatedHeight += separatorWidths.y + spacingY;
            }
            break;

          // west+east
          case 3:
          case 4:
            allocatedWidth += width + child.getMarginLeft() + child.getMarginRight() + spacingX;
            if (separatorWidths.x) {
              allocatedWidth += separatorWidths.x + spacingX;
            }
            break;

          // center
          default:
            allocatedWidth += width + child.getMarginLeft() + child.getMarginRight() + spacingX;
            allocatedHeight += height + child.getMarginTop() + child.getMarginBottom() + spacingY;

            if (separatorWidths.x) {
              allocatedWidth += separatorWidths.x + spacingX;
            }

            if (separatorWidths.y) {
              allocatedHeight += separatorWidths.y + spacingY;
            }
        }
      }





      // **************************************
      //   Horizontal flex support
      // **************************************

      if (allocatedWidth != availWidth)
      {
        flexibles = {};
        grow = allocatedWidth < availWidth;

        for (var i=0; i<length; i++)
        {
          child = children[i];

          switch(edges[i])
          {
            case 3:
            case 4:
            case 5:
              flex = child.getLayoutProperties().flex;

              // Default flex for centered children is '1'
              if (flex == null && edges[i] == 5) {
                flex = 1;
              }

              if (flex > 0)
              {
                hint = child.getSizeHint();

                flexibles[i] =
                {
                  min : hint.minWidth,
                  value : widths[i],
                  max : hint.maxWidth,
                  flex : flex
                };
              }
          }
        }

        var result = util.computeFlexOffsets(flexibles, availWidth, allocatedWidth);
        for (var i in result)
        {
          offset = result[i].offset;

          widths[i] += offset;
          allocatedWidth += offset;
        }
      }




      // **************************************
      //   Vertical flex support
      // **************************************

      // Process height for flex stretching/shrinking
      if (allocatedHeight != availHeight)
      {
        flexibles = {};
        grow = allocatedHeight < availHeight;

        for (var i=0; i<length; i++)
        {
          child = children[i];

          switch(edges[i])
          {
            case 1:
            case 2:
            case 5:
              flex = child.getLayoutProperties().flex;

              // Default flex for centered children is '1'
              if (flex == null && edges[i] == 5) {
                flex = 1;
              }

              if (flex > 0)
              {
                hint = child.getSizeHint();

                flexibles[i] =
                {
                  min : hint.minHeight,
                  value : heights[i],
                  max : hint.maxHeight,
                  flex : flex
                };
              }
          }
        }

        var result = util.computeFlexOffsets(flexibles, availHeight, allocatedHeight);
        for (var i in result)
        {
          offset = result[i].offset;

          heights[i] += offset;
          allocatedHeight += offset;
        }
      }





      // **************************************
      //   Layout children
      // **************************************

      // Pre configure separators
      this._clearSeparators();

      // Prepare loop
      var separatorX=this.getSeparatorX(), separatorY=this.getSeparatorY();
      var connectSeparators=this.getConnectSeparators();
      var nextTop=0, nextLeft=0;
      var left, top, width, height, used, edge;
      var separatorLeft, separatorTop, separatorWidth, separatorHeight;
      var marginTop, marginBottom, marginLeft, marginRight;
      var alignMap = this.__alignMap;

      for (var i=0; i<length; i++)
      {
        // Cache child data
        child = children[i];
        edge = edges[i];
        hint = child.getSizeHint();

        // Cache child margins
        marginTop = child.getMarginTop();
        marginBottom = child.getMarginBottom();
        marginLeft = child.getMarginLeft();
        marginRight = child.getMarginRight();

        // Calculate child layout
        switch(edge)
        {
          // north + south
          case 1:
          case 2:
            // Full available width
            width = availWidth - marginLeft - marginRight;

            // Limit width to min/max
            if (width < hint.minWidth) {
              width = hint.minWidth;
            } else if (width > hint.maxWidth) {
              width = hint.maxWidth;
            }

            // Child preferred height
            height = heights[i];

            // Compute position
            top = nextTop + util.computeVerticalAlignOffset(alignMap[edge], height, availHeight, marginTop, marginBottom);
            left = nextLeft + util.computeHorizontalAlignOffset(child.getAlignX()||"left", width, availWidth, marginLeft, marginRight);

            // Render the separator
            if (separatorWidths.y)
            {
              if (edge == 1) {
                separatorTop = nextTop + height + marginTop + spacingY + marginBottom;
              } else {
                separatorTop = nextTop + availHeight - height - marginTop - spacingY - marginBottom - separatorWidths.y;
              }

              separatorLeft = left;
              separatorWidth = availWidth;

              if (connectSeparators && separatorLeft > 0)
              {
                separatorLeft -= spacingX + marginLeft;
                separatorWidth += (spacingX) * 2;
              }
              else
              {
                separatorLeft -= marginLeft;
              }

              this._renderSeparator(separatorY, {
                left : separatorLeft + padding.left,
                top : separatorTop + padding.top,
                width : separatorWidth,
                height : separatorWidths.y
              });
            }

            // Update available height
            used = height + marginTop + marginBottom + spacingY;
            if (separatorWidths.y) {
              used += separatorWidths.y + spacingY;
            }

            availHeight -= used;

            // Update coordinates, for next child
            if (edge == 1) {
              nextTop += used;
            }

            break;


          // west + east
          case 3:
          case 4:
            // Full available height
            height = availHeight - marginTop - marginBottom;

            // Limit height to min/max
            if (height < hint.minHeight) {
              height = hint.minHeight;
            } else if (height > hint.maxHeight) {
              height = hint.maxHeight;
            }

            // Child preferred width
            width = widths[i];

            // Compute position
            left = nextLeft + util.computeHorizontalAlignOffset(alignMap[edge], width, availWidth, marginLeft, marginRight);
            top = nextTop + util.computeVerticalAlignOffset(child.getAlignY()||"top", height, availHeight, marginTop, marginBottom);

            // Render the separator
            if (separatorWidths.x)
            {
              if (edge == 3) {
                separatorLeft = nextLeft + width + marginLeft + spacingX + marginRight;
              } else {
                separatorLeft = nextLeft + availWidth - width - marginLeft - spacingX - marginRight - separatorWidths.x;
              }

              separatorTop = top;
              separatorHeight = availHeight;

              if (connectSeparators && separatorTop > 0)
              {
                separatorTop -= spacingY + marginTop;
                separatorHeight += (spacingY) * 2;
              }
              else
              {
                separatorTop -= marginTop;
              }

              this._renderSeparator(separatorX, {
                left : separatorLeft + padding.left,
                top : separatorTop + padding.top,
                width : separatorWidths.x,
                height : separatorHeight
              });
            }

            // Update available height
            used = width + marginLeft + marginRight + spacingX;
            if (separatorWidths.x) {
              used += separatorWidths.x + spacingX;
            }
            availWidth -= used;

            // Update coordinates, for next child
            if (edge == 3) {
              nextLeft += used;
            }

            break;


          // center
          default:
            // Calculated width/height
            width = availWidth - marginLeft - marginRight;
            height = availHeight - marginTop - marginBottom;

            // Limit width to min/max
            if (width < hint.minWidth) {
              width = hint.minWidth;
            } else if (width > hint.maxWidth) {
              width = hint.maxWidth;
            }

            // Limit height to min/max
            if (height < hint.minHeight) {
              height = hint.minHeight;
            } else if (height > hint.maxHeight) {
              height = hint.maxHeight;
            }

            // Compute coordinates (respect margins and alignments for both axis)
            left = nextLeft + util.computeHorizontalAlignOffset(child.getAlignX()||"left", width, availWidth, marginLeft, marginRight);
            top = nextTop + util.computeVerticalAlignOffset(child.getAlignY()||"top", height, availHeight, marginTop, marginBottom);
        }

        // Apply layout
        child.renderLayout(left + padding.left, top + padding.top, width, height);
      }
    },


    /**
     * Computes the dimensions each separator on both the <code>x</code> and
     * <code>y</code> axis needs.
     *
     * @return {Map} Map with the keys <code>x</code> and
     *   <code>y</code>
     */
    _getSeparatorWidths : function()
    {
      var separatorX=this.getSeparatorX(), separatorY=this.getSeparatorY();
      if (separatorX || separatorY) {
        var decorationManager = qx.theme.manager.Decoration.getInstance();
      }

      if (separatorX)
      {
        var separatorInstanceX = decorationManager.resolve(separatorX);
        var separatorInsetsX = separatorInstanceX.getInsets();
        var separatorWidthX = separatorInsetsX.left + separatorInsetsX.right;
      }

      if (separatorY)
      {
        var separatorInstanceY = decorationManager.resolve(separatorY);
        var separatorInsetsY = separatorInstanceY.getInsets();
        var separatorWidthY = separatorInsetsY.top + separatorInsetsY.bottom;
      }

      return {
        x : separatorWidthX || 0,
        y : separatorWidthY || 0
      };
    },


    // overridden
    _computeSizeHint : function()
    {
      // Rebuild flex/width caches
      if (this._invalidChildrenCache) {
        this.__rebuildCache();
      }

      var children = this.__children;
      var edges = this.__edges;

      var length = children.length;
      var hint, child;
      var marginX, marginY;

      var widthX=0, minWidthX=0;
      var heightX=0, minHeightX=0;
      var widthY=0, minWidthY=0;
      var heightY=0, minHeightY=0;

      var separatorWidths = this._getSeparatorWidths();
      var spacingX=this.getSpacingX(), spacingY=this.getSpacingY();
      var spacingSumX=-spacingX, spacingSumY=-spacingY;

      if (separatorWidths.x) {
        spacingSumX -= separatorWidths.x + spacingX;
      }

      if (separatorWidths.y) {
        spacingSumY -= separatorWidths.y + spacingY;
      }

      // Detect children sizes
      for (var i=0; i<length; i++)
      {
        child = children[i];
        hint = child.getSizeHint();

        // Pre-cache margin sums
        marginX = child.getMarginLeft() + child.getMarginRight();
        marginY = child.getMarginTop() + child.getMarginBottom();

        // Ok, this part is a bit complicated :)
        switch(edges[i])
        {
          case 1:
          case 2:
            // Find the maximum width used by these fully stretched items
            // The recommended width used by these must add the currently
            // occupied width by the orthogonal ordered children.
            widthY = Math.max(widthY, hint.width + widthX + marginX);
            minWidthY = Math.max(minWidthY, hint.minWidth + minWidthX + marginX);

            // Add the needed heights of this widget
            heightY += hint.height + marginY;
            minHeightY += hint.minHeight + marginY;

            // Add spacing
            spacingSumY += spacingY;
            if (separatorWidths.y) {
              spacingSumY += separatorWidths.y + spacingY;
            }

            break;

          case 3:
          case 4:
            // Find the maximum height used by these fully stretched items
            // The recommended height used by these must add the currently
            // occupied height by the orthogonal ordered children.
            heightX = Math.max(heightX, hint.height + heightY + marginY);
            minHeightX = Math.max(minHeightX, hint.minHeight + minHeightY + marginY);

            // Add the needed widths of this widget
            widthX += hint.width + marginX;
            minWidthX += hint.minWidth + marginX;

            // Add spacing
            spacingSumX += spacingX;
            if (separatorWidths.x) {
              spacingSumX += separatorWidths.x + spacingX;
            }

            break;

          default:
            // A centered widget must be added to both sums as
            // it stretches into the remaining available space.
            widthX += hint.width + marginX;
            minWidthX += hint.minWidth + marginX;

            heightY += hint.height + marginY;
            minHeightY += hint.minHeight + marginY;

            // Add spacing
            spacingSumX += spacingX;
            if (separatorWidths.x) {
              spacingSumX += separatorWidths.x + spacingX;
            }

            spacingSumY += spacingY;
            if (separatorWidths.y) {
              spacingSumY += separatorWidths.y + spacingY;
            }
        }
      }

      var minWidth = Math.max(minWidthX, minWidthY) + spacingSumX;
      var width = Math.max(widthX, widthY) + spacingSumX;
      var minHeight = Math.max(minHeightX, minHeightY) + spacingSumY;
      var height = Math.max(heightX, heightY) + spacingSumY;

      // Return hint
      return {
        minWidth : minWidth,
        width : width,
        minHeight : minHeight,
        height : height
      };
    }
  },



  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this.__edges = this.__children = null;
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
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * A split panes divides an area into two panes. The ratio between the two
 * panes is configurable by the user using the splitter.
 *
 * @childControl slider {qx.ui.splitpane.Slider} shown during resizing the splitpane
 * @childControl splitter {qx.ui.splitpane.Splitter} splitter to resize the splitpane
 */
qx.Class.define("qx.ui.splitpane.Pane",
{
  extend : qx.ui.core.Widget,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Creates a new instance of a SplitPane. It allows the user to dynamically
   * resize the areas dropping the border between.
   *
   * @param orientation {String} The orientation of the split pane control.
   * Allowed values are "horizontal" (default) and "vertical".
   */
  construct : function(orientation)
  {
    this.base(arguments);

    this.__children = [];

    // Initialize orientation
    if (orientation) {
      this.setOrientation(orientation);
    } else {
      this.initOrientation();
    }

    // add all pointer listener to the blocker
    this.__blocker.addListener("pointerdown", this._onPointerDown, this);
    this.__blocker.addListener("pointerup", this._onPointerUp, this);
    this.__blocker.addListener("pointermove", this._onPointerMove, this);
    this.__blocker.addListener("pointerout", this._onPointerOut, this);
    this.__blocker.addListener("losecapture", this._onPointerUp, this);
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // overridden
    appearance :
    {
      refine : true,
      init : "splitpane"
    },

    /**
     * Distance between pointer and splitter when the cursor should change
     * and enable resizing.
     */
    offset :
    {
      check : "Integer",
      init : 6,
      apply : "_applyOffset"
    },

    /**
     * The orientation of the splitpane control.
     */
    orientation :
    {
      init  : "horizontal",
      check : [ "horizontal", "vertical" ],
      apply : "_applyOrientation"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    __splitterOffset : null,
    __activeDragSession : false,
    __lastPointerX : null,
    __lastPointerY : null,
    __isHorizontal : null,
    __beginSize : null,
    __endSize : null,
    __children : null,
    __blocker : null,


    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        // Create and add slider
        case "slider":
          control = new qx.ui.splitpane.Slider(this);
          control.exclude();
          this._add(control, {type : id});
          break;

        // Create splitter
        case "splitter":
          control = new qx.ui.splitpane.Splitter(this);
          this._add(control, {type : id});
          control.addListener("move", this.__onSplitterMove, this);
          break;
      }

      return control || this.base(arguments, id);
    },


    /**
     * Move handler for the splitter which takes care of the external
     * triggered resize of children.
     *
     * @param e {qx.event.type.Data} The data even of move.
     */
    __onSplitterMove : function(e) {
      this.__setBlockerPosition(e.getData());
    },


    /**
     * Creates a blocker for the splitter which takes all bouse events and
     * also handles the offset and cursor.
     *
     * @param orientation {String} The orientation of the pane.
     */
    __createBlocker : function(orientation) {
      this.__blocker = new qx.ui.splitpane.Blocker(orientation);
      this.getContentElement().add(this.__blocker);

      var splitter = this.getChildControl("splitter");
      var splitterWidth = splitter.getWidth();
      if (!splitterWidth) {
        splitter.addListenerOnce("appear", function() {
          this.__setBlockerPosition();
        }, this);
      }

      // resize listener to remove the blocker in case the splitter
      // is removed.
      splitter.addListener("resize", function(e) {
        var bounds = e.getData();
        if (this.getChildControl("splitter").getVisible() && (bounds.height == 0 || bounds.width == 0)) {
          this.__blocker.hide();
        } else {
          this.__blocker.show();
        }
      }, this);
    },


    /**
     * Returns the blocker used over the splitter. this could be used for
     * adding event listeners like tap or dbltap.
     *
     * @return {qx.ui.splitpane.Blocker} The used blocker element.
     *
     * @internal
     */
    getBlocker : function() {
      return this.__blocker;
    },



    /*
    ---------------------------------------------------------------------------
      PROPERTY APPLY METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Apply routine for the orientation property.
     *
     * Sets the pane's layout to vertical or horizontal split layout.
     *
     * @param value {String} The new value of the orientation property
     * @param old {String} The old value of the orientation property
     */
    _applyOrientation : function(value, old)
    {
      var slider = this.getChildControl("slider");
      var splitter = this.getChildControl("splitter");

      // Store boolean flag for faster access
      this.__isHorizontal = value === "horizontal";

      if (!this.__blocker) {
        this.__createBlocker(value);
      }

      // update the blocker
      this.__blocker.setOrientation(value);

      // Dispose old layout
      var oldLayout = this._getLayout();
      if (oldLayout) {
        oldLayout.dispose();
      }

      // Create new layout
      var newLayout = value === "vertical" ?
        new qx.ui.splitpane.VLayout : new qx.ui.splitpane.HLayout;
      this._setLayout(newLayout);

      // Update states for splitter and slider
      splitter.removeState(old);
      splitter.addState(value);
      splitter.getChildControl("knob").removeState(old);
      splitter.getChildControl("knob").addState(value);
      slider.removeState(old);
      slider.addState(value);

      // flush (needs to be done for the blocker update) and update the blocker
      qx.ui.core.queue.Manager.flush();
      this.__setBlockerPosition();
    },


    // property apply
    _applyOffset : function(value, old) {
      this.__setBlockerPosition();
    },

    /**
     * Helper for setting the blocker to the right position, which depends on
     * the offset, orientation and the current position of the splitter.
     *
     * @param bounds {Map?null} If the bounds of the splitter are known,
     *   they can be added.
     */
    __setBlockerPosition : function(bounds) {
      var splitter = this.getChildControl("splitter");
      var offset = this.getOffset();
      var splitterBounds = splitter.getBounds();
      var splitterElem = splitter.getContentElement().getDomElement();

      // do nothing if the splitter is not ready
      if (!splitterElem) {
        return;
      }

      // recalculate the dimensions of the blocker
      if (this.__isHorizontal) {
        // get the width either of the given bounds or of the read bounds
        var width = null;
        if (bounds) {
          width = bounds.width;
        } else if (splitterBounds) {
          width = splitterBounds.width;
        }
        var left = bounds && bounds.left;

        if (width || !this.getChildControl("splitter").getVisible()) {
          if (isNaN(left)) {
            left = qx.bom.element.Location.getPosition(splitterElem).left;
          }
          this.__blocker.setWidth(offset, width || 6);
          this.__blocker.setLeft(offset, left);
        }

      // vertical case
      } else {
        // get the height either of the given bounds or of the read bounds
        var height = null;
        if (bounds) {
          height = bounds.height;
        } else if (splitterBounds) {
          height = splitterBounds.height;
        }
        var top =  bounds && bounds.top;

        if (height || !this.getChildControl("splitter").getVisible()) {
          if (isNaN(top)) {
            top = qx.bom.element.Location.getPosition(splitterElem).top;
          }
          this.__blocker.setHeight(offset, height || 6);
          this.__blocker.setTop(offset, top);
        }
      }
    },


    /*
    ---------------------------------------------------------------------------
      PUBLIC METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Adds a widget to the pane.
     *
     * Sets the pane's layout to vertical or horizontal split layout. Depending on the
     * pane's layout the first widget will be the left or top widget, the second one
     * the bottom or right widget. Adding more than two widgets will overwrite the
     * existing ones.
     *
     * @param widget {qx.ui.core.Widget} The widget to be inserted into pane.
     * @param flex {Number} The (optional) layout property for the widget's flex value.
     */
    add : function(widget, flex)
    {
      if (flex == null) {
        this._add(widget);
      } else {
        this._add(widget, {flex : flex});
      }
      this.__children.push(widget);
    },


    /**
     * Removes the given widget from the pane.
     *
     * @param widget {qx.ui.core.Widget} The widget to be removed.
     */
    remove : function(widget)
    {
      this._remove(widget);
      qx.lang.Array.remove(this.__children, widget);
    },


    /**
     * Returns an array containing the pane's content.
     *
     * @return {qx.ui.core.Widget[]} The pane's child widgets
     */
    getChildren : function() {
      return this.__children;
    },


    /*
    ---------------------------------------------------------------------------
      POINTER LISTENERS
    ---------------------------------------------------------------------------
    */

    /**
     * Handler for pointerdown event.
     *
     * Shows slider widget and starts drag session if pointer is near/on splitter widget.
     *
     * @param e {qx.event.type.Pointer} pointerdown event
     */
    _onPointerDown : function(e)
    {
      // Only proceed if left pointer button is pressed and the splitter is active
      if (!e.isLeftPressed()) {
        return;
      }

      var splitter = this.getChildControl("splitter");

      // Store offset between pointer event coordinates and splitter
      var splitterLocation = splitter.getContentLocation();
      var paneLocation = this.getContentLocation();
      this.__splitterOffset = this.__isHorizontal ?
        e.getDocumentLeft() - splitterLocation.left + paneLocation.left :
        e.getDocumentTop() - splitterLocation.top + paneLocation.top ;

      // Synchronize slider to splitter size and show it
      var slider = this.getChildControl("slider");
      var splitterBounds = splitter.getBounds();
      slider.setUserBounds(
        splitterBounds.left, splitterBounds.top,
        splitterBounds.width || 6, splitterBounds.height || 6
      );

      slider.setZIndex(splitter.getZIndex() + 1);
      slider.show();

      // Enable session
      this.__activeDragSession = true;
      this.__blocker.capture();

      e.stop();
    },


    /**
     * Handler for pointermove event.
     *
     * @param e {qx.event.type.Pointer} pointermove event
     */
    _onPointerMove : function(e)
    {
      this._setLastPointerPosition(e.getDocumentLeft(), e.getDocumentTop());

      // Check if slider is already being dragged
      if (this.__activeDragSession)
      {
        // Compute new children sizes
        this.__computeSizes();

        // Update slider position
        var slider = this.getChildControl("slider");
        var pos = this.__beginSize;

        if(this.__isHorizontal) {
          slider.setDomLeft(pos);
          this.__blocker.setStyle("left", (pos - this.getOffset()) + "px");
        } else {
          slider.setDomTop(pos);
          this.__blocker.setStyle("top", (pos - this.getOffset()) + "px");
        }

        e.stop();
      }
    },


    /**
     * Handler for pointerout event
     *
     * @param e {qx.event.type.Pointer} pointerout event
     */
    _onPointerOut : function(e)
    {
      this._setLastPointerPosition(e.getDocumentLeft(), e.getDocumentTop());
    },


    /**
     * Handler for pointerup event
     *
     * Sets widget sizes if dragging session has been active.
     *
     * @param e {qx.event.type.Pointer} pointerup event
     */
    _onPointerUp : function(e)
    {
      if (!this.__activeDragSession) {
        return;
      }

      // Set sizes to both widgets
      this._finalizeSizes();

      // Hide the slider
      var slider = this.getChildControl("slider");
      slider.exclude();

      // Cleanup
      this.__activeDragSession = false;
      this.releaseCapture();

      e.stop();
    },


    /*
    ---------------------------------------------------------------------------
      INTERVAL HANDLING
    ---------------------------------------------------------------------------
    */

    /**
     * Updates widgets' sizes based on the slider position.
     */
    _finalizeSizes : function()
    {
      var beginSize = this.__beginSize;
      var endSize = this.__endSize;

      if (beginSize == null) {
        return;
      }

      var children = this._getChildren();
      var firstWidget = children[2];
      var secondWidget = children[3];

      // Read widgets' flex values
      var firstFlexValue = firstWidget.getLayoutProperties().flex;
      var secondFlexValue = secondWidget.getLayoutProperties().flex;

      // Both widgets have flex values
      if((firstFlexValue != 0) && (secondFlexValue != 0))
      {
        firstWidget.setLayoutProperties({ flex : beginSize });
        secondWidget.setLayoutProperties({ flex : endSize });
      }

      // Update both sizes
      else
      {
        // Set widths to static widgets
        if (this.__isHorizontal)
        {
          firstWidget.setWidth(beginSize);
          secondWidget.setWidth(endSize);
        }
        else
        {
          firstWidget.setHeight(beginSize);
          secondWidget.setHeight(endSize);
        }
      }
    },


    /**
     * Computes widgets' sizes based on the pointer coordinate.
     */
    __computeSizes : function()
    {
      if (this.__isHorizontal) {
        var min="minWidth", size="width", max="maxWidth", pointer=this.__lastPointerX;
      } else {
        var min="minHeight", size="height", max="maxHeight", pointer=this.__lastPointerY;
      }

      var children = this._getChildren();
      var beginHint = children[2].getSizeHint();
      var endHint = children[3].getSizeHint();

      // Area given to both widgets
      var allocatedSize = children[2].getBounds()[size] + children[3].getBounds()[size];

      // Calculate widget sizes
      var beginSize = pointer - this.__splitterOffset;
      var endSize = allocatedSize - beginSize;

      // Respect minimum limits
      if (beginSize < beginHint[min])
      {
        endSize -= beginHint[min] - beginSize;
        beginSize = beginHint[min];
      }
      else if (endSize < endHint[min])
      {
        beginSize -= endHint[min] - endSize;
        endSize = endHint[min];
      }

      // Respect maximum limits
      if (beginSize > beginHint[max])
      {
        endSize += beginSize - beginHint[max];
        beginSize = beginHint[max];
      }
      else if (endSize > endHint[max])
      {
        beginSize += endSize - endHint[max];
        endSize = endHint[max];
      }

      // Store sizes
      this.__beginSize = beginSize;
      this.__endSize = endSize;
    },


    /**
     * Determines whether this is an active drag session
     *
     * @return {Boolean} True if active drag session, otherwise false.
     */
    _isActiveDragSession : function() {
      return this.__activeDragSession;
    },


    /**
     * Sets the last pointer position.
     *
     * @param x {Integer} the x position of the pointer.
     * @param y {Integer} the y position of the pointer.
     */
     _setLastPointerPosition : function(x, y)
     {
       this.__lastPointerX = x;
       this.__lastPointerY = y;
     }
  },


  destruct : function() {
    this.__children = null;
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
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * The slider of the SplitPane (used during drag sessions for fast feedback)
 *
 * @internal
 */
qx.Class.define("qx.ui.splitpane.Slider",
{
  extend : qx.ui.core.Widget,



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // overridden
    allowShrinkX :
    {
      refine : true,
      init : false
    },

    // overridden
    allowShrinkY :
    {
      refine : true,
      init : false
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
     * Sebastian Werner (wpbasti)
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * The splitter is the element between the two panes.
 *
 * @internal
 *
 * @childControl knob {qx.ui.basic.Image} knob to resize the splitpane
 */
qx.Class.define("qx.ui.splitpane.Splitter",
{
  extend : qx.ui.core.Widget,



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param parentWidget {qx.ui.splitpane.Pane} The underlaying split pane.
   */
  construct : function(parentWidget)
  {
    this.base(arguments);

    // set layout
    if (parentWidget.getOrientation() == "vertical")
    {
      this._setLayout(new qx.ui.layout.HBox(0, "center"));
      this._getLayout().setAlignY("middle");
    }
    else
    {
      this._setLayout(new qx.ui.layout.VBox(0, "middle"));
      this._getLayout().setAlignX("center");
    }

    // create knob child control
    if (this.getVisible()) {
      this._createChildControl("knob");
    }
  },



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // overridden
    allowShrinkX :
    {
      refine : true,
      init : false
    },

    // overridden
    allowShrinkY :
    {
      refine : true,
      init : false
    },
    /**
     * The visibility of the splitter.
     * Allows to remove the splitter in favor of other visual separation means like background color differences.
     */
    visible :
    {
      init: true,
      check: "Boolean",
      themeable: true,
      apply: "_applyVisible"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        // Create splitter knob
        case "knob":
          control = new qx.ui.basic.Image;
          this._add(control);
          break;
      }

      return control || this.base(arguments, id);
    },

    _applyVisible: function(visible, old) {
      this.getChildControl("knob").setVisibility(visible ? "visible" : "excluded");
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2010 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/* ************************************************************************


************************************************************************ */
/**
 * A special blocker element for the splitpane which is based on
 * {@link qx.html.Element} and takes care of the positioning of the div.
 *
 * @internal
 * @asset(qx/static/blank.gif)
 */
qx.Class.define("qx.ui.splitpane.Blocker",
{
  extend : qx.html.Element,

  /**
   * @param orientation {String} The orientation of the split pane control.
   */
  construct : function(orientation)
  {
    var styles = {
      position: "absolute",
      zIndex: 11
    };

    // IE needs some extra love here to convince it to block events.
    if ((qx.core.Environment.get("engine.name") == "mshtml"))
    {
      styles.backgroundImage = "url(" + qx.util.ResourceManager.getInstance().toUri("qx/static/blank.gif") + ")";
      styles.backgroundRepeat = "repeat";
    }

    this.base(arguments, "div", styles);

    // Initialize orientation
    if (orientation) {
      this.setOrientation(orientation);
    } else {
      this.initOrientation();
    }
  },


  properties :
  {
    /**
     * The orientation of the blocker which should be the same as the
     * orientation of the splitpane.
     */
    orientation :
    {
      init  : "horizontal",
      check : [ "horizontal", "vertical" ],
      apply : "_applyOrientation"
    }
  },


  members :
  {

    // property apply
    _applyOrientation : function(value, old) {
      if (value == "horizontal") {
        this.setStyle("height", "100%");
        this.setStyle("cursor", "col-resize");
        this.setStyle("top", null);
      } else {
        this.setStyle("width", "100%");
        this.setStyle("left", null);
        this.setStyle("cursor", "row-resize");
      }
    },


    /**
     * Takes the two parameters and set the propper width of the blocker.
     *
     * @param offset {Number} The offset of the splitpane.
     * @param spliterSize {Number} The width of the splitter.
     */
    setWidth : function(offset, spliterSize) {
      var width = spliterSize + 2 * offset;
      this.setStyle("width", width + "px");
    },


    /**
     * Takes the two parameter and sets the propper height of the blocker.
     *
     * @param offset {Number} The offset of the splitpane.
     * @param spliterSize {Number} The height of the splitter.
     */
    setHeight : function(offset, spliterSize) {
      var height = spliterSize + 2 * offset;
      this.setStyle("height", height + "px");
    },


    /**
     * Takes the two parameter and sets the propper left position of
     * the blocker.
     *
     * @param offset {Number} The offset of the splitpane.
     * @param splitterLeft {Number} The left position of the splitter.
     */
    setLeft : function(offset, splitterLeft) {
      var left = splitterLeft - offset;
      this.setStyle("left", left + "px");
    },


    /**
     * Takes the two parameter and sets the propper top position of
     * the blocker.
     *
     * @param offset {Number} The offset of the splitpane.
     * @param splitterTop {Number} The top position of the splitter.
     */
    setTop : function(offset, splitterTop) {
      var top = splitterTop - offset;
      this.setStyle("top", top + "px");
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
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * Layouter for vertical split panes.
 *
 * @internal
 */
qx.Class.define("qx.ui.splitpane.VLayout",
{
  extend : qx.ui.layout.Abstract,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
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
        this.assert(name === "type" || name === "flex", "The property '"+name+"' is not supported by the split layout!");

        if (name == "flex") {
          this.assertNumber(value);
        }

        if (name == "type") {
          this.assertString(value);
        }
      },

      "false" : null
    }),


    // overridden
    renderLayout : function(availWidth, availHeight, padding)
    {
      var children = this._getLayoutChildren();
      var length = children.length;
      var child, type;
      var begin, splitter, slider, end;
      var paddingLeft = padding.left || 0;
      var paddingTop = padding.top || 0;

      for (var i=0; i<length; i++)
      {
        child = children[i];
        type = child.getLayoutProperties().type;

        if (type === "splitter") {
          splitter = child;
        } else if (type === "slider") {
          slider = child;
        } else if (!begin) {
          begin = child;
        } else {
          end = child;
        }
      }

      if (begin && end)
      {
        var beginFlex = begin.getLayoutProperties().flex;
        var endFlex = end.getLayoutProperties().flex;

        if (beginFlex == null) {
          beginFlex = 1;
        }

        if (endFlex == null) {
          endFlex = 1;
        }

        var beginHint = begin.getSizeHint();
        var splitterHint = splitter.getSizeHint();
        var endHint = end.getSizeHint();

        var beginHeight = beginHint.height;
        var splitterHeight = splitterHint.height;
        var endHeight = endHint.height;

        if (beginFlex > 0 && endFlex > 0)
        {
          var flexSum = beginFlex + endFlex;
          var flexAvailable = availHeight - splitterHeight;

          var beginHeight = Math.round((flexAvailable / flexSum) * beginFlex);
          var endHeight = flexAvailable - beginHeight;

          var sizes = qx.ui.layout.Util.arrangeIdeals(beginHint.minHeight, beginHeight, beginHint.maxHeight,
            endHint.minHeight, endHeight, endHint.maxHeight);

          beginHeight = sizes.begin;
          endHeight = sizes.end;
        }
        else if (beginFlex > 0)
        {
          beginHeight = availHeight - splitterHeight - endHeight;
          if (beginHeight < beginHint.minHeight) {
            beginHeight = beginHint.minHeight;
          }

          if (beginHeight > beginHint.maxHeight) {
            beginHeight = beginHint.maxHeight;
          }
        }
        else if (endFlex > 0)
        {
          endHeight = availHeight - beginHeight - splitterHeight;
          if (endHeight < endHint.minHeight) {
            endHeight = endHint.minHeight;
          }

          if (endHeight > endHint.maxHeight) {
            endHeight = endHint.maxHeight;
          }
        }

        begin.renderLayout(paddingLeft, paddingTop, availWidth, beginHeight);
        splitter.renderLayout(paddingLeft, beginHeight + paddingTop, availWidth, splitterHeight);
        end.renderLayout(paddingLeft, beginHeight+splitterHeight + paddingTop, availWidth, endHeight);
      }
      else
      {
        // Hide the splitter completely
        splitter.renderLayout(0, 0, 0, 0);

        // Render one child
        if (begin) {
          begin.renderLayout(paddingLeft, paddingTop, availWidth, availHeight);
        } else if (end) {
          end.renderLayout(paddingLeft, paddingTop, availWidth, availHeight);
        }
      }
    },


    // overridden
    _computeSizeHint : function()
    {
      var children = this._getLayoutChildren();
      var length = children.length;
      var child, hint, props;
      var minHeight=0, height=0, maxHeight=0;
      var minWidth=0, width=0, maxWidth=0;

      for (var i=0; i<length; i++)
      {
        child = children[i];
        props = child.getLayoutProperties();

        // The slider is not relevant for auto sizing
        if (props.type === "slider") {
          continue;
        }

        hint = child.getSizeHint();

        minHeight += hint.minHeight;
        height += hint.height;
        maxHeight += hint.maxHeight;

        if (hint.minWidth > minWidth) {
          minWidth = hint.minWidth;
        }

        if (hint.width > width) {
          width = hint.width;
        }

        if (hint.maxWidth > maxWidth) {
          maxWidth = hint.maxWidth;
        }
      }

      return {
        minHeight : minHeight,
        height : height,
        maxHeight : maxHeight,
        minWidth : minWidth,
        width : width,
        maxWidth : maxWidth
      };
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
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * Layouter for horizontal split panes.
 *
 * @internal
 */
qx.Class.define("qx.ui.splitpane.HLayout",
{
  extend : qx.ui.layout.Abstract,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
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
        this.assert(name === "type" || name === "flex", "The property '"+name+"' is not supported by the split layout!");

        if (name == "flex") {
          this.assertNumber(value);
        }

        if (name == "type") {
          this.assertString(value);
        }
      },

      "false" : null
    }),


    // overridden
    renderLayout : function(availWidth, availHeight, padding)
    {
      var children = this._getLayoutChildren();
      var length = children.length;
      var child, type;
      var begin, splitter, slider, end;
      var paddingLeft = padding.left || 0;
      var paddingTop = padding.top || 0;

      for (var i=0; i<length; i++)
      {
        child = children[i];
        type = child.getLayoutProperties().type;

        if (type === "splitter") {
          splitter = child;
        } else if (type === "slider") {
          slider = child;
        } else if (!begin) {
          begin = child;
        } else {
          end = child;
        }
      }

      if (begin && end)
      {
        var beginFlex = begin.getLayoutProperties().flex;
        var endFlex = end.getLayoutProperties().flex;

        if (beginFlex == null) {
          beginFlex = 1;
        }

        if (endFlex == null) {
          endFlex = 1;
        }

        var beginHint = begin.getSizeHint();
        var splitterHint = splitter.getSizeHint();
        var endHint = end.getSizeHint();

        var beginWidth = beginHint.width;
        var splitterWidth = splitterHint.width;
        var endWidth = endHint.width;

        if (beginFlex > 0 && endFlex > 0)
        {
          var flexSum = beginFlex + endFlex;
          var flexAvailable = availWidth - splitterWidth;

          var beginWidth = Math.round((flexAvailable / flexSum) * beginFlex);
          var endWidth = flexAvailable - beginWidth;

          var sizes = qx.ui.layout.Util.arrangeIdeals(beginHint.minWidth, beginWidth, beginHint.maxWidth,
            endHint.minWidth, endWidth, endHint.maxWidth);

          beginWidth = sizes.begin;
          endWidth = sizes.end;
        }
        else if (beginFlex > 0)
        {
          beginWidth = availWidth - splitterWidth - endWidth;
          if (beginWidth < beginHint.minWidth) {
            beginWidth = beginHint.minWidth;
          }

          if (beginWidth > beginHint.maxWidth) {
            beginWidth = beginHint.maxWidth;
          }
        }
        else if (endFlex > 0)
        {
          endWidth = availWidth - beginWidth - splitterWidth;
          if (endWidth < endHint.minWidth) {
            endWidth = endHint.minWidth;
          }

          if (endWidth > endHint.maxWidth) {
            endWidth = endHint.maxWidth;
          }
        }

        begin.renderLayout(paddingLeft, paddingTop, beginWidth, availHeight);
        splitter.renderLayout(beginWidth + paddingLeft, paddingTop, splitterWidth, availHeight);
        end.renderLayout(beginWidth+splitterWidth + paddingLeft, paddingTop, endWidth, availHeight);
      }
      else
      {
        // Hide the splitter completely
        splitter.renderLayout(0, 0, 0, 0);

        // Render one child
        if (begin) {
          begin.renderLayout(paddingLeft, paddingTop, availWidth, availHeight);
        } else if (end) {
          end.renderLayout(paddingLeft, paddingTop, availWidth, availHeight);
        }
      }
    },


    // overridden
    _computeSizeHint : function()
    {
      var children = this._getLayoutChildren();
      var length = children.length;
      var child, hint, props;
      var minWidth=0, width=0, maxWidth=0;
      var minHeight=0, height=0, maxHeight=0;

      for (var i=0; i<length; i++)
      {
        child = children[i];
        props = child.getLayoutProperties();

        // The slider is not relevant for auto sizing
        if (props.type === "slider") {
          continue;
        }

        hint = child.getSizeHint();

        minWidth += hint.minWidth;
        width += hint.width;
        maxWidth += hint.maxWidth;

        if (hint.minHeight > minHeight) {
          minHeight = hint.minHeight;
        }

        if (hint.height > height) {
          height = hint.height;
        }

        if (hint.maxHeight > maxHeight) {
          maxHeight = hint.maxHeight;
        }
      }

      return {
        minWidth : minWidth,
        width : width,
        maxWidth : maxWidth,
        minHeight : minHeight,
        height : height,
        maxHeight : maxHeight
      };
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
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)
     * Christian Hagendorn (chris_schmidt)
     * Adrian Olaru (adrianolaru)

************************************************************************ */

/**
 * The stack container puts its child widgets on top of each other and only the
 * topmost widget is visible.
 *
 * This is used e.g. in the tab view widget. Which widget is visible can be
 * controlled by using the {@link #getSelection} method.
 *
 * *Example*
 *
 * Here is a little example of how to use the widget.
 *
 * <pre class='javascript'>
 *   // create stack container
 *   var stack = new qx.ui.container.Stack();
 *
 *   // add some children
 *   stack.add(new qx.ui.core.Widget().set({
 *    backgroundColor: "red"
 *   }));
 *   stack.add(new qx.ui.core.Widget().set({
 *    backgroundColor: "green"
 *   }));
 *   stack.add(new qx.ui.core.Widget().set({
 *    backgroundColor: "blue"
 *   }));
 *
 *   // select green widget
 *   stack.setSelection([stack.getChildren()[1]]);
 *
 *   this.getRoot().add(stack);
 * </pre>
 *
 * This example creates an stack with three children. Only the selected "green"
 * widget is visible.
 *
 * *External Documentation*
 *
 * <a href='http://manual.qooxdoo.org/${qxversion}/pages/widget/stack.html' target='_blank'>
 * Documentation of this widget in the qooxdoo manual.</a>
 */
qx.Class.define("qx.ui.container.Stack",
{
  extend : qx.ui.core.Widget,
  implement : [
    qx.ui.form.IField,
    qx.ui.core.ISingleSelection
  ],
  include : [
    qx.ui.core.MSingleSelectionHandling,
    qx.ui.core.MChildrenHandling
  ],


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */


  construct : function()
  {
    this.base(arguments);

    this._setLayout(new qx.ui.layout.Grow);

    this.addListener("changeSelection", this.__onChangeSelection, this);
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * Whether the size of the widget depends on the selected child. When
     * disabled (default) the size is configured to the largest child.
     */
    dynamic :
    {
      check : "Boolean",
      init : false,
      apply : "_applyDynamic"
    }
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */


  members :
  {
    // property apply
    _applyDynamic : function(value)
    {
      var children = this._getChildren();
      var selected = this.getSelection()[0];
      var child;

      for (var i=0, l=children.length; i<l; i++)
      {
        child = children[i];

        if (child != selected)
        {
          if (value) {
            children[i].exclude();
          } else {
            children[i].hide();
          }
        }
      }
    },


    /*
    ---------------------------------------------------------------------------
      HELPER METHODS FOR SELECTION API
    ---------------------------------------------------------------------------
    */


    /**
     * Returns the widget for the selection.
     * @return {qx.ui.core.Widget[]} Widgets to select.
     */
    _getItems : function() {
      return this.getChildren();
    },

    /**
     * Returns if the selection could be empty or not.
     *
     * @return {Boolean} <code>true</code> If selection could be empty,
     *    <code>false</code> otherwise.
     */
    _isAllowEmptySelection : function() {
      return true;
    },

    /**
     * Returns whether the given item is selectable.
     *
     * @param item {qx.ui.core.Widget} The item to be checked
     * @return {Boolean} Whether the given item is selectable
     */
    _isItemSelectable : function(item) {
      return true;
    },

    /**
     * Event handler for <code>changeSelection</code>.
     *
     * Shows the new selected widget and hide the old one.
     *
     * @param e {qx.event.type.Data} Data event.
     */
    __onChangeSelection : function(e)
    {
      var old = e.getOldData()[0];
      var value = e.getData()[0];

      if (old)
      {
        if (this.isDynamic()) {
          old.exclude();
        } else {
          old.hide();
        }
      }

      if (value) {
        value.show();
      }
    },


    //overridden
    _afterAddChild : function(child) {
      var selected = this.getSelection()[0];

      if (!selected) {
        this.setSelection([child]);
      } else if (selected !== child) {
        if (this.isDynamic()) {
          child.exclude();
        } else {
          child.hide();
        }
      }
    },


    //overridden
    _afterRemoveChild : function(child) {
      if (this.getSelection()[0] === child) {
        var first = this._getChildren()[0];

        if (first) {
          this.setSelection([first]);
        } else {
          this.resetSelection();
        }
      }
    },


    /*
    ---------------------------------------------------------------------------
      PUBLIC API
    ---------------------------------------------------------------------------
    */

    /**
     * Go to the previous child in the children list.
     */
    previous : function()
    {
      var selected = this.getSelection()[0];
      var go = this._indexOf(selected)-1;
      var children = this._getChildren();

      if (go < 0) {
        go = children.length - 1;
      }

      var prev = children[go];
      this.setSelection([prev]);
    },

    /**
     * Go to the next child in the children list.
     */
    next : function()
    {
      var selected = this.getSelection()[0];
      var go = this._indexOf(selected)+1;
      var children = this._getChildren();

      var next = children[go] || children[0];

      this.setSelection([next]);
    }
  }
});
