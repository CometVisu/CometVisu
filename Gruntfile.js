// requires
var path = require('path');
var fs = require('fs');


var mocks = [];

function setMimeType() {
  return function(req, res, next) {
    const url = req.url.split('?')[0];
    if (url.endsWith('.xml')) {
      res.setHeader('Content-Type', 'application/xml;charset=UTF-8');
    } else if (url.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json');
    } else if (url.endsWith('.svg')) {
      res.setHeader('Content-Type', 'image/svg+xml');
    } else if (url.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (url.endsWith('.js')) {
      res.setHeader('Content-Type', 'text/javascript');
    } else if (url.endsWith('.png')) {
      res.setHeader('Content-Type', 'image/png');
    } else if (url.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html');
    }
    next();
  }
}
function captureMock(verbose) {
  return function (req, res, next) {
    // match on POST requests starting with /mock
    if (req.url.indexOf('/mock') === 0) {
      const startQS = req.url.indexOf('?');
      // everything after /mock is the path that we need to mock
      var path = decodeURIComponent(req.url.substring(5, startQS > 5 ? startQS : undefined));
      const queryString = {};
      if (startQS>=0) {
        req.url.substr(startQS+1).split('&').map(part => {
          const splitted = part.split('=');
          queryString[splitted[0]] = decodeURIComponent(splitted[1]);
        });
      }
      if (req.method === 'POST') {
        var body = '';
        req.on('data', function (data) {
          body += data;
        });
        req.on('end', function () {

          mocks[path] = Object.assign({content: body}, queryString);
          if (verbose) {
            console.log('\u001b[33;1mRegister ' + Object.keys(mocks).length + '. mock for "' + path + '" with parameters:\u001b[0m',  queryString);
          }
          res.writeHead(200);
          res.end();
        });
        if (mocks.hasOwnProperty(path)) {
          delete mocks[path];
        }
        if (verbose) {
          console.log('\u001b[33;1mRemove mock for "' + path + '", ' + Object.keys(mocks).length + ' mock(s) left.\u001b[0m');
        }
      }
      if (req.method === 'DELETE') {
        if (mocks.hasOwnProperty(path)) {
          delete mocks[path];
        }
        if (verbose) {
          console.log('\u001b[33;1mDelete mock for "' + path + '", ' + Object.keys(mocks).length + ' mock(s) left.\u001b[0m');
        }
        res.writeHead(200);
        res.end();
      }
    } else {
      next();
    }
  };
}

function mock(verbose) {
  return function (req, res, next) {
    var url = req.url;
    var found = url.match(/(\?(_|nocache)=[0-9]+)$/);
    if (found) {
      url = url.replace(found[1],"");
    }
    let mockedResponse;
    if (req.method === 'GET') {
      mockedResponse = mocks[url];
      if (!mockedResponse && (url.includes('?') || url.includes('#'))) {
        // try to find mocked url without querystring
        url = url.split('#')[0];
        url = url.split('?')[0];
        mockedResponse = mocks[url];
      }
    }
    if (!mockedResponse && url.endsWith('.php') && url !== "/designs/get_designs.php" && url.indexOf('/rest/manager/index.php/') < 0) {
      console.log('\u001b[31;1mWARNING: PHP file without mock detected! Most likely you need to provide a fixture! Requested URL: "' + req.url + '"\u001b[0m');
    }
    if (mockedResponse) {
      let mimeType = 'text/plain';
      if (mockedResponse.hasOwnProperty('mimeType')) {
        mimeType = mockedResponse.mimeType;
      } else if (url.endsWith('.xml')) {
        mimeType = 'text/xml;charset=UTF-8';
      } else if (url.endsWith('.json')) {
        mimeType = 'application/json';
      } else if (url.endsWith('.svg')) {
        mimeType = 'image/svg+xml';
      }
      res.writeHead(200, {'Content-Type': mimeType});
      if (verbose) {
        console.log('\u001b[33;1mSent mock for "' + req.url + '" with mimeType "' + mimeType + '"\u001b[0m');
      }
      res.write(mockedResponse.content);
      res.end();
    } else if (url === "/designs/get_designs.php") {
      // untested
      var dir = path.join("source", "resource", "designs");
      var designs = [];
      fs.readdirSync(dir).forEach(function (designDir) {
        var filePath = path.join(dir, designDir);
        var stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          designs.push(designDir);
        }
      });
      res.write(JSON.stringify(designs));
      res.end();
    } else if (url === "/cgi-bin/l") {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({
        v:"0.0.1",
        s:"0"
      }));
      res.end();
    } else if (url.indexOf('/rest/manager/index.php/') >= 0) {
      const relPath = url.substr(url.indexOf('/rest/manager/index.php/') + '/rest/manager/index.php/'.length);
      if (req.method === 'GET') {
        const index = JSON.parse(fs.readFileSync(path.join("source", "test", "fixtures", "rest", "manager", "index.php", "index.json")));
        if (index[relPath]) {
          const data = index[relPath].data;
          res.writeHead(200, {'Content-Type': index[relPath].mimeType || 'application/json'});
          res.write(JSON.stringify(data));
          res.end();
        } else {
          console.log(relPath, 'not found');
          next();
        }
      } else if (req.method === 'PUT') {
        if (relPath.startsWith('/rest/manager/index.php/fs?path=/visu_config_previewtemp.xml')) {
          // we allow writing the previewtemp config to make the preview work correctly
          let body = '';
          req.on('data', function (data) {
            body += data;
          });
          req.on('end', function () {
            fs.writeFileSync(path.join("compiled", "source", "resource", "config", "visu_config_previewtemp.xml"), body);
            res.writeHead(200);
            res.end();
          });
        }
      }
    } else {
      next();
    }
  };
}

