(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.event.Registration": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.handler.Offline": {
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
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.event.handler.Offline", {
    extend: qx.dev.unit.TestCase,
    members: {
      __P_345_0: qx.event.Registration.getManager(window).getHandler(qx.event.handler.Offline),
      testIsOnline: function testIsOnline() {
        this.assertBoolean(this.__P_345_0.isOnline());
      }
    }
  });
  qx.test.event.handler.Offline.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Offline.js.map?dt=1726089053862