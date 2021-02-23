function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.manager.editor.AbstractEditor": {
        "construct": true,
        "require": true
      },
      "qx.util.LibraryManager": {
        "construct": true
      },
      "qx.ui.core.FocusHandler": {
        "construct": true
      },
      "qx.locale.Manager": {
        "require": true
      },
      "cv.theme.dark.Images": {
        "usage": "dynamic",
        "require": true
      },
      "qx.util.Uri": {},
      "qx.util.DynamicScriptLoader": {},
      "cv.ui.manager.editor.completion.Config": {},
      "cv.ui.manager.editor.completion.CometVisu": {},
      "qx.log.Logger": {},
      "cv.ui.manager.editor.Worker": {},
      "cv.Version": {},
      "qx.io.request.Xhr": {},
      "qx.util.ResourceManager": {},
      "cv.io.rest.Client": {},
      "cv.ui.manager.snackbar.Controller": {},
      "dialog.Dialog": {},
      "qx.xml.Document": {},
      "cv.util.ConfigUpgrader": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

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
    construct: function construct() {
      cv.ui.manager.editor.AbstractEditor.constructor.call(this);
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
      this.__P_31_0 = /(\s*)(.*)\s*/;
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
      SUPPORTED_FILES: function SUPPORTED_FILES(file) {
        if (window.monaco && window.monaco.languages) {
          if (!cv.ui.manager.editor.Source.MONACO_EXTENSION_REGEX) {
            // monaco has already been loaded, we can use its languages configuration to check if this file is supported
            var extensions = [];
            monaco.languages.getLanguages().forEach(function (lang) {
              lang.extensions.forEach(function (ext) {
                ext = ext.replace(/\./g, '\\.');

                if (extensions.indexOf(ext) === -1) {
                  extensions.push(ext);
                }
              });
            });
            cv.ui.manager.editor.Source.MONACO_EXTENSION_REGEX = new RegExp('(' + extensions.join('|') + ')$');
          }

          return cv.ui.manager.editor.Source.MONACO_EXTENSION_REGEX.test(file.getFullPath().toLowerCase());
        } else {
          return /\.(xml|php|css|js|svg|json|md|yaml|conf|ts|rst|py|txt)$/i.test(file.getFullPath().toLowerCase());
        }
      },
      DEFAULT_FOR: /^(demo)?\/?visu_config.*\.xml/,
      ICON: cv.theme.dark.Images.getIcon('text', 18),
      load: function load(callback, context) {
        var version = false ? 'dev' : 'min';
        window.documentationMappingPrefix = "editor/"; // jshint ignore:line

        var sourcePath = qx.util.Uri.getAbsolute(qx.util.LibraryManager.getInstance().get('cv', 'resourceUri') + '/..');
        var loader = new qx.util.DynamicScriptLoader([sourcePath + 'editor/dependencies/jquery.min.js', sourcePath + 'editor/dependencies/jquery.xpath.min.js', sourcePath + 'editor/lib/Messages.js', sourcePath + 'editor/lib/Schema.js', sourcePath + 'node_modules/monaco-editor/' + version + '/vs/loader.js', 'manager/xml.js']);
        loader.addListener('ready', function () {
          window.require.config({
            paths: {
              'vs': sourcePath + 'node_modules/monaco-editor/' + version + '/vs'
            }
          });

          window.require.config({
            'vs/nls': {
              availableLanguages: {
                '*': qx.locale.Manager.getInstance().getLanguage() !== 'en' ? qx.locale.Manager.getInstance().getLanguage() : ''
              }
            }
          });

          var noCacheSuffix = '?' + Math.random();

          window.require(['xml!./resource/visu_config.xsd' + noCacheSuffix, 'xml!*./resource/manager/completion-libs/qooxdoo.d.ts', // the xml loader can load any file by adding * before the path,
          'vs/editor/editor.main'], function (schema, qxLib) {
            this.__P_31_1 = schema;
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
      __P_31_1: null,
      _editor: null,
      _basePath: null,
      _workerWrapper: null,
      _currentDecorations: null,
      _configClient: null,
      _onDidChangeContentGuard: 0,
      __P_31_0: null,
      _initWorker: function _initWorker() {
        this._workerWrapper = cv.ui.manager.editor.Worker.getInstance();

        this._workerWrapper.setEditor(this);
      },
      _getDefaultModelOptions: function _getDefaultModelOptions() {
        return {
          tabSize: 2,
          indentSize: 2,
          insertSpaces: true
        };
      },
      _draw: function _draw() {
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
              });
            }, this);
            xhr.send();

            if (this.getFile()) {
              this._loadFile(this.getFile());
            }

            this._editor.onDidChangeModelContent(this._onContentChanged.bind(this));
          }
        }
      },
      handleAction: function handleAction(actionName) {
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
              cv.ui.manager.editor.Source.prototype.handleAction.base.call(this, actionName);
              break;
          }

          if (monacoAction) {
            monacoAction.run();
          }
        }
      },
      _loadFile: function _loadFile(file, old) {
        if (old && this._workerWrapper) {
          this._workerWrapper.close(old);
        }

        if (this._editor) {
          if (file && file.getType() === 'file' && this.isSupported(file)) {
            cv.ui.manager.editor.Source.prototype._loadFile.base.call(this, file, old);
          } else {
            cv.ui.manager.editor.Source.prototype._loadFile.base.call(this, null, old);
          }
        }
      },
      _loadFromFs: function _loadFromFs() {
        if (this.getFile().getName() === 'hidden.php') {
          if (!this._configClient) {
            this._configClient = cv.io.rest.Client.getConfigClient();

            this._configClient.addListener('getSuccess', function (ev) {
              this.setContent(JSON.stringify(ev.getData(), null, 2));
            }, this);

            this._configClient.addListener('updateSuccess', this._onSaved, this);
          }

          this._configClient.get({
            section: '*',
            key: '*'
          });
        } else {
          cv.ui.manager.editor.Source.prototype._loadFromFs.base.call(this);
        }
      },
      save: function save(callback, overrideHash) {
        if (this.getFile().getName() === 'hidden.php') {
          if (!this.getFile().isValid()) {
            cv.ui.manager.snackbar.Controller.error(this.tr('Hidden config is invalid, please correct the errors'));
          } else if (this.getFile().getHasWarnings()) {
            // ask user if he really want to save a file with warnings
            dialog.Dialog.confirm(this.tr("Hidden config content has some warnings! It is recommended to fix the warnings before saving. Save anyways?"), function (confirmed) {
              if (confirmed) {
                this.__P_31_2();
              }
            }, this, qx.locale.Manager.tr('Confirm saving with warnings'));
          } else {
            this.__P_31_2();
          }
        } else {
          cv.ui.manager.editor.Source.prototype.save.base.call(this, callback, overrideHash);
        }
      },
      __P_31_2: function __P_31_2() {
        this._configClient.saveSync(null, JSON.parse(this.getCurrentContent()), function (err) {
          if (err) {
            cv.ui.manager.snackbar.Controller.error(this.tr('Saving hidden config failed with error %1 (%2)', err.status, err.statusText));
          } else {
            cv.ui.manager.snackbar.Controller.info(this.tr('Hidden config has been saved'));

            this._onSaved();
          }
        }, this);
      },
      _applyContent: function _applyContent(value) {
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
          newModel.onDidChangeDecorations(function (ev) {
            var errors = false;
            var warnings = false;
            monaco.editor.getModelMarkers({
              owner: newModel.getModeId(),
              resource: file.getUri()
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
          });
        }

        if (model !== newModel) {
          newModel.updateOptions(this._getDefaultModelOptions());

          this._editor.setModel(newModel);
        } else {
          this._editor.setValue(value);
        }

        this._editor.updateOptions({
          readOnly: !file.isWriteable()
        });

        this._processHandlerOptions(value);
      },
      _processHandlerOptions: function _processHandlerOptions(content) {
        var handlerOptions = this.getHandlerOptions() || {};

        if (handlerOptions.hasOwnProperty('upgradeVersion') && handlerOptions.upgradeVersion === true && content) {
          var _this$_upgradeConfig = this._upgradeConfig(content),
              _this$_upgradeConfig2 = _slicedToArray(_this$_upgradeConfig, 2),
              err = _this$_upgradeConfig2[0],
              res = _this$_upgradeConfig2[1];

          if (err) {
            this.error(err);
          } else {
            this._editor.setValue(this._convertToString(res));
          }
        }
      },
      _convertToString: function _convertToString(xml) {
        return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' + xml.documentElement.outerHTML;
      },
      _upgradeConfig: function _upgradeConfig(content) {
        var upgrader = new cv.util.ConfigUpgrader();
        return upgrader.upgrade(content);
      },
      getCurrentContent: function getCurrentContent() {
        return this._editor.getValue();
      },
      _onContentChanged: function _onContentChanged() {
        if (this._workerWrapper) {
          this._workerWrapper.contentChanged(this.getFile(), this._editor.getValue());
        }
      },
      isSupported: function isSupported(file) {
        var parts = file.getName().split('.');
        var fileType = parts.length > 1 ? parts.pop() : 'txt';
        var typeExt = '.' + fileType;
        return monaco.languages.getLanguages().some(function (lang) {
          return lang.id === fileType || lang.extensions.indexOf(typeExt) >= 0;
        });
      },
      _getErrorPosition: function _getErrorPosition(lineNo) {
        var content = this._editor.getModel().getLineContent(lineNo);

        var match = this.__P_31_0.exec(content);

        if (match) {
          var startSpaces = match[1].length + 1;
          return {
            startColumn: startSpaces,
            endColumn: startSpaces + match[2].length
          };
        } else {
          return {
            startColumn: 1,
            endColumn: content.length
          };
        }
      },
      showErrors: function showErrors(path, errorList) {
        var markers = [];

        var model = this._editor.getModel();

        if (!model) {
          return;
        }

        var firstErrorLine = -1;

        function check(line) {
          if (firstErrorLine < 0 || firstErrorLine > line) {
            firstErrorLine = line;
          }
        } // "file_0.xml:286: element layout: Schemas validity error : Element 'layout': This element is not expected."


        if (errorList) {
          //            console.error(errorList);
          var currentMessage = null; // collect complete error messages

          errorList.forEach(function (error) {
            if (/.*\.xml:[\d]+:.+/.test(error)) {
              if (currentMessage !== null) {
                markers.push(Object.assign({
                  severity: window.monaco.MarkerSeverity.Error,
                  startLineNumber: currentMessage.line,
                  endLineNumber: currentMessage.line,
                  message: currentMessage.message,
                  source: currentMessage.source
                }, this._getErrorPosition(currentMessage.line)));
                check(currentMessage.line);
              } // add marker for completed message


              var parts = error.split(":");
              var file = parts.shift();
              var line = parseInt(parts.shift()); // in the last part there might be a more precise line number for the error

              var match = /.+line ([\d]+) -+/.exec(parts[parts.length - 1]);

              if (match) {
                line = parseInt(match[1]);
              }

              if (isNaN(line)) {
                return;
              } // new error line


              currentMessage = {
                line: line,
                message: parts.slice(-2).join(":"),
                file: file,
                source: error
              };
              check(currentMessage.line);
            } else {
              currentMessage.message += "\n" + error;
            }
          }, this);

          if (currentMessage !== null) {
            // show last error too
            markers.push(Object.assign({
              severity: window.monaco.MarkerSeverity.Error,
              startLineNumber: currentMessage.line,
              endLineNumber: currentMessage.line,
              message: currentMessage.message,
              source: currentMessage.source
            }, this._getErrorPosition(currentMessage.line)));
            check(currentMessage.line);
          }
        }

        if (this.getFile().getFullPath() === path) {
          window.monaco.editor.setModelMarkers(model, model.getModeId(), markers);
          var options = this.getHandlerOptions();

          if (options && options.jumpToError) {
            // jump too first error (only when we are at the beginning
            if (this._editor.getScrollTop() === 0) {
              this._editor.revealLineInCenter(firstErrorLine);
            }
          }
        } else {// TODO: save errors for later
        }
      },
      showDecorations: function showDecorations(path, decorators) {
        if (this.getFile().getFullPath() === path) {
          this._editor.deltaDecorations(this._currentDecorations[path], decorators);
        }

        this._currentDecorations[path] = decorators;
      },
      _getLanguage: function _getLanguage(file) {
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
            } // check if monaco knows this ending, otherwise fallback to plaintext


            var typeExt = '.' + type;
            var found = monaco.languages.getLanguages().some(function (lang) {
              return lang.id === type || lang.extensions.indexOf(typeExt) >= 0;
            });

            if (!found) {
              type = 'txt';
            }

            return type;
        }
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._workerWrapper = null;

      if (this._editor) {
        this._editor.dispose();

        this._editor = null;
      }

      this._configClient = null;
      qx.ui.core.FocusHandler.getInstance().setUseTabNavigation(true);
    }
  });
  cv.ui.manager.editor.Source.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Source.js.map?dt=1614107733214