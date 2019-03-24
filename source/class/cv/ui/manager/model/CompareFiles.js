/**
 *
 */
qx.Class.define('cv.ui.manager.model.CompareFiles', {
  extend: qx.core.Object,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (original, modified) {
    this.base(arguments);
    this.setOriginalFile(original);
    this.setModifiedFile(modified);
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    originalFile: {
      check: 'cv.ui.manager.model.FileItem',
      event: 'changeOriginal'
    },
    modifiedFile: {
      check: 'cv.ui.manager.model.FileItem',
      event: 'changeModified',
      apply: '_applyModifiedFile'
    },

    permanent: {
      check: 'Boolean',
      init: true
    },

    name: {
      check: 'String',
      init: '',
      event: 'changeName'
    },

    type: {
      check: 'String',
      init: 'file'
    },

    modified: {
      check: 'Boolean',
      init: false
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    isConfigFile: function () {
      return this.getModifiedFile().isConfigFile();
    },

    getFullPath: function () {
      return this.getOriginalFile().getFullPath();
    },

    _applyModifiedFile: function () {
      this.setName(qx.locale.Manager.tr('Diff: %1', this.getModifiedFile().getName()));
    },

    /**
     * Returns a fake URI that can be used to identify the file.
     * Used by monaco editor as model URI.
     * @returns {Uri}
     */
    getUri: function () {
      return 'cv://' + this.getOriginalFile().getFullPath() + '+' + this.getModifiedFile().getFullPath();
    }
  }
});
