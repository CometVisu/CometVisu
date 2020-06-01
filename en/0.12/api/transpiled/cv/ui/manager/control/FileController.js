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
      "cv.io.rest.Client": {
        "construct": true
      },
      "cv.ui.manager.snackbar.Controller": {},
      "qx.locale.Manager": {},
      "qx.event.message.Bus": {},
      "dialog.Dialog": {},
      "cv.ui.manager.editor.Worker": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * The FileController is responsible for all file operations, like config check, move, replace, delete etc.
   */
  qx.Class.define('cv.ui.manager.control.FileController', {
    extend: qx.core.Object,
    type: 'singleton',

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__fsClient = cv.io.rest.Client.getFsClient();
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __fsClient: null,
      rename: function rename(file, newName) {
        var newPath = file.getPath() || '';

        if (newPath.length > 0 && !newPath.endsWith('/')) {
          newPath += '/';
        }

        newPath += newName;

        if (file.isTemporary()) {
          // create new item
          this.__fsClient.createSync({
            path: newPath,
            type: file.getType()
          }, function (err) {
            if (err) {
              cv.ui.manager.snackbar.Controller.error(err);
            } else {
              cv.ui.manager.snackbar.Controller.info(file.getType() === 'file' ? qx.locale.Manager.tr('File "%1" has been created', file.getDisplayName()) : qx.locale.Manager.tr('Folder "%1" has been created', file.getDisplayName()));
              file.resetTemporary();
              file.resetModified();
              file.setName(newName);
              file.reload();
            }
          }, this);
        } else if (file.getFullPath() !== newPath) {
          this.__fsClient.moveSync({
            src: file.getFullPath(),
            target: newPath
          }, function (err) {
            if (err) {
              cv.ui.manager.snackbar.Controller.error(err);
            } else {
              cv.ui.manager.snackbar.Controller.info(file.getType() === 'file' ? qx.locale.Manager.tr('File "%1" has been renamed', file.getDisplayName()) : qx.locale.Manager.tr('Folder "%1" has been renamed', file.getDisplayName()));
              file.setName(newName);
              file.resetModified();
              file.reload();
            }

            file.resetEditing();
          }, this);
        }
      },

      /**
       * Move file to another path
       * @param file {cv.ui.manager.model.FileItem} file to move
       * @param target {String} new path of the file
       */
      move: function move(file, target) {
        this.__fsClient.moveSync({
          src: file.getFullPath(),
          target: target
        }, function (err) {
          if (err) {
            cv.ui.manager.snackbar.Controller.error(err);
          } else {
            cv.ui.manager.snackbar.Controller.info(file.getType() === 'file' ? qx.locale.Manager.tr('File "%1" has been moved', file.getDisplayName()) : qx.locale.Manager.tr('Folder "%1" has been moved', file.getDisplayName()));
            qx.event.message.Bus.dispatchByName('cv.manager.file', {
              action: 'moved',
              path: file.getFullPath()
            });
          }
        }, this);
      },

      /**
       * Restore file from trash by moving it out of the trash to the old path
       * @param file {cv.ui.manager.model.FileItem} file to restore
       */
      restore: function restore(file) {
        if (file.isInTrash()) {
          var target = file.getFullPath().replace('.trash/', '');

          this.__moveFile(file, target);
        } else if (file.getType() === 'file' && !file.isTemporary()) {
          var match = /^\/?backup\/visu_config(.*)-[0-9]{14}\.xml$/.exec(file.getFullPath());

          if (match) {
            // find the existing target config to restore
            var targetFileName = 'visu_config' + match[1] + '.xml'; // find the target file

            var parentFolder = file.getParent().getParent();
            var targetFile = null;
            parentFolder.getChildren().some(function (child) {
              if (child.getFullPath() === targetFileName) {
                targetFile = child;
                return true;
              }
            }); // load the backup content

            this.__fsClient.readSync({
              path: file.getFullPath()
            }, function (err, res) {
              if (err) {
                cv.ui.manager.snackbar.Controller.error(err);
              } else {
                if (targetFile) {
                  this.__fsClient.updateSync({
                    path: targetFile.getFullPath(),
                    hash: 'ignore'
                  }, res, function (err) {
                    if (err) {
                      cv.ui.manager.snackbar.Controller.error(err);
                    } else {
                      cv.ui.manager.snackbar.Controller.info(qx.locale.Manager.tr('%1 has been restored', file.getName()));
                      targetFile.resetModified();
                      targetFile.resetTemporary();
                      qx.event.message.Bus.dispatchByName(targetFile.getBusTopic(), {
                        type: 'fsContentChanged',
                        data: res,
                        source: this
                      });
                    }
                  }, this);
                } else {
                  // target file does not exist copy to a new file
                  this.__fsClient.createSync({
                    path: targetFileName,
                    hash: 'ignore'
                  }, res, function (err) {
                    if (err) {
                      cv.ui.manager.snackbar.Controller.error(err);
                    } else {
                      cv.ui.manager.snackbar.Controller.info(qx.locale.Manager.tr('%1 has been restored', file.getName()));
                    }
                  }, this);
                }
              }
            }, this);
          }
        }
      },
      __moveFile: function __moveFile(file, target) {
        this.__fsClient.moveSync({
          src: file.getFullPath(),
          target: target
        }, function (err) {
          if (err) {
            cv.ui.manager.snackbar.Controller.error(err);
          } else {
            cv.ui.manager.snackbar.Controller.info(file.getType() === 'file' ? qx.locale.Manager.tr('File "%1" has been restored', file.getDisplayName()) : qx.locale.Manager.tr('Folder "%1" has been restored', file.getDisplayName()));
            qx.event.message.Bus.dispatchByName('cv.manager.file', {
              action: 'restored',
              path: file.getFullPath()
            });
          }
        }, this);
      },
      'delete': function _delete(file, callback, context) {
        if (file.isTemporary()) {
          // new file, no need to call the backend
          if (callback) {
            callback.apply(context, true);
          }
        } else {
          if (file) {
            var message;

            if (file.isTrash()) {
              message = qx.locale.Manager.tr('Do you really want to clear the trash?');
            } else if (file.isInTrash()) {
              message = file.getType() === 'file' ? qx.locale.Manager.tr('Do you really want to delete file "%1" from the trash?', file.getDisplayName()) : qx.locale.Manager.tr('Do you really want to delete folder "%1" from the trash?', file.getDisplayName());
            } else {
              message = file.getType() === 'file' ? qx.locale.Manager.tr('Do you really want to delete file "%1"?', file.getDisplayName()) : qx.locale.Manager.tr('Do you really want to delete folder "%1"?', file.getDisplayName());
            }

            dialog.Dialog.confirm(message, function (confirmed) {
              if (confirmed) {
                this.__doDelete(file, callback, context);
              } else if (callback) {
                callback.apply(context, false);
              }
            }, this, qx.locale.Manager.tr('Confirm deletion'));
          }
        }
      },
      __doDelete: function __doDelete(file, callback, context) {
        this.__fsClient.deleteSync({
          path: file.getFullPath(),
          force: file.isTrash()
        }, null, function (err) {
          if (err) {
            cv.ui.manager.snackbar.Controller.error(err);

            if (callback) {
              callback.apply(context, false);
            }
          } else {
            var message;

            if (file.isTrash()) {
              message = qx.locale.Manager.tr('Trash has been cleared');
            } else if (file.isInTrash()) {
              message = this.getType() === 'file' ? qx.locale.Manager.tr('File "%1" has been removed from trash', file.getDisplayName()) : qx.locale.Manager.tr('Folder "%1" has been removed from trash', file.getDisplayName());
            } else {
              message = file.getType() === 'file' ? qx.locale.Manager.tr('File "%1" has been deleted', file.getDisplayName()) : qx.locale.Manager.tr('Folder "%1" has been deleted', file.getDisplayName());
            }

            cv.ui.manager.snackbar.Controller.info(message);

            if (callback) {
              callback.apply(context, true);
            }

            qx.event.message.Bus.dispatchByName('cv.manager.file', {
              action: 'deleted',
              path: file.getFullPath()
            });
          }
        }, this);
      },
      download: function download(file) {
        if (file.getType() === 'file') {
          var element = document.createElement('a');
          element.setAttribute('href', cv.io.rest.Client.getBaseUrl() + '/fs?download=true&path=' + file.getFullPath());
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        }
      },
      validate: function validate(file) {
        if (file.isConfigFile()) {
          this.__validateConfig(file);
        } else {
          this.info('no validation available for file: ' + file.getFullPath());
        }
      },
      __validateConfig: function __validateConfig(file) {
        var d = dialog.Dialog.alert(qx.locale.Manager.tr('Validating %1', file.getFullPath()));
        cv.ui.manager.editor.Worker.getInstance().validateConfig(file).then(function (res) {
          d.close();

          if (res === true) {
            file.setValid(true);
            cv.ui.manager.snackbar.Controller.info(qx.locale.Manager.tr('%1 has no errors!', file.getFullPath()));
          } else {
            file.setValid(false);
            qx.event.message.Bus.dispatchByName('cv.manager.openWith', {
              file: file,
              handler: 'cv.ui.manager.editor.Source'
            });
            cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.trn('%1 error found in %2!', '%1 errors found in %2!', res.length, res.length, file.getFullPath()));
          }
        }.bind(this));
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.__fsClient = null;
    }
  });
  cv.ui.manager.control.FileController.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FileController.js.map?dt=1591013393089