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
        "construct": true,
        "require": true
      },
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.bom.client.Css": {
        "require": true
      },
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.element.BoxSizing": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.boxsizing": {
          "className": "qx.bom.client.Css"
        },
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
       2007-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Daniel Wagner (d_wagner)
  
  ************************************************************************ */

  qx.Class.define("qx.test.bom.element.BoxSizing", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MRequirements],
    construct: function construct() {
      qx.dev.unit.TestCase.constructor.call(this);
      this.__P_317_0 = {
        mshtml: ["border-box", "content-box"],
        opera: ["border-box", "content-box"],
        gecko: ["border-box", "content-box"],
        webkit: ["border-box", "content-box"]
      };
    },
    members: {
      __P_317_0: null,
      __P_317_1: null,
      setUp: function setUp() {
        this.__P_317_1 = document.createElement("div");
        document.body.appendChild(this.__P_317_1);
      },
      tearDown: function tearDown() {
        document.body.removeChild(this.__P_317_1);
        delete this.__P_317_1;
      },
      hasBoxsizing: function hasBoxsizing() {
        return !!qx.core.Environment.get("css.boxsizing");
      },
      testGet: function testGet() {
        this.require(["boxsizing"]);
        var supported = this.__P_317_0[qx.core.Environment.get("engine.name")] || [];
        this.assertInArray(qx.bom.element.BoxSizing.get(this.__P_317_1), supported);
      },
      testSet: function testSet() {
        this.require(["boxsizing"]);
        var allValues = this.__P_317_0["gecko"];
        var supported = this.__P_317_0[qx.core.Environment.get("engine.name")] || [];
        for (var i = 0, l = allValues.length; i < l; i++) {
          qx.bom.element.BoxSizing.set(this.__P_317_1, allValues[i]);
          if (supported.includes(allValues[i])) {
            this.assertEquals(supported[i], qx.bom.element.BoxSizing.get(this.__P_317_1), "supported boxSizing value was not applied!");
          } else {
            this.assertNotEquals(supported[i], qx.bom.element.BoxSizing.get(this.__P_317_1), "boxSizing value was unexpectedly applied, maybe browser support has changed?");
          }
        }
      },
      testCompile: function testCompile() {
        this.require(["boxsizing"]);
        var css = qx.bom.element.BoxSizing.compile("border-box");
        this.assertMatch(css, /box-sizing/);
      }
    }
  });
  qx.test.bom.element.BoxSizing.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BoxSizing.js.map?dt=1717235386489