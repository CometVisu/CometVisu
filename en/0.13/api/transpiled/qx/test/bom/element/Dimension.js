(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.bom.element.Dimension": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Alexander Steitz (aback)
  
  ************************************************************************ */

  qx.Class.define("qx.test.bom.element.Dimension", {
    extend: qx.dev.unit.TestCase,
    members: {
      setUp: function setUp() {
        this.__P_318_0 = document.createElement("span");
        document.body.appendChild(this.__P_318_0);
        this.__P_318_1 = document.createElement("span");
        this.__P_318_1.style.padding = "2px";
        document.body.appendChild(this.__P_318_1);
        this.__P_318_2 = document.createElement("div");
        this.__P_318_2.style.width = "200px";
        document.body.appendChild(this.__P_318_2);
        this.__P_318_3 = document.createElement("div");
        this.__P_318_3.style.padding = "2px";
        this.__P_318_3.style.width = "200px";
        document.body.appendChild(this.__P_318_3);
      },
      tearDown: function tearDown() {
        document.body.removeChild(this.__P_318_0);
        this.__P_318_0 = null;
        document.body.removeChild(this.__P_318_1);
        this.__P_318_1 = null;
        document.body.removeChild(this.__P_318_2);
        this.__P_318_2 = null;
        document.body.removeChild(this.__P_318_3);
        this.__P_318_3 = null;
      },
      testContentWidthOfInlineElement: function testContentWidthOfInlineElement() {
        this.assertEquals(0, qx.bom.element.Dimension.getContentWidth(this.__P_318_0));
      },
      testContentWidthOfInlineElementWithPadding: function testContentWidthOfInlineElementWithPadding() {
        this.assertEquals(0, qx.bom.element.Dimension.getContentWidth(this.__P_318_1));
      },
      testContentWidthOfBlockElement: function testContentWidthOfBlockElement() {
        this.assertEquals(200, qx.bom.element.Dimension.getContentWidth(this.__P_318_2));
      },
      testContentWidthOfBlockElementWithPadding: function testContentWidthOfBlockElementWithPadding() {
        this.assertEquals(200, qx.bom.element.Dimension.getContentWidth(this.__P_318_3));
      },
      testRoundingErrorInWidthAndHeightGetters: function testRoundingErrorInWidthAndHeightGetters() {
        // width = left - right = height = bottom - top = 38.416656494140625
        var mockElement1 = {
          getBoundingClientRect: function getBoundingClientRect() {
            return {
              right: 91.58332824707031,
              left: 53.16667175292969,
              bottom: 91.58332824707031,
              top: 53.16667175292969
            };
          }
        };

        // exactly same width and height as mockElement1
        var mockElement2 = {
          getBoundingClientRect: function getBoundingClientRect() {
            return {
              right: 91.58332824707031,
              left: 53.16667175292969,
              bottom: 91.58332824707031,
              top: 53.16667175292969
            };
          }
        };

        // make sure both mock objects have the same width
        this.assertEquals(mockElement1.getBoundingClientRect().right - mockElement1.getBoundingClientRect().left, mockElement2.getBoundingClientRect().right - mockElement2.getBoundingClientRect().left);

        // ... and the same height
        this.assertEquals(mockElement1.getBoundingClientRect().bottom - mockElement1.getBoundingClientRect().top, mockElement2.getBoundingClientRect().bottom - mockElement2.getBoundingClientRect().top);

        // the width and height calculation for both objects should return the same
        this.assertEquals(qx.bom.element.Dimension.getWidth(mockElement1), qx.bom.element.Dimension.getWidth(mockElement2));
        this.assertEquals(qx.bom.element.Dimension.getHeight(mockElement1), qx.bom.element.Dimension.getHeight(mockElement2));
      }
    }
  });
  qx.test.bom.element.Dimension.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Dimension.js.map?dt=1722153824229