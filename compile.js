qx.Class.define("cv.compile.CompilerApi", {
  extend: qx.tool.cli.api.CompilerApi,

  members: {
    async load () {
      const config = await this.base(arguments)
      this.compile(config)
      return config
    },

    compile: function (data) {
      const checkEnvs = {
        CV_VERSION: 'cv.version',
        CV_TESTMODE: "cv.testMode"
      }

      // transfer environment variables
      Object.keys(checkEnvs).forEach((name) => {
        if (process.env[name]) {
          data.environment[checkEnvs[name]] = process.env[name]
        }
      })
    }
  }
});

module.exports = {
  CompilerApi: cv.compile.CompilerApi
};
