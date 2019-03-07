const path = require('path');

module.exports = {
  configDir: path.resolve(path.join(__dirname, '..', 'resource', 'config')),
  trashFolderName: '.trash' // relative to the deleted file
}