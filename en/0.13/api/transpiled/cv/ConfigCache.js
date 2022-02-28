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
      __P_490_0: null,
      DB: null,
      init: function init() {
        if (!this.__P_490_0) {
          this.__P_490_0 = new Promise(function (resolve, reject) {
            if (!cv.ConfigCache.DB) {
              var request = indexedDB.open('cvCache', 1);

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

        return this.__P_490_0;
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
          cv.Config.configSettings = cache.configSettings; // restore icons

          cv.Config.configSettings.iconsFromConfig.forEach(function (icon) {
            cv.IconHandler.getInstance().insert(icon.name, icon.uri, icon.type, icon.flavour, icon.color, icon.styling, icon.dynamic, icon.source);
          }, _this); // restore mappings

          if (cv.Config.configSettings.mappings) {
            Object.keys(cv.Config.configSettings.mappings).forEach(function (name) {
              var mapping = cv.Config.configSettings.mappings[name];

              if (mapping && mapping.formulaSource) {
                mapping.formula = new Function('x', 'var y;' + mapping.formulaSource + '; return y;'); // jshint ignore:line
              } else {
                Object.keys(mapping).forEach(function (key) {
                  if (Array.isArray(mapping[key])) {
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
            }, _this);
          }

          body.innerHTML = cache.body;
          qx.log.Logger.debug(_this, 'content restored from cache');
        });
      },
      save: function save(data) {
        var objectStore = cv.ConfigCache.DB.transaction(['data'], 'readwrite').objectStore('data');
        objectStore.put(data);
      },
      getData: function () {
        var _getData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key) {
          var _this2 = this;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return", new Promise(function (resolve, reject) {
                    if (!_this2._parseCacheData) {
                      var objectStore = cv.ConfigCache.DB.transaction(['data'], 'readonly').objectStore('data');
                      var dataRequest = objectStore.get(cv.Config.configSuffix === null ? 'NULL' : cv.Config.configSuffix);

                      dataRequest.onsuccess = function (event) {
                        if (!dataRequest.result) {
                          resolve(null);
                        } else {
                          this._parseCacheData = dataRequest.result; // parse stringified data

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
            }
          }, _callee);
        }));

        function getData(_x) {
          return _getData.apply(this, arguments);
        }

        return getData;
      }(),

      /**
       * Returns true if there is an existing cache for the current config file
       */
      isCached: function () {
        var _isCached = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var data, cacheVersion;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return cv.ConfigCache.init();

                case 2:
                  _context2.next = 4;
                  return this.getData();

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
                  qx.log.Logger.debug(this, 'Cached version: ' + cacheVersion + ', CV-Version: ' + cv.Version.VERSION + '|' + cv.Version.REV);
                  return _context2.abrupt("return", cacheVersion === cv.Version.VERSION + '|' + cv.Version.REV);

                case 10:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function isCached() {
          return _isCached.apply(this, arguments);
        }

        return isCached;
      }(),
      isValid: function () {
        var _isValid = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(xml, hash) {
          var cachedHash;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!(this._valid === null)) {
                    _context3.next = 5;
                    break;
                  }

                  _context3.next = 3;
                  return this.getData('hash');

                case 3:
                  cachedHash = _context3.sent;

                  if (!cachedHash) {
                    this._valid = false;
                  } else {
                    if (!hash) {
                      hash = this.toHash(xml);
                    }

                    qx.log.Logger.debug(this, 'Current hash: \'' + hash + '\', cached hash: \'' + cachedHash + '\'');
                    this._valid = hash === cachedHash;
                  }

                case 5:
                  return _context3.abrupt("return", this._valid);

                case 6:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function isValid(_x2, _x3) {
          return _isValid.apply(this, arguments);
        }

        return isValid;
      }(),
      toHash: function toHash(xml) {
        return this.hashCode(new XMLSerializer().serializeToString(xml));
      },
      clear: function clear(configSuffix) {
        configSuffix = configSuffix || (cv.Config.configSuffix === null ? 'NULL' : cv.Config.configSuffix);
        var objectStore = cv.ConfigCache.DB.transaction(['data'], 'readwrite').objectStore('data');
        var dataRequest = objectStore["delete"](configSuffix);

        dataRequest.onsuccess = function () {
          qx.log.Logger.debug('cache for ' + configSuffix + 'cleared');
        };
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

//# sourceMappingURL=ConfigCache.js.map?dt=1646029398954