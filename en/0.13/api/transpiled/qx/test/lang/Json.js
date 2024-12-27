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
      "qx.lang.Json": {},
      "qx.dev.unit.RequirementError": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "engine.version": {
          "className": "qx.bom.client.Engine"
        },
        "browser.documentmode": {
          "className": "qx.bom.client.Browser"
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  qx.Class.define("qx.test.lang.Json", {
    extend: qx.dev.unit.TestCase,
    members: {
      setUp: function setUp() {
        // Test either native (when available) or emulated JSON,
        // see [BUG #5037]
        this.JSON = qx.lang.Json;
      },
      testStringifyArray: function testStringifyArray() {
        var text = this.JSON.stringify(["e", {
          pluribus: "unum"
        }]);
        this.assertEquals('["e",{"pluribus":"unum"}]', text);
      },
      testFormattingString: function testFormattingString() {
        var str = this.JSON.stringify(["e", {
          pluribus: "unum"
        }], null, "\t");
        var expected = /[\n\t"e",\n\t{\n\t\t"pluribus":\s?"unum"\n\t}\n]/;
        this.assertMatch(str, expected);
      },
      testFormattingNumber: function testFormattingNumber() {
        var str = this.JSON.stringify(["e", {
          pluribus: "unum"
        }], null, 2);
        var expected = /[\n  "e",\n  {\n    "pluribus":\s"unum"\n  }\n]/;
        this.assertMatch(str, expected);
      },
      testReplacer: function testReplacer() {
        var obj = [new Date(0), "foo"];
        var self = this;
        var replacer = function replacer(key, value) {
          return this[key] instanceof Date ? "Date(" + this[key].getTime() + ")" : value;
        };
        var json = this.JSON.stringify(obj, replacer);
        this.assertEquals('["Date(0)","foo"]', json);
      },
      // Uncovers browser bug found in Firefox >=3.5 && < 4, see
      // https://bugzilla.mozilla.org/show_bug.cgi?id=509184
      testReplacerNestedObject: function testReplacerNestedObject() {
        var obj = {
          prop: "value"
        };
        var replacer = function replacer(key, value) {
          if (value == "value") {
            return "replaced";
          }
          return value;
        };
        var json = this.JSON.stringify(obj, replacer);
        this.assertMatch(json, /replaced/);
      },
      testReplacerWhiteList: function testReplacerWhiteList() {
        var list = ["name"];
        var text = this.JSON.stringify({
          name: "Peter",
          last: "Pan"
        }, list);
        this.assertEquals('{"name":"Peter"}', text);
      },
      testStringifyObject: function testStringifyObject() {
        this.assertEquals('{"test":123}', this.JSON.stringify({
          test: 123
        }));
      },
      testStringifyDate: function testStringifyDate() {
        var data = {
          start: new Date(0)
        };
        this.assertMatch(this.JSON.stringify(data), new RegExp('{"start":"1970-01-01T00:00:00(.0*)?Z"}'));
      },
      testCustomDateSerializer: function testCustomDateSerializer() {
        var date = new Date(0);
        date.toJSON = function (key) {
          return this.valueOf();
        };
        var result = this.JSON.stringify(date);

        // Expected '0' but found '0'! in Opera
        // this.assertEquals("0", result);

        this.assert("0".charCodeAt() == result.charCodeAt());
      },
      testToJson: function testToJson() {
        var obj = {
          toJSON: function toJSON(key) {
            return "##";
          }
        };
        this.assertEquals('"##"', this.JSON.stringify(obj));
      },
      testToJsonKey: function testToJsonKey() {
        // Known to fail in some browsers:
        //
        // Firefox: toJSON is passed no parameter, i.e. key is undefined
        //          undefined + "" is "undefined" in Firefox
        //
        // IE 8:    toJSON is passed the string "\u0082\u0000\u0000\u0000",
        //          which is the equivalent of "BREAK PERMITTED HERE" and two
        //          "NUL".
        //
        if (this.isFirefox() || this.isIe8()) {
          throw new qx.dev.unit.RequirementError();
        }
        var obj = {
          toJSON: function toJSON(key) {
            return "#" + key + "#";
          }
        };
        var str = this.JSON.stringify({
          juhu: obj
        });
        this.assertMatch(str, /#juhu#/);
      },
      testStringifyRecursiveObject: function testStringifyRecursiveObject() {
        var obj = {};
        obj.foo = obj;
        this.assertException(function () {
          var text = this.JSON.stringify(obj);
        });
        obj = [];
        obj[0] = obj;
        this.assertException(function () {
          var text = this.JSON.stringify(obj);
        });
      },
      testIgnoreNamedPropertiesInArrays: function testIgnoreNamedPropertiesInArrays() {
        var data = [1, "foo"];
        data.juhu = "kinners"; // must be ignored

        this.assertEquals('[1,"foo"]', this.JSON.stringify(data));
      },
      testIgnoreFunction: function testIgnoreFunction() {
        var data = {
          juhu: "kinners",
          foo: function foo() {}
        };
        this.assertEquals('{"juhu":"kinners"}', this.JSON.stringify(data));
      },
      testSimpleParse: function testSimpleParse() {
        var data = this.JSON.parse('{"juhu":"kinners","age":23,"foo":[1,2,3]}');

        // check keys
        this.assertEquals(["juhu", "foo", "age"].sort().toString(), Object.keys(data).sort().toString());

        // check values
        this.assertEquals("kinners", data.juhu);
        this.assertEquals(23, data.age);
        this.assertArrayEquals([1, 2, 3], data.foo);
      },
      testParseNumber: function testParseNumber() {
        this.assertEquals(1234, this.JSON.parse("1234"));
        this.assertEquals(1234, this.JSON.parse(" 1234"));
      },
      testParseRevive: function testParseRevive() {
        var json = '{"prop": "value"}';
        var obj = this.JSON.parse(json, function (key, value) {
          if (value == "value") {
            return "revived";
          }
          return value;
        });
        this.assertEquals("revived", obj.prop);
      },
      isIe8: function isIe8() {
        return qx.core.Environment.get("engine.name") === "mshtml" && (qx.core.Environment.get("engine.version") == 8 || qx.core.Environment.get("browser.documentmode") == 8);
      },
      isFirefox: function isFirefox() {
        return qx.core.Environment.get("engine.name") === "gecko";
      }
    }
  });
  qx.test.lang.Json.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Json.js.map?dt=1735341778819