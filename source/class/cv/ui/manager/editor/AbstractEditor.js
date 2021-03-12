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
      apply: '_loadFile',
      event: 'changeFile'
    },

    content: {
      nullable: true,
      event: 'changeContent',
      apply: '_applyContent'
    },

    handlerOptions: {
      check: 'Map',
      nullable: true
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
    MEMBERS
  ***********************************************
  */
  members: {
    _handledActions: null,

    canHandleAction: function (actionName) {
      if (actionName === 'save' && this.getFile() && !this.getFile().isWriteable()) {
        return false;
      }
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

    configureButton: function (button) {},
    unConfigureButton: function (button) {},

    _initClient: function () {
      this._client = cv.io.rest.Client.getFsClient();
    },

    _loadFile: function (file, old) {
      if (old) {
        qx.event.message.Bus.unsubscribe(old.getBusTopic(), this._onChange, this);
      }
      if (file && file.getType() === 'file') {
        if (file.getContent() !== null) {
          this.setContent(file.getContent());
        } else {
          this._loadFromFs();
        }
        qx.event.message.Bus.subscribe(file.getBusTopic(), this._onChange, this);
      } else {
        this.resetContent();
      }
    },

    _loadFromFs: function () {
      this._client.readSync({path: this.getFile().getFullPath()}, function (err, res) {
        if (err) {
          cv.ui.manager.snackbar.Controller.error(err);
        } else {
          this.setContent(res);
        }
      }, this);
    },

    _onChange: function (ev) {
      var data = ev.getData();
      if (data.type === 'fsContentChanged' && data.source !== this) {
        this.setContent(data.data);
      }
    },

    // must be overridden by inheriting classes
    _applyContent: function() {},

    // must be overridden by inheriting classes
    getCurrentContent: function () {},

    _handleSaveResponse: function (type, err) {
      if (err) {
        cv.ui.manager.snackbar.Controller.error(err);
      } else {
        var file = this.getFile();
        var message = type === 'created' ? this.tr('File has been created') : this.tr('File has been saved')
        cv.ui.manager.snackbar.Controller.info(message);
        this._onSaved();
        qx.event.message.Bus.dispatchByName(file.getBusTopic(), {
          type: type,
          file: file,
          data: this.getCurrentContent(),
          source: this
        });
      }
    },

    save: function (callback, overrideHash) {
      var file = this.getFile();
      if (file.isModified()) {
        if (file.isTemporary()) {
          this._client.createSync({
            path: file.getFullPath(),
            hash: overrideHash || file.getHash(),
            type: 'file'
          }, this.getCurrentContent(), callback || qx.lang.Function.curry(this._handleSaveResponse, 'created'), this);
        } else {
          this._client.updateSync({
            path: file.getFullPath(),
            hash: overrideHash || file.getHash()
          }, this.getCurrentContent(), callback || qx.lang.Function.curry(this._handleSaveResponse, 'contentChanged'), this);
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
