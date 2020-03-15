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
  construct: function () {
    this.base(arguments, 'backup');
    this.load();
    qx.event.message.Bus.subscribe('cv.manager.fs.*', this._onFilesSystemMessage, this);
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _onFilesSystemMessage: function (ev) {
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
    getBackupFiles: function (file) {
      var files = [];
      if (file.getType() === 'file') {
        var pathparts = file.getFullPath().split('/');
        pathparts.pop();
        var path = pathparts.join('\/');
        var parts = file.getName().split('.');
        var suffix = parts.pop();
        var filename = parts.join('.');
        var fileRegex = new RegExp(path + filename + '-([\\d]{14})\\.' + suffix);
        this.getChildren().filter(function (backupFile) {
          var match = fileRegex.exec(backupFile.getFullPath().replace('backup/', ''));
          if (match) {
            files.push({
              date: new Date(
                parseInt(match[1].substring(0,4)),
                parseInt(match[1].substring(4,6))-1,
                parseInt(match[1].substring(6,8)),
                parseInt(match[1].substring(8,10)),
                parseInt(match[1].substring(10,12)),
                parseInt(match[1].substring(12,14))
              ),
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
  destruct: function () {
    qx.event.message.Bus.unsubscribe('cv.manager.fs.*', this._onFilesSystemMessage, this);
  }
});
