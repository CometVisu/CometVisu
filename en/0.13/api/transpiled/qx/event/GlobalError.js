(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "defer": "runtime",
        "require": true
      },
      "qx.core.WindowError": {},
      "qx.core.GlobalError": {}
    },
    "environment": {
      "provided": ["qx.globalErrorHandling"],
      "required": {}
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
       * Fabian Jakobs (fjakobs)
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * The GlobalError class stores a reference to a global error handler function.
   *
   *  This function is called for each uncatched JavaScript exception. To enable
   *  global error handling the setting <code>qx.globalErrorHandling</code> must
   *  be enabled and an error handler must be registered.
   *  Further each JavaScript "entry point" must be wrapped with a call to
   *  {@link qx.event.GlobalError#observeMethod}.
   *
   * @ignore(qx.core, qx.core.Environment)
   */
  qx.Bootstrap.define("qx.event.GlobalError", {
    statics: {
      __P_174_0: null,
      __P_174_1: null,
      __P_174_2: null,

      /**
       * Little helper to check if the global error handling is enabled.
       * @return {Boolean} <code>true</code>, if it is enabled.
       */
      __P_174_3: function __P_174_3() {
        if (qx.core && qx.core.Environment) {
          return true;
        } else {
          return !!qx.Bootstrap.getEnvironmentSetting("qx.globalErrorHandling");
        }
      },

      /**
       * Set the global fallback error handler
       *
       * @param callback {Function?null} The error handler. The first argument is the
       *    exception, which caused the error
       * @param context {Object?window} The "this" context of the callback function
       */
      setErrorHandler: function setErrorHandler(callback, context) {
        this.__P_174_0 = callback || null;
        this.__P_174_2 = context || window;

        if (this.__P_174_3()) {
          // wrap the original onerror
          if (callback && window.onerror) {
            var wrappedHandler = qx.Bootstrap.bind(this.__P_174_4, this);

            if (this.__P_174_1 == null) {
              this.__P_174_1 = window.onerror;
            }

            var self = this;

            window.onerror = function (msg, uri, lineNumber) {
              self.__P_174_1(msg, uri, lineNumber);

              wrappedHandler(msg, uri, lineNumber);
            };
          }

          if (callback && !window.onerror) {
            window.onerror = qx.Bootstrap.bind(this.__P_174_4, this);
          } // reset


          if (this.__P_174_0 == null) {
            if (this.__P_174_1 != null) {
              window.onerror = this.__P_174_1;
              this.__P_174_1 = null;
            } else {
              window.onerror = null;
            }
          }
        }
      },

      /**
       * Catches all errors of the <code>window.onerror</code> handler
       * and passes an {@link qx.core.WindowError} object to the error
       * handling.
       *
       * @param msg {String} browser error message
       * @param uri {String} uri to erroneous script
       * @param lineNumber {Integer} line number of error
       * @param columnNumber {Integer} column number of error
       * @param exception {Error} orginal error
       */
      __P_174_4: function __P_174_4(msg, uri, lineNumber, columnNumber, exception) {
        if (this.__P_174_0) {
          this.handleError(new qx.core.WindowError(msg, uri, lineNumber, columnNumber, exception));
        }
      },

      /**
       * Wraps a method with error handling code. Only methods, which are called
       * directly by the browser (e.g. event handler) should be wrapped.
       *
       * @param method {Function} method to wrap
       * @return {Function} The function wrapped with error handling code
       */
      observeMethod: function observeMethod(method) {
        if (this.__P_174_3()) {
          var self = this;
          return function () {
            if (!self.__P_174_0) {
              return method.apply(this, arguments);
            }

            try {
              return method.apply(this, arguments);
            } catch (ex) {
              self.handleError(new qx.core.GlobalError(ex, arguments));
            }
          };
        } else {
          return method;
        }
      },

      /**
       * Delegates every given exception to the registered error handler
       *
       * @param ex {qx.core.WindowError|Error} Exception to delegate
       */
      handleError: function handleError(ex) {
        if (this.__P_174_0) {
          this.__P_174_0.call(this.__P_174_2, ex);
        }
      }
    },
    defer: function defer(statics) {
      // only use the environment class if already loaded
      if (qx.core && qx.core.Environment) {
        qx.core.Environment.add("qx.globalErrorHandling", true);
      } else {
        qx.Bootstrap.setEnvironmentSetting("qx.globalErrorHandling", true);
      }

      statics.setErrorHandler(null, null);
    }
  });
  qx.event.GlobalError.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=GlobalError.js.map?dt=1650225652424