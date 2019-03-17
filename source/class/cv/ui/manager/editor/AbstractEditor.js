/**
 * Abstract base class for all editors.
 */
qx.Class.define('cv.ui.manager.editor.AbstractEditor', {
  extend: qx.ui.core.Widget,
  implement: [
    cv.ui.manager.editor.IEditor,
    cv.ui.manager.IActionHandler
  ],
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
    _handledActions: null,

    canHandleAction: function (actionName) {
      return this._handledActions && this._handledActions.includes(actionName);
    },

    handleAction: function (actionName) {
      if (this.canHandleAction(actionName)) {
        switch (actionName) {
          case 'save':
            this.save();
            break;
        }
      }
    },

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
    },

    save: function () {
      var file = this.getFile();
      if (file.isModified()) {
        this._client.update({
          path: file.getFullPath(),
          hash: file.getHash()
        }, this.getCurrentContent());
      }
    },

    _onSaved: function () {
      this.getFile().resetModified();
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
