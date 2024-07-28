function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
      }( /*#__PURE__*/_wrapNativeSuper(Error)),
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
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var _len2, args, _key2, options;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
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
                _context.next = 7;
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
              case 7:
                return _context.abrupt("return", _context.sent);
              case 8:
              case "end":
                return _context.stop();
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
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
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
              case 2:
              case "end":
                return _context2.stop();
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
          _this2.__P_515_0 = 1;
          return _this2;
        }
        _inherits(LineCountingTransform, _Transform);
        return _createClass(LineCountingTransform, [{
          key: "_write",
          value: function _write(chunk, encoding, callback) {
            var str = chunk.toString();
            for (var i = 0; i < str.length; i++) {
              if (str[i] == "\n") {
                this.__P_515_0++;
              }
            }
            this.push(str);
            callback();
          }
        }, {
          key: "getLineNumber",
          value: function getLineNumber() {
            return this.__P_515_0;
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
          _this3.__P_515_1 = "";
          return _this3;
        }
        _inherits(StripSourceMapTransform, _Transform2);
        return _createClass(StripSourceMapTransform, [{
          key: "_transform",
          value: function _transform(chunk, encoding, callback) {
            var str = this.__P_515_1 + chunk.toString();
            var pos = str.lastIndexOf("\n");
            if (pos > -1) {
              this.__P_515_1 = str.substring(pos);
              str = str.substring(0, pos);
            } else {
              this.__P_515_1 = str;
              str = "";
            }
            str = str.replace(/\n\/\/\#\s*sourceMappingURL=.*$/m, "");
            this.push(str);
            callback();
          }
        }, {
          key: "_flush",
          value: function _flush(callback) {
            var str = this.__P_515_1;
            this.__P_515_1 = null;
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
          _this4.__P_515_2 = dest;
          _this4.__P_515_3 = "";
          return _this4;
        }
        _inherits(ToStringWriteStream, _Writable);
        return _createClass(ToStringWriteStream, [{
          key: "_write",
          value: function _write(chunk, encoding, callback) {
            this.__P_515_3 += chunk.toString();
            if (this.__P_515_2) {
              this.__P_515_2.write(chunk, encoding, callback);
            } else if (callback) {
              callback();
            }
          }
        }, {
          key: "toString",
          value: function toString() {
            return this.__P_515_3;
          }
        }]);
      }(Writable);
      statics.ToStringWriteStream = ToStringWriteStream;
    }
  });
  qx.tool.utils.Utils.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Utils.js.map?dt=1722151849490