// requires
var path = require('path');
var fs = require('fs');


var mocks = [];
function captureMock() {
  return function (req, res, next) {

    // match on POST requests starting with /mock
    if (req.url.indexOf('/mock') === 0) {
      // everything after /mock is the path that we need to mock
      var path = req.url.substring(5);
      if (req.method === 'POST') {
        var body = '';
        req.on('data', function (data) {
          body += data;
        });
        req.on('end', function () {

          mocks[path] = body;

          res.writeHead(200);
          res.end();
        });
        if (mocks.hasOwnProperty(path)) {
          delete mocks[path];
        }
        res.writeHead(200);
        res.end();
      }
    } else {
      next();
    }
  };
}

function mock() {
  return function (req, res, next) {
    var url = req.url;
    var found = url.match(/(\?(_|nocache)=[0-9]+)$/);
    if (found) {
      url = url.replace(found[1],"");
    }
    var mockedResponse = mocks[url];
    if (!mockedResponse && (url.includes('?') || url.includes('#'))) {
      // try to find mocked url without querystring
      url = url.split('#')[0];
      url = url.split('?')[0];
      mockedResponse = mocks[url];
    }
    if (mockedResponse) {
      if (req.url.endsWith('.xml')) {
        res.writeHead(200, {'Content-Type': 'application/xml'});
      } else if (req.url.endsWith('.json')) {
        res.writeHead(200, {'Content-Type': 'application/json'});
      }
      res.write(mockedResponse);
      res.end();
    } else if (url === "/designs/get_designs.php") {
      // untested
      var dir = path.join("source", "resource", "designs");
      var designs = [];
      fs.readdirSync(dir).forEach(function(designDir) {
        var filePath = path.join(dir, designDir);
        var stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          designs.push(designDir);
        }
      });
      res.write(JSON.stringify(designs));
      res.end();
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

    // license header adding
    usebanner: {
      dist: {
        options: {
          position: 'top',
          replace: true,
          linebreak: true,
          process: function( filepath ) {
            var filename = filepath.match(/\/([^/]*)$/)[1];
            if (filename === "__init__.js") { return ""; }

            return grunt.template.process('/* <%= filename %> \n'+
              ' * \n'+
              ' * copyright (c) 2010-<%= grunt.template.today("yyyy") %>, Christian Mayer and the CometVisu contributers.\n'+
              ' * \n'+
              ' * This program is free software; you can redistribute it and/or modify it\n'+
              ' * under the terms of the GNU General Public License as published by the Free\n'+
              ' * Software Foundation; either version 3 of the License, or (at your option)\n'+
              ' * any later version.\n'+
              ' *\n'+
              ' * This program is distributed in the hope that it will be useful, but WITHOUT\n'+
              ' * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or\n'+
              ' * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for\n'+
              ' * more details.\n'+
              ' *\n'+
              ' * You should have received a copy of the GNU General Public License along\n'+
              ' * with this program; if not, write to the Free Software Foundation, Inc.,\n'+
              ' * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA\n'+
              ' */\n', {
                data: {
                  filename: filename,
                  author: pkg.authors[0].name+ " ["+pkg.authors[0].email+"]",
                  version: pkg.version
                }
              }
            );
          }
        },
        files: {
          src: sourceFiles
        }
      }
    },

    // minify svg icons
    svgmin: {
      options: {
        plugins: [
          {
            convertTransform: false
          }, {
            removeViewBox: false
          }, {
            removeDimensions: true
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'external/knx-uf-iconset/raw_svg/',
            src: '*.svg',
            dest: 'cache/icons/'
          }
        ]
      }
    },

    // build icons
    svgstore: {
      options: {
        prefix : 'kuf-', // This will prefix each <g> ID
        includeTitleElement: false
      },
      default : {
        files: {
          'source/resource/icons/knx-uf-iconset.svg': [
            'cache/icons/*.svg'
          ]
        }
      }
    },

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

    'github-release': {
      options: {
        repository: 'cometvisu/cometvisu',
        release: {
          tag_name: 'v' + pkg.version,
          name: pkg.version,
          body: pkg.description
        }
      },
      files: {
        src: [ "CometVisu-"+pkg.version+".zip", "CometVisu-"+pkg.version+".tar.gz" ]
      }
    },
    prompt: {
      target: {
        options: {
          questions: [
            {
              config: 'github-release.options.auth.user', // set the user to whatever is typed for this question
              type: 'input',
              message: 'GitHub username:'
            },
            {
              config: 'github-release.options.auth.password', // set the password to whatever is typed for this question
              type: 'password',
              message: 'GitHub password:'
            }
          ]
        }
      },
      githubChanges: {
        options: {
          questions: [
            {
              config: 'githubChanges.dist.options.token', // get personal GitHub tokel to bypass API rate limiting
              type: 'input',
              message: 'GitHub personal token:'
            }
          ]
        }
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

    githubChanges: {
      dist : {
        options: {
          // Owner and Repository options are mandatory
          owner : 'CometVisu',
          repository : 'CometVisu',
          tagName: 'v' + pkg.version,
          auth: true,
          token: '', // this will be replaces by the prompt task with the user input
          branch: branch || 'develop',
          betweenTags: 'master...' + (branch || 'develop'),
          onlyPulls: true,
          useCommitBody: true,
          // auth: true, // auth creates a stall for me :(
          file: 'ChangeLog.tmp',
          verbose: true
        }
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
            middlewares.unshift(captureMock());
            middlewares.unshift(mock());
            return middlewares;
          }
        }
      }
    },

    // protractor end-to-end tests
    protractor: {
      options: {
        configFile: "source/test/protractor/conf.js", // Default config file
        args: {
          // Arguments passed to the command
        }
      },
      all: {},
      ci: {
        options: {
          args: {
            capabilities: {
              // phantomjs is not recommended by the protractor team, and chrome seems not to work in ci
              browserName: 'firefox'
            }
          }
        }
      },
      screenshots: {
        options: {
          configFile: "utils/protractor.conf.js",
          args: {
            params: {
              subDir: grunt.option('subDir'),
              screenshots: grunt.option('files'),
              target: grunt.option('target')
            }
          }
        }
      },
      screenshotsSource: {
        options: {
          configFile: "utils/protractor.conf.js",
          args: {
            params: {
              subDir: "source"
            },
            capabilities: {
              browserName: grunt.option('browserName') || 'firefox',
              marionette: true
            }
          }
        }
      },
      screenshotsManual: {
        options: {
          configFile: "utils/protractor.conf.js",
          args: {
            params: {
              subDir: "manual"
            },
            capabilities: {
              browserName: grunt.option('browserName') || 'firefox',
              marionette: true
            }
          }
        }
      }
    },

    coveralls: {
      options: {
        debug: true,
        coverageDir: 'coverage',
        dryRun: false,
        force: true,
        recursive: true
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
      buildClient: {
        command: 'npm run make-client'
      },
      lint: {
        command: 'npm run lint'
      },
      build: {
        command: 'npm run make-cv'
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
    },
    composer : {
      rest: {
        options : {
          flags: ['prefer-dist', 'no-dev'],
          cwd: 'source/rest/manager'
        }
      }
    }
  };
  grunt.initConfig(config);

  grunt.registerTask('get-branch', function () {
    var done = this.async();
    if (!branch) {
      var args = ['symbolic-ref', 'HEAD', '--short'];
      grunt.util.spawn({
        cmd: 'git',
        args: args
      }, function (error, result) {
        if (error) {
          grunt.log.error([error]);
          return false;
        }
        branch = result.stdout;
        console.log(branch);
        grunt.config.set('githubChanges.dist.options.branch', branch);
        grunt.config.set('githubChanges.dist.options.betweenTags', 'master...' + branch);
        done();
      });
    } else {
      done();
    }
  });

  // custom task to update the version in the releases demo config
  grunt.registerTask('update-demo-config', function() {
    [
      'compiled/build/resource/demo/visu_config_demo.xml',
      'compiled/build/resource/demo/visu_config_2d3d.xml',
      'compiled/build/resource/demo/visu_config_demo_testmode.xml'
    ].forEach(function (filename) {
      var config = grunt.file.read(filename, { encoding: "utf8" }).toString();
      grunt.file.write(filename, config.replace(/Version:\s[\w\.]+/g, 'Version: '+pkg.version));
    });

    var filename = 'compiled/build/index.html';
    config = grunt.file.read(filename, { encoding: "utf8" }).toString();
    grunt.file.write(filename, config.replace(/comet_16x16_000000.png/g, 'comet_16x16_ff8000.png'));
  });

  grunt.registerTask('update-demo-config-source', function() {
    [
      'compiled/source/resource/demo/visu_config_demo.xml',
      'compiled/source/resource/demo/visu_config_2d3d.xml',
      'compiled/source/resource/demo/visu_config_demo_testmode.xml'
    ].forEach(function (filename) {
      var config = grunt.file.read(filename, { encoding: "utf8" }).toString();
      grunt.file.write(filename, config.replace(/Version:\s[\w\.]+/g, 'Version: '+pkg.version));
    });

    var filename = 'compiled/source/index.html';
    config = grunt.file.read(filename, { encoding: "utf8" }).toString();
    grunt.file.write(filename, config.replace(/comet_16x16_000000.png/g, 'comet_16x16_ff8000.png'));
  });

  // custom task to fix the KNX user forum icons and add them to the iconconfig.js:
  // - replace #FFFFFF with the currentColor
  // - fix viewBox to follow the png icon version
  grunt.registerTask('handle-kuf-svg', function() {
    var filename   = 'source/resource/icons/knx-uf-iconset.svg';
    var iconconfig = 'source/class/cv/IconConfig.js';
    var svg = grunt.file.read(filename, { encoding: "utf8" }).toString();
    grunt.file.write(filename, svg
      .replace( /#FFFFFF|#fff/g, 'currentColor' )
      .replace( /viewBox="0 0 361 361"/g, 'viewBox="30 30 301 301"' ) // emulate a shave 40 on a 480px image
    );

    var symbolRegEx = /<symbol.*?id="kuf-(.*?)".*?>/g;
    var kufIcons = '';
    var icon;
    while( (icon = symbolRegEx.exec( svg )) !== null )
    {
      // icon id = icon[1]

      if( kufIcons !== '' ) {
        kufIcons += ",\n";
      }
      kufIcons += "      '" + icon[1] + "': { '*' : { 'white' : '*/white', 'ws' : '*/white', 'antimony' : '*/blue', 'boron' : '*/green', 'lithium' : '*/red', 'potassium' : '*/purple', 'sodium' : '*/orange', '*': { '*' : cv.util.IconTools.svgKUF('" + icon[1] + "') } } }";
    }
    var start = '// Do not remove this line: Dynamic Icons Start';
    var end   = '// Do not remove this line: Dynamic Icons End';
    var iconconfigFile = grunt.file.read(iconconfig, { encoding: "utf8" }).toString();
    grunt.file.write(iconconfig, iconconfigFile
      .replace( new RegExp( start + '[\\s\\S]*' + end, 'm' ), start + "\n\n" + kufIcons + "\n\n      " + end )
    );
  });

  // Load the plugin tasks
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-github-releaser');
  grunt.loadNpmTasks('grunt-prompt');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-file-creator');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-chmod');
  grunt.loadNpmTasks('grunt-github-changes');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-karma-coveralls');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-scaffold');
  grunt.loadNpmTasks('grunt-composer');

  // Default task runs all code checks, updates the banner and builds the release
  grunt.registerTask('buildicons', ['clean:iconcache', 'svgmin', 'svgstore', 'handle-kuf-svg']);
  grunt.registerTask('release-build', [ 'release-cv', 'release-client' ]);
  grunt.registerTask('release-cv', [
    'updateicons', 'shell:lint', 'clean', 'file-creator', 'buildicons', 'composer:rest:install', 'shell:build',
    'update-demo-config', 'chmod', 'compress:tar', 'compress:zip' ]);

  grunt.registerTask('release-client', ['shell:buildClient', 'compress:qxClient', 'compress:jqClient']);

  grunt.registerTask('release', [ 'prompt', 'release-build', 'github-release' ]);
  grunt.registerTask('e2e', ['connect', 'protractor:ci']);
  grunt.registerTask('e2e-chrome', ['connect', 'protractor:all']);
  grunt.registerTask('screenshots', ['connect', 'protractor:screenshots']);
  grunt.registerTask('screenshotsSource', ['connect', 'protractor:screenshotsSource']);
  grunt.registerTask('screenshotsManual', ['connect', 'protractor:screenshotsManual']);
  grunt.registerTask('changelog', ['get-branch', 'prompt:githubChanges', 'githubChanges']);

  // update icon submodule
  grunt.registerTask('updateicons', ['shell:updateicons']);

  grunt.registerTask('default', 'release-build');
};
