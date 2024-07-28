function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.data.Array": {
        "construct": true
      },
      "qx.log.Logger": {},
      "cv.Config": {},
      "qx.util.ResourceManager": {},
      "qx.util.DynamicScriptLoader": {},
      "cv.core.notifications.Router": {},
      "qx.locale.Manager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ScriptLoader.js
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

  qx.Class.define('cv.util.ScriptLoader', {
    extend: qx.core.Object,
    type: 'singleton',
    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_758_0 = new qx.data.Array();
      this.__P_758_1 = new qx.data.Array();
      this.__P_758_2 = new qx.data.Array();
      this.__P_758_3 = [];
    },
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      markAsLoaded: function markAsLoaded(path) {
        return this.getInstance().markAsLoaded(path);
      },
      isMarkedAsLoaded: function isMarkedAsLoaded(path) {
        return this.getInstance().isMarkedAsLoaded(path);
      },
      /**
       * Include a CSS file
       *
       * @param href {String} Href value
       * @param media {string?} Content of the media attribute
       */
      includeStylesheet: function includeStylesheet(href, media) {
        var _this = this;
        return new Promise(function (res, rej) {
          var el = document.createElement('link');
          el.type = 'text/css';
          el.rel = 'stylesheet';
          el.href = href;
          if (media) {
            el.media = media;
          }
          el.onload = res;
          el.onerror = function () {
            qx.log.Logger.error(_this, 'error loading ' + href);
            // always resolve
            res();
          };
          var head = document.getElementsByTagName('head')[0];
          head.appendChild(el);
        });
      },
      /**
       * Include a JS file with module support
       *
       * @param src {String} Href value
       * @param type {string?} Content of the type attribute
       */
      includeScript: function includeScript(src, type) {
        return new Promise(function (res, rej) {
          var head = document.getElementsByTagName('head')[0];
          if (!head.querySelector(":scope > script[src='".concat(src, "']"))) {
            var el = document.createElement('script');
            if (type) {
              el.type = type;
            }
            el.onload = res;
            el.onerror = rej;
            el.src = src;
            head.appendChild(el);
          } else {
            res();
          }
        });
      }
    },
    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      allQueued: {
        check: 'Boolean',
        init: false,
        apply: '_checkQueue',
        event: 'changeAllQueued'
      },
      finished: {
        check: 'Boolean',
        init: false,
        event: 'changeFinished'
      }
    },
    /*
    ******************************************************
      EVENTS
    ******************************************************
    */
    events: {
      finished: 'qx.event.type.Event',
      stylesLoaded: 'qx.event.type.Event',
      stylesAndScriptsLoaded: 'qx.event.type.Event',
      designError: 'qx.event.type.Data'
    },
    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_758_4: false,
      __P_758_5: false,
      __P_758_6: true,
      __P_758_0: null,
      __P_758_1: null,
      __P_758_7: null,
      __P_758_3: null,
      addStyles: function addStyles(styleArr) {
        var _this2 = this;
        var queue = typeof styleArr === 'string' ? [styleArr] : styleArr.concat();
        var suffix = cv.Config.forceReload === true ? '?' + Date.now() : '';
        var promises = [];
        this.__P_758_6 = false;
        this.__P_758_5 = true;
        queue.forEach(function (style) {
          var media;
          var src;
          if (typeof style === 'string') {
            src = style;
          } else if (_typeof(style) === 'object') {
            src = style.uri;
            media = style.media;
          } else {
            this.error('unknown style parameter type', _typeof(style));
          }
          if (src) {
            var resPath = qx.util.ResourceManager.getInstance().toUri(src);
            if (resPath === src) {
              // this file is unknown to the resource manager, might be a scss source
              var scssStyle = src.replace(/\.css$/, '.scss');
              var scssPath = qx.util.ResourceManager.getInstance().toUri(scssStyle);
              if (scssStyle !== scssPath) {
                resPath = scssPath.replace(/\.scss$/, '.css');
              }
            }
            promises.push(cv.util.ScriptLoader.includeStylesheet(resPath + suffix, media));
          }
        }, this);
        Promise.all(promises).then(function () {
          _this2.debug('styles have been loaded');
          _this2.__P_758_6 = true;
          _this2.fireEvent('stylesLoaded');
          if (_this2.getFinished() && _this2.__P_758_4 && _this2.__P_758_5) {
            _this2.fireEvent('stylesAndScriptsLoaded');
          }
        })["catch"](function (reason) {
          _this2.error('error loading styles', reason);
          // fire this event anyways, because a non loaded CSS file is no blocker
          _this2.fireEvent('stylesLoaded');
        });
      },
      markAsLoaded: function markAsLoaded(path) {
        if (!this.__P_758_3.includes(path)) {
          this.debug('marking ' + path + ' as loaded');
          this.__P_758_3.push(path);
        }
      },
      isMarkedAsLoaded: function isMarkedAsLoaded(path) {
        return this.__P_758_3.includes(path);
      },
      addScripts: function addScripts(scriptArr, order) {
        var queue = typeof scriptArr === 'string' ? [scriptArr] : scriptArr;
        // make sure that no cached scripts are loaded
        var suffix = cv.Config.forceReload === true ? '?' + Date.now() : '';
        var realQueue = [];
        var i = 0;
        var l = queue.length;
        this.__P_758_4 = true;
        for (; i < l; i++) {
          if (!this.__P_758_3.includes(queue[i])) {
            realQueue.push(qx.util.ResourceManager.getInstance().toUri(queue[i]) + suffix);
          }
        }
        if (realQueue.length === 0) {
          return;
        }
        this.debug('queueing ' + realQueue.length + ' scripts');
        this.resetFinished();
        this.__P_758_0.append(realQueue);
        if (order) {
          var processQueue = function () {
            if (order.length > 0) {
              var loadIndex = order.shift();
              var script = realQueue.splice(loadIndex, 1)[0];
              var loader = this.__P_758_8(script);
              loader.addListener('ready', processQueue, this);
            } else {
              realQueue.forEach(this.__P_758_8, this);
            }
          }.bind(this);
          processQueue();
        } else {
          // use an extra DynamicScriptLoader for every single script because loading errors stop the process
          // and the loader would not try to load the other scripts
          // queue.forEach(this.__loadSingleScript, this);
          this.__P_758_8(realQueue);
        }
      },
      /**
       * Load one script
       *
       * @param script {String} path to script
       */
      __P_758_8: function __P_758_8(script) {
        var _this3 = this;
        var loader = new qx.util.DynamicScriptLoader(script);
        this.__P_758_1.push(loader);
        loader.addListener('loaded', this._onLoaded, this);
        loader.addListener('failed', this._onFailed, this);
        loader.addListenerOnce('ready', function () {
          _this3.__P_758_1.remove(loader);
          loader.removeListener('loaded', _this3._onLoaded, _this3);
          loader.removeListener('failed', _this3._onFailed, _this3);
        });
        loader.start();
        return loader;
      },
      _onLoaded: function _onLoaded(ev) {
        var data = ev.getData();
        this.__P_758_0.remove(data.script);
        this.debug(data.script + ' loaded');
        this._checkQueue();
      },
      _onFailed: function _onFailed(ev) {
        var data = ev.getData();
        this.__P_758_0.remove(data.script);
        if (data.script.startsWith('design')) {
          var failedDesign = data.script.split('/')[1];
          this.fireDataEvent('designError', failedDesign);
        } else if (data.script.includes('/plugins/')) {
          var match = /.+\/plugins\/([\w]+)\/index\.js.*/.exec(data.script);
          if (match) {
            cv.core.notifications.Router.dispatchMessage('cv.loading.error', {
              title: qx.locale.Manager.tr('Error loading plugin "%1"', match[1]),
              message: qx.locale.Manager.tr('File %1 could not be loaded.', data.script),
              severity: 'high',
              deletable: true
            });
          }
        } else {
          cv.core.notifications.Router.dispatchMessage('cv.loading.error', {
            title: qx.locale.Manager.tr('File loading error'),
            message: qx.locale.Manager.tr('File %1 could not be loaded.', data.script),
            severity: 'high',
            deletable: true
          });
        }
        this._checkQueue();
      },
      // property apply
      _checkQueue: function _checkQueue() {
        var _this4 = this;
        if (this.__P_758_0.length === 0) {
          if (this.isAllQueued()) {
            this.debug('script loader finished');
            this.fireEvent('finished');
            this.setFinished(true);
            if (this.__P_758_6 && this.__P_758_4 && this.__P_758_5) {
              this.fireEvent('stylesAndScriptsLoaded');
            }
          } else if (!this.__P_758_7) {
            this.debug('script loader waiting for all scripts beeing queued');
            this.__P_758_7 = this.addListener('changeAllQueued', function (ev) {
              if (ev.getData() === true) {
                if (_this4.__P_758_0.length === 0) {
                  _this4.debug('script loader finished');
                  _this4.fireEvent('finished');
                  _this4.setFinished(true);
                }
                _this4.removeListenerById(_this4.__P_758_7);
                _this4.__P_758_7 = null;
              }
            });
          }
        } else {
          this.debug(this.__P_758_0.length + ' scripts remaining');
        }
      }
    }
  });
  cv.util.ScriptLoader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ScriptLoader.js.map?dt=1722153860008