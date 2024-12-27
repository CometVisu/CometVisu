function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
      "qx.tool.compiler.app.Library": {},
      "qx.tool.utils.files.Utils": {},
      "qx.lang.Type": {},
      "qx.tool.utils.Promisify": {}
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
  var _require = require("util"),
    promisify = _require.promisify;
  var readFile = promisify(fs.readFile);
  var log = qx.tool.utils.LogManager.createLog("translation");

  /**
   * Reads and writes .po files for translation
   */
  qx.Class.define("qx.tool.compiler.app.Translation", {
    extend: qx.core.Object,
    /**
     * Constructor
     * @param library {Library}
     * @param locale {String}
     */
    construct: function construct(library, locale) {
      qx.core.Object.constructor.call(this);
      this.setLibrary(library);
      if (locale) {
        this.setLocale(locale);
      }
      this.__P_488_0 = {};
      this.__P_488_1 = {};
    },
    properties: {
      /** The library that this translation is for */
      library: {
        nullable: false,
        check: "qx.tool.compiler.app.Library"
      },
      /** The locale */
      locale: {
        init: "en",
        nullable: false,
        check: "String"
      },
      /** Whether to write line numbers to .po files */
      writeLineNumbers: {
        init: false,
        check: "Boolean"
      }
    },
    members: {
      __P_488_0: null,
      __P_488_1: null,
      __P_488_2: 0,
      __P_488_3: null,
      /**
       * Filename for the .po file
       * @returns {string}
       */
      getPoFilename: function getPoFilename() {
        var library = this.getLibrary();
        return library.getRootDir() + "/" + library.getTranslationPath() + "/" + this.getLocale() + ".po";
      },
      /**
       * Reads the .po file, but only if it has not been loaded or has changed
       *
       * @returns {Promise}|
       */
      checkRead: function checkRead() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var poFile, stat;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (_this.__P_488_2) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return", _this.read());
              case 2:
                poFile = _this.getPoFilename();
                _context.next = 5;
                return qx.tool.utils.files.Utils.safeStat(poFile);
              case 5:
                stat = _context.sent;
                if (!(stat && _this.__P_488_2 == stat.mtime)) {
                  _context.next = 8;
                  break;
                }
                return _context.abrupt("return", undefined);
              case 8:
                return _context.abrupt("return", _this.read());
              case 9:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      /**
       * Reads the .po file
       */
      read: function read() {
        var _this2 = this;
        var t = this;
        if (t.__P_488_3) {
          return t.__P_488_3;
        }
        return t.__P_488_3 = new Promise(function (resolve, reject) {
          t.__P_488_0 = {};
          t.__P_488_1 = {};
          var poFile = _this2.getPoFilename();
          fs.stat(poFile, function (err, stat) {
            if (err) {
              if (err.code == "ENOENT") {
                resolve();
                return undefined;
              }
              reject(err);
              return undefined;
            }
            t.__P_488_2 = stat.mtime;
            return readFile(poFile, {
              encoding: "utf8"
            }).then(function (data) {
              var entry = null;
              var lastKey = null;
              function saveEntry() {
                if (entry) {
                  var key;
                  if (entry.msgctxt) {
                    key = entry.msgctxt + ":" + entry.msgid;
                  } else {
                    key = entry.msgid;
                  }
                  t.__P_488_0[key] = entry;
                }
                entry = null;
                lastKey = null;
              }
              function set(key, value, append) {
                var index = null;
                var m = key.match(/^([^[]+)\[([0-9]+)\]$/);
                value = value.replace(/\\t/g, "\t").replace(/\\r/g, "\r").replace(/\\n/g, "\n").replace(/\\"/g, '"');
                if (m) {
                  key = m[1];
                  index = parseInt(m[2]);
                  if (entry[key] === undefined) {
                    entry[key] = [];
                  }
                  if (!append || typeof entry[key][index] !== "string") {
                    entry[key][index] = value;
                  } else {
                    entry[key][index] += value;
                  }
                } else if (!append || typeof entry[key] !== "string") {
                  entry[key] = value;
                } else {
                  entry[key] += value;
                }
              }
              data.split("\n").forEach(function (line, lineNo) {
                line = line.trim();
                if (!line) {
                  saveEntry();
                  return;
                }
                if (!entry) {
                  entry = {};
                }

                // Comment?
                var m = line.match(/^#([^ ]?) (.*)$/);
                if (m) {
                  var type = m[1];
                  var comment = m[2];
                  var key;
                  if (!entry.comments) {
                    entry.comments = {};
                  }
                  switch (type) {
                    case "":
                      entry.comments.translator = comment;
                      break;
                    case ".":
                      entry.comments.extracted = comment;
                      break;
                    case ":":
                      if (!entry.comments.reference) {
                        entry.comments.reference = {};
                      }
                      {
                        var ref = entry.comments.reference;
                        (comment && comment.match(/[\w/\.]+:\d+/g) || []).forEach(function (entry) {
                          var split = entry.split(":");
                          var classname = split[0];
                          var lineNo = parseInt(split[1], 10);
                          if (!ref[classname]) {
                            ref[classname] = [lineNo];
                          } else if (!ref[classname].includes(lineNo)) {
                            ref[classname].push(lineNo);
                          }
                        });
                      }
                      break;
                    case ",":
                      entry.comments.flags = comment.split(",");
                      break;
                    case "|":
                      m = comment.match(/^([^\s]+)\s+(.*)$/);
                      if (m) {
                        if (!entry.previous) {
                          entry.previous = {};
                        }
                        var tmp = m[1];
                        if (tmp == "msgctxt" || tmp == "msgid") {
                          entry[tmp] = m[2];
                        } else {
                          log.warn("Cannot interpret line " + (lineNo + 1));
                        }
                      } else {
                        log.warn("Cannot interpret line " + (lineNo + 1));
                      }
                      break;
                  }
                  return;
                }
                if (line[0] == '"' && line[line.length - 1] == '"') {
                  line = line.substring(1, line.length - 1);
                  if (!lastKey.match(/^.*\[\d+\]$/) && (lastKey === null || entry[lastKey] === undefined)) {
                    log.error("Cannot interpret line because there is no key to append to, line " + (lineNo + 1));
                  } else {
                    set(lastKey, line, true);
                  }
                  return;
                }

                // Part of the translation
                if (line == "#") {
                  return;
                }
                m = line.match(/^([^\s]+)\s+(.*)$/);
                if (!m) {
                  log.warn("Cannot interpret line " + (lineNo + 1));
                  return;
                }
                key = lastKey = m[1];
                var value = m[2];
                if (value.length >= 2 && value[0] == '"' && value[value.length - 1] == '"') {
                  value = value.substring(1, value.length - 1);
                  set(key, value);
                }
              });
              if (entry) {
                saveEntry();
              }
              resolve();
            });
          });
        });
      },
      /**
       * Writes the .po file
       */
      write: function write() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _this3.writeTo(_this3.getPoFilename());
              case 1:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      /**
       * Writes the .po file to a specific filename
       * @param filename {String}
       */
      writeTo: function writeTo(filename, cb) {
        var t = this;
        var lines = [];
        function write(key, value) {
          if (value === undefined || value === null) {
            return;
          }
          value = value.replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/"/g, '\\"');
          lines.push(key + ' "' + value + '"');
        }
        for (var msgid in t.__P_488_0) {
          var entry = t.__P_488_0[msgid];
          if (entry.comments) {
            if (entry.comments.translator) {
              lines.push("# " + entry.comments.translator);
            }
            if (entry.comments.extracted) {
              lines.push("#. " + entry.comments.extracted);
            }
            if (entry.comments.reference) {
              var refStr = "#:";
              var ref = entry.comments.reference;
              for (var classname in ref) {
                if (ref[classname]) {
                  if (this.isWriteLineNumbers()) {
                    var _iterator = _createForOfIteratorHelper(ref[classname]),
                      _step;
                    try {
                      for (_iterator.s(); !(_step = _iterator.n()).done;) {
                        var lineNo = _step.value;
                        var addStr = " " + classname + ":" + lineNo;
                        if (refStr.length + addStr.length > 78) {
                          // 78 is default length in python po library
                          // line break
                          lines.push(refStr);
                          refStr = "#:" + addStr;
                        } else {
                          refStr += addStr;
                        }
                      }
                    } catch (err) {
                      _iterator.e(err);
                    } finally {
                      _iterator.f();
                    }
                  } else {
                    var _addStr = " " + classname;
                    if (refStr.length + _addStr.length > 78) {
                      // 78 is default length in python po library
                      // line break
                      lines.push(refStr);
                      refStr = "#:" + _addStr;
                    } else {
                      refStr += _addStr;
                    }
                  }
                }
              }
              if (refStr.length > 3) {
                // write remaining refStr
                lines.push(refStr);
              }
            }
            if (entry.comments.flags) {
              lines.push("#, " + entry.comments.flags.join(","));
            }
          } else {
            lines.push("#");
          }
          if (entry.msgctxt) {
            lines.push('msgctxt "' + entry.msgctxt + '"');
          }
          write("msgid", entry.msgid);
          write("msgid_plural", entry.msgid_plural);
          if (qx.lang.Type.isArray(entry.msgstr)) {
            entry.msgstr.forEach(function (value, index) {
              write("msgstr[" + index + "]", value);
            });
          } else if (entry.msgid_plural) {
            write("msgstr[0]", "");
            write("msgstr[1]", "");
          } else {
            write("msgstr", entry.msgstr || "");
          }
          lines.push("");
        }
        var data = lines.join("\n");
        return qx.tool.utils.Promisify.fs.writeFileAsync(filename, data, {
          encoding: "utf8"
        });
      },
      /**
       * Tests whether an entry exists and has translation values
       *
       * @param id {String} msgid
       * @return {Boolean}
       */
      hasEntryValue: function hasEntryValue(id) {
        var entry = this.getEntry(id);
        if (!entry) {
          return false;
        }
        if (qx.lang.Type.isArray(entry.msgstr)) {
          return entry.msgstr.every(function (value) {
            return Boolean(value);
          });
        }
        return Boolean(entry.msgstr);
      },
      /**
       * Returns the entry with the given msgid, null if it does not exist
       * @param id
       * @returns {*|null}
       */
      getEntry: function getEntry(id) {
        return this.__P_488_0[id] || null;
      },
      /**
       * Deletes the entry with the given msgid; return the deleted value, or null if it does not exist
       * @param id
       * @returns {*|null}
       */
      deleteEntry: function deleteEntry(id) {
        var entry = this.__P_488_0[id] || null;
        delete this.__P_488_0[id];
        return entry;
      },
      /**
       * Returns the entry with the given msgid, creating it if it does not exist
       * @param id
       * @returns {*|null}
       */
      getOrCreateEntry: function getOrCreateEntry(id) {
        var t = this;
        var entry = t.__P_488_0[id];
        if (!entry) {
          entry = t.__P_488_0[id] = {
            msgid: id
          };
        }
        return entry;
      },
      /**
       * Returns all entries
       * @returns {null}
       */
      getEntries: function getEntries() {
        return this.__P_488_0;
      },
      /**
       * Returns the translation headers
       * @returns {null}
       */
      getHeaders: function getHeaders() {
        return this.__P_488_1;
      }
    }
  });
  qx.tool.compiler.app.Translation.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Translation.js.map?dt=1735341789079