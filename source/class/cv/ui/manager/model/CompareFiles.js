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
      event: 'changeModifiedFile',
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
      init: false,
      event: 'changeModified'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    isRelated: function (path) {
      return this.getOriginalFile().getFullPath() === path || this.getModifiedFile().getFullPath() === path;
    },

    isConfigFile: function () {
      return this.getModifiedFile().isConfigFile();
    },

    getFullPath: function () {
      return this.getOriginalFile().getFullPath();
    },

    _applyModifiedFile: function () {
      this.setName(qx.locale.Manager.tr('Diff: %1', this.getModifiedFile().getName()));
    },

    getParent: function () {
      return this.getModifiedFile().getParent();
    },

    isWriteable: function () {
      return this.getModifiedFile().isWriteable();
    },

    isTrash: function () {
      return this.getModifiedFile().isTrash();
    },

    isInTrash: function () {
      return this.getModifiedFile().isInTrash();
    },

    isFake: function () {
      return this.getModifiedFile().isFake();
    },

    isTemporary: function () {
      return this.getModifiedFile().isTemporary() || this.getOriginalFile().isTemporary();
    },

    isMounted: function () {
      return this.getModifiedFile().isMounted() || this.getOriginalFile().isMounted();
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
