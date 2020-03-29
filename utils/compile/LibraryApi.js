const { CvCompileHandler } = require('./cv/CompileHandler')
const { ApiCompileHandler } = require('./apiviewer/CompileHandler')

qx.Class.define("cv.compile.LibraryApi", {
  extend: qx.tool.cli.api.LibraryApi,

  members: {
    __compileHandler: null,

    /**
     * Called to load any library-specific configuration and update the compilerConfig
     */
    async load () {
      const compilerApi = this.getCompilerApi()
      const config = compilerApi.getConfiguration()
      this.readEnv(config)

      let configDb = await qx.tool.cli.ConfigDb.getInstance();
      const makeApi = configDb.db('apiviewer') === 'true'
      if (makeApi) {
        config.applications.filter(app => {
          app.default = app.name === 'apiviewer';
        })
        this.__compileHandler = new ApiCompileHandler(compilerApi, configDb);
      } else {
        config.applications = config.applications.filter(app => app.name !== 'apiviewer')
        this.__compileHandler = new CvCompileHandler(compilerApi, configDb);
      }
      await this.__compileHandler.onLoad();
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
        config.applications.some((app) => {
          if (app.name === "apiviewer") {
            app.environment['versionLabel.version'] = process.env.CV_VERSION
          }
        })
      }
    }
  }
});

module.exports = {
  LibraryApi: cv.compile.LibraryApi
};