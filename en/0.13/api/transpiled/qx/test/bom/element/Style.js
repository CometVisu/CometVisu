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
      "qx.bom.client.Css": {
        "require": true
      },
      "qx.bom.element.Style": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.dev.unit.RequirementError": {},
      "qx.bom.Stylesheet": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.boxshadow": {
          "className": "qx.bom.client.Css"
        },
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "browser.documentmode": {
          "className": "qx.bom.client.Browser"
        },
        "browser.name": {
          "className": "qx.bom.client.Browser"
        },
        "browser.version": {
          "className": "qx.bom.client.Browser"
        },
        "css.opacity": {
          "className": "qx.bom.client.Css"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2013 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Alexander Steitz (aback)
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  qx.Class.define("qx.test.bom.element.Style", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MRequirements],
    members: {
      __P_319_0: null,
      hasCssBoxshadow: function hasCssBoxshadow() {
        return qx.core.Environment.get("css.boxshadow") !== null;
      },
      setUp: function setUp() {
        this.__P_319_0 = document.createElement("div");
        document.body.appendChild(this.__P_319_0);
      },
      tearDown: function tearDown() {
        document.body.removeChild(this.__P_319_0);
        this.__P_319_0 = null;
      },
      testSetStylesWithCss3: function testSetStylesWithCss3() {
        if (this.require(["cssBoxshadow"])) {
          var styles = {
            MozBoxShadow: "6px 6px 10px rgb(128, 128, 128)",
            WebkitBoxShadow: "6px 6px 10px rgb(128, 128, 128)",
            boxShadow: "6px 6px 10px rgb(128, 128, 128)"
          };
          qx.bom.element.Style.setStyles(this.__P_319_0, styles);
          var expected = qx.core.Environment.select("engine.name", {
            webkit: "rgb(128, 128, 128) 6px 6px 10px",
            mshtml: "6px 6px 10px rgb(128,128,128)",
            "default": "6px 6px 10px rgb(128, 128, 128)"
          });
          this.assertEquals(expected, this.__P_319_0.style["boxShadow"]);
        }
      },
      testSetAndGetCss: function testSetAndGetCss() {
        var css = "font-weight: bold;";
        qx.bom.element.Style.setCss(this.__P_319_0, css);
        this.assertMatch(qx.bom.element.Style.getCss(this.__P_319_0), /font-weight.*?bold/i);
      },
      testSet: function testSet() {
        var name = "border";
        var style = ["1px", "solid", "red"];
        qx.bom.element.Style.set(this.__P_319_0, name, style.join(" "));
        if (qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.documentmode") < 9) {
          this.assertEquals("red 1px solid", this.__P_319_0.style.border);
        } else {
          this.assertEquals(style.join(" "), this.__P_319_0.style.border);
        }
        this.assertEquals(style[0], this.__P_319_0.style.borderWidth);
        this.assertEquals(style[1], this.__P_319_0.style.borderStyle);
        this.assertEquals(style[2], this.__P_319_0.style.borderColor);
      },
      testGet: function testGet() {
        var name = "border";
        var style = "1px solid red";
        var engine = qx.core.Environment.get("engine.name");
        var expected = ["1px", "solid", "red"];
        var isOldSafari = qx.core.Environment.get("browser.name") == "safari" && qx.core.Environment.get("browser.version") < 6;
        if (engine == "opera" || engine == "webkit" && !isOldSafari && qx.core.Environment.get("browser.name") !== "edge") {
          expected = ["1px", "solid", "rgb(255, 0, 0)"];
        }
        qx.bom.element.Style.set(this.__P_319_0, name, style);
        if (qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.documentmode") < 9 && qx.core.Environment.get("browser.name") !== "edge") {
          this.assertEquals("red 1px solid", qx.bom.element.Style.get(this.__P_319_0, name));
        } else {
          this.assertEquals(expected.join(" "), qx.bom.element.Style.get(this.__P_319_0, name));
        }
        this.assertEquals(expected[0], qx.bom.element.Style.get(this.__P_319_0, "borderWidth"));
        this.assertEquals(expected[1], qx.bom.element.Style.get(this.__P_319_0, "borderStyle"));
        this.assertEquals(expected[2], qx.bom.element.Style.get(this.__P_319_0, "borderColor"));
      },
      testSetFloat: function testSetFloat() {
        qx.bom.element.Style.set(this.__P_319_0, "float", "left");
        this.assertEquals("left", this.__P_319_0.style["float"] || this.__P_319_0.style.styleFloat);
      },
      testCompileFloat: function testCompileFloat() {
        var css = qx.bom.element.Style.compile({
          "float": "left"
        });
        this.assertEquals("float:left;", css);
      },
      testGetFloat: function testGetFloat() {
        // known to fail in chrome
        if (qx.core.Environment.get("browser.name") == "chrome") {
          throw new qx.dev.unit.RequirementError();
        }

        // important to set this value as CSS class
        var sheet = qx.bom.Stylesheet.createElement(".right { float: right; }");
        this.__P_319_0.className = "right";
        var floatValue = qx.bom.element.Style.get(this.__P_319_0, "float");
        this.assertEquals("right", floatValue);
        qx.bom.Stylesheet.removeSheet(sheet);
        this.__P_319_0.className = "";
      },
      testCompileContent: function testCompileContent() {
        var css = qx.bom.element.Style.compile({
          content: ""
        });
        this.assertEquals('content:"";', css);
      },
      testSetOpacity: function testSetOpacity() {
        if (!qx.core.Environment.get("css.opacity")) {
          throw new qx.dev.unit.RequirementError("css.opacity");
        }
        qx.bom.element.Style.set(this.__P_319_0, "opacity", 1);
        this.assertEquals("1", this.__P_319_0.style.opacity);
      },
      testCompileOpacity: function testCompileOpacity() {
        if (!qx.core.Environment.get("css.opacity")) {
          throw new qx.dev.unit.RequirementError("css.opacity");
        }
        var css = qx.bom.element.Style.compile({
          opacity: 1
        });
        this.assertEquals("opacity:1;", css);
      }
    }
  });
  qx.test.bom.element.Style.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Style.js.map?dt=1722153824257