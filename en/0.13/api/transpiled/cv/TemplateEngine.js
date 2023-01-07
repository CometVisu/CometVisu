function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.data.Array": {
        "construct": true
      },
      "qx.ui.command.Group": {
        "construct": true
      },
      "qx.core.Init": {
        "construct": true
      },
      "cv.ui.structure.IPage": {},
      "cv.Config": {},
      "cv.ConfigCache": {},
      "qx.io.PartLoader": {},
      "qx.event.message.Bus": {},
      "cv.util.ScriptLoader": {},
      "cv.Application": {},
      "cv.io.BackendConnections": {},
      "qx.event.Timer": {},
      "qx.event.Registration": {},
      "qx.dom.Element": {},
      "qx.data.store.Json": {},
      "qx.util.ResourceManager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* TemplateEngine.js
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

  /**
   *
   */
  qx.Class.define('cv.TemplateEngine', {
    extend: qx.core.Object,
    type: 'singleton',
    construct: function construct() {
      var _this = this;
      // this.base(arguments);
      this.lazyPlugins = ['plugin-openhab'];
      this.__P_526_0 = new qx.data.Array();
      this._domFinishedQueue = [];
      this.__P_526_0.addListener('changeLength', function (ev) {
        _this.setPartsLoaded(ev.getData() === 0);
      });
      this.__P_526_1 = {};
      this.defaults = {
        widget: {},
        plugin: {}
      };
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
        check: 'Boolean',
        init: false,
        apply: '_applyLoaded',
        event: 'changePartsLoaded'
      },
      /**
       * Shows the loading state of the scripts
       */
      scriptsLoaded: {
        check: 'Boolean',
        init: false,
        apply: '_applyLoaded'
      },
      /**
       * Shows the initialization state of the TemplateEngine. It gets true when all
       * external stuff (parts, scripts, etc.) has been loaded.
       */
      ready: {
        check: 'Boolean',
        init: false,
        event: 'changeReady',
        apply: '_applyReady'
      },
      currentPage: {
        check: 'cv.ui.structure.IPage',
        nullable: true,
        event: 'changeCurrentPage'
      },
      domFinished: {
        check: 'Boolean',
        init: false,
        apply: '_applyDomFinished',
        event: 'changeDomFinished'
      },
      commands: {
        check: 'qx.ui.command.Group',
        nullable: true
      },
      // highlight a widget
      highlightedWidget: {
        check: 'String',
        nullable: true,
        apply: '_applyHighlightedWidget'
      },
      configSource: {
        check: 'XMLDocument',
        nullable: true,
        apply: '_applyConfigSource'
      },
      configHash: {
        check: 'Number',
        nullable: true
      }
    },
    /*
     ******************************************************
     MEMBERS
     ******************************************************
     */
    members: {
      /**
       * Structure where a design can set a default value that a widget or plugin
       * can use.
       * This is especially important for design relevant information like colors
       * that can not be set though CSS.
       *
       * Usage: this.defaults.plugin.foo = {bar: 'baz'};
       */
      defaults: null,
      pluginsToLoadCount: 0,
      __P_526_0: null,
      _domFinishedQueue: null,
      // plugins that do not need to be loaded to proceed with the initial setup
      lazyPlugins: null,
      _applyConfigSource: function _applyConfigSource(xml) {
        if (cv.Config.enableCache && xml) {
          this.setConfigHash(cv.ConfigCache.toHash(xml));
        } else {
          this.resetConfigHash();
        }
      },
      /**
       * Load parts (e.g. plugins, structure)
       *
       * @param parts {String[]|String} parts to load
       */
      loadParts: function loadParts(parts) {
        if (!Array.isArray(parts)) {
          parts = [parts];
        }
        var loadLazyParts = this.lazyPlugins.filter(function (part) {
          return parts.indexOf(part) >= 0;
        });
        if (loadLazyParts.length) {
          parts = parts.filter(function (p) {
            return !loadLazyParts.includes(p);
          });
        }
        this.__P_526_0.append(parts);
        var waitingFor = new qx.data.Array(parts);
        qx.io.PartLoader.require(parts, function (states) {
          parts.forEach(function (part, idx) {
            if (states[idx] === 'complete') {
              this.__P_526_0.remove(part);
              this.debug('successfully loaded part ' + part);
              if (part.startsWith('structure-')) {
                if (!cv.Config.loadedStructure) {
                  cv.Config.loadedStructure = part.substring(10);
                }
                qx.core.Init.getApplication().setStructureLoaded(true);
              }
              this.__P_526_0.remove(part);
              waitingFor.remove(part);
            } else {
              this.error('error loading part ' + part);
            }
          }, this);
        }, this);

        // load the lazy plugins no one needs to wait for
        qx.io.PartLoader.require(loadLazyParts, function (states) {
          loadLazyParts.forEach(function (part, idx) {
            if (states[idx] === 'complete') {
              this.debug('successfully loaded lazy part ' + part);
              waitingFor.remove(part);
            } else {
              this.error('error loading lazy part ' + part);
            }
          }, this);
        }, this);
        return new Promise(function (resolve, reject) {
          var timer = setTimeout(reject, 2000);
          if (waitingFor.getLength() === 0) {
            resolve();
            clearTimeout(timer);
          } else {
            waitingFor.addListener('changeLength', function (ev) {
              if (ev.getData() === 0) {
                resolve();
                clearTimeout(timer);
              }
            });
          }
        });
      },
      // property apply
      _applyReady: function _applyReady(value) {
        if (value === true) {
          this.setupUI();
        }
      },
      // property apply
      _applyLoaded: function _applyLoaded(value, old, name) {
        this.debug(name + ' is ' + value + ' now');
        if (this.isPartsLoaded() && this.isScriptsLoaded()) {
          this.setReady(true);
        }
      },
      // property apply
      _applyDomFinished: function _applyDomFinished(value) {
        if (value) {
          document.body.style.visibility = '';
          qx.event.message.Bus.dispatchByName('setup.dom.finished');
          // flush the queue
          this._domFinishedQueue.forEach(function (entry) {
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
      executeWhenDomFinished: function executeWhenDomFinished(callback, context) {
        if (!this.isDomFinished()) {
          // queue callback
          this._domFinishedQueue.push(Array.prototype.slice.call(arguments));
        } else {
          callback.apply(context, Array.prototype.slice.call(arguments, 2));
        }
      },
      /**
       * Read basic settings and detect and load the structure for this config to do the rest.
       */
      parse: function parse() {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var settings, rootNode, xml, predefinedDesign, design, baseUri, loader;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  /*
                   * First, we try to get a design by url. Secondly, we try to get a predefined
                   */
                  // read predefined design in config
                  settings = cv.Config.configSettings; // all config files must have a root with some attributes to be able to detect at least the design
                  // if not provides via URL, because the design is needed to detect the structure that can load the config
                  rootNode = _this2.getConfigSource().documentElement;
                  xml = _this2.getConfigSource();
                  predefinedDesign = rootNode.getAttribute('design');
                  if (predefinedDesign) {
                    _context.next = 12;
                    break;
                  }
                  _context.t0 = rootNode.tagName.toLowerCase();
                  _context.next = _context.t0 === 'config' ? 8 : _context.t0 === 'pages' ? 10 : 12;
                  break;
                case 8:
                  predefinedDesign = 'tile';
                  return _context.abrupt("break", 12);
                case 10:
                  predefinedDesign = 'pure';
                  return _context.abrupt("break", 12);
                case 12:
                  // design by url
                  // design by config file
                  if (!cv.Config.clientDesign && !settings.clientDesign) {
                    if (predefinedDesign) {
                      settings.clientDesign = predefinedDesign;
                    } else {
                      // selection dialog
                      _this2.selectDesign();
                    }
                  }
                  settings.scriptsToLoad = [];
                  settings.stylesToLoad = [];
                  design = cv.Config.getDesign();
                  if (design) {
                    baseUri = 'designs/' + design;
                    settings.stylesToLoad.push(baseUri + '/basic.css');
                    settings.stylesToLoad.push({
                      uri: baseUri + '/mobile.css',
                      media: "screen and (max-width:".concat(cv.Config.maxMobileScreenWidth, "px)")
                    });
                    settings.stylesToLoad.push(baseUri + '/custom.css');
                    settings.scriptsToLoad.push('designs/' + design + '/design_setup.js');
                    loader = cv.util.ScriptLoader.getInstance();
                    loader.addListenerOnce('designError', function (ev) {
                      if (ev.getData() === design) {
                        _this2.error('Failed to load "' + design + '" design! Falling back to simplified "' + cv.Config.loadedStructure + '"');
                        baseUri = 'designs/' + cv.Config.loadedStructure;
                        var alternativeStyles = [baseUri + '/basic.css'];
                        alternativeStyles.push({
                          uri: baseUri + '/mobile.css',
                          media: "screen and (max-width:".concat(cv.Config.maxMobileScreenWidthh, "px)")
                        });
                        alternativeStyles.push(baseUri + '/custom.css');
                        cv.util.ScriptLoader.getInstance().addStyles(alternativeStyles);
                        cv.util.ScriptLoader.getInstance().addScripts(baseUri + '/design_setup.js');
                      }
                    });
                  }
                  // load structure-part
                  _context.next = 19;
                  return _this2.loadParts([cv.Config.getStructure()]);
                case 19:
                  if (cv.Application.structureController.parseBackendSettings(xml)) {
                    cv.io.BackendConnections.initBackendClient();
                  }
                  cv.Application.structureController.parseSettings(xml);
                  _context.next = 23;
                  return cv.Application.structureController.preParse(xml);
                case 23:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      },
      /**
       * Main setup to get everything running and show the initial UI page.
       */
      setupUI: function setupUI() {
        // and now setup the UI
        this.debug('setup');
        cv.Application.structureController.createUI(this.getConfigSource());
        this.resetConfigSource(); // not needed anymore - free the space
        this.startScreensaver();
      },
      /**
       * Start the screensaver if a screensave time is set
       */
      startScreensaver: function startScreensaver() {
        if (typeof cv.Config.configSettings.screensave_time === 'number') {
          this.screensave = new qx.event.Timer(cv.Config.configSettings.screensave_time * 1000);
          this.screensave.addListener('interval', cv.Application.structureController.doScreenSave, cv.Application.structureController);
          this.screensave.start();
          qx.event.Registration.addListener(window, 'useraction', this.screensave.restart, this.screensave);
        }
      },
      _applyHighlightedWidget: function _applyHighlightedWidget(value, old) {
        if (old) {
          var oldElement = document.querySelector(old);
          if (oldElement) {
            oldElement.classList.remove('highlightedWidget');
          }
        }
        if (value) {
          var element = document.querySelector(value);
          if (element) {
            element.classList.add('highlightedWidget');
          }
        }
      },
      selectDesign: function selectDesign() {
        var body = document.querySelector('body');
        document.querySelectorAll('body > *').forEach(function (elem) {
          elem.style.display = 'none';
        }, this);
        body.style['background-color'] = 'black';
        var div = qx.dom.Element.create('div', {
          id: 'designSelector'
        });
        Object.entries({
          background: '#808080',
          width: '400px',
          color: 'white',
          margin: 'auto',
          padding: '0.5em'
        }).forEach(function (key_value) {
          body.style[key_value[0]] = key_value[1];
        });
        div.innerHTML = 'Loading ...';
        body.appendChild(div);
        var store = new qx.data.store.Json(qx.util.ResourceManager.getInstance().toUri('designs/get_designs.php'));
        store.addListener('loaded', function () {
          var html = '<h1>Please select design</h1>';
          html += '<p>The Location/URL will change after you have chosen your design. Please bookmark the new URL if you do not want to select the design every time.</p>';
          div.innerHTML = html;
          store.getModel().forEach(function (element) {
            var myDiv = qx.dom.Element.create('div', {
              cursor: 'pointer',
              padding: '0.5em 1em',
              borderBottom: '1px solid black',
              margin: 'auto',
              width: '262px',
              position: 'relative'
            });
            myDiv.innerHTML = '<div style="font-weight: bold; margin: 1em 0 .5em;">Design: ' + element + '</div>';
            myDiv.innerHTML += '<iframe src="' + qx.util.ResourceManager.getInstance().toUri('designs/design_preview.html') + '?design=' + element + '" width="160" height="90" border="0" scrolling="auto" frameborder="0" style="z-index: 1;"></iframe>';
            myDiv.innerHTML += '<img width="60" height="30" src="' + qx.util.ResourceManager.getInstance().toUri('demo/media/arrow.png') + '" alt="select" border="0" style="margin: 60px 10px 10px 30px;"/>';
            div.appendChild(myDiv);
            var tDiv = qx.dom.Element.create('div', {
              background: 'transparent',
              position: 'absolute',
              height: '90px',
              width: '160px',
              zIndex: 2
            });
            var pos = document.querySelector('iframe').getBoundingClientRect();
            Object.entries({
              left: pos.left + 'px',
              top: pos.top + 'px'
            }).forEach(function (key_value) {
              tDiv.style[key_value[0]] = key_value[1];
            });
            myDiv.appendChild(tDiv);
            qx.event.Registration.addListener(myDiv, 'pointerover', function () {
              myDiv.style.background = '#bbbbbb';
            }, this);
            qx.event.Registration.addListener(myDiv, 'pointerout', function () {
              myDiv.style.background = 'transparent';
            }, this);
            qx.event.Registration.addListener(myDiv, 'tap', function () {
              var href = document.location.href;
              if (document.location.hash) {
                href = href.split('#')[0];
              }
              if (document.location.search === '') {
                document.location.href = href + '?design=' + element;
              } else {
                document.location.href = href + '&design=' + element;
              }
            });
          });
        });
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._disposeObjects('__activeChangedTimer');
    }
  });
  cv.TemplateEngine.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TemplateEngine.js.map?dt=1673093881161