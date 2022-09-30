function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "cv.ui.structure.IController": {
        "require": true
      },
      "qx.bom.Stylesheet": {
        "construct": true
      },
      "qx.util.ResourceManager": {
        "construct": true
      },
      "cv.Config": {
        "construct": true
      },
      "cv.io.BackendConnections": {},
      "cv.parser.pure.MetaParser": {},
      "qx.event.message.Bus": {},
      "cv.TemplateEngine": {},
      "cv.parser.pure.WidgetParser": {},
      "cv.ui.structure.WidgetFactory": {},
      "cv.IconHandler": {},
      "cv.ui.structure.pure.navigation.PagePartsHandler": {},
      "cv.ui.structure.pure.layout.Manager": {},
      "cv.ui.structure.pure.navigation.PageHandler": {},
      "qx.util.DeferredCall": {},
      "cv.ui.TrickOMatic": {},
      "cv.util.IconTools": {},
      "qx.core.Init": {},
      "qx.bom.client.Html": {
        "require": true
      },
      "qx.bom.History": {},
      "cv.ui.structure.pure.layout.ResizeHandler": {},
      "qx.util.Uri": {},
      "cv.util.String": {},
      "cv.util.Tree": {},
      "cv.Application": {
        "defer": "runtime"
      }
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
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_57_0 = '<div id="top" class="loading"><div class="nav_path">-</div></div><div id="navbarTop" class="loading"></div><div id="centerContainer" class="clearfix"><div id="navbarLeft" class="loading page"></div><div id="main" style="position:relative; overflow: hidden;" class="loading"><div id="pages" style="position:relative;clear:both;"><!-- all pages will be inserted here --></div></div><div id="navbarRight" class="loading page"></div></div><div id="navbarBottom" class="loading"></div><div id="bottom" class="loading"><hr /><div class="footer"></div></div>';
      this.__P_57_1 = {
        cache: true
      }; // load basic CSS rules shared by all designs that support this structure

      qx.bom.Stylesheet.includeFile(qx.util.ResourceManager.getInstance().toUri('designs/designglobals.css') + (cv.Config.forceReload === true ? '?' + Date.now() : ''));
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
      __P_57_1: null,
      __P_57_0: null,
      main_scroll: null,
      old_scroll: '',
      pagePartsHandler: null,
      getHtmlStructure: function getHtmlStructure() {
        return this.__P_57_0;
      },
      parseBackendSettings: function parseBackendSettings(xml) {
        var settings = cv.Config.configSettings;
        var pagesElement = xml.documentElement;

        if (pagesElement.getAttribute('backend') !== null) {
          settings.backend = pagesElement.getAttribute('backend');
        }

        if (pagesElement.getAttribute('backend-url') !== null) {
          settings.backendUrl = pagesElement.getAttribute('backend-url');
          this.error('The useage of "backend-url" is deprecated. Please use "backend-knxd-url", "backend-mqtt-url" or "backend-openhab-url" instead.');
        }

        if (pagesElement.getAttribute('backend-knxd-url') !== null) {
          settings.backendKnxdUrl = pagesElement.getAttribute('backend-knxd-url');
        }

        if (pagesElement.getAttribute('backend-mqtt-url') !== null) {
          settings.backendMQTTUrl = pagesElement.getAttribute('backend-mqtt-url');
        }

        if (pagesElement.getAttribute('backend-openhab-url') !== null) {
          settings.backendOpenHABUrl = pagesElement.getAttribute('backend-openhab-url');
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

        return true;
      },
      login: function login() {
        var _this = this;

        var client = cv.io.BackendConnections.getClient('main');
        client.login(true, cv.Config.configSettings.credentials, function () {
          _this.debug('logged in');

          cv.io.BackendConnections.startInitialRequest();
        });
      },
      parseSettings: function parseSettings(xml, done) {
        var settings = cv.Config.configSettings;
        var pagesElement = xml.documentElement;
        settings.screensave_time = pagesElement.getAttribute('screensave_time');

        if (settings.screensave_time) {
          settings.screensave_time = parseInt(settings.screensave_time, 10);
        }

        settings.screensave_page = pagesElement.getAttribute('screensave_page');

        if (pagesElement.getAttribute('max_mobile_screen_width') !== null) {
          settings.maxMobileScreenWidth = pagesElement.getAttribute('max_mobile_screen_width'); // override config setting

          cv.Config.maxMobileScreenWidth = settings.maxMobileScreenWidth;
        }

        var globalClass = pagesElement.getAttribute('class');

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
      preParse: function preParse(xml) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var settings, metaParser;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  settings = cv.Config.configSettings;
                  metaParser = new cv.parser.pure.MetaParser(); // start with the plugins

                  settings.pluginsToLoad = settings.pluginsToLoad.concat(metaParser.parsePlugins(xml)); // and then the rest

                  _context.next = 5;
                  return metaParser.parse(xml);

                case 5:
                  _this2.debug('pre parsing done');

                case 6:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      },

      /**
       * Generate the UI code from the config file
       * @param xml {XMLDocument} loaded config file
       */
      createUI: function createUI(xml) {
        if (!cv.Config.cacheUsed) {
          this.debug('creating pages');
          var page = xml.querySelector('pages > page'); // only one page element allowed...

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
      _createPages: function _createPages(page, path, flavour, type) {
        cv.parser.pure.WidgetParser.renderTemplates(page);
        var parsedData = cv.parser.pure.WidgetParser.parse(page, path, flavour, type);

        if (!Array.isArray(parsedData)) {
          parsedData = [parsedData];
        }

        var i = 0;
        var l = parsedData.length;

        for (; i < l; i++) {
          var data = parsedData[i];
          var widget = cv.ui.structure.WidgetFactory.createInstance(data.$$type, data); // trigger DOM generation

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
      parseLabel: function parseLabel(label, flavour, labelClass, style) {
        if (!label) {
          return '';
        }

        var ret_val = '<div class="' + (labelClass !== undefined ? labelClass : 'label') + '"' + (style ? ' style="' + style + '"' : '') + '>';
        Array.prototype.forEach.call(label.childNodes, function (elem) {
          if (elem.nodeType === Node.ELEMENT_NODE && elem.nodeName.toLowerCase() === 'icon') {
            ret_val += cv.IconHandler.getInstance().getIconElement(elem.getAttribute('name'), elem.getAttribute('type'), elem.getAttribute('flavour') || flavour, elem.getAttribute('color'), elem.getAttribute('styling'), '', true);
          } else if (elem.nodeType === Node.TEXT_NODE) {
            ret_val += elem.textContent;
          }
        });
        return ret_val + '</div>';
      },
      supports: function supports(feature, subfeature) {
        if (Object.prototype.hasOwnProperty.call(this.__P_57_1, feature)) {
          if (this.__P_57_1[feature] === true) {
            if (subfeature) {
              return Object.prototype.hasOwnProperty.call(this.__P_57_1[feature], subfeature) && this.__P_57_1[feature][subfeature] === true;
            }

            return true;
          }
        }

        return false;
      },
      getInitialAddresses: function getInitialAddresses() {
        var startPageAddresses = {};
        var pageWidget = cv.ui.structure.WidgetFactory.getInstanceById(cv.Config.initialPage);
        pageWidget.getChildWidgets().forEach(function (child) {
          var address = child.getAddress ? child.getAddress() : {};

          for (var addr in address) {
            if (Object.prototype.hasOwnProperty.call(address, addr)) {
              startPageAddresses[addr] = 1;
            }
          }
        }, this);
        return Object.keys(startPageAddresses);
      },
      initPagePartsHandler: function initPagePartsHandler() {
        if (!this.pagePartsHandler) {
          this.pagePartsHandler = new cv.ui.structure.pure.navigation.PagePartsHandler();
        }
      },
      initLayout: function initLayout() {
        this.initPagePartsHandler();

        if (!cv.Config.initialPage) {
          this.__P_57_2();
        }

        var currentPage = cv.ui.structure.WidgetFactory.getInstanceById(cv.Config.initialPage);

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
        }, this).schedule(); // run the Trick-O-Matic scripts for great SVG backdrops

        document.querySelectorAll('embed').forEach(function (elem) {
          if (typeof elem.getSVGDocument === 'function') {
            var svg = elem.getSVGDocument();

            if (svg === null || svg.readyState !== 'complete') {
              elem.onload = cv.ui.TrickOMatic.run;
            } else {
              cv.ui.TrickOMatic.run.call(elem);
            }
          }
        });
        document.querySelectorAll('.icon').forEach(cv.util.IconTools.fillRecoloredIcon, cv.util.IconTools);
        document.querySelectorAll('.loading').forEach(function (elem) {
          elem.classList.remove('loading');
        }, this);
        qx.core.Init.getApplication().addListener('changeMobile', this._onMobileChanged, this);
      },
      doScreenSave: function doScreenSave() {
        this.scrollToPage();
      },
      onHistoryRequest: function onHistoryRequest(anchor) {
        if (anchor) {
          this.scrollToPage(anchor, 0, true);
        }
      },
      scrollToPage: function scrollToPage(target, speed, skipHistory) {
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

        if (cv.Config.rememberLastPage && qx.core.Environment.get('html.storage.local')) {
          localStorage.lastpage = page_id;
        } // push new state to history


        if (skipHistory === undefined) {
          var headline = document.querySelectorAll('#' + page_id + ' h1');
          var pageTitle = 'CometVisu';

          if (headline.length) {
            pageTitle = headline[0].textContent + ' - ' + pageTitle;
          }

          qx.bom.History.getInstance().addToHistory(page_id, pageTitle);
        }

        this.main_scroll.seekTo(page_id, speed); // scroll to it

        this.pagePartsHandler.initializeNavbars(page_id);

        this._maintainNavbars();
      },
      _onMobileChanged: function _onMobileChanged(ev) {
        var app = qx.core.Init.getApplication();

        if (app.isReady()) {
          cv.ui.structure.pure.layout.ResizeHandler.invalidateNavbar();

          this._maintainNavbars();
        }
      },
      _maintainNavbars: function _maintainNavbars() {
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
      resetPageValues: function resetPageValues() {
        this.resetCurrentPage();
        cv.ui.structure.pure.layout.Manager.currentPageUnavailableWidth = -1;
        cv.ui.structure.pure.layout.Manager.currentPageUnavailableHeight = -1;
        cv.ui.structure.pure.layout.Manager.currentPageNavbarVisibility = null;
      },
      getInitialPageId: function getInitialPageId() {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (cv.Config.initialPage) {
                    _context2.next = 3;
                    break;
                  }

                  _context2.next = 3;
                  return _this3.__P_57_2();

                case 3:
                  return _context2.abrupt("return", cv.Config.initialPage);

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))();
      },
      __P_57_2: function __P_57_2() {
        var _this4 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var startpage, req;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  startpage = 'id_';

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
                    req = qx.util.Uri.parseUri(window.location.href);

                    if (req.anchor && req.anchor.substring(0, 3) === 'id_') {
                      startpage = req.anchor;
                    }
                  }

                  if (!(startpage.match(/^id_[0-9_]*$/) !== null)) {
                    _context3.next = 5;
                    break;
                  }

                  cv.Config.initialPage = startpage;
                  return _context3.abrupt("return", startpage);

                case 5:
                  return _context3.abrupt("return", new Promise(function (resolve) {
                    qx.event.message.Bus.subscribe('setup.dom.finished.before', function () {
                      cv.Config.initialPage = _this4.getPageIdByPath(startpage) || 'id_';
                      resolve(cv.Config.initialPage);
                    });
                  }));

                case 6:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }))();
      },

      /**
       * Returns the id of the page the given path is associated to
       * @param page_name {String}
       * @param path {String}
       * @return {String}
       */
      getPageIdByPath: function getPageIdByPath(page_name, path) {
        if (page_name === null) {
          return null;
        }

        if (page_name.match(/^id_[0-9_]*$/) !== null) {
          // already a page_id
          return page_name;
        }

        if (path !== undefined) {
          var scope = this.traversePath(path);

          if (scope === null) {
            // path is wrong
            this.error('path \'' + path + '\' could not be traversed, no page found');
            return null;
          }

          return this.getPageIdByName(page_name, scope);
        }

        return this.getPageIdByName(page_name);
      },
      traversePath: function traversePath(path, root_page_id) {
        var path_scope = null;
        var index = path.indexOf('/');

        if (index >= 1) {
          // skip escaped slashes like \/
          while (path.substr(index - 1, 1) === '\\') {
            var next = path.indexOf('/', index + 1);

            if (next >= 0) {
              index = next;
            }
          }
        } //    console.log("traversePath("+path+","+root_page_id+")");


        if (index >= 0) {
          // traverse path one level down
          var path_page_name = path.substr(0, index);
          path_scope = this.getPageIdByName(path_page_name, root_page_id);
          path = path.substr(path_page_name.length + 1);
          path_scope = this.traversePath(path, path_scope); //      console.log(path_page_name+"=>"+path_scope);

          return path_scope;
        } // bottom path level reached


        path_scope = this.getPageIdByName(path, root_page_id);
        return path_scope;
      },
      getPageIdByName: function getPageIdByName(page_name, scope) {
        var page_id = null;

        if (page_name.match(/^id_[0-9_]*$/) !== null) {
          // already a page_id
          return page_name;
        } // find Page-ID by name
        // decode html code (e.g. like &apos; => ')


        page_name = cv.util.String.decodeHtmlEntities(page_name); // remove escaped slashes

        page_name = decodeURI(page_name.replace('\\\/', '/')); //      console.log("Page: "+page_name+", Scope: "+scope);

        var selector = scope !== undefined && scope !== null ? '.page[id^="' + scope + '"] h1' : '.page h1';
        var pages = document.querySelectorAll(selector);
        pages = Array.from(pages).filter(function (h) {
          return h.textContent === page_name;
        });

        if (pages.length > 1 && this.getCurrentPage() !== null) {
          var currentPageId = this.getCurrentPage().getPath(); // More than one Page found -> search in the current pages descendants first

          var fallback = true;
          pages.some(function (page) {
            var p = cv.util.Tree.getClosest(page, '.page');

            if (page.innerText === page_name) {
              var pid = p.getAttribute('id');

              if (pid.length < currentPageId.length) {
                // found pages path is shorter the the current pages -> must be an ancestor
                if (currentPageId.indexOf(pid) === 0) {
                  // found page is an ancestor of the current page -> we take this one
                  page_id = pid;
                  fallback = false; //break loop

                  return true;
                }
              } else if (pid.indexOf(currentPageId) === 0) {
                // found page is an descendant of the current page -> we take this one
                page_id = pid;
                fallback = false; //break loop

                return true;
              }
            }

            return false;
          }, this);

          if (fallback) {
            // take the first page that fits (old behaviour)
            pages.some(function (page) {
              if (page.innerText === page_name) {
                page_id = cv.util.Tree.getClosest(page, '.page').getAttribute('id'); // break loop

                return true;
              }

              return false;
            });
          }
        } else {
          pages.some(function (page) {
            if (page.innerText === page_name) {
              page_id = cv.util.Tree.getClosest(page, '.page').getAttribute('id'); // break loop

              return true;
            }

            return false;
          });
        }

        if (page_id !== null && page_id.match(/^id_[0-9_]*$/) !== null) {
          return page_id;
        } // not found


        return null;
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      qx.core.Init.getApplication().removeListener('changeMobile', this._onMobileChanged, this);
    },
    defer: function defer(statics) {
      cv.Application.structureController = statics.getInstance();
    }
  });
  cv.ui.structure.pure.Controller.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Controller.js.map?dt=1664552153858