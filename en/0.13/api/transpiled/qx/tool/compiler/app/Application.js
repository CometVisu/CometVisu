(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.lang.Array": {
        "construct": true
      },
      "qx.lang.Type": {
        "construct": true
      },
      "qx.tool.compiler.Console": {},
      "qx.tool.utils.IndexedArray": {},
      "qx.core.Assert": {},
      "qx.tool.utils.Values": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
   *
   *    qooxdoo-compiler - node.js based replacement for the Qooxdoo python
   *    toolchain
   *
   *    https://github.com/qooxdoo/qooxdoo
   *
   *    Copyright:
   *      2011-2017 Zenesis Limited, http://www.zenesis.com
   *
   *    License:
   *      MIT: https://opensource.org/licenses/MIT
   *
   *      This software is provided under the same licensing terms as Qooxdoo,
   *      please see the LICENSE file in the Qooxdoo project's top-level directory
   *      for details.
   *
   *    Authors:
   *      * John Spackman (john.spackman@zenesis.com, @johnspackman)
   *
   * *********************************************************************** */

  var path = require("upath");
  qx.Class.define("qx.tool.compiler.app.Application", {
    extend: qx.core.Object,
    /**
     * Constructor
     * @param classname {String|String[]} [, classname...]
     */
    construct: function construct(classname) {
      qx.core.Object.constructor.call(this);
      this.initType();
      var args = qx.lang.Array.fromArguments(arguments);
      var t = this;
      this.__P_484_0 = [];
      args.forEach(function (arg) {
        if (qx.lang.Type.isArray(arg)) {
          qx.lang.Array.append(t.__P_484_0, arg);
        } else {
          t.__P_484_0.push(arg);
        }
      });
      this.set({
        include: [],
        exclude: []
      });
    },
    properties: {
      /**
       * The type of application to generate; note that changing this will change the `loaderTemplate`
       * and `theme` properties
       */
      type: {
        init: "browser",
        check: ["browser", "rhino", "node"],
        apply: "_applyType"
      },
      /**
       * Environment property map
       */
      environment: {
        init: null,
        nullable: true
      },
      /**
       * The Analyser instance
       */
      analyser: {
        init: null,
        nullable: true
      },
      /**
       * Application theme (class name)
       */
      theme: {
        init: "qx.theme.Simple",
        check: "String"
      },
      /**
       * The name of the application, used for script directory file unless outputPath is set
       */
      name: {
        init: "index",
        nullable: false,
        check: "String"
      },
      /**
       * The human readable, customer facing title of the application - it's used to customise the title
       * of the index.html page
       */
      title: {
        init: null,
        nullable: true,
        check: "String"
      },
      /**
       * The human readable, customer facing description of the application - it's used to list applications
       * in `qx serve`
       */
      description: {
        init: null,
        nullable: true,
        check: "String"
      },
      /**
       * Output path, relative to the target's output path
       */
      outputPath: {
        init: null,
        nullable: true,
        check: "String"
      },
      /**
       * Boot path, relative to the target's output path
       */
      bootPath: {
        init: null,
        nullable: true,
        check: "String"
      },
      /**
       * template path
       */
      templatePath: {
        init: "",
        nullable: false,
        check: "String",
        apply: "_applyType"
      },
      /**
       * Whether this app is to be published (e.g. in the PackageBrowser).
       * Default is true.
       */
      publish: {
        check: "Boolean",
        init: true
      },
      /**
       * Whether this app is to be deployed
       * Default is true.
       */
      deploy: {
        check: "Boolean",
        init: true
      },
      /**
       * Whether this app can run on its own (true, default) or is part of another
       * application (false)
       */
      standalone: {
        check: "Boolean",
        init: true
      },
      /**
       * Classes to include with the build
       */
      include: {
        nullable: false,
        check: "Array",
        transform: "__P_484_1"
      },
      /**
       * Classes to exclude when building
       */
      exclude: {
        nullable: false,
        check: "Array",
        transform: "__P_484_1"
      },
      /**
       * Classes to bundle together for delivery to the client
       */
      bundleInclude: {
        init: null,
        nullable: true,
        check: "Array",
        transform: "__P_484_1"
      },
      /**
       * Classes to exclude from bundling together for delivery to client
       */
      bundleExclude: {
        init: null,
        nullable: true,
        check: "Array",
        transform: "__P_484_1"
      },
      /**
       * Template file used to create index.js; note that this is changed when the `type` property
       * is changed
       */
      loaderTemplate: {
        nullable: false,
        check: "String"
      },
      /**
       * Writes the index.html into root instead of app dir
       */
      writeIndexHtmlToRoot: {
        init: false,
        check: "Boolean"
      },
      /**
       * Map specifying local modules to include in the build. Local modules are
       * always included in the compiled output, regardless of application type
       * (node, browser, etc.). Each member of the map has a key that is the
       * name of the module to be `require`d in code. The value is the path to
       * the module to be included. The path must begin with "./", and is
       * relative to the directory containing compile.json. The module may be
       * either a CommonJS module or an ES6 module.
       */
      localModules: {
        init: null,
        check: "Object"
      }
    },
    members: {
      __P_484_2: null,
      __P_484_3: null,
      __P_484_4: null,
      __P_484_5: null,
      __P_484_0: null,
      __P_484_6: null,
      /**
       * Checks if the application is for browser
       *
       * @returns boolean
       */
      isBrowserApp: function isBrowserApp() {
        return this.getType() === "browser";
      },
      /**
       * Calculates the dependencies of the classes to create a load order
       */
      calcDependencies: function calcDependencies() {
        var t = this;
        var Console = qx.tool.compiler.Console.getInstance();
        var analyser = this.getAnalyser();
        var db = analyser.getDatabase();
        var allDeps = new qx.tool.utils.IndexedArray();
        var exclude = {};
        var fatalCompileErrors = [];
        this.__P_484_2 = null;
        var partsByName = {};
        var parts = [];
        var bootPart = null;
        var classDataByClassname = {};
        if (this.__P_484_3 && this.__P_484_3.length) {
          parts = [];
          t.__P_484_3.forEach(function (part) {
            if (partsByName[part.getName()]) {
              throw new Error(Console.decode("qx.tool.compiler.application.duplicatePartNames", part.getName()));
            }
            var partData = {
              name: part.getName(),
              include: part.getInclude(),
              exclude: part.getExclude(),
              classes: [],
              dependsOn: {},
              combine: part.getCombine(),
              minify: part.getMinify()
            };
            partData.match = qx.tool.compiler.app.Application.createWildcardMatchFunction(part.getInclude(), part.getExclude());
            partsByName[part.getName()] = partData;
            parts.push(partData);
          });
          bootPart = partsByName.boot;
          if (!bootPart) {
            throw new Error(Console.decode("qx.tool.compiler.application.noBootPart"));
          }
        } else {
          bootPart = {
            name: "boot",
            include: ["*"],
            exclude: [],
            classes: [],
            dependsOn: {},
            combine: false,
            minify: false,
            match: function match() {
              return true;
            }
          };
          partsByName.boot = bootPart;
          parts.push(bootPart);
        }
        function createClassData(classname) {
          if (classDataByClassname[classname]) {
            return classDataByClassname[classname];
          }
          var classData = classDataByClassname[classname] = {
            classname: classname,
            parts: {},
            best: null,
            actual: null
          };
          parts.forEach(function (part) {
            if (part === bootPart) {
              return;
            }
            var result = part.match(classname);
            if (result !== null) {
              classData.parts[part.name] = result;
              var lastMatch = classData.best && classData.parts[classData.best.name];
              if (lastMatch === undefined || lastMatch === null) {
                classData.best = part;

                // Exact
              } else if (lastMatch === "exact") {
                if (result === "exact") {
                  Console.print("qx.tool.compiler.application.conflictingExactPart", classname, part.name, classData.best.name);
                }

                // Wildcard
              } else {
                qx.core.Assert.assertTrue(typeof lastMatch == "number");
                if (result === "exact") {
                  classData.best = part;
                  classData.exact = true;
                } else {
                  qx.core.Assert.assertTrue(typeof result == "number");
                  if (lastMatch === result) {
                    Console.print("qx.tool.compiler.application.conflictingBestPart", classname, part.name, classData.best.name);
                  } else if (lastMatch < result) {
                    classData.best = part;
                  }
                }
              }
            }
          });
          return classData;
        }
        var needed = new qx.tool.utils.IndexedArray();
        var neededIndex = 0;
        var stack = new qx.tool.utils.IndexedArray();

        /*
         * We could say that when a class is `.require`d, then we treat any of it's `construct:true` dependencies as `require:true`
         * The problem is given this example:
         *    qx.core.Init.defer()
         *      qx.event.Registration.addListener
         *        qx.event.Registration.getManager
         *          qx.event.Manager.construct
         *            new qx.util.DeferredCall
         *
         *    new qx.util.DeferredCall is a runtime only dependency so is not available.
         *
         * So the theory is that deferred calls tend to be about initialisation, so prioritising constructor dependencies
         * may be helpful
         */

        /*
         * Recursively finds all the dependencies for a class which have not already been added
         * to the list of classes to load.
         *
         *  @param classname {String}
         *  @param deps {String[]} array to modify
         */
        function compileAllRemainingDeps(classname, deps) {
          var checked = {};
          var depNames = {};
          depNames[classname] = true;
          function search(classname) {
            if (checked[classname]) {
              return;
            }
            checked[classname] = true;
            var info = db.classInfo[classname];
            if (info && info.dependsOn) {
              for (var depName in info.dependsOn) {
                var dd = info.dependsOn[depName];
                if (dd.load || dd.require || dd.defer || dd.construct) {
                  if (!allDeps.contains(depName)) {
                    depNames[depName] = true;
                  }
                  search(depName);
                }
              }
            }
          }
          search(classname);
          for (var depName in depNames) {
            deps.push(depName);
          }
        }
        var addDepDepth = 0;
        function addDep(classname) {
          if (exclude[classname]) {
            return;
          }
          if (allDeps.contains(classname) || stack.contains(classname)) {
            return;
          }
          var info = db.classInfo[classname];
          if (!info) {
            return;
          }
          if (info.fatalCompileError) {
            fatalCompileErrors.push(classname);
          }
          addDepDepth++;
          var environmentLoadDeps = {};
          if (info.environment && info.environment.required) {
            for (var key in info.environment.required) {
              var envInfo = info.environment.required[key];
              if (envInfo.defer) {
                environmentLoadDeps[envInfo.className] = true;
              }
            }
          }
          var deferDeps = [];
          if (info.dependsOn) {
            stack.push(classname);
            for (var depName in info.dependsOn) {
              var dd = info.dependsOn[depName];
              if (dd.load || dd.require || environmentLoadDeps[depName]) {
                addDep(depName);
              } else if (dd.defer) {
                deferDeps.push(depName);
              } else if (!allDeps.contains(depName)) {
                needed.push(depName);
              }
            }
            stack.remove(classname);
          }
          if (parts && !allDeps.contains(classname)) {
            var classData = createClassData(classname);
            var part = classData.best || bootPart;
            part.classes.push(classname);
            classData.actual = part;
            if (info.externals) {
              if (part.externals === undefined) {
                part.externals = [];
              }
              info.externals.forEach(function (external) {
                if (part.externals.indexOf(external) < 0) {
                  part.externals.push(external);
                }
              });
            }
          }
          allDeps.push(classname);
          deferDeps.forEach(function (depName) {
            var deps = [];
            compileAllRemainingDeps(depName, deps);
            deps.forEach(addDep);
          });
          if (addDepDepth === 1) {
            while (neededIndex < needed.getLength()) {
              classname = needed.getItem(neededIndex++);
              addDep(classname);
            }
          }
          addDepDepth--;
        }
        exclude = {};
        t.__P_484_7(t.getExclude()).forEach(function (name) {
          return exclude[name] = true;
        });

        // Start the ball rolling
        addDep("qx.core.Object");
        t.getRequiredClasses().forEach(function (classname) {
          addDep(classname);
        });
        if (t.getTheme()) {
          addDep(t.getTheme());
        }
        /*
        parts.forEach((part) => {
          if (part !== bootPart) {
            t.__expandClassnames(part.include).forEach((name) => addDep(name));
          }
        });
        */

        while (neededIndex < needed.length) {
          var classname = needed[neededIndex++];
          addDep(classname);
        }
        if (parts && parts.length > 1) {
          // Calculate inter-part dependencies
          parts.forEach(function (part) {
            var checked = {};
            function check(classname) {
              if (checked[classname]) {
                return;
              }
              checked[classname] = true;
              var classData = classDataByClassname[classname];
              if (classData.actual !== part) {
                part.dependsOn[classData.actual.name] = true;
              }
              for (var depName in db.classInfo.dependsOn) {
                check(depName);
              }
            }
            part.classes.forEach(check);
            part.dependsOn = Object.keys(part.dependsOn);
          });

          // Check for recursive dependencies
          parts.forEach(function (part) {
            var checked = {};
            function check(partname) {
              if (checked[partname]) {
                return false;
              }
              checked[partname] = true;
              var checkPart = partsByName[partname];
              if (checkPart === part) {
                return true;
              }
              return part.dependsOn.some(check);
            }
            if (part.dependsOn.some(check)) {
              Console.print("qx.tool.compiler.application.partRecursive", part.name);
            }
          });
        }

        /*
         * Done
         */

        this.__P_484_2 = allDeps.toArray();
        var requiredLibs = {};
        this.__P_484_2.forEach(function (classname) {
          var classInfo = db.classInfo[classname];
          if (classInfo.assets) {
            classInfo.assets.forEach(function (asset) {
              var pos = asset.indexOf("/");
              if (pos > -1) {
                var ns = asset.substring(0, pos);
                if (analyser.findLibrary(ns)) {
                  requiredLibs[ns] = true;
                }
              }
            });
          }
          requiredLibs[classInfo.libraryName] = true;
        });
        this.__P_484_4 = [];
        for (var ns in requiredLibs) {
          if (analyser.findLibrary(ns)) {
            this.__P_484_4.push(ns);
          } else {
            Console.print("qx.tool.compiler.application.missingRequiredLibrary", ns);
          }
        }
        this.__P_484_6 = parts;
        this.__P_484_5 = fatalCompileErrors.length ? fatalCompileErrors : null;
      },
      /**
       * Gets a list of class names that this Application requires which have fatal compile errors
       *
       * @return {String[]}
       */
      getFatalCompileErrors: function getFatalCompileErrors() {
        return this.__P_484_5;
      },
      /**
       * Gets a list of URIs for classes that are required, in load order
       *
       * @returns {String[]}
       */
      getUris: function getUris() {
        var uris = [];
        var db = this.getAnalyser().getDatabase();
        function add(classname) {
          var def = db.classInfo[classname];
          uris.push(def.libraryName + ":" + classname.replace(/\./g, "/") + ".js");
        }
        this.__P_484_2.forEach(add);
        return uris;
      },
      /**
       * Gets a list of classnames that are required, in load order
       *
       * @returns {String[]}
       */
      getDependencies: function getDependencies() {
        return this.__P_484_2;
      },
      /**
       * Gets the parts dependencies structures
       *
       * @returns {Object[]}
       */
      getPartsDependencies: function getPartsDependencies() {
        return this.__P_484_6;
      },
      /**
       * Returns a list of library names which are required by the application
       *
       * @returns {String[]}
       */
      getRequiredLibraries: function getRequiredLibraries() {
        return this.__P_484_4;
      },
      /**
       * Returns a list of all of the assets required by all classes
       * @param target {qx.tool.compiler.targets.Target} the current target
       * @param resManager  {qx.tool.compiler.resources.Manager} the resource manager
       * @param environment {Map} environment
       */
      getAssetUris: function getAssetUris(target, resManager, environment) {
        var assets = [];
        var analyser = this.getAnalyser();
        var db = analyser.getDatabase();

        // Compile theme resource aliases
        var aliases = {};
        function getAliases(classname) {
          var tmp = db.classInfo[classname];
          if (tmp) {
            if (tmp.aliases) {
              for (var alias in tmp.aliases) {
                aliases[alias] = tmp.aliases[alias];
              }
            }
            if (tmp["extends"]) {
              getAliases(tmp["extends"]);
            }
          }
        }
        var themeInfo = db.classInfo[this.getTheme()];
        if (themeInfo && themeInfo.themeMeta) {
          for (var name in themeInfo.themeMeta) {
            getAliases(themeInfo.themeMeta[name]);
          }
        }

        // Get a list of libraries used
        var libraryLookup = {};

        // Check all the classes
        var classNames = this.__P_484_2.slice();
        for (var i = 0; i < classNames.length; i++) {
          var classname = classNames[i];
          var classInfo = db.classInfo[classname];
          var tmp = classInfo.assets;
          if (tmp) {
            tmp.forEach(function (uri) {
              var pos = uri.indexOf("/");
              if (pos > -1) {
                var prefix = uri.substring(0, pos);
                var mappedPrefix = aliases[prefix];
                if (mappedPrefix) {
                  uri = mappedPrefix + uri.substring(pos);
                }
              }
              resManager.findLibrariesForResource(uri).forEach(function (library) {
                return assets.push(library.getNamespace() + ":" + uri);
              });
            });
          }
          if (!libraryLookup[classInfo.libraryName]) {
            libraryLookup[classInfo.libraryName] = analyser.findLibrary(classInfo.libraryName);
          }
        }
        var rm = analyser.getResourceManager();
        function addExternalAssets(arr, msgId) {
          if (arr) {
            arr.forEach(function (filename) {
              if (!filename.match(/^https?:/)) {
                var asset = rm.getAsset(filename);
                if (asset) {
                  var str = asset.getDestFilename(target);
                  str = path.relative(path.join(target.getOutputDir(), "resource"), str);
                  assets.push(asset.getLibrary().getNamespace() + ":" + str);
                } else {
                  qx.tool.compiler.Console.print(msgId, filename);
                }
              }
            });
          }
        }
        for (var _name in libraryLookup) {
          var lib = libraryLookup[_name];
          if (lib) {
            addExternalAssets(lib.getAddScript(), "qx.tool.compiler.application.missingScriptResource");
            addExternalAssets(lib.getAddCss(), "qx.tool.compiler.application.missingCssResource");
          }
        }

        // Expand variables
        for (var _i = 0; _i < assets.length; _i++) {
          var asset = assets[_i];
          var m = asset.match(/\$\{([^}]+)\}/);
          if (m) {
            var match = m[0];
            var capture = m[1];
            var pos = asset.indexOf(match);
            var left = asset.substring(0, pos);
            var right = asset.substring(pos + match.length);
            var value = environment[capture];
            if (value !== undefined) {
              if (qx.lang.Type.isArray(value)) {
                value.forEach(function (value) {
                  assets.push(left + value + right);
                });
              } else {
                assets.push(left + value + right);
              }
            }
            qx.lang.Array.removeAt(assets, _i--);
          }
        }

        // Remove duplicates and overlapping path wildcards
        assets.sort();
        for (var _i2 = 1; _i2 < assets.length; _i2++) {
          var _asset = assets[_i2];
          var lastAsset = assets[_i2 - 1];
          if (_asset == lastAsset) {
            assets.splice(_i2--, 1);
            continue;
          }
          if (lastAsset[lastAsset.length - 1] == "*") {
            var filename = lastAsset.substring(0, lastAsset.length - 1);
            if (_asset.substring(0, filename.length) == filename) {
              assets.splice(_i2--, 1);
              continue;
            }
          }
        }
        return assets;
      },
      /**
       * Returns a list of fonts required by the application, where the font is detailed in Manifest.json
       * in `provides.fonts`
       *
       * @returns {String[]}
       */
      getFonts: function getFonts() {
        var fonts = {};
        var analyser = this.getAnalyser();
        var db = analyser.getDatabase();
        this.__P_484_2.forEach(function (classname) {
          var classInfo = db.classInfo[classname];
          if (classInfo.fonts) {
            classInfo.fonts.forEach(function (fontName) {
              return fonts[fontName] = true;
            });
          }
        });
        return Object.keys(fonts);
      },
      /**
       * Returns the class name for the application
       * @returns {String}
       */
      getClassName: function getClassName() {
        return this.__P_484_0[0];
      },
      /**
       * Returns the classes required for the application
       * @returns {String[]}
       */
      getRequiredClasses: function getRequiredClasses() {
        var result = {};
        this.__P_484_0.forEach(function (name) {
          return result[name] = true;
        });
        this.__P_484_7(this.getInclude()).forEach(function (name) {
          return result[name] = true;
        });
        this.__P_484_7(this.getExclude()).forEach(function (name) {
          return delete result[name];
        });

        // We sort the result so that we can get a consistent ordering for loading classes, otherwise the order in
        //  which the filing system returns the files can cause classes to be loaded in a lightly different sequence;
        //  that would not cause a problem, except that the build is not 100% repeatable.
        return Object.keys(result).sort();
      },
      /**
       * Adds a part
       * @param part {Part} the part to add
       */
      addPart: function addPart(part) {
        if (!this.__P_484_3) {
          this.__P_484_3 = [];
        }
        this.__P_484_3.push(part);
      },
      /**
       * Returns the parts, or null if there are none defined
       * @return {Part[]}
       */
      getParts: function getParts() {
        return this.__P_484_3 || [];
      },
      /**
       * Returns a dynamically calculated version of the application environment, which
       * is defaults or dynamic values plus the `environment` property
       *
       * @return {Map} The environment settings
       */
      getCalculatedEnvironment: function getCalculatedEnvironment() {
        return qx.tool.utils.Values.merge({
          "qx.headless": this.getType() != "browser",
          "qx.compiler.applicationName": this.getName(),
          "qx.compiler.applicationType": this.getType()
        }, this.getEnvironment());
      },
      /**
       * Expands a list of class names including wildcards (eg "qx.ui.*") into an
       * exhaustive list without wildcards
       * @param names {String[]}
       * @return String[]
       */
      __P_484_7: function __P_484_7(names) {
        var t = this;
        var result = {};
        names.forEach(function (name) {
          var pos = name.indexOf("*");
          if (pos < 0) {
            result[name] = true;
          } else {
            var prefix = name.substring(0, pos);
            if (prefix) {
              t.getAnalyser().getLibraries().forEach(function (lib) {
                var symbols = lib.getKnownSymbols();
                for (var symbol in symbols) {
                  if (symbols[symbol] == "class" && symbol.startsWith(prefix)) {
                    result[symbol] = true;
                  }
                }
              });
            }
            var postfix = name.substring(pos + 1);
            if (postfix) {
              t.getAnalyser().getLibraries().forEach(function (lib) {
                var symbols = lib.getKnownSymbols();
                for (var symbol in symbols) {
                  if (symbols[symbol] == "class" && symbol.endsWith(postfix)) {
                    result[symbol] = true;
                  }
                }
              });
            }
          }
        });
        return Object.keys(result);
      },
      /**
       * Apply for `type` property
       */
      _applyType: function _applyType(value, oldValue) {
        var loader = path.join(this.getTemplatePath(), "loader", "loader-" + this.getType() + ".tmpl.js");
        this.setLoaderTemplate(loader);
      },
      /**
       * Transforms values to make sure that they are an array (and never null)
       */
      __P_484_1: function __P_484_1(value) {
        if (!value) {
          return null;
        }
        if (!qx.lang.Type.isArray(value)) {
          return [value];
        }
        return value;
      }
    },
    statics: {
      /**
       * Creates a function that can perform a wildcard match to compare against a function;
       * the function returns `null` if no match, `"exact"` for an exact match, or a number
       * to indicating the number of segments in the package (eg `qx.util.*` will match
       * `qx.util.format.DateFormat` will return 2 because there is `qx` and `util`)
       *
       * @param include {String[]} the wildcard specs to include
       * @param exclude {String[]} the wildcard specs to exclude
       * @return {Function}
       */
      createWildcardMatchFunction: function createWildcardMatchFunction(include, exclude) {
        var code = [];
        if (exclude) {
          exclude.forEach(function (spec) {
            var pos;
            if ((pos = spec.indexOf("*")) > -1) {
              code.push('  if (value.startsWith("' + spec.substring(0, pos) + '"))\n    return null; // ' + spec);
            } else {
              code.push('  if (value === "' + spec + '")\n  return null;');
            }
          });
        }
        if (include) {
          include.forEach(function (spec) {
            var pos;
            pos = -1;
            var nsDepth = 0;
            while ((pos = spec.indexOf(".", pos + 1)) > -1) {
              nsDepth++;
            }
            if ((pos = spec.indexOf("*")) > -1) {
              code.push('  if (value.startsWith("' + spec.substring(0, pos) + '"))\n    return ' + nsDepth + "; // " + spec);
            } else {
              code.push('  if (value === "' + spec + '")\n  return "exact";');
            }
          });
        }
        code.push("  return null;");
        return new Function("value", code.join("\n"));
      }
    }
  });
  qx.tool.compiler.app.Application.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Application.js.map?dt=1717235403339