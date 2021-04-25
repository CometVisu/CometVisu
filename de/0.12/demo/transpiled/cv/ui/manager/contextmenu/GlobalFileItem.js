(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.manager.contextmenu.FileItem": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   *
   */
  qx.Class.define('cv.ui.manager.contextmenu.GlobalFileItem', {
    extend: cv.ui.manager.contextmenu.FileItem,
    type: 'singleton'
  });
  cv.ui.manager.contextmenu.GlobalFileItem.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=GlobalFileItem.js.map?dt=1619362517727