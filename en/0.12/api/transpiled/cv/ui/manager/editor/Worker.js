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
      "qx.util.ResourceManager": {
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

      this._worker = new Worker(qx.util.ResourceManager.getInstance().toUri('manager/worker.js'));
      this._worker.onmessage = this._onMessage.bind(this);
      this._validationCallbacks = {};
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
      _validationCallbacks: null,
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
          return new Promise(function (resolve, reject) {
            // check if there is already one validation request ongoing
            var url = file.getServerPath();

            if (!this._validationCallbacks.hasOwnProperty(url)) {
              this._validationCallbacks[url] = [resolve];

              this._worker.postMessage(["validateConfig", {
                path: url
              }]);
            } else {
              this._validationCallbacks[url].push(resolve);
            }
          }.bind(this));
        } else {
          qx.log.Logger.error(this, file.getFullPath() + ' is no configuration file');
        }
      },
      _onMessage: function _onMessage(e) {
        var topic = e.data.shift();
        var data = e.data.shift();
        var path = e.data.shift();
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

          case 'validationResult':
            if (this._validationCallbacks.hasOwnProperty(path)) {
              var callbacks = this._validationCallbacks[path];
              delete this._validationCallbacks[path];
              callbacks.forEach(function (cb) {
                cb(data);
              });
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

//# sourceMappingURL=Worker.js.map?dt=1589219076363