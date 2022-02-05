(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.virtual.core.Axis": {
        "construct": true
      },
      "qx.ui.container.Composite": {
        "construct": true
      },
      "qx.event.Timer": {},
      "qx.ui.virtual.core.CellEvent": {},
      "qx.lang.Array": {},
      "qx.ui.core.queue.Widget": {}
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
   * The Pane provides a window of a larger virtual grid.
   *
   * The actual rendering is performed by one or several layers ({@link ILayer}.
   * The pane computes, which cells of the virtual area is visible and instructs
   * the layers to render these cells.
   */
  qx.Class.define("qx.ui.virtual.core.Pane", {
    extend: qx.ui.core.Widget,

    /**
     * @param rowCount {Integer?0} The number of rows of the virtual grid.
     * @param columnCount {Integer?0} The number of columns of the virtual grid.
     * @param cellHeight {Integer?10} The default cell height.
     * @param cellWidth {Integer?10} The default cell width.
     */
    construct: function construct(rowCount, columnCount, cellHeight, cellWidth) {
      qx.ui.core.Widget.constructor.call(this);
      this.__P_441_0 = new qx.ui.virtual.core.Axis(cellHeight, rowCount);
      this.__P_441_1 = new qx.ui.virtual.core.Axis(cellWidth, columnCount);
      this.__P_441_2 = 0;
      this.__P_441_3 = 0;
      this.__P_441_4 = 0;
      this.__P_441_5 = 0;
      this.__P_441_6 = {};
      this.__P_441_7 = {}; // create layer container. The container does not have a layout manager
      // layers are positioned using "setUserBounds"

      this.__P_441_8 = new qx.ui.container.Composite();

      this.__P_441_8.setUserBounds(0, 0, 0, 0);

      this._add(this.__P_441_8);

      this.__P_441_9 = [];

      this.__P_441_0.addListener("change", this.fullUpdate, this);

      this.__P_441_1.addListener("change", this.fullUpdate, this);

      this.addListener("resize", this._onResize, this);
      this.addListenerOnce("appear", this._onAppear, this);
      this.addListener("pointerdown", this._onPointerDown, this);
      this.addListener("tap", this._onTap, this);
      this.addListener("dbltap", this._onDbltap, this);
      this.addListener("contextmenu", this._onContextmenu, this);
    },
    events: {
      /** Fired if a cell is tapped. */
      cellTap: "qx.ui.virtual.core.CellEvent",

      /** Fired if a cell is right-clicked. */
      cellContextmenu: "qx.ui.virtual.core.CellEvent",

      /** Fired if a cell is double-tapped. */
      cellDbltap: "qx.ui.virtual.core.CellEvent",

      /** Fired on resize of either the container or the (virtual) content. */
      update: "qx.event.type.Event",

      /** Fired if the pane is scrolled horizontally. */
      scrollX: "qx.event.type.Data",

      /** Fired if the pane is scrolled vertically. */
      scrollY: "qx.event.type.Data"
    },
    properties: {
      // overridden
      width: {
        refine: true,
        init: 400
      },
      // overridden
      height: {
        refine: true,
        init: 300
      }
    },
    members: {
      __P_441_0: null,
      __P_441_1: null,
      __P_441_2: null,
      __P_441_3: null,
      __P_441_4: null,
      __P_441_5: null,
      __P_441_6: null,
      __P_441_7: null,
      __P_441_8: null,
      __P_441_9: null,
      __P_441_10: null,
      __P_441_11: null,
      __P_441_12: null,
      __P_441_13: null,

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
      getRowConfig: function getRowConfig() {
        return this.__P_441_0;
      },

      /**
       * Get the axis object, which defines the column numbers and the column sizes.
       *
       * @return {qx.ui.virtual.core.Axis} The column configuration.
       */
      getColumnConfig: function getColumnConfig() {
        return this.__P_441_1;
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
      getChildren: function getChildren() {
        return [this.__P_441_8];
      },

      /**
       * Add a layer to the layer container.
       *
       * @param layer {qx.ui.virtual.core.ILayer} The layer to add.
       */
      addLayer: function addLayer(layer) {
        this.__P_441_9.push(layer);

        layer.setUserBounds(0, 0, 0, 0);

        this.__P_441_8.add(layer);
      },

      /**
       * Get a list of all layers.
       *
       * @return {qx.ui.virtual.core.ILayer[]} List of the pane's layers.
       */
      getLayers: function getLayers() {
        return this.__P_441_9;
      },

      /**
       * Get a list of all visible layers.
       *
       * @return {qx.ui.virtual.core.ILayer[]} List of the pane's visible layers.
       */
      getVisibleLayers: function getVisibleLayers() {
        var layers = [];

        for (var i = 0; i < this.__P_441_9.length; i++) {
          var layer = this.__P_441_9[i];

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
      getScrollMaxX: function getScrollMaxX() {
        var paneSize = this.getInnerSize();

        if (paneSize) {
          return Math.max(0, this.__P_441_1.getTotalSize() - paneSize.width);
        }

        return 0;
      },

      /**
       * The maximum vertical scroll position.
       *
       * @return {Integer} Maximum vertical scroll position.
       */
      getScrollMaxY: function getScrollMaxY() {
        var paneSize = this.getInnerSize();

        if (paneSize) {
          return Math.max(0, this.__P_441_0.getTotalSize() - paneSize.height);
        }

        return 0;
      },

      /**
       * Scrolls the content to the given left coordinate.
       *
       * @param value {Integer} The vertical position to scroll to.
       */
      setScrollY: function setScrollY(value) {
        var max = this.getScrollMaxY();

        if (value < 0) {
          value = 0;
        } else if (value > max) {
          value = max;
        }

        if (this.__P_441_2 !== value) {
          var old = this.__P_441_2;
          this.__P_441_2 = value;

          this._deferredUpdateScrollPosition();

          this.fireDataEvent("scrollY", value, old);
        }
      },

      /**
       * Returns the vertical scroll offset.
       *
       * @return {Integer} The vertical scroll offset.
       */
      getScrollY: function getScrollY() {
        return this.__P_441_2;
      },

      /**
       * Scrolls the content to the given top coordinate.
       *
       * @param value {Integer} The horizontal position to scroll to.
       */
      setScrollX: function setScrollX(value) {
        var max = this.getScrollMaxX();

        if (value < 0) {
          value = 0;
        } else if (value > max) {
          value = max;
        }

        if (value !== this.__P_441_3) {
          var old = this.__P_441_3;
          this.__P_441_3 = value;

          this._deferredUpdateScrollPosition();

          this.fireDataEvent("scrollX", value, old);
        }
      },

      /**
       * Returns the horizontal scroll offset.
       *
       * @return {Integer} The horizontal scroll offset.
       */
      getScrollX: function getScrollX() {
        return this.__P_441_3;
      },

      /**
       * The (virtual) size of the content.
       *
       * @return {Map} Size of the content (keys: <code>width</code> and
       *     <code>height</code>).
       */
      getScrollSize: function getScrollSize() {
        return {
          width: this.__P_441_1.getTotalSize(),
          height: this.__P_441_0.getTotalSize()
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
      scrollRowIntoView: function scrollRowIntoView(row) {
        var bounds = this.getBounds();

        if (!bounds) {
          this.addListenerOnce("appear", function () {
            // It's important that the registered events are first dispatched.
            qx.event.Timer.once(function () {
              this.scrollRowIntoView(row);
            }, this, 0);
          }, this);
          return;
        }

        var itemTop = this.__P_441_0.getItemPosition(row);

        var itemBottom = itemTop + this.__P_441_0.getItemSize(row);

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
      scrollColumnIntoView: function scrollColumnIntoView(column) {
        var bounds = this.getBounds();

        if (!bounds) {
          this.addListenerOnce("appear", function () {
            // It's important that the registered events are first dispatched.
            qx.event.Timer.once(function () {
              this.scrollColumnIntoView(column);
            }, this, 0);
          }, this);
          return;
        }

        var itemLeft = this.__P_441_1.getItemPosition(column);

        var itemRight = itemLeft + this.__P_441_1.getItemSize(column);

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
      scrollCellIntoView: function scrollCellIntoView(column, row) {
        var bounds = this.getBounds();

        if (!bounds) {
          this.addListenerOnce("appear", function () {
            // It's important that the registered events are first dispatched.
            qx.event.Timer.once(function () {
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
      getCellAtPosition: function getCellAtPosition(documentX, documentY) {
        var rowData, columnData;
        var paneLocation = this.getContentLocation();

        if (!paneLocation || documentY < paneLocation.top || documentY >= paneLocation.bottom || documentX < paneLocation.left || documentX >= paneLocation.right) {
          return null;
        }

        rowData = this.__P_441_0.getItemAtPosition(this.getScrollY() + documentY - paneLocation.top);
        columnData = this.__P_441_1.getItemAtPosition(this.getScrollX() + documentX - paneLocation.left);

        if (!rowData || !columnData) {
          return null;
        }

        return {
          row: rowData.index,
          column: columnData.index
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
      prefetchX: function prefetchX(minLeft, maxLeft, minRight, maxRight) {
        var layers = this.getVisibleLayers();

        if (layers.length == 0) {
          return;
        }

        var bounds = this.getBounds();

        if (!bounds) {
          return;
        }

        var paneRight = this.__P_441_3 + bounds.width;
        var rightAvailable = this.__P_441_5 - paneRight;

        if (this.__P_441_3 - this.__P_441_6.left < Math.min(this.__P_441_3, minLeft) || this.__P_441_6.right - paneRight < Math.min(rightAvailable, minRight)) {
          var left = Math.min(this.__P_441_3, maxLeft);
          var right = Math.min(rightAvailable, maxRight);

          this._setLayerWindow(layers, this.__P_441_3 - left, this.__P_441_2, bounds.width + left + right, bounds.height, false);
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
      prefetchY: function prefetchY(minAbove, maxAbove, minBelow, maxBelow) {
        var layers = this.getVisibleLayers();

        if (layers.length == 0) {
          return;
        }

        var bounds = this.getBounds();

        if (!bounds) {
          return;
        }

        var paneBottom = this.__P_441_2 + bounds.height;
        var belowAvailable = this.__P_441_4 - paneBottom;

        if (this.__P_441_2 - this.__P_441_6.top < Math.min(this.__P_441_2, minAbove) || this.__P_441_6.bottom - paneBottom < Math.min(belowAvailable, minBelow)) {
          var above = Math.min(this.__P_441_2, maxAbove);
          var below = Math.min(belowAvailable, maxBelow);

          this._setLayerWindow(layers, this.__P_441_3, this.__P_441_2 - above, bounds.width, bounds.height + above + below, false);
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
      _onResize: function _onResize() {
        if (this.getContentElement().getDomElement()) {
          this.__P_441_10 = true;

          this._updateScrollPosition();

          this.__P_441_10 = null;
          this.fireEvent("update");
        }
      },

      /**
       * Resize event handler. Do a full update on first appear.
       */
      _onAppear: function _onAppear() {
        this.fullUpdate();
      },

      /**
       * Event listener for pointer down. Remembers cell position to prevent pointer event when cell position change.
       *
       * @param e {qx.event.type.Pointer} The incoming pointer event.
       */
      _onPointerDown: function _onPointerDown(e) {
        this.__P_441_13 = this.getCellAtPosition(e.getDocumentLeft(), e.getDocumentTop());
      },

      /**
       * Event listener for pointer taps. Fires an cellTap event.
       *
       * @param e {qx.event.type.Pointer} The incoming pointer event.
       */
      _onTap: function _onTap(e) {
        this.__P_441_14(e, "cellTap");
      },

      /**
       * Event listener for context menu taps. Fires an cellContextmenu event.
       *
       * @param e {qx.event.type.Pointer} The incoming pointer event.
       */
      _onContextmenu: function _onContextmenu(e) {
        this.__P_441_14(e, "cellContextmenu");
      },

      /**
       * Event listener for double taps. Fires an cellDbltap event.
       *
       * @param e {qx.event.type.Pointer} The incoming pointer event.
       */
      _onDbltap: function _onDbltap(e) {
        this.__P_441_14(e, "cellDbltap");
      },

      /**
       * Fixed scrollbar position whenever it is out of range
       * it can happen when removing an item from the list reducing
       * the max value for scrollY #8976
       */
      _checkScrollBounds: function _checkScrollBounds() {
        var maxx = this.getScrollMaxX();
        var maxy = this.getScrollMaxY();

        if (this.__P_441_3 < 0) {
          this.__P_441_3 = 0;
        } else if (this.__P_441_3 > maxx) {
          this.__P_441_3 = maxx;
        }

        if (this.__P_441_2 < 0) {
          this.__P_441_2 = 0;
        } else if (this.__P_441_2 > maxy) {
          this.__P_441_2 = maxy;
        }
      },

      /**
       * Converts a pointer event into a cell event and fires the cell event if the
       * pointer is over a cell.
       *
       * @param e {qx.event.type.Pointer} The pointer event.
       * @param cellEventType {String} The name of the cell event to fire.
       */
      __P_441_14: function __P_441_14(e, cellEventType) {
        var coords = this.getCellAtPosition(e.getDocumentLeft(), e.getDocumentTop());

        if (!coords) {
          return;
        }

        var pointerDownCoords = this.__P_441_13;

        if (pointerDownCoords == null || pointerDownCoords.row !== coords.row || pointerDownCoords.column !== coords.column) {
          return;
        }

        this.fireNonBubblingEvent(cellEventType, qx.ui.virtual.core.CellEvent, [this, e, coords.row, coords.column]);
      },

      /*
      ---------------------------------------------------------------------------
        PANE UPDATE
      ---------------------------------------------------------------------------
      */
      // overridden
      syncWidget: function syncWidget(jobs) {
        if (this.__P_441_7._fullUpdate) {
          this._checkScrollBounds();

          this._fullUpdate();
        } else if (this.__P_441_7._updateScrollPosition) {
          this._checkScrollBounds();

          this._updateScrollPosition();
        }

        this.__P_441_7 = {};
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
      _setLayerWindow: function _setLayerWindow(layers, left, top, minWidth, minHeight, doFullUpdate) {
        var rowCellData = this.__P_441_0.getItemAtPosition(top);

        if (rowCellData) {
          var firstRow = rowCellData.index;

          var rowSizes = this.__P_441_0.getItemSizes(firstRow, minHeight + rowCellData.offset);

          var layerHeight = qx.lang.Array.sum(rowSizes);
          var layerTop = top - rowCellData.offset;
          var layerBottom = top - rowCellData.offset + layerHeight;
        } else {
          var firstRow = 0;
          var rowSizes = [];
          var layerHeight = 0;
          var layerTop = 0;
          var layerBottom = 0;
        }

        var columnCellData = this.__P_441_1.getItemAtPosition(left);

        if (columnCellData) {
          var firstColumn = columnCellData.index;

          var columnSizes = this.__P_441_1.getItemSizes(firstColumn, minWidth + columnCellData.offset);

          var layerWidth = qx.lang.Array.sum(columnSizes);
          var layerLeft = left - columnCellData.offset;
          var layerRight = left - columnCellData.offset + layerWidth;
        } else {
          var firstColumn = 0;
          var columnSizes = [];
          var layerWidth = 0;
          var layerLeft = 0;
          var layerRight = 0;
        }

        this.__P_441_6 = {
          top: layerTop,
          bottom: layerBottom,
          left: layerLeft,
          right: layerRight
        };

        this.__P_441_8.setUserBounds((this.getPaddingLeft() || 0) + (this.__P_441_6.left - this.__P_441_3), (this.getPaddingTop() || 0) + (this.__P_441_6.top - this.__P_441_2), layerWidth, layerHeight);

        this.__P_441_11 = columnSizes;
        this.__P_441_12 = rowSizes;

        for (var i = 0; i < this.__P_441_9.length; i++) {
          var layer = this.__P_441_9[i];
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
      __P_441_15: function __P_441_15() {
        if (this.__P_441_10) {
          return;
        }

        var scrollSize = this.getScrollSize();

        if (this.__P_441_4 !== scrollSize.height || this.__P_441_5 !== scrollSize.width) {
          this.__P_441_4 = scrollSize.height;
          this.__P_441_5 = scrollSize.width;
          this.fireEvent("update");
        }
      },

      /**
       * Schedule a full update on all visible layers.
       */
      fullUpdate: function fullUpdate() {
        this.__P_441_7._fullUpdate = 1;
        qx.ui.core.queue.Widget.add(this);
      },

      /**
       * Whether a full update is scheduled.
       *
       * @return {Boolean} Whether a full update is scheduled.
       */
      isUpdatePending: function isUpdatePending() {
        return !!this.__P_441_7._fullUpdate;
      },

      /**
       * Perform a full update on all visible layers. All cached data will be
       * discarded.
       */
      _fullUpdate: function _fullUpdate() {
        var layers = this.getVisibleLayers();

        if (layers.length == 0) {
          this.__P_441_15();

          return;
        }

        var bounds = this.getBounds();

        if (!bounds) {
          return; // the pane has not yet been rendered -> wait for the appear event
        }

        this._setLayerWindow(layers, this.__P_441_3, this.__P_441_2, bounds.width, bounds.height, true);

        this.__P_441_15();
      },

      /**
       * Schedule an update the visible window of the grid according to the top
       * and left scroll positions.
       */
      _deferredUpdateScrollPosition: function _deferredUpdateScrollPosition() {
        this.__P_441_7._updateScrollPosition = 1;
        qx.ui.core.queue.Widget.add(this);
      },

      /**
       * Update the visible window of the grid according to the top and left scroll
       * positions.
       */
      _updateScrollPosition: function _updateScrollPosition() {
        var layers = this.getVisibleLayers();

        if (layers.length == 0) {
          this.__P_441_15();

          return;
        }

        var bounds = this.getBounds();

        if (!bounds) {
          return; // the pane has not yet been rendered -> wait for the appear event
        } // the visible window of the virtual coordinate space


        var paneWindow = {
          top: this.__P_441_2,
          bottom: this.__P_441_2 + bounds.height,
          left: this.__P_441_3,
          right: this.__P_441_3 + bounds.width
        };

        if (this.__P_441_6.top <= paneWindow.top && this.__P_441_6.bottom >= paneWindow.bottom && this.__P_441_6.left <= paneWindow.left && this.__P_441_6.right >= paneWindow.right) {
          // only update layer container offset
          this.__P_441_8.setUserBounds((this.getPaddingLeft() || 0) + (this.__P_441_6.left - paneWindow.left), (this.getPaddingTop() || 0) + (this.__P_441_6.top - paneWindow.top), this.__P_441_6.right - this.__P_441_6.left, this.__P_441_6.bottom - this.__P_441_6.top);
        } else {
          this._setLayerWindow(layers, this.__P_441_3, this.__P_441_2, bounds.width, bounds.height, false);
        }

        this.__P_441_15();
      }
    },
    destruct: function destruct() {
      this._disposeArray("__P_441_9");

      this._disposeObjects("__P_441_0", "__P_441_1", "__P_441_8");

      this.__P_441_6 = this.__P_441_7 = this.__P_441_11 = this.__P_441_12 = null;
    }
  });
  qx.ui.virtual.core.Pane.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Pane.js.map?dt=1644052390725