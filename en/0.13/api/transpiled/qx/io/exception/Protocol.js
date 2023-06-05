(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.exception.Exception": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2020 Christian Boulanger
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (cboulanger)
  
  ************************************************************************ */

  /**
   * A class for representing errors that occurred on server and are handled
   * according to the service protocol (JSON-RPC, GraphQL, etc.)
   */
  qx.Class.define("qx.io.exception.Protocol", {
    extend: qx.io.exception.Exception
  });
  qx.io.exception.Protocol.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Protocol.js.map?dt=1685978124686