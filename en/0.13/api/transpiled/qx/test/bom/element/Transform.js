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
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.bom.client.CssTransform": {
        "require": true
      },
      "qx.dev.unit.RequirementError": {},
      "qx.bom.element.Transform": {},
      "qx.bom.Stylesheet": {},
      "qx.bom.Style": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.transform": {
          "className": "qx.bom.client.CssTransform"
        },
        "css.transform.3d": {
          "className": "qx.bom.client.CssTransform"
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
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.bom.element.Transform", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MRequirements],
    members: {
      __P_320_0: null,
      __P_320_1: null,
      setUp: function setUp() {
        this.__P_320_1 = qx.core.Environment.get("css.transform");
        if (this.__P_320_1 == null) {
          // skip the test
          throw new qx.dev.unit.RequirementError("css.transform");
        }
        this.__P_320_0 = {
          style: {}
        };
      },
      tearDown: function tearDown() {
        this.__P_320_0 = null;
      },
      /**
       * TRANSFORM FUNCTIONS
       */
      testTranslate: function testTranslate() {
        qx.bom.element.Transform.translate(this.__P_320_0, "123px");
        this.assertTrue(this.__P_320_0.style[this.__P_320_1.name].indexOf("translate(123px)") != -1);
      },
      testRotate: function testRotate() {
        qx.bom.element.Transform.rotate(this.__P_320_0, "123deg");
        this.assertTrue(this.__P_320_0.style[this.__P_320_1.name].indexOf("rotate(123deg)") != -1);
      },
      testSkew: function testSkew() {
        qx.bom.element.Transform.skew(this.__P_320_0, "123deg");
        this.assertTrue(this.__P_320_0.style[this.__P_320_1.name].indexOf("skew(123deg)") != -1);
      },
      testScale: function testScale() {
        qx.bom.element.Transform.scale(this.__P_320_0, 1.5);
        this.assertTrue(this.__P_320_0.style[this.__P_320_1.name].indexOf("scale(1.5)") != -1);
      },
      testTransform: function testTransform() {
        qx.bom.element.Transform.transform(this.__P_320_0, {
          scale: 1.2,
          translate: "123px"
        });
        this.assertTrue(this.__P_320_0.style[this.__P_320_1.name].indexOf("translate(123px)") != -1);
        this.assertTrue(this.__P_320_0.style[this.__P_320_1.name].indexOf("scale(1.2)") != -1);
      },
      "testAddStyleSheetRuleWith-X-Axis": function testAddStyleSheetRuleWithXAxis() {
        var css = qx.bom.element.Transform.getCss({
          scale: 1.2,
          translate: "123px"
        });
        var sheet = qx.bom.Stylesheet.createElement();
        qx.bom.Stylesheet.addRule(sheet, ".test", css);
        var computedRule = sheet.cssRules[0].cssText;
        this.assertTrue(computedRule.indexOf("translate(123px)") != -1, "Found: " + computedRule);
        this.assertTrue(computedRule.indexOf("scale(1.2)") != -1, "Found: " + computedRule);
      },
      "testAddStyleSheetRuleWith-XY-Axis": function testAddStyleSheetRuleWithXYAxis() {
        var css = qx.bom.element.Transform.getCss({
          scale: "1.2, 1",
          translate: "123px,234px"
        });
        var sheet = qx.bom.Stylesheet.createElement();
        qx.bom.Stylesheet.addRule(sheet, ".test", css);
        var computedRule = sheet.cssRules[0].cssText;
        this.assertTrue(computedRule.indexOf("translate(123px, 234px)") != -1, "Found: " + computedRule);
        this.assertTrue(computedRule.indexOf("scale(1.2, 1)") != -1, "Found: " + computedRule);
      },
      /**
       * ARRAY VALUES
       */
      test3D: function test3D() {
        qx.bom.element.Transform.translate(this.__P_320_0, ["1px", "2px", "3px"]);

        // 3d property
        if (qx.core.Environment.get("css.transform.3d")) {
          this.assertTrue(this.__P_320_0.style[this.__P_320_1.name].indexOf("translate3d(1px, 2px, 3px)") != -1, "translate3d");
        }

        // 2d property
        else {
          this.assertTrue(this.__P_320_0.style[this.__P_320_1.name].indexOf("translateX(1px) translateY(2px)") != -1);
        }
      },
      "testAddStyleSheetRuleWith-XYZ-Axis": function testAddStyleSheetRuleWithXYZAxis() {
        var css = qx.bom.element.Transform.getCss({
          scale: [1.2, 1, 0],
          translate: ["123px", "234px", "345em"]
        });
        var sheet = qx.bom.Stylesheet.createElement();
        qx.bom.Stylesheet.addRule(sheet, ".test", css);
        var computedRule = sheet.cssRules[0].cssText;

        // 3d property
        if (qx.core.Environment.get("css.transform.3d")) {
          this.assertTrue(computedRule.indexOf("translate3d(123px, 234px, 345em)") != -1, "Found: " + computedRule);
          this.assertTrue(computedRule.indexOf("scale3d(1.2, 1, 0)") != -1, "Found: " + computedRule);
        }

        // 2d property
        else {
          this.assertTrue(computedRule.indexOf("translateX(123px)") != -1, "Found: " + computedRule);
          this.assertTrue(computedRule.indexOf("translateY(234px)") != -1, "Found: " + computedRule);
          this.assertFalse(computedRule.indexOf("translateY(345em)") != -1, "Found: " + computedRule);
          this.assertTrue(computedRule.indexOf("scaleX(1.2)") != -1, "Found: " + computedRule);
          this.assertTrue(computedRule.indexOf("scaleY(1)") != -1, "Found: " + computedRule);
          this.assertFalse(computedRule.indexOf("scaleZ(0)") != -1, "Found: " + computedRule);
        }
      },
      /**
       * CSS HELPER
       */
      testGetCss: function testGetCss() {
        var value = qx.bom.element.Transform.getCss({
          scale: 1.2
        });
        this.assertEquals(qx.bom.Style.getCssName(this.__P_320_1.name) + ":scale(1.2);", value);
      },
      /**
       * ADDITIONAL CSS TRANSFORM PROPERTIES
       */
      testOrigin: function testOrigin() {
        qx.bom.element.Transform.setOrigin(this.__P_320_0, "30% 20%");
        this.assertEquals("30% 20%", this.__P_320_0.style[this.__P_320_1["origin"]]);
        this.assertEquals("30% 20%", qx.bom.element.Transform.getOrigin(this.__P_320_0));
      },
      testStyle: function testStyle() {
        qx.bom.element.Transform.setStyle(this.__P_320_0, "affe");
        this.assertEquals("affe", this.__P_320_0.style[this.__P_320_1["style"]]);
        this.assertEquals("affe", qx.bom.element.Transform.getStyle(this.__P_320_0));
      },
      testPerspective: function testPerspective() {
        qx.bom.element.Transform.setPerspective(this.__P_320_0, 123);
        this.assertEquals("123px", this.__P_320_0.style[this.__P_320_1["perspective"]]);
        this.assertEquals("123px", qx.bom.element.Transform.getPerspective(this.__P_320_0));
      },
      testPerspectiveOrigin: function testPerspectiveOrigin() {
        qx.bom.element.Transform.setPerspectiveOrigin(this.__P_320_0, "30% 10%");
        this.assertEquals("30% 10%", this.__P_320_0.style[this.__P_320_1["perspective-origin"]]);
        this.assertEquals("30% 10%", qx.bom.element.Transform.getPerspectiveOrigin(this.__P_320_0));
      },
      testBackfaceVisibility: function testBackfaceVisibility() {
        qx.bom.element.Transform.setBackfaceVisibility(this.__P_320_0, true);
        this.assertEquals("visible", this.__P_320_0.style[this.__P_320_1["backface-visibility"]]);
        this.assertTrue(qx.bom.element.Transform.getBackfaceVisibility(this.__P_320_0));
      },
      testGetTransformValue: function testGetTransformValue() {
        var cssValue;

        // one axis
        cssValue = qx.bom.element.Transform.getTransformValue({
          scale: [1]
        });
        this.assertEquals(cssValue, "scaleX(1)");

        // two axis
        cssValue = qx.bom.element.Transform.getTransformValue({
          scale: [1, 2]
        });
        this.assertEquals(cssValue, "scaleX(1) scaleY(2)");

        // three axis
        cssValue = qx.bom.element.Transform.getTransformValue({
          scale: [1, 2, 3]
        });

        // 3d property
        if (qx.core.Environment.get("css.transform.3d")) {
          this.assertEquals(cssValue, "scale3d(1, 2, 3)");
        }

        // 2d property
        else {
          this.assertEquals(cssValue, "scaleX(1) scaleY(2)");
        }
      },
      testTransformArray: function testTransformArray() {
        qx.bom.element.Transform.transform(this.__P_320_0, {
          translate: ["1px", "2px", "3px"],
          scale: [1, 2, 3],
          rotate: ["1deg", "2deg", "3deg"],
          skew: ["1deg", "2deg"]
        });

        // 3d property
        if (qx.core.Environment.get("css.transform.3d")) {
          this.assertTrue(this.__P_320_0.style[this.__P_320_1.name].indexOf("translate3d(1px, 2px, 3px)") != -1, "translate3d");
          this.assertTrue(this.__P_320_0.style[this.__P_320_1.name].indexOf("scale3d(1, 2, 3)") != -1, "scale3d");
          this.assertTrue(this.__P_320_0.style[this.__P_320_1.name].indexOf("rotateZ(3deg)") != -1, "rotate");
          this.assertTrue(this.__P_320_0.style[this.__P_320_1.name].indexOf("skewX(1deg) skewY(2deg)") != -1, "skew");
        }

        // 2d property
        else {
          this.assertTrue(this.__P_320_0.style[this.__P_320_1.name].indexOf("translateX(1px) translateY(2px)") != -1, "translate");
          this.assertTrue(this.__P_320_0.style[this.__P_320_1.name].indexOf("scaleX(1) scaleY(2)") != -1, "scale");
          this.assertTrue(this.__P_320_0.style[this.__P_320_1.name].indexOf("skewX(1deg) skewY(2deg)") != -1, "skew");
        }
      }
    }
  });
  qx.test.bom.element.Transform.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Transform.js.map?dt=1729101237468