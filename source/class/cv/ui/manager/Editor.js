/**
 * Monaco Texteditor integration
 */
qx.Class.define('cv.ui.manager.Editor', {
  extend: qx.ui.core.Widget,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this.__basePath = window.location.origin + window.location.pathname + qx.util.LibraryManager.getInstance().get("cv", "resourceUri") + '/config/';
    this.__id = 'editor#' + cv.ui.manager.Editor.COUNTER++;
    this.getContentElement().setAttribute('id', this.__id);
    this._client = cv.io.rest.Client.getFsClient();
    this._client.addListener('readSuccess', this._onModelValueChange, this);
    this._client.addListener('updateSuccess', this._onSaved, this);
    this._draw();
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    COUNTER: 0,
    SUPPORTED_FILES: ['xml', 'php', 'css', 'js', 'svg'],

    load: function (callback, context) {
      var version = qx.core.Environment.get('qx.debug') ? 'dev' : 'min';
      var loader = new qx.util.DynamicScriptLoader([
        '../../node_modules/monaco-editor/' + version + '/vs/loader.js',
        './editor/text/xml.js'
      ]);
      var noCacheSuffix = '?' + Date.now();
      loader.addListener('ready', function () {
        window.require.config({
          paths: {
            'vs': '../../node_modules/monaco-editor/' + version + '/vs'
          }
        });
        // window.require.config({
        //   'vs/nls' : {
        //     availableLanguages: {
        //       '*': qx.locale.Manager.getInstance().getLanguage() !== 'en' ? qx.locale.Manager.getInstance().getLanguage() : ''
        //     }
        //   }
        // });
        window.require([
          'xml!*./resource/visu_config.xsd' + noCacheSuffix,
          'vs/editor/editor.main'], function (schema) {
          this.__schema = schema;
          callback.apply(context);
        }.bind(this));
      }, this);
      loader.addListener('failed', function (ev) {
        qx.log.Logger.error(this, ev.getData());
      }, this);
      loader.start();
    }
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
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __schema: null,
    __id: null,
    _editor: null,
    __basePath: null,

    _draw: function () {
      if (!window.monaco) {
        cv.ui.manager.Editor.load(this._draw, this);
      } else {
        this._editor = window.monaco.editor.create(document.getElementById(this.__id), {
          suggestOnTriggerCharacters: true,
          folding: true,
          autoIndent: true,
          automaticLayout: true,
          minimap: {
            enabled: true
          },
          theme: 'vs-dark'
        });
        if (this.getFile()) {
          this._loadFile();
        }
        this._editor.onDidChangeModelContent(this._onContentChanged.bind(this));
      }
    },

    _onContentChanged: function (e) {
      console.log(e);
      this.setModified(true);
    },

    isSupported: function (file) {
      var fileType = file.getName().split('.').pop();
      return cv.ui.manager.Editor.SUPPORTED_FILES.includes(fileType);
    },

    save: function () {
      if (this.isModified()) {
        this._client.update({
          path: this.getFile().getFullPath()
        }, this._editor.getValue());
      }
    },

    _onSaved: function () {
      this.resetModified();
    },

    _updateSaveable: function () {
      this.setSaveable(this.isValid() && this.isModified());
    },

    _loadFile: function (file) {
      if (this._editor) {
        if (file && file.getType() === 'file' && this.isSupported(file)) {
          this._client.read({path: this.getFile().getFullPath()});
        } else {
          this._editor.setModel(null);
        }
      }
    },

    __getLanguage: function (file) {
      var type = file.getName().split('.').pop();
      switch (type) {
        case 'svg':
          return 'xml';
        case 'js':
          return 'javascript';
        default:
          return type;
      }
    },

    _onModelValueChange: function (ev) {
      var url = ev.getRequest().getUrl();
      if (!this.getFile() || !url.includes('/fs?path=' + this.getFile().getFullPath())) {
        return;
      }
      var data = ev.getData();
      var model = this._editor.getModel();
      var language = this.__getLanguage(this.getFile());
      if (!model || model.getLanguageIdentifier().language !== language) {
        // dispose old model
        if (model) {
          model.dispose();
        }
        model = window.monaco.editor.createModel(data, language);
        this._editor.setModel(model);
      } else {
        this._editor.setValue(data);
      }
      this.resetValid();
      this.resetModified();
      this.resetSaveable();
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
    this._editor && this._editor.dispose();
  }
});
