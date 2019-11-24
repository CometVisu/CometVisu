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
  construct: function () {
    this.base(arguments);
    this.__fsClient = cv.io.rest.Client.getFsClient();
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __fsClient: null,

    rename: function (file, newName) {
      var newPath = file.getPath() || '';
      if (newPath.length > 0 && !newPath.endsWith('/')) {
        newPath += '/';
      }
      newPath += newName;
      if (file.isTemporary()) {
        // create new item
        this.__fsClient.createSync({path: newPath, type: file.getType()}, function (err) {
          if (err) {
            cv.ui.manager.snackbar.Controller.error(err);
          } else {
            cv.ui.manager.snackbar.Controller.info(file.getType() === 'file' ?
              qx.locale.Manager.tr('File has been created') :
              qx.locale.Manager.tr('Folder has been created')
            );
            file.resetTemporary();
            file.resetModified();
            file.setName(newName);
            file.reload();
          }
        }, this);
      } else if (file.getFullPath() !== newPath) {
        this.__fsClient.moveSync({src: file.getFullPath(), target: newPath}, function (err) {
          if (err) {
            cv.ui.manager.snackbar.Controller.error(err);
          } else {
            cv.ui.manager.snackbar.Controller.info(file.getType() === 'file' ?
              qx.locale.Manager.tr('File has been renamed') :
              qx.locale.Manager.tr('Folder has been renamed')
            );
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
    move: function (file, target) {
      this.__fsClient.moveSync({src: file.getFullPath(), target: target}, function (err) {
        if (err) {
          cv.ui.manager.snackbar.Controller.error(err);
        } else {
          cv.ui.manager.snackbar.Controller.info(file.getType() === 'file' ?
            qx.locale.Manager.tr('File has been moved') :
            qx.locale.Manager.tr('Folder has been moved')
          );
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
    restore: function (file) {
      if (file.isInTrash()) {
        var target = file.getFullPath().replace('.trash/', '');
        this.__fsClient.moveSync({src: file.getFullPath(), target: target}, function (err) {
          if (err) {
            cv.ui.manager.snackbar.Controller.error(err);
          } else {
            cv.ui.manager.snackbar.Controller.info(file.getType() === 'file' ?
              qx.locale.Manager.tr('File has been restored') :
              qx.locale.Manager.tr('Folder has been restored')
            );
            qx.event.message.Bus.dispatchByName('cv.manager.file', {
              action: 'restored',
              path: file.getFullPath()
            });
          }
        }, this);
      }
    },

    'delete': function(file, callback, context) {
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
            message = file.getType() === 'file' ?
              qx.locale.Manager.tr('Do you really want to delete this file from the trash?') :
              qx.locale.Manager.tr('Do you really want to delete this folder from the trash?');
          } else {
            message = file.getType() === 'file' ?
              qx.locale.Manager.tr('Do you really want to delete this file?') :
              qx.locale.Manager.tr('Do you really want to delete this folder?');
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

    __doDelete: function (file, callback, context) {
      this.__fsClient.deleteSync({path: file.getFullPath(), force: file.isTrash()}, null, function (err) {
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
            message = this.getType() === 'file' ?
              qx.locale.Manager.tr('File has been removed from trash') :
              qx.locale.Manager.tr('Folder has been removed from trash');
          } else {
            message = file.getType() === 'file' ?
              qx.locale.Manager.tr('File has been deleted') :
              qx.locale.Manager.tr('Folder has been deleted');
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

    download: function (file) {
      if (file.getType() === 'file') {
        var element = document.createElement('a');
        element.setAttribute('href', cv.io.rest.Client.getBaseUrl() + '/fs?download=true&path=' + file.getFullPath());
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    },

    validate: function (file) {
      if (qx.core.Environment.get('qx.debug')) {
        qx.core.Assert.assertInstance(file, cv.ui.manager.model.FileItem);
      }
      if (file.isConfigFile()) {
        this.__validateConfig(file);
      } else {
        this.info('no validation available for file: ' + file.getFullPath());
      }
    },

    __validateConfig: function (file) {
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
          cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.trn(
            '%1 error found in %2!',
            '%1 errors found in %2!',
            res.length,
            res.length,
            file.getFullPath())
          );
        }
      }.bind(this));
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this.__fsClient = null;
  }
});
