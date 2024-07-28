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
      "qx.log.Logger": {},
      "cv.io.rest.Client": {},
      "qx.io.request.Xhr": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Fetch.js
   *
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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
      __P_764_0: {},
      DEFAULT_CACHE_TTL: 300,
      // 5 minutes
      __P_764_1: null,
      cachedFetch: function cachedFetch(resource) {
        var _arguments = arguments;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var options, proxy, client, cache, entry, ttl, ps, cacheEntry;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                options = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : {};
                proxy = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : false;
                client = _arguments.length > 3 && _arguments[3] !== undefined ? _arguments[3] : undefined;
                cache = cv.io.Fetch.__P_764_0;
                if (!Object.prototype.hasOwnProperty.call(cache, resource)) {
                  _context.next = 13;
                  break;
                }
                entry = cache[resource];
                ttl = options.ttl || cv.io.Fetch.DEFAULT_CACHE_TTL; // check age
                if (!(entry.time === 0)) {
                  _context.next = 11;
                  break;
                }
                return _context.abrupt("return", entry.data);
              case 11:
                if (!(entry.time > Date.now() - ttl * 1000)) {
                  _context.next = 13;
                  break;
                }
                return _context.abrupt("return", entry.data);
              case 13:
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
                if (!cv.io.Fetch.__P_764_1) {
                  cv.io.Fetch.__P_764_1 = setInterval(function () {
                    cv.io.Fetch._gc();
                  }, cv.io.Fetch.DEFAULT_CACHE_TTL);
                }
                return _context.abrupt("return", ps);
              case 20:
              case "end":
                return _context.stop();
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
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var options, proxy, client, url, _i, _arr, proxyParam, name, _i2, _arr2, _proxyParam;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
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
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
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
              case 5:
              case "end":
                return _context2.stop();
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
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", cv.io.Fetch.fetch(resource, options, true, client));
              case 1:
              case "end":
                return _context3.stop();
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
        for (var resource in cv.io.Fetch.__P_764_0) {
          entry = cv.io.Fetch.__P_764_0[resource];
          if (entry.time <= eol && entry.ttl * 1000 < maxAge) {
            delete cv.io.Fetch.__P_764_0[resource];
          }
        }
      }
    }
  });
  cv.io.Fetch.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Fetch.js.map?dt=1722151864053