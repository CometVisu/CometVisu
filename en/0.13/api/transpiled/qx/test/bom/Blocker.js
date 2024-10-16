(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.bom.Blocker": {},
      "qx.dom.Element": {},
      "qx.bom.element.Style": {},
      "qx.bom.Document": {},
      "qx.bom.element.Dimension": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.dom.Hierarchy": {},
      "qx.event.Timer": {},
      "qx.bom.element.Location": {},
      "qx.util.ColorUtil": {},
      "qx.bom.element.Opacity": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Alexander Steitz (aback)
  
  ************************************************************************ */

  qx.Class.define("qx.test.bom.Blocker", {
    extend: qx.dev.unit.TestCase,
    members: {
      setUp: function setUp() {
        this.__P_305_0 = new qx.bom.Blocker();
        this.__P_305_0.setBlockerZIndex(199);
        this.__P_305_1 = qx.dom.Element.create("div");
        qx.bom.element.Style.setStyles(this.__P_305_1, {
          position: "absolute",
          top: "100px",
          left: "100px",
          width: "500px",
          height: "400px",
          zIndex: 200
        });
        qx.dom.Element.insertBegin(this.__P_305_1, document.body);
      },
      tearDown: function tearDown() {
        this.__P_305_0.unblock();
        this.__P_305_0.dispose();
        this.__P_305_0 = null;
        qx.dom.Element.remove(this.__P_305_1);
      },
      testBlockWholeDocument: function testBlockWholeDocument() {
        this.__P_305_0.block();
        var blockerElement = this.__P_305_0.getBlockerElement();
        this.assertNotNull(blockerElement, "Blocker element not inserted.");
        this.assertEquals(qx.bom.Document.getWidth(), qx.bom.element.Dimension.getWidth(blockerElement));
        this.assertEquals(qx.bom.Document.getHeight(), qx.bom.element.Dimension.getHeight(blockerElement));
        if (qx.core.Environment.get("engine.name") == "mshtml") {
          var childElements = qx.dom.Hierarchy.getChildElements(document.body);
          var blockerIframeElement = childElements[childElements.length - 1];
          this.assertNotNull(blockerIframeElement, "Blocker iframe element not inserted");
          this.assertEquals(qx.bom.Document.getWidth(), qx.bom.element.Dimension.getWidth(blockerIframeElement));
          this.assertEquals(qx.bom.Document.getHeight(), qx.bom.element.Dimension.getHeight(blockerIframeElement));
        }
        this.__P_305_0.unblock();
      },
      testUnblockWholeDocument: function testUnblockWholeDocument() {
        this.__P_305_0.block();
        if (qx.core.Environment.get("engine.name") == "mshtml") {
          var childElements = qx.dom.Hierarchy.getChildElements(document.body);
          var blockerIframeElement = childElements[childElements.length - 1];
        }
        this.__P_305_0.unblock();
        var blockerElement = this.__P_305_0.getBlockerElement();
        this.assertFalse(qx.dom.Element.isInDom(blockerElement, window), "Blocker element not correctly removed");
        if (qx.core.Environment.get("engine.name") == "mshtml") {
          this.assertFalse(qx.dom.Element.isInDom(blockerIframeElement, window), "Blocker iframe element not correctly removed");
        }
      },
      testBlockElement: function testBlockElement() {
        this.__P_305_0.block(this.__P_305_1);

        // Timer is needed for IE6, otherwise the test will fail because IE6
        // is not able to resize the blockerElement fast enough
        qx.event.Timer.once(function () {
          var self = this;
          this.resume(function () {
            var blockerElement = self.__P_305_0.getBlockerElement();
            self.assertNotNull(blockerElement, "Blocker element not inserted.");
            self.assertEquals(qx.bom.element.Dimension.getWidth(self.__P_305_1), qx.bom.element.Dimension.getWidth(blockerElement));
            self.assertEquals(qx.bom.element.Dimension.getHeight(self.__P_305_1), qx.bom.element.Dimension.getHeight(blockerElement));
            self.assertEquals(qx.bom.element.Location.getLeft(self.__P_305_1), qx.bom.element.Location.getLeft(blockerElement));
            self.assertEquals(qx.bom.element.Location.getTop(self.__P_305_1), qx.bom.element.Location.getTop(blockerElement));
            self.assertEquals(qx.bom.element.Style.get(self.__P_305_1, "zIndex") - 1, qx.bom.element.Style.get(blockerElement, "zIndex"));
            if (qx.core.Environment.get("engine.name") == "mshtml") {
              var childElements = qx.dom.Hierarchy.getChildElements(document.body);
              var blockerIframeElement = childElements[childElements.length - 1];
              self.assertEquals(qx.bom.element.Style.get(self.__P_305_1, "zIndex") - 2, qx.bom.element.Style.get(blockerIframeElement, "zIndex"));
            }
            self.__P_305_0.unblock();
          }, self);
        }, this, 1000);
        this.wait();
      },
      testBlockerColor: function testBlockerColor() {
        this.__P_305_0.setBlockerColor("#FF0000");
        this.__P_305_0.block();
        var blockerElement = this.__P_305_0.getBlockerElement();
        var color = qx.bom.element.Style.get(blockerElement, "backgroundColor");
        if (qx.util.ColorUtil.isRgbString(color)) {
          this.assertEquals("rgb(255, 0, 0)", color);
        } else {
          this.assertEquals("#ff0000", color);
        }
        this.__P_305_0.unblock();
      },
      testBlockerOpacity: function testBlockerOpacity() {
        this.__P_305_0.setBlockerOpacity(0.7);
        this.__P_305_0.block();
        var blockerElement = this.__P_305_0.getBlockerElement();
        var value = qx.bom.element.Opacity.get(blockerElement);
        if (qx.core.Environment.get("engine.name") == "webkit") {
          value = Math.round(value * 10) / 10;
        }
        this.assertEquals(0.7, value);
        this.__P_305_0.unblock();
      },
      testDoubleBlocking: function testDoubleBlocking() {
        var before = qx.dom.Hierarchy.getDescendants(document.body);
        this.__P_305_0.block(this.__P_305_1);
        this.__P_305_0.block(this.__P_305_1);
        var after = qx.dom.Hierarchy.getDescendants(document.body);
        if (qx.core.Environment.get("engine.name") == "mshtml") {
          this.assertEquals(after.length, before.length + 2);
        } else {
          this.assertEquals(after.length, before.length + 1);
        }
        this.__P_305_0.unblock();
      },
      testDoubleUnBlocking: function testDoubleUnBlocking() {
        this.__P_305_0.block(this.__P_305_1);
        this.__P_305_0.unblock();
        this.__P_305_0.unblock();
        var blockerElement = this.__P_305_0.getBlockerElement();
        this.assertNotEquals(blockerElement.parentNode, this.__P_305_1);
      }
    }
  });
  qx.test.bom.Blocker.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Blocker.js.map?dt=1729101236762