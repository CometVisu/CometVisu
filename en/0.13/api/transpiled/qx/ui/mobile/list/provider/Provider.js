(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.bom.Element": {},
      "qx.util.Delegate": {},
      "qx.ui.mobile.list.renderer.group.Default": {},
      "qx.ui.mobile.list.renderer.Default": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
  
  ************************************************************************ */

  /**
   * Provides a list item element for a certain row and its data.
   * Uses the {@link qx.ui.mobile.list.renderer.Default} list item renderer as a
   * default renderer when no other renderer is given by the {@link qx.ui.mobile.list.List#delegate}.
   */
  qx.Class.define("qx.ui.mobile.list.provider.Provider", {
    extend: qx.core.Object,
    properties: {
      /**
       * Delegation object which can have one or more functions defined by the
       * {@link qx.ui.mobile.list.IListDelegate} interface. Set by the list.
       *
       * @internal
       */
      delegate: {
        event: "changeDelegate",
        init: null,
        nullable: true,
        apply: "_applyDelegate"
      }
    },
    members: {
      __P_637_0: null,
      __P_637_1: null,
      /**
       * Sets the item renderer.
       *
       * @param renderer {qx.ui.mobile.list.renderer.Abstract} The used item renderer
       */
      _setItemRenderer: function _setItemRenderer(renderer) {
        this.__P_637_0 = renderer;
      },
      /**
       * Returns the set item renderer.
       *
       * @return {qx.ui.mobile.list.renderer.Abstract} The used item renderer
       */
      _getItemRenderer: function _getItemRenderer() {
        return this.__P_637_0;
      },
      /**
       * Sets the group renderer.
       * @param renderer {qx.ui.mobile.list.renderer.group.Abstract} the group renderer.
       */
      _setGroupRenderer: function _setGroupRenderer(renderer) {
        this.__P_637_1 = renderer;
      },
      /**
       * Gets the group renderer.
       * @return {qx.ui.mobile.list.renderer.group.Abstract} the group renderer.
       */
      _getGroupRenderer: function _getGroupRenderer() {
        return this.__P_637_1;
      },
      /**
       * Returns the list item element for a given row.
       *
       * @param data {var} The data of the row.
       * @param row {Integer} The row index.
       *
       * @return {Element} the list item element.
       */
      getItemElement: function getItemElement(data, row) {
        this.__P_637_0.reset();
        this._configureItem(data, row);

        // Clone the element and all it's events
        var clone = qx.bom.Element.clone(this.__P_637_0.getContainerElement(), true);
        clone.setAttribute("data-row", row);
        return clone;
      },
      /**
       * Returns the group item element for a given row.
       *
       * @param data {var} The data of the group.
       * @param group {Integer} The group index.
       *
       * @return {Element} the group item element.
       */
      getGroupElement: function getGroupElement(data, group) {
        this.__P_637_1.reset();
        this._configureGroupItem(data, group);

        // Clone the element and all it's events
        var clone = qx.bom.Element.clone(this.__P_637_1.getContainerElement(), true);
        clone.removeAttribute("id");
        clone.setAttribute("data-group", group);
        return clone;
      },
      /**
       * Configure the list item renderer with the passed data.
       *
       * @param data {var} The data of the row.
       * @param row {Integer} The row index.
       */
      _configureItem: function _configureItem(data, row) {
        var delegate = this.getDelegate();
        if (delegate != null && delegate.configureItem != null) {
          delegate.configureItem(this.__P_637_0, data, row);
        }
      },
      /**
       * Configures the group renderer with the passed group data.
       * @param data {var} The data of the group.
       * @param group {Integer} The group index.
       */
      _configureGroupItem: function _configureGroupItem(data, group) {
        var configureGroupItem = qx.util.Delegate.getMethod(this.getDelegate(), "configureGroupItem");
        if (configureGroupItem) {
          configureGroupItem(this.__P_637_1, data, group);
        }
      },
      /**
       * Creates an instance of the group renderer to use. When no delegate method
       * is given the function will return an instance of {@link qx.ui.mobile.list.renderer.group.Default}.
       *
       * @return {qx.ui.mobile.list.renderer.group.Abstract} An instance of the group renderer.
       */
      _createGroupRenderer: function _createGroupRenderer() {
        var createGroupRenderer = qx.util.Delegate.getMethod(this.getDelegate(), "createGroupRenderer");
        var groupRenderer = null;
        if (createGroupRenderer == null) {
          groupRenderer = new qx.ui.mobile.list.renderer.group.Default();
        } else {
          groupRenderer = createGroupRenderer();
        }
        return groupRenderer;
      },
      /**
       * Creates an instance of the item renderer to use. When no delegate method
       * is given the function will return an instance of {@link qx.ui.mobile.list.renderer.Default}.
       *
       * @return {qx.ui.mobile.list.renderer.Abstract} An instance of the item renderer.
       *
       */
      _createItemRenderer: function _createItemRenderer() {
        var createItemRenderer = qx.util.Delegate.getMethod(this.getDelegate(), "createItemRenderer");
        var itemRenderer = null;
        if (createItemRenderer == null) {
          itemRenderer = new qx.ui.mobile.list.renderer.Default();
        } else {
          itemRenderer = createItemRenderer();
        }
        return itemRenderer;
      },
      // property apply
      _applyDelegate: function _applyDelegate(value, old) {
        this._setItemRenderer(this._createItemRenderer());
        this._setGroupRenderer(this._createGroupRenderer());
      }
    },
    destruct: function destruct() {
      this._disposeObjects("__P_637_0", "__P_637_1");
    }
  });
  qx.ui.mobile.list.provider.Provider.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Provider.js.map?dt=1717235414551