function getBuildSuffix(packageVersion) {
  let suffix = packageVersion;
  if (process.env.DEPLOY_NIGHTLY) {
    if (process.env.GITHUB_REF && process.env.GITHUB_REF.startsWith("refs/tags/")) {
      suffix = process.env.GITHUB_REF.split("/").pop();
    } else {
      suffix += "-" + (new Date()).toISOString().split(".")[0].replace(/[\D]/g, "");
    }
    return suffix;
  }
}

// grunt
module.exports = function(grunt) {
  var
    pkg = grunt.file.readJSON('package.json') || {},
    isDirectoryRegEx = /\/$/,
    filesToCompress = [ {
      expand: true,
      cwd: '.',
      src: [
        'AUTHORS', 'ChangeLog', 'COPYING', 'INSTALL.md', 'README.md', 'update.py',
        'release/**'
      ],
      dest: 'cometvisu/',
      mode: function( filename ){
        var isConfig = filename.indexOf( 'release/resource/config' ) > -1;

        if( isDirectoryRegEx.test( filename ) ) {
          return isConfig ? 0777 : 0755;
        }
        return isConfig ? 0666 : 0644;
      }
    } ],
    sourceFiles = [
      'source/class/**/*.js',
      'source/resource/designs/*/design_setup.js',
      'source/resource/plugins/*/*.js'
    ],
    branch = grunt.option('branch');

  var config = {
    // make a zipfile
    compress: {
      qxClient: {
        options: {
          mode: 'gzip',
          level: 9
        },
        files: [{
          src: 'client/compiled/build/qx-CometVisuClient/boot.js',
          dest: "client/build/deploy/qxCometVisuClient-" + getBuildSuffix(pkg.version) + ".js.gz"
        }]
      },
      jqClient: {
        options: {
          mode: 'gzip',
          level: 9
        },
        files: [{
          src: 'client/compiled/build/jQuery-CometVisuClient/boot.js',
          dest: "client/build/deploy/jQueryCometVisuClient-" + getBuildSuffix(pkg.version) + ".js.gz"
        }]
      },
      tar: {
        options: {
          mode: 'tgz',
          level: 9,
          archive: function() {
            return "CometVisu-"+getBuildSuffix(pkg.version)+".tar.gz";
          }
        },
        files: filesToCompress
      },
      zip: {
        options: {
          mode: 'zip',
          level: 9,
          archive: function() {
            return "CometVisu-"+getBuildSuffix(pkg.version)+".zip";
          }
        },
        files: filesToCompress
      }
    },

    clean: {
      archives : ['*.zip', '*.gz'],
      iconcache: ['cache/icons'],
      exampleCache: ['cache/widget_examples/jsdoc'],
      apiDoc: ['doc/api']
    },

    "file-creator": {
      version: {
        "source/version": function(fs, fd, done) {
          fs.writeSync(fd, pkg.version);
          done();
        }
      }
    },

    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: 'tag',
        pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: "RC",
        metadata: '',
        regExp: false
      }
    },

    chmod: {
      options: {
        mode: 'a+w'
      },
      configFiles: {
        // Target-specific file/dir lists and/or options go here.
        src: ['build/resource/config', 'build/resource/config/**']
      }
    },

    // karma unit testing
    karma: {
      unit: {
        configFile: 'source/test/karma/karma.conf.js'
      },
      //continuous integration mode: run tests once in PhantomJS browser.
      ci: {
        configFile: 'source/test/karma/karma.conf.js',
        singleRun: true,
        browsers: [grunt.option('browser') || 'Chrome_ci']
      },
      debug: {
        configFile: 'source/test/karma/karma.conf.js',
        singleRun: !grunt.option('no-single'),
        browsers: [grunt.option('browser') || 'Chrome_ci'],
        reporters: ['spec']
      }
    },

    // start a simple webserver to serve the cometvisu
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
          base: 'compiled',
          middleware : function(connect, options, middlewares) {
            // inject out mockup middlewares before the default ones
            middlewares.unshift(setMimeType());
            middlewares.unshift(mock(grunt.option('verbose')));
            middlewares.unshift(captureMock(grunt.option('verbose')));
            return middlewares;
          }
        }
      }
    },

    // protractor end-to-end tests
    protractor: {
      all: {
        options: {
          configFile: "source/test/protractor/conf.js", // Default config file,
          args: {
            chromeDriver: process.env.WEBDRIVER_PATH
          }
        }
      },
      screenshots: {
        options: {
          configFile: "utils/protractor.conf.js",
          args: {
            params: {
              source: grunt.option('source'),
              subDir: grunt.option('subDir'),
              screenshots: grunt.option('files'),
              target: grunt.option('target'),
              targetDir: grunt.option('targetDir'),
              forced: grunt.option('forced'),
              verbose: grunt.option('verbose'),
              language: grunt.option('lang')
            },
            chromeDriver: process.env.WEBDRIVER_PATH,
            capabilities: grunt.option('verbose') ? {loggingPrefs:{browser: 'ALL'}} : {}
          }
        }
      }
    },

    shell: {
      updateicons: {
        command: [
          'git submodule init',
          'git submodule update',
          'cd external/knx-uf-iconset',
          'git checkout master',
          'git pull',
          'cd ../../'
          // 'git add external/knx-uf-iconset',
          //'git commit -m "icons updated"'
        ].join('&&')
      },
      buildicons: {
        command: [
          './bin/svg-to-ttf --target css --css-namespace knxuf --font-name knx-uf-iconset --glyph-size 1024 external/knx-uf-iconset/raw_svg/',
          'cp knx-uf-iconset.* source/resource/icons/fonts/',
          'rm knx-uf-iconset.*'
        ].join('&&')
      },
      buildClient: {
        command: 'npm run make-client'
      },
      lint: {
        command: 'npm run lint'
      },
      build: {
        command: 'npm run make-cv'
      },
      composerInstallRest: {
        command: 'composer install --prefer-dist --no-dev',
        cwd: 'source/rest/manager'
      }
    },

    scaffold: {
      widgetTest: {
        options: {
          questions: [{
            name: 'widgetName',
            type: 'input',
            message: 'Widget name:'
          }],
          filter: function (result) {
            result.testFileName = result.widgetName.substr(0,1).toUpperCase() + result.widgetName.substr(1);
            return result;
          },
          template: {
            "skeletons/widget-test.js": "source/class/test/structure/pure/{{testFileName}}-spec.js"
          },
          after: function(result) {
            var filename = "source/class/test/structure/pure/"+result.testFileName+"-spec.js";
            var test = grunt.file.read(filename, { encoding: "utf8" }).toString();
            grunt.file.write(filename, test.replace(/%WIDGET_NAME%/g, result.widgetName));
          }
        }
      }
    }
  };
  grunt.initConfig(config);

  // custom task to update the version in the releases demo config
  grunt.registerTask('update-demo-config', function() {
    const baseDir = grunt.option('base-dir') || 'release';
    [
      baseDir + '/resource/demo/visu_config_demo.xml',
      baseDir + '/resource/demo/visu_config_2d3d.xml',
      baseDir + '/resource/demo/visu_config_demo_testmode.xml'
    ].forEach(function (filename) {
      const config = grunt.file.read(filename, { encoding: "utf8" }).toString();
      grunt.file.write(filename, config.replace(/Version:\s[\w\.]+/g, 'Version: '+pkg.version));
    });

    const filename = baseDir + '/index.html';
    config = grunt.file.read(filename, { encoding: "utf8" }).toString();
    grunt.file.write(filename, config.replace(/comet_16x16_000000.png/g, 'comet_16x16_ff8000.png'));
  });

  // custom task to add the KNX user forum icons to the IconConfig.js:
  grunt.registerTask('update-kuf-iconconfig', function() {
    const iconConfigFile = 'source/class/cv/IconConfig.js';
    const cssFile = 'source/resource/icons/fonts/knx-uf-iconset.css';
    const cssSource = grunt.file.read(cssFile, { encoding: "utf8" }).toString();
    const nameRegEx = /\.knxuf-(.*?):before/g;
    let kufIcons = '';
    let icon;
    while( (icon = nameRegEx.exec( cssSource )) !== null ) {
      // icon id = icon[1]
      if( kufIcons !== '' ) {
        kufIcons += ",\n";
      }
      kufIcons += "      '" + icon[1] + "': { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : cv.util.IconTools.svgKUF('" + icon[1] + "') } } }";
    }
    var start = '// Do not remove this line: Dynamic Icons Start';
    var end   = '// Do not remove this line: Dynamic Icons End';
    var iconConfig = grunt.file.read(iconConfigFile, { encoding: "utf8" }).toString();
    grunt.file.write(iconConfigFile, iconConfig
      .replace( new RegExp( start + '[\\s\\S]*' + end, 'm' ), start + "\n\n" + kufIcons + "\n\n      " + end )
    );
  });

    // Load the plugin tasks
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-chmod');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-file-creator');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-scaffold');
  grunt.loadNpmTasks('grunt-shell');

  // Default task runs all code checks, updates the banner and builds the release
  grunt.registerTask('release-build', [ 'release-cv', 'release-client' ]);
  grunt.registerTask('release-cv', [
    'updateicons', 'clean', 'file-creator', 'shell:buildicons', 'shell:composerInstallRest', 'shell:build',
    'update-demo-config', 'chmod', 'compress:tar', 'compress:zip' ]);

  grunt.registerTask('release-client', ['shell:buildClient', 'compress:qxClient', 'compress:jqClient']);

  grunt.registerTask('e2e-chrome', ['connect', 'protractor:all']);
  grunt.registerTask('screenshots', ['connect', 'protractor:screenshots']);

  // update icon submodule
  grunt.registerTask('updateicons', ['shell:updateicons', 'update-kuf-iconconfig']);

  grunt.registerTask('default', 'release-build');
};
