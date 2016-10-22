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
    this.hash = null;
    this.source = null;
    this._cacheKey = "cache";

    this.dump = function() {
      this.save(this._cacheKey, {
        body: $('body').html(),
        hash: this.hash,
        data: templateEngine.widgetData,
        addresses: templateEngine.ga_list,
        configSettings: templateEngine.configSettings
      });
    };

    this.save = function(key, data) {
      localStorage.setItem(templateEngine.configSuffix+"."+key, JSON.stringify(data));
    };

    this.get = function(key) {
      var cached = JSON.parse(localStorage.getItem(templateEngine.configSuffix + "." + this._cacheKey));
      if (!cached) {
        return null;
      }
      if (key) {
        return cached[key];
      } else {
        return cached;
      }
    };

    this.restore = function() {

    };

    /**
     * Returns true if there is an existing cache for the current config file
     */
    this.isCached = function() {
      return this.get() !== null;
    };

    this.isValid = function(xml) {
      return this.toHash(xml) == this.get("configHash");
    };

    this.toHash = function(xml) {
      return (new XMLSerializer()).serializeToString(xml).hashCode();
    };

    this.setSource = function(configXml) {
      this.hash = this.toHash(configXml);
      this.source = configXml;
    };

    this.getHash = function() {
      return this.hash;
    };

    this.clear = function() {
      localStorage.removeItem(templateEngine.configSuffix+"."+this._cacheKey);
    };
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