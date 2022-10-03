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
qx.Class.define("cv.ConfigCache", {
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
    replayCache: null,
    __initPromise: null,
    failed: null,
    DB: null,

    init() {
      if (!this.__initPromise) {
        this.__initPromise = new Promise((resolve, reject) => {
          if (!cv.ConfigCache.DB && !cv.ConfigCache.failed) {
            const request = indexedDB.open("cvCache", 1);
            request.onerror = function () {
              cv.ConfigCache.failed = true;
              qx.log.Logger.error(
                cv.ConfigCache,
                "error opening cache database"
              );
              cv.ConfigCache.DB = null;
              resolve(cv.ConfigCache.DB);
            };
            request.onsuccess = function (ev) {
              qx.log.Logger.debug(
                cv.ConfigCache,
                "Success creating/accessing IndexedDB database"
              );
              cv.ConfigCache.DB = request.result;

              cv.ConfigCache.DB.onerror = function (event) {
                reject(
                  new Error("Error creating/accessing IndexedDB database")
                );
              };
              resolve(cv.ConfigCache.DB);
            };
            request.onupgradeneeded = function (event) {
              const db = event.target.result;

              db.onerror = function (event) {
                qx.log.Logger.error(cv.ConfigCache, "Error loading database.");
              };
              const objectStore = db.createObjectStore("data", {
                keyPath: "config"
              });
              objectStore.createIndex("config", "config", { unique: true });
            };
          } else {
            resolve(cv.ConfigCache.DB);
          }
        });
      }
      return this.__initPromise;
    },

    dump(xml, hash) {
      const model = cv.data.Model.getInstance();
      this.save({
        hash: hash || this.toHash(xml),
        VERSION: cv.Version.VERSION,
        REV: cv.Version.REV,
        data: JSON.stringify(model.getWidgetDataModel()),
        addresses: model.getAddressList(),
        configSettings: JSON.stringify(cv.Config.configSettings),
        config:
          cv.Config.configSuffix === null ? "NULL" : cv.Config.configSuffix,
        body: document.querySelector("body").innerHTML
      });
    },

    restore() {
      const body = document.querySelector("body");
      const model = cv.data.Model.getInstance();
      this.getData().then(cache => {
        cv.Config.configSettings = cache.configSettings;

        // restore icons
        cv.Config.configSettings.iconsFromConfig.forEach(function (icon) {
          cv.IconHandler.getInstance().insert(
            icon.name,
            icon.uri,
            icon.type,
            icon.flavour,
            icon.color,
            icon.styling,
            icon.dynamic,
            icon.source
          );
        }, this);

        // restore mappings
        if (cv.Config.configSettings.mappings) {
          Object.keys(cv.Config.configSettings.mappings).forEach(function (
            name
          ) {
            const mapping = cv.Config.configSettings.mappings[name];
            if (mapping && mapping.formulaSource) {
              mapping.formula = new Function(
                "x",
                "var y;" + mapping.formulaSource + "; return y;"
              ); // jshint ignore:line
            } else {
              Object.keys(mapping).forEach(key => {
                if (key === "range") {
                  Object.keys(mapping.range).forEach(rangeMin => {
                    mapping.range[rangeMin][1].forEach((valueElement, i) => {
                      const iconDefinition = valueElement.definition;
                      if (iconDefinition) {
                        let icon = cv.IconHandler.getInstance().getIconElement(
                          iconDefinition.name,
                          iconDefinition.type,
                          iconDefinition.flavour,
                          iconDefinition.color,
                          iconDefinition.styling,
                          iconDefinition["class"]
                        );
                        icon.definition = iconDefinition;
                        mapping.range[rangeMin][1][i] = icon;
                      }
                    });
                  });
                } else if (Array.isArray(mapping[key])) {
                  const contents = mapping[key];
                  for (let i = 0; i < contents.length; i++) {
                    const iconDefinition = contents[i].definition;
                    if (iconDefinition) {
                      let icon = cv.IconHandler.getInstance().getIconElement(
                        iconDefinition.name,
                        iconDefinition.type,
                        iconDefinition.flavour,
                        iconDefinition.color,
                        iconDefinition.styling,
                        iconDefinition["class"]
                      );
                      icon.definition = iconDefinition;
                      contents[i] = icon;
                    }
                  }
                } else {
                  const iconDefinition = mapping[key].definition;
                  if (iconDefinition) {
                    let icon = cv.IconHandler.getInstance().getIconElement(
                      iconDefinition.name,
                      iconDefinition.type,
                      iconDefinition.flavour,
                      iconDefinition.color,
                      iconDefinition.styling,
                      iconDefinition["class"]
                    );
                    icon.definition = iconDefinition;
                    mapping[key] = icon;
                  }
                }
              });
            }
          },
          this);
        }
        model.setWidgetDataModel(cache.data);
        model.setAddressList(cache.addresses);
        const widgetsToInitialize = Object.keys(cache.data).filter(function (
          widgetId
        ) {
          return cache.data[widgetId].$$initOnCacheLoad === true;
        });
        if (widgetsToInitialize.length > 0) {
          cv.TemplateEngine.getInstance().addListenerOnce("changeReady", () => {
            widgetsToInitialize.forEach(function (widgetId) {
              const widgetData = cache.data[widgetId];
              cv.ui.structure.WidgetFactory.createInstance(
                widgetData.$$type,
                widgetData
              );
            });
          });
        }
        // hide body to prevent flickering
        body.style.visibility = "hidden";
        body.innerHTML = cache.body;
        qx.log.Logger.debug(this, "content restored from cache");
      });
    },

    save(data) {
      if (cv.ConfigCache.DB) {
        const objectStore = cv.ConfigCache.DB.transaction(
          ["data"],
          "readwrite"
        ).objectStore("data");
        objectStore.put(data);
      }
    },

    async getData(key) {
      return new Promise((resolve, reject) => {
        if (!cv.ConfigCache.DB) {
          resolve(null);
          return;
        }
        if (!this._parseCacheData) {
          const objectStore = cv.ConfigCache.DB.transaction(
            ["data"],
            "readonly"
          ).objectStore("data");
          const dataRequest = objectStore.get(
            cv.Config.configSuffix === null ? "NULL" : cv.Config.configSuffix
          );
          dataRequest.onsuccess = function (event) {
            if (!dataRequest.result) {
              resolve(null);
            } else {
              this._parseCacheData = dataRequest.result;
              // parse stringified data
              this._parseCacheData.data = JSON.parse(this._parseCacheData.data);
              this._parseCacheData.configSettings = JSON.parse(
                this._parseCacheData.configSettings
              );
              if (key) {
                resolve(this._parseCacheData[key]);
              } else {
                resolve(this._parseCacheData);
              }
            }
          }.bind(this);
        } else if (key) {
          resolve(this._parseCacheData[key]);
        } else {
          resolve(this._parseCacheData);
        }
      });
    },

    /**
     * Returns true if there is an existing cache for the current config file
     */
    async isCached() {
      await cv.ConfigCache.init();
      const data = await this.getData();
      if (!data) {
        return false;
      }
      // compare versions
      const cacheVersion = data.VERSION + "|" + data.REV;
      qx.log.Logger.debug(
        this,
        "Cached version: " +
          cacheVersion +
          ", CV-Version: " +
          cv.Version.VERSION +
          "|" +
          cv.Version.REV
      );
      return cacheVersion === cv.Version.VERSION + "|" + cv.Version.REV;
    },

    async isValid(xml, hash) {
      // cache the result, as the config stays the same until next reload
      if (this._valid === null) {
        const cachedHash = await this.getData("hash");
        if (!cachedHash) {
          this._valid = false;
        } else {
          if (!hash && xml) {
            hash = this.toHash(xml);
          }
          qx.log.Logger.debug(
            this,
            "Current hash: '" + hash + "', cached hash: '" + cachedHash + "'"
          );
          this._valid = hash === cachedHash;
        }
      }
      return this._valid;
    },

    toHash(xml) {
      return this.hashCode(new XMLSerializer().serializeToString(xml));
    },

    clear(configSuffix) {
      if (cv.ConfigCache.DB) {
        configSuffix =
          configSuffix ||
          (cv.Config.configSuffix === null ? "NULL" : cv.Config.configSuffix);
        const objectStore = cv.ConfigCache.DB.transaction(
          ["data"],
          "readwrite"
        ).objectStore("data");
        const dataRequest = objectStore.delete(configSuffix);
        dataRequest.onsuccess = function () {
          qx.log.Logger.debug("cache for " + configSuffix + "cleared");
        };
      }
    },

    /**
     * @param string
     * @see http://stackoverflow.com/q/7616461/940217
     * @return {number}
     */
    hashCode(string) {
      if (Array.prototype.reduce) {
        return string.split("").reduce(function (a, b) {
          a = (a << 5) - a + b.charCodeAt(0);
          return a & a;
        }, 0);
      }
      let hash = 0;
      if (string.length === 0) {
        return hash;
      }
      for (let i = 0, l = string.length; i < l; i++) {
        let character = string.charCodeAt(i);
        hash = (hash << 5) - hash + character;
        hash &= hash; // Convert to 32bit integer
      }
      return hash;
    }
  }
});
