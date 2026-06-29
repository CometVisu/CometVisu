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
      "qx.tool.utils.json.Parser": {},
      "qx.tool.utils.json.Stringify": {},
      "qx.lang.Type": {},
      "qx.tool.compiler.Console": {}
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
   *      2011-2018 Zenesis Limited, http://www.zenesis.com
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
   *      * oetiker
   *      * cboulanger
   *
   * *********************************************************************** */

  var Ajv = require("ajv");
  var betterAjvErrors = require("better-ajv-errors")["default"];
  var fs = qx.tool.utils.Promisify.fs;
  qx.Class.define("qx.tool.utils.Json", {
    statics: {
      /**
       * Parses JSON string into an object
       * @param str {String} the data to parse
       * @return {Object}
       */
      parseJson: function parseJson(str) {
        if (str === null || !str.trim()) {
          return null;
        }
        var ast = qx.tool.utils.json.Parser.parseToAst(str.trim());
        return qx.tool.utils.json.Stringify.astToObject(ast);
      },
      /**
       * Validates a json object against the given schema signature and outputs
       * diagnostic information if validation failed
       * @param json {Object} The json object to check
       * @param schema {Array|Object}
       *    The json-schema object or an array of schema objects. If array,
       *    only the first is used to validate, but the first schema can
       *    refer to the others.
       * @param warnOnly {Boolean} If true, do not throw a fatal error
       * @return {Boolean}
       *    Returns true if successful and false on failure if the
       *    'warnOnly' parameter is true
       */
      validate: function validate(json, schema) {
        var warnOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var ajv = new Ajv({
          allErrors: true,
          strict: false
        });
        if (qx.lang.Type.isArray(schema)) {
          ajv.addSchema(schema);
          schema = schema[0].$id;
        }
        if (ajv.validate(schema, json)) {
          // success!
          return true;
        }
        if (warnOnly) {
          var message = betterAjvErrors(schema.$id, json, ajv.errors, {
            format: "cli",
            indent: 2
          });
          qx.tool.compiler.Console.warn("JSON data does not validate against " + schema.$id + ":\n" + message);
          return false;
        }
        // throw fatal error
        var err = betterAjvErrors(schema.$id, json, ajv.errors, {
          format: "js"
        });
        var msg;
        if (Array.isArray(err) && err.length) {
          msg = err.reduce(function (prev, curr, index) {
            return "".concat(prev, " ").concat(index + 1, ") ").concat(curr.error);
          }, "").trim();
        } else if (Array.isArray(ajv.errors)) {
          msg = ajv.errors.reduce(function (prev, curr, index) {
            return "".concat(prev, " ").concat(index + 1, ") ").concat(curr.dataPath, " ").concat(curr.message);
          }, "").trim();
        } else {
          msg = "Unknown error during validation.";
        }
        throw new Error(msg);
      },
      /**
       * Identify the type and version of the config file schema in the data that
       * has been passed. Return an object containing type and version of the json
       * schema, or null if no schema could been detected
       * Todo: This needs to be rewritten.
       * @param data {Object} JSON data
       * @return {{type,version}|null}
       */
      getSchemaInfo: function getSchemaInfo(data) {
        var schemaInfo = {};
        if (data.$schema) {
          var match = data.$schema.match(/\/([^-]+)-([^.]+)\.json$/);
          if (match) {
            schemaInfo.type = match[1].toLocaleLowerCase();
            schemaInfo.version = match[2].replace(/-/g, ".");
          } else {
            // deprecated schema url
            var _match = data.$schema.match(/\/v([^/]+)\/([^.]+)\.json$/);
            if (_match) {
              schemaInfo.type = _match[2].toLocaleLowerCase();
              schemaInfo.version = _match[1];
            }
          }
          // guess file type, this would be easy with the file name!
        } else if (data.targets) {
          schemaInfo.type = "compile";
          schemaInfo.version = "0";
        } else if (data.info && data.provides) {
          schemaInfo.type = "manifest";
          schemaInfo.version = "0";
        } else if (data.libraries || data.contribs) {
          schemaInfo.type = "qooxdoo";
          schemaInfo.version = "0";
        }
        // no schema was found
        if (Object.getOwnPropertyNames(schemaInfo).length === 0) {
          return null;
        }
        return schemaInfo;
      },
      /**
       * Loads JSON data from a file and returns it as an object; if the file does not exist, then
       * null is returned
       *
       * @param filename {String} the filename to load
       * @return {Object|null} the parsed contents, or null if the file does not exist
       */
      loadJsonAsync: function loadJsonAsync(filename) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var data, _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                _context.n = 1;
                return fs.existsAsync(filename);
              case 1:
                if (_context.v) {
                  _context.n = 2;
                  break;
                }
                return _context.a(2, null);
              case 2:
                _context.n = 3;
                return fs.readFileAsync(filename, "utf8");
              case 3:
                data = _context.v;
                _context.p = 4;
                return _context.a(2, qx.tool.utils.Json.parseJson(data));
              case 5:
                _context.p = 5;
                _t = _context.v;
                throw new Error("Failed to load " + filename + ": " + _t);
              case 6:
                return _context.a(2);
            }
          }, _callee, null, [[4, 5]]);
        }))();
      },
      /**
       * Saves JSON data to a file, or erases the file if data is null
       *
       * @param filename {String} filename to write to
       * @param data {Object|null} the data to write. If null, remove the file
       */
      saveJsonAsync: function saveJsonAsync(filename, data) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                if (!(data !== null)) {
                  _context2.n = 2;
                  break;
                }
                _context2.n = 1;
                return fs.writeFileAsync(filename, JSON.stringify(data, null, 2), "utf8");
              case 1:
                _context2.n = 4;
                break;
              case 2:
                _context2.n = 3;
                return fs.existsAsync(filename);
              case 3:
                if (!_context2.v) {
                  _context2.n = 4;
                  break;
                }
                fs.unlinkAsync(filename);
              case 4:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      }
    }
  });
  qx.tool.utils.Json.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Json.js.map?dt=1782705795939