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
      "qx.event.IEventHandler": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  qx.Class.define("qx.test.event.dispatch.TestingHandler", {
    extend: qx.core.Object,
    implement: qx.event.IEventHandler,
    members: {
      canHandleEvent: function canHandleEvent() {
        return true;
      },
      registerEvent: function registerEvent() {},
      unregisterEvent: function unregisterEvent() {}
    }
  });
  qx.test.event.dispatch.TestingHandler.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TestingHandler.js.map?dt=1722153827121