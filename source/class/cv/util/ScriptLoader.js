/* DynamicScriptLoader.js 
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


qx.Class.define('cv.util.ScriptLoader', {
  extend: cv.Object,
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
    "finished": "qx.event.type.Event"
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __scriptQueue: null,
    __loaders: null,

    addStyles: function(styleArr) {
      var queue = (qx.lang.Type.isString(styleArr) ? [ styleArr ] : qx.lang.Array.clone(styleArr));
      queue.forEach(function(style) {
        qx.bom.Stylesheet.includeFile(qx.util.ResourceManager.getInstance().toUri(style));
      }, this);
    },

    addScripts: function(scriptArr) {
      var queue = (qx.lang.Type.isString(scriptArr) ? [ scriptArr ] : qx.lang.Array.clone(scriptArr));
      if (cv.Config.forceReload === true) {
        // make sure that no cached scripts are loaded
        for (var i=0, l = queue.length; i<l; i++) {
          queue[i] = qx.util.ResourceManager.getInstance().toUri(queue[i])+"?"+Date.now();
        }
      }
      this.__scriptQueue.append(queue);
      // use an extra DynamiScriptLoader for every single script because loading errors stop the process
      // and the loader would not try to load the oher scripts
      queue.forEach(this.__loadSingleScript, this);
    },

    /**
     * Load one script
     *
     * @param script
     * @private
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
      this._checkQueue();
    },

    // property apply
    _checkQueue: function() {
      if (this.__scriptQueue.length === 0) {
        if (this.isAllQueued()) {
          this.fireEvent("finished");
        } else {
          this.addListenerOnce("changeAllQueued", function() {
            this.fireEvent("finished");
          }, this);
        }
      } else {
        this.debug(this.__scriptQueue.length+" scripts remaining");
      }
    }
  }
});