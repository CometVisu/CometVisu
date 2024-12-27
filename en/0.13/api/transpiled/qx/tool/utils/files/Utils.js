function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var filenames;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return readdir(dir);
              case 3:
                filenames = _context2.sent;
                _context2.next = 11;
                break;
              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                if (!(_context2.t0.code == "ENOENT")) {
                  _context2.next = 10;
                  break;
                }
                return _context2.abrupt("return");
              case 10:
                throw _context2.t0;
              case 11:
                _context2.next = 13;
                return qx.Promise.all(filenames.map(/*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(shortName) {
                    var filename, tmp;
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) switch (_context.prev = _context.next) {
                        case 0:
                          filename = path.join(dir, shortName);
                          _context.next = 3;
                          return stat(filename);
                        case 3:
                          tmp = _context.sent;
                          if (!tmp.isDirectory()) {
                            _context.next = 9;
                            break;
                          }
                          _context.next = 7;
                          return qx.tool.utils.files.Utils.findAllFiles(filename, fnEach);
                        case 7:
                          _context.next = 11;
                          break;
                        case 9:
                          _context.next = 11;
                          return fnEach(filename);
                        case 11:
                        case "end":
                          return _context.stop();
                      }
                    }, _callee);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }()));
              case 13:
              case "end":
                return _context2.stop();
            }
          }, _callee2, null, [[0, 6]]);
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
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var lastFile, i, tmp;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this.safeStat(filename);
              case 2:
                _context3.t0 = _context3.sent;
                if (!_context3.t0) {
                  _context3.next = 5;
                  break;
                }
                _context3.t0 = length > 1;
              case 5:
                if (!_context3.t0) {
                  _context3.next = 26;
                  break;
                }
                lastFile = null;
                i = length;
              case 8:
                if (!(i > 0)) {
                  _context3.next = 24;
                  break;
                }
                tmp = filename + "." + i;
                if (!(i == length)) {
                  _context3.next = 15;
                  break;
                }
                _context3.next = 13;
                return _this.safeUnlink(tmp);
              case 13:
                _context3.next = 20;
                break;
              case 15:
                _context3.next = 17;
                return _this.safeStat(tmp);
              case 17:
                if (!_context3.sent) {
                  _context3.next = 20;
                  break;
                }
                _context3.next = 20;
                return rename(tmp, lastFile);
              case 20:
                lastFile = tmp;
              case 21:
                i--;
                _context3.next = 8;
                break;
              case 24:
                _context3.next = 26;
                return rename(filename, lastFile);
              case 26:
              case "end":
                return _context3.stop();
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

//# sourceMappingURL=Utils.js.map?dt=1735341792148