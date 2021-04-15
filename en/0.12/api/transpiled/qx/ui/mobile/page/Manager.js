(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
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
      "qx.core.Init": {
        "construct": true
      },
      "qx.bom.client.Device": {
        "construct": true,
        "require": true
      },
      "qx.event.Registration": {
        "construct": true
      },
      "qx.bom.Viewport": {
        "construct": true
      },
      "qx.ui.mobile.container.Drawer": {},
      "qx.ui.mobile.layout.HBox": {},
      "qx.ui.mobile.container.Composite": {},
      "qx.ui.mobile.layout.VBox": {},
      "qx.ui.mobile.navigationbar.Button": {},
      "qx.ui.mobile.container.Navigation": {},
      "qx.lang.Type": {},
      "qx.lang.String": {},
      "qx.bom.element.Style": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "device.type": {
          "construct": true,
          "className": "qx.bom.client.Device"
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
       * Tino Butz (tbtz)
       * Christopher Zuendorf (czuendorf)
  
  ************************************************************************ */

  /**
   * The page manager decides automatically whether the added pages should be
   * displayed in a master/detail view (for tablet) or as a plain card layout (for
   * smartphones).
   *
   * *Example*
   *
   * Here is a little example of how to use the manager.
   *
   * <pre class='javascript'>
   *  var manager = new qx.ui.mobile.page.Manager();
   *  var page1 = new qx.ui.mobile.page.NavigationPage();
   *  var page2 = new qx.ui.mobile.page.NavigationPage();
   *  var page3 = new qx.ui.mobile.page.NavigationPage();
   *  manager.addMaster(page1);
   *  manager.addDetail([page2,page3]);
   *
   *  page1.show();
   * </pre>
   *
   *
   */
  qx.Class.define("qx.ui.mobile.page.Manager", {
    extend: qx.core.Object,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param isTablet {Boolean?} flag which triggers the manager to layout for tablet (or big screens/displays) or mobile devices. If parameter is null,
     * qx.core.Environment.get("device.type") is called for decision.
     * @param root {qx.ui.mobile.core.Widget?} widget which should be used as root for this manager.
     */
    construct: function construct(isTablet, root) {
      qx.core.Object.constructor.call(this);
      root = root || qx.core.Init.getApplication().getRoot();

      if (typeof isTablet !== "undefined" && isTablet !== null) {
        this.__P_364_0 = isTablet;
      } else {
        // If isTablet is undefined, call environment variable "device.type".
        // When "tablet" or "desktop" type >> do tablet layouting.
        this.__P_364_0 = qx.core.Environment.get("device.type") == "desktop" || qx.core.Environment.get("device.type") == "tablet";
      }

      this.__P_364_1 = this._createDetailNavigation();

      this.__P_364_1.getNavigationBar().hide();

      if (this.__P_364_0) {
        this.__P_364_2 = this._createMasterNavigation();

        this.__P_364_2.getNavigationBar().hide();

        this.__P_364_3 = this._createMasterContainer();
        this.__P_364_4 = this._createDetailContainer();
        this.__P_364_5 = this._createMasterButton();

        this.__P_364_5.addListener("tap", this._onMasterButtonTap, this);

        this.__P_364_6 = this._createHideMasterButton();

        this.__P_364_6.addListener("tap", this._onHideMasterButtonTap, this);

        this.__P_364_2.addListener("update", this._onMasterContainerUpdate, this);

        this.__P_364_1.addListener("update", this._onDetailContainerUpdate, this);

        root.add(this.__P_364_4, {
          flex: 1
        });

        this.__P_364_3.add(this.__P_364_2, {
          flex: 1
        });

        this.__P_364_4.add(this.__P_364_1, {
          flex: 1
        });

        qx.event.Registration.addListener(window, "orientationchange", this._onLayoutChange, this);

        this.__P_364_3.addListener("resize", this._onLayoutChange, this); // On Tablet Mode, no Animation should be shown by default.


        this.__P_364_2.getLayout().setShowAnimation(false);

        this.__P_364_1.getLayout().setShowAnimation(false);

        this.__P_364_3.forceHide();

        setTimeout(function () {
          if (qx.bom.Viewport.isLandscape()) {
            this.__P_364_3.show();
          }
        }.bind(this), 300);
      } else {
        root.add(this.__P_364_1, {
          flex: 1
        });
      }
    },
    properties: {
      /**
       * The caption/label of the Master Button and Popup Title.
       */
      masterTitle: {
        init: "Master",
        check: "String",
        apply: "_applyMasterTitle"
      },

      /**
       * The caption/label of the Hide Master Button.
       */
      hideMasterButtonCaption: {
        init: "Hide",
        check: "String",
        apply: "_applyHideMasterButtonCaption"
      },

      /**
       * This flag controls whether the MasterContainer can be hidden on Landscape.
       */
      allowMasterHideOnLandscape: {
        init: true,
        check: "Boolean"
      },

      /**
       *  This flag controls whether the MasterContainer hides on portrait view,
       *  when a Detail Page fires the lifecycle event "start".
       */
      hideMasterOnDetailStart: {
        init: true,
        check: "Boolean"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_364_0: null,
      __P_364_1: null,
      __P_364_2: null,
      __P_364_5: null,
      __P_364_6: null,
      __P_364_7: null,
      __P_364_8: null,
      __P_364_3: null,
      __P_364_4: null,

      /**
       * Creates the master container.
       *
       * @return {qx.ui.mobile.container.Composite} The created container
       */
      _createMasterContainer: function _createMasterContainer() {
        var masterContainer = new qx.ui.mobile.container.Drawer(null, new qx.ui.mobile.layout.HBox()).set({
          hideOnParentTap: false,
          hideOnBack: false
        });
        masterContainer.addCssClass("master-detail-master");
        masterContainer.addListener("changeVisibility", this._onMasterChangeVisibility, this);
        return masterContainer;
      },

      /**
       * Creates the detail container.
       *
       * @return {qx.ui.mobile.container.Composite} The created container
       */
      _createDetailContainer: function _createDetailContainer() {
        var detailContainer = new qx.ui.mobile.container.Composite(new qx.ui.mobile.layout.VBox());
        detailContainer.setDefaultCssClass("master-detail-detail");
        return detailContainer;
      },

      /**
       * Getter for the Master Container
       * @return {qx.ui.mobile.container.Drawer} The Master Container.
       */
      getMasterContainer: function getMasterContainer() {
        return this.__P_364_3;
      },

      /**
       * Getter for the Detail Container
       * @return {qx.ui.mobile.container.Composite} The Detail Container.
       */
      getDetailContainer: function getDetailContainer() {
        return this.__P_364_4;
      },

      /**
       * Returns the button for showing/hiding the masterContainer.
       * @return {qx.ui.mobile.navigationbar.Button}
       */
      getMasterButton: function getMasterButton() {
        return this.__P_364_5;
      },

      /**
       * Returns the masterNavigation.
       * @return {qx.ui.mobile.container.Navigation}
       */
      getMasterNavigation: function getMasterNavigation() {
        return this.__P_364_2;
      },

      /**
       * Returns the detailNavigation.
       * @return {qx.ui.mobile.container.Navigation}
       */
      getDetailNavigation: function getDetailNavigation() {
        return this.__P_364_1;
      },

      /**
      * Factory method for the master button, which is responsible for showing/hiding masterContainer.
      * @return {qx.ui.mobile.navigationbar.Button}
      */
      _createMasterButton: function _createMasterButton() {
        return new qx.ui.mobile.navigationbar.Button(this.getMasterTitle());
      },

      /**
       * Factory method for the hide master button, which is responsible for hiding masterContainer on Landscape view.
       * @return {qx.ui.mobile.navigationbar.Button}
       */
      _createHideMasterButton: function _createHideMasterButton() {
        return new qx.ui.mobile.navigationbar.Button("Hide");
      },

      /**
      * Factory method for masterNavigation.
      * @return {qx.ui.mobile.container.Navigation}
      */
      _createMasterNavigation: function _createMasterNavigation() {
        return new qx.ui.mobile.container.Navigation();
      },

      /**
       * Factory method for detailNavigation.
       * @return {qx.ui.mobile.container.Navigation}
       */
      _createDetailNavigation: function _createDetailNavigation() {
        return new qx.ui.mobile.container.Navigation();
      },

      /**
       * Adds an array of NavigationPages to masterContainer, if __isTablet is true. Otherwise it will be added to detailContainer.
       * @param pages {qx.ui.mobile.page.NavigationPage[]|qx.ui.mobile.page.NavigationPage} Array of NavigationPages or single NavigationPage.
       */
      addMaster: function addMaster(pages) {
        if (this.__P_364_0) {
          if (pages) {
            if (!qx.lang.Type.isArray(pages)) {
              pages = [pages];
            }

            for (var i = 0; i < pages.length; i++) {
              var masterPage = pages[i];
              masterPage.addListener("start", this._onMasterPageStart, this);
            }

            if (this.__P_364_7) {
              this.__P_364_7.concat(pages);
            } else {
              this.__P_364_7 = pages;
            }

            this._add(pages, this.__P_364_2);
          }
        } else {
          this.addDetail(pages);
        }
      },

      /**
       * Adds an array of NavigationPage to the detailContainer.
       * @param pages {qx.ui.mobile.page.NavigationPage[]|qx.ui.mobile.page.NavigationPage} Array of NavigationPages or single NavigationPage.
       */
      addDetail: function addDetail(pages) {
        this._add(pages, this.__P_364_1);

        if (pages && this.__P_364_0) {
          if (!qx.lang.Type.isArray(pages)) {
            pages = [pages];
          }

          for (var i = 0; i < pages.length; i++) {
            var detailPage = pages[i];
            detailPage.addListener("start", this._onDetailPageStart, this);
          }

          if (this.__P_364_8) {
            this.__P_364_8.concat(pages);
          } else {
            this.__P_364_8 = pages;
          }
        }
      },

      /**
       * Called when a detailPage reaches lifecycle state "start".
       * @param evt {qx.event.type.Event} source event.
       */
      _onDetailPageStart: function _onDetailPageStart(evt) {
        if (qx.bom.Viewport.isPortrait() && this.isHideMasterOnDetailStart()) {
          this.__P_364_3.hide();
        }
      },

      /**
       * Called when a masterPage reaches lifecycle state "start". Then property masterTitle will be update with masterPage's title.
       * @param evt {qx.event.type.Event} source event.
       */
      _onMasterPageStart: function _onMasterPageStart(evt) {
        var masterPage = evt.getTarget();
        var masterPageTitle = masterPage.getTitle();
        this.setMasterTitle(masterPageTitle);
      },

      /**
       * Adds an array of NavigationPage to the target container.
       * @param pages {qx.ui.mobile.page.NavigationPage[]|qx.ui.mobile.page.NavigationPage} Array of NavigationPages, or NavigationPage.
       * @param target {qx.ui.mobile.container.Navigation} target navigation container.
       */
      _add: function _add(pages, target) {
        if (!qx.lang.Type.isArray(pages)) {
          pages = [pages];
        }

        for (var i = 0; i < pages.length; i++) {
          var page = pages[i];

          if (this.__P_364_0 && !page.getShowBackButtonOnTablet()) {
            page.setShowBackButton(false);
          }

          page.setIsTablet(this.__P_364_0);
          target.add(page);
        }
      },

      /**
       * Called when masterContainer is updated.
       * @param evt {qx.event.type.Data} source event.
       */
      _onMasterContainerUpdate: function _onMasterContainerUpdate(evt) {
        var widget = evt.getData();
        widget.getRightContainer().remove(this.__P_364_6);
        widget.getRightContainer().add(this.__P_364_6);
      },

      /**
       * Called when detailContainer is updated.
       * @param evt {qx.event.type.Data} source event.
       */
      _onDetailContainerUpdate: function _onDetailContainerUpdate(evt) {
        var widget = evt.getData();
        widget.getLeftContainer().remove(this.__P_364_5);
        widget.getLeftContainer().add(this.__P_364_5);
      },

      /**
      * Called when user taps on masterButton.
      */
      _onMasterButtonTap: function _onMasterButtonTap() {
        this.__P_364_3.show();
      },

      /**
      * Called when user taps on hideMasterButton.
      */
      _onHideMasterButtonTap: function _onHideMasterButtonTap() {
        this._removeDetailContainerGap();

        this.__P_364_3.hide();
      },

      /**
      * Event handler for <code>changeVisibility</code> event on master container.
      * @param evt {qx.event.type.Data} the change event.
      */
      _onMasterChangeVisibility: function _onMasterChangeVisibility(evt) {
        var isMasterVisible = "visible" === evt.getData();

        if (qx.bom.Viewport.isLandscape()) {
          if (this.isAllowMasterHideOnLandscape()) {
            if (isMasterVisible) {
              this._createDetailContainerGap();

              this.__P_364_5.exclude();

              this.__P_364_6.show();
            } else {
              this.__P_364_5.show();

              this.__P_364_6.show();
            }
          } else {
            this.__P_364_5.exclude();

            this.__P_364_6.exclude();
          }
        } else {
          this._removeDetailContainerGap();

          this.__P_364_5.show();

          this.__P_364_6.show();
        }
      },

      /**
      * Called when layout of masterDetailContainer changes.
      */
      _onLayoutChange: function _onLayoutChange() {
        if (this.__P_364_0) {
          if (qx.bom.Viewport.isLandscape()) {
            this.__P_364_3.setHideOnParentTap(false);

            if (this.__P_364_3.isHidden()) {
              this.__P_364_3.show();
            } else {
              this._removeDetailContainerGap();

              this.__P_364_3.hide();
            }
          } else {
            this._removeDetailContainerGap();

            this.__P_364_3.setHideOnParentTap(true);

            this.__P_364_3.hide();
          }
        }
      },

      /**
      * Returns the corresponding CSS property key which fits to the drawer's orientation.
      * @return {String} the CSS property key.
      */
      _getGapPropertyKey: function _getGapPropertyKey() {
        return "padding" + qx.lang.String.capitalize(this.__P_364_3.getOrientation());
      },

      /**
       * Moves detailContainer to the right edge of MasterContainer.
       * Creates spaces for aligning master and detail container aside each other.
       */
      _createDetailContainerGap: function _createDetailContainerGap() {
        qx.bom.element.Style.set(this.__P_364_4.getContainerElement(), this._getGapPropertyKey(), this.__P_364_3.getSize() / 16 + "rem");
        qx.event.Registration.fireEvent(window, "resize");
      },

      /**
       * Moves detailContainer to the left edge of viewport.
       */
      _removeDetailContainerGap: function _removeDetailContainerGap() {
        qx.bom.element.Style.set(this.__P_364_4.getContainerElement(), this._getGapPropertyKey(), null);
        qx.event.Registration.fireEvent(window, "resize");
      },

      /**
      * Called on property changes of hideMasterButtonCaption.
      * @param value {String} new caption
      * @param old {String} previous caption
      */
      _applyHideMasterButtonCaption: function _applyHideMasterButtonCaption(value, old) {
        if (this.__P_364_0) {
          this.__P_364_6.setLabel(value);
        }
      },

      /**
      * Called on property changes of masterTitle.
      * @param value {String} new title
      * @param old {String} previous title
      */
      _applyMasterTitle: function _applyMasterTitle(value, old) {
        if (this.__P_364_0) {
          this.__P_364_5.setLabel(value);
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      if (this.__P_364_7) {
        for (var i = 0; i < this.__P_364_7.length; i++) {
          var masterPage = this.__P_364_7[i];
          masterPage.removeListener("start", this._onMasterPageStart, this);
        }
      }

      if (this.__P_364_9) {
        for (var j = 0; j < this.__P_364_9.length; j++) {
          var detailPage = this.__P_364_9[j];
          detailPage.removeListener("start", this._onDetailPageStart, this);
        }
      }

      if (this.__P_364_0) {
        this.__P_364_3.removeListener("changeVisibility", this._onMasterChangeVisibility, this);

        this.__P_364_3.removeListener("resize", this._onLayoutChange, this);

        qx.event.Registration.removeListener(window, "orientationchange", this._onLayoutChange, this);
      }

      this.__P_364_7 = this.__P_364_8 = null;

      this._disposeObjects("__P_364_1", "__P_364_2", "__P_364_5");
    }
  });
  qx.ui.mobile.page.Manager.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Manager.js.map?dt=1618502905650