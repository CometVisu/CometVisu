(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.element.Scroll": {},
      "qx.bom.client.OperatingSystem": {},
      "qx.bom.client.Browser": {},
      "qx.bom.client.Event": {}
    },
    "environment": {
      "provided": ["os.scrollBarOverlayed", "qx.mobile.nativescroll"],
      "required": {
        "os.name": {
          "className": "qx.bom.client.OperatingSystem"
        },
        "browser.version": {
          "className": "qx.bom.client.Browser"
        },
        "browser.name": {
          "className": "qx.bom.client.Browser"
        },
        "os.version": {
          "className": "qx.bom.client.OperatingSystem"
        },
        "event.mspointer": {
          "className": "qx.bom.client.Event"
        }
      }
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
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * This class is responsible for checking the scrolling behavior of the client.
   *
   * This class is used by {@link qx.core.Environment} and should not be used
   * directly. Please check its class comment for details how to use it.
   *
   * @internal
   */
  qx.Bootstrap.define("qx.bom.client.Scroll", {
    statics: {
      /**
       * Check if the scrollbars should be positioned on top of the content. This
       * is true of OSX Lion when the scrollbars disappear automatically.
       *
       * @internal
       *
       * @return {Boolean} <code>true</code> if the scrollbars should be
       *   positioned on top of the content.
       */
      scrollBarOverlayed: function scrollBarOverlayed() {
        var scrollBarWidth = qx.bom.element.Scroll.getScrollbarWidth();
        var osx = qx.bom.client.OperatingSystem.getName() === "osx";
        var nativeScrollBars = false;
        return scrollBarWidth === 0 && osx && nativeScrollBars;
      },

      /**
       * Checks if native scroll can be used for the current mobile device.
       *
       * @internal
       *
       * @return {Boolean} <code>true</code> if the current device is capable to
       * use native scroll.
       */
      getNativeScroll: function getNativeScroll() {
        // iOS 8+
        if (qx.core.Environment.get("os.name") == "ios" && parseInt(qx.core.Environment.get("browser.version"), 10) > 7) {
          return true;
        } // Firefox


        if (qx.core.Environment.get("browser.name") == "firefox") {
          return true;
        } // Android 4.4+


        if (qx.core.Environment.get("os.name") == "android") {
          var osVersion = qx.core.Environment.get("os.version");
          var splitVersion = osVersion.split(".");

          if (splitVersion[0] > 4 || splitVersion.length > 1 && splitVersion[0] > 3 && splitVersion[1] > 3) {
            return true;
          }
        } // IE 10+


        if (qx.core.Environment.get("event.mspointer")) {
          return true;
        }

        return false;
      }
    },
    defer: function defer(statics) {
      qx.core.Environment.add("os.scrollBarOverlayed", statics.scrollBarOverlayed);
      qx.core.Environment.add("qx.mobile.nativescroll", statics.getNativeScroll);
    }
  });
  qx.bom.client.Scroll.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Scroll.js.map?dt=1586897334507