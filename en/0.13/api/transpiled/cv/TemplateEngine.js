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
      // this.base(arguments);
      this.lazyPlugins = ['plugin-openhab'];
      this.__P_511_0 = new qx.data.Array();
      this._domFinishedQueue = [];

      this.__P_511_0.addListener('changeLength', function (ev) {
        this.setPartsLoaded(ev.getData() === 0);
      }, this);

      this.__P_511_1 = {};
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
      __P_511_0: null,
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

        this.__P_511_0.append(parts);

        var waitingFor = new qx.data.Array(parts);

        qx.io.PartLoader.require(parts, function (states) {
          parts.forEach(function (part, idx) {
            if (states[idx] === 'complete') {
              this.__P_511_0.remove(part);

              this.debug('successfully loaded part ' + part);

              if (part.startsWith('structure-')) {
                if (!cv.Config.loadedStructure) {
                  cv.Config.loadedStructure = part.substring(10);
                }

                qx.core.Init.getApplication().setStructureLoaded(true);
              }

              this.__P_511_0.remove(part);

              waitingFor.remove(part);
            } else {
              this.error('error loading part ' + part);
            }
          }, this);
        }, this); // load the lazy plugins no one needs to wait for


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
          qx.event.message.Bus.dispatchByName('setup.dom.finished'); // flush the queue

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
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var settings, rootNode, xml, predefinedDesign, design, baseUri, loader;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  /*
                   * First, we try to get a design by url. Secondly, we try to get a predefined
                   */
                  // read predefined design in config
                  settings = cv.Config.configSettings; // all config files must have a root with some attributes to be able to detect at least the design
                  // if not provides via URL, because the design is needed to detect the structure that can load the config

                  rootNode = _this.getConfigSource().documentElement;
                  xml = _this.getConfigSource();
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
                      _this.selectDesign();
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
                        this.error('Failed to load "' + design + '" design! Falling back to simplified "' + cv.Config.loadedStructure + '"');
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
                    }, _this);
                  } // load structure-part


                  _context.next = 19;
                  return _this.loadParts([cv.Config.getStructure()]);

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

//# sourceMappingURL=TemplateEngine.js.map?dt=1664552189549