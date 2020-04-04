const { ClientCompileHandler } = require('../utils/compile/client/CompileHandler')

qx.Class.define("cv.compile.LibraryApi", {
  extend: qx.tool.cli.api.LibraryApi,

  members: {
    __compileHandler: null,

    /**
     * Called to load any library-specific configuration and update the compilerConfig
     */
    async load() {
      let configDb = await qx.tool.cli.ConfigDb.getInstance();
      this.__compileHandler = new ClientCompileHandler(this.getCompilerApi(), configDb);
      await this.__compileHandler.onLoad();
    }
  }
});

module.exports = {
  LibraryApi: cv.compile.LibraryApi
};
