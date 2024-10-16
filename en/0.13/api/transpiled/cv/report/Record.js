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
      "cv.Config": {},
      "cv.Application": {},
      "qx.io.request.Xhr": {},
      "cv.report.utils.MXhrHook": {},
      "qx.event.Registration": {},
      "qx.event.message.Bus": {},
      "qx.util.Function": {},
      "qx.util.Uri": {},
      "qx.core.Environment": {},
      "qx.bom.client.Locale": {},
      "cv.Version": {},
      "cv.ConfigCache": {},
      "cv.io.rest.Client": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
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
    construct: function construct() {
      this.__P_753_0 = [];
      this.__P_753_1 = {};
      this.__P_753_2 = Date.now();
      this.__P_753_3 = {
        response: [],
        request: []
      };
      this.__P_753_4 = {};
      this.__P_753_5 = {};
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
      prepare: function prepare() {
        if (cv.Config.reporting === true && !cv.report.Record.REPLAYING) {
          cv.Application.registerConsoleCommand('downloadLog', cv.report.Record.download, 'Download recorded log file.');

          // apply event recorder
          var record = cv.report.Record.getInstance();
          EVENT_RECORDER = record.recordNativeEvent.bind(record);

          // patch XHR
          qx.Class.patch(qx.io.request.Xhr, cv.report.utils.MXhrHook);
          var Reg = qx.event.Registration;

          // add resize listener
          Reg.addListener(window, 'resize', function () {
            this.record(this.SCREEN, 'resize', {
              w: document.documentElement.clientWidth,
              h: document.documentElement.clientHeight
            });
          }, this);

          // add scroll listeners to all pages
          qx.event.message.Bus.subscribe('setup.dom.finished', function () {
            var throttled = qx.util.Function.throttle(record.recordScroll, 250, true);
            document.querySelectorAll('#pages > .page').forEach(function (page) {
              Reg.addListener(page, 'scroll', throttled, record);
            }, this);
          }, this);
          this.record(this.RUNTIME, 'config', this.getClientData());

          // save initial size
          this.record(this.SCREEN, 'resize', {
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight
          });
        }
      },
      getClientData: function getClientData() {
        // save browser settings
        var req = qx.util.Uri.parseUri(window.location.href);
        // delete reporting queryKey
        delete req.queryKey.reporting;
        var Env = qx.core.Environment;
        var runtime = {
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
      record: function record(category, path, data, options) {
        if (cv.Config.reporting === true && !cv.report.Record.REPLAYING) {
          cv.report.Record.getInstance().record(category, path, data, options);
        }
      },
      /**
       * Save cache in
       */
      logCache: function logCache() {
        if (cv.Config.reporting === true && !cv.report.Record.REPLAYING) {
          cv.ConfigCache.getData().then(function (data) {
            cv.report.Record.record(cv.report.Record.CACHE, cv.Config.configSuffix, data);
          });
        }
      },
      logLocalStorage: function logLocalStorage() {
        cv.report.Record.record(cv.report.Record.STORAGE, 'preferences', window.localStorage.preferences);
      },
      normalizeUrl: function normalizeUrl(url) {
        try {
          var parsed = qx.util.Uri.parseUri(qx.util.Uri.getAbsolute(url));
          url = parsed.path;
          var filteredParams = Object.keys(parsed.queryKey).filter(function (name) {
            return name !== 'nocache' && name !== 'ts';
          });
          if (filteredParams.length > 0) {
            url += '?';
            url += filteredParams.map(function (param) {
              return "".concat(param, "=").concat(parsed.queryKey[param]);
            }).join('&');
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
      download: function download() {
        if (cv.Config.reporting === true && !cv.report.Record.REPLAYING) {
          return cv.report.Record.getInstance().download();
        }
        return null;
      },
      getData: function getData() {
        if (cv.Config.reporting === true && !cv.report.Record.REPLAYING) {
          return cv.report.Record.getInstance().getData();
        }
        return null;
      },
      getFileName: function getFileName() {
        return cv.report.Record.getInstance().getFileName();
      }
    },
    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_753_2: null,
      __P_753_0: null,
      __P_753_3: null,
      __P_753_1: null,
      __P_753_4: null,
      __P_753_6: 50,
      __P_753_7: 1,
      __P_753_8: 50,
      __P_753_5: null,
      __P_753_9: 0,
      record: function record(category, path, data, options) {
        switch (category) {
          case cv.report.Record.XHR:
            if (path === 'response') {
              this.__P_753_10(category, data);
            }
            data.t = Date.now();
            this.__P_753_3[path].push(data);
            break;
          case cv.report.Record.CACHE:
          case cv.report.Record.RUNTIME:
            this.__P_753_4[category] = data;
            break;
          case cv.report.Record.STORAGE:
            if (!Object.prototype.hasOwnProperty.call(this.__P_753_4, category)) {
              this.__P_753_4[category] = {};
            }
            this.__P_753_4[category][path] = data;
            break;
          default:
            this.__P_753_0.push({
              c: category,
              t: Date.now(),
              i: path,
              d: data,
              o: options,
              ID: this.__P_753_9
            });
        }
        this.__P_753_9++;
      },
      /**
       * Prevent sensitive data like passwords from being recorded (e.g. content of the hidden config
       * @param category {String} recording category
       * @param data {Object} recorded content
       * @private
       */
      __P_753_10: function __P_753_10(category, data) {
        if (category === cv.report.Record.XHR) {
          if (data.url.includes(cv.io.rest.Client.BASE_URL + '/config/hidden') && data.body) {
            try {
              var content = JSON.parse(data.body);
              Object.keys(content).forEach(function (sectionName) {
                Object.keys(content[sectionName]).forEach(function (optionName) {
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
      __P_753_11: function __P_753_11(nativeEvent) {
        var _this$__P_753_, _this$__P_753_2;
        var data = {
          eventClass: nativeEvent.constructor.name,
          "native": {
            bubbles: nativeEvent.bubbles,
            button: nativeEvent.button,
            clientX: Math.round(nativeEvent.clientX),
            clientY: Math.round(nativeEvent.clientY),
            currentTarget: (_this$__P_753_ = this.__P_753_12(nativeEvent.currentTarget)) !== null && _this$__P_753_ !== void 0 ? _this$__P_753_ : undefined,
            relatedTarget: (_this$__P_753_2 = this.__P_753_12(nativeEvent.relatedTarget)) !== null && _this$__P_753_2 !== void 0 ? _this$__P_753_2 : undefined,
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
          Object.assign(data["native"], {
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
          Object.assign(data["native"], {
            deltaX: nativeEvent.deltaX,
            deltaY: nativeEvent.deltaY,
            deltaZ: nativeEvent.deltaZ,
            deltaMode: nativeEvent.deltaMode
          });
        } else if (data.eventClass === 'KeyboardEvent') {
          Object.assign(data["native"], {
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
        Object.keys(data["native"]).forEach(function (key) {
          if (data["native"][key] === undefined || data["native"][key] === null) {
            delete data["native"][key];
          }
        });
        return data;
      },
      recordNativeEvent: function recordNativeEvent(ev) {
        if (!cv.report.Record.USER_EVENTS.test(ev.type) || ev.$$RID || ev.constructor.name === 'CustomEvent') {
          return;
        }
        ev.$$RID = this.__P_753_9;
        if (ev.type.endsWith('down') || ev.type.endsWith('start')) {
          this.__P_753_6 = this.__P_753_7;
        } else if (ev.type.endsWith('up') || ev.type.endsWith('end')) {
          this.__P_753_6 = this.__P_753_8;
        }
        if (/.+(move|over|out)/.test(ev.type)) {
          if (!this.__P_753_5[ev.type]) {
            this.__P_753_5[ev.type] = {
              x: ev.clientX,
              y: ev.clientY
            };
          } else {
            var lastDelta = this.__P_753_5[ev.type];
            if (Math.abs(lastDelta.x - ev.clientX) <= this.__P_753_6 || Math.abs(lastDelta.y - ev.clientY) <= this.__P_753_6) {
              // below delta -> skip this event
              return;
            }
            this.__P_753_5[ev.type] = {
              x: ev.clientX,
              y: ev.clientY
            };
          }
        }
        // get path
        var path = this.__P_753_12(ev.target);
        if (!path) {
          this.debug('path to event target not found, skip recording ' + ev.type + ' event');
          return;
        }
        this.debug('recording ' + ev.type + ' on ' + path);
        var data = this.__P_753_11(ev);
        this.record(cv.report.Record.USER, path, data);
      },
      recordScroll: function recordScroll(ev) {
        var page = ev.getTarget();
        var path = undefined !== page && 'getAttribute' in page ? page.getAttribute('id') : undefined;
        var data = {
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
      __P_753_12: function __P_753_12(el) {
        if (!el) {
          return '';
        }
        if (el === window) {
          return 'Window';
        } else if (el === document) {
          return 'document';
        }
        var stack = [];
        var origEl = el;
        while (el.parentElement !== null) {
          var sibIndex = 0;
          for (var i = 0; i < el.parentElement.children.length; i++) {
            var sib = el.parentElement.children[i];
            if (sib === el) {
              sibIndex = i + 1;
              break;
            }
          }
          if (el.hasAttribute('id') && el.id !== '') {
            stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
            var _sel = stack.join('>');
            if (document.querySelector(_sel) !== origEl) {
              this.debug('wrong selector: ' + _sel + ', looking for', origEl, 'found', document.querySelector(_sel));
              return '';
            }
            return _sel;
          }
          stack.unshift(el.nodeName.toLowerCase() + ':nth-child(' + sibIndex + ')');
          el = el.parentElement;
        }
        var sel = stack.slice(1).join('>'); // removes the html element
        if (document.querySelector(sel) !== origEl) {
          this.debug('wrong selector: ' + sel + ', looking for', origEl, 'found', document.querySelector(sel));
          return '';
        }
        return sel;
      },
      getData: function getData(dontStop) {
        if (!dontStop) {
          cv.Config.reporting = false;
        }
        return {
          data: this.__P_753_4,
          start: this.__P_753_2,
          xhr: this.__P_753_3,
          log: this.__P_753_0,
          configSuffix: cv.Config.configSuffix,
          end: Date.now()
        };
      },
      getFileName: function getFileName() {
        var d = new Date();
        var ts = d.getFullYear() + ('' + (d.getMonth() + 1)).padStart(2, '0') + ('' + d.getDate()).padStart(2, '0') + '-' + ('' + d.getHours()).padStart(2, '0') + ('' + d.getMinutes()).padStart(2, '0') + ('' + d.getSeconds()).padStart(2, '0');
        return 'CometVisu-replay-' + ts + '.json';
      },
      /**
       * Download Log as file
       */
      download: function download() {
        var data = this.getData();
        // show the user what he gets
        // eslint-disable-next-line no-console
        console.log(data);
        var a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob([JSON.stringify(data)], {
          type: 'application/json'
        }));
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
  cv.report.Record.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Record.js.map?dt=1729101272992