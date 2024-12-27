(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.util.ResourceManager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Mixin.define("qx.test.io.MRemoteTest", {
    members: {
      getUrl: function getUrl(path) {
        return qx.util.ResourceManager.getInstance().toUri(path);
      },
      isLocal: function isLocal() {
        return window.location.protocol == "file:";
      },
      needsPHPWarning: function needsPHPWarning() {
        this.warn("This test can only be run from a web server with PHP support.");
      }
    }
  });
  qx.test.io.MRemoteTest.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MRemoteTest.js.map?dt=1735341778156