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
      this.__P_498_0 = {};
      this.__P_498_1 = {};
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
      __P_498_0: null,
      __P_498_1: null,
      __P_498_2: 0,
      __P_498_3: null,
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var poFile, stat;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                if (_this.__P_498_2) {
                  _context.n = 1;
                  break;
                }
                return _context.a(2, _this.read());
              case 1:
                poFile = _this.getPoFilename();
                _context.n = 2;
                return qx.tool.utils.files.Utils.safeStat(poFile);
              case 2:
                stat = _context.v;
                if (!(stat && _this.__P_498_2 == stat.mtime)) {
                  _context.n = 3;
                  break;
                }
                return _context.a(2, undefined);
              case 3:
                return _context.a(2, _this.read());
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
        if (t.__P_498_3) {
          return t.__P_498_3;
        }
        return t.__P_498_3 = new Promise(function (resolve, reject) {
          t.__P_498_0 = {};
          t.__P_498_1 = {};
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
            t.__P_498_2 = stat.mtime;
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
                  t.__P_498_0[key] = entry;
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _this3.writeTo(_this3.getPoFilename());
              case 1:
                return _context2.a(2);
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
        for (var msgid in t.__P_498_0) {
          var entry = t.__P_498_0[msgid];
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
        return this.__P_498_0[id] || null;
      },
      /**
       * Deletes the entry with the given msgid; return the deleted value, or null if it does not exist
       * @param id
       * @returns {*|null}
       */
      deleteEntry: function deleteEntry(id) {
        var entry = this.__P_498_0[id] || null;
        delete this.__P_498_0[id];
        return entry;
      },
      /**
       * Returns the entry with the given msgid, creating it if it does not exist
       * @param id
       * @returns {*|null}
       */
      getOrCreateEntry: function getOrCreateEntry(id) {
        var t = this;
        var entry = t.__P_498_0[id];
        if (!entry) {
          entry = t.__P_498_0[id] = {
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
        return this.__P_498_0;
      },
      /**
       * Returns the translation headers
       * @returns {null}
       */
      getHeaders: function getHeaders() {
        return this.__P_498_1;
      }
    }
  });
  qx.tool.compiler.app.Translation.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Translation.js.map?dt=1778272843513