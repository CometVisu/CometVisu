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
      "qx.ui.mobile.page.Page": {},
      "qx.core.Init": {}
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

  qx.Class.define("qx.test.mobile.page.Page", {
    extend: qx.test.mobile.MobileTestCase,
    members: {
      testShow: function testShow() {
        var _this = this;
        var initializedEvent = false;
        var startEvent = false;
        var stopEvent = false;
        var page = new qx.ui.mobile.page.Page();
        this.getRoot().add(page);
        page.addListener("initialize", function () {
          _this.assertFalse(startEvent, "Start event is fired before initialize event was fired!");
          initializedEvent = true;
        });
        page.addListener("start", function () {
          _this.assertTrue(initializedEvent, "Start event is fired before initialize event was fired!");
          startEvent = true;
        });
        page.addListener("stop", function () {
          stopEvent = true;
        });
        page.show();
        this.assertTrue(initializedEvent, "Initialize event is not fired!");
        this.assertTrue(startEvent, "Start event is not fired!");
        this.assertFalse(stopEvent, "Stop event is fired!");
        page.destroy();
      },
      testInitialize: function testInitialize() {
        this.__P_361_0("initialize");
      },
      testStart: function testStart() {
        this.__P_361_1("start");
      },
      testStop: function testStop() {
        this.__P_361_1("stop", function (page) {
          page.initialize();
        });
      },
      testPause: function testPause() {
        this.__P_361_0("pause");
      },
      testResume: function testResume() {
        this.__P_361_0("resume");
      },
      testWait: function testWait() {
        this.__P_361_0("wait");
      },
      testBack: function testBack() {
        this.__P_361_1("back");
      },
      testPreventBack: function testPreventBack() {
        var page = new qx.ui.mobile.page.Page();
        this.getRoot().add(page);
        var eventFiredOnApplication = false;
        var eventFiredOnPage = false;
        var application = qx.core.Init.getApplication();
        var id = application.addListener("back", function (evt) {
          eventFiredOnApplication = true;
          evt.preventDefault();
        });
        page.addListener("back", function () {
          eventFiredOnPage = true;
        });
        page.back();
        this.assertTrue(eventFiredOnApplication, "The 'back' event on application is not fired!");
        this.assertFalse(eventFiredOnPage, "The 'back' event on page is fired!");
        application.removeListenerById(id);
        page.destroy();
      },
      testMenu: function testMenu() {
        this.__P_361_0("menu");
      },
      __P_361_0: function __P_361_0(name) {
        var page = new qx.ui.mobile.page.Page();
        this.getRoot().add(page);
        var isEventFired = false;
        page.addListener(name, function () {
          isEventFired = true;
        }, this);
        page[name]();
        this.assertTrue(isEventFired, "The '" + name + "' event is not fired!");
        page.destroy();
      },
      __P_361_1: function __P_361_1(name, beforeCallback) {
        var page = new qx.ui.mobile.page.Page();
        this.getRoot().add(page);
        var eventFiredOnApplication = false;
        var eventFiredOnPage = false;
        var application = qx.core.Init.getApplication();
        var id = application.addListener(name, function () {
          eventFiredOnApplication = true;
        }, this);
        page.addListener(name, function () {
          eventFiredOnPage = true;
        }, this);
        if (beforeCallback) {
          beforeCallback(page);
        }
        page[name]();
        this.assertTrue(eventFiredOnApplication, "The '" + name + "' event on application is not fired!");
        this.assertTrue(eventFiredOnPage, "The '" + name + "' event on page is not fired!");
        application.removeListenerById(id);
        page.destroy();
      }
    }
  });
  qx.test.mobile.page.Page.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Page.js.map?dt=1726089056261