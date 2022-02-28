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
      "cv.ui.manager.editor.Source": {
        "construct": true,
        "require": true
      },
      "qx.locale.Manager": {
        "require": true
      },
      "cv.theme.dark.Images": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.manager.model.CompareFiles": {},
      "cv.ui.manager.model.FileItem": {},
      "qx.event.message.Bus": {},
      "cv.ui.manager.snackbar.Controller": {},
      "cv.ui.manager.Main": {},
      "qxl.dialog.Dialog": {},
      "qx.bom.Viewport": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Diff.js 
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
   * Monaco Texteditor for file content comparison
   */
  qx.Class.define('cv.ui.manager.editor.Diff', {
    extend: cv.ui.manager.editor.Source,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      cv.ui.manager.editor.Source.constructor.call(this); // this._handledActions = [];
    },

    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      COUNTER: 0,
      TITLE: qx.locale.Manager.tr('File compare'),
      ICON: cv.theme.dark.Images.getIcon('compare', 18)
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      originalContent: {
        check: 'String',
        init: '',
        apply: '_applyContent'
      },
      modifiedContent: {
        check: 'String',
        init: '',
        apply: '_applyContent'
      },
      editable: {
        check: 'Boolean',
        init: false,
        apply: '_applyEditable'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _applyEditable: function _applyEditable(value) {
        if (this._editor) {
          this._editor.updateOptions({
            readOnly: !value
          });
        }
      },
      // overridden, worker is a singleton and not usable for the diff editor
      _initWorker: function _initWorker() {},
      _draw: function _draw() {
        if (!window.monaco) {
          cv.ui.manager.editor.Source.load(this._draw, this);
        } else {
          var domElement = this.getContentElement().getDomElement();

          if (!domElement) {
            this.addListenerOnce('appear', this._draw, this);
          } else {
            this._editor = window.monaco.editor.createDiffEditor(domElement, {
              folding: true,
              autoIndent: true,
              automaticLayout: true,
              theme: 'vs-dark',
              readOnly: !this.getEditable()
            });

            if (this.getFile()) {
              this._loadFile(this.getFile());
            }
          }
        }
      },
      _applyContent: function _applyContent() {
        var original = this.getOriginalContent();
        var modified = this.getModifiedContent();

        if (original && modified) {
          var file = this.getFile();
          var originalFile = file instanceof cv.ui.manager.model.CompareFiles ? file.getOriginalFile() : file;
          var modifiedFile = file instanceof cv.ui.manager.model.CompareFiles ? file.getModifiedFile() : file;
          var originalModel = window.monaco.editor.createModel(original, this._getLanguage(originalFile));
          originalModel.updateOptions(this._getDefaultModelOptions());
          var modifiedModel = window.monaco.editor.createModel(modified, this._getLanguage(modifiedFile));
          modifiedModel.updateOptions(this._getDefaultModelOptions());

          this._editor.setModel({
            original: originalModel,
            modified: modifiedModel
          });
        }
      },
      getCurrentContent: function getCurrentContent() {
        return this._editor.getModifiedEditor().getValue();
      },
      clear: function clear() {
        this._editor.getModel().original.dispose();

        this._editor.getModel().modified.dispose();
      },
      save: function save(callback) {
        var handlerOptions = this.getHandlerOptions();

        if (this.getFile() instanceof cv.ui.manager.model.FileItem && Object.prototype.hasOwnProperty.call(handlerOptions, 'upgradeVersion') && handlerOptions.upgradeVersion === true) {
          cv.ui.manager.editor.Diff.prototype.save.base.call(this, callback, 'ignore');
        }
      },
      _loadFile: function _loadFile(file, old) {
        if (old && old instanceof cv.ui.manager.model.FileItem) {
          qx.event.message.Bus.unsubscribe(old.getBusTopic(), this._onChange, this);
        }

        if (this._editor) {
          var handlerOptions = this.getHandlerOptions();

          if (file && file instanceof cv.ui.manager.model.FileItem && Object.prototype.hasOwnProperty.call(handlerOptions, 'upgradeVersion') && handlerOptions.upgradeVersion === true) {
            if (!file.isWriteable()) {
              cv.ui.manager.snackbar.Controller.error(this.tr('"%1" is not writable. Upgrading not possible.', this.getFile().getFullPath()));
              cv.ui.manager.Main.getInstance().closeFile(file);
              return;
            }

            qx.event.message.Bus.subscribe(file.getBusTopic(), this._onChange, this);
            this.setEditable(file.isWriteable());

            this._client.readSync({
              path: file.getFullPath()
            }, function (err, res) {
              if (err) {
                cv.ui.manager.snackbar.Controller.error(err);
              } else {
                this.setOriginalContent(res);

                var _this$_upgradeConfig = this._upgradeConfig(res),
                    _this$_upgradeConfig2 = _slicedToArray(_this$_upgradeConfig, 3),
                    _err = _this$_upgradeConfig2[0],
                    upgradedContent = _this$_upgradeConfig2[1],
                    changes = _this$_upgradeConfig2[2];

                if (_err) {
                  qxl.dialog.Dialog.error(_err);
                  qx.event.message.Bus.dispatchByName('cv.manager.action.close');
                } else {
                  this.setModifiedContent(this._convertToString(upgradedContent));
                  var changesText = changes.length > 0 ? '<div>' + qx.locale.Manager.tr('The following changes have been made') + '</div>' + '<ul><li>' + changes.join('</li><li>') + '</li></ul>' + '<div>' + qx.locale.Manager.tr('You can check the changes in the editor. The left side shows the content before the upgrade and the right side shows the content after the upgrade.') + '</div>' : '<div><strong>' + qx.locale.Manager.tr('No changes have been made') + '</strong></div>';
                  var msg = '<h3>' + qx.locale.Manager.tr('Config file has been upgraded to the current library version.').translate().toString() + '</h3>' + changesText + '<div>' + qx.locale.Manager.tr('Click "Apply" if you want to save the changes and reload the browser.') + '</div>' + '<div>' + qx.locale.Manager.tr('Click "Check" if you want to check the changes. You have to save the changes and reload your browser yourself in this case.') + '</div>';
                  var d = qxl.dialog.Dialog.confirm(msg, function (ok) {
                    if (ok) {
                      this.save(function () {
                        window.location.reload();
                      });
                    }
                  }, this, qx.locale.Manager.tr('Upgrade successful'));
                  d.set({
                    width: Math.min(qx.bom.Viewport.getWidth(), 600),
                    yesButtonLabel: qx.locale.Manager.tr('Apply'),
                    noButtonLabel: qx.locale.Manager.tr('Check')
                  });
                  file.setModified(true);
                }
              }
            }, this);
          } else if (file && file instanceof cv.ui.manager.model.CompareFiles && this.isSupported(file.getModifiedFile())) {
            this.resetEditable();

            this._client.readSync({
              path: file.getModifiedFile().getFullPath()
            }, function (err, res) {
              if (err) {
                cv.ui.manager.snackbar.Controller.error(err);
              } else {
                this.setModifiedContent(res);
              }
            }, this);

            this._client.readSync({
              path: file.getOriginalFile().getFullPath()
            }, function (err, res) {
              if (err) {
                cv.ui.manager.snackbar.Controller.error(err);
              } else {
                this.setOriginalContent(res);
              }
            }, this);
          } else {
            this.resetOriginalContent();
            this.resetModifiedContent();
          }
        }
      }
    }
  });
  cv.ui.manager.editor.Diff.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Diff.js.map?dt=1646029364727