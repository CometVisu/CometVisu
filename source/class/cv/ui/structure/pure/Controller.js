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
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    currentPage: {
      check: 'cv.ui.structure.IPage',
      nullable: true,
      event: 'changeCurrentPage'
    },

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

    initLayout() {
      if (!this.pagePartsHandler) {
        this.pagePartsHandler = new cv.ui.structure.pure.navigation.PagePartsHandler();
      }
      this.__detectInitialPage();
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
    },

    scrollToPage: function (target, speed, skipHistory) {
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


    /**
     * Reset some values related to the current page
     */
    resetPageValues: function () {
      this.resetCurrentPage();
      cv.ui.structure.pure.layout.Manager.currentPageUnavailableWidth = -1;
      cv.ui.structure.pure.layout.Manager.currentPageUnavailableHeight = -1;
      cv.ui.structure.pure.layout.Manager.currentPageNavbarVisibility = null;
    },

    __detectInitialPage: function() {
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
      } else {
        // wait for DOM to be ready and detect the page id then
        qx.event.message.Bus.subscribe('setup.dom.finished.before', function() {
          cv.Config.initialPage = this.getPageIdByPath(startpage) || 'id_';
        });
      }
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
    },

  },

  defer: function (statics) {
    cv.Application.structureController = statics.getInstance();
  }
});
