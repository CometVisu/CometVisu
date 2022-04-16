(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.table.cellrenderer.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.bom.Stylesheet": {
        "construct": true
      },
      "qx.util.ResourceManager": {},
      "qx.io.ImageLoader": {},
      "qx.bom.client.Css": {
        "require": true
      },
      "qx.bom.element.Decoration": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.inlineblock": {
          "className": "qx.bom.client.Css"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 STZ-IDA, Germany, http://www.stz-ida.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
       * Carsten Lergenmueller (carstenl)
  
  ************************************************************************ */

  /**
   * A template class for cell renderer, which display images. Concrete
   * implementations must implement the method {@link #_identifyImage}.
   */
  qx.Class.define("qx.ui.table.cellrenderer.AbstractImage", {
    extend: qx.ui.table.cellrenderer.Abstract,
    type: "abstract",

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.table.cellrenderer.Abstract.constructor.call(this);
      var clazz = qx.ui.table.cellrenderer.AbstractImage;

      if (!clazz.stylesheet) {
        clazz.stylesheet = qx.bom.Stylesheet.createElement(".qooxdoo-table-cell-icon {  text-align:center;}");
      }
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * Whether to repeat or scale the image.
       *
       * @param repeat {String}
       *   One of
       *     <code>scale</code>,
       *     <code>scale-x</code>,
       *     <code>scale-y</code>,
       *     <code>repeat</code>,
       *     <code>repeat-x</code>,
       *     <code>repeat-y</code>,
       *     <code>no-repeat</code>
      */
      repeat: {
        check: function check(value) {
          var valid = ["scale", "scale-x", "scale-y", "repeat", "repeat-x", "repeat-y", "no-repeat"];
          return valid.includes(value);
        },
        init: "no-repeat"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_403_0: 16,
      __P_403_1: 16,
      __P_403_2: null,

      /**
       * Identifies the Image to show. This is a template method, which must be
       * implemented by sub classes.
       *
       * @abstract
       * @param cellInfo {Map} The information about the cell.
       *          See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.
       * @return {Map} A map having the following attributes:
       *           <ul>
       *           <li>
       *             "url": (type string) must be the URL of the image to show.
       *             The url given must either be managed by the {@link qx.util.ResourceManager}
       *             or pre-loaded with {@link qx.io.ImageLoader}. This is to make sure that
       *             the renderer knows the dimensions and the format of the image.
       *           </li>
       *           <li>"imageWidth": (type int) the width of the image in pixels.</li>
       *           <li>"imageHeight": (type int) the height of the image in pixels.</li>
       *           <li>"tooltip": (type string) must be the image tooltip text.</li>
       *           </ul>
       * @throws {Error} the abstract function warning.
       */
      _identifyImage: function _identifyImage(cellInfo) {
        throw new Error("_identifyImage is abstract");
      },

      /**
       * Retrieves the image infos.
       *
       * @param cellInfo {Map} The information about the cell.
       *          See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.
       * @return {Map} Map with an "url" attribute (type string)
       *                 holding the URL of the image to show
       *                 and a "tooltip" attribute
       *                 (type string) being the tooltip text (or null if none was specified)
       */
      _getImageInfos: function _getImageInfos(cellInfo) {
        // Query the subclass about image and tooltip
        var imageData = this._identifyImage(cellInfo); // If subclass refuses to give map, construct it with required properties
        // If no map is given, but instead a string, assume that this string is
        // the URL of the image [BUG #4289]


        if (imageData == null || typeof imageData == "string") {
          imageData = {
            url: imageData,
            tooltip: null
          };
        } // If sizes are not included in map given by subclass,
        // fall-back to calculated image size


        if (!imageData.imageWidth || !imageData.imageHeight) {
          var sizes = this.__P_403_3(imageData.url);

          imageData.imageWidth = sizes.width;
          imageData.imageHeight = sizes.height;
        } // Add width and height keys to map [BUG #4289]
        // - [width|height] is read by _getContentHtml()
        // - [imageWidth|imageHeight] is possibly read in legacy applications


        imageData.width = imageData.imageWidth;
        imageData.height = imageData.imageHeight;
        return imageData;
      },

      /**
       * Compute the size of the given image
       *
       * @param source {String} the image URL
       * @return {Map} A map containing the image's <code>width</code> and
       *    <code>height</code>
       */
      __P_403_3: function __P_403_3(source) {
        var ResourceManager = qx.util.ResourceManager.getInstance();
        var ImageLoader = qx.io.ImageLoader;
        var width, height; // Detect if the image registry knows this image

        if (ResourceManager.has(source)) {
          width = ResourceManager.getImageWidth(source);
          height = ResourceManager.getImageHeight(source);
        } else if (ImageLoader.isLoaded(source)) {
          width = ImageLoader.getWidth(source);
          height = ImageLoader.getHeight(source);
        } else {
          width = this.__P_403_0;
          height = this.__P_403_1;
        }

        return {
          width: width,
          height: height
        };
      },
      // overridden
      createDataCellHtml: function createDataCellHtml(cellInfo, htmlArr) {
        this.__P_403_2 = this._getImageInfos(cellInfo);
        return qx.ui.table.cellrenderer.AbstractImage.prototype.createDataCellHtml.base.call(this, cellInfo, htmlArr);
      },
      // overridden
      _getCellClass: function _getCellClass(cellInfo) {
        return qx.ui.table.cellrenderer.AbstractImage.prototype._getCellClass.base.call(this) + " qooxdoo-table-cell-icon";
      },
      // overridden
      _getContentHtml: function _getContentHtml(cellInfo) {
        var content = "<div></div>"; // set image

        if (this.__P_403_2.url) {
          var srcUrl = this.__P_403_2.url;
          var highResolutionSource = qx.util.ResourceManager.getInstance().findHighResolutionSource(this.__P_403_2.url);

          if (highResolutionSource) {
            srcUrl = highResolutionSource;
          }

          var style = {
            width: this.__P_403_2.width + "px",
            height: this.__P_403_2.height + "px",
            display: qx.core.Environment.get("css.inlineblock"),
            verticalAlign: "middle",
            position: "static"
          };

          if (qx.util.ResourceManager.getInstance().getCombinedFormat(this.__P_403_2.url) === "") {
            // background size is critical for high-resolution images but breaks combined images
            style["background-size"] = this.__P_403_2.width + "px " + this.__P_403_2.height + "px";
          }

          content = qx.bom.element.Decoration.create(srcUrl, this.getRepeat(), style);
        }

        return content;
      },
      // overridden
      _getCellAttributes: function _getCellAttributes(cellInfo) {
        var tooltip = this.__P_403_2.tooltip;

        if (tooltip) {
          return "title='" + tooltip + "'";
        } else {
          return "";
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__P_403_2 = null;
    }
  });
  qx.ui.table.cellrenderer.AbstractImage.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractImage.js.map?dt=1650117343633