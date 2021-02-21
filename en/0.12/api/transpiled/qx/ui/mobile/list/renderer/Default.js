(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.list.renderer.Abstract": {
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
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
  
  ************************************************************************ */

  /**
   * The default list item renderer. Used as the default renderer by the
   * {@link qx.ui.mobile.list.provider.Provider}. Configure the renderer
   * by setting the {@link qx.ui.mobile.list.List#delegate} property.
   *
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *
   *   // Create the list with a delegate that
   *   // configures the list item.
   *   var list = new qx.ui.mobile.list.List({
   *     configureItem : function(item, data, row)
   *     {
   *       item.setImage("path/to/image.png");
   *       item.setTitle(data.title);
   *       item.setSubtitle(data.subtitle);
   *     }
   *   });
   * </pre>
   *
   * This example creates a list with a delegate that configures the list item with
   * the given data.
   */
  qx.Class.define("qx.ui.mobile.list.renderer.Default", {
    extend: qx.ui.mobile.list.renderer.Abstract,
    construct: function construct(layout) {
      qx.ui.mobile.list.renderer.Abstract.constructor.call(this, layout || new qx.ui.mobile.layout.HBox().set({
        alignY: "middle"
      }));

      this._init();
    },
    members: {
      __P_362_0: null,
      __P_362_1: null,
      __P_362_2: null,
      __P_362_3: null,

      /**
       * Returns the image widget which is used for this renderer.
       *
       * @return {qx.ui.mobile.basic.Image} The image widget
       */
      getImageWidget: function getImageWidget() {
        return this.__P_362_0;
      },

      /**
       * Returns the title widget which is used for this renderer.
       *
       * @return {qx.ui.mobile.basic.Label} The title widget
       */
      getTitleWidget: function getTitleWidget() {
        return this.__P_362_1;
      },

      /**
       * Returns the subtitle widget which is used for this renderer.
       *
       * @return {qx.ui.mobile.basic.Label} The subtitle widget
       */
      getSubtitleWidget: function getSubtitleWidget() {
        return this.__P_362_2;
      },

      /**
       * Sets the source of the image widget.
       *
       * @param source {String} The source to set
       */
      setImage: function setImage(source) {
        this.__P_362_0.setSource(source);
      },

      /**
       * Sets the value of the title widget.
       *
       * @param title {String} The value to set
       */
      setTitle: function setTitle(title) {
        if (title && title.translate) {
          this.__P_362_1.setValue(title.translate());
        } else {
          this.__P_362_1.setValue(title);
        }
      },

      /**
       * Sets the value of the subtitle widget.
       *
       * @param subtitle {String} The value to set
       */
      setSubtitle: function setSubtitle(subtitle) {
        if (subtitle && subtitle.translate) {
          this.__P_362_2.setValue(subtitle.translate());
        } else {
          this.__P_362_2.setValue(subtitle);
        }
      },

      /**
       * Inits the widgets for the renderer.
       *
       */
      _init: function _init() {
        this.__P_362_0 = this._createImage();
        this.add(this.__P_362_0);
        this.__P_362_3 = this._createRightContainer();
        this.add(this.__P_362_3, {
          flex: 1
        });
        this.__P_362_1 = this._createTitle();

        this.__P_362_3.add(this.__P_362_1);

        this.__P_362_2 = this._createSubtitle();

        this.__P_362_3.add(this.__P_362_2);
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
        image.addCssClass("list-item-image");
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
        title.addCssClass("list-item-title");
        return title;
      },

      /**
       * Creates and returns the subtitle widget. Override this to adapt the widget code.
       *
       * @return {qx.ui.mobile.basic.Label} the subtitle widget.
       */
      _createSubtitle: function _createSubtitle() {
        var subtitle = new qx.ui.mobile.basic.Label();
        subtitle.setWrap(false);
        subtitle.addCssClass("list-item-subtitle");
        return subtitle;
      },
      // overridden
      reset: function reset() {
        this.__P_362_0.setSource(null);

        this.__P_362_1.setValue("");

        this.__P_362_2.setValue("");
      }
    },
    destruct: function destruct() {
      this._disposeObjects("__P_362_0", "__P_362_1", "__P_362_2", "__P_362_3");
    }
  });
  qx.ui.mobile.list.renderer.Default.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Default.js.map?dt=1613908121576