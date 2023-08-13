(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "com.zenesis.qx.upload.UploadMgr": {
        "construct": true,
        "require": true
      },
      "cv.ui.manager.model.FileItem": {},
      "cv.io.rest.Client": {},
      "cv.ui.manager.snackbar.Controller": {},
      "qx.locale.Manager": {},
      "qxl.dialog.Dialog": {},
      "qx.lang.Json": {},
      "qx.event.message.Bus": {},
      "com.zenesis.qx.upload.File": {},
      "com.zenesis.qx.upload.UploadButton": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* UploadMgr.js
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
   * Extend {com.zenesis.qx.upload.UploadMgr} to allow files to e uploaded via HTML5 drop
   */
  qx.Class.define('cv.ui.manager.upload.UploadMgr', {
    extend: com.zenesis.qx.upload.UploadMgr,
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(widget, uploadUrl) {
      com.zenesis.qx.upload.UploadMgr.constructor.call(this, widget, uploadUrl);
      this._init();
    },
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      LAST_ID: 0
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      multiple: {
        refine: true,
        init: false
      },
      folder: {
        check: 'cv.ui.manager.model.FileItem',
        nullable: true,
        apply: '_updateUploadUrl'
      },
      filename: {
        check: 'String',
        nullable: true
      },
      force: {
        check: 'Boolean',
        init: false
      }
    },
    members: {
      _updateUploadUrl: function _updateUploadUrl() {
        var folder = this.getFolder();
        var path = folder ? folder.getFullPath() : '.';
        var url = cv.io.rest.Client.getBaseUrl() + '/fs?type=file&path=' + path;
        this.setUploadUrl(url);
      },
      _init: function _init() {
        var _this = this;
        this.addListener('addFile', function (evt) {
          var file = evt.getData();
          var filename = _this.getFilename();
          if (filename) {
            file.setParam('filename', filename);
          }
          if (_this.isForce()) {
            file.setParam('force', true);
          }
          var progressListenerId = file.addListener('changeProgress', function (evt) {
            var file = evt.getTarget();
            var uploadedSize = evt.getData();
            _this.debug('Upload ' + file.getFilename() + ': ' + uploadedSize + ' / ' + file.getSize() + ' - ' + Math.round(uploadedSize / file.getSize() * 100) + '%');
          });
          var stateListenerId = file.addListener('changeState', function (evt) {
            var state = evt.getData();
            var file = evt.getTarget();
            if (state === 'uploading') {
              _this.debug(file.getFilename() + ' (Uploading...)');
            } else if (state === 'uploaded') {
              _this.debug(file.getFilename() + ' (Complete)');
              if (file.getStatus() !== 200) {
                // something went wrong
                switch (file.getStatus()) {
                  case 406:
                    if (_this.isForce()) {
                      cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('Replacing the file failed.'));
                    } else {
                      qxl.dialog.Dialog.confirm(qx.locale.Manager.tr('This file already exists, do you want to replace it?'), function (confirmed) {
                        if (confirmed) {
                          this.forceUpload(file);
                        }
                      }, _this, qx.locale.Manager.tr('File already exists'));
                    }
                    break;
                  case 403:
                    cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('Uploading this file is not allowed here.'));
                    break;
                  default:
                    {
                      var err = file.getResponse();
                      try {
                        err = qx.lang.Json.parse(err).message;
                      } catch (e) {}
                      _this.error(err);
                      cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('File upload stopped with an error: %1', err));
                      break;
                    }
                }
              } else {
                cv.ui.manager.snackbar.Controller.info(qx.locale.Manager.tr('File has been uploaded'));
                qx.event.message.Bus.dispatchByName('cv.manager.file', {
                  action: 'uploaded',
                  path: _this.getFolder().getFullPath() + '/' + file.getFilename()
                });
              }
            } else if (state === 'cancelled') {
              _this.debug(file.getFilename() + ' (Cancelled)');
            }
            // Remove the listeners
            if (state === 'uploaded' || state === 'cancelled') {
              file.removeListenerById(progressListenerId);
              file.removeListenerById(stateListenerId);
            }
          });
        });
      },
      /**
       * Allocates a unique ID
       *
       * @return {Number}
       */
      _getUniqueFileId: function _getUniqueFileId() {
        return ++cv.ui.manager.upload.UploadMgr.LAST_ID;
      },
      /**
       * Re-upload a file in forced mode
       * @param file {com.zenesis.qx.upload.File}
       */
      forceUpload: function forceUpload(file) {
        this.setForce(true);
        var newFile = new com.zenesis.qx.upload.File(file.getBrowserObject(), file.getFilename(), file.getId());
        newFile.set({
          size: file.getSize(),
          uploadWidget: file.getUploadWidget()
        });
        newFile.setParam('force', true);
        this.getUploadHandler()._addFile(newFile);
        if (this.getAutoUpload()) {
          this.getUploadHandler().beginUploads();
        }
      },
      /**
       * Upload file directly to the backend
       *
       * @param bomFile {File}
       */
      uploadFile: function uploadFile(bomFile) {
        var id = 'upload-' + this._getUniqueFileId();
        var filename = typeof bomFile.name !== 'undefined' ? bomFile.name : bomFile.fileName;
        var file = new com.zenesis.qx.upload.File(bomFile, filename, id);
        var fileSize = typeof bomFile.size !== 'undefined' ? bomFile.size : bomFile.fileSize;
        file.setSize(fileSize);
        if (this.isForce()) {
          file.setParam('force', true);
        }
        file.setUploadWidget(new com.zenesis.qx.upload.UploadButton());
        this.getUploadHandler()._addFile(file);
        if (this.getAutoUpload()) {
          this.getUploadHandler().beginUploads();
        }
      },
      /**
       * Replace content of existing file with the upload
       * @param bomFile {File}
       * @param replacedFile {cv.ui.manager.model.FileItem}
       */
      replaceFile: function replaceFile(bomFile, replacedFile) {
        this.setFolder(replacedFile.getParent());
        var id = 'upload-' + this._getUniqueFileId();
        var filename = replacedFile.getName();
        var file = new com.zenesis.qx.upload.File(bomFile, filename, id);
        file.setParam('force', true);
        file.setParam('filename', filename);
        var fileSize = typeof bomFile.size !== 'undefined' ? bomFile.size : bomFile.fileSize;
        file.setSize(fileSize);
        file.setUploadWidget(new com.zenesis.qx.upload.UploadButton());
        this.getUploadHandler()._addFile(file);
        if (this.getAutoUpload()) {
          this.getUploadHandler().beginUploads();
        }
      }
    }
  });
  cv.ui.manager.upload.UploadMgr.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=UploadMgr.js.map?dt=1691935397999