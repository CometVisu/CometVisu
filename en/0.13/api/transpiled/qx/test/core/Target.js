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
      "qx.core.Object": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * @ignore(qx.Event)
   */

  qx.Class.define("qx.test.core.Target", {
    extend: qx.dev.unit.TestCase,
    members: {
      testEvents: function testEvents() {
        qx.Class.define("qx.Event", {
          extend: qx.core.Object,
          events: {
            click: "qx.event.type.Event"
          }
        });
        var target = new qx.Event();
        target.addListener("click", function () {});
        target.dispose();
      }
    }
  });
  qx.test.core.Target.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Target.js.map?dt=1726089052046