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
    this._basePath = window.location.origin + window.location.pathname + qx.util.LibraryManager.getInstance().get("cv", "resourceUri") + '/config/';
    this.getContentElement().setAttribute('contentEditable', 'true');
    this.set({
      droppable: false,
      focusable: true
    });
    this.addListener('dragover', function (ev) {
      ev.preventDefault();
      ev.dataTransfer.effectAllowed = "none";
      ev.dataTransfer.dropEffect = "none";
    });
    this.addListener('drop', function (ev) {
      ev.preventDefault();
    });
    this.addListener('appear', function () {
      qx.ui.core.FocusHandler.getInstance().setUseTabNavigation(false);
    });
    this.addListener('disappear', function () {
      qx.ui.core.FocusHandler.getInstance().setUseTabNavigation(true);
    });
    this._draw();
    this._initWorker();
    this._currentDecorations = [];
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    TITLE: qx.locale.Manager.tr('Texteditor'),
    COUNTER: 0,
    SUPPORTED_FILES: ['xml', 'php', 'css', 'js', 'svg', 'json', 'md', 'yaml', 'conf', 'ts', 'rst', 'py', 'txt'],
    ICON: cv.theme.dark.Images.getIcon('text', 18),

    load: function (callback, context) {
      var version = qx.core.Environment.get('qx.debug') ? 'dev' : 'min';
      window.documentationMappingPrefix = "../source/editor/"; // jshint ignore:line
      var sourcePath = qx.util.Uri.getAbsolute(qx.util.LibraryManager.getInstance().get('cv', 'resourceUri')+ '/..');
      var loader = new qx.util.DynamicScriptLoader([
        sourcePath + 'editor/dependencies/jquery.min.js',
        sourcePath + 'editor/dependencies/jquery.xpath.min.js',
        sourcePath + 'editor/lib/Messages.js',
        sourcePath + 'editor/lib/Schema.js',
        sourcePath + '../node_modules/monaco-editor/' + version + '/vs/loader.js',
        'manager/xml.js'
      ]);
      loader.addListener('ready', function () {
        window.require.config({
          paths: {
            'vs': sourcePath + '../node_modules/monaco-editor/' + version + '/vs'
          }
        });
        window.require.config({
          'vs/nls' : {
            availableLanguages: {
              '*': qx.locale.Manager.getInstance().getLanguage() !== 'en' ? qx.locale.Manager.getInstance().getLanguage() : ''
            }
          }
        });
        var noCacheSuffix = '?' + Math.random();
        window.require([
          'xml!./resource/visu_config.xsd' + noCacheSuffix,
          'xml!*./resource/manager/completion-libs/qooxdoo.d.ts', // the xml loader can load any file by adding * before the path,
          'vs/editor/editor.main'
        ], function (schema, qxLib) {
          this.__schema = schema;
          callback.apply(context);
          window.monaco.languages.typescript.javascriptDefaults.addExtraLib(qxLib, 'qooxdoo.d.ts');
          var parsedSchema = new window.Schema("visu_config.xsd", schema); // jshint ignore:line
          var completionProvider = new cv.ui.manager.editor.completion.Config(parsedSchema);
          var cvCompletionProvider = new cv.ui.manager.editor.completion.CometVisu();
          window.monaco.languages.registerCompletionItemProvider('xml', completionProvider.getProvider());
          window.monaco.languages.registerCompletionItemProvider('javascript', cvCompletionProvider.getProvider());

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
    _editor: null,
    _basePath: null,
    _workerWrapper: null,
    _currentDecorations: null,

    _initWorker: function () {
      this._workerWrapper = cv.ui.manager.editor.Worker.getInstance();
      this._workerWrapper.setEditor(this);
    },

    _getDefaultModelOptions: function () {
      return {
        tabSize: 2,
        indentSize: 2,
        insertSpaces: true
      };
    },

    _draw: function () {
      if (!window.monaco) {
        cv.ui.manager.editor.Source.load(this._draw, this);
      } else {
        var domElement = this.getContentElement().getDomElement();
        if (!domElement) {
          this.addListenerOnce('appear', this._draw, this);
        } else {
          this._editor = window.monaco.editor.create(domElement, {
            suggestOnTriggerCharacters: true,
            folding: true,
            autoIndent: true,
            automaticLayout: true,
            dragAndDrop: true,
            formatOnPaste: true,
            formatOnType: true,
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
      if (old && this._workerWrapper) {
        this._workerWrapper.close(old);
      }
      if (this._editor) {
        if (file && file.getType() === 'file' && this.isSupported(file)) {
          this.base(arguments, file, old);
        } else {
          this.base(arguments, null, old);
        }
      }
    },

    _applyContent: function(value) {
      var file = this.getFile();
      if (!file) {
        return;
      }
      var model = this._editor.getModel();
      if (this._workerWrapper) {
        this._workerWrapper.open(file, value);
      }
      var newModel = window.monaco.editor.getModel(file.getUri());
      if (!newModel) {
        // create new model
        if (qx.xml.Document.isXmlDocument(value)) {
          value = value.documentElement.outerHTML;
        }
        newModel = window.monaco.editor.createModel(value, this._getLanguage(file), file.getUri());
      }

      if (model !== newModel) {
        newModel.updateOptions(this._getDefaultModelOptions());
        this._editor.setModel(newModel);
      } else {
        this._editor.setValue(value);
      }
      this._editor.updateOptions({ readOnly: !file.isWriteable() });
    },

    getCurrentContent: function () {
      return this._editor.getValue();
    },

    _onContentChanged: function () {
      if (this._workerWrapper) {
        this._workerWrapper.contentChanged(this.getFile(), this._editor.getValue());
      }
    },

    isSupported: function (file) {
      var parts = file.getName().split('.')
      var fileType = parts.length > 1 ? parts.pop() : 'txt';
      var typeExt = '.' + fileType;
      return monaco.languages.getLanguages().some(function (lang) {
        return lang.id === fileType || lang.extensions.indexOf(typeExt) >= 0;
      });
    },

    showErrors: function (path, errorList) {
      var markers = [];
      var model = this._editor.getModel();
      if (!model) {
        return;
      }
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

    _getLanguage: function (file) {
      var type = file.getName().split('.').pop();
      switch (type) {
        case 'svg':
          return 'xml';
        case 'js':
          return 'javascript';
        case 'md':
          return 'markdown';
        default:
          if (!type) {
            return 'txt';
          }
          // check if monaco knows this ending, otherwise fallback to plaintext
          var typeExt = '.' + type;
          var found = monaco.languages.getLanguages().some(function (lang) {
            return lang.id === type || lang.extensions.indexOf(typeExt) >= 0;
          });
          if (!found) {
            type = 'txt';
          }
          return type
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
    qx.ui.core.FocusHandler.getInstance().setUseTabNavigation(true);
  }
});
