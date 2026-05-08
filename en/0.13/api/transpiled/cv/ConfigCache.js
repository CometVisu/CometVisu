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
      "cv.data.Model": {},
      "cv.Config": {},
      "cv.Version": {},
      "cv.IconHandler": {},
      "cv.TemplateEngine": {},
      "cv.ui.structure.WidgetFactory": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ConfigCache.js
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
      __P_769_0: null,
      failed: null,
      DB: null,
      init: function init() {
        if (!this.__P_769_0) {
          this.__P_769_0 = new Promise(function (resolve, reject) {
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
        return this.__P_769_0;
      },
      dump: function dump(xml, hash) {
        var model = cv.data.Model.getInstance();
        this.save({
          hash: hash || this.toHash(xml),
          etag: cv.Config.configETag || '',
          VERSION: cv.Version.VERSION,
          REV: cv.Version.REV,
          data: JSON.stringify(model.getWidgetDataModel()),
          addresses: model.getAddressList(),
          configSettings: JSON.stringify(cv.Config.configSettings),
          config: cv.Config.configSuffix === null ? 'NULL' : cv.Config.configSuffix,
          body: document.querySelector('body').innerHTML,
          defaultBackendName: cv.data.Model.getInstance().getDefaultBackendName()
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
          model.setDefaultBackendName(cache.defaultBackendName);
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                return _context.a(2, new Promise(function (resolve, reject) {
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
            }
          }, _callee);
        }))();
      },
      /**
       * Returns true if there is an existing cache for the current config file
       */
      isCached: function isCached() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var data, cacheVersion;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _context2.n = 1;
                return cv.ConfigCache.init();
              case 1:
                _context2.n = 2;
                return _this3.getData();
              case 2:
                data = _context2.v;
                if (data) {
                  _context2.n = 3;
                  break;
                }
                return _context2.a(2, false);
              case 3:
                // compare versions
                cacheVersion = data.VERSION + '|' + data.REV;
                qx.log.Logger.debug(_this3, 'Cached version: ' + cacheVersion + ', CV-Version: ' + cv.Version.VERSION + '|' + cv.Version.REV);
                return _context2.a(2, cacheVersion === cv.Version.VERSION + '|' + cv.Version.REV);
            }
          }, _callee2);
        }))();
      },
      isValid: function isValid(xml, hash) {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var cachedETag, cachedHash;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                if (!cv.Config.configETag) {
                  _context3.n = 2;
                  break;
                }
                _context3.n = 1;
                return _this4.getData('etag');
              case 1:
                cachedETag = _context3.v;
                _this4._valid = cachedETag === cv.Config.configETag;
              case 2:
                if (!(_this4._valid === null)) {
                  _context3.n = 4;
                  break;
                }
                _context3.n = 3;
                return _this4.getData('hash');
              case 3:
                cachedHash = _context3.v;
                if (!cachedHash) {
                  _this4._valid = false;
                } else {
                  if (!hash && xml) {
                    hash = _this4.toHash(xml);
                  }
                  qx.log.Logger.debug(_this4, 'Current hash: \'' + hash + '\', cached hash: \'' + cachedHash + '\'');
                  _this4._valid = hash === cachedHash;
                }
              case 4:
                return _context3.a(2, _this4._valid);
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

//# sourceMappingURL=ConfigCache.js.map?dt=1778272856656