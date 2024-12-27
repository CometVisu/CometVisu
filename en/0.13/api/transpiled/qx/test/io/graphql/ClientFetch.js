(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.io.graphql.Client": {
        "construct": true,
        "require": true
      },
      "qx.io.transport.Fetch": {
        "construct": true
      },
      "qx.io.graphql.Client": {
        "construct": true
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
   * GraphQL tests using the Fetch API
   */
  qx.Class.define("qx.test.io.graphql.ClientFetch", {
    extend: qx.test.io.graphql.Client,
    statics: {
      TEST_ENDPOINT: "https://countries.trevorblades.com/"
    },
    construct: function construct() {
      qx.test.io.graphql.Client.constructor.call(this);
      var transport = new qx.io.transport.Fetch(this.constructor.TEST_ENDPOINT);
      transport.getTransportImpl();
      this.client = new qx.io.graphql.Client(transport);
    }
  });
  qx.test.io.graphql.ClientFetch.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ClientFetch.js.map?dt=1735341778233