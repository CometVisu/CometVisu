const config = require('../config')
const path = require('path')
const fs = require('fs')
const FileHandler = require('../lib/FileHandler')

class ConfigHandler extends FileHandler {
  constructor() {
    super()
    this.basePath = config.configDir
  }

  /**
   * Returns the absolute config file path
   * @param context {Context}
   * @param notCheckExistance {Boolean} if true do not check if file exists
   * @returns {String|null} path to file or null if it does not exist (and notCheckExistance is not true)
   * @private
   */
  __getConfigPath(context, notCheckExistance) {
    let name = context.params.path.name
    if (name.length > 0) {
      name = '_' + name
    }
    const configPath = path.join(this.basePath, 'visu_config' + name + '.xml')
    if (notCheckExistance === true || fs.existsSync(configPath)) {
      return configPath
    } else {
      return null
    }
  }

  getConfig(context) {
    this.sendFile(context, this.__getConfigPath(context))
  }

  addConfig(context) {
    this.createFile(context, this.__getConfigPath(context, true), context.requestBody);
  }

  updateConfig(context) {
    this.updateFile(context, this.__getConfigPath(context, true), context.requestBody);
  }

  deleteConfig(context) {
    this.deleteFile(context, this.__getConfigPath(context))
  }
}

const configHandler = new ConfigHandler()

module.exports = configHandler
