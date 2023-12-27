function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
      this.__P_59_0 = '<div id="top" class="loading"><div class="nav_path">-</div></div><div id="navbarTop" class="loading"></div><div id="centerContainer" class="clearfix"><div id="navbarLeft" class="loading page"></div><div id="main" style="position:relative; overflow: hidden;" class="loading"><div id="pages" style="position:relative;clear:both;"><!-- all pages will be inserted here --></div></div><div id="navbarRight" class="loading page"></div></div><div id="navbarBottom" class="loading"></div><div id="bottom" class="loading"><hr /><div class="footer"></div></div>';
      this.__P_59_1 = {
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
      __P_59_1: null,
      __P_59_0: null,
      main_scroll: null,
      old_scroll: '',
      pagePartsHandler: null,
      getHtmlStructure: function getHtmlStructure() {
        return this.__P_59_0;
      },
      parseBackendSettings: function parseBackendSettings(xml) {
        var settings = cv.Config.configSettings;
        var pagesElement = xml.documentElement;
        var defaultBackendName = '';
        if (pagesElement.getAttribute('backend') !== null) {
          settings.backend = pagesElement.getAttribute('backend');
          defaultBackendName = settings.backend;
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
        var _loop = function _loop(name) {
          client = clients[name];
          client.login(true, cv.Config.configSettings.credentials, function () {
            _this.debug(name + ' logged in');
            cv.io.BackendConnections.startInitialRequest(name);
          });
        };
        for (var name in clients) {
          _loop(name);
        }
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
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var settings, metaParser;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                settings = cv.Config.configSettings;
                metaParser = new cv.parser.pure.MetaParser(); // start with the plugins
                settings.pluginsToLoad = settings.pluginsToLoad.concat(metaParser.parsePlugins(xml));

                // and then the rest
                _context.next = 5;
                return metaParser.parse(xml);
              case 5:
                _this2.debug('pre parsing done');
              case 6:
              case "end":
                return _context.stop();
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
        if (Object.prototype.hasOwnProperty.call(this.__P_59_1, feature)) {
          if (this.__P_59_1[feature] === true) {
            if (subfeature) {
              return Object.prototype.hasOwnProperty.call(this.__P_59_1[feature], subfeature) && this.__P_59_1[feature][subfeature] === true;
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
          this.__P_59_2();
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
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                if (cv.Config.initialPage) {
                  _context2.next = 3;
                  break;
                }
                _context2.next = 3;
                return _this4.__P_59_2();
              case 3:
                return _context2.abrupt("return", cv.Config.initialPage);
              case 4:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      __P_59_2: function __P_59_2() {
        var _this5 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var startpage, req;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
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
                    cv.Config.initialPage = _this5.getPageIdByPath(startpage) || 'id_';
                    resolve(cv.Config.initialPage);
                  });
                }));
              case 6:
              case "end":
                return _context3.stop();
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

//# sourceMappingURL=Controller.js.map?dt=1703705660024