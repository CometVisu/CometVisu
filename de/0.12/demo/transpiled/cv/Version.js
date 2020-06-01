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
      REV: "3d650f90fc68475a184e37448c6db089ba46fd87",
      BRANCH: "HEAD",
      VERSION: "0.12.0-dev",
      DATE: "2020-06-01T12:20:23.224Z",
      TAGS: {
        RUNTIME: "demo"
      }
    }
  });
  cv.Version.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Version.js.map?dt=1591014035006