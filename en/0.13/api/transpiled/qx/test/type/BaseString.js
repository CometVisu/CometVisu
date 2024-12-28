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
      "qx.type.BaseString": {}
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
       * Fabian Jakobs (fjakobs)
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * @ignore(qx.String)
   */

  qx.Class.define("qx.test.type.BaseString", {
    extend: qx.dev.unit.TestCase,
    members: {
      testToString: function testToString() {
        var s = new qx.type.BaseString("Juhu");
        this.assertEquals("Juhu", s);
      },
      testValueOf: function testValueOf() {
        var s = new qx.type.BaseString("Juhu");
        this.assertEquals("Juhu".valueOf(), s.valueOf());
      },
      testUpperCase: function testUpperCase() {
        var s = new qx.type.BaseString("Juhu");
        this.assertEquals("JUHU", s.toUpperCase());
      },
      testIndexOf: function testIndexOf() {
        var s = new qx.type.BaseString("Juhu");
        this.assertEquals(1, s.indexOf("u"));
      },
      testPlusOperator: function testPlusOperator() {
        var s = new qx.type.BaseString("Juhu");
        this.assertEquals("__Juhu__", ["__", s + "__"].join(""));
      },
      testCharAt: function testCharAt() {
        var s = new qx.type.BaseString("Juhu");
        this.assertEquals("h", s.charAt(2));
      },
      testcharCodeAt: function testcharCodeAt() {
        var s = new qx.type.BaseString("Juhu");
        this.assertEquals(104, s.charCodeAt(2));
      },
      testlastIndexOf: function testlastIndexOf() {
        var s = new qx.type.BaseString("Juhu");
        this.assertEquals(3, s.lastIndexOf("u"));
      },
      testLength: function testLength() {
        var s = new qx.type.BaseString("Juhu");
        this.assertEquals(4, s.length);
      },
      testLowerCase: function testLowerCase() {
        var s = new qx.type.BaseString("Juhu");
        this.assertEquals("juhu", s.toLowerCase());
      },
      testSubstringOneArgument: function testSubstringOneArgument() {
        var s = new qx.type.BaseString("Juhu");
        this.assertEquals("hu", s.substring(2));
      },
      testSubstringTwoArguments: function testSubstringTwoArguments() {
        var s = new qx.type.BaseString("Juhu");
        this.assertEquals("u", s.substring(2, 1));
      },
      testSearchString: function testSearchString() {
        var s = new qx.type.BaseString("Juhu");
        this.assertEquals(2, s.search("h"));
      },
      testSearchRegExp: function testSearchRegExp() {
        var s = new qx.type.BaseString("Juhu");
        this.assertEquals(0, s.search(/J/));
      },
      testReplace: function testReplace() {
        var s = new qx.type.BaseString("Juhu");
        this.assertEquals("Johu", s.replace("u", "o"));
      },
      testEmptyString: function testEmptyString() {
        var s = new qx.type.BaseString();
        this.assertEquals("", s.toString());
        var s = new qx.type.BaseString("");
        this.assertEquals("", s.toString());
      },
      testExtend: function testExtend() {
        qx.Class.define("qx.String", {
          extend: qx.type.BaseString,
          members: {
            bold: function bold() {
              return "<b>" + this.toString() + "</b>";
            }
          }
        });
        var s = new qx.String("Juhu");
        this.assertEquals("<b>Juhu</b>", s.bold());
      },
      testCodePointAt: function testCodePointAt() {
        var s = new qx.type.BaseString("*");
        this.assertEquals(42, s.codePointAt(0));
      }
    }
  });
  qx.test.type.BaseString.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BaseString.js.map?dt=1735383863516