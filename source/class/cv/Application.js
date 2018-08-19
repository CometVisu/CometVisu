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
 * @asset(config/*)
 * @asset(demo/*)
 * @asset(designs/*)
 * @asset(icon/*)
 * @asset(plugins/*)
 * @asset(visu_config.xsd)
 *
 * @require(qx.bom.Html,cv.ui.PopupHandler)
 */
qx.Class.define("cv.Application",
{
  extend : qx.application.Native,

  /*
   ******************************************************
   STATICS
   ******************************************************
   */
  statics: {
    HTML_STRUCT: '<div id="top" class="loading"><div class="nav_path">-</div></div><div id="navbarTop" class="loading"></div><div id="centerContainer"><div id="navbarLeft" class="loading page"></div><div id="main" style="position:relative; overflow: hidden;" class="loading"><div id="pages" class="clearfix" style="position:relative;clear:both;"><!-- all pages will be inserted here --></div></div><div id="navbarRight" class="loading page"></div></div><div id="navbarBottom" class="loading"></div><div id="bottom" class="loading"><hr /><div class="footer"></div></div>',
    consoleCommands: [],

    /**
     * Client factory method -> create a client
     * @return {cv.io.Client|cv.io.Mockup}
     */
    createClient: function() {
      var args = Array.prototype.slice.call(arguments);
      if (args[0] === "openhab2") {
        // auto-load openhab plugin for this backend
        cv.Config.configSettings.pluginsToLoad.push("plugin-openhab");
      }
      args.unshift(null);
      if (cv.Config.testMode === true) {
        return  new (Function.prototype.bind.apply(cv.io.Mockup, args)); // jshint ignore:line
      } else {
        return new (Function.prototype.bind.apply(cv.io.Client, args)); // jshint ignore:line
      }
    },

    /**
     * Register shortcuts to usefull commands the user can execute in the browser console
     * @param shortcutName {String} command name used to install the command in the global namespace
     * @param command {Function} command to execute
     * @param help {String} some documentation about the command
     */
    registerConsoleCommand: function(shortcutName, command, help) {
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
    }
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    _blocker: null,

    /**
     * Toggle the {@link qx.bom.Blocker} visibility
     * @param val {Boolean}
     */
    block: function(val) {
      if (val) {
        if (!this._blocker) {
          this._blocker = new qx.bom.Blocker();
          this._blocker.setBlockerColor("#000000");
          this._blocker.setBlockerOpacity("0.2");
        }
        this._blocker.block();
      } else if (this._blocker){
        this._blocker.unblock();
      }
    },

    /**
     * This method contains the initial application code and gets called
     * during startup of the application
     */
    main : function() {
      qx.event.GlobalError.setErrorHandler(this.__globalErrorHandler, this);
      if (qx.core.Environment.get("qx.debug")) {
        if (typeof replayLog !== "undefined" && replayLog) {
          cv.report.Replay.prepare(replayLog);
        }
      }
      cv.report.Record.prepare();

      var info = "\n"+
        "  _____                     ___      ___\n"+
        " / ____|                   | \\ \\    / (_)\n"+
        "| |     ___  _ __ ___   ___| |\\ \\  / / _ ___ _   _\n"+
        "| |    / _ \\| '_ ` _ \\ / _ \\ __\\ \\/ / | / __| | | |\n"+
        "| |___| (_) | | | | | |  __/ |_ \\  /  | \\__ \\ |_| |\n"+
        " \\_____\\___/|_| |_| |_|\\___|\\__| \\/   |_|___/\\__,_|\n"+
        "-----------------------------------------------------------\n"+
        " ©2010-"+(new Date().getFullYear())+" Christian Mayer and the CometVisu contributers.\n"+
        " Version: "+cv.Version.VERSION+"\n";

      if (cv.Application.consoleCommands.length) {
        info += "\n Available commands:\n"+
          "    "+cv.Application.consoleCommands.join("\n    ")+"\n";
      }

      info += "-----------------------------------------------------------\n\n";

      console.log(info);

      if (qx.core.Environment.get("qx.aspects")) {
        qx.dev.Profile.stop();
        qx.dev.Profile.start();
      }
      // Call super class
      this.base(arguments);
      this.block(true);

      // run svg4everybody to support SVG sprites in older browsers
      svg4everybody();

      // support native logging capabilities, e.g. Firebug for Firefox
      //noinspection BadExpressionStatementJS,JSHint
      cv.log.appender.Native;

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug")) {
        // support additional cross-browser console. Press F7 to toggle visibility
        //noinspection BadExpressionStatementJS,JSHint
        qx.log.appender.Console;
      }

      /*
       -------------------------------------------------------------------------
       Below is your actual application code...
       -------------------------------------------------------------------------
       */
      // in debug mode load the uncompressed unobfuscated scripts
      qx.bom.Stylesheet.includeFile(qx.util.ResourceManager.getInstance().toUri('designs/designglobals.css') + (cv.Config.forceReload === true ? '?'+Date.now() : ''));

      this.__init();
    },

    __globalErrorHandler: function(ex) {
      // connect client data for Bug-Report
      var bugData = cv.report.Record.getClientData();
      var body = "**"+qx.locale.Manager.tr("Please describe what you have done until the error occured?")+"**\n \n\n";
      var exString = "";
      if (ex.getSourceException && ex.getSourceException()) {
        ex = ex.getSourceException();
      }
      else if (ex instanceof qx.core.WindowError) {
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
          var nStack = qx.dev.StackTrace.getStackTraceFromError(ex).join("\n\t");
          if (nStack) {
            exString += "\nNormalized Stack: " + nStack + "\n";
          }
          if (ex.stack) {
            exString += "\nOriginal Stack: " + ex.stack + "\n";
          }
        } catch(exc) {
          if (ex.stack) {
            exString += "\nStack: " + ex.stack+"\n";
          }
        }
      }
      body += "```\n"+exString+"\n```\n\n**Client-Data:**\n```\n"+qx.lang.Json.stringify(bugData, null, 2)+"\n```";

      var notification = {
        topic: "cv.error",
        target: cv.ui.PopupHandler,
        title: qx.locale.Manager.tr("An error occured"),
        message: "<pre>"+ (ex.stack || exString) +"</pre>",
        severity: "urgent",
        deletable: false,
        actions: {
          link: [
            {
              title: qx.locale.Manager.tr("Reload"),
              action: function(ev) {
                var parent = ev.getTarget().parentNode;
                while (parent) {
                  if (parent.id === "notification-center" || qx.bom.element.Class.has(parent, "popup")) {
                    break;
                  }
                  parent = parent.parentNode;
                }
                var box = qx.bom.Selector.query(".enableReporting", parent)[0];
                if (box.checked) {
                  // reload with reporting enabled
                  var url = window.location.href.split("#").shift();
                  cv.util.Location.setHref(qx.util.Uri.appendParamsToUrl(url, "reporting=true"));
                } else {
                  cv.util.Location.reload(true);
                }
              },
              needsConfirmation: false
            }
          ]
        }
      };
      // reload with reporting checkbox
      var reportAction = null;
      if (cv.Config.reporting) {
        // reporting is enabled -> download log and show hint how to append it to the ticket
        body = '<!--\n'+qx.locale.Manager.tr("Please do not forget to attach the downloaded Logfile to this ticket.")+'\n-->\n\n'+body;
        reportAction = cv.report.Record.download;
      } else {
        var link = "";
        if (qx.locale.Manager.getInstance().getLocale() === "de") {
          link = ' <a href="http://cometvisu.org/CometVisu/de/latest/manual/config/url-params.html#reporting-session-aufzeichnen" target="_blank" title="Hilfe">(?)</a>';
        }
        notification.message+='<div class="actions"><input class="enableReporting" type="checkbox" value="true"/>'+qx.locale.Manager.tr("Enable reporting on reload")+link+'</div>';

      }
      notification.actions.link.push(
        {
          title: qx.locale.Manager.tr("Report Bug"),
          url: "https://github.com/CometVisu/CometVisu/issues/new?" + qx.util.Uri.toParameter({
            labels: "bug / bugfix",
            title: ex.toString(),
            body: body
          }),
          action: reportAction,
          needsConfirmation: false
        }
      );
      cv.core.notifications.Router.dispatchMessage(notification.topic, notification);
    },

    /**
     * Internal initialization method
     */
    __init: function() {
      qx.event.Registration.addListener(window, 'resize', cv.ui.layout.ResizeHandler.invalidateScreensize, cv.ui.layout.ResizeHandler);
      qx.event.Registration.addListener(window, 'unload', function () {
        cv.io.Client.stopAll();
      }, this);
      qx.bom.Lifecycle.onReady(function () {
        // init notification router
        cv.core.notifications.Router.getInstance();
        var body = qx.bom.Selector.query("body")[0];

        if (cv.Config.enableCache && cv.ConfigCache.isCached()) {
          // load settings
          this.debug("using cache");
          cv.ConfigCache.restore();
          // initialize NotificationCenter
          cv.ui.NotificationCenter.getInstance();
        } else {
          // load empty HTML structure
          qx.bom.element.Attribute.set(body, "html", cv.Application.HTML_STRUCT);
          // initialize NotificationCenter
          cv.ui.NotificationCenter.getInstance();
        }
        var configLoader = new cv.util.ConfigLoader();
        configLoader.load(this.bootstrap, this);
      }, this);
    },

    /**
     * Initialize the content
     * @param xml {Document} XML configuration retrieved from backend
     */
    bootstrap: function(xml) {
      this.debug("bootstrapping");
      var engine = cv.TemplateEngine.getInstance();
      var loader = cv.util.ScriptLoader.getInstance();

      engine.xml = xml;
      loader.addListenerOnce("finished", function() {
        engine.setScriptsLoaded(true);
      }, this);
      if (cv.Config.enableCache && cv.ConfigCache.isCached()) {

        // check if cache is still valid
        if (!cv.ConfigCache.isValid(xml)) {
          this.debug("cache is invalid re-parse xml");
          // cache invalid
          cv.Config.cacheUsed = false;
          cv.ConfigCache.clear();

          // load empty HTML structure
          var body = qx.bom.Selector.query("body")[0];
          qx.bom.element.Attribute.set(body, "html", cv.Application.HTML_STRUCT);

          //empty model
          cv.data.Model.getInstance().resetWidgetDataModel();
          cv.data.Model.getInstance().resetAddressList();
        } else {
          // loaded cache is still valid
          cv.report.Record.logCache();
          cv.Config.cacheUsed = true;
          cv.Config.lazyLoading = true;
          engine.initBackendClient();
          this.__detectInitialPage();

          // load part for structure
          var structure = cv.Config.getStructure();
          this.debug("loading structure "+structure);
          engine.loadParts([structure], function(states) {
            if (states === "complete") {
              this.debug(structure + " has been loaded");
            } else {
              this.error(structure + " could not be loaded");
            }
          }, this);

          engine.addListenerOnce("changeReady", function() {
            // create the objects
            cv.Config.treePath = cv.Config.initialPage;
            var data = cv.data.Model.getInstance().getWidgetData("id_");
            cv.ui.structure.WidgetFactory.createInstance(data.$$type, data);
          }, this);
          // check if the current design settings overrides the cache one
          this.loadPlugins();
          if (cv.Config.clientDesign && cv.Config.clientDesign !== cv.Config.configSettings.clientDesign) {
            // we have to replace the cached design scripts styles to load
            var styles = [];
            cv.Config.configSettings.stylesToLoad.forEach(function(style) {
              styles.push(style.replace("designs/"+cv.Config.configSettings.clientDesign, "designs/"+cv.Config.clientDesign));
            }, this);
            this.loadStyles(styles);

            var scripts = [];
            cv.Config.configSettings.scriptsToLoad.forEach(function(style) {
              scripts.push(style.replace("designs/"+cv.Config.configSettings.clientDesign, "designs/"+cv.Config.clientDesign));
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
        engine.parseXML(xml);
        this.loadPlugins();
        this.loadStyles();
        this.loadScripts();
        this.loadIcons();
        this.debug("done");

        if (cv.Config.enableCache) {
          // cache dom + data when everything is ready
          qx.event.message.Bus.subscribe("setup.dom.finished", function() {
            cv.ConfigCache.dump(xml);
          }, this);
        }
      }
    },

    /**
     * Adds icons which were defined in the current configuration to the {@link cv.IconHandler}
     */
    loadIcons: function() {
      cv.Config.iconsFromConfig.forEach(function(icon) {
        cv.IconHandler.getInstance().insert(icon.name, icon.uri, icon.type, icon.flavour, icon.color, icon.styling, icon.dynamic);
      }, this);
    },

    /**
     * Load CSS styles
     * @param styles {Array?}
     */
    loadStyles: function(styles) {
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
    loadScripts: function(scripts) {
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
    loadPlugins: function() {
      var plugins = cv.Config.configSettings.pluginsToLoad;
      if (plugins.length > 0) {
        this.debug("loading plugins");
        var engine = cv.TemplateEngine.getInstance();
        engine.addListener("changePartsLoaded", function(ev) {
          if (ev.getData() === true) {
            this.debug("plugins loaded");
            qx.event.Timer.once(function() {
              cv.util.ScriptLoader.getInstance().setAllQueued(true);
            }, this, 0);
          }
        }, this);
        var parts = qx.Part.getInstance().getParts();
        var partPlugins = [];
        var standalonePlugins = [];
        var path = qx.util.LibraryManager.getInstance().get('cv', 'resourceUri');
        plugins.forEach(function(plugin) {
          if (parts.hasOwnProperty(plugin)) {
            partPlugins.push(plugin);
          } else {
            standalonePlugins.push(path + "/plugins/" + plugin.replace("plugin-", "") + "/index.js");
          }
        });
        // load part plugins
        engine.loadParts(partPlugins);
        // load script plugins
        cv.util.ScriptLoader.getInstance().addScripts(standalonePlugins);
      } else {
        this.debug("no plugins to load => all scripts queued");
        cv.util.ScriptLoader.getInstance().setAllQueued(true);
      }
    },

    __detectInitialPage: function() {
      var startpage = 'id_';
      if (cv.Config.startpage) {
        startpage = cv.Config.startpage;
        if (typeof(Storage) !== 'undefined') {
          if ('remember' === startpage) {
            startpage = localStorage.getItem('lastpage');
            cv.Config.rememberLastPage = true;
            if ('string' !== typeof( startpage ) || 'id_' !== startpage.substr(0, 3)) {
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
        qx.event.message.Bus.subscribe("setup.dom.finished.before", function() {
          cv.Config.initialPage = cv.TemplateEngine.getInstance().getPageIdByPath(startpage) || "id_";
        });
      }
    }
  }
});
