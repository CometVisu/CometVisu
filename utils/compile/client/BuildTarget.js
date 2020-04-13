const fs = require('fs')
const path = require('path')
const UglifyJS = require("uglify-es");
const { createGzip } = require('zlib');

qx.Class.define('cv.compile.client.BuildTarget', {
  extend: qx.tool.compiler.targets.BuildTarget,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (outputDir) {
    this.base(arguments, outputDir);
    this.setWriteCompileInfo(true)
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    writeLibraryInfo: {
      init: false,
      refine: true
    },
    type: {
      init: "build",
      refine: true
    }
  },

  members: {
    _pluginsLoadingScripts: null,

    _writeApplication: async function(compileInfo) {
      var t = this;
      var _arguments = arguments;
      var application = compileInfo.application;
      var targetUri = t._getOutputRootUri(application);
      var appRootDir = this.getApplicationRoot(application);

      // ResourceUri does not have a trailing "/" because qx.util.ResourceManager.toUri always adds one
      var mapTo = this.getPathMapping(path.join(appRootDir, this.getOutputDir(), "resource"));
      var resourceUri = mapTo ? mapTo : targetUri + "resource";

      compileInfo.build = {
        parts: {}
      };
      await qx.tool.utils.Promisify.forEachOfSeries(compileInfo.configdata.loader.packages,
        (pkg, pkgId) => {
          compileInfo.build.parts[pkgId] = {
            uris: pkg.uris,
            hashValue: null,
            modified: true
          };

          pkg.uris = ["__out__:" + t.getScriptPrefix() + "part-" + pkgId + ".js"];
        });

      var libraries = this.getAnalyser().getLibraries();
      var libraryLookup = {};
      libraries.forEach(function(library) {
        libraryLookup[library.getNamespace()] = library;
        compileInfo.configdata.libraries[library.getNamespace()] = {
          sourceUri: ".",
          resourceUri: resourceUri
        };
      });

      // loading part definitions
      await qx.Promise.all([
        t._syncAssets(compileInfo),

        async () => {
          let buildJson = path.join(appRootDir, "build-data.json");
          let data = await qx.tool.utils.Json.loadJsonAsync(buildJson);
          if (data !== null) {
            await fs.unlinkAsync(buildJson).catch(() => {});
            try {
              data = data ? JSON.parse(data) : null;
            } catch (ex) {
              // Nothing
            }
            if (data.parts) {
              for (var pkgId in data.parts) {
                if (compileInfo.build.parts[pkgId]) {
                  compileInfo.build.parts[pkgId].hashValue = data.parts[pkgId].hashValue;
                }
              }
            }
          }
        }
      ])
        .then(async () => {
          var t = this;
          var application = compileInfo.application;
          var analyser = this.getAnalyser();
          var appRootDir = this.getApplicationRoot(application);

          var APP_SUMMARY = {
            appClass: application.getClassName(),
            libraries: Object.keys(compileInfo.configdata.libraries).filter(ns => ns != "__out__"),
            parts: [],
            resources: compileInfo.configdata.resources,
            locales: compileInfo.configdata.locales,
            environment: compileInfo.configdata.environment
          };
          compileInfo.parts.forEach(part => {
            APP_SUMMARY.parts.push({
              classes: part.classes,
              include: part.include,
              exclude: part.exclude,
              minify: part.minify,
              name: part.name
            });
          });

          async function writeBootJs() {
            var MAP = {
              EnvSettings: compileInfo.configdata.environment,
              Libinfo: compileInfo.configdata.libraries,
              Resources: compileInfo.configdata.resources,
              Translations: {"C": null},
              Locales: {"C": null},
              Parts: compileInfo.configdata.loader.parts,
              Packages: compileInfo.configdata.loader.packages,
              UrisBefore: compileInfo.configdata.urisBefore,
              CssBefore: compileInfo.configdata.cssBefore,
              Boot: "boot",
              ClosureParts: {},
              BootIsInline: true,
              NoCacheParam: false,
              DecodeUrisPlug: undefined,
              BootPart: undefined,
              TranspiledPath: undefined,
              PreBootCode: compileInfo.configdata.preBootCode.join("\n")
            };

            if (application.getType() !== "browser") {
              MAP.TranspiledPath = path.relative(appRootDir, path.join(t.getOutputDir(), "transpiled"));
            }

            for (let i = 0, locales = analyser.getLocales(); i < locales.length; i++) {
              var localeId = locales[i];
              MAP.Translations[localeId] = null;
              MAP.Locales[localeId] = null;
            }

            // processing the loader template
            var data = await fs.readFileAsync(application.getLoaderTemplate(), { encoding: "utf-8" });
            var lines = data.split("\n");
            for (let i = 0; i < lines.length; i++) {
              var line = lines[i];
              var match;
              while ((match = line.match(/\%\{([^}]+)\}/))) {
                var keyword = match[1];
                var replace = "";
                if (MAP[keyword] !== undefined) {
                  if (keyword == "PreBootCode") {
                    replace = MAP[keyword];
                  } else if (keyword == "Libinfo") {
                    replace = JSON.stringify(MAP[keyword], null, 2).replace(/\": \"/g, "\": qx.$$$$appRoot + \"");
                  } else {
                    replace = JSON.stringify(MAP[keyword], null, 2);
                  }
                }
                var newLine = line.substring(0, match.index) + replace + line.substring(match.index + keyword.length + 3);
                line = newLine;
              }
              if (line.match(/^\s*delayDefer:\s*false\b/)) {
                line = line.replace(/false/, "true");
              }
              lines[i] = line;
            }

            data = lines.join("\n");
            let name = application.isBrowserApp() ? "boot.js" : application.getName() + ".js";
            let pos = name.lastIndexOf("/");
            if (pos > -1) {
              name = name.substring(pos + 1);
            }
            var ws = fs.createWriteStream(path.join(appRootDir, t.getScriptPrefix() + name));
            ws.write(data);
            ws.end();
            await t._writeBootJs(compileInfo, ws.path);
          }

          await fs.writeFileAsync(appRootDir + "/" + t.getScriptPrefix() + "app-summary.json",
            JSON.stringify(APP_SUMMARY, null, 2) + "\n",
            { encoding: "utf8" });

          await fs.writeFileAsync(appRootDir + "/" + t.getScriptPrefix() + "resources.js",
            "qx.$$packageData['0'] = " + JSON.stringify(compileInfo.pkgdata, null, 2) + ";\n",
            { encoding: "utf8" });

          const src = path.join(require.resolve("@babel/polyfill"), "../../dist/polyfill.js");
          const dest = path.join(appRootDir, t.getScriptPrefix() + "polyfill.js");
          await qx.tool.utils.files.Utils.copyFile(src, dest);

          await qx.Promise.all([
            writeBootJs(),

            this._writeIndexHtml(compileInfo),

            new qx.Promise((resolve, reject) => {
              if (!t.isWriteCompileInfo()) {
                resolve();
                return;
              }
              var MAP = {
                EnvSettings: compileInfo.configdata.environment,
                Libinfo: compileInfo.configdata.libraries,
                UrisBefore: compileInfo.configdata.urisBefore,
                CssBefore: compileInfo.configdata.cssBefore,
                Assets: compileInfo.assets.map(asset => asset.getFilename()),
                Parts: compileInfo.parts
              };
              var outputDir = path.join(appRootDir, t.getScriptPrefix());

              qx.tool.utils.Json.saveJsonAsync(path.join(outputDir, "compile-info.json"), MAP)
                .then(() => qx.tool.utils.Json.saveJsonAsync(path.join(outputDir, "resources.json"), compileInfo.pkgdata))
                .then(resolve)
                .catch(reject);
            })
          ]);

          return await this._afterWriteApplication(compileInfo);
        });
    },

    _writeBootJs: async function(compileInfo, bootFilePath) {
      var application = compileInfo.application;
      var appRootDir = this.getApplicationRoot(application);
      var transpiledDir = path.join(this.getOutputDir(), "transpiled");

      let promises = qx.tool.utils.Promisify.eachOf(compileInfo.build.parts, async (part, pkgId) => {
        let copier = new qx.tool.compiler.targets.SourceCodeCopier(path.join(appRootDir, this.getScriptPrefix() + "part-" + pkgId + ".js"));
        await copier.open();

        // add boot.js
        var sourcePath = this.mapToUri(bootFilePath, path.dirname(copier.getOutputFilename()));
        await copier.addSourceFile(bootFilePath, sourcePath);

        await qx.tool.utils.Promisify.eachSeries(part.uris, async uri => {
          var m = uri.match(/^([^:]+):(.*$)/);
          var namespace = m[1];
          var filename = m[2];
          var origJsFilename;
          var jsFilename;
          if (namespace == "__out__") {
            jsFilename = path.join(appRootDir, filename);
            origJsFilename = path.join(appRootDir, filename);
          } else {
            var lib = this.getAnalyser().findLibrary(namespace);
            origJsFilename = lib.getFilename(filename);
            jsFilename = path.join(transpiledDir, filename);
          }
          var sourcePath = this.mapToUri(origJsFilename, path.dirname(copier.getOutputFilename()));
          await copier.addSourceFile(jsFilename, sourcePath);
        });

        return await copier.close();
      });
      await qx.Promise.all(promises);
    },

    // overridden
    _afterWriteApplication: async function(compileInfo) {
      var uglifyOpts = {
        compress: {
          sequences: false
        },
        mangle: true
      };

      var t = this;
      var application = compileInfo.application;
      var appRootDir = this.getApplicationRoot(application);

      var p = Promise.resolve();
      Object.keys(compileInfo.configdata.loader.packages).forEach(pkgId => {
        if (!compileInfo.build.parts[pkgId] || !compileInfo.build.parts[pkgId].modified) {
          return;
        }

        var partJs = path.join(appRootDir, t.getScriptPrefix() + "part-" + pkgId + ".js");
        var targetFile = pkgId === "0" ? "cv-client.js" : "part-" + pkgId + ".js";
        var targetJs = path.join(appRootDir, t.getScriptPrefix() + targetFile);
        var partSourceCode = null;
        var partSourceMap = null;
        p = p
          .then(() => fs.readFileAsync(partJs, "utf8").then(data => partSourceCode = data))
          .then(() => qx.tool.utils.files.Utils.safeUnlink(partJs + ".unminified"))
          .then(() => qx.tool.utils.files.Utils.safeRename(partJs, partJs + ".unminified"))

          .then(() => fs.readFileAsync(partJs + ".map", "utf8").then(data => partSourceMap = data))
          .then(() => qx.tool.utils.files.Utils.safeUnlink(partJs + ".unminified.map"))
          .then(() => qx.tool.utils.files.Utils.safeRename(partJs + ".map", partJs + ".unminified.map"))

          .then(() => {
            t.fireDataEvent("minifyingApplication", { application: application, part: pkgId, filename: "part-" + pkgId + ".js" });
            partSourceCode += "\n" + "// backwards compatibility for <= 0.10x\nvar CometVisuClient = cv.io.Client;\n"
            uglifyOpts.sourceMap = {
              content: partSourceMap,
              url: targetFile + ".map",
              includeSources: true
            };
            var result = UglifyJS.minify(partSourceCode, uglifyOpts);
            var err = result.error;
            if (err) {
              if (err.name === "SyntaxError") {
                qx.tool.compiler.Console.print("qx.tool.compiler.build.uglifyParseError", err.line, err.col, err.message, "part-" + pkgId + ".js");
              }
              throw new Error("UglifyJS failed to minimise");
            }
            return fs.writeFileAsync(targetJs, result.code, { encoding: "utf8" })
              .then(() => {
                if (!t.isSaveUnminified()) {
                  return fs.unlinkAsync(partJs + ".unminified")
                    .then(() => fs.unlinkAsync(partJs + ".unminified.map"));
                }
                return undefined;
              })
              .then(() => fs.writeFileAsync(targetJs + ".map", result.map, { encoding: "utf8" }))
              .then(() => t.fireDataEvent("minifiedApplication", { application: application, part: pkgId, filename: "part-" + pkgId + ".js" }));
          });
      });
      var buildDataJson = path.join(appRootDir, "build-data.json");
      await p
        .then(() => {
          qx.tool.utils.Json.saveJsonAsync(buildDataJson, compileInfo.build)
          var targetJs = path.join(appRootDir, t.getScriptPrefix() + "cv-client.js");

          // gzip source
          var gzip = createGzip();
          var source = fs.createReadStream(targetJs);
          var ws = fs.createWriteStream(targetJs + ".gz", {encoding: 'utf8'});
          source.pipe(gzip).pipe(ws);
        });
    }
  }

})

module.exports = {
  ClientBuildTarget: cv.compile.client.BuildTarget
}