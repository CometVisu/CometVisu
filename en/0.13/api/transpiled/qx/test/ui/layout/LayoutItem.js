(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.LayoutItem": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.queue.Layout": {},
      "qx.ui.core.queue.Visibility": {},
      "qx.lang.Array": {}
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

  qx.Class.define("qx.test.ui.layout.LayoutItem", {
    extend: qx.ui.core.LayoutItem,
    construct: function construct(width, height) {
      qx.ui.core.LayoutItem.constructor.call(this);
      if (width !== undefined) {
        this.setWidth(width);
      }
      if (height !== undefined) {
        this.setHeight(height);
      }
      this.bounds = {};
    },
    properties: {
      visibility: {
        check: ["visible", "hidden", "excluded"],
        init: "visible",
        apply: "_applyVisibility",
        event: "changeVisibility"
      }
    },
    members: {
      bounds: null,
      __P_424_0: null,
      __P_424_1: null,
      renderLayout: function renderLayout(left, top, width, height) {
        var changes = qx.test.ui.layout.LayoutItem.superclass.prototype.renderLayout.call(this, left, top, width, height);
        if (!changes) {
          return;
        }
        this.bounds = {
          left: left,
          top: top,
          width: width,
          height: height
        };
        if (changes.size || changes.local || changes.margin) {
          if (this.__P_424_0 && this.getLayoutChildren().length > 0) {
            this.__P_424_0.renderLayout(width, height, {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            });
          }
        }
        return changes;
      },
      setLayout: function setLayout(layout) {
        layout.connectToWidget(this);
        qx.ui.core.queue.Layout.add(this);
        this.__P_424_0 = layout;
      },
      _getLayout: function _getLayout() {
        return this.__P_424_0;
      },
      // overridden
      invalidateLayoutCache: function invalidateLayoutCache() {
        qx.test.ui.layout.LayoutItem.superclass.prototype.invalidateLayoutCache.call(this);
        if (this.__P_424_0) {
          this.__P_424_0.invalidateLayoutCache();
        }
      },
      invalidateLayoutChildren: function invalidateLayoutChildren() {
        var layout = this.__P_424_0;
        if (layout) {
          layout.invalidateChildrenCache();
        }
        qx.ui.core.queue.Layout.add(this);
      },
      // property apply
      _applyVisibility: function _applyVisibility(value, old) {
        // only force a layout update if visibility change from/to "exclude"
        var parent = this.$$parent;
        if (parent && (old == null || value == null || old === "excluded" || value === "excluded")) {
          parent.invalidateLayoutChildren();
        }

        // Update visibility cache
        qx.ui.core.queue.Visibility.add(this);
      },
      _getContentHint: function _getContentHint() {
        if (this.__P_424_0 && this.getLayoutChildren().length > 0) {
          return this.__P_424_0.getSizeHint();
        } else {
          return {
            width: 0,
            height: 0
          };
        }
      },
      // overridden
      _computeSizeHint: function _computeSizeHint() {
        // Start with the user defined values
        var width = this.getWidth();
        var minWidth = this.getMinWidth();
        var maxWidth = this.getMaxWidth();
        var height = this.getHeight();
        var minHeight = this.getMinHeight();
        var maxHeight = this.getMaxHeight();

        // Ask content
        var contentHint = this._getContentHint();
        if (width == null) {
          width = contentHint.width;
        }
        if (height == null) {
          height = contentHint.height;
        }
        if (minWidth == null) {
          if (contentHint.minWidth != null) {
            minWidth = contentHint.minWidth;
          }
        }
        if (minHeight == null) {
          if (contentHint.minHeight != null) {
            minHeight = contentHint.minHeight;
          }
        }
        if (maxWidth == null) {
          if (contentHint.maxWidth == null) {
            maxWidth = Infinity;
          } else {
            maxWidth = contentHint.maxWidth;
          }
        }
        if (maxHeight == null) {
          if (contentHint.maxHeight == null) {
            maxHeight = Infinity;
          } else {
            maxHeight = contentHint.maxHeight;
          }
        }
        return {
          width: width,
          minWidth: minWidth,
          maxWidth: maxWidth,
          height: height,
          minHeight: minHeight,
          maxHeight: maxHeight
        };
      },
      add: function add(child, options) {
        if (!this.__P_424_1) {
          this.__P_424_1 = [];
        }
        this.__P_424_1.push(child);
        this.__P_424_0.invalidateChildrenCache();
        if (options) {
          child.setLayoutProperties(options);
        } else {
          this.updateLayoutProperties();
        }
        child.setLayoutParent(this);
        qx.ui.core.queue.Layout.add(this);
      },
      remove: function remove(child) {
        if (!this.__P_424_1) {
          this.__P_424_1 = [];
        }
        qx.lang.Array.remove(this.__P_424_1, child);

        // Clear parent connection
        child.setLayoutParent(null);

        // clear the layout's children cache
        if (this.__P_424_0) {
          this.__P_424_0.invalidateChildrenCache();
        }

        // Add to layout queue
        qx.ui.core.queue.Layout.add(this);
      },
      getLayoutChildren: function getLayoutChildren() {
        var children = this.__P_424_1 || [];
        var layoutChildren = [];
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          if (child.getVisibility() !== "excluded") {
            layoutChildren.push(child);
          }
        }
        return layoutChildren;
      },
      checkAppearanceNeeds: function checkAppearanceNeeds() {},
      // copied from qx.ui.core.Widget
      addChildrenToQueue: function addChildrenToQueue(queue) {
        var children = this.__P_424_1;
        if (!children) {
          return;
        }
        var child;
        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];
          queue.push(child);
          child.addChildrenToQueue(queue);
        }
      }
    },
    destruct: function destruct() {
      this.bounds = this.__P_424_0 = this.__P_424_1 = null;
    }
  });
  qx.test.ui.layout.LayoutItem.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=LayoutItem.js.map?dt=1717235394832