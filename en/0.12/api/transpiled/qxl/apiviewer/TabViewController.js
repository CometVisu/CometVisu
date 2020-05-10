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
      "qx.ui.core.queue.Manager": {},
      "qxl.apiviewer.ui.tabview.PackagePage": {},
      "qxl.apiviewer.ui.tabview.ClassPage": {},
      "qxl.apiviewer.LoadingIndicator": {}
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
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.TabViewController", {
    extend: qx.core.Object,
    construct: function construct(widgetRegistry) {
      qx.core.Object.constructor.call(this);
      qxl.apiviewer.TabViewController.instance = this;
      this._tabView = widgetRegistry.getWidgetById("tabView");

      this._tabView.addListener("changeSelection", this.__onChangeSelection, this);
    },
    events: {
      /** This event if dispatched if one of the internal links is tapped */
      "classLinkTapped": "qx.event.type.Data",
      "changeSelection": "qx.event.type.Data"
    },
    members: {
      showTabView: function showTabView() {
        this._tabView.show();
      },

      /**
       * Callback for internal links to other classes/items.
       * This code is called directly from the generated HTML of the
       * class viewer.
       */
      onSelectItem: function onSelectItem(itemName) {
        this.fireDataEvent("classLinkTapped", itemName);
      },
      showItem: function showItem(itemName) {
        qx.ui.core.queue.Manager.flush();

        var page = this._tabView.getSelection()[0];

        page.setUserData("itemName", itemName);
        return page.getChildren()[0].showItem(itemName);
      },
      openPackage: function openPackage(classNode, newTab) {
        return this.__open(classNode, qxl.apiviewer.ui.tabview.PackagePage, newTab);
      },
      openClass: function openClass(classNode, newTab) {
        return this.__open(classNode, qxl.apiviewer.ui.tabview.ClassPage, newTab);
      },
      __open: function __open(classNode, clazz, newTab) {
        var currentPage = this._tabView.getSelection()[0] || null;

        if (currentPage && (!(currentPage instanceof clazz) || newTab)) {
          this._tabView.remove(currentPage);

          currentPage.destroy();
          currentPage = null;
        }

        if (!currentPage) {
          currentPage = new clazz(classNode);

          this._tabView.add(currentPage);
        }

        this._tabView.setSelection([currentPage]);

        currentPage.setUserData("itemName", null);
        return currentPage.setClassNodeAsync(classNode).then(function () {
          return qxl.apiviewer.LoadingIndicator.getInstance().hide();
        });
      },
      __onChangeSelection: function __onChangeSelection(event) {
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

//# sourceMappingURL=TabViewController.js.map?dt=1589124720282