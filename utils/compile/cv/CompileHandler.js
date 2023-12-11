const fs = require('fs');
const chmodr = require('chmodr');
const fg = require('fast-glob');
const fse = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');
const { exec } = require('child_process');
const { AbstractCompileHandler } = require('../AbstractCompileHandler');
const { CvBuildTarget } = require('./BuildTarget');
const types = require("@babel/types");

// because the qx compiler does not handle files in the root resource folder well
// we add them here
const additionalResources = [
  'visu_config*.xsd',
  'hidden-schema.json',
  'cometvisu_management.css',
  'config/visu_config*.xml',
  'config/custom_visu_config.xsd',
  'config/media/*templates*.xml',
  'config/hidden.php'
];

// files that must be copied in the compiled folder
const filesToCopy = [
  '../package.json',
  'version',
  '../node_modules/monaco-editor',
  'rest/manager',
  'rest/openapi.yaml',
  'test',
  'replay.html',
  'resource/config/.htaccess',
  'REV',
  'ServiceWorker.js'
];

// directories to exclude from copying
const excludeFromCopy = {
  build: [
    '../node_modules/monaco-editor/dev',
    '../node_modules/monaco-editor/esm'
  ]
};

const deleteBefore = [
  'qx_packages/**/font/*/*.svg'
];


/**
 * Helper method that collapses the MemberExpression into a string
 * @param node
 * @returns {string}
 */
function collapseMemberExpression(node) {
  var done = false;
  function doCollapse(node) {
    if (node.type == "ThisExpression") {
      return "this";
    }
    if (node.type == "Super") {
      return "super";
    }
    if (node.type == "Identifier") {
      return node.name;
    }
    if (node.type == "ArrayExpression") {
      var result = [];
      node.elements.forEach(element => result.push(doCollapse(element)));
      return result;
    }
    if (node.type != "MemberExpression") {
      return "(" + node.type + ")";
    }
    if (types.isIdentifier(node.object)) {
      let str = node.object.name;
      if (node.property.name) {
        str += "." + node.property.name;
      } else {
        done = true;
      }
      return str;
    }
    var str;
    if (node.object.type == "ArrayExpression") {
      str = "[]";
    } else {
      str = doCollapse(node.object);
    }
    if (done) {
      return str;
    }
    // `computed` is set if the expression is a subscript, eg `abc[def]`
    if (node.computed) {
      done = true;
    } else if (node.property.name) {
      str += "." + node.property.name;
    } else {
      done = true;
    }
    return str;
  }

  return doCollapse(node);
}

class CvCompileHandler extends AbstractCompileHandler {
  async onLoad() {
    this._onBeforeLoad();
    await super.onLoad();
    const command = this._compilerApi.getCommand();
    const targetType = command.getTargetType();
    if (targetType === 'build' || command instanceof qx.tool.cli.commands.Deploy) {
      this._config.targets.some(target => {
        if (target.type === 'build') {
          target.targetClass = CvBuildTarget;
          return true;
        }
        return false;
      });
    }
    command.addListener('writtenApplications', async () => this._onMade());
    if (command instanceof qx.tool.cli.commands.Deploy) {
      command.addListener('afterDeploy', this._onAfterDeploy, this);
    }
    command.addListener('compilingClass', this._onCompilingClass, this);
    command.addListener('compiledClass', this._onCompiledClass, this);

    const currentDir = process.cwd();
    const targetDir = this._getTargetDir();
    const exclude = this._customCompileSettings.hasOwnProperty('excludeFromCopy')
      ? Object.assign(this._customCompileSettings.excludeFromCopy, excludeFromCopy) : excludeFromCopy;
    this._excludes = exclude.hasOwnProperty(targetType) ? exclude[targetType].map(d => path.join(currentDir, targetDir, (d.startsWith('../') ? d.substring(3) : d))) : [];
  }

  /**
   * Called after all libraries have been loaded and added to the compilation data
   */
  async _onMade() {
    const command = this._compilerApi.getCommand();
    if (!(command instanceof qx.tool.cli.commands.Deploy)) {
      await this.copyFiles();
      this.updateTestData();
      await this.updateCacheVersion();
    }
    if (command.getTargetType() === 'build') {
      return this.afterBuild();
    }
    return Promise.resolve(true);
  }

