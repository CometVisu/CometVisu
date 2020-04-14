(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.html.Flash": {},
      "qx.util.TimerManager": {},
      "qx.util.ResourceManager": {},
      "qx.ui.core.queue.Layout": {}
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
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * The Flash widget embeds the HMTL Flash element
   */
  qx.Class.define("qx.ui.embed.Flash", {
    extend: qx.ui.core.Widget,

    /**
     * Constructs a flash widget.
     *
     * @param source {String} The URL of the Flash movie to display.
     * @param id {String?null} The unique id for the Flash movie.
     */
    construct: function construct(source, id) {
      qx.ui.core.Widget.constructor.call(this);
      this.setSource(source);

      if (id) {
        this.setId(id);
      } else {
        this.setId("flash" + this.toHashCode());
      } //init properties


      this.initQuality();
      this.initWmode();
      this.initAllowScriptAccess();
      this.initLiveConnect(); // Creates the Flash DOM element (movie) on appear,
      // because otherwise IE 7 and higher blocks the
      // ExternelInterface from Flash.

      this.addListenerOnce("appear", function () {
        this._checkLoading();

        this.getContentElement().createFlash();
      }, this);
    },
    events: {
      /**
       * Fired when the flash object still is loading.
       *
       * The loading action can be prevented by calling
       * {@link qx.event.type.Event#preventDefault} on the event object
       */
      "loading": "qx.event.type.Event",

      /**
       * Fired after the flash object has been loaded.
       *
       * The loaded action can be prevented by calling
       * {@link qx.event.type.Event#preventDefault} on the event object
       */
      "loaded": "qx.event.type.Event",

      /**
       * Fired after the flash object has got a timeout.
       *
       * The timeout action can be prevented by calling
       * {@link qx.event.type.Event#preventDefault} on the event object
       */
      "timeout": "qx.event.type.Event"
    },
    properties: {
      /**
       * The URL of the Flash movie.
       */
      source: {
        check: "String",
        apply: "_applySource"
      },

      /**
       * The unique Flash movie id.
       */
      id: {
        check: "String",
        apply: "_applyId"
      },

      /**
       * Set the quality attribute for the Flash movie.
       */
      quality: {
        check: ["low", "autolow", "autohigh", "medium", "high", "best"],
        init: "best",
        nullable: true,
        apply: "_applyQuality"
      },

      /**
       * Set the scale attribute for the Flash movie.
       */
      scale: {
        check: ["showall", "noborder", "exactfit", "noscale"],
        nullable: true,
        apply: "_applyScale"
      },

      /**
       * Set the wmode attribute for the Flash movie.
       */
      wmode: {
        check: ["window", "opaque", "transparent"],
        init: "opaque",
        nullable: true,
        apply: "_applyWmode"
      },

      /**
       * Set the play attribute for the Flash movie.
       */
      play: {
        check: "Boolean",
        nullable: true,
        apply: "_applyPlay"
      },

      /**
       * Set the loop attribute for the Flash movie.
       */
      loop: {
        check: "Boolean",
        nullable: true,
        apply: "_applyLoop"
      },

      /**
       * Set the mayscript attribute for the Flash movie.
       */
      mayScript: {
        check: "Boolean",
        nullable: false,
        apply: "_applyMayScript"
      },

      /**
       * Set the menu attribute for the Flash movie.
       */
      menu: {
        check: "Boolean",
        nullable: true,
        apply: "_applyMenu"
      },

      /**
       * Set allow script access
       **/
      allowScriptAccess: {
        check: ["sameDomain", "always", "never"],
        init: "sameDomain",
        nullable: true,
        apply: "_applyAllowScriptAccess"
      },

      /**
       * Enable/disable live connection
       **/
      liveConnect: {
        check: "Boolean",
        init: true,
        nullable: true,
        apply: "_applyLiveConnect"
      },

      /**
       * Set the 'FlashVars' to pass variables to the Flash movie.
       */
      variables: {
        init: {},
        check: "Map",
        apply: "_applyVariables"
      },

      /**
       * A timeout when trying to load the flash source.
       */
      loadTimeout: {
        check: "Integer",
        init: 10000
      }
    },
    members: {
      /** @type {Integer} The time stamp when the loading begins. */
      __time: null,

      /*
      ---------------------------------------------------------------------------
        PUBLIC WIDGET API
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the DOM element of the Flash movie.
       *
       * Note: If you call the method before the widget is rendered, it will
       * always return <code>null</code>. Therefore call the method after
       * the {@link #appear} event is fired.
       *
       * @return {Element|null} The DOM element of the Flash movie.
       */
      getFlashElement: function getFlashElement() {
        var element = this.getContentElement();

        if (element) {
          return element.getFlashElement();
        } else {
          return null;
        }
      },

      /**
       * Checks if the movie is loaded.
       *
       * @return {Boolean} <code>true</code> When the movie is completely loaded,
       *   otherwise <code>false</code>.
       */
      isLoaded: function isLoaded() {
        return this.getPercentLoaded() === 100;
      },

      /**
       * Returns the current loaded state from the Flash movie.
       *
       * @return {Integer} The loaded percent value.
       */
      getPercentLoaded: function getPercentLoaded() {
        var flashFE = this.getFlashElement(); // First make sure the movie is defined and has received a non-zero object id.

        if (typeof flashFE != "undefined" && flashFE != null) {
          try {
            return flashFE.PercentLoaded();
          } catch (err) {
            // Not an accessible function yet.
            return 0;
          }
        } else {
          return 0;
        }
      },
      // overridden
      _createContentElement: function _createContentElement() {
        var el = new qx.html.Flash();
        el.connectWidget(this);
        return el;
      },

      /**
       * Checks the current loaded state and fires one of the defined events:
       * {@link #loading}, {@link #loaded} or {@link #timeout}.
       *
       * Note the {@link #timeout} event is fired when the check reached the
       * defined {@link #loadTimeout}.
       */
      _checkLoading: function _checkLoading() {
        var source = this.getSource();

        if (source != "" && source != null && source != "undefined") {
          if (!this.isLoaded()) {
            if (!this.__time) {
              this.__time = new Date().getTime();
            }

            var timeDiff = new Date().getTime() - this.__time;

            if (this.getLoadTimeout() > timeDiff) {
              var timer = qx.util.TimerManager.getInstance();
              timer.start(this._checkLoading, 0, this, null, 10);
              this.fireEvent("loading");
            } else {
              this.fireEvent("timeout");
              this.__time = null;
            }
          } else {
            this.fireEvent("loaded");
            this.__time = null;
          }
        }
      },

      /*
      ---------------------------------------------------------------------------
       APPLY METHODS
      ---------------------------------------------------------------------------
      */
      // property apply
      _applySource: function _applySource(value, old) {
        var source = qx.util.ResourceManager.getInstance().toUri(value);
        this.getContentElement().setSource(source);
        qx.ui.core.queue.Layout.add(this);
      },
      // property apply
      _applyId: function _applyId(value, old) {
        this.getContentElement().setId(value);
        qx.ui.core.queue.Layout.add(this);
      },
      // property apply
      _applyVariables: function _applyVariables(value, old) {
        this.getContentElement().setVariables(value);
        qx.ui.core.queue.Layout.add(this);
      },
      // property apply
      _applyMayScript: function _applyMayScript(value, old) {
        this.getContentElement().setAttribute("mayscript", value ? "" : false);
        qx.ui.core.queue.Layout.add(this);
      },
      // property apply
      _applyQuality: function _applyQuality(value, old) {
        this.__flashParamHelper("quality", value);
      },
      // property apply
      _applyScale: function _applyScale(value, old) {
        this.__flashParamHelper("scale", value);
      },
      // property apply
      _applyWmode: function _applyWmode(value, old) {
        this.__flashParamHelper("wmode", value);
      },
      // property apply
      _applyPlay: function _applyPlay(value, old) {
        this.__flashParamHelper("play", value);
      },
      // property apply
      _applyLoop: function _applyLoop(value, old) {
        this.__flashParamHelper("loop", value);
      },
      // property apply
      _applyMenu: function _applyMenu(value, old) {
        this.__flashParamHelper("menu", value);
      },
      // property apply
      _applyAllowScriptAccess: function _applyAllowScriptAccess(value, old) {
        this.__flashParamHelper("allowScriptAccess", value);
      },
      // property apply
      _applyLiveConnect: function _applyLiveConnect(value, old) {
        this.__flashParamHelper("swLiveConnect", value);
      },

      /*
      ---------------------------------------------------------------------------
       HELPER METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Set the attribute for the Flash DOM element.
       *
       * @param key {String} Flash Player attribute name.
       * @param value {String?null} The value for the attribute, <code>null</code>
       *    if the attribute should be removed from the DOM element.
       */
      __flashParamHelper: function __flashParamHelper(key, value) {
        this.getContentElement().setParam(key, value);
        qx.ui.core.queue.Layout.add(this);
      }
    }
  });
  qx.ui.embed.Flash.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Flash.js.map?dt=1586894643940