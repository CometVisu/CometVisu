(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   *
   */
  qx.Interface.define('cv.ui.manager.control.IFileEventHandler', {
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _handleFileEvent: function _handleFileEvent(ev) {}
    }
  });
  cv.ui.manager.control.IFileEventHandler.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IFileEventHandler.js.map?dt=1592777071242