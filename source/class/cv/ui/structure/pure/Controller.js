/* Controller.js
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

qx.Class.define('cv.ui.structure.pure.Controller', {
  extend: qx.core.Object,
  type: 'singleton',
  implement: cv.ui.structure.IController,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct() {
    super();
    this.__HTML_STRUCT =
      '<div id="top" class="loading"><div class="nav_path">-</div></div><div id="navbarTop" class="loading"></div><div id="centerContainer" class="clearfix"><div id="navbarLeft" class="loading page"></div><div id="main" style="position:relative; overflow: hidden;" class="loading"><div id="pages" style="position:relative;clear:both;"><!-- all pages will be inserted here --></div></div><div id="navbarRight" class="loading page"></div></div><div id="navbarBottom" class="loading"></div><div id="bottom" class="loading"><hr /><div class="footer"></div></div>';
    this.__supportedFeatures = {
      cache: true
    };

    // load basic CSS rules shared by all designs that support this structure
    qx.bom.Stylesheet.includeFile(
      qx.util.ResourceManager.getInstance().toUri('designs/designglobals.css') +
        (cv.Config.forceReload === true ? '?' + Date.now() : '')
    );
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    currentPage: {
      check: 'cv.ui.structure.pure.Page',
      nullable: true,
      event: 'changeCurrentPage'
    },

    renderTarget: {
      check: 'String',
      init: '#pages'
    },

    /**
     * Namespace for path ids
     */
    namespace: {
      check: 'String',
      init: ''
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __supportedFeatures: null,
    __HTML_STRUCT: null,
    main_scroll: null,
    old_scroll: '',
    pagePartsHandler: null,

    getHtmlStructure() {
      return this.__HTML_STRUCT;
    },

    parseBackendSettings(xml) {
      const settings = cv.Config.configSettings;
      const pagesElement = xml.documentElement;
      let defaultBackendName = '';
      if (pagesElement.getAttribute('backend') !== null) {
        settings.backend = pagesElement.getAttribute('backend');
        defaultBackendName = settings.backend;
      } else {
        defaultBackendName = (
          cv.Config.URL.backend ||
          cv.Config.server.backend ||
          'knxd'
        ).split(',')[0];
      }
      if (pagesElement.getAttribute('backend-url') !== null) {
        settings.backendUrl = pagesElement.getAttribute('backend-url');
        this.error(
          'The useage of "backend-url" is deprecated. Please use "backend-knxd-url", "backend-mqtt-url" or "backend-openhab-url" instead.'
        );
      }

      if (pagesElement.getAttribute('backend-knxd-url') !== null) {
        settings.backendKnxdUrl = pagesElement.getAttribute('backend-knxd-url');
        if (!defaultBackendName) {
          defaultBackendName = 'knxd';
        }
      }
      if (pagesElement.getAttribute('backend-mqtt-url') !== null) {
        settings.backendMQTTUrl = pagesElement.getAttribute('backend-mqtt-url');
        if (!defaultBackendName) {
          defaultBackendName = 'mqtt';
        }
      }
      if (pagesElement.getAttribute('backend-iobroker-url') !== null) {
        settings.backendIoBrokerUrl = pagesElement.getAttribute('backend-iobroker-url');
      }
      if (pagesElement.getAttribute('backend-openhab-url') !== null) {
        settings.backendOpenHABUrl = pagesElement.getAttribute('backend-openhab-url');
        if (!defaultBackendName) {
          defaultBackendName = 'openhab';
        }
      }
      if (pagesElement.getAttribute('token') !== null) {
        settings.credentials.token = pagesElement.getAttribute('token');
      }
      if (pagesElement.getAttribute('username') !== null) {
        settings.credentials.username = pagesElement.getAttribute('username');
      }
      if (pagesElement.getAttribute('password') !== null) {
        settings.credentials.password = pagesElement.getAttribute('password');
      }

      // make sure that the default name is the actual type
      if (defaultBackendName === 'default') {
        defaultBackendName = 'knxd';
      }
      if (defaultBackendName) {
        cv.data.Model.getInstance().setDefaultBackendName(defaultBackendName);
      }
      return true;
    },

    login() {
      const clients = cv.io.BackendConnections.getClients();
      let client;
      for (const name in clients) {
        client = clients[name];
        client.login(true, cv.Config.configSettings.credentials, () => {
          this.debug(name + ' logged in');
          cv.io.BackendConnections.startInitialRequest(name);
        });
      }
    },

    parseSettings(xml, done) {
      const settings = cv.Config.configSettings;
      const pagesElement = xml.documentElement;
      settings.screensave_time = pagesElement.getAttribute('screensave_time');
      if (settings.screensave_time) {
        settings.screensave_time = parseInt(settings.screensave_time, 10);
      }
      settings.screensave_page = pagesElement.getAttribute('screensave_page');

      if (pagesElement.getAttribute('max_mobile_screen_width') !== null) {
        settings.maxMobileScreenWidth = pagesElement.getAttribute('max_mobile_screen_width');

        // override config setting
        cv.Config.maxMobileScreenWidth = settings.maxMobileScreenWidth;
      }

      const globalClass = pagesElement.getAttribute('class');
      if (globalClass !== null) {
        document.querySelector('body').classList.add(globalClass);
      }
      if (pagesElement.getAttribute('scroll_speed') === null) {
        settings.scrollSpeed = 400;
      } else {
        settings.scrollSpeed = parseInt(pagesElement.getAttribute('scroll_speed'));
      }
      settings.bindClickToWidget = pagesElement.getAttribute('bind_click_to_widget') === 'true';
      if (pagesElement.getAttribute('default_columns') !== null) {
        settings.defaultColumns = pagesElement.getAttribute('default_columns');
      }
      if (pagesElement.getAttribute('min_column_width') !== null) {
        settings.minColumnWidth = pagesElement.getAttribute('min_column_width');
      }
    },

    async preParse(xml) {
      const settings = cv.Config.configSettings;
      const metaParser = new cv.parser.pure.MetaParser();

      // start with the plugins
      settings.pluginsToLoad = settings.pluginsToLoad.concat(metaParser.parsePlugins(xml));

      // and then the rest
      await metaParser.parse(xml);
      this.debug('pre parsing done');
    },

    /**
     * Generate the UI code from the config file
     * @param xml {XMLDocument} loaded config file
     */
    createUI(xml) {
      cv.util.ScriptLoader.getInstance().addListenerOnce('stylesAndScriptsLoaded', () => {
        cv.ui.structure.pure.layout.ResizeHandler.invalidateScreensize();
      }, this);

      if (!cv.Config.cacheUsed) {
        this.debug('creating pages');
        const page = xml.querySelector('pages > page'); // only one page element allowed...

        this._createPages(page, 'id');
        this.debug('finalizing');
        qx.event.message.Bus.dispatchByName('setup.dom.append');
        this.debug('pages created');
      }
      this.debug('setup.dom.finished');
      qx.event.message.Bus.dispatchByName('setup.dom.finished.before');
      cv.TemplateEngine.getInstance().setDomFinished(true);

      this.login();

      this.initLayout();
    },

    /**
     * Start the parsing process
     * @param page {Element} XML-configuration element
     * @param path {String} internal poth
     * @param flavour {String} inherited flavour
     * @param type {String} page type (text, 2d, 3d)
     */
    _createPages(page, path, flavour, type) {
      cv.parser.pure.WidgetParser.renderTemplates(page);
      let parsedData = cv.parser.pure.WidgetParser.parse(page, path, flavour, type);

      if (!Array.isArray(parsedData)) {
        parsedData = [parsedData];
      }
      let i = 0;
      const l = parsedData.length;
      for (; i < l; i++) {
        const data = parsedData[i];
        const widget = cv.ui.structure.WidgetFactory.createInstance(data.$$type, data);

        // trigger DOM generation
        if (widget) {
          widget.getDomString();
        }
      }
    },

    /**
     * Parse a label from the config file
     * @param label {Element} label xml element
     * @param flavour {String?} flavour name
     * @param labelClass {String?} CSS class name
     * @param style {String?} additional CSS style properties
     */
    parseLabel(label, flavour, labelClass, style) {
      if (!label) {
        return '';
      }
      let ret_val =
        '<div class="' +
        (labelClass !== undefined ? labelClass : 'label') +
        '"' +
        (style ? ' style="' + style + '"' : '') +
        '>';

      Array.prototype.forEach.call(label.childNodes, function (elem) {
        if (elem.nodeType === Node.ELEMENT_NODE && elem.nodeName.toLowerCase() === 'icon') {
          ret_val += cv.IconHandler.getInstance().getIconElement(
            elem.getAttribute('name'),
            elem.getAttribute('type'),
            elem.getAttribute('flavour') || flavour,
            elem.getAttribute('color'),
            elem.getAttribute('styling'),
            '',
            true
          );
        } else if (elem.nodeType === Node.TEXT_NODE) {
          ret_val += elem.textContent;
        }
      });
      return ret_val + '</div>';
    },
    supports(feature, subfeature) {
      if (Object.prototype.hasOwnProperty.call(this.__supportedFeatures, feature)) {
        if (this.__supportedFeatures[feature] === true) {
          if (subfeature) {
            return (
              Object.prototype.hasOwnProperty.call(this.__supportedFeatures[feature], subfeature) &&
              this.__supportedFeatures[feature][subfeature] === true
            );
          }
          return true;
        }
      }
      return false;
    },

    getInitialAddresses(backendName) {
      const startPageAddresses = {};
      const pageWidget = cv.ui.structure.WidgetFactory.getInstanceById(cv.Config.initialPage);

      pageWidget.getChildWidgets().forEach(function (child) {
        const address = child.getAddress ? child.getAddress() : {};
        for (let addr in address) {
          if (Object.prototype.hasOwnProperty.call(address, addr) && addr.backendType === backendName) {
            startPageAddresses[addr] = 1;
          }
        }
      }, this);
      return Object.keys(startPageAddresses);
    },

    initPagePartsHandler() {
      if (!this.pagePartsHandler) {
        this.pagePartsHandler = new cv.ui.structure.pure.navigation.PagePartsHandler();
      }
    },

    initLayout() {
      this.initPagePartsHandler();
      if (!cv.Config.initialPage) {
        this.__detectInitialPage();
      }
      let currentPage = cv.ui.structure.WidgetFactory.getInstanceById(cv.Config.initialPage);

      if (currentPage) {
        this.setCurrentPage(currentPage);
      } else {
        // this page does not exist, fallback to start page
        cv.Config.initialPage = 'id_';
        currentPage = cv.ui.structure.WidgetFactory.getInstanceById(cv.Config.initialPage);
      }

      cv.ui.structure.pure.layout.Manager.adjustColumns();
      cv.ui.structure.pure.layout.Manager.applyColumnWidths('#' + cv.Config.initialPage, true);

      this.main_scroll = new cv.ui.structure.pure.navigation.PageHandler();
      if (this.scrollSpeed !== undefined) {
        this.main_scroll.setSpeed(this.scrollSpeed);
      }

      new qx.util.DeferredCall(function () {
        this.scrollToPage(cv.Config.initialPage, 0);
      }, this).schedule();

      // run the Trick-O-Matic scripts for great SVG backdrops
      document.querySelectorAll('embed').forEach(function (elem) {
        this._runTrickOMatic(elem, 0);
      }, this);

      document.querySelectorAll('.icon').forEach(cv.util.IconTools.fillRecoloredIcon, cv.util.IconTools);
      document.querySelectorAll('.loading').forEach(function (elem) {
        elem.classList.remove('loading');
      }, this);

      qx.core.Init.getApplication().addListener('changeMobile', this._onMobileChanged, this);
    },

    _runTrickOMatic(elem, retries) {
      if (elem && typeof elem.getSVGDocument === 'function') {
        try {
          const svg = elem.getSVGDocument();
          if (svg === null || svg.readyState !== 'complete') {
            elem.onload = cv.ui.TrickOMatic.run;
          } else {
            cv.ui.TrickOMatic.run.call(elem);
          }
        } catch (e) {
          if (e.name === 'NotSupportedError') {
            if (retries <= 5) {
              retries++;
              window.requestAnimationFrame(() => {
                this._runTrickOMatic(elem, retries);
              });
            } else {
              this.error(e);
            }
          } else {
            this.error(e);
          }
        }
      }
    },

    doScreenSave() {
      this.scrollToPage();
    },

    onHistoryRequest(anchor) {
      if (anchor) {
        this.scrollToPage(anchor, 0, true);
      }
    },

    scrollToPage(target, speed, skipHistory) {
      if (undefined === target) {
        target = cv.Config.configSettings.screensave_page;
      }
      const page_id = this.getPageIdByPath(target);
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

      if (cv.Config.rememberLastPage && qx.core.Environment.get('html.storage.local')) {
        localStorage.lastpage = page_id;
      }

      // push new state to history
      if (skipHistory === undefined) {
        const headline = document.querySelectorAll('#' + page_id + ' h1');
        let pageTitle = 'CometVisu';
        if (headline.length) {
          pageTitle = headline[0].textContent + ' - ' + pageTitle;
        }
        qx.bom.History.getInstance().addToHistory(page_id, pageTitle);
      }

      this.main_scroll.seekTo(page_id, speed); // scroll to it

      this.pagePartsHandler.initializeNavbars(page_id);
      this._maintainNavbars();
    },

    _onMobileChanged(ev) {
      const app = qx.core.Init.getApplication();
      if (app.isReady()) {
        cv.ui.structure.pure.layout.ResizeHandler.invalidateNavbar();
        this._maintainNavbars();
      }
    },

    _maintainNavbars() {
      if (qx.core.Init.getApplication().getMobile()) {
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

    /**
     * Reset some values related to the current page
     */
    resetPageValues() {
      this.resetCurrentPage();
      cv.ui.structure.pure.layout.Manager.currentPageUnavailableWidth = -1;
      cv.ui.structure.pure.layout.Manager.currentPageUnavailableHeight = -1;
      cv.ui.structure.pure.layout.Manager.currentPageNavbarVisibility = null;
    },

    async getInitialPageId() {
      if (!cv.Config.initialPage) {
        await this.__detectInitialPage();
      }
      return cv.Config.initialPage;
    },

    async __detectInitialPage() {
      let startpage = 'id_';
      if (cv.Config.startpage) {
        startpage = cv.Config.startpage;
        if (qx.core.Environment.get('html.storage.local') === true) {
          if (startpage === 'remember') {
            startpage = localStorage.getItem('lastpage');
            cv.Config.rememberLastPage = true;
            if (typeof startpage !== 'string' || startpage.substr(0, 3) !== 'id_') {
              startpage = 'id_'; // fix obvious wrong data
            }
          } else if (startpage === 'noremember') {
            localStorage.removeItem('lastpage');
            startpage = 'id_';
            cv.Config.rememberLastPage = false;
          }
        }
      } else {
        const req = qx.util.Uri.parseUri(window.location.href);
        if (req.anchor && req.anchor.substring(0, 3) === 'id_') {
          startpage = req.anchor;
        }
      }
      if (startpage.match(/^id_[0-9_]*$/) !== null) {
        cv.Config.initialPage = startpage;
        return startpage;
      }
      // wait for DOM to be ready and detect the page id then
      return new Promise(resolve => {
        qx.event.message.Bus.subscribe('setup.dom.finished.before', () => {
          cv.Config.initialPage = this.getPageIdByPath(startpage) || 'id_';
          resolve(cv.Config.initialPage);
        });
      });
    },

    /**
     * Returns the id of the page the given path is associated to
     * @param page_name {String}
     * @param path {String}
     * @return {String}
     */
    getPageIdByPath(page_name, path) {
      if (page_name === null) {
        return null;
      }
      if (page_name.match(/^id_[0-9_]*$/) !== null) {
        // already a page_id
        return page_name;
      }
      if (path !== undefined) {
        const scope = this.traversePath(path);
        if (scope === null) {
          // path is wrong
          this.error('path \'' + path + '\' could not be traversed, no page found');

          return null;
        }
        return this.getPageIdByName(page_name, scope);
      }
      return this.getPageIdByName(page_name);
    },

    traversePath(path, root_page_id) {
      let path_scope = null;
      let index = path.indexOf('/');
      if (index >= 1) {
        // skip escaped slashes like \/
        while (path.substr(index - 1, 1) === '\\') {
          const next = path.indexOf('/', index + 1);
          if (next >= 0) {
            index = next;
          }
        }
      }
      //    console.log("traversePath("+path+","+root_page_id+")");
      if (index >= 0) {
        // traverse path one level down
        const path_page_name = path.substr(0, index);
        path_scope = this.getPageIdByName(path_page_name, root_page_id);
        path = path.substr(path_page_name.length + 1);
        path_scope = this.traversePath(path, path_scope);
        //      console.log(path_page_name+"=>"+path_scope);
        return path_scope;
      }
      // bottom path level reached
      path_scope = this.getPageIdByName(path, root_page_id);
      return path_scope;
    },

    getPageIdByName(page_name, scope) {
      let page_id = null;
      if (page_name.match(/^id_[0-9_]*$/) !== null) {
        // already a page_id
        return page_name;
      }
      // find Page-ID by name
      // decode html code (e.g. like &apos; => ')
      page_name = cv.util.String.decodeHtmlEntities(page_name);
      // remove escaped slashes
      page_name = decodeURI(page_name.replace('\\/', '/'));

      //      console.log("Page: "+page_name+", Scope: "+scope);
      const selector = scope !== undefined && scope !== null ? '.page[id^="' + scope + '"] h1' : '.page h1';
      let pages = document.querySelectorAll(selector);
      pages = Array.from(pages).filter(function (h) {
        return h.textContent === page_name;
      });
      if (pages.length > 1 && this.getCurrentPage() !== null) {
        const currentPageId = this.getCurrentPage().getPath();
        // More than one Page found -> search in the current pages descendants first
        let fallback = true;
        pages.some(function (page) {
          const p = cv.util.Tree.getClosest(page, '.page');
          if (page.innerText === page_name) {
            const pid = p.getAttribute('id');
            if (pid.length < currentPageId.length) {
              // found pages path is shorter the the current pages -> must be an ancestor
              if (currentPageId.indexOf(pid) === 0) {
                // found page is an ancestor of the current page -> we take this one
                page_id = pid;
                fallback = false;
                //break loop
                return true;
              }
            } else if (pid.indexOf(currentPageId) === 0) {
              // found page is an descendant of the current page -> we take this one
              page_id = pid;
              fallback = false;
              //break loop
              return true;
            }
          }
          return false;
        }, this);
        if (fallback) {
          // take the first page that fits (old behaviour)
          pages.some(function (page) {
            if (page.innerText === page_name) {
              page_id = cv.util.Tree.getClosest(page, '.page').getAttribute('id');

              // break loop
              return true;
            }
            return false;
          });
        }
      } else {
        pages.some(function (page) {
          if (page.innerText === page_name) {
            page_id = cv.util.Tree.getClosest(page, '.page').getAttribute('id');
            // break loop
            return true;
          }
          return false;
        });
      }

      if (page_id !== null && page_id.match(/^id_[0-9_]*$/) !== null) {
        return page_id;
      }
      // not found
      return null;
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    qx.core.Init.getApplication().removeListener('changeMobile', this._onMobileChanged, this);
  },

  defer(statics) {
    cv.Application.structureController = statics.getInstance();
  }
});
