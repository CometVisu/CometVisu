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
      "qx.test.ui.LayoutTestCase": {
        "require": true
      },
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.Font": {},
      "qx.ui.basic.Label": {},
      "qx.lang.Object": {}
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
       2007-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Jonathan Weiß (jonathan_rass)
       * Mustafa Sak (msak)
  
  ************************************************************************ */

  qx.Class.define("qx.test.bom.Font", {
    extend: qx.test.ui.LayoutTestCase,
    include: [qx.dev.unit.MRequirements],
    members: {
      hasNoIe: function hasNoIe() {
        return qx.core.Environment.get("engine.name") !== "mshtml";
      },
      setUp: function setUp() {
        this.__P_307_0 = new qx.bom.Font();
      },
      tearDown: function tearDown() {
        qx.test.bom.Font.superclass.prototype.tearDown.call(this);
        this.__P_307_0.dispose();
      },
      testBold: function testBold() {
        this.__P_307_0.setBold(true);
        var styles = this.__P_307_0.getStyles();
        this.assertEquals("bold", styles.fontWeight, "Wrong style value for 'bold' property!");
      },
      testWeight: function testWeight() {
        this.__P_307_0.setWeight("400");
        var styles = this.__P_307_0.getStyles();
        this.assertEquals("400", styles.fontWeight, "something went wrong settng the 'font weight'");
      },
      testItalic: function testItalic() {
        this.__P_307_0.setItalic(true);
        var styles = this.__P_307_0.getStyles();
        this.assertEquals("italic", styles.fontStyle, "Wrong style value for 'italic' property!");
      },
      testDecorationUnderline: function testDecorationUnderline() {
        this.__P_307_0.setDecoration("underline");
        var styles = this.__P_307_0.getStyles();
        this.assertEquals("underline", styles.textDecoration, "Wrong style value for 'decoration' property!");
      },
      testDecorationLineThrough: function testDecorationLineThrough() {
        this.__P_307_0.setDecoration("line-through");
        var styles = this.__P_307_0.getStyles();
        this.assertEquals("line-through", styles.textDecoration, "Wrong style value for 'decoration' property!");
      },
      testDecorationOverline: function testDecorationOverline() {
        this.__P_307_0.setDecoration("overline");
        var styles = this.__P_307_0.getStyles();
        this.assertEquals("overline", styles.textDecoration, "Wrong style value for 'decoration' property!");
      },
      testFontFamily: function testFontFamily() {
        this.__P_307_0.setFamily(["Arial"]);
        var styles = this.__P_307_0.getStyles();
        this.assertEquals("Arial", styles.fontFamily, "Wrong style value for 'family' property!");
      },
      testFontFamilyMultipleWords: function testFontFamilyMultipleWords() {
        this.__P_307_0.setFamily(["Times New Roman"]);
        var styles = this.__P_307_0.getStyles();
        this.assertEquals("'Times New Roman'", styles.fontFamily, "Wrong style value for 'family' property!");
      },
      testLineHeight: function testLineHeight() {
        this.__P_307_0.setLineHeight(1.5);
        var styles = this.__P_307_0.getStyles();
        this.assertEquals(1.5, styles.lineHeight, "Wrong style value for 'lineHeight' property!");
      },
      testSize: function testSize() {
        this.__P_307_0.setSize(20);
        var styles = this.__P_307_0.getStyles();
        this.assertEquals("20px", styles.fontSize, "Wrong style value for 'size' property!");
      },
      testColor: function testColor() {
        this.__P_307_0.setColor("red");
        var styles = this.__P_307_0.getStyles();
        this.assertEquals("red", styles.color, "Wrong style value for 'color' property!");
      },
      testTextShadow: function testTextShadow() {
        this.require(["noIe"]);
        this.__P_307_0.setTextShadow("red 1px 1px 3px, green -1px -1px 3px, white -1px 1px 3px, white 1px -1px 3px");
        var styles = this.__P_307_0.getStyles();
        this.assertEquals("red 1px 1px 3px, green -1px -1px 3px, white -1px 1px 3px, white 1px -1px 3px", styles.textShadow, "Wrong style value for 'textShadow' property!");
      },
      testLetterSpacing: function testLetterSpacing() {
        this.__P_307_0.setLetterSpacing(1);
        var styles = this.__P_307_0.getStyles();
        this.assertEquals("1px", styles.letterSpacing, "Wrong style value for 'letterSpacing' property!");
      },
      testColorAtWidget: function testColorAtWidget() {
        this.__P_307_0.setColor("#ff0000");
        var label = new qx.ui.basic.Label("myLabel");
        label.setAppearance("test-font-label");
        label.setFont(this.__P_307_0);
        this.getRoot().add(label);
        this.flush();
        var checkValue = "blue";
        var color = label.getContentElement().getDomElement().style["color"];

        // the current implementation has a higher priority for the color which is
        // set using the color theme. So this default color should show up and not
        // the defined color of the font.
        this.assertEquals(checkValue, color, "Wrong style applied for 'color' property!");
        label.destroy();
      },
      testGetStyles: function testGetStyles() {
        var styles = this.__P_307_0.getStyles();

        // we expect a map with only 'fontFamily' set, otherwise the null values
        // which are returned are overwriting styles. Only return styles which are set.
        var keys = Object.keys(styles);
        this.assertMap(styles, "Method 'getStyles' should return a map!");
        this.assertEquals(9, qx.lang.Object.getLength(styles), "Map should contain 9 keys!");
        this.assertNotUndefined(styles.fontFamily, "Key 'fontFamily' has to be present!");
        this.assertNotUndefined(styles.fontStyle, "Key 'fontStyle' has to be present!");
        this.assertNotUndefined(styles.fontWeight, "Key 'fontWeight' has to be present!");
        this.assertNotUndefined(styles.fontSize, "Key 'fontSize' has to be present!");
        this.assertNotUndefined(styles.lineHeight, "Key 'lineHeight' has to be present!");
        this.assertNotUndefined(styles.textDecoration, "Key 'textDecoration' has to be present!");
        this.assertNotUndefined(styles.color, "Key 'color' has to be present!");
        this.assertNotUndefined(styles.textShadow, "Key 'textShadow' has to be present!");
        this.assertNotUndefined(styles.letterSpacing, "Key 'letterSpacing' has to be present!");
      },
      testGetSomeStyles: function testGetSomeStyles() {
        this.__P_307_0.setBold(true);
        this.__P_307_0.setItalic(true);
        this.__P_307_0.setColor("#3f3f3f");
        this.__P_307_0.setDecoration("underline");
        var styles = this.__P_307_0.getStyles();
        var keys = Object.keys(styles);
        this.assertMap(styles, "Method 'getStyles' should return a map!");
        this.assertEquals("fontFamily", keys[0], "Key 'fontFamily' has to be present!");
        this.assertEquals("", styles.fontFamily, "'fontFamily' has to have the value ''!");
        this.assertEquals("italic", styles.fontStyle, "Wrong value for 'fontStyle'!");
        this.assertEquals("bold", styles.fontWeight, "Wrong value for 'fontWeight'!");
        this.assertEquals("#3f3f3f", styles.color, "Wrong value for 'color'!");
        this.assertEquals("underline", styles.textDecoration, "Wrong value for 'textDecoration'!");
      },
      testFromConfig: function testFromConfig() {
        var config = {
          bold: true,
          italic: false,
          decoration: "underline",
          lineHeight: 1.2,
          size: 20,
          family: ["Arial"],
          color: "red"
        };
        var font = qx.bom.Font.fromConfig(config);
        var expected = {
          fontWeight: "bold",
          fontStyle: "normal",
          textDecoration: "underline",
          lineHeight: 1.2,
          fontSize: "20px",
          fontFamily: "Arial",
          color: "red"
        };
        var found = font.getStyles();
        this.assertEquals(expected.fontWeight, found.fontWeight, "Wrong value for 'fontWeight'");
        this.assertEquals(expected.fontStyle, found.fontStyle, "Wrong value for 'fontStyle'");
        this.assertEquals(expected.fontSize, found.fontSize, "Wrong value for 'fontSize'");
        this.assertEquals(expected.lineHeight, found.lineHeight, "Wrong value for 'lineHeight'");
        this.assertEquals(expected.textDecoration, found.textDecoration, "Wrong value for 'textDecoration'");
        this.assertEquals(expected.fontFamily, found.fontFamily, "Wrong value for 'fontFamily'");
        this.assertEquals(expected.textColor, found.textColor, "Wrong value for 'textColor'");
        font.dispose();
      },
      testFromString: function testFromString() {
        var config = "bold italic underline 20px Arial";
        var font = qx.bom.Font.fromString(config);
        var expected = {
          fontWeight: "bold",
          fontStyle: "italic",
          textDecoration: "underline",
          fontSize: "20px",
          fontFamily: "Arial"
        };
        var found = font.getStyles();
        this.assertEquals(expected.fontWeight, found.fontWeight, "Wrong value for 'fontWeight'");
        this.assertEquals(expected.fontStyle, found.fontStyle, "Wrong value for 'fontStyle'");
        this.assertEquals(expected.fontSize, found.fontSize, "Wrong value for 'fontSize'");
        this.assertEquals(expected.textDecoration, found.textDecoration, "Wrong value for 'textDecoration'");
        this.assertEquals(expected.fontFamily, found.fontFamily, "Wrong value for 'fontFamily'");
        font.dispose();
      }
    }
  });
  qx.test.bom.Font.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Font.js.map?dt=1735383858280