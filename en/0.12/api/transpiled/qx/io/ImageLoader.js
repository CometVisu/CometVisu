(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.Type": {},
      "qx.lang.Function": {},
      "qx.event.GlobalError": {},
      "qx.bom.client.Engine": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
  
  ************************************************************************ */

  /**
   * The ImageLoader can preload and manage loaded image resources. It easily
   * handles multiple requests and supports callbacks for successful and failed
   * requests.
   *
   * After loading of an image the dimension of the image is stored as long
   * as the application is running. This is quite useful for in-memory layouting.
   *
   * Use {@link #load} to preload your own images.
   */
  qx.Bootstrap.define("qx.io.ImageLoader", {
    statics: {
      /** @type {Map} Internal data structure to cache image sizes */
      __P_205_0: {},

      /** @type {Map} Default image size */
      __P_205_1: {
        width: null,
        height: null
      },

      /** @type {RegExp} Known image types */
      __P_205_2: /\.(png|gif|jpg|jpeg|bmp)\b/i,

      /** @type {RegExp} Image types of a data URL */
      __P_205_3: /^data:image\/(png|gif|jpg|jpeg|bmp)\b/i,

      /**
       * Whether the given image has previously been loaded using the
       * {@link #load} method.
       *
       * @param source {String} Image source to query
       * @return {Boolean} <code>true</code> when the image is loaded
       */
      isLoaded: function isLoaded(source) {
        var entry = this.__P_205_0[source];
        return !!(entry && entry.loaded);
      },

      /**
       * Whether the given image has previously been requested using the
       * {@link #load} method but failed.
       *
       * @param source {String} Image source to query
       * @return {Boolean} <code>true</code> when the image loading failed
       */
      isFailed: function isFailed(source) {
        var entry = this.__P_205_0[source];
        return !!(entry && entry.failed);
      },

      /**
       * Whether the given image is currently loading.
       *
       * @param source {String} Image source to query
       * @return {Boolean} <code>true</code> when the image is loading in the moment.
       */
      isLoading: function isLoading(source) {
        var entry = this.__P_205_0[source];
        return !!(entry && entry.loading);
      },

      /**
       * Returns the format of a previously loaded image
       *
       * @param source {String} Image source to query
       * @return {String ? null} The format of the image or <code>null</code>
       */
      getFormat: function getFormat(source) {
        var entry = this.__P_205_0[source];

        if (!entry || !entry.format) {
          var result = this.__P_205_3.exec(source);

          if (result != null) {
            // If width and height aren't defined, provide some defaults
            var width = entry && qx.lang.Type.isNumber(entry.width) ? entry.width : this.__P_205_1.width;
            var height = entry && qx.lang.Type.isNumber(entry.height) ? entry.height : this.__P_205_1.height;
            entry = {
              loaded: true,
              format: result[1],
              width: width,
              height: height
            };
          }
        }

        return entry ? entry.format : null;
      },

      /**
       * Returns the size of a previously loaded image
       *
       * @param source {String} Image source to query
       * @return {Map} The dimension of the image (<code>width</code> and
       *    <code>height</code> as key). If the image is not yet loaded, the
       *    dimensions are given as <code>null</code> for width and height.
       */
      getSize: function getSize(source) {
        var entry = this.__P_205_0[source];
        return entry ? {
          width: entry.width,
          height: entry.height
        } : this.__P_205_1;
      },

      /**
       * Returns the image width
       *
       * @param source {String} Image source to query
       * @return {Integer} The width or <code>null</code> when the image is not loaded
       */
      getWidth: function getWidth(source) {
        var entry = this.__P_205_0[source];
        return entry ? entry.width : null;
      },

      /**
       * Returns the image height
       *
       * @param source {String} Image source to query
       * @return {Integer} The height or <code>null</code> when the image is not loaded
       */
      getHeight: function getHeight(source) {
        var entry = this.__P_205_0[source];
        return entry ? entry.height : null;
      },

      /**
       * Loads the given image. Supports a callback which is
       * executed when the image is loaded.
       *
       * This method works asynchronous.
       *
       * @param source {String} Image source to load
       * @param callback {Function?} Callback function to execute
       *   The first parameter of the callback is the given source url, the
       *   second parameter is the data entry which contains additional
       *   information about the image.
       * @param context {Object?} Context in which the given callback should be executed
       */
      load: function load(source, callback, context) {
        // Shorthand
        var entry = this.__P_205_0[source];

        if (!entry) {
          entry = this.__P_205_0[source] = {};
        } // Normalize context


        if (callback && !context) {
          context = window;
        } // Already known image source


        if (entry.loaded || entry.loading || entry.failed) {
          if (callback) {
            if (entry.loading) {
              entry.callbacks.push(callback, context);
            } else {
              callback.call(context, source, entry);
            }
          }
        } else {
          // Updating entry
          entry.loading = true;
          entry.callbacks = [];

          if (callback) {
            entry.callbacks.push(callback, context);
          } // Create image element


          var el = document.createElement('img'); // Create common callback routine

          var boundCallback = qx.lang.Function.listener(this.__P_205_4, this, el, source); // Assign callback to element

          el.onload = boundCallback;
          el.onerror = boundCallback; // Start loading of image

          el.src = source; // save the element for aborting

          entry.element = el;
        }
      },

      /**
       * Abort the loading for the given url.
       *
       * @param source {String} URL of the image to abort its loading.
       */
      abort: function abort(source) {
        var entry = this.__P_205_0[source];

        if (entry && !entry.loaded) {
          entry.aborted = true;
          var callbacks = entry.callbacks;
          var element = entry.element; // Cleanup listeners

          element.onload = element.onerror = null; // prevent further loading

          element.src = ""; // Cleanup entry

          delete entry.callbacks;
          delete entry.element;
          delete entry.loading;

          for (var i = 0, l = callbacks.length; i < l; i += 2) {
            callbacks[i].call(callbacks[i + 1], source, entry);
          }
        }

        this.__P_205_0[source] = null;
      },

      /**
       * Calls a method based on qx.globalErrorHandling
       */
      __P_205_4: function __P_205_4() {
        var callback = qx.event.GlobalError.observeMethod(this.__P_205_5);
        callback.apply(this, arguments);
      },

      /**
       * Internal event listener for all load/error events.
       *
       * @signature function(event, element, source)
       *
       * @param event {Event} Native event object
       * @param element {Element} DOM element which represents the image
       * @param source {String} The image source loaded
       */
      __P_205_5: function __P_205_5(event, element, source) {
        // Shorthand
        var entry = this.__P_205_0[source]; // [BUG #9149]: When loading a SVG IE11 won't have
        // the width/height of the element set, unless
        // it is inserted into the DOM.

        if (qx.bom.client.Engine.getName() == "mshtml" && parseFloat(qx.bom.client.Engine.getVersion()) === 11) {
          document.body.appendChild(element);
        }

        var isImageAvailable = function isImageAvailable(imgElem) {
          return imgElem && imgElem.height !== 0;
        }; // [BUG #7497]: IE11 doesn't properly emit an error event
        // when loading fails so augment success check


        if (event.type === "load" && isImageAvailable(element)) {
          // Store dimensions
          entry.loaded = true;
          entry.width = element.width;
          entry.height = element.height; // try to determine the image format

          var result = this.__P_205_2.exec(source);

          if (result != null) {
            entry.format = result[1];
          }
        } else {
          entry.failed = true;
        }

        if (qx.bom.client.Engine.getName() == "mshtml" && parseFloat(qx.bom.client.Engine.getVersion()) === 11) {
          document.body.removeChild(element);
        } // Cleanup listeners


        element.onload = element.onerror = null; // Cache callbacks

        var callbacks = entry.callbacks; // Cleanup entry

        delete entry.loading;
        delete entry.callbacks;
        delete entry.element; // Execute callbacks

        for (var i = 0, l = callbacks.length; i < l; i += 2) {
          callbacks[i].call(callbacks[i + 1], source, entry);
        }
      },

      /**
       * Dispose stored images.
       */
      dispose: function dispose() {
        this.__P_205_0 = {};
      }
    }
  });
  qx.io.ImageLoader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ImageLoader.js.map?dt=1612693993620