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
      REV: "ad87e5206e5baabf76b4beca16eb7e23ef88c23f",
      BRANCH: "develop",
      VERSION: "0.12.0-dev",
      LIBRARY_VERSION: 9,
      DATE: "2021-02-17T19:47:19.056Z",
      TAGS: {
        RUNTIME: "demo"
      }
    }
  });
  cv.Version.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Version.js.map?dt=1613591247815