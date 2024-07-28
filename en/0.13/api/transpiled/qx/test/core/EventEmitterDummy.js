(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.core.EventEmitterDummy", {
    extend: qx.core.Object,
    events: {
      plain: "qx.event.type.Event",
      error: "qx.__12345__",
      data: "qx.event.type.Data",
      eventName: "qx.event.type.Data"
    }
  });
  qx.test.core.EventEmitterDummy.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=EventEmitterDummy.js.map?dt=1722153825045