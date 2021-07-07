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
      REV: "1d51dc8306db44f5842f03bf001c30cfbcc37019",
      BRANCH: "develop",
      VERSION: "0.12.0-dev",
      LIBRARY_VERSION: 9,
      DATE: "2021-07-07T14:42:37.451Z",
      TAGS: {
        RUNTIME: "demo"
      }
    }
  });
  cv.Version.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Version.js.map?dt=1625668968710