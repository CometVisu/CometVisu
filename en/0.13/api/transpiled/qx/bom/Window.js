(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.Timer": {},
      "qx.lang.Function": {},
      "qx.bom.Event": {},
      "qx.log.Logger": {},
      "qx.lang.Type": {},
      "qx.bom.Blocker": {}
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
       * Alexander Steitz (aback)
  
  ************************************************************************ */

  /**
   * Includes library functions to work with browser windows
   */
  qx.Class.define("qx.bom.Window", {
    statics: {
      /** Internal blocker instance for all browsers which need an additional
       * blocker for modal windows because they do not support it natively.
       */
      __P_96_0: null,

      /** Window handle which is currently blocked. */
      __P_96_1: null,

      /** Timer instance to poll for unblocking if the modal window was closed */
      __P_96_2: null,

      /** Supported options and their mapping to window options */
      __P_96_3: {
        "top": "dialogTop",
        left: "dialogLeft",
        width: "dialogWidth",
        height: "dialogHeight",
        scrollbars: "scroll",
        resizable: "resizable"
      },

      /** Supported options for modeless windows */
      __P_96_4: {
        "top": 1,
        left: 1,
        width: 1,
        height: 1,
        dependent: 1,
        resizable: 1,
        status: 1,
        location: 1,
        menubar: 1,
        scrollbars: 1,
        toolbar: 1
      },

      /**
       * Whether the browser can open native modal window.
       *
       * @return {Boolean} Capability of open modal windows
       */
      __P_96_5: function __P_96_5() {
        return window.showModalDialog != null;
      },

      /**
       * Opens a native window with the given options.
       *
       * Modal windows can have the following options:
       *
       *   * top
       *
       *   * left
       *
       *   * width
       *
       *   * height
       *
       *   * scrollbars
       *
       *   * resizable
       *
       * Modeless windows have the following options:
       *
       *   * top
       *
       *   * left
       *
       *   * width
       *
       *   * height
       *
       *   * dependent
       *
       *   * resizable
       *
       *   * status
       *
       *   * location
       *
       *   * menubar
       *
       *   * scrollbars
       *
       *   * toolbar
       *
       * Except of dimension and location options all other options are boolean
       * values.
       *
       * *Important infos for native modal windows*
       *
       * If you want to reference the opened window from within the native modal
       * window you need to use
       *
       * <pre class='javascript'>
       * var opener = window.dialogArguments[0];
       * </pre>
       *
       * since a reference to the opener is passed automatically to the modal window.
       *
       * *Passing window arguments*
       *
       * This is only working if the page of the modal window is from the same origin.
       * This is at least true for Firefox browsers.
       *
       * @param url {String} URL of the window
       * @param name {String} Name of the window
       * @param options {Map} Window options
       * @param modal {Boolean} Whether the window should be opened modal
       * @param useNativeModalDialog {Boolean} controls if modal windows are opened
       *                                       using the native method or a blocker
       *                                       should be used to fake modality.
       *                                       Default is <b>true</b>
       * @param listener {Function ?} listener function for onload event on the new window
       * @param self {Object ?} Reference to the 'this' variable inside
       *         the event listener. When not given, 'this' variable will be the new window
       * @return {Window} native window object
       */
      open: function open(url, name, options, modal, useNativeModalDialog, listener, self) {
        var newWindow = null;

        if (url == null) {
          url = "javascript:/";
        }

        if (name == null) {
          name = "qxNativeWindow" + new Date().getTime();
        }

        if (useNativeModalDialog == null) {
          useNativeModalDialog = true;
        }

        var configurationString = this.__P_96_6(options, modal && useNativeModalDialog);

        if (modal) {
          if (this.__P_96_5() && useNativeModalDialog) {
            newWindow = window.showModalDialog(url, [window.self], configurationString);
          } else {
            this.getBlocker().block();

            if (this.__P_96_2 == null) {
              this.__P_96_2 = new qx.event.Timer(500);

              this.__P_96_2.addListener("interval", this.__P_96_7, this);
            }

            this.__P_96_1 = window.open(url, name, configurationString);

            this.__P_96_2.restart();

            newWindow = this.__P_96_1;
          }
        } else {
          newWindow = window.open(url, name, configurationString);
        }

        if (newWindow && listener && listener instanceof Function) {
          var context = self || newWindow;
          var onLoadFunction = qx.lang.Function.bind(listener, context);

          var onNativeLoad = function onNativeLoad() {
            onLoadFunction();
            qx.bom.Event.removeNativeListener(newWindow, 'load', onNativeLoad);
          };

          qx.bom.Event.addNativeListener(newWindow, 'load', onNativeLoad);
        }

        return newWindow;
      },

      /**
       * Returns the given config as string for direct use for the "window.open" method
       *
       * @param options {Array} Array with all configuration options
       * @param modality {Boolean} whether the config should be for a modal window
       *
       * @return {String} configuration as string representation
       */
      __P_96_6: function __P_96_6(options, modality) {
        var configurationString;
        var value;
        var configuration = [];

        if (modality && this.__P_96_5()) {
          for (var key in options) {
            if (qx.bom.Window.__P_96_3[key]) {
              var suffix = "";

              if (key != "scrollbars" && key != "resizable") {
                suffix = "px";
              }

              value = qx.bom.Window.__P_96_3[key] + ":" + options[key] + suffix;
              configuration.push(value);
            } else {
              qx.log.Logger.warn("Option '" + key + "' is not supported for modal windows.");
            }
          }

          configurationString = configuration.join(";");
        } else {
          for (var key in options) {
            if (qx.bom.Window.__P_96_4[key]) {
              if (qx.lang.Type.isBoolean(options[key])) {
                value = key + "=" + (options[key] ? "yes" : "no");
              } else {
                value = key + "=" + options[key];
              }

              configuration.push(value);
            } else {
              qx.log.Logger.warn("Option '" + key + "' is not supported for native windows.");
            }
          }

          configurationString = configuration.join(",");
        }

        return configurationString;
      },

      /**
       * Interval method which checks if the native window was closed to also
       * stop the associated timer.
       */
      __P_96_7: function __P_96_7() {
        if (this.isClosed(this.__P_96_1)) {
          this.getBlocker().unblock();

          this.__P_96_2.stop();
        }
      },

      /**
       * If a modal window is opened with the option
       *
       * <pre class='javascript'>
       * useNativeModalWindow = false;
       * </pre>
       *
       * an instance of <b>qx.bom.Blocker</b> is used to fake modality. This method
       * can be used to get a reference to the blocker to style it.
       *
       * @return {qx.bom.Blocker?null} Blocker instance or null if no blocker is used
       */
      getBlocker: function getBlocker() {
        if (this.__P_96_0 == null) {
          this.__P_96_0 = new qx.bom.Blocker();
        }

        return this.__P_96_0;
      },

      /**
       * Closes the given window
       *
       * @param win {Window} Native window object
       * @return {var} The return value (if any) of the window's native
       * <code>close</code> method
       */
      close: function close(win) {
        if (win) {
          return win.close();
        }
      },

      /**
       * Checks if the window is closed
       *
       * @param win {Window} Native window object
       * @return {Boolean} Closed state
       */
      isClosed: function isClosed(win) {
        var closed = true;

        if (win) {
          try {
            closed = win.closed;
          } catch (ex) {}
        }

        return closed;
      },

      /**
       * Moving an opened window is not allowed in the most browsers anymore.
       *
       * @param win {Window} Native window object
       * @param top {Integer} Y-coordinate
       * @param left {Integer} X-coordinate
       */
      moveTo: function moveTo(win, top, left) {
        /*
          http://www.microsoft.com/technet/prodtechnol/winxppro/maintain/sp2brows.mspx
          Changes to Functionality in Microsoft Windows XP Service Pack 2
          Part 5: Enhanced Browsing Security
          URLACTION_FEATURE_WINDOW_RESTRICTIONS
          Allow script-initiated windows without size or position constraints
          Code: 2102
        */
        if (!qx.bom.Window.isClosed(win)) {
          try {
            win.moveTo(left, top);
          } catch (ex) {
            qx.log.Logger.error("Cross-Domain Scripting problem: Could not move window!", ex);
          }
        }
      },

      /**
       * Resizing an opened window is not allowed in the most browsers anymore.
       *
       * @param win {Window} Native window object
       * @param width {Integer} New width
       * @param height {Integer} New height
       */
      resizeTo: function resizeTo(win, width, height) {
        /*
          http://www.microsoft.com/technet/prodtechnol/winxppro/maintain/sp2brows.mspx
          Changes to Functionality in Microsoft Windows XP Service Pack 2
          Part 5: Enhanced Browsing Security
          URLACTION_FEATURE_WINDOW_RESTRICTIONS
          Allow script-initiated windows without size or position constraints
          Code: 2102
        */
        if (!qx.bom.Window.isClosed(win)) {
          try {
            win.resizeTo(width, height);
          } catch (ex) {
            qx.log.Logger.error("Cross-Domain Scripting problem: Could not resize window!", ex);
          }
        }
      }
    }
  });
  qx.bom.Window.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Window.js.map?dt=1648710483896