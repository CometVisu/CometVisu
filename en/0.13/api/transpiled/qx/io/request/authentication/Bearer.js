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
       * Christian Boulanger (cboulanger)
  
  ************************************************************************ */

  /**
   * Bearer (token) authentication.
   */
  qx.Class.define("qx.io.request.authentication.Bearer", {
    extend: qx.core.Object,
    implement: qx.io.request.authentication.IAuthentication,
    /**
     * @param token {string} The token to use.
     */
    construct: function construct(token) {
      this.__P_270_0 = token;
    },
    members: {
      __P_270_0: null,
      /**
       * Headers to include for bearer (token) authentication.
       * @return {Map} Map containing the authentication credentials
       */
      getAuthHeaders: function getAuthHeaders() {
        return [{
          key: "Authorization",
          value: "Bearer " + this.__P_270_0
        }];
      }
    }
  });
  qx.io.request.authentication.Bearer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Bearer.js.map?dt=1729101233855