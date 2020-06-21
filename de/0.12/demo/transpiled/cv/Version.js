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
      REV: "d8630bc9684a272f89653f251decc84e20cb585e",
      BRANCH: "HEAD",
      VERSION: "0.12.0-dev",
      LIBRARY_VERSION: 9,
      DATE: "2020-06-21T22:35:53.735Z",
      TAGS: {
        RUNTIME: "demo"
      }
    }
  });
  cv.Version.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Version.js.map?dt=1592778963913