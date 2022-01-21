function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
      "cv.io.rest.Client": {
        "construct": true
      },
      "qx.lang.Function": {},
      "qx.log.Logger": {},
      "qx.lang.Type": {},
      "qx.io.request.Xhr": {},
      "cv.TemplateEngine": {},
      "cv.Transform": {},
      "qx.locale.Manager": {},
      "qx.io.PartLoader": {},
      "cv.IconHandler": {},
      "cv.IconConfig": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * Wrapper class for all data providers.
   */
  qx.Class.define('cv.ui.manager.editor.data.Provider', {
    extend: qx.core.Object,
    type: 'singleton',

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_35_0 = {};
      this._client = cv.io.rest.Client.getDataProviderClient();
    },

    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      Config: {
        'address': {
          '#text': {
            cache: true,
            userInputAllowed: true,
            grouped: true,
            method: 'getAddresses'
          }
        },
        'rrd': {
          '#text': {
            cache: true,
            userInputAllowed: true,
            method: 'getRrds'
          }
        },
        'influx': {
          'measurement': {
            cache: false,
            live: true,
            userInputAllowed: false,
            method: 'getInfluxDBs'
          },
          'field': {
            cache: false,
            live: true,
            userInputAllowed: false,
            method: 'getInfluxDBFields'
          }
        },
        'tag': {
          'key': {
            cache: false,
            live: true,
            userInputAllowed: false,
            method: 'getInfluxDBTags'
          },
          'value': {
            cache: false,
            live: true,
            userInputAllowed: false,
            method: 'getInfluxDBValues'
          }
        },
        'icon': {
          'name': {
            cache: true,
            userInputAllowed: false,
            method: 'getIcons'
          }
        },
        'plugin': {
          'name': {
            cache: true,
            userInputAllowed: false,
            method: 'getPlugins'
          }
        },
        'pages': {
          'design': {
            method: 'getDesigns',
            cache: true,
            userInputAllowed: false
          }
        },
        // wildcard: will match ANY elements attribute (lower prio than an exact element-attribute-match)
        '*': {
          'rrd': {
            method: 'getRrds',
            cache: true,
            userInputAllowed: true
          },
          'ga': {
            method: 'getAddresses',
            cache: true,
            userInputAllowed: true,
            grouped: true
          },
          'transform': {
            method: 'getTransforms',
            cache: true,
            userInputAllowed: false
          }
        }
      },
      get: function get(id) {
        var instance = cv.ui.manager.editor.data.Provider.getInstance();
        var format = 'dp';

        var _id$split = id.split('@'),
            _id$split2 = _slicedToArray(_id$split, 2),
            element = _id$split2[0],
            attribute = _id$split2[1];

        var config = null;

        if (this.Config[element] && this.Config[element][attribute]) {
          config = this.Config[element][attribute];
        } else if (this.Config['*'][attribute]) {
          config = this.Config['*'][attribute];
        }

        if (config) {
          var conf = {};

          if (config.live) {
            conf.getLive = qx.lang.Function.curry(instance[config.method], format, config).bind(instance);
          } else {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            args.unshift(config);
            args.unshift(format);
            conf.data = instance[config.method].apply(instance, args);
          }

          return Object.assign(conf, config);
        }

        return null;
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_35_0: null,
      _getFromCache: function _getFromCache(cacheId) {
        return this.__P_35_0[cacheId];
      },
      __P_35_1: function __P_35_1(cacheId) {
        if (!cacheId) {
          this.__P_35_0 = {};
        } else {
          delete this.__P_35_0[cacheId];
        }
      },
      _addToCache: function _addToCache(cacheId, data) {
        this.__P_35_0[cacheId] = data;
      },

      /**
       * Returns the available design names as array of suggestions.
       * @param format
       * @param config
       * @returns {Promise<Array>} suggestions
       */
      getDesigns: function getDesigns(format, config) {
        if (!config) {
          config = {
            cache: true
          };
        }

        return this.__P_35_2('designs', 'designsSync', null, [], format === 'dp' ? function (res) {
          return res.map(function (designName) {
            return {
              label: designName,
              value: designName
            };
          });
        } : function (res) {
          return res.map(function (designName) {
            return {
              label: designName,
              insertText: designName,
              kind: window.monaco.languages.CompletionItemKind.EnumMember
            };
          });
        }, this, config.cache);
      },

      /**
       * @param cacheId {String}
       * @param rpc {String|Function} rpcname to use with this._client or function to call
       * @param rpcContext {Object} rpc context
       * @param args {Array} rpc arguments
       * @param converter {Function} converter that converts the response to suggestions for the text editor
       * @param converterContext {Object} context fot the converter function
       * @param cache
       * @returns {Promise<any>}
       * @private
       */
      __P_35_2: function __P_35_2(cacheId, rpc, rpcContext, args, converter, converterContext, cache) {
        var cached = cache ? this._getFromCache(cacheId) : null;

        if (cached) {
          return Promise.resolve(converter.call(converterContext || this, cached));
        }

        return new Promise(function (resolve, reject) {
          var handleResponse = function handleResponse(err, res) {
            if (err) {
              reject(err);
            } else if (typeof res === 'string' && res.startsWith('Error:')) {
              qx.log.Logger.error(this, res);
              resolve(converter.call(converterContext || this, []));
            } else {
              if (cache) {
                // cache the raw values not the converted ones
                this._addToCache(cacheId, res);
              }

              resolve(converter.call(converterContext || this, res));
            }
          };

          if (!args) {
            args = [handleResponse, this];
          } else {
            args.push(handleResponse);
            args.push(this);
          }

          if (qx.lang.Type.isString(rpc)) {
            this._client[rpc].apply(rpcContext || this._client, args);
          } else if (qx.lang.Type.isFunction(rpc)) {
            rpc.apply(rpcContext, args);
          }
        }.bind(this));
      },
      __P_35_3: function __P_35_3(url, converter, converterContext, cache) {
        var cached = cache ? this._getFromCache(url) : null;

        if (cached) {
          if (converter) {
            cached = converter.call(converterContext || this, cached);
          }

          return Promise.resolve(cached);
        }

        return new Promise(function (resolve, reject) {
          var _this = this;

          var xhr = new qx.io.request.Xhr(url);
          cv.TemplateEngine.getClient().authorize(xhr);
          xhr.set({
            accept: 'application/json'
          });
          xhr.addListener('success', function (ev) {
            var data = ev.getTarget().getResponse();

            if (cache) {
              _this._addToCache(url, data);
            }

            if (converter) {
              data = converter.call(converterContext || _this, data);
            }

            resolve(data);
          }, this);
          xhr.addListener('statusError', reject, this);
          xhr.send();
        }.bind(this));
      },
      getAddresses: function getAddresses(format, config) {
        var client = cv.TemplateEngine.getClient();

        if (!config) {
          config = {
            cache: true
          };
        }

        if (client.hasProvider('addresses')) {
          return this.__P_35_3(client.getProviderUrl('addresses'), client.getProviderConvertFunction('addresses', format), client, config.cache);
        }

        return this.__P_35_2('addresses', 'addressesSync', null, [], format === 'dp' ? this._parseDpResponseForEditor : this._parseDpResponseForMonaco, this, config.cache);
      },
      getRrds: function getRrds(format, config) {
        var client = cv.TemplateEngine.getClient();

        if (!config) {
          config = {
            cache: true
          };
        }

        if (client.hasProvider('rrd')) {
          return this.__P_35_3(client.getProviderUrl('rrd'), client.getProviderConvertFunction('rrd', format), client, config.cache);
        }

        return this.__P_35_2('rrds', 'rrdsSync', null, [], format === 'dp' ? this._parseDpResponseForEditor : this._parseDpResponseForMonaco, this, config.cache);
      },
      getInfluxDBs: function getInfluxDBs(format, config, element) {
        var args = this.__P_35_4(element, false);

        return this.__P_35_2('influxdbs', 'influxdbsSync', null, args, format === 'dp' ? this._parseDpResponseForEditor : this._parseDpResponseForMonaco, this, config.cache);
      },
      __P_35_4: function __P_35_4(element, withMeasurement) {
        var args = [];

        if (element.hasAttribute('authentication')) {
          args.push({
            auth: element.getAttribute('authentication')
          });
        }

        if (withMeasurement) {
          var influx = element; // walk the tree to get the selected data source in the influx element

          while (influx.nodeName !== 'influx') {
            influx = influx.parentElement;

            if (undefined === influx) {
              // this safety measure can not happen without a bug somewhere!
              throw new Error();
            }
          }

          args.push({
            measurement: element.getAttribute('measurement')
          });
        }

        return args;
      },
      getInfluxDBFields: function getInfluxDBFields(format, config, element) {
        try {
          var args = this.__P_35_4(element, true);

          return this.__P_35_2('influxdbfields|' + args.measurement + '|' + args.auth, 'influxdbfieldsSync', null, args, format === 'dp' ? this._parseDpResponseForEditor : this._parseDpResponseForMonaco, this, config.cache);
        } catch (e) {
          return [];
        }
      },
      __P_35_5: function __P_35_5(format, config, element, converter) {
        try {
          var args = this.__P_35_4(element, true);

          return this.__P_35_2('influxdbtags|' + args.measurement + '|' + args.auth, 'influxdbtagsSync', null, args, converter, this, config.cache);
        } catch (e) {
          return [];
        }
      },
      getInfluxDBTags: function getInfluxDBTags(format, config, element) {
        return this.__P_35_5(format, config, element, function (res) {
          if (format === 'monaco') {
            return Object.keys(res).map(function (x) {
              return {
                label: x,
                insertText: x,
                kind: window.monaco.languages.CompletionItemKind.EnumMember
              };
            });
          }

          return Object.keys(res).map(function (x) {
            return {
              value: x,
              label: x
            };
          });
        });
      },
      getInfluxDBValues: function getInfluxDBValues(format, config, element, tag) {
        return this.__P_35_5(format, config, element, function (res) {
          if (res === null || !(element.attributes.key in res)) {
            return [];
          }

          if (format === 'monaco') {
            return res[tag].map(function (x) {
              return {
                label: x,
                insertText: x,
                kind: window.monaco.languages.CompletionItemKind.EnumMember
              };
            });
          }

          return res[tag].map(function (x) {
            return {
              label: x,
              value: x
            };
          });
        });
      },
      _parseDpResponseForMonaco: function _parseDpResponseForMonaco(data) {
        return this.__P_35_6(data, 'monaco');
      },
      _parseDpResponseForEditor: function _parseDpResponseForEditor(data) {
        return this.__P_35_6(data, 'dp');
      },
      __P_35_6: function __P_35_6(data, format) {
        var target = [];

        if (!format || format === 'monaco') {
          data.forEach(function (entry) {
            target.push({
              label: entry.label,
              insertText: entry.value,
              kind: window.monaco.languages.CompletionItemKind.EnumMember
            });
          }, this);
        } else if (format === 'dp') {
          return data || [];
        }

        return target;
      },
      getMediaFiles: function getMediaFiles(format, config, typeFilter) {
        var fsClient = cv.io.rest.Client.getFsClient();
        return this.__P_35_2('media', fsClient.readSync, fsClient, [{
          path: 'media',
          recursive: true
        }], function (res) {
          return res.filter(function (file) {
            return !typeFilter || file.name.endsWith('.' + typeFilter);
          }).map(function (file) {
            var path = file.parentFolder + file.name;
            return {
              label: path,
              insertText: path,
              kind: window.monaco.languages.CompletionItemKind.EnumMember
            };
          });
        }, this, config.cache);
      },

      /**
       * Returns the list of available transformations as suggestion entry array.
       * @param format
       * @param config
       * @returns {Array}
       */
      getTransforms: function getTransforms(format, config) {
        if (!format) {
          format = 'monaco';
        }

        var cacheId = 'transforms|' + format;
        var useCache = !config || config.cache === true;
        var cached = useCache ? this._getFromCache(cacheId) : null;

        if (cached) {
          return cached;
        }

        var transforms = [];
        Object.keys(cv.Transform.registry).forEach(function (key) {
          var entry = cv.Transform.registry[key];
          var suggestion;

          if (format === 'dp') {
            suggestion = {
              label: entry.name + ' [' + key + ']',
              value: key
            };
          } else {
            suggestion = {
              label: key,
              insertText: key,
              kind: window.monaco.languages.CompletionItemKind.EnumMember
            };

            if (entry.lname && Object.prototype.hasOwnProperty.call(entry.lname, qx.locale.Manager.getInstance().getLanguage())) {
              suggestion.detail = entry.lname[qx.locale.Manager.getInstance().getLanguage()];
            }
          }

          transforms.push(suggestion);
        }, this);

        if (useCache) {
          this._addToCache(cacheId, transforms);
        }

        return transforms;
      },

      /**
       * Returns the plugin names (all defined parts staring with 'plugin-')
       * @param format
       * @param config
       * @returns {Array}
       */
      getPlugins: function getPlugins(format, config) {
        if (!format) {
          format = 'monaco';
        }

        var useCache = !config || config.cache === true;
        var cacheId = 'plugins|' + format;
        var cached = useCache ? this._getFromCache(cacheId) : null;

        if (cached) {
          return cached;
        }

        var plugins = [];
        var qxParts = qx.io.PartLoader.getInstance().getParts();
        Object.keys(qxParts).forEach(function (partName) {
          if (partName.startsWith('plugin-')) {
            var pluginName = partName.substring(7);

            if (format === 'dp') {
              plugins.push({
                label: pluginName,
                value: pluginName
              });
            } else {
              plugins.push({
                label: pluginName,
                insertText: pluginName,
                kind: window.monaco.languages.CompletionItemKind.EnumMember
              });
            }
          }
        }, this);

        if (useCache) {
          this._addToCache(cacheId, plugins);
        }

        return plugins;
      },
      getIcons: function getIcons(format, config) {
        if (!format) {
          format = 'monaco';
        }

        var useCache = !config || config.cache === true;
        var cacheId = 'icons|' + format;
        var cached = useCache ? this._getFromCache(cacheId) : null;

        if (cached) {
          return cached;
        }

        var icons;
        var iconHandler = cv.IconHandler.getInstance();

        if (format === 'monaco') {
          icons = Object.keys(cv.IconConfig.DB).map(function (iconName) {
            return {
              label: iconName,
              insertText: iconName,
              kind: window.monaco.languages.CompletionItemKind.EnumMember
            };
          });
        } else if (format === 'dp') {
          // dataprovider format
          icons = Object.keys(cv.IconConfig.DB).map(function (iconName) {
            return {
              label: iconName,
              value: iconName,
              icon: iconHandler.getIconSource(iconName)
            };
          });
        }

        if (useCache) {
          this._addToCache(cacheId, icons);
        }

        return icons;
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.__P_35_0 = null;
    }
  });
  cv.ui.manager.editor.data.Provider.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Provider.js.map?dt=1642787792013