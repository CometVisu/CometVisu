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
   * Interface all file editors must implement.
   */
  qx.Interface.define('cv.ui.manager.editor.IEditor', {
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      file: {
        check: 'cv.ui.manager.model.FileItem',
        nullable: true,
        apply: '_loadFile'
      }
    },

    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      TITLE: ''
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      save: function save() {},
      getCurrentContent: function getCurrentContent() {}
    }
  });
  cv.ui.manager.editor.IEditor.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IEditor.js.map?dt=1587971947254