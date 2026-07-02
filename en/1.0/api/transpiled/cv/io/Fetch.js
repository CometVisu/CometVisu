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
      "qx.log.Logger": {},
      "cv.io.rest.Client": {},
      "qx.io.request.Xhr": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Fetch.js
   *
   * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
   *
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

  /**
   * native fetch replacement that supports the internal recording mechanism for replay file.
   */
  qx.Class.define('cv.io.Fetch', {
    type: 'static',
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      __P_781_0: {},
      DEFAULT_CACHE_TTL: 300,
      // 5 minutes
      __P_781_1: null,
      cachedFetch: function cachedFetch(resource) {
        var _arguments = arguments;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var options, proxy, client, cache, entry, ttl, ps, cacheEntry;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                options = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : {};
                proxy = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : false;
                client = _arguments.length > 3 && _arguments[3] !== undefined ? _arguments[3] : undefined;
                cache = cv.io.Fetch.__P_781_0;
                if (!Object.prototype.hasOwnProperty.call(cache, resource)) {
                  _context.n = 2;
                  break;
                }
                entry = cache[resource];
                ttl = cv.io.Fetch.DEFAULT_CACHE_TTL;
                if (Object.prototype.hasOwnProperty.call(options, 'ttl') && typeof options.ttl === 'number') {
                  ttl = options.ttl;
                }
                // check age
                if (!(entry.time === 0)) {
                  _context.n = 1;
                  break;
                }
                return _context.a(2, entry.data);
              case 1:
                if (!(entry.time > Date.now() - ttl * 1000)) {
                  _context.n = 2;
                  break;
                }
                return _context.a(2, entry.data);
              case 2:
                if (options && Object.prototype.hasOwnProperty.call(options, 'ttl')) {
                  delete options.ttl;
                }
                ps = cv.io.Fetch.fetch(resource, options, proxy, client);
                cacheEntry = {
                  data: ps,
                  time: 0,
                  ttl: options.ttl || cv.io.Fetch.DEFAULT_CACHE_TTL
                };
                cache[resource] = cacheEntry;
                ps.then(function () {
                  cacheEntry.time = Date.now();
                })["catch"](function (e) {
                  qx.log.Logger.error(cv.io.Fetch, 'error loading ' + resource + ': ', e);
                  delete cache[resource];
                });
                if (!cv.io.Fetch.__P_781_1) {
                  cv.io.Fetch.__P_781_1 = setInterval(function () {
                    cv.io.Fetch._gc();
                  }, cv.io.Fetch.DEFAULT_CACHE_TTL);
                }
                return _context.a(2, ps);
            }
          }, _callee);
        }))();
      },
      /**
       *
       * @param resource {URL|string}
       * @param options {object}
       * @param proxy {boolean}
       * @param client {cv.io.IClient}
       * @returns {Promise<String>}
       */
      fetch: function fetch(resource) {
        var _arguments2 = arguments;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var options, proxy, client, url, _i, _arr, proxyParam, name, _i2, _arr2, _proxyParam;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                options = _arguments2.length > 1 && _arguments2[1] !== undefined ? _arguments2[1] : {};
                proxy = _arguments2.length > 2 && _arguments2[2] !== undefined ? _arguments2[2] : false;
                client = _arguments2.length > 3 && _arguments2[3] !== undefined ? _arguments2[3] : undefined;
                if (proxy) {
                  url = new URL(cv.io.rest.Client.getBaseUrl() + '/proxy', window.location.origin);
                  if (resource) {
                    url.searchParams.set('url', resource);
                  }
                  if (options) {
                    for (_i = 0, _arr = ['self-signed', 'config-section', 'auth-type']; _i < _arr.length; _i++) {
                      proxyParam = _arr[_i];
                      if (Object.prototype.hasOwnProperty.call(options, proxyParam)) {
                        url.searchParams.set(proxyParam, options[proxyParam]);
                        delete options[proxyParam];
                      }
                    }
                    if (options.searchParams) {
                      for (name in options.searchParams) {
                        url.searchParams.set(name, options.searchParams[name]);
                      }
                      delete options.searchParams;
                    }
                  }
                  resource = url;
                } else if (options) {
                  for (_i2 = 0, _arr2 = ['self-signed', 'config-section', 'auth-type']; _i2 < _arr2.length; _i2++) {
                    _proxyParam = _arr2[_i2];
                    if (Object.prototype.hasOwnProperty.call(options, _proxyParam)) {
                      delete options[_proxyParam];
                    }
                  }
                }
                return _context2.a(2, new Promise(function (resolve, reject) {
                  var xhr = new qx.io.request.Xhr('' + resource);
                  xhr.set(options);
                  if (client) {
                    client.authorize(xhr);
                  }
                  xhr.addListener('success', function (ev) {
                    var request = ev.getTarget();
                    resolve(request.getResponse());
                  });
                  xhr.addListener('statusError', function (ev) {
                    var request = ev.getTarget();
                    reject({
                      url: resource,
                      statusText: request.getStatusText(),
                      status: request.getStatus()
                    });
                  });
                  xhr.addListener('fail', function (ev) {
                    var request = ev.getTarget();
                    reject({
                      url: resource,
                      status: request.getStatus(),
                      statusText: 'response parsing failure'
                    });
                  });
                  xhr.send();
                }));
            }
          }, _callee2);
        }))();
      },
      /**
       *
       * @param resource {URL|string}
       * @param options {object}
       * @param client {cv.io.IClient}
       * @returns {Promise<Response>}
       */
      proxyFetch: function proxyFetch(resource, options, client) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                return _context3.a(2, cv.io.Fetch.fetch(resource, options, true, client));
            }
          }, _callee3);
        }))();
      },
      /**
       * Garbage collection for fetch cache
       * @private
       */
      _gc: function _gc() {
        // go through cache and delete what's older than an hour (unless its ttl is bigger)
        var entry;
        var maxAge = 3600000; // one hour
        var eol = Date.now() - maxAge;
        for (var resource in cv.io.Fetch.__P_781_0) {
          entry = cv.io.Fetch.__P_781_0[resource];
          if (entry.time <= eol && entry.ttl * 1000 < maxAge) {
            delete cv.io.Fetch.__P_781_0[resource];
          }
        }
      }
    }
  });
  cv.io.Fetch.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Fetch.js.map?dt=1782967174228