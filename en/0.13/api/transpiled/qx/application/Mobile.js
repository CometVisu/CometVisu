(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Init": {
        "require": true
      },
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.application.IApplication": {
        "require": true
      },
      "qx.locale.MTranslation": {
        "require": true
      },
      "qx.bom.client.Scroll": {
        "require": true
      },
      "qx.application.Routing": {},
      "qx.ui.mobile.core.Root": {}
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
       2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
  
  ************************************************************************ */

  /**
   * For a mobile application. Supports the mobile widget set.
   *
   * @require(qx.core.Init)
   * @asset(qx/mobile/css/*)
   */
  qx.Class.define("qx.application.Mobile", {
    extend: qx.core.Object,
    implement: [qx.application.IApplication],
    include: qx.locale.MTranslation,
    construct: function construct() {
      qx.core.Object.constructor.call(this);
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fired when the lifecycle method {@link #start} of any {@link qx.ui.mobile.page.Page page} is called */
      "start": "qx.event.type.Event",

      /** Fired when the lifecycle method {@link #stop} of any {@link qx.ui.mobile.page.Page page} is called */
      "stop": "qx.event.type.Event",

      /**
       * Fired when the method {@link qx.ui.mobile.page.Page#back} is called. It is possible to prevent
       * the <code>back</code> event on {@link qx.ui.mobile.page.Page} by calling the
       * {@link qx.event.type.Event#preventDefault}. Data indicating whether the action
       * was triggered by a key event or not.
       */
      "back": "qx.event.type.Data",

      /** Fired when a {@link qx.ui.mobile.dialog.Popup popup} appears on screen. */
      "popup": "qx.event.type.Event"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_93_0: null,
      __P_93_1: null,
      // interface method
      main: function main() {
        this.__P_93_0 = this._createRootWidget();

        if (qx.core.Environment.get("qx.mobile.nativescroll") == false) {
          this.__P_93_0.setShowScrollbarY(false);
        }
      },

      /**
       * Returns the application's root widget.
       *
       * @return {qx.ui.mobile.core.Widget} The application's root widget.
       */
      getRoot: function getRoot() {
        return this.__P_93_0;
      },

      /**
       * Returns the application's routing.
       *
       * @return {qx.application.Routing} The application's routing.
       */
      getRouting: function getRouting() {
        if (!this.__P_93_1) {
          this.__P_93_1 = new qx.application.Routing();
        }

        return this.__P_93_1;
      },

      /**
       * Creates the application's root widget. Override this function to create
       * your own root widget.
       *
       * @return {qx.ui.mobile.core.Widget} The application's root widget.
       */
      _createRootWidget: function _createRootWidget() {
        return new qx.ui.mobile.core.Root();
      },
      // interface method
      finalize: function finalize() {// empty
      },
      // interface method
      close: function close() {// empty
      },
      // interface method
      terminate: function terminate() {// empty
      }
    }
  });
  qx.application.Mobile.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Mobile.js.map?dt=1664613611525