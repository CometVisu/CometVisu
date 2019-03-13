/**
 * Abstract base class for all editors.
 */
qx.Class.define('cv.ui.manager.editor.AbstractEditor', {
  extend: qx.ui.core.Widget,
  implement: cv.ui.manager.editor.IEditor,
  type: "abstract",

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this._initClient();
  },

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
    },

    content: {
      nullable: true,
      event: 'changeContent',
      apply: '_applyContent'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {

    _initClient: function () {
      this._client = cv.io.rest.Client.getFsClient();
      this._client.addListener('readSuccess', this._onModelValueChange, this);
      this._client.addListener('updateSuccess', this._onSaved, this);
    },

    _loadFile: function (file) {
      if (file && file.getType() === 'file') {
        this._client.read({path: this.getFile().getFullPath()});
      } else {
        this.resetContent();
      }
    },

    // must be overridden by inheriting classes
    _applyContent: function() {},

    // must be overridden by inheriting classes
    getCurrentContent: function () {},

    _onModelValueChange: function (ev) {
      var url = ev.getRequest().getUrl();
      if (!this.getFile() || !url.includes('/fs?path=' + this.getFile().getFullPath())) {
        return;
      }
      this.setContent(ev.getData());
      this.resetValid();
      this.resetModified();
      this.resetSaveable();
    },

    save: function () {
      if (this.isModified()) {
        this._client.update({
          path: this.getFile().getFullPath()
        }, this.getCurrentContent());
      }
    },

    _onSaved: function () {
      this.resetModified();
    },

    _updateSaveable: function () {
      this.setSaveable(this.isValid() && this.isModified());
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    if (this._client) {
      this._client.removeListener('getSuccess', this._onModelValueChange, this);
      this._client = null;
    }
  }
});
