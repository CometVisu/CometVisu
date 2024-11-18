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
      "qx.bom.client.OperatingSystem": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
   qooxdoo - the new era of web development
  
   http://qooxdoo.org
  
   Copyright:
   2007-2012 1&1 Internet AG, Germany, http://www.1und1.de
  
   License:
       MIT: https://opensource.org/licenses/MIT
   See the LICENSE file in the project's top-level directory for details.
  
   Authors:
   * Christopher Zuendorf (czuendorf)
  
   ************************************************************************ */

  qx.Class.define("qx.test.bom.client.OperatingSystem", {
    extend: qx.dev.unit.TestCase,
    members: {
      testUsageOfGetName: function testUsageOfGetName() {
        var osName = qx.bom.client.OperatingSystem.getName();
        this.assertString(osName);
        this.assertNotEquals("", osName);
      },
      testUsageOfGetVersion: function testUsageOfGetVersion() {
        if (qx.bom.client.OperatingSystem.getName() !== "linux") {
          var osVersion = qx.bom.client.OperatingSystem.getVersion();
          this.assertString(osVersion);
          this.assertNotEquals("", osVersion);
        }
      }
    }
  });
  qx.test.bom.client.OperatingSystem.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=OperatingSystem.js.map?dt=1731948112774