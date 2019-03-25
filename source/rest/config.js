const path = require('path');

const resourcesDir = path.resolve(path.join(__dirname, '..', 'resource'));

module.exports = {
  resourcesDir: resourcesDir,
  configDir: path.join(resourcesDir, 'config'),
  designsDir: path.join(resourcesDir, 'designs'),
  trashFolderName: '.trash', // relative to the deleted file,
  backupFolder: path.join(resourcesDir, 'backup'),
  backupOnChange: [/visu_config.*\.xml/],
  mounts: [
    {
      mountPoint: 'demo',
      path: path.join(resourcesDir, 'demo'),
      showSubDirs: false,
      writeable: false
    }
  ]
}