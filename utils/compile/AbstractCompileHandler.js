const util = require("util")
const fs = require("fs")
const path = require("path")
const mustache = require("mustache")
const { exec } = require('child_process')
const execProm = util.promisify(exec)

class AbstractCompileHandler {

  constructor(compilerApi, dbConfig) {
    this._compilerApi = compilerApi
    this._config = compilerApi.getConfiguration()
    this._dbConfig = dbConfig
  }

  async onLoad() {
    this.beforeBuild(this._config.targetType)
  }

  /**
   * Executed before compiling
   */
  async beforeBuild(target) {
    await this.updateVersionFile()
  }

  async updateVersionFile() {
    // 1. collect information
    const revision = await this.execute("git rev-parse HEAD")
    const branch = await this.execute("git rev-parse --abbrev-ref HEAD")
    const data = {
      revision: revision,
      branch: branch,
      date: new Date().toISOString()
    }
    const packageData = JSON.parse(fs.readFileSync("package.json"));
    data.version = packageData.version
    const code = mustache.render(`
qx.Class.define("cv.Version", {
  type: "static",

  statics: {
    REV: "{{ revision }}",
    BRANCH: "{{ branch }}",
    VERSION: "{{ version }}",
    DATE: "{{ date }}"
  }
});    
`, data)
    fs.writeFileSync(path.join("source", "class", "cv", "Version.js"), code)
  }

  async execute(command) {
    try {
      const res = await execProm(command)
      if (res.stdout) {
        return res.stdout.replace(/\n$/, "")
      }
    } catch (e) {
      console.error(e)
      return "";
    }
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