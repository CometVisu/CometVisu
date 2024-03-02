(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Init": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.application.IApplication": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
  
  ************************************************************************ */

  /**
   * For a Non-GUI application, supporting low-level DOM operations and AJAX
   * communication.
   *
   * @require(qx.core.Init)
   */
  qx.Class.define("qx.application.Native", {
    extend: qx.core.Object,
    implement: [qx.application.IApplication],
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      // interface method
      main: function main() {
        // empty
      },
      // interface method
      finalize: function finalize() {
        // empty
      },
      // interface method
      close: function close() {
        // empty
      },
      // interface method
      terminate: function terminate() {
        // empty
      }
    }
  });
  qx.application.Native.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Native.js.map?dt=1709410143309