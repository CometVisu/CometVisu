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
      "qx.dev.unit.MTestLoader": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2010 1&1 Internet AG, Germany, http://www.1and1.org
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Daniel Wagner (d_wagner)
  
  ************************************************************************ */

  /**
   * Test loader for server-side/"headless" environments
   */
  qx.Class.define("qx.dev.unit.TestLoaderBasic", {
    extend: qx.core.Object,
    include: [qx.dev.unit.MTestLoader],

    /**
     *
     * @param nameSpace {String} Test namespace, e.g. myapplication.test.*
     */
    construct: function construct(nameSpace) {
      if (nameSpace) {
        this.setTestNamespace(nameSpace);
      }
    }
  });
  qx.dev.unit.TestLoaderBasic.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TestLoaderBasic.js.map?dt=1650225652103