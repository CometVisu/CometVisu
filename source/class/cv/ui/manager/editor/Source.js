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
    this._handledActions = ['save', 'cut', 'copy', 'paste', 'undo', 'redo'];
    this.__basePath = window.location.origin + window.location.pathname + qx.util.LibraryManager.getInstance().get("cv", "resourceUri") + '/config/';
    this.__id = 'editor#' + cv.ui.manager.editor.Source.COUNTER++;
    this.getContentElement().setAttribute('id', this.__id);
    this._draw();
    this._workerWrapper = cv.ui.manager.editor.Worker.getInstance();
    this._workerWrapper.setEditor(this);
    this._currentDecorations = [];
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
    _workerWrapper: null,
    _currentDecorations: null,

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

    handleAction: function (actionName) {
      if (this.canHandleAction(actionName)) {
        var monacoAction;
        switch (actionName) {
          case 'cut':
            monacoAction = this._editor.getAction('editor.action.clipboardCutAction');
            break;
          case 'copy':
            monacoAction = this._editor.getAction('editor.action.clipboardCopyAction');
            break;

          default:
            this.base(arguments, actionName);
            break;
        }
        if (monacoAction) {
          monacoAction.run();
        }
      }
    },

    _loadFile: function (file, old) {
      if (old) {
        this._workerWrapper.close(old);
      }
      if (this._editor) {
        if (file && file.getType() === 'file' && this.isSupported(file)) {
          this.base(arguments, file, old);
        } else {
          this.resetContent();
        }
      }
    },

    _applyContent: function(value) {
      var model = this._editor.getModel();
      var file = this.getFile();
      if (!value) {
        if (model) {
          this._editor.setValue('');
        }
      } else {
        this._workerWrapper.open(file, value);
        var newModel = window.monaco.editor.getModel(file.getUri());
        if (!newModel) {
          // create new model
          newModel = window.monaco.editor.createModel(value, this.__getLanguage(file), file.getUri());
        }

        if (model !== newModel) {
          this._editor.setModel(newModel);
        } else {
          this._editor.setValue(value);
        }
        this._editor.updateOptions({ readOnly: !file.isWriteable() });
      }
    },

    getCurrentContent: function () {
      return this._editor.getValue();
    },

    _onContentChanged: function () {
      this._workerWrapper.contentChanged(this.getFile(), this._editor.getValue());
    },

    isSupported: function (file) {
      var fileType = file.getName().split('.').pop();
      return cv.ui.manager.editor.Source.SUPPORTED_FILES.includes(fileType);
    },

    showErrors: function (path, errorList) {
      var markers = [];
      var model = this._editor.getModel();
      // "file_0.xml:286: element layout: Schemas validity error : Element 'layout': This element is not expected."
      if (errorList) {
//            console.error(errorList);
        var currentMessage = null;
        // collect complete error messages
        errorList.forEach(function (error) {
          if (/.*\.xml:[\d]+:.+/.test(error)) {
            if (currentMessage !== null) {
              markers.push({
                severity: window.monaco.MarkerSeverity.Error,
                startLineNumber: currentMessage.line,
                startColumn: 1,
                endLineNumber: currentMessage.line,
                endColumn: model.getLineContent(currentMessage.line).length,
                message: currentMessage.message
              });
            }
            // add marker for completed message
            var parts = error.split(":");
            var file = parts.shift();
            var line = parseInt(parts.shift());

            // in the last part there might be a more precise line number for the error
            var match = /.+line ([\d]+) -+/.exec(parts[parts.length-1]);
            if (match) {
              line = parseInt(match[1]);
            }
            if (isNaN(line)) {
              return;
            }
            // new error line
            currentMessage = {
              line: line,
              message: parts.slice(-2).join(":"),
              file: file
            };
          } else {
            currentMessage.message += "\n"+error;
          }
        });
        if (currentMessage !== null) {
          // show last error too
          markers.push({
            severity: window.monaco.MarkerSeverity.Error,
            startLineNumber: currentMessage.line,
            startColumn: 1,
            endLineNumber: currentMessage.line,
            endColumn: model.getLineContent(currentMessage.line).length,
            message: currentMessage.message
          });
        }
      }
      if (this.getFile().getFullPath() === path) {
        window.monaco.editor.setModelMarkers(model, '', markers);
      } else {
        // TODO: save errors for later
      }
    },

    showDecorations: function (path, decorators) {
      if (this.getFile().getFullPath() === path) {
        this._editor.deltaDecorations(this._currentDecorations[path], decorators);
      }
      this._currentDecorations[path] = decorators;
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
    this._workerWrapper = null;
    if (this._editor) {
      this._editor.dispose();
      this._editor = null;
    }
  }
});
