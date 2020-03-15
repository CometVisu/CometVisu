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
 * EXPERIMENTAL!
 *
 * The Scroller wraps a {@link Pane} and provides scroll bars to interactively
 * scroll the pane's content.
 *
 * @childControl pane {qx.ui.virtual.core.Pane} Virtual pane.
 */
qx.Class.define("qx.ui.virtual.core.Scroller",
{
  extend : qx.ui.core.scroll.AbstractScrollArea,


  /**
   * @param rowCount {Integer?0} The number of rows of the virtual grid.
   * @param columnCount {Integer?0} The number of columns of the virtual grid.
   * @param cellHeight {Integer?10} The default cell height.
   * @param cellWidth {Integer?10} The default cell width.
   */
  construct : function(rowCount, columnCount, cellHeight, cellWidth)
  {
    this.base(arguments);

    this.__pane = new qx.ui.virtual.core.Pane(rowCount, columnCount, cellHeight, cellWidth);
    this.__pane.addListener("update", this._computeScrollbars, this);
    this.__pane.addListener("scrollX", this._onScrollPaneX, this);
    this.__pane.addListener("scrollY", this._onScrollPaneY, this);

    if (qx.core.Environment.get("os.scrollBarOverlayed")) {
      this._add(this.__pane, {edge: 0});
    } else {
      this._add(this.__pane, {row: 0, column: 0});
    }
  },


  members :
  {
    /** @type {qx.ui.virtual.core.Pane} Virtual pane. */
    __pane : null,


    /*
    ---------------------------------------------------------------------------
      ACCESSOR METHODS
    ---------------------------------------------------------------------------
    */


    /**
     * Get the scroller's virtual pane.
     *
     * @return {qx.ui.virtual.core.Pane} The scroller's pane.
     */
    getPane : function() {
      return this.__pane;
    },


    /*
    ---------------------------------------------------------------------------
      CHILD CONTROL SUPPORT
    ---------------------------------------------------------------------------
    */


    // overridden
    _createChildControlImpl : function(id, hash)
    {
      if (id === "pane") {
        return this.__pane;
      } else {
        return this.base(arguments, id);
      }
    },


    /*
    ---------------------------------------------------------------------------
      ITEM LOCATION SUPPORT
    ---------------------------------------------------------------------------
    */


    /**
     * NOT IMPLEMENTED
     *
     * @param item {qx.ui.core.Widget} Item to query.
     * @return {Integer} Top offset.
     * @abstract
     */
    getItemTop : function(item)
    {
      throw new Error("The method 'getItemTop' is not implemented!");
    },


    /**
     * NOT IMPLEMENTED
     *
     * @param item {qx.ui.core.Widget} Item to query.
     * @return {Integer} Top offset.
     * @abstract
     */
    getItemBottom : function(item)
    {
      throw new Error("The method 'getItemBottom' is not implemented!");
    },


    /**
     * NOT IMPLEMENTED
     *
     * @param item {qx.ui.core.Widget} Item to query.
     * @return {Integer} Top offset.
     * @abstract
     */
    getItemLeft : function(item)
    {
      throw new Error("The method 'getItemLeft' is not implemented!");
    },


    /**
     * NOT IMPLEMENTED
     *
     * @param item {qx.ui.core.Widget} Item to query.
     * @return {Integer} Right offset.
     * @abstract
     */
    getItemRight : function(item)
    {
      throw new Error("The method 'getItemRight' is not implemented!");
    },


    /*
    ---------------------------------------------------------------------------
      EVENT LISTENERS
    ---------------------------------------------------------------------------
    */


    // overridden
    _onScrollBarX : function(e) {
      this.__pane.setScrollX(e.getData());
    },


    // overridden
    _onScrollBarY : function(e) {
      this.__pane.setScrollY(e.getData());
    }
  },


  destruct : function()
  {
    this.__pane.dispose();
    this.__pane = null;
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
     * Fabian Jakobs (fjakobs)
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * EXPERIMENTAL!
 *
 * The Pane provides a window of a larger virtual grid.
 *
 * The actual rendering is performed by one or several layers ({@link ILayer}.
 * The pane computes, which cells of the virtual area is visible and instructs
 * the layers to render these cells.
 */
qx.Class.define("qx.ui.virtual.core.Pane",
{
  extend : qx.ui.core.Widget,


  /**
   * @param rowCount {Integer?0} The number of rows of the virtual grid.
   * @param columnCount {Integer?0} The number of columns of the virtual grid.
   * @param cellHeight {Integer?10} The default cell height.
   * @param cellWidth {Integer?10} The default cell width.
   */
  construct : function(rowCount, columnCount, cellHeight, cellWidth)
  {
    this.base(arguments);

    this.__rowConfig = new qx.ui.virtual.core.Axis(cellHeight, rowCount);
    this.__columnConfig = new qx.ui.virtual.core.Axis(cellWidth, columnCount);

    this.__scrollTop = 0;
    this.__scrollLeft = 0;


    this.__paneHeight = 0;
    this.__paneWidth = 0;

    this.__layerWindow = {};
    this.__jobs = {};

    // create layer container. The container does not have a layout manager
    // layers are positioned using "setUserBounds"
    this.__layerContainer = new qx.ui.container.Composite();
    this.__layerContainer.setUserBounds(0, 0, 0, 0);
    this._add(this.__layerContainer);

    this.__layers = [];

    this.__rowConfig.addListener("change", this.fullUpdate, this);
    this.__columnConfig.addListener("change", this.fullUpdate, this);

    this.addListener("resize", this._onResize, this);
    this.addListenerOnce("appear", this._onAppear, this);

    this.addListener("pointerdown", this._onPointerDown, this);
    this.addListener("tap", this._onTap, this);
    this.addListener("dbltap", this._onDbltap, this);
    this.addListener("contextmenu", this._onContextmenu, this);
  },


  events :
  {
    /** Fired if a cell is tapped. */
    cellTap : "qx.ui.virtual.core.CellEvent",

    /** Fired if a cell is right-clicked. */
    cellContextmenu : "qx.ui.virtual.core.CellEvent",

    /** Fired if a cell is double-tapped. */
    cellDbltap : "qx.ui.virtual.core.CellEvent",

    /** Fired on resize of either the container or the (virtual) content. */
    update : "qx.event.type.Event",

    /** Fired if the pane is scrolled horizontally. */
    scrollX : "qx.event.type.Data",

    /** Fired if the pane is scrolled vertically. */
    scrollY : "qx.event.type.Data"
  },


  properties :
  {
    // overridden
    width :
    {
      refine : true,
      init : 400
    },


    // overridden
    height :
    {
      refine : true,
      init : 300
    }
  },


  members :
  {
    __rowConfig : null,
    __columnConfig : null,
    __scrollTop : null,
    __scrollLeft : null,
    __paneHeight : null,
    __paneWidth : null,
    __layerWindow : null,
    __jobs : null,
    __layerContainer : null,
    __layers : null,
    __dontFireUpdate : null,
    __columnSizes : null,
    __rowSizes : null,
    __pointerDownCoords : null,


    /*
    ---------------------------------------------------------------------------
      ACCESSOR METHODS
    ---------------------------------------------------------------------------
    */


    /**
     * Get the axis object, which defines the row numbers and the row sizes.
     *
     * @return {qx.ui.virtual.core.Axis} The row configuration.
     */
    getRowConfig : function() {
      return this.__rowConfig;
    },


    /**
     * Get the axis object, which defines the column numbers and the column sizes.
     *
     * @return {qx.ui.virtual.core.Axis} The column configuration.
     */
    getColumnConfig : function() {
      return this.__columnConfig;
    },


    /*
    ---------------------------------------------------------------------------
      LAYER MANAGEMENT
    ---------------------------------------------------------------------------
    */


    /**
     * Returns an array containing the layer container.
     *
     * @return {Object[]} The layer container array.
     */
    getChildren : function() {
      return [this.__layerContainer];
    },


    /**
     * Add a layer to the layer container.
     *
     * @param layer {qx.ui.virtual.core.ILayer} The layer to add.
     */
    addLayer : function(layer)
    {
      if (qx.core.Environment.get("qx.debug")) {
        this.assertInterface(layer, qx.ui.virtual.core.ILayer);
      }

      this.__layers.push(layer);
      layer.setUserBounds(0, 0, 0, 0);
      this.__layerContainer.add(layer);
    },


    /**
     * Get a list of all layers.
     *
     * @return {qx.ui.virtual.core.ILayer[]} List of the pane's layers.
     */
    getLayers : function() {
      return this.__layers;
    },


    /**
     * Get a list of all visible layers.
     *
     * @return {qx.ui.virtual.core.ILayer[]} List of the pane's visible layers.
     */
    getVisibleLayers : function()
    {
      var layers = [];
      for (var i=0; i<this.__layers.length; i++)
      {
        var layer = this.__layers[i];
        if (layer.isVisible()) {
          layers.push(layer);
        }
      }
      return layers;
    },


    /*
    ---------------------------------------------------------------------------
      SCROLL SUPPORT
    ---------------------------------------------------------------------------
    */


    /**
     * The maximum horizontal scroll position.
     *
     * @return {Integer} Maximum horizontal scroll position.
     */
    getScrollMaxX : function()
    {
      var paneSize = this.getInnerSize();

      if (paneSize) {
        return Math.max(0, this.__columnConfig.getTotalSize() - paneSize.width);
      }

      return 0;
    },


    /**
     * The maximum vertical scroll position.
     *
     * @return {Integer} Maximum vertical scroll position.
     */
    getScrollMaxY : function()
    {
      var paneSize = this.getInnerSize();

      if (paneSize) {
        return Math.max(0, this.__rowConfig.getTotalSize() - paneSize.height);
      }

      return 0;
    },


    /**
     * Scrolls the content to the given left coordinate.
     *
     * @param value {Integer} The vertical position to scroll to.
     */
    setScrollY : function(value)
    {
      var max = this.getScrollMaxY();

      if (value < 0) {
        value = 0;
      } else if (value > max) {
        value = max;
      }

      if (this.__scrollTop !== value)
      {
        var old = this.__scrollTop;
        this.__scrollTop = value;
        this._deferredUpdateScrollPosition();
        this.fireDataEvent("scrollY", value, old);
      }
    },


    /**
     * Returns the vertical scroll offset.
     *
     * @return {Integer} The vertical scroll offset.
     */
    getScrollY : function() {
      return this.__scrollTop;
    },


    /**
     * Scrolls the content to the given top coordinate.
     *
     * @param value {Integer} The horizontal position to scroll to.
     */
    setScrollX : function(value)
    {
      var max = this.getScrollMaxX();

      if (value < 0) {
        value = 0;
      } else if (value > max) {
        value = max;
      }

      if (value !== this.__scrollLeft)
      {
        var old = this.__scrollLeft;
        this.__scrollLeft = value;
        this._deferredUpdateScrollPosition();

        this.fireDataEvent("scrollX", value, old);
      }
    },


    /**
     * Returns the horizontal scroll offset.
     *
     * @return {Integer} The horizontal scroll offset.
     */
    getScrollX : function() {
      return this.__scrollLeft;
    },


    /**
     * The (virtual) size of the content.
     *
     * @return {Map} Size of the content (keys: <code>width</code> and
     *     <code>height</code>).
     */
    getScrollSize : function()
    {
      return {
        width: this.__columnConfig.getTotalSize(),
        height: this.__rowConfig.getTotalSize()
      };
    },


    /*
    ---------------------------------------------------------------------------
      SCROLL INTO VIEW SUPPORT
    ---------------------------------------------------------------------------
    */


    /**
     * Scrolls a row into the visible area of the pane.
     *
     * @param row {Integer} The row's index.
     */
    scrollRowIntoView : function(row)
    {
      var bounds = this.getBounds();
      if (!bounds)
      {
        this.addListenerOnce("appear", function()
        {
          // It's important that the registered events are first dispatched.
          qx.event.Timer.once(function() {
            this.scrollRowIntoView(row);
          }, this, 0);
        }, this);
        return;
      }

      var itemTop = this.__rowConfig.getItemPosition(row);
      var itemBottom = itemTop + this.__rowConfig.getItemSize(row);
      var scrollTop = this.getScrollY();

      if (itemTop < scrollTop) {
        this.setScrollY(itemTop);
      } else if (itemBottom > scrollTop + bounds.height) {
        this.setScrollY(itemBottom - bounds.height);
      }
    },


    /**
     * Scrolls a column into the visible area of the pane.
     *
     * @param column {Integer} The column's index.
     */
    scrollColumnIntoView : function(column)
    {
      var bounds = this.getBounds();
      if (!bounds)
      {
        this.addListenerOnce("appear", function()
        {
          // It's important that the registered events are first dispatched.
          qx.event.Timer.once(function() {
            this.scrollColumnIntoView(column);
          }, this, 0);
        }, this);
        return;
      }

      var itemLeft = this.__columnConfig.getItemPosition(column);
      var itemRight = itemLeft + this.__columnConfig.getItemSize(column);
      var scrollLeft = this.getScrollX();

      if (itemLeft < scrollLeft) {
        this.setScrollX(itemLeft);
      } else if (itemRight > scrollLeft + bounds.width) {
        this.setScrollX(itemRight - bounds.width);
      }
    },


    /**
     * Scrolls a grid cell into the visible area of the pane.
     *
     * @param row {Integer} The cell's row index.
     * @param column {Integer} The cell's column index.
     */
    scrollCellIntoView : function(column, row)
    {
      var bounds = this.getBounds();
      if (!bounds)
      {
        this.addListenerOnce("appear", function()
        {
          // It's important that the registered events are first dispatched.
          qx.event.Timer.once(function() {
            this.scrollCellIntoView(column, row);
          }, this, 0);
        }, this);
        return;
      }

      this.scrollColumnIntoView(column);
      this.scrollRowIntoView(row);
    },


    /*
    ---------------------------------------------------------------------------
      CELL SUPPORT
    ---------------------------------------------------------------------------
    */


    /**
     * Get the grid cell at the given absolute document coordinates. This method
     * can be used to convert the pointer position returned by
     * {@link qx.event.type.Pointer#getDocumentLeft} and
     * {@link qx.event.type.Pointer#getDocumentLeft} into cell coordinates.
     *
     * @param documentX {Integer} The x coordinate relative to the viewport
     *    origin.
     * @param documentY {Integer} The y coordinate relative to the viewport
     *    origin.
     * @return {Map|null} A map containing the <code>row</code> and <code>column</code>
     *    of the found cell. If the coordinate is outside of the pane's bounds
     *    or there is no cell at the coordinate <code>null</code> is returned.
     */
    getCellAtPosition: function(documentX, documentY)
    {
      var rowData, columnData;
      var paneLocation = this.getContentLocation();

      if (
        !paneLocation ||
        documentY < paneLocation.top ||
        documentY >= paneLocation.bottom ||
        documentX < paneLocation.left ||
        documentX >= paneLocation.right
      ) {
        return null;
      }

      rowData = this.__rowConfig.getItemAtPosition(
        this.getScrollY() + documentY - paneLocation.top
      );

      columnData = this.__columnConfig.getItemAtPosition(
        this.getScrollX() + documentX - paneLocation.left
      );

      if (!rowData || !columnData) {
        return null;
      }

      return {
        row : rowData.index,
        column : columnData.index
      };
    },


    /*
    ---------------------------------------------------------------------------
      PREFETCH SUPPORT
    ---------------------------------------------------------------------------
    */


    /**
     * Increase the layers width beyond the needed width to improve
     * horizontal scrolling. The layers are only resized if invisible parts
     * left/right of the pane window are smaller than minLeft/minRight.
     *
     * @param minLeft {Integer} Only prefetch if the invisible part left of the
     *    pane window if smaller than this (pixel) value.
     * @param maxLeft {Integer} The amount of pixel the layers should reach
     *    left of the pane window.
     * @param minRight {Integer} Only prefetch if the invisible part right of the
     *    pane window if smaller than this (pixel) value.
     * @param maxRight {Integer} The amount of pixel the layers should reach
     *    right of the pane window.
     */
    prefetchX : function(minLeft, maxLeft, minRight, maxRight)
    {
      var layers = this.getVisibleLayers();
      if (layers.length == 0) {
        return;
      }

      var bounds = this.getBounds();
      if (!bounds) {
        return;
      }

      var paneRight = this.__scrollLeft + bounds.width;
      var rightAvailable = this.__paneWidth - paneRight;
      if (
        this.__scrollLeft - this.__layerWindow.left  < Math.min(this.__scrollLeft, minLeft) ||
        this.__layerWindow.right - paneRight < Math.min(rightAvailable, minRight)
      )
      {
        var left = Math.min(this.__scrollLeft, maxLeft);
        var right = Math.min(rightAvailable, maxRight);
        this._setLayerWindow(
          layers,
          this.__scrollLeft - left,
          this.__scrollTop,
          bounds.width + left + right,
          bounds.height,
          false
        );
      }
    },


    /**
     * Increase the layers height beyond the needed height to improve
     * vertical scrolling. The layers are only resized if invisible parts
     * above/below the pane window are smaller than minAbove/minBelow.
     *
     * @param minAbove {Integer} Only prefetch if the invisible part above the
     *    pane window if smaller than this (pixel) value.
     * @param maxAbove {Integer} The amount of pixel the layers should reach
     *    above the pane window.
     * @param minBelow {Integer} Only prefetch if the invisible part below the
     *    pane window if smaller than this (pixel) value.
     * @param maxBelow {Integer} The amount of pixel the layers should reach
     *    below the pane window.
     */
    prefetchY : function(minAbove, maxAbove, minBelow, maxBelow)
    {
      var layers = this.getVisibleLayers();
      if (layers.length == 0) {
        return;
      }

      var bounds = this.getBounds();
      if (!bounds) {
        return;
      }

      var paneBottom = this.__scrollTop + bounds.height;
      var belowAvailable = this.__paneHeight - paneBottom;
      if (
        this.__scrollTop - this.__layerWindow.top  < Math.min(this.__scrollTop, minAbove) ||
        this.__layerWindow.bottom - paneBottom < Math.min(belowAvailable, minBelow)
      )
      {
        var above = Math.min(this.__scrollTop, maxAbove);
        var below = Math.min(belowAvailable, maxBelow);
        this._setLayerWindow(
          layers,
          this.__scrollLeft,
          this.__scrollTop - above,
          bounds.width,
          bounds.height + above + below,
          false
        );
      }
    },


    /*
    ---------------------------------------------------------------------------
      EVENT LISTENER
    ---------------------------------------------------------------------------
    */


    /**
     * Resize event handler.
     *
     * Updates the visible window.
     */
    _onResize : function()
    {
      if (this.getContentElement().getDomElement())
      {
        this.__dontFireUpdate = true;
        this._updateScrollPosition();
        this.__dontFireUpdate = null;
        this.fireEvent("update");
      }
    },


    /**
     * Resize event handler. Do a full update on first appear.
     */
    _onAppear : function() {
      this.fullUpdate();
    },

    /**
     * Event listener for pointer down. Remembers cell position to prevent pointer event when cell position change.
     *
     * @param e {qx.event.type.Pointer} The incoming pointer event.
     */
    _onPointerDown : function(e) {
      this.__pointerDownCoords = this.getCellAtPosition(e.getDocumentLeft(), e.getDocumentTop());
    },

    /**
     * Event listener for pointer taps. Fires an cellTap event.
     *
     * @param e {qx.event.type.Pointer} The incoming pointer event.
     */
    _onTap : function(e) {
      this.__handlePointerCellEvent(e, "cellTap");
    },


    /**
     * Event listener for context menu taps. Fires an cellContextmenu event.
     *
     * @param e {qx.event.type.Pointer} The incoming pointer event.
     */
    _onContextmenu : function(e) {
      this.__handlePointerCellEvent(e, "cellContextmenu");
    },


    /**
     * Event listener for double taps. Fires an cellDbltap event.
     *
     * @param e {qx.event.type.Pointer} The incoming pointer event.
     */
    _onDbltap : function(e) {
       this.__handlePointerCellEvent(e, "cellDbltap");
    },

    /**
     * Fixed scrollbar position whenever it is out of range
     * it can happen when removing an item from the list reducing
     * the max value for scrollY #8976
     */
    _checkScrollBounds: function() {
      var maxx = this.getScrollMaxX();
      var maxy = this.getScrollMaxY();
      if (this.__scrollLeft < 0) {
        this.__scrollLeft = 0;
      }
      else if (this.__scrollLeft > maxx) {
        this.__scrollLeft = maxx;
      }
      if (this.__scrollTop < 0) {
        this.__scrollTop = 0;
      }
      else if (this.__scrollTop > maxy) {
        this.__scrollTop = maxy;
      }
    },

    /**
     * Converts a pointer event into a cell event and fires the cell event if the
     * pointer is over a cell.
     *
     * @param e {qx.event.type.Pointer} The pointer event.
     * @param cellEventType {String} The name of the cell event to fire.
     */
    __handlePointerCellEvent : function(e, cellEventType)
    {
      var coords = this.getCellAtPosition(e.getDocumentLeft(), e.getDocumentTop());
      if (!coords) {
        return;
      }

      var pointerDownCoords = this.__pointerDownCoords;
      if (pointerDownCoords == null || pointerDownCoords.row !== coords.row || pointerDownCoords.column !== coords.column) {
        return;
      }

      this.fireNonBubblingEvent(
        cellEventType,
        qx.ui.virtual.core.CellEvent,
        [this, e, coords.row, coords.column]
      );
    },


    /*
    ---------------------------------------------------------------------------
      PANE UPDATE
    ---------------------------------------------------------------------------
    */


    // overridden
    syncWidget : function(jobs)
    {
      if (this.__jobs._fullUpdate) {
        this._checkScrollBounds();
        this._fullUpdate();
      } else if (this.__jobs._updateScrollPosition) {
        this._checkScrollBounds();
        this._updateScrollPosition();
      }
      this.__jobs = {};
    },


    /**
     * Sets the size of the layers to contain the cells at the pixel position
     * "left/right" up to "left+minHeight/right+minHeight". The offset of the
     * layer container is adjusted to respect the pane's scroll top and scroll
     * left values.
     *
     * @param layers {qx.ui.virtual.core.ILayer[]} List of layers to update.
     * @param left {Integer} Maximum left pixel coordinate of the layers.
     * @param top {Integer} Maximum top pixel coordinate of the layers.
     * @param minWidth {Integer} The minimum end coordinate of the layers will
     *    be larger than <code>left+minWidth</code>.
     * @param minHeight {Integer} The minimum end coordinate of the layers will
     *    be larger than <code>top+minHeight</code>.
     * @param doFullUpdate {Boolean?false} Whether a full update on the layer
     *    should be performed of if only the layer window should be updated.
     */
    _setLayerWindow : function(layers, left, top, minWidth, minHeight, doFullUpdate)
    {
      var rowCellData = this.__rowConfig.getItemAtPosition(top);
      if (rowCellData)
      {
        var firstRow = rowCellData.index;
        var rowSizes = this.__rowConfig.getItemSizes(firstRow, minHeight + rowCellData.offset);
        var layerHeight = qx.lang.Array.sum(rowSizes);
        var layerTop = top - rowCellData.offset;
        var layerBottom = top - rowCellData.offset + layerHeight;
      }
      else
      {
        var firstRow = 0;
        var rowSizes = [];
        var layerHeight = 0;
        var layerTop = 0;
        var layerBottom = 0;
      }

      var columnCellData = this.__columnConfig.getItemAtPosition(left);
      if (columnCellData)
      {
        var firstColumn = columnCellData.index;
        var columnSizes = this.__columnConfig.getItemSizes(firstColumn, minWidth + columnCellData.offset);
        var layerWidth = qx.lang.Array.sum(columnSizes);
        var layerLeft = left - columnCellData.offset;
        var layerRight = left - columnCellData.offset + layerWidth;
      }
      else
      {
        var firstColumn = 0;
        var columnSizes = [];
        var layerWidth = 0;
        var layerLeft = 0;
        var layerRight = 0;
      }

      this.__layerWindow = {
        top: layerTop,
        bottom: layerBottom,
        left: layerLeft,
        right: layerRight
      };

      this.__layerContainer.setUserBounds(
        (this.getPaddingLeft() || 0) + (this.__layerWindow.left - this.__scrollLeft),
        (this.getPaddingTop() || 0) + (this.__layerWindow.top - this.__scrollTop),
        layerWidth, layerHeight
      );

      this.__columnSizes = columnSizes;
      this.__rowSizes = rowSizes;

      for (var i=0; i<this.__layers.length; i++)
      {
        var layer = this.__layers[i];
        layer.setUserBounds(0, 0, layerWidth, layerHeight);

        if (doFullUpdate) {
          layer.fullUpdate(firstRow, firstColumn, rowSizes, columnSizes);
        } else {
          layer.updateLayerWindow(firstRow, firstColumn, rowSizes, columnSizes);
        }
      }
    },



    /**
     * Check whether the pane was resized and fire an {@link #update} event if
     * it was.
     */
    __checkPaneResize : function()
    {
      if (this.__dontFireUpdate) {
        return;
      }

      var scrollSize = this.getScrollSize();
      if (
        this.__paneHeight !== scrollSize.height ||
        this.__paneWidth !== scrollSize.width
      )
      {
        this.__paneHeight = scrollSize.height;
        this.__paneWidth = scrollSize.width;
        this.fireEvent("update");
      }
    },


    /**
     * Schedule a full update on all visible layers.
     */
    fullUpdate : function()
    {
      this.__jobs._fullUpdate = 1;
      qx.ui.core.queue.Widget.add(this);
    },


    /**
     * Whether a full update is scheduled.
     *
     * @return {Boolean} Whether a full update is scheduled.
     */
    isUpdatePending : function() {
      return !!this.__jobs._fullUpdate;
    },


    /**
     * Perform a full update on all visible layers. All cached data will be
     * discarded.
     */
    _fullUpdate : function()
    {
      var layers = this.getVisibleLayers();
      if (layers.length == 0)
      {
        this.__checkPaneResize();
        return;
      }

      var bounds = this.getBounds();

      if (!bounds) {
        return; // the pane has not yet been rendered -> wait for the appear event
      }



      this._setLayerWindow(
        layers,
        this.__scrollLeft, this.__scrollTop,
        bounds.width, bounds.height,
        true
      );

      this.__checkPaneResize();
    },


    /**
     * Schedule an update the visible window of the grid according to the top
     * and left scroll positions.
     */
    _deferredUpdateScrollPosition : function()
    {
      this.__jobs._updateScrollPosition = 1;
      qx.ui.core.queue.Widget.add(this);
    },


    /**
     * Update the visible window of the grid according to the top and left scroll
     * positions.
     */
    _updateScrollPosition : function()
    {
      var layers = this.getVisibleLayers();
      if (layers.length == 0)
      {
        this.__checkPaneResize();
        return;
      }

      var bounds = this.getBounds();
      if (!bounds) {
        return; // the pane has not yet been rendered -> wait for the appear event
      }

      // the visible window of the virtual coordinate space
      var paneWindow = {
        top: this.__scrollTop,
        bottom: this.__scrollTop + bounds.height,
        left: this.__scrollLeft,
        right: this.__scrollLeft + bounds.width
      };

      if (
        this.__layerWindow.top <= paneWindow.top &&
        this.__layerWindow.bottom >= paneWindow.bottom &&
        this.__layerWindow.left <= paneWindow.left &&
        this.__layerWindow.right >= paneWindow.right
      )
      {
        // only update layer container offset
        this.__layerContainer.setUserBounds(
          (this.getPaddingLeft() || 0) + (this.__layerWindow.left - paneWindow.left),
          (this.getPaddingTop() || 0) + (this.__layerWindow.top - paneWindow.top),
          this.__layerWindow.right - this.__layerWindow.left,
          this.__layerWindow.bottom - this.__layerWindow.top
        );
      }
      else
      {
        this._setLayerWindow(
          layers,
          this.__scrollLeft, this.__scrollTop,
          bounds.width, bounds.height,
          false
        );
      }

      this.__checkPaneResize();
    }
  },


  destruct : function()
  {
    this._disposeArray("__layers");
    this._disposeObjects("__rowConfig", "__columnConfig", "__layerContainer");
    this.__layerWindow = this.__jobs = this.__columnSizes =
      this.__rowSizes = null;
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
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * EXPERIMENTAL!
 *
 * The axis maps virtual screen coordinates to item indexes. By default all
 * items have the same size but it is also possible to give specific items
 * a different size.
 */
qx.Class.define("qx.ui.virtual.core.Axis",
{
  extend : qx.core.Object,

  /**
   * @param defaultItemSize {Integer} The default size of the items.
   * @param itemCount {Integer} The number of item on the axis.
   */
  construct : function(defaultItemSize, itemCount)
  {
    this.base(arguments);

    this.itemCount = itemCount;
    this.defaultItemSize = defaultItemSize;

    // sparse array
    this.customSizes = {};
  },


  events :
  {
    /** Every change to the axis configuration triggers this event. */
    "change" : "qx.event.type.Event"
  },


  members :
  {
    __ranges : null,


    /**
     * Get the default size of the items.
     *
     * @return {Integer} The default item size.
     */
    getDefaultItemSize : function() {
      return this.defaultItemSize;
    },


    /**
     * Set the default size the items.
     *
     * @param defaultItemSize {Integer} The default size of the items.
     */
    setDefaultItemSize : function(defaultItemSize)
    {
      if (this.defaultItemSize !== defaultItemSize)
      {
        this.defaultItemSize = defaultItemSize;
        this.__ranges = null;
        this.fireNonBubblingEvent("change");
      }
    },


    /**
     * Get the number of items in the axis.
     *
     * @return {Integer} The number of items.
     */
    getItemCount : function() {
      return this.itemCount;
    },


    /**
     * Set the number of items in the axis.
     *
     * @param itemCount {Integer} The new item count.
     */
    setItemCount : function(itemCount)
    {
      if (this.itemCount !== itemCount)
      {
        this.itemCount = itemCount;
        this.__ranges = null;
        this.fireNonBubblingEvent("change");
      }
    },


    /**
     * Sets the size of a specific item. This allow item, which have a size
     * different from the default size.
     *
     * @param index {Integer} Index of the item to change.
     * @param size {Integer} New size of the item.
     */
    setItemSize : function(index, size)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        this.assertArgumentsCount(arguments, 2, 2);
        this.assert(
          size >= 0 || size === null,
          "'size' must be 'null' or an integer larger than 0."
        );
      }
      if (this.customSizes[index] == size) {
        return;
      }

      if (size === null) {
        delete this.customSizes[index];
      } else {
        this.customSizes[index] = size;
      }
      this.__ranges = null;
      this.fireNonBubblingEvent("change");
    },


    /**
     * Get the size of the item at the given index.
     *
     * @param index {Integer} Index of the item to get the size for.
     * @return {Integer} Size of the item.
     */
    getItemSize : function(index)
    {
      // custom size of 0 is not allowed
      return this.customSizes[index] || this.defaultItemSize;
    },


    /**
     * Reset all custom sizes set with {@link #setItemSize}.
     */
    resetItemSizes : function()
    {
      this.customSizes = {};
      this.__ranges = null;
      this.fireNonBubblingEvent("change");
    },


    /**
     * Split the position range into disjunct intervals. Each interval starts
     * with a custom sized cell. Each position is contained in exactly one range.
     * The ranges are sorted according to their start position.
     *
     * Complexity: O(n log n) (n = number of custom sized cells)
     *
     * @return {Map[]} The sorted list of ranges.
     */
    __getRanges : function()
    {
      if (this.__ranges) {
        return this.__ranges;
      }

      var defaultSize = this.defaultItemSize;
      var itemCount = this.itemCount;

      var indexes = [];
      for (var key in this.customSizes)
      {
        var index = parseInt(key, 10);
        if (index < itemCount) {
          indexes.push(index);
        }
      }
      if (indexes.length == 0)
      {
        var ranges = [{
          startIndex: 0,
          endIndex: itemCount - 1,
          firstItemSize: defaultSize,
          rangeStart: 0,
          rangeEnd: itemCount * defaultSize - 1
        }];
        this.__ranges = ranges;
        return ranges;
      }

      indexes.sort(function(a,b) { return a > b ? 1 : -1;});

      var ranges = [];
      var correctionSum = 0;

      for (var i=0; i<indexes.length; i++)
      {
        var index = indexes[i];
        if (index >= itemCount) {
          break;
        }

        var cellSize = this.customSizes[index];
        var rangeStart = index * defaultSize + correctionSum;

        correctionSum += cellSize - defaultSize;

        ranges[i] = {
          startIndex: index,
          firstItemSize: cellSize,
          rangeStart: rangeStart
        };
        if (i > 0) {
          ranges[i-1].rangeEnd = rangeStart-1;
          ranges[i-1].endIndex = index-1;
        }
      }

      // fix first range
      if (ranges[0].rangeStart > 0)
      {
        ranges.unshift({
          startIndex: 0,
          endIndex: ranges[0].startIndex-1,
          firstItemSize: defaultSize,
          rangeStart: 0,
          rangeEnd: ranges[0].rangeStart-1
        });
      }

      // fix last range
      var lastRange = ranges[ranges.length-1];
      var remainingItemsSize = (itemCount - lastRange.startIndex - 1) * defaultSize;
      lastRange.rangeEnd = lastRange.rangeStart + lastRange.firstItemSize + remainingItemsSize - 1;
      lastRange.endIndex = itemCount - 1;

      this.__ranges = ranges;
      return ranges;
    },


    /**
     * Returns the range, which contains the position
     *
     * Complexity: O(log n) (n = number of custom sized cells)
     *
     * @param position {Integer} The position.
     * @return {Map} The range, which contains the given position.
     */
    __findRangeByPosition : function(position)
    {
      var ranges = this.__ranges || this.__getRanges();

      var start = 0;
      var end = ranges.length-1;

      // binary search in the sorted ranges list
      while (true)
      {
        var pivot = start + ((end - start) >> 1);
        var range = ranges[pivot];

        if (range.rangeEnd < position) {
          start = pivot + 1;
        } else if (range.rangeStart > position) {
          end = pivot - 1;
        } else {
          return range;
        }
      }
    },


    /**
     * Get the item and the offset into the item at the given position.
     *
     * @param position {Integer|null} The position to get the item for.
     * @return {Map} A map with the keys <code>index</code> and
     *    <code>offset</code>. The index is the index of the item containing the
     *    position and offsets specifies offset into this item. If the position
     *    is outside of the range, <code>null</code> is returned.
     */
    getItemAtPosition : function(position)
    {
      if (position < 0 || position >= this.getTotalSize()) {
        return null;
      }

      var range = this.__findRangeByPosition(position);

      var startPos = range.rangeStart;
      var index = range.startIndex;
      var firstItemSize = range.firstItemSize;

      if (startPos + firstItemSize > position)
      {
        return {
          index: index,
          offset: position - startPos
        };
      }
      else
      {
        var defaultSize = this.defaultItemSize;
        return {
          index: index + 1 + Math.floor((position - startPos - firstItemSize) / defaultSize),
          offset: (position - startPos - firstItemSize) % defaultSize
        };
      }
    },


    /**
     * Returns the range, which contains the position.
     *
     * Complexity: O(log n) (n = number of custom sized cells)
     *
     * @param index {Integer} The index of the item to get the range for.
     * @return {Map} The range for the index.
     */
    __findRangeByIndex : function(index)
    {
      var ranges = this.__ranges || this.__getRanges();

      var start = 0;
      var end = ranges.length-1;

      // binary search in the sorted ranges list
      while (true)
      {
        var pivot = start + ((end - start) >> 1);
        var range = ranges[pivot];

        if (range.endIndex < index) {
          start = pivot + 1;
        } else if (range.startIndex > index) {
          end = pivot - 1;
        } else {
          return range;
        }
      }
    },


    /**
     * Get the start position of the item with the given index.
     *
     * @param index {Integer} The item's index.
     * @return {Integer|null} The start position of the item. If the index is outside
     *    of the axis range <code>null</code> is returned.
     */
    getItemPosition : function(index)
    {
      if (index < 0 || index >= this.itemCount) {
        return null;
      }

      var range = this.__findRangeByIndex(index);
      if (range.startIndex == index) {
        return range.rangeStart;
      } else {
        return range.rangeStart + range.firstItemSize + (index-range.startIndex-1) * this.defaultItemSize;
      }
    },


    /**
     * Returns the sum of all cell sizes.
     *
     * @return {Integer} The sum of all item sizes.
     */
    getTotalSize : function()
    {
      var ranges = this.__ranges || this.__getRanges();
      return ranges[ranges.length-1].rangeEnd + 1;
    },


    /**
     * Get an array of item sizes starting with the item at "startIndex". The
     * sum of all sizes in the returned array is at least "minSizeSum".
     *
     * @param startIndex {Integer} The index of the first item.
     * @param minSizeSum {Integer} The minimum sum of the item sizes.
     * @return {Integer[]} List of item sizes starting with the size of the item
     *    at index <code>startIndex</code>. The sum of the item sizes is at least
     *    <code>minSizeSum</code>.
     */
    getItemSizes : function(startIndex, minSizeSum)
    {
      var customSizes = this.customSizes;
      var defaultSize = this.defaultItemSize;

      var sum = 0;
      var sizes = [];
      var i=0;
      while (sum < minSizeSum)
      {
        var itemSize = customSizes[startIndex] != null ? customSizes[startIndex] : defaultSize;
        startIndex++;

        sum += itemSize;
        sizes[i++] = itemSize;
        if (startIndex >= this.itemCount) {
          break;
        }
      }
      return sizes;
    }
  },


  destruct : function() {
    this.customSizes = this.__ranges = null;
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
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * EXPERIMENTAL!
 *
 * A layer is responsible to render one aspect of a virtual pane. The pane tells
 * each layer to render/update a specific window of the virtual grid.
 */
qx.Interface.define("qx.ui.virtual.core.ILayer",
{
  members :
  {
    /**
     * Do a complete update of the layer. All cached data should be discarded.
     * This method is called e.g. after changes to the grid geometry
     * (row/column sizes, row/column count, ...).
     *
     * Note: This method can only be called after the widgets initial appear
     * event has been fired because it may work with the widget's DOM elements.
     *
     * @param firstRow {Integer} Index of the first row to display.
     * @param firstColumn {Integer} Index of the first column to display.
     * @param rowSizes {Integer[]} Array of heights for each row to display.
     * @param columnSizes {Integer[]} Array of widths for each column to display.
     */
    fullUpdate : function(
      firstRow, firstColumn,
      rowSizes, columnSizes
    ) {
      this.assertArgumentsCount(arguments, 6, 6);
      this.assertPositiveInteger(firstRow);
      this.assertPositiveInteger(firstColumn);
      this.assertArray(rowSizes);
      this.assertArray(columnSizes);
    },


    /**
     * Update the layer to display a different window of the virtual grid.
     * This method is called if the pane is scrolled, resized or cells
     * are prefetched. The implementation can assume that no other grid
     * data has been changed since the last "fullUpdate" of "updateLayerWindow"
     * call.
     *
     * Note: This method can only be called after the widgets initial appear
     * event has been fired because it may work with the widget's DOM elements.
     *
     * @param firstRow {Integer} Index of the first row to display.
     * @param firstColumn {Integer} Index of the first column to display.
     * @param rowSizes {Integer[]} Array of heights for each row to display.
     * @param columnSizes {Integer[]} Array of widths for each column to display.
     */
    updateLayerWindow : function(
      firstRow, firstColumn,
      rowSizes, columnSizes
    ) {
      this.assertArgumentsCount(arguments, 6, 6);
      this.assertPositiveInteger(firstRow);
      this.assertPositiveInteger(firstColumn);
      this.assertArray(rowSizes);
      this.assertArray(columnSizes);
    },


    /**
     * Update the layer to reflect changes in the data the layer displays.
     */
    updateLayerData : function() {}
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
     * David Perez Carmona (david-perez)
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * EXPERIMENTAL!
 *
 * A cell event instance contains all data for pointer events related to cells in
 * a pane.
 **/
qx.Class.define("qx.ui.virtual.core.CellEvent",
{
  extend : qx.event.type.Pointer,


  properties :
  {
    /** The table row of the event target. */
    row :
    {
      check : "Integer",
      nullable: true
    },

    /** The table column of the event target. */
    column :
    {
      check : "Integer",
      nullable: true
    }
  },


  members :
  {
     /**
      * Initialize the event.
      *
      * @param scroller {qx.ui.table.pane.Scroller} The tables pane scroller.
      * @param me {qx.event.type.Pointer} The original pointer event.
      * @param row {Integer?null} The cell's row index.
      * @param column {Integer?null} The cell's column index.
      */
     init : function(scroller, me, row, column)
     {
       me.clone(this);
       this.setBubbles(false);

       this.setRow(row);
       this.setColumn(column);
     }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Hagendorn (chris_schmidt)

************************************************************************ */

/**
 * Implements the different selection modes single, multi, additive and one
 * selection with there drag and quick selection.
 *
 * Example how to use selection:
 * <pre class="javascript">
 * var rawData = [];
 * for (var i = 0; i < 2500; i++) {
 *  rawData[i] = "Item No " + i;
 * }
 *
 * var model = qx.data.marshal.Json.createModel(rawData);
 * var list = new qx.ui.list.List(model);
 *
 * // Pre-Select "Item No 20"
 * list.getSelection().push(model.getItem(20));
 *
 * // log change selection
 * list.getSelection().addListener("change", function(e) {
 *   this.debug("Selection: " + list.getSelection().getItem(0));
 * }, this);
 * </pre>
 *
 * @internal
 */
qx.Mixin.define("qx.ui.virtual.selection.MModel",
{
  construct : function()
  {
    this._initSelectionManager();
    this.__defaultSelection = new qx.data.Array();
    this.initSelection(this.__defaultSelection);
  },


  properties :
  {
    /** Current selected items */
    selection :
    {
      check : "qx.data.Array",
      event : "changeSelection",
      apply : "_applySelection",
      nullable : false,
      deferredInit : true
    },


    /**
     * The selection mode to use.
     *
     * For further details please have a look at:
     * {@link qx.ui.core.selection.Abstract#mode}
     */
    selectionMode :
    {
      check : ["single", "multi", "additive", "one"],
      init : "single",
      apply : "_applySelectionMode"
    },


    /**
     * Enable drag selection (multi selection of items through
     * dragging the pointer in pressed states).
     *
     * Only possible for the selection modes <code>multi</code> and <code>additive</code>
     */
    dragSelection :
    {
      check : "Boolean",
      init : false,
      apply : "_applyDragSelection"
    },


    /**
     * Enable quick selection mode, where no tap is needed to change the selection.
     *
     * Only possible for the modes <code>single</code> and <code>one</code>.
     */
    quickSelection :
    {
      check : "Boolean",
      init : false,
      apply : "_applyQuickSelection"
    }
  },


  events : {
    /**
     * This event is fired as soon as the content of the selection property changes, but
     * this is not equal to the change of the selection of the widget. If the selection
     * of the widget changes, the content of the array stored in the selection property
     * changes. This means you have to listen to the change event of the selection array
     * to get an event as soon as the user changes the selected item.
     * <pre class="javascript">obj.getSelection().addListener("change", listener, this);</pre>
     */
    "changeSelection" : "qx.event.type.Data",

    /** Fires after the value was modified */
    "changeValue" : "qx.event.type.Data"
  },


  members :
  {
    /** @type {qx.ui.virtual.selection.Row} selection manager */
    _manager : null,


    /** @type {Boolean} flag to ignore the selection change from {@link #selection} */
    __ignoreChangeSelection : false,


    /** @type {Boolean} flag to ignore the selection change from <code>_manager</code> */
    __ignoreManagerChangeSelection : false,

    __defaultSelection : null,


    /**
     * setValue implements part of the {@link qx.ui.form.IField} interface.
     *
     * @param selection {qx.data.IListData|null} List data to select as value.
     * @return {null} The status of this operation.
     */
    setValue : function(selection) {
      if (null === selection) {
        this.resetSelection();
      } else {
        this.setSelection(selection);
      }

      return null;
    },


    /**
     * getValue implements part of the {@link qx.ui.form.IField} interface.
     *
     * @return {qx.data.IListData} The current selection.
     */
    getValue : function() {
      return this.getSelection();
    },


    /**
     * resetValue implements part of the {@link qx.ui.form.IField} interface.
     */
    resetValue : function() {
      this.resetSelection();
    },


    /**
     * Initialize the selection manager with his delegate.
     */
    _initSelectionManager : function()
    {
      var self = this;
      var selectionDelegate =
      {
        isItemSelectable : function(row) {
          return self._provider.isSelectable(row);
        },

        styleSelectable : function(row, type, wasAdded)
        {
          if (type != "selected") {
            return;
          }

          if (wasAdded) {
            self._provider.styleSelectabled(row);
          } else {
            self._provider.styleUnselectabled(row);
          }
        }
      };

      this._manager = new qx.ui.virtual.selection.Row(
        this.getPane(), selectionDelegate
      );
      this._manager.attachPointerEvents(this.getPane());
      this._manager.attachKeyEvents(this);
      this._manager.addListener("changeSelection", this._onManagerChangeSelection, this);
    },


    /**
     * Determines, if automatically scrolling of selected item is active.
     * Set <code>false</code> to suspend auto scrolling.
     *
     * @param value {Boolean} Set <code>false</code> to suspend auto scrolling.
     */
    setAutoScrollIntoView : function(value)
    {
      this._manager._autoScrollIntoView = value;
    },


    /**
     * Returns true, if automatically scrolling of selected item is active.
     *
     * @return {Boolean} Returns <code>false</code> if auto scrolling is suspended.
     */
    getAutoScrollIntoView : function()
    {
      return this._manager._autoScrollIntoView;
    },


    /**
     * Method to update the selection, this method can be used when the model has
     * changes.
     */
    _updateSelection : function()
    {
      if (this._manager == null) {
        return;
      }

      this._onChangeSelection();
    },


    /*
    ---------------------------------------------------------------------------
      APPLY ROUTINES
    ---------------------------------------------------------------------------
    */


    // apply method
    _applySelection : function(value, old)
    {
      value.addListener("change", this._onChangeSelection, this);

      if (old != null) {
        old.removeListener("change", this._onChangeSelection, this);
      }

      this._onChangeSelection();
    },


    // apply method
    _applySelectionMode : function(value, old) {
      this._manager.setMode(value);
    },


    // apply method
    _applyDragSelection : function(value, old) {
      this._manager.setDrag(value);
    },


    // apply method
    _applyQuickSelection : function(value, old) {
      this._manager.setQuick(value);
    },


    /*
    ---------------------------------------------------------------------------
      SELECTION HANDLERS
    ---------------------------------------------------------------------------
    */


    /**
     * Event handler for the internal selection change {@link #selection}.
     *
     * @param e {qx.event.type.Data} the change event.
     */
    _onChangeSelection : function(e)
    {
      if (this.__ignoreManagerChangeSelection == true) {
        return;
      }

      this.__ignoreChangeSelection = true;
      var selection = this.getSelection();

      var newSelection = [];
      for (var i = 0; i < selection.getLength(); i++)
      {
        var item = selection.getItem(i);
        var selectables = this._getSelectables();
        var index = -1;

        if (selectables != null) {
          index = selectables.indexOf(item);
        }

        var row = this._reverseLookup(index);

        if (row >= 0) {
          newSelection.push(row);
        }
      }

      if (this._beforeApplySelection != null &&
          qx.lang.Type.isFunction(this._beforeApplySelection)) {
        this._beforeApplySelection(newSelection);
      }

      try {
        if (!qx.lang.Array.equals(newSelection, this._manager.getSelection())) {
          this._manager.replaceSelection(newSelection);
        }
      }
      catch(ex)
      {
        this._manager.selectItem(newSelection[newSelection.length - 1]);
      }
      this.__synchronizeSelection();

      if (this._afterApplySelection != null &&
          qx.lang.Type.isFunction(this._afterApplySelection)) {
        this._afterApplySelection();
      }

      this.__ignoreChangeSelection = false;
    },


    /**
     * Event handler for the selection change from the <code>_manager</code>.
     *
     * @param e {qx.event.type.Data} the change event.
     */
    _onManagerChangeSelection : function(e)
    {
      if (this.__ignoreChangeSelection == true) {
        return;
      }

      this.__ignoreManagerChangeSelection = true;

      this.__synchronizeSelection();

      this.__ignoreManagerChangeSelection = false;

      this.fireDataEvent("changeValue", e.getData(), e.getOldData());
    },


    /**
     * Synchronized the selection form the manager with the local one.
     */
    __synchronizeSelection : function()
    {
      if (this.__isSelectionEquals()) {
        return;
      }

      var managerSelection = this._manager.getSelection();
      var newSelection = [];

      for (var i = 0; i < managerSelection.length; i++)
      {
        var item = this._getDataFromRow(managerSelection[i]);

        if (item != null) {
          newSelection.push(item);
        }
      }

      this.__replaceSelection(newSelection);
    },


    /**
     * Replace the current selection with the passed selection Array.
     *
     * @param newSelection {qx.data.Array} The new selection.
     */
    __replaceSelection : function(newSelection)
    {
      var selection = this.getSelection();
      if (newSelection.length > 0)
      {
        var args = [0, selection.getLength()];
        args = args.concat(newSelection);
        // dispose data array returned by splice to avoid memory leak
        var temp = selection.splice.apply(selection, args);
        temp.dispose();
      } else {
        selection.removeAll();
      }
    },


    /**
     * Checks whether the local and the manager selection are equal.
     *
     * @return {Boolean} <code>true</code> if the selections are equal,
     *   <code>false</code> otherwise.
     */
    __isSelectionEquals : function()
    {
      var selection = this.getSelection();
      var managerSelection = this._manager.getSelection();

      if (selection.getLength() !== managerSelection.length) {
        return false;
      }

      for (var i = 0; i < selection.getLength(); i++)
      {
        var item = selection.getItem(i);
        var selectables = this._getSelectables();
        var index = -1;

        if (selectables != null) {
          index = selectables.indexOf(item);
        }
        var row = this._reverseLookup(index);

        if (row !== managerSelection[i]) {
          return false;
        };
      }
      return true;
    },


    /**
     * Helper Method to select default item.
     */
    _applyDefaultSelection : function() {
      if (this._manager != null) {
        this._manager._applyDefaultSelection();
      }
    }
  },


  destruct : function()
  {
    this._manager.dispose();
    this._manager = null;
    if (this.__defaultSelection) {
      this.__defaultSelection.dispose();
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
     * Fabian Jakobs (fjakobs)
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */


/**
 * EXPERIMENTAL!
 *
 * Abstract base class for selection manager, which manage selectable items
 * rendered in a virtual {@link qx.ui.virtual.core.Pane}.
 */
qx.Class.define("qx.ui.virtual.selection.Abstract",
{
  extend : qx.ui.core.selection.Abstract,


  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */

  /**
   * @param pane {qx.ui.virtual.core.Pane} The virtual pane on which the
   *    selectable item are rendered
   * @param selectionDelegate {qx.ui.virtual.selection.ISelectionDelegate?null} An optional delegate,
   *    which can be used to customize the behavior of the selection manager
   *    without sub classing it.
   */
  construct : function(pane, selectionDelegate)
  {
    this.base(arguments);

    if (qx.core.Environment.get("qx.debug")) {
      this.assertInstance(pane, qx.ui.virtual.core.Pane);
    }

    this._pane = pane;
    this._delegate = selectionDelegate || {};
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // Determines if automatically scrolling of selected item into view is active.
    _autoScrollIntoView : true,


    /*
    ---------------------------------------------------------------------------
      DELEGATE METHODS
    ---------------------------------------------------------------------------
    */

    // overridden
    _isSelectable : function(item) {
      return this._delegate.isItemSelectable ?
        this._delegate.isItemSelectable(item) :
        true;
    },


    // overridden
    _styleSelectable : function(item, type, enabled)
    {
      if (this._delegate.styleSelectable) {
        this._delegate.styleSelectable(item, type, enabled);
      }
    },


    /*
    ---------------------------------------------------------------------------
      EVENTS
    ---------------------------------------------------------------------------
    */

    /**
     * Attach pointer events to the managed pane.
     */
    attachPointerEvents : function()
    {
      var paneElement = this._pane.getContentElement();
      paneElement.addListener("pointerdown", this.handlePointerDown, this);
      paneElement.addListener("tap", this.handleTap, this);
      paneElement.addListener("pointerover", this.handlePointerOver, this);
      paneElement.addListener("pointermove", this.handlePointerMove, this);
      paneElement.addListener("losecapture", this.handleLoseCapture, this);
    },


    /**
     * Detach pointer events from the managed pane.
     */
    detatchPointerEvents : function()
    {
      var paneElement = this._pane.getContentElement();
      paneElement.removeListener("pointerdown", this.handlePointerDown, this);
      paneElement.removeListener("tap", this.handleTap, this);
      paneElement.removeListener("pointerover", this.handlePointerOver, this);
      paneElement.removeListener("pointermove", this.handlePointerMove, this);
      paneElement.removeListener("losecapture", this.handleLoseCapture, this);
    },


    /**
     * Attach key events to manipulate the selection using the keyboard. The
     * event target doesn't need to be the pane itself. It can be an widget,
     * which received key events. Usually the key event target is the
     * {@link qx.ui.virtual.core.Scroller}.
     *
     * @param target {qx.core.Object} the key event target.
     *
     */
    attachKeyEvents : function(target) {
      target.addListener("keypress", this.handleKeyPress, this);
    },


    /**
     * Detach key events.
     *
     * @param target {qx.core.Object} the key event target.
     */
    detachKeyEvents : function(target) {
      target.removeListener("keypress", this.handleKeyPress, this);
    },


    /**
     * Attach list events. The selection mode <code>one</code> need to know,
     * when selectable items are added or removed. If this mode is used the
     * <code>list</code> parameter must fire <code>addItem</code> and
     * <code>removeItem</code> events.
     *
     * @param list {qx.core.Object} the event target for <code>addItem</code> and
     *    <code>removeItem</code> events
     */
    attachListEvents : function(list)
    {
      list.addListener("addItem", this.handleAddItem, this);
      list.addListener("removeItem", this.handleRemoveItem, this);
    },


    /**
     * Detach list events.
     *
     * @param list {qx.core.Object} the event target for <code>addItem</code> and
     *    <code>removeItem</code> events
     */
    detachListEvents : function(list)
    {
      list.removeListener("addItem", this.handleAddItem, this);
      list.removeListener("removeItem", this.handleRemoveItem, this);
    },


    /*
    ---------------------------------------------------------------------------
      IMPLEMENT ABSTRACT METHODS
    ---------------------------------------------------------------------------
    */

    // overridden
    _capture : function() {
      this._pane.capture();
    },


    // overridden
    _releaseCapture : function() {
      this._pane.releaseCapture();
    },


    // overridden
    _getScroll : function()
    {
      return {
        left : this._pane.getScrollX(),
        top: this._pane.getScrollY()
      };
    },


    // overridden
    _scrollBy : function(xoff, yoff)
    {
      this._pane.setScrollX(this._pane.getScrollX() + xoff);
      this._pane.setScrollY(this._pane.getScrollY() + yoff);
    },


    // overridden
    _getLocation : function()
    {
      var elem = this._pane.getContentElement().getDomElement();
      return elem ? qx.bom.element.Location.get(elem) : null;
    },


    // overridden
    _getDimension : function() {
      return this._pane.getInnerSize();
    }
  },

  /*
   *****************************************************************************
      DESTRUCT
   *****************************************************************************
   */

  destruct : function() {
    this._pane = this._delegate = null;
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
     * Fabian Jakobs (fjakobs)
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */


/**
 * EXPERIMENTAL!
 *
 * Row selection manager
 */
qx.Class.define("qx.ui.virtual.selection.Row",
{
  extend : qx.ui.virtual.selection.Abstract,


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * Returns the number of all items in the pane. This number may contain
     * unselectable items as well.
     *
     * @return {Integer} number of items
     */
    _getItemCount : function() {
      return this._pane.getRowConfig().getItemCount();
    },


    /*
    ---------------------------------------------------------------------------
      IMPLEMENT ABSTRACT METHODS
    ---------------------------------------------------------------------------
    */

    // overridden
    _getSelectableFromPointerEvent : function(event)
    {
      var cell = this._pane.getCellAtPosition(
        event.getDocumentLeft(),
        event.getDocumentTop()
      );

      if (!cell) {
        return null;
      }

      return this._isSelectable(cell.row) ? cell.row : null;
    },


    // overridden
    getSelectables : function(all)
    {
      var selectables = [];

      for (var i=0, l=this._getItemCount(); i<l; i++)
      {
        if (this._isSelectable(i)) {
          selectables.push(i);
        }
      }

      return selectables;
    },


    // overridden
    _getSelectableRange : function(item1, item2)
    {
      var selectables = [];
      var min = Math.min(item1, item2);
      var max = Math.max(item1, item2);

      for (var i=min; i<=max; i++)
      {
        if (this._isSelectable(i)) {
          selectables.push(i);
        }
      }

      return selectables;
    },


    // overridden
    _getFirstSelectable : function()
    {
      var count = this._getItemCount();
      for (var i=0; i<count; i++)
      {
        if (this._isSelectable(i)) {
          return i;
        }
      }
      return null;
    },


    // overridden
    _getLastSelectable : function()
    {
      var count = this._getItemCount();
      for (var i=count-1; i>=0; i--)
      {
        if (this._isSelectable(i)) {
          return i;
        }
      }
      return null;
    },


    // overridden
    _getRelatedSelectable : function(item, relation)
    {
      if (relation == "above")
      {
        var startIndex = item-1;
        var endIndex = 0;
        var increment = -1;
      }
      else if (relation == "under")
      {
        var startIndex = item+1;
        var endIndex = this._getItemCount()-1;
        var increment = 1;
      }
      else
      {
        return null;
      }

      for (var i=startIndex; i !== endIndex+increment; i += increment)
      {
        if (this._isSelectable(i)) {
          return i;
        }
      }
      return null;
    },


    // overridden
    _getPage : function(lead, up)
    {
      if (up) {
        return this._getFirstSelectable();
      } else {
        return this._getLastSelectable();
      }
    },


    // overridden
    _selectableToHashCode : function(item) {
      return item;
    },


    // overridden
    _scrollItemIntoView : function(item) {
      if (this._autoScrollIntoView) {
        this._pane.scrollRowIntoView(item);
      }
    },


    // overridden
    _getSelectableLocationX : function(item)
    {
      return {
        left: 0,
        right: this._pane.getColumnConfig().getTotalSize() - 1
      };
    },


    // overridden
    _getSelectableLocationY : function(item)
    {
      var rowConfig = this._pane.getRowConfig();

      var itemTop = rowConfig.getItemPosition(item);
      var itemBottom = itemTop + rowConfig.getItemSize(item) - 1;

      return {
        top: itemTop,
        bottom: itemBottom
      };
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Hagendorn (chris_schmidt)

************************************************************************ */

/**
 * Interface describes the methods which the {@link qx.ui.tree.provider.WidgetProvider}
 * uses for communication.
 */
qx.Interface.define("qx.ui.tree.core.IVirtualTree",
{
  members :
  {
    /**
     * Return whether top level items should have an open/close button. The top
     * level item item is normally the root item, but when the root is hidden,
     * the root children are the top level items.
     *
     * @return {Boolean} Returns <code>true</code> when top level items should
     *   show open/close buttons, <code>false</code> otherwise.
     */
    isShowTopLevelOpenCloseIcons : function() {},


    /**
     * Returns the internal data structure. The Array index is the row and the
     * value is the model item.
     *
     * @internal
     * @return {qx.data.Array} The internal data structure.
     */
    getLookupTable : function() {},


    /**
     * Returns if the passed item is a note or a leaf.
     *
     * @internal
     * @param item {qx.core.Object} Item to check.
     * @return {Boolean} <code>True</code> when item is a node,
     *   </code>false</code> when item is a leaf.
     */
    isNode : function(item)
    {
      this.assertArgumentsCount(arguments, 1, 1);
      this.assertInterface(item, qx.core.Object);
    },


    /**
     * Return whether the node is opened or closed.
     *
     * @param node {qx.core.Object} Node to check.
     * @return {Boolean} Returns <code>true</code> when the node is opened,
     *   <code>false</code> otherwise.
     */
    isNodeOpen : function(node)
    {
      this.assertArgumentsCount(arguments, 1, 1);
      this.assertInterface(node, qx.core.Object);
    },


    /**
     * Returns the row's nesting level.
     *
     * @param row {Integer} The row to get the nesting level.
     * @return {Integer} The row's nesting level or <code>null</code>.
     */
    getLevel : function(row)
    {
      this.assertArgumentsCount(arguments, 1, 1);
      this.assertInteger(row);
    },


    /**
     * Return whether the node has visible children or not.
     *
     * @internal
     * @param node {qx.core.Object} Node to check.
     * @return {Boolean} <code>True</code> when the node has visible children,
     *   <code>false</code> otherwise.
     */
    hasChildren : function(node)
    {
      this.assertArgumentsCount(arguments, 1, 1);
      this.assertInterface(node, qx.core.Object);
    },


    /**
     * Opens the passed node.
     *
     * @param node {qx.core.Object} Node to open.
     */
    openNode : function(node)
    {
      this.assertArgumentsCount(arguments, 1, 1);
      this.assertInterface(node, qx.core.Object);
    },


    /**
     * Opens the passed node without scrolling selected item into view.
     *
     * @param node {qx.core.Object} Node to open.
     */
    openNodeWithoutScrolling : function(node)
    {
      this.assertArgumentsCount(arguments, 1, 1);
      this.assertInterface(node, qx.core.Object);
    },


    /**
     * Closes the passed node.
     *
     * @param node {qx.core.Object} Node to close.
     */
    closeNode : function(node)
    {
      this.assertArgumentsCount(arguments, 1, 1);
      this.assertInterface(node, qx.core.Object);
    },


    /**
     * Closes the passed node without scrolling selected item into view.
     *
     * @param node {qx.core.Object} Node to close.
     */
    closeNodeWithoutScrolling : function(node)
    {
      this.assertArgumentsCount(arguments, 1, 1);
      this.assertInterface(node, qx.core.Object);
    },


    /**
     * Returns the current selection.
     *
     * @return {qx.data.Array} The current selected elements.
     */
    getSelection : function() {}
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
     * Christian Hagendorn (chris_schmidt)

************************************************************************ */

/*
 * Virtual tree implementation.
 *
 * The virtual tree can be used to render node and leafs. Nodes and leafs are
 * both items for a tree. The difference between a node and a leaf is that a
 * node has child items, but a leaf not.
 *
 * With the {@link qx.ui.tree.core.IVirtualTreeDelegate} interface it is possible
 * to configure the tree's behavior (item renderer configuration, etc.).
 *
 * Here's an example of how to use the widget, including using a model
 * property to open/close branches. See the two timers at the end. The first
 * one opens all branches after two seconds; the second cleans up the tree
 * after five seconds.
 *
 * <pre class="javascript">
 *   var nodes = 
 *   [
 *     {
 *       name : "Root",
 *       open : false,
 *       children :
 *       [
 *         {
 *           name : "Branch 1",
 *           open : false,
 *           children :
 *           [
 *             {
 *               name : "Leaf 1.1"
 *             },
 *             {
 *               name : "Leaf 1.2"
 *             },
 *             {
 *               name : "Branch 1.3",
 *               open : false,
 *               children :
 *               [
 *                 {
 *                   name : "Branch 1.3.1",
 *                   open : false,
 *                   children :
 *                   [
 *                     {
 *                       name : "Leaf 1.3.1.1"
 *                     }
 *                   ]
 *                 }
 *               ]
 *             }
 *           ]
 *         }
 *       ]
 *     }
 *   ];
 *
 *   // convert the raw nodes to qooxdoo objects
 *   nodes = qx.data.marshal.Json.createModel(nodes, true);
 *
 *   // create the tree and synchronize the model property 'open'
 *   // to nodes being open
 *   var tree =
 *     new qx.ui.tree.VirtualTree(
 *       nodes.getItem(0), "name", "children", "open").set({
 *         width : 200,
 *         height : 400
 *       });
 *
 *   //log selection changes
 *   tree.getSelection().addListener("change", function(e) {
 *     this.debug("Selection: " + tree.getSelection().getItem(0).getName());
 *   }, this);
 *
 *   tree.set(
 *     {
 *       width : 200,
 *       height : 400,
 *       showTopLevelOpenCloseIcons : true
 *     });
 *
 *   var doc = this.getRoot();
 *   doc.add(tree,
 *   {
 *     left : 100,
 *     top  : 50
 *   });
 *
 *   // After two seconds, open up all branches by setting their open
 *   // property to true.
 *   qx.event.Timer.once(
 *     function()
 *     {
 *       ;(function allOpen(root)
 *         {
 *           if (root.setOpen)     root.setOpen(true);
 *           if (root.getChildren) root.getChildren().forEach(allOpen);
 *         })(nodes.getItem(0));
 *     },
 *     this,
 *     2000);
 *
 *   // After five seconds, remove and dispose the tree.
 *   qx.event.Timer.once(
 *     function()
 *     {
 *       doc.remove(tree);
 *       tree.dispose();
 *       console.warn("All cleaned up.");
 *     },
 *     this,
 *     5000);
 * </pre>
 */
qx.Class.define("qx.ui.tree.VirtualTree",
{
  extend : qx.ui.virtual.core.Scroller,
  implement : [qx.ui.tree.core.IVirtualTree, qx.data.controller.ISelection],
  include : [
    qx.ui.virtual.selection.MModel,
    qx.ui.core.MContentPadding
  ],

  /**
   * @param rootModel {qx.core.Object?null} The model structure representing
   *   the root of the tree, for more details have a look at the 'model'
   *   property.
   * @param labelPath {String?null} The name of the label property, for more
   *   details have a look at the 'labelPath' property.
   * @param childProperty {String?null} The name of the child property, for
   *   more details have a look at the 'childProperty' property.
   * @param openProperty {String|null} the name of the model property which
   *   represents the open state of a branch. If this value is provided, so, 
   *   too, must be rootModel.
   */
  construct : function(
    rootModel, labelPath, childProperty, openProperty)
  {
    this.base(arguments, 0, 1, 20, 100);

    this._init();

    if (labelPath != null) {
      this.setLabelPath(labelPath);
    }

    if (childProperty != null) {
      this.setChildProperty(childProperty);
    }

    if(rootModel != null) {
      this.initModel(rootModel);
    }

    this.initItemHeight();
    this.initOpenMode();

    this.addListener("keypress", this._onKeyPress, this);

    // If an open property and root model are provided, start up the open-close controller.
    if (openProperty && rootModel) {
      this.openViaModelChanges(openProperty);
    }
  },

  events :
  {
    /**
     * Fired when a node is opened.
     */
    open : "qx.event.type.Data",


    /**
     * Fired when a node is closed.
     */
    close : "qx.event.type.Data"
  },


  properties :
  {
    // overridden
    appearance :
    {
      refine: true,
      init: "virtual-tree"
    },


    // overridden
    focusable :
    {
      refine: true,
      init: true
    },


    // overridden
    width :
    {
      refine : true,
      init : 100
    },


    // overridden
    height :
    {
      refine : true,
      init : 200
    },


    /** Default item height. */
    itemHeight :
    {
      check : "Integer",
      init : 25,
      apply : "_applyRowHeight",
      themeable : true
    },


     /**
     * Control whether tap or double tap should open or close the tapped
     * item.
     */
    openMode :
    {
      check: ["tap", "dbltap", "none"],
      init: "dbltap",
      apply: "_applyOpenMode",
      event: "changeOpenMode",
      themeable: true
    },

    
    /**
     * Hides *only* the root node, not the node's children when the property is
     * set to <code>true</code>.
     */
    hideRoot :
    {
      check: "Boolean",
      init: false,
      apply:"_applyHideRoot"
    },


    /**
     * Whether top level items should have an open/close button. The top level
     * item item is normally the root item, but when the root is hidden, the
     * root children are the top level items.
     */
    showTopLevelOpenCloseIcons :
    {
      check : "Boolean",
      init : false,
      apply : "_applyShowTopLevelOpenCloseIcons"
    },


    /**
     * Configures the tree to show also the leafs. When the property is set to
     * <code>false</code> *only* the nodes are shown.
     */
    showLeafs :
    {
      check: "Boolean",
      init: true,
      apply: "_applyShowLeafs"
    },


    /**
     * The name of the property, where the children are stored in the model.
     * Instead of the {@link #labelPath} must the child property a direct
     * property form the model instance.
     */
    childProperty :
    {
      check: "String",
      apply: "_applyChildProperty",
      nullable: true
    },


    /**
     * The name of the property, where the value for the tree folders label
     * is stored in the model classes.
     */
    labelPath :
    {
      check: "String",
      apply: "_applyLabelPath",
      nullable: true
    },


    /**
     * The path to the property which holds the information that should be
     * shown as an icon.
     */
    iconPath :
    {
      check: "String",
      apply: "_applyIconPath",
      nullable: true
    },


    /**
     * A map containing the options for the label binding. The possible keys
     * can be found in the {@link qx.data.SingleValueBinding} documentation.
     */
    labelOptions :
    {
      apply: "_applyLabelOptions",
      nullable: true
    },


    /**
     * A map containing the options for the icon binding. The possible keys
     * can be found in the {@link qx.data.SingleValueBinding} documentation.
     */
    iconOptions :
    {
      apply: "_applyIconOptions",
      nullable: true
    },


    /**
     * The model containing the data (nodes and/or leafs) which should be shown
     * in the tree.
     */
    model :
    {
      check : "qx.core.Object",
      apply : "_applyModel",
      event: "changeModel",
      nullable : true,
      deferredInit : true
    },


    /**
     * Delegation object, which can have one or more functions defined by the
     * {@link qx.ui.tree.core.IVirtualTreeDelegate} interface.
     */
    delegate :
    {
      event: "changeDelegate",
      apply: "_applyDelegate",
      init: null,
      nullable: true
    }
  },


  members :
  {
    /** @type {qx.ui.tree.provider.WidgetProvider} Provider for widget rendering. */
    _provider : null,


    /** @type {qx.ui.virtual.layer.Abstract} Layer which contains the items. */
    _layer : null,


    /**
     * @type {qx.data.Array} The internal lookup table data structure to get the model item
     * from a row.
     */
    __lookupTable : null,


    /** @type {Array} HashMap which contains all open nodes. */
    __openNodes : null,


    /**
     * @type {Array} The internal data structure to get the nesting level from a
     * row.
     */
    __nestingLevel : null,


    /**
     * @type {qx.util.DeferredCall} Adds this instance to the widget queue on a
     * deferred call.
     */
    __deferredCall : null,


    /** @type {Integer} Holds the max item width from a rendered widget. */
    _itemWidth : 0,


    /** @type {Array} internal parent chain form the last selected node */
    __parentChain : null,

    /** 
     * @type {String|null} the name of the model property which represents the
     *   open state of a branch.
     */
    __openProperty : null,

    /*
    ---------------------------------------------------------------------------
      PUBLIC API
    ---------------------------------------------------------------------------
    */


    // overridden
    syncWidget : function(jobs)
    {
      var firstRow = this._layer.getFirstRow();
      var rowSize = this._layer.getRowSizes().length;

      for (var row = firstRow; row < firstRow + rowSize; row++)
      {
        var widget = this._layer.getRenderedCellWidget(row, 0);
        if (widget != null) {
          this._itemWidth = Math.max(this._itemWidth, widget.getSizeHint().width);
        }
      }
      var paneWidth = this.getPane().getInnerSize().width;
      this.getPane().getColumnConfig().setItemSize(0, Math.max(this._itemWidth, paneWidth));
    },


    // Interface implementation
    openNode : function(node)
    {
      this.__openNode(node);
      this.buildLookupTable();
    },


    // Interface implementation
    openNodeWithoutScrolling : function(node)
    {
      var autoscroll = this.getAutoScrollIntoView();
      // suspend automatically scrolling selection into view
      this.setAutoScrollIntoView(false);

      this.openNode(node);

      // re set to original value
      this.setAutoScrollIntoView(autoscroll);
    },


    /**
     * Trigger a rebuild from the internal data structure.
     */
    refresh : function() {
      this.buildLookupTable();
    },


    /**
     * Opens the passed node and all his parents. *Note!* The algorithm
     * implements a depth-first search with a complexity: <code>O(n)</code> and
     * <code>n</code> are all model items.
     *
     * @param node {qx.core.Object} Node to open.
     */
    openNodeAndParents : function(node)
    {
      this.__openNodeAndAllParents(this.getModel(), node);
      this.buildLookupTable();
    },


    // Interface implementation
    closeNode : function(node)
    {
      if (this.__openNodes.includes(node))
      {
        qx.lang.Array.remove(this.__openNodes, node);
        this.fireDataEvent("close", node);
        this.buildLookupTable();
      }
    },


    // Interface implementation
    closeNodeWithoutScrolling : function(node)
    {
      var autoscroll = this.getAutoScrollIntoView();
      // suspend automatically scrolling selection into view
      this.setAutoScrollIntoView(false);

      this.closeNode(node);

      // re set to original value
      this.setAutoScrollIntoView(autoscroll);
    },


    // Interface implementation
    isNodeOpen : function(node) {
      return this.__openNodes.includes(node);
    },


    /**
     * Open and close branches via changes to a property in the model.
     * 
     * @param openProperty {String|null} 
     *   The name of the open property, which determines the open state of a
     *   branch in the tree. If null, turn off opening and closing branches
     *   via changes to the model.
     */
    openViaModelChanges : function(openProperty) {
      // Save the open property
      this.__openProperty = openProperty;

      // if no name is provided, just remove any prior open-close controller
      if (! openProperty) {
        if (this._openCloseController) {
          this._openCloseController.dispose();
          this._openCloseController = null;
        }

        return;
      }

      // we have a property name, so create controller
      this._openCloseController =
        new qx.ui.tree.core.OpenCloseController(this, this.getModel(), openProperty);
    },


    /**
     * Getter for the open property
     */
    getOpenProperty : function()
    {
      return this.__openProperty;
    },


    /*
    ---------------------------------------------------------------------------
      INTERNAL API
    ---------------------------------------------------------------------------
    */


    /**
     * Initializes the virtual tree.
     */
    _init : function()
    {
      this.__lookupTable = new qx.data.Array();
      this.__openNodes = [];
      this.__nestingLevel = [];
      this._initLayer();
    },


    /**
     * Initializes the virtual tree layer.
     */
    _initLayer : function()
    {
      this._provider = new qx.ui.tree.provider.WidgetProvider(this);
      this._layer = this._provider.createLayer();
      this._layer.addListener("updated", this._onUpdated, this);
      this.getPane().addLayer(this._layer);
      this.getPane().addListenerOnce("resize", function(e) {
        // apply width to pane on first rendering pass
        // to avoid visible flickering
        this.getPane().getColumnConfig().setItemSize(0, e.getData().width);
      }, this);
    },


    // Interface implementation
    getLookupTable : function() {
      return this.__lookupTable;
    },
    
    
    // Interface implementation
    isShowTopLevelOpenCloseIcons : function() {
      return true;
    },


    /**
     * Performs a lookup from model index to row.
     *
     * @param index {Number} The index to look at.
     * @return {Number} The row or <code>-1</code>
     *  if the index is not a model index.
     */
    _reverseLookup : function(index) {
      return index;
    },


    /**
     * Returns the model data for the given row.
     *
     * @param row {Integer} row to get data for.
     * @return {var|null} the row's model data.
     */
    _getDataFromRow : function(row) {
      return this.__lookupTable.getItem(row);
    },

    /**
     * Returns the selectable model items.
     *
     * @return {qx.data.Array} The selectable items.
     */
    _getSelectables : function() {
      return this.__lookupTable;
    },


    /**
     * Returns all open nodes.
     *
     * @internal
     * @return {Array} All open nodes.
     */
    getOpenNodes : function() {
      return this.__openNodes;
    },


    // Interface implementation
    isNode : function(item) {
      return qx.ui.tree.core.Util.isNode(item, this.getChildProperty());
    },


    // Interface implementation
    getLevel : function(row) {
      return this.__nestingLevel[row];
    },


    // Interface implementation
    hasChildren : function(node) {
      return qx.ui.tree.core.Util.hasChildren(node, this.getChildProperty(), !this.isShowLeafs());
    },


    /**
     * Returns the element, to which the content padding should be applied.
     *
     * @return {qx.ui.core.Widget} The content padding target.
     */
    _getContentPaddingTarget : function() {
      return this.getPane();
    },


    /*
    ---------------------------------------------------------------------------
      PROPERTY APPLY METHODS
    ---------------------------------------------------------------------------
    */


    // property apply
    _applyRowHeight : function(value, old) {
      this.getPane().getRowConfig().setDefaultItemSize(value);
    },


    // property apply
    _applyOpenMode : function(value, old)
    {
      var pane = this.getPane();

      //"tap", "dbltap", "none"
      if (value === "dbltap") {
        pane.addListener("cellDbltap", this._onOpen, this);
      } else if (value === "tap") {
        pane.addListener("cellTap", this._onOpen, this);
      }

      if (old === "dbltap") {
        pane.removeListener("cellDbltap", this._onOpen, this);
      } else if (old === "tap") {
        pane.removeListener("cellTap", this._onOpen, this);
      }
    },


    // property apply
    _applyHideRoot : function(value, old) {
      this.buildLookupTable();
    },


    // property apply
    _applyShowTopLevelOpenCloseIcons : function(value, old) {
      // force rebuild of the lookup table
      // fixes https://github.com/qooxdoo/qooxdoo/issues/9128
      this.getLookupTable().removeAll();
      this.buildLookupTable();
    },


    // property apply
    _applyShowLeafs : function(value, old) {
      // force rebuild of the lookup table
      // fixes https://github.com/qooxdoo/qooxdoo/issues/9128
      this.getLookupTable().removeAll();
      this.buildLookupTable();
    },


    // property apply
    _applyChildProperty : function(value, old) {
      this._provider.setChildProperty(value);
    },


    // property apply
    _applyLabelPath : function(value, old) {
      this._provider.setLabelPath(value);
    },


    // property apply
    _applyIconPath : function(value, old) {
      this._provider.setIconPath(value);
    },


    // property apply
    _applyLabelOptions : function(value, old) {
      this._provider.setLabelOptions(value);
    },


    // property apply
    _applyIconOptions : function(value, old) {
      this._provider.setIconOptions(value);
    },


    // property apply
    _applyModel : function(value, old)
    {
      this.__openNodes = [];

      if (value != null)
      {
        if (qx.core.Environment.get("qx.debug"))
        {
          if (!qx.Class.hasMixin(value.constructor,
                qx.data.marshal.MEventBubbling))
          {
            this.warn("The model item doesn't support the Mixin 'qx.data." +
              "marshal.MEventBubbling'. Therefore the tree can not update " +
              "the view automatically on model changes.");
          }
        }
        value.addListener("changeBubble", this._onChangeBubble, this);
        this.__openNode(value);
      }

      // If the model changes, an existing OpenCloseController is no longer
      // valid, so dispose it. The user should call openViaModelChanges again.
      if (this._openCloseController) {
        this._openCloseController.dispose();
        this._openCloseController = null;
      }

      if (old != null) {
        old.removeListener("changeBubble", this._onChangeBubble, this);
      }

      this.__applyModelChanges();
    },


    // property apply
    _applyDelegate : function(value, old)
    {
      this._provider.setDelegate(value);
      this.buildLookupTable();
    },


    /*
    ---------------------------------------------------------------------------
      EVENT HANDLERS
    ---------------------------------------------------------------------------
    */


    /**
     * Event handler for the changeBubble event. The handler rebuild the lookup
     * table when the child structure changed.
     *
     * @param event {qx.event.type.Data} The data event.
     */
    _onChangeBubble : function(event)
    {
      var data = event.getData();
      var propertyName = data.name;
      var index = propertyName.lastIndexOf(".");

      if (index != -1) {
        propertyName = propertyName.substr(index + 1, propertyName.length);
      }

      // only continue when the effected property is the child property
      if ( propertyName.startsWith(this.getChildProperty()) )
      {
        var item = data.item;

        if (qx.Class.isSubClassOf(item.constructor, qx.data.Array))
        {
          if (index === -1)
          {
            item = this.getModel();
          }
          else
          {
            var propertyChain = data.name.substr(0, index);
            item = qx.data.SingleValueBinding.resolvePropertyChain(this.getModel(), propertyChain);
          }
        }

        if (this.__lookupTable.indexOf(item) != -1) {
          this.__applyModelChanges();
        }
      }
    },


    /**
     * Event handler for the update event.
     *
     * @param event {qx.event.type.Event} The event.
     */
    _onUpdated : function(event)
    {
      if (this.__deferredCall == null) {
        this.__deferredCall = new qx.util.DeferredCall(function() {
          qx.ui.core.queue.Widget.add(this);
        }, this);
      }
      this.__deferredCall.schedule();
    },


    /**
     * Event handler to open/close tapped nodes.
     *
     * @param event {qx.ui.virtual.core.CellEvent} The cell tap event.
     */
    _onOpen : function(event)
    {
      var row = event.getRow();
      var item = this.__lookupTable.getItem(row);

      if (this.isNode(item))
      {
        if (this.isNodeOpen(item)) {
          this.closeNode(item);
        } else {
          this.openNode(item);
        }
      }
    },


    /**
     * Event handler for key press events. Open and close the current selected
     * item on key left and right press. Jump to parent on key left if already
     * closed.
     *
     * @param e {qx.event.type.KeySequence} key event.
     */
    _onKeyPress : function(e)
    {
      var selection = this.getSelection();

      if (selection.getLength() > 0)
      {
        var item = selection.getItem(0);
        var isNode = this.isNode(item);

        switch(e.getKeyIdentifier())
        {
          case "Left":
            if (isNode && this.isNodeOpen(item)) {
              this.closeNode(item);
            } else {
              var parent = this.getParent(item);
              if (parent != null) {
                selection.splice(0, 1, parent);
              }
            }
            break;

          case "Right":
            if (isNode && !this.isNodeOpen(item)) {
              this.openNode(item);
            }
            else
            {
              if (isNode)
              {
                var children = item.get(this.getChildProperty());
                if (children != null && children.getLength() > 0) {
                  selection.splice(0, 1, children.getItem(0));
                }
              }
            }
            break;

          case "Enter":
          case "Space":
            if (!isNode) {
              return;
            }
            if (this.isNodeOpen(item)) {
              this.closeNode(item);
            } else {
              this.openNode(item);
            }
            break;
        }
      }
    },

    /*
    ---------------------------------------------------------------------------
      SELECTION HOOK METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Hook method which is called from the {@link qx.ui.virtual.selection.MModel}.
     * The hook method sets the first visible parent not as new selection when
     * the current selection is empty and the selection mode is one selection.
     *
     * @param newSelection {Array} The newSelection which will be set to the selection manager.
     */
    _beforeApplySelection : function(newSelection)
    {
      if (newSelection.length === 0 &&
          this.getSelectionMode() === "one")
      {
        var visibleParent = this.__getVisibleParent();
        var row = this.getLookupTable().indexOf(visibleParent);

        if (row >= 0) {
          newSelection.push(row);
        }
      }
    },


    /**
     * Hook method which is called from the {@link qx.ui.virtual.selection.MModel}.
     * The hook method builds the parent chain form the current selected item.
     */
    _afterApplySelection : function()
    {
      var selection = this.getSelection();

      if (selection.getLength() > 0 &&
          this.getSelectionMode() === "one") {
        this.__buildParentChain(selection.getItem(0));
      } else {
        this.__parentChain = [];
      }
    },


    /*
    ---------------------------------------------------------------------------
      HELPER METHODS
    ---------------------------------------------------------------------------
    */


    /**
     * Helper method to apply model changes. Normally build the lookup table and
     * apply the default selection.
     */
    __applyModelChanges : function()
    {
      this.buildLookupTable();
      this._applyDefaultSelection();
    },


    /**
     * Helper method to build the internal data structure.
     *
     * @internal
     */
    buildLookupTable : function()
    {
      if (
        this.getModel() != null &&
        (this.getChildProperty() == null || this.getLabelPath() == null)
      )
      {
        throw new Error("Could not build tree, because 'childProperty' and/" +
          "or 'labelPath' is 'null'!");
      }

      this._itemWidth = 0;
      var lookupTable = [];
      this.__nestingLevel = [];
      var nestedLevel = -1;

      var root = this.getModel();
      if (root != null)
      {
        if (!this.isHideRoot())
        {
          nestedLevel++;
          lookupTable.push(root);
          this.__nestingLevel.push(nestedLevel);
        }

        if (this.isNodeOpen(root))
        {
          var visibleChildren = this.__getVisibleChildrenFrom(root, nestedLevel);
          lookupTable = lookupTable.concat(visibleChildren);
        }
      }

      if (!qx.lang.Array.equals(this.__lookupTable.toArray(), lookupTable))
      {
        this._provider.removeBindings();
        this.__lookupTable.removeAll();
        this.__lookupTable.append(lookupTable);
        this.__updateRowCount();
        this._updateSelection();
      }
    },


    /**
     * Helper method to get all visible children form the passed parent node.
     * The algorithm implements a depth-first search with a complexity:
     * <code>O(n)</code> and <code>n</code> are all visible items.
     *
     * @param node {qx.core.Object} The start node to start search.
     * @param nestedLevel {Integer} The nested level from the start node.
     * @return {Array} All visible children form the parent.
     */
    __getVisibleChildrenFrom : function(node, nestedLevel)
    {
      var visible = [];
      nestedLevel++;

      if (!this.isNode(node)) {
        return visible;
      }

      var children = node.get(this.getChildProperty());
      if (children == null) {
        return visible;
      }

      // clone children to keep original model unmodified
      children = children.copy();

      var delegate = this.getDelegate();
      var filter = qx.util.Delegate.getMethod(delegate, "filter");
      var sorter = qx.util.Delegate.getMethod(delegate, "sorter");

      if (sorter != null) {
        children.sort(sorter);
      }

      for (var i = 0; i < children.getLength(); i++)
      {
        var child = children.getItem(i);

        if (filter && !filter(child)) {
          continue;
        }

        if (this.isNode(child))
        {
          this.__nestingLevel.push(nestedLevel);
          visible.push(child);

          if (this.isNodeOpen(child))
          {
            var visibleChildren = this.__getVisibleChildrenFrom(child, nestedLevel);
            visible = visible.concat(visibleChildren);
          }
        }
        else
        {
          if (this.isShowLeafs())
          {
            this.__nestingLevel.push(nestedLevel);
            visible.push(child);
          }
        }
      }

      // dispose children clone
      children.dispose();

      return visible;
    },


    /**
     * Helper method to set the node to the open nodes data structure when it
     * is not included.
     *
     * @param node {qx.core.Object} Node to set to open nodes.
     */
    __openNode : function(node)
    {
      if (!this.__openNodes.includes(node)) {
        this.__openNodes.push(node);
        this.fireDataEvent("open", node);
      }
    },


    /**
     * Helper method to set the target node and all his parents to the open
     * nodes data structure. The algorithm implements a depth-first search with
     * a complexity: <code>O(n)</code> and <code>n</code> are all model items.
     *
     * @param startNode {qx.core.Object} Start (root) node to search.
     * @param targetNode {qx.core.Object} Target node to open (and his parents).
     * @return {Boolean} <code>True</code> when the targetNode and his
     *  parents could opened, <code>false</code> otherwise.
     */
    __openNodeAndAllParents : function(startNode, targetNode)
    {
      if (startNode === targetNode)
      {
        this.__openNode(targetNode);
        return true;
      }

      if (!this.isNode(startNode)) {
        return false;
      }

      var children = startNode.get(this.getChildProperty());
      if (children == null) {
        return false;
      }

      for (var i = 0; i < children.getLength(); i++)
      {
        var child = children.getItem(i);
        var result = this.__openNodeAndAllParents(child, targetNode);

        if (result === true)
        {
          this.__openNode(child);
          return true;
        }
      }

      return false;
    },


    /**
     * Helper method to update the row count.
     */
    __updateRowCount : function()
    {
      this.getPane().getRowConfig().setItemCount(this.__lookupTable.getLength());
      this.getPane().fullUpdate();
    },


    /**
     * Helper method to get the parent node. Node! This only works with leaf and
     * nodes which are in the internal lookup table.
     *
     * @param item {qx.core.Object} Node or leaf to get parent.
     * @return {qx.core.Object|null} The parent note or <code>null</code> when
     *   no parent found.
     *
     * @internal
     */
    getParent : function(item)
    {
      var index = this.__lookupTable.indexOf(item);
      if (index < 0) {
        return null;
      }

      var level = this.__nestingLevel[index];
      while(index > 0)
      {
        index--;
        var levelBefore = this.__nestingLevel[index];
        if (levelBefore < level) {
          return this.__lookupTable.getItem(index);
        }
      }

      return null;
    },


    /**
     * Builds the parent chain form the passed item.
     *
     * @param item {var} Item to build parent chain.
     */
    __buildParentChain : function(item)
    {
      this.__parentChain = [];
      var parent = this.getParent(item);
      while(parent != null)
      {
        this.__parentChain.unshift(parent);
        parent = this.getParent(parent);
      }
    },


    /**
     * Return the first visible parent node from the last selected node.
     *
     * @return {var} The first visible node.
     */
    __getVisibleParent : function()
    {
      if (this.__parentChain == null) {
        return this.getModel();
      }

      var lookupTable = this.getLookupTable();
      var parent = this.__parentChain.pop();

      while(parent != null)
      {
        if (lookupTable.contains(parent)) {
          return parent;
        }
        parent = this.__parentChain.pop();
      }
      return this.getModel();
    }
  },


  destruct : function()
  {
    if (this._openCloseController) {
      this._openCloseController.dispose();
    }

    var pane = this.getPane();
    if (pane != null)
    {
      if (pane.hasListener("cellDbltap")) {
        pane.removeListener("cellDbltap", this._onOpen, this);
      }
      if (pane.hasListener("cellTap")) {
        pane.removeListener("cellTap", this._onOpen, this);
      }
    }

    if (!qx.core.ObjectRegistry.inShutDown && this.__deferredCall != null)
    {
      this.__deferredCall.cancel();
      this.__deferredCall.dispose();
    }

    var model = this.getModel();
    if (model != null) {
      model.removeListener("changeBubble", this._onChangeBubble, this);
    }

    this._layer.removeListener("updated", this._onUpdated, this);
    this._layer.destroy();
    this._provider.dispose();
    this.__lookupTable.dispose();

    this._layer = this._provider = this.__lookupTable = this.__openNodes =
      this.__deferredCall = null;
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2017 Cajus Pollmeier

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Cajus Pollmeier
     * Derrell Lipman

************************************************************************ */

/**
 * Because of the virtual nature of the VirtualTree, and the fact that
 * rendering occurs asynchronously, it is not a simple matter to bind a
 * property in the model that will open or close branches in the
 * tree. Instead, this controller listens to both the model and the tree, and
 * synchronizes the openness of branches in the tree.
 * 
 * To use this controller, simply instantiate it with the requisite
 * constructor arguments.
 */
qx.Class.define("qx.ui.tree.core.OpenCloseController",
{
  extend: qx.core.Object,
  
  /**
   * @param tree {qx.ui.tree.VirtualTree}
   *   The tree whose branch open or closed state is to be synchronized to a
   *   model property.
   * 
   * @param rootModel {qx.data.Array}
   *   The tree root model wherein a property is to be synchronized to the
   *   tree branches' open or closed states
   */
  construct: function(tree, rootModel)
  {
    var             openProperty = tree.getOpenProperty();

    this.base(arguments);
    
    // Save the tree and initialize storage of listener IDs
    this._tree = tree;
    this._lids = [];
    
    // Sync tree nodes
    var sync = function(node) {
      if (qx.Class.hasProperty(node.constructor, "children")) {
        node.getChildren().forEach(sync);
      }
      
      if (qx.Class.hasProperty(node.constructor, openProperty)) {
        if (node.get(openProperty)) {
          tree.openNode(node);
        }
        else {
          tree.closeNode(node);
        }
      }
    }.bind(this);
    sync(rootModel);
    
    // Wire change listeners
    var lid = tree.addListener("open", this._onOpen, this);
    this._lids.push([tree, lid]);
    lid = tree.addListener("close", this._onClose, this);
    this._lids.push([tree, lid]);
    lid = rootModel.addListener("changeBubble", this._onChangeBubble, this);
    this._lids.push([rootModel, lid]);
  },
  
  members:
  {
    /** The tree which is synced to the model */
    _tree: null,

    /** Listener IDs that we manage */
    _lids: null,
    
    // event listener for "open" on the tree
    _onOpen: function(ev)
    {
      ev.getData().set(this._tree.getOpenProperty(), true);
    },
    
    // event listener for "close" on the tree
    _onClose: function(ev)
    {
      ev.getData().set(this._tree.getOpenProperty(), false);
    },
    
    // event listener for model changes
    _onChangeBubble: function(ev)
    {
      var index;
      var item;
      var isOpen;
      var bubble = ev.getData();

      // Extract the index of the current item
      index = bubble.name.replace(/.*\[([0-9]+)\]$/, "$1");

      // Retrieve that indexed array item if it's an array; otherwise the item itself
      item = bubble.item.getItem ? bubble.item.getItem(index) : bubble.item;

      // If this item isn't being deleted and has an open property...
      if (item && qx.Class.hasProperty(item.constructor, this._tree.getOpenProperty())) {
        // ... then find out if this branch is open
        isOpen = item.get(this._tree.getOpenProperty());

        // Open or close the tree branch as necessary
        if (isOpen && !this._tree.isNodeOpen(item)) {
          this._tree.openNode(item);
        }
        else if (! isOpen && this._tree.isNodeOpen(item)) {
          this._tree.closeNode(item);
        }
      }

      // Rebuild the internal lookup table
      this._tree.refresh();
    }
  },
  
  destruct: function()
  {
    this._tree = null;
    this._lids.forEach(function(data) {
      data[0].removeListenerById(data[1]);
    });
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
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * EXPERIMENTAL!
 *
 * A widget cell provider provides the {@link qx.ui.virtual.layer.WidgetCell}
 * with configured widgets to render the cells and pools/releases unused
 * cell widgets.
 */
qx.Interface.define("qx.ui.virtual.core.IWidgetCellProvider",
{
  members :
  {
    /**
     * This method returns the configured cell for the given cell. The return
     * value may be <code>null</code> to indicate that the cell should be empty.
     *
     * @param row {Integer} The cell's row index.
     * @param column {Integer} The cell's column index.
     * @return {qx.ui.core.LayoutItem} The configured widget for the given cell.
     */
    getCellWidget : function(row, column) {},

    /**
     * Release the given cell widget. Either pool or destroy the widget.
     *
     * @param widget {qx.ui.core.LayoutItem} The cell widget to pool.
     */
    poolCellWidget : function(widget) {}
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Hagendorn (chris_schmidt)

************************************************************************ */

/**
 * This interface needs to implemented from all {@link qx.ui.tree.VirtualTree}
 * providers.
 *
 * @internal
 */
qx.Interface.define("qx.ui.tree.provider.IVirtualTreeProvider",
{
  members :
  {
    /**
     * Creates a layer for node and leaf rendering.
     *
     * @return {qx.ui.virtual.layer.Abstract} new layer.
     */
    createLayer : function() {},


    /**
     * Creates a renderer for rendering.
     *
     * @return {var} new node renderer.
     */
    createRenderer : function() {},


    /**
     * Sets the name of the property, where the children are stored in the model.
     *
     * @param value {String} The child property name.
     */
    setChildProperty : function(value)
    {
      this.assertArgumentsCount(arguments, 1, 1);
      this.assertString(value);
    },


    /**
     * Sets the name of the property, where the value for the tree folders label
     * is stored in the model classes.
     *
     * @param value {String} The label path.
     */
    setLabelPath : function(value)
    {
      this.assertArgumentsCount(arguments, 1, 1);
      this.assertString(value);
    },


    /**
     * Styles a selected item.
     *
     * @param row {Integer} row to style.
     */
    styleSelectabled : function(row)
    {
      this.assertArgumentsCount(arguments, 1, 1);
      this.assertInteger(row);
    },


    /**
     * Styles a not selected item.
     *
     * @param row {Integer} row to style.
     */
    styleUnselectabled : function(row)
    {
      this.assertArgumentsCount(arguments, 1, 1);
      this.assertInteger(row);
    },


    /**
     * Returns if the passed row can be selected or not.
     *
     * @param row {Integer} row to select.
     * @return {Boolean} <code>true</code> when the row can be selected,
     *    <code>false</code> otherwise.
     */
    isSelectable : function(row)
    {
      this.assertArgumentsCount(arguments, 1, 1);
      this.assertInteger(row);
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
     * Christian Hagendorn (chris_schmidt)
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * The mixin controls the binding between model and item.
 *
 * @internal
 */
qx.Mixin.define("qx.ui.tree.core.MWidgetController",
{
  construct : function() {
    this.__boundItems = [];
  },


  properties :
  {
    /**
     * The name of the property, where the value for the tree node/leaf label
     * is stored in the model classes.
     */
    labelPath :
    {
      check: "String",
      nullable: true
    },


    /**
     * The path to the property which holds the information that should be
     * shown as an icon.
     */
    iconPath :
    {
      check: "String",
      nullable: true
    },


    /**
     * A map containing the options for the label binding. The possible keys
     * can be found in the {@link qx.data.SingleValueBinding} documentation.
     */
    labelOptions :
    {
      nullable: true
    },


    /**
     * A map containing the options for the icon binding. The possible keys
     * can be found in the {@link qx.data.SingleValueBinding} documentation.
     */
    iconOptions :
    {
      nullable: true
    },


    /**
     * The name of the property, where the children are stored in the model.
     * Instead of the {@link #labelPath} must the child property a direct
     * property form the model instance.
     */
    childProperty :
    {
      check: "String",
      nullable: true
    },


    /**
     * Delegation object, which can have one or more functions defined by the
     * {@link qx.ui.tree.core.IVirtualTreeDelegate} interface.
     */
    delegate :
    {
      event: "changeDelegate",
      init: null,
      nullable: true
    }
  },


  members :
  {
    /** @type {Array} which contains the bounded items */
    __boundItems : null,


    /**
     * Helper-Method for binding the default properties from the model to the
     * target widget. The used default properties  depends on the passed item.
     *
     * This method should only be called in the {@link IVirtualTreeDelegate#bindItem}
     * function implemented by the {@link #delegate} property.
     *
     * @param item {qx.ui.core.Widget} The internally created and used node or
     *   leaf.
     * @param index {Integer} The index of the item (node or leaf).
     */
    bindDefaultProperties : function(item, index)
    {
      // bind model first
      this.bindProperty("", "model", null, item, index);

      this.bindProperty(
        this.getLabelPath(), "label", this.getLabelOptions(), item, index
      );

      var bindPath = this.__getBindPath(index);
      var bindTarget = this._tree.getLookupTable();
      bindTarget = qx.data.SingleValueBinding.resolvePropertyChain(bindTarget, bindPath);

      if (qx.util.OOUtil.hasProperty(bindTarget.constructor, this.getChildProperty())) {
        this.bindProperty(
          this.getChildProperty() + ".length", "appearance",
          {
            converter : function() {
              return "virtual-tree-folder";
            }
          }, item, index
        );
      } else {
        item.setAppearance("virtual-tree-file");
      }

      if (this.getIconPath() != null)
      {
        this.bindProperty(
          this.getIconPath(), "icon", this.getIconOptions(), item, index
        );
      }
    },


    /**
     * Helper-Method for binding a given property from the model to the target
     * widget.
     *
     * This method should only be called in the {@link IVirtualTreeDelegate#bindItem}
     * function implemented by the {@link #delegate} property.
     *
     * @param sourcePath {String | null} The path to the property in the model.
     *   If you use an empty string, the whole model item will be bound.
     * @param targetProperty {String} The name of the property in the target widget.
     * @param options {Map | null} The options to use for the binding.
     * @param targetWidget {qx.ui.core.Widget} The target widget.
     * @param index {Integer} The index of the current binding.
     */
    bindProperty : function(sourcePath, targetProperty, options, targetWidget, index)
    {
      var bindPath = this.__getBindPath(index, sourcePath);
      var bindTarget = this._tree.getLookupTable();

      var id = bindTarget.bind(bindPath, targetWidget, targetProperty, options);
      this.__addBinding(targetWidget, id);
    },


    /**
     * Helper-Method for binding a given property from the target widget to
     * the model.
     * This method should only be called in the
     * {@link qx.ui.tree.core.IVirtualTreeDelegate#bindItem} function implemented by the
     * {@link #delegate} property.
     *
     * @param targetPath {String | null} The path to the property in the model.
     * @param sourceProperty {String} The name of the property in the target.
     * @param options {Map | null} The options to use for the binding.
     * @param sourceWidget {qx.ui.core.Widget} The source widget.
     * @param index {Integer} The index of the current binding.
     */
    bindPropertyReverse : function(targetPath, sourceProperty, options, sourceWidget, index)
    {
      var bindPath = this.__getBindPath(index, targetPath);
      var bindTarget = this._tree.getLookupTable();

      var id = sourceWidget.bind(sourceProperty, bindTarget, bindPath, options);
      this.__addBinding(sourceWidget, id);
    },


    /**
     * Remove all bindings from all bounded items.
     */
    removeBindings : function()
    {
      while(this.__boundItems.length > 0) {
        var item = this.__boundItems.pop();
        this._removeBindingsFrom(item);
      }
    },


    /**
     * Sets up the binding for the given item and index.
     *
     * @param item {qx.ui.core.Widget} The internally created and used item.
     * @param index {Integer} The index of the item.
     */
    _bindItem : function(item, index)
    {
      var bindItem = qx.util.Delegate.getMethod(this.getDelegate(), "bindItem");

      if (bindItem != null) {
        bindItem(this, item, index);
      } else {
        this.bindDefaultProperties(item, index);
      }
    },


    /**
     * Removes the binding of the given item.
     *
     * @param item {qx.ui.core.Widget} The item which the binding should be
     *   removed.
     */
    _removeBindingsFrom : function(item)
    {
      var bindings = this.__getBindings(item);

      while (bindings.length > 0)
      {
        var id = bindings.pop();

        try {
          this._tree.getLookupTable().removeBinding(id);
        } catch(e) {
          item.removeBinding(id);
        }
      }

      if (this.__boundItems.includes(item)) {
        qx.lang.Array.remove(this.__boundItems, item);
      }
    },


    /**
     * Helper method to create the path for binding.
     *
     * @param index {Integer} The index of the item.
     * @param path {String|null} The path to the property.
     * @return {String} The binding path
     */
    __getBindPath : function(index, path)
    {
      var bindPath = "[" + index + "]";
      if (path != null && path != "") {
        bindPath += "." + path;
      }
      return bindPath;
    },


    /**
     * Helper method to save the binding for the widget.
     *
     * @param widget {qx.ui.core.Widget} widget to save binding.
     * @param id {var} the id from the binding.
     */
    __addBinding : function(widget, id)
    {
      var bindings = this.__getBindings(widget);

      if (!bindings.includes(id)) {
        bindings.push(id);
      }

      if (!this.__boundItems.includes(widget)) {
        this.__boundItems.push(widget);
      }
    },


    /**
     * Helper method which returns all bound id from the widget.
     *
     * @param widget {qx.ui.core.Widget} widget to get all binding.
     * @return {Array} all bound id's.
     */
    __getBindings : function(widget)
    {
      var bindings = widget.getUserData("BindingIds");

      if (bindings == null) {
        bindings = [];
        widget.setUserData("BindingIds", bindings);
      }

      return bindings;
    }
  },


  destruct : function() {
    this.__boundItems = null;
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
     * Christian Hagendorn (chris_schmidt)
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * Methods to work with the delegate pattern.
 */
qx.Class.define("qx.util.Delegate",
{
  statics :
  {
    /**
     * Returns the delegate method given my its name.
     *
     * @param delegate {Object} The delegate object to check the method.
     * @param specificMethod {String} The name of the delegate method.
     * @return {Function|null} The requested method or null, if no method is set.
     */
    getMethod : function(delegate, specificMethod)
    {
      if (qx.util.Delegate.containsMethod(delegate, specificMethod)) {
        return qx.lang.Function.bind(delegate[specificMethod], delegate);
      }

      return null;
    },



    /**
     * Checks, if the given delegate is valid or if a specific method is given.
     *
     * @param delegate {Object} The delegate object.
     * @param specificMethod {String} The name of the method to search for.
     * @return {Boolean} True, if everything was ok.
     */
    containsMethod : function (delegate, specificMethod)
    {
      var Type = qx.lang.Type;

      if (Type.isObject(delegate)) {
        return Type.isFunction(delegate[specificMethod]);
      }

      return false;
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
     * Christian Hagendorn (chris_schmidt)

************************************************************************ */

/**
 * The provider implements the {@link qx.ui.virtual.core.IWidgetCellProvider}
 * API, which can be used as delegate for the widget cell rendering and it
 * provides a API to bind the model with the rendered item.
 *
 * @internal
 */
qx.Class.define("qx.ui.tree.provider.WidgetProvider",
{
  extend : qx.core.Object,

  implement : [
   qx.ui.virtual.core.IWidgetCellProvider,
   qx.ui.tree.provider.IVirtualTreeProvider
  ],

  include : [qx.ui.tree.core.MWidgetController],


  /**
   * @param tree {qx.ui.tree.VirtualTree} tree to provide.
   */
  construct : function(tree)
  {
    this.base(arguments);

    this._tree = tree;

    this.addListener("changeDelegate", this._onChangeDelegate, this);
    this._onChangeDelegate();
  },


  members :
  {
    /** @type {qx.ui.tree.VirtualTree} tree to provide. */
    _tree : null,


    /** @type {qx.ui.virtual.cell.WidgetCell} the used item renderer. */
    _renderer : null,


    /*
    ---------------------------------------------------------------------------
      PUBLIC API
    ---------------------------------------------------------------------------
    */


    // interface implementation
    getCellWidget : function(row, column)
    {
      var item = this._tree.getLookupTable().getItem(row);

      var hasChildren = false;
      if (this._tree.isNode(item)) {
        hasChildren = this._tree.hasChildren(item);
      }

      var widget = this._renderer.getCellWidget();
      widget.setOpen(hasChildren && this._tree.isNodeOpen(item));
      widget.addListener("changeOpen", this.__onOpenChanged, this);
      widget.setUserData("cell.childProperty", this.getChildProperty());
      widget.setUserData("cell.showLeafs", this._tree.isShowLeafs());

      if(this._tree.getSelection().contains(item)) {
        this._styleSelectabled(widget);
      } else {
        this._styleUnselectabled(widget);
      }

      var level = this._tree.getLevel(row);
      if (!this._tree.isShowTopLevelOpenCloseIcons()) {
        level -= 1;
      }
      widget.setUserData("cell.level", level);

      if (!this._tree.isShowTopLevelOpenCloseIcons() && level == -1) {
        widget.setOpenSymbolMode("never");
      } else {
        widget.setOpenSymbolMode("auto");
      }

      if (this._tree.getOpenProperty()) {
        widget.setModel(item);
      }

      this._bindItem(widget, row);
      qx.ui.core.queue.Widget.add(widget);

      return widget;
    },


    // interface implementation
    poolCellWidget : function(widget)
    {
      widget.removeListener("changeOpen", this.__onOpenChanged, this);
      this._removeBindingsFrom(widget);
      this._renderer.pool(widget);
      this._onPool(widget);
    },


    // Interface implementation
    createLayer : function() {
      return new qx.ui.virtual.layer.WidgetCell(this);
    },


    // Interface implementation
    createRenderer : function()
    {
      var createItem = qx.util.Delegate.getMethod(this.getDelegate(), "createItem");

      if (createItem == null) {
        createItem = function() {
          return new qx.ui.tree.VirtualTreeItem();
        };
      }

      var renderer = new qx.ui.virtual.cell.WidgetCell();
      renderer.setDelegate({
        createWidget : createItem
      });

      return renderer;
    },


    // interface implementation
    styleSelectabled : function(row)
    {
      var widget = this._tree._layer.getRenderedCellWidget(row, 0);
      this._styleSelectabled(widget);
    },


    // interface implementation
    styleUnselectabled : function(row)
    {
      var widget = this._tree._layer.getRenderedCellWidget(row, 0);
      this._styleUnselectabled(widget);
    },


    // interface implementation
    isSelectable : function(row)
    {
      var widget = this._tree._layer.getRenderedCellWidget(row, 0);
      if (widget != null) {
        return widget.isEnabled();
      } else {
        return true;
      }
    },


    /*
    ---------------------------------------------------------------------------
      INTERNAL API
    ---------------------------------------------------------------------------
    */


    /**
     * Styles a selected item.
     *
     * @param widget {qx.ui.core.Widget} widget to style.
     */
    _styleSelectabled : function(widget) {
      if(widget == null) {
        return;
      }

      this._renderer.updateStates(widget, {selected: 1});
    },


    /**
     * Styles a not selected item.
     *
     * @param widget {qx.ui.core.Widget} widget to style.
     */
    _styleUnselectabled : function(widget) {
      if(widget == null) {
        return;
      }

      this._renderer.updateStates(widget, {});
    },


    /**
     * Calls the delegate <code>onPool</code> method when it is used in the
     * {@link #delegate} property.
     *
     * @param item {qx.ui.core.Widget} Item to modify.
     */
    _onPool : function(item)
    {
      var onPool = qx.util.Delegate.getMethod(this.getDelegate(), "onPool");

      if (onPool != null) {
        onPool(item);
      }
    },


    /*
    ---------------------------------------------------------------------------
      EVENT HANDLERS
    ---------------------------------------------------------------------------
    */


    /**
     * Event handler for the created item's.
     *
     * @param event {qx.event.type.Data} fired event.
     */
    _onItemCreated : function(event)
    {
      var configureItem = qx.util.Delegate.getMethod(this.getDelegate(), "configureItem");

      if (configureItem != null) {
        var leaf = event.getData();
        configureItem(leaf);
      }
    },


    /**
     * Event handler for the change delegate event.
     *
     * @param event {qx.event.type.Data} fired event.
     */
    _onChangeDelegate : function(event)
    {
      if (this._renderer != null) {
        this._renderer.dispose();
        this.removeBindings();
      }

      this._renderer = this.createRenderer();
      this._renderer.addListener("created", this._onItemCreated, this);
    },


    /**
     * Handler when a node changes opened or closed state.
     *
     * @param event {qx.event.type.Data} The data event.
     */
    __onOpenChanged : function(event)
    {
      var widget = event.getTarget();

      var row = widget.getUserData("cell.row");
      var item = this._tree.getLookupTable().getItem(row);

      if (event.getData()) {
        this._tree.openNodeWithoutScrolling(item);
      } else {
        this._tree.closeNodeWithoutScrolling(item);
      }
    }
  },


  destruct : function()
  {
    this.removeBindings();
    this._renderer.dispose();
    this._tree = this._renderer = null;
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
     * Fabian Jakobs (fjakobs)

************************************************************************ */


/**
 * EXPERIMENTAL!
 *
 * Abstract base class for layers of a virtual pane.
 *
 * This class queues calls to {@link #fullUpdate}, {@link #updateLayerWindow}
 * and {@link #updateLayerData} and only performs the absolute necessary
 * actions. Concrete implementation of this class must at least implement
 * the {@link #_fullUpdate} method. Additionally the two methods
 * {@link #_updateLayerWindow} and {@link #_updateLayerData} may be implemented
 * to increase the performance.
 */
qx.Class.define("qx.ui.virtual.layer.Abstract",
{
  extend : qx.ui.core.Widget,
  type : "abstract",

  implement : [qx.ui.virtual.core.ILayer],

  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */

   construct : function()
   {
     this.base(arguments);

     this.__jobs = {};
   },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // overridden
    anonymous :
    {
      refine: true,
      init: true
    }
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __jobs : null,
    __arguments : null,

    __firstRow : null,
    __firstColumn : null,
    __rowSizes : null,
    __columnSizes : null,


    /**
     * Get the first rendered row
     *
     * @return {Integer} The first rendered row
     */
    getFirstRow : function() {
      return this.__firstRow;
    },


    /**
     * Get the first rendered column
     *
     * @return {Integer} The first rendered column
     */
    getFirstColumn : function() {
      return this.__firstColumn;
    },


    /**
     * Get the sizes of the rendered rows
     *
     * @return {Integer[]} List of row heights
     */
    getRowSizes : function() {
      return this.__rowSizes || [];
    },


    /**
     * Get the sizes of the rendered column
     *
     * @return {Integer[]} List of column widths
     */
    getColumnSizes : function() {
      return this.__columnSizes || [];
    },


    // overridden
    syncWidget : function(jobs)
    {
      // return if the layer is not yet rendered
      // it will rendered in the appear event
      if (!this.getContentElement().getDomElement()) {
        return;
      }

      if (
        this.__jobs.fullUpdate ||
        this.__jobs.updateLayerWindow && this.__jobs.updateLayerData
      )
      {
        this._fullUpdate.apply(this, this.__arguments);
      }
      else if (this.__jobs.updateLayerWindow)
      {
        this._updateLayerWindow.apply(this, this.__arguments);
      }
      else if (this.__jobs.updateLayerData  && this.__rowSizes)
      {
        this._updateLayerData();
      }

      if (this.__jobs.fullUpdate || this.__jobs.updateLayerWindow)
      {
        var args = this.__arguments;
        this.__firstRow = args[0];
        this.__firstColumn = args[1];
        this.__rowSizes = args[2];
        this.__columnSizes = args[3];
      }

      this.__jobs = {};
    },


    /**
     * Update the layer to reflect changes in the data the layer displays.
     *
     * Note: It is guaranteed that this method is only called after the layer
     * has been rendered.
     */
    _updateLayerData : function()
    {
      this._fullUpdate(
        this.__firstRow, this.__firstColumn,
        this.__rowSizes, this.__columnSizes
      );
    },


    /**
     * Do a complete update of the layer. All cached data should be discarded.
     * This method is called e.g. after changes to the grid geometry
     * (row/column sizes, row/column count, ...).
     *
     * Note: It is guaranteed that this method is only called after the layer
     * has been rendered.
     *
     * @param firstRow {Integer} Index of the first row to display
     * @param firstColumn {Integer} Index of the first column to display
     * @param rowSizes {Integer[]} Array of heights for each row to display
     * @param columnSizes {Integer[]} Array of widths for each column to display
     */
    _fullUpdate : function(
      firstRow, firstColumn,
      rowSizes, columnSizes
    ) {
      throw new Error("Abstract method '_fullUpdate' called!");
    },


    /**
     * Update the layer to display a different window of the virtual grid.
     * This method is called if the pane is scrolled, resized or cells
     * are prefetched. The implementation can assume that no other grid
     * data has been changed since the last "fullUpdate" of "updateLayerWindow"
     * call.
     *
     * Note: It is guaranteed that this method is only called after the layer
     * has been rendered.
     *
     * @param firstRow {Integer} Index of the first row to display
     * @param firstColumn {Integer} Index of the first column to display
     * @param rowSizes {Integer[]} Array of heights for each row to display
     * @param columnSizes {Integer[]} Array of widths for each column to display
     */
    _updateLayerWindow : function(
      firstRow, firstColumn,
      rowSizes, columnSizes
    )
    {
      this._fullUpdate(
        firstRow, firstColumn,
        rowSizes, columnSizes
      );
    },


    // interface implementation
    updateLayerData : function()
    {
      this.__jobs.updateLayerData = true;
      qx.ui.core.queue.Widget.add(this);
    },


    // interface implementation
    fullUpdate : function(
      firstRow, firstColumn,
      rowSizes, columnSizes
    )
    {
      this.__arguments = arguments;
      this.__jobs.fullUpdate = true;
      qx.ui.core.queue.Widget.add(this);
    },


    // interface implementation
    updateLayerWindow : function(
      firstRow, firstColumn,
      rowSizes, columnSizes
    ) {
      this.__arguments = arguments;
      this.__jobs.updateLayerWindow = true;
      qx.ui.core.queue.Widget.add(this);
    }
  },

  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this.__jobs = this.__arguments = this.__rowSizes = this.__columnSizes = null;
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
     * Fabian Jakobs (fjakobs)
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */


/**
 * EXPERIMENTAL!
 *
 * The WidgetCell layer renders each cell with a qooxdoo widget. The concrete
 * widget instance for each cell is provided by a cell provider.
 */
qx.Class.define("qx.ui.virtual.layer.WidgetCell",
{
  extend : qx.ui.virtual.layer.Abstract,

  include : [
    qx.ui.core.MChildrenHandling
  ],


  /**
   * @param widgetCellProvider {qx.ui.virtual.core.IWidgetCellProvider} This
   *    class manages the life cycle of the cell widgets.
   */
  construct : function(widgetCellProvider)
  {
    this.base(arguments);
    this.setZIndex(12);

    if (qx.core.Environment.get("qx.debug")) {
      this.assertInterface(
        widgetCellProvider,
        qx.ui.virtual.core.IWidgetCellProvider
      );
    }

    this._cellProvider = widgetCellProvider;
    this.__spacerPool = [];
  },


  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */

   properties :
   {
     // overridden
     anonymous :
     {
       refine: true,
       init: false
     }
   },

  events :
  {
    /**
     * Is fired when the {@link #_fullUpdate} or the
     * {@link #_updateLayerWindow} is finished.
     */
    updated : "qx.event.type.Event"
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
     __spacerPool : null,

     /**
     * Returns the widget used to render the given cell. May return null if the
     * cell isn’t rendered currently rendered.
     *
     * @param row {Integer} The cell's row index
     * @param column {Integer} The cell's column index
     * @return {qx.ui.core.LayoutItem|null} the widget used to render the given
     *    cell or <code>null</code>
     */
     getRenderedCellWidget : function(row, column)
     {
        if (this._getChildren().length === 0) {
          return null;
        }

        var columnCount = this.getColumnSizes().length;
        var rowCount = this.getRowSizes().length;

        var firstRow = this.getFirstRow();
        var firstColumn = this.getFirstColumn();

        if (
         row < firstRow ||
         row >= firstRow + rowCount ||
         column < firstColumn ||
         column >= firstColumn + columnCount
        ) {
         return null;
        }

        var childIndex = (column - firstColumn) + (row - firstRow) * columnCount;
        var widget = this._getChildren()[childIndex];

        if (!widget || widget.getUserData("cell.empty")) {
         return null;
        } else {
         return widget;
        }
     },


    /**
     * Get the spacer widget, for empty cells
     *
     * @return {qx.ui.core.Spacer} The spacer widget.
     */
    _getSpacer : function()
    {
      var spacer = this.__spacerPool.pop();
      if (!spacer)
      {
        spacer = new qx.ui.core.Spacer();
        spacer.setUserData("cell.empty", 1);
      }
      return spacer;
    },


    /**
     * Activates one of the still not empty items.
     * @param elementToPool {qx.ui.core.Widget} The widget which gets pooled.
     */
    _activateNotEmptyChild : function(elementToPool)
    {
      // get the current active element
      var active = qx.ui.core.FocusHandler.getInstance().getActiveWidget();
      // if the element to pool is active or one of its children
      if (active == elementToPool || qx.ui.core.Widget.contains(elementToPool, active)) {
        // search for a new child to activate
        var children = this._getChildren();
        for (var i = children.length - 1; i >= 0; i--) {
          if (!children[i].getUserData("cell.empty")) {
            children[i].activate();
            break;
          }
        };
      }
    },


    // overridden
    _fullUpdate : function(firstRow, firstColumn, rowSizes, columnSizes)
    {
      var cellProvider = this._cellProvider;

      var children = this._getChildren().concat();
      for (var i=0; i<children.length; i++)
      {
        var child = children[i];
        if (child.getUserData("cell.empty")) {
          this.__spacerPool.push(child);
        } else {
          this._activateNotEmptyChild(child);
          cellProvider.poolCellWidget(child);
        }
      }


      var top = 0;
      var left = 0;

      var visibleItems = [];

      for (var y=0; y<rowSizes.length; y++)
      {
        for (var x=0; x<columnSizes.length; x++)
        {
          var row = firstRow + y;
          var column = firstColumn + x;

          var item = cellProvider.getCellWidget(row, column) || this._getSpacer();

          visibleItems.push(item);

          item.setUserBounds(left, top, columnSizes[x], rowSizes[y]);
          item.setUserData("cell.row", row);
          item.setUserData("cell.column", column);
          this._add(item);

          left += columnSizes[x];
        }
        top += rowSizes[y];
        left = 0;
      }
      children.forEach(function(child){
        if (visibleItems.indexOf(child) === -1) {
          this._remove(child);
        }
      }.bind(this));

      this.fireEvent("updated");
    },


    _updateLayerWindow : function(
      firstRow, firstColumn,
      rowSizes, columnSizes
    )
    {
      // compute overlap of old and new window
      //
      //      +---+
      //      |  ##--+
      //      |  ##  |
      //      +--##  |
      //         +---+
      //


    if (qx.core.Environment.get("qx.debug"))
    {
      this.assertPositiveInteger(firstRow);
      this.assertPositiveInteger(firstColumn);
      this.assertArray(rowSizes);
      this.assertArray(columnSizes);
    }


      var lastRow = firstRow + rowSizes.length - 1;
      var lastColumn = firstColumn + columnSizes.length - 1;

      var overlap = {
        firstRow: Math.max(firstRow, this.getFirstRow()),
        lastRow: Math.min(lastRow, this._lastRow),
        firstColumn: Math.max(firstColumn, this.getFirstColumn()),
        lastColumn: Math.min(lastColumn, this._lastColumn)
      };

      this._lastColumn = lastColumn;
      this._lastRow = lastRow;

      if (
        overlap.firstRow > overlap.lastRow ||
        overlap.firstColumn > overlap.lastColumn
      ) {
        return this._fullUpdate(
          firstRow, firstColumn,
          rowSizes, columnSizes
        );
      }

      // collect the widgets to move
      var children = this._getChildren();
      var lineLength = this.getColumnSizes().length;
      var widgetsToMove = [];
      var widgetsToMoveIndexes = {};
      for (var row=firstRow; row<=lastRow; row++)
      {
        widgetsToMove[row] = [];
        for (var column=firstColumn; column<=lastColumn; column++)
        {
          if (
            row >= overlap.firstRow &&
            row <= overlap.lastRow &&
            column >= overlap.firstColumn &&
            column <= overlap.lastColumn
          )
          {
            var x = column - this.getFirstColumn();
            var y = row - this.getFirstRow();
            var index = y*lineLength + x;
            widgetsToMove[row][column] = children[index];
            widgetsToMoveIndexes[index] = true;
          }
        }
      }

      var cellProvider = this._cellProvider;

      // pool widgets
      var children = this._getChildren().concat();
      for (var i=0; i<children.length; i++)
      {
        if (!widgetsToMoveIndexes[i])
        {
          var child = children[i];
          if (child.getUserData("cell.empty")) {
            this.__spacerPool.push(child);
          } else {
            this._activateNotEmptyChild(child);
            cellProvider.poolCellWidget(child);
          }
        }
      }


      var top = 0;
      var left = 0;
      var visibleItems = [];

      for (var y=0; y<rowSizes.length; y++)
      {
        for (var x=0; x<columnSizes.length; x++)
        {
          var row = firstRow + y;
          var column = firstColumn + x;

          var item =
            widgetsToMove[row][column] ||
            cellProvider.getCellWidget(row, column) ||
            this._getSpacer();

          visibleItems.push(item);

          item.setUserBounds(left, top, columnSizes[x], rowSizes[y]);
          item.setUserData("cell.row", row);
          item.setUserData("cell.column", column);
          this._add(item);

          left += columnSizes[x];
        }
        top += rowSizes[y];
        left = 0;
      }
      children.forEach(function(child){
        if (visibleItems.indexOf(child) === -1) {
          this._remove(child);
        }
      }.bind(this));

      this.fireEvent("updated");
    }
  },

  destruct : function()
  {
    var children = this._getChildren();
    for (var i=0; i<children.length; i++) {
      children[i].dispose();
    }

    this._cellProvider = this.__spacerPool = null;
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
     * Fabian Jakobs (fjakobs)
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * A widget cell renderer manages a pool of widgets to render cells in a
 * {@link qx.ui.virtual.layer.WidgetCell} layer.
 */
qx.Interface.define("qx.ui.virtual.cell.IWidgetCell",
{
  members :
  {
    /**
     * Get a widget instance to render the cell
     *
     * @param data {var} Data needed for the cell to render.
     * @param states {Map} The states set on the cell (e.g. <i>selected</i>,
     * <i>focused</i>, <i>editable</i>).
     *
     * @return {qx.ui.core.LayoutItem} The cell widget
     */
    getCellWidget : function(data, states) {},


    /**
     * Release the given widget instance.
     *
     * Either pool or dispose the widget.
     *
     * @param widget {qx.ui.core.LayoutItem} The cell widget to pool
     */
    pool : function(widget) {},


    /**
     * Update the states of the given widget.
     *
     * @param widget {qx.ui.core.LayoutItem} The cell widget to update
     * @param states {Map} The cell widget's states
     */
    updateStates : function(widget, states) {},


    /**
     * Update the data the cell widget should display
     *
     * @param widget {qx.ui.core.LayoutItem} The cell widget to update
     * @param data {var} The data to display
     */
    updateData : function(widget, data) {}
  }
});
/**
 * Abstract base class for widget based cell renderer.
 */
qx.Class.define("qx.ui.virtual.cell.AbstractWidget",
{
  extend : qx.core.Object,
  implement : [qx.ui.virtual.cell.IWidgetCell],


  construct : function()
  {
    this.base(arguments);

    this.__pool = [];
  },


  events :
  {
    /** Fired when a new <code>LayoutItem</code> is created. */
    "created" : "qx.event.type.Data"
  },


  members :
  {
    __pool : null,


    /**
     * Creates the widget instance.
     *
     * @abstract
     * @return {qx.ui.core.LayoutItem} The widget used to render a cell
     */
    _createWidget : function() {
      throw new Error("abstract method call");
    },


    // interface implementation
    updateData : function(widget, data) {
      throw new Error("abstract method call");
    },


    // interface implementation
    updateStates : function(widget, states)
    {
      var oldStates = widget.getUserData("cell.states");

      // remove old states
      if (oldStates)
      {
        var newStates = states || {};
        for (var state in oldStates)
        {
          if (!newStates[state]) {
            widget.removeState(state);
          }
        }
      }
      else
      {
        oldStates = {};
      }

      // apply new states
      if (states)
      {
        for (var state in states)
        {
          if (!oldStates.state) {
            widget.addState(state);
          }
        }
      }

      widget.setUserData("cell.states", states);
    },


    // interface implementation
    getCellWidget : function(data, states)
    {
      var widget = this.__getWidgetFromPool();
      this.updateStates(widget, states);
      this.updateData(widget, data);
      return widget;
    },


    // interface implementation
    pool : function(widget) {
      this.__pool.push(widget);
    },

    /**
     * Cleanup all <code>LayoutItem</code> and destroy them.
     */
    _cleanupPool : function() {
      var widget = this.__pool.pop();

      while(widget)
      {
        widget.destroy();
        widget = this.__pool.pop();
      }
    },

    /**
     * Returns a <code>LayoutItem</code> from the pool, when the pool is empty
     * a new <code>LayoutItem</code> is created.
     *
     * @return {qx.ui.core.LayoutItem} The cell widget
     */
    __getWidgetFromPool : function()
    {
      var widget = this.__pool.shift();

      if (widget == null)
      {
        widget = this._createWidget();
        this.fireDataEvent("created", widget);
      }

      return widget;
    }
  },

  /*
   *****************************************************************************
      DESTRUCT
   *****************************************************************************
   */

  destruct : function()
  {
    this._cleanupPool();
    this.__pool = null;
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
     * Christian Hagendorn (chris_schmidt)

************************************************************************ */

/**
 * EXPERIMENTAL!
 *
 * Cell renderer can be used for Widget rendering. The Widget creation can be configured with the
 * {@link #delegate} property:
 *
 * <pre class="javascript">
 * widgetCell.setDelegate(
 * {
 *   createWidget : function() {
 *     return new qx.ui.form.ListItem();
 *   }
 * });
 * </pre>
 *
 * When the {@link #delegate} property is not used {@link qx.ui.core.Widget} instances are created as
 * fallback.
 *
 * The {@link #updateData} method can be used to update any Widget property. Just use a <code>Map</code>
 * with property name as key:
 *
 * <pre class="javascript">
 * // widget is a qx.ui.form.ListItem instance
 * widgetCell.updateData(widget,
 * {
 *   label: "my label value",
 *   icon: "qx/icon/22/emotes/face-angel.png"
 * });
 * </pre>
 */
qx.Class.define("qx.ui.virtual.cell.WidgetCell",
{
  extend : qx.ui.virtual.cell.AbstractWidget,

  properties :
  {
    /**
     * Delegation object, which can have one or more functions defined by the
     * {@link qx.ui.virtual.cell.IWidgetCellDelegate} interface.
     */
    delegate :
    {
      apply: "_applyDelegate",
      init: null,
      nullable: true
    }
  },

  members :
  {
    // apply method
    _applyDelegate : function(value, old) {
      this._cleanupPool();
    },

    // overridden
    _createWidget : function() {
      var delegate = this.getDelegate();

      if (delegate != null && delegate.createWidget != null) {
        return delegate.createWidget();
      } else {
        return new qx.ui.core.Widget();
      }
    },

    // overridden
    updateData : function(widget, data) {
      for (var key in data)
      {
        if (qx.Class.hasProperty(widget.constructor, key)) {
          qx.util.PropertyUtil.setUserValue(widget, key, data[key]);
        } else {
          throw new Error("Can't update data! The key '" + key + "' is not a Property!");
        }
      }
    }
  }
});
