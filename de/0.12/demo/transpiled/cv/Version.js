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
      REV: "b111c431fd37e55ff23f03dfe582588361007973",
      BRANCH: "develop",
      VERSION: "0.12.0-dev",
      LIBRARY_VERSION: 9,
      DATE: "2021-05-03T19:54:52.914Z",
      TAGS: {
        RUNTIME: "demo"
      }
    }
  });
  cv.Version.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Version.js.map?dt=1620071704804