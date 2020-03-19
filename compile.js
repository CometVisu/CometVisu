const fs = require('fs')
const fse = require('fs-extra')
const readline = require('readline')
const path = require('path')
const glob = require('glob')
const { exec } = require('child_process')

// because the qx compiler does not handle files in the root resoure folder well
// we add them here
const additionalResources = ['visu_config.xsd', 'cometvisu_management.css'];

qx.Class.define('cv.compile.BuildTarget', {
  extend: qx.tool.compiler.targets.BuildTarget,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (outputDir) {
    this.base(arguments, outputDir);
    this.setWriteCompileInfo(true)
  },

  members: {
    _pluginsLoadingScripts: null,

    // _writeApplication: async function(compileInfo) {
    //   this.base(arguments, compileInfo)
    // },

    // overridden
    _afterWriteApplication: async function(compileInfo) {
      const analyser = this.getAnalyser()
      this._pluginsLoadingScripts = {}
      const plugins = []
      compileInfo.parts.forEach((part, partId) => {
        if (part.name.startsWith('plugin-')) {
          plugins.push({part: part, id: partId})
        }
      })
      for (const entry of plugins) {
        for (const classname of entry.part.classes) {
          const classInfo = analyser.getCachedClassInfo(classname)
          if (this.__loadsScripts(classInfo)) {
            if (!this._pluginsLoadingScripts.hasOwnProperty(entry.part.name)) {
              this._pluginsLoadingScripts[entry.part.name] = {
                part: entry.part.name,
                filename: path.join(this.getOutputDir(), 'cv', 'part-' + entry.id + '.js'),
                classes: []
              }
            }
            this._pluginsLoadingScripts[entry.part.name].classes.push({
              classname: classname,
              assets: this.__extractAssets(classInfo)
            })
          }
        }
      }
      await this.appendLibrariesToPlugins()
      this.base(arguments, compileInfo)
    },

    /**
     * Checks the the class is loading external libraries in its defer method by using the cv.util.ScriptLoader
     * @param classInfo {Object} class info from generated db.json
     * @private
     */
    __loadsScripts (classInfo) {
      if (classInfo.hasDefer === true &&
        classInfo.hasOwnProperty('assets') &&
        classInfo.assets.length > 0 &&
        classInfo.dependsOn.hasOwnProperty('cv.util.ScriptLoader') &&
        classInfo.dependsOn['cv.util.ScriptLoader'].defer === 'runtime'
      ) {
        return classInfo.assets.some(entry => {
          return entry.split(',').some(name => name.endsWith('.js'))
        })

      }
      return false
    },

    __extractAssets (classInfo) {
      const targetDir = this.getOutputDir()
      const assets = []
      classInfo.assets.forEach(asset => {
        asset.split(',').filter(name => name.endsWith('.js')).forEach(name => {
          if (name.indexOf('*') >= 0) {
            // wildcard pattern on filesystem
            const files = glob.sync(path.join(targetDir, 'resource', name), {
              nodir: true
            })
            for (const file of files) {
              if (file.endsWith('.js') && !assets.includes(file)) {
                assets.push(file)
              }
            }
          } else if (!assets.includes(path.join(targetDir, 'resource', name))) {
            assets.push(path.join(targetDir, 'resource', name))
          }
        })
      })
      return assets
    },

    /**
     * In Build releases the libraries used in plugins are directly included in the generated parts.
     * This saves some loading time.
     */
    async appendLibrariesToPlugins () {
      for (const entry of Object.values(this._pluginsLoadingScripts)) {
        // write everything to a temporary file
        const w = fs.createWriteStream(entry.filename + '.tmp', {flags: 'w'})
        // read the assets source code and append it to the part
        for (const clazz of entry.classes) {
          for (const asset of clazz.assets) {
            await this.__queuedWrite(asset, w)
          }
        }
        // all done, now we copy the plugin code to the temporayy file too (to append it at the end)
        await this.__queuedWrite(entry.filename, w, true)
        await new Promise((resolve) => {
          w.end('', null, () => {
            // now we copy the temporary part file over the real part file
            fs.renameSync(entry.filename + '.tmp', entry.filename)
            resolve()
          })
        })
      }
    },

    __queuedWrite: async function (sourceFile, targetStream, skipLoadedCode) {
      const resourcePath = path.join(this.getOutputDir(), 'resource')

      return new Promise((resolve, reject) => {
        const reader = fs.createReadStream(sourceFile)
        const relativePath = sourceFile.substring(resourcePath.length + 1)
        if (!skipLoadedCode) {
          targetStream.write('\nif (!cv.util.ScriptLoader.isMarkedAsLoaded("' + relativePath + '")) {\n')
        }
        reader.pipe(targetStream, {end: false})
        reader.on('end', () => {
          if (!skipLoadedCode) {
            targetStream.write('cv.util.ScriptLoader.markAsLoaded("' + relativePath + '")}\n');
          }
          resolve()
        })
        reader.on('error', (err) => {
          reject(err)
        })
      })
    }
  }
})

