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
      "qx.bom.client.Html": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "html.filereader": {
          "className": "qx.bom.client.Html"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /* ************************************************************************
  
  
  ************************************************************************ */
  /**
   *
   * @asset(qx/test/webworker.js)
   */

  qx.Class.define("qx.test.bom.FileReader", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MRequirements],
    members: {
      hasReader: function hasReader() {
        return qx.core.Environment.get("html.filereader");
      },
      setUp: function setUp() {},
      tearDown: function tearDown() {}
    }
  });
  qx.test.bom.FileReader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FileReader.js.map?dt=1735341775077