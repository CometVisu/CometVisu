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
    MONACO_EXTENSION_REGEX: null,
    SUPPORTED_FILES: function (file) {
      if (window.monaco && window.monaco.languages) {
        if (!cv.ui.manager.editor.Source.MONACO_EXTENSION_REGEX) {
          // monaco has already been loaded, we can use its languages configuration to check if this file is supported
          var extensions = []
          monaco.languages.getLanguages().forEach(function (lang) {
            lang.extensions.forEach(function (ext) {
              ext = ext.replace(/\./g, '\\.')
              if (extensions.indexOf(ext) ===-1) {
                extensions.push(ext);
              }
            })
          });
          cv.ui.manager.editor.Source.MONACO_EXTENSION_REGEX = new RegExp('(' + extensions.join('|') + ')$');
        }
        return cv.ui.manager.editor.Source.MONACO_EXTENSION_REGEX.test(file.getFullPath().toLowerCase())
      } else {
        return /\.(xml|php|css|js|svg|json|md|yaml|conf|ts|rst|py|txt)$/i.test(file.getFullPath().toLowerCase())
      }
    },
    DEFAULT_FOR: /^(demo)?\/?visu_config.*\.xml/,
    ICON: cv.theme.dark.Images.getIcon('text', 18),

    load: function (callback, context) {
      var version = qx.core.Environment.get('qx.debug') ? 'dev' : 'min';
      window.documentationMappingPrefix = "editor/"; // jshint ignore:line
      var sourcePath = qx.util.Uri.getAbsolute(qx.util.LibraryManager.getInstance().get('cv', 'resourceUri')+ '/..');
      var loader = new qx.util.DynamicScriptLoader([
        sourcePath + 'node_modules/monaco-editor/' + version + '/vs/loader.js',
        'manager/xml.js'
      ]);
      loader.addListener('ready', function () {
        window.require.config({
          paths: {
            'vs': sourcePath + 'node_modules/monaco-editor/' + version + '/vs'
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
          const completionProvider = new cv.ui.manager.editor.completion.Config(cv.ui.manager.model.Schema.getInstance("visu_config.xsd"));
          const cvCompletionProvider = new cv.ui.manager.editor.completion.CometVisu();
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
    _configClient: null,
    _onDidChangeContentGuard: 0,

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
            renderValidationDecorations: 'on',
            minimap: {
              enabled: true
            },
            theme: 'vs-dark'
          });
          var baseVersion = cv.Version.VERSION.split('-')[0];
          var xhr = new qx.io.request.Xhr(qx.util.ResourceManager.getInstance().toUri("hidden-schema.json"));
          xhr.set({
            method: "GET",
            accept: "application/json"
          });
          xhr.addListenerOnce("success", function (e) {
            var req = e.getTarget();
            var schema = req.getResponse();
            window.monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
              validate: true,
              allowComments: true,
              schemas: [{
                uri: "https://www.cometvisu.org/CometVisu/schemas/" + baseVersion + "/hidden-schema.json",
                fileMatch: ["hidden.php"],
                schema: schema
              }]
            })
          }, this);
          xhr.send();

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
          case 'paste':
            navigator.clipboard.readText().then(clipText => this._editor.trigger('keyboard', 'type', {text: clipText}));
            break;
          case 'undo':
          case 'redo':
            this._editor.trigger('external', actionName);
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

    _loadFromFs: function () {
      if (this.getFile().getName() === 'hidden.php') {
        if (!this._configClient) {
          this._configClient = cv.io.rest.Client.getConfigClient();
          this._configClient.addListener('getSuccess', function (ev) {
            this.setContent(JSON.stringify(ev.getData(), null, 2));
          }, this);
          this._configClient.addListener('updateSuccess', this._onSaved, this);
        }
        this._configClient.get({section: '*', key: '*'});
      } else {
        this.base(arguments);
      }
    },

    save: function (callback, overrideHash) {
      if (this.getFile().getName() === 'hidden.php') {
        if (!this.getFile().isValid()) {
          cv.ui.manager.snackbar.Controller.error(this.tr('Hidden config is invalid, please correct the errors'));
        } else if (this.getFile().getHasWarnings()) {
          // ask user if he really want to save a file with warnings
          dialog.Dialog.confirm(this.tr("Hidden config content has some warnings! It is recommended to fix the warnings before saving. Save anyways?"), function (confirmed) {
            if (confirmed) {
              this.__saveHiddenConfig();
            }
          }, this, qx.locale.Manager.tr('Confirm saving with warnings'));
        } else {
          this.__saveHiddenConfig();
        }
      } else {
        this.base(arguments, callback, overrideHash);
      }
    },

    __saveHiddenConfig: function () {
      this._configClient.saveSync(null, JSON.parse(this.getCurrentContent()), function (err) {
        if (err) {
          cv.ui.manager.snackbar.Controller.error(this.tr('Saving hidden config failed with error %1 (%2)', err.status, err.statusText));
        } else {
          cv.ui.manager.snackbar.Controller.info(this.tr('Hidden config has been saved'));
          this._onSaved();
        }
      }, this);
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
        const id = monaco.Uri.parse(file.getUri());
        newModel = window.monaco.editor.createModel(value, this._getLanguage(file), id);
        newModel.onDidChangeDecorations(function (ev) {
          var errors = false;
          var warnings = false;
          monaco.editor.getModelMarkers({
            owner: newModel.getModeId(),
            resource: id
          }).some(function (marker) {
            if (marker.severity === monaco.MarkerSeverity.Warning) {
              warnings = true;
            } else if (marker.severity === monaco.MarkerSeverity.Error) {
              errors = true;
            }
            return warnings && errors;
          }, this);
          file.setValid(!errors);
          file.setHasWarnings(warnings);
        })
      }

      if (model !== newModel) {
        newModel.updateOptions(this._getDefaultModelOptions());
        this._editor.setModel(newModel);
      } else {
        this._editor.setValue(value);
      }
      this._editor.updateOptions({ readOnly: !file.isWriteable() });
      this._processHandlerOptions(value);
    },

    _processHandlerOptions: function (content) {
      var handlerOptions = this.getHandlerOptions() || {};
      if (handlerOptions.hasOwnProperty('upgradeVersion') && handlerOptions.upgradeVersion === true && content) {
        const [err, res] = this._upgradeConfig(content);
        if (err) {
          this.error(err);
        } else {
          this._editor.setValue(this._convertToString(res));
        }
      }
    },

    _convertToString: function (xml) {
      return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' + xml.documentElement.outerHTML;
    },

    _upgradeConfig: function (content) {
      const upgrader = new cv.util.ConfigUpgrader();
      return upgrader.upgrade(content);
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
      let firstErrorLine = -1;
      function check(line) {
        if (firstErrorLine < 0 || firstErrorLine > line) {
          firstErrorLine = line;
        }
      }
      if (errorList) {
        errorList.forEach(function (error) {
          check(error.line);
          markers.push({
            severity: window.monaco.MarkerSeverity.Error,
            startLineNumber: error.line,
            endLineNumber: error.line,
            message: error.message,
            startColumn: error.startColumn,
            endColumn: error.endColumn
          });
        });
      }
      if (this.getFile().getFullPath() === path) {
        window.monaco.editor.setModelMarkers(model, model.getModeId(), markers);
        const options = this.getHandlerOptions();
        if (options && options.jumpToError) {
          // jump too first error (only when we are at the beginning
          if (this._editor.getScrollTop() === 0) {
            this._editor.revealLineInCenter(firstErrorLine);
          }
        }
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
      if (file.getName() === 'hidden.php') {
        // override this setting as we are loading the hidden config from its REST endpoint as JSON
        return 'json';
      }
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
    this._configClient = null;
    qx.ui.core.FocusHandler.getInstance().setUseTabNavigation(true);
  }
});
