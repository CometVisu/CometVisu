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
        "construct": true,
        "require": true
      },
      "qx.lang.Object": {},
      "qx.tool.compiler.Console": {},
      "qx.lang.Array": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2021 Zenesis Ltd
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (john.spackman@zenesis.com, @johnspackman)
  
  ************************************************************************ */

  var fs = require("fs");
  var babelCore = require("@babel/core");
  var types = require("@babel/types");
  var prettier = require("prettier");

  /**
   * Helper method that collapses the MemberExpression into a string
   * @param node
   * @returns {string}
   */
  function collapseMemberExpression(node) {
    var done = false;
    function doCollapse(node) {
      if (node.type == "ThisExpression") {
        return "this";
      }
      if (node.type == "Identifier") {
        return node.name;
      }
      if (node.type == "ArrayExpression") {
        var result = [];
        node.elements.forEach(function (element) {
          return result.push(doCollapse(element));
        });
        return result;
      }
      if (node.type != "MemberExpression") {
        return "(" + node.type + ")";
      }
      if (types.isIdentifier(node.object)) {
        var _str = node.object.name;
        if (node.property.name) {
          _str += "." + node.property.name;
        } else {
          done = true;
        }
        return _str;
      }
      var str;
      if (node.object.type == "ArrayExpression") {
        str = "[]";
      } else {
        str = doCollapse(node.object);
      }
      if (done) {
        return str;
      }
      // `computed` is set if the expression is a subscript, eg `abc[def]`
      if (node.computed) {
        done = true;
      } else if (node.property.name) {
        str += "." + node.property.name;
      } else {
        done = true;
      }
      return str;
    }
    return doCollapse(node);
  }

  /**
   * Processes a .js source file and tries to upgrade to ES6 syntax
   *
   * This is a reliable but fairly unintrusive upgrade, provided that `arrowFunctions` property is
   * `careful`.  The issue is that this code: `setTimeout(function() { something(); })` can be
   * changed to `setTimeout(() => something())` and that is often desirable, but it also means that
   * the `this` will be different because an arrow function always has the `this` from where the
   * code is written.
   *
   * However, if you use an API which changes `this` then the switch to arrow functions will break
   * your code.  Mostly, in Qooxdoo, changes to `this` are done via an explicit API (eg
   * `obj.addListener("changeXyx", function() {}, this)`) and so those known APIs can be translated,
   * but there are places which do not work this way (eg the unit tests `qx.dev.unit.TestCase.resume()`).
   * Third party integrations are of course completely unknown.
   *
   * If `arrowFunctions` is set to aggressive, then all functions are switched to arrow functions except
   * where there is a known API that does not support it (eg any call to `.resume` in a test class); this
   * could break your code.
   *
   * If `arrowFunctions is set to `careful` (the default), then functions are only switched to arrow
   * functions where the API is known  (eg `.addListener`).
   *
   * The final step is that the ES6ify will use https://prettier.io/ to reformat the code, and will use
   * the nearest `prettierrc.json` for configuration
   */
  qx.Class.define("qx.tool.compiler.Es6ify", {
    extend: qx.core.Object,
    construct: function construct(filename) {
      qx.core.Object.constructor.call(this);
      this.__filename = filename;
      this.__P_480_0 = ["addListener", "addListenerOnce"];
    },
    properties: {
      /** Whether to convert functions to arrow functions; careful means only on things like addListener callbacks */
      arrowFunctions: {
        init: "careful",
        check: ["never", "always", "careful", "aggressive"],
        nullable: true
      },
      /** Whether to force braces around single line bodies for if, for, while, and do while */
      singleLineBlocks: {
        init: false,
        check: "Boolean"
      },
      /** Whether to overwrite the original file */
      overwrite: {
        init: false,
        check: "Boolean"
      }
    },
    members: {
      /** @type{String} the filename to work on */
      __filename: null,
      /** @type{} */
      __P_480_0: null,
      /**
       * Transforms the named file
       */
      transform: function transform() {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var src, babelConfig, options, plugins, config, result, cycleCount, prettierConfig, prettyCode, outname;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fs.promises.readFile(_this.__filename, "utf8");
              case 2:
                src = _context.sent;
                babelConfig = {};
                options = qx.lang.Object.clone(babelConfig.options || {}, true);
                options.modules = false;
                plugins = [require("@babel/plugin-syntax-jsx"), _this.__P_480_1()];
                if (_this.getArrowFunctions() != "never") {
                  plugins.push(_this.__P_480_2());
                }
                plugins.push(_this.__P_480_3());
                plugins.push(_this.__P_480_4());
                if (_this.getSingleLineBlocks()) {
                  plugins.push(_this.__P_480_5());
                }
                config = {
                  ast: true,
                  babelrc: false,
                  sourceFileName: _this.__filename,
                  filename: _this.__filename,
                  sourceMaps: false,
                  presets: [[{
                    plugins: plugins
                  }]],
                  parserOpts: {
                    allowSuperOutsideMethod: true,
                    sourceType: "script"
                  },
                  generatorOpts: {
                    retainLines: true,
                    compact: false
                  },
                  passPerPreset: true
                };
                cycleCount = 0;
              case 13:
                if (!true) {
                  _context.next = 24;
                  break;
                }
                cycleCount++;
                if (!(cycleCount > 10)) {
                  _context.next = 18;
                  break;
                }
                qx.tool.compiler.Console.warn("Can not find a stable format for ".concat(_this.__filename));
                return _context.abrupt("break", 24);
              case 18:
                result = babelCore.transform(src, config);
                if (!(result.code === src)) {
                  _context.next = 21;
                  break;
                }
                return _context.abrupt("break", 24);
              case 21:
                src = result.code;
                _context.next = 13;
                break;
              case 24:
                _context.next = 26;
                return prettier.resolveConfig(_this.__filename, {
                  editorConfig: true
                });
              case 26:
                _context.t0 = _context.sent;
                if (_context.t0) {
                  _context.next = 29;
                  break;
                }
                _context.t0 = {};
              case 29:
                prettierConfig = _context.t0;
                prettierConfig.parser = "babel";
                prettyCode = prettier.format(result.code, prettierConfig);
                outname = _this.__filename + (_this.isOverwrite() ? "" : ".es6ify");
                _context.next = 35;
                return fs.promises.writeFile(outname, prettyCode, "utf8");
              case 35:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      /**
       * Plugin that converts object properties which are functions into object methods, eg
       * ```
       * {
       *   myMethod: function() {}
       * }
       * ```
       * becomes
       * ```
       * {
       *   myMethod() {}
       * }
       * ```
       * @returns
       */
      __P_480_1: function __P_480_1() {
        return {
          visitor: {
            ObjectExpression: function ObjectExpression(path) {
              var KEY_TYPES = {
                Identifier: 1,
                StringLiteral: 1,
                NumericLiteral: 1
              };
              for (var i = 0; i < path.node.properties.length; i++) {
                var propNode = path.node.properties[i];
                if (propNode.type == "ObjectProperty" && propNode.value.type == "FunctionExpression" && KEY_TYPES[propNode.key.type]) {
                  var replacement = types.objectMethod("method", propNode.key, propNode.value.params, propNode.value.body, propNode.value.computed, propNode.value.generator, propNode.value.async);
                  replacement.loc = propNode.loc;
                  replacement.start = propNode.start;
                  replacement.end = propNode.end;
                  replacement.leadingComments = propNode.leadingComments;
                  path.node.properties[i] = replacement;
                }
              }
            }
          }
        };
      },
      /**
       * Converts a function expression into an arrow function expression
       *
       * @param {Babel.Node} argNode
       * @returns
       */
      __P_480_6: function __P_480_6(argNode) {
        var body = argNode.body;
        if (body.body.length == 1 && body.body[0].type == "ReturnStatement") {
          body = body.body[0].argument;
        }
        var replacement = types.arrowFunctionExpression(argNode.params, body, argNode.async);
        replacement.loc = argNode.loc;
        replacement.start = argNode.start;
        replacement.end = argNode.end;
        replacement.leadingComments = argNode.leadingComments;
        return replacement;
      },
      /**
       * Plugin that makes sure that every single line block is wrapped in braces
       *
       * @returns
       */
      __P_480_5: function __P_480_5() {
        function loopStatement(path) {
          if (path.node.body.type == "BlockStatement") {
            return;
          }
          var block = types.blockStatement([path.node.body]);
          path.node.body = block;
        }
        return {
          visitor: {
            IfStatement: function IfStatement(path) {
              if (path.node.consequent.type == "BlockStatement") {
                return;
              }
              var block = types.blockStatement([path.node.consequent]);
              path.node.consequent = block;
            },
            DoWhileStatement: loopStatement,
            ForStatement: loopStatement,
            WhileStatement: loopStatement
          }
        };
      },
      /**
       * Tries to convert functions into arrow functions
       * @returns
       */
      __P_480_2: function __P_480_2() {
        var t = this;
        var isTest = this.__filename.indexOf("/test/") > -1;
        var arrowFunctions = this.getArrowFunctions();
        var knownApiFunctions = this.__P_480_0;
        return {
          visitor: {
            CallExpression: function CallExpression(path) {
              if (path.node.callee.type == "MemberExpression") {
                var callee = collapseMemberExpression(path.node.callee);
                if (arrowFunctions == "careful") {
                  if (!knownApiFunctions.some(function (fName) {
                    return callee.endsWith("." + fName);
                  })) {
                    return;
                  }
                  if (path.node.arguments.length != 3 || path.node.arguments[0].type != "StringLiteral" || path.node.arguments[1].type != "FunctionExpression" || path.node.arguments[2].type != "ThisExpression") {
                    return;
                  }
                } else if (arrowFunctions == "aggressive") {
                  if (callee == "qx.event.GlobalError.observeMethod" || callee == "this.assertException" || callee == "this.assertEventFired" || callee == "qx.core.Assert.assertEventFired" || isTest && callee.endsWith(".resume")) {
                    return;
                  }
                }
              } else if (arrowFunctions == "careful") {
                return;
              }
              for (var i = 0; i < path.node.arguments.length; i++) {
                var argNode = path.node.arguments[i];
                if (argNode.type == "FunctionExpression") {
                  path.node.arguments[i] = t.__P_480_6(argNode);
                }
              }
            }
          }
        };
      },
      /**
       * Where a function has been translated into an arrow function, the this binding is not needed
       * and can be removed
       * @returns
       */
      __P_480_3: function __P_480_3() {
        var knownApiFunctions = this.__P_480_0;
        return {
          visitor: {
            CallExpression: function CallExpression(path) {
              if (path.node.callee.type == "MemberExpression" && path.node.callee.property.type == "Identifier" && knownApiFunctions.includes(path.node.callee.property.name) && path.node.arguments.length == 3 && path.node.arguments[0].type == "StringLiteral" && path.node.arguments[1].type == "ArrowFunctionExpression" && path.node.arguments[2].type == "ThisExpression") {
                qx.lang.Array.removeAt(path.node.arguments, 2);
              }
            }
          }
        };
      },
      /**
       * Translates `this.base(arguments...)` into `super`
       * @returns
       */
      __P_480_4: function __P_480_4() {
        var methodNameStack = [];
        function peekMethodName() {
          for (var i = methodNameStack.length - 1; i >= 0; i--) {
            var methodName = methodNameStack[i];
            if (methodName) {
              return methodName;
            }
          }
          return null;
        }
        return {
          visitor: {
            ObjectMethod: {
              enter: function enter(path) {
                methodNameStack.push(path.node.key.name || null);
              },
              exit: function exit(path) {
                methodNameStack.pop();
              }
            },
            CallExpression: function CallExpression(path) {
              if (path.node.callee.type == "MemberExpression" && path.node.callee.object.type == "ThisExpression" && path.node.callee.property.type == "Identifier" && path.node.callee.property.name == "base" && path.node.arguments.length >= 1) {
                var args = qx.lang.Array.clone(path.node.arguments);
                args.shift();
                var methodName = peekMethodName();
                if (methodName == "construct") {
                  path.node.callee = types["super"]();
                  path.node.arguments = args;
                } else if (methodName) {
                  var replacement = types.memberExpression(types["super"](), types.identifier(methodName), false, false);
                  path.node.callee = replacement;
                  path.node.arguments = args;
                }
              }
            }
          }
        };
      }
    }
  });
  qx.tool.compiler.Es6ify.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Es6ify.js.map?dt=1722153840757