(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.TemplateEngine": {},
      "qx.util.Uri": {
        "defer": "runtime"
      },
      "cv.Version": {
        "defer": "runtime"
      },
      "cv.io.Client": {
        "defer": "runtime"
      },
      "qx.bom.client.Html": {
        "defer": "load",
        "require": true
      },
      "qx.log.Logger": {
        "defer": "runtime"
      },
      "cv.ConfigCache": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "html.storage.local": {
          "defer": true,
          "className": "qx.bom.client.Html"
        },
        "html.console": {
          "defer": true,
          "className": "qx.bom.client.Html"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Config.js 
   * 
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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

  /**
   * Main settings that an be accessed from anywhere inside the Application
   */
  qx.Class.define('cv.Config', {
    type: 'static',
    statics: {
      /**
       * Define ENUM of maturity levels for features, so that e.g. the editor can
       * ignore some widgets when they are not supported yet
       */
      Maturity: {
        release: 0,
        development: 1
      },

      /**
       * The current path tree
       * @type {String}
       */
      treePath: '',

      /**
       * Path to the current page
       * @type {String}
       */
      currentPageId: null,

      /**
       * @type {Boolean}
       */
      libraryCheck: true,

      /**
       * Threshold where the mobile.css is loaded
       * @type {Number}
       */
      maxMobileScreenWidth: 599,

      /**
       * Threshold where colspan-s is used
       * @type {Number}
       */
      maxScreenWidthColspanS: 599,

      /**
       * threshold where colspan-m is used
       * @type {Number}
       */
      maxScreenWidthColspanM: 839,

      /**
       * Default scrolling speed for page changes (in ms)
       * @type {Number}
       */
      scrollSpeed: 400,

      /**
       * Default number of colums the layout should use
       * @type {Number}
       */
      defaultColumns: 12,

      /**
       * Minimum column width
       * @type {Number}
       */
      minColumnWidth: 120,

      /**
       * If true, the client only loads the states for the widgets that are part of the start page at first
       * read request (should increase the performance when huge config files are used)
       * @type {Boolean}
       */
      enableAddressQueue: false,

      /**
       * Type of the used backend (*default*, *openhab* or *openhab2*)
       * @type {String}
       */
      backend: null,

      /**
       * Initial URL to the backend
       * @type {String}
       */
      backendLoginUrl: null,

      /**
       * @type {String}
       */
      configSuffix: null,

      /**
       * The design currently used
       * @type {String}
       */
      clientDesign: '',

      /**
       * Maturity level
       * @type {var}
       */
      use_maturity: false,

      /**
       * Default plugins to load, that are not controlled by the config (e.g. some backends can load own plugins)
       */
      pluginsToLoad: [],

      /**
       * Load the manager directly, no config
       * @type {boolean}
       */
      loadManager: false,

      /**
       * Optional settings for manager loading
       * @type {Map}
       */
      managerOptions: {},

      /**
       * All configuration and settings from the current configuration
       * (Note: all settings that need to be cached must be put in here)
       */
      configSettings: {
        mappings: {},
        stylings: {},

        /**
         * Stores the rowspans used by the current confid
         * @type {Map} of rowspan-value as key and true as value
         */
        usedRowspans: {},
        pluginsToLoad: [],

        /**
         * Array with alls icons defined in the current config file
         * @type {Array}
         */
        iconsFromConfig: [],

        /**
         * Credentials for Backend authentication, username/token and optional password
         */
        credentials: {
          username: null,
          password: null
        }
      },

      /**
       * Store last visited page in LocalStorage
       */
      rememberLastPage: false,

      /**
       * If enabled the widget instances are created on demand. Note: this must only be used when
       * cache is valid!
       * @type {Boolean}
       */
      lazyLoading: false,

      /**
       * Defines which structure is supported by which designs
       */
      designStructureMap: {
        'pure': ['alaska', 'alaska_slim', 'discreet', 'discreet_sand', 'discreet_slim', 'metal', 'pitchblack', 'planet', 'pure']
      },

      /**
       * Wether the error reporting with sentry is enabled or not
       */
      sentryEnabled: false,

      /**
       * If enabled the user interaction gets logged
       */
      reporting: false,

      /**
       * Set console logging
       */
      enableLogging: true,

      /**
       * The server that responded to the config request
       */
      configServer: null,

      /**
       * If the CometVisu can use service workers
       */
      useServiceWorker: false,
      enableServiceWorkerCache: true,

      /**
       * Get the structure that is related to this design
       * @param design {String?} name of the design
       * @return {String} name of the structure
       */
      getStructure: function getStructure(design) {
        if (!design) {
          design = this.getDesign();
        }

        for (var structure in this.designStructureMap) {
          if (Object.prototype.hasOwnProperty.call(this.designStructureMap, structure)) {
            if (this.designStructureMap[structure].indexOf(design) >= 0) {
              return 'structure-' + structure;
            }
          }
        } // fallback to pure


        return 'structure-pure';
      },

      /**
       * This method tries to guess if the CometVisu is running on a proxied webserver.
       * (by comparing if the visu_config.xml-File has been delivered from another server than the
       * loging response). As this is just an assumption, you should not treat this result as reliable.
       */
      guessIfProxied: function guessIfProxied() {
        if (this.configServer === null || cv.TemplateEngine.getInstance().visu.getServer() === null) {
          throw new Error('not ready yet');
        }

        return this.configServer !== cv.TemplateEngine.getInstance().visu.getServer();
      },
      addMapping: function addMapping(name, mapping) {
        this.configSettings.mappings[name] = mapping;
      },
      getMapping: function getMapping(name) {
        return this.configSettings.mappings[name];
      },
      hasMapping: function hasMapping(name) {
        return Object.prototype.hasOwnProperty.call(this.configSettings.mappings, name);
      },
      clearMappings: function clearMappings() {
        this.configSettings.mappings = {};
      },
      addStyling: function addStyling(name, styling) {
        this.configSettings.stylings[name] = styling;
      },
      getStyling: function getStyling(name) {
        return this.configSettings.stylings[name];
      },
      hasStyling: function hasStyling(name) {
        return Object.prototype.hasOwnProperty.call(this.configSettings.stylings, name);
      },
      getDesign: function getDesign() {
        return this.clientDesign || this.configSettings.clientDesign;
      }
    },
    defer: function defer(statics) {
      var req = qx.util.Uri.parseUri(window.location.href);

      if (req.queryKey.enableQueue) {
        cv.Config.enableAddressQueue = true;
      }

      if (req.queryKey.libraryCheck) {
        cv.Config.libraryCheck = req.queryKey.libraryCheck !== 'false'; // true unless set to false
      }

      if (req.queryKey.backend) {
        cv.Config.URL = {
          backend: req.queryKey.backend
        };
      } else {
        cv.Config.URL = {
          backend: undefined
        };
      }

      if (req.queryKey.design) {
        cv.Config.clientDesign = req.queryKey.design;
      }

      if (req.queryKey.startpage) {
        cv.Config.startpage = req.queryKey.startpage;
      }

      if (req.queryKey.reportErrors) {
        if (window.Sentry) {
          cv.Config.sentryEnabled = true;
          Sentry.configureScope(function (scope) {
            scope.setTag('build.date', cv.Version.DATE);
            scope.setTag('build.branch', cv.Version.BRANCH);
            Object.keys(cv.Version.TAGS).forEach(function (tag) {
              scope.setTag(tag, cv.Version.TAGS[tag]);
            });
          });
        }
      } // store for later usage


      cv.Config.request = req;

      if (req.queryKey.testMode) {
        cv.Config.testMode = req.queryKey.testMode === 'true' || req.queryKey.testMode === '1';
      } // propagate to the client


      cv.io.Client.TEST_MODE = cv.Config.testMode;

      if (req.queryKey.config) {
        cv.Config.configSuffix = req.queryKey.config;
      }

      if (req.queryKey.forceReload) {
        cv.Config.forceReload = req.queryKey.forceReload !== 'false'; // true unless set to false
      }

      if (req.queryKey.reporting) {
        cv.Config.reporting = req.queryKey.reporting === 'true';
      } // caching is only possible when localStorage is available


      if (qx.core.Environment.get('html.storage.local') === false) {
        cv.Config.enableCache = false;
        qx.log.Logger.warn(statics, 'localStorage is not available in your browser. Some advanced features, like caching will not work!');
      } else if (req.queryKey.enableCache === 'invalid') {
        cv.ConfigCache.clear(cv.Config.configSuffix);
        cv.Config.enableCache = true;
      } else {
        cv.Config.enableCache = req.queryKey.enableCache ? req.queryKey.enableCache === 'true' : true;
      }

      cv.Config.enableLogging = qx.core.Environment.get('html.console');

      if (req.queryKey.log === 'false') {
        cv.Config.enableLogging = false;
      } else if (req.queryKey.log === 'true') {
        cv.Config.enableLogging = true;
      }

      cv.Config.loadManager = cv.Config.request.queryKey.manager || window.location.hash === '#manager';
      cv.Config.managerOptions = {
        action: cv.Config.request.queryKey.open ? 'open' : '',
        data: cv.Config.request.queryKey.open ? cv.Config.request.queryKey.open : undefined
      }; // "Bug"-Fix for ID: 3204682 "Caching on web server"
      // Config isn't a real fix for the problem as that's part of the web browser,
      // but
      // it helps to avoid the problems on the client, e.g. when the config file
      // has changed but the browser doesn't even ask the server about it...

      cv.Config.forceReload = true;

      if (req.queryKey.forceDevice) {
        // overwrite detection when set by URL
        switch (req.queryKey.forceDevice) {
          case 'mobile':
            cv.Config.mobileDevice = true;
            break;

          case 'nonmobile':
            cv.Config.mobileDevice = false;
            break;
        }
      } // Disable features that aren't ready yet
      // Config can be overwritten in the URL with the parameter "maturity"


      if (req.queryKey.maturity) {
        cv.Config.url_maturity = req.queryKey.maturity;

        if (!isNaN(cv.Config.url_maturity - 0)) {
          cv.Config.use_maturity = cv.Config.url_maturity - 0; // given directly as number
        } else {
          cv.Config.use_maturity = statics.Maturity[cv.Config.url_maturity]; // or as the ENUM name
        }
      }

      if (isNaN(cv.Config.use_maturity)) {
        cv.Config.use_maturity = statics.Maturity.release; // default to release
      }

      cv.Config.useServiceWorker = 'serviceWorker' in navigator && (req.protocol === 'https' || req.host === 'localhost');

      if (cv.Config.useServiceWorker) {}
    }
  });
  cv.Config.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Config.js.map?dt=1650269569106