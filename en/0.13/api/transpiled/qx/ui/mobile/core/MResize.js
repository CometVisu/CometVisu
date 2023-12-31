(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.element.Style": {},
      "qx.bom.client.Scroll": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.mobile.nativescroll": {
          "className": "qx.bom.client.Scroll"
        }
      }
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
   * This mixin resizes the container element to the height of the parent element.
   * Use this when the height can not be set by CSS.
   *
   */
  qx.Mixin.define("qx.ui.mobile.core.MResize", {
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /** Whether the resize should fire the "domupdated" event. Set this to "true"
       *  whenever other elements should react on this size change (e.g. when the size
       *  change does not infect the size of the application, but other widgets should
       *  react).
       */
      fireDomUpdatedOnResize: {
        check: "Boolean",
        init: false
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __P_399_0: null,
      __P_399_1: null,
      /**
       * Removes fixed size from container.
       */
      releaseFixedSize: function releaseFixedSize() {
        var parent = this.getLayoutParent();
        if (parent && parent.getContainerElement()) {
          var element = this.getContainerElement();
          qx.bom.element.Style.set(element, "height", "auto");
          qx.bom.element.Style.set(element, "width", "auto");
        }
      },
      /**
       * Resizes the container element to the height of the parent element.
       */
      fixSize: function fixSize() {
        var parent = this.getLayoutParent();
        if (parent && parent.getContainerElement()) {
          var height = parent.getContainerElement().offsetHeight;
          var width = parent.getContainerElement().offsetWidth;

          // Only fix size, when value are above zero.
          if (height === 0 || width === 0) {
            return;
          }
          if (!this.getFireDomUpdatedOnResize()) {
            this._setHeight(height);
            this._setWidth(width);
          } else if (this.__P_399_0 != height && this.__P_399_1 != width) {
            this._setHeight(height);
            this._setWidth(width);
            this.__P_399_1 = width;
            this.__P_399_0 = height;
            this._domUpdated();
          }
        }
      },
      /**
       * Sets the height of the container element.
       *
       * @param height {Integer} The height to set
       */
      _setHeight: function _setHeight(height) {
        var element = this.getContainerElement();
        if (qx.core.Environment.get("qx.mobile.nativescroll")) {
          qx.bom.element.Style.set(element, "minHeight", height + "px");
        } else {
          qx.bom.element.Style.set(element, "height", height + "px");
        }
      },
      /**
       * Sets the width of the container element.
       *
       * @param width {Integer} The width to set
       */
      _setWidth: function _setWidth(width) {
        var element = this.getContainerElement();
        if (qx.core.Environment.get("qx.mobile.nativescroll")) {
          qx.bom.element.Style.set(element, "minWidth", width + "px");
        } else {
          qx.bom.element.Style.set(element, "width", width + "px");
        }
      }
    }
  });
  qx.ui.mobile.core.MResize.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MResize.js.map?dt=1704036776106