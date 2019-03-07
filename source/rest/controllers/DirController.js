const path = require('path')
const fs = require('fs')
const config = require('../config')

class DirController {
  constructor() {
    this.basePath = config.configDir
  }

  ls(context) {
    const folder = this.__getFolder(context)
    const res = []
    if (fs.existsSync(folder)) {
      fs.readdirSync(folder).forEach(file => {
        if (!file.startsWith('.')) {
          const stats = fs.statSync(path.join(folder, file))
          res.push(Object.assign({
            name: file,
            type: stats.isDirectory() ? 'dir' : (stats.isFile() ? 'file' : null)
          }, stats))
        }
      })
    }
    return res
  }

  __getFolder(context) {
    const folder = this.__sanitize(context.params.path.folder)
    return path.join(this.basePath, folder)
  }

  __sanitize(folder) {
    while (folder.startsWith('../')) {
      folder = folder.substring(3)
    }
    return folder
  }
}

const dirController = new DirController()

module.exports = dirController