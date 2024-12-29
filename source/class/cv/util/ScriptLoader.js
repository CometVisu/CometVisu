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
  construct() {
    super();
    this.__scriptQueue = new qx.data.Array();
    this.__loaders = new qx.data.Array();
    this.__delayedScriptQueue = new qx.data.Array();
    this.__markedAsLoaded = [];
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    markAsLoaded(path) {
      return this.getInstance().markAsLoaded(path);
    },

    isMarkedAsLoaded(path) {
      return this.getInstance().isMarkedAsLoaded(path);
    },

    /**
     * Include a CSS file
     *
     * @param href {String} Href value
     * @param media {string?} Content of the media attribute
     */
    includeStylesheet(href, media) {
      return new Promise((res, rej) => {
        const el = document.createElement('link');
        el.type = 'text/css';
        el.rel = 'stylesheet';
        el.href = href;
        if (media) {
          el.media = media;
        }
        el.onload = res;
        el.onerror = () => {
          qx.log.Logger.error(this, 'error loading ' + href);
          // always resolve
          res();
        };
        const head = document.getElementsByTagName('head')[0];
        head.appendChild(el);
      });
    },

    /**
     * Include a JS file with module support
     *
     * @param src {String} Href value
     * @param type {string?} Content of the type attribute
     */
    includeScript(src, type) {
      return new Promise((res, rej) => {
        const head = document.getElementsByTagName('head')[0];
        if (!head.querySelector(`:scope > script[src='${src}']`)) {
          const el = document.createElement('script');
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
    __scriptsSetup: false,
    __stylesSetup: false,
    __stylesLoaded: true,
    __scriptQueue: null,
    __loaders: null,
    __listener: null,
    __markedAsLoaded: null,

    addStyles(styleArr) {
      const queue = typeof styleArr === 'string' ? [styleArr] : styleArr.concat();
      const suffix = cv.Config.forceReload === true ? '?' + Date.now() : '';
      let promises = [];
      this.__stylesLoaded = false;
      this.__stylesSetup = true;
      queue.forEach(function (style) {
        let media;
        let src;
        if (typeof style === 'string') {
          src = style;
        } else if (typeof style === 'object') {
          src = style.uri;
          media = style.media;
        } else {
          this.error('unknown style parameter type', typeof style);
        }
        if (src) {
          let resPath = qx.util.ResourceManager.getInstance().toUri(src);
          if (resPath === src) {
            // this file is unknown to the resource manager, might be a scss source
            const scssStyle = src.replace(/\.css$/, '.scss');
            const scssPath = qx.util.ResourceManager.getInstance().toUri(scssStyle);
            if (scssStyle !== scssPath) {
              resPath = scssPath.replace(/\.scss$/, '.css');
            }
          }
          promises.push(cv.util.ScriptLoader.includeStylesheet(resPath + suffix, media));
        }
      }, this);
      Promise.all(promises)
        .then(() => {
          this.debug('styles have been loaded');
          this.__stylesLoaded = true;
          this.fireEvent('stylesLoaded');
          if (this.getFinished() && this.__scriptsSetup && this.__stylesSetup) {
            this.fireEvent('stylesAndScriptsLoaded');
          }
        })
        .catch(reason => {
          this.error('error loading styles', reason);
          // fire this event anyways, because a non loaded CSS file is no blocker
          this.fireEvent('stylesLoaded');
        });
    },

    markAsLoaded(path) {
      if (!this.__markedAsLoaded.includes(path)) {
        this.debug('marking ' + path + ' as loaded');
        this.__markedAsLoaded.push(path);
      }
    },

    isMarkedAsLoaded(path) {
      return this.__markedAsLoaded.includes(path);
    },

    addScripts(scriptArr, order) {
      const queue = typeof scriptArr === 'string' ? [scriptArr] : scriptArr;
      // make sure that no cached scripts are loaded
      const suffix = cv.Config.forceReload === true ? '?' + Date.now() : '';
      const realQueue = [];
      let i = 0;
      const l = queue.length;
      this.__scriptsSetup = true;
      for (; i < l; i++) {
        if (!this.__markedAsLoaded.includes(queue[i])) {
          realQueue.push(qx.util.ResourceManager.getInstance().toUri(queue[i]) + suffix);
        }
      }
      if (realQueue.length === 0) {
        return;
      }
      this.debug('queueing ' + realQueue.length + ' scripts');
      this.resetFinished();
      this.__scriptQueue.append(realQueue);
      if (order) {
        const processQueue = function () {
          if (order.length > 0) {
            const loadIndex = order.shift();
            const script = realQueue.splice(loadIndex, 1)[0];
            const loader = this.__loadSingleScript(script);
            loader.addListener('ready', processQueue, this);
          } else {
            realQueue.forEach(this.__loadSingleScript, this);
          }
        }.bind(this);
        processQueue();
      } else {
        // use an extra DynamicScriptLoader for every single script because loading errors stop the process
        // and the loader would not try to load the other scripts
        // queue.forEach(this.__loadSingleScript, this);
        this.__loadSingleScript(realQueue);
      }
    },

    /**
     * Load one script
     *
     * @param script {String} path to script
     */
    __loadSingleScript(script) {
      const loader = new qx.util.DynamicScriptLoader(script);
      this.__loaders.push(loader);
      loader.addListener('loaded', this._onLoaded, this);
      loader.addListener('failed', this._onFailed, this);
      loader.addListenerOnce('ready', () => {
        this.__loaders.remove(loader);
        loader.removeListener('loaded', this._onLoaded, this);
        loader.removeListener('failed', this._onFailed, this);
      });
      loader.start().catch(e => {
        // showing this error on the console is enough as the user gets
        // the real error message through the `_onFailed()` handler.
        this.error('Message:', e.message);
        this.error('Stack:', e.stack);
      });
      return loader;
    },

    _onLoaded(ev) {
      const data = ev.getData();
      this.__scriptQueue.remove(data.script);
      this.debug(data.script + ' loaded');
      this._checkQueue();
    },

    _onFailed(ev) {
      const data = ev.getData();
      this.__scriptQueue.remove(data.script);
      if (data.script.startsWith('design')) {
        const failedDesign = data.script.split('/')[1];
        this.fireDataEvent('designError', failedDesign);
      } else if (data.script.includes('/plugins/')) {
        const match = /.+\/plugins\/([\w]+)\/index\.js.*/.exec(data.script);
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
    _checkQueue() {
      if (this.__scriptQueue.length === 0) {
        if (this.isAllQueued()) {
          this.debug('script loader finished');
          this.fireEvent('finished');
          this.setFinished(true);
          if (this.__stylesLoaded && this.__scriptsSetup && this.__stylesSetup) {
            this.fireEvent('stylesAndScriptsLoaded');
          }
        } else if (!this.__listener) {
          this.debug('script loader waiting for all scripts beeing queued');

          this.__listener = this.addListener('changeAllQueued', ev => {
            if (ev.getData() === true) {
              if (this.__scriptQueue.length === 0) {
                this.debug('script loader finished');
                this.fireEvent('finished');
                this.setFinished(true);
              }
              this.removeListenerById(this.__listener);
              this.__listener = null;
            }
          });
        }
      } else {
        this.debug(this.__scriptQueue.length + ' scripts remaining');
      }
    }
  }
});
