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
      "qxl.dialog.Dialog": {},
      "cv.ui.manager.editor.Worker": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* FileController.js
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
      this.__P_31_0 = cv.io.rest.Client.getFsClient();
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_31_0: null,
      rename: function rename(file, newName) {
        var newPath = file.getPath() || '';
        if (newPath.length > 0 && !newPath.endsWith('/')) {
          newPath += '/';
        }
        newPath += newName;
        if (file.isTemporary()) {
          // create new item
          this.__P_31_0.createSync({
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
          this.__P_31_0.moveSync({
            src: file.getFullPath(),
            target: newPath
          }, function (err) {
            if (err) {
              cv.ui.manager.snackbar.Controller.error(err);
            } else {
              cv.ui.manager.snackbar.Controller.info(file.getType() === 'file' ? qx.locale.Manager.tr('File "%1" has been renamed to "%2"', file.getDisplayName(), newName) : qx.locale.Manager.tr('Folder "%1" has been renamed to "%2"', file.getDisplayName(), newName));
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
        this.__P_31_0.moveSync({
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
          this.__P_31_1(file, target);
        } else if (file.getType() === 'file' && !file.isTemporary()) {
          var match = /^\/?backup\/visu_config(.*)-[0-9]{14}\.xml$/.exec(file.getFullPath());
          if (match) {
            // find the existing target config to restore
            var targetFileName = 'visu_config' + match[1] + '.xml';

            // find the target file
            var parentFolder = file.getParent().getParent();
            var targetFile = null;
            parentFolder.getChildren().some(function (child) {
              if (child.getFullPath() === targetFileName) {
                targetFile = child;
                return true;
              }
              return false;
            });

            // load the backup content
            this.__P_31_0.readSync({
              path: file.getFullPath()
            }, function (err, res) {
              if (err) {
                cv.ui.manager.snackbar.Controller.error(err);
              } else if (targetFile) {
                this.__P_31_0.updateSync({
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
                this.__P_31_0.createSync({
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
            }, this);
          }
        }
      },
      __P_31_1: function __P_31_1(file, target) {
        this.__P_31_0.moveSync({
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
      "delete": function _delete(file, callback, context) {
        if (file.isTemporary()) {
          // new file, no need to call the backend
          if (callback) {
            callback.apply(context, true);
          }
        } else if (file) {
          var message;
          if (file.isTrash()) {
            message = qx.locale.Manager.tr('Do you really want to clear the trash?');
          } else if (file.isInTrash()) {
            message = file.getType() === 'file' ? qx.locale.Manager.tr('Do you really want to delete file "%1" from the trash?', file.getDisplayName()) : qx.locale.Manager.tr('Do you really want to delete folder "%1" from the trash?', file.getDisplayName());
          } else {
            message = file.getType() === 'file' ? qx.locale.Manager.tr('Do you really want to delete file "%1"?', file.getDisplayName()) : qx.locale.Manager.tr('Do you really want to delete folder "%1"?', file.getDisplayName());
          }
          qxl.dialog.Dialog.confirm(message, function (confirmed) {
            if (confirmed) {
              this.__P_31_2(file, callback, context);
            } else if (callback) {
              callback.apply(context, false);
            }
          }, this, qx.locale.Manager.tr('Confirm deletion'));
        }
      },
      __P_31_2: function __P_31_2(file, callback, context) {
        this.__P_31_0.deleteSync({
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
          this.__P_31_3(file);
        } else {
          this.info('no validation available for file: ' + file.getFullPath());
        }
      },
      __P_31_3: function __P_31_3(file) {
        var d = qxl.dialog.Dialog.alert(qx.locale.Manager.tr('Validating %1', file.getFullPath()));
        cv.ui.manager.editor.Worker.getInstance().validateConfig(file).then(function (res) {
          d.close();
          if (res === true) {
            file.setValid(true);
            cv.ui.manager.snackbar.Controller.info(qx.locale.Manager.tr('%1 has no errors!', file.getFullPath()));
          } else {
            file.setValid(false);
            qx.event.message.Bus.dispatchByName('cv.manager.openWith', {
              file: file,
              handler: 'cv.ui.manager.editor.Source',
              handlerOptions: {
                jumpToError: true
              }
            });
            cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.trn('%1 error found in %2!', '%1 errors found in %2!', res.length, res.length, file.getFullPath()));
          }
        });
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.__P_31_0 = null;
    }
  });
  cv.ui.manager.control.FileController.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FileController.js.map?dt=1691935393971