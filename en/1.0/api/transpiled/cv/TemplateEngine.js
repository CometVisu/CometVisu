function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
      "qx.locale.Manager": {},
      "cv.Application": {},
      "qx.event.Timer": {},
      "qx.event.Registration": {},
      "qx.dom.Element": {},
      "qx.data.store.Json": {},
      "qx.util.ResourceManager": {},
      "cv.core.notifications.Router": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* TemplateEngine.js
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
      this.__P_771_0 = new qx.data.Array();
      this._domFinishedQueue = [];
      this.__P_771_0.addListener('changeLength', function (ev) {
        _this.setPartsLoaded(ev.getData() === 0);
      });
      this.__P_771_1 = {};
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
      __P_771_0: null,
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
        var continueWhenSuccessful = true;
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
        this.__P_771_0.append(parts);
        var waitingFor = new qx.data.Array(parts);
        qx.io.PartLoader.require(parts, function (states) {
          parts.forEach(function (part, idx) {
            if (states[idx] === 'complete') {
              this.debug('successfully loaded part ' + part);
              this.__P_771_0.remove(part);
              if (part.startsWith('structure-') && !this.__P_771_0.some(function (p) {
                return p.startsWith('structure-');
              })) {
                if (!cv.Config.loadedStructure) {
                  cv.Config.loadedStructure = part.substring(10);
                }
                this.debug('successfully loaded all structures. Continue:', continueWhenSuccessful);
                if (continueWhenSuccessful) {
                  qx.core.Init.getApplication().setStructureLoaded(true);
                }
              }
              this.__P_771_0.remove(part);
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
          var timer = setTimeout(function () {
            continueWhenSuccessful = false;
            reject(new Error('Timeout'));
          }, cv.Config.timeoutStructureLoad);
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var settings, rootNode, xml, predefinedDesign, design, baseUri, loader, _t, _t2;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
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
                  _context.n = 3;
                  break;
                }
                _t = rootNode.tagName.toLowerCase();
                _context.n = _t === 'config' ? 1 : _t === 'pages' ? 2 : 3;
                break;
              case 1:
                predefinedDesign = 'tile';
                return _context.a(3, 3);
              case 2:
                predefinedDesign = 'pure';
                return _context.a(3, 3);
              case 3:
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
                _context.p = 4;
                _context.n = 5;
                return _this2.loadParts([cv.Config.getStructure()]);
              case 5:
                _context.n = 7;
                break;
              case 6:
                _context.p = 6;
                _t2 = _context.v;
                // Note: the timeout can be changed by the not published URL parameter
                // timeoutStructureLoad for debugging reasons. Usually, the server
                // must be quick enough so that the client doesn't run into any issues
                // here.
                _this2.__P_771_2("".concat(qx.locale.Manager.tr('loadParts "Structure" failed'), ": ").concat(_t2));
                throw new Error('loadParts "Structure" failed');
              case 7:
                if (cv.Application.structureController.parseBackendSettings(xml) || cv.Config.testMode) {
                  cv.io.BackendConnections.initBackendClients();
                }
                cv.Application.structureController.parseSettings(xml);
                _context.n = 8;
                return cv.Application.structureController.preParse(xml);
              case 8:
                return _context.a(2);
            }
          }, _callee, null, [[4, 6]]);
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
      },
      /**
       * Display a message when the setup goes wrong and can't be recovered by
       * the CometVisu itself.
       * @param message {string}
       * @private
       */
      __P_771_2: function __P_771_2(message) {
        var notification = {
          topic: 'cv.error',
          title: qx.locale.Manager.tr('CometVisu startup error'),
          message: message,
          severity: 'urgent',
          unique: true,
          deletable: false
        };
        cv.core.notifications.Router.dispatchMessage(notification.topic, notification);
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

//# sourceMappingURL=TemplateEngine.js.map?dt=1782967173891