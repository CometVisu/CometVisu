(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.lang.Type": {
        "construct": true
      },
      "qx.lang.Array": {
        "construct": true
      },
      "qx.Promise": {},
      "qx.util.ResourceManager": {},
      "qx.bom.request.Script": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.promise": {
          "load": true
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2016 Visionet GmbH, http://www.visionet.de
       2016 OETIKER+PARTNER AG, https://www.oetiker.ch
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Dietrich Streifert (level420)
       * Tobias Oetiker (oetiker)
  
  ************************************************************************ */

  /**
   * Dynamically load non qx scripts. This class is aware of all scripts that have
   * been loaded using its instances, so if two instances load jquery, it will only
   * be loaded once, and the second instance will wait for the jquery to be loaded
   * before continuing to load additional scripts.
   *
   * Usage example:
   *
   * <pre>
   *  ... assets ...
   * /**
   *  * @asset(myapp/jquery/*)
   *  * @asset(myapp/highcharts/*)
   *  *
   *  * @ignore(jQuery.*)
   *  * @ignore(Highcharts.*)
   *  ...
   *
   *
   *    // in debug mode load the uncompressed unobfuscated scripts
   *    var src = '';
   *    var min = '.min';
   *    if (qx.core.Environment.get("qx.debug")) {
   *      src = '.src';
   *      min = '';
   *    }
   *
   *    // initialize the script loading
   *    var dynLoader = new qx.util.DynamicScriptLoader([
   *        "myapp/jquery/jquery"+min+".js",
   *        "myapp/highcharts/highcharts"+src+".js",
   *        "myapp/highcharts/highcharts-more"+src+".js",
   *        "myapp/highcharts/highcharts-modifications.js"
   *    ]);
   *
   *
   *    dynLoader.addListenerOnce('ready',function(e){
   *      console.log("all scripts have been loaded!");
   *    });
   *
   *    dynLoader.addListener('failed',function(e){
   *      var data = e.getData();
   *      console.log("failed to load "+data.script);
   *    });
   *
   *    dynLoader.start();
   *
   * </pre>
   */
  qx.Class.define("qx.util.DynamicScriptLoader", {
    extend: qx.core.Object,
    /**
     * Create a loader for the given scripts.
     *
     * @param scriptArr {Array|String} the uri name(s) of the script(s) to load
     */
    construct: function construct(scriptArr) {
      qx.core.Object.constructor.call(this);
      this.__P_512_0 = false;
      this.__P_512_1 = qx.lang.Type.isString(scriptArr) ? [scriptArr] : qx.lang.Array.clone(scriptArr);
    },
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /**
       * fired when a script is loaded successfully. The data contains 'script' and 'status' keys.
       */
      loaded: "qx.event.type.Data",
      /**
       * fired when a specific script fails loading.  The data contains 'script' and 'status' keys.
       */
      failed: "qx.event.type.Data",
      /**
       * fired when all given scripts are loaded, each time loadScriptsDynamic is called.
       */
      ready: "qx.event.type.Event"
    },
    statics: {
      /**
       * Map of scripts being added at the present time. Key is script name; value is instance of this class which
       * is loading it.
       */
      __P_512_2: {},
      /**
       * Map of scripts that have fully loaded. Key is script name; value is true
       */
      __P_512_3: {}
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /**
       * Array of the scripts to be loaded
       */
      __P_512_1: null,
      /**
       * True if start has been called.
       */
      __P_512_0: null,
      /**
       * Start loading scripts. This may only be called once!
       * @return {Promise?} a promise which will be resolved after load of all scripts if promise support is enabled; nothing (undefined) if promises are not enabled.
       */
      start: qx.core.Environment.select("qx.promise", {
        "true": function _true() {
          return new qx.Promise(function (resolve, reject) {
            this.addListenerOnce("ready", resolve, this);
            this.addListenerOnce("failed", function (e) {
              reject(new Error(e.getData()));
            });
            if (this.isDisposed()) {
              reject(new Error("disposed"));
            }
            if (this.__P_512_0) {
              reject(new Error("you can only call start once per instance"));
            }
            this.__P_512_0 = true;
            this.__P_512_4();
          }, this);
        },
        "false": function _false() {
          if (this.isDisposed()) {
            return;
          }
          if (this.__P_512_0) {
            throw new Error("you can only call start once per instance");
          }
          this.__P_512_0 = true;
          this.__P_512_4();
        }
      }),
      /**
       * Chain loading scripts.
       *
       * Recursively called until the array of scripts is consumed
       *
       */
      __P_512_4: function __P_512_4() {
        var _this = this;
        var DynamicScriptLoader = qx.util.DynamicScriptLoader;
        var script;
        var dynLoader;
        var id1, id2;
        var uri;
        var loader;
        script = this.__P_512_1.shift();
        if (!script) {
          this.fireEvent("ready");
          return;
        }
        if (DynamicScriptLoader.__P_512_3[script]) {
          this.fireDataEvent("loaded", {
            script: script,
            status: "preloaded"
          });
          this.__P_512_4();
          return;
        }
        dynLoader = DynamicScriptLoader.__P_512_2[script];
        if (dynLoader) {
          id1 = dynLoader.addListener("loaded", function (e) {
            if (_this.isDisposed()) {
              return;
            }
            var data = e.getData();
            if (data.script === script) {
              dynLoader.removeListenerById(id2);
              dynLoader.removeListenerById(id1);
              _this.fireDataEvent("loaded", data);
              _this.__P_512_4();
            }
          });
          id2 = dynLoader.addListener("failed", function (e) {
            if (_this.isDisposed()) {
              return;
            }
            var data = e.getData();
            dynLoader.removeListenerById(id1);
            dynLoader.removeListenerById(id2);
            _this.fireDataEvent("failed", {
              script: script,
              status: "loading of " + data.script + " failed while waiting for " + script
            });
          });
          return;
        }
        uri = qx.util.ResourceManager.getInstance().toUri(script);
        loader = new qx.bom.request.Script();
        loader.on("load", function (request) {
          if (this.isDisposed()) {
            return;
          }
          DynamicScriptLoader.__P_512_3[script] = true;
          delete DynamicScriptLoader.__P_512_2[script];
          this.fireDataEvent("loaded", {
            script: script,
            status: request.status
          });
          this.__P_512_4();
        }, this);
        var onError = function onError(request) {
          if (this.isDisposed()) {
            return;
          }
          delete DynamicScriptLoader.__P_512_2[script];
          this.fireDataEvent("failed", {
            script: script,
            status: request.status
          });
        };
        loader.on("error", onError, this);
        loader.on("timeout", onError, this);

        // this.debug("Loading " + script + " started");
        loader.open("GET", uri);
        DynamicScriptLoader.__P_512_2[script] = this;
        loader.send();
      }
    },
    destruct: function destruct() {
      var DynamicScriptLoader = qx.util.DynamicScriptLoader;
      for (var key in DynamicScriptLoader.__P_512_2) {
        if (DynamicScriptLoader.__P_512_2[key] === this) {
          delete DynamicScriptLoader.__P_512_2[key];
        }
      }
      this.__P_512_1 = undefined;
    }
  });
  qx.util.DynamicScriptLoader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DynamicScriptLoader.js.map?dt=1700345613578