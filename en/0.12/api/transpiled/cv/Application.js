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
      "qx.application.Native": {
        "construct": true,
        "require": true
      },
      "qx.ui.command.GroupManager": {
        "construct": true
      },
      "qx.locale.Manager": {
        "construct": true
      },
      "qx.io.PartLoader": {
        "construct": true
      },
      "qx.bom.PageVisibility": {
        "construct": true
      },
      "cv.Config": {},
      "cv.io.Mockup": {},
      "cv.io.Client": {},
      "qx.bom.Blocker": {},
      "qx.event.GlobalError": {},
      "cv.report.Record": {},
      "cv.Version": {},
      "qx.ui.command.Command": {},
      "cv.TemplateEngine": {},
      "cv.log.appender.Native": {},
      "qx.bom.Stylesheet": {},
      "qx.util.ResourceManager": {},
      "qx.core.WindowError": {},
      "qx.dev.StackTrace": {},
      "cv.ui.PopupHandler": {},
      "qx.util.Uri": {},
      "cv.util.Location": {},
      "cv.core.notifications.Router": {},
      "qx.event.Registration": {},
      "cv.ui.layout.ResizeHandler": {},
      "qx.bom.Lifecycle": {},
      "cv.ConfigCache": {},
      "cv.ui.NotificationCenter": {},
      "cv.ui.ToastManager": {},
      "cv.util.ConfigLoader": {},
      "cv.util.ScriptLoader": {},
      "cv.data.Model": {},
      "cv.ui.structure.WidgetFactory": {},
      "qx.event.message.Bus": {},
      "cv.IconHandler": {},
      "qx.event.Timer": {},
      "qx.Part": {},
      "qx.util.LibraryManager": {},
      "qx.bom.client.Html": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "html.storage.local": {
          "className": "qx.bom.client.Html"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Application.js 
   * 
   * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
   * This is the main application class of the CometVisu.
   *
   * @asset(demo/*)
   * @asset(designs/*)
   * @asset(icon/*)
   * @asset(sentry/bundle.min.js)
   * @asset(test/*)
   *
   * @require(qx.bom.Html,cv.ui.PopupHandler)
   */
  qx.Class.define("cv.Application", {
    extend: qx.application.Native,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      qx.application.Native.constructor.call(this);
      this.initCommandManager(new qx.ui.command.GroupManager());
      var lang = qx.locale.Manager.getInstance().getLanguage();

      if (qx.io.PartLoader.getInstance().hasPart(lang)) {
        qx.io.PartLoader.require([lang]);
      }

      qx.bom.PageVisibility.getInstance().addListener('change', function () {
        this.setActive(qx.bom.PageVisibility.getInstance().getVisibilityState() === "visible");
      }, this);
    },

    /*
     ******************************************************
     STATICS
     ******************************************************
     */
    statics: {
      HTML_STRUCT: '<div id="top" class="loading"><div class="nav_path">-</div></div><div id="navbarTop" class="loading"></div><div id="centerContainer"><div id="navbarLeft" class="loading page"></div><div id="main" style="position:relative; overflow: hidden;" class="loading"><div id="pages" class="clearfix" style="position:relative;clear:both;"><!-- all pages will be inserted here --></div></div><div id="navbarRight" class="loading page"></div></div><div id="navbarBottom" class="loading"></div><div id="bottom" class="loading"><hr /><div class="footer"></div></div>',
      consoleCommands: [],
      __commandManager: null,

      /**
       * Client factory method -> create a client
       * @return {cv.io.Client|cv.io.Mockup}
       */
      createClient: function createClient() {
        var args = Array.prototype.slice.call(arguments);

        if (args[0] === "openhab2") {
          // auto-load openhab plugin for this backend
          cv.Config.configSettings.pluginsToLoad.push("plugin-openhab");
        }

        args.unshift(null);

        if (cv.Config.testMode === true) {
          return new (Function.prototype.bind.apply(cv.io.Mockup, args))(); // jshint ignore:line
        } else {
          return new (Function.prototype.bind.apply(cv.io.Client, args))(); // jshint ignore:line
        }
      },

      /**
       * Register shortcuts to usefull commands the user can execute in the browser console
       * @param shortcutName {String} command name used to install the command in the global namespace
       * @param command {Function} command to execute
       * @param help {String} some documentation about the command
       */
      registerConsoleCommand: function registerConsoleCommand(shortcutName, command, help) {
        // install command
        if (!(shortcutName in window)) {
          window[shortcutName] = command;
          this.consoleCommands.push(shortcutName + "() - " + help);
        }
      }
    },

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      root: {
        nullable: true
      },

      /**
       * true when structure part has been loaded
       */
      structureLoaded: {
        check: 'Boolean',
        init: false,
        event: 'changeStructureLoaded'
      },
      commandManager: {
        check: 'qx.ui.command.GroupManager',
        deferredInit: true
      },
      active: {
        check: "Boolean",
        init: true,
        event: "changeActive"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      _blocker: null,

      /**
       * Toggle the {@link qx.bom.Blocker} visibility
       * @param val {Boolean}
       */
      block: function block(val) {
        if (val) {
          if (!this._blocker) {
            this._blocker = new qx.bom.Blocker();

            this._blocker.setBlockerColor("#000000");

            this._blocker.setBlockerOpacity("0.2");
          }

          this._blocker.block();
        } else if (this._blocker) {
          this._blocker.unblock();
        }
      },

      /**
       * This method contains the initial application code and gets called
       * during startup of the application
       */
      main: function main() {
        qx.event.GlobalError.setErrorHandler(this.__globalErrorHandler, this);
        cv.report.Record.prepare();
        var info = "\n  _____                     ___      ___\n / ____|                   | \\ \\    / (_)\n| |     ___  _ __ ___   ___| |\\ \\  / / _ ___ _   _\n| |    / _ \\| '_ ` _ \\ / _ \\ __\\ \\/ / | / __| | | |\n| |___| (_) | | | | | |  __/ |_ \\  /  | \\__ \\ |_| |\n \\_____\\___/|_| |_| |_|\\___|\\__| \\/   |_|___/\\__,_|\n-----------------------------------------------------------\n ©2010-" + new Date().getFullYear() + " Christian Mayer and the CometVisu contributers.\n" + " Version: " + cv.Version.VERSION + "\n";

        if (cv.Application.consoleCommands.length) {
          info += "\n Available commands:\n    " + cv.Application.consoleCommands.join("\n    ") + "\n";
        }

        info += "-----------------------------------------------------------\n\n";
        console.log(info); // add command to load and open the manager

        var manCommand = new qx.ui.command.Command('Ctrl+M');
        cv.TemplateEngine.getInstance().getCommands().add("open-manager", manCommand);
        manCommand.addListener('execute', this.showManager, this);

        if (cv.Config.request.queryKey.manager) {
          this.showManager();
        }

        // Call super class
        cv.Application.prototype.main.base.call(this);
        this.block(true); // run svg4everybody to support SVG sprites in older browsers

        svg4everybody(); // support native logging capabilities, e.g. Firebug for Firefox
        //noinspection BadExpressionStatementJS,JSHint

        cv.log.appender.Native; // Enable logging in debug variant

        /*
         -------------------------------------------------------------------------
         Below is your actual application code...
         -------------------------------------------------------------------------
         */
        // in debug mode load the uncompressed unobfuscated scripts
        qx.bom.Stylesheet.includeFile(qx.util.ResourceManager.getInstance().toUri('designs/designglobals.css') + (cv.Config.forceReload === true ? '?' + Date.now() : ''));

        this.__init();
      },
      showManager: function showManager() {
        qx.io.PartLoader.require(['manager'], function (states) {
          // break dependency
          var engine = cv.TemplateEngine.getInstance();

          if (!engine.isLoggedIn()) {
            // never start the manager before we are logged in, as the login response might contain information about the REST API URL
            engine.addListenerOnce('changeLoggedIn', this.showManager, this);
            return;
          }

          var ManagerMain = cv.ui['manager']['Main'];
          var toggleVisibility = !!ManagerMain.constructor.$$instance;
          var manager = ManagerMain.getInstance();

          if (toggleVisibility) {
            manager.setVisible(!manager.getVisible());
          }
        }, this);
      },
      __globalErrorHandler: function __globalErrorHandler(ex) {
        // connect client data for Bug-Report
        var bugData = cv.report.Record.getClientData();
        var body = "**" + qx.locale.Manager.tr("Please describe what you have done until the error occured?") + "**\n \n\n";
        var exString = "";
        var maxTraceLength = 2000;

        if (ex.getSourceException && ex.getSourceException()) {
          ex = ex.getSourceException();
        } else if (ex instanceof qx.core.WindowError) {
          exString = ex.toString() + "\nin " + ex.getUri() + " line " + ex.getLineNumber();
        }

        if (!exString) {
          exString = ex.name + ": " + ex.message;

          if (ex.fileName) {
            exString += "\n in file " + ex.fileName;
          }

          if (ex.lineNumber) {
            exString += "\n line " + ex.lineNumber;
          }

          if (ex.description) {
            exString += "\n Description: " + ex.description;
          }

          try {
            var lastLine = '';
            var repeated = 0;
            var nStack = '';
            qx.dev.StackTrace.getStackTraceFromError(ex).forEach(function (entry) {
              if (lastLine === entry) {
                if (repeated === 0) {
                  // count first occurance too
                  repeated = 2;
                } else {
                  repeated++;
                }
              } else if (repeated > 0) {
                nStack += ' [repeated ' + repeated + ' times]';
                nStack += '\n\t' + entry;
                repeated = 0;
              } else {
                nStack += '\n\t' + entry;
                lastLine = entry;
              }
            }, this);

            if (repeated > 0) {
              nStack += ' [repeated ' + repeated + ' times]';
            }

            if (nStack) {
              exString += "\nNormalized Stack: " + nStack.substring(0, maxTraceLength) + "\n";

              if (nStack.length > maxTraceLength) {
                exString += 'Stacktrace has been cut off\n';
              }
            }

            if (exString.length + ex.stack.length < maxTraceLength) {
              exString += "\nOriginal Stack: " + ex.stack + "\n";
            }
          } catch (exc) {
            if (ex.stack) {
              exString += "\nStack: " + ex.stack.substring(0, maxTraceLength) + "\n";

              if (ex.stack.length > maxTraceLength) {
                exString += 'Stacktrace has been cut off\n';
              }
            }
          }
        }

        body += "```\n" + exString + "\n```\n\n**Client-Data:**\n```\n" + JSON.stringify(bugData, null, 2) + "\n```";
        var notification = {
          topic: "cv.error",
          target: cv.ui.PopupHandler,
          title: qx.locale.Manager.tr("An error occured"),
          message: "<pre>" + (ex.stack || exString) + "</pre>",
          severity: "urgent",
          deletable: false,
          actions: {
            optionGroup: {
              title: qx.locale.Manager.tr("Enable on reload:"),
              options: []
            },
            link: [{
              title: qx.locale.Manager.tr("Reload"),
              action: function action(ev) {
                var parent = ev.getTarget().parentNode;

                while (parent) {
                  if (parent.id === "notification-center" || parent.classList.contains("popup")) {
                    break;
                  }

                  parent = parent.parentNode;
                }

                var box = parent.querySelector("#enableReporting");
                var url = window.location.href.split("#").shift();

                if (box && box.checked) {
                  // reload with reporting enabled
                  url = qx.util.Uri.appendParamsToUrl(url, "reporting=true");
                }

                box = parent.querySelector("#reportErrors");

                if (box && box.checked) {
                  // reload with automatic error reporting enabled
                  url = qx.util.Uri.appendParamsToUrl(url, "reportErrors=true");
                }

                cv.util.Location.setHref(url);
              },
              needsConfirmation: false
            }]
          }
        }; // reload with reporting checkbox

        var reportAction = null;
        var link = "";

        if (cv.Config.reporting) {
          // reporting is enabled -> download log and show hint how to append it to the ticket
          body = '<!--\n' + qx.locale.Manager.tr("Please do not forget to attach the downloaded Logfile to this ticket.") + '\n-->\n\n' + body;
          reportAction = cv.report.Record.download;
        } else {
          if (qx.locale.Manager.getInstance().getLanguage() === "de") {
            link = ' <a href="http://cometvisu.org/CometVisu/de/latest/manual/config/url-params.html#reporting-session-aufzeichnen" target="_blank" title="Hilfe">(?)</a>';
          }

          notification.actions.optionGroup.options.push({
            title: qx.locale.Manager.tr("Action recording") + link,
            name: "enableReporting"
          }); // notification.message+='<div class="actions"><input class="enableReporting" type="checkbox" value="true"/>'+qx.locale.Manager.tr("Enable reporting on reload")+link+'</div>';
        }

        {
          if (window.Sentry) {
            // Sentry has been loaded -> add option to send the error
            notification.actions.link.push({
              title: qx.locale.Manager.tr("Send error to sentry.io"),
              action: function action() {
                Sentry.captureException(ex);
              },
              needsConfirmation: false,
              deleteMessageAfterExecution: true
            });
          } else {
            link = "";

            if (qx.locale.Manager.getInstance().getLanguage() === "de") {
              link = ' <a href="http://cometvisu.org/CometVisu/de/latest/manual/config/url-params.html#reportErrors" target="_blank" title="Hilfe">(?)</a>';
            }

            notification.actions.optionGroup.options.push({
              title: qx.locale.Manager.tr("Error reporting (on sentry.io)") + link,
              name: "reportErrors",
              style: "margin-left: 18px"
            }); // notification.message+='<div class="actions"><input class="reportErrors" type="checkbox" value="true"/>'+qx.locale.Manager.tr("Enable error reporting")+link+'</div>';
          }
        }
        cv.core.notifications.Router.dispatchMessage(notification.topic, notification);
      },
      throwError: function throwError() {
        window.onerror(new Error('test error'));
      },

      /**
       * Internal initialization method
       */
      __init: function __init() {
        qx.event.Registration.addListener(window, 'resize', cv.ui.layout.ResizeHandler.invalidateScreensize, cv.ui.layout.ResizeHandler);
        qx.event.Registration.addListener(window, 'unload', function () {
          cv.io.Client.stopAll();
        }, this);
        qx.bom.Lifecycle.onReady(function () {
          // init notification router
          cv.core.notifications.Router.getInstance();
          var body = document.querySelector("body");

          if (cv.Config.enableCache && cv.ConfigCache.isCached()) {
            // load settings
            this.debug("using cache");
            cv.ConfigCache.restore(); // initialize NotificationCenter

            cv.ui.NotificationCenter.getInstance();
            cv.ui.ToastManager.getInstance();
          } else {
            // load empty HTML structure
            body.innerHTML = cv.Application.HTML_STRUCT; // initialize NotificationCenter

            cv.ui.NotificationCenter.getInstance();
            cv.ui.ToastManager.getInstance();
          }

          var configLoader = new cv.util.ConfigLoader();
          configLoader.load(this.bootstrap, this);
        }, this);
      },

      /**
       * Initialize the content
       * @param xml {Document} XML configuration retrieved from backend
       */
      bootstrap: function bootstrap(xml) {
        this.debug("bootstrapping");
        var engine = cv.TemplateEngine.getInstance();
        var loader = cv.util.ScriptLoader.getInstance();
        engine.xml = xml;
        loader.addListenerOnce("finished", function () {
          engine.setScriptsLoaded(true);
        }, this);

        if (cv.Config.enableCache && cv.ConfigCache.isCached()) {
          // check if cache is still valid
          if (!cv.ConfigCache.isValid(xml)) {
            this.debug("cache is invalid re-parse xml"); // cache invalid

            cv.Config.cacheUsed = false;
            cv.ConfigCache.clear(); // load empty HTML structure

            var body = document.querySelector("body");
            body.innerHTML = cv.Application.HTML_STRUCT; //empty model

            cv.data.Model.getInstance().resetWidgetDataModel();
            cv.data.Model.getInstance().resetAddressList();
          } else {
            // loaded cache is still valid
            cv.report.Record.logCache();
            cv.Config.cacheUsed = true;
            cv.Config.lazyLoading = true;
            engine.initBackendClient();

            this.__detectInitialPage(); // load part for structure


            var structure = cv.Config.getStructure();
            this.debug("loading structure " + structure);
            engine.loadParts([structure], function (states) {
              if (states === "complete") {
                this.debug(structure + " has been loaded");
                this.setStructureLoaded(true);
              } else {
                this.error(structure + " could not be loaded");
                this.setStructureLoaded(false);
              }
            }, this);
            engine.addListenerOnce("changeReady", function () {
              // create the objects
              cv.Config.treePath = cv.Config.initialPage;
              var data = cv.data.Model.getInstance().getWidgetData("id_");
              cv.ui.structure.WidgetFactory.createInstance(data.$$type, data);
            }, this); // check if the current design settings overrides the cache one

            this.loadPlugins();

            if (cv.Config.clientDesign && cv.Config.clientDesign !== cv.Config.configSettings.clientDesign) {
              // we have to replace the cached design scripts styles to load
              var styles = [];
              cv.Config.configSettings.stylesToLoad.forEach(function (style) {
                styles.push(style.replace("designs/" + cv.Config.configSettings.clientDesign, "designs/" + cv.Config.clientDesign));
              }, this);
              this.loadStyles(styles);
              var scripts = [];
              cv.Config.configSettings.scriptsToLoad.forEach(function (style) {
                scripts.push(style.replace("designs/" + cv.Config.configSettings.clientDesign, "designs/" + cv.Config.clientDesign));
              }, this);
              this.loadScripts(scripts);
            } else {
              this.loadStyles();
              this.loadScripts();
            }

            this.loadIcons();
          }
        }

        if (!cv.Config.cacheUsed) {
          this.debug("starting");

          this.__detectInitialPage();

          engine.parseXML(xml, function () {
            this.loadPlugins();
            this.loadStyles();
            this.loadScripts();
            this.debug("done");

            if (cv.Config.enableCache) {
              // cache dom + data when everything is ready
              qx.event.message.Bus.subscribe("setup.dom.finished", function () {
                cv.ConfigCache.dump(xml);
              }, this);
            }
          }.bind(this));
        }
      },

      /**
       * Adds icons which were defined in the current configuration to the {@link cv.IconHandler}
       */
      loadIcons: function loadIcons() {
        cv.Config.configSettings.iconsFromConfig.forEach(function (icon) {
          cv.IconHandler.getInstance().insert(icon.name, icon.uri, icon.type, icon.flavour, icon.color, icon.styling, icon.dynamic);
        }, this);
      },

      /**
       * Load CSS styles
       * @param styles {Array?}
       */
      loadStyles: function loadStyles(styles) {
        if (!styles) {
          styles = cv.Config.configSettings.stylesToLoad;
        }

        if (styles.length) {
          cv.util.ScriptLoader.getInstance().addStyles(styles);
        }
      },

      /**
       * Load Javascript source files
       * @param scripts {Array?}
       */
      loadScripts: function loadScripts(scripts) {
        if (!scripts) {
          scripts = cv.Config.configSettings.scriptsToLoad;
        }

        if (scripts.length > 0) {
          cv.util.ScriptLoader.getInstance().addScripts(scripts);
        }
      },

      /**
       * Load plugins
       */
      loadPlugins: function loadPlugins() {
        var plugins = cv.Config.configSettings.pluginsToLoad;

        if (plugins.length > 0) {
          var standalonePlugins = [];
          var partsLoaded = false;
          var allPluginsQueued = false;
          this.debug("loading plugins");
          var engine = cv.TemplateEngine.getInstance();
          engine.addListener("changePartsLoaded", function (ev) {
            if (ev.getData() === true) {
              this.debug("plugins loaded");
              partsLoaded = true;

              if (allPluginsQueued) {
                qx.event.Timer.once(function () {
                  cv.util.ScriptLoader.getInstance().setAllQueued(true);
                }, this, 0);
              }
            }
          }, this);
          var parts = qx.Part.getInstance().getParts();
          var partPlugins = [];
          var path = qx.util.LibraryManager.getInstance().get('cv', 'resourceUri');
          plugins.forEach(function (plugin) {
            if (parts.hasOwnProperty(plugin)) {
              partPlugins.push(plugin);
            } else if (!plugin.startsWith('plugin-')) {
              // a real path
              standalonePlugins.push(plugin);
            } else {
              standalonePlugins.push(path + "/plugins/" + plugin.replace("plugin-", "") + "/index.js");
            }
          }); // load part plugins

          engine.loadParts(partPlugins);

          if (standalonePlugins.length > 0) {
            // load standalone plugins after the structure parts has been loaded
            // because they use need the classes provided by it
            if (this.getStructureLoaded()) {
              cv.util.ScriptLoader.getInstance().addScripts(standalonePlugins);
            } else {
              var lid = this.addListener('changeStructureLoaded', function (ev) {
                if (ev.getData() === true) {
                  allPluginsQueued = true;
                  this.debug('loading standalone plugins');
                  cv.util.ScriptLoader.getInstance().addScripts(standalonePlugins);

                  if (partsLoaded) {
                    cv.util.ScriptLoader.getInstance().setAllQueued(true);
                  }

                  this.removeListenerById(lid);
                }
              }, this);
            }
          } else {
            allPluginsQueued = true;
          }
        } else {
          this.debug("no plugins to load => all scripts queued");
          cv.util.ScriptLoader.getInstance().setAllQueued(true);
        }
      },
      __detectInitialPage: function __detectInitialPage() {
        var startpage = 'id_';

        if (cv.Config.startpage) {
          startpage = cv.Config.startpage;

          if (qx.core.Environment.get("html.storage.local") === true) {
            if ('remember' === startpage) {
              startpage = localStorage.getItem('lastpage');
              cv.Config.rememberLastPage = true;

              if ('string' !== typeof startpage || 'id_' !== startpage.substr(0, 3)) {
                startpage = 'id_'; // fix obvious wrong data
              }
            } else if ('noremember' === startpage) {
              localStorage.removeItem('lastpage');
              startpage = 'id_';
              cv.Config.rememberLastPage = false;
            }
          }
        } else {
          var req = qx.util.Uri.parseUri(window.location.href);

          if (req.anchor && req.anchor.substring(0, 3) === "id_") {
            startpage = req.anchor;
          }
        }

        if (startpage.match(/^id_[0-9_]*$/) !== null) {
          cv.Config.initialPage = startpage;
        } else {
          // wait for DOM to be ready and detect the page id then
          qx.event.message.Bus.subscribe("setup.dom.finished.before", function () {
            cv.Config.initialPage = cv.TemplateEngine.getInstance().getPageIdByPath(startpage) || "id_";
          });
        }
      }
    }
  });
  cv.Application.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Application.js.map?dt=1589124675245