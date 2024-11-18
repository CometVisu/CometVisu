(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.page.Page": {
        "construct": true,
        "require": true
      },
      "qx.ui.mobile.container.INavigation": {
        "require": true
      },
      "qx.ui.mobile.navigationbar.Title": {},
      "qx.ui.mobile.layout.HBox": {},
      "qx.ui.mobile.container.Composite": {},
      "qx.ui.mobile.navigationbar.BackButton": {},
      "qx.ui.mobile.navigationbar.Button": {},
      "qx.ui.mobile.container.Scroll": {}
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
   * Specialized page. This page includes already a {@link qx.ui.mobile.navigationbar.NavigationBar}
   * and and a {@link qx.ui.mobile.container.Scroll} container.
   * The NavigationPage can only be used with a page manager {@link qx.ui.mobile.page.Manager}.
  
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *
   *  var manager = new qx.ui.mobile.page.Manager();
   *  var page = new qx.ui.mobile.page.NavigationPage();
   *  page.setTitle("Page Title");
   *  page.setShowBackButton(true);
   *  page.setBackButtonText("Back")
   *  page.addListener("initialize", function()
   *  {
   *    var button = new qx.ui.mobile.form.Button("Next Page");
   *    page.getContent().add(button);
   *  },this);
   *
   *  page.addListener("back", function()
   *  {
   *    otherPage.show({animation:"cube", reverse:true});
   *  },this);
   *
   *  manager.addDetail(page);
   *  page.show();
   * </pre>
   *
   * This example creates a NavigationPage with a title and a back button. In the
   * <code>initialize</code> lifecycle method a button is added.
   */
  qx.Class.define("qx.ui.mobile.page.NavigationPage", {
    extend: qx.ui.mobile.page.Page,
    implement: qx.ui.mobile.container.INavigation,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param wrapContentByGroup {Boolean} Defines whether a group box should wrap the content. This can be used for defining a page margin.
     * @param layout {qx.ui.mobile.layout.Abstract} The layout of this page.
     */
    construct: function construct(wrapContentByGroup, layout) {
      qx.ui.mobile.page.Page.constructor.call(this);

      if (wrapContentByGroup != null) {
        this._wrapContentByGroup = wrapContentByGroup;
      }
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fired when the user tapped on the navigation button */
      action: "qx.event.type.Event"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** The title of the page */
      title: {
        check: "String",
        init: "",
        event: "changeTitle",
        apply: "_applyTitle"
      },

      /** The back button text */
      backButtonText: {
        check: "String",
        init: "",
        apply: "_applyBackButtonText"
      },

      /** The action button text */
      buttonText: {
        check: "String",
        init: "",
        apply: "_applyActionButtonText"
      },

      /** The action button icon */
      buttonIcon: {
        check: "String",
        init: null,
        nullable: true,
        apply: "_applyActionButtonIcon"
      },

      /**
       * Whether to show the back button.
       */
      showBackButton: {
        check: "Boolean",
        init: false,
        apply: "_applyShowBackButton"
      },

      /**
       * Indicates whether the back button should be shown on tablet.
       */
      showBackButtonOnTablet: {
        check: "Boolean",
        init: false
      },

      /**
       * Whether to show the action button.
       */
      showButton: {
        check: "Boolean",
        init: false,
        apply: "_applyShowButton"
      },

      /**
       * Toggles visibility of NavigationBar in
       * wrapping container {@link qx.ui.mobile.container.Navigation}
       */
      navigationBarHidden: {
        check: "Boolean",
        init: false
      },

      /**
       * Sets the transition duration (in seconds) for the effect when hiding/showing
       * the NavigationBar through boolean property navigationBarHidden.
       */
      navigationBarToggleDuration: {
        check: "Number",
        init: 0.8
      },

      /**
       * The CSS class to add to the content per default.
       */
      contentCssClass: {
        check: "String",
        init: "content",
        nullable: true,
        apply: "_applyContentCssClass"
      }
    },

    /*
     *****************************************************************************
        MEMBERS
     *****************************************************************************
     */
    members: {
      _isTablet: false,
      _wrapContentByGroup: true,
      __P_376_0: null,
      __P_376_1: null,
      __P_376_2: null,
      __P_376_3: null,
      __P_376_4: null,
      __P_376_5: null,
      __P_376_6: null,
      // interface implementation
      getTitleWidget: function getTitleWidget() {
        if (!this.__P_376_4) {
          this.__P_376_4 = this._createTitleWidget();
        }

        return this.__P_376_4;
      },

      /**
       * Creates the navigation bar title.
       *
       * @return {qx.ui.mobile.navigationbar.Title} The created title widget
       */
      _createTitleWidget: function _createTitleWidget() {
        return new qx.ui.mobile.navigationbar.Title(this.getTitle());
      },
      // property apply
      _applyTitle: function _applyTitle(value, old) {
        if (this.__P_376_4) {
          this.__P_376_4.setValue(value);
        }
      },
      // interface implementation
      getLeftContainer: function getLeftContainer() {
        if (!this.__P_376_5) {
          this.__P_376_5 = this._createLeftContainer();
        }

        return this.__P_376_5;
      },
      // interface implementation
      getRightContainer: function getRightContainer() {
        if (!this.__P_376_6) {
          this.__P_376_6 = this._createRightContainer();
        }

        return this.__P_376_6;
      },

      /**
       * Creates the left container for the navigation bar.
       *
       * @return {qx.ui.mobile.container.Composite} Creates the left container for the navigation bar.
       */
      _createLeftContainer: function _createLeftContainer() {
        var layout = new qx.ui.mobile.layout.HBox();
        var container = new qx.ui.mobile.container.Composite(layout);
        container.addCssClass("left-container");
        this.__P_376_0 = this._createBackButton();

        this.__P_376_0.addListener("tap", this._onBackButtonTap, this);

        this._showBackButton();

        container.add(this.__P_376_0);
        return container;
      },

      /**
       * Creates the right container for the navigation bar.
       *
       * @return {qx.ui.mobile.container.Composite} Creates the right container for the navigation bar.
       */
      _createRightContainer: function _createRightContainer() {
        var layout = new qx.ui.mobile.layout.HBox();
        var container = new qx.ui.mobile.container.Composite(layout);
        container.addCssClass("right-container");
        this.__P_376_1 = this._createButton();

        this.__P_376_1.addListener("tap", this._onButtonTap, this);

        this._showButton();

        container.add(this.__P_376_1);
        return container;
      },

      /**
        * Creates the navigation bar back button.
        * Creates the scroll container.
        *
        * @return {qx.ui.mobile.navigationbar.BackButton} The created back button widget
        */
      _createBackButton: function _createBackButton() {
        return new qx.ui.mobile.navigationbar.BackButton(this.getBackButtonText());
      },

      /**
        * Creates the navigation bar button.
        * Creates the content container.
        *
        * @return {qx.ui.mobile.navigationbar.Button} The created button widget
        */
      _createButton: function _createButton() {
        return new qx.ui.mobile.navigationbar.Button(this.getButtonText(), this.getButtonIcon());
      },

      /**
       * Returns the content container. Add all your widgets to this container.
       *
       * @return {qx.ui.mobile.container.Composite} The content container
       */
      getContent: function getContent() {
        return this.__P_376_2;
      },

      /**
       * Returns the back button widget.
       *
       * @return {qx.ui.mobile.navigationbar.BackButton} The back button widget
       */
      _getBackButton: function _getBackButton() {
        return this.__P_376_0;
      },

      /**
       * Returns the action button widget.
       *
       * @return {qx.ui.mobile.navigationbar.Button} The action button widget
       */
      _getButton: function _getButton() {
        return this.__P_376_1;
      },

      /**
       * Sets the isTablet flag.
       * @param isTablet {Boolean} value of the isTablet flag.
       */
      setIsTablet: function setIsTablet(isTablet) {
        this._isTablet = isTablet;
      },

      /**
       * Returns the isTablet flag.
       * @return {Boolean} the isTablet flag of this page.
       */
      isTablet: function isTablet() {
        return this._isTablet;
      },

      /**
       * Returns the scroll container.
       *
       * @return {qx.ui.mobile.container.Scroll} The scroll container
       */
      _getScrollContainer: function _getScrollContainer() {
        return this.__P_376_3;
      },

      /**
       * Adds a widget, below the NavigationBar.
       *
       * @param widget {qx.ui.mobile.core.Widget} The widget to add, after NavigationBar.
       */
      addAfterNavigationBar: function addAfterNavigationBar(widget) {
        if (widget && this.__P_376_3) {
          this.addBefore(widget, this.__P_376_3);
        }
      },
      // property apply
      _applyBackButtonText: function _applyBackButtonText(value, old) {
        if (this.__P_376_0) {
          this.__P_376_0.setValue(value);
        }
      },
      // property apply
      _applyActionButtonText: function _applyActionButtonText(value, old) {
        if (this.__P_376_1) {
          this.__P_376_1.setValue(value);
        }
      },
      // property apply
      _applyActionButtonIcon: function _applyActionButtonIcon(value, old) {
        if (this.__P_376_1) {
          this.__P_376_1.setIcon(value);
        }
      },
      // property apply
      _applyShowBackButton: function _applyShowBackButton(value, old) {
        this._showBackButton();
      },
      // property apply
      _applyShowButton: function _applyShowButton(value, old) {
        this._showButton();
      },
      // property apply
      _applyContentCssClass: function _applyContentCssClass(value, old) {
        if (this.__P_376_2) {
          this.__P_376_2.setDefaultCssClass(value);
        }
      },

      /**
       * Helper method to show the back button.
       */
      _showBackButton: function _showBackButton() {
        if (this.__P_376_0) {
          if (this.getShowBackButton()) {
            this.__P_376_0.show();
          } else {
            this.__P_376_0.exclude();
          }
        }
      },

      /**
       * Helper method to show the button.
       */
      _showButton: function _showButton() {
        if (this.__P_376_1) {
          if (this.getShowButton()) {
            this.__P_376_1.show();
          } else {
            this.__P_376_1.exclude();
          }
        }
      },
      // overridden
      _initialize: function _initialize() {
        qx.ui.mobile.page.NavigationPage.prototype._initialize.base.call(this);

        this.__P_376_3 = this._createScrollContainer();
        this.__P_376_2 = this._createContent();

        if (this.__P_376_2) {
          this.__P_376_3.add(this.__P_376_2, {
            flex: 1
          });
        }

        if (this.__P_376_3) {
          this.add(this.__P_376_3, {
            flex: 1
          });
        }
      },

      /**
       * Creates the scroll container.
       *
       * @return {qx.ui.mobile.container.Scroll} The created scroll container
       */
      _createScrollContainer: function _createScrollContainer() {
        return new qx.ui.mobile.container.Scroll();
      },

      /**
       * Creates the content container.
       *
       * @return {qx.ui.mobile.container.Composite} The created content container
       */
      _createContent: function _createContent() {
        var content = new qx.ui.mobile.container.Composite();
        content.setDefaultCssClass(this.getContentCssClass());

        if (this._wrapContentByGroup == true) {
          content.addCssClass("group");
        }

        return content;
      },

      /**
       * Event handler. Called when the tap event occurs on the back button.
       *
       * @param evt {qx.event.type.Tap} The tap event
       */
      _onBackButtonTap: function _onBackButtonTap(evt) {
        this.back();
      },

      /**
       * Event handler. Called when the tap event occurs on the button.
       *
       * @param evt {qx.event.type.Tap} The tap event
       */
      _onButtonTap: function _onButtonTap(evt) {
        this.fireEvent("action");
      }
    },
    destruct: function destruct() {
      this._disposeObjects("__P_376_5", "__P_376_6", "__P_376_0", "__P_376_1", "__P_376_4");

      this.__P_376_5 = this.__P_376_6 = this.__P_376_0 = this.__P_376_1 = null;
      this.__P_376_4 = this.__P_376_2 = this.__P_376_3 = null;
      this._isTablet = null;
    }
  });
  qx.ui.mobile.page.NavigationPage.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=NavigationPage.js.map?dt=1731946692362