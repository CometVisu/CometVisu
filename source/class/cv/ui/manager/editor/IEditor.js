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
    modified: {
      check: 'Boolean',
      init: false,
      event: 'changeModified',
      apply: '_updateSaveable'
    },
    valid: {
      check: 'Boolean',
      init: true,
      event: 'changeValid',
      apply: '_updateSaveable'
    },

    // combination of modified && valid
    saveable: {
      check: 'Boolean',
      init: true,
      event: 'changeSaveable'
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
