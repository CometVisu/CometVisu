const { exec } = require('child_process')

class AbstractCompileHandler {

  constructor(compilerApi, dbConfig) {
    this._compilerApi = compilerApi
    this._config = compilerApi.getConfiguration();
    this._dbConfig = dbConfig;
  }

  onLoad() {
    if (this._config.targetType === 'build') {
      this.beforeBuild()
    }
  }

  /**
   * Executed before compiling a build version
   */
  beforeBuild() {
    exec('utils/update_version.py')
  }

  _getTargetDir(type) {
    let targetDir = null
    if (!type) {
      type = this._config.targetType
    }
    this._config.targets.some(target => {
      if (target.type === type) {
        targetDir = target.outputPath
      }
    })
    return targetDir
  }
}

module.exports = {
  AbstractCompileHandler: AbstractCompileHandler
}