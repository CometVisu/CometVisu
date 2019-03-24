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
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    /**
     * Returns the list of existing backup files for the given file.
     * @param file
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

  defer: function () {

  }
});
