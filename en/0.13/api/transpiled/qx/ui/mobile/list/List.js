(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.mobile.list.provider.Provider": {
        "construct": true
      },
      "qx.locale.Manager": {
        "construct": true
      },
      "qx.bom.element.Class": {},
      "qx.bom.element.Attribute": {},
      "qx.dom.Element": {},
      "qx.bom.element.Dimension": {},
      "qx.bom.element.Style": {},
      "qx.bom.AnimationFrame": {},
      "qx.lang.Type": {},
      "qx.bom.Selector": {},
      "qx.lang.Object": {},
      "qx.util.Delegate": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
       * Christopher Zuendorf (czuendorf)
  
  ************************************************************************ */

  /**
   * The list widget displays the data of a model in a list.
   *
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *
   *    // Data for the list
   *    var data = [
   *       {title : "Row1", subtitle : "Sub1"},
   *       {title : "Row2", subtitle : "Sub2"},
   *       {title : "Row3", subtitle : "Sub3"}
   *   ];
   *
   *   // Create the list with a delegate that
   *   var list = new qx.ui.mobile.list.List({
   *     configureItem: function(item, data, row)
   *     {
   *       item.setImage("path/to/image.png");
   *       item.setTitle(data.title);
   *       item.setSubtitle(data.subtitle);
   *     },
   *
   *     configureGroupItem: function(item, data) {
   *       item.setTitle(data.title);
   *     },
   *
   *     group: function(data, row) {
   *      return {
   *       title: row < 2 ? "Selectable" : "Unselectable"
   *     };
   *    }
   *   });
   *
   *   // Set the model of the list
   *   list.setModel(new qx.data.Array(data));
   *
   *   // Add an changeSelection event
   *   list.addListener("changeSelection", function(evt) {
   *     alert("Index: " + evt.getData())
   *   }, this);
   *
   *   this.getRoot().add(list);
   * </pre>
   *
   * This example creates a list with a delegate that configures the list item with
   * the given data. A listener for the event {@link #changeSelection} is added.
   */
  qx.Class.define("qx.ui.mobile.list.List", {
    extend: qx.ui.mobile.core.Widget,

    /**
     * @param delegate {qx.ui.mobile.list.IListDelegate?null} The {@link #delegate} to use
     */
    construct: function construct(delegate) {
      qx.ui.mobile.core.Widget.constructor.call(this);
      this.__P_391_0 = new qx.ui.mobile.list.provider.Provider(this);
      this.addListener("tap", this._onTap, this);
      this.addListener("trackstart", this._onTrackStart, this);
      this.addListener("track", this._onTrack, this);
      this.addListener("trackend", this._onTrackEnd, this);

      if (delegate) {
        this.setDelegate(delegate);
      } else {
        this.setDelegate(this);
      }

      {
        qx.locale.Manager.getInstance().addListener("changeLocale", this._onChangeLocale, this);
      }
    },
    events: {
      /**
       * Fired when the selection is changed.
       */
      changeSelection: "qx.event.type.Data",

      /**
       * Fired when the group selection is changed.
       */
      changeGroupSelection: "qx.event.type.Data",

      /**
       * Fired when an item should be removed from list.
       */
      removeItem: "qx.event.type.Data"
    },
    properties: {
      // overridden
      defaultCssClass: {
        refine: true,
        init: "list"
      },

      /**
       * Delegation object which can have one or more functions defined by the
       * {@link qx.ui.mobile.list.IListDelegate} interface.
       */
      delegate: {
        apply: "_applyDelegate",
        event: "changeDelegate",
        init: null,
        nullable: true
      },

      /**
       * The model to use to render the list.
       */
      model: {
        check: "qx.data.Array",
        apply: "_applyModel",
        event: "changeModel",
        nullable: true,
        init: null
      },

      /**
       * Number of items to display. Auto set by model.
       * Reset to limit the amount of data that should be displayed.
       */
      itemCount: {
        check: "Integer",
        init: 0
      },

      /**
      * The height of a list item.
      */
      itemHeight: {
        check: "Number",
        init: null,
        nullable: true
      }
    },

    /*
     *****************************************************************************
        MEMBERS
     *****************************************************************************
     */
    members: {
      __P_391_0: null,
      __P_391_1: null,
      __P_391_2: null,
      __P_391_3: null,
      // overridden
      _getTagName: function _getTagName() {
        return "ul";
      },

      /**
       * Default list delegate. Expects a map which contains an image, a subtitle, and a title:
       * <code>{title : "Row1", subtitle : "Sub1", image : "path/to/image.png"}</code>
       *
       * @param item {qx.ui.mobile.list.renderer.Abstract} Instance of list item renderer to modify
       * @param data {var} The data of the row. Can be used to configure the given item.
       * @param row {Integer} The row index.
       */
      configureItem: function configureItem(item, data, row) {
        if (typeof data.image != "undefined") {
          item.setImage(data.image);
        }

        if (typeof data.subtitle != "undefined") {
          item.setSubtitle(data.subtitle);
        }

        if (typeof data.title != "undefined") {
          item.setTitle(data.title);
        }

        if (typeof data.enabled != "undefined") {
          item.setEnabled(data.enabled);
        }

        if (typeof data.removable != "undefined") {
          item.setRemovable(data.removable);
        }

        if (typeof data.selectable != "undefined") {
          item.setSelectable(data.selectable);
        }

        if (typeof data.activatable != "undefined") {
          item.setActivatable(data.activatable);
        }

        if (typeof data.arrow != "undefined") {
          item.setShowArrow(data.arrow);
        }

        if (typeof data.selected != "undefined") {
          item.setSelected(data.selected);
        }
      },

      /**
       * Event handler for the "tap" event.
       *
       * @param evt {qx.event.type.Tap} The tap event
       */
      _onTap: function _onTap(evt) {
        var element = this._getElement(evt);

        if (!element) {
          return;
        }

        var row = -1;

        if (qx.bom.element.Class.has(element, "list-item")) {
          if (qx.bom.element.Attribute.get(element, "data-selectable") != "false" && qx.dom.Element.hasChild(this.getContainerElement(), element)) {
            row = parseInt(element.getAttribute("data-row"), 10);
          }

          if (row != -1) {
            this.fireDataEvent("changeSelection", row);
          }
        } else {
          var group = parseInt(element.getAttribute("data-group"), 10);

          if (qx.bom.element.Attribute.get(element, "data-selectable") != "false") {
            this.fireDataEvent("changeGroupSelection", group);
          }
        }
      },

      /**
      * Event handler for <code>trackstart</code> event.
      * @param evt {qx.event.type.Track} the <code>trackstart</code> event
      */
      _onTrackStart: function _onTrackStart(evt) {
        this.__P_391_2 = null;
        this.__P_391_3 = null;

        var element = this._getElement(evt);

        if (element && qx.bom.element.Class.has(element, "list-item") && qx.bom.element.Class.has(element, "removable")) {
          this.__P_391_3 = element;
          this.__P_391_1 = qx.bom.element.Dimension.getWidth(element) / 2;
          qx.bom.element.Class.add(element, "track");
        }
      },

      /**
      * Event handler for <code>track</code> event.
      * @param evt {qx.event.type.Track} the <code>track</code> event
      */
      _onTrack: function _onTrack(evt) {
        if (!this.__P_391_3) {
          return;
        }

        var element = this.__P_391_3;
        var delta = evt.getDelta();
        var deltaX = Math.round(delta.x * 0.1) / 0.1;

        if (this.__P_391_2 === null) {
          this.__P_391_2 = delta.axis == "x";
        }

        if (!this.__P_391_2) {
          return;
        }

        var opacity = 1 - Math.abs(deltaX) / this.__P_391_1;

        opacity = Math.round(opacity * 100) / 100;
        qx.bom.element.Style.set(element, "transform", "translate3d(" + deltaX + "px,0,0)");
        qx.bom.element.Style.set(element, "opacity", opacity);
        evt.preventDefault();
      },

      /**
      * Event handler for <code>trackend</code> event.
      * @param evt {qx.event.type.Track} the <code>trackend</code> event
      */
      _onTrackEnd: function _onTrackEnd(evt) {
        if (!this.__P_391_3) {
          return;
        }

        var element = this.__P_391_3;

        if (Math.abs(evt.getDelta().x) > this.__P_391_1) {
          var row = parseInt(element.getAttribute("data-row"), 10);
          this.fireDataEvent("removeItem", row);
        } else {
          qx.bom.AnimationFrame.request(function () {
            qx.bom.element.Style.set(element, "transform", "translate3d(0,0,0)");
            qx.bom.element.Style.set(element, "opacity", "1");
            qx.bom.element.Class.remove(element, "track");
          }.bind(this));
        }
      },

      /**
      * Returns the target list item.
      * @param evt {Event} the input event
      * @return {Element} the target list item.
      */
      _getElement: function _getElement(evt) {
        var element = evt.getOriginalTarget(); // Click on border: do nothing.

        if (element.tagName == "UL") {
          return null;
        }

        while (element.tagName != "LI") {
          element = element.parentNode;
        }

        return element;
      },
      // property apply
      _applyModel: function _applyModel(value, old) {
        if (old != null) {
          old.removeListener("changeBubble", this.__P_391_4, this);
        }

        if (value != null) {
          value.addListener("changeBubble", this.__P_391_4, this);
        }

        if (old != null) {
          old.removeListener("change", this.__P_391_5, this);
        }

        if (value != null) {
          value.addListener("change", this.__P_391_5, this);
        }

        if (old != null) {
          old.removeListener("changeLength", this.__P_391_6, this);
        }

        if (value != null) {
          value.addListener("changeLength", this.__P_391_6, this);
        }

        this.__P_391_7();
      },
      // property apply
      _applyDelegate: function _applyDelegate(value, old) {
        this.__P_391_0.setDelegate(value);
      },

      /**
       * Listen on model 'changeLength' event.
       * @param evt {qx.event.type.Data} data event which contains model change data.
       */
      __P_391_6: function __P_391_6(evt) {
        this.__P_391_7();
      },

      /**
       * Locale change event handler
       *
       * @signature function(e)
       * @param e {Event} the change event
       */
      _onChangeLocale: function _onChangeLocale(e) {
        this.__P_391_7();
      },

      /**
       * Reacts on model 'change' event.
       * @param evt {qx.event.type.Data} data event which contains model change data.
       */
      __P_391_5: function __P_391_5(evt) {
        if (evt && evt.getData() && evt.getData().type == "order") {
          this.__P_391_7();
        }
      },

      /**
       * Reacts on model 'changeBubble' event.
       * @param evt {qx.event.type.Data} data event which contains model changeBubble data.
       */
      __P_391_4: function __P_391_4(evt) {
        if (evt) {
          var data = evt.getData();
          var isArray = qx.lang.Type.isArray(data.old) && qx.lang.Type.isArray(data.value);

          if (!isArray || isArray && data.old.length == data.value.length) {
            var rows = this._extractRowsToRender(data.name);

            for (var i = 0; i < rows.length; i++) {
              this.__P_391_8(rows[i]);
            }
          }
        }
      },

      /**
       * Extracts all rows, which should be rendered from "changeBubble" event's
       * data.name.
       * @param name {String} The 'data.name' String of the "changeBubble" event,
       *    which contains the rows that should be rendered.
       * @return {Integer[]} An array with integer values, representing the rows which should
       *  be rendered.
       */
      _extractRowsToRender: function _extractRowsToRender(name) {
        var rows = [];

        if (!name) {
          return rows;
        } // "[0-2].propertyName" | "[0].propertyName" | "0"


        var containsPoint = name.indexOf(".") != -1;

        if (containsPoint) {
          // "[0-2].propertyName" | "[0].propertyName"
          var candidate = name.split(".")[0]; // Normalize

          candidate = candidate.replace("[", "");
          candidate = candidate.replace("]", ""); // "[0-2]" | "[0]"

          var isRange = candidate.indexOf("-") != -1;

          if (isRange) {
            var rangeMembers = candidate.split("-"); // 0

            var startRange = parseInt(rangeMembers[0], 10); // 2

            var endRange = parseInt(rangeMembers[1], 10);

            for (var i = startRange; i <= endRange; i++) {
              rows.push(i);
            }
          } else {
            // "[0]"
            rows.push(parseInt(candidate.match(/\d+/)[0], 10));
          }
        } else {
          // "0"
          var match = name.match(/\d+/);

          if (match.length == 1) {
            rows.push(parseInt(match[0], 10));
          }
        }

        return rows;
      },

      /**
       * Renders a specific row identified by its index.
       * @param index {Integer} index of the row which should be rendered.
       */
      __P_391_8: function __P_391_8(index) {
        var renderedItems = qx.bom.Selector.query(".list-item", this.getContentElement());
        var oldNode = renderedItems[index];

        var newNode = this.__P_391_0.getItemElement(this.getModel().getItem(index), index);

        this.getContentElement().replaceChild(newNode, oldNode);

        this._domUpdated();
      },

      /**
      * @internal
      * Returns the height of one single list item.
      * @return {Integer} the height of a list item in px.
      */
      getListItemHeight: function getListItemHeight() {
        var listItemHeight = 0;

        if (this.getModel() != null && this.getModel().length > 0) {
          var listHeight = qx.bom.element.Style.get(this.getContentElement(), "height");
          listItemHeight = parseInt(listHeight) / this.getModel().length;
        }

        return listItemHeight;
      },

      /**
       * Renders the list.
       */
      __P_391_7: function __P_391_7() {
        this._setHtml("");

        var model = this.getModel();
        this.setItemCount(model ? model.getLength() : 0);
        var groupIndex = 0;

        for (var index = 0; index < this.getItemCount(); index++) {
          if (this.__P_391_9()) {
            var groupElement = this._renderGroup(index, groupIndex);

            if (groupElement) {
              groupIndex++;
              this.getContentElement().appendChild(groupElement);
            }
          }

          var item = model.getItem(index);

          var itemElement = this.__P_391_0.getItemElement(item, index);

          var itemHeight = null;

          if (this.getItemHeight() !== null) {
            itemHeight = this.getItemHeight() + "px";
          } // Fixed height


          qx.bom.element.Style.set(itemElement, "minHeight", itemHeight);
          qx.bom.element.Style.set(itemElement, "maxHeight", itemHeight);
          this.getContentElement().appendChild(itemElement);
        }

        this._domUpdated();
      },

      /**
       * Triggers a re-rendering of this list.
       */
      render: function render() {
        this.__P_391_7();
      },

      /**
      * Renders a group header.
      *
      * @param itemIndex {Integer} the current list item index.
      * @param groupIndex {Integer} the group index.
      * @return {Element} the group element or <code>null</code> if no group was needed.
      */
      _renderGroup: function _renderGroup(itemIndex, groupIndex) {
        var group = this.__P_391_10(itemIndex);

        if (itemIndex === 0) {
          return this.__P_391_0.getGroupElement(group, groupIndex);
        } else {
          var previousGroup = this.__P_391_10(itemIndex - 1);

          if (!qx.lang.Object.equals(group, previousGroup)) {
            return this.__P_391_0.getGroupElement(group, groupIndex);
          }
        }
      },

      /**
      * Checks whether the delegate support group rendering.
      * @return {Boolean} true if the delegate object supports grouping function.
      */
      __P_391_9: function __P_391_9() {
        return qx.util.Delegate.getMethod(this.getDelegate(), "group") !== null;
      },

      /**
       * Returns the group for this item, identified by its index
       * @param index {Integer} the item index.
       * @return {Object} the group object, to which the item belongs to.
       */
      __P_391_10: function __P_391_10(index) {
        var item = this.getModel().getItem(index);
        var group = qx.util.Delegate.getMethod(this.getDelegate(), "group");
        return group(item, index);
      }
    },
    destruct: function destruct() {
      this.__P_391_3 = null;

      this._disposeObjects("__P_391_0");

      {
        qx.locale.Manager.getInstance().removeListener("changeLocale", this._onChangeLocale, this);
      }
    }
  });
  qx.ui.mobile.list.List.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=List.js.map?dt=1664560770650