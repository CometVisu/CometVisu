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
      "qx.ui.virtual.core.ILayer": {
        "require": true
      },
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
  
  ************************************************************************ */

  /**
   * Abstract base class for layers of a virtual pane.
   *
   * This class queues calls to {@link #fullUpdate}, {@link #updateLayerWindow}
   * and {@link #updateLayerData} and only performs the absolute necessary
   * actions. Concrete implementation of this class must at least implement
   * the {@link #_fullUpdate} method. Additionally the two methods
   * {@link #_updateLayerWindow} and {@link #_updateLayerData} may be implemented
   * to increase the performance.
   */
  qx.Class.define("qx.ui.virtual.layer.Abstract", {
    extend: qx.ui.core.Widget,
    type: "abstract",
    implement: [qx.ui.virtual.core.ILayer],

    /*
     *****************************************************************************
        CONSTRUCTOR
     *****************************************************************************
     */
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this);
      this.__P_432_0 = {};
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      anonymous: {
        refine: true,
        init: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_432_0: null,
      __P_432_1: null,
      __P_432_2: null,
      __P_432_3: null,
      __P_432_4: null,
      __P_432_5: null,

      /**
       * Get the first rendered row
       *
       * @return {Integer} The first rendered row
       */
      getFirstRow: function getFirstRow() {
        return this.__P_432_2;
      },

      /**
       * Get the first rendered column
       *
       * @return {Integer} The first rendered column
       */
      getFirstColumn: function getFirstColumn() {
        return this.__P_432_3;
      },

      /**
       * Get the sizes of the rendered rows
       *
       * @return {Integer[]} List of row heights
       */
      getRowSizes: function getRowSizes() {
        return this.__P_432_4 || [];
      },

      /**
       * Get the sizes of the rendered column
       *
       * @return {Integer[]} List of column widths
       */
      getColumnSizes: function getColumnSizes() {
        return this.__P_432_5 || [];
      },
      // overridden
      syncWidget: function syncWidget(jobs) {
        // return if the layer is not yet rendered
        // it will rendered in the appear event
        if (!this.getContentElement().getDomElement()) {
          return;
        }

        if (this.__P_432_0.fullUpdate || this.__P_432_0.updateLayerWindow && this.__P_432_0.updateLayerData) {
          this._fullUpdate.apply(this, this.__P_432_1);
        } else if (this.__P_432_0.updateLayerWindow) {
          this._updateLayerWindow.apply(this, this.__P_432_1);
        } else if (this.__P_432_0.updateLayerData && this.__P_432_4) {
          this._updateLayerData();
        }

        if (this.__P_432_0.fullUpdate || this.__P_432_0.updateLayerWindow) {
          var args = this.__P_432_1;
          this.__P_432_2 = args[0];
          this.__P_432_3 = args[1];
          this.__P_432_4 = args[2];
          this.__P_432_5 = args[3];
        }

        this.__P_432_0 = {};
      },

      /**
       * Update the layer to reflect changes in the data the layer displays.
       *
       * Note: It is guaranteed that this method is only called after the layer
       * has been rendered.
       */
      _updateLayerData: function _updateLayerData() {
        this._fullUpdate(this.__P_432_2, this.__P_432_3, this.__P_432_4, this.__P_432_5);
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
      _fullUpdate: function _fullUpdate(firstRow, firstColumn, rowSizes, columnSizes) {
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
      _updateLayerWindow: function _updateLayerWindow(firstRow, firstColumn, rowSizes, columnSizes) {
        this._fullUpdate(firstRow, firstColumn, rowSizes, columnSizes);
      },
      // interface implementation
      updateLayerData: function updateLayerData() {
        this.__P_432_0.updateLayerData = true;
        qx.ui.core.queue.Widget.add(this);
      },
      // interface implementation
      fullUpdate: function fullUpdate(firstRow, firstColumn, rowSizes, columnSizes) {
        this.__P_432_1 = arguments;
        this.__P_432_0.fullUpdate = true;
        qx.ui.core.queue.Widget.add(this);
      },
      // interface implementation
      updateLayerWindow: function updateLayerWindow(firstRow, firstColumn, rowSizes, columnSizes) {
        this.__P_432_1 = arguments;
        this.__P_432_0.updateLayerWindow = true;
        qx.ui.core.queue.Widget.add(this);
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__P_432_0 = this.__P_432_1 = this.__P_432_4 = this.__P_432_5 = null;
    }
  });
  qx.ui.virtual.layer.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Abstract.js.map?dt=1613588124516