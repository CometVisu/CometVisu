const util = require('util');
const fs = require('fs');
const path = require('path');
const mustache = require('mustache');
const { exec } = require('child_process');
const execProm = util.promisify(exec);

class AbstractCompileHandler {
  constructor(compilerApi, customSettings) {
    this._compilerApi = compilerApi;
    this._config = compilerApi.getConfiguration();
    this._customSettings = customSettings;
    this._customCompileSettings = {};

    // check for local override settings
    const customCompileConfig = path.join(process.cwd(), 'cv-compile.json');
    if (fs.existsSync(customCompileConfig)) {
      this._customCompileSettings = require(customCompileConfig);
    }
  }

  async onLoad() {
    await this.beforeBuild(this._compilerApi.getCommand().getTargetType());
  }

  /**
   * Executed before compiling
   * @param target
   */
  async beforeBuild(target) {
    await this.updateVersionFile();
  }

  async updateVersionFile() {
    // 1. collect information
    const revision = await this.execute('git rev-parse HEAD');
    const branch = await this.execute('git rev-parse --abbrev-ref HEAD');
    const data = {
      revision: revision,
      branch: branch,
      date: new Date().toISOString(),
      libraryVersionPure: 0,
      libraryVersionTile: 0,
      tags: []
    };
    Object.keys(this._customSettings).forEach(key => {
      if (key.startsWith('TAG:')) {
        data.tags.push({name: key.substr(4).toUpperCase(), value: this._customSettings[key]});
      }
    });
    if (data.tags.length > 0) {
      data.tags[data.tags.length - 1].last = true;
    }
    const packageData = JSON.parse(fs.readFileSync('package.json'));
    data.version = packageData.version;

    // get library version
    data.libraryVersionPure = packageData.org_cometvisu.libraryVersionPure;
    data.libraryVersionTile = packageData.org_cometvisu.libraryVersionTile;

    const code = mustache.render(`
qx.Class.define('cv.Version', {
  type: 'static',

  statics: {
    REV: '{{ revision }}',
    BRANCH: '{{ branch }}',
    VERSION: '{{ version }}',
    LIBRARY_VERSION_PURE: {{ libraryVersionPure }},
    LIBRARY_VERSION_TILE: {{ libraryVersionTile }},
    DATE: '{{ date }}',
    TAGS: { {{#tags}}
      {{ name }}: '{{value}}'{{^last}},{{/last}}{{/tags}}
    }
  }
});    
`, data);
  fs.writeFileSync(path.join('source', 'class', 'cv', 'Version.js'), code);
  fs.writeFileSync(path.join('source', 'REV'), revision);
}

  async updateCacheVersion() {
    const revision = await this.execute('git rev-parse HEAD');
    const regex = /var CACHE = \"(.+)\";/i;
    const workerFile = path.join(this._getTargetDir(), 'ServiceWorker.js');
    let content = fs.readFileSync(workerFile).toString('utf-8');
    content = content.replace(regex, `var CACHE = \"${revision}\";`);
    fs.writeFileSync(workerFile, content);
  }

  // eslint-disable-next-line class-methods-use-this
  async execute(command) {
    try {
      const res = await execProm(command);
      if (res.stdout) {
        return res.stdout.replace(/\n$/, '');
      }
    } catch (e) {
      console.error(e);
    }
    return '';
  }

  _getTargetDir(type) {
    let targetDir = null;
    const command = this._compilerApi.getCommand();
    if (!type) {
      type = command.getTargetType();
    }
    const isDeploy = command instanceof qx.tool.cli.commands.Deploy;
    if (isDeploy) {
      type = 'build';
    }
    this._config.targets.some(target => {
      if (target.type === type) {
        if (isDeploy) {
          if (command.argv.out) {
            targetDir = command.argv.out;
          } else if (typeof target.getDeployDir == 'function') {
            targetDir = target.getDeployDir();
          }
        } else {
          targetDir = target.outputPath;
        }
        return targetDir !== null;
      }
      return false;
    });
    return targetDir;
  }
}

module.exports = {
  AbstractCompileHandler: AbstractCompileHandler
};
