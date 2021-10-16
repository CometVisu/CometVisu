/**
 * Wrapper class for all data providers.
 */
qx.Class.define("cv.ui.manager.editor.data.Provider", {
  extend: qx.core.Object,
  type: "singleton",

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this.__cache = {};
    this._client = cv.io.rest.Client.getDataProviderClient();
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    Config: {
      "address": {
        "#text": {
          cache: true,
          userInputAllowed: true,
          grouped: true,
          method: "getAddresses"
        }
      },
      "rrd": {
        "#text": {
          cache: true,
          userInputAllowed: true,
          method: "getRrds"
        }
      },
      "influx": {
        "measurement": {
          cache: false,
          live: true,
          userInputAllowed: false,
          method: "getInfluxDBs"
        },
        "field": {
          cache: false,
          live: true,
          userInputAllowed: false,
          method: "getInfluxDBFields"
        }
      },
      "tag": {
        "key": {
          cache: false,
          live: true,
          userInputAllowed: false,
          method: "getInfluxDBTags"
        },
        "value": {
          cache: false,
          live: true,
          userInputAllowed: false,
          method: "getInfluxDBValues"
        }
      },
      "icon": {
        "name": {
          cache: true,
          userInputAllowed: false,
          method: "getIcons"
        }
      },
      "plugin": {
        "name": {
          cache: true,
          userInputAllowed: false,
          method: "getPlugins"
        }
      },
      "pages": {
        "design": {
          method: "getDesigns",
          cache: true,
          userInputAllowed: false
        }
      },
      // wildcard: will match ANY elements attribute (lower prio than an exact element-attribute-match)
      "*": {
        "rrd": {
          method: "getRrds",
          cache: true,
          userInputAllowed: true
        },
        "ga": {
          method: "getAddresses",
          cache: true,
          userInputAllowed: true,
          grouped: true
        },
        "transform": {
          method: "getTransforms",
          cache: true,
          userInputAllowed: false
        }
      }
    },

    get: function (id, ...args) {
      const instance = cv.ui.manager.editor.data.Provider.getInstance();
      const format = "dp";
      const [element, attribute] = id.split("@");
      let config = null;
      if (this.Config[element] && this.Config[element][attribute]) {
        config = this.Config[element][attribute];
      } else if (this.Config["*"][attribute]) {
        config = this.Config["*"][attribute];
      }
      if (config) {
        const conf = {};
        if (config.live) {
          conf.getLive = qx.lang.Function.curry(instance[config.method], format, config).bind(instance);
        } else {
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
    __cache: null,

    _getFromCache: function (cacheId) {
      return this.__cache[cacheId];
    },

    __clearFromCache: function (cacheId) {
      if (!cacheId) {
        this.__cache = {};
      } else {
        delete this.__cache[cacheId];
      }
    },

    _addToCache: function (cacheId, data) {
      this.__cache[cacheId] = data;
    },

    /**
     * Returns the available design names as array of suggestions.
     * @param format
     * @param config
     * @returns {Promise<Array>} suggestions
     */
    getDesigns: function (format, config) {
      if (!config) {
        config = {cache: true};
      }
      return this.__getData("designs", "designsSync", null, [], format === "dp" ? function (res) {
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
    __getData: function (cacheId, rpc, rpcContext, args, converter, converterContext, cache) {
      var cached = cache ? this._getFromCache(cacheId) : null;
      if (cached) {
        return Promise.resolve(converter.call(converterContext || this, cached));
      } 
        return new Promise(function (resolve, reject) {
          var handleResponse = function (err, res) {
            if (err) {
              reject(err);
            } else if (typeof res === "string" && res.startsWith("Error:")) {
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

    __getFromUrl: function (url, converter, converterContext, cache) {
      let cached = cache ? this._getFromCache(url) : null;
      if (cached) {
        if (converter) {
          cached = converter.call(converterContext || this, cached);
        }
        return Promise.resolve(cached);
      } 
        return new Promise(function (resolve, reject) {
          const xhr = new qx.io.request.Xhr(url);
          cv.TemplateEngine.getClient().authorize(xhr);
          xhr.set({
            accept: "application/json"
          });
          xhr.addListener("success", ev => {
            let data = ev.getTarget().getResponse();
            if (cache) {
              this._addToCache(url, data);
            }
            if (converter) {
              data = converter.call(converterContext || this, data);
            }
            resolve(data);
            }, this);
          xhr.addListener("statusError", reject, this);
          xhr.send();
        }.bind(this));
    },

    getAddresses: function (format, config) {
      const client = cv.TemplateEngine.getClient();
      if (!config) {
        config = {cache: true};
      }
      if (client.hasProvider("addresses")) {
        return this.__getFromUrl(client.getProviderUrl("addresses"), client.getProviderConvertFunction("addresses", format), client, config.cache);
      } 
        return this.__getData("addresses", "addressesSync", null, [], format === "dp" ? this._parseDpResponseForEditor : this._parseDpResponseForMonaco, this, config.cache);
    },

    getRrds: function (format, config) {
      const client = cv.TemplateEngine.getClient();
      if (!config) {
        config = {cache: true};
      }
      if (client.hasProvider("rrd")) {
        return this.__getFromUrl(client.getProviderUrl("rrd"), client.getProviderConvertFunction("rrd", format), client, config.cache);
      } 
        return this.__getData("rrds", "rrdsSync", null, [], format === "dp" ? this._parseDpResponseForEditor : this._parseDpResponseForMonaco, this, config.cache);
    },

    getInfluxDBs: function (format, config, element) {
      const args = this.__getInfluxArgs(element, false);
      return this.__getData("influxdbs", "influxdbsSync", null, args, format === "dp" ? this._parseDpResponseForEditor : this._parseDpResponseForMonaco, this, config.cache);
    },

    __getInfluxArgs: function (element, withMeasurement) {
      const args = [];
      if (element.hasAttribute("authentication")) {
        args.push({auth: element.getAttribute("authentication")});
      }
      if (withMeasurement) {
        let influx = element;
        // walk the tree to get the selected data source in the influx element
        while (influx.nodeName !== "influx") {
          influx = influx.parentElement;
          if (undefined === influx) {
            // this safety measure can not happen without a bug somewhere!
            throw new Error();
          }
        }
        args.push({measurement: element.getAttribute("measurement")});
      }
      return args;
    },

    getInfluxDBFields: function (format, config, element) {
     try {
       const args = this.__getInfluxArgs(element, true);
       return this.__getData("influxdbfields|" + args.measurement + "|" + args.auth, "influxdbfieldsSync", null, args, format === "dp" ? this._parseDpResponseForEditor : this._parseDpResponseForMonaco, this, config.cache);
     } catch (e) {
       return [];
     }
    },

    __getInfluxDBTags: function (format, config, element, converter) {
      try {
        const args = this.__getInfluxArgs(element, true);
        return this.__getData("influxdbtags|" + args.measurement + "|" + args.auth, "influxdbtagsSync", null, args, converter, this, config.cache);
      } catch (e) {
        return [];
      }
    },

    getInfluxDBTags: function (format, config, element) {
      return this.__getInfluxDBTags(format, config, element, function (res) {
        if (format === "monaco") {
          return Object.keys(res).map(function (x) {
            return {
              label: x,
              insertText: x,
              kind: window.monaco.languages.CompletionItemKind.EnumMember
            };
          });
        } 
          return Object.keys(res).map(function (x) {
            return {value: x, label: x};
          });
      });
    },

    getInfluxDBValues: function (format, config, element, tag) {
      return this.__getInfluxDBTags(format, config, element, function (res) {
        if (res === null || !(element.attributes.key in res)) {
          return [];
        }
        if (format === "monaco") {
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

    _parseDpResponseForMonaco: function (data) {
      return this.__parseDpResponse(data, "monaco");
    },

    _parseDpResponseForEditor: function (data) {
      return this.__parseDpResponse(data, "dp");
    },

    __parseDpResponse: function (data, format) {
      const target = [];
      if (!format || format === "monaco") {
        data.forEach(function (entry) {
          target.push({
            label: entry.label,
            insertText: entry.value,
            kind: window.monaco.languages.CompletionItemKind.EnumMember
          });
        }, this);
      } else if (format === "dp") {
        return data || [];
      }
      return target;
    },

    getMediaFiles: function (format, config, typeFilter) {
      var fsClient = cv.io.rest.Client.getFsClient();
      return this.__getData("media", fsClient.readSync, fsClient, [{path: "media", recursive: true}], function (res) {
        return res.filter(function (file) {
          return !typeFilter || file.name.endsWith("." + typeFilter);
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
    getTransforms: function (format, config) {
      if (!format) {
        format = "monaco";
      }
      const cacheId = "transforms|" + format;
      const useCache = !config || config.cache === true;
      const cached = useCache ? this._getFromCache(cacheId) : null;
      if (cached) {
        return cached;
      } 
        var transforms = [];
        Object.keys(cv.Transform.registry).forEach(function (key) {
          var entry = cv.Transform.registry[key];
          var suggestion;
          if (format === "dp") {
            suggestion = {
              label: entry.name + " [" + key + "]",
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
    getPlugins: function (format, config) {
      if (!format) {
        format = "monaco";
      }
      const useCache = !config || config.cache === true;
      const cacheId = "plugins|" + format;
      const cached = useCache ? this._getFromCache(cacheId) : null;
      if (cached) {
        return cached;
      } 
        var plugins = [];
        var qxParts = qx.io.PartLoader.getInstance().getParts();
        Object.keys(qxParts).forEach(function (partName) {
          if (partName.startsWith("plugin-")) {
            var pluginName = partName.substring(7);
            if (format === "dp") {
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

    getIcons: function (format, config) {
      if (!format) {
        format = "monaco";
      }
      const useCache = !config || config.cache === true;
      const cacheId = "icons|" + format;
      const cached = useCache ? this._getFromCache(cacheId) : null;
      if (cached) {
        return cached;
      } 
        let icons;
        const iconHandler = cv.IconHandler.getInstance();
        if (format === "monaco") {
          icons = Object.keys(cv.IconConfig.DB).map(function (iconName) {
            return {
              label: iconName,
              insertText: iconName,
              kind: window.monaco.languages.CompletionItemKind.EnumMember
            };
          });
        } else if (format === "dp") {
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
  destruct: function () {
    this.__cache = null;
  }
});
