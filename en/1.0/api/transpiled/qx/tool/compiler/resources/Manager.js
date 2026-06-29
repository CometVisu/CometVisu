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
      "qx.tool.compiler.resources.ImageLoader": {
        "construct": true
      },
      "qx.tool.compiler.resources.MetaLoader": {
        "construct": true
      },
      "qx.tool.compiler.resources.ScssConverter": {
        "construct": true
      },
      "qx.tool.compiler.resources.ScssIncludeConverter": {
        "construct": true
      },
      "qx.tool.utils.Json": {},
      "qx.tool.compiler.Console": {},
      "qx.tool.utils.Values": {},
      "qx.lang.Type": {},
      "qx.Promise": {},
      "qx.tool.utils.files.Utils": {},
      "qx.tool.compiler.resources.Asset": {},
      "qx.tool.utils.Promisify": {},
      "qx.lang.Array": {}
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

  /* eslint-disable @qooxdoo/qx/no-illegal-private-usage */

  var path = require("upath");
  var log = qx.tool.utils.LogManager.createLog("resource-manager");

  /**
   * Analyses library resources, collecting information into a cached database
   * file
   */
  qx.Class.define("qx.tool.compiler.resources.Manager", {
    extend: qx.core.Object,
    /**
     * Constructor
     *
     * @param analyser {qx.tool.compiler.Analyser}
     */
    construct: function construct(analyser) {
      qx.core.Object.constructor.call(this);
      this.__P_506_0 = analyser;
      this.__P_506_1 = analyser.getResDbFilename() || "resource-db.json";
      this.__P_506_2 = [new qx.tool.compiler.resources.ImageLoader(this), new qx.tool.compiler.resources.MetaLoader(this)];
      this.__P_506_3 = [new qx.tool.compiler.resources.ScssConverter(), new qx.tool.compiler.resources.ScssIncludeConverter()];
    },
    members: {
      /** {String} filename of database */
      __P_506_1: null,
      /** {Object} Database */
      __P_506_4: null,
      /** the used analyser */
      __P_506_0: null,
      /** {Map{String,Library}} Lookup of libraries, indexed by resource URI */
      __P_506_5: null,
      /** {String[]} Array of all resource URIs, sorted alphabetically (ie these are the keys in __librariesByResourceUri) */
      __P_506_6: null,
      /** {ResourceLoader[]} list of resource loaders, used to add info to the database */
      __P_506_2: null,
      /** {ResourceConverter[]} list of resource converters, used to copy resources to the target */
      __P_506_3: null,
      /**
       * Loads the cached database
       */
      loadDatabase: function loadDatabase() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _context.n = 1;
                return qx.tool.utils.Json.loadJsonAsync(_this.__P_506_1);
              case 1:
                _t = _context.v;
                if (_t) {
                  _context.n = 2;
                  break;
                }
                _t = {};
              case 2:
                _this.__P_506_4 = _t;
              case 3:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      /**
       * Saves the database
       */
      saveDatabase: function saveDatabase() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                log.debug("saving resource manager database");
                return _context2.a(2, qx.tool.utils.Json.saveJsonAsync(_this2.__P_506_1, _this2.__P_506_4));
            }
          }, _callee2);
        }))();
      },
      /**
       * Returns the loaded database
       *
       * @returns
       */
      getDatabase: function getDatabase() {
        return this.__P_506_4;
      },
      /**
       * Finds the library needed for a resource, see `findLibrariesForResource`.  This reports
       * an error if more than one library is found.
       *
       * @param uri {String} URI
       * @return {qx.tool.compiler.app.Library[]} the libraries, empty list if not found
       */
      findLibraryForResource: function findLibraryForResource(uri) {
        var result = this.findLibrariesForResource(uri);
        if (result.length == 0) {
          return null;
        }
        if (result.length > 1) {
          qx.tool.compiler.Console.error("Cannot determine a single library for the URI '".concat(uri, "'; ") + "found ".concat(result.map(function (l) {
            return l.getNamespace();
          }).join(","), " returning first library"));
        }
        return result[0];
      },
      /**
       * Finds the libraries needed for a resource; this depends on `findAllResources` having
       * already been called.  `uri` can include optional explicit namespace (eg "qx:blah/blah.png"),
       * otherwise the library resource lookups are examined to find the library.
       *
       * Note that there can be more than one directory because the lookup holds directory names (used
       * for wildcards) and they are allowed to be duplicated.
       *
       * @param uri {String} URI
       * @return {qx.tool.compiler.app.Library[]} the libraries, empty list if not found
       */
      findLibrariesForResource: function findLibrariesForResource(uri) {
        var _this3 = this;
        var findLibrariesForResourceImpl = function findLibrariesForResourceImpl() {
          var ns;
          var pos;

          // check for absolute path first, in windows c:/ is a valid absolute name
          if (path.isAbsolute(uri)) {
            var library = _this3.__P_506_0.getLibraries().find(function (lib) {
              return uri.startsWith(path.resolve(lib.getRootDir()));
            });
            return library || null;
          }

          // Explicit library?
          pos = uri.indexOf(":");
          if (pos !== -1) {
            ns = uri.substring(0, pos);
            var _library = _this3.__P_506_0.findLibrary(ns);
            return _library || null;
          }

          // Non-wildcards are a direct lookup
          // check for $ and *. less pos wins
          // fix for https://github.com/qooxdoo/qooxdoo/issues/260
          var pos1 = uri.indexOf("$"); // Variable references are effectively a wildcard lookup
          var pos2 = uri.indexOf("*");
          if (pos1 === -1) {
            pos = pos2;
          } else if (pos2 === -1) {
            pos = pos1;
          } else {
            pos = Math.min(pos1, pos2);
          }
          if (pos === -1) {
            var _library2 = _this3.__P_506_5[uri] || null;
            return _library2;
          }

          // Strip wildcard
          var isFolderMatch = uri[pos - 1] === "/";
          uri = uri.substring(0, pos - 1);

          // Fast folder match
          if (isFolderMatch) {
            var _library3 = _this3.__P_506_5[uri] || null;
            return _library3;
          }

          // Slow scan
          if (!_this3.__P_506_6) {
            _this3.__P_506_6 = Object.keys(_this3.__P_506_5).sort();
          }
          var thisUriPos = qx.tool.utils.Values.binaryStartsWith(_this3.__P_506_6, uri);
          if (thisUriPos > -1) {
            var libraries = {};
            for (; thisUriPos < _this3.__P_506_6.length; thisUriPos++) {
              var thisUri = _this3.__P_506_6[thisUriPos];
              if (!thisUri.startsWith(uri)) {
                break;
              }
              pos = uri.indexOf(":");
              if (pos !== -1) {
                ns = uri.substring(0, pos);
                if (!libraries[ns]) {
                  libraries[ns] = _this3.__P_506_0.findLibrary(ns);
                }
              }
            }
            return Object.values(libraries);
          }
          return null;
        };
        var result = findLibrariesForResourceImpl();
        if (!result) {
          return [];
        }
        if (!qx.lang.Type.isArray(result)) {
          return [result];
        }
        return result;
      },
      /**
       * Scans all libraries looking for resources; this does not analyse the
       * files, simply compiles the list
       */
      findAllResources: function findAllResources() {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
          var t, db;
          return _regenerator().w(function (_context8) {
            while (1) switch (_context8.n) {
              case 0:
                t = _this4;
                db = _this4.__P_506_4;
                if (!db.resources) {
                  db.resources = {};
                }
                t.__P_506_5 = {};
                _this4.__P_506_6 = null;
                _this4.__P_506_7 = {};
                _context8.n = 1;
                return qx.Promise.all(t.__P_506_0.getLibraries().map(/*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(library) {
                    var resources, unconfirmed, relFile, scanResources;
                    return _regenerator().w(function (_context6) {
                      while (1) switch (_context6.n) {
                        case 0:
                          resources = db.resources[library.getNamespace()];
                          if (!resources) {
                            db.resources[library.getNamespace()] = resources = {};
                          }
                          unconfirmed = {};
                          for (relFile in resources) {
                            unconfirmed[relFile] = true;
                          }
                          scanResources = /*#__PURE__*/function () {
                            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(resourcePath) {
                              var rootDir;
                              return _regenerator().w(function (_context4) {
                                while (1) switch (_context4.n) {
                                  case 0:
                                    // If the root folder exists, scan it
                                    rootDir = path.join(library.getRootDir(), library.get(resourcePath));
                                    _context4.n = 1;
                                    return qx.tool.utils.files.Utils.findAllFiles(rootDir, /*#__PURE__*/function () {
                                      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(filename) {
                                        var relFile, fileInfo, asset;
                                        return _regenerator().w(function (_context3) {
                                          while (1) switch (_context3.n) {
                                            case 0:
                                              relFile = filename.substring(rootDir.length + 1).replace(/\\/g, "/");
                                              fileInfo = resources[relFile];
                                              delete unconfirmed[relFile];
                                              if (!fileInfo) {
                                                fileInfo = resources[relFile] = {};
                                              }
                                              fileInfo.resourcePath = resourcePath;
                                              _context3.n = 1;
                                              return qx.tool.utils.files.Utils.safeStat(filename).mtime;
                                            case 1:
                                              fileInfo.mtime = _context3.v;
                                              asset = new qx.tool.compiler.resources.Asset(library, relFile, fileInfo);
                                              _this4.__P_506_8(asset);
                                            case 2:
                                              return _context3.a(2);
                                          }
                                        }, _callee3);
                                      }));
                                      return function (_x3) {
                                        return _ref3.apply(this, arguments);
                                      };
                                    }());
                                  case 1:
                                    return _context4.a(2);
                                }
                              }, _callee4);
                            }));
                            return function scanResources(_x2) {
                              return _ref2.apply(this, arguments);
                            };
                          }();
                          _context6.n = 1;
                          return scanResources("resourcePath");
                        case 1:
                          _context6.n = 2;
                          return scanResources("themePath");
                        case 2:
                          _context6.n = 3;
                          return qx.Promise.all(Object.keys(unconfirmed).map(/*#__PURE__*/function () {
                            var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(filename) {
                              var fileInfo, stat;
                              return _regenerator().w(function (_context5) {
                                while (1) switch (_context5.n) {
                                  case 0:
                                    fileInfo = resources[filename];
                                    if (fileInfo) {
                                      _context5.n = 1;
                                      break;
                                    }
                                    delete resources[filename];
                                    _context5.n = 3;
                                    break;
                                  case 1:
                                    _context5.n = 2;
                                    return qx.tool.utils.files.Utils.safeStat(filename);
                                  case 2:
                                    stat = _context5.v;
                                    if (!stat) {
                                      delete resources[filename];
                                    }
                                  case 3:
                                    return _context5.a(2);
                                }
                              }, _callee5);
                            }));
                            return function (_x4) {
                              return _ref4.apply(this, arguments);
                            };
                          }()));
                        case 3:
                          return _context6.a(2);
                      }
                    }, _callee6);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }()));
              case 1:
                _context8.n = 2;
                return qx.tool.utils.Promisify.poolEachOf(Object.values(_this4.__P_506_7), 10, /*#__PURE__*/function () {
                  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(asset) {
                    var fileInfo, altPath, lib, otherAsset, dependsOn;
                    return _regenerator().w(function (_context7) {
                      while (1) switch (_context7.n) {
                        case 0:
                          _context7.n = 1;
                          return asset.load();
                        case 1:
                          fileInfo = asset.getFileInfo();
                          if (fileInfo.meta) {
                            for (altPath in fileInfo.meta) {
                              lib = _this4.findLibraryForResource(altPath);
                              if (!lib) {
                                lib = asset.getLibrary();
                              }
                              otherAsset = _this4.__P_506_7[lib.getNamespace() + ":" + altPath];
                              if (otherAsset) {
                                otherAsset.addMetaReferee(asset);
                                asset.addMetaReferTo(otherAsset);
                              } else {
                                qx.tool.compiler.Console.warn("Cannot find asset " + altPath + " referenced in " + asset);
                              }
                            }
                          }
                          if (fileInfo.dependsOn) {
                            dependsOn = [];
                            fileInfo.dependsOn.forEach(function (str) {
                              var otherAsset = _this4.__P_506_7[str];
                              if (!otherAsset) {
                                qx.tool.compiler.Console.warn("Cannot find asset " + str + " depended on by " + asset);
                              } else {
                                dependsOn.push(otherAsset);
                              }
                            });
                            if (dependsOn.length) {
                              asset.setDependsOn(dependsOn);
                            }
                          }
                          return _context7.a(2, null);
                      }
                    }, _callee7);
                  }));
                  return function (_x5) {
                    return _ref5.apply(this, arguments);
                  };
                }());
              case 2:
                return _context8.a(2);
            }
          }, _callee8);
        }))();
      },
      /**
       * Adds an asset
       *
       * @param asset {Asset} the asset to add
       */
      __P_506_8: function __P_506_8(asset) {
        var _this5 = this;
        this.__P_506_7[asset.toUri()] = asset;
        var library = asset.getLibrary();
        var filename = asset.getFilename();
        var tmp = "";
        filename.split("/").forEach(function (seg, index) {
          if (index) {
            tmp += "/";
          }
          tmp += seg;
          var current = _this5.__P_506_5[tmp];
          if (current) {
            if (qx.lang.Type.isArray(current)) {
              if (!qx.lang.Array.contains(current, library)) {
                current.push(library);
              }
            } else if (current !== library) {
              current = _this5.__P_506_5[tmp] = [current, library];
            }
          } else {
            _this5.__P_506_5[tmp] = library;
          }
        });
        asset.setLoaders(this.__P_506_2.filter(function (loader) {
          return loader.matches(filename, library);
        }));
        asset.setConverters(this.__P_506_3.filter(function (converter) {
          return converter.matches(filename, library);
        }));
      },
      /**
       * Gets an individual asset
       *
       * @param srcPath {String} the resource name, with or without a namespace prefix
       * @param create {Boolean?} if true the asset will be created if it does not exist
       * @param isThemeFile {Boolean?} if true the asset will be expected to be in the theme folder
       * @return {Asset?} the asset, if found
       */
      getAsset: function getAsset(srcPath, create, isThemeFile) {
        var library = this.findLibraryForResource(srcPath);
        if (!library) {
          qx.tool.compiler.Console.warn("Cannot find library for " + srcPath);
          return null;
        }
        var resourceDir = path.join(library.getRootDir(), isThemeFile ? library.getThemePath() : library.getResourcePath());
        srcPath = path.relative(resourceDir, path.isAbsolute(srcPath) ? srcPath : path.join(resourceDir, srcPath));
        var asset = this.__P_506_7[library.getNamespace() + ":" + srcPath];
        if (!asset && create) {
          asset = new qx.tool.compiler.resources.Asset(library, srcPath, {
            resourcePath: "resourcePath"
          });
          this.__P_506_8(asset);
        }
        return asset;
      },
      /**
       * Collects information about the assets listed in srcPaths;
       *
       * @param srcPaths
       * @return {Asset[]}
       */
      getAssetsForPaths: function getAssetsForPaths(srcPaths) {
        var _this6 = this;
        var db = this.__P_506_4;

        // Generate a lookup that maps the resource name to the meta file that
        //  contains the composite
        var metas = {};
        for (var libraryName in db.resources) {
          var libraryData = db.resources[libraryName];
          for (var resourcePath in libraryData) {
            var fileInfo = libraryData[resourcePath];
            if (!fileInfo.meta) {
              continue;
            }
            for (var altPath in fileInfo.meta) {
              metas[altPath] = resourcePath;
            }
          }
        }
        var assets = [];
        var assetPaths = {};
        srcPaths.forEach(function (srcPath) {
          var pos = srcPath.indexOf(":");
          var libraries = null;
          if (pos > -1) {
            var ns = srcPath.substring(0, pos);
            var tmp = _this6.__P_506_0.findLibrary(ns);
            libraries = tmp ? [tmp] : [];
            srcPath = srcPath.substring(pos + 1);
          } else {
            libraries = _this6.findLibrariesForResource(srcPath);
          }
          if (libraries.length == 0) {
            qx.tool.compiler.Console.warn("Cannot find library for " + srcPath);
            return;
          }
          libraries.forEach(function (library) {
            var libraryData = db.resources[library.getNamespace()];
            pos = srcPath.indexOf("*");
            var resourceNames = [];
            if (pos > -1) {
              srcPath = srcPath.substring(0, pos);
              resourceNames = Object.keys(libraryData).filter(function (resourceName) {
                return resourceName.substring(0, srcPath.length) === srcPath;
              });
            } else if (libraryData[srcPath]) {
              resourceNames = [srcPath];
            }
            resourceNames.forEach(function (resourceName) {
              if (assetPaths[resourceName] !== undefined) {
                return;
              }
              var asset = _this6.__P_506_7[library.getNamespace() + ":" + resourceName];
              var fileInfo = asset.getFileInfo();
              if (fileInfo.doNotCopy === true) {
                return;
              }
              (asset.getMetaReferees() || []).forEach(function (meta) {
                // Extract the fragment from the meta data for this particular resource
                var resMetaData = meta.getFileInfo().meta[resourceName];
                fileInfo.composite = resMetaData[3];
                fileInfo.x = resMetaData[4];
                fileInfo.y = resMetaData[5];
              });
              assets.push(asset);
              assetPaths[resourceName] = assets.length - 1;
            });
          });
        });
        return assets;
      }
    }
  });
  qx.tool.compiler.resources.Manager.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Manager.js.map?dt=1782705794433