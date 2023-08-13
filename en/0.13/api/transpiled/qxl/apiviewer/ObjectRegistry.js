(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.ObjectRegistry": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
       2018 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (johnspackman)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Class.define("qxl.apiviewer.ObjectRegistry", {
    statics: {
      __P_584_0: {},
      register: function register(object) {
        var hash = qx.core.ObjectRegistry.toHashCode(object);
        this.__P_584_0[hash] = object;
      },
      getObjectFromHashCode: function getObjectFromHashCode(hashCode) {
        return this.__P_584_0[hashCode];
      }
    }
  });
  qxl.apiviewer.ObjectRegistry.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ObjectRegistry.js.map?dt=1691935459820