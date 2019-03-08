const path = require('path')
const fs = require('fs')
const config = require('../config')
const AbstractHandler = require('../lib/AbstractHandler')

class DirController extends AbstractHandler {
  constructor() {
    super()
    this.basePath = config.configDir
  }

  ls(context) {
    const folder = this.__getFolder(context)
    if (fs.existsSync(folder)) {
      const res = []
      fs.readdirSync(folder).forEach(file => {
        if (!file.startsWith('.')) {
          const stats = fs.statSync(path.join(folder, file))
          let relFolder = folder.substring(this.basePath.length + 1)
          if (relFolder.length > 0) {
            relFolder += '/'
          }
          res.push(Object.assign({
            name: file,
            type: stats.isDirectory() ? 'dir' : (stats.isFile() ? 'file' : null),
            path: stats.isDirectory() ? relFolder + file : null,
            folder: folder,
            hasChildren: stats.isDirectory() ? fs.readdirSync(path.join(folder, file)).length > 0 : false
          }, stats))
        }
      })
      return res
    } else {
      this.respondMessage(context,404, 'Folder not found')
    }
  }

  __getFolder(context) {
    const folder = this.__sanitize(context.params.query.folder)
    return path.join(this.basePath, folder)
  }

  __sanitize(folder) {
    while (folder.startsWith('../')) {
      folder = folder.substring(3)
    }
    if (folder.startsWith('/')) {
      folder = folder.substring(1);
    }
    return folder
  }
}

const dirController = new DirController()

module.exports = dirController