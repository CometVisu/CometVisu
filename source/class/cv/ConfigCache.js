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
    _cacheKey : "data",
    _parseCacheData : null,
    _valid : null,
    
    dump : function(xml) {
      var config = qx.lang.Object.clone(cv.Config.configSettings, true);
      var model = cv.data.Model.getInstance();
      this.save(this._cacheKey, {
        hash: this.toHash(xml),
        VERSION: cv.Version.VERSION,
        data: model.getWidgetDataModel(),
        addresses: model.getAddressList(),
        configSettings: config
      });
      localStorage.setItem(cv.Config.configSuffix+".body", qx.bom.element.Attribute.get(qx.bom.Selector.query('body')[0], 'html'));
    },

    restore: function() {
      var body = qx.bom.Selector.query("body")[0];
      var model = cv.data.Model.getInstance();
      var cache = this.getData();
      cv.Config.configSettings = cache.configSettings;
      model.setWidgetDataModel(cache.data);
      model.setAddressList(cache.addresses);
      qx.bom.element.Attribute.set(body, "html", cv.ConfigCache.getBody());
    },
    
    save: function(key, data) {
      localStorage.setItem(cv.Config.configSuffix+"."+key, qx.lang.Json.stringify(data));
    },
    
    getBody: function() {
      return localStorage.getItem(cv.Config.configSuffix + ".body");
    },
    
    getData: function(key) {
      if (!this._parseCacheData) {
        this._parseCacheData = qx.lang.Json.parse(localStorage.getItem(cv.Config.configSuffix + "." + this._cacheKey));
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
    isCached: function() {
      if (localStorage.getItem(cv.Config.configSuffix + "." + this._cacheKey) !== null) {
        // compare versions
        var cacheVersion = this.getData("VERSION");
        qx.log.Logger.debug(this, "Cached version: "+cacheVersion+", CV-Version: "+cv.Version.VERSION);
        return (cacheVersion === cv.Version.VERSION);
      } else {
        return false;
      }
    },
    
    isValid: function(xml) {
      // cache the result, as the config stays the same until next reload
      if (this._valid === null) {
        var hash = this.toHash(xml);
        qx.log.Logger.debug(this, "Current hash: '"+hash+"', cached hash: '"+this.getData("hash")+"'");
        this._valid = hash === this.getData("hash");
      }
      return this._valid;
    },
    
    toHash: function(xml) {
      return this.hashCode((new XMLSerializer()).serializeToString(xml));
    },
    
    clear: function(configSuffix) {
      configSuffix = configSuffix || cv.Config.configSuffix;
      localStorage.removeItem(configSuffix+"."+this._cacheKey);
      localStorage.removeItem(configSuffix+".body");
    },
    
    /**
     * @see http://stackoverflow.com/q/7616461/940217
     * @return {number}
     */
    hashCode: function(string){
      if (Array.prototype.reduce){
        return string.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a;},0);
      }
      var hash = 0;
      if (string.length === 0) {
        return hash;
      }
      for (var i = 0, l = string.length; i < l; i++) {
        var character  = string.charCodeAt(i);
        hash  = ((hash<<5)-hash)+character;
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
    }
  }
});
