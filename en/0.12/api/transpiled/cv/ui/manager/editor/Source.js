function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
      "qx.util.LibraryManager": {},
      "qx.util.DynamicScriptLoader": {},
      "cv.ui.manager.editor.completion.Config": {},
      "cv.ui.manager.model.Schema": {},
      "cv.ui.manager.editor.completion.CometVisu": {},
      "qx.log.Logger": {},
      "cv.ui.manager.editor.Worker": {},
      "cv.Version": {},
      "qx.io.request.Xhr": {},
      "qx.util.ResourceManager": {},
      "cv.io.rest.Client": {},
      "cv.ui.manager.snackbar.Controller": {},
      "qxl.dialog.Dialog": {},
      "qx.xml.Document": {},
      "cv.util.ConfigUpgrader": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Source.js 
   * 
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
   * 
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

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
      this.getContentElement().setAttribute('contentEditable', 'true');
      this.set({
        droppable: false,
        focusable: true
      });
      this.addListener('dragover', function (ev) {
        ev.preventDefault();
        ev.dataTransfer.effectAllowed = 'none';
        ev.dataTransfer.dropEffect = 'none';
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
      this.bind('file.writeable', this, 'selectable');
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
        var filename = typeof file === 'string' ? file : file.getFullPath().toLowerCase();

        if (window.monaco && window.monaco.languages) {
          if (!cv.ui.manager.editor.Source.MONACO_EXTENSION_REGEX) {
            // monaco has already been loaded, we can use its languages configuration to check if this file is supported
            var extensions = [];
            monaco.languages.getLanguages().forEach(function (lang) {
              if (lang.extensions) {
                lang.extensions.forEach(function (ext) {
                  ext = ext.replace(/\./g, '\\.');

                  if (extensions.indexOf(ext) === -1) {
                    extensions.push(ext);
                  }
                });
              }
            });
            cv.ui.manager.editor.Source.MONACO_EXTENSION_REGEX = new RegExp('(' + extensions.join('|') + ')$');
          }

          return cv.ui.manager.editor.Source.MONACO_EXTENSION_REGEX.test(filename);
        }

        return /\.(xml|html|php|css|js|svg|json|md|yaml|conf|ts|rst|py|txt)$/i.test(filename);
      },
      DEFAULT_FOR: /^(demo|\.)?\/?visu_config.*\.xml/,
      ICON: cv.theme.dark.Images.getIcon('text', 18),
      load: function load(callback, context) {
        var version = false ? 'dev' : 'min';
        var sourcePath = qx.util.Uri.getAbsolute(qx.util.LibraryManager.getInstance().get('cv', 'resourceUri') + '/..');
        var loader = new qx.util.DynamicScriptLoader([sourcePath + 'node_modules/monaco-editor/' + version + '/vs/loader.js', 'manager/xml.js']);
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
            this.__P_32_0 = schema;
            callback.apply(context);
            window.monaco.languages.typescript.javascriptDefaults.addExtraLib(qxLib, 'qooxdoo.d.ts');
            var completionProvider = new cv.ui.manager.editor.completion.Config(cv.ui.manager.model.Schema.getInstance('visu_config.xsd'));
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
      __P_32_0: null,
      _editor: null,
      _workerWrapper: null,
      _currentDecorations: null,
      _configClient: null,
      _onDidChangeContentGuard: 0,
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
            var xhr = new qx.io.request.Xhr(qx.util.ResourceManager.getInstance().toUri('hidden-schema.json'));
            xhr.set({
              method: 'GET',
              accept: 'application/json'
            });
            xhr.addListenerOnce('success', function (e) {
              var req = e.getTarget();
              var schema = req.getResponse();
              window.monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
                validate: true,
                allowComments: true,
                schemas: [{
                  uri: 'https://www.cometvisu.org/CometVisu/schemas/' + baseVersion + '/hidden-schema.json',
                  fileMatch: ['hidden.php'],
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
          switch (actionName) {
            case 'cut':
              this._editor.trigger('external', 'editor.action.clipboardCutAction');

              if (!this._nativePasteSupported) {
                // we have no access to the native clipboard for pasting, so we need to save the value to copy somewhere else
                // and implement the pasting manually
                cv.ui.manager.editor.AbstractEditor.CLIPBOARD = this._editor.getModel().getValueInRange(this._editor.getSelection());
              }

              break;

            case 'copy':
              this._editor.trigger('external', 'editor.action.clipboardCopyAction');

              if (!this._nativePasteSupported) {
                // we have no access to the native clipboard for pasting, so we need to save the value to copy somewhere else
                // and implement the pasting manually
                cv.ui.manager.editor.AbstractEditor.CLIPBOARD = this._editor.getModel().getValueInRange(this._editor.getSelection());
              }

              break;

            case 'paste':
              if (this._nativePasteSupported) {
                this._editor.trigger('external', 'editor.action.clipboardPasteAction');
              } else {
                this._paste();
              }

              break;

            case 'undo':
            case 'redo':
              this._editor.trigger('external', actionName);

              break;

            default:
              cv.ui.manager.editor.Source.prototype.handleAction.base.call(this, actionName);
              break;
          }
        }
      },

      /**
       * Manual paste into source editor is used when the native paste is not supported by the browser.
       * This is the case when the cometvisu is not running is a safe environment (no https / localhost)
       * @private
       */
      _paste: function _paste() {
        if (cv.ui.manager.editor.AbstractEditor.CLIPBOARD) {
          var selection = this._editor.getSelection();

          var id = {
            major: 1,
            minor: 1
          };
          var op = {
            identifier: id,
            range: selection,
            text: cv.ui.manager.editor.AbstractEditor.CLIPBOARD,
            forceMoveMarkers: true
          };

          this._editor.executeEdits('clipboard', [op]);
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
            qxl.dialog.Dialog.confirm(this.tr('Hidden config content has some warnings! It is recommended to fix the warnings before saving. Save anyways?'), function (confirmed) {
              if (confirmed) {
                this.__P_32_1();
              }
            }, this, qx.locale.Manager.tr('Confirm saving with warnings'));
          } else {
            this.__P_32_1();
          }
        } else {
          cv.ui.manager.editor.Source.prototype.save.base.call(this, callback, overrideHash);
        }
      },
      __P_32_1: function __P_32_1() {
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

        var id = monaco.Uri.parse(file.getUri());
        var newModel = window.monaco.editor.getModel(id);

        if (!newModel) {
          // create new model
          if (qx.xml.Document.isXmlDocument(value)) {
            value = value.documentElement.outerHTML;
          } else if (_typeof(value) === 'object') {
            value = JSON.stringify(value, null, 2);
          }

          newModel = window.monaco.editor.createModel(value, this._getLanguage(file), id);
          newModel.onDidChangeDecorations(function (ev) {
            var errors = false;
            var warnings = false;
            monaco.editor.getModelMarkers({
              owner: newModel.getLanguageId(),
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

        if (Object.prototype.hasOwnProperty.call(handlerOptions, 'upgradeVersion') && handlerOptions.upgradeVersion === true && content) {
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
        if (this.getFile()) {
          if (this.getFile().isWriteable()) {
            var upgrader = new cv.util.ConfigUpgrader();
            return upgrader.upgrade(content);
          }

          cv.ui.manager.snackbar.Controller.error(this.tr('"%1" is not writable. Upgrading not possible.', this.getFile().getFullPath()));
        }

        return [null, '', []];
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
          return lang.id === fileType || lang.extensions && lang.extensions.indexOf(typeExt) >= 0;
        });
      },
      showErrors: function showErrors(path, errorList) {
        var markers = [];

        var model = this._editor.getModel();

        if (!model) {
          return;
        }

        var firstErrorLine = -1;
        /**
         * @param line
         */

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
          window.monaco.editor.setModelMarkers(model, model.getLanguageId(), markers);
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
            {
              if (!type) {
                return 'txt';
              } // check if monaco knows this ending, otherwise fallback to plaintext


              var typeExt = '.' + type;
              var found = monaco.languages.getLanguages().some(function (lang) {
                return lang.id === type || lang.extensions && lang.extensions.indexOf(typeExt) >= 0;
              });

              if (!found) {
                type = 'txt';
              }

              return type;
            }
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

//# sourceMappingURL=Source.js.map?dt=1660930397413