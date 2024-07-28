function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
      "cv.io.BackendConnections": {},
      "cv.util.ScriptLoader": {},
      "cv.Application": {},
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
      this.__P_754_0 = new qx.data.Array();
      this._domFinishedQueue = [];
      this.__P_754_0.addListener('changeLength', function (ev) {
        _this.setPartsLoaded(ev.getData() === 0);
      });
      this.__P_754_1 = {};
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
      __P_754_0: null,
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
        this.__P_754_0.append(parts);
        var waitingFor = new qx.data.Array(parts);
        qx.io.PartLoader.require(parts, function (states) {
          parts.forEach(function (part, idx) {
            if (states[idx] === 'complete') {
              this.debug('successfully loaded part ' + part);
              this.__P_754_0.remove(part);
              if (part.startsWith('structure-') && !this.__P_754_0.some(function (p) {
                return p.startsWith('structure-');
              })) {
                if (!cv.Config.loadedStructure) {
                  cv.Config.loadedStructure = part.substring(10);
                }
                this.debug('successfully loaded all structures');
                qx.core.Init.getApplication().setStructureLoaded(true);
              }
              this.__P_754_0.remove(part);
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
            clearTimeout(timer);
            resolve();
          } else {
            waitingFor.addListener('changeLength', function (ev) {
              if (ev.getData() === 0) {
                clearTimeout(timer);
                resolve();
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
          cv.io.BackendConnections.initSystemBackend();
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
            while (1) switch (_context.prev = _context.next) {
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
                        media: "screen and (max-width:".concat(cv.Config.maxMobileScreenWidth, "px)")
                      });
                      alternativeStyles.push(baseUri + '/custom.css');
                      cv.util.ScriptLoader.getInstance().addStyles(alternativeStyles);
                      cv.util.ScriptLoader.getInstance().addScripts(baseUri + '/design_setup.js');
                    }
                  });
                  loader.addListenerOnce('stylesLoaded', _this2.generateManifest, _this2);
                }
                // load structure-part
                _context.next = 19;
                return _this2.loadParts([cv.Config.getStructure()]);
              case 19:
                if (cv.Application.structureController.parseBackendSettings(xml) || cv.Config.testMode) {
                  cv.io.BackendConnections.initBackendClients();
                }
                cv.Application.structureController.parseSettings(xml);
                _context.next = 23;
                return cv.Application.structureController.preParse(xml);
              case 23:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      generateManifest: function generateManifest() {
        var color = getComputedStyle(document.body).getPropertyValue('background-color');
        var baseUrl = window.location.pathname;
        if (baseUrl.endsWith('/index.html')) {
          var parts = baseUrl.split('/');
          parts.pop();
          baseUrl = parts.join('/') + '/';
        }
        baseUrl = window.location.origin + baseUrl;
        var startUrl = window.location.origin + window.location.pathname + window.location.search;
        var manifest = Object.assign(cv.Config.defaultManifest, {
          start_url: startUrl,
          scope: startUrl,
          theme_color: color,
          background_color: color
        });
        var _iterator = _createForOfIteratorHelper(manifest.icons),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var icon = _step.value;
            icon.src = baseUrl + icon.src;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        var stringManifest = JSON.stringify(manifest);
        var blob = new Blob([stringManifest], {
          type: 'application/json'
        });
        var manifestURL = URL.createObjectURL(blob);
        document.querySelector('#app-manifest').setAttribute('href', manifestURL);
        var themeColorElement = document.querySelector('#app-theme-color');
        if (!themeColorElement) {
          themeColorElement = document.createElement('meta');
          themeColorElement.setAttribute('id', 'app-theme-color');
          themeColorElement.setAttribute('name', 'theme-color');
          document.querySelector('html > head').appendChild(themeColorElement);
        }
        document.querySelector('#app-theme-color').setAttribute('content', color);
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

//# sourceMappingURL=TemplateEngine.js.map?dt=1722153859777