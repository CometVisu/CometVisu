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
      "cv.data.Model": {},
      "cv.Version": {},
      "cv.Config": {},
      "cv.IconHandler": {},
      "cv.TemplateEngine": {},
      "cv.ui.structure.WidgetFactory": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ConfigCache.js
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
   * Handles caches for cometvisu configs
   *
   * @author Tobias Bräutigam
   * @since 0.10.0
   */
  qx.Class.define('cv.ConfigCache', {
    type: 'static',
    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      _cacheKey: 'data',
      _parseCacheData: null,
      _valid: null,
      replayCache: null,
      __P_752_0: null,
      failed: null,
      DB: null,
      init: function init() {
        if (!this.__P_752_0) {
          this.__P_752_0 = new Promise(function (resolve, reject) {
            if (!cv.ConfigCache.DB && !cv.ConfigCache.failed) {
              var request = indexedDB.open('cvCache', 1);
              request.onerror = function () {
                cv.ConfigCache.failed = true;
                qx.log.Logger.error(cv.ConfigCache, 'error opening cache database');
                cv.ConfigCache.DB = null;
                resolve(cv.ConfigCache.DB);
              };
              request.onsuccess = function (ev) {
                qx.log.Logger.debug(cv.ConfigCache, 'Success creating/accessing IndexedDB database');
                cv.ConfigCache.DB = request.result;
                cv.ConfigCache.DB.onerror = function (event) {
                  reject(new Error('Error creating/accessing IndexedDB database'));
                };
                resolve(cv.ConfigCache.DB);
              };
              request.onupgradeneeded = function (event) {
                var db = event.target.result;
                db.onerror = function (event) {
                  qx.log.Logger.error(cv.ConfigCache, 'Error loading database.');
                };
                var objectStore = db.createObjectStore('data', {
                  keyPath: 'config'
                });
                objectStore.createIndex('config', 'config', {
                  unique: true
                });
              };
            } else {
              resolve(cv.ConfigCache.DB);
            }
          });
        }
        return this.__P_752_0;
      },
      dump: function dump(xml, hash) {
        var model = cv.data.Model.getInstance();
        this.save({
          hash: hash || this.toHash(xml),
          VERSION: cv.Version.VERSION,
          REV: cv.Version.REV,
          data: JSON.stringify(model.getWidgetDataModel()),
          addresses: model.getAddressList(),
          configSettings: JSON.stringify(cv.Config.configSettings),
          config: cv.Config.configSuffix === null ? 'NULL' : cv.Config.configSuffix,
          body: document.querySelector('body').innerHTML
        });
      },
      restore: function restore() {
        var _this = this;
        var body = document.querySelector('body');
        var model = cv.data.Model.getInstance();
        this.getData().then(function (cache) {
          cv.Config.configSettings = cache.configSettings;

          // restore icons
          cv.Config.configSettings.iconsFromConfig.forEach(function (icon) {
            cv.IconHandler.getInstance().insert(icon.name, icon.uri, icon.type, icon.flavour, icon.color, icon.styling, icon.dynamic, icon.source);
          }, _this);

          // restore mappings
          if (cv.Config.configSettings.mappings) {
            Object.keys(cv.Config.configSettings.mappings).forEach(function (name) {
              var mapping = cv.Config.configSettings.mappings[name];
              if (mapping && mapping.formulaSource) {
                mapping.formula = new Function('x', 'var y;' + mapping.formulaSource + '; return y;');
              } else {
                Object.keys(mapping).forEach(function (key) {
                  if (key === 'range') {
                    Object.keys(mapping.range).forEach(function (rangeMin) {
                      mapping.range[rangeMin][1].forEach(function (valueElement, i) {
                        var iconDefinition = valueElement.definition;
                        if (iconDefinition) {
                          var icon = cv.IconHandler.getInstance().getIconElement(iconDefinition.name, iconDefinition.type, iconDefinition.flavour, iconDefinition.color, iconDefinition.styling, iconDefinition['class']);
                          icon.definition = iconDefinition;
                          mapping.range[rangeMin][1][i] = icon;
                        }
                      });
                    });
                  } else if (Array.isArray(mapping[key])) {
                    var contents = mapping[key];
                    for (var i = 0; i < contents.length; i++) {
                      var iconDefinition = contents[i].definition;
                      if (iconDefinition) {
                        var icon = cv.IconHandler.getInstance().getIconElement(iconDefinition.name, iconDefinition.type, iconDefinition.flavour, iconDefinition.color, iconDefinition.styling, iconDefinition['class']);
                        icon.definition = iconDefinition;
                        contents[i] = icon;
                      }
                    }
                  } else {
                    var _iconDefinition = mapping[key].definition;
                    if (_iconDefinition) {
                      var _icon = cv.IconHandler.getInstance().getIconElement(_iconDefinition.name, _iconDefinition.type, _iconDefinition.flavour, _iconDefinition.color, _iconDefinition.styling, _iconDefinition['class']);
                      _icon.definition = _iconDefinition;
                      mapping[key] = _icon;
                    }
                  }
                });
              }
            }, _this);
          }
          model.setWidgetDataModel(cache.data);
          model.setAddressList(cache.addresses);
          var widgetsToInitialize = Object.keys(cache.data).filter(function (widgetId) {
            return cache.data[widgetId].$$initOnCacheLoad === true;
          });
          if (widgetsToInitialize.length > 0) {
            cv.TemplateEngine.getInstance().addListenerOnce('changeReady', function () {
              widgetsToInitialize.forEach(function (widgetId) {
                var widgetData = cache.data[widgetId];
                cv.ui.structure.WidgetFactory.createInstance(widgetData.$$type, widgetData);
              });
            });
          }
          // hide body to prevent flickering
          body.style.visibility = 'hidden';
          body.innerHTML = cache.body;
          qx.log.Logger.debug(_this, 'content restored from cache');
        });
      },
      save: function save(data) {
        if (cv.ConfigCache.DB) {
          var objectStore = cv.ConfigCache.DB.transaction(['data'], 'readwrite').objectStore('data');
          objectStore.put(data);
        }
      },
      getData: function getData(key) {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  if (!cv.ConfigCache.DB) {
                    resolve(null);
                    return;
                  }
                  if (!_this2._parseCacheData) {
                    var objectStore = cv.ConfigCache.DB.transaction(['data'], 'readonly').objectStore('data');
                    var dataRequest = objectStore.get(cv.Config.configSuffix === null ? 'NULL' : cv.Config.configSuffix);
                    dataRequest.onsuccess = function (event) {
                      if (!dataRequest.result) {
                        resolve(null);
                      } else {
                        this._parseCacheData = dataRequest.result;
                        // parse stringified data
                        this._parseCacheData.data = JSON.parse(this._parseCacheData.data);
                        this._parseCacheData.configSettings = JSON.parse(this._parseCacheData.configSettings);
                        if (key) {
                          resolve(this._parseCacheData[key]);
                        } else {
                          resolve(this._parseCacheData);
                        }
                      }
                    }.bind(_this2);
                  } else if (key) {
                    resolve(_this2._parseCacheData[key]);
                  } else {
                    resolve(_this2._parseCacheData);
                  }
                }));
              case 1:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      /**
       * Returns true if there is an existing cache for the current config file
       */
      isCached: function isCached() {
        var _this3 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var data, cacheVersion;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return cv.ConfigCache.init();
              case 2:
                _context2.next = 4;
                return _this3.getData();
              case 4:
                data = _context2.sent;
                if (data) {
                  _context2.next = 7;
                  break;
                }
                return _context2.abrupt("return", false);
              case 7:
                // compare versions
                cacheVersion = data.VERSION + '|' + data.REV;
                qx.log.Logger.debug(_this3, 'Cached version: ' + cacheVersion + ', CV-Version: ' + cv.Version.VERSION + '|' + cv.Version.REV);
                return _context2.abrupt("return", cacheVersion === cv.Version.VERSION + '|' + cv.Version.REV);
              case 10:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      isValid: function isValid(xml, hash) {
        var _this4 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var cachedHash;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                if (!(_this4._valid === null)) {
                  _context3.next = 5;
                  break;
                }
                _context3.next = 3;
                return _this4.getData('hash');
              case 3:
                cachedHash = _context3.sent;
                if (!cachedHash) {
                  _this4._valid = false;
                } else {
                  if (!hash && xml) {
                    hash = _this4.toHash(xml);
                  }
                  qx.log.Logger.debug(_this4, 'Current hash: \'' + hash + '\', cached hash: \'' + cachedHash + '\'');
                  _this4._valid = hash === cachedHash;
                }
              case 5:
                return _context3.abrupt("return", _this4._valid);
              case 6:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }))();
      },
      toHash: function toHash(xml) {
        return this.hashCode(new XMLSerializer().serializeToString(xml));
      },
      clear: function clear(configSuffix) {
        if (cv.ConfigCache.DB) {
          configSuffix = configSuffix || (cv.Config.configSuffix === null ? 'NULL' : cv.Config.configSuffix);
          var objectStore = cv.ConfigCache.DB.transaction(['data'], 'readwrite').objectStore('data');
          var dataRequest = objectStore["delete"](configSuffix);
          dataRequest.onsuccess = function () {
            qx.log.Logger.debug('cache for ' + configSuffix + 'cleared');
          };
        }
      },
      /**
       * @param string
       * @see http://stackoverflow.com/q/7616461/940217
       * @return {number}
       */
      hashCode: function hashCode(string) {
        if (Array.prototype.reduce) {
          return string.split('').reduce(function (a, b) {
            a = (a << 5) - a + b.charCodeAt(0);
            return a & a;
          }, 0);
        }
        var hash = 0;
        if (string.length === 0) {
          return hash;
        }
        for (var i = 0, l = string.length; i < l; i++) {
          var character = string.charCodeAt(i);
          hash = (hash << 5) - hash + character;
          hash &= hash; // Convert to 32bit integer
        }
        return hash;
      }
    }
  });
  cv.ConfigCache.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ConfigCache.js.map?dt=1722153859603