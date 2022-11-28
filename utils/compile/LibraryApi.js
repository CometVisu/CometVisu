const { CvCompileHandler } = require('./cv/CompileHandler');
const { ApiCompileHandler } = require('./apiviewer/CompileHandler');
const packageConfig = require('../../package.json');

qx.Class.define('cv.compile.LibraryApi', {
  extend: qx.tool.cli.api.LibraryApi,

  members: {
    __compileHandler: null,

    /**
     * Called to load any library-specific configuration and update the compilerConfig
     */
    async afterLibrariesLoaded() {
      const compilerApi = this.getCompilerApi();
      const command = compilerApi.getCommand();
      if (command instanceof qx.tool.cli.commands.Compile || command instanceof qx.tool.cli.commands.Deploy) {
        const config = compilerApi.getConfiguration();
        const customSettings = {};
        this.readEnv(config, customSettings);

        if (command.argv.set) {
          command.argv.set.forEach(function (kv) {
            const parts = kv.split('=');
            if (parts.length === 2) {
              customSettings[parts[0]] = parts[1];
            }
          });
        }
        const makeApi = customSettings.apiviewer === 'true';
        const outputPath = process.env.CV_OUTPUT_PATH || customSettings.outputPath;
        const targetType = command.getTargetType();
        config.targets.forEach(target => {
          if (target.type === targetType) {
            if (outputPath) {
              target.outputPath = outputPath;
            }
          }
        });
        if (makeApi) {
          config.applications.forEach(app => {
            app.default = app.name === 'apiviewer';
          });
          this.__compileHandler = new ApiCompileHandler(compilerApi, customSettings);
        } else {
          config.applications = config.applications.filter(app => app.name !== 'apiviewer');
          this.__compileHandler = new CvCompileHandler(compilerApi, customSettings);
        }
        await this.__compileHandler.onLoad();
      } else if (command instanceof qx.tool.cli.commands.Lint) {
        const config = compilerApi.getConfiguration();
        // copy eslint config from package.json
        if (packageConfig.hasOwnProperty('eslintConfig')) {
          config.eslintConfig = packageConfig.eslintConfig;
        }
      }
    },

    readEnv (config, customSettings) {
      const checkEnvs = {
        CV_VERSION: 'cv.version',
        CV_TESTMODE: 'cv.testMode'
      };

      let setVersion = false;
      const CV_ENVS = Object.keys(process.env).filter(key => key.startsWith('CV_'));

      // transfer environment variables
      CV_ENVS.forEach(name => {
        if (process.env[name]) {
          if (checkEnvs.hasOwnProperty(name)) {
            config.environment[checkEnvs[name]] = process.env[name];
            if (name === 'CV_VERSION') {
              setVersion = true;
            }
          } else if (name.startsWith('CV_TAG_')) {
            customSettings['TAG:' + name.substr(7)] = process.env[name];
          }
        }
      });

      if (setVersion) {
        config.applications.some(app => {
          if (app.name === 'apiviewer') {
            app.environment['qxl.versionlabel.version'] = process.env.CV_VERSION;
            return true;
          }
          return false;
        });
      }
    }
  }
});

module.exports = {
  LibraryApi: cv.compile.LibraryApi
};
