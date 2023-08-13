(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.exception.Exception": {
        "construct": true,
        "require": true
      },
      "qx.io.exception.Transport": {
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
   *  A class for representing a user-initiated cancellation of a request.
   */
  qx.Class.define("qx.io.exception.Cancel", {
    extend: qx.io.exception.Exception,
    /**
     * Constructor
     * @param message {String}
     * @param data {*|null}
     */
    construct: function construct(message, data) {
      qx.io.exception.Exception.constructor.call(this, message, qx.io.exception.Transport.CANCELLED, data);
    }
  });
  qx.io.exception.Cancel.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Cancel.js.map?dt=1691935422198