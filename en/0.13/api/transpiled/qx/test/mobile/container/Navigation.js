(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.mobile.MobileTestCase": {
        "require": true
      },
      "qx.ui.mobile.container.Navigation": {},
      "qx.ui.mobile.page.NavigationPage": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
  
  ************************************************************************ */

  qx.Class.define("qx.test.mobile.container.Navigation", {
    extend: qx.test.mobile.MobileTestCase,
    members: {
      testCreate: function testCreate() {
        var container = new qx.ui.mobile.container.Navigation();
        this.getRoot().add(container);
        container.destroy();
      },
      testAdd: function testAdd() {
        var container = new qx.ui.mobile.container.Navigation();
        var page = new qx.ui.mobile.page.NavigationPage();
        this.getRoot().add(container);
        this.assertFalse(container.getContent().hasChildren());
        container.add(page);
        this.assertTrue(container.getContent().hasChildren());
        page.destroy();
        container.destroy();
      },
      testRemove: function testRemove() {
        var container = new qx.ui.mobile.container.Navigation();
        var page = new qx.ui.mobile.page.NavigationPage();
        this.getRoot().add(container);
        this.assertFalse(container.getContent().hasChildren());
        container.add(page);
        this.assertTrue(container.getContent().hasChildren());
        container.remove(page);
        this.assertFalse(container.getContent().hasChildren());
        page.destroy();
        container.destroy();
      },
      testUpdateEvent: function testUpdateEvent() {
        var container = new qx.ui.mobile.container.Navigation();
        var updateEventFired = false;
        container.addListener("update", function () {
          updateEventFired = true;
        });
        var page1 = new qx.ui.mobile.page.NavigationPage();
        var page2 = new qx.ui.mobile.page.NavigationPage();
        this.getRoot().add(container);
        container.add(page1);
        container.add(page2);
        page2.show();
        this.assertTrue(updateEventFired);
        page1.destroy();
        page2.destroy();
        container.destroy();
      }
    }
  });
  qx.test.mobile.container.Navigation.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Navigation.js.map?dt=1726089055786