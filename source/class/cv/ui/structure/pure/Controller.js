qx.Class.define('cv.ui.structure.pure.Controller', {
  extend: qx.core.Object,
  type: 'singleton',
  implement: cv.ui.structure.IController,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this.__HTML_STRUCT = '<div id="top" class="loading"><div class="nav_path">-</div></div><div id="navbarTop" class="loading"></div><div id="centerContainer"><div id="navbarLeft" class="loading page"></div><div id="main" style="position:relative; overflow: hidden;" class="loading"><div id="pages" style="position:relative;clear:both;"><!-- all pages will be inserted here --></div></div><div id="navbarRight" class="loading page"></div></div><div id="navbarBottom" class="loading"></div><div id="bottom" class="loading"><hr /><div class="footer"></div></div>';
    this.__supportedFeatures = {
      navbar: {
        top: true,
          right: true,
          bottom: true,
          left: true
      },
      statusBar: true,
      plugins: true
    };
    // load basic CSS rules shared by all designs that support this structure
    qx.bom.Stylesheet.includeFile(qx.util.ResourceManager.getInstance().toUri('designs/designglobals.css') + (cv.Config.forceReload === true ? '?'+Date.now() : ''));
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
    main_scroll : null,
    old_scroll : '',
    pagePartsHandler: null,

    getHtmlStructure() {
      return this.__HTML_STRUCT;
    },

    parseSettings(xml, done) {
      const settings = cv.Config.configSettings;
      const pagesElement = xml.documentElement;
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

      this.initLayout();
    },

    /**
     * Start the parsing process
     * @param page {Element} XML-configuration element
     * @param path {String} internal poth
     * @param flavour {String} inherited flavour
     * @param type {String} page type (text, 2d, 3d)
     */
    _createPages: function (page, path, flavour, type) {
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
      let ret_val = '<div class="' + (labelClass !== undefined ? labelClass : 'label') + '"' +
        (style ? (' style="' + style + '"') : '') + '>';

      Array.prototype.forEach.call(label.childNodes, function (elem) {
        if (elem.nodeType === Node.ELEMENT_NODE && elem.nodeName.toLowerCase() === 'icon') {
          ret_val += cv.IconHandler.getInstance().getIconText(
            elem.getAttribute('name'),
            elem.getAttribute('type'),
            elem.getAttribute('flavour') || flavour,
            elem.getAttribute('color'),
            elem.getAttribute('styling'));
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
            return Object.prototype.hasOwnProperty.call(this.__supportedFeatures[feature], subfeature) && this.__supportedFeatures[feature][subfeature] === true;
          }
          return true;
        }
      }
      return false;
    },

    getInitialAddresses() {
      const startPageAddresses = {};
      const pageWidget = cv.ui.structure.WidgetFactory.getInstanceById(cv.Config.initialPage);
      pageWidget.getChildWidgets().forEach(function(child) {
        const address = child.getAddress ? child.getAddress() : {};
        for (let addr in address) {
          if (Object.prototype.hasOwnProperty.call(address, addr)) {
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
      const currentPage = cv.ui.structure.WidgetFactory.getInstanceById(cv.Config.initialPage);
      if (currentPage) {
        this.setCurrentPage(currentPage);
      }

      cv.ui.structure.pure.layout.Manager.adjustColumns();
      cv.ui.structure.pure.layout.Manager.applyColumnWidths('#'+cv.Config.initialPage, true);

      this.main_scroll = new cv.ui.structure.pure.navigation.PageHandler();
      if (this.scrollSpeed !== undefined) {
        this.main_scroll.setSpeed(this.scrollSpeed);
      }

      new qx.util.DeferredCall(function() {
        this.scrollToPage(cv.Config.initialPage, 0);
      }, this).schedule();

      // reaction on browser back button
      qx.bom.History.getInstance().addListener('request', function(e) {
        const lastPage = e.getData();
        if (lastPage) {
          this.scrollToPage(lastPage, 0, true);
        }
      }, this);

      // run the Trick-O-Matic scripts for great SVG backdrops
      document.querySelectorAll('embed').forEach(function(elem) {
        elem.onload = cv.ui.TrickOMatic.run;
      });

      document.querySelectorAll('.icon').forEach(cv.util.IconTools.fillRecoloredIcon, cv.util.IconTools);
      document.querySelectorAll('.loading').forEach(function(elem) {
        elem.classList.remove('loading');
      }, this);

      qx.core.Init.getApplication().addListener('changeMobile', this._maintainNavbars, this);
    },

    doScreenSave() {
      this.scrollToPage();
    },

    scrollToPage (target, speed, skipHistory) {
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
          pageTitle = headline[0].textContent+ ' - '+pageTitle;
        }
        qx.bom.History.getInstance().addToHistory(page_id, pageTitle);
      }

      this.main_scroll.seekTo(page_id, speed); // scroll to it

      this.pagePartsHandler.initializeNavbars(page_id);
      this._maintainNavbars();
    },

    _maintainNavbars: function () {
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
    resetPageValues: function () {
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
            if (typeof (startpage) !== 'string' || startpage.substr(0, 3) !== 'id_') {
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
    getPageIdByPath: function (page_name, path) {
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

    traversePath: function (path, root_page_id) {
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

    getPageIdByName: function (page_name, scope) {
      let page_id = null;
      if (page_name.match(/^id_[0-9_]*$/) !== null) {
        // already a page_id
        return page_name;
      }
      // find Page-ID by name
      // decode html code (e.g. like &apos; => ')
      page_name = cv.util.String.decodeHtmlEntities(page_name);
      // remove escaped slashes
      page_name = decodeURI(page_name.replace('\\\/', '/'));

      //      console.log("Page: "+page_name+", Scope: "+scope);
      const selector = (scope !== undefined && scope !== null) ? '.page[id^="' + scope + '"] h1' : '.page h1';
      let pages = document.querySelectorAll(selector);
      pages = Array.from(pages).filter(function(h) {
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
  destruct: function () {
    qx.core.Init.getApplication().removeListener('changeMobile', this._maintainNavbars, this);
  },

  defer: function (statics) {
    cv.Application.structureController = statics.getInstance();
  }
});
