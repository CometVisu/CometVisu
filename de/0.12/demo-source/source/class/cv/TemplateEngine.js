/* TemplateEngine.js 
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
 *
 */
qx.Class.define('cv.TemplateEngine', {
  extend: qx.core.Object,
  type: "singleton",

  construct: function() {
    // this.base(arguments);
    this.pagePartsHandler = new cv.ui.PagePartsHandler();

    this.__partQueue = new qx.data.Array();
    this._domFinishedQueue = [];
    this.__partQueue.addListener("changeLength", function(ev) {
      this.setPartsLoaded(ev.getData() === 0);
    }, this);

    this.defaults = {widget: {}, plugin: {}};
    var group = new qx.ui.command.Group();
    this.setCommands(group);
    var app = qx.core.Init.getApplication();
    if (app) {
      // application is not available in tests
      var manager = app.getCommandManager();
      manager.add(group);
      manager.setActive(group);
    }
  },

  properties: {

    /**
     * Shows the loading state of the parts
     */
    partsLoaded: {
      check: "Boolean",
      init: false,
      apply: "_applyLoaded",
      event: "changePartsLoaded"
    },

    /**
     * Shows the loading state of the scripts
     */
    scriptsLoaded: {
      check: "Boolean",
      init: false,
      apply: "_applyLoaded"
    },

    /**
     * Shows the initialization state of the TemplateEngine. It gets until when all
     * external stuff (pars, scripts, etc.) has been loaded.
     */
    ready: {
      check: "Boolean",
      init: false,
      event: "changeReady",
      apply: "_applyReady"
    },

    currentPage: {
      check: "cv.ui.structure.IPage",
      nullable: true,
      event: "changeCurrentPage"
    },

    domFinished: {
      check: "Boolean",
      init: false,
      apply: "_applyDomFinished",
      event: "changeDomFinished"
    },

    commands: {
      check: "qx.ui.command.Group",
      nullable: true
    }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    pagePartsHandler: null,
    // if true the whole widget reacts on click events
    // if false only the actor in the widget reacts on click events
    bindClickToWidget : false,
    /**
     * Structure where a design can set a default value that a widget or plugin
     * can use.
     * This is especially important for design relevant information like colors
     * that can not be set though CSS.
     *
     * Usage: this.defaults.plugin.foo = {bar: 'baz'};
     */
    defaults : null,

    main_scroll : null,
    old_scroll : '',
    visu : null,

    pluginsToLoadCount : 0,
    xml : null,

    __partQueue: null,
    _domFinishedQueue: null,

    // plugins that do not need to be loaded to proceed with the initial setup
    lazyPlugins: ["plugin-openhab"],

    /**
     * Load parts (e.g. plugins, structure)
     *
     * @param parts {String[]|String} parts to load
     */
    loadParts: function(parts) {
      if (!Array.isArray(parts)) {
        parts = [parts];
      }
      var loadLazyParts = this.lazyPlugins.filter(function(part) {
        return parts.indexOf(part) >= 0;
      });
      if (loadLazyParts.length) {
        parts = parts.filter(function(p){return !loadLazyParts.includes(p);});
      }
      this.__partQueue.append(parts);
      qx.io.PartLoader.require(parts, function(states) {
        parts.forEach(function(part, idx) {
          if (states[idx] === "complete") {
            this.__partQueue.remove(part);
            this.debug("successfully loaded part "+part);
            if (part.startsWith('structure-')) {
              qx.core.Init.getApplication().setStructureLoaded(true);
            }
          } else {
            this.error("error loading part "+part);
          }
        }, this);
      }, this);

      // load the lazy plugins no one needs to wait for
      qx.io.PartLoader.require(loadLazyParts, function(states) {
        loadLazyParts.forEach(function(part, idx) {
          if (states[idx] === "complete") {
            this.debug("successfully loaded part "+part);
          } else {
            this.error("error loading part "+part);
          }
        }, this);
      }, this);
    },

    // property apply
    _applyReady: function(value) {
      if (value === true) {
        this.setupPage();
      }
    },

    // property apply
    _applyLoaded: function(value, old, name) {
      this.debug(name+" is "+value+" now");
      if (this.isPartsLoaded() && this.isScriptsLoaded()) {
        this.setReady(true);
      }
    },

    // property apply
    _applyDomFinished: function(value) {
      if (value) {
        qx.event.message.Bus.dispatchByName("setup.dom.finished");
        // flush the queue
        this._domFinishedQueue.forEach(function(entry) {
          var callback = entry.shift();
          var context = entry.shift();
          callback.apply(context, entry);
        }, this);
        this._domFinishedQueue = [];
      }
    },

    /**
     * Adds a callback to a queue which is executed after DOM has been rendered
     * @param callback {Function}
     * @param context {Object}
     */
    executeWhenDomFinished: function(callback, context) {
      if (!this.isDomFinished()) {
        // queue callback
        this._domFinishedQueue.push(Array.prototype.slice.call(arguments));
      } else {
        callback.apply(context, Array.prototype.slice.call(arguments, 2));
      }
    },

    /**
     * Please use {cv.data.Model.getInstance().addAddress()} instead
     * @deprecated {0.11.0} Please use {cv.data.Model.getInstance().addAddress()} instead
     */
    addAddress: function (address, id) {
      this.warn("addAddress is deprecated! Please use cv.data.Model.getInstance().addAddress() instead");
      cv.data.Model.getInstance().addAddress(address, id);
    },

    /**
     * Please use {cv.data.Model.getInstance().getAddresses()} instead
     * @deprecated {0.11.0} Please use {cv.data.Model.getInstance().getAddresses()} instead
     */
    getAddresses: function () {
      this.warn("getAddresses is deprecated! Please use cv.data.Model.getInstance().getAddresses() instead");
      return cv.data.Model.getInstance().getAddresses();
    },

    /**
     * Initialize the {@link cv.io.Client} for backend communication
     */
    initBackendClient: function () {
      var backendName = cv.Config.configSettings.backend || cv.Config.backend;
      if (backendName === "oh") {
        this.visu = cv.Application.createClient('openhab', cv.Config.backendUrl);
      }
      else if (backendName === "oh2") {
        this.visu = cv.Application.createClient('openhab2', cv.Config.backendUrl);
      } else {
        this.visu = cv.Application.createClient(backendName, cv.Config.backendUrl);
      }

      var model = cv.data.Model.getInstance();
      this.visu.update = model.update.bind(model); // override clients update function
      if (cv.Config.reporting) {
        var recordInstance = cv.report.Record.getInstance();
        this.visu.record = function(p,d){recordInstance.record.apply(recordInstance,[cv.report.Record.BACKEND,p,d]);};
      }
      this.visu.showError = this._handleClientError.bind(this);
      this.visu.user = 'demo_user'; // example for setting a user

      // show connection state in NotificationCenter
      this.visu.addListener("changeConnected", function(ev) {
        var message = {
          topic: "cv.client.connection",
          title: qx.locale.Manager.tr("Connection error"),
          severity: "urgent",
          unique: true,
          deletable: false,
          condition: !ev.getData()
        };
        var lastError = this.visu.getLastError();
        if (!ev.getData()) {
          if (lastError && (Date.now() - lastError.time) < 100) {
            message.message = qx.locale.Manager.tr("Error requesting %1: %2 - %3.", lastError.url, lastError.code, lastError.text);
          } else {
            message.message = qx.locale.Manager.tr("Connection to backend is lost.");
          }
        }
        cv.core.notifications.Router.dispatchMessage(message.topic, message);
      }, this);
    },

    _handleClientError: function (errorCode, varargs) {
      varargs = Array.prototype.slice.call(arguments, 1);
      var notification;
      var message = '';
      switch (errorCode) {
        case cv.io.Client.ERROR_CODES.PROTOCOL_MISSING_VERSION:
          notification = {
            topic: "cv.error",
            title: qx.locale.Manager.tr('CometVisu protocol error'),
            message:  qx.locale.Manager.tr('The backend did send an invalid response to the %1Login%2 request: missing protocol version.',
              '<a href="https://github.com/CometVisu/CometVisu/wiki/Protocol#Login" target="_blank">',
              '</a>') + '<br/>' +
              qx.locale.Manager.tr('Please try to fix the problem in the backend.') +
            '<br/><br/><strong>' + qx.locale.Manager.tr('Backend-Response:') + '</strong><pre>' + JSON.stringify(varargs[0], null, 2) +'</pre></div>',
            severity: "urgent",
            unique: true,
            deletable: false
          };
          break;

        case cv.io.Client.ERROR_CODES.PROTOCOL_INVALID_READ_RESPONSE_MISSING_I:
          notification = {
            topic: "cv.error",
            title: qx.locale.Manager.tr('CometVisu protocol error'),
            message:  qx.locale.Manager.tr('The backend did send an invalid response to a %1read%2 request: Missing "i" value.',
              '<a href="https://github.com/CometVisu/CometVisu/wiki/Protocol#Login" target="_blank">',
              '</a>') + '<br/>' +
              qx.locale.Manager.tr('Please try to fix the problem in the backend.') +
              '<br/><br/><strong>' + qx.locale.Manager.tr('Backend-Response:') + '</strong><pre>' + JSON.stringify(varargs[0], null, 2) +'</pre></div>',
            severity: "urgent",
            unique: true,
            deletable: false
          };
          break;
      }
      if (notification) {
        cv.core.notifications.Router.dispatchMessage(notification.topic, notification);
      }
    },

    /**
     * Reset some values related to the current page
     */
    resetPageValues: function () {
      this.resetCurrentPage();
      cv.ui.layout.Manager.currentPageUnavailableWidth = -1;
      cv.ui.layout.Manager.currentPageUnavailableHeight = -1;
      cv.ui.layout.Manager.currentPageNavbarVisibility = null;
    },

    /**
     * Read basic settings and meta-section from config document
     * @param loaded_xml {Document} XML-configuration document
     * @param done {Function} callback that is called when the parsing has finished
     */
    parseXML: function (loaded_xml, done) {
      /*
       * First, we try to get a design by url. Secondly, we try to get a predefined
       */
      // read predefined design in config
      var settings = cv.Config.configSettings;
      var pagesNode = loaded_xml.querySelector("pages");

      var predefinedDesign = pagesNode.getAttribute("design");
      // design by url
      // design by config file
      if (!cv.Config.clientDesign && !settings.clientDesign) {
        if (predefinedDesign) {
          settings.clientDesign = predefinedDesign;
        }
        // selection dialog
        else {
          this.selectDesign();
        }
      }

      // load structure-part
      this.loadParts([cv.Config.getStructure()]);

      if (pagesNode.getAttribute("backend") !== null) {
        settings.backend = pagesNode.getAttribute("backend");
      }
      this.initBackendClient();

      if (pagesNode.getAttribute('scroll_speed') === null) {
        settings.scrollSpeed = 400;
      } else {
        settings.scrollSpeed = parseInt(pagesNode.getAttribute('scroll_speed'));
      }

      if (pagesNode.getAttribute('bind_click_to_widget') !== null) {
        settings.bindClickToWidget = pagesNode.getAttribute('bind_click_to_widget') === "true";
      }
      if (pagesNode.getAttribute('default_columns') !== null) {
        settings.defaultColumns = pagesNode.getAttribute('default_columns');
      }
      if (pagesNode.getAttribute('min_column_width') !== null) {
        settings.minColumnWidth = pagesNode.getAttribute('min_column_width');
      }
      settings.screensave_time = pagesNode.getAttribute('screensave_time');
      if (settings.screensave_time) {
        settings.screensave_time = parseInt(settings.screensave_time, 10);
      }
      settings.screensave_page = pagesNode.getAttribute('screensave_page');

      if (pagesNode.getAttribute('max_mobile_screen_width') !== null) {
        settings.maxMobileScreenWidth = pagesNode.getAttribute('max_mobile_screen_width');
      }

      var globalClass = pagesNode.getAttribute('class');
      if (globalClass !== null) {
        document.querySelector('body').classList.add(globalClass);
      }

      settings.scriptsToLoad = [];
      settings.stylesToLoad = [];
      var design = cv.Config.getDesign();
      if (design) {
        var baseUri = 'designs/' + design;
        settings.stylesToLoad.push(baseUri + '/basic.css');
        this.debug('cv.Config.mobileDevice: ' + cv.Config.mobileDevice);
        if (cv.Config.mobileDevice) {
          settings.stylesToLoad.push(baseUri + '/mobile.css');
          document.querySelector('body').classList.add('mobile');
        }
        settings.stylesToLoad.push(baseUri + '/custom.css');
        settings.scriptsToLoad.push('designs/' + design + '/design_setup.js');

        cv.util.ScriptLoader.getInstance().addListenerOnce("designError", function(ev) {
          if (ev.getData() === design) {
            this.error('Failed to load "'+design+'" design! Falling back to simplified "pure"');

            baseUri = 'designs/pure';
            var alternativeStyles = [baseUri+'/basic.css'];
            if (cv.Config.mobileDevice) {
              alternativeStyles.push(baseUri+'/mobile.css');
            }
            alternativeStyles.push(baseUri+'/custom.css');
            cv.util.ScriptLoader.getInstance().addStyles( alternativeStyles );
            cv.util.ScriptLoader.getInstance().addScripts(baseUri+"/design_setup.js");
          }
        }, this);
      }
      var metaParser = new cv.parser.MetaParser();

      // start with the plugins
      settings.pluginsToLoad = settings.pluginsToLoad.concat(metaParser.parsePlugins(loaded_xml));
      // and then the rest
      metaParser.parse(loaded_xml, done);
      this.debug("parsed");
    },

    /**
     * Main setup to get everything running and show the initial page.
     */
    setupPage: function () {
      // and now setup the pages
      this.debug("setup");

      // login to backend as it might change some settings needed for further processing
      this.visu.login(true, function () {
        this.debug("logged in");

        // as we are sure that the default CSS were loaded now:
        document.querySelectorAll('link[href*="mobile.css"]').forEach(function (elem) {
        });
        if (!cv.Config.cacheUsed) {
          this.debug("creating pages");
          var page = this.xml.querySelector('pages > page'); // only one page element allowed...

          this.createPages(page, 'id');
          this.debug("finalizing");
          qx.event.message.Bus.dispatchByName("setup.dom.append");
          this.debug("pages created");
        }
        this.debug("setup.dom.finished");
        qx.event.message.Bus.dispatchByName("setup.dom.finished.before");
        this.setDomFinished(true);

        var currentPage = cv.ui.structure.WidgetFactory.getInstanceById(cv.Config.initialPage);
        if (currentPage) {
          this.setCurrentPage(currentPage);
        }
        cv.ui.layout.Manager.adjustColumns();
        cv.ui.layout.Manager.applyColumnWidths('#'+cv.Config.initialPage, true);

        this.main_scroll = new cv.ui.PageHandler();
        if (this.scrollSpeed !== undefined) {
          this.main_scroll.setSpeed(this.scrollSpeed);
        }

        new qx.util.DeferredCall(function() {
          this.scrollToPage(cv.Config.initialPage, 0);
        }, this).schedule();

        // reaction on browser back button
        qx.bom.History.getInstance().addListener("request", function(e) {
          var lastPage = e.getData();
          if (lastPage) {
            this.scrollToPage(lastPage, 0, true);
          }
        }, this);

        // run the Trick-O-Matic scripts for great SVG backdrops
        document.querySelectorAll('embed').forEach(function(elem) {
          elem.onload = cv.ui.TrickOMatic.run;
        });

        this.startInitialRequest();

        this.xml = null; // not needed anymore - free the space

        document.querySelectorAll('.icon').forEach(cv.util.IconTools.fillRecoloredIcon, cv.util.IconTools);
        document.querySelectorAll('.loading').forEach(function(elem) {
          elem.classList.remove('loading');
        }, this);

        this.startScreensaver();
        if (qx.core.Environment.get("qx.aspects")) {
          qx.dev.Profile.stop();
          qx.dev.Profile.showResults(50);
        }
      }, this);
    },

    /**
     * Start the screensaver if a screensave time is set
     */
    startScreensaver: function() {
      if (typeof cv.Config.configSettings.screensave_time === 'number') {
        this.screensave = new qx.event.Timer(cv.Config.configSettings.screensave_time * 1000);
        this.screensave.addListener("interval", function () {
          this.scrollToPage();
        }, this);
        this.screensave.start();
        qx.event.Registration.addListener(window, "useraction", this.screensave.restart, this.screensave);
      }
    },

    /**
     * Start retrieving data from backend
     */
    startInitialRequest: function() {
      if (qx.core.Environment.get("qx.debug")) {
        cv.report.Replay.start();
      }
      if (cv.Config.enableAddressQueue) {
        // identify addresses on startpage
        var startPageAddresses = {};
        var pageWidget = cv.ui.structure.WidgetFactory.getInstanceById(cv.Config.initialPage);
        pageWidget.getChildWidgets().forEach(function(child) {
          var address = child.getAddress ? child.getAddress() : {};
          for (var addr in address) {
            if (address.hasOwnProperty(addr)) {
              startPageAddresses[addr] = 1;
            }
          }
        }, this);
        this.visu.setInitialAddresses(Object.keys(startPageAddresses));
      }
      var addressesToSubscribe = cv.data.Model.getInstance().getAddresses();
      if (0 !== addressesToSubscribe.length) {
        this.visu.subscribe(addressesToSubscribe);
      }
    },

    /**
     * Start the parsing process
     * @param page {Element} XML-configuration element
     * @param path {String} internal poth
     * @param flavour {String} inherited flavour
     * @param type {String} page type (text, 2d, 3d)
     */
    createPages: function (page, path, flavour, type) {
      cv.parser.WidgetParser.renderTemplates(page);
      var parsedData = cv.parser.WidgetParser.parse(page, path, flavour, type);
      if (!Array.isArray(parsedData)) {
        parsedData = [parsedData];
      }
      for (var i = 0, l = parsedData.length; i < l; i++) {
        var data = parsedData[i];
        var widget = cv.ui.structure.WidgetFactory.createInstance(data.$$type, data);

        // trigger DOM generation
        if (widget) { widget.getDomString(); }
      }
    },

    /**
     * Returns the id of the page the given path is associated to
     * @param page_name {String}
     * @param path {String}
     * @return {String}
     */
    getPageIdByPath: function (page_name, path) {
      if (page_name === null) { return null; }
      if (page_name.match(/^id_[0-9_]*$/) !== null) {
        // already a page_id
        return page_name;
      } else {
        if (path !== undefined) {
          var scope = this.traversePath(path);
          if (scope === null) {
            // path is wrong
            this.error("path '" + path + "' could not be traversed, no page found");
            return null;
          }
          return this.getPageIdByName(page_name, scope);
        } else {
          return this.getPageIdByName(page_name);
        }
      }
    },

    traversePath: function (path, root_page_id) {
      var path_scope = null;
      var index = path.indexOf("/");
      if (index >= 1) {
        // skip escaped slashes like \/
        while (path.substr(index - 1, 1) === "\\") {
          var next = path.indexOf("/", index + 1);
          if (next >= 0) {
            index = next;
          }
        }
      }
      //    console.log("traversePath("+path+","+root_page_id+")");
      if (index >= 0) {
        // traverse path one level down
        var path_page_name = path.substr(0, index);
        path_scope = this.getPageIdByName(path_page_name, root_page_id);
        path = path.substr(path_page_name.length + 1);
        path_scope = this.traversePath(path, path_scope);
        //      console.log(path_page_name+"=>"+path_scope);
        return path_scope;
      } else {
        // bottom path level reached
        path_scope = this.getPageIdByName(path, root_page_id);
        return path_scope;
      }
    },

    getPageIdByName: function (page_name, scope) {
      var page_id = null;
      if (page_name.match(/^id_[0-9_]*$/) !== null) {
        // already a page_id
        return page_name;
      } else {
        // find Page-ID by name
        // decode html code (e.g. like &apos; => ')
        page_name = cv.util.String.decodeHtmlEntities(page_name);
        // remove escaped slashes
        page_name = decodeURI(page_name.replace("\\\/", "/"));

        //      console.log("Page: "+page_name+", Scope: "+scope);
        var selector = (scope !== undefined && scope !== null) ? '.page[id^="' + scope + '"] h1' : '.page h1';
        var pages = document.querySelectorAll(selector);
        pages = Array.from( pages ).filter(function(h){return h.textContent === page_name;});
        if (pages.length > 1 && this.getCurrentPage() !== null) {
          var currentPageId = this.getCurrentPage().getPath();
          // More than one Page found -> search in the current pages descendants first
          var fallback = true;
          pages.forEach(function (page) {
            var p = cv.util.Tree.getClosest(page, ".page");
            if (page.innerText === page_name) {
              var pid = p.getAttribute('id');
              if (pid.length < currentPageId.length) {
                // found pages path is shorter the the current pages -> must be an ancestor
                if (currentPageId.indexOf(pid) === 0) {
                  // found page is an ancestor of the current page -> we take this one
                  page_id = pid;
                  fallback = false;
                  //break loop
                  return false;
                }
              } else {
                if (pid.indexOf(currentPageId) === 0) {
                  // found page is an descendant of the current page -> we take this one
                  page_id = pid;
                  fallback = false;
                  //break loop
                  return false;
                }
              }
            }
          }, this);
          if (fallback) {
            // take the first page that fits (old behaviour)
            pages.forEach(function (page) {
              if (page.innerText  === page_name) {
                page_id = cv.util.Tree.getClosest(page, ".page").getAttribute("id");
                // break loop
                return false;
              }
            });
          }
        } else {
          pages.forEach(function (page) {
            if (page.innerText === page_name) {
              page_id = cv.util.Tree.getClosest(page, ".page").getAttribute("id");
              // break loop
              return false;
            }
          });
        }
      }
      if (page_id !== null && page_id.match(/^id_[0-9_]*$/) !== null) {
        return page_id;
      } else {
        // not found
        return null;
      }
    },

    scrollToPage: function (target, speed, skipHistory) {
      if (undefined === target) {
        target = cv.Config.configSettings.screensave_page;
      }
      var page_id = this.getPageIdByPath(target);
      if (page_id === null) {
        return;
      }
      if (cv.Config.currentPageId === page_id) {
        return;
      }
      cv.Config.currentPageId = page_id;
      cv.Config.treePath = page_id;

      if (undefined === speed) {
        speed = cv.Config.configSettings.scrollSpeed;
      }

      if (cv.Config.rememberLastPage && qx.core.Environment.get("html.storage.local")) {
        localStorage.lastpage = page_id;
      }

      // push new state to history
      if (skipHistory === undefined) {
        var headline = document.querySelectorAll("#"+page_id+" h1");
        var pageTitle = "CometVisu";
        if (headline.length) {
          pageTitle = headline[0].textContent+ " - "+pageTitle;
        }
        qx.bom.History.getInstance().addToHistory(page_id, pageTitle);
      }

      this.main_scroll.seekTo(page_id, speed); // scroll to it

      this.pagePartsHandler.initializeNavbars(page_id);
      if (cv.Config.mobileDevice) {
        switch (this.pagePartsHandler.navbars.left.dynamic) {
          case null:
          case true:
            this.pagePartsHandler.fadeNavbar('Left', 'out', 0);
            break;

          case false:
            this.pagePartsHandler.fadeNavbar('Left', 'in', 0);
        }
      } else {
        this.pagePartsHandler.fadeNavbar('Left', 'in', 0);
      }
    },

    selectDesign: function () {
      var body = document.querySelector("body");

      document.querySelectorAll('body > *').forEach(function(elem) {
        elem.style.display = 'none';
      }, this);
      body.style['background-color'] = "black";


      var div = qx.dom.Element.create("div", {id: "designSelector"});
      Object.entries({
        background: "#808080",
        width: "400px",
        color: "white",
        margin: "auto",
        padding: "0.5em"
      }).forEach(function(key_value){body.style[key_value[0]]=key_value[1];});
      div.innerHTML = "Loading ...";

      body.appendChild(div);

      var store = new qx.data.store.Json(qx.util.ResourceManager.getInstance().toUri("designs/get_designs.php"));

      store.addListener("loaded", function () {
        var html = "<h1>Please select design</h1>";
        html += "<p>The Location/URL will change after you have chosen your design. Please bookmark the new URL if you do not want to select the design every time.</p>";

        div.innerHTML = html;

        store.getModel().forEach(function(element) {

          var myDiv = qx.dom.Element.create("div", {
            cursor: "pointer",
            padding: "0.5em 1em",
            borderBottom: "1px solid black",
            margin: "auto",
            width: "262px",
            position: "relative"
          });

          myDiv.innerHTML = "<div style=\"font-weight: bold; margin: 1em 0 .5em;\">Design: " + element + "</div>";
          myDiv.innerHTML += "<iframe src=\""+qx.util.ResourceManager.getInstance().toUri("designs/design_preview.html")+"?design=" + element + "\" width=\"160\" height=\"90\" border=\"0\" scrolling=\"auto\" frameborder=\"0\" style=\"z-index: 1;\"></iframe>";
          myDiv.innerHTML += "<img width=\"60\" height=\"30\" src=\""+qx.util.ResourceManager.getInstance().toUri("demo/media/arrow.png")+"\" alt=\"select\" border=\"0\" style=\"margin: 60px 10px 10px 30px;\"/>";

          div.appendChild(myDiv);


          var tDiv = qx.dom.Element.create("div", {
            background: "transparent",
            position: "absolute",
            height: "90px",
            width: "160px",
            zIndex: 2
          });
          var pos = document.querySelector("iframe").getBoundingClientRect();
          Object.entries({
            left: pos.left + "px",
            top: pos.top + "px"
          }).forEach(function(key_value){tDiv.style[key_value[0]]=key_value[1];});
          myDiv.appendChild(tDiv);

          qx.event.Registration.addListener(myDiv, 'pointerover', function() {
            myDiv.style.background = "#bbbbbb";
          }, this);

          qx.event.Registration.addListener(myDiv, 'pointerout', function() {
            myDiv.style.background = "transparent";
          }, this);

          qx.event.Registration.addListener(myDiv, 'tap', function() {
            var href = document.location.href;
            if (document.location.hash) {
              href = href.split('#')[0];
            }
            if (document.location.search === "") {
              document.location.href = href + "?design=" + element;
            } else {
              document.location.href = href + "&design=" + element;
            }
          });
        });
      });
    }
  }
});