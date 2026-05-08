function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
      "cv.ui.structure.pure.Page": {},
      "cv.data.Model": {},
      "cv.io.BackendConnections": {},
      "cv.parser.pure.MetaParser": {},
      "cv.util.ScriptLoader": {},
      "cv.ui.structure.pure.layout.ResizeHandler": {},
      "qx.event.message.Bus": {},
      "cv.TemplateEngine": {},
      "cv.parser.pure.WidgetParser": {},
      "cv.ui.structure.WidgetFactory": {},
      "cv.IconHandler": {},
      "cv.ui.structure.pure.navigation.PagePartsHandler": {},
      "cv.ui.structure.pure.layout.Manager": {},
      "cv.ui.structure.pure.navigation.PageHandler": {},
      "qx.util.DeferredCall": {},
      "cv.util.IconTools": {},
      "qx.core.Init": {},
      "cv.ui.TrickOMatic": {},
      "qx.bom.client.Html": {
        "require": true
      },
      "qx.bom.History": {},
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
   * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
      this.__P_60_0 = '<div id="top" class="loading"><div class="nav_path">-</div></div><div id="navbarTop" class="loading"></div><div id="centerContainer" class="clearfix"><div id="navbarLeft" class="loading page"></div><div id="main" style="position:relative; overflow: hidden;" class="loading"><div id="pages" style="position:relative;clear:both;"><!-- all pages will be inserted here --></div></div><div id="navbarRight" class="loading page"></div></div><div id="navbarBottom" class="loading"></div><div id="bottom" class="loading"><hr /><div class="footer"></div></div>';
      this.__P_60_1 = {
        cache: true
      };

      // load basic CSS rules shared by all designs that support this structure
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
      __P_60_1: null,
      __P_60_0: null,
      main_scroll: null,
      old_scroll: '',
      pagePartsHandler: null,
      getHtmlStructure: function getHtmlStructure() {
        return this.__P_60_0;
      },
      parseBackendSettings: function parseBackendSettings(xml) {
        var settings = cv.Config.configSettings;
        var pagesElement = xml.documentElement;
        var defaultBackendName = '';
        if (pagesElement.getAttribute('backend') !== null) {
          settings.backend = pagesElement.getAttribute('backend');
          defaultBackendName = settings.backend.split(',')[0];
        } else {
          defaultBackendName = (cv.Config.URL.backend || cv.Config.server.backend || 'knxd').split(',')[0];
        }
        if (pagesElement.getAttribute('backend-url') !== null) {
          settings.backendUrl = pagesElement.getAttribute('backend-url');
          this.error('The useage of "backend-url" is deprecated. Please use "backend-knxd-url", "backend-mqtt-url" or "backend-openhab-url" instead.');
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
      login: function login() {
        var _this = this;
        var clients = cv.io.BackendConnections.getClients();
        var client;
        var promises = [];
        var _loop = function _loop(name) {
          client = clients[name];
          promises.push(new Promise(function (res, rej) {
            client.login(true, cv.Config.configSettings.credentials, function () {
              _this.debug(name + ' logged in');
              cv.io.BackendConnections.startInitialRequest(name);
              res();
            });
          }));
        };
        for (var name in clients) {
          _loop(name);
        }
        return Promise.all(promises);
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
          settings.maxMobileScreenWidth = pagesElement.getAttribute('max_mobile_screen_width');

          // override config setting
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var settings, metaParser;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                settings = cv.Config.configSettings;
                metaParser = new cv.parser.pure.MetaParser(); // start with the plugins
                settings.pluginsToLoad = settings.pluginsToLoad.concat(metaParser.parsePlugins(xml));

                // and then the rest
                _context.n = 1;
                return metaParser.parse(xml);
              case 1:
                _this2.debug('pre parsing done');
              case 2:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      /**
       * Generate the UI code from the config file
       * @param xml {XMLDocument} loaded config file
       */
      createUI: function createUI(xml) {
        cv.util.ScriptLoader.getInstance().addListenerOnce('stylesAndScriptsLoaded', function () {
          cv.ui.structure.pure.layout.ResizeHandler.invalidateScreensize();
        }, this);
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
        this.login().then(function () {});
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
          var widget = cv.ui.structure.WidgetFactory.createInstance(data.$$type, data);

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
        if (Object.prototype.hasOwnProperty.call(this.__P_60_1, feature)) {
          if (this.__P_60_1[feature] === true) {
            if (subfeature) {
              return Object.prototype.hasOwnProperty.call(this.__P_60_1[feature], subfeature) && this.__P_60_1[feature][subfeature] === true;
            }
            return true;
          }
        }
        return false;
      },
      getInitialAddresses: function getInitialAddresses(backendName) {
        var startPageAddresses = {};
        var pageWidget = cv.ui.structure.WidgetFactory.getInstanceById(cv.Config.initialPage);
        pageWidget.getChildWidgets().forEach(function (child) {
          var address = child.getAddress ? child.getAddress() : {};
          for (var addr in address) {
            if (Object.prototype.hasOwnProperty.call(address, addr) && addr.backendType === backendName) {
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
          this.__P_60_2();
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
      _runTrickOMatic: function _runTrickOMatic(elem, retries) {
        var _this3 = this;
        if (elem && typeof elem.getSVGDocument === 'function') {
          try {
            var svg = elem.getSVGDocument();
            if (svg === null || svg.readyState !== 'complete') {
              elem.onload = cv.ui.TrickOMatic.run;
            } else {
              cv.ui.TrickOMatic.run.call(elem);
            }
          } catch (e) {
            if (e.name === 'NotSupportedError') {
              if (retries <= 5) {
                retries++;
                window.requestAnimationFrame(function () {
                  _this3._runTrickOMatic(elem, retries);
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
        }

        // push new state to history
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
        cv.ui.structure.pure.layout.Manager.updateNavbarVisibility();
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
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                if (cv.Config.initialPage) {
                  _context2.n = 1;
                  break;
                }
                _context2.n = 1;
                return _this4.__P_60_2();
              case 1:
                return _context2.a(2, cv.Config.initialPage);
            }
          }, _callee2);
        }))();
      },
      __P_60_2: function __P_60_2() {
        var _this5 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var startpage, req;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
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
                  _context3.n = 1;
                  break;
                }
                cv.Config.initialPage = startpage;
                return _context3.a(2, startpage);
              case 1:
                return _context3.a(2, new Promise(function (resolve) {
                  qx.event.message.Bus.subscribe('setup.dom.finished.before', function () {
                    cv.Config.initialPage = _this5.getPageIdByPath(startpage) || 'id_';
                    resolve(cv.Config.initialPage);
                  });
                }));
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
        }
        // bottom path level reached
        path_scope = this.getPageIdByName(path, root_page_id);
        return path_scope;
      },
      getPageIdByName: function getPageIdByName(page_name, scope) {
        var page_id = null;
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
        var selector = scope !== undefined && scope !== null ? '.page[id^="' + scope + '"] h1' : '.page h1';
        var pages = document.querySelectorAll(selector);
        pages = Array.from(pages).filter(function (h) {
          return h.textContent === page_name;
        });
        if (pages.length > 1 && this.getCurrentPage() !== null) {
          var currentPageId = this.getCurrentPage().getPath();
          // More than one Page found -> search in the current pages descendants first
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
      updateSentryScope: function updateSentryScope() {
        if (cv.Config.sentryEnabled && window.Sentry) {
          Sentry.setTag('ui.structure', 'pure');
          Sentry.setTag('ui.design', cv.Config.getDesign());
        }
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

//# sourceMappingURL=Controller.js.map?dt=1778272814684