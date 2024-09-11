(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.ui.tabview.PackagePage": {},
      "qxl.apiviewer.ui.tabview.ClassPage": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
       2018 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (johnspackman)
       * Fabian Jakobs (fjakobs)
       * Henner Kollmann (hkollmann)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.TabViewController", {
    extend: qx.core.Object,
    construct: function construct(widgetRegistry) {
      qx.core.Object.constructor.call(this);
      qxl.apiviewer.TabViewController.instance = this;
      this._tabView = widgetRegistry.getWidgetById("tabView");
      this._tabView.addListener("changeSelection", this.__P_798_0, this);
    },
    events: {
      /** This event if dispatched if one of the internal links is tapped */
      classLinkTapped: "qx.event.type.Data",
      changeSelection: "qx.event.type.Data"
    },
    members: {
      isLoaded: function isLoaded(callback) {
        var page = this._tabView.getSelection()[0];
        var child = page.getChildren()[0];
        if (child.isValid()) {
          callback();
          return;
        }
        child.addListenerOnce("synced", callback);
      },
      showTabView: function showTabView() {
        this._tabView.show();
      },
      /**
       * Callback for internal links to other classes/items.
       * This code is called directly from the generated HTML of the
       * class viewer.
       * @param itemName
       */
      onSelectItem: function onSelectItem(itemName) {
        this.fireDataEvent("classLinkTapped", itemName);
      },
      showItem: function showItem(itemName) {
        var page = this._tabView.getSelection()[0];
        page.setUserData("itemName", itemName);
        var child = page.getChildren()[0];
        return child.showItem(itemName);
      },
      openPackage: function openPackage(classNode, newTab) {
        return this.__P_798_1(classNode, qxl.apiviewer.ui.tabview.PackagePage, newTab);
      },
      openClass: function openClass(classNode, newTab) {
        return this.__P_798_1(classNode, qxl.apiviewer.ui.tabview.ClassPage, newTab);
      },
      __P_798_1: function __P_798_1(classNode, clazz, newTab) {
        var currentPage = this._tabView.getSelection()[0] || null;
        if (currentPage && (!(currentPage instanceof clazz) || newTab)) {
          this._tabView.remove(currentPage);
          currentPage.destroy();
          currentPage = null;
        }
        if (!currentPage) {
          /* eslint-disable-next-line new-cap */
          currentPage = new clazz(classNode);
          this._tabView.add(currentPage);
        }
        this._tabView.setSelection([currentPage]);
        currentPage.setUserData("itemName", null);
        return currentPage.setClassNodeAsync(classNode);
      },
      __P_798_0: function __P_798_0(event) {
        var oldData = event.getOldData();
        var data = event.getData();
        this.fireDataEvent("changeSelection", data, oldData);
      }
    },
    destruct: function destruct() {
      this._tabView.destroy();
      this._tabView = null;
    }
  });
  qxl.apiviewer.TabViewController.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TabViewController.js.map?dt=1726089090501