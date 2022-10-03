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
  qx.Class.define('cv.Version', {
    type: 'static',
    statics: {
      REV: 'e622871e1410d8c70a618cb69d455bc1ee80492d',
      BRANCH: 'develop',
      VERSION: '0.13.0-dev',
      LIBRARY_VERSION_PURE: 9,
      LIBRARY_VERSION_TILE: 1,
      DATE: '2022-10-03T08:07:00.123Z',
      TAGS: {}
    }
  });
  cv.Version.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Version.js.map?dt=1664784654376