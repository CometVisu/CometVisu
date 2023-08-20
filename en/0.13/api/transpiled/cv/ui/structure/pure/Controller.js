function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
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

//# sourceMappingURL=Controller.js.map?dt=1692560689992