  async _onAfterDeploy(ev) {
    const data = ev.getData();
    await this.copyFiles(data.deployDir);
    this.updateTestData();
    await this.updateCacheVersion();
  }

  // eslint-disable-next-line class-methods-use-this
  _onBeforeLoad() {
    deleteBefore.forEach(glob => fg.sync(glob).forEach(file => qx.tool.utils.files.Utils.safeUnlink(file)));
  }

  // eslint-disable-next-line class-methods-use-this
  _onCompilingClass(ev) {
    const data = ev.getData();
    const className = data.classFile.getClassName();
    if (className.startsWith('cv.ui.structure.tile.components.')
      || className.startsWith('cv.ui.structure.tile.elements.')
      || className.startsWith('cv.ui.structure.tile.widgets.')) {
      // this is a terrible hack to get rid of this warning from the babel compiler:
      //    Unexpected termination when testing for unresolved symbols, node type ClassProperty
      // it is caused by the static observedAttributes = ... line in the QxConnector class
      // All the hack does is appending "ClassProperty: 1" to "DO_NOT_WARN_TYPES"
      const plugin = data.classFile._babelClassPlugins();
      const t = data.classFile;
      plugin.Compiler.visitor.Identifier = (path) => {
        path.node.name = t.encodePrivate(path.node.name, true, path.loc);

        // These are AST node types which do not cause undefined references for the identifier,
        // eg ObjectProperty could be `{ abc: 1 }`, and `abc` is not undefined, it is an identifier
        const CHECK_FOR_UNDEFINED = {
          ObjectProperty: 1,
          ObjectMethod: 1,
          FunctionExpression: 1,
          FunctionStatement: 1,
          ArrowFunctionExpression: 1,
          VariableDeclarator: 1,
          FunctionDeclaration: 1,
          CatchClause: 1,
          AssignmentPattern: 1,
          RestElement: 1,
          ArrayPattern: 1,
          SpreadElement: 1,
          ClassDeclaration: 1,
          ClassMethod: 1,
          LabeledStatement: 1,
          BreakStatement: 1
        };

        // These are AST node types we expect to find at the root of the identifier, and which will
        //  not trigger a warning.  The idea is that all of the types in CHECK_FOR_UNDEFINED are types
        //  that cause references to variables, everything else is in DO_NOT_WARN_TYPES.  But, if anything
        //  has been missed and is not in either of these lists, throw a warning so that it can be checked
        const DO_NOT_WARN_TYPES = {
          AssignmentExpression: 1,
          BooleanExpression: 1,
          CallExpression: 1,
          BinaryExpression: 1,
          UnaryExpression: 1,
          WhileStatement: 1,
          IfStatement: 1,
          NewExpression: 1,
          ReturnStatement: 1,
          ConditionalExpression: 1,
          LogicalExpression: 1,
          ForInStatement: 1,
          ArrayExpression: 1,
          SwitchStatement: 1,
          SwitchCase: 1,
          ThrowStatement: 1,
          ExpressionStatement: 1,
          UpdateExpression: 1,
          SequenceExpression: 1,
          ContinueStatement: 1,
          ForStatement: 1,
          TemplateLiteral: 1,
          AwaitExpression: 1,
          DoWhileStatement: 1,
          ForOfStatement: 1,
          TaggedTemplateExpression: 1,
          ClassExpression: 1,
          OptionalCallExpression: 1,
          JSXExpressionContainer: 1,
          ClassProperty: 1
        };

        let root = path;
        while (root) {
          let parentType = root.parentPath.node.type;
          if (
            parentType == "MemberExpression" ||
            parentType == "OptionalMemberExpression"
          ) {
            root = root.parentPath;
            continue;
          }
          if (CHECK_FOR_UNDEFINED[parentType]) {
            return;
          }
          if (!DO_NOT_WARN_TYPES[parentType]) {
            t.addMarker("testForUnresolved", path.node.loc, parentType);
          }
          break;
        }

        let name = collapseMemberExpression(root.node);
        if (name.startsWith("(")) {
          return;
        }
        let members = name.split(".");
        t.addReference(members, root.node.loc);
      };
      data.classFile._babelClassPlugins = () => plugin;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _onCompiledClass(ev) {
    const data = ev.getData();
    if (data.classFile.getClassName() === 'cv.Application') {
      const currentDir = process.cwd();
      const resourceDir = path.join(currentDir, 'source', 'resource');
      const resources = this._customCompileSettings.hasOwnProperty('additionalResources')
      ? Object.assign(this._customCompileSettings.additionalResources, additionalResources)
        : additionalResources;
      resources.forEach(res => {
        fg.sync(path.join(resourceDir, res)).forEach(file => data.dbClassInfo.assets.push(file.substr(resourceDir.length + 1)));
      });
    }
  }

  async copyFiles (targetDir) {
    const currentDir = process.cwd();
    if (!targetDir) {
      targetDir = this._getTargetDir();
    }
    const command = this._compilerApi.getCommand();
    this._watchList = {};
    const promises = [];
    if (targetDir) {
      const fileList = this._customCompileSettings.hasOwnProperty('filesToCopy')
        ? filesToCopy.concat(this._customCompileSettings.filesToCopy)
        : filesToCopy;
      fileList.forEach(file => {
        const source = path.join(currentDir, 'source', file);
        let target = '';
        if (targetDir.startsWith('/')) {
          target = path.join(targetDir, (file.startsWith('../') ? file.substring(3) : file));
        } else {
          target = path.join(currentDir, targetDir, (file.startsWith('../') ? file.substring(3) : file));
        }
        const stats = fs.statSync(source);
        const dirname = stats.isDirectory() ? target : path.dirname(target);
        fse.ensureDirSync(dirname);

        if (stats.isFile()) {
          promises.push(qx.tool.utils.files.Utils.copyFile(source, target));
        } else {
          promises.push(qx.tool.utils.files.Utils.sync(source, target, this.__filterCopyFiles.bind(this)));
        }
        this._watchList[source] = target;
      });

      // make everything in resource/config writeable
      const configFolder = path.join(currentDir, targetDir, 'resource', 'config');

      // create config/media folder
      const configFolders =[
        path.join(configFolder, 'media'),
        path.join(configFolder, 'backup')
      ];
      configFolders.forEach(folder => {
        fse.ensureDirSync(folder);
      });
      chmodr(configFolder, 0o777, err => {
        if (err) {
          console.log('Failed to execute chmod in resource/config', err);
        }
      });
    }

    if (command.argv.watch) {
      if (this._watcher) {
        this._watcher.close();
      }
      this.__watcherReady = false;
      var watcher = this._watcher = chokidar.watch(Object.keys(this._watchList), {});
      watcher.on('change', filename => this.__onFileChange('change', filename));
      watcher.on('add', filename => this.__onFileChange('add', filename));
      watcher.on('unlink', filename => this.__onFileChange('unlink', filename));
      watcher.on('ready', () => {
        this.__watcherReady = true;
      });
      watcher.on('error', err => {
        console.error(err);
      });
    }

    // copy IconConfig.js to make it available for resource/icons/iconlist.html
    const classTargetDir = path.join(currentDir, targetDir, 'class', 'cv');
    fse.ensureDirSync(classTargetDir);
    fse.copySync(path.join(process.cwd(), 'source', 'class', 'cv', 'IconConfig.js'), path.join(classTargetDir, 'IconConfig.js'));

    if (command.getTargetType() === 'source' || this._customSettings.fakeLogin === 'true') {
      // copy a fake /cgi-bin/l response to the target folder
      fse.copySync(path.join(process.cwd(), 'source', 'resource', 'test'), path.join(targetDir, 'cgi-bin'));
    }
    return Promise.all(promises).catch(e => console.error);
  }

  __filterCopyFiles(from, to) {
    return !this._excludes.some(dir => to.startsWith(dir));
  }

  __onFileChange(type, filename) {
    if (!this.__watcherReady) {
      return;
    }
    let matchPath = filename;
    let changedPath = filename;
    let relativePath = '';
    let matches = this._watchList.hasOwnProperty(changedPath);
    if (!matches) {
      Object.keys(this._watchList).some(function (srcPath) {
        if (filename.startsWith(srcPath)) {
          relativePath = filename.replace(srcPath, '/');
          matchPath = srcPath;
          matches = true;
        }
        return matches;
      });
    }
    if (matches) {
      let target;
      switch (type) {
        case 'change':
        case 'add':
          console.log('copying:');
          console.log(' ->', filename);
          console.log(' <-', path.join(this._watchList[matchPath], relativePath));
          target = path.join(this._watchList[matchPath], relativePath);
          if (this.__filterCopyFiles(filename, target)) {
            qx.tool.utils.files.Utils.copyFile(filename, target);
            if (relativePath.includes('resource/config/')) {
              fs.chmodSync(path.join(this._watchList[matchPath], relativePath), 0o777);
            }
          }
          break;
      }
    } else {
      console.log(this._watchList);
      console.log('unhandled change in', filename);
    }
  }

  /**
   * Executed after the build version has been compiled
   */
  async afterBuild () {
    // build-libs
    console.log('uglifying libraries');
    exec('grunt uglify:libs');

    const targetDir = this._getTargetDir();

    // build-paths
    console.log('update paths');
    exec('./cv build -up -d ' + targetDir);
  }

  updateTestData() {
    if (this._config.environment['cv.testMode']) {
      const testDataFile = path.join(this._getTargetDir(), this._config.environment['cv.testMode']);
      if (fs.existsSync(testDataFile)) {
        // read on current content of resource/config and resource/demo directories and add them to the mockup responses
        // of the demo data
        const demoData = JSON.parse(fs.readFileSync(testDataFile, 'utf8'));
        this.updateFsEntry(path.join(this._getTargetDir(), 'resource', 'config'), '', demoData, {
          readable: true,
          writeable: false,
          trash: false,
          inTrash: false,
          mounted: false
        }, {
          name: 'demo',
          type: 'dir',
          mounted: true,
          parentFolder: '',
          hasChildren: true,
          readable: true,
          writeable: false,
          trash: false,
          inTrash: false
        });

        this.updateFsEntry(path.join(this._getTargetDir(), 'resource', 'demo'), 'demo', demoData, {
          readable: true,
          writeable: false,
          trash: false,
          inTrash: false,
          mounted: true
        });
        const data = JSON.stringify(demoData, null, 2);
        fs.writeFileSync(testDataFile, data, 'utf8');
      } else {
        console.error('test file not found:', testDataFile);
      }
    }
  }


  getFiles (dir) {
    const res = {
      directories: {},
      files: []
    };
    fs.readdirSync(dir).forEach(file => {
      if (!file.startsWith('.')) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
          res.directories[file] = this.getFiles(path.join(dir, file));
        } else {
          res.files.push(file);
        }
      }
    });
    return res;
  }

