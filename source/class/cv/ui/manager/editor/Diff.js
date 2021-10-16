/**
 * Monaco Texteditor for file content comparison
 */
qx.Class.define("cv.ui.manager.editor.Diff", {
  extend: cv.ui.manager.editor.Source,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    // this._handledActions = [];
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    COUNTER: 0,
    TITLE: qx.locale.Manager.tr("File compare"),
    ICON: cv.theme.dark.Images.getIcon("compare", 18)
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    originalContent: {
      check: "String",
      init: "",
      apply: "_applyContent"
    },

    modifiedContent: {
      check: "String",
      init: "",
      apply: "_applyContent"
    },

    editable: {
      check: "Boolean",
      init: false,
      apply: "_applyEditable"
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _applyEditable: function(value) {
      if (this._editor) {
        this._editor.updateOptions({readOnly: !value});
      }
    },

    // overridden, worker is a singleton and not usable for the diff editor
    _initWorker: function () {},

    _draw: function () {
      if (!window.monaco) {
        cv.ui.manager.editor.Source.load(this._draw, this);
      } else {
        var domElement = this.getContentElement().getDomElement();
        if (!domElement) {
          this.addListenerOnce("appear", this._draw, this);
        } else {
          this._editor = window.monaco.editor.createDiffEditor(domElement, {
            folding: true,
            autoIndent: true,
            automaticLayout: true,
            theme: "vs-dark",
            readOnly: !this.getEditable()
          });
          if (this.getFile()) {
            this._loadFile(this.getFile());
          }
        }
      }
    },

    _applyContent: function () {
      var original = this.getOriginalContent();
      var modified = this.getModifiedContent();
      if (original && modified) {
        var file = this.getFile();
        const originalFile = file instanceof cv.ui.manager.model.CompareFiles ? file.getOriginalFile() : file;
        const modifiedFile = file instanceof cv.ui.manager.model.CompareFiles ? file.getModifiedFile() : file;
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

    getCurrentContent: function () {
      return this._editor.getModifiedEditor().getValue();
    },

    clear: function () {
      this._editor.getModel().original.dispose();
      this._editor.getModel().modified.dispose();
    },

    save: function (callback) {
      const handlerOptions = this.getHandlerOptions();
      if (this.getFile() instanceof cv.ui.manager.model.FileItem && handlerOptions.hasOwnProperty("upgradeVersion") && handlerOptions.upgradeVersion === true) {
        this.base(arguments, callback, "ignore");
      }
    },

    _loadFile: function (file, old) {
      if (old && old instanceof cv.ui.manager.model.FileItem) {
        qx.event.message.Bus.unsubscribe(old.getBusTopic(), this._onChange, this);
      }
      if (this._editor) {
        const handlerOptions = this.getHandlerOptions();
        if (file && file instanceof cv.ui.manager.model.FileItem && handlerOptions.hasOwnProperty("upgradeVersion") && handlerOptions.upgradeVersion === true) {
          qx.event.message.Bus.subscribe(file.getBusTopic(), this._onChange, this);
          this.setEditable(file.isWriteable());
          this._client.readSync({path: file.getFullPath()}, function (err, res) {
            if (err) {
              cv.ui.manager.snackbar.Controller.error(err);
            } else {
              this.setOriginalContent(res);
              const [err, upgradedContent, changes] = this._upgradeConfig(res);
              if (err) {
                qxl.dialog.Dialog.error(err);
                qx.event.message.Bus.dispatchByName("cv.manager.action.close");
              } else {
                this.setModifiedContent(this._convertToString(upgradedContent));
                let changesText = changes.length > 0 ?
                  "<div>" + qx.locale.Manager.tr("The following changes have been made") + "</div>" +
                  "<ul><li>"+changes.join("</li><li>")+ "</li></ul>" +
                  "<div>" + qx.locale.Manager.tr("You can check the changes in the editor. The left side shows the content before the upgrade and the right side shows the content after the upgrade.") + "</div>" :
                  "<div><strong>" + qx.locale.Manager.tr("No changes have been made") + "</strong></div>";

                let msg = "<h3>" + qx.locale.Manager.tr("Config file has been upgraded to the current library version.").translate().toString() + "</h3>" + changesText +
                  "<div>" + qx.locale.Manager.tr("Click \"Apply\" if you want to save the changes and reload the browser.") + "</div>" +
                  "<div>" + qx.locale.Manager.tr("Click \"Check\" if you want to check the changes. You have to save the changes and reload your browser yourself in this case.") + "</div>";
                const d = qxl.dialog.Dialog.confirm(msg, function (ok) {
                  if (ok) {
                    this.save(function () {
                      window.location.reload();
                    });
                  }
                }, this, qx.locale.Manager.tr("Upgrade successful"));
                d.set({
                  width: Math.min(qx.bom.Viewport.getWidth(), 600),
                  yesButtonLabel: qx.locale.Manager.tr("Apply"),
                  noButtonLabel: qx.locale.Manager.tr("Check")
                });
                file.setModified(true);
              }
            }
          }, this);
        } else if (file && file instanceof cv.ui.manager.model.CompareFiles && this.isSupported(file.getModifiedFile())) {
          this.resetEditable();
          this._client.readSync({path: file.getModifiedFile().getFullPath()}, function (err, res) {
            if (err) {
              cv.ui.manager.snackbar.Controller.error(err);
            } else {
              this.setModifiedContent(res);
            }
          }, this);

          this._client.readSync({path: file.getOriginalFile().getFullPath()}, function (err, res) {
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
