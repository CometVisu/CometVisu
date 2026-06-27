function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.tool.utils.LogManager": {
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.tool.compiler.Console": {},
      "qx.tool.utils.files.Utils": {},
      "qx.tool.utils.Json": {},
      "qx.tool.compiler.app.WebFont": {}
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

  var path = require("path");
  var fs = require("fs");
  var async = require("async");
  var log = qx.tool.utils.LogManager.createLog("library");

  /**
   * A Qooxdoo Library or application; typical usage is to call .loadManifest to configure from
   * the library itself
   */
  qx.Class.define("qx.tool.compiler.app.Library", {
    extend: qx.core.Object,
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_496_0 = {};
      this.__P_496_1 = {};
      this.__P_496_2 = {};
    },
    properties: {
      /** The namespace of the library */
      namespace: {
        check: "String"
      },
      /** The version of the library */
      version: {
        check: "String"
      },
      /** The directory; transformed into an absolute path */
      rootDir: {
        check: "String",
        transform: "_transformRootDir"
      },
      /** The path to source files, relative to rootDir */
      sourcePath: {
        init: "source/class",
        check: "String"
      },
      /** The path to generated transpiled files, relative to rootDir */
      transpiledPath: {
        init: "source/transpiled",
        check: "String"
      },
      /** The info section form the Manifest */
      libraryInfo: {
        check: "Map"
      },
      /** The path to resource files, relative to rootDir */
      resourcePath: {
        init: "source/resource",
        check: "String"
      },
      /** The path to resource files, relative to rootDir */
      themePath: {
        init: "source/theme",
        check: "String"
      },
      /** The path to translation files, relative to rootDir */
      translationPath: {
        init: "source/translation",
        check: "String"
      },
      /**
       * {WebFont[]} List of webfonts provided
       * @deprecated
       */
      webFonts: {
        init: null,
        nullable: true,
        check: "Array"
      },
      /** Array of external scripts required by the library */
      addScript: {
        init: null
      },
      /** Array of external stylesheets required by the library */
      addCss: {
        init: null
      },
      /**  Array of requires resources of the library */
      requires: {
        init: null
      }
    },
    members: {
      __P_496_0: null,
      __P_496_1: null,
      __P_496_3: null,
      __P_496_2: null,
      __P_496_4: null,
      /**
       * Transform for rootDir; converts it to an absolute path
       * @param value
       * @returns {*}
       * @private
       */
      _transformRootDir: function _transformRootDir(value) {
        //      if (value)
        //        value = path.resolve(value);
        return value;
      },
      /**
       * Loads the Manifest.json from the directory and uses it to configure
       * properties
       * @param loadFromDir {String} directory
       */
      loadManifest: function loadManifest(loadFromDir) {
        if (this.__P_496_3) {
          return this.__P_496_3;
        }
        return this.__P_496_3 = this.__P_496_5(loadFromDir);
      },
      __P_496_5: function __P_496_5(loadFromDir) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var Console, rootDir, data, key, check, pos, fixLibraryPath, sourcePath, resourcePath, m, fonts;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                Console = qx.tool.compiler.Console.getInstance();
                rootDir = loadFromDir;
                _context2.n = 1;
                return qx.tool.utils.files.Utils.correctCase(path.resolve(loadFromDir));
              case 1:
                rootDir = _context2.v;
                _this.setRootDir(rootDir);
                _context2.n = 2;
                return qx.tool.utils.Json.loadJsonAsync(rootDir + "/Manifest.json");
              case 2:
                data = _context2.v;
                if (data) {
                  _context2.n = 3;
                  break;
                }
                throw new Error(Console.decode("qx.tool.compiler.library.emptyManifest", rootDir));
              case 3:
                _this.setNamespace(data.provides.namespace);
                _this.setVersion(data.info.version);
                if (data.provides.environmentChecks) {
                  for (key in data.provides.environmentChecks) {
                    check = data.provides.environmentChecks[key];
                    pos = key.indexOf("*");
                    if (pos > -1) {
                      _this.__P_496_2[key] = {
                        matchString: key.substring(0, pos),
                        startsWith: true,
                        className: check
                      };
                    } else {
                      _this.__P_496_2[key] = {
                        matchString: key,
                        className: check
                      };
                    }
                  }
                }
                fixLibraryPath = /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(dir) {
                    var d, correctedDir;
                    return _regenerator().w(function (_context) {
                      while (1) switch (_context.n) {
                        case 0:
                          d = path.resolve(rootDir, dir);
                          if (fs.existsSync(d)) {
                            _context.n = 1;
                            break;
                          }
                          _this.warn(Console.decode("qx.tool.compiler.library.cannotFindPath", _this.getNamespace(), dir));
                          return _context.a(2, dir);
                        case 1:
                          _context.n = 2;
                          return qx.tool.utils.files.Utils.correctCase(d);
                        case 2:
                          correctedDir = _context.v;
                          if (!(correctedDir.substring(0, rootDir.length + 1) != rootDir + path.sep)) {
                            _context.n = 3;
                            break;
                          }
                          _this.warn(Console.decode("qx.tool.compiler.library.cannotCorrectCase", rootDir));
                          return _context.a(2, dir);
                        case 3:
                          correctedDir = correctedDir.substring(rootDir.length + 1);
                          return _context.a(2, correctedDir);
                      }
                    }, _callee);
                  }));
                  return function fixLibraryPath(_x) {
                    return _ref.apply(this, arguments);
                  };
                }();
                _context2.n = 4;
                return fixLibraryPath(data.provides["class"]);
              case 4:
                sourcePath = _context2.v;
                _this.setSourcePath(sourcePath);
                if (!data.provides.resource) {
                  _context2.n = 6;
                  break;
                }
                _context2.n = 5;
                return fixLibraryPath(data.provides.resource);
              case 5:
                resourcePath = _context2.v;
                _this.setResourcePath(resourcePath);
              case 6:
                _this.setLibraryInfo(data.info);
                if (data.provides.transpiled) {
                  _this.setTranspiledPath(data.provides.transpiled);
                } else {
                  m = sourcePath.match(/^(.*)\/([^/]+)$/);
                  if (m && m.length == 3) {
                    _this.setTranspiledPath(m[1] + "/transpiled");
                  } else {
                    _this.setTranspiledPath("transpiled");
                  }
                }
                if (data.provides.translation) {
                  _this.setTranslationPath(data.provides.translation);
                }
                if (data.provides.webfonts) {
                  fonts = [];
                  if (data.provides.webfonts.length) {
                    qx.tool.compiler.Console.print("qx.tool.compiler.webfonts.deprecated");
                  }
                  data.provides.webfonts.forEach(function (wf) {
                    var font = new qx.tool.compiler.app.WebFont(_this).set(wf);
                    fonts.push(font);
                  });
                  _this.setWebFonts(fonts);
                }
                _this.__P_496_4 = data.provides.fonts || {};
                if (data.externalResources) {
                  if (data.externalResources.script) {
                    _this.setAddScript(data.externalResources.script);
                  }
                  if (data.externalResources.css) {
                    _this.setAddCss(data.externalResources.css);
                  }
                }
                if (data.requires) {
                  _this.setRequires(data.requires);
                }
                if (data.provides && data.provides.boot) {
                  qx.tool.compiler.Console.print("qx.tool.cli.compile.deprecatedProvidesBoot", rootDir);
                }
              case 7:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      /**
       * Returns the provides.fonts data from the manifest
       *
       * @returns {Array}
       */
      getFontsData: function getFontsData() {
        return this.__P_496_4;
      },
      /**
       * Scans the filing system looking for classes; there are occasions (ie Qooxdoo's qxWeb module)
       * where the class name does not comply with the namespace, this method is used to find those
       * files and also to prepopulate the known symbols list
       * @param cb {Function} (err, classes) returns an array of class names
       */
      scanForClasses: function scanForClasses(cb) {
        var t = this;
        var classes = [];
        function scanDir(folder, packageName, cb) {
          fs.readdir(folder, function (err, filenames) {
            if (err) {
              cb(err);
              return;
            }
            async.each(filenames, function (filename, cb) {
              if (filename[0] == ".") {
                cb();
                return;
              }
              fs.stat(path.join(folder, filename), function (err, stat) {
                if (err || !stat) {
                  cb(err);
                  return;
                }
                if (stat.isDirectory()) {
                  var tmp = packageName;
                  if (tmp.length) {
                    tmp += ".";
                  }
                  tmp += filename;
                  scanDir(path.join(folder, filename), tmp, cb);
                  return;
                }

                // Make sure it looks like a file
                var match = filename.match(/(.*)(\.\w+)$/);
                if (!match) {
                  log.trace("Skipping file " + folder + "/" + filename);
                  cb();
                  return;
                }

                // Class name
                var className = match[1];
                var extension = match[2];
                if (packageName.length) {
                  className = packageName + "." + className;
                }
                if (className.match(/__init__/)) {
                  cb();
                  return;
                }
                if (extension == ".js" || extension == ".ts") {
                  t.__P_496_0[className] = "class";
                  t.__P_496_1[className] = extension;
                  classes.push(className);
                } else {
                  t.__P_496_0[filename] = "resource";
                }
                if (Boolean(packageName) && !t.__P_496_0[packageName]) {
                  t.__P_496_0[packageName] = "package";
                  var pos;
                  tmp = packageName;
                  while ((pos = tmp.lastIndexOf(".")) > -1) {
                    tmp = tmp.substring(0, pos);
                    t.__P_496_0[tmp] = "package";
                  }
                }
                cb();
              });
            }, cb);
          });
        }
        var rootDir = path.join(t.getRootDir(), t.getSourcePath());
        if (!fs.existsSync(rootDir)) {
          var Console = qx.tool.compiler.Console.getInstance();
          qx.tool.compiler.Console.warn(Console.decode("qx.tool.compiler.library.cannotFindPath", t.getNamespace(), rootDir));
          cb(null, []);
          return;
        }
        scanDir(rootDir, "", function (err) {
          cb(err, classes);
        });
      },
      /**
       * Detects whether the filename is one of the library's fonts
       *
       * @param {String} filename
       * @returns {Boolean}
       */
      isFontAsset: function isFontAsset(filename) {
        var isWebFont = false;
        if (filename.endsWith("svg")) {
          var fonts = this.getWebFonts() || [];
          isWebFont = fonts.find(function (webFont) {
            return webFont.getResources().find(function (resource) {
              return resource == filename;
            });
          });
          if (!isWebFont) {
            for (var fontId in this.__P_496_4) {
              var fontData = this.__P_496_4[fontId];
              isWebFont = (fontData.fontFaces || []).find(function (fontFace) {
                return (fontFace.paths || []).find(function (resource) {
                  return resource == filename;
                });
              });
              if (isWebFont) {
                break;
              }
            }
          }
        }
        return isWebFont;
      },
      /**
       * Detects the type of a symbol, "class", "resource", "package", "environment", or null if not found
       *
       * @param {String} name
       * @return {{symbolType,name,className}?}
       */
      getSymbolType: function getSymbolType(name) {
        if (!name.length) {
          return null;
        }
        var t = this;
        var type = this.__P_496_0[name];
        if (type) {
          return {
            symbolType: t.__P_496_0[name],
            className: type == "class" ? name : null,
            name: name
          };
        }
        function testEnvironment(check) {
          if (!check) {
            return null;
          }
          var match = false;
          if (check.startsWith) {
            match = name.startsWith(check.matchString);
          } else {
            match = name == check.matchString;
          }
          if (match) {
            return {
              symbolType: "environment",
              className: check.className,
              name: name
            };
          }
          return null;
        }
        var result = testEnvironment(this.__P_496_2[name]);
        if (result) {
          return result;
        }
        for (var key in this.__P_496_2) {
          var check = this.__P_496_2[key];
          if (check.startsWith) {
            result = testEnvironment(check);
            if (result !== null) {
              return result;
            }
          }
        }
        var tmp = name;
        var pos;
        while ((pos = tmp.lastIndexOf(".")) > -1) {
          tmp = tmp.substring(0, pos);
          type = this.__P_496_0[tmp];
          if (type) {
            if (type == "class") {
              return {
                symbolType: "member",
                className: tmp,
                name: name
              };
            }
            return null;
          }
        }
        return null;
      },
      /**
       * Checks whether the classname is an actual class, in this library
       *
       * @param classname {String} classname to look for
       * @return {Boolean}
       */
      isClass: function isClass(classname) {
        var type = this.__P_496_0[classname];
        return type === "class";
      },
      /**
       * Returns all known symbols as a map indexed by symbol name
       */
      getKnownSymbols: function getKnownSymbols() {
        return this.__P_496_0;
      },
      /**
       * Returns the original extension of the class file that implemented the
       * given class name.
       *
       * @param {String} className
       */
      getSourceFileExtension: function getSourceFileExtension(className) {
        return this.__P_496_1[className];
      },
      /**
       * Returns the full filename for the file within this library
       *
       * @param filename {String} the filename relative to this library
       * @return {String} the full filename
       */
      getFilename: function getFilename(filename) {
        return path.join(this.getRootDir(), this.getSourcePath(), filename);
      },
      /**
       * Returns the full filename for the file within this library's resources
       *
       * @param filename {String} the filename relative to this library
       * @return {String} the full filename
       */
      getResourceFilename: function getResourceFilename(filename) {
        return path.join(this.getRootDir(), this.getResourcePath(), filename);
      },
      /**
       * Returns the full filename for the file within this library's theme
       *
       * @param filename {String} the filename relative to this library
       * @return {String} the full filename
       */
      getThemeFilename: function getThemeFilename(filename) {
        return path.join(this.getRootDir(), this.getThemePath(), filename);
      }
    },
    statics: {
      /**
       * Helper method to create a Library instance and load it's manifest
       *
       * @param rootDir {String} directory of the library (must contain a Manifest.json)
       * @return {Library}
       */
      createLibrary: function createLibrary(rootDir) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var lib;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                lib = new qx.tool.compiler.app.Library();
                _context3.n = 1;
                return lib.loadManifest(rootDir);
              case 1:
                return _context3.a(2, lib);
            }
          }, _callee3);
        }))();
      }
    }
  });
  qx.tool.compiler.app.Library.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Library.js.map?dt=1782595071665