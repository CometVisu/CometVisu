const fs = require('fs');
const chmodr = require('chmodr');
const fg = require('fast-glob');
const fse = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');
const { exec } = require('child_process');
const { AbstractCompileHandler } = require('../AbstractCompileHandler');
const { CvBuildTarget } = require('./BuildTarget');

// because the qx compiler does not handle files in the root resoure folder well
// we add them here
const additionalResources = [
  'visu_config.xsd',
  'hidden-schema.json',
  'cometvisu_management.css',
  'config/visu_config*.xml',
  'config/hidden.php',
  'blank.gif'
];

// files that must be copied in the compiled folder
const filesToCopy = [
  "../package.json",
  "editor",
  "upgrade",
  "check_config.php",
  "manager.php",
  "version",
  "library_version.inc.php",
  "../node_modules/monaco-editor",
  "rest/manager",
  "rest/openapi.yaml",
  "test",
  "replay.html",
  "resource/config/.htaccess",
  "resource/config/.templates",
  "REV"
];

// directories to exclude from copying
const excludeFromCopy = {
  build: [
    '../node_modules/monaco-editor/dev',
    '../node_modules/monaco-editor/esm'
  ]
}

class CvCompileHandler extends AbstractCompileHandler {

  onLoad() {
    super.onLoad();
    const command = this._compilerApi.getCommand();
    if (this._config.targetType === 'build' || command instanceof qx.tool.cli.commands.Deploy) {
      this._config.targets.some(target => {
        if (target.type === 'build') {
          target.targetClass = CvBuildTarget
        }
      });
    }
    command.addListener("made", () => this._onMade());
    command.addListener("compiledClass", this._onCompiledClass, this);
    const currentDir = process.cwd();
    const targetDir = this._getTargetDir();
    this._excludes = excludeFromCopy.hasOwnProperty(this._config.targetType) ? excludeFromCopy[this._config.targetType].map(d => {
      return path.join(currentDir, targetDir, (d.startsWith('../') ? d.substring(3) : d));
    }) : [];
  }

  /**
   * Called after all libraries have been loaded and added to the compilation data
   */
  async _onMade() {
    await this.copyFiles();

    if (this._config.targetType === 'build') {
      return this.afterBuild();
    } else {
      return Promise.resolve(true);
    }
  }

  _onCompiledClass(ev) {
    const data = ev.getData();
    if (data.classFile.getClassName() === 'cv.Application') {
      const currentDir = process.cwd();
      const resourceDir = path.join(currentDir, 'source', 'resource');
      additionalResources.forEach(res => {
        fg.sync(path.join(resourceDir, res)).forEach(file => data.dbClassInfo.assets.push(file.substr(resourceDir.length + 1)));
      })
    }
  }

  async copyFiles () {
    const currentDir = process.cwd();
    const targetDir = this._getTargetDir();
    const command = this._compilerApi.getCommand();
    this._watchList = {};
    const promises = [];
    if (targetDir) {
      filesToCopy.forEach(file => {
        const source = path.join(currentDir, 'source', file)
        const target = path.join(currentDir, targetDir, (file.startsWith('../') ? file.substring(3) : file));
        const stats = fs.statSync(source);
        const dirname = stats.isDirectory() ? target : path.dirname(target);
        fse.ensureDirSync(dirname);

        if (stats.isFile()) {
          promises.push(qx.tool.utils.files.Utils.copyFile(source, target));
        } else {
          promises.push(qx.tool.utils.files.Utils.sync(source, target, this.__filterCopyFiles.bind(this)));
        }
        this._watchList[source] = target;
      });

      // make everything in resource/config writeable
      const configFolder = path.join(currentDir, targetDir, 'resource', 'config');

      // create config/media folder
      const configFolders =[
        path.join(configFolder, 'media'),
        path.join(configFolder, 'backup')
      ];
      configFolders.forEach(folder => {
        fse.ensureDirSync(folder);
      });
      chmodr(configFolder, 0o777, (err) => {
        if (err) {
          console.log('Failed to execute chmod in resource/config', err);
        }
      });
    }

    if (command.argv.watch) {
      if (this._watcher) {
        this._watcher.close();
      }
      this.__watcherReady = false;
      var watcher = this._watcher = chokidar.watch(Object.keys(this._watchList), {});
      watcher.on("change", filename => this.__onFileChange("change", filename));
      watcher.on("add", filename => this.__onFileChange("add", filename));
      watcher.on("unlink", filename => this.__onFileChange("unlink", filename));
      watcher.on("ready", () => {
        this.__watcherReady = true;
      });
      watcher.on("error", err => {
        console.error(err);
      });
    }

    // copy IconConfig.js to make it available for resource/icons/iconlist.html
    const classTargetDir = path.join(currentDir, targetDir, 'class', 'cv');
    fse.ensureDirSync(classTargetDir);
    fse.copySync(path.join(process.cwd(), 'source', 'class', 'cv', 'IconConfig.js'), path.join(classTargetDir, 'IconConfig.js'));

    if (this._config.targetType === 'source' || this._customSettings.fakeLogin === "true") {
      // copy a fake /cgi-bin/l response to the target folder
      fse.copySync(path.join(process.cwd(), 'source', 'resource', 'test'), path.join(targetDir, 'cgi-bin'));
    }
    return Promise.all(promises);
  }

  __filterCopyFiles(from, to) {
    return !this._excludes.some(dir => to.startsWith(dir));
  }

  __onFileChange(type, filename) {
    if (!this.__watcherReady) {
      return;
    }
    let matchPath = filename;
    let changedPath = filename;
    let relativePath = "";
    let matches = this._watchList.hasOwnProperty(changedPath);
    if (!matches) {
      Object.keys(this._watchList).some(function (srcPath) {
        if (filename.startsWith(srcPath)) {
          relativePath = filename.replace(srcPath, "/");
          matchPath = srcPath;
          matches = true;
        }
        return matches;
      })
    }
    if (matches) {
      switch (type) {
        case 'change':
        case 'add':
          console.log('copying:');
          console.log(' ->', filename);
          console.log(' <-', path.join(this._watchList[matchPath], relativePath));
          const target = path.join(this._watchList[matchPath], relativePath);
          if (this.__filterCopyFiles(filename, target)) {
            qx.tool.utils.files.Utils.copyFile(filename, target);
            if (relativePath.includes('resource/config/')) {
              fs.chmodSync(path.join(this._watchList[matchPath], relativePath), 0o777);
            }
          }
          break;
      }
    } else {
      console.log(this._watchList);
      console.log('unhandled change in', filename);
    }
  }

  /**
   * Executed after the build version has been compiled
   */
  async afterBuild () {
    // build-libs
    console.log('uglifying libraries');
    exec('grunt uglify:libs');

    const targetDir = this._getTargetDir();

    // build-paths
    console.log('update paths');
    exec('./cv build -up -d ' + targetDir);
  }
}

module.exports = {
  CvCompileHandler: CvCompileHandler
}