const util = require("util")
const fs = require("fs")
const path = require("path")
const mustache = require("mustache")
const { exec } = require('child_process')
const execProm = util.promisify(exec)

class AbstractCompileHandler {

  constructor(compilerApi, customSettings) {
    this._compilerApi = compilerApi
    this._config = compilerApi.getConfiguration()
    this._customSettings = customSettings
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
      date: new Date().toISOString(),
      libraryVersion: 0,
      tags: []
    }
    Object.keys(this._customSettings).forEach(key => {
      if (key.startsWith('TAG:')) {
        data.tags.push({name: key.substr(4).toUpperCase(), value: this._customSettings[key]})
      }
    })
    if (data.tags.length > 0){
      data.tags[data.tags.length - 1].last = true
    }
    const packageData = JSON.parse(fs.readFileSync("package.json"));
    data.version = packageData.version;

    // get library version
    data.libraryVersion = packageData.org_cometvisu.libraryVersion;

    const code = mustache.render(`
qx.Class.define("cv.Version", {
  type: "static",

  statics: {
    REV: "{{ revision }}",
    BRANCH: "{{ branch }}",
    VERSION: "{{ version }}",
    LIBRARY_VERSION: {{ libraryVersion }},
    DATE: "{{ date }}",
    TAGS: { {{#tags}}
      {{ name }}: "{{value}}"{{^last}},{{/last}}{{/tags}}
    }
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