/**
 * Abstract base class for all editors.
 */
qx.Class.define('cv.ui.manager.editor.AbstractEditor', {
  extend: qx.ui.core.Widget,
  implement: [
    cv.ui.manager.editor.IEditor,
    cv.ui.manager.IActionHandler
  ],
  type: 'abstract',

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this._initClient();
    this._nativePasteSupported = document.queryCommandSupported('paste');
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
      nullable: true,
      apply: '_applyHandlerOptions'
    },

    /**
     * External viewers just open the file in a new frame but to not show a new tab in the manager for the opened file
     */
    external: {
      check: 'Boolean',
      init: false
    },

    ready: {
      check: 'Boolean',
      init: true,
      event: 'changeReady'
    }
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    // fake clipboard data when native clipboard is not supported
    CLIPBOARD: null
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _handledActions: null,
    _nativePasteSupported: false,

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

    _applyHandlerOptions: function () {},

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
          if (res instanceof XMLDocument) {
            res = new XMLSerializer().serializeToString(res);
          }
          this.setContent(res);
        }
      }, this);
    },

    _onChange: function (ev) {
      const data = ev.getData();
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
        const file = this.getFile();
        const message = type === 'created' ? this.tr('File has been created') : this.tr('File has been saved');
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
      const file = this.getFile();
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
      const file = this.getFile();
      file.resetModified();
      file.resetTemporary();
    },

    showErrors: function (path, errorList) {},
    showDecorations: function (path, decorators) {}
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
