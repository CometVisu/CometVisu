(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.container.Composite": {
        "construct": true,
        "require": true
      },
      "qx.ui.mobile.layout.VBox": {
        "construct": true
      },
      "qx.ui.mobile.layout.Card": {},
      "qx.ui.mobile.navigationbar.NavigationBar": {}
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
   * The navigation controller includes already a {@link qx.ui.mobile.navigationbar.NavigationBar}
   * and a {@link qx.ui.mobile.container.Composite} container with a {@link qx.ui.mobile.layout.Card} layout.
   * All widgets that implement the {@link qx.ui.mobile.container.INavigation}
   * interface can be added to the container. The added widget provide the title
   * widget and the left/right container, which will be automatically merged into
   * navigation bar.
   *
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *   var container = new qx.ui.mobile.container.Navigation();
   *   this.getRoot(container);
   *   var page = new qx.ui.mobile.page.NavigationPage();
   *   container.add(page);
   *   page.show();
   * </pre>
   */
  qx.Class.define("qx.ui.mobile.container.Navigation", {
    extend: qx.ui.mobile.container.Composite,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.mobile.container.Composite.constructor.call(this, new qx.ui.mobile.layout.VBox());
      this.__P_349_0 = this._createNavigationBar();

      if (this.__P_349_0) {
        this._add(this.__P_349_0);
      }

      this.__P_349_1 = this._createContent();

      this._add(this.__P_349_1, {
        flex: 1
      });
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      defaultCssClass: {
        refine: true,
        init: "navigation"
      }
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fired when the navigation bar gets updated */
      "update": "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_349_0: null,
      __P_349_1: null,
      __P_349_2: null,
      // overridden
      add: function add(widget) {
        this.getContent().add(widget);
      },
      // overridden
      remove: function remove(widget) {
        this.getContent().remove(widget);
      },

      /**
       * Returns the content container. Add all your widgets to this container.
       *
       * @return {qx.ui.mobile.container.Composite} The content container
       */
      getContent: function getContent() {
        return this.__P_349_1;
      },

      /**
       * Returns the assigned card layout.
       * @return {qx.ui.mobile.layout.Card} assigned Card Layout.
       */
      getLayout: function getLayout() {
        return this.__P_349_2;
      },

      /**
       * Returns the navigation bar.
       *
       * @return {qx.ui.mobile.navigationbar.NavigationBar} The navigation bar.
       */
      getNavigationBar: function getNavigationBar() {
        return this.__P_349_0;
      },

      /**
       * Creates the content container.
       *
       * @return {qx.ui.mobile.container.Composite} The created content container
       */
      _createContent: function _createContent() {
        this.__P_349_2 = new qx.ui.mobile.layout.Card();

        this.__P_349_2.addListener("updateLayout", this._onUpdateLayout, this);

        this.__P_349_2.addListener("animationStart", this._onAnimationStart, this);

        this.__P_349_2.addListener("animationEnd", this._onAnimationEnd, this);

        return new qx.ui.mobile.container.Composite(this.__P_349_2);
      },

      /**
      * Handler for the "animationStart" event on the layout.
      */
      _onAnimationStart: function _onAnimationStart() {
        this.addCssClass("blocked");
      },

      /**
      * Handler for the "animationEnd" event on the layout.
      */
      _onAnimationEnd: function _onAnimationEnd() {
        this.removeCssClass("blocked");
      },

      /**
       * Event handler. Called when the "updateLayout" event occurs.
       *
       * @param evt {qx.event.type.Data} The causing event
       */
      _onUpdateLayout: function _onUpdateLayout(evt) {
        var data = evt.getData();
        var widget = data.widget;
        var action = data.action;

        if (action == "visible") {
          this._update(widget);
        }
      },

      /**
       * Updates the navigation bar depending on the set widget.
       *
       * @param widget {qx.ui.mobile.core.Widget} The widget that should be merged into the navigation bar.
       */
      _update: function _update(widget) {
        var navigationBar = this.getNavigationBar();

        this._setStyle("transitionDuration", widget.getNavigationBarToggleDuration() + "s");

        if (widget.isNavigationBarHidden()) {
          this.addCssClass("hidden");
        } else {
          navigationBar.show();
          this.removeCssClass("hidden");
        }

        navigationBar.removeAll();

        if (widget.basename) {
          this._setAttribute("data-target-page", widget.basename.toLowerCase());
        }

        var leftContainer = widget.getLeftContainer();

        if (leftContainer) {
          navigationBar.add(leftContainer);
        }

        var title = widget.getTitleWidget();

        if (title) {
          navigationBar.add(title, {
            flex: 1
          });
        }

        var rightContainer = widget.getRightContainer();

        if (rightContainer) {
          navigationBar.add(rightContainer);
        }

        this.fireDataEvent("update", widget);
      },

      /**
       * Creates the navigation bar.
       *
       * @return {qx.ui.mobile.navigationbar.NavigationBar} The created navigation bar
       */
      _createNavigationBar: function _createNavigationBar() {
        return new qx.ui.mobile.navigationbar.NavigationBar();
      }
    },
    destruct: function destruct() {
      this.getLayout().removeListener("animationStart", this._onAnimationStart, this);
      this.getLayout().removeListener("animationEnd", this._onAnimationEnd, this);

      this._disposeObjects("__P_349_0", "__P_349_1", "__P_349_2");

      this.__P_349_0 = this.__P_349_1 = this.__P_349_2 = null;
    }
  });
  qx.ui.mobile.container.Navigation.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Navigation.js.map?dt=1642362613915