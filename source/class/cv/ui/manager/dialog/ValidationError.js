/**
 * Show validation errors for a config file.
 */
qx.Class.define('cv.ui.manager.dialog.ValidationError', {
  extend: qxl.dialog.Dialog,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  /**
   *
   * @param file {cv.ui.manager.model.FileItem}
   * @param content {String}
   * @param errors {Array<Map>}
   * @param properties {Map?}
   */
  construct: function (file, content, errors, properties) {
    this._file = file;
    this._content = content.split("\n");
    this._errors = errors;
    this.base(arguments, Object.assign(properties || {}, {
      useBlocker: true
    }));

    this.addListener("appear", () => {
      if (!window.monaco) {
        cv.ui.manager.editor.Source.load(this.highlight, this);
      } else {
        this.highlight();
      }
    })
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
   action: "qx.event.type.Data"
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _content: null,
    _errors: null,
    /**
     * @var {cv.ui.manager.model.FileItem}
     */
    _file: null,

    highlight: function () {
      Array.from(document.querySelectorAll('pre.highlight')).forEach (elem => {
        monaco.editor.colorizeElement(elem, {
          theme: 'vs-dark'
        });
      });
    },

    /**
     * Create the main content of the widget
     */
    _createWidgetContent: function() {
      let container = this._createDialogContainer();
      let vbox = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
      container.add(vbox);

      let prologue = this.tr('<h3>Config Errors</h3>\
<p>The validation of "%1" showed some errors. It is NOT recommended to edit this file in the XML-Tree editor, because \
it can break the file completely. Please open this file in the text editor and fix the errors there. \
Only proceed to edit the file in the XML-Tree editor if you know what you are doing.</p>', this._file.getFullPath());

      let options = this.tr('<p>You can choose between the following options:\
<ul>\
    <li><b>Cancel</b> - Close this editor</li>\
    <li><b>Proceed</b> - Open the defective file in this editor</li>\
    <li><b>Open in text editor</b> - Close this editor and open the defective file in the text editor</li>\
</ul>\
</p>');
      const labelOptions = {
        rich: true,
        width: Math.min(qx.bom.Viewport.getWidth() - 32, 750),
        allowGrowX: true
      }
      const message = new qx.ui.basic.Label(prologue);
      message.set(labelOptions);
      vbox.add(message);

      // errors
      const errorBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(0));
      const errorScroll = new qx.ui.container.Scroll(errorBox);
      errorScroll.set({
        padding: [0, 0, 8, 8],
        decorator: 'cv-editor-config-section'
      })
      errorScroll.setHeight(300);
      vbox.add(errorScroll);
      const errorLabels = new Map();
      this._errors.forEach(error => {
        const errorId = error.line + error.element + error.attribute;
        let label;
        if (!errorLabels.has(errorId)) {
          let codeSnippet = [];
          const startIndex = Math.max(0, error.line-3);
          const endIndex = Math.min(this._content.length - 1, error.line+2);
          let minIndent = Number.POSITIVE_INFINITY;
          for (let i = startIndex; i < endIndex; i++) {
            const line = this._content[i];
            const indent = line.search(/\S|$/);
            if (indent < minIndent && indent >= 0) {
              minIndent = indent;
            }
            codeSnippet.push([i+1, line.trimRight()]);
          }
          if (minIndent === Number.POSITIVE_INFINITY) {
            minIndent = 0;
          }
          codeSnippet = codeSnippet.map(line => line[0] + ": " + qx.xml.String.escape(line[1].substr(minIndent)));
          label = new qx.ui.basic.Label(`<h4>Line: ${error.line}</h4><pre class="highlight" style="background-color: black; padding: 8px;" data-lang="text/xml">${codeSnippet.join("\n")}</pre>`);
          label.set(labelOptions);
          errorLabels.set(errorId, label);
          errorBox.add(label);
        } else {
          label = errorLabels.get(errorId);
        }
        if (!error.message.startsWith("[facet")) {
          label.setValue(label.getValue() + `<p>${error.message}</p>`);
        }
      }, this);

      const option = new qx.ui.basic.Label(options);
      option.set(labelOptions);
      vbox.add(option);

      // buttons
      let buttonPane = this._createButtonPane();

      // close button
      let closeButton = new qx.ui.form.Button(this.tr("Cancel"));
      closeButton.addListener("execute",  () => this.fireDataEvent('action', 'cancel'), this);

      let proceedButton = new qx.ui.form.Button(this.tr("Proceed"));
      proceedButton.addListener("execute", () => this.fireDataEvent('action', 'proceed'), this);

      let openSourceButton = new qx.ui.form.Button(this.tr("Open in text editor"));
      openSourceButton.addListener("execute", () => this.fireDataEvent('action', 'open-source'), this);

      buttonPane.add(closeButton);
      buttonPane.add(proceedButton);
      buttonPane.add(openSourceButton);

      container.add(buttonPane);
      this.add(container);


    },
  },
  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._content = null;
    this._errors = null;
    this._file = null;
  }
});
