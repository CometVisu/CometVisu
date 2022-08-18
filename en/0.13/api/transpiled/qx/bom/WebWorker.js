(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
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
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.bom.client.Html": {
        "construct": true,
        "require": true
      },
      "qx.lang.Function": {},
      "qx.bom.Event": {},
      "qx.bom.request.Xhr": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "html.webworker": {
          "construct": true,
          "className": "qx.bom.client.Html"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
       * Adrian Olaru (adrianolaru)
  
  ************************************************************************ */

  /**
   *
   * Web Workers allows us to run JavaScript in parallel on a web page,
   * without blocking the user interface. A 'worker' is just another script
   * file that will be loaded and executed in the background.
   *
   * NOTE: Instances of this class must be disposed of after use
   *
   * For more information see:
   * http://www.w3.org/TR/workers/
   */
  qx.Class.define("qx.bom.WebWorker", {
    extend: qx.core.Object,
    implement: [qx.core.IDisposable],

    /**
     * Create a new instance.
     *
     * @param src {String} The path to worker as an URL
     */
    construct: function construct(src) {
      qx.core.Object.constructor.call(this);
      this.__P_95_0 = qx.core.Environment.get("html.webworker");
      this.__P_95_0 ? this.__P_95_1(src) : this.__P_95_2(src);
    },
    events: {
      /** Fired when worker sends a message */
      "message": "qx.event.type.Data",

      /** Fired when an error occurs */
      "error": "qx.event.type.Data"
    },
    members: {
      _worker: null,
      _handleErrorBound: null,
      _handleMessageBound: null,
      __P_95_0: true,
      __P_95_3: null,

      /**
       * Initialize the native worker
       * @param src {String} The path to worker as an URL
       */
      __P_95_1: function __P_95_1(src) {
        this._worker = new window.Worker(src);
        this._handleMessageBound = qx.lang.Function.bind(this._handleMessage, this);
        this._handleErrorBound = qx.lang.Function.bind(this._handleError, this);
        qx.bom.Event.addNativeListener(this._worker, "message", this._handleMessageBound);
        qx.bom.Event.addNativeListener(this._worker, "error", this._handleErrorBound);
      },

      /**
       * Initialize the fake worker
       * @param src {String} The path to worker as an URL
       * @lint ignoreDeprecated(eval)
       */
      __P_95_2: function __P_95_2(src) {
        var that = this;
        var req = new qx.bom.request.Xhr();

        req.onload = function () {
          that.__P_95_3 = function () {
            var postMessage = function postMessage(e) {
              that.fireDataEvent('message', e);
            }; //set up context vars before evaluating the code


            eval("var onmessage = null, postMessage = " + postMessage + ";" + req.responseText); //pick the right onmessage because of the uglyfier

            return {
              onmessage: eval("onmessage"),
              postMessage: postMessage
            };
          }();
        };

        req.open("GET", src, false);
        req.send();
      },

      /**
       * Send a message to the worker.
       * @param msg {String} the message
       */
      postMessage: function postMessage(msg) {
        var that = this;

        if (this.__P_95_0) {
          this._worker.postMessage(msg);
        } else {
          setTimeout(function () {
            try {
              that.__P_95_3.onmessage && that.__P_95_3.onmessage({
                data: msg
              });
            } catch (ex) {
              that.fireDataEvent("error", ex);
            }
          }, 0);
        }
      },

      /**
       * Message handler
       * @param e {Event} message event
       */
      _handleMessage: function _handleMessage(e) {
        this.fireDataEvent("message", e.data);
      },

      /**
       * Error handler
       * @param e {Event} error event
       */
      _handleError: function _handleError(e) {
        this.fireDataEvent("error", e.message);
      }
    },
    destruct: function destruct() {
      if (this.__P_95_0) {
        qx.bom.Event.removeNativeListener(this._worker, "message", this._handleMessageBound);
        qx.bom.Event.removeNativeListener(this._worker, "error", this._handleErrorBound);

        if (this._worker) {
          this._worker.terminate();

          this._worker = null;
        }
      } else {
        if (this.__P_95_3) {
          this.__P_95_3 = null;
        }
      }
    }
  });
  qx.bom.WebWorker.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=WebWorker.js.map?dt=1660800151791