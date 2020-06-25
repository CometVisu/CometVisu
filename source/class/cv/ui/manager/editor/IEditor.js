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
    },

    /**
     * External viewers just open the file in a new frame but to not show a new tab in the manager for the opened file
     */
    external: {
      check: 'Boolean',
      init: false
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
    save: function () {},

    getCurrentContent: function () {}
  }
});
