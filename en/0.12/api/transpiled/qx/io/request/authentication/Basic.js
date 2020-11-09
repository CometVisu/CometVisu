(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.io.request.authentication.IAuthentication": {
        "require": true
      },
      "qx.util.Base64": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tristan Koch (tristankoch)
  
  ************************************************************************ */

  /**
   * Basic authentication.
   */
  qx.Class.define("qx.io.request.authentication.Basic", {
    extend: qx.core.Object,
    implement: qx.io.request.authentication.IAuthentication,

    /**
     * @param username {var} The username to use.
     * @param password {var} The password to use.
     */
    construct: function construct(username, password) {
      this.__P_221_0 = qx.util.Base64.encode(username + ':' + password);
    },
    members: {
      __P_221_0: null,

      /**
       * Headers to include for basic authentication.
       * @return {Map} Map containing the authentication credentials
       */
      getAuthHeaders: function getAuthHeaders() {
        return [{
          key: "Authorization",
          value: "Basic " + this.__P_221_0
        }];
      }
    }
  });
  qx.io.request.authentication.Basic.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Basic.js.map?dt=1604955475746