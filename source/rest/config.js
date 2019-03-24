const path = require('path');

const configDir = path.resolve(path.join(__dirname, '..', 'resource', 'config'));

module.exports = {
  configDir: configDir,
  trashFolderName: '.trash', // relative to the deleted file,
  backupFolder: path.resolve(path.join(configDir, 'backup')),
  backupOnChange: [/visu_config.*\.xml/],
  mounts: [
    {
      mountPoint: 'demo',
      path: path.resolve(path.join(__dirname, '..', 'resource', 'demo')),
      showSubDirs: false,
      writeable: false
    }
  ]
}