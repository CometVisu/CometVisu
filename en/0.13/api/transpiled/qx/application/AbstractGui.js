(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Init": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.application.IApplication": {
        "require": true
      },
      "qx.locale.MTranslation": {
        "require": true
      },
      "qx.theme.manager.Meta": {},
      "qx.ui.tooltip.Manager": {},
      "qx.ui.style.Stylesheet": {},
      "qx.ui.core.queue.Manager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
  
  ************************************************************************ */

  /**
   * Abstract base class for GUI applications using qooxdoo widgets.
   *
   * @require(qx.core.Init)
   */
  qx.Class.define("qx.application.AbstractGui", {
    type: "abstract",
    extend: qx.core.Object,
    implement: [qx.application.IApplication],
    include: qx.locale.MTranslation,
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /** @type {qx.ui.core.Widget} The root widget */
      __P_95_0: null,
      /**
       * Create the root widget. This method is abstract and must be overridden
       * by sub classes.
       *
       * @return {qx.ui.core.Widget} The root widget. This widget must be configured
       *     with a {@link qx.ui.layout.Basic} or {@link qx.ui.layout.Canvas} layout.
       */
      _createRootWidget: function _createRootWidget() {
        throw new Error("Abstract method call");
      },
      /**
       * Returns the application's root widget. The root widgets can act as container
       * for popups. It is configured with a {@link qx.ui.layout.Basic} (if the
       * application is an inline application) layout or a {@link qx.ui.layout.Canvas}
       * (if the application is a standalone application) layout .
       *
       * The root has the same add method as the configured layout
       * ({@link qx.ui.layout.Basic} or {@link qx.ui.layout.Canvas}).
       *
       * @return {qx.ui.core.Widget} The application's root widget.
       */
      getRoot: function getRoot() {
        return this.__P_95_0;
      },
      // interface method
      main: function main() {
        // Initialize themes
        qx.theme.manager.Meta.getInstance().initialize();

        // Initialize tooltip manager
        qx.ui.tooltip.Manager.getInstance();
        var rule = ["-webkit-touch-callout: none;", "-ms-touch-select: none;", "-webkit-tap-highlight-color: rgba(0,0,0,0);", "-webkit-tap-highlight-color: transparent;"].join("");
        qx.ui.style.Stylesheet.getInstance().addRule("*", rule);
        this.__P_95_0 = this._createRootWidget();

        // make sure we start with a good scroll position
        window.scrollTo(0, 0);
      },
      // interface method
      finalize: function finalize() {
        this.render();
      },
      /**
       * Updates the GUI rendering
       *
       */
      render: function render() {
        qx.ui.core.queue.Manager.flush();
      },
      // interface method
      close: function close(val) {
        // empty
      },
      // interface method
      terminate: function terminate() {
        // empty
      }
    }
  });
  qx.application.AbstractGui.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractGui.js.map?dt=1673093847631