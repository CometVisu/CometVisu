(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("cv.Version", {
    type: "static",
    statics: {
      REV: "e976de06c8f1500cc4ebd03f192a2f905f44fce9",
      BRANCH: "HEAD",
      VERSION: "0.12.0-dev",
      DATE: "2020-05-13T20:18:03.005Z",
      TAGS: {
        RUNTIME: "demo"
      }
    }
  });
  cv.Version.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Version.js.map?dt=1589401093555