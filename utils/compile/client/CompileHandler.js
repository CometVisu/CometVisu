const { AbstractCompileHandler } = require('../AbstractCompileHandler')
const { ClientBuildTarget } = require('./BuildTarget')


class ClientCompileHandler extends AbstractCompileHandler {

  onLoad() {
    if (this._config.targetType === 'build') {
      this._config.targets.some(target => {
        if (target.type === 'build') {
          target.targetClass = ClientBuildTarget
        }
      })
    }
    //
    // let command = this._compilerApi.getCommand();
    // command.addListener("made", () => this._onMade());
    // command.addListener("compiledClass", this._onCompiledClass, this);
  }
}

module.exports = {
  ClientCompileHandler: ClientCompileHandler
}