(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.scroll.AbstractScrollArea": {
        "construct": true,
        "require": true
      },
      "qx.ui.virtual.core.Pane": {
        "construct": true
      },
      "qx.bom.client.Scroll": {
        "construct": true,
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "os.scrollBarOverlayed": {
          "construct": true,
          "className": "qx.bom.client.Scroll"
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
   * The Scroller wraps a {@link Pane} and provides scroll bars to interactively
   * scroll the pane's content.
   *
   * @childControl pane {qx.ui.virtual.core.Pane} Virtual pane.
   */
  qx.Class.define("qx.ui.virtual.core.Scroller", {
    extend: qx.ui.core.scroll.AbstractScrollArea,

    /**
     * @param rowCount {Integer?0} The number of rows of the virtual grid.
     * @param columnCount {Integer?0} The number of columns of the virtual grid.
     * @param cellHeight {Integer?10} The default cell height.
     * @param cellWidth {Integer?10} The default cell width.
     */
    construct: function construct(rowCount, columnCount, cellHeight, cellWidth) {
      qx.ui.core.scroll.AbstractScrollArea.constructor.call(this);
      this.__P_431_0 = new qx.ui.virtual.core.Pane(rowCount, columnCount, cellHeight, cellWidth);

      this.__P_431_0.addListener("update", this._computeScrollbars, this);

      this.__P_431_0.addListener("scrollX", this._onScrollPaneX, this);

      this.__P_431_0.addListener("scrollY", this._onScrollPaneY, this);

      if (qx.core.Environment.get("os.scrollBarOverlayed")) {
        this._add(this.__P_431_0, {
          edge: 0
        });
      } else {
        this._add(this.__P_431_0, {
          row: 0,
          column: 0
        });
      }
    },
    members: {
      /** @type {qx.ui.virtual.core.Pane} Virtual pane. */
      __P_431_0: null,

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
      getPane: function getPane() {
        return this.__P_431_0;
      },

      /*
      ---------------------------------------------------------------------------
        CHILD CONTROL SUPPORT
      ---------------------------------------------------------------------------
      */
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        if (id === "pane") {
          return this.__P_431_0;
        } else {
          return qx.ui.virtual.core.Scroller.prototype._createChildControlImpl.base.call(this, id);
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
      getItemTop: function getItemTop(item) {
        throw new Error("The method 'getItemTop' is not implemented!");
      },

      /**
       * NOT IMPLEMENTED
       *
       * @param item {qx.ui.core.Widget} Item to query.
       * @return {Integer} Top offset.
       * @abstract
       */
      getItemBottom: function getItemBottom(item) {
        throw new Error("The method 'getItemBottom' is not implemented!");
      },

      /**
       * NOT IMPLEMENTED
       *
       * @param item {qx.ui.core.Widget} Item to query.
       * @return {Integer} Top offset.
       * @abstract
       */
      getItemLeft: function getItemLeft(item) {
        throw new Error("The method 'getItemLeft' is not implemented!");
      },

      /**
       * NOT IMPLEMENTED
       *
       * @param item {qx.ui.core.Widget} Item to query.
       * @return {Integer} Right offset.
       * @abstract
       */
      getItemRight: function getItemRight(item) {
        throw new Error("The method 'getItemRight' is not implemented!");
      },

      /*
      ---------------------------------------------------------------------------
        EVENT LISTENERS
      ---------------------------------------------------------------------------
      */
      // overridden
      _onScrollBarX: function _onScrollBarX(e) {
        this.__P_431_0.setScrollX(e.getData());
      },
      // overridden
      _onScrollBarY: function _onScrollBarY(e) {
        this.__P_431_0.setScrollY(e.getData());
      }
    },
    destruct: function destruct() {
      this.__P_431_0.dispose();

      this.__P_431_0 = null;
    }
  });
  qx.ui.virtual.core.Scroller.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Scroller.js.map?dt=1612698488707