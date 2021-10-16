/**
 * Global singleton that hold some states that are relevant for many parts of the manager.
 */
qx.Class.define("cv.ui.manager.core.GlobalState", {
  extend: qx.core.Object,
  type: "singleton",

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    openedFocusedFile: {
      check: "cv.ui.manager.model.FileItem || cv.ui.manager.model.CompareFiles",
      nullable: true,
      event: "changeOpenedFocusedFile",
      apply: "_applyFile"
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _applyFile: function () {
      cv.ui.manager.control.ActionDispatcher.getInstance().updateBarButtons();
    }
  }
});
