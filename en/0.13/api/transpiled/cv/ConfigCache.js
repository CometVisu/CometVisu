function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
      __P_525_0: null,
      failed: null,
      DB: null,
      init: function init() {
        if (!this.__P_525_0) {
          this.__P_525_0 = new Promise(function (resolve, reject) {
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
        return this.__P_525_0;
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

//# sourceMappingURL=ConfigCache.js.map?dt=1677345959433