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

  /* Worker.js 
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
        check: 'cv.ui.manager.editor.AbstractEditor',
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
      open: function open(file, code, schema, features) {
        this._worker.postMessage(['openFile', {
          path: file.getFullPath(),
          code: qx.xml.Document.isXmlDocument(code) ? code.documentElement.outerHTML : code,
          schema: schema
        }, features]);

        this._files[file.getFullPath()] = file;
      },
      close: function close(file) {
        this._worker.postMessage(['closeFile', {
          path: file.getFullPath()
        }]);

        delete this._files[file.getFullPath()];
      },
      contentChanged: function contentChanged(file, content) {
        this._worker.postMessage(['contentChange', {
          path: file.getFullPath(),
          code: content
        }]);
      },
      validateConfig: function validateConfig(file) {
        if (file.isConfigFile()) {
          return this._worker.validateConfig(file.getServerPath());
        }

        qx.log.Logger.error(this, file.getFullPath() + ' is no configuration file');
        return true;
      },
      validateXmlConfig: function validateXmlConfig(content) {
        return this._worker.validateXmlConfig(content);
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
          case 'modified':
            // new files are always modified, to not override that state
            if (!file.isTemporary()) {
              file.setModified(data.modified);
            }

            file.setHash(data.currentHash);
            break;

          case 'hash':
            file.setHash(data);
            break;

          case 'errors':
            file.setValid(!data || data.length === 0);

            if (editor) {
              editor.showErrors(path, data);
            }

            break;

          case 'decorations':
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

//# sourceMappingURL=Worker.js.map?dt=1643663934841