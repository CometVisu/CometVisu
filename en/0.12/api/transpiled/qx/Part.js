(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.part.Package": {
        "construct": true
      },
      "qx.io.part.ClosurePart": {
        "construct": true
      },
      "qx.io.part.Part": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * The part loader knows about all generated packages and parts.
   *
   * It contains functionality to load parts.
   */
  qx.Bootstrap.define("qx.Part", {
    // !! Careful when editing this file. Do not extend the dependencies !!

    /**
     * @param loader {Object} The data structure from the boot script about all
     *   known parts and packages. Usually <code>qx.$$loader</code>.
     */
    construct: function construct(loader) {
      // assert: boot part has a single package
      var bootPackageKey = loader.parts[loader.boot][0];
      this.__P_69_0 = loader; // initialize the pseudo event listener maps

      this.__P_69_1 = {};
      this.__P_69_2 = {};
      this.__P_69_3 = {}; // create the packages

      this.__P_69_4 = {};

      for (var key in loader.packages) {
        var pkg = new qx.io.part.Package(this.__P_69_5(loader.packages[key].uris), key, key == bootPackageKey);
        this.__P_69_4[key] = pkg;
      }

      ; // create the parts

      this.__P_69_6 = {};
      var parts = loader.parts;
      var closureParts = loader.closureParts || {};

      for (var name in parts) {
        var pkgKeys = parts[name];
        var packages = [];

        for (var i = 0; i < pkgKeys.length; i++) {
          packages.push(this.__P_69_4[pkgKeys[i]]);
        } // check for closure loading


        if (closureParts[name]) {
          var part = new qx.io.part.ClosurePart(name, packages, this);
        } else {
          var part = new qx.io.part.Part(name, packages, this);
        }

        this.__P_69_6[name] = part;
      }
    },
    statics: {
      /**
       * Default timeout in ms for the error handling of the closure loading.
       */
      TIMEOUT: 7500,

      /**
       * Get the default part loader instance
       *
       * @return {qx.Part} the default part loader
       */
      getInstance: function getInstance() {
        if (!this.$$instance) {
          this.$$instance = new this(qx.$$loader);
        }

        return this.$$instance;
      },

      /**
       * Loads one or more parts asynchronously. The callback is called after all
       * parts and their dependencies are fully loaded. If the parts are already
       * loaded the callback is called immediately.
       *
       * @param partNames {String[]} List of parts names to load as defined in the
       *    config file at compile time.
       * @param callback {Function} Function to execute on completion
       * @param self {Object?window} Context to execute the given function in
       */
      require: function require(partNames, callback, self) {
        this.getInstance().require(partNames, callback, self);
      },

      /**
       * Preloads one or more closure parts but does not execute them. This means
       * the closure (the whole code of the part) is already loaded but not
       * executed so you can't use the classes in the the part after a preload.
       * If you want to execute them, just use the regular {@link #require}
       * function.
       *
       * @param partNames {String[]} List of parts names to preload as defined
       *   in the config file at compile time.
       */
      preload: function preload(partNames) {
        this.getInstance().preload(partNames);
      },

      /**
       * Loaded closure packages have to call this method to indicate
       * successful loading and to get their closure stored.
       *
       * @param id {String} The id of the package.
       * @param closure {Function} The wrapped code of the package.
       */
      $$notifyLoad: function $$notifyLoad(id, closure) {
        this.getInstance().saveClosure(id, closure);
      }
    },
    members: {
      __P_69_0: null,
      __P_69_4: null,
      __P_69_6: null,
      __P_69_3: null,

      /**
       * This method is only for testing purposes! Don't use it!
       *
       * @internal
       * @param pkg {qx.io.part.Package} The package to add to the internal
       *   registry of packages.
       */
      addToPackage: function addToPackage(pkg) {
        this.__P_69_4[pkg.getId()] = pkg;
      },

      /**
       * Internal helper method to save the closure and notify that the load.
       *
       * @internal
       * @param id {String} The hash of the package.
       * @param closure {Function} The code of the package wrappen into a closure.
       */
      saveClosure: function saveClosure(id, closure) {
        // search for the package
        var pkg = this.__P_69_4[id]; // error if no package could be found

        if (!pkg) {
          throw new Error("Package not available: " + id);
        } // save the closure in the package itself


        pkg.saveClosure(closure); // call the listeners

        var listeners = this.__P_69_3[id];

        if (!listeners) {
          return;
        }

        for (var i = 0; i < listeners.length; i++) {
          listeners[i]("complete", id);
        } // get rid of all closure package listeners for that package


        this.__P_69_3[id] = [];
      },

      /**
       * Internal method for testing purposes which returns the internal parts
       * store.
       *
       * @internal
       * @return {Array} An array of parts.
       */
      getParts: function getParts() {
        return this.__P_69_6;
      },

      /**
       * Loads one or more parts asynchronously. The callback is called after all
       * parts and their dependencies are fully loaded. If the parts are already
       * loaded the callback is called immediately.
       *
       * @param partNames {String|String[]} List of parts names to load as defined
       *   in the config file at compile time. The method also accepts a single
       *   string as parameter to only load one part.
       * @param callback {Function} Function to execute on completion.
       *   The function has one parameter which is an array of ready states of
       *   the parts specified in the partNames argument.
       * @param self {Object?window} Context to execute the given function in
       */
      require: function require(partNames, callback, self) {
        var callback = callback || function () {};

        var self = self || window;

        if (qx.Bootstrap.isString(partNames)) {
          partNames = [partNames];
        }

        var parts = [];

        for (var i = 0; i < partNames.length; i++) {
          var part = this.__P_69_6[partNames[i]];

          if (part === undefined) {
            var registeredPartNames = qx.Bootstrap.keys(this.getParts());
            throw new Error('Part "' + partNames[i] + '" not found in parts (' + registeredPartNames.join(', ') + ')');
          } else {
            parts.push(part);
          }
        }

        var partsLoaded = 0;

        var onLoad = function onLoad() {
          partsLoaded += 1; // done?

          if (partsLoaded >= parts.length) {
            // gather the ready states of the parts
            var states = [];

            for (var i = 0; i < parts.length; i++) {
              states.push(parts[i].getReadyState());
            }

            callback.call(self, states);
          }
        };

        for (var i = 0; i < parts.length; i++) {
          parts[i].load(onLoad, this);
        }
      },

      /**
       * Preloader for the given part.
       *
       * @param partNames {String} The hash of the part to preload.
       * @param callback {Function} Function to execute on completion.
       *   The function has one parameter which is an array of ready states of
       *   the parts specified in the partNames argument.
       * @param self {Object?window} Context to execute the given function in
       */
      preload: function preload(partNames, callback, self) {
        if (qx.Bootstrap.isString(partNames)) {
          partNames = [partNames];
        }

        var partsPreloaded = 0;

        for (var i = 0; i < partNames.length; i++) {
          this.__P_69_6[partNames[i]].preload(function () {
            partsPreloaded++;

            if (partsPreloaded >= partNames.length) {
              // gather the ready states of the parts
              var states = [];

              for (var i = 0; i < partNames.length; i++) {
                states.push(this.__P_69_6[partNames[i]].getReadyState());
              }

              ;

              if (callback) {
                callback.call(self, states);
              }
            }

            ;
          }, this);
        }
      },

      /**
       * Get the URI lists of all packages
       *
       * @return {String[][]} Array of URI lists for each package
       */
      __P_69_7: function __P_69_7() {
        var packages = this.__P_69_0.packages;
        var uris = [];

        for (var key in packages) {
          uris.push(this.__P_69_5(packages[key].uris));
        }

        return uris;
      },

      /**
       * Decodes a list of source URIs. The function is defined in the loader
       * script.
       *
       * @signature function(compressedUris)
       * @param compressedUris {String[]} Array of compressed URIs
       * @return {String[]} decompressed URIs
       */
      __P_69_5: qx.$$loader.decodeUris,

      /*
      ---------------------------------------------------------------------------
        PART
      ---------------------------------------------------------------------------
      */
      __P_69_1: null,

      /**
       * Register callback, which is called after the given part has been loaded
       * or fails with an error. After the call the listener is removed.
       *
       * @internal
       *
       * @param part {Object} Part to load
       * @param callback {Object} the listener
       */
      addPartListener: function addPartListener(part, callback) {
        var key = part.getName();

        if (!this.__P_69_1[key]) {
          this.__P_69_1[key] = [];
        }

        this.__P_69_1[key].push(callback);
      },

      /**
       * If defined this method is called after each part load.
       */
      onpart: null,

      /**
       * This method is called after a part has been loaded or failed to load.
       * It calls all listeners for this part.
       *
       * @internal
       * @param part {Object} The loaded part
       */
      notifyPartResult: function notifyPartResult(part) {
        var key = part.getName();
        var listeners = this.__P_69_1[key];

        if (listeners) {
          for (var i = 0; i < listeners.length; i++) {
            listeners[i](part.getReadyState());
          }

          this.__P_69_1[key] = [];
        }

        if (typeof this.onpart === "function") {
          this.onpart(part);
        }
      },

      /*
      ---------------------------------------------------------------------------
        PACKAGE
      ---------------------------------------------------------------------------
      */
      __P_69_2: null,

      /**
       * Register callback, which is called after the given package has been loaded
       * or fails with an error. After the call the listener is removed.
       *
       * @internal
       *
       * @param pkg {Object} Package to load
       * @param callback {Object} the listener
       */
      addPackageListener: function addPackageListener(pkg, callback) {
        var key = pkg.getId();

        if (!this.__P_69_2[key]) {
          this.__P_69_2[key] = [];
        }

        this.__P_69_2[key].push(callback);
      },

      /**
       * This method is called after a packages has been loaded or failed to load.
       * It calls all listeners for this package.
       *
       * @internal
       * @param pkg {Object} The loaded package
       */
      notifyPackageResult: function notifyPackageResult(pkg) {
        var key = pkg.getId();
        var listeners = this.__P_69_2[key];

        if (!listeners) {
          return;
        }

        for (var i = 0; i < listeners.length; i++) {
          listeners[i](pkg.getReadyState());
        }

        this.__P_69_2[key] = [];
      }
    }
  });
  qx.Part.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Part.js.map?dt=1702895800089