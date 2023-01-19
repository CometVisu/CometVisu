(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.table.cellrenderer.AbstractImage": {
        "construct": true,
        "require": true
      },
      "qx.util.AliasManager": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007 by Tartan Solutions, Inc, http://www.tartansolutions.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
  
     Authors:
       * Dan Hummon
  
  ************************************************************************ */

  /**
   * The image cell renderer renders image into table cells.
   */
  qx.Class.define("qx.ui.table.cellrenderer.Image", {
    extend: qx.ui.table.cellrenderer.AbstractImage,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param height {Integer?16} The height of the image. The default is 16.
     * @param width {Integer?16} The width of the image. The default is 16.
     */
    construct: function construct(width, height) {
      qx.ui.table.cellrenderer.AbstractImage.constructor.call(this);

      if (width) {
        this.__P_406_0 = width;
      }

      if (height) {
        this.__P_406_1 = height;
      }

      this.__P_406_2 = qx.util.AliasManager.getInstance();
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_406_2: null,
      __P_406_1: 16,
      __P_406_0: 16,
      // overridden
      _identifyImage: function _identifyImage(cellInfo) {
        var imageHints = {
          imageWidth: this.__P_406_0,
          imageHeight: this.__P_406_1
        };

        if (cellInfo.value == "") {
          imageHints.url = null;
        } else {
          imageHints.url = this.__P_406_2.resolve(cellInfo.value);
        }

        imageHints.tooltip = cellInfo.tooltip;
        return imageHints;
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__P_406_2 = null;
    }
  });
  qx.ui.table.cellrenderer.Image.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Image.js.map?dt=1674150486432