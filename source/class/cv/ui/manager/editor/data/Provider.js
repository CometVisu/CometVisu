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
  construct: function () {
    this.base(arguments);
    this._client = cv.io.rest.Client.getDataProviderClient();
    this._client.addListener('designsSuccess', this._onUpdateDesigns, this);
    this._client.designs();
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __designs: null,
    __rrds: null,
    __influxdbs: null,
    __influxdbfields: null,
    __influxdbtags: null,
    __transforms: null,
    __plugins: null,
    __icons: null,

    _onUpdateDesigns: function (ev) {
      this.__designs = [];
      ev.getData().forEach(function (designName) {
        this.__designs.push({
          label: designName,
          insertText: designName,
          kind: window.monaco.languages.CompletionItemKind.EnumMember
        });
      }, this);
    },

    /**
     * Returns the available design names as array.
     * @returns {Array}
     */
    getDesigns: function () {
      return this.__designs;
    },

    getRrds: function () {
      return new Promise(function(resolve, reject) {
        this._client.rrdsSync(function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(this._parseDpResponse(res));
          }
        }, this);
      }.bind(this));
    },

    getInfluxDBs: function () {
      return new Promise(function(resolve, reject) {
        this._client.influxdbsSync(function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(this._parseDpResponse(res));
          }
        }, this);
      }.bind(this));
    },

    getInfluxDBFields: function (measurement) {
      return new Promise(function(resolve, reject) {
        this._client.influxdbfieldsSync({measurement: measurement}, function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(this._parseDpResponse(res));
          }
        }, this);
      }.bind(this));
    },

    getInfluxDBTags: function (measurement) {
      return new Promise(function(resolve, reject) {
        this._client.influxdbtagsSync({measurement: measurement}, function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(Object.keys(res).map(function (x) {
              return {
                label: x,
                insertText: x,
                kind: window.monaco.languages.CompletionItemKind.EnumMember
              };
            }));
          }
        }, this);
      }.bind(this));
    },

    getInfluxDBValues: function (measurement, tag) {
      return new Promise(function(resolve, reject) {
        this._client.influxdbtagsSync({measurement: measurement}, function (err, res) {
          if (err) {
            reject(err);
          } else {
            var sug = [];
            res[tag].forEach(function (x) {
              sug.push({
                label: x,
                insertText: x,
                kind: window.monaco.languages.CompletionItemKind.EnumMember
              });
            });
            resolve(sug);
          }
        }, this);
      }.bind(this));
    },

    _parseDpResponse: function (data) {
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

    getMediaFiles: function (typeFilter) {
      return new Promise(function(resolve, reject) {
        cv.io.rest.Client.getFsClient().readSync({path: 'media', recursive: true}, function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res.filter(function (file) {
              return !typeFilter || file.name.endsWith('.' + typeFilter);
            }).map(function (file) {
              var path = file.parentFolder + file.name;
              return {
                label: path,
                insertText: path,
                kind: window.monaco.languages.CompletionItemKind.EnumMember
              };
            }));
          }
        }, this);
      }.bind(this));
    },

    /**
     * Returns the list of available transformations as suggestion entry array.
     * @returns {Array}
     */
    getTransforms: function () {
      if (!this.__transforms) {
        this.__transforms = [];
        Object.keys(cv.Transform.registry).forEach(function (key) {
          var entry = cv.Transform.registry[key];
          var suggestion = {
            label: key,
            insertText: key,
            kind: window.monaco.languages.CompletionItemKind.EnumMember
          };
          if (entry.lname && entry.lname.hasOwnProperty(qx.locale.Manager.getInstance().getLanguage())) {
            suggestion.detail = entry.lname[qx.locale.Manager.getInstance().getLanguage()];
          }
          this.__transforms.push(suggestion);
        }, this);
      }
      return this.__transforms;
    },

    /**
     * Returns the plugin names (all defined parts staring with 'plugin-')
     * @returns {Array}
     */
    getPlugins: function () {
      if (!this.__plugins) {
        this.__plugins = [];
        var qxParts = qx.io.PartLoader.getInstance().getParts();
        Object.keys(qxParts).forEach(function (partName) {
          if (partName.startsWith('plugin-')) {
            var pluginName = partName.substring(7);
            this.__plugins.push({
              label: pluginName,
              insertText: pluginName,
              kind: window.monaco.languages.CompletionItemKind.EnumMember
            });
          }
        }, this);
      }
      return this.__plugins;
    },

    getIcons: function () {
      if (!this.__icons) {
        this.__icons = Object.keys(cv.IconConfig.DB).map(function (iconName) {
          return {
            label: iconName,
            insertText: iconName,
            kind: window.monaco.languages.CompletionItemKind.EnumMember
          }
        });
      }
      return this.__icons;
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this.__transforms = null;
    this.__designs = null;
    this.__plugins = null;
    this.__icons = null;

    ['rrds', 'influxdbs', 'influxdbfields', 'influxdbtags'].forEach(function (name) {
      this['__' + name] = null;
    }, this);
  }
});
