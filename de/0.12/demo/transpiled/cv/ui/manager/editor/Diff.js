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
      "cv.ui.manager.snackbar.Controller": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

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
      cv.ui.manager.editor.Source.constructor.call(this);
      this._handledActions = [];
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
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      // overridden, diff editor is read only, no worker needed
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
              readOnly: true
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
          var originalModel = window.monaco.editor.createModel(original, this._getLanguage(file.getOriginalFile()));
          originalModel.updateOptions(this._getDefaultModelOptions());
          var modifiedModel = window.monaco.editor.createModel(modified, this._getLanguage(file.getModifiedFile()));
          modifiedModel.updateOptions(this._getDefaultModelOptions());

          this._editor.setModel({
            original: originalModel,
            modified: modifiedModel
          });
        }
      },
      clear: function clear() {
        this._editor.getModel().original.dispose();

        this._editor.getModel().modified.dispose();
      },
      _loadFile: function _loadFile(file) {
        if (this._editor) {
          if (file && file instanceof cv.ui.manager.model.CompareFiles && this.isSupported(file.getModifiedFile())) {
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

//# sourceMappingURL=Diff.js.map?dt=1591014031117