  updateFsEntry (sourceDir, targetDir, data, defaultSettings, addEntry) {
    const configContent = this.getFiles(sourceDir);
    const body = [];
    configContent.files.forEach(file => {
      body.push(Object.assign({
        type: 'file',
        name: file,
        hasChildren: false,
        parentFolder: targetDir
      }, defaultSettings));
    });
    if (addEntry) {
      body.push(addEntry);
    }
    let traverseSubdirs = [];
    Object.keys(configContent.directories).forEach(dir => {
      const dirContent = configContent.directories[dir];
      const dirEntry = Object.assign({
        type: 'dir',
        name: dir,
        hasChildren: dirContent.files.length > 0 || dirContent.directories.length > 0,
        parentFolder: targetDir
      }, defaultSettings);
      body.push(dirEntry);
      traverseSubdirs.push(dir);
    });
    data.xhr['/rest/manager/index.php/fs?path='+ (targetDir || '.')] = [{
      status: 200,
      headers: {
        'Content-type': 'application/json'
      },
      body: body
    }];

    traverseSubdirs.forEach(dir => {
      this.updateFsEntry(path.join(sourceDir, dir), path.join(targetDir, dir), data, defaultSettings);
    });
  }
}

module.exports = {
  CvCompileHandler: CvCompileHandler
};
