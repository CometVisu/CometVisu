(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * Wrapper for cometvisu icons to make the usable as Qx-Widget.
   */
  qx.Class.define('cv.ui.manager.basic.Icon', {
    extend: qx.ui.core.Widget
  });
  cv.ui.manager.basic.Icon.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Icon.js.map?dt=1620070360602