qx.Class.define("cv.compile.LibraryApi", {
  extend: qx.tool.cli.api.LibraryApi,

  members: {
    /**
     * Called to load any library-specific configuration and update the compilerConfig
     */
    async load () {
      const config = this.getCompilerApi().getConfiguration()
      this.readEnv(config)

      // remove application apiviewer from config (TODO: add some environment variable to skip this step)
      config.applications = config.applications.filter(app => app.name === 'cv')

      if (config.targetType === 'build') {
        config.targets.some(target => {
          if (target.type === 'build') {
            target.targetClass = cv.compile.BuildTarget
          }
        })
        this.beforeBuild()
      }

      let command = this.getCompilerApi().getCommand();
      command.addListener("made", () => this._onMade());
      command.addListener("compiledClass", (ev) => {
        const data = ev.getData();
        if (data.classFile.getClassName() === 'cv.Application') {
          additionalResources.forEach(res => data.dbClassInfo.assets.push(res))
        }
      });
    },

    /**
     * Called after all libraries have been loaded and added to the compilation data
     */
    _onMade() {
      const config = this.getCompilerApi().getConfiguration()
      this.copyFiles(config)

      if (config.targetType === 'build') {
        return this.afterBuild(config)
      } else {
        return Promise.resolve(true)
      }
    },

    readEnv (config) {
      const checkEnvs = {
        CV_VERSION: 'cv.version',
        CV_TESTMODE: "cv.testMode"
      }

      let setVersion = false

      // transfer environment variables
      Object.keys(checkEnvs).forEach((name) => {
        if (process.env[name]) {
          config.environment[checkEnvs[name]] = process.env[name]
          if (name === "CV_VERSION") {
            setVersion = true
          }
        }
      })
      if (setVersion) {
        config.applications.some(function (app) {
          if (app.name === "apiviewer") {
            app.environment['versionLabel.version'] = process.env.CV_VERSION
          }
        })
      }
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
        "../node_modules/monaco-editor",
        "rest/manager"
      ]
      const currentDir = process.cwd()
      const targetDir = this._getTargetDir(config)
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

      if (config.targetType === 'source') {
        // copy a fake /cgi-bin/l response to the target folder
        fse.copySync(path.join(process.cwd(), 'source', 'resource', 'test'), path.join(targetDir, 'cgi-bin'))
      }
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
    async afterBuild (config) {
      // build-libs
      console.log('uglifying libraries')
      exec('grunt uglify:libs')

      const targetDir = this._getTargetDir(config)

      // build-paths
      console.log('update paths')
      exec('./cv build -up -d ' + targetDir)
    },

    _getTargetDir (config, type) {
      let targetDir = null
      if (!type) {
        type = config.targetType
      }
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
