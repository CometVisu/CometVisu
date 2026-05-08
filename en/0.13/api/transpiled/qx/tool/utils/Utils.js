function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
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
      "qx.log.Logger": {},
      "qx.Promise": {},
      "qx.util.ResourceManager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2017 Zenesis Ltd
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (john.spackman@zenesis.com, @johnspackman)
  
  ************************************************************************ */
  var path = require("upath");
  var fs = require("fs");
  var async = require("async");
  var _require = require("util"),
    promisify = _require.promisify;
  var child_process = require("child_process");
  var psTree = require("ps-tree");
  /**
   * @ignore(process)
   */
  /* global process */
  /**
   * Utility methods
   */
  qx.Class.define("qx.tool.utils.Utils", {
    extend: qx.core.Object,
    statics: {
      /**
       * Creates a Promise which can be resolved/rejected externally - it has
       * the resolve/reject methods as properties
       *
       * @returns {Promise} a promise
       */
      newExternalPromise: function newExternalPromise() {
        var resolve;
        var reject;
        var promise = new Promise(function (resolve_, reject_) {
          resolve = resolve_;
          reject = reject_;
        });
        promise.resolve = resolve;
        promise.reject = reject;
        return promise;
      },
      promisifyThis: function promisifyThis(fn, self) {
        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }
        return new Promise(function (resolve, reject) {
          args = args.slice();
          args.push(function (err, result) {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
          try {
            fn.apply(self, args);
          } catch (ex) {
            reject(ex);
          }
        });
      },
      /**
       * Error that can be thrown to indicate wrong user input  and which doesn't
       * need a stack trace
       *
       * @type {new (message: string) => Error}
       */
      UserError: /*#__PURE__*/function (_Error) {
        "use strict";

        function UserError(message) {
          var _this;
          _classCallCheck(this, UserError);
          _this = _callSuper(this, UserError, [message]);
          _this.name = "UserError";
          _this.stack = null;
          return _this;
        }
        _inherits(UserError, _Error);
        return _createClass(UserError);
      }(/*#__PURE__*/_wrapNativeSuper(Error)),
      /**
       * Formats the time in a human readable format, eg "1h 23m 45.678s"
       *
       * @param {number} millisec
       * @returns {string} formatted string
       */
      formatTime: function formatTime(millisec) {
        var seconds = Math.floor(millisec / 1000);
        millisec %= 1000;
        var minutes = Math.floor(seconds / 60);
        seconds %= 60;
        var hours = Math.floor(minutes / 60);
        minutes %= 60;
        var result = "";
        if (hours) {
          result += (hours > 9 ? hours : "0" + hours) + "h ";
        }
        if (hours || minutes) {
          result += (minutes > 9 ? minutes : "0" + minutes) + "m ";
        }
        if (seconds > 9 || !hours && !minutes) {
          result += seconds;
        } else if (hours || minutes) {
          result += "0" + seconds;
        }
        result += "." + (millisec > 99 ? "" : millisec > 9 ? "0" : "00") + millisec + "s";
        return result;
      },
      /**
       * Creates a dir
       * @param dir
       * @param cb
       */
      mkpath: function mkpath(dir, cb) {
        dir = path.normalize(dir);
        var segs = dir.split(path.sep);
        var made = "";
        async.eachSeries(segs, function (seg, cb) {
          if (made.length || !seg.length) {
            made += "/";
          }
          made += seg;
          fs.exists(made, function (exists) {
            if (!exists) {
              fs.mkdir(made, function (err) {
                if (err && err.code === "EEXIST") {
                  err = null;
                }
                cb(err);
              });
              return;
            }
            fs.stat(made, function (err, stat) {
              if (err) {
                cb(err);
              } else if (stat.isDirectory()) {
                cb(null);
              } else {
                cb(new Error("Cannot create " + made + " (in " + dir + ") because it exists and is not a directory", "ENOENT"));
              }
            });
          });
        }, function (err) {
          cb(err);
        });
      },
      /**
       * Creates the parent directory of a filename, if it does not already exist
       */
      mkParentPath: function mkParentPath(dir, cb) {
        var segs = dir.split(/[\\\/]/);
        segs.pop();
        if (!segs.length) {
          return cb && cb();
        }
        dir = segs.join(path.sep);
        return this.mkpath(dir, cb);
      },
      /**
       * Creates the parent directory of a filename, if it does not already exist
       *
       * @param {string} filename the filename to create the parent directory of
       *
       * @return {Promise?} the value
       */
      makeParentDir: function makeParentDir(filename) {
        var mkParentPath = promisify(this.mkParentPath).bind(this);
        return mkParentPath(filename);
      },
      /**
       * Creates a directory, if it does not exist, including all intermediate paths
       *
       * @param {string} filename the directory to create
       *
       * @return {Promise?} the value
       */
      makeDirs: function makeDirs(filename) {
        var mkpath = promisify(this.mkpath);
        return mkpath(filename);
      },
      /**
       * Writable stream that keeps track of what the current line number is
       */
      LineCountingTransform: null,
      /**
       * Writable stream that strips out sourceMappingURL comments
       */
      StripSourceMapTransform: null,
      /**
       * Writable stream that keeps track of what's been written and can return
       * a copy as a string
       */
      ToStringWriteStream: null,
      /*  Function to test if an object is a plain object, i.e. is constructed
       **  by the built-in Object constructor and inherits directly from Object.prototype
       **  or null. Some built-in objects pass the test, e.g. Math which is a plain object
       **  and some host or exotic objects may pass also.
       **
       **  @param {} obj - value to test
       **  @returns {Boolean} true if passes tests, false otherwise
       *
       * @see https://stackoverflow.com/a/5878101/2979698
       */
      isPlainObject: function isPlainObject(obj) {
        // Basic check for Type object that's not null
        if (_typeof(obj) == "object" && obj !== null) {
          // If Object.getPrototypeOf supported, use it
          if (typeof Object.getPrototypeOf == "function") {
            var proto = Object.getPrototypeOf(obj);
            return proto === Object.prototype || proto === null;
          }

          // Otherwise, use internal class
          // This should be reliable as if getPrototypeOf not supported, is pre-ES5
          return Object.prototype.toString.call(obj) == "[object Object]";
        }

        // Not an object
        return false;
      },
      /**
       * Runs the given command and returns an object containing information on the
       * `exitCode`, the `output`, potential `error`s, and additional `messages`.
       * @param {String} cwd The current working directory
       * @param {String} args One or more command line arguments, including the
       * command itself
       * @return {{exitCode: Number, output: String, error: *, messages: *}}
       */
      runCommand: function runCommand(cwd) {
        var _arguments = arguments;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var _len2, args, _key2, options;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                for (_len2 = _arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = _arguments[_key2];
                }
                options = {};
                if (_typeof(cwd) == "object") {
                  options = cwd;
                } else {
                  args = args.filter(function (value) {
                    if (typeof value == "string") {
                      return true;
                    }
                    if (!options) {
                      options = value;
                    }
                    return false;
                  });
                  if (!options.cwd) {
                    options.cwd = cwd;
                  }
                  if (!options.cmd) {
                    options.cmd = args.shift();
                  }
                  if (!options.args) {
                    options.args = args;
                  }
                }
                if (!options.error) {
                  options.error = console.error;
                }
                if (!options.log) {
                  options.log = console.log;
                }
                _context.n = 1;
                return new Promise(function (resolve, reject) {
                  var env = process.env;
                  if (options.env) {
                    env = Object.assign({}, env);
                    Object.assign(env, options.env);
                  }
                  var proc = child_process.spawn(options.cmd, options.args, {
                    cwd: options.cwd,
                    shell: true,
                    env: env
                  });
                  var result = {
                    exitCode: null,
                    output: "",
                    error: "",
                    messages: null
                  };
                  proc.stdout.on("data", function (data) {
                    data = data.toString().trim();
                    options.log(data);
                    result.output += data;
                  });
                  proc.stderr.on("data", function (data) {
                    data = data.toString().trim();
                    options.error(data);
                    result.error += data;
                  });
                  proc.on("close", function (code) {
                    result.exitCode = code;
                    resolve(result);
                  });
                  proc.on("error", function (err) {
                    reject(err);
                  });
                });
              case 1:
                return _context.a(2, _context.v);
            }
          }, _callee);
        }))();
      },
      /**
       * Awaitable wrapper around child_process.spawn.
       * Runs a command in a separate process. The output of the command
       * is ignored. Throws when the exit code is not 0.
       * @param  {String} cmd Name of the command
       * @param  {Array} args Array of arguments to the command
       * @return {Promise<Number>} A promise that resolves with the exit code
       */
      run: function run(cmd, args) {
        var opts = {
          env: process.env
        };
        return new Promise(function (resolve, reject) {
          var exe = child_process.spawn(cmd, args, opts);
          // suppress all output unless in verbose mode
          exe.stdout.on("data", function (data) {
            qx.log.Logger.debug(data.toString());
          });
          exe.stderr.on("data", function (data) {
            qx.log.Logger.error(data.toString());
          });
          exe.on("close", function (code) {
            if (code !== 0) {
              var message = "Error executing '".concat(cmd, " ").concat(args.join(" "), "'. Use --verbose to see what went wrong.");
              reject(new qx.tool.utils.Utils.UserError(message));
            } else {
              resolve(0);
            }
          });
          exe.on("error", reject);
        });
      },
      /**
       * Awaitable wrapper around child_process.exec
       * Executes a command and return its result wrapped in a Promise.
       * @param cmd {String} Command with all parameters
       * @return {Promise<String>} Promise that resolves with the result
       */
      exec: function exec(cmd) {
        return new Promise(function (resolve, reject) {
          child_process.exec(cmd, function (err, stdout, stderr) {
            if (err) {
              reject(err);
            }
            if (stderr) {
              reject(new Error(stderr));
            }
            resolve(stdout);
          });
        });
      },
      /**
       * Parses a command line and separates them out into an array that can be given to `child_process.spawn` etc
       *
       * @param {String} cmd
       * @returns {String[]}
       */
      parseCommand: function parseCommand(str) {
        var inQuote = null;
        var inArg = false;
        var lastC = null;
        var start = 0;
        var args = [];
        for (var i = 0; i < str.length; i++) {
          var c = str[i];
          if (inQuote) {
            if (c == inQuote) {
              inQuote = null;
            }
            continue;
          }
          if (c == '"' || c == "'") {
            inQuote = c;
            if (!inArg) {
              inArg = true;
              start = i;
            }
            continue;
          }
          if (c == " " || c == "\t") {
            if (inArg) {
              var arg = str.substring(start, i);
              args.push(arg);
              inArg = false;
            }
          } else {
            if (!inArg) {
              inArg = true;
              start = i;
            }
          }
        }
        if (inArg) {
          var _arg = str.substring(start);
          args.push(_arg);
        }
        return args;
      },
      /**
       * Quotes special characters in the argument array, ensuring that they are safe to pass to the command line
       *
       * @param {String[]} cmd
       * @returns {String[]}
       */
      quoteCommand: function quoteCommand(cmd) {
        var SPECIALS = '&*?;# "';
        cmd = cmd.map(function (arg) {
          var c = arg[0];
          if ((c == "'" || c == '"') && c == arg[arg.length - 1]) {
            return arg;
          }
          if (arg.indexOf("'") > -1) {
            if (arg.indexOf('"') > -1) {
              return "$'" + arg.replace(/'/g, "\\'") + "'";
            }
            return '"' + arg + '"';
          }
          for (var i = 0; i < SPECIALS.length; i++) {
            if (arg.indexOf(SPECIALS[i]) > -1) {
              return "'" + arg + "'";
            }
          }
          return arg;
        });
        return cmd;
      },
      /**
       * Reformats a command line
       *
       * @param {String} cmd
       * @returns {String}
       */
      formatCommand: function formatCommand(cmd) {
        return qx.tool.utils.Utils.quoteCommand(cmd).join(" ");
      },
      /**
       * Kills a process tree
       *
       * @param {Number} parentId parent process ID to kill
       */
      killTree: function killTree(parentId) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _context2.n = 1;
                return new qx.Promise(function (resolve, reject) {
                  psTree(parentId, function (err, children) {
                    if (err) {
                      reject(err);
                      return;
                    }
                    children.forEach(function (item) {
                      try {
                        process.kill(item.PID);
                      } catch (ex) {
                        // Nothing
                      }
                    });
                    try {
                      process.kill(parentId);
                    } catch (ex) {
                      // Nothing
                    }
                    resolve();
                  });
                });
              case 1:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      /**
       * Returns the absolute path to the template directory
       * @return {String}
       */
      getTemplateDir: function getTemplateDir() {
        var dir = qx.util.ResourceManager.getInstance().toUri("qx/tool/cli/templates/template_vars.js");
        dir = path.dirname(dir);
        return dir;
      },
      /**
       * Detects whether the command line explicit set an option (as opposed to yargs
       * providing a default value).  Note that this does not handle aliases, use the
       * actual, full option name.
       *
       * @param option {String} the name of the option, eg "listen-port"
       * @return {Boolean}
       */
      isExplicitArg: function isExplicitArg(option) {
        function searchForOption(option) {
          return process.argv.indexOf(option) > -1;
        }
        return searchForOption("-".concat(option)) || searchForOption("--".concat(option));
      }
    },
    defer: function defer(statics) {
      var _require2 = require("stream"),
        Writable = _require2.Writable,
        Transform = _require2.Transform;
      var LineCountingTransform = /*#__PURE__*/function (_Transform) {
        "use strict";

        function LineCountingTransform(options) {
          var _this2;
          _classCallCheck(this, LineCountingTransform);
          _this2 = _callSuper(this, LineCountingTransform, [options]);
          _this2.__P_526_0 = 1;
          return _this2;
        }
        _inherits(LineCountingTransform, _Transform);
        return _createClass(LineCountingTransform, [{
          key: "_write",
          value: function _write(chunk, encoding, callback) {
            var str = chunk.toString();
            for (var i = 0; i < str.length; i++) {
              if (str[i] == "\n") {
                this.__P_526_0++;
              }
            }
            this.push(str);
            callback();
          }
        }, {
          key: "getLineNumber",
          value: function getLineNumber() {
            return this.__P_526_0;
          }
        }]);
      }(Transform);
      statics.LineCountingTransform = LineCountingTransform;
      var StripSourceMapTransform = /*#__PURE__*/function (_Transform2) {
        "use strict";

        function StripSourceMapTransform(options) {
          var _this3;
          _classCallCheck(this, StripSourceMapTransform);
          _this3 = _callSuper(this, StripSourceMapTransform, [options]);
          _this3.__P_526_1 = "";
          return _this3;
        }
        _inherits(StripSourceMapTransform, _Transform2);
        return _createClass(StripSourceMapTransform, [{
          key: "_transform",
          value: function _transform(chunk, encoding, callback) {
            var str = this.__P_526_1 + chunk.toString();
            var pos = str.lastIndexOf("\n");
            if (pos > -1) {
              this.__P_526_1 = str.substring(pos);
              str = str.substring(0, pos);
            } else {
              this.__P_526_1 = str;
              str = "";
            }
            str = str.replace(/\n\/\/\#\s*sourceMappingURL=.*$/m, "");
            this.push(str);
            callback();
          }
        }, {
          key: "_flush",
          value: function _flush(callback) {
            var str = this.__P_526_1;
            this.__P_526_1 = null;
            str = str.replace(/\n\/\/\#\s*sourceMappingURL=.*$/m, "");
            this.push(str);
            callback();
          }
        }]);
      }(Transform);
      statics.StripSourceMapTransform = StripSourceMapTransform;
      var ToStringWriteStream = /*#__PURE__*/function (_Writable) {
        "use strict";

        function ToStringWriteStream(dest, options) {
          var _this4;
          _classCallCheck(this, ToStringWriteStream);
          _this4 = _callSuper(this, ToStringWriteStream, [options]);
          _this4.__P_526_2 = dest;
          _this4.__P_526_3 = "";
          return _this4;
        }
        _inherits(ToStringWriteStream, _Writable);
        return _createClass(ToStringWriteStream, [{
          key: "_write",
          value: function _write(chunk, encoding, callback) {
            this.__P_526_3 += chunk.toString();
            if (this.__P_526_2) {
              this.__P_526_2.write(chunk, encoding, callback);
            } else if (callback) {
              callback();
            }
          }
        }, {
          key: "toString",
          value: function toString() {
            return this.__P_526_3;
          }
        }]);
      }(Writable);
      statics.ToStringWriteStream = ToStringWriteStream;
    }
  });
  qx.tool.utils.Utils.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Utils.js.map?dt=1778272845658