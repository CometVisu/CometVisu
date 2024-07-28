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
      "qx.ui.window.Window": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.Window", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      _win: null,
      setUp: function setUp() {
        qx.test.ui.Window.superclass.prototype.setUp.call(this);
        this._win = [];
        for (var i = 0; i < 5; i++) {
          var win = new qx.ui.window.Window("My Window " + i);
          this._win.push(win);
          this.getRoot().add(win);
        }
        this.flush();
      },
      tearDown: function tearDown() {
        qx.test.ui.Window.superclass.prototype.tearDown.call(this);
        this._disposeArray("_win");
      },
      testActiveWindowBeforeWindowOpened: function testActiveWindowBeforeWindowOpened() {
        this.assertNull(this.getRoot().getActiveWindow());
      },
      testActiveWindowAfterWindowOpened: function testActiveWindowAfterWindowOpened() {
        this._win[0].open();
        this.flush();
        this.assertIdentical(this._win[0], this.getRoot().getActiveWindow());
      },
      testActiveWindowAfterWindowOpened2: function testActiveWindowAfterWindowOpened2() {
        this._win[0].open();
        this._win[1].open();
        this.flush();
        this.assertIdentical(this._win[1], this.getRoot().getActiveWindow());
      },
      testActiveWindowAfterWindowClosed: function testActiveWindowAfterWindowClosed() {
        this._win[0].open();
        this.flush();
        this._win[0].close();
        this.flush();
        this.assertNull(this.getRoot().getActiveWindow());
      },
      testActiveWindowAfterWindowClosed2: function testActiveWindowAfterWindowClosed2() {
        this._win[0].open();
        this._win[1].open();
        this.flush();
        this._win[1].close();
        this.flush();
        this.assertIdentical(this._win[0], this.getRoot().getActiveWindow());
      },
      testActiveWindowAfterAllWindowsOpened: function testActiveWindowAfterAllWindowsOpened() {
        for (var i = 0; i < this._win.length; i++) {
          this._win[i].open();
        }
        this.flush();
        this.assertIdentical(this._win[this._win.length - 1], this.getRoot().getActiveWindow());
      },
      testActiveWindowAfterRemovingOpenedWindow: function testActiveWindowAfterRemovingOpenedWindow() {
        this._win[0].open();
        this.flush();
        this.getRoot().remove(this._win[0]);
        this.flush();
        this.assertNull(this.getRoot().getActiveWindow());
      },
      testActiveWindowAfterRemovingOpenedWindow2: function testActiveWindowAfterRemovingOpenedWindow2() {
        this._win[0].open();
        this._win[1].open();
        this.flush();
        this.getRoot().remove(this._win[1]);
        this.flush();
        this.assertIdentical(this._win[0], this.getRoot().getActiveWindow());
      },
      testActiveWindowAfterRemovingAllWindows: function testActiveWindowAfterRemovingAllWindows() {
        for (var i = 0; i < this._win.length; i++) {
          this._win[i].open();
        }
        this.flush();
        this.getRoot().removeAll();
        this.flush();
        this.assertNull(this.getRoot().getActiveWindow());
      },
      testModalWindowIsAlwaysActiveIfOpen: function testModalWindowIsAlwaysActiveIfOpen() {
        this._win[0].setModal(true);
        this._win[0].open();
        this._win[1].open();
        this.flush();
        this.assertIdentical(this._win[0], this.getRoot().getActiveWindow());
      },
      testOrderModalOverAlwaysOnTopOverNormalWindow: function testOrderModalOverAlwaysOnTopOverNormalWindow() {
        var modal = this._win[0];
        var alwaysOnTop = this._win[1];
        var normal = this._win[2];
        modal.setModal(true);
        alwaysOnTop.setAlwaysOnTop(true);
        modal.open();
        alwaysOnTop.open();
        normal.open();
        this.flush();
        this.assertTrue(+modal.getZIndex() > +alwaysOnTop.getZIndex());
        this.assertTrue(+alwaysOnTop.getZIndex() > +normal.getZIndex());
      }
    }
  });
  qx.test.ui.Window.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Window.js.map?dt=1722151835830