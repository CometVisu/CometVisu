const fs = require('fs')
const path = require('path')
const glob = require('glob')

qx.Class.define('cv.compile.cv.BuildTarget', {
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

module.exports = {
  CvBuildTarget: cv.compile.cv.BuildTarget
}