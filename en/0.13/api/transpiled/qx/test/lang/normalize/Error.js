(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.lang.normalize.Error": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.lang.String": {}
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

  /**
   * @require(qx.lang.normalize.Error)
   */
  qx.Class.define("qx.test.lang.normalize.Error", {
    extend: qx.dev.unit.TestCase,
    members: {
      testToString: function testToString() {
        var msg = "Dummer Fehler";
        var error = new Error(msg);
        this.assertTrue(qx.lang.String.contains(error.toString(), msg));
      }
    }
  });
  qx.test.lang.normalize.Error.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Error.js.map?dt=1731948117193