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
      "qx.ui.container.Composite": {},
      "qx.ui.layout.VBox": {},
      "qx.ui.toolbar.ToolBar": {},
      "qx.ui.toolbar.Button": {},
      "qx.ui.core.Spacer": {},
      "qx.ui.basic.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.toolbar.OverflowHandling", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __P_431_0: null,
      __P_431_1: null,
      __P_431_2: null,
      __P_431_3: null,
      __P_431_4: null,
      __P_431_5: null,
      setUp: function setUp() {
        qx.test.ui.toolbar.OverflowHandling.superclass.prototype.setUp.call(this);
        this.__P_431_0 = new qx.ui.container.Composite();
        this.__P_431_0.setLayout(new qx.ui.layout.VBox());
        this.getRoot().add(this.__P_431_0);
        this.__P_431_0.setWidth(100);
        this.__P_431_1 = new qx.ui.toolbar.ToolBar();
        this.__P_431_0.add(this.__P_431_1);
        this.__P_431_2 = new qx.ui.toolbar.Button("B1");
        this.__P_431_3 = new qx.ui.toolbar.Button("B2");
        this.__P_431_4 = new qx.ui.toolbar.Button("B3");
      },
      tearDown: function tearDown() {
        qx.test.ui.toolbar.OverflowHandling.superclass.prototype.tearDown.call(this);
        var self = this;
        this.__P_431_2.destroy();
        this.__P_431_3.destroy();
        this.__P_431_4.destroy();
        this.__P_431_1.destroy();
        this.__P_431_0.destroy();
        if (self.__P_431_5) {
          this.__P_431_5.destroy();
        }
      },
      __P_431_6: function __P_431_6() {
        this.__P_431_1.add(this.__P_431_2);
        this.__P_431_1.add(this.__P_431_3);
        this.__P_431_1.add(this.__P_431_4);
      },
      testShow: function testShow() {
        this.__P_431_6();
        this.__P_431_1.setShow("label");
        this.assertEquals(this.__P_431_1.getShow(), this.__P_431_2.getShow());
        this.assertEquals(this.__P_431_1.getShow(), this.__P_431_3.getShow());
        this.assertEquals(this.__P_431_1.getShow(), this.__P_431_4.getShow());
        this.__P_431_1.setShow("icon");
        this.assertEquals(this.__P_431_1.getShow(), this.__P_431_2.getShow());
        this.assertEquals(this.__P_431_1.getShow(), this.__P_431_3.getShow());
        this.assertEquals(this.__P_431_1.getShow(), this.__P_431_4.getShow());
      },
      testSpacing: function testSpacing() {
        this.__P_431_1.setSpacing(123);
        this.assertEquals(this.__P_431_1.getSpacing(), this.__P_431_1._getLayout().getSpacing());
      },
      testSpacer: function testSpacer() {
        this.__P_431_1.addSpacer();
        this.assertTrue(this.__P_431_1.getChildren()[0] instanceof qx.ui.core.Spacer);
      },
      testHideItem: function testHideItem() {
        this.__P_431_6();
        this.flush();
        this.__P_431_1.setOverflowHandling(true);
        var bounds = this.__P_431_4.getBounds();
        var self = this;
        this.assertEventFired(this.__P_431_1, "hideItem", function () {
          self.__P_431_0.setWidth(bounds.left + 10);
          self.flush();
        }, function (e) {
          self.assertTrue(self.__P_431_4 === e.getData());
          self.assertTrue("excluded" === self.__P_431_4.getVisibility());
        });
      },
      testShowItem: function testShowItem() {
        this.__P_431_6();
        this.flush();
        this.__P_431_1.setOverflowHandling(true);
        this.__P_431_0.setWidth(60);
        this.flush();
        var self = this;
        this.assertEventFired(this.__P_431_1, "showItem", function () {
          self.__P_431_0.setWidth(100);
          self.flush();
        }, function (e) {
          self.assertTrue(self.__P_431_4 === e.getData() || self.__P_431_3 === e.getData());
          self.assertTrue("visible" === e.getData().getVisibility());
        });
      },
      testHideItemPriority: function testHideItemPriority() {
        this.__P_431_6();
        this.flush();
        this.__P_431_1.setOverflowHandling(true);
        this.__P_431_1.setRemovePriority(this.__P_431_3, 2);
        var bounds = this.__P_431_4.getBounds();
        var self = this;
        this.assertEventFired(this.__P_431_1, "hideItem", function () {
          self.__P_431_0.setWidth(bounds.left + 10);
          self.flush();
        }, function (e) {
          self.assertEquals(self.__P_431_3, e.getData());
          self.assertEquals("excluded", self.__P_431_3.getVisibility());
        });
      },
      testShowItemPriority: function testShowItemPriority() {
        this.__P_431_6();
        this.flush();
        this.__P_431_1.setOverflowHandling(true);
        this.__P_431_1.setRemovePriority(this.__P_431_3, 2);
        var bounds = this.__P_431_4.getBounds();
        this.__P_431_0.setWidth(bounds.left + 10);
        this.flush();
        var self = this;
        this.assertEventFired(this.__P_431_1, "showItem", function () {
          self.__P_431_0.setWidth(200);
          self.flush();
        }, function (e) {
          self.assertEquals(self.__P_431_3, e.getData());
          self.assertEquals("visible", self.__P_431_3.getVisibility());
        });
      },
      testShowIndicator: function testShowIndicator(attribute) {
        var _this = this;
        this.__P_431_6();
        this.flush();
        this.__P_431_1.setOverflowHandling(true);
        this.__P_431_5 = new qx.ui.basic.Label(".");
        this.__P_431_1.add(this.__P_431_5);
        this.__P_431_1.setOverflowIndicator(this.__P_431_5);
        this.assertEquals("excluded", this.__P_431_5.getVisibility());
        this.__P_431_5.addListener("changeVisibility", function () {
          _this.resume(function () {
            this.assertEquals("visible", this.__P_431_5.getVisibility());
          }, _this);
        });
        this.__P_431_0.setWidth(60);
        this.wait();
      },
      testHideIndicator: function testHideIndicator(attribute) {
        var _this2 = this;
        this.__P_431_6();
        this.flush();
        this.__P_431_1.setOverflowHandling(true);
        this.__P_431_5 = new qx.ui.basic.Label(".");
        this.__P_431_1.add(this.__P_431_5);
        this.__P_431_1.setOverflowIndicator(this.__P_431_5);
        this.assertEquals("excluded", this.__P_431_5.getVisibility());
        this.__P_431_0.setWidth(60);
        this.flush();
        this.__P_431_5.addListener("changeVisibility", function () {
          _this2.resume(function () {
            this.assertEquals("excluded", this.__P_431_5.getVisibility());
          }, _this2);
        });
        this.__P_431_0.setWidth(160);
        this.wait();
      },
      testShowIndicatorHuge: function testShowIndicatorHuge(attribute) {
        var _this3 = this;
        this.__P_431_6();
        this.flush();
        this.__P_431_1.setOverflowHandling(true);
        this.__P_431_5 = new qx.ui.basic.Label(".....");
        this.__P_431_1.add(this.__P_431_5);
        this.__P_431_1.setOverflowIndicator(this.__P_431_5);
        this.assertEquals("excluded", this.__P_431_5.getVisibility());
        this.__P_431_3.addListener("changeVisibility", function () {
          _this3.resume(function () {
            this.assertEquals("visible", this.__P_431_5.getVisibility());

            // check if both buttons have been removed
            this.assertEquals("excluded", this.__P_431_4.getVisibility(), "1");
            this.assertEquals("excluded", this.__P_431_3.getVisibility(), "2");
          }, _this3);
        });
        this.__P_431_0.setWidth(60);
        this.wait();
      },
      testHideItemRemoved: function testHideItemRemoved() {
        this.__P_431_6();
        this.flush();
        this.__P_431_1.setOverflowHandling(true);
        this.__P_431_1.remove(this.__P_431_4);
        var self = this;
        this.assertEventNotFired(this.__P_431_1, "hideItem", function () {
          var bounds = self.__P_431_4.getBounds();
          self.__P_431_0.setWidth(bounds.left + 10);
          self.flush();
        });
      },
      testShowItemRemoved: function testShowItemRemoved() {
        this.__P_431_6();
        this.__P_431_0.setWidth(200);
        this.flush();
        this.__P_431_1.setOverflowHandling(true);
        var bounds = this.__P_431_4.getBounds();
        this.__P_431_0.setWidth(bounds.left + 40);
        this.flush();
        var self = this;
        setTimeout(function () {
          self.resume(function () {
            console.log("" + JSON.stringify(self.__P_431_0.getBounds()));
            console.log("1: " + JSON.stringify(self.__P_431_2.getBounds()));
            console.log("2: " + JSON.stringify(self.__P_431_3.getBounds()));
            console.log("3: " + JSON.stringify(self.__P_431_4.getBounds()));
            var bounds = self.__P_431_3.getBounds();
            console.log(JSON.stringify(bounds));
            self.__P_431_0.setWidth(bounds.left + 60);
            self.flush();
            console.log("" + JSON.stringify(self.__P_431_0.getBounds()));
            this.assertEventFired(this.__P_431_1, "showItem", function () {
              self.__P_431_1.remove(self.__P_431_3);
              self.flush();
              var i = 10;
            }, function (e) {
              self.assertEquals(self.__P_431_4, e.getData());
              self.assertEquals("visible", self.__P_431_4.getVisibility());
            });
          });
        }, 100);
        this.wait();
      },
      testAddItem: function testAddItem() {
        this.__P_431_5 = new qx.ui.basic.Label(".");
        this.__P_431_1.add(this.__P_431_5);
        this.__P_431_1.setOverflowIndicator(this.__P_431_5);
        this.__P_431_1.setOverflowHandling(true);
        this.__P_431_0.setWidth(60);
        this.flush();
        var self = this;
        this.assertEventFired(this.__P_431_5, "changeVisibility", function () {
          self.__P_431_6();
          self.flush();
        }, function (e) {
          self.assertEquals("visible", self.__P_431_5.getVisibility());
          self.assertEquals("excluded", self.__P_431_4.getVisibility());
        });
      }
    }
  });
  qx.test.ui.toolbar.OverflowHandling.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=OverflowHandling.js.map?dt=1722151838190