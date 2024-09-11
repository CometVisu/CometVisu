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
      "qx.util.ResponseParser": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2013 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Richard Sternagel (rsternagel)
  
  ************************************************************************ */

  qx.Class.define("qx.test.util.ResponseParser", {
    extend: qx.dev.unit.TestCase,
    members: {
      setUp: function setUp() {
        this.responseParser = new qx.util.ResponseParser();
      },
      tearDown: function tearDown() {
        this.responseParser = null;
      },
      __P_452_0: function __P_452_0(contentType, parser) {
        var msg = "Content type '" + contentType + "' handled incorrectly";
        this.assertEquals(parser, this.responseParser._getParser(contentType), msg);
      },
      "test: getParser() returns undefined for unknown": function testGetParserReturnsUndefinedForUnknown() {
        this.__P_452_0("text/html", undefined);
        this.__P_452_0("application/pdf", undefined);
      },
      "test: getParser() returns undefined for malformed": function testGetParserReturnsUndefinedForMalformed() {
        this.__P_452_0("", undefined);
        this.__P_452_0("json", undefined);
        this.__P_452_0("text/foo+json", undefined);
        this.__P_452_0("application/foo+jsonish", undefined);
        this.__P_452_0("application/foo+xmlish", undefined);
      },
      "test: getParser() detects json": function testGetParserDetectsJson() {
        var json = qx.util.ResponseParser.PARSER.json;
        this.__P_452_0("application/json", json);
        this.__P_452_0("application/vnd.affe+json", json);
        this.__P_452_0("application/prs.affe+json", json);
        this.__P_452_0("application/vnd.oneandone.onlineoffice.email+json", json);
      },
      "test: getParser() detects xml": function testGetParserDetectsXml() {
        var xml = qx.util.ResponseParser.PARSER.xml;
        this.__P_452_0("application/xml", xml);
        this.__P_452_0("application/vnd.oneandone.domains.domain+xml", xml);
        this.__P_452_0("text/xml"); // Deprecated
      },
      "test: getParser() detects deprecated xml": function testGetParserDetectsDeprecatedXml() {
        var xml = qx.util.ResponseParser.PARSER.xml;
        this.__P_452_0("text/xml");
      },
      "test: getParser() handles character set": function testGetParserHandlesCharacterSet() {
        var json = qx.util.ResponseParser.PARSER.json;
        this.__P_452_0("application/json; charset=utf-8", json);
      },
      "test: setParser() function": function testSetParserFunction() {
        var customParser = function customParser() {};
        this.responseParser.setParser(customParser);
        this.assertEquals(customParser, this.responseParser._getParser());
      },
      "test: setParser() symbolically": function testSetParserSymbolically() {
        this.responseParser.setParser("json");
        this.assertFunction(this.responseParser._getParser());
      },
      "test: parse() not parse empty response": function testParseNotParseEmptyResponse() {
        var expectedResponse = "",
          parsedResponse = this.responseParser.parse("", "application/json");
        this.assertEquals(expectedResponse, parsedResponse);
      },
      "test: parse() not parse unknown response": function testParseNotParseUnknownResponse() {
        this.assertNull(this.responseParser._getParser("application/idontexist"));
      },
      // JSON
      "test: parse() json response": function testParseJsonResponse() {
        var json = '{"animals": ["monkey", "mouse"]}',
          expectedResponse = qx.util.ResponseParser.PARSER.json.call(this, json),
          parsedResponse = this.responseParser.parse(json, "application/json");
        this.assertEquals(expectedResponse.animals[0], parsedResponse.animals[0]);
      },
      // XML
      "test: parse() xml response": function testParseXmlResponse() {
        var xml = "<animals><monkey/><mouse/></animals>",
          expectedResponse = qx.util.ResponseParser.PARSER.xml.call(this, xml),
          parsedResponse = this.responseParser.parse(xml, "application/xml");
        this.assertEquals(expectedResponse.documentElement.nodeName, parsedResponse.documentElement.nodeName);
      },
      "test: parse() arbitrary xml response": function testParseArbitraryXmlResponse() {
        var xml = "<animals><monkey/><mouse/></animals>",
          expectedResponse = qx.util.ResponseParser.PARSER.xml.call(this, xml),
          parsedResponse = this.responseParser.parse(xml, "animal/affe+xml");
        this.assertEquals(expectedResponse.documentElement.nodeName, parsedResponse.documentElement.nodeName);
      }
    }
  });
  qx.test.util.ResponseParser.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ResponseParser.js.map?dt=1726089061405