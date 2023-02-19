(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.manager.model.FileItem": {
        "construct": true,
        "require": true
      },
      "qx.event.message.Bus": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* BackupFolder.js
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
  qx.Class.define('cv.ui.manager.model.BackupFolder', {
    extend: cv.ui.manager.model.FileItem,
    type: 'singleton',
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      cv.ui.manager.model.FileItem.constructor.call(this, 'backup');
      this.load();
      qx.event.message.Bus.subscribe('cv.manager.fs.*', this._onFilesSystemMessage, this);
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _onFilesSystemMessage: function _onFilesSystemMessage(ev) {
        if (/^cv\.manager\.fs\.visu_config.*\.xml$/.test(ev.getName())) {
          // Fs event on config file
          var data = ev.getData();
          if (['contentChanged', 'fsContentChanged'].includes(data.type)) {
            // config file has been changed or restored, refresh the backups
            this.reload();
          }
        }
      },
      /**
       * Returns the list of existing backup files for the given file.
       * @param file {cv.ui.manager.model.FileItem}
       */
      getBackupFiles: function getBackupFiles(file) {
        var files = [];
        if (file.getType() === 'file') {
          var pathparts = file.getFullPath().split('/');
          pathparts.pop();
          var path = pathparts.join('/');
          var parts = file.getName().split('.');
          var suffix = parts.pop();
          var filename = parts.join('.');
          var fileRegex = new RegExp(path + filename + '-([\\d]{14})\\.' + suffix);
          this.getChildren().forEach(function (backupFile) {
            var match = fileRegex.exec(backupFile.getFullPath().replace('backup/', ''));
            if (match) {
              files.push({
                date: new Date(parseInt(match[1].substring(0, 4)), parseInt(match[1].substring(4, 6)) - 1, parseInt(match[1].substring(6, 8)), parseInt(match[1].substring(8, 10)), parseInt(match[1].substring(10, 12)), parseInt(match[1].substring(12, 14))),
                file: backupFile
              });
            }
          }, this);
        }
        return files;
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      qx.event.message.Bus.unsubscribe('cv.manager.fs.*', this._onFilesSystemMessage, this);
    }
  });
  cv.ui.manager.model.BackupFolder.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BackupFolder.js.map?dt=1676809296362