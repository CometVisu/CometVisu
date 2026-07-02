function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.Promise": {},
      "qx.tool.utils.Utils": {}
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

  var fs = require("fs");
  var path = require("path");
  var rimraf = require("rimraf");
  var _require = require("util"),
    promisify = _require.promisify;
  var stat = promisify(fs.stat);
  var mkdir = promisify(fs.mkdir);
  var readdir = promisify(fs.readdir);
  var rename = promisify(fs.rename);
  qx.Class.define("qx.tool.utils.files.Utils", {
    extend: qx.core.Object,
    statics: {
      findAllFiles: function findAllFiles(dir, fnEach) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var filenames, _t;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                _context2.p = 0;
                _context2.n = 1;
                return readdir(dir);
              case 1:
                filenames = _context2.v;
                _context2.n = 4;
                break;
              case 2:
                _context2.p = 2;
                _t = _context2.v;
                if (!(_t.code == "ENOENT")) {
                  _context2.n = 3;
                  break;
                }
                return _context2.a(2);
              case 3:
                throw _t;
              case 4:
                _context2.n = 5;
                return qx.Promise.all(filenames.map(/*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(shortName) {
                    var filename, tmp;
                    return _regenerator().w(function (_context) {
                      while (1) switch (_context.n) {
                        case 0:
                          filename = path.join(dir, shortName);
                          _context.n = 1;
                          return stat(filename);
                        case 1:
                          tmp = _context.v;
                          if (!tmp.isDirectory()) {
                            _context.n = 3;
                            break;
                          }
                          _context.n = 2;
                          return qx.tool.utils.files.Utils.findAllFiles(filename, fnEach);
                        case 2:
                          _context.n = 4;
                          break;
                        case 3:
                          _context.n = 4;
                          return fnEach(filename);
                        case 4:
                          return _context.a(2);
                      }
                    }, _callee);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }()));
              case 5:
                return _context2.a(2);
            }
          }, _callee2, null, [[0, 2]]);
        }))();
      },
      /**
       * Synchronises two files or folders; files are copied from/to but only if their
       * modification time or size has changed.
       * @param from {String} path to copy from
       * @param to {String} path to copy to
       * @param filter {Function?} optional filter method to validate filenames before sync
       * @async
       */
      sync: function sync(from, to, filter) {
        var t = this;
        function copy(statFrom, statTo) {
          if (statFrom.isDirectory()) {
            var p;
            if (statTo === null) {
              p = mkdir(to);
            } else {
              p = Promise.resolve();
            }
            return p.then(function () {
              return readdir(from).then(function (files) {
                return Promise.all(files.map(function (file) {
                  return t.sync(path.join(from, file), path.join(to, file), filter);
                }));
              });
            });
          } else if (statFrom.isFile()) {
            return qx.Promise.resolve(filter ? filter(from, to) : true).then(function (result) {
              return result && t.copyFile(from, to);
            });
          }
          return undefined;
        }
        return new Promise(function (resolve, reject) {
          var statFrom = null;
          var statTo = null;
          stat(from).then(function (tmp) {
            statFrom = tmp;
            return stat(to).then(function (tmp) {
              return statTo = tmp;
            })["catch"](function (err) {
              if (err.code !== "ENOENT") {
                throw err;
              }
            });
          }).then(function () {
            if (!statTo || statFrom.isDirectory() != statTo.isDirectory()) {
              return t.deleteRecursive(to).then(function () {
                return copy(statFrom, statTo);
              });
            } else if (statFrom.isDirectory() || statFrom.mtime.getTime() > statTo.mtime.getTime() || statFrom.size != statTo.size) {
              return copy(statFrom, statTo);
            }
            return undefined;
          }).then(resolve)["catch"](reject);
        });
      },
      /**
       * Copies a file
       * @param from {String} path to copy from
       * @param to {String} path to copy to
       * @async
       */
      copyFile: function copyFile(from, to) {
        return new Promise(function (resolve, reject) {
          qx.tool.utils.Utils.mkParentPath(to, function () {
            var rs = fs.createReadStream(from, {
              flags: "r",
              encoding: "binary"
            });
            var ws = fs.createWriteStream(to, {
              flags: "w",
              encoding: "binary"
            });
            rs.on("end", function () {
              resolve(from, to);
            });
            rs.on("error", reject);
            ws.on("error", reject);
            rs.pipe(ws);
          });
        });
      },
      /**
       * Returns the stats for a file, or null if the file does not exist
       *
       * @param filename
       * @returns {import("node:fs").Stats}
       * @async
       */
      safeStat: function safeStat(filename) {
        return new Promise(function (resolve, reject) {
          fs.stat(filename, function (err, stats) {
            if (err && err.code != "ENOENT") {
              reject(err);
            } else {
              resolve(err ? null : stats);
            }
          });
        });
      },
      /**
       * Deletes a file, does nothing if the file does not exist
       *
       * @param filename {String} file to delete
       * @async
       */
      safeUnlink: function safeUnlink(filename) {
        return new Promise(function (resolve, reject) {
          fs.unlink(filename, function (err) {
            if (err && err.code != "ENOENT") {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      },
      /**
       * Renames a file, does nothing if the file does not exist
       *
       * @param from {String} file to rename
       * @param to {String} new filename
       * @async
       */
      safeRename: function safeRename(from, to) {
        return new Promise(function (resolve, reject) {
          fs.rename(from, to, function (err) {
            if (err && err.code != "ENOENT") {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      },
      /**
       * Rotates files so that this file does not exist, by renaming the existing file to have a ".1"
       * appended, and the ".1" to be renamed to ".2" etc, up to `length` versions
       *
       * @param filename {String} filename to rotate
       * @param length {Integer} maximum number of files
       * @async
       */
      rotateUnique: function rotateUnique(filename, length) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var lastFile, i, tmp, _t2;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                _context3.n = 1;
                return _this.safeStat(filename);
              case 1:
                _t2 = _context3.v;
                if (!_t2) {
                  _context3.n = 2;
                  break;
                }
                _t2 = length > 1;
              case 2:
                if (!_t2) {
                  _context3.n = 10;
                  break;
                }
                lastFile = null;
                i = length;
              case 3:
                if (!(i > 0)) {
                  _context3.n = 9;
                  break;
                }
                tmp = filename + "." + i;
                if (!(i == length)) {
                  _context3.n = 5;
                  break;
                }
                _context3.n = 4;
                return _this.safeUnlink(tmp);
              case 4:
                _context3.n = 7;
                break;
              case 5:
                _context3.n = 6;
                return _this.safeStat(tmp);
              case 6:
                if (!_context3.v) {
                  _context3.n = 7;
                  break;
                }
                _context3.n = 7;
                return rename(tmp, lastFile);
              case 7:
                lastFile = tmp;
              case 8:
                i--;
                _context3.n = 3;
                break;
              case 9:
                _context3.n = 10;
                return rename(filename, lastFile);
              case 10:
                return _context3.a(2);
            }
          }, _callee3);
        }))();
      },
      /**
       * Deletes a file or directory; directories are recursively removed
       * @param name {String} file or dir to delete
       * @async
       */
      deleteRecursive: function deleteRecursive(name) {
        return new Promise(function (resolve, reject) {
          rimraf(name, function (err) {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      },
      /**
       * Normalises the path and corrects the case of the path to match what is actually on the filing system
       *
       * @param dir {String} the filename to normalise
       * @returns {String} the new path
       * @async
       */
      correctCase: function correctCase(dir) {
        var drivePrefix = "";
        if (process.platform === "win32" && dir.match(/^[a-zA-Z]:/)) {
          drivePrefix = dir.substring(0, 2);
          dir = dir.substring(2);
        }
        dir = dir.replace(/\\/g, "/");
        var segs = dir.split("/");
        if (!segs.length) {
          return drivePrefix + dir;
        }
        var currentDir;
        var index;
        if (segs[0].length) {
          currentDir = "";
          index = 0;
        } else {
          currentDir = "/";
          index = 1;
        }
        function bumpToNext(nextSeg) {
          index++;
          if (currentDir.length && currentDir !== "/") {
            currentDir += "/";
          }
          currentDir += nextSeg;
          return next();
        }
        function next() {
          if (index == segs.length) {
            if (process.platform === "win32") {
              currentDir = currentDir.replace(/\//g, "\\");
            }
            return Promise.resolve(drivePrefix + currentDir);
          }
          var nextSeg = segs[index];
          if (nextSeg == "." || nextSeg == "..") {
            return bumpToNext(nextSeg);
          }
          return new Promise(function (resolve, reject) {
            fs.readdir(currentDir.length == 0 ? "." : drivePrefix + currentDir, {
              encoding: "utf8"
            }, function (err, files) {
              if (err) {
                reject(err);
                return;
              }
              var nextLowerCase = nextSeg.toLowerCase();
              var exact = false;
              var insensitive = null;
              for (var i = 0; i < files.length; i++) {
                if (files[i] === nextSeg) {
                  exact = true;
                  break;
                }
                if (files[i].toLowerCase() === nextLowerCase) {
                  insensitive = files[i];
                }
              }
              if (!exact && insensitive) {
                nextSeg = insensitive;
              }
              bumpToNext(nextSeg).then(resolve);
            });
          });
        }
        return new Promise(function (resolve, reject) {
          fs.stat(drivePrefix + dir, function (err) {
            if (err) {
              if (err.code == "ENOENT") {
                resolve(drivePrefix + dir);
              } else {
                reject(err);
              }
            } else {
              next().then(resolve);
            }
          });
        });
      }
    }
  });
  qx.tool.utils.files.Utils.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Utils.js.map?dt=1782967165098