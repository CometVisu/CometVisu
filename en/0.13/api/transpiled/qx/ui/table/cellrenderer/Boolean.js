(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
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
      },
      "qx.theme.manager.Meta": {
        "construct": true
      },
      "qx.util.ResourceManager": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.dyntheme": {
          "load": true
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
   * A data cell renderer for boolean values.
   */
  qx.Class.define("qx.ui.table.cellrenderer.Boolean", {
    extend: qx.ui.table.cellrenderer.AbstractImage,
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.table.cellrenderer.AbstractImage.constructor.call(this);
      this.__P_447_0 = qx.util.AliasManager.getInstance();
      this.initIconTrue();
      this.initIconFalse();

      // dynamic theme switch
      {
        qx.theme.manager.Meta.getInstance().addListener("changeTheme", this._onChangeTheme, this);
      }
    },
    /*
     *****************************************************************************
       PROPERTIES
     *****************************************************************************
     */

    properties: {
      /**
       * The icon used to indicate the true state
       */
      iconTrue: {
        check: "String",
        init: "decoration/table/boolean-true.png",
        apply: "_applyIconTrue"
      },
      /**
       * The icon used to indicate the false state
       */
      iconFalse: {
        check: "String",
        init: "decoration/table/boolean-false.png",
        apply: "_applyIconFalse"
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __P_447_1: null,
      __P_447_2: false,
      __P_447_0: null,
      /**
       * Handler for theme changes.
       * @signature function()
       */
      _onChangeTheme: qx.core.Environment.select("qx.dyntheme", {
        "true": function _true() {
          this._applyIconTrue(this.getIconTrue());
          this._applyIconFalse(this.getIconFalse());
        },
        "false": null
      }),
      // property apply
      _applyIconTrue: function _applyIconTrue(value) {
        this.__P_447_1 = this.__P_447_0.resolve(value);
      },
      // property apply
      _applyIconFalse: function _applyIconFalse(value) {
        this.__P_447_2 = this.__P_447_0.resolve(value);
      },
      // overridden
      _identifyImage: function _identifyImage(cellInfo) {
        var w;
        var h;
        var rm;
        var id;
        var ids;
        var imageHints;

        // Retrieve the ID
        rm = qx.util.ResourceManager.getInstance();
        if (rm.has(this.__P_447_1)) {
          id = this.__P_447_1;
        } else {
          ids = rm.getIds(this.__P_447_1);
          // If ID was found, we'll use its first (likely only) element here.
          if (ids) {
            id = ids[0];
          }
        }
        if (id) {
          // Get the natural size of the image
          w = rm.getImageWidth(id);
          h = rm.getImageHeight(id);
        }

        // Create the size portion of the hint.
        //
        // The traditional (fixed) size of the image was 11x11px. Use that if we
        // weren't able to retrieve the actual size of the image, and never
        // exceed that size.
        imageHints = {
          imageWidth: w ? Math.min(w, 11) : 11,
          imageHeight: h ? Math.min(h, 11) : 11
        };

        // Add the URL portion of the hint
        switch (cellInfo.value) {
          case true:
            imageHints.url = this.__P_447_1;
            break;
          case false:
            imageHints.url = this.__P_447_2;
            break;
          default:
            imageHints.url = null;
            break;
        }
        return imageHints;
      }
    },
    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__P_447_0 = null;
      // remove dynamic theme listener
      {
        qx.theme.manager.Meta.getInstance().removeListener("changeTheme", this._onChangeTheme, this);
      }
    }
  });
  qx.ui.table.cellrenderer.Boolean.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Boolean.js.map?dt=1704036778478