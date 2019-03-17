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
    MEMBERS
  ***********************************************
  */
  members: {
    save: function () {},

    getCurrentContent: function () {}
  }
});
