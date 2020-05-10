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
      "qx.ui.layout.Grow": {
        "construct": true
      },
      "qx.util.Uri": {
        "construct": true
      },
      "qx.util.LibraryManager": {
        "construct": true
      },
      "qx.locale.Manager": {
        "require": true
      },
      "cv.theme.dark.Images": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.embed.Iframe": {},
      "qx.ui.basic.Atom": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * Default XML-Editor included as iframe.
   */
  qx.Class.define('cv.ui.manager.editor.Xml', {
    extend: cv.ui.manager.editor.AbstractEditor,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      cv.ui.manager.editor.AbstractEditor.constructor.call(this);

      this._setLayout(new qx.ui.layout.Grow());

      this._handledActions = ['save'];
      this.__basePath = qx.util.Uri.getAbsolute(qx.util.LibraryManager.getInstance().get("cv", "resourceUri") + '/../editor/editor.html');

      this._draw();
    },

    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      SUPPORTED_FILES: /^(demo)?\/?visu_config.*\.xml/,
      TITLE: qx.locale.Manager.tr('Xml-editor'),
      ICON: cv.theme.dark.Images.getIcon('xml', 18)
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _currentContent: null,
      _iframe: null,
      _notWriteable: null,
      _draw: function _draw() {},
      _loadFile: function _loadFile(file) {
        if (this._iframe) {
          this._iframe.destroy();
        }

        if (file) {
          var match = /.*visu_config_?(.*)\.xml/.exec(file.getName());

          if (match) {
            if (file.isWriteable()) {
              this._iframe = new qx.ui.embed.Iframe(qx.util.Uri.appendParamsToUrl(this.__basePath, 'embed=1&config=' + match[1]) + '&demo=' + (file.getParentFolder() === 'demo/' ? 'true' : 'false'));

              this._iframe.addListener('load', function () {
                // inject save method
                this._iframe.getWindow().saveFromIframe = this.saveFromIframe.bind(this);
              }, this);

              this._add(this._iframe);
            } else {
              if (!this._notWriteable) {
                this._notWriteable = new qx.ui.basic.Atom(this.tr('The XML-Editor does not support files that are not writeable!'));

                this._notWriteable.set({
                  center: true,
                  font: "title"
                });

                this._add(this._notWriteable);
              }

              this._notWriteable.show();
            }
          }
        }
      },
      saveFromIframe: function saveFromIframe(data, filename, callback) {
        // create XML string from data
        var xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
        data.forEach(function (elem) {
          xml += this._elemToXml(elem, '');
        }, this);
        this._currentContent = xml;

        if (!filename) {
          // mark as changed as long it is no preview change
          this._onContentChanged();
        }

        this.save(filename, callback);
      },
      save: function save(filename, callback) {
        if (filename) {
          var file = this.getFile();
          var relName = filename.split('/').pop();
          var exists = file.getParent().getChildren().some(function (child) {
            return child.getName() === relName;
          });
          var method = exists ? this._client.updateSync : this._client.createSync; // save preview

          method({
            path: file.getPath() + '/' + relName,
            hash: 'ignore',
            type: 'file',
            force: true
          }, this.getCurrentContent(), function (err) {
            callback(err);
          }, this);
        } else {
          cv.ui.manager.editor.Xml.prototype.save.base.call(this, function (err) {
            if (!err) {
              this._onSaved();
            }

            callback(err);
          }.bind(this), 'ignore');
        }
      },
      _elemToXml: function _elemToXml(elem, indent) {
        var xml = '';

        if (elem.nodeName === '#comment') {
          xml += '\n' + indent + '<!-- ' + elem.nodeValue + ' -->';
        } else if (elem.nodeName === '#text') {
          xml += elem.nodeValue;
        } else {
          xml += '\n' + indent + '<' + elem.nodeName;
          Object.keys(elem.attributes).forEach(function (attrName) {
            xml += ' ' + attrName + '="' + elem.attributes[attrName] + '"';
          });

          if (!elem.nodeValue && elem.children.length === 0) {
            xml += '/>';
          } else {
            xml += '>';

            if (elem.nodeName === 'status' && elem.attributes.type === 'html') {
              xml += '<![CDATA[\n' + indent + "  " + elem.nodeValue + '\n ]]>';
            } else if (elem.nodeValue) {
              xml += elem.nodeValue;
            }

            var children = [];
            elem.children.forEach(function (child) {
              children.push(this._elemToXml(child, indent + "  "));
            }, this);
            xml += children.join('');
            xml += '\n' + indent + '</' + elem.nodeName + '>';
          }
        }

        return xml;
      },
      getCurrentContent: function getCurrentContent() {
        return this._currentContent;
      },
      _onContentChanged: function _onContentChanged() {
        this.getFile().setModified(true);
      },
      isSupported: function isSupported(file) {
        return cv.ui.manager.editor.Xml.SUPPORTED_FILES.test(file.getName()) && file.isWriteable();
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._disposeObjects('_iframe', '_notWriteable');
    }
  });
  cv.ui.manager.editor.Xml.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Xml.js.map?dt=1589123549517