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
      REV: "aa47beca07c0943df7117ae3c769ab2111ea4d6a",
      BRANCH: "HEAD",
      VERSION: "0.12.0-dev",
      LIBRARY_VERSION: 9,
      DATE: "2020-10-26T18:42:10.643Z",
      TAGS: {
        RUNTIME: "demo"
      }
    }
  });
  cv.Version.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Version.js.map?dt=1603737740617