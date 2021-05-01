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
      "qx.data.Array": {
        "construct": true
      },
      "cv.Config": {},
      "qx.bom.Stylesheet": {},
      "qx.util.ResourceManager": {},
      "qx.util.DynamicScriptLoader": {},
      "cv.core.notifications.Router": {},
      "qx.locale.Manager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ScriptLoader.js 
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
  qx.Class.define('cv.util.ScriptLoader', {
    extend: qx.core.Object,
    type: "singleton",

    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_79_0 = new qx.data.Array();
      this.__P_79_1 = new qx.data.Array();
      this.__P_79_2 = new qx.data.Array();
      this.__P_79_3 = [];
    },

    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      markAsLoaded: function markAsLoaded(path) {
        return this.getInstance().markAsLoaded(path);
      },
      isMarkedAsLoaded: function isMarkedAsLoaded(path) {
        return this.getInstance().isMarkedAsLoaded(path);
      }
    },

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      allQueued: {
        check: "Boolean",
        init: false,
        apply: "_checkQueue",
        event: "changeAllQueued"
      }
    },

    /*
    ******************************************************
      EVENTS
    ******************************************************
    */
    events: {
      "finished": "qx.event.type.Event",
      "designError": "qx.event.type.Data"
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_79_0: null,
      __P_79_1: null,
      __P_79_4: null,
      __P_79_3: null,
      addStyles: function addStyles(styleArr) {
        var queue = typeof styleArr === 'string' ? [styleArr] : styleArr.concat();
        var suffix = cv.Config.forceReload === true ? '?' + Date.now() : '';
        queue.forEach(function (style) {
          qx.bom.Stylesheet.includeFile(qx.util.ResourceManager.getInstance().toUri(style) + suffix);
        }, this);
      },
      markAsLoaded: function markAsLoaded(path) {
        if (!this.__P_79_3.includes(path)) {
          this.debug('marking ' + path + ' as loaded');

          this.__P_79_3.push(path);
        }
      },
      isMarkedAsLoaded: function isMarkedAsLoaded(path) {
        return this.__P_79_3.includes(path);
      },
      addScripts: function addScripts(scriptArr, order) {
        var queue = typeof scriptArr === 'string' ? [scriptArr] : scriptArr; // make sure that no cached scripts are loaded

        var suffix = cv.Config.forceReload === true ? '?' + Date.now() : '';
        var realQueue = [];

        for (var i = 0, l = queue.length; i < l; i++) {
          if (!this.__P_79_3.includes(queue[i])) {
            realQueue.push(qx.util.ResourceManager.getInstance().toUri(queue[i]) + suffix);
          }
        }

        if (realQueue.length === 0) {
          return;
        }

        this.debug("queueing " + realQueue.length + " scripts");

        this.__P_79_0.append(realQueue);

        if (order) {
          var processQueue = function () {
            if (order.length > 0) {
              var loadIndex = order.shift();
              var script = realQueue.splice(loadIndex, 1)[0];

              var loader = this.__P_79_5(script);

              loader.addListener("ready", processQueue, this);
            } else {
              realQueue.forEach(this.__P_79_5, this);
            }
          }.bind(this);

          processQueue();
        } else {
          // use an extra DynamicScriptLoader for every single script because loading errors stop the process
          // and the loader would not try to load the other scripts
          // queue.forEach(this.__loadSingleScript, this);
          this.__P_79_5(realQueue);
        }
      },

      /**
       * Load one script
       *
       * @param script {String} path to script
       */
      __P_79_5: function __P_79_5(script) {
        var loader = new qx.util.DynamicScriptLoader(script);

        this.__P_79_1.push(loader);

        loader.addListener("loaded", this._onLoaded, this);
        loader.addListener("failed", this._onFailed, this);
        loader.addListenerOnce("ready", function () {
          this.__P_79_1.remove(loader);

          loader.removeListener("loaded", this._onLoaded, this);
          loader.removeListener("failed", this._onFailed, this);
        }, this);
        loader.start();
        return loader;
      },
      _onLoaded: function _onLoaded(ev) {
        var data = ev.getData();

        this.__P_79_0.remove(data.script);

        this.debug(data.script + " loaded");

        this._checkQueue();
      },
      _onFailed: function _onFailed(ev) {
        var data = ev.getData();

        this.__P_79_0.remove(data.script);

        if (data.script.startsWith("design")) {
          var failedDesign = data.script.split("/")[1];
          this.fireDataEvent("designError", failedDesign);
        } else if (data.script.includes("/plugins/")) {
          var match = /.+\/plugins\/([\w]+)\/index\.js.*/.exec(data.script);

          if (match) {
            cv.core.notifications.Router.dispatchMessage('cv.loading.error', {
              title: qx.locale.Manager.tr('Error loading plugin "%1"', match[1]),
              message: qx.locale.Manager.tr('File %1 could not be loaded.', data.script),
              severity: "high",
              deletable: true
            });
          }
        } else {
          cv.core.notifications.Router.dispatchMessage('cv.loading.error', {
            title: qx.locale.Manager.tr('File loading error'),
            message: qx.locale.Manager.tr('File %1 could not be loaded.', data.script),
            severity: "high",
            deletable: true
          });
        }

        this._checkQueue();
      },
      // property apply
      _checkQueue: function _checkQueue() {
        if (this.__P_79_0.length === 0) {
          if (this.isAllQueued()) {
            this.debug("script loader finished");
            this.fireEvent("finished");
          } else if (!this.__P_79_4) {
            this.debug("script loader waiting for all scripts beeing queued");
            this.__P_79_4 = this.addListener("changeAllQueued", function (ev) {
              if (ev.getData() === true) {
                if (this.__P_79_0.length === 0) {
                  this.debug("script loader finished");
                  this.fireEvent("finished");
                }

                this.removeListenerById(this.__P_79_4);
                this.__P_79_4 = null;
              }
            }, this);
          }
        } else {
          this.debug(this.__P_79_0.length + " scripts remaining");
        }
      }
    }
  });
  cv.util.ScriptLoader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ScriptLoader.js.map?dt=1619884693940