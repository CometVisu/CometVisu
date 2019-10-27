qx.Class.define("cv.compile.LibraryApi", {
  extend: qx.tool.cli.api.LibraryApi,

  members: {
    async load () {
      const config = this.getCompilerApi().getConfiguration()
      this.readEnv(config)
    },

    readEnv (config) {
      const checkEnvs = {
        CV_VERSION: 'cv.version',
        CV_TESTMODE: "cv.testMode"
      }

      // transfer environment variables
      Object.keys(checkEnvs).forEach((name) => {
        if (process.env[name]) {
          config.environment[checkEnvs[name]] = process.env[name]
        }
      })
    }
  }
});

module.exports = {
  LibraryApi: cv.compile.LibraryApi
};
