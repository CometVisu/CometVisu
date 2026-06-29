function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.tool.utils.Promisify": {
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
      "qx.util.ResourceManager": {
        "construct": true
      },
      "qx.tool.utils.files.Utils": {},
      "qx.tool.compiler.Console": {},
      "qx.tool.cli.commands.Create": {},
      "qx.tool.cli.commands.package.Install": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2011-2019 The authors
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (john.spackman@zenesis.com, @johnspackman)
       * Christian Boulanger (info@bibliograph.org, @cboulanger)
  
  ************************************************************************ */

  var fs = qx.tool.utils.Promisify.fs;
  var process = require("process");
  var path = require("upath");
  var rimraf = require("rimraf");
  var dot = require("dot");
  require("jstransformer-dot");
  var metalsmith = require("metalsmith");
  var layouts = require("@metalsmith/layouts");
  var markdown = require("@metalsmith/markdown");
  //const filenames = require("metalsmith-filenames");
  //var permalinks = require("metalsmith-permalinks");
  /**
   * @external(qx/tool/loadsass.js)
   * @ignore(loadSass)
   */
  /* global loadSass */
  var sass = loadSass();
  var chokidar = require("chokidar");

  // config
  dot.templateSettings.strip = false;
  qx.Class.define("qx.tool.utils.Website", {
    extend: qx.core.Object,
    statics: {
      APP_NAMESPACE: "apps"
    },
    construct: function construct() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      qx.core.Object.apply(this, arguments);
      var self = qx.tool.utils.Website;
      var p = qx.util.ResourceManager.getInstance().toUri("qx/tool/website/.gitignore");
      p = path.dirname(p);
      this.initSourceDir(p);
      this.initTargetDir(path.join(p, "build"));
      this.initAppsNamespace(self.APP_NAMESPACE);
      var _iterator = _createForOfIteratorHelper(Object.getOwnPropertyNames(options)),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;
          this.set(key, options[key]);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    properties: {
      appsNamespace: {
        check: "String",
        deferredInit: true
      },
      sourceDir: {
        check: "String",
        deferredInit: true
      },
      targetDir: {
        check: "String",
        deferredInit: true
      }
    },
    members: {
      /** @type {chokidar} watcher */
      __P_527_0: null,
      /** @type {Boolean} whether the watcher is ready yet */
      __P_527_1: false,
      /** @type {Integer} setTimeout timer ID for debouncing builds */
      __P_527_2: null,
      /** @type {Boolean} Whether the build is currently taking place */
      __P_527_3: false,
      /** @type {Boolean} Whether a rebuild is needed ASAP */
      __P_527_4: false,
      /**
       * Starts the watcher for files in the source directory and compiles as needed
       */
      startWatcher: function startWatcher() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var sourceDir;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _context2.n = 1;
                return _this.stopWatcher();
              case 1:
                _context2.n = 2;
                return qx.tool.utils.files.Utils.correctCase(_this.getSourceDir());
              case 2:
                sourceDir = _context2.v;
                _this._watcher = chokidar.watch([sourceDir], {});
                _this._watcher.on("change", function (filename) {
                  return _this.__P_527_5("change", filename);
                });
                _this._watcher.on("add", function (filename) {
                  return _this.__P_527_5("add", filename);
                });
                _this._watcher.on("unlink", function (filename) {
                  return _this.__P_527_5("unlink", filename);
                });
                _this._watcher.on("ready", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
                  return _regenerator().w(function (_context) {
                    while (1) switch (_context.n) {
                      case 0:
                        _context.n = 1;
                        return _this.triggerRebuild(true);
                      case 1:
                        _this.__P_527_1 = true;
                      case 2:
                        return _context.a(2);
                    }
                  }, _callee);
                })));
                _this._watcher.on("error", function (err) {
                  qx.tool.compiler.Console.print(err.code == "ENOSPC" ? "qx.tool.cli.watch.enospcError" : "qx.tool.cli.watch.watchError", err);
                });
              case 3:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      /**
       * Stops the watcher, if its running
       */
      stopWatcher: function stopWatcher() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                if (!_this2._watcher) {
                  _context3.n = 2;
                  break;
                }
                _context3.n = 1;
                return _this2._watcher.stop();
              case 1:
                _this2._watcher = null;
                _this2.__P_527_1 = false;
              case 2:
                return _context3.a(2);
            }
          }, _callee3);
        }))();
      },
      /**
       * Whether the watcher is running
       *
       * @return {Boolean} true if its running
       */
      isWatching: function isWatching() {
        return Boolean(this._watcher);
      },
      /**
       * Waits for the rebuild process to complete, if it is running
       */
      waitForRebuildComplete: function waitForRebuildComplete() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                if (!_this3.__P_527_6) {
                  _context4.n = 1;
                  break;
                }
                _context4.n = 1;
                return _this3.__P_527_6;
              case 1:
                return _context4.a(2);
            }
          }, _callee4);
        }))();
      },
      /**
       * Rebuilds everything needed for the website
       */
      rebuildAll: function rebuildAll() {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                _context5.n = 1;
                return _this4.generateSite();
              case 1:
                _context5.n = 2;
                return _this4.compileScss();
              case 2:
                return _context5.a(2);
            }
          }, _callee5);
        }))();
      },
      /**
       * Event handler for changes to the source files
       *
       * @param type {String} type of change, one of "change", "add", "unlink"
       * @param filename {String} the file that changed
       */
      __P_527_5: function __P_527_5(type, filename) {
        if (this.__P_527_1) {
          if (!filename.toLowerCase().startsWith(this.getTargetDir().toLowerCase())) {
            this.triggerRebuild(false);
          }
        }
      },
      /**
       * Triggers a rebuild of the website, asynchronously.  Unless immediate is true,
       * the rebuild will only happen after a short delay; but each time this is called,
       * the delay is restarted.  This is to allow multiple files to be changed without
       * swamping the processor with compilations.
       *
       * @param immediate {Boolean?} if true, rebuild starts ASAP
       */
      triggerRebuild: function triggerRebuild(immediate) {
        var _this5 = this;
        if (this.__P_527_3) {
          this.__P_527_4 = true;
          return;
        }
        var _rebuilderImpl = /*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
            return _regenerator().w(function (_context6) {
              while (1) switch (_context6.n) {
                case 0:
                  _context6.n = 1;
                  return _this5.rebuildAll();
                case 1:
                  if (!_this5.__P_527_4) {
                    _context6.n = 2;
                    break;
                  }
                  _this5.__P_527_4 = false;
                  _context6.n = 2;
                  return _rebuilderImpl();
                case 2:
                  return _context6.a(2);
              }
            }, _callee6);
          }));
          return function rebuilderImpl() {
            return _ref2.apply(this, arguments);
          };
        }();
        var rebuilder = /*#__PURE__*/function () {
          var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
            return _regenerator().w(function (_context7) {
              while (1) switch (_context7.p = _context7.n) {
                case 0:
                  _this5.__P_527_3 = true;
                  _context7.p = 1;
                  _this5.__P_527_6 = _rebuilderImpl();
                  _context7.n = 2;
                  return _this5.__P_527_6;
                case 2:
                  _this5.__P_527_6 = null;
                case 3:
                  _context7.p = 3;
                  _this5.__P_527_3 = false;
                  return _context7.f(3);
                case 4:
                  return _context7.a(2);
              }
            }, _callee7, null, [[1,, 3, 4]]);
          }));
          return function rebuilder() {
            return _ref3.apply(this, arguments);
          };
        }();
        if (this.__P_527_2) {
          clearTimeout(this.__P_527_2);
          this.__P_527_2 = null;
        }
        this.__P_527_2 = setTimeout(rebuilder, immediate ? 1 : 250);
      },
      /**
       * Metalsmith Plugin that collates a list of pages that are to be included in the site navigation
       * into the metadata, along with their URLs.
       *
       * If the metadata has a `sites.pages`, then it is expected to be an array of URLs which indicates
       * the ordering to be applied; `sites.pages` is replaced with an array of objects, one per page,
       * that contains `url` and `title` properties.
       *
       */
      getPages: function getPages(files, metalsmith) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
          var metadata, pages, order, unorderedPages, addPage, _iterator2, _step2, filename, file;
          return _regenerator().w(function (_context8) {
            while (1) switch (_context8.n) {
              case 0:
                addPage = function _addPage(url, title) {
                  var page = {
                    url: url,
                    title: title
                  };
                  var index = order[url];
                  if (index !== undefined) {
                    pages[index] = page;
                  } else {
                    unorderedPages.push(page);
                  }
                };
                metadata = metalsmith.metadata();
                pages = [];
                order = {};
                if (metadata.site.pages) {
                  metadata.site.pages.forEach(function (url, index) {
                    return typeof url == "string" ? order[url] = index : null;
                  });
                }
                unorderedPages = [];
                _iterator2 = _createForOfIteratorHelper(Object.getOwnPropertyNames(files));
                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    filename = _step2.value;
                    file = files[filename];
                    if (filename === "index.html") {
                      addPage("/", file.title || "Home Page");
                    } else if (file.permalink || file.navigation) {
                      addPage(file.permalink || filename, file.title || "Home Page");
                    }
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
                unorderedPages.forEach(function (page) {
                  return pages.push(page);
                });
                metadata.site.pages = pages;
              case 1:
                return _context8.a(2);
            }
          }, _callee8);
        }))();
      },
      /**
       * Metalsmith plugin that loads partials and adding them to the metadata.partials map.  Each file
       * is added with its filename, and if it is a .html filename is also added without the .html
       * extension.
       *
       */
      loadPartials: function loadPartials(files, metalsmith) {
        var _this6 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
          var metadata, partialsDir, _iterator3, _step3, filename, m, _m, unused, name, ext, data, fn, _t, _t2;
          return _regenerator().w(function (_context9) {
            while (1) switch (_context9.p = _context9.n) {
              case 0:
                metadata = metalsmith.metadata();
                partialsDir = path.join(_this6.getSourceDir(), "partials");
                _context9.n = 1;
                return fs.readdirAsync(partialsDir, "utf8");
              case 1:
                files = _context9.v;
                _iterator3 = _createForOfIteratorHelper(files);
                _context9.p = 2;
                _iterator3.s();
              case 3:
                if ((_step3 = _iterator3.n()).done) {
                  _context9.n = 10;
                  break;
                }
                filename = _step3.value;
                m = filename.match(/^(.+)\.([^.]+)$/);
                if (m) {
                  _context9.n = 4;
                  break;
                }
                return _context9.a(3, 9);
              case 4:
                _m = _slicedToArray(m, 3), unused = _m[0], name = _m[1], ext = _m[2];
                if (unused) {
                  // this is simply to avoid linting errors until https://github.com/qooxdoo/qooxdoo/issues/461 is fixed
                }
                _context9.n = 5;
                return fs.readFileAsync(path.join(partialsDir, filename), "utf8");
              case 5:
                data = _context9.v;
                fn = void 0;
                _context9.p = 6;
                fn = dot.template(data);
                _context9.n = 8;
                break;
              case 7:
                _context9.p = 7;
                _t = _context9.v;
                qx.tool.compiler.Console.log("Failed to load partial " + filename + ": " + _t);
                return _context9.a(3, 9);
              case 8:
                fn.name = filename;
                metadata.partials[filename] = fn;
                if (ext === "html") {
                  metadata.partials[name] = fn;
                }
              case 9:
                _context9.n = 3;
                break;
              case 10:
                _context9.n = 12;
                break;
              case 11:
                _context9.p = 11;
                _t2 = _context9.v;
                _iterator3.e(_t2);
              case 12:
                _context9.p = 12;
                _iterator3.f();
                return _context9.f(12);
              case 13:
                return _context9.a(2);
            }
          }, _callee9, null, [[6, 7], [2, 11, 12, 13]]);
        }))();
      },
      /**
       * Generates the site with Metalsmith
       * @returns {Promise}
       */
      generateSite: function generateSite() {
        var _this7 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
          return _regenerator().w(function (_context0) {
            while (1) switch (_context0.n) {
              case 0:
                _context0.n = 1;
                return new Promise(function (resolve, reject) {
                  metalsmith(_this7.getSourceDir()).metadata({
                    site: {
                      title: "Qooxdoo Application Server",
                      description: 'Mini website used by "qx serve"',
                      email: "info@qooxdoo.org",
                      twitter_username: "qooxdoo",
                      github_username: "qooxdoo",
                      pages: ["/", "/about/"]
                    },
                    baseurl: "",
                    url: "",
                    lang: "en",
                    partials: {}
                  }).source(path.join(_this7.getSourceDir(), "src")).destination(_this7.getTargetDir()).clean(true).use(_this7.loadPartials.bind(_this7)).use(markdown()).use(_this7.getPages.bind(_this7)).use(layouts({
                    engine: "dot"
                  })).build(function (err) {
                    if (err) {
                      reject(err);
                    } else {
                      resolve();
                    }
                  });
                });
              case 1:
                return _context0.a(2);
            }
          }, _callee0);
        }))();
      },
      /**
       * Compiles SCSS into CSS
       *
       * @returns {Promise}
       */
      compileScss: function compileScss() {
        var _this8 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
          var result;
          return _regenerator().w(function (_context1) {
            while (1) switch (_context1.n) {
              case 0:
                _context1.n = 1;
                return new Promise(function (resolve, reject) {
                  sass.render({
                    file: path.join(_this8.getSourceDir(), "sass", "qooxdoo.scss"),
                    outFile: path.join(_this8.getTargetDir(), "qooxdoo.css")
                  }, function (err, result) {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(result);
                    }
                  });
                });
              case 1:
                result = _context1.v;
                _context1.n = 2;
                return fs.writeFileAsync(path.join(_this8.getTargetDir(), "qooxdoo.css"), result.css, "utf8");
              case 2:
                return _context1.a(2);
            }
          }, _callee1);
        }))();
      },
      /**
       * Build the development tool apps (APIViewer, Playground, Widgetbrowser, Demobrowser)
       * @return {Promise<void>}
       */
      buildDevtools: function buildDevtools() {
        var _this9 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
          var namespace, apps_path, opts, _i, _arr, name;
          return _regenerator().w(function (_context10) {
            while (1) switch (_context10.n) {
              case 0:
                namespace = _this9.getAppsNamespace();
                process.chdir(_this9.getTargetDir());
                apps_path = path.join(_this9.getTargetDir(), namespace);
                _context10.n = 1;
                return fs.existsAsync(apps_path);
              case 1:
                if (!_context10.v) {
                  _context10.n = 2;
                  break;
                }
                rimraf.sync(apps_path);
              case 2:
                opts = {
                  noninteractive: true,
                  namespace: namespace,
                  theme: "indigo",
                  icontheme: "Tango"
                };
                _context10.n = 3;
                return new qx.tool.cli.commands.Create(opts).process();
              case 3:
                process.chdir(apps_path);
                _i = 0, _arr = ["apiviewer", "widgetbrowser", "playground", "demobrowser"];
              case 4:
                if (!(_i < _arr.length)) {
                  _context10.n = 6;
                  break;
                }
                name = _arr[_i];
                _context10.n = 5;
                return new qx.tool.cli.commands["package"].Install({}).install("qooxdoo/qxl." + name);
              case 5:
                _i++;
                _context10.n = 4;
                break;
              case 6:
                return _context10.a(2);
            }
          }, _callee10);
        }))();
      }
    }
  });
  qx.tool.utils.Website.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Website.js.map?dt=1782705796174