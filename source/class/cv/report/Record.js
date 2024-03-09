/* Record.js
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
 * Recording tool for user interactions on existing configs. Used for bug reproduction.

 * @author Tobias Bräutigam
 * @since 0.11.0 (2017)
 */
qx.Class.define('cv.report.Record', {
  extend: qx.core.Object,
  type: 'singleton',

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct() {
    this.__log = [];
    this.__listeners = {};
    this.__start = Date.now();
    this.__xhr = { response: [], request: [] };
    this.__data = {};
    this.__deltas = {};
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    CONFIG: 'config',
    BACKEND: 'backend',
    USER: 'user',
    CACHE: 'cache',
    XHR: 'xhr',
    SCREEN: 'screen',
    RUNTIME: 'runtime',
    STORAGE: 'storage',
    REPLAYING: false,
    data: null,

    // Events that should be recorded
    USER_EVENTS: /(.+(down|up|cancel|move)|.*click|contextmenu|touch.*|.*wheel)/i,

    prepare() {
      if (cv.Config.reporting === true && !cv.report.Record.REPLAYING) {
        cv.Application.registerConsoleCommand('downloadLog', cv.report.Record.download, 'Download recorded log file.');

        // apply event recorder
        const record = cv.report.Record.getInstance();
        EVENT_RECORDER = record.recordNativeEvent.bind(record);

        // patch XHR
        qx.Class.patch(qx.io.request.Xhr, cv.report.utils.MXhrHook);

        const Reg = qx.event.Registration;

        // add resize listener
        Reg.addListener(
          window,
          'resize',
          function () {
            this.record(this.SCREEN, 'resize', {
              w: document.documentElement.clientWidth,
              h: document.documentElement.clientHeight
            });
          },
          this
        );

        // add scroll listeners to all pages
        qx.event.message.Bus.subscribe(
          'setup.dom.finished',
          function () {
            const throttled = qx.util.Function.throttle(record.recordScroll, 250, true);

            document.querySelectorAll('#pages > .page').forEach(function (page) {
              Reg.addListener(page, 'scroll', throttled, record);
            }, this);
          },
          this
        );

        this.record(this.RUNTIME, 'config', this.getClientData());

        // save initial size
        this.record(this.SCREEN, 'resize', {
          w: document.documentElement.clientWidth,
          h: document.documentElement.clientHeight
        });
      }
    },

    getClientData() {
      // save browser settings
      const req = qx.util.Uri.parseUri(window.location.href);
      // delete reporting queryKey
      delete req.queryKey.reporting;
      const Env = qx.core.Environment;
      const runtime = {
        browserName: Env.get('browser.name'),
        browserVersion: Env.get('browser.version'),
        deviceName: Env.get('device.name'),
        deviceType: Env.get('device.type'),
        pixelRatio: Env.get('device.pixelRatio'),
        touch: Env.get('device.touch'),
        osName: Env.get('os.name'),
        osVersion: Env.get('os.version'),
        build: Env.get('cv.build'),
        locale: qx.bom.client.Locale.getLocale(),
        cv: {},
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        anchor: req.anchor,
        query: req.queryKey,
        path: req.relative
      };

      // save CometVisu build information
      Object.getOwnPropertyNames(cv.Version).forEach(function (name) {
        if (/^[A-Z]+$/.test(name)) {
          runtime.cv[name] = cv.Version[name];
        }
      });
      return runtime;
    },

    record(category, path, data, options) {
      if (cv.Config.reporting === true && !cv.report.Record.REPLAYING) {
        cv.report.Record.getInstance().record(category, path, data, options);
      }
    },

    /**
     * Save cache in
     */
    logCache() {
      if (cv.Config.reporting === true && !cv.report.Record.REPLAYING) {
        cv.ConfigCache.getData().then(data => {
          cv.report.Record.record(cv.report.Record.CACHE, cv.Config.configSuffix, data);
        });
      }
    },

    logLocalStorage() {
      cv.report.Record.record(cv.report.Record.STORAGE, 'preferences', window.localStorage.preferences);
    },

    normalizeUrl(url) {
      try {
        const parsed = qx.util.Uri.parseUri(qx.util.Uri.getAbsolute(url));
        url = parsed.path;
        const filteredParams = Object.keys(parsed.queryKey).filter(name => name !== 'nocache' && name !== 'ts');

        if (filteredParams.length > 0) {
          url += '?';
          url += filteredParams.map(param => `${param}=${parsed.queryKey[param]}`).join('&');
        }
      } catch (e) {
        if (url.indexOf('nocache=') >= 0) {
          url = url.replace(/[\?|&]nocache=[0-9]+/, '');
        }
        if (url.indexOf('ts=') >= 0) {
          url = url.replace(/[\?|&]ts=[0-9]+/, '');
        }
      }
      return url;
    },

    download() {
      if (cv.Config.reporting === true && !cv.report.Record.REPLAYING) {
        return cv.report.Record.getInstance().download();
      }
      return null;
    },

    getData() {
      if (cv.Config.reporting === true && !cv.report.Record.REPLAYING) {
        return cv.report.Record.getInstance().getData();
      }
      return null;
    },

    getFileName() {
      return cv.report.Record.getInstance().getFileName();
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __start: null,
    __log: null,
    __xhr: null,
    __listeners: null,
    __data: null,
    __delta: 50,
    __minDelta: 1,
    __maxDelta: 50,
    __deltas: null,
    __ID: 0,

    record(category, path, data, options) {
      switch (category) {
        case cv.report.Record.XHR:
          if (path === 'response') {
            this.__scrubSensitiveContent(category, data);
          }
          data.t = Date.now();
          this.__xhr[path].push(data);
          break;

        case cv.report.Record.CACHE:
        case cv.report.Record.RUNTIME:
          this.__data[category] = data;
          break;

        case cv.report.Record.STORAGE:
          if (!Object.prototype.hasOwnProperty.call(this.__data, category)) {
            this.__data[category] = {};
          }
          this.__data[category][path] = data;
          break;

        default:
          this.__log.push({
            c: category,
            t: Date.now(),
            i: path,
            d: data,
            o: options,
            ID: this.__ID
          });
      }

      this.__ID++;
    },

    /**
     * Prevent sensitive data like passwords from being recorded (e.g. content of the hidden config
     * @param category {String} recording category
     * @param data {Object} recorded content
     * @private
     */
    __scrubSensitiveContent(category, data) {
      if (category === cv.report.Record.XHR) {
        if (data.url.includes(cv.io.rest.Client.BASE_URL + '/config/hidden') && data.body) {
          try {
            const content = JSON.parse(data.body);
            Object.keys(content).forEach(sectionName => {
              Object.keys(content[sectionName]).forEach(optionName => {
                switch (optionName) {
                  case 'uri':
                    content[sectionName][optionName] = 'http://127.0.0.1';
                    break;
                  case 'username':
                  case 'user':
                    content[sectionName][optionName] = 'xxxxx';
                    break;
                  case 'pass':
                  case 'passwd':
                  case 'password':
                    content[sectionName][optionName] = 'xxx';
                    break;
                }
              });
            });
            data.body = JSON.stringify(content);
          } catch (e) {
            this.error(e);
            data.body = '{}';
            data.error = 'Invalid JSON content: ' + e.toString();
          }
        } else if (data.url.includes('/config/visu_config') && data.url.endsWith('.xml') && data.body) {
          data.body = data.body.replaceAll(/username="[^"]+"/gi, 'username="replay"');
          data.body = data.body.replaceAll(/password="[^"]+"/gi, 'password="***"');
        }
      }
    },

    /**
     * Extract useful data we need from every event
     * @param nativeEvent {Event}
     */
    __extractDataFromEvent(nativeEvent) {
      const data = {
        eventClass: nativeEvent.constructor.name,
        native: {
          bubbles: nativeEvent.bubbles,
          button: nativeEvent.button,
          clientX: Math.round(nativeEvent.clientX),
          clientY: Math.round(nativeEvent.clientY),
          currentTarget: this.__getDomPath(nativeEvent.currentTarget) ?? undefined,
          relatedTarget: this.__getDomPath(nativeEvent.relatedTarget) ?? undefined,
          pageX: nativeEvent.pageX ? Math.round(nativeEvent.pageX) : undefined,
          pageY: nativeEvent.pageY ? Math.round(nativeEvent.pageY) : undefined,
          returnValue: nativeEvent.returnValue,
          screenX: Math.round(nativeEvent.screenX),
          screenY: Math.round(nativeEvent.screenY),
          wheelDelta: nativeEvent.wheelDelta,
          wheelDeltaX: nativeEvent.wheelDeltaX,
          wheelDeltaY: nativeEvent.wheelDeltaY,
          delta: nativeEvent.delta,
          deltaX: nativeEvent.deltaX,
          deltaY: nativeEvent.deltaY,
          deltaZ: nativeEvent.deltaZ,
          detail: nativeEvent.detail,
          axis: nativeEvent.axis,
          wheelX: nativeEvent.wheelX,
          wheelY: nativeEvent.wheelY,
          view: nativeEvent.view ? nativeEvent.view.constructor.name : undefined,
          HORIZONTAL_AXIS: nativeEvent.HORIZONTAL_AXIS,
          type: nativeEvent.type,
          x: nativeEvent.x,
          y: nativeEvent.y
        }
      };

      if (data.eventClass === 'PointerEvent') {
        Object.assign(data.native, {
          pointerId: nativeEvent.pointerId,
          width: nativeEvent.width,
          height: nativeEvent.height,
          pressure: nativeEvent.pressure,
          tiltX: nativeEvent.tiltX,
          tiltY: nativeEvent.tiltY,
          pointerType: nativeEvent.pointerType,
          isPrimary: nativeEvent.isPrimary
        });
      } else if (data.eventClass === 'WheelEvent') {
        Object.assign(data.native, {
          deltaX: nativeEvent.deltaX,
          deltaY: nativeEvent.deltaY,
          deltaZ: nativeEvent.deltaZ,
          deltaMode: nativeEvent.deltaMode
        });
      } else if (data.eventClass === 'KeyboardEvent') {
        Object.assign(data.native, {
          code: nativeEvent.code,
          composed: nativeEvent.composed,
          charCode: nativeEvent.charCode,
          key: nativeEvent.key,
          keyCode: nativeEvent.keyCode,
          ctrlKey: nativeEvent.ctrlKey,
          altKey: nativeEvent.altKey
        });
      }

      // delete undefined values
      Object.keys(data.native).forEach(function (key) {
        if (data.native[key] === undefined || data.native[key] === null) {
          delete data.native[key];
        }
      });
      return data;
    },

    recordNativeEvent(ev) {
      if (!cv.report.Record.USER_EVENTS.test(ev.type) || ev.$$RID || ev.constructor.name === 'CustomEvent') {
        return;
      }
      ev.$$RID = this.__ID;
      if (ev.type.endsWith('down') || ev.type.endsWith('start')) {
        this.__delta = this.__minDelta;
      } else if (ev.type.endsWith('up') || ev.type.endsWith('end')) {
        this.__delta = this.__maxDelta;
      }
      if (/.+(move|over|out)/.test(ev.type)) {
        if (!this.__deltas[ev.type]) {
          this.__deltas[ev.type] = { x: ev.clientX, y: ev.clientY };
        } else {
          const lastDelta = this.__deltas[ev.type];
          if (
            Math.abs(lastDelta.x - ev.clientX) <= this.__delta ||
            Math.abs(lastDelta.y - ev.clientY) <= this.__delta
          ) {
            // below delta -> skip this event
            return;
          }
          this.__deltas[ev.type] = { x: ev.clientX, y: ev.clientY };
        }
      }
      // get path
      const path = this.__getDomPath(ev.target);
      if (!path) {
        this.debug('path to event target not found, skip recording ' + ev.type + ' event');
        return;
      }
      this.debug('recording ' + ev.type + ' on ' + path);
      const data = this.__extractDataFromEvent(ev);
      this.record(cv.report.Record.USER, path, data);
    },

    recordScroll(ev) {
      const page = ev.getTarget();
      const path = undefined !== page && 'getAttribute' in page ? page.getAttribute('id') : undefined;
      const data = {
        type: ev.getType(),
        page: path,
        x: page.scrollLeft,
        y: page.scrollTop
      };

      this.record(cv.report.Record.USER, 'scroll', data);
    },

    /**
     * @param el {Element|Node|Window|undefined}
     * @return {string} CSS selector to element
     */
    __getDomPath(el) {
      if (!el) {
        return '';
      }
      if (el === window) {
        return 'Window';
      } else if (el === document) {
        return 'document';
      }
      const stack = [];
      const origEl = el;
      while (el.parentElement !== null) {
        let sibIndex = 0;
        for (let i = 0; i < el.parentElement.children.length; i++) {
          const sib = el.parentElement.children[i];
          if (sib === el) {
            sibIndex = i + 1;
            break;
          }
        }
        if (el.hasAttribute('id') && el.id !== '') {
          stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
          const sel = stack.join('>');
          if (document.querySelector(sel) !== origEl) {
            this.debug('wrong selector: ' + sel + ', looking for', origEl, 'found', document.querySelector(sel));
            return '';
          }
          return sel;
        }
        stack.unshift(el.nodeName.toLowerCase() + ':nth-child(' + sibIndex + ')');
        el = el.parentElement;
      }

      const sel = stack.slice(1).join('>'); // removes the html element
      if (document.querySelector(sel) !== origEl) {
        this.debug('wrong selector: ' + sel + ', looking for', origEl, 'found', document.querySelector(sel));
        return '';
      }
      return sel;
    },

    getData(dontStop) {
      if (!dontStop) {
        cv.Config.reporting = false;
      }
      return {
        data: this.__data,
        start: this.__start,
        xhr: this.__xhr,
        log: this.__log,
        configSuffix: cv.Config.configSuffix,
        end: Date.now()
      };
    },

    getFileName() {
      const d = new Date();
      const ts =
        d.getFullYear() +
        ('' + (d.getMonth() + 1)).padStart(2, '0') +
        ('' + d.getDate()).padStart(2, '0') +
        '-' +
        ('' + d.getHours()).padStart(2, '0') +
        ('' + d.getMinutes()).padStart(2, '0') +
        ('' + d.getSeconds()).padStart(2, '0');
      return 'CometVisu-replay-' + ts + '.json';
    },

    /**
     * Download Log as file
     */
    download() {
      const data = this.getData();
      // show the user what he gets
      // eslint-disable-next-line no-console
      console.log(data);

      const a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(new Blob([JSON.stringify(data)], { type: 'application/json' }));

      a.download = this.getFileName();

      // Append anchor to body.
      document.body.appendChild(a);
      a.click();

      // Remove anchor from body
      document.body.removeChild(a);
      return a.download;
    }
  }
});
