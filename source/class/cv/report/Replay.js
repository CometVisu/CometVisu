/* Replay.js
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
 * Replay tool for user interactions on existing configs. Used for bug reproduction
 *
 * TODO:
 * - Progressbar + Controls(Stop, Pause, Fast Mode)
 * - weitere user events (slider, colorchooser)
 *
 * @author Tobias Bräutigam
 * @since 0.11.0 (2017)
 * @ignore(Document)
 */
qx.Class.define('cv.report.Replay', {
  extend: qx.core.Object,
  type: 'singleton',

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct() {
    this.__log = [];
    this.__start = Date.now();
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
    REPLAYING: false,
    data: null,

    prepare(data) {
      cv.report.Record.REPLAYING = true;
      cv.report.Replay.getInstance().prepare(data);
      // override startpage setting
      if (data.data.runtime.path.indexOf('#') >= 0) {
        cv.Config.startpage = data.data.runtime.path.split('#').pop();
      } else {
        cv.Config.startpage = 'id_';
      }
    },

    start() {
      if (cv.report.Record.REPLAYING === true) {
        cv.report.Replay.getInstance().start();
      }
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __start: null,
    __end: null,
    __log: null,
    __client: null,
    __data: null,
    __config: null,
    __cursor: null,
    __currentIndex: null,
    __skipMoveEvents: false,
    __startTime: null,

    prepare(log) {
      // patch XHR
      qx.Class.patch(qx.io.request.Xhr, cv.report.utils.MXhrReplayHook);

      cv.Config.configSuffix = log.configSuffix;
      this.__start = log.start;
      this.__end = log.end;
      this.__log = log.log;
      this.__data = log.data;
      this.__config = qx.xml.Document.fromString(log.config);
      if (log.data.cache) {
        cv.ConfigCache._parseCacheData = log.data.cache;
        // parse stringified data
        cv.ConfigCache._parseCacheData.data =
          typeof log.data.cache.data === 'string' ? JSON.parse(log.data.cache.data) : log.data.cache.data;
        cv.ConfigCache._parseCacheData.configSettings =
          typeof log.data.cache.configSettings === 'string'
            ? JSON.parse(log.data.cache.configSettings)
            : log.data.cache.configSettings;
      }
      if (log.data.storage) {
        const store = qx.bom.Storage.getLocal();
        Object.keys(log.data.storage).forEach(name => {
          store.setItem(name, log.data.storage[name]);
        });
      }
      cv.report.utils.FakeServer.init(log.xhr, this.__data.runtime.build);
    },

    /**
     * Start replaying the given data
     */
    start() {
      const runtime = Math.round((this.__end - this.__start) / 1000);
      this.info('Replay time: ' + Math.floor(runtime / 60) + ':' + ('' + (runtime % 60)).padStart(2, '0'));

      this.__startTime = Date.now();

      const delay = this.__log[0].t - this.__start;
      qx.event.Timer.once(
        function () {
          this.__replay(0);
        },
        this,
        delay
      );
    },

    /**
     * Find DOM element for given path
     * @param path {String} CSS selector or "Window"
     * @return {Element|null}
     */
    __findElement(path) {
      if (path === 'Window') {
        return window;
      } else if (path === 'document') {
        return document;
      } else if (path instanceof HTMLElement || path instanceof Document) {
        return path;
      } else if (path.includes(':eq(')) {
        const re = /:eq\(([\d]+)\)/;
        let match = re.exec(path);
        while (match) {
          const index = parseInt(match[1]) + 1;
          path = path.replace(match[0], ':nth-child(' + index + ')');
          match = re.exec(path);
        }
        return document.querySelector(path);
      }
      return document.querySelector(path);
    },

    __replay(index) {
      this.__currentIndex = index;
      const record = this.__log[index];
      this.__dispatchRecord(record);
      if (this.__log.length === index + 1) {
        this.info('All log events have been played, waiting till end of recording time');

        qx.event.Timer.once(
          function () {
            qx.bom.Notification.getInstance().show('Replay', 'Replay finished');
            cv.io.Client.stopAll();
            const runtime = Math.round((Date.now() - this.__startTime) / 1000);
            this.info('Log replayed in: ' + Math.floor(runtime / 60) + ':' + ('' + (runtime % 60)).padStart(2, '0'));
          },
          this,
          this.__end - this.__log[index].t
        );

        return;
      }
      const delay = this.__log[index + 1].t - this.__log[index].t;
      qx.event.Timer.once(
        function () {
          this.__replay(index + 1);
        },
        this,
        delay
      );
    },

    __dispatchRecord(record) {
      switch (record.c) {
        case cv.report.Record.BACKEND:
          this.__dispatchBackendRecord(record);
          break;

        case cv.report.Record.STORAGE: {
          const store = qx.bom.Storage.getLocal();
          store.setItem(record.i, record.d);
          if (record.i === 'preferences' && cv.ui.manager) {
            cv.ui.manager.model.Preferences.getInstance().setPreferences(record.d, true);
          }
          break;
        }

        case cv.report.Record.SCREEN:
          // most browsers do not allow resizing the window
          this.info('resize event received ' + JSON.stringify(record.d));
          window.resizeTo(record.d.w, record.d.h);
          break;

        case cv.report.Record.USER:
          if (record.i === 'scroll') {
            this.__playScrollEvent(record);
          } else {
            const target = this.__findElement(record.i);
            if (!target) {
              this.error('no target found for path ' + record.i);
              return;
            }
            if (/(pointer|mouse|gesture).+/.test(record.d.native.type)) {
              this._simulateCursor(record);
            }
            const evt = record.d.native;
            evt.view = evt.view === 'Window' ? window : null;
            evt.target = target;
            ['currentTarget', 'relatedTarget'].forEach(function (key) {
              evt[key] = evt[key] ? this.__findElement(evt[key]) : null;
            }, this);
            const event = new window[record.d.eventClass](record.d.native.type, evt);

            if (record.d.native.type === 'pointerup' && target.nodeName === 'A') {
              // workaround for mouse clicks on <a> elemente e.g. in the breadcrumb navigation
              // check for last pointerdown event, if id was on same element we have a click
              for (let i = this.__currentIndex - 1; i > 0; i--) {
                if (this.__log[i].d.native.type === 'pointerdown') {
                  if (this.__log[i].i === record.i) {
                    // same element
                    target.click();
                  }
                  break;
                }
              }
            }
            target.dispatchEvent(event);
          }
          break;

        default:
          this.error('replaying of category ' + record.c + ' no implemented');
          break;
      }
    },

    __playScrollEvent(record) {
      const elem = document.querySelector('#' + record.d.page);
      elem.scrollTop = record.d.native ? record.d.native.pageY : record.d.y;
      elem.scrollLeft = record.d.native ? record.d.native.pageX : record.d.x;
    },

    _simulateCursor(record) {
      // simulate cursor
      if (!this.__cursor) {
        this.__cursor = qx.dom.Element.create('span', {
          style: 'position: absolute; transform: rotate(-40deg); font-size: 36px; z-index: 1000000'
        });

        this.__cursor.innerHTML = '&uarr;';
        document.querySelector('body').appendChild(this.__cursor);
      }
      Object.entries({
        top: record.d.native.clientY - 10 + 'px',
        left: record.d.native.clientX - 10 + 'px'
      }).forEach(function (key_value) {
        this.__cursor.style[key_value[0]] = key_value[1];
      }, this);

      if (/.+(down|start)/.test(record.d.native.type)) {
        this.__cursor.style.color = record.d.native.button === 2 ? 'blue' : 'red';
      } else if (/.+(up|end)/.test(record.d.native.type)) {
        this.__cursor.style.color = 'white';
      }
    },

    __dispatchBackendRecord(record) {
      let client = this.__getDefaultClient();
      if (record.o && record.o.name) {
        client = cv.io.BackendConnections.getClient(record.o.name);
      }
      switch (record.i) {
        case 'read':
          if (client instanceof cv.io.openhab.Rest) {
            client.handleMessage(record.d);
          } else if (client instanceof cv.io.mqtt.Client) {
            client.update(record.d);
          } else if (client.getCurrentTransport() instanceof cv.io.transport.Sse) {
            client.getCurrentTransport().handleMessage({ data: record.d });
          } else {
            this.error('long-polling transport should not record \'backend\' log events. Skip replaying');
          }
          break;
        default:
          if (client[record.i]) {
            client[record.i].apply(client, record.d);
          } else if (client instanceof cv.io.openhab.Rest) {
            this.error('unhandled rest backend record of type ' + record.i);
          } else if (client instanceof cv.io.mqtt.Client) {
            client.update(record.d);
          } else if (client.getCurrentTransport() instanceof cv.io.transport.Sse) {
            client.getCurrentTransport().dispatchTopicMessage(record.i, record.d);
          } else {
            this.error('unhandled backend record of type ' + record.i);
          }
          break;
      }
    },

    __getDefaultClient() {
      if (!this.__client) {
        this.__client = cv.io.BackendConnections.getClient();
      }
      return this.__client;
    }
  }
});
