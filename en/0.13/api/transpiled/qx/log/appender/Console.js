(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.event.handler.Window": {
        "require": true,
        "defer": "runtime"
      },
      "qx.event.handler.Keyboard": {
        "require": true,
        "defer": "runtime"
      },
      "qx.event.handler.Gesture": {
        "require": true,
        "defer": "runtime"
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.Stylesheet": {},
      "qx.log.Logger": {},
      "qx.core.ObjectRegistry": {},
      "qx.event.Registration": {
        "defer": "runtime"
      },
      "qx.log.appender.Formatter": {},
      "qx.event.type.Tap": {},
      "qx.event.type.Pointer": {},
      "qx.dom.Hierarchy": {}
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
   * Feature-rich console appender for the qooxdoo logging system.
   *
   * Creates a small inline element which is placed in the top-right corner
   * of the window. Prints all messages with a nice color highlighting.
   *
   * * Allows user command inputs.
   * * Command history enabled by default (Keyboard up/down arrows).
   * * Lazy creation on first open.
   * * Clearing the console using a button.
   * * Display of offset (time after loading) of each message
   * * Supports keyboard shortcuts F7 or Ctrl+D to toggle the visibility
   *
   * Note this class must be disposed of after use
   *
   * @require(qx.event.handler.Window)
   * @require(qx.event.handler.Keyboard)
   * @require(qx.event.handler.Gesture)
   */
  qx.Class.define("qx.log.appender.Console", {
    statics: {
      /*
      ---------------------------------------------------------------------------
        INITIALIZATION AND SHUTDOWN
      ---------------------------------------------------------------------------
      */

      __P_282_0: null,
      __P_282_1: null,
      __P_282_2: null,
      __P_282_3: null,
      /**
       * Initializes the console, building HTML and pushing last
       * log messages to the output window.
       *
       */
      init: function init() {
        // Build style sheet content
        var style = [".qxconsole{z-index:10000;width:600px;height:300px;top:0px;right:0px;position:absolute;border-left:1px solid black;color:black;border-bottom:1px solid black;color:black;font-family:Consolas,Monaco,monospace;font-size:11px;line-height:1.2;}", ".qxconsole .control{background:#cdcdcd;border-bottom:1px solid black;padding:4px 8px;}", ".qxconsole .control a{text-decoration:none;color:black;}", ".qxconsole .messages{background:white;height:100%;width:100%;overflow:auto;}", ".qxconsole .messages div{padding:0px 4px;}", ".qxconsole .messages .user-command{color:blue}", ".qxconsole .messages .user-result{background:white}", ".qxconsole .messages .user-error{background:#FFE2D5}", ".qxconsole .messages .level-debug{background:white}", ".qxconsole .messages .level-info{background:#DEEDFA}", ".qxconsole .messages .level-warn{background:#FFF7D5}", ".qxconsole .messages .level-error{background:#FFE2D5}", ".qxconsole .messages .level-user{background:#E3EFE9}", ".qxconsole .messages .type-string{color:black;font-weight:normal;}", ".qxconsole .messages .type-number{color:#155791;font-weight:normal;}", ".qxconsole .messages .type-boolean{color:#15BC91;font-weight:normal;}", ".qxconsole .messages .type-array{color:#CC3E8A;font-weight:bold;}", ".qxconsole .messages .type-map{color:#CC3E8A;font-weight:bold;}", ".qxconsole .messages .type-key{color:#565656;font-style:italic}", ".qxconsole .messages .type-class{color:#5F3E8A;font-weight:bold}", ".qxconsole .messages .type-instance{color:#565656;font-weight:bold}", ".qxconsole .messages .type-stringify{color:#565656;font-weight:bold}", ".qxconsole .command{background:white;padding:2px 4px;border-top:1px solid black;}", ".qxconsole .command input{width:100%;border:0 none;font-family:Consolas,Monaco,monospace;font-size:11px;line-height:1.2;}", ".qxconsole .command input:focus{outline:none;}"];

        // Include stylesheet
        qx.bom.Stylesheet.createElement(style.join(""));

        // Build markup
        var markup = ['<div class="qxconsole">', '<div class="control"><a href="javascript:qx.log.appender.Console.clear()">Clear</a> | <a href="javascript:qx.log.appender.Console.toggle()">Hide</a></div>', '<div class="messages">', "</div>", '<div class="command">', '<input type="text"/>', "</div>", "</div>"];

        // Insert HTML to access DOM node
        var wrapper = document.createElement("DIV");
        wrapper.innerHTML = markup.join("");
        var main = wrapper.firstChild;
        document.body.appendChild(wrapper.firstChild);

        // Make important DOM nodes available
        this.__P_282_0 = main;
        this.__P_282_1 = main.childNodes[1];
        this.__P_282_2 = main.childNodes[2].firstChild;

        // Correct height of messages frame
        this.__P_282_4();

        // Finally register to log engine
        qx.log.Logger.register(this);

        // Register to object manager
        qx.core.ObjectRegistry.register(this);
      },
      /**
       * Used by the object registry to dispose this instance e.g. remove listeners etc.
       *
       */
      dispose: function dispose() {
        qx.event.Registration.removeListener(document.documentElement, "keypress", this.__P_282_5, this);
        qx.log.Logger.unregister(this);
      },
      /*
      ---------------------------------------------------------------------------
        INSERT & CLEAR
      ---------------------------------------------------------------------------
      */
      /**
       * Clears the current console output.
       *
       */
      clear: function clear() {
        // Remove all messages
        this.__P_282_1.innerHTML = "";
      },
      /**
       * Processes a single log entry
       *
       * @signature function(entry)
       * @param entry {Map} The entry to process
       */
      process: function process(entry) {
        // Append new content
        var formatter = qx.log.appender.Formatter.getFormatter();
        this.__P_282_1.appendChild(formatter.toHtml(entry));

        // Scroll down
        this.__P_282_6();
      },
      /**
       * Automatically scroll down to the last line
       */
      __P_282_6: function __P_282_6() {
        this.__P_282_1.scrollTop = this.__P_282_1.scrollHeight;
      },
      /*
      ---------------------------------------------------------------------------
        VISIBILITY TOGGLING
      ---------------------------------------------------------------------------
      */

      /** @type {Boolean} Flag to store last visibility status */
      __P_282_7: true,
      /**
       * Toggles the visibility of the console between visible and hidden.
       *
       */
      toggle: function toggle() {
        if (!this.__P_282_0) {
          this.init();
        } else if (this.__P_282_0.style.display == "none") {
          this.show();
        } else {
          this.__P_282_0.style.display = "none";
        }
      },
      /**
       * Shows the console.
       *
       */
      show: function show() {
        if (!this.__P_282_0) {
          this.init();
        } else {
          this.__P_282_0.style.display = "block";
          this.__P_282_1.scrollTop = this.__P_282_1.scrollHeight;
        }
      },
      /*
      ---------------------------------------------------------------------------
        COMMAND LINE SUPPORT
      ---------------------------------------------------------------------------
      */

      /** @type {Array} List of all previous commands. */
      __P_282_8: [],
      /**
       * Executes the currently given command
       *
       */
      execute: function execute() {
        var value = this.__P_282_2.value;
        if (value == "") {
          return;
        }
        if (value == "clear") {
          this.clear();
          return;
        }
        var command = document.createElement("div");
        var formatter = qx.log.appender.Formatter.getFormatter();
        command.innerHTML = formatter.escapeHTML(">>> " + value);
        command.className = "user-command";
        this.__P_282_8.push(value);
        this.__P_282_3 = this.__P_282_8.length;
        this.__P_282_1.appendChild(command);
        this.__P_282_6();
        try {
          var ret = window.eval(value);
        } catch (ex) {
          qx.log.Logger.error(ex);
        }
        if (ret !== undefined) {
          qx.log.Logger.debug(ret);
        }
      },
      /*
      ---------------------------------------------------------------------------
        EVENT LISTENERS
      ---------------------------------------------------------------------------
      */
      /**
       * Event handler for resize listener
       *
       * @param e {Event} Event object
       */
      __P_282_4: function __P_282_4(e) {
        this.__P_282_1.style.height = this.__P_282_0.clientHeight - this.__P_282_0.firstChild.offsetHeight - this.__P_282_0.lastChild.offsetHeight + "px";
      },
      /**
       * Event handler for keydown listener
       *
       * @param e {Event} Event object
       */
      __P_282_5: function __P_282_5(e) {
        if (e instanceof qx.event.type.Tap || e instanceof qx.event.type.Pointer) {
          var target = e.getTarget();
          if (target && target.className && target.className.indexOf && target.className.indexOf("navigationbar") != -1) {
            this.toggle();
          }
          return;
        }
        var iden = e.getKeyIdentifier();

        // Console toggling
        if (iden == "F7" || iden == "D" && e.isCtrlPressed()) {
          this.toggle();
          e.preventDefault();
        }

        // Not yet created
        if (!this.__P_282_0) {
          return;
        }

        // Active element not in console
        if (!qx.dom.Hierarchy.contains(this.__P_282_0, e.getTarget())) {
          return;
        }

        // Command execution
        if (iden == "Enter" && this.__P_282_2.value != "") {
          this.execute();
          this.__P_282_2.value = "";
        }

        // History management
        if (iden == "Up" || iden == "Down") {
          this.__P_282_3 += iden == "Up" ? -1 : 1;
          this.__P_282_3 = Math.min(Math.max(0, this.__P_282_3), this.__P_282_8.length);
          var entry = this.__P_282_8[this.__P_282_3];
          this.__P_282_2.value = entry || "";
          this.__P_282_2.select();
        }
      }
    },
    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */
    defer: function defer(statics) {
      qx.event.Registration.addListener(document.documentElement, "keypress", statics.__P_282_5, statics);
      qx.event.Registration.addListener(document.documentElement, "longtap", statics.__P_282_5, statics);
    }
  });
  qx.log.appender.Console.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Console.js.map?dt=1722151827207