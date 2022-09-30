(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "usage": "dynamic",
        "require": true
      },
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.scroll.ScrollBar": {}
    },
    "environment": {
      "provided": ["qx.nativeScrollBars"],
      "required": {}
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
  qx.core.Environment.add("qx.nativeScrollBars", false);
  /**
   * Include this widget if you want to create scrollbars depending on the global
   * "qx.nativeScrollBars" setting.
   */

  qx.Mixin.define("qx.ui.core.scroll.MScrollBarFactory", {
    members: {
      /**
       * Creates a new scrollbar. This can either be a styled qooxdoo scrollbar
       * or a native browser scrollbar.
       *
       * @param orientation {String?"horizontal"} The initial scroll bar orientation
       * @return {qx.ui.core.scroll.IScrollBar} The scrollbar instance
       */
      _createScrollBar: function _createScrollBar(orientation) {
        {
          return new qx.ui.core.scroll.ScrollBar(orientation);
        }
      }
    }
  });
  qx.ui.core.scroll.MScrollBarFactory.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MScrollBarFactory.js.map?dt=1664548986820