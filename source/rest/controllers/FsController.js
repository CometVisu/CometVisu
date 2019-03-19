const path = require('path')
const fs = require('fs')
const config = require('../config')
const FileHandler = require('../lib/FileHandler')

class FsController extends FileHandler {
  constructor() {
    super()
    this.basePath = config.configDir
    this.mounts = config.mounts.map(mount => mount.mountPoint);
  }

  /**
   * Return folder listing or file content, depending on the path type
   * @param context {Context}
   * @returns {*}
   */
  read(context) {
    return this.__processRequest(context, (fsPath, mount) => {
      return this.__folderListing(fsPath, mount);
    }, fsPath => {
      return fs.readFileSync(fsPath, 'utf8')
    }, 'read')
  }

  create(context) {
    const mount = this.__getMount(context.params.query.path);
    const fsPath = this.__getAbsolutePath(context.params.query.path, mount)
    const parts = fsPath.split('/')
    parts.pop();
    const parentPath = parts.join('/')
    if (fs.existsSync(parentPath)) {
      try {
        if (!FileHandler.checkAccess(parentPath) || (mount && mount.writeable === false) || fs.existsSync(fsPath)) {
          this.respondMessage(context,403, 'Forbidden')
        } else {
          if (context.params.query.type === 'dir') {
            this.createFolder(context, fsPath);
          } else {
            this.createFile(context, fsPath, context.requestBody);
          }
        }
      } catch (err) {
        console.error(err)
        // no read access to path
        this.respondMessage(context,403, 'Forbidden')
      }
    } else {
      this.respondMessage(context,404, 'Not found')
    }
  }

  update(context) {
    return this.__processRequest(context, null, fsPath => {
      this.updateFile(context, fsPath, context.requestBody);
    }, 'update')
  }

  delete(context) {
    return this.__processRequest(context, fsPath => {
      this.deleteFolder(context, fsPath);
    }, fsPath => {
      this.deleteFile(context, fsPath);
    }, 'delete')
  }

  move(context) {
    const mount = this.__getMount(context.params.query.path);
    const fsPath = this.__getAbsolutePath(context.params.query.path, mount)
    const targetMount = this.__getMount(context.params.query.target)
    const targetPath = this.__getAbsolutePath(context.params.query.target, targetMount)
    if (!fs.existsSync(fsPath)) {
      this.respondMessage(context,404, 'Source not found')
      return;
    }
    if (fs.existsSync(targetPath)) {
      this.respondMessage(context,406, 'Target exists')
      return;
    }
    if (!FileHandler.checkAccess(targetPath) || (mount && mount.writeable === false) || (targetMount && targetMount.writeable === false)) {
      this.respondMessage(context, 403, 'Forbidden')
    } else {
      this.rename(context, fsPath, targetPath);
    }
  }

  __getMount(path) {
    let mountKey = this.mounts.indexOf(path);
    if (mountKey < 0) {
      this.mounts.some((mountPoint, index) => {
        if (path.startsWith(mountPoint)) {
          mountKey = index;
          return true;
        }
      })
    }
    if (mountKey >= 0) {
      return config.mounts[mountKey];
    }
  }

  __processRequest(context, folderCallback, fileCallback, type) {
    const mount = this.__getMount(context.params.query.path);
    const fsPath = this.__getAbsolutePath(context.params.query.path, mount)
    if (fs.existsSync(fsPath)) {
      try {
        const stats = fs.statSync(fsPath)
        if (!FileHandler.checkAccess(fsPath) || (mount && mount.writeable === false && type !== 'read')) {
          this.respondMessage(context,403, 'Forbidden')
        } else {
          if (stats.isDirectory()) {
            if (folderCallback) {
              return folderCallback(fsPath, mount)
            }
          } else {
            if (fileCallback) {
              return fileCallback(fsPath, mount);
            }
          }
        }
      } catch (err) {
        console.error(err)
        // no read access to path
        this.respondMessage(context,403, 'Forbidden')
      }
    } else {
      this.respondMessage(context,404, 'Not found')
    }
  }

  __folderListing(fsPath, mount) {
    const res = []
    fs.readdirSync(fsPath).filter(file => {
      return FileHandler.checkAccess(fsPath, file)
    }).forEach(file => {
      if (!file.startsWith('.')) {
        try {
          const stats = fs.statSync(path.join(fsPath, file))
          if (mount && mount.showSubDirs === false && stats.isDirectory()) {
            // no subdirs in mount
            return;
          }
          let relFolder;
          if (mount) {
            relFolder = mount.mountPoint + fsPath.substring(mount.path.length + 1)
          } else {
            relFolder = fsPath.substring(this.basePath.length + 1)
          }
          if (relFolder.length > 0) {
            relFolder += '/'
          }
          const fullPath = path.join(fsPath, file)
          const entry = {
            name: file,
            type: stats.isDirectory() ? 'dir' : (stats.isFile() ? 'file' : null),
            parentFolder: relFolder,
            hasChildren: stats.isDirectory() ? fs.readdirSync(fullPath).length > 0 : false,
            readable: false,
            writeable: false
          }
          try {
            fs.accessSync(fullPath, fs.constants.R_OK)
            entry.readable = true
          } catch (err) {
          }
          // no write access in demo folder
          if (!mount || mount.writeable !== false) {
            try {
              fs.accessSync(fullPath, fs.constants.W_OK)
              entry.writeable = true
            } catch (err) {
            }
          }
          res.push(entry)
        } catch (err) {
          // error accessing the entry -> do not add it to the resultset
        }
      }
    })
    if (fsPath.endsWith('/resource/config')) {
      // add mounts
      config.mounts.forEach(mount => {
        res.push({
          name: mount.mountPoint,
          type: 'dir',
          mounted: true,
          parentFolder: '',
          hasChildren: true,
          readable: true,
          writeable: mount.writeable !== false
        });
      })
    }
    return res
  }

  __getAbsolutePath(fsPath, mount) {
    fsPath = this.__sanitize(fsPath)
    if (mount) {
      // remove mountPoint from requested path
      fsPath = fsPath.substring(mount.mountPoint.length + 1)
      return path.join(mount.path, fsPath);
    }
    return path.join(this.basePath, fsPath)
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

const fsController = new FsController()

module.exports = fsController