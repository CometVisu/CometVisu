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
qx.Class.define("cv.ui.manager.upload.UploadMgr", {
  extend: com.zenesis.qx.upload.UploadMgr,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct(widget, uploadUrl) {
    super(widget, uploadUrl);
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
      check: "cv.ui.manager.model.FileItem",
      nullable: true,
      apply: "_updateUploadUrl"
    },

    filename: {
      check: "String",
      nullable: true
    },

    force: {
      check: "Boolean",
      init: false
    }
  },

  members: {
    _updateUploadUrl() {
      const folder = this.getFolder();
      const path = folder ? folder.getFullPath() : ".";
      const url = cv.io.rest.Client.getBaseUrl() + "/fs?type=file&path=" + path;
      this.setUploadUrl(url);
    },

    _init() {
      this.addListener("addFile", evt => {
        const file = evt.getData();
        const filename = this.getFilename();
        if (filename) {
          file.setParam("filename", filename);
        }
        if (this.isForce()) {
          file.setParam("force", true);
        }
        const progressListenerId = file.addListener("changeProgress", evt => {
          const file = evt.getTarget();
          const uploadedSize = evt.getData();

          this.debug(
            "Upload " +
              file.getFilename() +
              ": " +
              uploadedSize +
              " / " +
              file.getSize() +
              " - " +
              Math.round((uploadedSize / file.getSize()) * 100) +
              "%"
          );
        });

        const stateListenerId = file.addListener("changeState", evt => {
          const state = evt.getData();
          const file = evt.getTarget();

          if (state === "uploading") {
            this.debug(file.getFilename() + " (Uploading...)");
          } else if (state === "uploaded") {
            this.debug(file.getFilename() + " (Complete)");
            if (file.getStatus() !== 200) {
              // something went wrong
              switch (file.getStatus()) {
                case 406:
                  if (this.isForce()) {
                    cv.ui.manager.snackbar.Controller.error(
                      qx.locale.Manager.tr("Replacing the file failed.")
                    );
                  } else {
                    qxl.dialog.Dialog.confirm(
                      qx.locale.Manager.tr(
                        "This file already exists, do you want to replace it?"
                      ),
                      function (confirmed) {
                        if (confirmed) {
                          this.forceUpload(file);
                        }
                      },
                      this,
                      qx.locale.Manager.tr("File already exists")
                    );
                  }
                  break;

                case 403:
                  cv.ui.manager.snackbar.Controller.error(
                    qx.locale.Manager.tr(
                      "Uploading this file is not allowed here."
                    )
                  );
                  break;

                default: {
                  let err = file.getResponse();
                  try {
                    err = qx.lang.Json.parse(err).message;
                  } catch (e) {}
                  this.error(err);
                  cv.ui.manager.snackbar.Controller.error(
                    qx.locale.Manager.tr(
                      "File upload stopped with an error: %1",
                      err
                    )
                  );
                  break;
                }
              }
            } else {
              cv.ui.manager.snackbar.Controller.info(
                qx.locale.Manager.tr("File has been uploaded")
              );
              qx.event.message.Bus.dispatchByName("cv.manager.file", {
                action: "uploaded",
                path: this.getFolder().getFullPath() + "/" + file.getFilename()
              });
            }
          } else if (state === "cancelled") {
            this.debug(file.getFilename() + " (Cancelled)");
          }
          // Remove the listeners
          if (state === "uploaded" || state === "cancelled") {
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
    _getUniqueFileId() {
      return ++cv.ui.manager.upload.UploadMgr.LAST_ID;
    },

    /**
     * Re-upload a file in forced mode
     * @param file {com.zenesis.qx.upload.File}
     */
    forceUpload(file) {
      this.setForce(true);
      const newFile = new com.zenesis.qx.upload.File(
        file.getBrowserObject(),
        file.getFilename(),
        file.getId()
      );
      newFile.set({
        size: file.getSize(),
        uploadWidget: file.getUploadWidget()
      });

      newFile.setParam("force", true);
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
    uploadFile(bomFile) {
      const id = "upload-" + this._getUniqueFileId();
      const filename =
        typeof bomFile.name !== "undefined" ? bomFile.name : bomFile.fileName;
      const file = new com.zenesis.qx.upload.File(bomFile, filename, id);
      const fileSize =
        typeof bomFile.size !== "undefined" ? bomFile.size : bomFile.fileSize;
      file.setSize(fileSize);
      if (this.isForce()) {
        file.setParam("force", true);
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
    replaceFile(bomFile, replacedFile) {
      this.setFolder(replacedFile.getParent());
      const id = "upload-" + this._getUniqueFileId();
      const filename = replacedFile.getName();
      const file = new com.zenesis.qx.upload.File(bomFile, filename, id);
      file.setParam("force", true);
      file.setParam("filename", filename);
      const fileSize =
        typeof bomFile.size !== "undefined" ? bomFile.size : bomFile.fileSize;
      file.setSize(fileSize);
      file.setUploadWidget(new com.zenesis.qx.upload.UploadButton());

      this.getUploadHandler()._addFile(file);
      if (this.getAutoUpload()) {
        this.getUploadHandler().beginUploads();
      }
    }
  }
});
