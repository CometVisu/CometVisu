(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.progressive.renderer.table.cell.Icon": {
        "construct": true,
        "require": true
      },
      "qx.util.AliasManager": {},
      "qx.util.ResourceManager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007 by Tartan Solutions, Inc, http://www.tartansolutions.com
       2008 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Dan Hummon
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * Table Cell Boolean Renderer.
   */
  qx.Class.define("qx.ui.progressive.renderer.table.cell.Image", {
    extend: qx.ui.progressive.renderer.table.cell.Icon,

    /**
     * @param height {Integer ? 16}
     *   The height of the image. The default is 16.
     *
     * @param width {Integer ? 16}
     *   The width of the image. The default is 16.
     */
    construct: function construct(width, height) {
      qx.ui.progressive.renderer.table.cell.Icon.constructor.call(this);

      if (width === undefined) {
        this.__P_390_0 = width;
      } else {
        this.__P_390_0 = 16;
      }

      if (height === undefined) {
        this.__P_390_1 = height;
      } else {
        this.__P_390_1 = 16;
      }
    },
    members: {
      __P_390_0: null,
      __P_390_1: null,
      // overridden
      _identifyImage: function _identifyImage(cellInfo) {
        var imageData = {
          imageWidth: this.__P_390_0,
          imageHeight: this.__P_390_1
        };
        var height; // String data is the unresolved url for the image.
        // Object data is a map containing the url, tooltip, and a height

        if (typeof cellInfo.cellData == "string") {
          imageData.url = cellInfo.cellData;
        } else {
          imageData.url = cellInfo.cellData.url;
          imageData.tooltip = cellInfo.cellData.tooltip;
          height = cellInfo.cellData.height;
        }

        if (imageData.url == "") {
          imageData.url = this._imageBlank;
        } else {
          var aliasManager = qx.util.AliasManager.getInstance();
          var resourceManager = qx.util.ResourceManager.getInstance();
          var resolved = aliasManager.resolve(imageData.url);
          imageData.url = resourceManager.toUri(resolved);
        } // Adjust the row height, if necessary, to let this image fit


        if (height) {
          cellInfo.height = height;
        }

        return imageData;
      }
    }
  });
  qx.ui.progressive.renderer.table.cell.Image.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Image.js.map?dt=1643061807378