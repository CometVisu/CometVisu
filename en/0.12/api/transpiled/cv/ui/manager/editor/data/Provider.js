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
      "qx.lang.Type": {},
      "cv.Transform": {},
      "qx.locale.Manager": {},
      "qx.io.PartLoader": {},
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
      this.__P_34_0 = {};
      this._client = cv.io.rest.Client.getDataProviderClient();
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_34_0: null,
      _getFromCache: function _getFromCache(cacheId) {
        return this.__P_34_0[cacheId];
      },
      __P_34_1: function __P_34_1(cacheId) {
        if (!cacheId) {
          this.__P_34_0 = {};
        } else {
          delete this.__P_34_0[cacheId];
        }
      },
      _addToCache: function _addToCache(cacheId, data) {
        this.__P_34_0[cacheId] = data;
      },

      /**
       * Returns the available design names as array of suggestions.
       * @returns {Promise<Array>} suggestions
       */
      getDesigns: function getDesigns() {
        return this.__P_34_2('designs', 'designsSync', null, [], function (res) {
          return res.map(function (designName) {
            return {
              label: designName,
              insertText: designName,
              kind: window.monaco.languages.CompletionItemKind.EnumMember
            };
          });
        }, this);
      },

      /**
       *
       * @param cacheId {String}
       * @param rpc {String|Function} rpcname to use with this._client or function to call
       * @param rpcContext {Object} rpc context
       * @param args {Array} rpc arguments
       * @param converter {Function} converter that converts the response to suggestions for the text editor
       * @param converterContext {Object} context fot the converter function
       * @returns {Promise<any>}
       * @private
       */
      __P_34_2: function __P_34_2(cacheId, rpc, rpcContext, args, converter, converterContext) {
        var cached = this._getFromCache(cacheId);

        if (cached) {
          return Promise.resolve(converter.call(converterContext || this, cached));
        } else {
          return new Promise(function (resolve, reject) {
            var handleResponse = function handleResponse(err, res) {
              if (err) {
                reject(err);
              } else {
                // cache the raw values not the converted ones
                this._addToCache(cacheId, res);

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
        }
      },
      getRrds: function getRrds() {
        return this.__P_34_2('rrds', 'rrdsSync', null, [], this._parseDpResponse, this);
      },
      getInfluxDBs: function getInfluxDBs() {
        return this.__P_34_2('influxdbs', 'influxdbsSync', null, [], this._parseDpResponse, this);
      },
      getInfluxDBFields: function getInfluxDBFields(measurement) {
        return this.__P_34_2('influxdbfields|' + measurement, 'influxdbfieldsSync', null, [{
          measurement: measurement
        }], this._parseDpResponse, this);
      },
      getInfluxDBTags: function getInfluxDBTags(measurement) {
        return this.__P_34_2('influxdbtags|' + measurement, 'influxdbtagsSync', null, [{
          measurement: measurement
        }], function (res) {
          return Object.keys(res).map(function (x) {
            return {
              label: x,
              insertText: x,
              kind: window.monaco.languages.CompletionItemKind.EnumMember
            };
          });
        }, this);
      },
      getInfluxDBValues: function getInfluxDBValues(measurement, tag) {
        return this.__P_34_2('influxdbtags|' + measurement, 'influxdbtagsSync', null, [{
          measurement: measurement
        }], function (res) {
          var sug = [];
          res[tag].forEach(function (x) {
            sug.push({
              label: x,
              insertText: x,
              kind: window.monaco.languages.CompletionItemKind.EnumMember
            });
          });
          return sug;
        }, this);
      },
      _parseDpResponse: function _parseDpResponse(data) {
        var target = [];
        data.forEach(function (entry) {
          target.push({
            label: entry.label,
            insertText: entry.value,
            kind: window.monaco.languages.CompletionItemKind.EnumMember
          });
        }, this);
        return target;
      },
      getMediaFiles: function getMediaFiles(typeFilter) {
        var fsClient = cv.io.rest.Client.getFsClient();
        return this.__P_34_2('media', fsClient.readSync, fsClient, [{
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
        }, this);
      },

      /**
       * Returns the list of available transformations as suggestion entry array.
       * @returns {Array}
       */
      getTransforms: function getTransforms(format) {
        if (!format) {
          format = 'monaco';
        }

        var cacheId = 'transforms|' + format;

        var cached = this._getFromCache(cacheId);

        if (cached) {
          return cached;
        } else {
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

              if (entry.lname && entry.lname.hasOwnProperty(qx.locale.Manager.getInstance().getLanguage())) {
                suggestion.detail = entry.lname[qx.locale.Manager.getInstance().getLanguage()];
              }
            }

            transforms.push(suggestion);
          }, this);

          this._addToCache(cacheId, transforms);

          return transforms;
        }
      },

      /**
       * Returns the plugin names (all defined parts staring with 'plugin-')
       * @returns {Array}
       */
      getPlugins: function getPlugins(format) {
        if (!format) {
          format = 'monaco';
        }

        var cacheId = 'plugins|' + format;

        var cached = this._getFromCache(cacheId);

        if (cached) {
          return cached;
        } else {
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

          this._addToCache(cacheId, plugins);

          return plugins;
        }
      },
      getIcons: function getIcons(format) {
        if (!format) {
          format = 'monaco';
        }

        var cacheId = 'icons|' + format;

        var cached = this._getFromCache(cacheId);

        if (cached) {
          return cached;
        } else {
          var icons;

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
                value: iconName
              };
            });
          }

          this._addToCache(cacheId, icons);

          return icons;
        }
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.__P_34_0 = null;
    }
  });
  cv.ui.manager.editor.data.Provider.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Provider.js.map?dt=1612700562102