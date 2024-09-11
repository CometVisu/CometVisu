(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.list.renderer.group.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.ui.mobile.layout.HBox": {
        "construct": true
      },
      "qx.ui.mobile.container.Composite": {},
      "qx.ui.mobile.layout.VBox": {},
      "qx.ui.mobile.basic.Image": {},
      "qx.ui.mobile.basic.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2014 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christopher Zuendorf (czuendorf)
  
  ************************************************************************ */

  /**
   * The default group renderer. Used as the default renderer by the
   * {@link qx.ui.mobile.list.provider.Provider}. Configure the renderer
   * by setting the {@link qx.ui.mobile.list.List#delegate} property.
   *
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *   // Create the list with a delegate that
   *   // configures the list item.
   *   var list = new qx.ui.mobile.list.List({
   *     configureItem: function(item, data, row)
   *     {
   *       item.setImage("path/to/image.png");
   *       item.setTitle(data.title);
   *       item.setSubtitle(data.subtitle);
   *     },
   *
   *     configureGroupItem: function(item, data, group) {
   *       item.setTitle(group + " " + data.title);
   *     },
   *
   *     group: function(data, row) {
   *      return {
   *       title: row < 4 ? "Selectable" : "Unselectable"
   *     };
   *    }
   *  });
   * </pre>
   *
   * This example creates a list with a delegate that configures the list items and groups with
   * the given data.
   */

  qx.Class.define("qx.ui.mobile.list.renderer.group.Default", {
    extend: qx.ui.mobile.list.renderer.group.Abstract,
    construct: function construct(layout) {
      qx.ui.mobile.list.renderer.group.Abstract.constructor.call(this, layout || new qx.ui.mobile.layout.HBox().set({
        alignY: "middle"
      }));
      this._init();
    },
    members: {
      __P_639_0: null,
      __P_639_1: null,
      __P_639_2: null,
      /**
       * Returns the image widget which is used for this renderer.
       *
       * @return {qx.ui.mobile.basic.Image} The image widget
       */
      getImageWidget: function getImageWidget() {
        return this.__P_639_0;
      },
      /**
       * Returns the title widget which is used for this renderer.
       *
       * @return {qx.ui.mobile.basic.Label} The title widget
       */
      getTitleWidget: function getTitleWidget() {
        return this.__P_639_1;
      },
      /**
       * Sets the source of the image widget.
       *
       * @param source {String} The source to set
       */
      setImage: function setImage(source) {
        this.__P_639_0.setSource(source);
      },
      /**
       * Sets the value of the title widget.
       *
       * @param title {String} The value to set
       */
      setTitle: function setTitle(title) {
        if (title && title.translate) {
          this.__P_639_1.setValue(title.translate());
        } else {
          this.__P_639_1.setValue(title);
        }
      },
      /**
       * Setter for the data attribute <code></code>
       * @param groupTitle {String} the title of the group
       */
      setGroup: function setGroup(groupTitle) {
        this._setAttribute("data-group", groupTitle);
      },
      /**
       * Inits the widgets for the renderer.
       *
       */
      _init: function _init() {
        this.__P_639_0 = this._createImage();
        this.add(this.__P_639_0);
        this.__P_639_2 = this._createRightContainer();
        this.add(this.__P_639_2, {
          flex: 1
        });
        this.__P_639_1 = this._createTitle();
        this.__P_639_2.add(this.__P_639_1);
      },
      /**
       * Creates and returns the right container composite. Override this to adapt the widget code.
       *
       * @return {qx.ui.mobile.container.Composite} the right container.
       */
      _createRightContainer: function _createRightContainer() {
        return new qx.ui.mobile.container.Composite(new qx.ui.mobile.layout.VBox());
      },
      /**
       * Creates and returns the image widget. Override this to adapt the widget code.
       *
       * @return {qx.ui.mobile.basic.Image} the image widget.
       */
      _createImage: function _createImage() {
        var image = new qx.ui.mobile.basic.Image();
        image.setAnonymous(true);
        image.addCssClass("group-item-image");
        return image;
      },
      /**
       * Creates and returns the title widget. Override this to adapt the widget code.
       *
       * @return {qx.ui.mobile.basic.Label} the title widget.
       */
      _createTitle: function _createTitle() {
        var title = new qx.ui.mobile.basic.Label();
        title.setWrap(false);
        title.addCssClass("group-item-title");
        return title;
      },
      // overridden
      reset: function reset() {
        this.__P_639_0.setSource(null);
        this.__P_639_1.setValue("");
      }
    },
    destruct: function destruct() {
      this._disposeObjects("__P_639_0", "__P_639_1", "__P_639_2");
    }
  });
  qx.ui.mobile.list.renderer.group.Default.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Default.js.map?dt=1726089079520