/**
 * Monaco Texteditor integration
 */
qx.Class.define('cv.ui.manager.editor.Source', {
  extend: cv.ui.manager.editor.AbstractEditor,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this.__basePath = window.location.origin + window.location.pathname + qx.util.LibraryManager.getInstance().get("cv", "resourceUri") + '/config/';
    this.__id = 'editor#' + cv.ui.manager.editor.Source.COUNTER++;
    this.getContentElement().setAttribute('id', this.__id);
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
        'manager/xml.js'
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
        cv.ui.manager.editor.Source.load(this._draw, this);
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
          this._loadFile(this.getFile());
        }
        this._editor.onDidChangeModelContent(this._onContentChanged.bind(this));
      }
    },

    _loadFile: function (file) {
      if (this._editor) {
        if (file && file.getType() === 'file' && this.isSupported(file)) {
          this.base(arguments, file);
        } else {
          this.resetContent();
        }
      }
    },

    _applyContent: function(value) {
      var model = this._editor.getModel();
      var language = this.__getLanguage(this.getFile());
      if (!model || model.getLanguageIdentifier().language !== language) {
        // dispose old model
        if (model) {
          model.dispose();
        }
        model = window.monaco.editor.createModel(value, language);
        this._editor.setModel(model);
      } else {
        this._editor.setValue(value);
      }
    },

    getCurrentContent: function () {
      return this._editor.getValue();
    },

    _onContentChanged: function (e) {
      console.log(e);
      this.setModified(true);
    },

    isSupported: function (file) {
      var fileType = file.getName().split('.').pop();
      return cv.ui.manager.editor.Source.SUPPORTED_FILES.includes(fileType);
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
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    if (this._editor) {
      this._editor.dispose();
      this._editor = null;
    }
  }
});
