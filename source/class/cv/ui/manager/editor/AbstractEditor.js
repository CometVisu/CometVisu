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
      check: 'cv.ui.manager.model.FileItem || cv.ui.manager.model.CompareFiles',
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
    },

    _loadFile: function (file) {
      if (file && file.getType() === 'file') {
        if (file.getContent() !== null) {
          this.setContent(file.getContent());
        } else {
          this._client.readSync({path: this.getFile().getFullPath()}, function (err, res) {
            if (err) {
              cv.ui.manager.snackbar.Controller.error(err);
            } else {
              this.setContent(res);
            }
          }, this);
        }
      } else {
        this.resetContent();
      }
    },

    // must be overridden by inheriting classes
    _applyContent: function() {},

    // must be overridden by inheriting classes
    getCurrentContent: function () {},

    save: function () {
      var file = this.getFile();
      if (file.isModified()) {
        if (file.isTemporary()) {
          this._client.createSync({
            path: file.getFullPath(),
            hash: file.getHash(),
            type: 'file'
          }, this.getCurrentContent(), function (err) {
            if (err) {
              cv.ui.manager.snackbar.Controller.error(err);
            } else {
              cv.ui.manager.snackbar.Controller.info(this.tr('File has been created'));
              this._onSaved();
              qx.event.message.Bus.dispatchByName(file.getBusTopic(), {
                type: 'created',
                file: file,
                data: this.getCurrentContent(),
                source: this
              });
            }
          }, this);
        } else {
          this._client.updateSync({
            path: file.getFullPath(),
            hash: file.getHash()
          }, this.getCurrentContent(), function (err) {
            if (err) {
              cv.ui.manager.snackbar.Controller.error(err);
            } else {
              cv.ui.manager.snackbar.Controller.info(this.tr('File has been saved'));
              this._onSaved();
              qx.event.message.Bus.dispatchByName(file.getBusTopic(), {
                type: 'contentChanged',
                data: this.getCurrentContent(),
                source: this
              });
            }
          }, this);
        }
      }
    },

    _onSaved: function () {
      var file = this.getFile();
      file.resetModified();
      file.resetTemporary();
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    if (this._client) {
      this._client = null;
    }
  }
});
