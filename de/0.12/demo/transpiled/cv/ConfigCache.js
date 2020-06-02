(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.Html": {},
      "cv.Config": {},
      "cv.data.Model": {},
      "cv.Version": {},
      "cv.TemplateEngine": {},
      "cv.ui.structure.WidgetFactory": {},
      "qx.log.Logger": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "html.storage.local": {
          "className": "qx.bom.client.Html"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ConfigCache.js 
   * 
   * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
    type: "static",

    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      _cacheKey: "data",
      _parseCacheData: null,
      _valid: null,
      dump: function dump(xml) {
        if (qx.core.Environment.get("html.storage.local") === false) {
          return;
        }

        var config = JSON.parse(JSON.stringify(cv.Config.configSettings)); // deep copy

        var model = cv.data.Model.getInstance();
        this.save(this._cacheKey, {
          hash: this.toHash(xml),
          VERSION: cv.Version.VERSION,
          REV: cv.Version.REV,
          data: model.getWidgetDataModel(),
          addresses: model.getAddressList(),
          configSettings: config
        });
        localStorage.setItem(cv.Config.configSuffix + ".body", document.querySelector('body').innerHTML);
      },
      restore: function restore() {
        var body = document.querySelector("body");
        var model = cv.data.Model.getInstance();
        var cache = this.getData();
        cv.Config.configSettings = cache.configSettings; // restore formulas

        if (cv.Config.configSettings.mappings) {
          Object.keys(cv.Config.configSettings.mappings).forEach(function (name) {
            var mapping = cv.Config.configSettings.mappings[name];

            if (mapping && mapping.formulaSource) {
              mapping.formula = new Function('x', 'var y;' + mapping.formulaSource + '; return y;'); // jshint ignore:line
            }
          }, this);
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
          }, this);
        }

        body.innerHTML = cv.ConfigCache.getBody();
      },
      save: function save(key, data) {
        if (qx.core.Environment.get("html.storage.local") === true) {
          localStorage.setItem(cv.Config.configSuffix + "." + key, JSON.stringify(data));
        }
      },
      getBody: function getBody() {
        if (qx.core.Environment.get("html.storage.local") === false) {
          return null;
        }

        return localStorage.getItem(cv.Config.configSuffix + ".body");
      },
      getData: function getData(key) {
        if (qx.core.Environment.get("html.storage.local") === false) {
          return null;
        }

        if (!this._parseCacheData) {
          this._parseCacheData = JSON.parse(localStorage.getItem(cv.Config.configSuffix + "." + this._cacheKey));
        }

        if (!this._parseCacheData) {
          return null;
        }

        if (key) {
          return this._parseCacheData[key];
        } else {
          return this._parseCacheData;
        }
      },

      /**
       * Returns true if there is an existing cache for the current config file
       */
      isCached: function isCached() {
        if (qx.core.Environment.get("html.storage.local") === false) {
          return false;
        }

        if (localStorage.getItem(cv.Config.configSuffix + "." + this._cacheKey) !== null) {
          // compare versions
          var cacheVersion = this.getData("VERSION") + '|' + this.getData('REV');
          qx.log.Logger.debug(this, "Cached version: " + cacheVersion + ", CV-Version: " + cv.Version.VERSION + '|' + cv.Version.REV);
          return cacheVersion === cv.Version.VERSION + '|' + cv.Version.REV;
        } else {
          return false;
        }
      },
      isValid: function isValid(xml) {
        if (qx.core.Environment.get("html.storage.local") === false) {
          return false;
        } // cache the result, as the config stays the same until next reload


        if (this._valid === null) {
          var hash = this.toHash(xml);
          qx.log.Logger.debug(this, "Current hash: '" + hash + "', cached hash: '" + this.getData("hash") + "'");
          this._valid = hash === this.getData("hash");
        }

        return this._valid;
      },
      toHash: function toHash(xml) {
        return this.hashCode(new XMLSerializer().serializeToString(xml));
      },
      clear: function clear(configSuffix) {
        if (qx.core.Environment.get("html.storage.local") === false) {
          return;
        }

        configSuffix = configSuffix || cv.Config.configSuffix;
        localStorage.removeItem(configSuffix + "." + this._cacheKey);
        localStorage.removeItem(configSuffix + ".body");
      },

      /**
       * @see http://stackoverflow.com/q/7616461/940217
       * @return {number}
       */
      hashCode: function hashCode(string) {
        if (Array.prototype.reduce) {
          return string.split("").reduce(function (a, b) {
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
          hash = hash & hash; // Convert to 32bit integer
        }

        return hash;
      }
    }
  });
  cv.ConfigCache.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ConfigCache.js.map?dt=1591115573914