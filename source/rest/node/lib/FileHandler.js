const fs = require('fs-extra')
const path = require('path')
const config = require('../config')
const CRC32 = require('crc-32')
const AbstractHandler = require('./AbstractHandler')

class FileHandler extends AbstractHandler {
  constructor() {
    super()
    this.useTrash = true;
  }

  sendFile(context, file) {
    if (file === null) {
      this.respondMessage(context,404, 'File not found')
    } else {
      if (context.params.query.download) {
        context.res.set('Content-Disposition', 'attachment; filename=' + path.basename(file));
      }
      this.respondWithType(context, fs.readFileSync(file), this.__getMimeTypeFromSuffix(file));
    }
  }

  __getMimeTypeFromSuffix(fsPath) {
    const suffix = fsPath.split('.').pop();
    switch (suffix) {
      case 'xml':
        return 'text/xml';
      case 'html':
        return 'text/html';
      case 'jpg':
      case 'jpeg':
        return 'image/jpg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      case 'js':
        return 'text/javascript';
      case 'php':
        return 'application/x-httpd-php';
      case 'css':
        return 'text/css';
      case 'svg':
        return 'application/svg+xml';
      default:
        return 'text/plain';
    }
  }

  /**
   * Create a new file
   * @param context {Context}
   * @param file {String} path to file
   * @param content
   * @param options {Map}
   */
  createFile(context, file, content, options) {
    if (fs.existsSync(file) && (!options || !options.force)) {
      this.respondMessage(context,406, 'File already exists')
    } else {
      try {
        this.__saveFile(file, content, context);
      } catch (err) {
        console.error(err)
        this.respondMessage(context,405, err.toString())
      }
    }
  }

  createFolder(context, folder) {
    if (fs.existsSync(folder)) {
      this.respondMessage(context,406, 'Folder already exists')
    } else {
      try {
        fs.mkdirSync(folder, {recursive: true})
        this.ok(context)
      } catch (err) {
        console.error(err)
        this.respondMessage(context,405, err.toString())
      }
    }
  }

  /**
   * Update the content of an existing file
   * @param context {Context}
   * @param file {String} absolute path to file
   * @param content {String} file context
   */
  updateFile(context, file, content) {
    if (!fs.existsSync(file)) {
      this.respondMessage(context,404, 'File not found')
    } else {
      try {
        const dirname = path.dirname(file)
        if (!fs.existsSync(dirname)) {
          // create missing dirs first
          fs.mkdirSync(dirname, {recursive: true})
        }
        this.__saveFile(file, content, context);
      } catch (err) {
        console.error(err)
        this.respondMessage(context,405, err.toString())
      }
    }
  }

  rename(context, sourcePath, targetPath) {
    try {
      fs.renameSync(sourcePath, targetPath)
      this.ok(context);
    } catch (err) {
    console.error(err)
    this.respondMessage(context,405, err.toString())
  }
  }

  __saveFile(file, content, context) {
    const hash = context.params.query.hash;
    if (hash) {
      const contentHash = Buffer.isBuffer(content) ? CRC32.buf(content) : CRC32.str(content);
      if (hash !== contentHash) {
        // data has been corrupted during transport
        this.respondMessage(context,405, 'data has been corrupted during transport')
        return
      }
      let backupFilename;
      const backupSuffix = Math.random();
      const backup = config.backupOnChange.some(check => {
        return check.test(file)
      });
      const fileExists = fs.existsSync(file);
      if (backup && fileExists) {
        // store permanent backup of existing file before change
        const parts = path.basename(file).split('.')
        const suffix = parts.pop();
        backupFilename = parts.join('.') + '-'
          + new Date().toISOString().split('.')[0].replace(/[\D]/g,'')
          + '.' + suffix
        ;
        const target = path.join(config.backupFolder, backupFilename);
        fs.copyFileSync(file, target);
      }
      if (fileExists) {
        // 1. create backup of existing file (this is just a temporary backup
        fs.copyFileSync(file, file + backupSuffix);
      }
      // 2. write new content
      fs.writeFileSync(file, content)
      // 3. check hash of written file
      const writtenContent = fs.readFileSync(file, {encoding: 'utf-8'})
      const newHash = CRC32.str(writtenContent)
      if (newHash !== contentHash) {
        // something went wrong -> restore old file content
        if (fileExists) {
          fs.copyFileSync(file + backupSuffix, file);
          if (backupFilename) {
            // no changes no need for backup file
            fs.unlinkSync(backupFilename);
          }
        }
        this.respondMessage(context,405, 'hash mismatch on written content')
      } else {
        // ok delete backup file
        this.ok(context)
      }
      if (fileExists) {
        fs.unlinkSync(file + backupSuffix);
      }
    } else {
      fs.writeFileSync(file, content)
      this.ok(context)
    }
  }

  /**
   * Delete a file from filesystem by either moving it to the trash folder or deleting it directly.
   * @param context {Context}
   * @param file {String} absolute path to file that should be deleted
   * @param force {Boolean} if true delete directly, no mosing to trash
   */
  deleteFile(context, file, force) {
    if (!fs.existsSync(file)) {
      // nothing to do
      return this.ok(context)
    }
    try {
      if (this.useTrash === true && !file.startsWith(config.trashFolder)) {
        const relDir = path.dirname(file).substring(config.configDir.length)
        const filename = path.basename(file)
        if (!fs.existsSync(config.trashFolder)) {
          fs.mkdirSync(config.trashFolder)
        }
        const trashFile = path.join(config.trashFolder, relDir, filename)
        if (fs.existsSync(trashFile)) {
          // delete old trash file with same name
          fs.unlinkSync(trashFile)
        }
        fs.renameSync(file, trashFile)
      } else {
        fs.unlinkSync(file)
      }
      this.ok(context)
    } catch (err) {
      console.error(err)
      this.respondMessage(context,405, err.toString())
    }
  }

  deleteFolder(context, folder, force) {
    if (!fs.existsSync(folder)) {
      // nothing to do
      return this.ok(context)
    }
    try {
      if (this.useTrash === true && !folder.startsWith(config.trashFolder)) {
        const relDir = folder.substring(config.configDir.length)
        if (!fs.existsSync(config.trashFolder)) {
          fs.mkdirSync(config.trashFolder)
        }
        const baseTrashFile = path.join(config.trashFolder, relDir)
        let trashFile = baseTrashFile
        let index = 1
        while (fs.existsSync(trashFile)) {
          trashFile = baseTrashFile + '-' + index++
        }
        fs.renameSync(folder, trashFile)
      } else {
        if (force === true || fs.readdirSync(folder).length === 0) {
          fs.removeSync(folder)
        } else {
          this.respondMessage(context,406, 'Folder not empty')
        }
      }
      this.ok(context)
    } catch (err) {
      console.error(err)
      this.respondMessage(context,405, err.toString())
    }
  }


  /**
   * Returns false if accessing the filesystem item is not allowed (no read, update, delete, create).
   * The main purpose of this method is to prevent access to hidden files.
   *
   * @param fsPath {String} path
   * @param item {String} file name
   * @returns {boolean} true if access is allowed
   */
  static checkAccess(fsPath, item) {
    if (!item) {
      item = path.basename(fsPath)
      fsPath = path.dirname(fsPath)
    }
    return item === config.trashFolderName || !(item.startsWith('.') || (item === 'hidden.php' && fsPath === config.configDir));
  }
}

module.exports = FileHandler