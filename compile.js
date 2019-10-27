const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const { exec } = require('child_process');

qx.Class.define("cv.compile.LibraryApi", {
  extend: qx.tool.cli.api.LibraryApi,

  members: {
    /**
     * Called to load any library-specific configuration and update the compilerConfig
     */
    async load () {
      const config = this.getCompilerApi().getConfiguration()
      this.readEnv(config)

      if (config.targetType === 'build') {
        this.beforeBuild()
      }

      let command = this.getCompilerApi().getCommand();
      command.addListener("made", () => this._onMade());
    },

    /**
     * Called after all libraries have been loaded and added to the compilation data
     */
    _onMade() {
      const config = this.getCompilerApi().getConfiguration()
      this.copyFiles(config)

      if (config.targetType === 'build') {
        this.afterBuild(config)
      }
    },

    readEnv (config) {
      const checkEnvs = {
        CV_VERSION: 'cv.version',
        CV_TESTMODE: "cv.testMode"
      }

      // transfer environment variables
      Object.keys(checkEnvs).forEach((name) => {
        if (process.env[name]) {
          config.environment[checkEnvs[name]] = process.env[name]
        }
      })
    },

    copyFiles (config) {
      const filesToCopy = [
        "resource/sentry/bundle.min.js",
        "editor",
        "upgrade",
        "check_config.php",
        "manager.php",
        "version",
        "library_version.inc.php",
        "../node_modules/monaco-editor"
      ]
      const currentDir = process.cwd()
      const targetDir = this._getTargetDir(config, config.targetType)
      if (targetDir) {
        filesToCopy.forEach(file => {
          const source = path.join(currentDir, 'source', file)
          const target = path.join(currentDir, targetDir, (file.startsWith('../') ? file.substring(3) : file))
          const stats = fs.statSync(source);
          const dirname = stats.isDirectory() ? target : path.dirname(target)
          fse.ensureDirSync(dirname)
          fse.copySync(source, target)
        })
      }

      // copy IconConfig.js to make it available for resource/icon/iconlist.html
      const classTargetDir = path.join(currentDir, targetDir, 'class', 'cv')
      fse.ensureDirSync(classTargetDir)
      fse.copySync(path.join(process.cwd(), 'source', 'class', 'cv', 'IconConfig.js'), path.join(classTargetDir, 'IconConfig.js'))
    },

    /**
     * Executed before compiling a build version
     */
    beforeBuild () {
      exec('utils/update_version.py')
    },

    /**
     * Executed after the build version has been compiled
     */
    afterBuild (config) {
      // build-libs
      console.log('uglifying libraries')
      exec('grunt uglify:libs')

      // build-append-plugin-libs
      console.log('appending libraries to plugins')
      exec('./cv build -bp"')

      // build-paths
      console.log('build paths')
      exec('./cv build -up')
    },

    _getTargetDir (config, type) {
      let targetDir = null
      config.targets.some(target => {
        if (target.type === type) {
          targetDir = target.outputPath
        }
      })
      return targetDir
    }
  }
});

module.exports = {
  LibraryApi: cv.compile.LibraryApi
};
