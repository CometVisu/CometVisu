(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.Emitter": {
        "require": true
      },
      "qx.bom.Event": {
        "construct": true
      },
      "qx.bom.Style": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2014 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Cajus Pollmeier (cajus)
  
  ************************************************************************ */

  /**
   *
   * This class offers a constant API over the Fullscreen Spec:
   * http://www.w3.org/TR/fullscreen/
   *
   * It forwards all the browsers support if supported.
   *
   * *Example*
   *
   * <pre class="javascript">
   * var fs = qx.bom.FullScreen.getInstance();
   *
   * var button = new qx.ui.form.Button("Toggle fullscreen");
   * button.addListener("execute", function() {
   *   if (fs.isFullScreen()) {
   *     fs.cancel();
   *   } else {
   *     fs.request();
   *   }
   * });
   *
   * // Enable button if toggling is supported
   * button.setEnabled(qx.core.Environment.get("html.fullscreen"));
   *
   * </pre>
   *
   * *Note*
   *
   * A fullscreen request will only be handled from within an interactive
   * event handler. So there is most likely a mouse or key event involved
   * to trigger it properly.
   */
  qx.Bootstrap.define("qx.bom.FullScreen", {
    extend: qx.event.Emitter,
    statics: {
      /**
       * Get an instance of the FullScreen object using the default document.
       * @return {qx.bom.FullScreen} An instance of this class.
       */
      getInstance: function getInstance() {
        if (!this.$$instance) {
          this.$$instance = new qx.bom.FullScreen();
        }

        return this.$$instance;
      }
    },

    /**
     * @param element {Element?} Optional element to show fullscreen.
     */
    construct: function construct(element) {
      this.__P_99_0 = element || window.document;

      this.__P_99_1();

      var self = this; // forward the event

      qx.bom.Event.addNativeListener(this.__P_99_0, this.__P_99_2, function (e) {
        self.emit("change", e);
      });
    },
    events: {
      /**
       * The change event for the fullscreen mode.
       */
      "change": "Event"
    },
    members: {
      __P_99_0: null,
      __P_99_3: "fullscreenElement",
      __P_99_4: "requestFullscreen",
      __P_99_5: "cancelFullscreen",
      __P_99_2: "fullscreenchange",

      /**
       * Internal helper to feature check the attribute names and the event name.
       * As the event can not be detected using the on<name> attribute, we need
       * to guess the event name by checking for the hidden attribute.
       */
      __P_99_1: function __P_99_1() {
        var prefix = qx.bom.Style.VENDOR_PREFIXES; // check for the hidden attribute name

        for (var i = 0; i < prefix.length; i++) {
          var pfix = prefix[i].toLowerCase();

          if (this.__P_99_0[pfix + "FullScreenElement"] !== undefined || this.__P_99_0[pfix + "FullscreenElement"] !== undefined) {
            this.__P_99_2 = pfix + "fullscreenchange";

            if (pfix == "moz") {
              this.__P_99_3 = pfix + "FullScreenElement";
              this.__P_99_4 = pfix + "RequestFullScreen";
            } else {
              this.__P_99_3 = pfix + "FullscreenElement";
              this.__P_99_4 = pfix + "RequestFullscreen";
            }

            break;
          }
        } // Doh. This needs some upstream consistency though...


        if (this.__P_99_0[pfix + "CancelFullScreen"]) {
          this.__P_99_5 = pfix + "CancelFullScreen";
        } else if (this.__P_99_0[pfix + "CancelFullscreen"]) {
          this.__P_99_5 = pfix + "CancelFullscreen";
        } else if (this.__P_99_0[pfix + "ExitFullScreen"]) {
          this.__P_99_5 = pfix + "ExitFullScreen";
        } else if (this.__P_99_0[pfix + "ExitFullscreen"]) {
          this.__P_99_5 = pfix + "ExitFullscreen";
        } else if (this.__P_99_0["exitFullscreen"]) {
          this.__P_99_5 = "exitFullscreen";
        }
      },

      /**
       * Returns whether the page is shown in fullscreen mode or not. If we
       * can not detect it, <code>false</code> will always be returned.
       *
       * @return {Boolean} <code>true</code>, if the page is shown fullscreen
       */
      isFullScreen: function isFullScreen() {
        return this.__P_99_0[this.__P_99_3] !== undefined ? !!this.__P_99_0[this.__P_99_3] : false;
      },

      /**
       * Request the page to be shown in fullscreen mode. Note that this
       * is only possible when called from within an interactive event
       * handler.
       *
       * It's also worth a note that the user may deny fullscreen mode,
       * so there is no guarantee that it really worked.
       */
      request: function request() {
        if (this.__P_99_0.documentElement[this.__P_99_4]) {
          this.__P_99_0.documentElement[this.__P_99_4]();
        }
      },

      /**
       * End the fullscreen mode.
       */
      cancel: function cancel() {
        if (this.__P_99_0[this.__P_99_5]) {
          this.__P_99_0[this.__P_99_5]();
        }
      }
    }
  });
  qx.bom.FullScreen.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FullScreen.js.map?dt=1664441197463