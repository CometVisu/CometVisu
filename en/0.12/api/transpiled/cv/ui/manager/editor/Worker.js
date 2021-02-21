(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "cv.data.FileWorker": {
        "construct": true
      },
      "qx.xml.Document": {},
      "qx.log.Logger": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   *
   */
  qx.Class.define('cv.ui.manager.editor.Worker', {
    extend: qx.core.Object,
    type: 'singleton',

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this._files = {}; // create WebWorker

      this._worker = cv.data.FileWorker.getInstance();

      this._worker.addListener('message', this._onMessage, this);
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      editor: {
        check: 'cv.ui.manager.editor.Source',
        nullable: true
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _worker: null,
      _files: null,
      open: function open(file, code, schema) {
        this._worker.postMessage(["openFile", {
          path: file.getFullPath(),
          code: qx.xml.Document.isXmlDocument(code) ? code.documentElement.outerHTML : code,
          schema: schema
        }]);

        this._files[file.getFullPath()] = file;
      },
      close: function close(file) {
        this._worker.postMessage(["closeFile", {
          path: file.getFullPath()
        }]);

        delete this._files[file.getFullPath()];
      },
      contentChanged: function contentChanged(file, content) {
        this._worker.postMessage(["contentChange", {
          path: file.getFullPath(),
          code: content
        }]);
      },
      validateConfig: function validateConfig(file) {
        if (file.isConfigFile()) {
          return this._worker.validateConfig(file.getServerPath());
        } else {
          qx.log.Logger.error(this, file.getFullPath() + ' is no configuration file');
        }
      },
      _onMessage: function _onMessage(e) {
        var topic = e.getData().topic;
        var data = e.getData().data;
        var path = e.getData().path;
        var file = this._files[path];

        if (!file && topic !== 'validationResult') {
          qx.log.Logger.error(this, 'no file found for path ' + path + ' ignoring worker message for topic ' + topic);
          return;
        }

        var editor = this.getEditor();

        switch (topic) {
          case "modified":
            // new files are always modified, to not override that state
            if (!file.isTemporary()) {
              file.setModified(data.modified);
            }

            file.setHash(data.currentHash);
            break;

          case "errors":
            file.setValid(!data || data.length === 0);

            if (editor) {
              editor.showErrors(path, data);
            }

            break;

          case "decorations":
            if (editor) {
              editor.showDecorations(path, data);
            }

            break;
        }
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._worker.terminate();

      this._worker = null;
    }
  });
  cv.ui.manager.editor.Worker.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Worker.js.map?dt=1613908092297