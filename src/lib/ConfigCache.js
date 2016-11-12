/* ConfigCache.js
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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

/* TODO:
 - cache icons
 */
define([], function() {
  var instance;

  function ConfigCache() {
    this._cacheKey = "data";
    this._parseCacheData = null;
    this._valid = null;

    this.dump = function(xml) {
      this.save(this._cacheKey, {
        hash: this.toHash(xml),
        data: templateEngine.widgetData,
        addresses: templateEngine.ga_list,
        configSettings: templateEngine.configSettings
      });
      localStorage.setItem(templateEngine.configSuffix+".body", $('body').html());
    };

    this.save = function(key, data) {
      localStorage.setItem(templateEngine.configSuffix+"."+key, JSON.stringify(data));
    };

    this.getBody = function() {
      return localStorage.getItem(templateEngine.configSuffix + ".body");
    };

    this.getData = function(key) {
      if (!this._parseCacheData) {
        this._parseCacheData = JSON.parse(localStorage.getItem(templateEngine.configSuffix + "." + this._cacheKey));
      }
      if (!this._parseCacheData) {
        return null;
      }
      if (key) {
        return this._parseCacheData[key];
      } else {
        return this._parseCacheData;
      }
    };

    /**
     * Returns true if there is an existing cache for the current config file
     */
    this.isCached = function() {
      return localStorage.getItem(templateEngine.configSuffix + "." + this._cacheKey) !== null;
    };

    this.isValid = function(xml) {
      // cache the result, as the config stays the same until next reload
      if (this._valid === null) {
        console.log("Current hash: '%s', cached hash: '%s'", this.toHash(xml), this.getData("hash"));
        this._valid = this.toHash(xml) == this.getData("hash");
      }
      return this._valid;
    };

    this.toHash = function(xml) {
      return this.hashCode((new XMLSerializer()).serializeToString(xml));
    };

    this.clear = function() {
      localStorage.removeItem(templateEngine.configSuffix+"."+this._cacheKey);
      localStorage.removeItem(templateEngine.configSuffix+".body");
    };

    /**
     * @see http://stackoverflow.com/q/7616461/940217
     * @return {number}
     */
    this.hashCode = function(string){
      if (Array.prototype.reduce){
        return string.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
      }
      var hash = 0;
      if (string.length === 0) return hash;
      for (var i = 0, l = string.length; i < l; i++) {
        var character  = string.charCodeAt(i);
        hash  = ((hash<<5)-hash)+character;
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
    }
  }
  return {
    // simulate a singleton
    getInstance : function() {
      if (!instance) {
        instance = new ConfigCache();
      }
      return instance;
    }
  };
});