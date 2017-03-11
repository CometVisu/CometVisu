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
  construct: function() {
    this.base(arguments);
    this.__scriptQueue = new qx.data.Array();
    this.__loaders = new qx.data.Array();
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
    __scriptQueue: null,
    __loaders: null,
    __listener : null,

    addStyles: function(styleArr) {
      var queue = (qx.lang.Type.isString(styleArr) ? [ styleArr ] : qx.lang.Array.clone(styleArr));
      queue.forEach(function(style) {
        qx.bom.Stylesheet.includeFile(qx.util.ResourceManager.getInstance().toUri(style));
      }, this);
    },

    addScripts: function(scriptArr, order) {
      var queue = (qx.lang.Type.isString(scriptArr) ? [ scriptArr ] : scriptArr);
      // make sure that no cached scripts are loaded
      var suffix = (cv.Config.forceReload === true) ? '?'+Date.now() : '';
      var realQueue = [];
      for (var i=0, l = queue.length; i<l; i++) {
        if (qx.core.Environment.get("qx.debug") === true) {
          // in source load all scripts
          realQueue.push(qx.util.ResourceManager.getInstance().toUri(queue[i]) + suffix);
        } else {
          // in build do not load plugin scripts as they are included in the plugin script
          if (queue[i].indexOf("plugins/") === -1) {
            realQueue.push(qx.util.ResourceManager.getInstance().toUri(queue[i]) + suffix);
          }
        }
      }
      if (realQueue.length === 0) {
        return;
      }
      this.debug("queueing "+realQueue.length+" scripts");
      this.__scriptQueue.append(realQueue);
      if (order) {
        var processQueue = function () {
          if (order.length > 0) {
            var loadIndex = order.shift();
            var script = qx.lang.Array.removeAt(realQueue, loadIndex);
            var loader = this.__loadSingleScript(script);
            loader.addListener("ready", processQueue, this);
          } else {
            realQueue.forEach(this.__loadSingleScript, this);
          }
        }.bind(this);
        processQueue();
      } else {
        // use an extra DynamicScriptLoader for every single script because loading errors stop the process
        // and the loader would not try to load the other scripts
        // queue.forEach(this.__loadSingleScript, this);
        this.__loadSingleScript(realQueue);
      }
    },

    /**
     * Load one script
     *
     * @param script {String} path to script
     */
    __loadSingleScript: function(script) {
      var loader = new qx.util.DynamicScriptLoader(script);
      this.__loaders.push(loader);
      loader.addListener("loaded", this._onLoaded, this);
      loader.addListener("failed", this._onFailed, this);
      loader.addListenerOnce("ready", function() {
        this.__loaders.remove(loader);
        loader.removeListener("loaded", this._onLoaded, this);
        loader.removeListener("failed", this._onFailed, this);
      }, this);
      loader.start();
      return loader;
    },

    _onLoaded: function(ev) {
      var data = ev.getData();
      this.__scriptQueue.remove(data.script);
      this.debug(data.script+" loaded");
      this._checkQueue();
    },

    _onFailed: function(ev) {
      var data = ev.getData();
      this.__scriptQueue.remove(data.script);
      this.error(data.script+" failed");
      if (data.script.startsWith("design")) {
        var failedDesign = data.script.split("/")[1];
        this.fireDataEvent("designError", failedDesign);
      }
      this._checkQueue();
    },

    // property apply
    _checkQueue: function() {
      if (this.__scriptQueue.length === 0) {
        if (this.isAllQueued()) {
          this.debug("script loader finished");
          this.fireEvent("finished");
        } else if (!this.__listener) {
          this.debug("script loader waiting for all scripts beeing queued");

          this.__listener = this.addListenerOnce("changeAllQueued", function() {
            this.debug("script loader finished");
            this.fireEvent("finished");
            this.__listener = null;
          }, this);
        }
      } else {
        this.debug(this.__scriptQueue.length+" scripts remaining");
      }
    }
  }
});