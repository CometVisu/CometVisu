const fs = require('fs-extra')
const path = require('path')
const { AbstractCompileHandler } = require('../AbstractCompileHandler')

class ApiCompileHandler extends AbstractCompileHandler {
  onLoad () {
    let command = this._compilerApi.getCommand();
    command.addListener("made", () => this._onMade());
  }

  _onMade() {
    // cleanup files we do not need (everything from the compiled cv application: resources, application)
    const targetDir = this._getTargetDir()
    if (targetDir) {
      fs.readdirSync(path.join(targetDir, 'resource')).forEach(file => {
        if (!file.startsWith('qx')) {
          const dir = path.join(targetDir, 'resource', file)
          fs.removeSync(dir)
        }
      })
      // remove the cv application
      fs.removeSync(path.join(targetDir, 'cv'))
    }
  }
}

module.exports = {
  ApiCompileHandler: ApiCompileHandler
}