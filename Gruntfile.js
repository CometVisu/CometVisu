var mocks = [];
function captureMock() {
  return function (req, res, next) {

    // match on POST requests starting with /mock
    if (req.method === 'POST' && req.url.indexOf('/mock') === 0) {

      // everything after /mock is the path that we need to mock
      var path = req.url.substring(5);

      var body = '';
      req.on('data', function (data) {
        body += data;
      });
      req.on('end', function () {

        mocks[path] = body;

        res.writeHead(200);
        res.end();
      });
    } else {
      next();
    }
  };
}

function mock() {
  return function (req, res, next) {
    var url = req.url;
    var found = url.match(/(\?_=[0-9]+)$/);
    if (found) {
      url = url.replace(found[1],"");
    }
    var mockedResponse = mocks[url];
    if (mockedResponse) {
      res.write(mockedResponse);
      res.end();
    } else {
      next();
    }
  };
}

module.exports = function(grunt) {
  var 
    pkg = grunt.file.readJSON('package.json') || {},
    isDirectoryRegEx = /\/$/,
    filesToCompress = [ {
      expand: true, 
      cwd: '.', 
      src: [
        'AUTHORS', 'ChangeLog', 'COPYING', 'INSTALL', 'README', 
        'release/config', 
        'release/config/visu_config.xml', 
        'release/config/visu_config_previewtemp.xml', 
        'release/config/structure_custom.js', 
        'release/config/backup', 
        'release/config/media',
        'release/demo/**',
        'release/dependencies/**',
        'release/designs/**',
        'release/editor/**',
        'release/icon/**',
        '!release/icon/knx-uf-iconset/raw_480x480/**',
        '!release/icon/knx-uf-iconset/knx-uf-iconset/**',
        'release/lib/**',
        'release/plugins/**',
        'release/upgrade/**',
        'release/*',
        '!release/build.txt'
      ], 
      dest: 'cometvisu/', 
      mode: function( filename ){
        var isConfig = filename.indexOf( 'release/config' ) > -1;
        
        if( isDirectoryRegEx.test( filename ) )
          return isConfig ? 0777 : 0755;
        return isConfig ? 0666 : 0644;
      }
    } ];

  // Project configuration.
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json') || {},

    // license header adding
    usebanner: {
      dist: {
        options: {
          position: 'top',
          replace: true,
          linebreak: true,
          process: function( filepath ) {
            var filename = filepath.match(/\/([^/]*)$/)[1];
            var modulename = filename.substring(0,1).toUpperCase()+filename.substring(1).replace(".js","");

            return grunt.template.process('/* <%= filename %> \n'+
              ' * \n'+
              ' * copyright (c) 2010-<%= grunt.template.today("yyyy") %> by <%= author %>\n'+
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
              ' *\n'+
              ' * @module <%= modulename %> \n'+
              ' * @title  <%= title %> \n'+
              ' * @version <%= version %>\n'+
              ' */\n', {
                  data: {
                    filename: filename,
                    modulename: modulename,
                    title: "CometVisu " + modulename,
                    author: pkg.authors[0].name+ " ["+pkg.authors[0].email+"]",
                    version: pkg.version
                  }
              }
            );
          }
        },
        files: {
          src: [ 'src/lib/*.js', 'src/structure/pure/*.js' ]
        }
      }
    },

    // appcache
    manifest: {
      generate: {
        options: {
          basePath: 'release/',
          preferOnline: false,
          headcomment: " <%= pkg.name %> v<%= pkg.version %>",
          verbose: true,
          timestamp: true,
          hash: true,
          network: [
            'check_config.php',
            'designs/get_designs.php',
            'config/structure_custom.js',
            'editor/index.php',
            'editor/bin/',
            'editor/dataproviders/',
            'upgrade/',
            'lib/library_version.inc.php',
            '*',
            'http://*',
            'https://*'
          ],
          master: ['index.html']
        },
        src: [
          'index.html',
          'visu_config.xsd',
          'dependencies/require-2.1.15.min.js',
          'dependencies/css.js',
          'icon/*.png',
          //'icon/iconconfig.js',
          'lib/templateengine.js',
          'designs/**/*.*',
          'plugins/**/*.{js,css,png,jpf,ttf,svg,map}'
        ],
        dest: 'release/cometvisu.appcache'
      }
    },

    // the build script
    requirejs: {
      compile: {
        options: {
          baseUrl: './',
          appDir: 'src/',  // relative to baseUrl
          dir: 'release/',
          mainConfigFile: 'src/lib/templateengine.js',
          optimize: 'uglify2',
          generateSourceMaps: true,
          preserveLicenseComments: false,
          removeCombined: true,
          // config options to handle required CSS files:
          separateCSS: true,
          buildCSS: false,
          paths: {
            'css-builder': '../build/css-builder',
            'normalize': '../build/normalize'
          },

          modules: [
            // the main application
            { name: 'lib/templateengine', include: ['css'] },
            // optimize the plugins
            { name: 'plugins/calendarlist/structure_plugin',   exclude: ['structure_custom', 'css', 'normalize']  },
            { name: 'plugins/clock/structure_plugin',          exclude: ['structure_custom', 'css', 'normalize']  },
            { name: 'plugins/colorchooser/structure_plugin',   exclude: ['structure_custom', 'css', 'normalize']  },
            { name: 'plugins/diagram/structure_plugin',        exclude: ['structure_custom', 'css', 'normalize']  },
            { name: 'plugins/gauge/structure_plugin',          exclude: ['structure_custom', 'css', 'normalize']  },
            { name: 'plugins/infoaction/structure_plugin',     exclude: ['structure_custom', 'css', 'normalize']  },
            { name: 'plugins/link/structure_plugin',           exclude: ['structure_custom', 'css', 'normalize']  },
            { name: 'plugins/mobilemenu/structure_plugin',     exclude: ['structure_custom', 'css', 'normalize']  },
            { name: 'plugins/openweathermap/structure_plugin', exclude: ['structure_custom', 'css', 'normalize']  },
            { name: 'plugins/rss/structure_plugin',            exclude: ['structure_custom', 'css', 'normalize']  },
            { name: 'plugins/rsslog/structure_plugin',         exclude: ['structure_custom', 'css', 'normalize']  },
            { name: 'plugins/strftime/structure_plugin',       exclude: ['structure_custom', 'css', 'normalize']  },
            { name: 'plugins/svg/structure_plugin',            exclude: ['structure_custom', 'css', 'normalize']  },
            { name: 'plugins/timeout/structure_plugin',        exclude: ['structure_custom', 'css', 'normalize']  },
            { name: 'plugins/upnpcontroller/structure_plugin', exclude: ['structure_custom', 'css', 'normalize']  }
          ],
          done: function(done, output) {
            var duplicates = require('rjs-build-analysis').duplicates(output);

            if (duplicates.length > 0) {
              grunt.log.subhead('Duplicates found in requirejs build:');
              grunt.log.warn(duplicates);
              return done(new Error('r.js built duplicate modules, please check the excludes option.'));
            }

            done();
          }
        }
      }
    },

    // javascript syntax checker
    jshint: {
      options: {
       // reporter: require('jshint-stylish'),
        ignores: [ "**/dependencies/**", "**/dep/**"]
      },
      all: [ 'src/**/*.js' ]
    },

    // check coding-style: https://github.com/CometVisu/CometVisu/wiki/Coding-style
    jscs: {
      main: {
        options: {
          excludeFiles: [ "**/dependencies/**", "**/dep/**"],
          //preset: "jquery",
          validateIndentation: 2,
          validateLineBreaks: "LF",
          fix: false
          //maximumLineLength : {
          //  value: 120,
          //  allExcept: [
          //    "comments",
          //    "functionSignature"
          //  ]
          //}
        },
        files: {
          src: [ "src/**/*.js"]
        }
      }
    },

    // make a zipfile
    compress: {
      tar: {
        options: {
          mode: 'tgz',
          level: 9,
          archive: function() {
            return "CometVisu-"+pkg.version+".tar.gz";
          }
        },
        files: filesToCompress
      },
      zip: {
        options: {
          mode: 'zip',
          level: 9,
          archive: function() {
            return "CometVisu-"+pkg.version+".zip";
          }
        },
        files: filesToCompress
      }
    },

    'github-release': {
      options: {
        repository: 'cometvisu/cometvisu',
        release: {
          tag_name: pkg.version,
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
      }
    },

    jsdoc : {
      dist : {
        src: [
          'src/lib/**/*.js',
          'src/plugins/**/*.js',
          'src/structure/**/*.js'
        ],
        options: {
          destination: 'doc',
          template : "node_modules/ink-docstrap/template",
          configure : "node_modules/ink-docstrap/template/jsdoc.conf.json"
        }
      }
    },

    clean: {
      archives : ['*.zip', '*.gz'],
      release: ['release/']
    },

    "file-creator": {
      version: {
        "src/version": function(fs, fd, done) {
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
        push: true,
        pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: "rc",
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
        src: ['release/config', 'release/config/**']
      }
    },

    githubChanges: {
      dist : {
        options: {
          // Owner and Repository options are mandatory
          owner : 'CometVisu',
          repository : 'CometVisu',
          branch: 'develop',
          // betweenTags: 'master...develop', // seems to be not supported at the moment
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
        configFile: 'karma.conf.js'
      },
      //continuous integration mode: run tests once in PhantomJS browser.
      travis: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },

    // start a simple webserver to serve the cometvisu
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
          base: "src",
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
        configFile: "test/protractor/conf.js", // Default config file
        args: {
          // Arguments passed to the command
        }
      },
      all: {},
      travis: {
        options: {
          args: {
            capabilities: {
              // phantomjs is not recommended by the protractor team, and chrome seems not wo work on travis
              browserName: 'firefox'
            }
          }
        }
      }
    }
  });

  // custom task to update the version in the releases demo config
  grunt.registerTask('update-demo-config', function() {
    var filename = 'release/demo/visu_config_demo.xml';
    var config = grunt.file.read(filename, { encoding: "utf8" }).toString();
    grunt.file.write(filename, config.replace(/Version:\s[\w\.]+/g, 'Version: '+pkg.version));
    filename = 'release/demo/visu_config_2d3d.xml';
    config = grunt.file.read(filename, { encoding: "utf8" }).toString();
    grunt.file.write(filename, config.replace(/Version:\s[\w\.]+/g, 'Version: '+pkg.version));
    filename = 'release/index.html';
    config = grunt.file.read(filename, { encoding: "utf8" }).toString();
    grunt.file.write(filename, config.replace(/comet_16x16_000000.png/g, 'comet_16x16_ff8000.png'));
  });

  // Load the plugin tasks
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-jscs");
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-github-releaser');
  grunt.loadNpmTasks('grunt-prompt');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-file-creator');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-chmod');
  grunt.loadNpmTasks('grunt-github-changes');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task runs all code checks, updates the banner and builds the release
  //grunt.registerTask('default', [ 'jshint', 'jscs', 'usebanner', 'requirejs', 'manifest', 'compress:tar', 'compress:zip' ]);
  grunt.registerTask('build', [ 'jscs', 'clean', 'file-creator', 'requirejs', 'manifest', 'update-demo-config', 'chmod', 'compress:tar', 'compress:zip' ]);
  grunt.registerTask('lint', [ 'jshint', 'jscs' ]);

  grunt.registerTask('release', [ 'prompt', 'build', 'github-release' ]);
  grunt.registerTask('e2e', ['connect', 'protractor:travis']);

  grunt.registerTask('default', 'build');
};