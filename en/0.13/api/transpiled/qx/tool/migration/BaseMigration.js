function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
      "qx.tool.migration.Runner": {},
      "qx.tool.config.Utils": {},
      "qx.tool.compiler.Console": {},
      "qx.core.Assert": {},
      "qx.tool.config.Abstract": {},
      "qx.tool.cli.commands.package.Upgrade": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2021 The authors
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (info@bibliograph.org, @cboulanger)
  
  ************************************************************************ */

  var process = require("process");
  var fs = qx.tool.utils.Promisify.fs;
  var fsp = require("fs").promises;
  var replaceInFile = require("replace-in-file");
  var semver = require("semver");

  /**
   * The base class for migrations, containing useful methods to
   * manipulate source files, and to update runtime information
   * on the individual migration class. It also holds a reference
   * to the runner which contains meta data for all migrations.
   */
  qx.Class.define("qx.tool.migration.BaseMigration", {
    type: "abstract",
    extend: qx.core.Object,
    /**
     * Constructor
     * @param {qx.tool.migration.Runner} runner The runner instance
     */
    construct: function construct(runner) {
      qx.core.Object.constructor.call(this);
      this.setRunner(runner);
    },
    properties: {
      runner: {
        check: "qx.tool.migration.Runner"
      },
      applied: {
        check: "Number",
        init: 0
      },
      pending: {
        check: "Number",
        init: 0
      }
    },
    members: {
      /**
       * Returns the version of qooxdoo this migration applies to.
       */
      getVersion: function getVersion() {
        return this.classname.match(/\.M([0-9_]+)$/)[1].replace(/_/g, ".");
      },
      /**
       * Returns the qooxdoo version that has been passed to the Runner or the
       * one from the environment
       * @return {Promise<String>}
       */
      getQxVersion: function getQxVersion() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _context.n = 1;
                return _this.getRunner().getQxVersion();
              case 1:
                _t = _context.v;
                if (_t) {
                  _context.n = 2;
                  break;
                }
                _t = qx.tool.config.Utils.getQxVersion();
              case 2:
                return _context.a(2, _t);
            }
          }, _callee);
        }))();
      },
      /**
       * Output message that announces a migration. What this does is to mark it
       * visually
       * @param message
       */
      announce: function announce(message) {
        if (this.getRunner().getVerbose()) {
          qx.tool.compiler.Console.info("*** " + message);
        }
      },
      /**
       * Marks one or more migration steps as applied
       * @param {Number|String} param Optional. If number, number of migrations to mark
       * as applied, defaults to 1; if String, message to be `info()`ed if verbose=true
       */
      markAsApplied: function markAsApplied(param) {
        var numberOfMigrations = 1;
        if (typeof param == "string") {
          if (this.getRunner().getVerbose()) {
            qx.tool.compiler.Console.info(param);
          }
        } else if (typeof param == "number") {
          numberOfMigrations = param;
        } else if (typeof param != "undefined") {
          throw new TypeError("Argument must be string or number");
        }
        this.setApplied(this.getApplied() + numberOfMigrations);
      },
      /**
       * Marks one or more migration steps as pending
       * @param {Number|String} param Optional. If number, number of migrations to mark
       * as pending, defaults to 1; if String, message to be `announce()`ed
       */
      markAsPending: function markAsPending(param) {
        var numberOfMigrations = 1;
        if (typeof param == "string") {
          if (this.getRunner().getVerbose()) {
            this.announce(param);
          }
        } else if (typeof param == "number") {
          numberOfMigrations = param;
        } else if (typeof param != "undefined") {
          throw new TypeError("Argument must be string or number");
        }
        this.setPending(this.getPending() + numberOfMigrations);
      },
      /**
       * Rename source files, unless this is a dry run, in which case
       * it will only annouce it and mark the migration step as pending.
       * @param {String[]} fileList Array containing arrays of [new name, old name]
       */
      renameFilesUnlessDryRun: function renameFilesUnlessDryRun(fileList) {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var dryRun, filesToRename, _iterator, _step, _step$value, newPath, oldPath, _iterator2, _step2, _step2$value, _newPath, _oldPath, _t2, _t3;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                dryRun = _this2.getRunner().getDryRun();
                qx.core.Assert.assertArray(fileList);
                _context2.n = 1;
                return _this2.checkFilesToRename(fileList);
              case 1:
                filesToRename = _context2.v;
                if (!filesToRename.length) {
                  _context2.n = 13;
                  break;
                }
                if (!dryRun) {
                  _context2.n = 2;
                  break;
                }
                // announce migration
                _this2.announce("The following files will be renamed:");
                _iterator = _createForOfIteratorHelper(filesToRename);
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    _step$value = _slicedToArray(_step.value, 2), newPath = _step$value[0], oldPath = _step$value[1];
                    _this2.announce("'".concat(oldPath, "' => '").concat(newPath, "'."));
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
                _this2.markAsPending();
                _context2.n = 13;
                break;
              case 2:
                // apply migration
                _iterator2 = _createForOfIteratorHelper(filesToRename);
                _context2.p = 3;
                _iterator2.s();
              case 4:
                if ((_step2 = _iterator2.n()).done) {
                  _context2.n = 9;
                  break;
                }
                _step2$value = _slicedToArray(_step2.value, 2), _newPath = _step2$value[0], _oldPath = _step2$value[1];
                _context2.p = 5;
                _context2.n = 6;
                return fs.renameAsync(_oldPath, _newPath);
              case 6:
                _this2.debug("Renamed '".concat(_oldPath, "' to '").concat(_newPath, "'."));
                _context2.n = 8;
                break;
              case 7:
                _context2.p = 7;
                _t2 = _context2.v;
                qx.tool.compiler.Console.error("Renaming '".concat(_oldPath, "' to '").concat(_newPath, "' failed: ").concat(_t2.message, "."));
                process.exit(1);
              case 8:
                _context2.n = 4;
                break;
              case 9:
                _context2.n = 11;
                break;
              case 10:
                _context2.p = 10;
                _t3 = _context2.v;
                _iterator2.e(_t3);
              case 11:
                _context2.p = 11;
                _iterator2.f();
                return _context2.f(11);
              case 12:
                _this2.markAsApplied();
              case 13:
                return _context2.a(2);
            }
          }, _callee2, null, [[5, 7], [3, 10, 11, 12]]);
        }))();
      },
      /**
       * Given an array of [newPath,oldPath], filter by those which exist
       * at oldPath and not at newPath
       * @param fileList {[]}
       * @return {Promise<[]>}
       */
      checkFilesToRename: function checkFilesToRename(fileList) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var filesToRename, _iterator3, _step3, _step3$value, newPath, oldPath, _t4, _t5;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.p = _context3.n) {
              case 0:
                filesToRename = [];
                _iterator3 = _createForOfIteratorHelper(fileList);
                _context3.p = 1;
                _iterator3.s();
              case 2:
                if ((_step3 = _iterator3.n()).done) {
                  _context3.n = 7;
                  break;
                }
                _step3$value = _slicedToArray(_step3.value, 2), newPath = _step3$value[0], oldPath = _step3$value[1];
                _context3.n = 3;
                return fs.existsAsync(newPath);
              case 3:
                _t4 = !_context3.v;
                if (!_t4) {
                  _context3.n = 5;
                  break;
                }
                _context3.n = 4;
                return fs.existsAsync(oldPath);
              case 4:
                _t4 = _context3.v;
              case 5:
                if (!_t4) {
                  _context3.n = 6;
                  break;
                }
                filesToRename.push([newPath, oldPath]);
              case 6:
                _context3.n = 2;
                break;
              case 7:
                _context3.n = 9;
                break;
              case 8:
                _context3.p = 8;
                _t5 = _context3.v;
                _iterator3.e(_t5);
              case 9:
                _context3.p = 9;
                _iterator3.f();
                return _context3.f(9);
              case 10:
                return _context3.a(2, filesToRename);
            }
          }, _callee3, null, [[1, 8, 9, 10]]);
        }))();
      },
      /**
       * Checks if the given file or array of files contains a given text
       * @param {String|String[]} files
       * @param {String} text
       * @return {Promise<Boolean>}
       */
      checkFilesContain: function checkFilesContain(files, text) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var _iterator4, _step4, file, _t6, _t7;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.p = _context4.n) {
              case 0:
                files = Array.isArray(files) ? files : [files];
                _iterator4 = _createForOfIteratorHelper(files);
                _context4.p = 1;
                _iterator4.s();
              case 2:
                if ((_step4 = _iterator4.n()).done) {
                  _context4.n = 7;
                  break;
                }
                file = _step4.value;
                _context4.n = 3;
                return fsp.stat(file);
              case 3:
                _t6 = _context4.v.isFile();
                if (!_t6) {
                  _context4.n = 5;
                  break;
                }
                _context4.n = 4;
                return fsp.readFile(file, "utf8");
              case 4:
                _t6 = _context4.v.includes(text);
              case 5:
                if (!_t6) {
                  _context4.n = 6;
                  break;
                }
                return _context4.a(2, true);
              case 6:
                _context4.n = 2;
                break;
              case 7:
                _context4.n = 9;
                break;
              case 8:
                _context4.p = 8;
                _t7 = _context4.v;
                _iterator4.e(_t7);
              case 9:
                _context4.p = 9;
                _iterator4.f();
                return _context4.f(9);
              case 10:
                return _context4.a(2, false);
            }
          }, _callee4, null, [[1, 8, 9, 10]]);
        }))();
      },
      /**
       * Replace text in source files, unless this is a dry run, in which case
       * it will only annouce it and mark the migration step as pending.
       * @param {{files: string, from: string, to: string}[]} replaceInFilesArr
       *    Array containing objects compatible with https://github.com/adamreisnz/replace-in-file
       * @return {Promise<void>}
       */
      replaceInFilesUnlessDryRun: function replaceInFilesUnlessDryRun() {
        var _arguments = arguments,
          _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
          var replaceInFilesArr, dryRun, _iterator5, _step5, replaceInFiles, _t8, _t9;
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.p = _context5.n) {
              case 0:
                replaceInFilesArr = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : [];
                qx.core.Assert.assertArray(replaceInFilesArr);
                dryRun = _this3.getRunner().getDryRun();
                _iterator5 = _createForOfIteratorHelper(replaceInFilesArr);
                _context5.p = 1;
                _iterator5.s();
              case 2:
                if ((_step5 = _iterator5.n()).done) {
                  _context5.n = 8;
                  break;
                }
                replaceInFiles = _step5.value;
                _context5.n = 3;
                return _this3.checkFilesContain(replaceInFiles.files, replaceInFiles.from);
              case 3:
                if (!_context5.v) {
                  _context5.n = 7;
                  break;
                }
                if (!dryRun) {
                  _context5.n = 4;
                  break;
                }
                _this3.announce("In the file(s) ".concat(replaceInFiles.files, ", '").concat(replaceInFiles.from, "' will be changed to '").concat(replaceInFiles.to, "'."));
                _this3.markAsPending();
                return _context5.a(3, 7);
              case 4:
                _context5.p = 4;
                _this3.debug("Replacing '".concat(replaceInFiles.from, "' with '").concat(replaceInFiles.to, "' in ").concat(replaceInFiles.files));
                _context5.n = 5;
                return replaceInFile(replaceInFiles);
              case 5:
                _this3.markAsApplied();
                _context5.n = 7;
                break;
              case 6:
                _context5.p = 6;
                _t8 = _context5.v;
                qx.tool.compiler.Console.error("Error replacing in files: ".concat(_t8.message));
                process.exit(1);
              case 7:
                _context5.n = 2;
                break;
              case 8:
                _context5.n = 10;
                break;
              case 9:
                _context5.p = 9;
                _t9 = _context5.v;
                _iterator5.e(_t9);
              case 10:
                _context5.p = 10;
                _iterator5.f();
                return _context5.f(10);
              case 11:
                return _context5.a(2);
            }
          }, _callee5, null, [[4, 6], [1, 9, 10, 11]]);
        }))();
      },
      /**
       * Updates a dependency in the given Manifest model, , unless this is a dry run, in which case
       * it will only annouce it and mark the migration step as pending.
       * @param {qx.tool.config.Manifest} manifestModel
       * @param {String} dependencyName The name of the dependency in the `require object
       * @param {String} semverRange A semver-compatible range string
       * @return {Promise<void>}
       * @private
       * @return {Promise<void>}
       */
      updateDependencyUnlessDryRun: function updateDependencyUnlessDryRun(manifestModel, dependencyName, semverRange) {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
          var oldRange;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.n) {
              case 0:
                oldRange = manifestModel.getValue("requires.".concat(dependencyName));
                if (_this4.getRunner().getDryRun()) {
                  _this4.announce("Manifest version range for ".concat(dependencyName, " will be updated from ").concat(oldRange, " to ").concat(semverRange, "."));
                  _this4.markAsPending();
                } else {
                  manifestModel.setValue("requires.".concat(dependencyName), semverRange);
                  _this4.markAsApplied();
                }
              case 1:
                return _context6.a(2);
            }
          }, _callee6);
        }))();
      },
      /**
       * Updates the `@qooxdoo/framework` dependency in the given Manifest model, if
       * the current qooxdoo version is not covered by it. If this is a dry run, the
       * change will only be annouced and the migration step marked as pending.
       *
       * @param {qx.tool.config.Manifest} manifestModel
       * @return {Promise<void>}
       */
      updateQxDependencyUnlessDryRun: function updateQxDependencyUnlessDryRun(manifestModel) {
        var _this5 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
          var qxVersion, qxRange;
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.n) {
              case 0:
                _context7.n = 1;
                return _this5.getQxVersion();
              case 1:
                qxVersion = _context7.v;
                qxRange = manifestModel.getValue("requires.@qooxdoo/framework");
                if (semver.satisfies(qxVersion, qxRange)) {
                  _context7.n = 2;
                  break;
                }
                qxRange = "^".concat(qxVersion);
                _context7.n = 2;
                return _this5.updateDependencyUnlessDryRun(manifestModel, "@qooxdoo/framework", qxRange);
              case 2:
                return _context7.a(2);
            }
          }, _callee7);
        }))();
      },
      /**
       * Updates the json-schema in a configuration file, unless this is a dry run, in which case
       * it will only annouce it and mark the migration step as pending.
       * @param {qx.tool.config.Abstract} configModel
       * @param {String} schemaUri
       * @return {Promise<void>}
       */
      updateSchemaUnlessDryRun: function updateSchemaUnlessDryRun(configModel, schemaUri) {
        var _this6 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
          return _regenerator().w(function (_context8) {
            while (1) switch (_context8.n) {
              case 0:
                qx.core.Assert.assertInstance(configModel, qx.tool.config.Abstract);
                if (configModel.getValue("$schema") !== schemaUri) {
                  if (_this6.getRunner().getDryRun()) {
                    _this6.markAsPending("Schema version for ".concat(configModel.getDataPath(), " will be set to ").concat(schemaUri, "."));
                  } else {
                    configModel.setValue("$schema", schemaUri);
                    _this6.markAsApplied("Schema version for ".concat(configModel.getDataPath(), " updated."));
                  }
                }
              case 1:
                return _context8.a(2);
            }
          }, _callee8);
        }))();
      },
      /**
       * Upgrades the applications's installed packages, unless this is a dry run, in which case
       * it will only annouce it and mark the migration step as pending.
       * @return {Promise<void>}
       */
      upgradePackagesUnlessDryRun: function upgradePackagesUnlessDryRun() {
        var _this7 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
          var runner, options;
          return _regenerator().w(function (_context9) {
            while (1) switch (_context9.n) {
              case 0:
                runner = _this7.getRunner();
                if (!runner.getDryRun()) {
                  _context9.n = 1;
                  break;
                }
                _this7.announce("Packages will be upgraded.");
                _this7.markAsPending();
                _context9.n = 3;
                break;
              case 1:
                options = {
                  verbose: runner.getVerbose(),
                  qxVersion: runner.getQxVersion()
                };
                _context9.n = 2;
                return new qx.tool.cli.commands["package"].Upgrade(options).process();
              case 2:
                _this7.markAsApplied();
              case 3:
                return _context9.a(2);
            }
          }, _callee9);
        }))();
      }
    }
  });
  qx.tool.migration.BaseMigration.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BaseMigration.js.map?dt=1778272845142