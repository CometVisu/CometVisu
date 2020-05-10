(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "cv.ui.manager.control.ActionDispatcher": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * Global singleton that hold some states that are relevant for many parts of the manager.
   */
  qx.Class.define('cv.ui.manager.core.GlobalState', {
    extend: qx.core.Object,
    type: 'singleton',

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      openedFocusedFile: {
        check: 'cv.ui.manager.model.FileItem || cv.ui.manager.model.CompareFiles',
        nullable: true,
        event: 'changeOpenedFocusedFile',
        apply: '_applyFile'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _applyFile: function _applyFile() {
        cv.ui.manager.control.ActionDispatcher.getInstance().updateBarButtons();
      }
    }
  });
  cv.ui.manager.core.GlobalState.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=GlobalState.js.map?dt=1589123549202