const path = require('path');

const resourcesDir = path.resolve(path.join(__dirname, '..', 'resource'));
const configDir = path.join(resourcesDir, 'config');
const trashFolderName = '.trash';

module.exports = {
  resourcesDir: resourcesDir,
  configDir: configDir,
  designsDir: path.join(resourcesDir, 'designs'),
  trashFolderName: trashFolderName,
  trashFolder: path.join(configDir, trashFolderName),
  backupFolder: path.join(configDir, 'backup'),
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