function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.io.transport.Xhr": {
        "require": true,
        "construct": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "construct": true,
        "require": true
      },
      "qx.test.io.MAssert": {
        "require": true
      },
      "qx.io.graphql.Client": {
        "construct": true
      },
      "qx.io.graphql.protocol.Request": {},
      "qx.io.exception.Protocol": {},
      "qx.io.exception.Transport": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2020 Christian Boulanger
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (cboulanger)
  
  ************************************************************************ */

  /**
   * @require(qx.io.transport.Xhr)
   * @ignore(fetch)
   */
  qx.Class.define("qx.test.io.graphql.Client", {
    extend: qx.dev.unit.TestCase,
    include: [qx.test.io.MAssert],
    statics: {
      TEST_ENDPOINT: "https://countries.trevorblades.com/"
    },
    construct: function construct() {
      qx.dev.unit.TestCase.constructor.call(this);
      var transport = new qx.io.transport.Xhr(this.constructor.TEST_ENDPOINT);
      transport.getTransportImpl();
      this.client = new qx.io.graphql.Client(transport);
    },
    members: {
      __P_360_0: false,
      __P_360_1: "Skipping test as endpoint is not available.",
      runQuery: function runQuery(query, expected) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var req, result;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                req = new qx.io.graphql.protocol.Request({
                  query: query
                });
                _context.n = 1;
                return _this.client.send(req);
              case 1:
                result = _context.v;
                _this.assertDeepEquals(expected, result);
              case 2:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      runQueryWithVariables: function runQueryWithVariables(query, variables, expected) {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var req, result;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                req = new qx.io.graphql.protocol.Request({
                  query: query
                });
                req.setVariables(variables);
                _context2.n = 1;
                return _this2.client.send(req);
              case 1:
                result = _context2.v;
                _this2.assertDeepEquals(expected, result);
              case 2:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      "test: check endpoint": function test_check_endpoint() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var url, body, init, response, result, _t;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.p = _context3.n) {
              case 0:
                _context3.p = 0;
                url = _this3.constructor.TEST_ENDPOINT;
                body = '{"query":"{__typename}"}';
                init = {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: body
                };
                _context3.n = 1;
                return fetch(url, init);
              case 1:
                response = _context3.v;
                _context3.n = 2;
                return response.json();
              case 2:
                result = _context3.v;
                _this3.assertDeepEquals({
                  data: {
                    __P_360_2: "Query"
                  }
                }, result);
                _this3.__P_360_0 = true;
                _context3.n = 4;
                break;
              case 3:
                _context3.p = 3;
                _t = _context3.v;
                console.error("Endpoint ".concat(_this3.constructor.TEST_ENDPOINT, " is not accessible: ").concat(_t.message));
              case 4:
                return _context3.a(2);
            }
          }, _callee3, null, [[0, 3]]);
        }))();
      },
      "test: execute query": function test_execute_query() {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                if (_this4.__P_360_0) {
                  _context4.n = 1;
                  break;
                }
                return _context4.a(2, _this4.skip(_this4.__P_360_1));
              case 1:
                _context4.n = 2;
                return _this4.runQuery("{\n          country(code: \"BR\") {\n            name\n            native\n            capital\n            currency\n            languages {\n              code\n              name\n            }\n          }\n        }", {
                  country: {
                    name: "Brazil",
                    "native": "Brasil",
                    capital: "Brasília",
                    currency: "BRL",
                    languages: [{
                      code: "pt",
                      name: "Portuguese"
                    }]
                  }
                });
              case 2:
                return _context4.a(2);
            }
          }, _callee4);
        }))();
      },
      "test: execute query with variables": function test_execute_query_with_variables() {
        var _this5 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                if (_this5.__P_360_0) {
                  _context5.n = 1;
                  break;
                }
                return _context5.a(2, _this5.skip(_this5.__P_360_1));
              case 1:
                _context5.n = 2;
                return _this5.runQueryWithVariables("query ($countryCode:ID!){\n          country(code: $countryCode) {\n            name\n            languages {\n              code\n              name\n            }\n          }\n        }", {
                  countryCode: "BE"
                }, {
                  country: {
                    name: "Belgium",
                    languages: [{
                      code: "nl",
                      name: "Dutch"
                    }, {
                      code: "fr",
                      name: "French"
                    }, {
                      code: "de",
                      name: "German"
                    }]
                  }
                });
              case 2:
                return _context5.a(2);
            }
          }, _callee5);
        }))();
      },
      "test: expect error after invalid query": function test_expect_error_after_invalid_query() {
        var _this6 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
          var _t2;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.p = _context6.n) {
              case 0:
                if (_this6.__P_360_0) {
                  _context6.n = 1;
                  break;
                }
                return _context6.a(2, _this6.skip(_this6.__P_360_1));
              case 1:
                _context6.p = 1;
                _context6.n = 2;
                return _this6.runQuery("query { invalidSyntax }");
              case 2:
                _context6.n = 4;
                break;
              case 3:
                _context6.p = 3;
                _t2 = _context6.v;
                _this6.assertInstance(_t2, qx.io.exception.Protocol);
                _this6.assertContains("invalidSyntax", JSON.stringify(_t2.data));
                return _context6.a(2);
              case 4:
                throw new Error("Query should return an error after invalid query");
              case 5:
                return _context6.a(2);
            }
          }, _callee6, null, [[1, 3]]);
        }))();
      },
      "test: expect transport error": function test_expect_transport_error() {
        var _this7 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
          var client, query, request, _t3;
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.p = _context7.n) {
              case 0:
                if (_this7.__P_360_0) {
                  _context7.n = 1;
                  break;
                }
                return _context7.a(2, _this7.skip(_this7.__P_360_1));
              case 1:
                _context7.p = 1;
                client = new qx.io.graphql.Client("https://doesnotexist.org/" + Math.random());
                query = "query { doesnotmatter }";
                request = new qx.io.graphql.protocol.Request({
                  query: query
                });
                _context7.n = 2;
                return client.send(request);
              case 2:
                _context7.n = 4;
                break;
              case 3:
                _context7.p = 3;
                _t3 = _context7.v;
                _this7.assertInstance(_t3, qx.io.exception.Transport);
                return _context7.a(2);
              case 4:
                throw new Error("Query should throw qx.io.exception.Transport");
              case 5:
                return _context7.a(2);
            }
          }, _callee7, null, [[1, 3]]);
        }))();
      }
    }
  });
  qx.test.io.graphql.Client.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Client.js.map?dt=1782967154862