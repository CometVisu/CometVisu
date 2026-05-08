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
      this.__P_491_0 = ["addListener", "addListenerOnce"];
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
      __P_491_0: null,
      /**
       * Transforms the named file
       */
      transform: function transform() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var src, babelConfig, options, plugins, config, result, cycleCount, prettierConfig, prettyCode, outname, _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _context.n = 1;
                return fs.promises.readFile(_this.__filename, "utf8");
              case 1:
                src = _context.v;
                babelConfig = {};
                options = qx.lang.Object.clone(babelConfig.options || {}, true);
                options.modules = false;
                plugins = [require("@babel/plugin-syntax-jsx"), _this.__P_491_1()];
                if (_this.getArrowFunctions() != "never") {
                  plugins.push(_this.__P_491_2());
                }
                plugins.push(_this.__P_491_3());
                plugins.push(_this.__P_491_4());
                if (_this.getSingleLineBlocks()) {
                  plugins.push(_this.__P_491_5());
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
              case 2:
                if (!true) {
                  _context.n = 5;
                  break;
                }
                cycleCount++;
                if (!(cycleCount > 10)) {
                  _context.n = 3;
                  break;
                }
                qx.tool.compiler.Console.warn("Can not find a stable format for ".concat(_this.__filename));
                return _context.a(3, 5);
              case 3:
                result = babelCore.transform(src, config);
                if (!(result.code === src)) {
                  _context.n = 4;
                  break;
                }
                return _context.a(3, 5);
              case 4:
                src = result.code;
                _context.n = 2;
                break;
              case 5:
                _context.n = 6;
                return prettier.resolveConfig(_this.__filename, {
                  editorConfig: true
                });
              case 6:
                _t = _context.v;
                if (_t) {
                  _context.n = 7;
                  break;
                }
                _t = {};
              case 7:
                prettierConfig = _t;
                prettierConfig.parser = "babel";
                prettyCode = prettier.format(result.code, prettierConfig);
                outname = _this.__filename + (_this.isOverwrite() ? "" : ".es6ify");
                _context.n = 8;
                return fs.promises.writeFile(outname, prettyCode, "utf8");
              case 8:
                return _context.a(2);
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
      __P_491_1: function __P_491_1() {
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
      __P_491_6: function __P_491_6(argNode) {
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
      __P_491_5: function __P_491_5() {
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
      __P_491_2: function __P_491_2() {
        var t = this;
        var isTest = this.__filename.indexOf("/test/") > -1;
        var arrowFunctions = this.getArrowFunctions();
        var knownApiFunctions = this.__P_491_0;
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
                  path.node.arguments[i] = t.__P_491_6(argNode);
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
      __P_491_3: function __P_491_3() {
        var knownApiFunctions = this.__P_491_0;
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
      __P_491_4: function __P_491_4() {
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

//# sourceMappingURL=Es6ify.js.map?dt=1778272843040