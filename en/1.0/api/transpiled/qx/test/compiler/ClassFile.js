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
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.tool.compiler.app.Library": {
        "construct": true
      },
      "qx.tool.compiler.Analyser": {
        "construct": true
      },
      "qx.tool.compiler.ClassFile": {},
      "qx.tool.utils.Promisify": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
     * Henner Kollmann
  
  ************************************************************************ */

  qx.Class.define("qx.test.compiler.ClassFile", {
    extend: qx.dev.unit.TestCase,
    construct: function construct() {
      this.__P_334_0 = new qx.tool.compiler.app.Library();
      this.__P_334_1 = new qx.tool.compiler.Analyser();
      this.__P_334_1.setOutputDir("tmp/unittest");
      this.__P_334_0.setRootDir(".");
      this.__P_334_0.setSourcePath("unittest/compiler");
      this.__P_334_0.getSourceFileExtension = function () {
        return ".js";
      };
    },
    members: {
      "test issue 10591": function test_issue_10591() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var classFile, dbClassInfo;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                classFile = new qx.tool.compiler.ClassFile(_this.__P_334_1, "classIssue10591", _this.__P_334_0);
                _context.n = 1;
                return qx.tool.utils.Promisify.call(function (cb) {
                  return classFile.load(cb);
                });
              case 1:
                dbClassInfo = {};
                classFile.writeDbInfo(dbClassInfo);
                _this.assert(!dbClassInfo.unresolved);
              case 2:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      "test issue 633": function test_issue_633() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var classFile, dbClassInfo;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                classFile = new qx.tool.compiler.ClassFile(_this2.__P_334_1, "classIssue633", _this2.__P_334_0);
                _context2.n = 1;
                return qx.tool.utils.Promisify.call(function (cb) {
                  return classFile.load(cb);
                });
              case 1:
                dbClassInfo = {};
                classFile.writeDbInfo(dbClassInfo);
                _this2.assert(!dbClassInfo.unresolved);
              case 2:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      "test issue 519": function test_issue_519() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var classFile, dbClassInfo;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                classFile = new qx.tool.compiler.ClassFile(_this3.__P_334_1, "classIssue519", _this3.__P_334_0);
                _context3.n = 1;
                return qx.tool.utils.Promisify.call(function (cb) {
                  return classFile.load(cb);
                });
              case 1:
                dbClassInfo = {};
                classFile.writeDbInfo(dbClassInfo);
                _this3.assert(!dbClassInfo.unresolved);
              case 2:
                return _context3.a(2);
            }
          }, _callee3);
        }))();
      },
      "test issue 524": function test_issue_524() {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var classFile, dbClassInfo;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                classFile = new qx.tool.compiler.ClassFile(_this4.__P_334_1, "classIssue524", _this4.__P_334_0);
                _context4.n = 1;
                return qx.tool.utils.Promisify.call(function (cb) {
                  return classFile.load(cb);
                });
              case 1:
                dbClassInfo = {};
                classFile.writeDbInfo(dbClassInfo);
                _this4.assert(!dbClassInfo.unresolved);
              case 2:
                return _context4.a(2);
            }
          }, _callee4);
        }))();
      },
      "test issue 726": function test_issue_726() {
        var _this5 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
          var classFile, dbClassInfo;
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                classFile = new qx.tool.compiler.ClassFile(_this5.__P_334_1, "classIssue726", _this5.__P_334_0);
                _context5.n = 1;
                return qx.tool.utils.Promisify.call(function (cb) {
                  return classFile.load(cb);
                });
              case 1:
                dbClassInfo = {};
                classFile.writeDbInfo(dbClassInfo);
                _this5.assert(!dbClassInfo.unresolved);
              case 2:
                return _context5.a(2);
            }
          }, _callee5);
        }))();
      },
      "test issue 10623": function test_issue_10623() {
        var _this6 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
          var classFile, dbClassInfo;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.n) {
              case 0:
                classFile = new qx.tool.compiler.ClassFile(_this6.__P_334_1, "classIssue10623", _this6.__P_334_0);
                _context6.n = 1;
                return qx.tool.utils.Promisify.call(function (cb) {
                  return classFile.load(cb);
                });
              case 1:
                dbClassInfo = {};
                classFile.writeDbInfo(dbClassInfo);
                _this6.assert(!dbClassInfo.unresolved);
              case 2:
                return _context6.a(2);
            }
          }, _callee6);
        }))();
      },
      __P_334_0: null,
      __P_334_1: null
    }
  });
  qx.test.compiler.ClassFile.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ClassFile.js.map?dt=1782705783233