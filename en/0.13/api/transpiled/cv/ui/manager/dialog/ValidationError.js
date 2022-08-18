(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.dialog.Dialog": {
        "construct": true,
        "require": true
      },
      "cv.ui.manager.editor.Source": {
        "construct": true
      },
      "qx.ui.container.Composite": {},
      "qx.ui.layout.VBox": {},
      "qx.bom.Viewport": {},
      "qx.ui.basic.Label": {},
      "qx.ui.container.Scroll": {},
      "qx.bom.Document": {},
      "qx.core.Init": {},
      "qx.xml.String": {},
      "qx.ui.form.Button": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ValidationError.js 
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
    construct: function construct(file, content, errors, properties) {
      var _this = this;

      this._file = file;
      this._content = content.split('\n');
      this._errors = errors;
      qxl.dialog.Dialog.constructor.call(this, Object.assign(properties || {}, {
        useBlocker: true
      }));
      this.addListener('appear', function () {
        if (!window.monaco) {
          cv.ui.manager.editor.Source.load(_this.highlight, _this);
        } else {
          _this.highlight();
        }
      });
    },

    /*
    ***********************************************
      EVENTS
    ***********************************************
    */
    events: {
      action: 'qx.event.type.Data'
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _content: null,
      _errors: null,
      _rootListenerId: null,

      /**
       * @var {cv.ui.manager.model.FileItem}
       */
      _file: null,
      highlight: function highlight() {
        Array.from(document.querySelectorAll('pre.highlight')).forEach(function (elem) {
          monaco.editor.colorizeElement(elem, {
            theme: 'vs-dark'
          });
        });
      },

      /**
       * Create the main content of the widget
       */
      _createWidgetContent: function _createWidgetContent() {
        var _this2 = this;

        var container = this._createDialogContainer();

        var vbox = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
        container.add(vbox);
        var prologue = this.tr('<h3>Config Errors</h3>\
<p>The validation of "%1" showed some errors. It is NOT recommended to edit this file in the XML-Tree editor, because \
it can break the file completely. Please open this file in the text editor and fix the errors there. \
Only proceed to edit the file in the XML-Tree editor if you know what you are doing.</p>', this._file.getFullPath());
        var options = this.tr('<p>You can choose between the following options:\
<ul>\
    <li><b>Cancel</b> - Close this editor</li>\
    <li><b>Proceed</b> - Open the defective file in this editor</li>\
    <li><b>Open in text editor</b> - Close this editor and open the defective file in the text editor</li>\
</ul>\
</p>');
        var labelOptions = {
          rich: true,
          width: Math.min(qx.bom.Viewport.getWidth() - 32, 750),
          allowGrowX: true
        };
        var message = new qx.ui.basic.Label(prologue);
        message.set(labelOptions);
        vbox.add(message); // errors

        var errorBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(0));
        var errorScroll = new qx.ui.container.Scroll(errorBox);
        errorScroll.set({
          padding: [0, 0, 8, 8],
          decorator: 'cv-editor-config-section'
        });
        errorScroll.setMinHeight(100);
        errorScroll.setHeight(Math.min(300, qx.bom.Document.getHeight() - 340));
        this._rootListenerId = qx.core.Init.getApplication().getRoot().addListener('resize', function () {
          errorScroll.setHeight(Math.min(300, qx.bom.Document.getHeight() - 340));
        });
        vbox.add(errorScroll, {
          flex: 1
        });
        var errorLabels = new Map();

        this._errors.forEach(function (error) {
          var errorId = error.line + error.element + error.attribute;
          var label;

          if (!errorLabels.has(errorId)) {
            var codeSnippet = [];
            var startIndex = Math.max(0, error.line - 3);
            var endIndex = Math.min(_this2._content.length - 1, error.line + 2);
            var minIndent = Number.POSITIVE_INFINITY;

            for (var i = startIndex; i < endIndex; i++) {
              var line = _this2._content[i];
              var indent = line.search(/\S|$/);

              if (indent < minIndent && indent >= 0) {
                minIndent = indent;
              }

              codeSnippet.push([i + 1, line.trimRight()]);
            }

            if (minIndent === Number.POSITIVE_INFINITY) {
              minIndent = 0;
            }

            codeSnippet = codeSnippet.map(function (line) {
              return line[0] + ': ' + qx.xml.String.escape(line[1].substr(minIndent));
            });

            var headline = _this2.tr('Line %1', error.line);

            label = new qx.ui.basic.Label("<h4>".concat(headline, "</h4><pre class=\"highlight\" style=\"background-color: black; padding: 8px;\" data-lang=\"text/xml\">").concat(codeSnippet.join('\n'), "</pre>"));
            label.set(labelOptions);
            errorLabels.set(errorId, label);
            errorBox.add(label);
          } else {
            label = errorLabels.get(errorId);
          }

          if (!error.message.startsWith('[facet')) {
            label.setValue(label.getValue() + "<p>".concat(error.message, "</p>"));
          }
        }, this);

        var option = new qx.ui.basic.Label(options);
        option.set(labelOptions);
        vbox.add(option); // buttons

        var buttonPane = this._createButtonPane(); // close button


        var closeButton = new qx.ui.form.Button(this.tr('Cancel'));
        closeButton.addListener('execute', function () {
          return _this2.fireDataEvent('action', 'cancel');
        }, this);
        var proceedButton = new qx.ui.form.Button(this.tr('Proceed'));
        proceedButton.addListener('execute', function () {
          return _this2.fireDataEvent('action', 'proceed');
        }, this);
        var openSourceButton = new qx.ui.form.Button(this.tr('Open in text editor'));
        openSourceButton.addListener('execute', function () {
          return _this2.fireDataEvent('action', 'open-source');
        }, this);
        buttonPane.add(closeButton);
        buttonPane.add(proceedButton);
        buttonPane.add(openSourceButton);
        container.add(buttonPane);
        this.add(container);
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._content = null;
      this._errors = null;
      this._file = null;

      if (this._rootListenerId) {
        qx.core.Init.getApplication().getRoot().removeListenerById(this._rootListenerId);
        this._rootListenerId = null;
      }
    }
  });
  cv.ui.manager.dialog.ValidationError.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ValidationError.js.map?dt=1660800144518