const path = require('path');

module.exports = {
  configDir: path.resolve(path.join(__dirname, '..', 'resource', 'config')),
  trashFolderName: '.trash', // relative to the deleted file
  mounts: [
    {
      mountPoint: 'demo',
      path: path.resolve(path.join(__dirname, '..', 'resource', 'demo')),
      showSubDirs: false,
      writeable: false
    }, {
      mountPoint: 'rest',
      path: path.resolve(__dirname),
      showSubDirs: true,
      writeable: true
    }
  ]
}