(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.LayoutTestCase": {
        "require": true
      },
      "qx.ui.core.Blocker": {},
      "qx.event.Registration": {},
      "qx.event.handler.Focus": {},
      "qx.ui.form.TextField": {},
      "qx.ui.core.Widget": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.core.Blocker", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __P_386_0: null,
      setUp: function setUp() {
        qx.test.ui.core.Blocker.superclass.prototype.setUp.call(this);
        this.__P_386_0 = new qx.ui.core.Blocker(this.getRoot());
        this.__P_386_0.setColor("green");
        this.__P_386_0.setOpacity(0.5);
      },
      tearDown: function tearDown() {
        qx.test.ui.core.Blocker.superclass.prototype.tearDown.call(this);
        this.__P_386_0.dispose();
      },
      testBlocker: function testBlocker() {
        var blockerElement = this.__P_386_0.getBlockerElement();
        this.__P_386_0.block();
        this.flush();
        this.assertTrue(this.__P_386_0.isBlocked(), "isBlocked()");
        this.assertTrue(blockerElement.isIncluded(), "isIncluded()");
        this.__P_386_0.unblock();
        this.flush();
        this.assertFalse(this.__P_386_0.isBlocked(), "isBlocked()");
        this.assertFalse(blockerElement.isIncluded(), "isIncluded()");
      },
      testBlockerThrice: function testBlockerThrice() {
        var blockerElement = this.__P_386_0.getBlockerElement();
        this.__P_386_0.block();
        this.flush();
        this.assertTrue(this.__P_386_0.isBlocked(), "isBlocked()");
        this.assertTrue(blockerElement.isIncluded(), "isIncluded()");
        this.__P_386_0.block();
        this.flush();
        this.assertTrue(this.__P_386_0.isBlocked(), "isBlocked()");
        this.assertTrue(blockerElement.isIncluded(), "isIncluded()");
        this.__P_386_0.block();
        this.flush();
        this.assertTrue(this.__P_386_0.isBlocked(), "isBlocked()");
        this.assertTrue(blockerElement.isIncluded(), "isIncluded()");
        this.__P_386_0.unblock();
        this.flush();
        this.assertTrue(this.__P_386_0.isBlocked(), "isBlocked()");
        this.assertTrue(blockerElement.isIncluded(), "isIncluded()");
        this.__P_386_0.unblock();
        this.flush();
        this.assertTrue(this.__P_386_0.isBlocked(), "isBlocked()");
        this.assertTrue(blockerElement.isIncluded(), "isIncluded()");
        this.__P_386_0.unblock();
        this.flush();
        this.assertFalse(this.__P_386_0.isBlocked(), "isBlocked()");
        this.assertFalse(blockerElement.isIncluded(), "isIncluded()");
      },
      testForceUnblock: function testForceUnblock() {
        var blockerElement = this.__P_386_0.getBlockerElement();
        this.__P_386_0.block();
        this.flush();
        this.assertTrue(this.__P_386_0.isBlocked(), "isBlocked()");
        this.assertTrue(blockerElement.isIncluded(), "isIncluded()");
        this.__P_386_0.block();
        this.flush();
        this.assertTrue(this.__P_386_0.isBlocked(), "isBlocked()");
        this.assertTrue(blockerElement.isIncluded(), "isIncluded()");
        this.__P_386_0.forceUnblock();
        this.flush();
        this.assertFalse(this.__P_386_0.isBlocked(), "isBlocked()");
        this.assertFalse(blockerElement.isIncluded(), "isIncluded()");
      },
      testBlockedEvent: function testBlockedEvent() {
        var _this = this;
        this.__P_386_1 = false;
        this.__P_386_2 = false;
        this.__P_386_0.addListenerOnce("blocked", function (e) {
          _this.__P_386_1 = true;
        });
        this.__P_386_0.addListenerOnce("unblocked", function (e) {
          _this.__P_386_2 = true;
        });
        this.__P_386_0.block();
        this.__P_386_0.unblock();
        this.wait(100, function () {
          this.assertTrue(this.__P_386_1, "'blocked' event was not fired, after block() was executed!");
          this.assertTrue(this.__P_386_2, "'unblocked' event was not fired, after unblock() was executed!");
        }, this);
      },
      testRestoreActiveAndFocusedWidgets: function testRestoreActiveAndFocusedWidgets() {
        var activeWidget, focusedWidget;
        var focusHandler = qx.event.Registration.getManager(window).getHandler(qx.event.handler.Focus);
        var txt2 = new qx.ui.form.TextField();
        this.getRoot().add(txt2, {
          left: 100,
          top: 0
        });
        txt2.focus();
        var txt1 = new qx.ui.form.TextField();
        this.getRoot().add(txt1);
        // set active widget after focusing a widget, because focus() sets the same widget as active one.
        txt1.activate();
        this.flush();
        var blockerElement = this.__P_386_0.getBlockerElement();
        this.__P_386_0.block();
        this.flush();
        this.assertTrue(this.__P_386_0.isBlocked(), "isBlocked()");
        this.assertTrue(blockerElement.isIncluded(), "isIncluded()");
        activeWidget = qx.ui.core.Widget.getWidgetByElement(focusHandler.getActive());
        this.assertFalse(activeWidget === txt1, "text field 1 must not be active");
        focusedWidget = qx.ui.core.Widget.getWidgetByElement(focusHandler.getFocus());
        this.assertFalse(focusedWidget === txt2, "text field 2 must not be focused");
        this.__P_386_0.unblock();
        this.flush();
        this.assertFalse(this.__P_386_0.isBlocked(), "isBlocked()");
        this.assertFalse(blockerElement.isIncluded(), "isIncluded()");
        activeWidget = qx.ui.core.Widget.getWidgetByElement(focusHandler.getActive());
        this.assertTrue(activeWidget === txt1, "text field 1 must be active");
        focusedWidget = qx.ui.core.Widget.getWidgetByElement(focusHandler.getFocus());
        this.assertTrue(focusedWidget === txt2, "text field 2 must be focused");

        // clear
        txt1.destroy();
        txt2.destroy();
        this.flush();
      },
      testRestoreDisposedWidget: function testRestoreDisposedWidget() {
        var widget;
        var focusHandler = qx.event.Registration.getManager(window).getHandler(qx.event.handler.Focus);
        var txt = new qx.ui.form.TextField();
        this.getRoot().add(txt);
        txt.focus();
        this.flush();
        var blockerElement = this.__P_386_0.getBlockerElement();
        this.__P_386_0.block();
        this.flush();
        this.assertTrue(this.__P_386_0.isBlocked(), "isBlocked()");
        this.assertTrue(blockerElement.isIncluded(), "isIncluded()");

        // destroy text field
        txt.destroy();
        this.flush();
        this.__P_386_0.unblock();
        this.flush();
        this.assertFalse(this.__P_386_0.isBlocked(), "isBlocked()");
        this.assertFalse(blockerElement.isIncluded(), "isIncluded()");

        // text field must not be focused
        widget = qx.ui.core.Widget.getWidgetByElement(focusHandler.getFocus());
        this.assertFalse(widget === txt, "text field must be focused, because it is destroyed");
        txt.destroy();
        this.flush();
      }
    }
  });
  qx.test.ui.core.Blocker.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Blocker.js.map?dt=1735341780776